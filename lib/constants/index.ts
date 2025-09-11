/**
 * Constants Barrel Export
 * Centralized exports for all application constants
 */

// Route constants
export { ROUTES, generateRoutes, NAVIGATION_GROUPS } from '../routes';
export type { NavLink, CTAAction } from '../routes';

// API constants
export { API_ENDPOINTS, API_CONFIG } from './api';
export type { ApiEndpoint, ApiConfig } from './api';

// App constants
export { APP_CONFIG, FEATURE_FLAGS } from './app';
export type { AppConfig, FeatureFlags } from './app';

// UI constants
export { UI_CONSTANTS, BREAKPOINTS, COLORS } from './ui';
export type { UIConstants, Breakpoints, Colors } from './ui';
