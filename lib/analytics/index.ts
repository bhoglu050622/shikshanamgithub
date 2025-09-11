/**
 * Analytics Barrel Export
 * Centralized exports for all analytics utilities and components
 */

// Types and interfaces
export * from './types';

// Analytics service
export * from './analytics-service';

// Analytics provider and hooks
export * from './analytics-provider';

// Re-export commonly used items
export {
  AnalyticsService,
  AnalyticsConfig,
} from './analytics-service';

export {
  AnalyticsProvider,
  useAnalytics,
  usePageTracking,
  useEventTracking,
  useConversionTracking,
  usePerformanceTracking,
  useErrorTracking,
  TrackedButton,
  TrackedLink,
  TrackedForm,
} from './analytics-provider';
