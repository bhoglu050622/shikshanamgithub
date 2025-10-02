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
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon',
      },
    ],
    categories: ['education', 'lifestyle', 'productivity'],
    lang: 'en',
    dir: 'ltr',
  }
}
