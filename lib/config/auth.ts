/**
 * Authentication Configuration
 * Centralized configuration for all authentication providers
 */

export const AUTH_CONFIG = {
  // Graphy SSO Configuration
  GRAPHY: {
    MERCHANT_ID: process.env.GRAPHY_MERCHANT_ID || 'hyperquest',
    API_TOKEN: process.env.GRAPHY_API_TOKEN || '52bae682-186d-44af-a933-c6b6808596c9',
    BASE_URL: process.env.GRAPHY_BASE_URL || 'https://courses.shikshanam.in',
    LEARNING_HUB_URL: process.env.GRAPHY_LEARNING_HUB_URL || 'https://courses.shikshanam.in/t/u/activeCourses',
    AUTH_URL: process.env.GRAPHY_AUTH_URL || 'https://courses.shikshanam.in/t/u/authenticate'
  },
  
  // Google OAuth Configuration
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    REDIRECT_URI: typeof window !== 'undefined' 
      ? `${window.location.origin}/api/auth/google/callback`
      : 'http://localhost:3000/api/auth/google/callback',
    SCOPE: 'openid email profile'
  },
  
  // Application Configuration
  APP: {
    URL: typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'shikshanam.com'
  }
}

// Environment-based configuration
export const getAuthConfig = () => {
  if (typeof window === 'undefined') {
    // Server-side configuration
    return {
      ...AUTH_CONFIG,
      GOOGLE: {
        ...AUTH_CONFIG.GOOGLE,
        REDIRECT_URI: process.env.NEXT_PUBLIC_APP_URL 
          ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
          : 'http://localhost:3000/api/auth/google/callback'
      }
    }
  }
  
  // Client-side configuration
  return AUTH_CONFIG
}