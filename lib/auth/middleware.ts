/**
 * Authentication Middleware
 * Provides authentication utilities for API routes and pages
 */

import { NextRequest, NextResponse } from 'next/server';
import { jwtAuth, JWTPayload } from './jwt';
import { authService } from './auth-service';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

/**
 * Middleware to require authentication
 */
export function requireAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Get user from request
      const user = await jwtAuth.getUserFromRequest(req);
      
      if (!user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Check if user is still active
      const userData = await authService.getUserById(user.userId);
      if (!userData || !userData.isActive) {
        return NextResponse.json(
          { error: 'Account is deactivated' },
          { status: 403 }
        );
      }

      // Add user to request
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = user;

      return handler(authenticatedReq);
    } catch (error) {
      console.error('Authentication middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

/**
 * Middleware to require specific role
 */
export function requireRole(role: string) {
  return function(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
    return requireAuth(async (req: AuthenticatedRequest): Promise<NextResponse> => {
      if (!req.user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      if (req.user.role !== role) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      return handler(req);
    });
  };
}

/**
 * Middleware to require admin role
 */
export function requireAdmin(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return requireRole('ADMIN')(handler);
}

/**
 * Optional authentication middleware
 */
export function optionalAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const user = await jwtAuth.getUserFromRequest(req);
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = user || undefined;
      
      return handler(authenticatedReq);
    } catch (error) {
      console.error('Optional auth middleware error:', error);
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = undefined;
      return handler(authenticatedReq);
    }
  };
}

/**
 * Rate limiting middleware
 */
export function rateLimit(maxRequests: number, windowMs: number) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return function(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest): Promise<NextResponse> => {
      const clientIP = getClientIP(req);
      const now = Date.now();
      const windowStart = now - windowMs;

      // Clean up old entries
      for (const [ip, data] of requests.entries()) {
        if (data.resetTime < windowStart) {
          requests.delete(ip);
        }
      }

      // Check current request count
      const currentData = requests.get(clientIP);
      
      if (!currentData) {
        requests.set(clientIP, { count: 1, resetTime: now });
      } else if (currentData.resetTime < windowStart) {
        requests.set(clientIP, { count: 1, resetTime: now });
      } else if (currentData.count >= maxRequests) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        );
      } else {
        currentData.count++;
      }

      return handler(req);
    };
  };
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * CORS middleware
 */
export function cors(origin: string = '*') {
  return function(handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest): Promise<NextResponse> => {
      const response = await handler(req);
      
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      
      return response;
    };
  };
}
