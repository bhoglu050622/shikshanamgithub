/**
 * Course metadata that can be optionally provided in a course's metadata.json file
 */
export interface CourseMetadata {
  title?: string
  description?: string
  type?: string
  price?: string
  originalPrice?: string
  savings?: string
  duration?: string
  level?: string
  status?: 'available' | 'upcoming' | 'archived'
  features?: string[]
  thumbnail?: string
  category?: string
  subtitle?: string
  priority?: number // For sitemap and ordering
}

/**
 * Complete course data structure used throughout the application
 */
export interface Course {
  slug: string
  title: string
  description: string
  type: string
  price: string
  originalPrice?: string
  savings?: string
  duration: string
  level: string
  status: 'available' | 'upcoming' | 'archived'
  features: string[]
  link: string
  thumbnail: string
  category?: string
  subtitle?: string
  priority?: number
}

/**
 * Course category grouping for display on the courses page
 */
export interface CourseCategory {
  id: string
  title: string
  subtitle: string
  description: string
  iconName: string
  color: string
  hoverColor: string
  courses: Course[]
}

/**
 * Configuration for mapping course slugs to categories
 */
export interface CategoryMapping {
  [slug: string]: string
}

/**
 * Category metadata for defining how categories are displayed
 */
export interface CategoryMetadata {
  id: string
  title: string
  subtitle: string
  description: string
  iconName: string
  color: string
  hoverColor: string
}

