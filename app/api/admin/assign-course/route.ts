/**
 * Admin API Endpoint - Assign Course
 * POST /api/admin/assign-course
 * Assigns a course to a learner
 */

import { NextRequest, NextResponse } from 'next/server';
import { graphyClient } from '@/lib/api/graphy-client';
import { DASHBOARD_CONFIG } from '@/lib/config/dashboard';

// Simple admin authentication (in production, use proper JWT or API key auth)
function validateAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = request.headers.get('x-admin-api-key');
  
  // Check for admin API key
  if (apiKey === process.env.ADMIN_API_KEY) {
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

    // Parse request body
    const body = await request.json();
    const { learnerId, productId, reason } = body;

    // Validate required fields
    if (!learnerId || !productId) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'learnerId and productId are required'
        },
        { status: 400 }
      );
    }

    // Validate IDs format
    if (typeof learnerId !== 'string' || typeof productId !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid field types',
          message: 'learnerId and productId must be strings'
        },
        { status: 400 }
      );
    }

    // Log admin action
    console.log(`[ADMIN] Assigning course ${productId} to learner ${learnerId}. Reason: ${reason || 'Not specified'}`);

    // Assign course via Graphy API
    const success = await graphyClient.assignCourse(learnerId, productId);

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Assignment failed',
          message: 'Failed to assign course to learner'
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Course assigned successfully',
      data: {
        learnerId,
        productId,
        assignedAt: new Date().toISOString(),
        reason: reason || null,
      }
    }, {
      status: 201,
      headers: {
        'X-Admin-Action': 'course-assigned',
      }
    });

  } catch (error) {
    console.error('[ADMIN] Error assigning course:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while assigning the course'
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
