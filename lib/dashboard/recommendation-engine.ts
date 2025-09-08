/**
 * Recommendation Engine
 * Generates personalized course recommendations based on learner behavior and preferences
 */

import { DASHBOARD_CONFIG } from '@/lib/config/dashboard';
import type { GraphyProduct, GraphyEnrollment, GraphyProgressReport, GraphyLearner } from '@/lib/api/graphy-client';

export interface Recommendation {
  productId: string;
  product: GraphyProduct;
  score: number;
  reason: string;
  type: 'resume' | 'next_lesson' | 'category_match' | 'popular' | 'similar';
}

export interface LearnerProfile {
  learner: GraphyLearner;
  enrollments: GraphyEnrollment[];
  progressReports: GraphyProgressReport[];
  completedCourses: string[];
  inProgressCourses: string[];
  preferredCategories: string[];
  preferredTags: string[];
  averageCompletionRate: number;
  totalLearningTime: number;
}

export class RecommendationEngine {
  private config = DASHBOARD_CONFIG.RECOMMENDATIONS;

  /**
   * Generate recommendations for a learner
   */
  async generateRecommendations(
    learnerProfile: LearnerProfile,
    allProducts: GraphyProduct[],
    popularProducts: GraphyProduct[]
  ): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    // 1. Resume incomplete courses (highest priority)
    const resumeRecommendations = this.getResumeRecommendations(learnerProfile, allProducts);
    recommendations.push(...resumeRecommendations);

    // 2. Next lessons in current courses
    const nextLessonRecommendations = this.getNextLessonRecommendations(learnerProfile, allProducts);
    recommendations.push(...nextLessonRecommendations);

    // 3. Category-based recommendations
    const categoryRecommendations = this.getCategoryRecommendations(learnerProfile, allProducts);
    recommendations.push(...categoryRecommendations);

    // 4. Popular courses as fallback
    const popularRecommendations = this.getPopularRecommendations(learnerProfile, popularProducts);
    recommendations.push(...popularRecommendations);

    // Remove duplicates and sort by score
    const uniqueRecommendations = this.deduplicateRecommendations(recommendations);
    const sortedRecommendations = uniqueRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, this.config.MAX_RECOMMENDATIONS);

    return sortedRecommendations;
  }

  /**
   * Get recommendations for resuming incomplete courses
   */
  private getResumeRecommendations(
    learnerProfile: LearnerProfile,
    allProducts: GraphyProduct[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    for (const enrollment of learnerProfile.inProgressCourses) {
      const product = allProducts.find(p => p.id === enrollment);
      if (!product) continue;

      const progressReport = learnerProfile.progressReports.find(
        pr => pr.productId === enrollment
      );

      if (progressReport && progressReport.progressPercentage < 100) {
        const score = this.config.SCORE_WEIGHTS.INCOMPLETE_COURSE * 
          (1 - progressReport.progressPercentage / 100);

        recommendations.push({
          productId: product.id,
          product,
          score,
          reason: `Resume your progress (${Math.round(progressReport.progressPercentage)}% complete)`,
          type: 'resume',
        });
      }
    }

    return recommendations;
  }

  /**
   * Get recommendations for next lessons in current courses
   */
  private getNextLessonRecommendations(
    learnerProfile: LearnerProfile,
    allProducts: GraphyProduct[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    for (const enrollment of learnerProfile.inProgressCourses) {
      const product = allProducts.find(p => p.id === enrollment);
      if (!product) continue;

      const progressReport = learnerProfile.progressReports.find(
        pr => pr.productId === enrollment
      );

      if (progressReport && progressReport.lastWatchedLesson) {
        const nextLesson = this.findNextUnlockedLesson(product, progressReport.lastWatchedLesson);
        
        if (nextLesson) {
          const score = this.config.SCORE_WEIGHTS.NEXT_LESSON;

          recommendations.push({
            productId: product.id,
            product,
            score,
            reason: `Continue with "${nextLesson.title}"`,
            type: 'next_lesson',
          });
        }
      }
    }

    return recommendations;
  }

  /**
   * Get category-based recommendations
   */
  private getCategoryRecommendations(
    learnerProfile: LearnerProfile,
    allProducts: GraphyProduct[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Find products in preferred categories that learner hasn't enrolled in
    const availableProducts = allProducts.filter(
      product => 
        !learnerProfile.enrollments.some(e => e.productId === product.id) &&
        learnerProfile.preferredCategories.includes(product.category)
    );

    for (const product of availableProducts) {
      const categoryScore = this.calculateCategoryScore(product, learnerProfile);
      const tagScore = this.calculateTagScore(product, learnerProfile);
      const combinedScore = (categoryScore + tagScore) * this.config.SCORE_WEIGHTS.CATEGORY_MATCH;

      if (combinedScore > 0.3) { // Minimum threshold
        recommendations.push({
          productId: product.id,
          product,
          score: combinedScore,
          reason: `Based on your interest in ${product.category}`,
          type: 'category_match',
        });
      }
    }

    return recommendations;
  }

  /**
   * Get popular course recommendations as fallback
   */
  private getPopularRecommendations(
    learnerProfile: LearnerProfile,
    popularProducts: GraphyProduct[]
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    const availablePopular = popularProducts.filter(
      product => !learnerProfile.enrollments.some(e => e.productId === product.id)
    );

    for (const product of availablePopular.slice(0, this.config.FALLBACK_POPULAR_COURSES)) {
      recommendations.push({
        productId: product.id,
        product,
        score: this.config.SCORE_WEIGHTS.POPULARITY,
        reason: 'Popular among learners',
        type: 'popular',
      });
    }

    return recommendations;
  }

  /**
   * Calculate category preference score
   */
  private calculateCategoryScore(product: GraphyProduct, learnerProfile: LearnerProfile): number {
    const categoryCount = learnerProfile.preferredCategories.filter(
      cat => cat === product.category
    ).length;
    
    return Math.min(categoryCount / 3, 1); // Normalize to 0-1
  }

  /**
   * Calculate tag preference score
   */
  private calculateTagScore(product: GraphyProduct, learnerProfile: LearnerProfile): number {
    const matchingTags = product.tags.filter(tag => 
      learnerProfile.preferredTags.includes(tag)
    );
    
    return matchingTags.length / Math.max(product.tags.length, 1);
  }

  /**
   * Find the next unlocked lesson in a course
   */
  private findNextUnlockedLesson(product: GraphyProduct, lastWatchedLessonId: string): any {
    const syllabus = product.syllabus || [];
    const lastWatchedIndex = syllabus.findIndex(item => item.id === lastWatchedLessonId);
    
    if (lastWatchedIndex === -1) return null;

    // Find next unlocked lesson
    for (let i = lastWatchedIndex + 1; i < syllabus.length; i++) {
      const lesson = syllabus[i];
      if (!lesson.isLocked && !lesson.isCompleted) {
        return lesson;
      }
    }

    return null;
  }

  /**
   * Remove duplicate recommendations, keeping the highest scored one
   */
  private deduplicateRecommendations(recommendations: Recommendation[]): Recommendation[] {
    const seen = new Map<string, Recommendation>();

    for (const rec of recommendations) {
      const existing = seen.get(rec.productId);
      if (!existing || rec.score > existing.score) {
        seen.set(rec.productId, rec);
      }
    }

    return Array.from(seen.values());
  }

  /**
   * Build learner profile from raw data
   */
  buildLearnerProfile(
    learner: GraphyLearner,
    enrollments: GraphyEnrollment[],
    progressReports: GraphyProgressReport[],
    allProducts: GraphyProduct[]
  ): LearnerProfile {
    const completedCourses = enrollments
      .filter(e => e.status === 'completed')
      .map(e => e.productId);

    const inProgressCourses = enrollments
      .filter(e => e.status === 'active' && e.progress < 100)
      .map(e => e.productId);

    // Extract preferred categories and tags from completed courses
    const completedProducts = allProducts.filter(p => completedCourses.includes(p.id));
    const preferredCategories = this.extractPreferredCategories(completedProducts);
    const preferredTags = this.extractPreferredTags(completedProducts);

    // Calculate average completion rate
    const averageCompletionRate = enrollments.length > 0 
      ? enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length
      : 0;

    // Calculate total learning time
    const totalLearningTime = progressReports.reduce(
      (sum, pr) => sum + pr.watchedDuration, 0
    );

    return {
      learner,
      enrollments,
      progressReports,
      completedCourses,
      inProgressCourses,
      preferredCategories,
      preferredTags,
      averageCompletionRate,
      totalLearningTime,
    };
  }

  /**
   * Extract preferred categories from completed courses
   */
  private extractPreferredCategories(products: GraphyProduct[]): string[] {
    const categoryCount = new Map<string, number>();
    
    for (const product of products) {
      categoryCount.set(product.category, (categoryCount.get(product.category) || 0) + 1);
    }

    return Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category]) => category);
  }

  /**
   * Extract preferred tags from completed courses
   */
  private extractPreferredTags(products: GraphyProduct[]): string[] {
    const tagCount = new Map<string, number>();
    
    for (const product of products) {
      for (const tag of product.tags) {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      }
    }

    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }
}

export const recommendationEngine = new RecommendationEngine();
