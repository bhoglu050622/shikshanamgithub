// API Configuration for different environments
export const API_CONFIG = {
  // Base URL configuration
  get baseUrl(): string {
    // Check if we're in production
    if (typeof window !== 'undefined') {
      // Client-side: use current origin
      return window.location.origin;
    }

    // Server-side: use environment variables or default
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
      return process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshanam-final.vercel.app';
    }

    // Development: use localhost
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  },

  // Helper function to get full API URL
  getApiUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }
};

// Environment detection helpers
export const isProduction = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname !== 'localhost';
  }
  return process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
};

export const isDevelopment = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost';
  }
  return process.env.NODE_ENV === 'development';
};

// Debug logging for API calls
export const logApiCall = (url: string, method: string = 'GET') => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🌐 API Call: ${method} ${url}`);
  }
};
