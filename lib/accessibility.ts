/**
 * Accessibility Utilities
 * Provides tools for WCAG AA/AAA compliance and accessibility enhancements
 */

// Color contrast ratios for WCAG compliance
export const CONTRAST_RATIOS = {
  AA_NORMAL: 4.5,      // WCAG AA for normal text
  AA_LARGE: 3.0,       // WCAG AA for large text (18pt+ or 14pt+ bold)
  AAA_NORMAL: 7.0,     // WCAG AAA for normal text
  AAA_LARGE: 4.5,      // WCAG AAA for large text
} as const;

// Minimum touch target sizes
export const TOUCH_TARGETS = {
  MINIMUM: 44,         // Minimum touch target size in pixels
  RECOMMENDED: 48,     // Recommended touch target size
} as const;

// Focus management
export class FocusManager {
  private focusHistory: HTMLElement[] = [];
  private currentFocusIndex = -1;

  /**
   * Trap focus within a container
   */
  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }

  /**
   * Restore focus to the last focused element
   */
  restoreFocus(): void {
    const lastElement = this.focusHistory[this.focusHistory.length - 1];
    if (lastElement && document.contains(lastElement)) {
      lastElement.focus();
    }
  }

  /**
   * Save current focus
   */
  saveFocus(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      this.focusHistory.push(activeElement);
    }
  }
}

// Color contrast utilities
export class ColorContrast {
  /**
   * Calculate relative luminance of a color
   */
  static getRelativeLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  static getContrastRatio(color1: [number, number, number], color2: [number, number, number]): number {
    const lum1 = this.getRelativeLuminance(...color1);
    const lum2 = this.getRelativeLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Check if contrast ratio meets WCAG standards
   */
  static meetsWCAG(
    foreground: [number, number, number],
    background: [number, number, number],
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    const requiredRatio = level === 'AA' 
      ? (size === 'large' ? CONTRAST_RATIOS.AA_LARGE : CONTRAST_RATIOS.AA_NORMAL)
      : (size === 'large' ? CONTRAST_RATIOS.AAA_LARGE : CONTRAST_RATIOS.AAA_NORMAL);
    
    return ratio >= requiredRatio;
  }

  /**
   * Get accessible text color for a background
   */
  static getAccessibleTextColor(
    background: [number, number, number],
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): [number, number, number] {
    const requiredRatio = level === 'AA' 
      ? (size === 'large' ? CONTRAST_RATIOS.AA_LARGE : CONTRAST_RATIOS.AA_NORMAL)
      : (size === 'large' ? CONTRAST_RATIOS.AAA_LARGE : CONTRAST_RATIOS.AAA_NORMAL);

    // Try white text first
    if (this.getContrastRatio([255, 255, 255], background) >= requiredRatio) {
      return [255, 255, 255];
    }

    // Try black text
    if (this.getContrastRatio([0, 0, 0], background) >= requiredRatio) {
      return [0, 0, 0];
    }

    // Calculate optimal gray
    const bgLuminance = this.getRelativeLuminance(...background);
    const targetLuminance = bgLuminance > 0.5 
      ? bgLuminance - (requiredRatio - 1) / requiredRatio
      : bgLuminance + (requiredRatio - 1) / requiredRatio;

    const gray = Math.round(targetLuminance * 255);
    return [gray, gray, gray];
  }
}

// Screen reader utilities
export class ScreenReader {
  /**
   * Announce text to screen readers
   */
  static announce(text: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = text;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Create visually hidden text for screen readers
   */
  static createScreenReaderText(text: string): HTMLElement {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  }
}

// Keyboard navigation utilities
export class KeyboardNavigation {
  /**
   * Handle arrow key navigation for lists
   */
  static handleArrowNavigation(
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ): number {
    const isHorizontal = orientation === 'horizontal';
    const isVertical = orientation === 'vertical';

    if (isVertical && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault();
      const direction = event.key === 'ArrowUp' ? -1 : 1;
      const nextIndex = (currentIndex + direction + items.length) % items.length;
      items[nextIndex].focus();
      return nextIndex;
    }

    if (isHorizontal && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      const nextIndex = (currentIndex + direction + items.length) % items.length;
      items[nextIndex].focus();
      return nextIndex;
    }

    return currentIndex;
  }

  /**
   * Handle escape key to close modals/dropdowns
   */
  static handleEscapeKey(event: KeyboardEvent, onEscape: () => void): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
    }
  }
}

// Form accessibility utilities
export class FormAccessibility {
  /**
   * Validate form field accessibility
   */
  static validateField(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check for label
    const label = document.querySelector(`label[for="${field.id}"]`);
    if (!label && !field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
      errors.push('Field must have a label, aria-label, or aria-labelledby');
    }

    // Check for required field indication
    if (field.required && !field.getAttribute('aria-required')) {
      errors.push('Required fields should have aria-required="true"');
    }

    // Check for error state
    if (field.getAttribute('aria-invalid') === 'true' && !field.getAttribute('aria-describedby')) {
      errors.push('Invalid fields should have aria-describedby pointing to error message');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Create accessible error message
   */
  static createErrorMessage(fieldId: string, message: string): HTMLElement {
    const errorElement = document.createElement('div');
    errorElement.id = `${fieldId}-error`;
    errorElement.className = 'text-red-600 text-sm mt-1';
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.textContent = message;
    return errorElement;
  }
}

// Motion and animation accessibility
export class MotionAccessibility {
  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get appropriate animation duration based on user preferences
   */
  static getAnimationDuration(defaultDuration: number): number {
    return this.prefersReducedMotion() ? 0 : defaultDuration;
  }

  /**
   * Apply reduced motion styles
   */
  static applyReducedMotion(element: HTMLElement): void {
    if (this.prefersReducedMotion()) {
      element.style.animation = 'none';
      element.style.transition = 'none';
    }
  }
}

// Export utility functions
export const accessibilityUtils = {
  FocusManager,
  ColorContrast,
  ScreenReader,
  KeyboardNavigation,
  FormAccessibility,
  MotionAccessibility,
  CONTRAST_RATIOS,
  TOUCH_TARGETS,
};