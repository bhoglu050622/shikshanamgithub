/**
 * Real Dashboard Data API Endpoint
 * GET /api/dashboard/real-data
 * Returns real course data for authenticated users based on Graphy API
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthCookie, validateAuthData } from '@/lib/server-cookies';
import { dashboardService } from '@/lib/dashboard/dashboard-service';

export async function GET(request: NextRequest) {
  try {
    // Get auth data from cookies
    const authData = getServerAuthCookie(request);
    
    if (!validateAuthData(authData)) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          message: 'Please log in to access your dashboard'
        },
        { status: 401 }
      );
    }

    const email = authData!.user.email;

    // Get dashboard data from Graphy API for the authenticated user
    let dashboardData;
    try {
      dashboardData = await dashboardService.getDashboardByEmail(email);
    } catch (serviceError) {
      console.error('[REAL DATA API] Service error:', serviceError);
      return NextResponse.json(
        { 
          error: 'Dashboard service error',
          message: 'Unable to fetch dashboard data from Graphy. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? (serviceError instanceof Error ? serviceError.message : String(serviceError)) : undefined
        },
        { status: 500 }
      );
    }

    if (!dashboardData) {
      return NextResponse.json(
        { 
          error: 'Learner not found',
          message: 'No learner found with your email address in Graphy. Please contact support.'
        },
        { status: 404 }
      );
    }

    // Return the dashboard data from Graphy
    return NextResponse.json({
      success: true,
      data: dashboardData,
      metadata: {
        generatedAt: new Date().toISOString(),
        responseTime: '0ms',
        cacheStatus: 'real-data-from-graphy',
        userEmail: email,
      }
    });

  } catch (error) {
    console.error('[REAL DATA API] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { 
        status: 500
      }
    );
  }
}