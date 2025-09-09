/**
 * Analytics Timeseries API
 * Returns timeseries data for charts
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyticsDB } from '@/lib/analytics-db'

// Simple authentication check
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'Bearer analytics-admin' || 
         request.headers.get('cookie')?.includes('analytics_dashboard_auth=authenticated') ||
         process.env.NODE_ENV === 'development'
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric') as 'pageViews' | 'uniqueVisitors' | 'sessions'
    const interval = searchParams.get('interval') as 'day' | 'hour'
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')

    if (!metric || !interval || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'metric, interval, start, and end parameters are required' },
        { status: 400 }
      )
    }

    // Validate parameters
    if (!['pageViews', 'uniqueVisitors', 'sessions'].includes(metric)) {
      return NextResponse.json(
        { error: 'Invalid metric. Must be pageViews, uniqueVisitors, or sessions' },
        { status: 400 }
      )
    }

    if (!['day', 'hour'].includes(interval)) {
      return NextResponse.json(
        { error: 'Invalid interval. Must be day or hour' },
        { status: 400 }
      )
    }

    // Validate dates
    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    if (startDateObj > endDateObj) {
      return NextResponse.json(
        { error: 'Start date must be before end date' },
        { status: 400 }
      )
    }

    // Check if date range is reasonable for the interval
    const daysDiff = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24))
    
    if (interval === 'hour' && daysDiff > 7) {
      return NextResponse.json(
        { error: 'Hour interval is limited to 7 days maximum' },
        { status: 400 }
      )
    }

    if (interval === 'day' && daysDiff > 365) {
      return NextResponse.json(
        { error: 'Day interval is limited to 365 days maximum' },
        { status: 400 }
      )
    }

    const timeseries = await analyticsDB.getTimeseries(metric, interval, startDate, endDate)

    return NextResponse.json(timeseries)

  } catch (error) {
    console.error('Analytics timeseries API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timeseries data' },
      { status: 500 }
    )
  }
}
