'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log to console for debugging (in production, you'd send to analytics)
        const metricData: any = {
          name: entry.name,
          startTime: entry.startTime,
          duration: entry.duration,
        }

        // Add type-specific properties if they exist
        if ('value' in entry) {
          metricData.value = (entry as any).value
        }
        if ('delta' in entry) {
          metricData.delta = (entry as any).delta
        }
        if ('id' in entry) {
          metricData.id = (entry as any).id
        }
        if ('navigationType' in entry) {
          metricData.navigationType = (entry as any).navigationType
        }

        console.log('Performance metric:', metricData)

        // You can send this data to your analytics service
        // Example: sendToAnalytics(entry)
      }
    })

    // Observe different types of performance entries
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      observer.observe({ entryTypes: ['measure', 'navigation'] })
    }

    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        const metrics = {
          // DNS lookup time
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          // TCP connection time
          tcp: navigation.connectEnd - navigation.connectStart,
          // Request time
          request: navigation.responseStart - navigation.requestStart,
          // Response time
          response: navigation.responseEnd - navigation.responseStart,
          // DOM processing time
          domProcessing: navigation.domComplete - navigation.domContentLoadedEventStart,
          // Total page load time
          total: navigation.loadEventEnd - navigation.fetchStart,
        }

        console.log('Page load metrics:', metrics)
        
        // Send to analytics
        // sendToAnalytics('page_load', metrics)
      }
    })

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) { // Log resources that take more than 1 second
          const resourceData: any = {
            name: entry.name,
            duration: entry.duration,
          }
          
          // Add transferSize if it exists (for PerformanceResourceTiming)
          if ('transferSize' in entry) {
            resourceData.size = (entry as any).transferSize
          }
          
          console.log('Slow resource:', resourceData)
        }
      }
    })

    try {
      resourceObserver.observe({ entryTypes: ['resource'] })
    } catch (e) {
      console.warn('Resource observer not supported')
    }

    // Cleanup
    return () => {
      observer.disconnect()
      resourceObserver.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}

// Function to send metrics to analytics (implement based on your analytics service)
function sendToAnalytics(eventName: string, data: any) {
  // Example implementation for Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      custom_parameter: data,
    })
  }

  // Example implementation for custom analytics
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ event: eventName, data }),
  // })
}
