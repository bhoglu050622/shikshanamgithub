/**
 * Accessibility Hook
 * Provides accessibility utilities and state management
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
}

export interface FocusManagement {
  trapFocus: (container: HTMLElement) => () => void;
  releaseFocus: () => void;
  focusFirst: (container: HTMLElement) => void;
  focusLast: (container: HTMLElement) => void;
}

export function useAccessibility() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
  });

  const [announcements, setAnnouncements] = useState<string[]>([]);
  const focusStack = useRef<HTMLElement[]>([]);

  // Detect user preferences
  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
    };

    const updatePreferences = () => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: mediaQueries.reducedMotion.matches,
        highContrast: mediaQueries.highContrast.matches,
        largeText: document.documentElement.style.fontSize === 'large' || 
                  window.getComputedStyle(document.documentElement).fontSize === 'large',
        screenReader: window.speechSynthesis !== undefined || 
                     'speechSynthesis' in window,
      }));
    };

    // Initial check
    updatePreferences();

    // Listen for changes
    mediaQueries.reducedMotion.addEventListener('change', updatePreferences);
    mediaQueries.highContrast.addEventListener('change', updatePreferences);

    return () => {
      mediaQueries.reducedMotion.removeEventListener('change', updatePreferences);
      mediaQueries.highContrast.removeEventListener('change', updatePreferences);
    };
  }, []);

  // Announce text to screen readers
  const announce = useCallback((text: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = text;

    document.body.appendChild(announcement);

    // Add to announcements state for debugging
    setAnnouncements(prev => [...prev, text]);

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
      setAnnouncements(prev => prev.filter(a => a !== text));
    }, 1000);
  }, []);

  // Focus management
  const focusManagement: FocusManagement = {
    trapFocus: useCallback((container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) return () => {};

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      container.addEventListener('keydown', handleTabKey);
      focusStack.current.push(container);

      return () => {
        container.removeEventListener('keydown', handleTabKey);
        focusStack.current = focusStack.current.filter(el => el !== container);
      };
    }, []),

    releaseFocus: useCallback(() => {
      focusStack.current = [];
    }, []),

    focusFirst: useCallback((container: HTMLElement) => {
      const focusableElement = container.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (focusableElement) {
        focusableElement.focus();
      }
    }, []),

    focusLast: useCallback((container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }, []),
  };

  // Keyboard navigation helpers
  const handleArrowNavigation = useCallback((
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ): number => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      return currentIndex;
    }

    event.preventDefault();

    const isVertical = orientation === 'vertical';
    const isUpOrLeft = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
    const isDownOrRight = event.key === 'ArrowDown' || event.key === 'ArrowRight';

    if ((isVertical && (isUpOrLeft || isDownOrRight)) || 
        (!isVertical && (isUpOrLeft || isDownOrRight))) {
      
      let newIndex = currentIndex;
      
      if (isUpOrLeft) {
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      } else {
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      }

      items[newIndex]?.focus();
      return newIndex;
    }

    return currentIndex;
  }, []);

  // Escape key handler
  const handleEscapeKey = useCallback((event: KeyboardEvent, onEscape: () => void) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
    }
  }, []);

  // Toggle accessibility features
  const toggleHighContrast = useCallback(() => {
    const newValue = !preferences.highContrast;
    setPreferences(prev => ({ ...prev, highContrast: newValue }));
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [preferences.highContrast]);

  const toggleLargeText = useCallback(() => {
    const newValue = !preferences.largeText;
    setPreferences(prev => ({ ...prev, largeText: newValue }));
    
    if (newValue) {
      document.documentElement.style.fontSize = 'large';
    } else {
      document.documentElement.style.fontSize = '';
    }
  }, [preferences.largeText]);

  return {
    preferences,
    announce,
    focusManagement,
    handleArrowNavigation,
    handleEscapeKey,
    toggleHighContrast,
    toggleLargeText,
    announcements,
  };
}
