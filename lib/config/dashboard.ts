/**
 * Dashboard Configuration
 * Centralized configuration for dashboard-related functionality
 */

export const DASHBOARD_CONFIG = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.shikshanam.com',
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
  },

  // Graphy API Configuration
  GRAPHY: {
    baseUrl: process.env.GRAPHY_API_URL || 'https://api.ongraphy.com',
    BASE_URL_V1: process.env.GRAPHY_API_URL || 'https://api.ongraphy.com',
    BASE_URL_V3: process.env.GRAPHY_API_URL || 'https://api.ongraphy.com',
    apiKey: process.env.GRAPHY_API_KEY || '',
    API_KEY: process.env.GRAPHY_API_KEY || '',
    SECRET_KEY: process.env.GRAPHY_SECRET_KEY || '',
    MID: process.env.GRAPHY_MID || '',
    timeout: 30000,
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // Dashboard Features
  features: {
    realTimeUpdates: true,
    analytics: true,
    recommendations: true,
    notifications: true,
  },

  // Performance Settings
  performance: {
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
    maxRetries: 3,
    debounceDelay: 300, // 300ms
  },

  // Cache Configuration
  CACHE: {
    STATIC_TTL: 60 * 60 * 1000, // 1 hour
    DYNAMIC_TTL: 5 * 60 * 1000, // 5 minutes
    USER_TTL: 30 * 60 * 1000, // 30 minutes
  },

  // Rate Limiting Configuration
  RATE_LIMIT: {
    GRAPHY_PER_MINUTE: 60,
    WINDOW_MS: 60 * 1000, // 1 minute
    MAX_REQUESTS: 100,
  },

  // UI Configuration
  ui: {
    itemsPerPage: 10,
    maxItemsPerPage: 50,
    defaultTheme: 'light',
    animations: true,
  },

  // Security Settings
  security: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
  },
} as const;

export type DashboardConfig = typeof DASHBOARD_CONFIG;
