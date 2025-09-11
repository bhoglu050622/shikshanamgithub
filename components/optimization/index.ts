/**
 * Optimization Components Barrel Export
 * Centralized exports for all optimization components
 */

// Performance Components
export { default as PerformanceMonitor } from './PerformanceMonitor';
export { default as LazyLoader } from './LazyLoader';
export { default as LazyImage } from './LazyImage';
export { default as OptimizedImage } from './OptimizedImage';
export { default as FontPreloader } from './FontPreloader';

// Re-export types (only export what exists)
// Note: Types are defined as interfaces, not exported types
