import { Variants } from 'framer-motion';

/**
 * Motion configuration for Advaita Vedanta course
 * Slow, contemplative animations reflecting the meditative nature of the philosophy
 */

// Base timing - slow and contemplative
export const timing = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96] // Custom ease-in-out
};

// Hero section animations
export const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export const heroChildVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: timing
  }
};

// Feature chips animations
export const featureChipsVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const featureChipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: timing
  }
};

// Syllabus card animations
export const syllabusGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const syllabusCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: timing
  }
};

// Testimonial carousel animations
export const testimonialVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: timing
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: timing
  })
};

// Demo modal animations
export const demoModalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: timing
  }
};

// Purchase card animations (for mobile bottom sheet)
export const purchaseCardVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: timing
  }
};

// Generic fade in animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: timing
  }
};

// Utility function to handle reduced motion preference
export const safeVariants = (variants: Variants): Variants => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Return simplified variants for users who prefer reduced motion
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } }
    };
  }
  return variants;
};

// Intersection Observer options for triggering animations
export const intersectionOptions = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '-50px 0px'
};


