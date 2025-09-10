/**
 * Real-time Course Recommendations API
 * Generates dynamic recommendations based on learner behavior and preferences
 */

import { NextRequest, NextResponse } from 'next/server';
import { dashboardService } from '@/lib/dashboard/dashboard-service';
import { recommendationEngine } from '@/lib/dashboard/recommendation-engine';
import { graphyClient } from '@/lib/api/graphy-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Get learner data
    let learner;
    try {
      learner = await graphyClient.getLearnerByEmail(email);
    } catch (error) {
      console.error('Error fetching learner:', error);
      if (error instanceof Error && error.message.includes('Graphy API not configured')) {
        // Create a mock learner for demo purposes
        learner = {
          id: 'mock-learner-1',
          email: email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          phone: '+1234567890',
          profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z',
        };
      } else {
        // Enhanced error handling with upstream details
        const errorResponse: any = {
          error: 'Failed to fetch learner data',
          message: 'Unable to fetch learner information from Graphy API',
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        if (process.env.NODE_ENV === 'development') {
          errorResponse.details = error instanceof Error ? error.message : String(error);
          
          // Include upstream error details if available
          if (error instanceof Error && (error as any).upstreamStatus) {
            errorResponse.upstreamError = {
              status: (error as any).upstreamStatus,
              contentType: (error as any).upstreamContentType,
              snippet: (error as any).upstreamSnippet,
              errorCode: (error as any).errorCode
            };
          }
        }

        return NextResponse.json(errorResponse, { status: 500 });
      }
    }
    
    if (!learner) {
      return NextResponse.json(
        { error: 'Learner not found' },
        { status: 404 }
      );
    }

    // Get learner's enrollments and progress
    let enrollments: any[] = [];
    let progressReports: any[] = [];
    
    try {
      enrollments = await graphyClient.getLearnerEnrollments(learner.id);
      progressReports = await Promise.all(
        enrollments.map(enrollment =>
          graphyClient.getCourseProgressReport(enrollment.productId, learner.id)
        )
      ).then(results => results.filter((report): report is NonNullable<typeof report> => report !== null));
    } catch (error) {
      console.error('Error fetching enrollments/progress:', error);
      // Use empty arrays for demo mode when API is not configured
      if (error instanceof Error && error.message.includes('Graphy API not configured')) {
        enrollments = [];
        progressReports = [];
      } else {
        // For other errors, still use empty arrays but log the error
        console.error('Non-configuration error in enrollments/progress:', error);
        enrollments = [];
        progressReports = [];
      }
    }

    // Get all available products for recommendations
    const allProducts = await getAllAvailableProducts();
    const popularProducts = await getPopularProducts();

    // Build learner profile
    const learnerProfile = recommendationEngine.buildLearnerProfile(
      learner,
      enrollments,
      progressReports,
      allProducts
    );

    // Generate real-time recommendations
    const recommendations = await recommendationEngine.generateRecommendations(
      learnerProfile,
      allProducts,
      popularProducts
    );

    // Add real-time factors
    const enhancedRecommendations = await enhanceRecommendationsWithRealTimeFactors(
      recommendations,
      learnerProfile,
      allProducts
    );

    return NextResponse.json({
      success: true,
      data: {
        recommendations: enhancedRecommendations,
        learnerProfile: {
          preferredCategories: learnerProfile.preferredCategories,
          preferredTags: learnerProfile.preferredTags,
          averageCompletionRate: learnerProfile.averageCompletionRate,
          totalLearningTime: learnerProfile.totalLearningTime,
        },
        generatedAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Error generating recommendations:', error);
    
    // Enhanced error handling with upstream details
    const errorResponse: any = {
      error: 'Failed to generate recommendations',
      message: 'An unexpected error occurred while generating recommendations',
      timestamp: new Date().toISOString(),
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    if (process.env.NODE_ENV === 'development') {
      errorResponse.details = error instanceof Error ? error.message : String(error);
      
      // Include upstream error details if available
      if (error instanceof Error && (error as any).upstreamStatus) {
        errorResponse.upstreamError = {
          status: (error as any).upstreamStatus,
          contentType: (error as any).upstreamContentType,
          snippet: (error as any).upstreamSnippet,
          errorCode: (error as any).errorCode
        };
      }
    }

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * Get all available products for recommendations
 */
async function getAllAvailableProducts() {
  try {
    // In a real implementation, this would call the Graphy API
    // For now, return a comprehensive list of available courses
    return [
      {
        id: 'sanskrit-basics',
        title: 'Sanskrit Basics',
        description: 'Learn the fundamentals of Sanskrit language',
        category: 'Language',
        tags: ['beginner', 'language', 'sanskrit'],
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        price: 0,
        currency: 'INR',
        instructor: { id: 'instructor-1', name: 'Dr. Priya Sharma', profilePicture: '' },
        difficulty: 'beginner' as const,
        language: 'English',
        duration: 120,
        syllabus: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'vedic-philosophy',
        title: 'Vedic Philosophy',
        description: 'Explore the ancient wisdom of Vedic philosophy',
        category: 'Philosophy',
        tags: ['philosophy', 'vedic', 'wisdom'],
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        price: 2999,
        currency: 'INR',
        instructor: { id: 'instructor-2', name: 'Prof. Rajesh Kumar', profilePicture: '' },
        difficulty: 'intermediate' as const,
        language: 'English',
        duration: 180,
        syllabus: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'yoga-sutras',
        title: 'Yoga Sutras of Patanjali',
        description: 'Deep dive into classical yoga philosophy',
        category: 'Yoga',
        tags: ['yoga', 'philosophy', 'classical'],
        thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&crop=center',
        price: 1999,
        currency: 'INR',
        instructor: { id: 'instructor-3', name: 'Guru Meera Patel', profilePicture: '' },
        difficulty: 'advanced' as const,
        language: 'English',
        duration: 240,
        syllabus: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'bhagavad-gita',
        title: 'Bhagavad Gita Study',
        description: 'Comprehensive study of the Bhagavad Gita',
        category: 'Scripture',
        tags: ['scripture', 'bhagavad-gita', 'spiritual'],
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        price: 1499,
        currency: 'INR',
        instructor: { id: 'instructor-4', name: 'Swami Ananda', profilePicture: '' },
        difficulty: 'intermediate' as const,
        language: 'English',
        duration: 200,
        syllabus: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'sanskrit-poetry',
        title: 'Sanskrit Poetry Workshop',
        description: 'Learn classical Sanskrit poetry composition',
        category: 'Creative Writing',
        tags: ['poetry', 'creative', 'sanskrit'],
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        price: 2499,
        currency: 'INR',
        instructor: { id: 'instructor-5', name: 'Dr. Sanskriti Devi', profilePicture: '' },
        difficulty: 'advanced' as const,
        language: 'English',
        duration: 160,
        syllabus: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'ayurveda-basics',
        title: 'Ayurveda Fundamentals',
        description: 'Introduction to traditional Indian medicine',
        category: 'Health',
        tags: ['ayurveda', 'health', 'traditional'],
        thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&crop=center',
        price: 1799,
        currency: 'INR',
        instructor: { id: 'instructor-6', name: 'Dr. Vaidya Sharma', profilePicture: '' },
        difficulty: 'beginner' as const,
        language: 'English',
        duration: 140,
        syllabus: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  } catch (error) {
    console.error('Error fetching available products:', error);
    return [];
  }
}

/**
 * Get popular products based on enrollment data
 */
async function getPopularProducts() {
  try {
    // In a real implementation, this would analyze enrollment data
    // For now, return a curated list of popular courses
    const allProducts = await getAllAvailableProducts();
    return allProducts.slice(0, 3); // Top 3 popular courses
  } catch (error) {
    console.error('Error fetching popular products:', error);
    return [];
  }
}

/**
 * Enhance recommendations with real-time factors
 */
async function enhanceRecommendationsWithRealTimeFactors(
  recommendations: any[],
  learnerProfile: any,
  allProducts: any[]
) {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  
  return recommendations.map(rec => {
    let enhancedScore = rec.score;
    let enhancedReason = rec.reason;
    
    // Time-based recommendations
    if (currentHour >= 6 && currentHour <= 10) {
      // Morning: Recommend meditation and philosophy courses
      if (rec.product.category === 'Philosophy' || rec.product.category === 'Yoga') {
        enhancedScore *= 1.2;
        enhancedReason = `Perfect for morning learning: ${rec.reason}`;
      }
    } else if (currentHour >= 18 && currentHour <= 22) {
      // Evening: Recommend creative and language courses
      if (rec.product.category === 'Creative Writing' || rec.product.category === 'Language') {
        enhancedScore *= 1.15;
        enhancedReason = `Great for evening study: ${rec.reason}`;
      }
    }
    
    // Weekend recommendations
    if (currentDay === 0 || currentDay === 6) {
      // Weekend: Boost longer courses
      if (rec.product.duration > 180) {
        enhancedScore *= 1.1;
        enhancedReason = `Weekend deep-dive: ${rec.reason}`;
      }
    }
    
    // Learning streak bonus
    if (learnerProfile.totalLearningTime > 1000) {
      // Experienced learner: Recommend advanced courses
      if (rec.product.level === 'Advanced') {
        enhancedScore *= 1.25;
        enhancedReason = `For your advanced level: ${rec.reason}`;
      }
    }
    
    // Recent activity bonus
    const recentActivity = getRecentActivityBonus(learnerProfile);
    if (recentActivity > 0) {
      enhancedScore *= (1 + recentActivity * 0.1);
      enhancedReason = `Based on your recent activity: ${rec.reason}`;
    }
    
    return {
      ...rec,
      score: Math.min(enhancedScore, 1.0), // Cap at 1.0
      reason: enhancedReason,
      realTimeFactors: {
        timeOfDay: currentHour,
        dayOfWeek: currentDay,
        learningStreak: learnerProfile.totalLearningTime > 1000,
        recentActivity: recentActivity
      }
    };
  }).sort((a, b) => b.score - a.score);
}

/**
 * Calculate recent activity bonus
 */
function getRecentActivityBonus(learnerProfile: any): number {
  // This would analyze recent learning patterns
  // For now, return a simple bonus based on completion rate
  return learnerProfile.averageCompletionRate > 70 ? 0.5 : 0;
}
