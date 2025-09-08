/**
 * Simple Dashboard API Endpoint
 * GET /api/dashboard/simple
 * Returns mock dashboard data for testing authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthCookie, validateAuthData } from '@/lib/server-cookies';

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

    // Return mock dashboard data for testing
    const mockDashboardData = {
      learner: {
        id: 'mock-learner-1',
        email: email,
        name: authData!.user.name,
        phone: '+1234567890',
        profilePicture: authData!.user.avatar || 'https://via.placeholder.com/150',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      products: [
        {
          product: {
            id: 'product-1',
            title: 'Sanskrit Basics',
            description: 'Learn the fundamentals of Sanskrit language and grammar',
            thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
            price: 99,
            currency: 'USD',
            category: 'Language',
            tags: ['sanskrit', 'basics', 'language', 'grammar'],
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
          },
          enrollment: {
            id: 'enrollment-1',
            learnerId: 'mock-learner-1',
            productId: 'product-1',
            enrolledAt: '2024-01-01T00:00:00Z',
            status: 'active',
            progress: 75,
            lastAccessedAt: '2024-01-15T00:00:00Z',
          },
          progressReport: {
            productId: 'product-1',
            learnerId: 'mock-learner-1',
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
        }
      ],
      activityTimeline: [
        {
          id: 'activity-1',
          type: 'lesson_completion',
          title: 'Completed: Introduction to Sanskrit',
          description: 'Finished watching the introduction lesson',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          productId: 'product-1',
          productTitle: 'Sanskrit Basics'
        }
      ],
      recommendations: [
        {
          productId: 'product-3',
          product: {
            id: 'product-3',
            title: 'Vedic Philosophy',
            description: 'Explore the ancient wisdom of Vedic philosophy and its modern applications',
            thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
            price: 149,
            currency: 'USD',
            category: 'Philosophy',
            tags: ['vedic', 'philosophy', 'wisdom', 'ancient'],
            instructor: {
              id: 'instructor-3',
              name: 'Dr. Vedic Scholar',
              profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            },
            syllabus: [],
            duration: 450,
            difficulty: 'intermediate',
            language: 'English',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          score: 0.95,
          reason: 'Based on your interest in Sanskrit literature',
          type: 'category_match'
        },
        {
          productId: 'product-4',
          product: {
            id: 'product-4',
            title: 'Yoga Sutras of Patanjali',
            description: 'Deep dive into the foundational text of classical yoga philosophy',
            thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&crop=center',
            price: 199,
            currency: 'USD',
            category: 'Yoga',
            tags: ['yoga', 'sutras', 'patanjali', 'philosophy'],
            instructor: {
              id: 'instructor-4',
              name: 'Master Yoga Teacher',
              profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            },
            syllabus: [],
            duration: 600,
            difficulty: 'advanced',
            language: 'English',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          score: 0.88,
          reason: 'Recommended for Sanskrit literature students',
          type: 'similar'
        },
        {
          productId: 'product-5',
          product: {
            id: 'product-5',
            title: 'Bhagavad Gita Study',
            description: 'Comprehensive study of the Bhagavad Gita with Sanskrit text analysis',
            thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
            price: 179,
            currency: 'USD',
            category: 'Scripture',
            tags: ['bhagavad-gita', 'scripture', 'sanskrit', 'philosophy'],
            instructor: {
              id: 'instructor-5',
              name: 'Prof. Gita Scholar',
              profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            },
            syllabus: [],
            duration: 500,
            difficulty: 'intermediate',
            language: 'English',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          score: 0.82,
          reason: 'Popular among Sanskrit learners',
          type: 'popular'
        }
      ],
      certificates: [],
      transactions: [
        {
          id: 'transaction-1',
          learnerId: 'mock-learner-1',
          productId: 'product-1',
          amount: 99,
          currency: 'USD',
          status: 'completed',
          paymentMethod: 'Credit Card',
          createdAt: '2024-01-01T00:00:00Z',
        }
      ],
      summary: {
        totalCourses: 1,
        completedCourses: 0,
        inProgressCourses: 1,
        totalLearningTime: 225,
        certificatesEarned: 0,
        currentStreak: 5,
        longestStreak: 10,
        averageScore: 85,
        totalSpent: 99,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      }
    };

    return NextResponse.json({
      success: true,
      data: mockDashboardData,
      metadata: {
        generatedAt: new Date().toISOString(),
        responseTime: '0ms',
        cacheStatus: 'mock',
        userEmail: email,
      }
    });

  } catch (error) {
    console.error('[SIMPLE DASHBOARD API] Error:', error);
    
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
