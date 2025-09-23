import { useState, useEffect } from 'react';

/**
 * Custom hook to handle hydration-safe animations
 * Prevents hydration mismatches by ensuring animations only run on the client
 */
export function useHydrationSafeAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

/**
 * Helper function to create hydration-safe motion props
 */
export function createHydrationSafeMotionProps(
  initial: any,
  animate: any,
  transition: any = { duration: 0 },
  whileHover: any = {},
  whileTap: any = {}
) {
  const mounted = useHydrationSafeAnimation();

  return {
    initial: mounted ? initial : false,
    animate: mounted ? animate : { opacity: 1, scale: 1, x: 0, y: 0 },
    transition: mounted ? transition : { duration: 0 },
    whileHover: mounted ? whileHover : {},
    whileTap: mounted ? whileTap : {},
  };
}

/**
 * Helper function for staggered animations that are hydration-safe
 */
export function createHydrationSafeStaggerProps(
  baseProps: any,
  index: number = 0,
  staggerDelay: number = 0.1
) {
  const mounted = useHydrationSafeAnimation();

  return {
    ...baseProps,
    transition: mounted 
      ? { ...baseProps.transition, delay: (baseProps.transition?.delay || 0) + (index * staggerDelay) }
      : { duration: 0 },
  };
}
