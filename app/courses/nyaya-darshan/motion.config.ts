import { Variants } from 'framer-motion';

// Analytical, purposeful animation timing - reflects reasoned tone
export const analyticalTiming = {
  duration: 0.7,
  ease: [0.4, 0, 0.2, 1] as const
};

// Hero section animations
export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...analyticalTiming,
      staggerChildren: 0.12
    }
  }
};

export const heroChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: analyticalTiming
  }
};

// Feature chips staggered reveal
export const featureChipsVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

export const featureChipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Fade in on scroll
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: analyticalTiming
  }
};

// Subtle scale on hover
export const scaleOnHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Card reveal animation
export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: analyticalTiming
  }
};

// Demo modal animation
export const modalOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 15,
    transition: { duration: 0.25 }
  }
};

// Syllabus module animation
export const moduleCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};

// Testimonial carousel
export const testimonialVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: analyticalTiming
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: analyticalTiming
  })
};

// Reduced motion preference detection
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Safe animation variants with reduced motion fallback
export const safeVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } }
    };
  }
  return variants;
};

