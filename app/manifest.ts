import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shikshanam - Ancient Indian Knowledge Platform',
    short_name: 'Shikshanam',
    description: 'Unlock the timeless wisdom of Sanskrit, Darshanas, and Self-help through our comprehensive learning platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F4',
    theme_color: '#FF8A00',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'lifestyle', 'productivity'],
    lang: 'en',
    dir: 'ltr',
  }
}
