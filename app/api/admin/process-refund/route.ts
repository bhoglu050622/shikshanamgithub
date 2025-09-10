/**
 * Admin API Endpoint - Process Refund
 * POST /api/admin/process-refund
 * Processes a refund for a transaction
 */

import { NextRequest, NextResponse } from 'next/server';
import { graphyClient } from '@/lib/api/graphy-client';
import { checkRateLimit, getClientIP, validateRequestBody, sanitizeObject } from '@/lib/security';

// Enhanced admin authentication with security checks
function validateAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = request.headers.get('x-admin-api-key');
  
  // Check for admin API key
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    return true;
  }
  
  // Check for Bearer token
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // In production, verify JWT token here
    return token === process.env.ADMIN_JWT_TOKEN;
  }
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit for admin endpoints
    if (!checkRateLimit(clientIP, 'API')) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.'
        },
        { status: 429 }
      );
    }

    // Validate admin authentication
    if (!validateAdminAuth(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'Admin authentication required'
        },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const sanitizedBody = sanitizeObject(body);
    
    // Validate required fields
    const validation = validateRequestBody(sanitizedBody, ['transactionId', 'amount', 'reason']);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          message: 'Invalid request data',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    const { transactionId, amount, reason, adminNotes } = sanitizedBody;

    // Validate transactionId format
    if (typeof transactionId !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid field types',
          message: 'transactionId must be a string'
        },
        { status: 400 }
      );
    }

    // Validate amount if provided
    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
      return NextResponse.json(
        { 
          error: 'Invalid amount',
          message: 'Amount must be a positive number'
        },
        { status: 400 }
      );
    }

    // Log admin action
    console.log(`[ADMIN] Processing refund for transaction ${transactionId}. Amount: ${amount || 'full'}, Reason: ${reason || 'Not specified'}`);

    // Process refund via Graphy API
    const success = await graphyClient.processRefund(transactionId, amount);

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Refund failed',
          message: 'Failed to process refund for transaction'
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        transactionId,
        refundAmount: amount || null,
        processedAt: new Date().toISOString(),
        reason: reason || null,
        adminNotes: adminNotes || null,
      }
    }, {
      status: 201,
      headers: {
        'X-Admin-Action': 'refund-processed',
      }
    });

  } catch (error) {
    console.error('[ADMIN] Error processing refund:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing the refund'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'Only POST requests are supported for this endpoint'
    },
    { status: 405 }
  );
}
