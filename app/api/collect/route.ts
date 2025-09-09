/**
 * Analytics Collection API
 * Receives and processes analytics events from clients
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyticsDB, type AnalyticsEvent } from '@/lib/analytics-db'

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'
  return ip
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(key)

  if (!limit) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  limit.count++
  return true
}

// User-Agent parsing (simplified)
function parseUserAgent(userAgent: string): { os?: string; browser?: string; platform?: string } {
  const result: { os?: string; browser?: string; platform?: string } = {}
  
  // OS detection
  if (userAgent.includes('Windows')) result.os = 'Windows'
  else if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS X')) result.os = 'macOS'
  else if (userAgent.includes('Linux')) result.os = 'Linux'
  else if (userAgent.includes('Android')) result.os = 'Android'
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) result.os = 'iOS'

  // Browser detection
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) result.browser = 'Chrome'
  else if (userAgent.includes('Firefox')) result.browser = 'Firefox'
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) result.browser = 'Safari'
  else if (userAgent.includes('Edg')) result.browser = 'Edge'

  // Platform detection
  if (userAgent.includes('Mobile')) result.platform = 'Mobile'
  else if (userAgent.includes('Tablet')) result.platform = 'Tablet'
  else result.platform = 'Desktop'

  return result
}

// Hash IP address for privacy
function hashIP(ip: string): string {
  // Simple hash function - in production use proper crypto
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(36)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Handle both single event and batch
    const events = Array.isArray(body.events) ? body.events : [body]

    // Validate and enrich events
    const enrichedEvents: Omit<AnalyticsEvent, 'id' | 'received_at'>[] = []

    for (const event of events) {
      // Basic validation
      if (!event.event_type || !event.timestamp || !event.url) {
        console.warn('Invalid event data:', event)
        continue
      }

      // Get client info
      const userAgent = request.headers.get('user-agent') || event.user_agent || ''
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                 request.headers.get('x-real-ip') || 
                 'unknown'
      
      // Parse user agent
      const uaInfo = parseUserAgent(userAgent)

      // Create enriched event
      const enrichedEvent: Omit<AnalyticsEvent, 'id' | 'received_at'> = {
        event_type: event.event_type,
        timestamp: event.timestamp,
        url: event.url,
        title: event.title,
        referrer: event.referrer || request.headers.get('referer'),
        user_agent: userAgent,
        language: event.language,
        visitor_id: event.visitor_id,
        session_id: event.session_id,
        screen: event.screen,
        additional: event.additional || {},
        client_generated: event.client_generated || true,
        client_version: event.client_version,
        
        // Server-side enriched data
        ip_hash: hashIP(ip),
        country: undefined, // TODO: Add GeoIP lookup
        os: uaInfo.os,
        browser: uaInfo.browser,
        platform: uaInfo.platform,
      }

      enrichedEvents.push(enrichedEvent)
    }

    if (enrichedEvents.length === 0) {
      return NextResponse.json(
        { error: 'No valid events to process' },
        { status: 400 }
      )
    }

    // Store events
    if (enrichedEvents.length === 1) {
      await analyticsDB.storeEvent(enrichedEvents[0])
    } else {
      await analyticsDB.storeEvents(enrichedEvents)
    }

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Stored ${enrichedEvents.length} analytics events`)
    }

    return NextResponse.json({ 
      success: true, 
      processed: enrichedEvents.length 
    })

  } catch (error) {
    console.error('Analytics collection error:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics events' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    rateLimit: {
      window: RATE_LIMIT_WINDOW,
      maxRequests: RATE_LIMIT_MAX_REQUESTS
    }
  })
}
