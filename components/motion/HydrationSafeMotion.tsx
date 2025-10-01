'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HydrationSafeMotionProps {
  children: React.ReactNode;
  initial?: any;
  animate?: any;
  whileInView?: any;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function HydrationSafeMotion({ 
  children, 
  initial, 
  animate, 
  whileInView,
  className,
  style,
  ...props 
}: HydrationSafeMotionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial hydration, render without motion
  if (!mounted) {
    return (
      <div className={className} style={style} {...props}>
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
