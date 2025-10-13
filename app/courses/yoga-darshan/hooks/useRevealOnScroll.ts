'use client';

import { useEffect, useRef, useState } from 'react';

interface UseRevealOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for revealing elements on scroll using Intersection Observer
 * Supports progressive disclosure and lazy animations
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOnScrollOptions = {}
) {
  const {
    threshold = 0.2,
    rootMargin = '-50px',
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && element) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook for staggered reveal of multiple items
 */
export function useStaggerReveal(itemCount: number, delay: number = 150) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

  useEffect(() => {
    if (!isVisible) return;

    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => [...prev, i]);
      }, i * delay);
      timeouts.push(timeout);
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [isVisible, itemCount, delay]);

  return { ref, visibleItems, allVisible: visibleItems.length === itemCount };
}

/**
 * Hook for lazy loading content after scroll
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>() {
  const { ref, isVisible } = useRevealOnScroll<T>({
    threshold: 0.1,
    rootMargin: '200px',
    triggerOnce: true,
  });

  return { ref, shouldLoad: isVisible };
}

