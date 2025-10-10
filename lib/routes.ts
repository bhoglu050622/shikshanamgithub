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
  PACKAGES: '/packages',
  SCHOOLS: '/schools',
  GURUS: '/gurus',
  WISDOM: '/wisdom',
  BLOGS: '/blogs',
  BLOGS_SANSKRIT: '/wisdom',
  GLOSSARIES: '/glossaries',
  ACCOUNT: '/account',
  ME: '/me',
  
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
  
  
  // Glossary routes
  GLOSSARIES_SANSKRIT: '/glossaries/sanskrit',
  
  // Practice routes
  PRACTICE_SANSKRIT: '/practice/sanskrit',
  
  // Tools routes
  TOOLS_SANDHI: '/tools/sandhi',
  TOOLS_KEYBOARD: '/tools/keyboard',
  
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
} as const

// Generate routes function for compatibility
export const generateRoutes = () => {
  return {
    courses: ROUTES.COURSES,
    schools: ROUTES.SCHOOLS
  }
}
