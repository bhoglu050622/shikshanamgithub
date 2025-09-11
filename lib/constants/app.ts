/**
 * Application Constants
 * Centralized application configuration and feature flags
 */

export const APP_CONFIG = {
  NAME: 'Shikshanam',
  DESCRIPTION: 'Ancient Indian Knowledge Platform for Sanskrit, Darshanas, and Self-help',
  VERSION: '1.0.0',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'https://shikshanam.com',
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.shikshanam.com',
  
  // Contact Information
  CONTACT: {
    EMAIL: 'support@shikshanam.com',
    PHONE: '+1-555-0123',
    ADDRESS: '123 Knowledge Street, Wisdom City, WC 12345',
  },
  
  // Social Media
  SOCIAL: {
    TWITTER: 'https://twitter.com/shikshanam',
    FACEBOOK: 'https://facebook.com/shikshanam',
    INSTAGRAM: 'https://instagram.com/shikshanam',
    LINKEDIN: 'https://linkedin.com/company/shikshanam',
  },
  
  // SEO
  SEO: {
    DEFAULT_TITLE: 'Shikshanam - Ancient Indian Knowledge Platform',
    DEFAULT_DESCRIPTION: 'Learn Sanskrit, explore Darshanas, and discover self-help wisdom through our comprehensive online platform.',
    KEYWORDS: ['Sanskrit', 'Darshanas', 'Self-help', 'Indian Philosophy', 'Learning', 'Education'],
    AUTHOR: 'Shikshanam Team',
    OG_IMAGE: '/og-image.jpg',
  },
} as const;

export const FEATURE_FLAGS = {
  // Authentication
  ENABLE_EMAIL_AUTH: process.env.ENABLE_EMAIL_AUTH === 'true',
  ENABLE_GOOGLE_AUTH: process.env.ENABLE_GOOGLE_AUTH === 'true',
  ENABLE_REGISTRATION: process.env.ENABLE_REGISTRATION === 'true',
  ENABLE_PASSWORD_RESET: process.env.ENABLE_PASSWORD_RESET === 'true',
  
  // Features
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
  ENABLE_NOTIFICATIONS: process.env.ENABLE_NOTIFICATIONS === 'true',
  ENABLE_DARK_MODE: process.env.ENABLE_DARK_MODE === 'true',
  ENABLE_OFFLINE_MODE: process.env.ENABLE_OFFLINE_MODE === 'true',
  
  // Development
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
  ENABLE_PERFORMANCE_MONITORING: process.env.ENABLE_PERFORMANCE_MONITORING === 'true',
  ENABLE_ERROR_REPORTING: process.env.ENABLE_ERROR_REPORTING === 'true',
} as const;

export type AppConfig = typeof APP_CONFIG;
export type FeatureFlags = typeof FEATURE_FLAGS;
