import { NextRequest, NextResponse } from 'next/server'
import { getServerAuthCookie, validateAuthData } from '@/lib/server-cookies'

export async function POST(request: NextRequest) {
  const requestId = `refresh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();
  
  try {
    console.log(`[${requestId}] [${timestamp}] Token refresh request started`);
    
    const body = await request.json()
    const { refreshToken } = body

    // Log request details (mask sensitive data)
    console.log(`[${requestId}] Token refresh request:`, {
      hasRefreshToken: !!refreshToken,
      refreshTokenPrefix: refreshToken ? refreshToken.substring(0, 8) + '...' : 'none',
      userAgent: request.headers.get('user-agent'),
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer')
    });

    if (!refreshToken) {
      console.log(`[${requestId}] Missing refresh token`);
      return NextResponse.json(
        { 
          error: 'Refresh token is required', 
          code: 'MISSING_REFRESH_TOKEN',
          timestamp,
          requestId
        },
        { status: 400 }
      )
    }

    // Get current auth data from cookies
    const authData = getServerAuthCookie(request)
    
    console.log(`[${requestId}] Auth data validation:`, {
      hasAuthData: !!authData,
      isLoggedIn: authData?.isLoggedIn,
      hasUser: !!authData?.user,
      userEmail: authData?.user?.email,
      cookieAge: authData ? Date.now() - authData.timestamp : 'N/A'
    });
    
    if (!validateAuthData(authData)) {
      console.log(`[${requestId}] Invalid or expired session`);
      return NextResponse.json(
        { 
          error: 'Invalid or expired session', 
          code: 'INVALID_SESSION',
          message: 'Please log in again to continue',
          timestamp,
          requestId
        },
        { status: 401 }
      )
    }

    // For Google OAuth, we don't actually refresh tokens on the server side
    // The client should handle token refresh through Google's OAuth flow
    // This endpoint is mainly for session validation and extending cookie expiration
    
    const newTokens = {
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresIn: 3600, // 1 hour
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString()
    }

    console.log(`[${requestId}] Token refresh successful for user: ${authData?.user?.email || 'unknown'}`);
    
    return NextResponse.json({
      ...newTokens,
      timestamp,
      requestId
    })
  } catch (error) {
    console.error(`[${requestId}] Token refresh error:`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred during token refresh',
        timestamp,
        requestId
      },
      { status: 500 }
    )
  }
}
