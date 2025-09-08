/**
 * Unit Tests for Recommendation Engine
 * Tests the recommendation generation logic
 */

import { recommendationEngine } from '@/lib/dashboard/recommendation-engine';
import type { LearnerProfile, Recommendation } from '@/lib/dashboard/recommendation-engine';
import type { GraphyProduct, GraphyEnrollment, GraphyProgressReport, GraphyLearner } from '@/lib/api/graphy-client';

describe('RecommendationEngine', () => {
  const mockLearner: GraphyLearner = {
    id: 'learner-1',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };

  const mockEnrollments: GraphyEnrollment[] = [
    {
      id: 'enrollment-1',
      learnerId: 'learner-1',
      productId: 'product-1',
      enrolledAt: '2024-01-01T00:00:00Z',
      status: 'active',
      progress: 75,
      lastAccessedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: 'enrollment-2',
      learnerId: 'learner-1',
      productId: 'product-2',
      enrolledAt: '2024-01-01T00:00:00Z',
      status: 'completed',
      progress: 100,
      lastAccessedAt: '2024-01-20T00:00:00Z',
      completedAt: '2024-01-20T00:00:00Z',
    },
  ];

  const mockProgressReports: GraphyProgressReport[] = [
    {
      productId: 'product-1',
      learnerId: 'learner-1',
      totalLessons: 10,
      completedLessons: 7,
      totalDuration: 300,
      watchedDuration: 225,
      progressPercentage: 75,
      lastWatchedLesson: 'lesson-7',
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

  const mockProducts: GraphyProduct[] = [
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
      },
      syllabus: [
        {
          id: 'lesson-7',
          title: 'Sanskrit Grammar',
          description: 'Basic grammar rules',
          type: 'video',
          duration: 30,
          order: 7,
          isLocked: false,
          isCompleted: true,
        },
        {
          id: 'lesson-8',
          title: 'Next Lesson',
          description: 'Continue learning',
          type: 'video',
          duration: 45,
          order: 8,
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
      },
      syllabus: [],
      duration: 600,
      difficulty: 'advanced',
      language: 'English',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  const mockAllProducts: GraphyProduct[] = [
    ...mockProducts,
    {
      id: 'product-3',
      title: 'Sanskrit Grammar',
      description: 'Deep dive into Sanskrit grammar',
      thumbnail: 'https://example.com/thumb3.jpg',
      price: 149,
      currency: 'USD',
      category: 'Language',
      tags: ['sanskrit', 'grammar', 'intermediate'],
      instructor: {
        id: 'instructor-3',
        name: 'Grammar Expert',
      },
      syllabus: [],
      duration: 400,
      difficulty: 'intermediate',
      language: 'English',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'product-4',
      title: 'Yoga Philosophy',
      description: 'Learn about yoga philosophy',
      thumbnail: 'https://example.com/thumb4.jpg',
      price: 129,
      currency: 'USD',
      category: 'Philosophy',
      tags: ['yoga', 'philosophy', 'meditation'],
      instructor: {
        id: 'instructor-4',
        name: 'Yoga Master',
      },
      syllabus: [],
      duration: 350,
      difficulty: 'beginner',
      language: 'English',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  const mockPopularProducts: GraphyProduct[] = [
    {
      id: 'product-5',
      title: 'Popular Sanskrit Course',
      description: 'Most popular Sanskrit course',
      thumbnail: 'https://example.com/thumb5.jpg',
      price: 99,
      currency: 'USD',
      category: 'Language',
      tags: ['sanskrit', 'popular'],
      instructor: {
        id: 'instructor-5',
        name: 'Popular Instructor',
      },
      syllabus: [],
      duration: 300,
      difficulty: 'beginner',
      language: 'English',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  describe('buildLearnerProfile', () => {
    it('should build correct learner profile from raw data', () => {
      const profile = recommendationEngine.buildLearnerProfile(
        mockLearner,
        mockEnrollments,
        mockProgressReports,
        mockProducts
      );

      expect(profile.learner).toEqual(mockLearner);
      expect(profile.enrollments).toEqual(mockEnrollments);
      expect(profile.progressReports).toEqual(mockProgressReports);
      expect(profile.completedCourses).toEqual(['product-2']);
      expect(profile.inProgressCourses).toEqual(['product-1']);
      expect(profile.preferredCategories).toContain('Language');
      expect(profile.preferredTags).toContain('sanskrit');
      expect(profile.averageCompletionRate).toBe(87.5); // (75 + 100) / 2
      expect(profile.totalLearningTime).toBe(825); // 225 + 600
    });

    it('should handle empty enrollments', () => {
      const profile = recommendationEngine.buildLearnerProfile(
        mockLearner,
        [],
        [],
        []
      );

      expect(profile.completedCourses).toEqual([]);
      expect(profile.inProgressCourses).toEqual([]);
      expect(profile.preferredCategories).toEqual([]);
      expect(profile.preferredTags).toEqual([]);
      expect(profile.averageCompletionRate).toBe(0);
      expect(profile.totalLearningTime).toBe(0);
    });
  });

  describe('generateRecommendations', () => {
    let mockProfile: LearnerProfile;

    beforeEach(() => {
      mockProfile = recommendationEngine.buildLearnerProfile(
        mockLearner,
        mockEnrollments,
        mockProgressReports,
        mockProducts
      );
    });

    it('should generate resume recommendations for incomplete courses', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      const resumeRecommendations = recommendations.filter(r => r.type === 'resume');
      expect(resumeRecommendations).toHaveLength(1);
      expect(resumeRecommendations[0].productId).toBe('product-1');
      expect(resumeRecommendations[0].reason).toContain('Resume your progress');
    });

    it('should generate next lesson recommendations', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      const nextLessonRecommendations = recommendations.filter(r => r.type === 'next_lesson');
      expect(nextLessonRecommendations).toHaveLength(1);
      expect(nextLessonRecommendations[0].productId).toBe('product-1');
      expect(nextLessonRecommendations[0].reason).toContain('Continue with');
    });

    it('should generate category-based recommendations', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      const categoryRecommendations = recommendations.filter(r => r.type === 'category_match');
      expect(categoryRecommendations.length).toBeGreaterThan(0);
      
      const languageRecommendation = categoryRecommendations.find(r => r.product.category === 'Language');
      expect(languageRecommendation).toBeDefined();
      expect(languageRecommendation?.reason).toContain('Based on your interest');
    });

    it('should generate popular recommendations as fallback', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      const popularRecommendations = recommendations.filter(r => r.type === 'popular');
      expect(popularRecommendations.length).toBeGreaterThan(0);
      expect(popularRecommendations[0].reason).toBe('Popular among learners');
    });

    it('should not recommend already enrolled courses', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      const enrolledProductIds = mockProfile.enrollments.map(e => e.productId);
      const nonEnrolledRecommendations = recommendations.filter(
        r => !enrolledProductIds.includes(r.productId)
      );

      expect(nonEnrolledRecommendations.length).toBeGreaterThan(0);
    });

    it('should sort recommendations by score', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      for (let i = 1; i < recommendations.length; i++) {
        expect(recommendations[i - 1].score).toBeGreaterThanOrEqual(recommendations[i].score);
      }
    });

    it('should limit recommendations to max count', async () => {
      const recommendations = await recommendationEngine.generateRecommendations(
        mockProfile,
        mockAllProducts,
        mockPopularProducts
      );

      expect(recommendations.length).toBeLessThanOrEqual(10); // MAX_RECOMMENDATIONS
    });
  });

  describe('extractPreferredCategories', () => {
    it('should extract top categories from completed products', () => {
      const completedProducts = [
        { category: 'Language' },
        { category: 'Language' },
        { category: 'Philosophy' },
        { category: 'Language' },
        { category: 'History' },
      ] as GraphyProduct[];

      const categories = (recommendationEngine as any).extractPreferredCategories(completedProducts);

      expect(categories).toEqual(['Language', 'Philosophy', 'History']);
    });

    it('should handle empty products array', () => {
      const categories = (recommendationEngine as any).extractPreferredCategories([]);
      expect(categories).toEqual([]);
    });
  });

  describe('extractPreferredTags', () => {
    it('should extract top tags from completed products', () => {
      const completedProducts = [
        { tags: ['sanskrit', 'basics'] },
        { tags: ['sanskrit', 'advanced'] },
        { tags: ['yoga', 'meditation'] },
        { tags: ['sanskrit', 'grammar'] },
      ] as GraphyProduct[];

      const tags = (recommendationEngine as any).extractPreferredTags(completedProducts);

      expect(tags[0]).toBe('sanskrit'); // Most frequent
      expect(tags).toContain('basics');
      expect(tags).toContain('advanced');
      expect(tags).toContain('grammar');
    });

    it('should handle empty products array', () => {
      const tags = (recommendationEngine as any).extractPreferredTags([]);
      expect(tags).toEqual([]);
    });
  });

  describe('findNextUnlockedLesson', () => {
    it('should find next unlocked lesson after last watched', () => {
      const product = mockProducts[0];
      const lastWatchedLessonId = 'lesson-7';

      const nextLesson = (recommendationEngine as any).findNextUnlockedLesson(
        product,
        lastWatchedLessonId
      );

      expect(nextLesson).toBeDefined();
      expect(nextLesson.id).toBe('lesson-8');
      expect(nextLesson.isLocked).toBe(false);
      expect(nextLesson.isCompleted).toBe(false);
    });

    it('should return null if no next unlocked lesson', () => {
      const product = {
        ...mockProducts[0],
        syllabus: [
          {
            id: 'lesson-1',
            title: 'First Lesson',
            type: 'video',
            duration: 30,
            order: 1,
            isLocked: false,
            isCompleted: true,
          },
        ],
      };

      const nextLesson = (recommendationEngine as any).findNextUnlockedLesson(
        product,
        'lesson-1'
      );

      expect(nextLesson).toBeNull();
    });

    it('should return null if last watched lesson not found', () => {
      const product = mockProducts[0];
      const lastWatchedLessonId = 'nonexistent-lesson';

      const nextLesson = (recommendationEngine as any).findNextUnlockedLesson(
        product,
        lastWatchedLessonId
      );

      expect(nextLesson).toBeNull();
    });
  });
});
