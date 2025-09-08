import { NextRequest, NextResponse } from 'next/server'

// Analytics event interface
interface AnalyticsEvent {
  event: string
  properties: {
    timestamp: string
    page_url?: string
    page_title?: string
    session_id?: string
    user_id?: string
    user_agent?: string
    [key: string]: any
  }
}

// In-memory storage for development (replace with database in production)
const analyticsData: AnalyticsEvent[] = []

export async function POST(request: NextRequest) {
  try {
    const eventData: AnalyticsEvent = await request.json()
    
    // Validate event data
    if (!eventData.event || !eventData.properties) {
      return NextResponse.json(
        { error: 'Invalid event data' },
        { status: 400 }
      )
    }

    // Add server-side properties
    const enrichedEvent: AnalyticsEvent = {
      ...eventData,
      properties: {
        ...eventData.properties,
        server_timestamp: new Date().toISOString(),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || eventData.properties.user_agent,
        referer: request.headers.get('referer'),
      }
    }

    // Store event (in production, save to database)
    analyticsData.push(enrichedEvent)

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', enrichedEvent)
    }

    // In production, you might want to:
    // 1. Save to database
    // 2. Send to external analytics services
    // 3. Process real-time analytics
    // 4. Trigger automated responses based on events

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics event' },
      { status: 500 }
    )
  }
}

// GET endpoint for retrieving analytics data (development only)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    )
  }

  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '100')
  const event = searchParams.get('event')

  let filteredData = analyticsData

  if (event) {
    filteredData = analyticsData.filter(item => item.event === event)
  }

  return NextResponse.json({
    events: filteredData.slice(-limit),
    total: filteredData.length,
    unique_events: [...new Set(analyticsData.map(item => item.event))],
  })
}
