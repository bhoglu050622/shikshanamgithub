'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface CourseSectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  icon?: LucideIcon;
  badge?: string;
  centered?: boolean;
  className?: string;
}

export default function CourseSectionHeader({
  title,
  subtitle,
  description,
  icon: Icon,
  badge,
  centered = true,
  className = '',
}: CourseSectionHeaderProps) {
  const alignmentClass = centered ? 'course-text-center course-mx-auto' : '';
  const maxWidthClass = centered ? 'course-max-w-lg' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`course-mb-3xl ${alignmentClass} ${className}`}
      suppressHydrationWarning
    >
      {badge && (
        <div className={`course-mb-md ${centered ? 'course-flex course-justify-center' : ''}`}>
          <span className="course-badge course-badge-primary">
            {badge}
          </span>
        </div>
      )}

      {Icon && (
        <div className={`course-mb-lg ${centered ? 'course-flex course-justify-center' : ''}`}>
          <div className="course-icon-wrapper course-icon-wrapper-lg">
            <Icon className="w-full h-full" />
          </div>
        </div>
      )}

      {subtitle && (
        <p className={`course-body-sm text-gray-600 course-mb-sm font-semibold tracking-wider uppercase ${centered ? 'text-center' : ''}`}>
          {subtitle}
        </p>
      )}

      <h2 className={`course-heading-1 text-gray-900 course-mb-lg ${maxWidthClass} ${centered ? 'text-center' : ''}`}>
        {title}
      </h2>

      {description && (
        <div className={`course-body-lg text-gray-600 ${maxWidthClass} ${centered ? 'text-center' : ''}`}>
          {description}
        </div>
      )}
    </motion.div>
  );
}

