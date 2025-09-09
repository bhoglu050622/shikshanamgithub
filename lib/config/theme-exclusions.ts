/**
 * Premium Design System - Theme Exclusions Configuration
 * 
 * This file defines which pages/routes should be excluded from the premium 
 * light/dark theme system. These pages will remain with their existing styling.
 */

export const THEME_EXCLUDED_ROUTES = [
  // Course pages - maintain existing light/dark themes
  '/courses/',
  
  // Package pages - maintain existing styling  
  '/packages/',
  '/me/packages',
  
  // Quiz and assessment pages
  '/guna-profiler',
  '/test-guna-profiler',
  '/how-aligned-are-you',
  '/test-dharma-path',
  '/dharma-path',
  
  // School-specific pages that have their own design systems
  '/schools/sanskrit',
  '/schools/self-help',
  '/schools/yoga',
  '/schools/vedanta',
  '/schools/samkhya',
  '/schools/nyaya',
  '/schools/vaisheshika',
  '/schools/mimamsa',
  '/schools/darshana',
] as const

export type ThemeExcludedRoute = typeof THEME_EXCLUDED_ROUTES[number]

/**
 * Check if a route should be excluded from the premium theme system
 */
export function isThemeExcluded(pathname: string): boolean {
  return THEME_EXCLUDED_ROUTES.some(route => {
    // Handle exact matches
    if (route === pathname) return true
    
    // Handle route prefixes (e.g., /courses/ matches /courses/any-course)
    if (route.endsWith('/') && pathname.startsWith(route)) return true
    
    return false
  })
}

/**
 * Get the appropriate theme class for a route
 */
export function getThemeClassForRoute(pathname: string): string {
  if (isThemeExcluded(pathname)) {
    // Return empty string - let the page use its own theme system
    return ''
  }
  
  // Use premium theme system for non-excluded routes
  return 'premium-theme'
}

/**
 * Check if the theme toggle should be hidden for a route
 */
export function shouldHideThemeToggle(pathname: string): boolean {
  return isThemeExcluded(pathname)
}
