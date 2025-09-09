/**
 * Analytics CSV Export API
 * Exports analytics data as CSV files
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyticsDB } from '@/lib/analytics-db'

function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'Bearer analytics-admin' || 
         request.headers.get('cookie')?.includes('analytics_dashboard_auth=authenticated') ||
         process.env.NODE_ENV === 'development'
}

function escapeCSV(value: any): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function arrayToCSV(headers: string[], rows: any[][]): string {
  const csvHeaders = headers.map(escapeCSV).join(',')
  const csvRows = rows.map(row => row.map(escapeCSV).join(','))
  return [csvHeaders, ...csvRows].join('\n')
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')
    const type = searchParams.get('type') as 'pages' | 'referrers' | 'events' | 'heatmap'

    if (!startDate || !endDate || !type) {
      return NextResponse.json(
        { error: 'start, end, and type parameters are required' },
        { status: 400 }
      )
    }

    if (!['pages', 'referrers', 'events', 'heatmap'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be pages, referrers, events, or heatmap' },
        { status: 400 }
      )
    }

    let csv = ''
    let filename = ''

    switch (type) {
      case 'pages': {
        const pages = await analyticsDB.getTopPages(startDate, endDate, 1000)
        const headers = ['URL', 'Title', 'Page Views']
        const rows = pages.map(page => [page.url, page.title || '', page.count])
        csv = arrayToCSV(headers, rows)
        filename = `pages-${startDate}-${endDate}.csv`
        break
      }

      case 'referrers': {
        const referrers = await analyticsDB.getReferrers(startDate, endDate, 1000)
        const headers = ['Referrer', 'Visits']
        const rows = referrers.map(ref => [ref.host, ref.count])
        csv = arrayToCSV(headers, rows)
        filename = `referrers-${startDate}-${endDate}.csv`
        break
      }

      case 'events': {
        // Export raw events (limited to prevent huge files)
        const events = await analyticsDB.getAllEvents()
        const filteredEvents = events.filter(event => {
          const eventDate = new Date(event.timestamp).toISOString().split('T')[0]
          return eventDate >= startDate && eventDate <= endDate
        }).slice(0, 10000) // Limit to 10k events

        const headers = [
          'Event Type', 'Timestamp', 'URL', 'Title', 'Referrer', 
          'Visitor ID', 'Session ID', 'OS', 'Browser', 'Platform'
        ]
        const rows = filteredEvents.map(event => [
          event.event_type,
          event.timestamp,
          event.url,
          event.title || '',
          event.referrer || '',
          event.visitor_id || '',
          event.session_id || '',
          event.os || '',
          event.browser || '',
          event.platform || ''
        ])
        csv = arrayToCSV(headers, rows)
        filename = `events-${startDate}-${endDate}.csv`
        break
      }

      case 'heatmap': {
        const heatmap = await analyticsDB.getHeatmap(startDate, endDate)
        const headers = ['Weekday', 'Hour', 'Page Views']
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const rows = heatmap.map(item => [
          weekdays[item.weekday],
          item.hour.toString().padStart(2, '0') + ':00',
          item.count
        ])
        csv = arrayToCSV(headers, rows)
        filename = `heatmap-${startDate}-${endDate}.csv`
        break
      }
    }

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error('Analytics CSV export error:', error)
    return NextResponse.json(
      { error: 'Failed to export CSV data' },
      { status: 500 }
    )
  }
}
