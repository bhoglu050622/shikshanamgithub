/**
 * Dashboard Service
 * Aggregates data from multiple sources to build a comprehensive student dashboard
 */

import { graphyClient, type GraphyLearner, type GraphyProduct, type GraphyEnrollment, type GraphyProgressReport, type GraphyUsage, type GraphyDiscussion, type GraphyQuizReport, type GraphyTransaction } from '@/lib/api/graphy-client';
import { recommendationEngine, type LearnerProfile, type Recommendation } from '@/lib/dashboard/recommendation-engine';

export interface DashboardData {
  learner: GraphyLearner;
  products: DashboardProduct[];
  activityTimeline: ActivityItem[];
  recommendations: Recommendation[];
  certificates: Certificate[];
  transactions: GraphyTransaction[];
  summary: DashboardSummary;
}

export interface DashboardProduct {
  product: GraphyProduct;
  enrollment?: GraphyEnrollment;
  progressReport?: GraphyProgressReport;
  usageLast7Days: GraphyUsage[];
  isEnrolled: boolean;
  canResume: boolean;
  nextLesson?: any;
}

export interface ActivityItem {
  id: string;
  type: 'discussion' | 'quiz_completion' | 'lesson_completion' | 'liveclass_attendance' | 'enrollment' | 'certificate_earned';
  title: string;
  description: string;
  timestamp: string;
  productId?: string;
  productTitle?: string;
  metadata?: any;
}

export interface Certificate {
  id: string;
  productId: string;
  productTitle: string;
  earnedAt: string;
  downloadUrl: string;
  verificationCode: string;
}

export interface DashboardSummary {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLearningTime: number; // in minutes
  averageCompletionRate: number;
  streakDays: number;
  lastActiveDate: string;
  totalCertificates: number;
}

export class DashboardService {
  /**
   * Get comprehensive dashboard data for a learner by email
   */
  async getDashboardByEmail(email: string): Promise<DashboardData | null> {
    try {
      // 1. Find learner by email
      const learner = await graphyClient.getLearnerByEmail(email);
      if (!learner) {
        return null;
      }

      // 2. Fetch enrollments first
      const enrollments = await graphyClient.getLearnerEnrollments(learner.id);

      // 3. Fetch all other learner data in parallel
      const [
        progressReports,
        usage,
        discussions,
        quizReports,
        transactions
      ] = await Promise.all([
        this.getProgressReportsForEnrollments(learner.id, enrollments),
        graphyClient.getLearnerUsage(learner.id, 7),
        graphyClient.getLearnerDiscussions(learner.id, 50, 0),
        graphyClient.getLearnerQuizReports(learner.id, 50, 0),
        graphyClient.getLearnerTransactions(learner.id, 50, 0)
      ]);

      // 4. Get product details for all enrolled courses
      const productIds = enrollments.map(e => e.productId);
      const products = await this.getProductsByIds(productIds);

      // 5. Build dashboard products with progress and usage data
      const dashboardProducts = await this.buildDashboardProducts(
        products,
        enrollments,
        progressReports,
        usage
      );

      // 6. Generate recommendations
      const learnerProfile = recommendationEngine.buildLearnerProfile(
        learner,
        enrollments,
        progressReports,
        products
      );
      
      const allProducts = await graphyClient.getAllProducts();
      const popularProducts = await graphyClient.getPopularProducts();
      const recommendations = await recommendationEngine.generateRecommendations(
        learnerProfile,
        allProducts,
        popularProducts
      );

      // 7. Build activity timeline
      const activityTimeline = this.buildActivityTimeline(
        discussions,
        quizReports,
        progressReports,
        enrollments
      );

      // 8. Extract certificates
      const certificates = this.extractCertificates(transactions, products);

      // 9. Build summary
      const summary = this.buildDashboardSummary(
        enrollments,
        progressReports,
        usage,
        certificates
      );

      // 10. Get recent activity and recommendations from mock data
      const recentActivity = this.getMockRecentActivity(learner.id);
      const mockRecommendations = this.getMockRecommendations(learner.id);

      return {
        learner,
        products: dashboardProducts,
        activityTimeline,
        recommendations: mockRecommendations,
        certificates,
        transactions,
        summary,
      };
    } catch (error) {
      console.error('Error building dashboard:', error);
      throw new Error('Failed to build dashboard data');
    }
  }

  /**
   * Get progress reports for all enrollments
   */
  private async getProgressReportsForEnrollments(
    learnerId: string,
    enrollments: GraphyEnrollment[]
  ): Promise<GraphyProgressReport[]> {
    const progressPromises = enrollments.map(enrollment =>
      graphyClient.getCourseProgressReport(enrollment.productId, learnerId)
    );

    const progressResults = await Promise.allSettled(progressPromises);
    return progressResults
      .filter((result): result is PromiseFulfilledResult<GraphyProgressReport> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  }

  /**
   * Get multiple products by IDs
   */
  private async getProductsByIds(productIds: string[]): Promise<GraphyProduct[]> {
    const productPromises = productIds.map(id => graphyClient.getProduct(id));
    const productResults = await Promise.allSettled(productPromises);
    
    return productResults
      .filter((result): result is PromiseFulfilledResult<GraphyProduct> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value);
  }

  /**
   * Build dashboard products with enriched data
   */
  private async buildDashboardProducts(
    products: GraphyProduct[],
    enrollments: GraphyEnrollment[],
    progressReports: GraphyProgressReport[],
    usage: GraphyUsage[]
  ): Promise<DashboardProduct[]> {
    return products.map(product => {
      const enrollment = enrollments.find(e => e.productId === product.id);
      const progressReport = progressReports.find(pr => pr.productId === product.id);
      const productUsage = usage.filter(u => 
        // Filter usage for this specific product (assuming usage has productId)
        (u as any).productId === product.id
      );

      const canResume = !!(enrollment && 
        enrollment.status === 'active' && 
        progressReport && 
        progressReport.progressPercentage < 100);

      const nextLesson = canResume && progressReport?.lastWatchedLesson
        ? this.findNextUnlockedLesson(product, progressReport.lastWatchedLesson)
        : null;

      return {
        product: {
          ...product,
          level: (product as any).level || (product as any).difficulty || 'All Levels',
          duration: (product as any).durationText || `${Math.round((product as any).duration / 60)} hours` || 'Self-paced'
        },
        enrollment,
        progressReport,
        usageLast7Days: productUsage,
        isEnrolled: !!enrollment,
        canResume,
        nextLesson,
      };
    });
  }

  /**
   * Find next unlocked lesson in a course
   */
  private findNextUnlockedLesson(product: GraphyProduct, lastWatchedLessonId: string): any {
    const syllabus = product.syllabus || [];
    const lastWatchedIndex = syllabus.findIndex(item => item.id === lastWatchedLessonId);
    
    if (lastWatchedIndex === -1) return null;

    for (let i = lastWatchedIndex + 1; i < syllabus.length; i++) {
      const lesson = syllabus[i];
      if (!lesson.isLocked && !lesson.isCompleted) {
        return lesson;
      }
    }

    return null;
  }

  /**
   * Build activity timeline from various sources
   */
  private buildActivityTimeline(
    discussions: GraphyDiscussion[],
    quizReports: GraphyQuizReport[],
    progressReports: GraphyProgressReport[],
    enrollments: GraphyEnrollment[]
  ): ActivityItem[] {
    const activities: ActivityItem[] = [];

    // Add discussions
    discussions.forEach(discussion => {
      activities.push({
        id: `discussion-${discussion.id}`,
        type: 'discussion',
        title: 'Posted in discussion',
        description: discussion.content.substring(0, 100) + '...',
        timestamp: discussion.createdAt,
        productId: discussion.productId,
        metadata: { discussionId: discussion.id },
      });
    });

    // Add quiz completions
    quizReports.forEach(quiz => {
      activities.push({
        id: `quiz-${quiz.id}`,
        type: 'quiz_completion',
        title: 'Completed quiz',
        description: `Score: ${quiz.score}/${quiz.totalQuestions}`,
        timestamp: quiz.completedAt,
        productId: quiz.productId,
        metadata: { quizId: quiz.quizId, score: quiz.score },
      });
    });

    // Add lesson completions (from progress reports)
    progressReports.forEach(progress => {
      if (progress.completionDate) {
        activities.push({
          id: `lesson-${progress.productId}`,
          type: 'lesson_completion',
          title: 'Completed course',
          description: `${progress.completedLessons}/${progress.totalLessons} lessons`,
          timestamp: progress.completionDate,
          productId: progress.productId,
          metadata: { progressPercentage: progress.progressPercentage },
        });
      }
    });

    // Add enrollments
    enrollments.forEach(enrollment => {
      activities.push({
        id: `enrollment-${enrollment.id}`,
        type: 'enrollment',
        title: 'Enrolled in course',
        description: 'Started new learning journey',
        timestamp: enrollment.enrolledAt,
        productId: enrollment.productId,
        metadata: { enrollmentId: enrollment.id },
      });
    });

    // Sort by timestamp (newest first)
    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  /**
   * Extract certificates from transactions
   */
  private extractCertificates(
    transactions: GraphyTransaction[],
    products: GraphyProduct[]
  ): Certificate[] {
    return transactions
      .filter(t => t.status === 'completed')
      .map(transaction => {
        const product = products.find(p => p.id === transaction.productId);
        return {
          id: `cert-${transaction.id}`,
          productId: transaction.productId,
          productTitle: product?.title || 'Unknown Course',
          earnedAt: transaction.createdAt,
          downloadUrl: `/api/certificates/${transaction.id}/download`,
          verificationCode: transaction.id.substring(0, 8).toUpperCase(),
        };
      });
  }

  /**
   * Build dashboard summary
   */
  private buildDashboardSummary(
    enrollments: GraphyEnrollment[],
    progressReports: GraphyProgressReport[],
    usage: GraphyUsage[],
    certificates: Certificate[]
  ): DashboardSummary {
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.status === 'completed').length;
    const inProgressCourses = enrollments.filter(e => e.status === 'active' && e.progress < 100).length;
    
    const totalLearningTime = progressReports.reduce(
      (sum, pr) => sum + pr.watchedDuration, 0
    );

    const averageCompletionRate = enrollments.length > 0
      ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
      : 0;

    // Calculate streak (simplified - consecutive days with activity)
    const streakDays = this.calculateStreakDays(usage);

    const lastActiveDate = usage.length > 0 
      ? usage[usage.length - 1].date 
      : new Date().toISOString();

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalLearningTime,
      averageCompletionRate,
      streakDays,
      lastActiveDate,
      totalCertificates: certificates.length,
    };
  }

  /**
   * Calculate learning streak days
   */
  private calculateStreakDays(usage: GraphyUsage[]): number {
    if (usage.length === 0) return 0;

    const sortedUsage = usage.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const day of sortedUsage) {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);

      if (dayDate.getTime() === currentDate.getTime() && day.duration > 0) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }


  /**
   * Get mock recent activity data
   */
  private getMockRecentActivity(learnerId: string): any[] {
    return [
      {
        id: 'activity-1',
        type: 'lesson_completed',
        title: 'Completed: Introduction to Sanskrit',
        description: 'Finished watching the introduction lesson',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        courseTitle: 'Sanskrit Basics',
        courseId: 'product-1'
      },
      {
        id: 'activity-2',
        type: 'quiz_passed',
        title: 'Quiz Passed: Sanskrit Alphabet',
        description: 'Scored 85% on the alphabet quiz',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        courseTitle: 'Sanskrit Basics',
        courseId: 'product-1'
      },
      {
        id: 'activity-3',
        type: 'certificate_earned',
        title: 'Certificate Earned: Advanced Sanskrit Literature',
        description: 'Completed the advanced literature course',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        courseTitle: 'Advanced Sanskrit Literature',
        courseId: 'product-2'
      },
      {
        id: 'activity-4',
        type: 'course_enrolled',
        title: 'Enrolled in: Vedic Philosophy',
        description: 'Started a new course on Vedic philosophy',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        courseTitle: 'Vedic Philosophy',
        courseId: 'product-3'
      },
      {
        id: 'activity-5',
        type: 'lesson_completed',
        title: 'Completed: Basic Grammar Rules',
        description: 'Finished the grammar fundamentals lesson',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        courseTitle: 'Sanskrit Basics',
        courseId: 'product-1'
      }
    ];
  }

  /**
   * Get mock recommendations data
   */
  private getMockRecommendations(learnerId: string): any[] {
    return [
      {
        id: 'rec-1',
        title: 'Vedic Philosophy',
        description: 'Explore the ancient wisdom of Vedic philosophy and its modern applications',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        category: 'Philosophy',
        level: 'Intermediate',
        reason: 'Based on your interest in Sanskrit literature',
        score: 0.95,
        productId: 'product-3'
      },
      {
        id: 'rec-2',
        title: 'Yoga Sutras of Patanjali',
        description: 'Deep dive into the foundational text of classical yoga philosophy',
        thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop&crop=center',
        category: 'Yoga',
        level: 'Advanced',
        reason: 'Recommended for Sanskrit literature students',
        score: 0.88,
        productId: 'product-4'
      },
      {
        id: 'rec-3',
        title: 'Bhagavad Gita Study',
        description: 'Comprehensive study of the Bhagavad Gita with Sanskrit text analysis',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        category: 'Scripture',
        level: 'Intermediate',
        reason: 'Popular among Sanskrit learners',
        score: 0.82,
        productId: 'product-5'
      },
      {
        id: 'rec-4',
        title: 'Sanskrit Poetry Workshop',
        description: 'Learn to compose and appreciate classical Sanskrit poetry',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
        category: 'Creative Writing',
        level: 'Advanced',
        reason: 'Perfect for literature enthusiasts',
        score: 0.79,
        productId: 'product-6'
      }
    ];
  }
}

export const dashboardService = new DashboardService();
