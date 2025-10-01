/**
 * Universal Content Fetcher - Fetches all types of content from the CMS
 * This ensures all frontend content is available and properly typed
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ContentRegistry, ContentTypeConfig } from './content-registry';

// Import types - using any for now to avoid import issues
type HomepageContent = any;
type DonationContent = any;
type AboutContent = any;
type ContactContent = any;
type SchoolsContent = any;
type SchoolPageContent = any;
type DarshanaSchoolContent = any;
type SelfHelpSchoolContent = any;
type EnhancedHomepageContent = any;

// Generic content response interface
export interface ContentResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Simple in-memory cache
const contentCache = new Map<string, { data: any, timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useUniversalCMSContent<T>(contentTypeId: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);

    const contentType = ContentRegistry.getContentType(contentTypeId);

    if (!contentType) {
      setError(`Content type '${contentTypeId}' not found in registry.`);
      setLoading(false);
      return;
    }

    if (!contentType.apiEndpoint) {
      setError(`API endpoint for content type '${contentTypeId}' is not defined.`);
      setLoading(false);
      return;
    }

    // Check cache first
    const cached = contentCache.get(contentTypeId);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      setData(cached.data as T);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(contentType.apiEndpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: ContentResponse<T> = await response.json();

      if (result.success) {
        setData(result.data as T);
        contentCache.set(contentTypeId, { data: result.data, timestamp: Date.now() });
      } else {
        setError(result.error || 'Failed to fetch content.');
      }
    } catch (err) {
      console.error(`Error fetching content for ${contentTypeId}:`, err);
      setError(`Failed to fetch content: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [contentTypeId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, loading, error, refetch: fetchContent };
}

export function getContentTypeMetadata(contentTypeId: string): ContentTypeConfig | undefined {
  return ContentRegistry.getContentType(contentTypeId);
}