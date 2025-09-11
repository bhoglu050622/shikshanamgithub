/**
 * System Health Check API
 * Comprehensive health monitoring for all system components
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/database/connection';
import { logger, createContext } from '@/lib/error/logger';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const requestId = request.headers.get('x-request-id') || `health_${Date.now()}`;
  
  const context = createContext(
    undefined,
    undefined,
    requestId,
    {
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0] || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      url: request.url,
      method: request.method,
    }
  );

  try {
    // Check database health
    const dbHealth = await checkDatabaseHealth();
    
    // Check system resources
    const systemHealth = {
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      nodeVersion: process.version,
      platform: process.platform,
    };

    // Check environment
    const environmentHealth = {
      nodeEnv: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      timestamp: new Date().toISOString(),
    };

    const responseTime = Date.now() - startTime;
    const isHealthy = dbHealth.isHealthy;

    // Log health check
    await logger.info(
      `Health check completed: ${isHealthy ? 'healthy' : 'unhealthy'}`,
      context,
      {
        responseTime,
        dbLatency: dbHealth.latency,
        memoryUsage: systemHealth.memory.heapUsed,
      }
    );

    const healthData = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: environmentHealth.timestamp,
      responseTime: `${responseTime}ms`,
      version: environmentHealth.version,
      environment: environmentHealth.nodeEnv,
      components: {
        database: {
          status: dbHealth.isHealthy ? 'healthy' : 'unhealthy',
          latency: dbHealth.latency,
          error: dbHealth.error,
        },
        system: {
          status: 'healthy',
          uptime: `${Math.floor(systemHealth.uptime)}s`,
          memory: {
            used: `${Math.round(systemHealth.memory.heapUsed / 1024 / 1024)}MB`,
            total: `${Math.round(systemHealth.memory.heapTotal / 1024 / 1024)}MB`,
            external: `${Math.round(systemHealth.memory.external / 1024 / 1024)}MB`,
          },
          nodeVersion: systemHealth.nodeVersion,
          platform: systemHealth.platform,
        },
      },
    };

    return NextResponse.json(healthData, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': `${responseTime}ms`,
        'X-Request-ID': requestId,
      },
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    
    await logger.error(
      'Health check failed',
      context,
      error as Error,
      { responseTime }
    );

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        error: 'Health check failed',
        components: {
          database: { status: 'unknown' },
          system: { status: 'unknown' },
        },
      },
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'X-Response-Time': `${responseTime}ms`,
          'X-Request-ID': requestId,
        },
      }
    );
  }
}
