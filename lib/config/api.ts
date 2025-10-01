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

  // CMS API endpoints
  cms: {
    content: '/api/cms/content',
    section: '/api/cms/section',
    reset: '/api/cms/reset',
    about: '/api/cms/about',
    contact: '/api/cms/contact',
    donation: '/api/cms/donation',
    schools: '/api/cms/schools',
    'sanskrit-school': '/api/cms/sanskrit-school',
    'darshana-school': '/api/cms/darshana-school',
    'self-help-school': '/api/cms/self-help-school',
    blog: '/api/cms/blog',
    'advaita-vedanta-course': '/api/cms/advaita-vedanta-course',
    'sanskrit-darshan-upanishad-bundle': '/api/cms/sanskrit-darshan-upanishad-bundle',
  },

  // Helper function to get full API URL
  getApiUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  },

  // Helper function to get CMS API URL
  getCmsApiUrl(endpoint: keyof typeof this.cms): string {
    return `${this.baseUrl}${this.cms[endpoint]}`;
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
