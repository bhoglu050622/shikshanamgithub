/**
 * Centralized route definitions and helpers for Shikshanam
 * Ensures consistent routing across the application
 */

// Base routes
export const ROUTES = {
  // Main pages
  HOME: '/',
  COURSES: '/courses',
  PACKAGES: '/packages',
  DASHBOARD: '/dashboard',
  
  // Schools
  SCHOOLS: '/schools',
  SCHOOL_SANSKRIT: '/schools/sanskrit',
  SCHOOL_DARSHANA: '/schools/darshana',
  SCHOOL_SELF_HELP: '/schools/self-help',
  SCHOOL_NYAYA: '/schools/nyaya',
  SCHOOL_VAISHESHIKA: '/schools/vaisheshika',
  SCHOOL_SAMKHYA: '/schools/samkhya',
  SCHOOL_YOGA: '/schools/yoga',
  SCHOOL_MIMAMSA: '/schools/mimamsa',
  SCHOOL_VEDANTA: '/schools/vedanta',
  
  // Practice & Tools
  PRACTICE_SANSKRIT: '/practice/sanskrit',
  TOOLS_SANDHI: '/tools/sandhi',
  TOOLS_KEYBOARD: '/tools/keyboard',
  
  // Community
  GURUS: '/gurus',
  GURU_MEERA_PATEL: '/gurus/meera-patel',
  GURU_PRIYA_SHARMA: '/gurus/priya-sharma',
  GURU_RAJESH_KUMAR: '/gurus/rajesh-kumar',
  
  // Content
  BLOGS_SANSKRIT: '/blogs/sanskrit',
  GLOSSARIES_SANSKRIT: '/glossaries/sanskrit',
  
  // User
  ACCOUNT: '/account',
  PROFILE: '/me',
  MY_PACKAGES: '/me/packages',
  
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  OAUTH_CALLBACK: '/oauth2callback',
  
  // Support
  HELP: '/help',
  CONTACT: '/contact',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  ACCESSIBILITY: '/accessibility',
} as const

// Dynamic route generators
export const generateRoutes = {
  // Course routes
  course: (slug: string) => `/courses/${slug}`,
  courseEnroll: (slug: string) => `/courses/${slug}/enroll`,
  courseLearn: (slug: string) => `/courses/${slug}/learn`,
  courseSyllabus: (slug: string) => `/courses/${slug}/syllabus`,
  
  // Package routes
  package: (sku: string) => `/packages/${sku}`,
  packageBuy: (sku: string) => `/packages/${sku}/buy`,
  
  // School routes
  school: (slug: string) => `/schools/${slug}`,
  
  // Guru routes
  guru: (slug: string) => `/gurus/${slug}`,
  
  // Blog routes
  blog: (category: string, slug: string) => `/blogs/${category}/${slug}`,
  
  // Checkout routes
  checkout: (type: 'course' | 'package', id: string) => `/checkout?type=${type}&id=${id}`,
  
  // API routes
  api: {
    wishlist: '/api/wishlist',
    enroll: (courseId: string) => `/api/courses/${courseId}/enroll`,
    purchase: (packageId: string) => `/api/packages/${packageId}/purchase`,
  }
} as const

// Route validation helpers
export const isValidRoute = (path: string): boolean => {
  const validRoutes = Object.values(ROUTES)
  return validRoutes.includes(path as any)
}

// Navigation link types
export interface NavLink {
  name: string
  href: string
  external?: boolean
  target?: '_blank' | '_self'
}

// Common navigation groups
export const NAVIGATION_GROUPS = {
  main: [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Courses', href: ROUTES.COURSES },
    { name: 'Packages', href: ROUTES.PACKAGES },
    { name: 'Schools', href: ROUTES.SCHOOLS },
  ],
  learn: [
    { name: 'Sanskrit School', href: ROUTES.SCHOOL_SANSKRIT },
    { name: 'Darshan School', href: ROUTES.SCHOOL_DARSHANA },
    { name: 'Self-help School', href: ROUTES.SCHOOL_SELF_HELP },
    { name: 'All Schools', href: ROUTES.SCHOOLS },
  ],
  practice: [
    { name: 'Sanskrit Practice', href: ROUTES.PRACTICE_SANSKRIT },
    { name: 'Sandhi Tool', href: ROUTES.TOOLS_SANDHI },
    { name: 'Keyboard Helper', href: ROUTES.TOOLS_KEYBOARD },
  ],
  community: [
    { name: 'Meet Gurus', href: ROUTES.GURUS },
    { name: 'Sanskrit Blog', href: ROUTES.BLOGS_SANSKRIT },
    { name: 'Student Stories', href: '#stories' },
  ],
  support: [
    { name: 'Help Center', href: ROUTES.HELP },
    { name: 'Contact Us', href: ROUTES.CONTACT },
    { name: 'About Us', href: ROUTES.ABOUT },
  ],
  legal: [
    { name: 'Privacy Policy', href: ROUTES.PRIVACY },
    { name: 'Terms of Service', href: ROUTES.TERMS },
    { name: 'Accessibility', href: ROUTES.ACCESSIBILITY },
  ]
} as const

// CTA action types
export type CTAAction = 
  | 'enroll'
  | 'buy'
  | 'learn'
  | 'view'
  | 'wishlist'
  | 'syllabus'
  | 'contact'
  | 'signup'

// CTA route mapping
export const getCTARoute = (
  action: CTAAction,
  itemType: 'course' | 'package',
  itemId: string,
  options?: {
    enrolled?: boolean
    purchased?: boolean
  }
): string => {
  switch (action) {
    case 'enroll':
      return generateRoutes.courseEnroll(itemId)
    case 'buy':
      return generateRoutes.packageBuy(itemId)
    case 'learn':
      if (options?.enrolled || options?.purchased) {
        return generateRoutes.courseLearn(itemId)
      }
      return generateRoutes.course(itemId)
    case 'view':
      return itemType === 'course' 
        ? generateRoutes.course(itemId)
        : generateRoutes.package(itemId)
    case 'wishlist':
      return generateRoutes.api.wishlist
    case 'syllabus':
      return generateRoutes.courseSyllabus(itemId)
    case 'contact':
      return ROUTES.CONTACT
    case 'signup':
      return ROUTES.LOGIN
    default:
      return ROUTES.HOME
  }
}

// Breadcrumb helpers
export const getBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ name: 'Home', href: ROUTES.HOME }]
  
  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Map segments to readable names
    const nameMap: Record<string, string> = {
      'courses': 'Courses',
      'packages': 'Packages',
      'schools': 'Schools',
      'practice': 'Practice',
      'tools': 'Tools',
      'gurus': 'Gurus',
      'blogs': 'Blogs',
      'glossaries': 'Glossaries',
      'me': 'My Account',
      'dashboard': 'Dashboard',
      'sanskrit': 'Sanskrit',
      'darshana': 'Darshanas',
      'self-help': 'Self-help',
      'nyaya': 'Nyaya',
      'vaisheshika': 'Vaisheshika',
      'samkhya': 'Samkhya',
      'yoga': 'Yoga',
      'mimamsa': 'Mimamsa',
      'vedanta': 'Vedanta',
    }
    
    const name = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ name, href: currentPath as any })
  })
  
  return breadcrumbs
}

// Export types
export type RouteKey = keyof typeof ROUTES
export type NavigationGroupKey = keyof typeof NAVIGATION_GROUPS
