/**
 * Test Authentication Endpoint
 * GET /api/test-auth
 * Simple endpoint to test if authentication is working
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthCookie, validateAuthData } from '@/lib/server-cookies';

export async function GET(request: NextRequest) {
  try {
    // Get auth data from cookies
    const authData = getServerAuthCookie(request);
    
    if (!validateAuthData(authData)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication required',
          message: 'Please log in to access this endpoint',
          debug: {
            hasCookie: !!request.headers.get('cookie'),
            cookieHeader: request.headers.get('cookie')?.substring(0, 100) + '...'
          }
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: {
        name: authData!.user.name,
        email: authData!.user.email
      },
      debug: {
        timestamp: authData!.timestamp,
        cookieAge: Date.now() - authData!.timestamp
      }
    });

  } catch (error) {
    console.error('[TEST AUTH] Error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { 
        status: 500
      }
    );
  }
}
