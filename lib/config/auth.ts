/**
 * Authentication Configuration
 * Centralized configuration for all authentication providers
 */

export const AUTH_CONFIG = {
  // Google OAuth Configuration
  GOOGLE: {
    CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '/auth/google/callback',
    SCOPES: ['openid', 'email', 'profile'].join(' '),
  },

  // Graphy Platform Configuration
  GRAPHY: {
    AUTH_URL: process.env.NEXT_PUBLIC_GRAPHY_AUTH_URL || '',
    LEARNING_HUB_URL: process.env.NEXT_PUBLIC_GRAPHY_LEARNING_HUB_URL || '',
    API_TOKEN: process.env.GRAPHY_API_TOKEN || '',
    BASE_URL: process.env.NEXT_PUBLIC_GRAPHY_BASE_URL || '',
  },

  // Session Configuration
  SESSION: {
    COOKIE_NAME: 'shikshanam-auth',
    MAX_AGE: 30 * 24 * 60 * 60, // 30 days in seconds
    SECURE: process.env.NODE_ENV === 'production',
  },

  // API Configuration
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    TIMEOUT: 10000, // 10 seconds
  },
}

// Validation helpers
export const isGoogleConfigured = (): boolean => {
  return !!(AUTH_CONFIG.GOOGLE.CLIENT_ID)
}

export const isGraphyConfigured = (): boolean => {
  return !!(AUTH_CONFIG.GRAPHY.AUTH_URL && AUTH_CONFIG.GRAPHY.API_TOKEN)
}

export const getAuthProviders = () => {
  const providers = []
  
  if (isGoogleConfigured()) {
    providers.push('google')
  }
  
  if (isGraphyConfigured()) {
    providers.push('graphy')
  }
  
  return providers
}
