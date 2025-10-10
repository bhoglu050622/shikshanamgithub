/**
 * Accessibility Components Barrel Export
 * Centralized exports for all accessibility components
 */

// Core Components
export { AccessibilityProvider, useAccessibilityContext } from './AccessibilityProvider';
export { AccessibleButton } from './AccessibleButton';
export { AccessibleForm, AccessibleField, useFormContext } from './AccessibleForm';
export { AccessibleModal, AccessibleModalFooter } from './AccessibleModal';
export { AccessibilityToolbar } from './AccessibilityToolbar';

// Re-export types (only export what exists)
// Note: Types are defined as interfaces, not exported types
