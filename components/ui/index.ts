/**
 * UI Components Barrel Export
 * Centralized exports for all UI components
 */

// Base UI Components
export { default as Button } from './button';
export { Input } from './input';
export { Badge, badgeVariants } from './badge';
export { ErrorBoundary } from './ErrorBoundary';

// Re-export types
export type { ButtonProps } from './button';
export type { InputProps } from './input';
export type { BadgeProps } from './badge';
