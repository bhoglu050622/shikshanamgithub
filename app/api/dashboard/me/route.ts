/**
 * Dashboard API Endpoint for Current User
 * GET /api/dashboard/me
 * Returns comprehensive dashboard data for the currently logged-in user
 */

import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboard/dashboard-service';
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard';
import { getServerAuthCookie, validateAuthData } from '@/lib/server-cookies';

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = DASHBOARD_CONFIG.RATE_LIMIT.WINDOW_MS;
  const maxRequests = DASHBOARD_CONFIG.RATE_LIMIT.MAX_REQUESTS;

  const current = rateLimitStore.get(identifier);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
      request.headers.get('x-real-ip') || 
      'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil(DASHBOARD_CONFIG.RATE_LIMIT.WINDOW_MS / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(DASHBOARD_CONFIG.RATE_LIMIT.WINDOW_MS / 1000).toString(),
            'X-RateLimit-Limit': DASHBOARD_CONFIG.RATE_LIMIT.MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + DASHBOARD_CONFIG.RATE_LIMIT.WINDOW_MS).toISOString(),
          }
        }
      );
    }

    // Get auth data from cookies
    const authData = getServerAuthCookie(request);
    
    if (!validateAuthData(authData)) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          message: 'Please log in to access your dashboard'
        },
        { status: 401 }
      );
    }

    const email = authData!.user.email;

    // Log API request
    if (DASHBOARD_CONFIG.LOGGING.ENABLE_API_LOGGING) {
      console.log(`[DASHBOARD API] Request for authenticated user: ${email} from IP: ${clientIP}`);
    }

    // Get dashboard data
    let dashboardData;
    try {
      dashboardData = await dashboardService.getDashboardByEmail(email);
    } catch (serviceError) {
      console.error('[DASHBOARD API] Service error:', serviceError);
      return NextResponse.json(
        { 
          error: 'Dashboard service error',
          message: 'Unable to fetch dashboard data. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? (serviceError instanceof Error ? serviceError.message : String(serviceError)) : undefined
        },
        { status: 500 }
      );
    }

    if (!dashboardData) {
      return NextResponse.json(
        { 
          error: 'Learner not found',
          message: 'No learner found with your email address. Please contact support.'
        },
        { status: 404 }
      );
    }

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Log successful response
    if (DASHBOARD_CONFIG.LOGGING.ENABLE_API_LOGGING) {
      console.log(`[DASHBOARD API] Success for user: ${email}, response time: ${responseTime}ms`);
    }

    // Return dashboard data with metadata
    return NextResponse.json({
      success: true,
      data: dashboardData,
      metadata: {
        generatedAt: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        cacheStatus: 'fresh',
        userEmail: email,
      }
    }, {
      headers: {
        'Cache-Control': 'private, max-age=60, stale-while-revalidate=300',
        'X-Response-Time': `${responseTime}ms`,
        'X-API-Version': '1.0',
      }
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    // Log error
    console.error('[DASHBOARD API] Error:', error);
    
    // Return appropriate error response
    if (error instanceof Error) {
      if (error.message.includes('Rate limit')) {
        return NextResponse.json(
          { 
            error: 'Service temporarily unavailable',
            message: 'Please try again in a few moments'
          },
          { status: 503 }
        );
      }
      
      if (error.message.includes('Failed to build dashboard')) {
        return NextResponse.json(
          { 
            error: 'Dashboard service error',
            message: 'Unable to fetch dashboard data. Please try again later.'
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.'
      },
      { 
        status: 500,
        headers: {
          'X-Response-Time': `${responseTime}ms`,
        }
      }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only GET requests are supported for this endpoint'
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only GET requests are supported for this endpoint'
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only GET requests are supported for this endpoint'
    },
    { status: 405 }
  );
}
