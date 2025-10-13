'use client';

import { motion } from 'framer-motion';
import { Brain, Heart, Sparkles, BookOpen, Target, Compass } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../motion.config';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface Outcome {
  title: string;
  description: string;
}

interface OutcomesGridProps {
  outcomes: Outcome[];
  title?: string;
  subtitle?: string;
}

const iconMap = [Brain, Heart, Sparkles, BookOpen, Target, Compass];

export default function OutcomesGrid({
  outcomes,
  title = 'What You\'ll Gain',
  subtitle = 'Learning Outcomes',
}: OutcomesGridProps) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section ref={ref} className="yoga-section bg-white">
      <div className="yoga-container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[var(--yoga-accent)]/10 text-[var(--yoga-accent)] font-semibold rounded-full text-sm mb-4">
            {subtitle}
          </span>
          <h2 className="yoga-heading-2 text-[var(--yoga-primary)] mb-4">{title}</h2>
        </motion.div>

        {/* Outcomes Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {outcomes.map((outcome, index) => {
            const Icon = iconMap[index % iconMap.length];
            
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="group"
              >
                <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[var(--yoga-bg)] to-white border border-[var(--yoga-border-light)] hover:border-[var(--yoga-primary)]/30 hover:shadow-lg transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="yoga-heading-3 text-[var(--yoga-text-primary)] mb-3 text-lg">
                    {outcome.title}
                  </h3>
                  <p className="yoga-body-sm text-[var(--yoga-text-secondary)] leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="yoga-body text-[var(--yoga-text-secondary)] mb-6">
            Ready to transform your life with ancient Yoga wisdom?
          </p>
          <a
            href="#enroll"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
          >
            <span>Start Your Journey</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

