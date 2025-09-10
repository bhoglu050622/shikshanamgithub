/**
 * Error Analytics API Endpoint
 * POST /api/analytics/error
 * Collects and logs client-side errors for monitoring and debugging
 */

import { NextRequest, NextResponse } from 'next/server';

interface ErrorData {
  errorId: string;
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
  sessionId?: string;
  additionalData?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const errorData: ErrorData = await request.json();
    
    // Validate required fields
    if (!errorData.errorId || !errorData.message || !errorData.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: errorId, message, timestamp' },
        { status: 400 }
      );
    }

    // Get additional context
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const referer = request.headers.get('referer') || 'unknown';

    // Enhanced error data
    const enhancedErrorData = {
      ...errorData,
      userAgent,
      ip,
      referer,
      serverTimestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Client Error:', enhancedErrorData);
    }

    // Log to file or external service
    await logErrorToFile(enhancedErrorData);

    // Send to external monitoring service (if configured)
    if (process.env.ERROR_MONITORING_SERVICE) {
      await sendToMonitoringService(enhancedErrorData);
    }

    // Store in database (if configured)
    if (process.env.DATABASE_URL) {
      await storeErrorInDatabase(enhancedErrorData);
    }

    return NextResponse.json({
      success: true,
      errorId: errorData.errorId,
      message: 'Error logged successfully',
    });

  } catch (error) {
    console.error('Failed to log error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to log error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function logErrorToFile(errorData: any) {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, 'client-errors.json');
    
    // Ensure logs directory exists
    try {
      await fs.mkdir(logDir, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }
    
    // Append error to log file
    const logEntry = JSON.stringify(errorData) + '\n';
    await fs.appendFile(logFile, logEntry);
    
  } catch (error) {
    console.error('Failed to write error to file:', error);
  }
}

async function sendToMonitoringService(errorData: any) {
  try {
    const monitoringUrl = process.env.ERROR_MONITORING_SERVICE;
    if (!monitoringUrl) return;

    await fetch(monitoringUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ERROR_MONITORING_TOKEN}`,
      },
      body: JSON.stringify(errorData),
    });
  } catch (error) {
    console.error('Failed to send error to monitoring service:', error);
  }
}

async function storeErrorInDatabase(errorData: any) {
  try {
    // This would integrate with your database
    // For now, just log that we would store it
    console.log('Would store error in database:', errorData.errorId);
  } catch (error) {
    console.error('Failed to store error in database:', error);
  }
}
