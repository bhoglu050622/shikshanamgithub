'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import CourseIconWrapper from './CourseIconWrapper';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface CourseFeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function CourseFeatureGrid({
  features,
  columns = 3,
  className = '',
}: CourseFeatureGridProps) {
  const gridClasses = {
    2: 'course-grid-2',
    3: 'course-grid-3',
    4: 'course-grid-4',
  };

  return (
    <div className={`${gridClasses[columns]} ${className}`}>
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="course-card-feature"
          suppressHydrationWarning
        >
          <CourseIconWrapper icon={feature.icon} size="md" className="course-mb-md" />
          <h3 className="course-heading-4 text-gray-900 course-mb-sm">
            {feature.title}
          </h3>
          <p className="course-body text-gray-600">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

