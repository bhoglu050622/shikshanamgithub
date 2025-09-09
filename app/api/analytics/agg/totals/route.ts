/**
 * Analytics Totals API
 * Returns aggregated KPI data
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyticsDB } from '@/lib/analytics-db'

// Simple authentication check
function isAuthenticated(request: NextRequest): boolean {
  // For development, we'll use a simple check
  // In production, implement proper authentication
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
    const startDate = searchParams.get('start')
    const endDate = searchParams.get('end')
    const compare = searchParams.get('compare') === 'previous'

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'start and end date parameters are required' },
        { status: 400 }
      )
    }

    // Validate date format
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

    const totals = await analyticsDB.getTotals(startDate, endDate, compare)

    return NextResponse.json(totals)

  } catch (error) {
    console.error('Analytics totals API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics totals' },
      { status: 500 }
    )
  }
}
