/**
 * Premium Color Theme for Shikshanam
 * Optimized for readability and modern UI/UX
 * Use these color classes across all pages (except individual courses/packages)
 * Ensures consistent light/dark mode theming with premium gold and burgundy accents
 */

export const THEME_COLORS = {
  // Page Backgrounds - Warm white for light, Deep navy for dark
  page: {
    light: 'bg-[#FEFEFE]',
    dark: 'dark:bg-[#0F1419]',
    full: 'bg-[#FEFEFE] dark:bg-[#0F1419]'
  },
  
  // Card Backgrounds - Pure white for light, Card background for dark
  card: {
    light: 'bg-white',
    dark: 'dark:bg-[#1E2430]',
    full: 'bg-white dark:bg-[#1E2430]',
    border: 'border border-[#E0E0E0] dark:border-[#2F3745]'
  },
  
  // Text Colors - Deep charcoal for light, Almost white for dark
  text: {
    primary: 'text-[#1A1A1A] dark:text-[#F5F5F5]',
    secondary: 'text-[#333333] dark:text-[#D4D4D4]',
    tertiary: 'text-[#4A4A4A] dark:text-[#B8B8B8]',
    muted: 'text-gray-500 dark:text-gray-400',
    accent: 'text-[#D4AF37] dark:text-[#F4D03F]'
  },
  
  // Headings - Deep charcoal for light, Almost white for dark
  heading: {
    h1: 'text-4xl lg:text-6xl font-bold text-[#1A1A1A] dark:text-[#F5F5F5]',
    h2: 'text-3xl lg:text-4xl font-bold text-[#1A1A1A] dark:text-[#F5F5F5]',
    h3: 'text-2xl lg:text-3xl font-bold text-[#333333] dark:text-[#D4D4D4]',
    h4: 'text-xl lg:text-2xl font-semibold text-[#333333] dark:text-[#D4D4D4]'
  },
  
  // Buttons - Premium gold gradient and burgundy
  button: {
    primary: 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white dark:from-[#F4D03F] dark:to-[#E8B923] dark:text-[#1A1A1A] hover:shadow-lg transition-all duration-300',
    secondary: 'bg-[#8B1A1A] dark:bg-[#C41E3A] text-white hover:shadow-lg transition-all duration-300',
    outline: 'border-2 border-[#D4AF37] dark:border-[#F4D03F] text-[#D4AF37] dark:text-[#F4D03F] hover:bg-[#D4AF37] hover:text-white dark:hover:bg-[#F4D03F] dark:hover:text-[#1A1A1A] transition-all duration-300'
  },
  
  // Borders - Light gray for light, Medium dark gray for dark
  border: {
    light: 'border-[#E0E0E0]',
    dark: 'dark:border-[#2F3745]',
    full: 'border-[#E0E0E0] dark:border-[#2F3745]'
  },
  
  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
} as const

// Helper function to get combined class names
export function getPageClasses(): string {
  return `min-h-screen ${THEME_COLORS.page.full}`
}

export function getCardClasses(): string {
  return `${THEME_COLORS.card.full} ${THEME_COLORS.card.border} rounded-xl p-6 ${THEME_COLORS.shadow.lg}`
}

export function getH1Classes(): string {
  return THEME_COLORS.heading.h1
}

export function getH2Classes(): string {
  return THEME_COLORS.heading.h2
}

export function getH3Classes(): string {
  return THEME_COLORS.heading.h3
}

export function getPrimaryButtonClasses(): string {
  return `${THEME_COLORS.button.primary} px-6 py-3 rounded-xl font-semibold`
}

export function getSecondaryButtonClasses(): string {
  return `${THEME_COLORS.button.secondary} px-6 py-3 rounded-xl font-semibold`
}

export function getBodyTextClasses(): string {
  return THEME_COLORS.text.secondary
}

