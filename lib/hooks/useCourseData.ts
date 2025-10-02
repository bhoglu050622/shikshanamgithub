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
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/cms/course/${courseId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setCourseData(data.data);
        }
      } else {
        console.warn(`Failed to fetch course data for ${courseId}, using fallback data`);
      }
    } catch (err) {
      console.error(`Error fetching course data for ${courseId}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

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
