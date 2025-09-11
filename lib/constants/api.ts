/**
 * API Constants
 * Centralized API endpoint and configuration constants
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/email',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    CHANGE_PASSWORD: '/api/auth/change-password',
    REGISTER: '/api/auth/email',
  },
  
  // Admin
  ADMIN: {
    USERS: '/api/admin/users',
    ANALYTICS: '/api/admin/analytics',
    SETTINGS: '/api/admin/settings',
  },
  
  // Public
  PUBLIC: {
    HEALTH: '/api/health-check',
    ROBOTS: '/api/robots',
    SITEMAP: '/api/sitemap',
  },
  
  // External APIs
  EXTERNAL: {
    GRAPHY: process.env.GRAPHY_API_URL || 'https://api.ongraphy.com',
    GOOGLE_OAUTH: 'https://accounts.google.com/oauth2/v2/auth',
  },
} as const;

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS;
export type ApiConfig = typeof API_CONFIG;
