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
  private authErrorHandler?: (error: Error) => void;

  constructor() {
    // Set up authentication error handling for Graphy client
    graphyClient.setAuthErrorHandler((error: Error) => {
      console.error('Dashboard Service: Graphy API authentication error:', error);
      if (this.authErrorHandler) {
        this.authErrorHandler(error);
      }
    });
  }

  setAuthErrorHandler(handler: (error: Error) => void): void {
    this.authErrorHandler = handler;
  }

  /**
   * Get comprehensive dashboard data for a learner by email
   */
  async getDashboardByEmail(email: string): Promise<DashboardData | null> {
    try {
      // 1. Find learner by email
      let learner: GraphyLearner | null = null;
      try {
        learner = await graphyClient.getLearnerByEmail(email);
      } catch (error) {
        console.error('Error fetching learner from Graphy API:', error);
        // If API is not configured, create a mock learner for demo purposes
        if (error instanceof Error && error.message.includes('Graphy API not configured')) {
          console.log('🔄 Graphy API not configured, using demo data');
          learner = this.createMockLearner(email);
        } else {
          throw error; // Re-throw other errors
        }
      }
      
      if (!learner) {
        return null;
      }

      // 2. Fetch enrollments first with error handling
      let enrollments: GraphyEnrollment[] = [];
      try {
        enrollments = await graphyClient.getLearnerEnrollments(learner.id);
        console.log(`📚 Found ${enrollments.length} enrollments for learner ${learner.email}`);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
        // If API is not configured, use mock enrollments
        if (error instanceof Error && error.message.includes('Graphy API not configured')) {
          enrollments = this.getMockEnrollments(learner.id);
        } else {
          enrollments = [];
        }
      }

      // 3. Fetch all other learner data in parallel with individual error handling
      const results = await Promise.allSettled([
        this.getProgressReportsForEnrollments(learner.id, enrollments),
        graphyClient.getLearnerUsage(learner.id, 7),
        graphyClient.getLearnerDiscussions(learner.id, 50, 0),
        graphyClient.getLearnerQuizReports(learner.id, 50, 0),
        graphyClient.getLearnerTransactions(learner.id, 50, 0)
      ]);

      const progressReports = results[0].status === 'fulfilled' ? results[0].value : [];
      const usage = results[1].status === 'fulfilled' ? results[1].value : [];
      const discussions = results[2].status === 'fulfilled' ? results[2].value : [];
      const quizReports = results[3].status === 'fulfilled' ? results[3].value : [];
      const transactions = results[4].status === 'fulfilled' ? results[4].value : [];

      // 4. Get product details for all enrolled courses with error handling
      let products: GraphyProduct[] = [];
      try {
        const productIds = enrollments.map(e => e.productId);
        console.log(`🔍 Fetching products for IDs: ${productIds.join(', ')}`);
        products = await this.getProductsByIds(productIds);
        console.log(`📖 Retrieved ${products.length} products from Graphy API`);
      } catch (error) {
        console.error('Error fetching products:', error);
        // If API is not configured, use mock products
        if (error instanceof Error && error.message.includes('Graphy API not configured')) {
          products = this.getMockProducts();
        } else {
          products = [];
        }
      }

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
      
      // Don't return fallback data - let the error propagate
      console.error('Failed to build dashboard data - no fallback provided');
      throw error;
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

  /**
   * Create mock learner data
   */
  private createMockLearner(email: string): GraphyLearner {
    const names = {
      'test@example.com': 'Test Student',
      'aman@shikshanam.com': 'Aman Bhogal',
      'bhoglu.aman@gmail.com': 'Aman Bhogal',
      'amanbhogal.work@gmail.com': 'Aman Bhogal',
      'student@example.com': 'John Doe',
      'learner@test.com': 'Jane Smith'
    };
    
    return {
      id: 'mock-learner-1',
      email: email,
      name: names[email as keyof typeof names] || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      phone: '+1234567890',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    };
  }

  /**
   * Get mock enrollments data
   */
  private getMockEnrollments(learnerId: string): GraphyEnrollment[] {
    return [
      {
        id: 'enrollment-1',
        learnerId: learnerId,
        productId: 'product-1',
        enrolledAt: '2024-01-01T00:00:00Z',
        status: 'active',
        progress: 75,
        lastAccessedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: 'enrollment-2',
        learnerId: learnerId,
        productId: 'product-2',
        enrolledAt: '2024-01-01T00:00:00Z',
        status: 'completed',
        progress: 100,
        lastAccessedAt: '2024-01-20T00:00:00Z',
        completedAt: '2024-01-20T00:00:00Z',
      },
    ];
  }

  /**
   * Get mock products data
   */
  private getMockProducts(): GraphyProduct[] {
    return [
      {
        id: 'product-1',
        title: 'Sanskrit Basics',
        description: 'Learn the fundamentals of Sanskrit language and grammar with interactive exercises and cultural context',
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
        syllabus: [
          {
            id: 'lesson-1',
            title: 'Introduction to Sanskrit',
            description: 'Basic introduction to Sanskrit language',
            type: 'video',
            duration: 30,
            order: 1,
            isLocked: false,
            isCompleted: true,
          },
          {
            id: 'lesson-2',
            title: 'Sanskrit Alphabet',
            description: 'Learn the Devanagari script',
            type: 'video',
            duration: 45,
            order: 2,
            isLocked: false,
            isCompleted: true,
          },
          {
            id: 'lesson-3',
            title: 'Basic Grammar',
            description: 'Introduction to Sanskrit grammar',
            type: 'video',
            duration: 60,
            order: 3,
            isLocked: false,
            isCompleted: false,
          },
        ],
        duration: 300,
        difficulty: 'beginner',
        language: 'English',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'product-2',
        title: 'Advanced Sanskrit Literature',
        description: 'Explore classical Sanskrit texts, poetry, and philosophical works with detailed analysis and commentary',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&crop=center',
        price: 199,
        currency: 'USD',
        category: 'Literature',
        tags: ['sanskrit', 'literature', 'poetry', 'classical'],
        instructor: {
          id: 'instructor-2',
          name: 'Prof. Literature Master',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        },
        syllabus: [
          {
            id: 'lesson-4',
            title: 'Classical Texts',
            description: 'Study of ancient Sanskrit texts',
            type: 'video',
            duration: 90,
            order: 1,
            isLocked: false,
            isCompleted: true,
          },
        ],
        duration: 600,
        difficulty: 'advanced',
        language: 'English',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];
  }
}

export const dashboardService = new DashboardService();
