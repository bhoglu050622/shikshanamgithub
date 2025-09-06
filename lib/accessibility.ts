/**
 * Accessibility utilities for the Shikshanam application
 * Provides comprehensive accessibility features including ARIA attributes,
 * keyboard navigation, focus management, and reduced motion support.
 */

import { useReducedMotion } from 'framer-motion'

// ARIA attribute helpers
export const getAriaAttributes = {
  // Button accessibility
  button: (options: {
    label?: string
    expanded?: boolean
    controls?: string
    describedBy?: string
    pressed?: boolean
    disabled?: boolean
  }) => ({
    'aria-label': options.label,
    'aria-expanded': options.expanded,
    'aria-controls': options.controls,
    'aria-describedby': options.describedBy,
    'aria-pressed': options.pressed,
    'aria-disabled': options.disabled,
  }),

  // Navigation accessibility
  navigation: (options: {
    label?: string
    current?: boolean
    orientation?: 'horizontal' | 'vertical'
  }) => ({
    'aria-label': options.label,
    'aria-current': options.current ? 'page' : undefined,
    'aria-orientation': options.orientation,
  }),

  // Form accessibility
  form: (options: {
    label?: string
    required?: boolean
    invalid?: boolean
    describedBy?: string
  }) => ({
    'aria-label': options.label,
    'aria-required': options.required,
    'aria-invalid': options.invalid,
    'aria-describedby': options.describedBy,
  }),

  // Modal/Dialog accessibility
  dialog: (options: {
    label?: string
    describedBy?: string
    modal?: boolean
  }) => ({
    'aria-label': options.label,
    'aria-describedby': options.describedBy,
    'aria-modal': options.modal,
    role: 'dialog',
  }),

  // Live region for announcements
  liveRegion: (options: {
    polite?: boolean
    assertive?: boolean
  }) => ({
    'aria-live': options.assertive ? 'assertive' : 'polite',
    'aria-atomic': 'true',
  }),

  // Tablist accessibility
  tablist: (options: {
    orientation?: 'horizontal' | 'vertical'
    label?: string
  }) => ({
    role: 'tablist',
    'aria-orientation': options.orientation,
    'aria-label': options.label,
  }),

  // Tab accessibility
  tab: (options: {
    selected?: boolean
    controls?: string
    label?: string
  }) => ({
    role: 'tab',
    'aria-selected': options.selected,
    'aria-controls': options.controls,
    'aria-label': options.label,
  }),

  // Tabpanel accessibility
  tabpanel: (options: {
    labelledBy?: string
    label?: string
  }) => ({
    role: 'tabpanel',
    'aria-labelledby': options.labelledBy,
    'aria-label': options.label,
  }),
}

// Keyboard navigation helpers
export const keyboardNavigation = {
  // Arrow key navigation for horizontal/vertical lists
  handleArrowKeys: (
    event: React.KeyboardEvent,
    options: {
      orientation: 'horizontal' | 'vertical'
      currentIndex: number
      totalItems: number
      onIndexChange: (index: number) => void
      loop?: boolean
    }
  ) => {
    const { orientation, currentIndex, totalItems, onIndexChange, loop = true } = options
    
    if (orientation === 'horizontal') {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        const newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? totalItems - 1 : currentIndex)
        onIndexChange(newIndex)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        const newIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex)
        onIndexChange(newIndex)
      }
    } else {
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? totalItems - 1 : currentIndex)
        onIndexChange(newIndex)
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        const newIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex)
        onIndexChange(newIndex)
      }
    }
  },

  // Escape key handler for modals/dropdowns
  handleEscape: (
    event: React.KeyboardEvent,
    onEscape: () => void
  ) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onEscape()
    }
  },

  // Enter/Space key handler for interactive elements
  handleActivation: (
    event: React.KeyboardEvent,
    onActivate: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onActivate()
    }
  },

  // Tab navigation with focus trapping
  handleTabNavigation: (
    event: React.KeyboardEvent,
    options: {
      firstFocusableElement?: HTMLElement | null
      lastFocusableElement?: HTMLElement | null
      trapFocus?: boolean
    }
  ) => {
    if (event.key === 'Tab' && options.trapFocus) {
      const { firstFocusableElement, lastFocusableElement } = options
      
      if (event.shiftKey) {
        // Shift + Tab (backwards)
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault()
          lastFocusableElement?.focus()
        }
      } else {
        // Tab (forwards)
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault()
          firstFocusableElement?.focus()
        }
      }
    }
  },
}

// Focus management utilities
export const focusManagement = {
  // Focus trap for modals
  createFocusTrap: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    return {
      firstElement,
      lastElement,
      focusableElements: Array.from(focusableElements),
    }
  },

  // Restore focus to previously focused element
  restoreFocus: (() => {
    let previouslyFocusedElement: HTMLElement | null = null
    
    return {
      save: () => {
        previouslyFocusedElement = document.activeElement as HTMLElement
      },
      restore: () => {
        if (previouslyFocusedElement) {
          previouslyFocusedElement.focus()
          previouslyFocusedElement = null
        }
      },
    }
  })(),

  // Announce changes to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },
}

// Screen reader utilities
export const screenReader = {
  // Hide element from screen readers
  hide: (element: HTMLElement) => {
    element.setAttribute('aria-hidden', 'true')
  },

  // Show element to screen readers
  show: (element: HTMLElement) => {
    element.removeAttribute('aria-hidden')
  },

  // Create screen reader only text
  createScreenReaderText: (text: string) => {
    const element = document.createElement('span')
    element.className = 'sr-only'
    element.textContent = text
    return element
  },
}

// Motion accessibility utilities
export const motionAccessibility = {
  // Get reduced motion preferences
  useReducedMotion: () => useReducedMotion(),

  // Create motion variants that respect reduced motion
  createAccessibleVariants: (variants: any, shouldReduceMotion: boolean) => {
    if (shouldReduceMotion) {
      // Return static variants for reduced motion
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        ...variants,
      }
    }
    return variants
  },

  // Safe animation duration that respects reduced motion
  getSafeDuration: (duration: number, shouldReduceMotion: boolean) => {
    return shouldReduceMotion ? 0 : duration
  },
}

// Color contrast utilities
export const colorContrast = {
  // Check if color combination meets WCAG standards
  checkContrast: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA') => {
    // This would typically use a color contrast library
    // For now, return a placeholder
    return {
      ratio: 4.5, // Placeholder
      meetsAA: true,
      meetsAAA: false,
    }
  },

  // Get high contrast colors for better accessibility
  getHighContrastColors: (baseColor: string) => {
    // This would typically use a color manipulation library
    return {
      light: '#ffffff',
      dark: '#000000',
      highContrast: baseColor,
    }
  },
}

// Form accessibility utilities
export const formAccessibility = {
  // Create accessible form field
  createAccessibleField: (options: {
    id: string
    label: string
    required?: boolean
    error?: string
    helpText?: string
  }) => {
    const { id, label, required, error, helpText } = options
    
    return {
      inputProps: {
        id,
        'aria-required': required,
        'aria-invalid': !!error,
        'aria-describedby': [
          error ? `${id}-error` : null,
          helpText ? `${id}-help` : null,
        ].filter(Boolean).join(' ') || undefined,
      },
      labelProps: {
        htmlFor: id,
      },
      errorProps: error ? {
        id: `${id}-error`,
        role: 'alert',
        'aria-live': 'polite',
      } : undefined,
      helpProps: helpText ? {
        id: `${id}-help`,
      } : undefined,
    }
  },

  // Validate form field accessibility
  validateFieldAccessibility: (field: HTMLInputElement) => {
    const issues: string[] = []
    
    if (!field.id) {
      issues.push('Field must have an id attribute')
    }
    
    if (!field.getAttribute('aria-label') && !document.querySelector(`label[for="${field.id}"]`)) {
      issues.push('Field must have a label or aria-label')
    }
    
    if (field.hasAttribute('aria-invalid') && !field.getAttribute('aria-describedby')) {
      issues.push('Invalid fields must have error message referenced by aria-describedby')
    }
    
    return issues
  },
}

// Export all utilities as a single object
export const accessibility = {
  aria: getAriaAttributes,
  keyboard: keyboardNavigation,
  focus: focusManagement,
  screenReader,
  motion: motionAccessibility,
  contrast: colorContrast,
  form: formAccessibility,
}

export default accessibility
