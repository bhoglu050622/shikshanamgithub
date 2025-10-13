'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, FileCheck, RefreshCw, Calendar, Award, Users } from 'lucide-react';
import { useStaggerReveal } from '../hooks/useRevealOnScroll';
import { staggerItem } from '../motion.config';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureStripProps {
  features: Feature[];
}

const iconMap: Record<string, any> = {
  BookOpen,
  Clock,
  FileCheck,
  RefreshCw,
  Calendar,
  Award,
  Users,
};

export default function FeatureStrip({ features }: FeatureStripProps) {
  const { ref, visibleItems } = useStaggerReveal(features.length, 100);

  return (
    <section ref={ref} className="py-12 bg-gradient-to-r from-[var(--yoga-bg)] to-[var(--yoga-bg-secondary)]">
      <div className="yoga-container">
        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon] || BookOpen;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    visibleItems.includes(index)
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md border border-[var(--yoga-border-light)] min-w-[280px]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--yoga-text-primary)] text-sm">
                      {feature.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || BookOpen;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                initial="hidden"
                animate={visibleItems.includes(index) ? 'visible' : 'hidden'}
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-[var(--yoga-border-light)] hover:shadow-lg hover:border-[var(--yoga-primary)]/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--yoga-text-primary)] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--yoga-text-tertiary)] line-clamp-2">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

