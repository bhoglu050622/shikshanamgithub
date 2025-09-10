/**
 * Security Middleware
 * Provides input validation, rate limiting, and authentication checks
 */

import { NextRequest, NextResponse } from 'next/server';
import { Logger } from './logging';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface SecurityConfig {
  rateLimit: RateLimitConfig;
  maxRequestSize: number;
  allowedOrigins: string[];
  requireAuth: boolean;
  validateInput: boolean;
}

// Default security configuration
const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per window
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },
  maxRequestSize: 10 * 1024 * 1024, // 10MB
  allowedOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  requireAuth: true,
  validateInput: true,
};

// Rate limiting storage (in production, use Redis)
class RateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>();

  isAllowed(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Clean up old entries
    for (const [k, v] of this.requests.entries()) {
      if (v.resetTime < now) {
        this.requests.delete(k);
      }
    }

    const current = this.requests.get(key);
    
    if (!current || current.resetTime < now) {
      // New window or expired
      this.requests.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return true;
    }

    if (current.count >= config.maxRequests) {
      return false;
    }

    current.count++;
    return true;
  }

  getRemainingRequests(key: string, config: RateLimitConfig): number {
    const current = this.requests.get(key);
    if (!current || current.resetTime < Date.now()) {
      return config.maxRequests;
    }
    return Math.max(0, config.maxRequests - current.count);
  }

  getResetTime(key: string): number {
    const current = this.requests.get(key);
    return current?.resetTime || 0;
  }
}

const rateLimiter = new RateLimiter();

export class SecurityMiddleware {
  private config: SecurityConfig;
  private logger: Logger;

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = { ...DEFAULT_SECURITY_CONFIG, ...config };
    this.logger = Logger.getInstance();
  }

  private getClientKey(request: NextRequest): string {
    const ip = this.getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    return `${ip}:${userAgent}`;
  }

  private getClientIP(request: NextRequest): string {
    return (
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown'
    );
  }

  private validateOrigin(request: NextRequest): boolean {
    const origin = request.headers.get('origin');
    if (!origin) return true; // Allow requests without origin (e.g., server-to-server)
    
    return this.config.allowedOrigins.includes(origin);
  }

  private validateRequestSize(request: NextRequest): boolean {
    const contentLength = request.headers.get('content-length');
    if (!contentLength) return true;
    
    const size = parseInt(contentLength, 10);
    return size <= this.config.maxRequestSize;
  }

  private validateAuth(request: NextRequest): boolean {
    if (!this.config.requireAuth) return true;

    // Check for authentication token
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return true;
    }

    // Check for session cookie
    const sessionCookie = request.cookies.get('session')?.value;
    if (sessionCookie) {
      return true;
    }

    return false;
  }

  private validateInput(request: NextRequest): boolean {
    if (!this.config.validateInput) return true;

    // Basic input validation
    const url = new URL(request.url);
    
    // Check for suspicious patterns in URL
    const suspiciousPatterns = [
      /\.\./, // Directory traversal
      /<script/i, // XSS attempts
      /union.*select/i, // SQL injection
      /javascript:/i, // JavaScript injection
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url.pathname) || pattern.test(url.search)) {
        return false;
      }
    }

    return true;
  }

  private sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      // Basic HTML sanitization
      return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }

    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }

    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        sanitized[key] = this.sanitizeInput(value);
      }
      return sanitized;
    }

    return input;
  }

  async validateRequest(request: NextRequest): Promise<NextResponse | null> {
    const requestId = request.headers.get('x-request-id') || 'unknown';
    const clientKey = this.getClientKey(request);

    // Rate limiting
    if (!rateLimiter.isAllowed(clientKey, this.config.rateLimit)) {
      this.logger.logError(requestId, new Error('Rate limit exceeded'), {
        clientKey,
        ip: this.getClientIP(request),
      });

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimiter.getResetTime(clientKey) - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimiter.getResetTime(clientKey) - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': this.config.rateLimit.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimiter.getRemainingRequests(clientKey, this.config.rateLimit).toString(),
            'X-RateLimit-Reset': rateLimiter.getResetTime(clientKey).toString(),
          },
        }
      );
    }

    // Origin validation
    if (!this.validateOrigin(request)) {
      this.logger.logError(requestId, new Error('Invalid origin'), {
        origin: request.headers.get('origin'),
        allowedOrigins: this.config.allowedOrigins,
      });

      return NextResponse.json(
        {
          error: 'Invalid origin',
          message: 'Request from unauthorized origin',
        },
        { status: 403 }
      );
    }

    // Request size validation
    if (!this.validateRequestSize(request)) {
      this.logger.logError(requestId, new Error('Request too large'), {
        contentLength: request.headers.get('content-length'),
        maxSize: this.config.maxRequestSize,
      });

      return NextResponse.json(
        {
          error: 'Request too large',
          message: 'Request size exceeds maximum allowed size',
        },
        { status: 413 }
      );
    }

    // Authentication validation
    if (!this.validateAuth(request)) {
      this.logger.logError(requestId, new Error('Authentication required'), {
        authHeader: request.headers.get('authorization') ? 'present' : 'missing',
        sessionCookie: request.cookies.get('session') ? 'present' : 'missing',
      });

      return NextResponse.json(
        {
          error: 'Authentication required',
          message: 'Please log in to access this resource',
        },
        { status: 401 }
      );
    }

    // Input validation
    if (!this.validateInput(request)) {
      this.logger.logError(requestId, new Error('Invalid input'), {
        url: request.url,
        method: request.method,
      });

      return NextResponse.json(
        {
          error: 'Invalid input',
          message: 'Request contains invalid or suspicious content',
        },
        { status: 400 }
      );
    }

    return null; // Request is valid
  }

  async sanitizeRequestBody(request: NextRequest): Promise<any> {
    try {
      const contentType = request.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        const body = await request.json();
        return this.sanitizeInput(body);
      }
      
      if (contentType?.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        const sanitized: any = {};
        for (const [key, value] of formData.entries()) {
          sanitized[key] = this.sanitizeInput(value);
        }
        return sanitized;
      }
      
      return null;
    } catch (error) {
      this.logger.logError(
        request.headers.get('x-request-id') || 'unknown',
        new Error('Failed to parse request body'),
        { error: (error as Error).message }
      );
      return null;
    }
  }
}

// Middleware function for Next.js API routes
export function withSecurity(
  handler: Function,
  config: Partial<SecurityConfig> = {}
) {
  const security = new SecurityMiddleware(config);

  return async (request: NextRequest, ...args: any[]) => {
    // Validate request
    const validationError = await security.validateRequest(request);
    if (validationError) {
      return validationError;
    }

    // Sanitize request body if needed
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const sanitizedBody = await security.sanitizeRequestBody(request);
      if (sanitizedBody) {
        // Create new request with sanitized body
        const newRequest = new NextRequest(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(sanitizedBody),
        });
        return handler(newRequest, ...args);
      }
    }

    return handler(request, ...args);
  };
}

// Utility function to create security middleware with custom config
export function createSecurityMiddleware(config: Partial<SecurityConfig>) {
  return (handler: Function) => withSecurity(handler, config);
}
