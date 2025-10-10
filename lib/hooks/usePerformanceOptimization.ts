'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { getAnimationConfig } from '@/lib/performance'

/**
 * Hook for performance optimizations
 * Handles reduced motion preferences, lazy loading, and performance monitoring
 */
export function usePerformanceOptimization() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Get optimized animation config
  const getOptimizedAnimationConfig = useCallback(() => {
    return getAnimationConfig()
  }, [])

  // Debounced scroll handler for performance
  const useDebouncedScroll = useCallback((callback: () => void, delay: number = 100) => {
    let timeoutId: NodeJS.Timeout
    
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(callback, delay)
    }
  }, [])

  // Intersection Observer for lazy loading
  const createIntersectionObserver = useCallback((
    elementRef: React.RefObject<Element>,
    callback: (isIntersecting: boolean) => void,
    options: IntersectionObserverInit = {}
  ) => {
    if (!elementRef.current) return null

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting)
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
        ...options
      }
    )

    observer.observe(elementRef.current)
    return observer
  }, [])

  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string) => {
    if (!isClient) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }, [isClient])

  // Optimize images
  const optimizeImageLoading = useCallback((src: string) => {
    if (!isClient) return src

    // Add WebP format if supported
    if (src.includes('.jpg') || src.includes('.png')) {
      const webpSrc = src.replace(/\.(jpg|png)$/, '.webp')
      return webpSrc
    }

    return src
  }, [isClient])

  return {
    prefersReducedMotion,
    isClient,
    getOptimizedAnimationConfig,
    useDebouncedScroll,
    createIntersectionObserver,
    preloadResource,
    optimizeImageLoading
  }
}

/**
 * Hook for monitoring performance metrics
 */
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<{
    lcp?: number
    fid?: number
    cls?: number
  }>({})

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // Monitor First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const performanceEntry = entry as any
        const fid = performanceEntry.processingStart - performanceEntry.startTime
        setMetrics(prev => ({ ...prev, fid }))
      })
    }).observe({ entryTypes: ['first-input'] })

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        const layoutShiftEntry = entry as any
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value
        }
      })
      setMetrics(prev => ({ ...prev, cls: clsValue }))
    }).observe({ entryTypes: ['layout-shift'] })
  }, [])

  return metrics
}

/**
 * Hook for lazy loading components
 */
export function useLazyLoad(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, hasLoaded])

  return { ref, isVisible, hasLoaded }
}
