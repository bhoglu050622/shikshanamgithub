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
  BLOGS: '/blogs',
  BLOGS_SANSKRIT: '/blogs/sanskrit',
  GLOSSARIES: '/glossaries',
  PRACTICE: '/practice',
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
  
  // Practice routes
  PRACTICE_SANSKRIT: '/practice/sanskrit',
  
  // Tool routes
  TOOLS_SANDHI: '/tools/sandhi',
  TOOLS_KEYBOARD: '/tools/keyboard',
  
  // Glossary routes
  GLOSSARIES_SANSKRIT: '/glossaries/sanskrit',
  
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
    items: [
      {
        name: 'Sanskrit Practice',
        href: ROUTES.PRACTICE_SANSKRIT,
        description: 'Hands-on Sanskrit exercises'
      },
      {
        name: 'Sandhi Tool',
        href: ROUTES.TOOLS_SANDHI,
        description: 'Learn Sanskrit sound combinations'
      },
      {
        name: 'Keyboard Helper',
        href: ROUTES.TOOLS_KEYBOARD,
        description: 'Type in Devanagari script'
      }
    ]
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
