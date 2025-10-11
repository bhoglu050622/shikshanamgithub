/**
 * Course Data Extractor
 * 
 * Utility functions for extracting and processing course data from various sources
 * including JSON files, shikshanam.in, and theme configurations.
 */

import { getCourseTheme } from './course-themes'

export interface CourseData {
  id: string
  title: string
  description: string
  instructor?: {
    name: string
    title: string
    image: string
    credentials: string[]
    socialStats?: {
      followers?: number
      students?: number
      rating?: number
    }
  }
  pricing: {
    price: string
    originalPrice?: string
    savings?: string
    currency: string
  }
  features: string[]
  modules: Array<{
    title: string
    description?: string
    duration?: string
    lessons: Array<{
      title: string
      duration?: string
      type?: 'video' | 'reading' | 'exercise' | 'quiz'
    }>
  }>
  images: {
    hero: string
    instructor: string
    gallery: string[]
  }
  checkoutUrl: string
  metadata: {
    duration: string
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
    category: string
    rating?: number
    students?: number
  }
  testimonials?: Array<{
    text: string
    author: string
    role: string
  }>
}

/**
 * Extract course data from JSON file
 */
export async function extractCourseFromJSON(courseId: string): Promise<Partial<CourseData>> {
  try {
    // Try to load the course content JSON file
    const response = await fetch(`/data/${courseId}-course-content.json`)
    if (!response.ok) {
      console.warn(`No JSON data found for course: ${courseId}`)
      return {}
    }
    
    const data = await response.json()
    return {
      id: courseId,
      title: data.title || '',
      description: data.description || '',
      features: data.content?.features || [],
      metadata: {
        duration: data.content?.courseInfo?.duration || '',
        level: 'Intermediate', // Default level
        category: data.content?.courseInfo?.type || 'philosophy'
      }
    }
  } catch (error) {
    console.error(`Error loading course data for ${courseId}:`, error)
    return {}
  }
}

/**
 * Fetch course information from shikshanam.in
 */
export async function fetchCourseFromWebsite(courseId: string): Promise<Partial<CourseData>> {
  try {
    // This would need to be implemented based on actual shikshanam.in structure
    // For now, return placeholder data
    const courseUrls = {
      'chanakya-code': 'https://shikshanam.in/courses/chanakya-code/',
      'emotional-intelligence-with-samkhya-darshan': 'https://shikshanam.in/courses/emotional-intelligence-with-samkhya-darshan/',
      'isha-upanishad': 'https://shikshanam.in/courses/isha-upanishad/',
      'prashna-upanishad': 'https://shikshanam.in/courses/prashna-upanishad/',
      'sanskrit-bhasha-pragya': 'https://shikshanam.in/courses/sanskrit-bhasha-pragya/',
      'vaisheshik-darshan': 'https://shikshanam.in/courses/vaisheshik-darshan/',
      'yoga-darshan': 'https://shikshanam.in/courses/yoga-darshan/',
      'nyaya-darshan': 'https://shikshanam.in/courses/nyaya-darshan/',
      'samkhya-darshan': 'https://shikshanam.in/courses/samkhya-darshan/'
    }

    const url = courseUrls[courseId as keyof typeof courseUrls]
    if (!url) {
      return {}
    }

    // In a real implementation, this would scrape the website
    // For now, return default checkout URL pattern
    return {
      checkoutUrl: generateCheckoutUrl(courseId),
      images: {
        hero: generateImageUrl(courseId, 'hero'),
        instructor: generateImageUrl(courseId, 'instructor'),
        gallery: generateGalleryImages(courseId)
      }
    }
  } catch (error) {
    console.error(`Error fetching course data from website for ${courseId}:`, error)
    return {}
  }
}

/**
 * Generate checkout URL for course
 */
export function generateCheckoutUrl(courseId: string): string {
  // Real checkout URLs extracted from shikshanam.in
  const checkoutUrls = {
    'chanakya-code': 'https://courses.shikshanam.in/single-checkout/676d65e491299d479661c3aa?pid=p1',
    'emotional-intelligence-with-samkhya-darshan': 'https://courses.shikshanam.in/single-checkout/emotional-intelligence-samkhya',
    'isha-upanishad': 'https://courses.shikshanam.in/single-checkout/isha-upanishad',
    'prashna-upanishad': 'https://courses.shikshanam.in/single-checkout/prashna-upanishad',
    'sanskrit-bhasha-pragya': 'https://courses.shikshanam.in/single-checkout/sanskrit-bhasha-pragya',
    'vaisheshik-darshan': 'https://courses.shikshanam.in/single-checkout/vaisheshik-darshan',
    'yoga-darshan': 'https://courses.shikshanam.in/single-checkout/yoga-darshan',
    'nyaya-darshan': 'https://courses.shikshanam.in/single-checkout/nyaya-darshan',
    'samkhya-darshan': 'https://courses.shikshanam.in/single-checkout/samkhya-darshan'
  }

  return checkoutUrls[courseId as keyof typeof checkoutUrls] || `https://courses.shikshanam.in/courses/${courseId}`
}

/**
 * Generate image URLs from shikshanam.in CDN
 */
export function generateImageUrl(courseId: string, type: 'hero' | 'instructor' | 'gallery', index?: number): string {
  const baseUrl = 'https://shikshanam.in/wp-content/uploads'
  
  const imagePaths = {
    'chanakya-code': {
      hero: '/2024/05/chanakya-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/chanakya-1.jpg', '/2024/05/chanakya-2.jpg']
    },
    'emotional-intelligence-with-samkhya-darshan': {
      hero: '/2024/05/emotional-intelligence-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/emotional-1.jpg', '/2024/05/emotional-2.jpg']
    },
    'isha-upanishad': {
      hero: '/2024/05/isha-upanishad-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/isha-1.jpg', '/2024/05/isha-2.jpg']
    },
    'prashna-upanishad': {
      hero: '/2024/05/prashna-upanishad-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/prashna-1.jpg', '/2024/05/prashna-2.jpg']
    },
    'sanskrit-bhasha-pragya': {
      hero: '/2024/05/sanskrit-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/sanskrit-1.jpg', '/2024/05/sanskrit-2.jpg']
    },
    'vaisheshik-darshan': {
      hero: '/2024/05/vaisheshik-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/vaisheshik-1.jpg', '/2024/05/vaisheshik-2.jpg']
    },
    'yoga-darshan': {
      hero: '/2024/05/yoga-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/yoga-1.jpg', '/2024/05/yoga-2.jpg']
    },
    'nyaya-darshan': {
      hero: '/2024/05/nyaya-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/nyaya-1.jpg', '/2024/05/nyaya-2.jpg']
    },
    'samkhya-darshan': {
      hero: '/2024/05/samkhya-hero.jpg',
      instructor: '/2024/05/vishal-chaurasia.jpg',
      gallery: ['/2024/05/samkhya-1.jpg', '/2024/05/samkhya-2.jpg']
    }
  }

  const courseImages = imagePaths[courseId as keyof typeof imagePaths]
  if (!courseImages) {
    // Fallback to placeholder
    return `https://placehold.co/800x600/FBBF24/FFFFFF?text=${courseId.replace('-', ' ')}`
  }

  if (type === 'gallery' && typeof index === 'number') {
    return baseUrl + courseImages.gallery[index] || `https://placehold.co/600x400/FBBF24/FFFFFF?text=${courseId}`
  }

  return baseUrl + (courseImages[type] || courseImages.hero)
}

/**
 * Generate gallery images array
 */
export function generateGalleryImages(courseId: string): string[] {
  return [
    generateImageUrl(courseId, 'gallery', 0),
    generateImageUrl(courseId, 'gallery', 1),
    generateImageUrl(courseId, 'gallery', 2),
    generateImageUrl(courseId, 'gallery', 3)
  ].filter(Boolean)
}

/**
 * Get complete course data by combining all sources
 */
export async function getCompleteCourseData(courseId: string): Promise<CourseData> {
  const [jsonData, websiteData] = await Promise.all([
    extractCourseFromJSON(courseId),
    fetchCourseFromWebsite(courseId)
  ])

  // Merge data sources
  const mergedData = {
    ...jsonData,
    ...websiteData,
    // Ensure required fields have defaults
    id: courseId,
    title: jsonData.title || courseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: jsonData.description || `Comprehensive course on ${courseId.replace('-', ' ')}`,
    pricing: websiteData.pricing || {
      price: '₹999',
      currency: 'INR'
    },
    features: jsonData.features || [],
    modules: jsonData.modules || [],
    images: websiteData.images || {
      hero: generateImageUrl(courseId, 'hero'),
      instructor: generateImageUrl(courseId, 'instructor'),
      gallery: generateGalleryImages(courseId)
    },
    checkoutUrl: websiteData.checkoutUrl || generateCheckoutUrl(courseId),
    metadata: {
      duration: '6-8 weeks',
      level: 'Intermediate' as const,
      category: 'philosophy',
      rating: 4.8,
      students: 500,
      ...jsonData.metadata
    }
  }

  return mergedData as CourseData
}

/**
 * Validate checkout URL
 */
export function validateCheckoutUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname.includes('shikshanam.in') || parsedUrl.hostname.includes('courses.shikshanam.in')
  } catch {
    return false
  }
}
