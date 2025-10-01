import { NextResponse } from 'next/server'
import { MetadataRoute } from 'next'

export async function GET(): Promise<NextResponse<MetadataRoute.Manifest>> {
  const manifest: MetadataRoute.Manifest = {
    name: 'Shikshanam - Ancient Indian Knowledge Platform',
    short_name: 'Shikshanam',
    description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help through our comprehensive learning platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F4',
    theme_color: '#FF8A00',
    orientation: 'portrait',
    icons: [],
    categories: ['education', 'lifestyle', 'productivity'],
    lang: 'en',
    dir: 'ltr',
  }

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  })
}
