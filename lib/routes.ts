// Route constants for the application
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  ACCESSIBILITY: '/accessibility',
  HELP: '/help',
  COURSES: '/courses',
  SCHOOLS: '/schools',
  GURUS: '/gurus',
  WISDOM: '/wisdom',
  TOOLS: '/tools',
  PACKAGES: '/packages',
  BOOKS: '/books',
  BLOGS: '/blogs',
  BLOGS_SANSKRIT: '/blogs/sanskrit',
  GLOSSARIES: '/glossaries',
  PRACTICE: '/practice',
  ACCOUNT: '/account',
  ME: '/me',
  MARKETING: '/marketing',
  MY_JOURNEY: '/my-journey',
  
  // School routes
  SCHOOL_SANSKRIT: '/schools/sanskrit',
  SCHOOL_DARSHANA: '/schools/darshana',
  SCHOOL_SELF_HELP: '/schools/self-help',
  SCHOOL_YOGA: '/schools/yoga',
  SCHOOL_SAMKHYA: '/schools/samkhya',
  SCHOOL_MIMAMSA: '/schools/mimamsa',
  SCHOOL_VEDANTA: '/schools/vedanta',
  SCHOOL_VAISHESHIKA: '/schools/vaisheshika',
  SCHOOL_NYAYA: '/schools/nyaya',
  
  
  // Blog routes
  BLOG: '/blog',
  
  // Auth routes (placeholder)
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
} as const

// Navigation groups for the mega menu
export const NAVIGATION_GROUPS = {
  SCHOOLS: {
    id: 'schools',
    title: 'Schools of Knowledge',
    description: 'Explore our specialized learning paths',
    items: [
      {
        name: 'Sanskrit School',
        href: ROUTES.SCHOOL_SANSKRIT,
        description: 'Master the language of the gods'
      },
      {
        name: 'Darshan School',
        href: ROUTES.SCHOOL_DARSHANA,
        description: 'Philosophical wisdom and insights'
      },
      {
        name: 'Self-help School',
        href: ROUTES.SCHOOL_SELF_HELP,
        description: 'Personal growth and transformation'
      }
    ]
  },
  COURSES: {
    id: 'courses',
    title: 'Featured Courses',
    description: 'Structured learning experiences',
    items: [
      {
        name: 'All Courses',
        href: ROUTES.COURSES,
        description: 'Browse our complete course catalog'
      }
    ]
  },
  PRACTICE: {
    id: 'practice',
    title: 'Practice Tools',
    description: 'Interactive learning resources',
    items: []
  }
} as const

// Generate routes function for compatibility
export const generateRoutes = () => {
  return {
    courses: ROUTES.COURSES,
    schools: ROUTES.SCHOOLS,
    packages: ROUTES.PACKAGES,
    tools: ROUTES.TOOLS,
    practice: ROUTES.PRACTICE
  }
}

/**
 * Dynamic course routes
 * These are generated at build time from the /app/courses/ directory
 */

// Note: Import course utilities only when needed to avoid circular dependencies
let courseRoutesCache: string[] | null = null

export const getAllCourseRoutes = (): string[] => {
  if (courseRoutesCache) {
    return courseRoutesCache
  }
  
  try {
    // Dynamically import to avoid issues during module initialization
    const { getAllCourseSlugs } = require('./courses')
    const slugs = getAllCourseSlugs()
    const routes = slugs.map((slug: string) => `/courses/${slug}`)
    courseRoutesCache = routes
    return routes
  } catch (error) {
    console.warn('Failed to load dynamic course routes:', error)
    return []
  }
}

export const getCourseRoute = (slug: string): string => {
  return `/courses/${slug}`
}

export const isCourseRoute = (path: string): boolean => {
  return path.startsWith('/courses/') && path !== '/courses/'
}

export const getCourseSlugFromRoute = (path: string): string | null => {
  if (!isCourseRoute(path)) return null
  return path.replace('/courses/', '')
}
