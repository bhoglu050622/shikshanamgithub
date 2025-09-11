/**
 * Performance Hook
 * Provides performance monitoring and optimization utilities
 */

import { useState, useEffect, useCallback } from 'react';

export interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
  fmp: number | null; // First Meaningful Paint
}

export interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  getConnectionInfo: () => ConnectionInfo | null;
  isSlowConnection: () => boolean;
}

export interface ConnectionInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export function usePerformance(): UsePerformanceReturn {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fmp: null,
  });
  const [isMonitoring, setIsMonitoring] = useState(false);

  const collectMetrics = useCallback(() => {
    if (typeof window === 'undefined') return;

    const newMetrics: PerformanceMetrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
      fmp: null,
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
          fcpObserver.disconnect();
        });
        fcpObserver.observe({ type: 'paint', buffered: true });
      } catch (e) {
        console.warn('FCP Observer failed:', e);
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            newMetrics.lcp = lastEntry.startTime;
          }
          lcpObserver.disconnect();
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('LCP Observer failed:', e);
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fidEntry = entries[0];
          if (fidEntry) {
            newMetrics.fid = fidEntry.startTime;
          }
          fidObserver.disconnect();
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('FID Observer failed:', e);
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let cls = 0;
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as any; // Type assertion for layout shift entry
            if (!layoutShiftEntry.hadRecentInput) {
              cls += layoutShiftEntry.value;
            }
          }
          newMetrics.cls = cls;
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('CLS Observer failed:', e);
      }
    }

    // Time to First Byte (TTFB)
    if (window.performance && window.performance.timing) {
      newMetrics.ttfb = window.performance.timing.responseStart - window.performance.timing.navigationStart;
    }

    // First Meaningful Paint (Approximation)
    const paintEntries = performance.getEntriesByType('paint');
    const fmpEntry = paintEntries.find(entry => entry.name === 'first-meaningful-paint');
    if (fmpEntry) {
      newMetrics.fmp = fmpEntry.startTime;
    }

    setMetrics(newMetrics);
  }, []);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    collectMetrics();
  }, [collectMetrics]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  const getConnectionInfo = useCallback((): ConnectionInfo | null => {
    if (typeof window === 'undefined' || !('connection' in navigator)) {
      return null;
    }

    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false,
    };
  }, []);

  const isSlowConnection = useCallback((): boolean => {
    const connectionInfo = getConnectionInfo();
    if (!connectionInfo) return false;

    return (
      connectionInfo.effectiveType === 'slow-2g' ||
      connectionInfo.effectiveType === '2g' ||
      connectionInfo.downlink < 1.5 ||
      connectionInfo.rtt > 2000
    );
  }, [getConnectionInfo]);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(collectMetrics, 60000); // Every 60 seconds
      return () => clearInterval(interval);
    }
  }, [isMonitoring, collectMetrics]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    getConnectionInfo,
    isSlowConnection,
  };
}
