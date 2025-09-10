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

    // Set up authentication error handling
    dashboardService.setAuthErrorHandler((authError: Error) => {
      console.error('[REAL DATA API] Authentication error:', authError);
      // The error will be handled by the main try-catch block
    });

    // Get dashboard data from Graphy API for the authenticated user
    let dashboardData;
    let dataSource = 'unknown';
    try {
      dashboardData = await dashboardService.getDashboardByEmail(email);
      dataSource = 'graphy';
    } catch (serviceError) {
      console.error('[REAL DATA API] Service error:', serviceError);
      
      // Check if it's an authentication error
      if (serviceError instanceof Error && (serviceError as any).isAuthError) {
        console.error('[REAL DATA API] Authentication error detected:', serviceError.message);
        return NextResponse.json(
          { 
            error: 'Authentication failed',
            message: 'Invalid session! You must be logged in for this operation. Please log in again.',
            code: 'INVALID_SESSION'
          },
          { status: 401 }
        );
      }
      
      // Check if it's an API configuration error
      if (serviceError instanceof Error && serviceError.message.includes('Graphy API not configured')) {
        console.log('[REAL DATA API] Graphy API not configured, using demo data');
        // Return demo data instead of trying to call the service again
        dashboardData = {
          learner: {
            id: 'demo-learner-1',
            email: email,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            phone: '+1234567890',
            profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
          },
          products: [
            {
              product: {
                id: 'demo-product-1',
                title: 'Sanskrit Basics',
                description: 'Learn the fundamentals of Sanskrit language and grammar',
                thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
                price: 99,
                currency: 'USD',
                category: 'Language',
                tags: ['sanskrit', 'basics', 'language'],
                instructor: {
                  id: 'instructor-1',
                  name: 'Dr. Sanskrit Expert',
                  profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                },
                syllabus: [],
                duration: 300,
                difficulty: 'beginner',
                language: 'English',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T00:00:00Z',
                level: 'Beginner',
              },
              enrollment: {
                id: 'enrollment-1',
                learnerId: 'demo-learner-1',
                productId: 'demo-product-1',
                enrolledAt: '2024-01-01T00:00:00Z',
                status: 'active',
                progress: 75,
                lastAccessedAt: '2024-01-15T00:00:00Z',
              },
              progressReport: {
                productId: 'demo-product-1',
                learnerId: 'demo-learner-1',
                totalLessons: 10,
                completedLessons: 7,
                totalDuration: 300,
                watchedDuration: 225,
                progressPercentage: 75,
                lastWatchedLesson: 'lesson-2',
                lastWatchedTime: 45,
              },
              usageLast7Days: [],
              isEnrolled: true,
              canResume: true,
              nextLesson: null,
            }
          ],
          activityTimeline: [
            {
              id: 'activity-1',
              type: 'lesson_completion',
              title: 'Completed: Introduction to Sanskrit',
              description: 'Finished watching the introduction lesson',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              productId: 'demo-product-1',
              productTitle: 'Sanskrit Basics',
            }
          ],
          recommendations: [
            {
              id: 'rec-1',
              title: 'Vedic Philosophy',
              description: 'Explore the ancient wisdom of Vedic philosophy',
              thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
              category: 'Philosophy',
              level: 'Intermediate',
              reason: 'Based on your interest in Sanskrit literature',
              score: 0.95,
              productId: 'product-3'
            }
          ],
          certificates: [],
          transactions: [],
          summary: {
            totalCourses: 1,
            completedCourses: 0,
            inProgressCourses: 1,
            totalLearningTime: 225,
            averageCompletionRate: 75,
            streakDays: 3,
            lastActiveDate: new Date().toISOString(),
            totalCertificates: 0,
          }
        };
        dataSource = 'demo';
      } else {
        // Enhanced error handling with upstream details
        const errorResponse: any = {
          error: 'Dashboard service error',
          message: 'Unable to fetch dashboard data from Graphy. Please try again later.',
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        if (process.env.NODE_ENV === 'development') {
          errorResponse.details = serviceError instanceof Error ? serviceError.message : String(serviceError);
          
          // Include upstream error details if available
          if (serviceError instanceof Error && (serviceError as any).upstreamStatus) {
            errorResponse.upstreamError = {
              status: (serviceError as any).upstreamStatus,
              contentType: (serviceError as any).upstreamContentType,
              snippet: (serviceError as any).upstreamSnippet,
              errorCode: (serviceError as any).errorCode
            };
          }
        }

        return NextResponse.json(errorResponse, { status: 500 });
      }
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

    // Return the dashboard data
    return NextResponse.json({
      success: true,
      data: dashboardData,
      metadata: {
        generatedAt: new Date().toISOString(),
        responseTime: '0ms',
        cacheStatus: dataSource === 'graphy' ? 'real-data-from-graphy' : 'fallback-data',
        fallbackData: dataSource === 'fallback',
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