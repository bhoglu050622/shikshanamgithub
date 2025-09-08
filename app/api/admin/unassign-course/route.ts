/**
 * Admin API Endpoint - Unassign Course
 * DELETE /api/admin/unassign-course
 * Unassigns a course from a learner
 */

import { NextRequest, NextResponse } from 'next/server';
import { graphyClient } from '@/lib/api/graphy-client';

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

export async function DELETE(request: NextRequest) {
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
    const { learnerId, enrollmentId, reason } = body;

    // Validate required fields
    if (!learnerId || !enrollmentId) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'learnerId and enrollmentId are required'
        },
        { status: 400 }
      );
    }

    // Validate IDs format
    if (typeof learnerId !== 'string' || typeof enrollmentId !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid field types',
          message: 'learnerId and enrollmentId must be strings'
        },
        { status: 400 }
      );
    }

    // Log admin action
    console.log(`[ADMIN] Unassigning enrollment ${enrollmentId} from learner ${learnerId}. Reason: ${reason || 'Not specified'}`);

    // Unassign course via Graphy API
    const success = await graphyClient.unassignCourse(learnerId, enrollmentId);

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Unassignment failed',
          message: 'Failed to unassign course from learner'
        },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Course unassigned successfully',
      data: {
        learnerId,
        enrollmentId,
        unassignedAt: new Date().toISOString(),
        reason: reason || null,
      }
    }, {
      headers: {
        'X-Admin-Action': 'course-unassigned',
      }
    });

  } catch (error) {
    console.error('[ADMIN] Error unassigning course:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while unassigning the course'
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
      message: 'Only DELETE requests are supported for this endpoint'
    },
    { status: 405 }
  );
}
