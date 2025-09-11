/**
 * Performance Monitor Component
 * Tracks and reports performance metrics
 */

'use client';

import { useEffect, useState } from 'react';
import { debounce } from '@/lib/performance-utils';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  fmp: number | null; // First Meaningful Paint
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  reportToAnalytics?: boolean;
  logToConsole?: boolean;
}

export default function PerformanceMonitor({
  onMetricsUpdate,
  reportToAnalytics = true,
  logToConsole = false
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fmp: null
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Debounce metric collection to avoid excessive calls
    const debouncedCollectMetrics = debounce(async () => {
      const newMetrics: PerformanceMetrics = {
        fcp: null,
        lcp: null,
        fid: null,
        cls: null,
        ttfb: null,
        fmp: null
      };

      // Collect Web Vitals
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        try {
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              newMetrics.fcp = fcpEntry.startTime;
            }
          });
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (error) {
          console.warn('FCP observer failed:', error);
        }

        // Largest Contentful Paint
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              newMetrics.lcp = lastEntry.startTime;
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (error) {
          console.warn('LCP observer failed:', error);
        }

        // First Input Delay
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                newMetrics.fid = entry.processingStart - entry.startTime;
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.warn('FID observer failed:', error);
        }

        // Cumulative Layout Shift
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            newMetrics.cls = clsValue;
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (error) {
          console.warn('CLS observer failed:', error);
        }
      }

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        newMetrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // First Meaningful Paint (approximation)
      const paintEntries = performance.getEntriesByType('paint');
      const fmpEntry = paintEntries.find(entry => entry.name === 'first-meaningful-paint');
      if (fmpEntry) {
        newMetrics.fmp = fmpEntry.startTime;
      }

      setMetrics(newMetrics);
      onMetricsUpdate?.(newMetrics);

      if (logToConsole) {
        console.log('Performance Metrics:', newMetrics);
      }

      if (reportToAnalytics) {
        reportMetrics(newMetrics);
      }
    }, 1000); // Debounce by 1 second

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      debouncedCollectMetrics();
    } else {
      window.addEventListener('load', debouncedCollectMetrics);
    }

    // Collect metrics periodically (less frequently)
    const interval = setInterval(debouncedCollectMetrics, 60000); // Every 60 seconds

    return () => {
      window.removeEventListener('load', debouncedCollectMetrics);
      clearInterval(interval);
    };
  }, [onMetricsUpdate, reportToAnalytics, logToConsole]);

  // Report metrics to analytics
  const reportMetrics = (metrics: PerformanceMetrics) => {
    try {
      // Report to Google Analytics if available
      if (typeof window !== 'undefined' && typeof (window as any).gtag !== 'undefined') {
        const gtag = (window as any).gtag;
        if (metrics.fcp) gtag('event', 'web_vitals', { name: 'FCP', value: Math.round(metrics.fcp) });
        if (metrics.lcp) gtag('event', 'web_vitals', { name: 'LCP', value: Math.round(metrics.lcp) });
        if (metrics.fid) gtag('event', 'web_vitals', { name: 'FID', value: Math.round(metrics.fid) });
        if (metrics.cls) gtag('event', 'web_vitals', { name: 'CLS', value: Math.round(metrics.cls * 1000) });
        if (metrics.ttfb) gtag('event', 'web_vitals', { name: 'TTFB', value: Math.round(metrics.ttfb) });
      }

    } catch (error) {
      console.warn('Error reporting performance metrics:', error);
    }
  };

  // Performance score calculation
  const calculateScore = (): number => {
    let score = 100;
    
    // FCP scoring (good: <1.8s, needs improvement: 1.8-3s, poor: >3s)
    if (metrics.fcp) {
      if (metrics.fcp > 3000) score -= 30;
      else if (metrics.fcp > 1800) score -= 15;
    }
    
    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (metrics.lcp) {
      if (metrics.lcp > 4000) score -= 30;
      else if (metrics.lcp > 2500) score -= 15;
    }
    
    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (metrics.fid) {
      if (metrics.fid > 300) score -= 20;
      else if (metrics.fid > 100) score -= 10;
    }
    
    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.cls) {
      if (metrics.cls > 0.25) score -= 20;
      else if (metrics.cls > 0.1) score -= 10;
    }
    
    return Math.max(0, score);
  };

  const score = calculateScore();

  return (
    <div className="performance-monitor">
      {/* This component doesn't render anything visible by default */}
      {/* You can uncomment the following to show performance metrics in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs font-mono z-50">
          <div className="mb-2 font-bold">Performance Score: {score}/100</div>
          <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}</div>
          <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}</div>
          <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'N/A'}</div>
          <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}</div>
          <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  /**
   * Preload critical resources
   */
  preloadResource(href: string, as: string, type?: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  },

  /**
   * Prefetch resources for next page
   */
  prefetchResource(href: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  /**
   * Defer non-critical JavaScript
   */
  deferScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  },

  /**
   * Optimize images
   */
  optimizeImage(src: string, width?: number, height?: number, quality = 75): string {
    // This would typically use an image optimization service
    // For now, return the original src
    return src;
  },

  /**
   * Check if connection is slow
   */
  isSlowConnection(): boolean {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
    }
    return false;
  },

  /**
   * Get connection type
   */
  getConnectionType(): string {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }
};