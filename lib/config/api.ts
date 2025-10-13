/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

export const API_CONFIG = {
  /**
   * Get CMS API URL for a specific endpoint
   * @param endpoint - The API endpoint (e.g., 'content', 'posts')
   * @returns Full API URL
   */
  getCmsApiUrl: (endpoint: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_CMS_URL || ''
    return baseUrl ? `${baseUrl}/api/${endpoint}` : `/api/${endpoint}`
  },

  /**
   * Get API URL for internal API routes
   * @param endpoint - The API endpoint
   * @returns Full API URL
   */
  getApiUrl: (endpoint: string): string => {
    return `/api/${endpoint}`
  }
}

