'use client';

import { motion } from 'framer-motion';
import ModuleCard from './ModuleCard';
import { fadeInUp } from '../motion.config';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface SyllabusModule {
  title: string;
  subtitle: string;
  duration: string;
  videoCount: number;
  topics: string[];
  description: string;
  isFreeDemo?: boolean;
}

interface SyllabusGridProps {
  modules: SyllabusModule[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function SyllabusGrid({
  modules,
  title = 'Course Journey — From Sutra 1 to 195',
  subtitle = 'Complete Curriculum',
  description = 'The course systematically covers all 195 Yoga Sutras of Maharshi Patanjali, presented in grouped modules for easy learning',
}: SyllabusGridProps) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section ref={ref} className="yoga-section bg-gradient-to-b from-white to-[var(--yoga-bg)]">
      <div className="yoga-container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--yoga-primary)]/10 text-[var(--yoga-primary)] font-semibold rounded-full text-sm mb-4">
            {subtitle}
          </span>
          <h2 className="yoga-heading-2 text-[var(--yoga-primary)] mb-4">{title}</h2>
          <p className="yoga-body-lg text-[var(--yoga-text-secondary)]">{description}</p>
        </motion.div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} index={index} />
          ))}
        </div>

        {/* Mobile: Accordion/Stack Layout */}
        <div className="lg:hidden space-y-4">
          {modules.map((module, index) => (
            <ModuleCard key={index} {...module} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-gradient-to-r from-[var(--yoga-primary)]/5 to-[var(--yoga-accent)]/5 rounded-xl border border-[var(--yoga-border-light)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[var(--yoga-text-primary)] mb-2">
                Want to see the complete syllabus?
              </h3>
              <p className="text-sm text-[var(--yoga-text-secondary)]">
                Download the detailed course outline with all 195 sutras mapped to video lessons
              </p>
            </div>
            <button className="px-6 py-3 bg-[var(--yoga-primary)] text-white font-semibold rounded-lg hover:bg-[var(--yoga-primary-dark)] transition-colors duration-300 whitespace-nowrap">
              Download Syllabus
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

