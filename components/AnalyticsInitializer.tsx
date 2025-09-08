'use client'

import { useEffect } from 'react'
import { initAnalytics, trackPageView } from '@/lib/analytics'
import { usePathname } from 'next/navigation'

export default function AnalyticsInitializer() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize analytics
    initAnalytics({
      enabled: process.env.NODE_ENV === 'production',
      debug: process.env.NODE_ENV === 'development',
    })
  }, [])

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(pathname, document.title)
    }
  }, [pathname])

  return null
}
