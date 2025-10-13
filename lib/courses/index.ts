/**
 * Course management system
 * Provides dynamic course discovery and categorization
 */

// Types
export type { Course, CourseCategory, CourseMetadata, CategoryMapping, CategoryMetadata } from './types'

// Scanner
export { scanCourseDirectories, getCourseCount as scanCourseCount, courseExists as scanCourseExists } from './scanner'

// Categories
export { CATEGORY_METADATA, COURSE_CATEGORY_MAPPING, getCategoryForCourse, categorizeCourses, getCoursesByCategory as filterCoursesByCategory } from './categories'

// Registry (main API)
export {
  getAllCourses,
  getAllCoursesCategories,
  getCourseBySlug,
  getCoursesByCategory,
  getAllCourseSlugs,
  getAllCourseLinks,
  searchCourses,
  getFeaturedCourses,
  getCourseCount,
  clearCache,
  courseExists,
} from './registry'

