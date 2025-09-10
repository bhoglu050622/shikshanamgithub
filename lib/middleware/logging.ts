/**
 * Comprehensive Logging Middleware
 * Provides structured logging with traces for all API requests
 */

import { NextRequest, NextResponse } from 'next/server';

export interface LogContext {
  requestId: string;
  method: string;
  url: string;
  userAgent: string;
  ip: string;
  userId?: string;
  sessionId?: string;
  timestamp: string;
  duration?: number;
  statusCode?: number;
  error?: string;
  metadata?: Record<string, any>;
}

export class Logger {
  private static instance: Logger;
  private logs: LogContext[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getClientIP(request: NextRequest): string {
    return (
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'unknown'
    );
  }

  private getUserId(request: NextRequest): string | undefined {
    // Extract user ID from JWT token or session
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        // Decode JWT to get user ID (simplified)
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId || payload.sub;
      } catch (error) {
        // Token parsing failed
      }
    }
    return undefined;
  }

  private getSessionId(request: NextRequest): string | undefined {
    // Extract session ID from cookies
    const sessionCookie = request.cookies.get('session')?.value;
    return sessionCookie;
  }

  logRequest(request: NextRequest, context: Partial<LogContext> = {}): string {
    const requestId = this.generateRequestId();
    const timestamp = new Date().toISOString();
    
    const logContext: LogContext = {
      requestId,
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: this.getClientIP(request),
      userId: this.getUserId(request),
      sessionId: this.getSessionId(request),
      timestamp,
      ...context,
    };

    this.logs.push(logContext);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${requestId}] ${request.method} ${request.url}`, {
        ip: logContext.ip,
        userAgent: logContext.userAgent,
        userId: logContext.userId,
        timestamp: logContext.timestamp,
        ...context,
      });
    }

    // Log to file
    this.logToFile(logContext);

    return requestId;
  }

  logResponse(requestId: string, statusCode: number, duration: number, error?: string) {
    const logIndex = this.logs.findIndex(log => log.requestId === requestId);
    if (logIndex !== -1) {
      this.logs[logIndex].statusCode = statusCode;
      this.logs[logIndex].duration = duration;
      if (error) {
        this.logs[logIndex].error = error;
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${requestId}] Response: ${statusCode} (${duration}ms)`, {
        error: error || undefined,
      });
    }
  }

  logError(requestId: string, error: Error, context: Record<string, any> = {}) {
    const logIndex = this.logs.findIndex(log => log.requestId === requestId);
    if (logIndex !== -1) {
      this.logs[logIndex].error = error.message;
      this.logs[logIndex].metadata = {
        ...this.logs[logIndex].metadata,
        ...context,
        stack: error.stack,
      };
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${requestId}] Error:`, error.message, {
        stack: error.stack,
        ...context,
      });
    }

    // Log to file
    this.logToFile({
      requestId,
      error: error.message,
      metadata: { stack: error.stack, ...context },
      timestamp: new Date().toISOString(),
    } as LogContext);
  }

  private async logToFile(logContext: LogContext) {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const logDir = path.join(process.cwd(), 'logs');
      const logFile = path.join(logDir, 'api-requests.json');
      
      // Ensure logs directory exists
      try {
        await fs.mkdir(logDir, { recursive: true });
      } catch (e) {
        // Directory might already exist
      }
      
      // Append log entry to file
      const logEntry = JSON.stringify(logContext) + '\n';
      await fs.appendFile(logFile, logEntry);
      
    } catch (error) {
      console.error('Failed to write log to file:', error);
    }
  }

  getLogs(): LogContext[] {
    return [...this.logs];
  }

  getLogsByUserId(userId: string): LogContext[] {
    return this.logs.filter(log => log.userId === userId);
  }

  getLogsByRequestId(requestId: string): LogContext | undefined {
    return this.logs.find(log => log.requestId === requestId);
  }

  clearLogs() {
    this.logs = [];
  }
}

// Middleware function for Next.js API routes
export function withLogging(handler: Function) {
  return async (request: NextRequest, ...args: any[]) => {
    const logger = Logger.getInstance();
    const startTime = Date.now();
    
    // Log request
    const requestId = logger.logRequest(request);
    
    try {
      // Add request ID to request headers for downstream use
      request.headers.set('x-request-id', requestId);
      
      // Call the actual handler
      const response = await handler(request, ...args);
      
      // Log response
      const duration = Date.now() - startTime;
      logger.logResponse(requestId, response.status, duration);
      
      // Add request ID to response headers
      response.headers.set('x-request-id', requestId);
      
      return response;
    } catch (error) {
      // Log error
      const duration = Date.now() - startTime;
      logger.logError(requestId, error as Error);
      logger.logResponse(requestId, 500, duration, (error as Error).message);
      
      // Return error response
      return NextResponse.json(
        { 
          error: 'Internal server error',
          requestId,
          message: process.env.NODE_ENV === 'development' 
            ? (error as Error).message 
            : 'Something went wrong'
        },
        { status: 500 }
      );
    }
  };
}

// Utility function to get current request ID
export function getCurrentRequestId(request: NextRequest): string | undefined {
  return request.headers.get('x-request-id') || undefined;
}

// Utility function to log with current request context
export function logWithContext(request: NextRequest, message: string, data?: any) {
  const requestId = getCurrentRequestId(request);
  const logger = Logger.getInstance();
  
  if (requestId) {
    const logContext = logger.getLogsByRequestId(requestId);
    if (logContext) {
      console.log(`[${requestId}] ${message}`, {
        ...logContext,
        ...data,
      });
    }
  } else {
    console.log(message, data);
  }
}
