import { useState, useEffect, useCallback } from 'react';

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
  const [courseData, setCourseData] = useState<CourseData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseData = useCallback(async () => {
    // Since we're removing CMS functionality, just use the fallback data
    setLoading(false);
    setError(null);
    setCourseData(fallbackData);
  }, [fallbackData]);

  useEffect(() => {
    fetchCourseData();
  }, [courseId, fetchCourseData]);

  return {
    courseData,
    loading,
    error,
    refetch: fetchCourseData
  };
}
