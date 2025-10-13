import fs from 'fs'
import path from 'path'
import { Course, CourseMetadata } from './types'

/**
 * Convert kebab-case slug to Title Case
 * e.g., "yoga-darshan" -> "Yoga Darshan"
 */
function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Check if a directory entry is a course directory
 * (excludes page.tsx, components, etc.)
 */
function isCourseDirectory(entry: fs.Dirent): boolean {
  if (!entry.isDirectory()) return false
  
  // Exclude common non-course directories
  const excludedDirs = ['components', 'utils', 'hooks', 'styles', 'assets', '_shared']
  return !excludedDirs.includes(entry.name)
}

/**
 * Read and parse metadata.json if it exists in the course directory
 */
function readCourseMetadata(coursePath: string): CourseMetadata | null {
  const metadataPath = path.join(coursePath, 'metadata.json')
  
  try {
    if (fs.existsSync(metadataPath)) {
      const content = fs.readFileSync(metadataPath, 'utf-8')
      return JSON.parse(content) as CourseMetadata
    }
  } catch (error) {
    console.warn(`Warning: Failed to parse metadata for ${coursePath}:`, error)
  }
  
  return null
}

/**
 * Get default thumbnail based on course category/type
 */
function getDefaultThumbnail(slug: string): string {
  // Check slug for category hints
  if (slug.includes('sanskrit')) return '/assets/comics/basics.svg'
  if (slug.includes('yoga')) return '/assets/comics/yoga.svg'
  if (slug.includes('upanishad')) return '/assets/courses/upanishad-default.jpg'
  if (slug.includes('darshan')) return '/assets/courses/darshan-default.jpg'
  
  // Default fallback
  return '/assets/courses/default-course.jpg'
}

/**
 * Create a Course object from directory slug and optional metadata
 */
function createCourseFromDirectory(slug: string, metadata: CourseMetadata | null): Course {
  const defaultTitle = slugToTitle(slug)
  
  return {
    slug,
    title: metadata?.title || defaultTitle,
    description: metadata?.description || `Learn about ${defaultTitle}`,
    type: metadata?.type || 'Course',
    price: metadata?.price || 'Free',
    originalPrice: metadata?.originalPrice,
    savings: metadata?.savings,
    duration: metadata?.duration || '8-12 Classes',
    level: metadata?.level || 'Beginner',
    status: metadata?.status || 'available',
    features: metadata?.features || ['Comprehensive Content', 'Expert Instruction', 'Certificate'],
    link: `/courses/${slug}`,
    thumbnail: metadata?.thumbnail || getDefaultThumbnail(slug),
    category: metadata?.category,
    subtitle: metadata?.subtitle,
    priority: metadata?.priority || 0.7,
  }
}

/**
 * Scan the /app/courses/ directory and return all discovered courses
 * This runs at build time to generate the course list
 */
export function scanCourseDirectories(): Course[] {
  const coursesPath = path.join(process.cwd(), 'app', 'courses')
  
  try {
    // Read all entries in the courses directory
    const entries = fs.readdirSync(coursesPath, { withFileTypes: true })
    
    // Filter to only course directories
    const courseDirectories = entries.filter(isCourseDirectory)
    
    // Create Course objects for each directory
    const courses: Course[] = courseDirectories.map(entry => {
      const slug = entry.name
      const coursePath = path.join(coursesPath, slug)
      const metadata = readCourseMetadata(coursePath)
      
      return createCourseFromDirectory(slug, metadata)
    })
    
    // Sort by priority (higher first), then alphabetically
    courses.sort((a, b) => {
      if (b.priority !== a.priority) {
        return (b.priority || 0) - (a.priority || 0)
      }
      return a.title.localeCompare(b.title)
    })
    
    return courses
  } catch (error) {
    console.error('Error scanning course directories:', error)
    return []
  }
}

/**
 * Get course count (useful for stats)
 */
export function getCourseCount(): number {
  return scanCourseDirectories().length
}

/**
 * Check if a course slug exists
 */
export function courseExists(slug: string): boolean {
  const coursesPath = path.join(process.cwd(), 'app', 'courses', slug)
  return fs.existsSync(coursesPath) && fs.statSync(coursesPath).isDirectory()
}

