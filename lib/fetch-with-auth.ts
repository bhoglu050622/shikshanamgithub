/**
 * Authenticated Fetch Utility
 * Ensures all fetch calls include credentials and proper authentication headers
 */

interface AuthenticatedFetchOptions extends RequestInit {
  includeCredentials?: boolean;
  skipAuth?: boolean;
}

/**
 * Enhanced fetch function that automatically includes credentials and authentication
 * @param url - The URL to fetch
 * @param options - Fetch options with additional authentication options
 * @returns Promise<Response>
 */
export async function fetchWithAuth(
  url: string, 
  options: AuthenticatedFetchOptions = {}
): Promise<Response> {
  const { includeCredentials = true, skipAuth = false, ...fetchOptions } = options;
  
  // Default headers
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  
  // Add cache control for authenticated requests
  if (!skipAuth) {
    defaultHeaders['Cache-Control'] = 'no-cache';
  }
  
  // Prepare the final options
  const finalOptions: RequestInit = {
    ...fetchOptions,
    headers: defaultHeaders,
    // Include credentials by default unless explicitly disabled
    credentials: includeCredentials ? 'include' : fetchOptions.credentials,
  };
  
  // Log the request for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[fetchWithAuth] ${finalOptions.method || 'GET'} ${url}`, {
      credentials: finalOptions.credentials,
      headers: finalOptions.headers,
    });
  }
  
  try {
    const response = await fetch(url, finalOptions);
    
    // Log authentication errors
    if (response.status === 401) {
      console.error(`[fetchWithAuth] Authentication error for ${url}:`, {
        status: response.status,
        statusText: response.statusText,
      });
    }
    
    return response;
  } catch (error) {
    console.error(`[fetchWithAuth] Network error for ${url}:`, error);
    throw error;
  }
}

/**
 * Convenience function for GET requests with authentication
 */
export async function getWithAuth(url: string, options: AuthenticatedFetchOptions = {}) {
  return fetchWithAuth(url, { ...options, method: 'GET' });
}

/**
 * Convenience function for POST requests with authentication
 */
export async function postWithAuth(url: string, data?: any, options: AuthenticatedFetchOptions = {}) {
  return fetchWithAuth(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience function for PUT requests with authentication
 */
export async function putWithAuth(url: string, data?: any, options: AuthenticatedFetchOptions = {}) {
  return fetchWithAuth(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * Convenience function for DELETE requests with authentication
 */
export async function deleteWithAuth(url: string, options: AuthenticatedFetchOptions = {}) {
  return fetchWithAuth(url, { ...options, method: 'DELETE' });
}

/**
 * Check if a response indicates an authentication error
 */
export function isAuthError(response: Response): boolean {
  return response.status === 401;
}

/**
 * Handle authentication errors by redirecting to login
 */
export function handleAuthError(error: Error, redirectToLogin: () => void) {
  console.error('Authentication error:', error);
  redirectToLogin();
}
