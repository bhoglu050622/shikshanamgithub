'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Clock, Download, Award, Users, RefreshCw, LucideIcon } from 'lucide-react';
import { chipContainerVariants, chipVariants, observerOptions } from '../../motion.config';
import { CourseHighlight } from '../../../_shared/types/course.types';

interface FeatureChipsProps {
  features: CourseHighlight[];
}

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Clock,
  Download,
  Award,
  Users,
  RefreshCw,
};

export default function FeatureChips({ features }: FeatureChipsProps) {
  const [ref, inView] = useInView(observerOptions);

  return (
    <section className="py-16 px-4" style={{ background: 'var(--vaisheshik-bg-cream)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
            Course Features
          </h2>
          <p className="vaisheshik-body-text text-lg">
            Everything you need to master Vaisheshik philosophy
          </p>
        </div>

        <motion.div
          ref={ref}
          className="vaisheshik-feature-chips"
          variants={chipContainerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || BookOpen;
            
            return (
              <motion.div
                key={index}
                className="vaisheshik-feature-chip"
                variants={chipVariants}
              >
                <IconComponent className="vaisheshik-feature-chip-icon" />
                <div className="vaisheshik-feature-chip-title">{feature.title}</div>
                <p className="text-xs text-center text-[var(--vaisheshik-muted-gray)]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

