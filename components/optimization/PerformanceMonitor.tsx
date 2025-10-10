'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and client-side
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') return

    try {
      // Monitor Core Web Vitals with error handling
      const monitorPerformance = () => {
        if (typeof PerformanceObserver === 'undefined') return

        // Largest Contentful Paint (LCP)
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry && typeof lastEntry.startTime === 'number') {
              const lcp = lastEntry.startTime
              console.log(`LCP measured: ${lcp}ms`)
            }
          }).observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (error) {
          console.warn('Failed to monitor LCP:', error)
        }

        // First Input Delay (FID)
        try {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              if (entry && typeof (entry as any).processingStart === 'number' && typeof (entry as any).startTime === 'number') {
                const performanceEntry = entry as any
                const fid = performanceEntry.processingStart - performanceEntry.startTime
                console.log(`FID measured: ${fid}ms`)
              }
            })
          }).observe({ entryTypes: ['first-input'] })
        } catch (error) {
          console.warn('Failed to monitor FID:', error)
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              if (entry && typeof (entry as any).value === 'number') {
                const layoutShiftEntry = entry as any
                if (!layoutShiftEntry.hadRecentInput) {
                  clsValue += layoutShiftEntry.value
                }
              }
            })
            console.log(`CLS measured: ${clsValue}`)
          }).observe({ entryTypes: ['layout-shift'] })
        } catch (error) {
          console.warn('Failed to monitor CLS:', error)
        }
      }

      // Start monitoring when page loads
      monitorPerformance()
    } catch (error) {
      console.warn('Performance monitoring failed:', error)
    }
  }, [])

  return null // This component doesn't render anything
}