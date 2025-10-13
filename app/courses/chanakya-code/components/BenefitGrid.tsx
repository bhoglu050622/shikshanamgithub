'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Hand, Crown, Users, Swords } from 'lucide-react';
import { chanakyaCodeCourseData } from '../courseData';

const iconMap: Record<string, any> = {
  'MessageSquare': MessageSquare,
  'Handshake': Hand,
  'Crown': Crown,
  'Users': Users,
  'Swords': Swords,
};

export default function BenefitGrid() {
  const benefits = chanakyaCodeCourseData.highlights;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAF7F2] to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B2B3A] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Master These Critical Skills
          </h2>
          <p className="text-lg text-[#6C6C6C]">
            Transform your career and life with Chanakya's proven strategic frameworks
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="chanakya-benefit-grid max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="chanakya-benefit-card group"
              >
                {/* Icon */}
                <div className="chanakya-benefit-icon">
                  {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#0B2B3A] mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-[#6C6C6C] leading-relaxed">
                  {benefit.description}
                </p>

                {/* CTA Button */}
                <div className="mt-4">
                  <a
                    href="#syllabus"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm"
                  >
                    <span>Learn This Skill</span>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

