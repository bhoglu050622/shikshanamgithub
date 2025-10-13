'use client';

import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import CourseButton from './CourseButton';

interface CourseCTAProps {
  title: string;
  description?: string | ReactNode;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  icon?: LucideIcon;
  badges?: string[];
  backgroundGradient?: boolean;
  centered?: boolean;
  className?: string;
}

export default function CourseCTA({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  icon: Icon,
  badges,
  backgroundGradient = true,
  centered = true,
  className = '',
}: CourseCTAProps) {
  const bgClass = backgroundGradient ? 'course-gradient-overlay' : '';
  const alignClass = centered ? 'course-text-center' : '';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backgroundGradient && <div className="course-gradient-overlay" />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 course-card-premium ${alignClass}`}
      >
        {Icon && (
          <div className={`course-mb-lg ${centered ? 'course-flex course-justify-center' : ''}`}>
            <div className="course-icon-wrapper course-icon-wrapper-lg">
              <Icon className="w-full h-full" />
            </div>
          </div>
        )}

        <h2 className={`course-heading-1 text-gray-900 course-mb-lg ${centered ? 'course-mx-auto course-max-w-lg' : ''}`}>
          {title}
        </h2>

        {description && (
          <div className={`course-body-lg text-gray-600 course-mb-2xl ${centered ? 'course-mx-auto course-max-w-md' : ''}`}>
            {description}
          </div>
        )}

        <div className={`course-flex course-flex-col sm:course-flex-row course-gap-md ${centered ? 'course-justify-center' : ''}`}>
          <CourseButton
            variant="primary"
            size="lg"
            href={primaryButtonHref}
            icon={ArrowRight}
            iconPosition="right"
          >
            {primaryButtonText}
          </CourseButton>

          {secondaryButtonText && secondaryButtonHref && (
            <CourseButton
              variant="secondary"
              size="lg"
              href={secondaryButtonHref}
            >
              {secondaryButtonText}
            </CourseButton>
          )}
        </div>

        {badges && badges.length > 0 && (
          <div className={`course-flex course-flex-wrap course-gap-sm course-mt-lg ${centered ? 'course-justify-center' : ''}`}>
            {badges.map((badge, index) => (
              <span key={index} className="course-badge course-badge-info">
                {badge}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

