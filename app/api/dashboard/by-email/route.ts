/**
 * Dashboard API Endpoint
 * GET /api/dashboard/by-email?email=...
 * Returns comprehensive dashboard data for a learner
 */

import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboard/dashboard-service';
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard';

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

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

    // Extract and validate email parameter
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { 
          error: 'Missing email parameter',
          message: 'Email parameter is required'
        },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { 
          error: 'Invalid email format',
          message: 'Please provide a valid email address'
        },
        { status: 400 }
      );
    }

    // Log API request
    if (DASHBOARD_CONFIG.LOGGING.ENABLE_API_LOGGING) {
      console.log(`[DASHBOARD API] Request for email: ${email} from IP: ${clientIP}`);
    }

    // Get dashboard data
    const dashboardData = await dashboardService.getDashboardByEmail(email);

    if (!dashboardData) {
      return NextResponse.json(
        { 
          error: 'Learner not found',
          message: 'No learner found with the provided email address'
        },
        { status: 404 }
      );
    }

    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Log successful response
    if (DASHBOARD_CONFIG.LOGGING.ENABLE_API_LOGGING) {
      console.log(`[DASHBOARD API] Success for email: ${email}, response time: ${responseTime}ms`);
    }

    // Return dashboard data with metadata
    return NextResponse.json({
      success: true,
      data: dashboardData,
      metadata: {
        generatedAt: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        cacheStatus: 'fresh', // Could be enhanced with actual cache status
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
