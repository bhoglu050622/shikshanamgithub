'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SSRSafeMotionProps {
  children: React.ReactNode;
  initial?: any;
  animate?: any;
  whileInView?: any;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

// List of framer-motion specific props that should not be passed to regular DOM elements
const MOTION_PROPS = [
  'initial',
  'animate',
  'exit',
  'whileHover',
  'whileTap',
  'whileFocus',
  'whileDrag',
  'whileInView',
  'transition',
  'variants',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragTransition',
  'dragSnapToOrigin',
  'dragPropagation',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'onDirectionLock',
  'layout',
  'layoutId',
  'layoutDependency',
  'onLayoutAnimationStart',
  'onLayoutAnimationComplete',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onViewportEnter',
  'onViewportLeave',
  'viewport',
  'inherit',
];

export default function SSRSafeMotion({ 
  children, 
  initial, 
  animate, 
  whileInView,
  className,
  style,
  ...props 
}: SSRSafeMotionProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial hydration, render without motion
  if (!mounted) {
    // Filter out motion-specific props to avoid React warnings
    const domProps = Object.keys(props).reduce((acc, key) => {
      if (!MOTION_PROPS.includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as Record<string, any>);

    return (
      <div className={className} style={style} {...domProps}>
        {children}
      </div>
    );
  }

  // After hydration, render with motion
  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      {...props}
    >
      {children}
    </motion.div>
  );
}
