import { NextRequest, NextResponse } from 'next/server'
import { SEOManager } from '@/cms/lib/seo'

// GET /api/robots - Generate and return robots.txt
export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shikshanam.com'
    
    const robotsTxt = SEOManager.generateRobotsTxt(baseUrl)

    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    })
  } catch (error) {
    console.error('Robots.txt generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate robots.txt' },
      { status: 500 }
    )
  }
}
