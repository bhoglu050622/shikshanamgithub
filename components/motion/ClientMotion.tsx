'use client';

import { motion, MotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Client-side Motion wrapper that prevents hydration mismatches
 * by disabling animations on initial server render
 */

interface ClientMotionProps extends MotionProps {
  children: React.ReactNode;
  as?: keyof typeof motion;
  className?: string;
}

export function ClientMotion({ 
  children, 
  as = 'div',
  initial,
  animate,
  whileInView,
  ...props 
}: ClientMotionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const MotionComponent = motion[as] as any;

  // On server and initial client render, use final state to prevent hydration mismatch
  if (!mounted) {
    return (
      <MotionComponent
        {...props}
        initial={false}
      >
        {children}
      </MotionComponent>
    );
  }

  // After mounting, enable animations
  return (
    <MotionComponent
      {...props}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
    >
      {children}
    </MotionComponent>
  );
}

// Convenience exports for common elements
export const ClientMotionDiv = (props: ClientMotionProps) => 
  <ClientMotion as="div" {...props} />;

export const ClientMotionSection = (props: ClientMotionProps) => 
  <ClientMotion as="section" {...props} />;

export const ClientMotionH1 = (props: ClientMotionProps) => 
  <ClientMotion as="h1" {...props} />;

export const ClientMotionH2 = (props: ClientMotionProps) => 
  <ClientMotion as="h2" {...props} />;

export const ClientMotionP = (props: ClientMotionProps) => 
  <ClientMotion as="p" {...props} />;

