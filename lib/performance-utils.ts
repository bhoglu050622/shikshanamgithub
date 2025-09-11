/**
 * Performance optimization utilities for Shikshanam
 * Provides lazy loading, code splitting, and performance monitoring helpers
 */

import React, { lazy, ComponentType } from 'react';
import dynamic from 'next/dynamic';

/**
 * Lazy load components with loading fallback
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  return lazy(importFunc);
}

/**
 * Dynamic imports for Next.js with loading states
 */
export const createDynamicComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    loading?: () => React.ReactElement;
    ssr?: boolean;
  }
) => {
  return dynamic(importFunc, {
    loading: options?.loading || (() => React.createElement('div', null, 'Loading...')),
    ssr: options?.ssr ?? true,
  });
};

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
}

/**
 * Prefetch resources for next page
 */
export function prefetchResource(href: string): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Defer non-critical JavaScript
 */
export function deferScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Check if connection is slow
 */
export function isSlowConnection(): boolean {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return false;
  }
  
  const connection = (navigator as any).connection;
  return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
}

/**
 * Get connection type
 */
export function getConnectionType(): string {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }
  
  const connection = (navigator as any).connection;
  return connection.effectiveType || 'unknown';
}

/**
 * Optimize images based on connection speed
 */
export function getOptimizedImageSrc(
  src: string, 
  width?: number, 
  height?: number, 
  quality = 75
): string {
  if (typeof window === 'undefined') return src;
  
  const isSlow = isSlowConnection();
  const optimizedQuality = isSlow ? Math.max(50, quality - 25) : quality;
  
  // This would typically use an image optimization service
  // For now, return the original src with quality hint
  return `${src}?q=${optimizedQuality}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`;
}

/**
 * Performance monitoring utilities
 */
export const performanceUtils = {
  /**
   * Measure function execution time
   */
  measureTime<T>(fn: () => T, label: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${label}: ${end - start}ms`);
    return result;
  },

  /**
   * Measure async function execution time
   */
  async measureTimeAsync<T>(fn: () => Promise<T>, label: string): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    console.log(`${label}: ${end - start}ms`);
    return result;
  },

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    if (typeof window === 'undefined') return null;
    
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    return {
      ttfb: navigation ? navigation.responseStart - navigation.requestStart : null,
      fcp: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || null,
      lcp: null, // Would need to be measured with PerformanceObserver
      fid: null, // Would need to be measured with PerformanceObserver
      cls: null, // Would need to be measured with PerformanceObserver
    };
  },
};

/**
 * Intersection Observer for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
