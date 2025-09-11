import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
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

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
