import { NextRequest, NextResponse } from 'next/server'
import { SEOManager } from '@/cms/lib/seo'

// GET /api/sitemap - Generate and return sitemap.xml
export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shikshanam.com'
    
    const entries = await SEOManager.generateSitemap(baseUrl)
    const xml = SEOManager.generateSitemapXML(entries)

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    )
  }
}
