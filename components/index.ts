/**
 * Components Barrel Export
 * Centralized exports for all components
 */

// UI Components
export * from './ui';

// Accessibility Components
export * from './accessibility';

// Optimization Components
export * from './optimization';

// Layout Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as ErrorBoundary } from './ErrorBoundary';

// Auth Components - Removed for frontend-only version

// Navigation Components
export { default as MegaMenu } from './navigation/MegaMenu';
export { default as MobileDrawer } from './navigation/MobileDrawer';

// 3D Components
import React from 'react';

// Lazy load 3D components for better performance
export const Lotus3D = React.lazy(() => import('./3d/Lotus3D'));
export const Yantra3D = React.lazy(() => import('./3d/Yantra3D'));
export const DynamicLotus3D = React.lazy(() => import('./3d/DynamicLotus3D'));
export const DynamicYantra3D = React.lazy(() => import('./3d/DynamicYantra3D'));

// Ornament Components
export { default as GlyphParticles } from './ornaments/GlyphParticles';
export { default as IndianPatterns } from './ornaments/IndianPatterns';
export { default as Mandala } from './ornaments/Mandala';
export { default as PeacockFeather } from './ornaments/PeacockFeather';
export { default as Rangoli } from './ornaments/Rangoli';
export { default as SectionDivider } from './ornaments/SectionDivider';

// Package Components (only export what exists)
// Note: Package components are not yet implemented

// Motion Components
export { default as MotionWrapper } from './motion/MotionWrapper';

// Theme Components
export { default as ThemeToggle } from './ThemeToggle';

// Other Components
export { default as ClientServiceWorker } from './ClientServiceWorker';
