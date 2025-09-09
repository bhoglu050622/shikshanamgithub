/**
 * Sample Analytics Data Generator
 * Creates realistic test data for the analytics dashboard
 */

import { analyticsDB, type AnalyticsEvent } from './analytics-db'

// Sample data configuration
const SAMPLE_CONFIG = {
  DAYS_TO_GENERATE: 30,
  EVENTS_PER_DAY: { min: 50, max: 200 },
  UNIQUE_VISITORS_PER_DAY: { min: 20, max: 80 },
  PAGES: [
    { url: '/', title: 'Home', weight: 0.3 },
    { url: '/courses', title: 'Courses', weight: 0.2 },
    { url: '/packages', title: 'Packages', weight: 0.15 },
    { url: '/about', title: 'About Us', weight: 0.1 },
    { url: '/courses/yoga-darshan', title: 'Yoga Darshan Course', weight: 0.08 },
    { url: '/courses/samkhya-darshan', title: 'Samkhya Darshan Course', weight: 0.07 },
    { url: '/contact', title: 'Contact', weight: 0.05 },
    { url: '/dashboard', title: 'Dashboard', weight: 0.03 },
    { url: '/help', title: 'Help', weight: 0.02 },
  ],
  REFERRERS: [
    { host: 'google.com', weight: 0.4 },
    { host: 'facebook.com', weight: 0.15 },
    { host: 'twitter.com', weight: 0.1 },
    { host: 'linkedin.com', weight: 0.08 },
    { host: 'youtube.com', weight: 0.07 },
    { host: 'reddit.com', weight: 0.05 },
    { host: 'medium.com', weight: 0.03 },
    { host: 'quora.com', weight: 0.02 },
    { host: 'direct', weight: 0.1 }, // Direct traffic
  ],
  OS: [
    { name: 'Windows', weight: 0.45 },
    { name: 'macOS', weight: 0.25 },
    { name: 'Android', weight: 0.15 },
    { name: 'iOS', weight: 0.1 },
    { name: 'Linux', weight: 0.05 },
  ],
  BROWSERS: [
    { name: 'Chrome', weight: 0.6 },
    { name: 'Safari', weight: 0.2 },
    { name: 'Firefox', weight: 0.1 },
    { name: 'Edge', weight: 0.08 },
    { name: 'Opera', weight: 0.02 },
  ],
  PLATFORMS: [
    { name: 'Desktop', weight: 0.6 },
    { name: 'Mobile', weight: 0.35 },
    { name: 'Tablet', weight: 0.05 },
  ],
  COUNTRIES: [
    { name: 'India', weight: 0.4 },
    { name: 'United States', weight: 0.2 },
    { name: 'United Kingdom', weight: 0.1 },
    { name: 'Canada', weight: 0.08 },
    { name: 'Australia', weight: 0.07 },
    { name: 'Germany', weight: 0.05 },
    { name: 'France', weight: 0.03 },
    { name: 'Japan', weight: 0.03 },
    { name: 'Brazil', weight: 0.02 },
    { name: 'Netherlands', weight: 0.02 },
  ],
}

// Utility functions
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function weightedRandom<T>(items: { weight: number; [key: string]: any }[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight
  
  for (const item of items) {
    random -= item.weight
    if (random <= 0) {
      return item as T
    }
  }
  
  return items[items.length - 1] as T
}

function generateVisitorId(): string {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function hashIP(visitorId: string): string {
  // Simple hash based on visitor ID for consistent IP hashing
  let hash = 0
  for (let i = 0; i < visitorId.length; i++) {
    const char = visitorId.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

// Activity patterns (more activity during certain hours)
function getHourlyMultiplier(hour: number): number {
  // Peak activity: 9-11 AM (1.5x), 2-4 PM (1.3x), 7-9 PM (1.2x)
  if (hour >= 9 && hour <= 11) return 1.5
  if (hour >= 14 && hour <= 16) return 1.3
  if (hour >= 19 && hour <= 21) return 1.2
  if (hour >= 0 && hour <= 6) return 0.3 // Low activity at night
  return 1.0
}

function getWeekdayMultiplier(weekday: number): number {
  // Monday=1, Sunday=0. Lower activity on weekends
  if (weekday === 0 || weekday === 6) return 0.7 // Weekend
  if (weekday >= 2 && weekday <= 4) return 1.2 // Tue-Thu peak
  return 1.0 // Mon, Fri normal
}

export async function generateSampleData(days: number = SAMPLE_CONFIG.DAYS_TO_GENERATE): Promise<void> {
  console.log(`Generating ${days} days of sample analytics data...`)
  
  const events: Omit<AnalyticsEvent, 'id' | 'received_at'>[] = []
  const visitors: Map<string, { sessions: string[], firstSeen: Date }> = new Map()
  
  // Generate data for each day
  for (let dayOffset = days - 1; dayOffset >= 0; dayOffset--) {
    const date = new Date()
    date.setDate(date.getDate() - dayOffset)
    date.setHours(0, 0, 0, 0)
    
    const weekdayMultiplier = getWeekdayMultiplier(date.getDay())
    const baseEventsForDay = randomBetween(
      SAMPLE_CONFIG.EVENTS_PER_DAY.min,
      SAMPLE_CONFIG.EVENTS_PER_DAY.max
    )
    const eventsForDay = Math.floor(baseEventsForDay * weekdayMultiplier)
    
    // Generate unique visitors for this day
    const dailyVisitors: string[] = []
    const numVisitors = randomBetween(
      SAMPLE_CONFIG.UNIQUE_VISITORS_PER_DAY.min,
      SAMPLE_CONFIG.UNIQUE_VISITORS_PER_DAY.max
    )
    
    for (let i = 0; i < numVisitors; i++) {
      const visitorId = generateVisitorId()
      dailyVisitors.push(visitorId)
      
      if (!visitors.has(visitorId)) {
        visitors.set(visitorId, { sessions: [], firstSeen: new Date(date) })
      }
    }
    
    // Generate events throughout the day
    for (let eventIndex = 0; eventIndex < eventsForDay; eventIndex++) {
      // Random hour with activity pattern
      const hour = randomBetween(0, 23)
      const hourMultiplier = getHourlyMultiplier(hour)
      
      // Skip some events based on hour multiplier
      if (Math.random() > hourMultiplier) continue
      
      const minute = randomBetween(0, 59)
      const second = randomBetween(0, 59)
      
      const eventTime = new Date(date)
      eventTime.setHours(hour, minute, second)
      
      // Select visitor (weighted towards returning visitors)
      const isReturning = Math.random() < 0.3 && visitors.size > 0
      let visitorId: string
      
      if (isReturning) {
        const existingVisitors = Array.from(visitors.keys())
        visitorId = existingVisitors[randomBetween(0, existingVisitors.length - 1)]
      } else {
        visitorId = dailyVisitors[randomBetween(0, dailyVisitors.length - 1)]
      }
      
      const visitor = visitors.get(visitorId)!
      
      // Session management
      let sessionId = visitor.sessions[visitor.sessions.length - 1]
      const lastSessionTime = visitor.sessions.length > 0 ? 
        events.filter(e => e.visitor_id === visitorId && e.session_id === sessionId)
          .map(e => new Date(e.timestamp))
          .sort((a, b) => b.getTime() - a.getTime())[0] : null
      
      // Create new session if needed (30+ minutes gap or no previous session)
      if (!sessionId || (lastSessionTime && (eventTime.getTime() - lastSessionTime.getTime()) > 30 * 60 * 1000)) {
        sessionId = generateSessionId()
        visitor.sessions.push(sessionId)
        
        // Track session start
        events.push({
          event_type: 'session_start',
          timestamp: eventTime.toISOString(),
          url: '/',
          user_agent: 'Mozilla/5.0 (Sample Data Generator)',
          visitor_id: visitorId,
          session_id: sessionId,
          client_generated: false,
          ip_hash: hashIP(visitorId),
          ...generateDeviceInfo(),
          additional: { generated: true }
        })
      }
      
      // Generate page view
      const page = weightedRandom<typeof SAMPLE_CONFIG.PAGES[0]>(SAMPLE_CONFIG.PAGES)
      const referrer = weightedRandom<typeof SAMPLE_CONFIG.REFERRERS[0]>(SAMPLE_CONFIG.REFERRERS)
      
      const event: Omit<AnalyticsEvent, 'id' | 'received_at'> = {
        event_type: 'pageview',
        timestamp: eventTime.toISOString(),
        url: page.url,
        title: page.title,
        referrer: referrer.host === 'direct' ? undefined : `https://${referrer.host}/`,
        user_agent: 'Mozilla/5.0 (Sample Data Generator)',
        language: 'en-US',
        visitor_id: visitorId,
        session_id: sessionId,
        screen: `${randomBetween(1024, 1920)}x${randomBetween(768, 1080)}`,
        client_generated: false,
        ip_hash: hashIP(visitorId),
        ...generateDeviceInfo(),
        additional: { generated: true }
      }
      
      events.push(event)
      
      // Occasionally generate outbound clicks
      if (Math.random() < 0.1) {
        const outboundEvent: Omit<AnalyticsEvent, 'id' | 'received_at'> = {
          ...event,
          event_type: 'outbound_click',
          timestamp: new Date(eventTime.getTime() + randomBetween(1000, 30000)).toISOString(),
          additional: {
            generated: true,
            outbound_href: 'https://external-site.com/',
            link_text: 'External Link'
          }
        }
        events.push(outboundEvent)
      }
    }
  }
  
  // Store all events
  console.log(`Storing ${events.length} sample events...`)
  await analyticsDB.storeEvents(events)
  
  console.log('Sample data generation complete!')
  console.log(`Generated data for ${days} days:`)
  console.log(`- Total events: ${events.length}`)
  console.log(`- Unique visitors: ${visitors.size}`)
  console.log(`- Total sessions: ${Array.from(visitors.values()).reduce((sum, v) => sum + v.sessions.length, 0)}`)
}

function generateDeviceInfo() {
  const os = weightedRandom<typeof SAMPLE_CONFIG.OS[0]>(SAMPLE_CONFIG.OS)
  const browser = weightedRandom<typeof SAMPLE_CONFIG.BROWSERS[0]>(SAMPLE_CONFIG.BROWSERS)
  const platform = weightedRandom<typeof SAMPLE_CONFIG.PLATFORMS[0]>(SAMPLE_CONFIG.PLATFORMS)
  const country = weightedRandom<typeof SAMPLE_CONFIG.COUNTRIES[0]>(SAMPLE_CONFIG.COUNTRIES)
  
  return {
    os: os.name,
    browser: browser.name,
    platform: platform.name,
    country: country.name,
  }
}

// Development helper - can be called from browser console
if (typeof window !== 'undefined') {
  (window as any).generateSampleAnalyticsData = generateSampleData
}
