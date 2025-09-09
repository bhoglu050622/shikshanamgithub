/**
 * Analytics Database Layer
 * Handles event storage and aggregation for analytics dashboard
 */

import { promises as fs } from 'fs'
import path from 'path'

// Event data model
export interface AnalyticsEvent {
  id?: string
  event_type: 'pageview' | 'outbound_click' | 'session_start' | 'session_end' | 'custom'
  timestamp: string
  url: string
  title?: string
  referrer?: string
  user_agent: string
  language?: string
  visitor_id?: string
  session_id?: string
  screen?: string
  additional?: Record<string, any>
  client_generated: boolean
  client_version?: string
  
  // Server-side enriched data
  ip_hash?: string
  country?: string
  os?: string
  browser?: string
  platform?: string
  received_at: string
}

// Aggregated data interfaces
export interface AnalyticsTotals {
  uniqueVisitors: number
  pageViews: number
  sessions: number
  bounceRate: number
  avgSessionDuration: number
  previousPeriod?: {
    uniqueVisitors: number
    pageViews: number
    sessions: number
    bounceRate: number
    avgSessionDuration: number
  }
}

export interface TimeseriesData {
  label: string // date
  value: number
}

export interface TopPage {
  url: string
  title?: string
  count: number
}

export interface Referrer {
  host: string
  count: number
}

export interface CountryData {
  country: string
  count: number
}

export interface OSBrowserData {
  os: Record<string, number>
  browsers: Record<string, number>
  platforms: Record<string, number>
}

export interface HeatmapData {
  weekday: number // 0-6 (Sunday-Saturday)
  hour: number // 0-23
  count: number
}

// In-memory storage for development (replace with database in production)
class AnalyticsDB {
  private events: AnalyticsEvent[] = []
  private dataFile = path.join(process.cwd(), 'analytics-data.json')

  constructor() {
    this.loadData()
  }

  private async loadData() {
    try {
      const data = await fs.readFile(this.dataFile, 'utf-8')
      this.events = JSON.parse(data)
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      this.events = []
    }
  }

  private async saveData() {
    try {
      await fs.writeFile(this.dataFile, JSON.stringify(this.events, null, 2))
    } catch (error) {
      console.error('Failed to save analytics data:', error)
    }
  }

  // Store events
  async storeEvent(event: Omit<AnalyticsEvent, 'id' | 'received_at'>): Promise<void> {
    const enrichedEvent: AnalyticsEvent = {
      ...event,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      received_at: new Date().toISOString(),
    }

    this.events.push(enrichedEvent)
    await this.saveData()
  }

  async storeEvents(events: Omit<AnalyticsEvent, 'id' | 'received_at'>[]): Promise<void> {
    const enrichedEvents = events.map(event => ({
      ...event,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      received_at: new Date().toISOString(),
    }))

    this.events.push(...enrichedEvents)
    await this.saveData()
  }

  // Helper to filter events by date range
  private filterEventsByDateRange(startDate: string, endDate: string): AnalyticsEvent[] {
    const start = new Date(startDate + 'T00:00:00.000Z')
    const end = new Date(endDate + 'T23:59:59.999Z')
    
    return this.events.filter(event => {
      const eventDate = new Date(event.timestamp)
      return eventDate >= start && eventDate <= end
    })
  }

  // Get totals with optional comparison
  async getTotals(startDate: string, endDate: string, compare = false): Promise<AnalyticsTotals> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    const pageviews = events.filter(e => e.event_type === 'pageview')
    
    // Calculate unique visitors
    const uniqueVisitors = new Set(
      events
        .filter(e => e.visitor_id)
        .map(e => e.visitor_id)
    ).size

    // Calculate sessions
    const sessionIds = new Set(
      events
        .filter(e => e.session_id)
        .map(e => e.session_id)
    )
    const sessions = sessionIds.size

    // Calculate bounce rate (sessions with only one pageview)
    let bouncedSessions = 0
    sessionIds.forEach(sessionId => {
      const sessionPageviews = pageviews.filter(e => e.session_id === sessionId)
      if (sessionPageviews.length === 1) {
        bouncedSessions++
      }
    })
    const bounceRate = sessions > 0 ? (bouncedSessions / sessions) * 100 : 0

    // Calculate average session duration
    const sessionDurations: number[] = []
    sessionIds.forEach(sessionId => {
      const sessionEvents = events
        .filter(e => e.session_id === sessionId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      
      if (sessionEvents.length > 1) {
        const duration = new Date(sessionEvents[sessionEvents.length - 1].timestamp).getTime() - 
                        new Date(sessionEvents[0].timestamp).getTime()
        sessionDurations.push(duration / 1000) // Convert to seconds
      }
    })
    
    const avgSessionDuration = sessionDurations.length > 0 
      ? sessionDurations.reduce((a, b) => a + b, 0) / sessionDurations.length 
      : 0

    const totals: AnalyticsTotals = {
      uniqueVisitors,
      pageViews: pageviews.length,
      sessions,
      bounceRate,
      avgSessionDuration
    }

    // Add comparison data if requested
    if (compare) {
      const daysDiff = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
      const compareStartDate = new Date(new Date(startDate).getTime() - daysDiff * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const compareEndDate = new Date(new Date(startDate).getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      
      const previousTotals = await this.getTotals(compareStartDate, compareEndDate, false)
      totals.previousPeriod = previousTotals
    }

    return totals
  }

  // Get timeseries data
  async getTimeseries(metric: 'pageViews' | 'uniqueVisitors' | 'sessions', interval: 'day' | 'hour', startDate: string, endDate: string): Promise<TimeseriesData[]> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    const data: Record<string, number> = {}

    // Generate all possible dates/hours in range
    const start = new Date(startDate)
    const end = new Date(endDate)
    const current = new Date(start)

    while (current <= end) {
      const key = interval === 'day' 
        ? current.toISOString().split('T')[0]
        : current.toISOString().substring(0, 13) + ':00:00.000Z'
      
      data[key] = 0
      
      if (interval === 'day') {
        current.setDate(current.getDate() + 1)
      } else {
        current.setHours(current.getHours() + 1)
      }
    }

    // Count events by time period
    events.forEach(event => {
      const eventDate = new Date(event.timestamp)
      const key = interval === 'day'
        ? eventDate.toISOString().split('T')[0]
        : eventDate.toISOString().substring(0, 13) + ':00:00.000Z'

      if (key in data) {
        switch (metric) {
          case 'pageViews':
            if (event.event_type === 'pageview') data[key]++
            break
          case 'uniqueVisitors':
            // This is simplified - in reality you'd need to track unique visitors per time period
            if (event.visitor_id) data[key]++
            break
          case 'sessions':
            // This is simplified - in reality you'd need to track unique sessions per time period
            if (event.session_id) data[key]++
            break
        }
      }
    })

    return Object.entries(data).map(([label, value]) => ({ label, value }))
  }

  // Get top pages
  async getTopPages(startDate: string, endDate: string, limit = 10): Promise<TopPage[]> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    const pageviews = events.filter(e => e.event_type === 'pageview')
    
    const pageCounts: Record<string, { count: number, title?: string }> = {}
    
    pageviews.forEach(event => {
      if (!pageCounts[event.url]) {
        pageCounts[event.url] = { count: 0, title: event.title }
      }
      pageCounts[event.url].count++
    })

    return Object.entries(pageCounts)
      .map(([url, data]) => ({ url, title: data.title, count: data.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  // Get referrers
  async getReferrers(startDate: string, endDate: string, limit = 10): Promise<Referrer[]> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    const pageviews = events.filter(e => e.event_type === 'pageview' && e.referrer)
    
    const referrerCounts: Record<string, number> = {}
    
    pageviews.forEach(event => {
      if (event.referrer) {
        try {
          const host = new URL(event.referrer).hostname
          referrerCounts[host] = (referrerCounts[host] || 0) + 1
        } catch {
          // Invalid URL, skip
        }
      }
    })

    return Object.entries(referrerCounts)
      .map(([host, count]) => ({ host, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  // Get OS/Browser data
  async getOSBrowsers(startDate: string, endDate: string): Promise<OSBrowserData> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    
    const os: Record<string, number> = {}
    const browsers: Record<string, number> = {}
    const platforms: Record<string, number> = {}

    events.forEach(event => {
      // This is simplified - in production you'd use a proper User-Agent parser
      if (event.os) os[event.os] = (os[event.os] || 0) + 1
      if (event.browser) browsers[event.browser] = (browsers[event.browser] || 0) + 1
      if (event.platform) platforms[event.platform] = (platforms[event.platform] || 0) + 1
    })

    return { os, browsers, platforms }
  }

  // Get countries
  async getCountries(startDate: string, endDate: string, limit = 20): Promise<CountryData[]> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    const countryCounts: Record<string, number> = {}

    events.forEach(event => {
      if (event.country) {
        countryCounts[event.country] = (countryCounts[event.country] || 0) + 1
      }
    })

    return Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  // Get heatmap data
  async getHeatmap(startDate: string, endDate: string): Promise<HeatmapData[]> {
    const events = this.filterEventsByDateRange(startDate, endDate)
    const pageviews = events.filter(e => e.event_type === 'pageview')
    
    const heatmapData: Record<string, number> = {}
    
    // Initialize all weekday/hour combinations
    for (let weekday = 0; weekday < 7; weekday++) {
      for (let hour = 0; hour < 24; hour++) {
        heatmapData[`${weekday}-${hour}`] = 0
      }
    }

    pageviews.forEach(event => {
      const date = new Date(event.timestamp)
      const weekday = date.getUTCDay()
      const hour = date.getUTCHours()
      const key = `${weekday}-${hour}`
      
      heatmapData[key]++
    })

    return Object.entries(heatmapData).map(([key, count]) => {
      const [weekday, hour] = key.split('-').map(Number)
      return { weekday, hour, count }
    })
  }

  // Get all events (for debugging/export)
  async getAllEvents(): Promise<AnalyticsEvent[]> {
    return this.events
  }

  // Clear old events (retention policy)
  async clearOldEvents(daysToKeep = 90): Promise<void> {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000)
    this.events = this.events.filter(event => new Date(event.timestamp) > cutoffDate)
    await this.saveData()
  }
}

// Singleton instance
export const analyticsDB = new AnalyticsDB()
