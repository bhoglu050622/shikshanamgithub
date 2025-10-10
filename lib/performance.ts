/**
 * Performance Optimization Configuration
 * Centralized performance settings for the homepage
 */

// Animation preferences based on user's motion preferences
export const getAnimationConfig = () => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      duration: prefersReducedMotion ? 0 : 0.3,
      delay: prefersReducedMotion ? 0 : 0.1,
      ease: prefersReducedMotion ? 'linear' : 'easeOut'
    };
  }
  return { duration: 0.3, delay: 0.1, ease: 'easeOut' };
};

// Lazy loading configuration
export const lazyLoadConfig = {
  rootMargin: '50px 0px',
  threshold: 0.1,
  fallback: {
    height: '200px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  }
};

// Image optimization settings
export const imageOptimization = {
  quality: 75,
  format: 'webp',
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading: 'lazy',
  placeholder: 'blur'
};

// Bundle optimization
export const bundleOptimization = {
  // Critical components that should be loaded immediately
  critical: [
    'Hero',
    'Header',
    'Footer'
  ],
  // Non-critical components that can be lazy loaded
  nonCritical: [
    'AlignYourself',
    'Schools', 
    'MeetGurus',
    'CommunityPostsSection',
    'FoundersMission',
    'Contribute',
    'DownloadAppNew',
    'FAQ'
  ]
};

// Performance monitoring
export const performanceConfig = {
  // Core Web Vitals thresholds
  thresholds: {
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay
    CLS: 0.1   // Cumulative Layout Shift
  },
  // Performance metrics to track
  metrics: [
    'navigation',
    'paint',
    'layout-shift',
    'first-input',
    'largest-contentful-paint'
  ]
};

// Preload critical resources
export const preloadConfig = {
  fonts: [
    '/fonts/inter-var.woff2',
    '/fonts/nunito-sans-var.woff2'
  ],
  images: [
    '/images/hero-background.webp',
    '/images/logo.webp'
  ],
  scripts: [
    '/js/critical.js'
  ]
};

// Service Worker configuration
export const serviceWorkerConfig = {
  cacheName: 'shikshanam-v1',
  strategies: {
    images: 'cacheFirst',
    fonts: 'cacheFirst',
    api: 'networkFirst',
    pages: 'staleWhileRevalidate'
  }
};
