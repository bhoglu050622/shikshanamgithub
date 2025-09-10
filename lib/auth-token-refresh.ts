/**
 * Token Refresh Utility
 * Handles token refresh operations with proper error handling
 */

interface TokenRefreshOptions {
  refreshToken: string;
  onSuccess?: (newTokens: { accessToken: string; refreshToken: string }) => void;
  onError?: (error: Error) => void;
}

export class TokenRefreshError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'TokenRefreshError';
  }
}

export async function refreshAccessToken(options: TokenRefreshOptions): Promise<{ accessToken: string; refreshToken: string }> {
  const requestId = `client_refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log(`[${requestId}] Starting token refresh request`);
    
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session validation
      body: JSON.stringify({
        refreshToken: options.refreshToken,
      }),
    });

    console.log(`[${requestId}] Token refresh response:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (e) {
        console.error(`[${requestId}] Failed to parse error response:`, e);
      }
      
      console.error(`[${requestId}] Token refresh failed:`, {
        status: response.status,
        errorData
      });
      
      throw new TokenRefreshError(
        errorData.message || 'Failed to refresh token',
        errorData.code || 'REFRESH_FAILED'
      );
    }

    const tokenData = await response.json();
    console.log(`[${requestId}] Token refresh successful`);
    
    if (options.onSuccess) {
      options.onSuccess(tokenData);
    }

    return tokenData;
  } catch (error) {
    const refreshError = error instanceof TokenRefreshError 
      ? error 
      : new TokenRefreshError('Network error during token refresh', 'NETWORK_ERROR');

    console.error(`[${requestId}] Token refresh error:`, {
      error: refreshError.message,
      code: refreshError.code,
      originalError: error instanceof Error ? error.message : String(error)
    });

    if (options.onError) {
      options.onError(refreshError);
    }

    throw refreshError;
  }
}

// Safe token refresh with automatic retry and fail-safe handling
export async function safeTokenRefresh(
  refreshToken: string,
  maxRetries: number = 3
): Promise<{ accessToken: string; refreshToken: string } | null> {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  let lastError: Error | null = null;

  console.log(`[${sessionId}] Starting safe token refresh with ${maxRetries} max retries`);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[${sessionId}] Token refresh attempt ${attempt}/${maxRetries}`);
      
      return await refreshAccessToken({
        refreshToken,
        onError: (error) => {
          lastError = error;
          console.warn(`[${sessionId}] Token refresh attempt ${attempt} failed:`, {
            error: error.message,
            code: error instanceof TokenRefreshError ? error.code : 'UNKNOWN'
          });
        }
      });
    } catch (error) {
      lastError = error as Error;
      
      // Check if this is a permanent failure that shouldn't be retried
      if (error instanceof TokenRefreshError) {
        if (error.code === 'INVALID_SESSION' || error.code === 'MISSING_REFRESH_TOKEN') {
          console.error(`[${sessionId}] Permanent failure detected, not retrying:`, error.code);
          break; // Don't retry for permanent failures
        }
      }
      
      if (attempt < maxRetries) {
        // Exponential backoff with jitter
        const baseDelay = Math.pow(2, attempt) * 1000;
        const jitter = Math.random() * 1000;
        const delay = baseDelay + jitter;
        
        console.log(`[${sessionId}] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`[${sessionId}] All token refresh attempts failed:`, {
    finalError: lastError instanceof Error ? lastError.message : String(lastError),
    errorCode: lastError instanceof TokenRefreshError ? lastError.code : 'UNKNOWN'
  });
  
  return null;
}

// Fail-safe token refresh that clears auth state on failure
export async function failSafeTokenRefresh(
  refreshToken: string,
  onAuthFailure?: () => void
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const result = await safeTokenRefresh(refreshToken);
    
    if (!result) {
      console.warn('Token refresh failed, triggering auth failure handler');
      if (onAuthFailure) {
        onAuthFailure();
      }
    }
    
    return result;
  } catch (error) {
    console.error('Unexpected error in fail-safe token refresh:', error);
    if (onAuthFailure) {
      onAuthFailure();
    }
    return null;
  }
}
