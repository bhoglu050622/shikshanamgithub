'use client'

import { useEffect } from 'react'
import { performanceConfig } from '@/lib/performance'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Monitor Core Web Vitals
    const monitorPerformance = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime
        
        if (lcp > performanceConfig.thresholds.LCP) {
          console.warn(`LCP is ${lcp}ms, threshold is ${performanceConfig.thresholds.LCP}ms`)
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const performanceEntry = entry as any
          const fid = performanceEntry.processingStart - performanceEntry.startTime
          if (fid > performanceConfig.thresholds.FID) {
            console.warn(`FID is ${fid}ms, threshold is ${performanceConfig.thresholds.FID}ms`)
          }
        })
      }).observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as any
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value
          }
        })
        
        if (clsValue > performanceConfig.thresholds.CLS) {
          console.warn(`CLS is ${clsValue}, threshold is ${performanceConfig.thresholds.CLS}`)
        }
      }).observe({ entryTypes: ['layout-shift'] })
    }

    // Start monitoring when page loads
    if (typeof window !== 'undefined') {
      monitorPerformance()
    }
  }, [])

  return null // This component doesn't render anything
}