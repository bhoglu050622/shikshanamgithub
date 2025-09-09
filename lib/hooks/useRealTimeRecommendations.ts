/**
 * Real-time Recommendations Hook
 * Provides dynamic course recommendations that update based on learner behavior
 */

import { useState, useEffect, useCallback } from 'react';
import type { Recommendation } from '@/lib/dashboard/recommendation-engine';

interface UseRealTimeRecommendationsProps {
  email: string;
  refreshInterval?: number; // in milliseconds
  enabled?: boolean;
}

interface RealTimeRecommendationsData {
  recommendations: Recommendation[];
  learnerProfile: {
    preferredCategories: string[];
    preferredTags: string[];
    averageCompletionRate: number;
    totalLearningTime: number;
  };
  generatedAt: string;
  isLoading: boolean;
  error: string | null;
}

export function useRealTimeRecommendations({
  email,
  refreshInterval = 300000, // 5 minutes
  enabled = true
}: UseRealTimeRecommendationsProps): RealTimeRecommendationsData & {
  refresh: () => Promise<void>;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<RealTimeRecommendationsData>({
    recommendations: [],
    learnerProfile: {
      preferredCategories: [],
      preferredTags: [],
      averageCompletionRate: 0,
      totalLearningTime: 0,
    },
    generatedAt: '',
    isLoading: true,
    error: null,
  });

  const fetchRecommendations = useCallback(async () => {
    if (!email || !enabled) return;

    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(
        `/api/dashboard/recommendations?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setData({
          recommendations: result.data.recommendations,
          learnerProfile: result.data.learnerProfile,
          generatedAt: result.data.generatedAt,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error(result.error || 'Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching real-time recommendations:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  }, [email, enabled]);

  // Initial fetch
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  // Set up refresh interval
  useEffect(() => {
    if (!enabled || refreshInterval <= 0) return;

    const interval = setInterval(fetchRecommendations, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchRecommendations, refreshInterval, enabled]);

  // Refresh function for manual updates
  const refresh = useCallback(async () => {
    await fetchRecommendations();
  }, [fetchRecommendations]);

  // Refetch function (alias for refresh)
  const refetch = useCallback(async () => {
    await fetchRecommendations();
  }, [fetchRecommendations]);

  return {
    ...data,
    refresh,
    refetch,
  };
}

/**
 * Hook for getting recommendations with smart caching
 */
export function useSmartRecommendations({
  email,
  enabled = true
}: {
  email: string;
  enabled?: boolean;
}) {
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [cache, setCache] = useState<RealTimeRecommendationsData | null>(null);

  const fetchWithCache = useCallback(async () => {
    const now = Date.now();
    const cacheAge = now - lastFetch;
    const cacheValidDuration = 5 * 60 * 1000; // 5 minutes

    // Return cached data if still valid
    if (cache && cacheAge < cacheValidDuration && !cache.isLoading) {
      return cache;
    }

    // Fetch new data
    const response = await fetch(
      `/api/dashboard/recommendations?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.success) {
      const newData: RealTimeRecommendationsData = {
        recommendations: result.data.recommendations,
        learnerProfile: result.data.learnerProfile,
        generatedAt: result.data.generatedAt,
        isLoading: false,
        error: null,
      };

      setCache(newData);
      setLastFetch(now);
      return newData;
    } else {
      throw new Error(result.error || 'Failed to fetch recommendations');
    }
  }, [email, cache, lastFetch]);

  useEffect(() => {
    if (enabled && email) {
      fetchWithCache();
    }
  }, [enabled, email, fetchWithCache]);

  return {
    data: cache,
    fetchWithCache,
    isStale: Date.now() - lastFetch > 5 * 60 * 1000,
  };
}

/**
 * Hook for tracking recommendation interactions
 */
export function useRecommendationTracking() {
  const trackInteraction = useCallback(async (
    productId: string,
    action: 'view' | 'click' | 'enroll' | 'dismiss',
    recommendationId?: string
  ) => {
    try {
      await fetch('/api/analytics/recommendation-interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          action,
          recommendationId,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error tracking recommendation interaction:', error);
    }
  }, []);

  return { trackInteraction };
}
