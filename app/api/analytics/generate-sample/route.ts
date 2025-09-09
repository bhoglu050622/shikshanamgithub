/**
 * Generate Sample Analytics Data API
 * For development and testing purposes
 */

import { NextRequest, NextResponse } from 'next/server'
import { generateSampleData } from '@/lib/analytics-sample-data'

function isAuthenticated(request: NextRequest): boolean {
  // Only allow in development or with admin auth
  return process.env.NODE_ENV === 'development' || 
         request.headers.get('authorization') === 'Bearer analytics-admin' ||
         (request.headers.get('cookie')?.includes('analytics_dashboard_auth=authenticated') ?? false)
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Development only' },
        { status: 401 }
      )
    }

    const body = await request.json().catch(() => ({}))
    const days = Math.min(body.days || 30, 90) // Limit to 90 days max

    console.log(`Generating ${days} days of sample analytics data...`)
    await generateSampleData(days)

    return NextResponse.json({
      success: true,
      message: `Generated ${days} days of sample analytics data`,
      days
    })

  } catch (error) {
    console.error('Sample data generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate sample data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized - Development only' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: 'Sample data generator',
    usage: 'POST with { "days": 30 } to generate sample data',
    maxDays: 90,
    environment: process.env.NODE_ENV
  })
}
