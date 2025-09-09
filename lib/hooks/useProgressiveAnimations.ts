/**
 * Progressive Enhancement Animations Hook
 * Provides smooth animations that respect user preferences and device capabilities
 */

import { useEffect, useState, useCallback } from 'react';

interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
}

interface UseProgressiveAnimationsOptions {
  respectReducedMotion?: boolean;
  enableOnMobile?: boolean;
  defaultOptions?: AnimationOptions;
}

export function useProgressiveAnimations({
  respectReducedMotion = true,
  enableOnMobile = true,
  defaultOptions = {
    duration: 600,
    delay: 0,
    easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
}: UseProgressiveAnimationsOptions = {}) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Check if animations should be enabled
    const checkAnimationSupport = () => {
      // Respect user's motion preferences
      if (respectReducedMotion) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          setShouldAnimate(false);
          return;
        }
      }

      // Check if device is mobile and animations are disabled for mobile
      if (!enableOnMobile) {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          setShouldAnimate(false);
          return;
        }
      }

      // Check if device can handle animations (basic performance check)
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      if (isLowEndDevice) {
        setShouldAnimate(false);
        return;
      }

      setShouldAnimate(true);
    };

    checkAnimationSupport();

    // Listen for changes in motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => checkAnimationSupport();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [respectReducedMotion, enableOnMobile]);

  const animateOnScroll = useCallback((
    element: HTMLElement,
    animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn',
    options: AnimationOptions = {}
  ) => {
    if (!shouldAnimate) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    const opts = { ...defaultOptions, ...options };
    
    // Set initial state
    element.style.opacity = '0';
    element.style.transition = `all ${opts.duration}ms ${opts.easing}`;
    
    switch (animationType) {
      case 'fadeIn':
        element.style.transform = 'translateY(20px)';
        break;
      case 'slideUp':
        element.style.transform = 'translateY(30px)';
        break;
      case 'slideLeft':
        element.style.transform = 'translateX(-30px)';
        break;
      case 'slideRight':
        element.style.transform = 'translateX(30px)';
        break;
      case 'scaleIn':
        element.style.transform = 'scale(0.9)';
        break;
    }

    // Animate in
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    }, opts.delay);
  }, [shouldAnimate, defaultOptions]);

  const createIntersectionObserver = useCallback((
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: AnimationOptions = {}
  ) => {
    if (!shouldAnimate) return null;

    const opts = { ...defaultOptions, ...options };
    
    return new IntersectionObserver(callback, {
      threshold: opts.threshold,
      rootMargin: opts.rootMargin
    });
  }, [shouldAnimate, defaultOptions]);

  const staggerAnimation = useCallback((
    elements: HTMLElement[],
    animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn',
    staggerDelay: number = 100,
    options: AnimationOptions = {}
  ) => {
    if (!shouldAnimate) {
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    elements.forEach((element, index) => {
      animateOnScroll(element, animationType, {
        ...options,
        delay: (options.delay || 0) + (index * staggerDelay)
      });
    });
  }, [shouldAnimate, animateOnScroll]);

  const createHoverAnimation = useCallback((
    element: HTMLElement,
    hoverType: 'lift' | 'scale' | 'rotate' | 'glow',
    options: AnimationOptions = {}
  ) => {
    if (!shouldAnimate) return;

    const opts = { ...defaultOptions, ...options };
    
    element.style.transition = `all ${opts.duration}ms ${opts.easing}`;
    
    const handleMouseEnter = () => {
      switch (hoverType) {
        case 'lift':
          element.style.transform = 'translateY(-8px)';
          element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
          break;
        case 'scale':
          element.style.transform = 'scale(1.05)';
          break;
        case 'rotate':
          element.style.transform = 'rotate(5deg)';
          break;
        case 'glow':
          element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
          break;
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'none';
      element.style.boxShadow = '';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldAnimate, defaultOptions]);

  const createLoadingAnimation = useCallback((
    element: HTMLElement,
    animationType: 'pulse' | 'shimmer' | 'spin' | 'bounce',
    options: AnimationOptions = {}
  ) => {
    if (!shouldAnimate) return;

    const opts = { ...defaultOptions, ...options };
    
    switch (animationType) {
      case 'pulse':
        element.style.animation = `loadingPulse ${opts.duration}ms ease-in-out infinite`;
        break;
      case 'shimmer':
        element.style.animation = `loadingShimmer ${opts.duration}ms infinite`;
        break;
      case 'spin':
        element.style.animation = `spin ${opts.duration}ms linear infinite`;
        break;
      case 'bounce':
        element.style.animation = `microBounce ${opts.duration}ms ease-in-out infinite`;
        break;
    }
  }, [shouldAnimate, defaultOptions]);

  return {
    shouldAnimate,
    animateOnScroll,
    createIntersectionObserver,
    staggerAnimation,
    createHoverAnimation,
    createLoadingAnimation,
    isIntersecting,
    setIsIntersecting
  };
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimations(
  animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' = 'fadeIn',
  options: AnimationOptions = {}
) {
  const { shouldAnimate, createIntersectionObserver, animateOnScroll } = useProgressiveAnimations();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node || !shouldAnimate) return;

    const observer = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateOnScroll(entry.target as HTMLElement, animationType, options);
          observer?.unobserve(entry.target);
        }
      });
    }, options);

    observer?.observe(node);

    return () => observer?.disconnect();
  }, [shouldAnimate, createIntersectionObserver, animateOnScroll, animationType, options]);

  return ref;
}

/**
 * Hook for staggered animations
 */
export function useStaggeredAnimations(
  animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' = 'fadeIn',
  staggerDelay: number = 100,
  options: AnimationOptions = {}
) {
  const { shouldAnimate, staggerAnimation, createIntersectionObserver } = useProgressiveAnimations();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node || !shouldAnimate) return;

    const observer = createIntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = Array.from(entry.target.children) as HTMLElement[];
          staggerAnimation(elements, animationType, staggerDelay, options);
          observer?.unobserve(entry.target);
        }
      });
    }, options);

    observer?.observe(node);

    return () => observer?.disconnect();
  }, [shouldAnimate, createIntersectionObserver, staggerAnimation, animationType, staggerDelay, options]);

  return ref;
}
