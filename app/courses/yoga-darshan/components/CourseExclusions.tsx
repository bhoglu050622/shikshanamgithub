'use client';

import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { fadeInUp } from '../motion.config';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface CourseExclusionsProps {
  title?: string;
  description?: string;
  points: string[];
}

export default function CourseExclusions({
  title = 'What This Course Is NOT',
  description = 'Please note: This is a philosophy course focused on the intellectual and spiritual understanding of Yoga Sutras.',
  points,
}: CourseExclusionsProps) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section ref={ref} className="yoga-section bg-gradient-to-b from-white to-[var(--yoga-bg)]">
      <div className="yoga-container">
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 md:p-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="yoga-heading-3 text-amber-900 mb-2">{title}</h2>
                <p className="text-amber-800">{description}</p>
              </div>
            </div>

            {/* Points */}
            <ul className="space-y-4">
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center mt-0.5">
                    <X className="w-4 h-4 text-amber-700" />
                  </div>
                  <span className="flex-1 text-amber-900 font-medium">{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-amber-200">
              <p className="text-sm text-amber-800 text-center">
                <strong>Focus:</strong> This course emphasizes philosophical understanding, meditation principles, 
                and spiritual wisdom from the Yoga Sutras — not physical yoga practice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

