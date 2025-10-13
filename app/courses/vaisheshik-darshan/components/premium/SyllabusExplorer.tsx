'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Download, Play, Lock } from 'lucide-react';
import { syllabusCardVariants, observerOptions } from '../../motion.config';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { CourseSyllabus } from '../../../_shared/types/course.types';

interface SyllabusExplorerProps {
  syllabus: CourseSyllabus[];
  onPreviewClick?: (index: number) => void;
}

export default function SyllabusExplorer({ syllabus, onPreviewClick }: SyllabusExplorerProps) {
  const [ref, inView] = useInView(observerOptions);

  return (
    <section className="py-20 px-4" style={{ background: 'linear-gradient(to bottom, var(--vaisheshik-bg-cream), var(--vaisheshik-cream-light))' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
            Complete Course Curriculum
          </h2>
          <p className="vaisheshik-body-text text-lg">
            Systematic journey through all {syllabus.length} chapters of Vaisheshik Sutras
          </p>
        </div>

        {/* Desktop: Grid View */}
        <div className="hidden md:block" ref={ref}>
          <div className="vaisheshik-syllabus-grid">
            {syllabus.map((item, index) => (
              <motion.div
                key={index}
                className="vaisheshik-syllabus-card"
                custom={index}
                variants={syllabusCardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <div className="vaisheshik-syllabus-card-header">
                  <div className="vaisheshik-syllabus-card-number">
                    {index === 0 ? 'Demo' : index}
                  </div>
                  {item.duration && (
                    <div className="flex items-center gap-2 vaisheshik-syllabus-card-duration">
                      <Clock size={16} />
                      {item.duration}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[var(--vaisheshik-primary-indigo)] mb-2">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="vaisheshik-heading-devanagari text-sm mb-3">
                    {item.subtitle}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm text-[var(--vaisheshik-muted-gray)] mb-4">
                    {item.description}
                  </p>
                )}

                <ul className="space-y-2 mb-4">
                  {item.topics.slice(0, 3).map((topic, idx) => (
                    <li key={idx} className="text-sm text-[var(--vaisheshik-muted-gray)] flex items-start">
                      <span className="text-[var(--vaisheshik-accent-saffron)] mr-2">•</span>
                      {topic}
                    </li>
                  ))}
                  {item.topics.length > 3 && (
                    <li className="text-sm text-[var(--vaisheshik-accent-saffron)] font-medium">
                      +{item.topics.length - 3} more topics
                    </li>
                  )}
                </ul>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-200">
                  {item.isFree && (
                    <button
                      onClick={() => onPreviewClick?.(index)}
                      className="flex items-center gap-2 text-sm font-medium text-[var(--vaisheshik-accent-saffron)] hover:underline"
                    >
                      <Play size={16} />
                      Watch Free
                    </button>
                  )}
                  {!item.isFree && (
                    <span className="flex items-center gap-2 text-sm text-[var(--vaisheshik-muted-gray)]">
                      <Lock size={16} />
                      Premium Content
                    </span>
                  )}
                  <button className="ml-auto flex items-center gap-2 text-sm text-[var(--vaisheshik-muted-gray)] hover:text-[var(--vaisheshik-primary-indigo)]">
                    <Download size={16} />
                    Notes
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: Accordion View */}
        <div className="md:hidden">
          <Accordion.Root type="multiple" className="space-y-3">
            {syllabus.map((item, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="vaisheshik-faq-item"
              >
                <Accordion.Trigger className="vaisheshik-faq-trigger group">
                  <div className="flex items-center gap-3 flex-1 text-left">
                    <div className="vaisheshik-syllabus-card-number text-sm w-10 h-10">
                      {index === 0 ? 'Demo' : index}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-base">{item.title}</div>
                      {item.isFree && (
                        <span className="text-xs text-[var(--vaisheshik-accent-saffron)]">Free Demo</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" size={20} />
                </Accordion.Trigger>

                <Accordion.Content className="vaisheshik-faq-content">
                  {item.subtitle && (
                    <p className="vaisheshik-heading-devanagari text-sm mb-2">
                      {item.subtitle}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm mb-3">{item.description}</p>
                  )}
                  <ul className="space-y-1 mb-3">
                    {item.topics.map((topic, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span className="text-[var(--vaisheshik-accent-saffron)] mr-2">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 text-sm">
                    {item.duration && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {item.duration}
                      </span>
                    )}
                    {item.isFree && (
                      <button
                        onClick={() => onPreviewClick?.(index)}
                        className="flex items-center gap-1 text-[var(--vaisheshik-accent-saffron)] font-medium"
                      >
                        <Play size={14} />
                        Watch Free
                      </button>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}

