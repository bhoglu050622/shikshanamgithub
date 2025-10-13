import { useState, useEffect, useCallback, useRef } from 'react';

// Type definition for course data
export interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  language: string;
  price: string;
  originalPrice: string | null;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: string;
  checkoutLink: string;
  contactNumber: string;
  description?: string;
  features?: any[];
  learningObjectives?: string[];
  keyHighlights?: string[];
  syllabus?: any[];
  testimonials?: any[];
  faq?: any[];
  requirements?: string[];
  outcomes?: string[];
  instructorBio?: string;
  tags?: string[];
  category?: string;
  difficulty?: string;
  subtitles?: string[];
  certificate?: boolean;
  lifetimeAccess?: boolean;
  mobileFriendly?: boolean;
  supportIncluded?: boolean;
  lastModified?: string;
  views?: number;
  popularity?: number;
}

export interface UseCourseDataReturn {
  courseData: CourseData;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCourseData(courseId: string, fallbackData: CourseData): UseCourseDataReturn {
  const fallbackDataRef = useRef(fallbackData);
  fallbackDataRef.current = fallbackData;
  
  const [courseData, setCourseData] = useState<CourseData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseData = useCallback(async () => {
    // CMS API removed - using static fallback data only
    setLoading(true);
    setError(null);
    
    // Simulate async behavior for consistency
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setCourseData(fallbackDataRef.current);
    setLoading(false);
  }, [courseId]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  return {
    courseData,
    loading,
    error,
    refetch: fetchCourseData
  };
}
