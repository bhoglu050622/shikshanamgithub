/**
 * Dashboard Configuration
 * Centralized configuration for the student dashboard system
 */

export const DASHBOARD_CONFIG = {
  // Graphy API Configuration
  GRAPHY: {
    BASE_URL: process.env.GRAPHY_API_BASE_URL || 'https://api.graphy.com',
    API_KEY: process.env.GRAPHY_API_KEY || '',
    SECRET_KEY: process.env.GRAPHY_SECRET_KEY || '',
    TIMEOUT: 15000, // 15 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },

  // Caching Configuration
  CACHE: {
    STATIC_TTL: parseInt(process.env.DASHBOARD_CACHE_TTL_STATIC || '3600'), // 1 hour
    DYNAMIC_TTL: parseInt(process.env.DASHBOARD_CACHE_TTL_DYNAMIC || '60'), // 1 minute
    REDIS_URL: process.env.REDIS_URL,
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: parseInt(process.env.API_RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
    MAX_REQUESTS: parseInt(process.env.API_RATE_LIMIT_MAX_REQUESTS || '100'),
    GRAPHY_PER_MINUTE: parseInt(process.env.DASHBOARD_RATE_LIMIT_PER_MINUTE || '100'),
  },

  // Security
  SECURITY: {
    JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    API_KEY_HEADER: 'x-api-key',
    CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  },

  // Logging
  LOGGING: {
    LEVEL: process.env.LOG_LEVEL || 'info',
    ENABLE_API_LOGGING: process.env.ENABLE_API_LOGGING === 'true',
  },

  // Recommendation Engine
  RECOMMENDATIONS: {
    MAX_RECOMMENDATIONS: 10,
    SCORE_WEIGHTS: {
      INCOMPLETE_COURSE: 0.4,
      NEXT_LESSON: 0.3,
      CATEGORY_MATCH: 0.2,
      POPULARITY: 0.1,
    },
    FALLBACK_POPULAR_COURSES: 5,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
} as const;

export type DashboardConfig = typeof DASHBOARD_CONFIG;
