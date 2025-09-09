/**
 * Analytics Referrers API
 * Returns top referrer sources
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyticsDB } from '@/lib/analytics-db'

function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'Bearer analytics-admin' || 
         request.headers.get('cookie')?.includes('analytics_dashboard_auth=authenticated') ||
         process.env.NODE_ENV === 'development'
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
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'start and end date parameters are required' },
        { status: 400 }
      )
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'limit must be between 1 and 100' },
        { status: 400 }
      )
    }

    const referrers = await analyticsDB.getReferrers(startDate, endDate, limit)

    return NextResponse.json(referrers)

  } catch (error) {
    console.error('Analytics referrers API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referrers' },
      { status: 500 }
    )
  }
}
