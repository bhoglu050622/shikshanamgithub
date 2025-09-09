/**
 * Enhanced Analytics Tracker
 * Client-side analytics with localStorage queue and batch sending
 */

import { AnalyticsEvent } from './analytics-db'

// Configuration
const ANALYTICS_CONFIG = {
  QUEUE_KEY: 'analytics_queue_v1',
  VISITOR_ID_KEY: 'analytics_visitor_id',
  SESSION_ID_KEY: 'analytics_session_id',
  BATCH_SIZE: 10,
  BATCH_INTERVAL: 10000, // 10 seconds
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_QUEUE_SIZE: 100,
  ENDPOINT: '/api/collect',
  ENABLED: true,
  DEBUG: process.env.NODE_ENV === 'development',
}

// Event queue in localStorage
interface QueuedEvent {
  event_type: AnalyticsEvent['event_type']
  timestamp: string
  url: string
  title?: string
  referrer?: string
  user_agent: string
  language?: string
  visitor_id: string
  session_id: string
  screen?: string
  additional?: Record<string, any>
  client_generated: boolean
  client_version: string
}

class AnalyticsTracker {
  private batchTimer: NodeJS.Timeout | null = null
  private isInitialized = false
  private visitorId: string = ''
  private sessionId: string = ''
  private lastActivity: number = Date.now()

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    if (this.isInitialized) return

    // Check if analytics is enabled
    if (!ANALYTICS_CONFIG.ENABLED || this.isOptedOut()) {
      return
    }

    // Initialize visitor and session IDs
    this.initializeVisitorId()
    this.initializeSessionId()

    // Migrate old localStorage data
    this.migrateOldData()

    // Set up batch sending
    this.startBatchTimer()

    // Set up page unload handler
    this.setupUnloadHandler()

    // Set up activity tracking
    this.setupActivityTracking()

    // Track initial page view
    this.trackPageView()

    this.isInitialized = true

    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Analytics tracker initialized:', {
        visitorId: this.visitorId,
        sessionId: this.sessionId,
      })
    }
  }

  private isOptedOut(): boolean {
    // Check Do Not Track
    if (navigator.doNotTrack === '1') return true
    
    // Check custom opt-out flag
    return localStorage.getItem('analytics_opt_out') === 'true'
  }

  private initializeVisitorId() {
    this.visitorId = localStorage.getItem(ANALYTICS_CONFIG.VISITOR_ID_KEY) || ''
    
    if (!this.visitorId) {
      this.visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem(ANALYTICS_CONFIG.VISITOR_ID_KEY, this.visitorId)
    }
  }

  private initializeSessionId() {
    const storedSessionId = sessionStorage.getItem(ANALYTICS_CONFIG.SESSION_ID_KEY)
    const storedTimestamp = sessionStorage.getItem(ANALYTICS_CONFIG.SESSION_ID_KEY + '_timestamp')
    
    const now = Date.now()
    const lastActivity = storedTimestamp ? parseInt(storedTimestamp) : 0
    
    // Check if session expired
    if (storedSessionId && (now - lastActivity) < ANALYTICS_CONFIG.SESSION_TIMEOUT) {
      this.sessionId = storedSessionId
    } else {
      // Create new session
      this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem(ANALYTICS_CONFIG.SESSION_ID_KEY, this.sessionId)
      
      // Track session start
      this.queueEvent('session_start', {
        additional: { session_start_time: new Date().toISOString() }
      })
    }
    
    // Update last activity
    this.updateSessionActivity()
  }

  private updateSessionActivity() {
    this.lastActivity = Date.now()
    sessionStorage.setItem(ANALYTICS_CONFIG.SESSION_ID_KEY + '_timestamp', this.lastActivity.toString())
  }

  private migrateOldData() {
    // List of old localStorage keys to migrate
    const oldKeys = ['shikshanam_analytics', 'events_queue', 'analytics_events']
    
    for (const oldKey of oldKeys) {
      const oldData = localStorage.getItem(oldKey)
      if (oldData) {
        try {
          const events = JSON.parse(oldData)
          if (Array.isArray(events)) {
            // Convert old events to new format
            const migratedEvents = events.map(event => this.convertOldEvent(event))
            this.addEventsToQueue(migratedEvents)
          }
          
          // Remove old key
          localStorage.removeItem(oldKey)
          
          if (ANALYTICS_CONFIG.DEBUG) {
            console.log(`Migrated ${events.length} events from ${oldKey}`)
          }
        } catch (error) {
          console.warn(`Failed to migrate data from ${oldKey}:`, error)
          localStorage.removeItem(oldKey) // Remove corrupted data
        }
      }
    }
    
    // Set migration flag
    localStorage.setItem('analytics_migrated_v1', 'true')
  }

  private convertOldEvent(oldEvent: any): QueuedEvent {
    // Convert old event format to new standardized format
    return {
      event_type: this.mapOldEventType(oldEvent.event || oldEvent.type),
      timestamp: oldEvent.timestamp || oldEvent.properties?.timestamp || new Date().toISOString(),
      url: oldEvent.properties?.page_url || window.location.href,
      title: oldEvent.properties?.page_title || document.title,
      referrer: oldEvent.properties?.referrer || document.referrer,
      user_agent: navigator.userAgent,
      language: navigator.language,
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      screen: `${screen.width}x${screen.height}`,
      additional: oldEvent.properties || {},
      client_generated: true,
      client_version: '1.0.0'
    }
  }

  private mapOldEventType(oldType: string): QueuedEvent['event_type'] {
    // Map old event types to new standardized types
    const typeMap: Record<string, QueuedEvent['event_type']> = {
      'page_view': 'pageview',
      'click': 'custom',
      'navigation': 'custom',
      'engagement': 'custom',
    }
    
    return typeMap[oldType] || 'custom'
  }

  private getQueue(): QueuedEvent[] {
    try {
      const queueData = localStorage.getItem(ANALYTICS_CONFIG.QUEUE_KEY)
      return queueData ? JSON.parse(queueData) : []
    } catch (error) {
      console.warn('Failed to parse analytics queue:', error)
      return []
    }
  }

  private saveQueue(queue: QueuedEvent[]) {
    try {
      // Limit queue size to prevent localStorage bloat
      const limitedQueue = queue.slice(-ANALYTICS_CONFIG.MAX_QUEUE_SIZE)
      localStorage.setItem(ANALYTICS_CONFIG.QUEUE_KEY, JSON.stringify(limitedQueue))
    } catch (error) {
      console.warn('Failed to save analytics queue:', error)
      // If localStorage is full, try to clear old events
      this.clearOldEvents()
    }
  }

  private clearOldEvents() {
    const queue = this.getQueue()
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000) // 24 hours ago
    
    const filteredQueue = queue.filter(event => {
      const eventTime = new Date(event.timestamp).getTime()
      return eventTime > cutoffTime
    })
    
    this.saveQueue(filteredQueue)
  }

  private queueEvent(
    eventType: QueuedEvent['event_type'],
    options: Partial<QueuedEvent> = {}
  ) {
    if (!ANALYTICS_CONFIG.ENABLED || this.isOptedOut()) return

    const event: QueuedEvent = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      title: document.title,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
      language: navigator.language,
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      screen: `${screen.width}x${screen.height}`,
      client_generated: true,
      client_version: '1.0.0',
      ...options
    }

    const queue = this.getQueue()
    queue.push(event)
    this.saveQueue(queue)

    if (ANALYTICS_CONFIG.DEBUG) {
      console.log('Queued analytics event:', event)
    }

    // Update session activity
    this.updateSessionActivity()

    // Send batch if queue is full
    if (queue.length >= ANALYTICS_CONFIG.BATCH_SIZE) {
      this.sendBatch()
    }
  }

  private addEventsToQueue(events: QueuedEvent[]) {
    const queue = this.getQueue()
    queue.push(...events)
    this.saveQueue(queue)
  }

  private async sendBatch() {
    const queue = this.getQueue()
    if (queue.length === 0) return

    try {
      const response = await fetch(ANALYTICS_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: queue }),
        keepalive: true,
      })

      if (response.ok) {
        // Clear sent events from queue
        this.saveQueue([])
        
        if (ANALYTICS_CONFIG.DEBUG) {
          console.log(`Sent ${queue.length} analytics events`)
        }
      } else {
        console.warn('Failed to send analytics batch:', response.status)
      }
    } catch (error) {
      console.warn('Failed to send analytics batch:', error)
    }
  }

  private startBatchTimer() {
    this.batchTimer = setInterval(() => {
      this.sendBatch()
    }, ANALYTICS_CONFIG.BATCH_INTERVAL)
  }

  private setupUnloadHandler() {
    const sendFinalBatch = () => {
      const queue = this.getQueue()
      if (queue.length > 0) {
        // Add session end event
        queue.push({
          event_type: 'session_end',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          title: document.title,
          user_agent: navigator.userAgent,
          language: navigator.language,
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          screen: `${screen.width}x${screen.height}`,
          client_generated: true,
          client_version: '1.0.0',
          additional: { session_end_time: new Date().toISOString() }
        })

        // Use sendBeacon for reliable sending on page unload
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            ANALYTICS_CONFIG.ENDPOINT,
            JSON.stringify({ events: queue })
          )
          this.saveQueue([]) // Clear queue on successful send
        }
      }
    }

    window.addEventListener('beforeunload', sendFinalBatch)
    window.addEventListener('pagehide', sendFinalBatch)
    
    // Also handle visibility change for mobile
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendFinalBatch()
      }
    })
  }

  private setupActivityTracking() {
    // Track user activity to extend session
    const activityEvents = ['click', 'scroll', 'keydown', 'mousemove']
    let activityThrottle: NodeJS.Timeout | null = null

    const trackActivity = () => {
      if (activityThrottle) return
      
      activityThrottle = setTimeout(() => {
        this.updateSessionActivity()
        activityThrottle = null
      }, 30000) // Throttle to every 30 seconds
    }

    activityEvents.forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true })
    })
  }

  // Public methods
  public trackPageView(url?: string, title?: string) {
    this.queueEvent('pageview', {
      url: url || window.location.href,
      title: title || document.title,
    })
  }

  public trackOutboundClick(href: string, text?: string) {
    this.queueEvent('outbound_click', {
      additional: {
        outbound_href: href,
        link_text: text,
      }
    })
  }

  public trackCustomEvent(eventData: Record<string, any>) {
    this.queueEvent('custom', {
      additional: eventData
    })
  }

  public optOut() {
    localStorage.setItem('analytics_opt_out', 'true')
    
    // Clear existing data
    localStorage.removeItem(ANALYTICS_CONFIG.QUEUE_KEY)
    localStorage.removeItem(ANALYTICS_CONFIG.VISITOR_ID_KEY)
    sessionStorage.removeItem(ANALYTICS_CONFIG.SESSION_ID_KEY)
    
    // Stop batch timer
    if (this.batchTimer) {
      clearInterval(this.batchTimer)
    }
  }

  public optIn() {
    localStorage.removeItem('analytics_opt_out')
    this.init() // Re-initialize
  }

  public getVisitorId(): string {
    return this.visitorId
  }

  public getSessionId(): string {
    return this.sessionId
  }

  public getQueueLength(): number {
    return this.getQueue().length
  }

  public forceFlush() {
    this.sendBatch()
  }
}

// Create global instance
export const analyticsTracker = new AnalyticsTracker()

// Export for use in components
export default analyticsTracker
