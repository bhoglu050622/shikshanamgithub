import { NextRequest, NextResponse } from 'next/server'

// GET /api/sitemap - Generate and return sitemap.xml
export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shikshanam.com'
    
    // Static sitemap entries for the frontend pages
    const entries = [
      { url: `${baseUrl}/`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
      { url: `${baseUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: `${baseUrl}/courses`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
      { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
      { url: `${baseUrl}/privacy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.5' },
      { url: `${baseUrl}/terms`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.5' },
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

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
