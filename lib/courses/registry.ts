import { Course, CourseCategory } from './types'
import { scanCourseDirectories } from './scanner'
import { categorizeCourses, getCoursesByCategory as filterCoursesByCategory } from './categories'

/**
 * Cache for build-time course data
 * This avoids re-scanning the filesystem multiple times
 */
let courseCache: Course[] | null = null
let categorizedCache: CourseCategory[] | null = null

/**
 * Get all courses (with caching)
 */
export function getAllCourses(): Course[] {
  if (courseCache === null) {
    courseCache = scanCourseDirectories()
  }
  return courseCache
}

/**
 * Get all courses organized by category
 */
export function getAllCoursesCategories(): CourseCategory[] {
  if (categorizedCache === null) {
    const courses = getAllCourses()
    categorizedCache = categorizeCourses(courses)
  }
  return categorizedCache
}

/**
 * Get a single course by slug
 */
export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getAllCourses()
  return courses.find(course => course.slug === slug)
}

/**
 * Get courses by category ID
 */
export function getCoursesByCategory(categoryId: string): Course[] {
  const courses = getAllCourses()
  return filterCoursesByCategory(courses, categoryId)
}

/**
 * Get course slugs (useful for generating routes)
 */
export function getAllCourseSlugs(): string[] {
  const courses = getAllCourses()
  return courses.map(course => course.slug)
}

/**
 * Get course links (useful for navigation)
 */
export function getAllCourseLinks(): Array<{ slug: string; link: string; title: string }> {
  const courses = getAllCourses()
  return courses.map(course => ({
    slug: course.slug,
    link: course.link,
    title: course.title,
  }))
}

/**
 * Search courses by title or description
 */
export function searchCourses(query: string): Course[] {
  const courses = getAllCourses()
  const lowerQuery = query.toLowerCase()
  
  return courses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.slug.includes(lowerQuery)
  )
}

/**
 * Get featured courses (high priority)
 */
export function getFeaturedCourses(limit: number = 6): Course[] {
  const courses = getAllCourses()
  return courses
    .filter(course => course.priority && course.priority > 0.7)
    .slice(0, limit)
}

/**
 * Get course count
 */
export function getCourseCount(): number {
  return getAllCourses().length
}

/**
 * Clear cache (useful for testing or rebuilds)
 */
export function clearCache(): void {
  courseCache = null
  categorizedCache = null
}

/**
 * Check if a course exists
 */
export function courseExists(slug: string): boolean {
  return getCourseBySlug(slug) !== undefined
}

