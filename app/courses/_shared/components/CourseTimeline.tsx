'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TimelineItem {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
}

interface CourseTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export default function CourseTimeline({ items, className = '' }: CourseTimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6"
              suppressHydrationWarning
            >
              {/* Timeline Dot */}
              <div className="relative flex-shrink-0 hidden md:block">
                <div className="w-12 h-12 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-md z-10 relative">
                  {Icon ? (
                    <Icon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 course-card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    {item.subtitle && (
                      <p className="course-body-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">
                        {item.subtitle}
                      </p>
                    )}
                    <h3 className="course-heading-3 text-gray-900">
                      {item.title}
                    </h3>
                  </div>
                  {item.badge && (
                    <span className="course-badge course-badge-primary flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="course-body text-gray-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

