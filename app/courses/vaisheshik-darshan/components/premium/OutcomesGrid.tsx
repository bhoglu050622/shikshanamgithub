'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Atom, Brain, BookMarked, Lightbulb, GraduationCap } from 'lucide-react';
import { chipContainerVariants, chipVariants, observerOptions } from '../../motion.config';
import { CourseOutcome } from '../../../_shared/types/course.types';

interface OutcomesGridProps {
  outcomes: CourseOutcome[];
}

const outcomeIcons = [Target, Atom, Brain, BookMarked, Lightbulb, GraduationCap];

export default function OutcomesGrid({ outcomes }: OutcomesGridProps) {
  const [ref, inView] = useInView(observerOptions);

  return (
    <section className="py-20 px-4" style={{ background: 'white' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
            What You'll Master
          </h2>
          <p className="vaisheshik-body-text text-lg">
            Transform your understanding of reality through Vaisheshik wisdom
          </p>
        </div>

        {/* Outcomes Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={chipContainerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {outcomes.map((outcome, index) => {
            const IconComponent = outcomeIcons[index % outcomeIcons.length];

            return (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[var(--vaisheshik-cream-light)] to-white rounded-2xl p-6 border-2 border-transparent hover:border-[var(--vaisheshik-accent-saffron)] transition-all duration-300 shadow-sm hover:shadow-md"
                variants={chipVariants}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--vaisheshik-accent-saffron)] to-[var(--vaisheshik-saffron-light)] flex items-center justify-center mb-4">
                  <IconComponent size={28} color="white" />
                </div>

                <h3 className="text-xl font-bold text-[var(--vaisheshik-primary-indigo)] mb-3">
                  {outcome.title}
                </h3>

                <p className="vaisheshik-body-text text-sm leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

