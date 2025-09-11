/**
 * Hooks Barrel Export
 * Centralized exports for all custom React hooks
 */

// Authentication hooks
export { useAuth } from './useAuth';
export { useUser } from './useUser';

// Accessibility hooks
export { useAccessibility } from './useAccessibility';

// Performance hooks
export { usePerformance } from './usePerformance';
export { useRealTimeRecommendations } from './useRealTimeRecommendations';

// Re-export types (only export what exists)
export type { UseUserReturn } from './useUser';
export type { UsePerformanceReturn } from './usePerformance';
