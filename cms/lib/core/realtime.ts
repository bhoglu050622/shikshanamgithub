// Real-time CMS System
// Handles PostgreSQL LISTEN/NOTIFY and WebSocket connections

import { CMSEvent, RealtimeSubscription } from './types'

// PostgreSQL LISTEN/NOTIFY setup
export class PostgreSQLRealtime {
  private static instance: PostgreSQLRealtime
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private isConnected = false

  static getInstance(): PostgreSQLRealtime {
    if (!PostgreSQLRealtime.instance) {
      PostgreSQLRealtime.instance = new PostgreSQLRealtime()
    }
    return PostgreSQLRealtime.instance
  }

  async connect() {
    if (this.isConnected) return

    try {
      // This would be implemented with a PostgreSQL connection
      // For now, we'll simulate the connection
      console.log('PostgreSQL LISTEN/NOTIFY connection established')
      this.isConnected = true
      
      // Start listening for events
      this.startListening()
    } catch (error) {
      console.error('Failed to connect to PostgreSQL real-time:', error)
      throw error
    }
  }

  private async startListening() {
    // In a real implementation, this would:
    // 1. Connect to PostgreSQL
    // 2. Execute LISTEN commands for each channel
    // 3. Handle NOTIFY events and emit to subscribers
    
    // For now, we'll simulate with setInterval
    setInterval(() => {
      this.emit('cms_event', {
        type: 'update',
        entity: 'course',
        entityId: 'simulated-id',
        timestamp: new Date(),
        data: { simulated: true }
      })
    }, 30000) // Emit every 30 seconds for testing
  }

  subscribe(channel: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, new Set())
    }
    
    this.listeners.get(channel)!.add(callback)

    return () => {
      const channelListeners = this.listeners.get(channel)
      if (channelListeners) {
        channelListeners.delete(callback)
        if (channelListeners.size === 0) {
          this.listeners.delete(channel)
        }
      }
    }
  }

  private emit(channel: string, data: any) {
    const channelListeners = this.listeners.get(channel)
    if (channelListeners) {
      channelListeners.forEach(callback => callback(data))
    }
  }

  // Method to trigger events (called by CMS services)
  async triggerEvent(event: CMSEvent) {
    // In a real implementation, this would:
    // 1. Insert event into a database table
    // 2. Use PostgreSQL NOTIFY to broadcast the event
    
    console.log('Triggering CMS event:', event)
    this.emit('cms_event', event)
  }

  disconnect() {
    this.isConnected = false
    this.listeners.clear()
    console.log('PostgreSQL LISTEN/NOTIFY connection closed')
  }
}

// WebSocket Server for real-time updates
export class WebSocketRealtime {
  private static instance: WebSocketRealtime
  private connections: Set<WebSocket> = new Set()
  private postgresRealtime: PostgreSQLRealtime

  static getInstance(): WebSocketRealtime {
    if (!WebSocketRealtime.instance) {
      WebSocketRealtime.instance = new WebSocketRealtime()
    }
    return WebSocketRealtime.instance
  }

  constructor() {
    this.postgresRealtime = PostgreSQLRealtime.getInstance()
    this.setupPostgreSQLListener()
  }

  private setupPostgreSQLListener() {
    this.postgresRealtime.subscribe('cms_event', (event: CMSEvent) => {
      this.broadcast(event)
    })
  }

  addConnection(ws: WebSocket) {
    this.connections.add(ws)
    
    ws.on('close', () => {
      this.connections.delete(ws)
    })

    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      this.connections.delete(ws)
    })

    // Send initial connection confirmation
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to CMS real-time updates',
      timestamp: new Date()
    }))
  }

  private broadcast(event: CMSEvent) {
    const message = JSON.stringify({
      type: 'cms_event',
      data: event,
      timestamp: new Date()
    })

    this.connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(message)
        } catch (error) {
          console.error('Failed to send WebSocket message:', error)
          this.connections.delete(ws)
        }
      }
    })
  }

  getConnectionCount(): number {
    return this.connections.size
  }
}

// React hooks for real-time data
export function useCMSRealtime() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastEvent, setLastEvent] = useState<CMSEvent | null>(null)
  const subscriptions = useRef<RealtimeSubscription[]>([])

  useEffect(() => {
    const postgresRealtime = PostgreSQLRealtime.getInstance()
    
    // Connect to PostgreSQL real-time
    postgresRealtime.connect().then(() => {
      setIsConnected(true)
    }).catch((error) => {
      console.error('Failed to connect to real-time:', error)
      setIsConnected(false)
    })

    // Subscribe to CMS events
    const unsubscribe = postgresRealtime.subscribe('cms_event', (event: CMSEvent) => {
      setLastEvent(event)
    })

    return () => {
      unsubscribe()
      postgresRealtime.disconnect()
      setIsConnected(false)
    }
  }, [])

  const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    const postgresRealtime = PostgreSQLRealtime.getInstance()
    const unsubscribe = postgresRealtime.subscribe(eventType, callback)
    
    const subscription: RealtimeSubscription = {
      id: Math.random().toString(36).substr(2, 9),
      event: eventType,
      callback,
      unsubscribe
    }
    
    subscriptions.current.push(subscription)
    
    return () => {
      subscription.unsubscribe()
      subscriptions.current = subscriptions.current.filter(s => s.id !== subscription.id)
    }
  }, [])

  const unsubscribeAll = useCallback(() => {
    subscriptions.current.forEach(sub => sub.unsubscribe())
    subscriptions.current = []
  }, [])

  return {
    isConnected,
    lastEvent,
    subscribe,
    unsubscribeAll
  }
}

// Hook for specific entity updates
export function useEntityRealtime<T>(
  entityType: 'course' | 'lesson' | 'package' | 'blog' | 'page',
  entityId: string,
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData)
  const [isUpdating, setIsUpdating] = useState(false)
  const { subscribe } = useCMSRealtime()

  useEffect(() => {
    const unsubscribe = subscribe('cms_event', (event: CMSEvent) => {
      if (event.entity === entityType && event.entityId === entityId) {
        setIsUpdating(true)
        
        // In a real implementation, you would refetch the data here
        // For now, we'll just update the timestamp
        setData(prevData => ({
          ...prevData,
          lastUpdated: new Date()
        } as T))
        
        setTimeout(() => setIsUpdating(false), 1000)
      }
    })

    return unsubscribe
  }, [entityType, entityId, subscribe])

  return {
    data,
    isUpdating,
    setData
  }
}

// Hook for real-time analytics
export function useRealtimeAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { subscribe } = useCMSRealtime()

  useEffect(() => {
    // Initial load
    const loadAnalytics = async () => {
      try {
        const response = await fetch('/api/cms/analytics')
        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        }
      } catch (error) {
        console.error('Failed to load analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()

    // Subscribe to real-time updates
    const unsubscribe = subscribe('cms_event', (event: CMSEvent) => {
      // Update analytics based on the event
      setAnalytics(prev => {
        if (!prev) return prev

        switch (event.type) {
          case 'create':
            if (event.entity === 'course') {
              return { ...prev, totalCourses: prev.totalCourses + 1 }
            }
            if (event.entity === 'blog') {
              return { ...prev, totalBlogPosts: prev.totalBlogPosts + 1 }
            }
            break
          case 'publish':
            if (event.entity === 'course') {
              return { ...prev, publishedCourses: prev.publishedCourses + 1 }
            }
            break
          default:
            break
        }

        return prev
      })
    })

    return unsubscribe
  }, [subscribe])

  return {
    analytics,
    isLoading
  }
}

// Hook for real-time notifications
export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<any[]>([])
  const { subscribe } = useCMSRealtime()

  useEffect(() => {
    const unsubscribe = subscribe('cms_event', (event: CMSEvent) => {
      // Create notification based on event
      const notification = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'info',
        title: `${event.entity} ${event.type}`,
        message: `${event.entity} ${event.entityId} was ${event.type}d`,
        timestamp: new Date(),
        read: false,
        event
      }

      setNotifications(prev => [notification, ...prev].slice(0, 50)) // Keep only last 50
    })

    return unsubscribe
  }, [subscribe])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    markAsRead,
    clearAll
  }
}

// Utility to trigger events from CMS services
export async function triggerCMSEvent(event: CMSEvent) {
  const postgresRealtime = PostgreSQLRealtime.getInstance()
  await postgresRealtime.triggerEvent(event)
}

// Import React hooks
import { useState, useEffect, useCallback, useRef } from 'react'
