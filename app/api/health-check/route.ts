/**
 * Health Check API Endpoint
 * GET /api/health-check
 * Verifies all API endpoints are accessible and returns system status
 */

import { NextRequest, NextResponse } from 'next/server';

interface EndpointStatus {
  endpoint: string;
  method: string;
  status: 'accessible' | 'error' | 'not_found';
  responseTime?: number;
  error?: string;
}

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  endpoints: EndpointStatus[];
  summary: {
    total: number;
    accessible: number;
    errors: number;
    notFound: number;
  };
  system: {
    nodeVersion: string;
    platform: string;
    uptime: number;
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
  };
}

// List of all API endpoints to check
const API_ENDPOINTS = [
  // Auth endpoints
  { path: '/api/auth/email', method: 'POST' },
  { path: '/api/auth/google', method: 'GET' },
  { path: '/api/auth/refresh', method: 'POST' },
  
  // Dashboard endpoints
  { path: '/api/dashboard/real-data', method: 'GET' },
  { path: '/api/dashboard/me', method: 'GET' },
  { path: '/api/dashboard/recommendations', method: 'GET' },
  { path: '/api/dashboard/by-email', method: 'GET' },
  
  // Analytics endpoints
  { path: '/api/analytics', method: 'GET' },
  { path: '/api/analytics/collect', method: 'POST' },
  { path: '/api/analytics/performance', method: 'POST' },
  
  // CMS endpoints
  { path: '/api/cms/auth/login', method: 'POST' },
  { path: '/api/cms/auth/logout', method: 'POST' },
  { path: '/api/cms/auth/me', method: 'GET' },
  { path: '/api/cms/courses', method: 'GET' },
  
  // Admin endpoints
  { path: '/api/admin/assign-course', method: 'POST' },
  { path: '/api/admin/process-refund', method: 'POST' },
  { path: '/api/admin/unassign-course', method: 'POST' },
  
  // Package endpoints
  { path: '/api/packages', method: 'GET' },
  
  // Utility endpoints
  { path: '/api/robots', method: 'GET' },
  { path: '/api/sitemap', method: 'GET' },
  { path: '/api/test-graphy-auth', method: 'GET' },
];

async function checkEndpoint(baseUrl: string, endpoint: { path: string; method: string }): Promise<EndpointStatus> {
  const startTime = Date.now();
  
  try {
    const url = `${baseUrl}${endpoint.path}`;
    const response = await fetch(url, {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Health-Check/1.0',
      },
      // Don't follow redirects for health check
      redirect: 'manual',
    });
    
    const responseTime = Date.now() - startTime;
    
    // Consider 2xx, 3xx, and 401 (auth required) as accessible
    if (response.status < 400 || response.status === 401) {
      return {
        endpoint: endpoint.path,
        method: endpoint.method,
        status: 'accessible',
        responseTime,
      };
    } else if (response.status === 404) {
      return {
        endpoint: endpoint.path,
        method: endpoint.method,
        status: 'not_found',
        responseTime,
        error: `404 Not Found`,
      };
    } else {
      return {
        endpoint: endpoint.path,
        method: endpoint.method,
        status: 'error',
        responseTime,
        error: `${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      endpoint: endpoint.path,
      method: endpoint.method,
      status: 'error',
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Get base URL from request
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    
    // Check all endpoints in parallel
    const endpointChecks = await Promise.allSettled(
      API_ENDPOINTS.map(endpoint => checkEndpoint(baseUrl, endpoint))
    );
    
    // Process results
    const endpoints: EndpointStatus[] = endpointChecks.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          endpoint: API_ENDPOINTS[index].path,
          method: API_ENDPOINTS[index].method,
          status: 'error',
          error: result.reason?.message || 'Promise rejected',
        };
      }
    });
    
    // Calculate summary
    const summary = {
      total: endpoints.length,
      accessible: endpoints.filter(e => e.status === 'accessible').length,
      errors: endpoints.filter(e => e.status === 'error').length,
      notFound: endpoints.filter(e => e.status === 'not_found').length,
    };
    
    // Determine overall status
    let status: 'healthy' | 'degraded' | 'unhealthy';
    if (summary.errors === 0 && summary.notFound === 0) {
      status = 'healthy';
    } else if (summary.errors <= 2 && summary.notFound <= 2) {
      status = 'degraded';
    } else {
      status = 'unhealthy';
    }
    
    // Get system information
    const system = {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        percentage: Math.round((process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100),
      },
    };
    
    const result: HealthCheckResult = {
      status,
      timestamp: new Date().toISOString(),
      endpoints,
      summary,
      system,
    };
    
    // Return appropriate status code based on health
    const statusCode = status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503;
    
    return NextResponse.json(result, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 503 });
  }
}
