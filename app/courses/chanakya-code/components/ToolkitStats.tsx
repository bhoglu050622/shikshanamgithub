'use client';

import { motion } from 'framer-motion';
import { Clock, BookOpen, FileText, Calendar, MessageCircle, Award, GraduationCap } from 'lucide-react';
import { chanakyaCodeCourseData } from '../courseData';

const statsConfig = [
  {
    icon: Clock,
    value: '6+',
    label: 'Hours Content',
    description: 'In-depth video lessons'
  },
  {
    icon: BookOpen,
    value: '20',
    label: 'Lessons',
    description: '10 Secret Codes explained'
  },
  {
    icon: FileText,
    value: '10+',
    label: 'Worksheets',
    description: 'Practical implementation tools'
  },
  {
    icon: Calendar,
    value: '1 Year',
    label: 'Access',
    description: 'Learn at your pace'
  },
  {
    icon: MessageCircle,
    value: 'WhatsApp',
    label: 'Community',
    description: 'Network & support'
  },
  {
    icon: Award,
    value: 'Certificate',
    label: 'On Completion',
    description: 'Boost your profile'
  },
  {
    icon: GraduationCap,
    value: 'Expert',
    label: 'Instructors',
    description: 'Industry veterans'
  }
];

export default function ToolkitStats() {
  const courseData = chanakyaCodeCourseData;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B2B3A] via-[#1a3a4a] to-[#0B2B3A]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Your Complete Toolkit
          </h2>
          <p className="text-lg text-white/80">
            Everything you need to master Chanakya's strategic wisdom
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {statsConfig.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="chanakya-stat-item group"
              >
                {/* Icon */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                    <IconComponent className="w-8 h-8 text-[#D87A2B]" />
                  </div>
                </div>

                {/* Value */}
                <div className="chanakya-stat-number mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-white font-semibold mb-1">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm text-white/60">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white">
            <Award className="w-5 h-5 text-[#D87A2B]" />
            <span className="font-semibold">{courseData.stats?.students} Students Already Enrolled</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

