'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CourseCardProps {
  children: ReactNode;
  variant?: 'default' | 'premium' | 'feature';
  className?: string;
  hoverable?: boolean;
  delay?: number;
}

export default function CourseCard({
  children,
  variant = 'default',
  className = '',
  hoverable = true,
  delay = 0,
}: CourseCardProps) {
  const variantClasses = {
    default: 'course-card',
    premium: 'course-card-premium',
    feature: 'course-card-feature',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`${variantClasses[variant]} ${className}`}
      style={{ cursor: hoverable ? 'default' : 'auto' }}
    >
      {children}
    </motion.div>
  );
}

