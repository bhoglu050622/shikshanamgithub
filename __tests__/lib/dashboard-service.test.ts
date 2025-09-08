/**
 * Unit Tests for Dashboard Service
 * Tests the core dashboard aggregation logic
 */

import { dashboardService } from '@/lib/dashboard/dashboard-service';
import { graphyClient } from '@/lib/api/graphy-client';
import { recommendationEngine } from '@/lib/dashboard/recommendation-engine';

// Mock the Graphy client
jest.mock('@/lib/api/graphy-client');
jest.mock('@/lib/dashboard/recommendation-engine');

const mockGraphyClient = graphyClient as jest.Mocked<typeof graphyClient>;
const mockRecommendationEngine = recommendationEngine as jest.Mocked<typeof recommendationEngine>;

describe('DashboardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboardByEmail', () => {
    const mockLearner = {
      id: 'learner-1',
      email: 'test@example.com',
      name: 'Test User',
      phone: '+1234567890',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    const mockEnrollments = [
      {
        id: 'enrollment-1',
        learnerId: 'learner-1',
        productId: 'product-1',
        enrolledAt: '2024-01-01T00:00:00Z',
        status: 'active' as const,
        progress: 75,
        lastAccessedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: 'enrollment-2',
        learnerId: 'learner-1',
        productId: 'product-2',
        enrolledAt: '2024-01-01T00:00:00Z',
        status: 'completed' as const,
        progress: 100,
        lastAccessedAt: '2024-01-20T00:00:00Z',
        completedAt: '2024-01-20T00:00:00Z',
      },
    ];

    const mockProducts = [
      {
        id: 'product-1',
        title: 'Sanskrit Basics',
        description: 'Learn the fundamentals of Sanskrit',
        thumbnail: 'https://example.com/thumb1.jpg',
        price: 99,
        currency: 'USD',
        category: 'Language',
        tags: ['sanskrit', 'basics', 'language'],
        instructor: {
          id: 'instructor-1',
          name: 'Dr. Sanskrit',
          profilePicture: 'https://example.com/instructor1.jpg',
        },
        syllabus: [
          {
            id: 'lesson-1',
            title: 'Introduction to Sanskrit',
            description: 'Basic introduction',
            type: 'video' as const,
            duration: 30,
            order: 1,
            isLocked: false,
            isCompleted: true,
          },
          {
            id: 'lesson-2',
            title: 'Sanskrit Alphabet',
            description: 'Learn the alphabet',
            type: 'video' as const,
            duration: 45,
            order: 2,
            isLocked: false,
            isCompleted: false,
          },
        ],
        duration: 300,
        difficulty: 'beginner' as const,
        language: 'English',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'product-2',
        title: 'Advanced Sanskrit',
        description: 'Advanced Sanskrit concepts',
        thumbnail: 'https://example.com/thumb2.jpg',
        price: 199,
        currency: 'USD',
        category: 'Language',
        tags: ['sanskrit', 'advanced', 'grammar'],
        instructor: {
          id: 'instructor-2',
          name: 'Prof. Advanced',
          profilePicture: 'https://example.com/instructor2.jpg',
        },
        syllabus: [],
        duration: 600,
        difficulty: 'advanced' as const,
        language: 'English',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];

    const mockProgressReports = [
      {
        productId: 'product-1',
        learnerId: 'learner-1',
        totalLessons: 10,
        completedLessons: 7,
        totalDuration: 300,
        watchedDuration: 225,
        progressPercentage: 75,
        lastWatchedLesson: 'lesson-1',
        lastWatchedTime: 30,
      },
      {
        productId: 'product-2',
        learnerId: 'learner-1',
        totalLessons: 15,
        completedLessons: 15,
        totalDuration: 600,
        watchedDuration: 600,
        progressPercentage: 100,
        lastWatchedLesson: 'lesson-15',
        completionDate: '2024-01-20T00:00:00Z',
      },
    ];

    const mockUsage = [
      {
        date: '2024-01-15',
        duration: 60,
        lessonsCompleted: 2,
        quizzesTaken: 1,
        assignmentsSubmitted: 0,
      },
      {
        date: '2024-01-14',
        duration: 45,
        lessonsCompleted: 1,
        quizzesTaken: 0,
        assignmentsSubmitted: 1,
      },
    ];

    const mockRecommendations = [
      {
        productId: 'product-3',
        product: {
          id: 'product-3',
          title: 'Sanskrit Grammar',
          description: 'Deep dive into Sanskrit grammar',
          thumbnail: 'https://example.com/thumb3.jpg',
          price: 149,
          currency: 'USD',
          category: 'Language',
          tags: ['sanskrit', 'grammar'],
          instructor: {
            id: 'instructor-3',
            name: 'Grammar Expert',
          },
          syllabus: [],
          duration: 400,
          difficulty: 'intermediate' as const,
          language: 'English',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
        score: 0.8,
        reason: 'Based on your interest in Sanskrit',
        type: 'category_match' as const,
      },
    ];

    it('should return null when learner is not found', async () => {
      mockGraphyClient.getLearnerByEmail.mockResolvedValue(null);

      const result = await dashboardService.getDashboardByEmail('nonexistent@example.com');

      expect(result).toBeNull();
      expect(mockGraphyClient.getLearnerByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });

    it('should build complete dashboard data for existing learner', async () => {
      // Mock all the API calls
      mockGraphyClient.getLearnerByEmail.mockResolvedValue(mockLearner);
      mockGraphyClient.getLearnerEnrollments.mockResolvedValue(mockEnrollments);
      mockGraphyClient.getLearnerUsage.mockResolvedValue(mockUsage);
      mockGraphyClient.getLearnerDiscussions.mockResolvedValue([]);
      mockGraphyClient.getLearnerQuizReports.mockResolvedValue([]);
      mockGraphyClient.getLearnerTransactions.mockResolvedValue([]);
      mockGraphyClient.getProduct
        .mockResolvedValueOnce(mockProducts[0])
        .mockResolvedValueOnce(mockProducts[1]);

      // Mock the recommendation engine
      mockRecommendationEngine.buildLearnerProfile.mockReturnValue({
        learner: mockLearner,
        enrollments: mockEnrollments,
        progressReports: mockProgressReports,
        completedCourses: ['product-2'],
        inProgressCourses: ['product-1'],
        preferredCategories: ['Language'],
        preferredTags: ['sanskrit'],
        averageCompletionRate: 87.5,
        totalLearningTime: 825,
      });
      mockRecommendationEngine.generateRecommendations.mockResolvedValue(mockRecommendations);

      const result = await dashboardService.getDashboardByEmail('test@example.com');

      expect(result).not.toBeNull();
      expect(result?.learner).toEqual(mockLearner);
      expect(result?.products).toHaveLength(2);
      expect(result?.recommendations).toEqual(mockRecommendations);
      expect(result?.summary.totalCourses).toBe(2);
      expect(result?.summary.completedCourses).toBe(1);
      expect(result?.summary.inProgressCourses).toBe(1);
    });

    it('should handle API errors gracefully', async () => {
      mockGraphyClient.getLearnerByEmail.mockRejectedValue(new Error('API Error'));

      await expect(dashboardService.getDashboardByEmail('test@example.com'))
        .rejects.toThrow('Failed to build dashboard data');
    });

    it('should build correct dashboard products with progress data', async () => {
      mockGraphyClient.getLearnerByEmail.mockResolvedValue(mockLearner);
      mockGraphyClient.getLearnerEnrollments.mockResolvedValue(mockEnrollments);
      mockGraphyClient.getLearnerUsage.mockResolvedValue(mockUsage);
      mockGraphyClient.getLearnerDiscussions.mockResolvedValue([]);
      mockGraphyClient.getLearnerQuizReports.mockResolvedValue([]);
      mockGraphyClient.getLearnerTransactions.mockResolvedValue([]);
      mockGraphyClient.getProduct
        .mockResolvedValueOnce(mockProducts[0])
        .mockResolvedValueOnce(mockProducts[1]);

      mockRecommendationEngine.buildLearnerProfile.mockReturnValue({
        learner: mockLearner,
        enrollments: mockEnrollments,
        progressReports: mockProgressReports,
        completedCourses: ['product-2'],
        inProgressCourses: ['product-1'],
        preferredCategories: ['Language'],
        preferredTags: ['sanskrit'],
        averageCompletionRate: 87.5,
        totalLearningTime: 825,
      });
      mockRecommendationEngine.generateRecommendations.mockResolvedValue([]);

      const result = await dashboardService.getDashboardByEmail('test@example.com');

      expect(result?.products[0]).toMatchObject({
        product: mockProducts[0],
        enrollment: mockEnrollments[0],
        isEnrolled: true,
        canResume: true,
      });

      expect(result?.products[1]).toMatchObject({
        product: mockProducts[1],
        enrollment: mockEnrollments[1],
        isEnrolled: true,
        canResume: false,
      });
    });
  });

  describe('buildDashboardSummary', () => {
    it('should calculate correct summary statistics', () => {
      const enrollments = [
        { id: '1', status: 'active', progress: 75 },
        { id: '2', status: 'completed', progress: 100 },
        { id: '3', status: 'active', progress: 50 },
      ] as any[];

      const progressReports = [
        { watchedDuration: 100 },
        { watchedDuration: 200 },
        { watchedDuration: 150 },
      ] as any[];

      const usage = [
        { date: '2024-01-15', duration: 60 },
        { date: '2024-01-14', duration: 45 },
      ] as any[];

      const certificates = [
        { id: 'cert-1' },
        { id: 'cert-2' },
      ] as any[];

      // Use reflection to access private method for testing
      const summary = (dashboardService as any).buildDashboardSummary(
        enrollments,
        progressReports,
        usage,
        certificates
      );

      expect(summary.totalCourses).toBe(3);
      expect(summary.completedCourses).toBe(1);
      expect(summary.inProgressCourses).toBe(2);
      expect(summary.totalLearningTime).toBe(450); // 100 + 200 + 150
      expect(summary.averageCompletionRate).toBe(75); // (75 + 100 + 50) / 3
      expect(summary.totalCertificates).toBe(2);
    });
  });

  describe('calculateStreakDays', () => {
    it('should calculate streak correctly for consecutive days', () => {
      const usage = [
        { date: '2024-01-15', duration: 60 },
        { date: '2024-01-14', duration: 45 },
        { date: '2024-01-13', duration: 30 },
        { date: '2024-01-12', duration: 0 }, // No activity
        { date: '2024-01-11', duration: 20 },
      ] as any[];

      // Mock current date to 2024-01-15
      const originalDate = Date;
      global.Date = jest.fn(() => new originalDate('2024-01-15T12:00:00Z')) as any;

      const streak = (dashboardService as any).calculateStreakDays(usage);

      expect(streak).toBe(3); // 3 consecutive days with activity

      global.Date = originalDate;
    });

    it('should return 0 for no activity', () => {
      const usage: any[] = [];

      const streak = (dashboardService as any).calculateStreakDays(usage);

      expect(streak).toBe(0);
    });
  });
});
