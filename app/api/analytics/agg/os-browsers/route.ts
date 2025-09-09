/**
 * Analytics OS/Browsers API
 * Returns operating system and browser breakdown
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

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'start and end date parameters are required' },
        { status: 400 }
      )
    }

    const osBrowsers = await analyticsDB.getOSBrowsers(startDate, endDate)

    return NextResponse.json(osBrowsers)

  } catch (error) {
    console.error('Analytics OS/browsers API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch OS/browser data' },
      { status: 500 }
    )
  }
}
