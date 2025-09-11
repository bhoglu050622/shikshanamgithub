/**
 * Recommendation Engine
 * Provides personalized course and content recommendations
 */

export interface Recommendation {
  id: string;
  type: 'course' | 'content' | 'guru' | 'event';
  title: string;
  description: string;
  relevanceScore: number;
  reason: string;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  interests: string[];
  completedCourses: string[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[];
  preferredLanguages: string[];
}

export interface RecommendationContext {
  userProfile: UserProfile;
  currentPage: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

export class RecommendationEngine {
  private static instance: RecommendationEngine;
  private recommendations: Map<string, Recommendation[]> = new Map();

  static getInstance(): RecommendationEngine {
    if (!RecommendationEngine.instance) {
      RecommendationEngine.instance = new RecommendationEngine();
    }
    return RecommendationEngine.instance;
  }

  /**
   * Generate personalized recommendations
   */
  async generateRecommendations(
    context: RecommendationContext,
    limit: number = 5
  ): Promise<Recommendation[]> {
    const { userProfile } = context;
    
    // Mock recommendations based on user profile
    const recommendations: Recommendation[] = [
      {
        id: 'rec-1',
        type: 'course',
        title: 'Advanced Sanskrit Grammar',
        description: 'Master complex Sanskrit grammatical structures',
        relevanceScore: 0.9,
        reason: 'Based on your interest in Sanskrit and advanced level',
        metadata: {
          category: 'sanskrit',
          level: 'advanced',
          duration: '8 weeks',
        },
      },
      {
        id: 'rec-2',
        type: 'guru',
        title: 'Meet Dr. Priya Sharma',
        description: 'Expert in Vedic Philosophy and Sanskrit Literature',
        relevanceScore: 0.8,
        reason: 'Matches your interest in Vedic studies',
        metadata: {
          specialty: 'vedic-philosophy',
          experience: '15+ years',
        },
      },
      {
        id: 'rec-3',
        type: 'content',
        title: 'Bhagavad Gita Study Group',
        description: 'Join our weekly study group for the Bhagavad Gita',
        relevanceScore: 0.7,
        reason: 'Popular among users with similar interests',
        metadata: {
          type: 'study-group',
          schedule: 'weekly',
        },
      },
    ];

    // Filter and sort by relevance score
    return recommendations
      .filter(rec => rec.relevanceScore > 0.5)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  /**
   * Get cached recommendations for a user
   */
  getCachedRecommendations(userId: string): Recommendation[] {
    return this.recommendations.get(userId) || [];
  }

  /**
   * Cache recommendations for a user
   */
  cacheRecommendations(userId: string, recommendations: Recommendation[]): void {
    this.recommendations.set(userId, recommendations);
  }

  /**
   * Clear cached recommendations for a user
   */
  clearCachedRecommendations(userId: string): void {
    this.recommendations.delete(userId);
  }

  /**
   * Update recommendation relevance based on user interaction
   */
  updateRecommendationRelevance(
    userId: string,
    recommendationId: string,
    interaction: 'view' | 'click' | 'complete' | 'dismiss'
  ): void {
    const recommendations = this.getCachedRecommendations(userId);
    const recommendation = recommendations.find(rec => rec.id === recommendationId);
    
    if (recommendation) {
      // Adjust relevance score based on interaction
      switch (interaction) {
        case 'view':
          recommendation.relevanceScore += 0.1;
          break;
        case 'click':
          recommendation.relevanceScore += 0.2;
          break;
        case 'complete':
          recommendation.relevanceScore += 0.5;
          break;
        case 'dismiss':
          recommendation.relevanceScore -= 0.3;
          break;
      }
      
      // Clamp score between 0 and 1
      recommendation.relevanceScore = Math.max(0, Math.min(1, recommendation.relevanceScore));
    }
  }
}

// Export singleton instance
export const recommendationEngine = RecommendationEngine.getInstance();
