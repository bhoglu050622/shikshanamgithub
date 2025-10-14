'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Module {
  title: string;
  subtitle?: string;
  duration?: string;
  topics: string[];
  description?: string;
}

interface ModuleCardProps {
  modules: Module[];
  syllabusVideoUrl?: string;
}

export default function ModuleCard({ modules, syllabusVideoUrl }: ModuleCardProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="syllabus" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 devanagari-bg" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary-sanskrit)] mb-4">
            Complete Curriculum
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary-sanskrit)] max-w-3xl mx-auto text-center">
            Systematic Learning Path — Master Sanskrit from Devanagari script to reading Bhagavad Gita
          </p>
          
          {/* Syllabus Video Preview */}
          {syllabusVideoUrl && (
            <div className="mt-8">
              <a
                href={syllabusVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors focus-sanskrit [&_svg]:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Watch Syllabus Overview
              </a>
            </div>
          )}
        </motion.div>

        {/* Modules Grid/Accordion */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-sanskrit-premium p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[var(--gold-sanskrit)] mb-2">
                        Module {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-primary-sanskrit)] mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm text-[var(--accent-sanskrit)] font-medium">
                        {module.subtitle}
                      </p>
                    </div>
                    {module.duration && (
                      <span className="px-3 py-1 bg-[var(--accent-sanskrit)]/10 rounded-full text-sm font-semibold text-[var(--accent-sanskrit)] whitespace-nowrap ml-4">
                        {module.duration}
                      </span>
                    )}
                  </div>

                  <p className="text-[var(--text-secondary-sanskrit)] mb-4 flex-1">
                    {module.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--text-primary-sanskrit)]">
                      Topics Covered:
                    </p>
                    <ul className="space-y-1">
                      {module.topics.slice(0, 3).map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary-sanskrit)]">
                          <svg className="w-4 h-4 text-[var(--gold-sanskrit)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {topic}
                        </li>
                      ))}
                      {module.topics.length > 3 && (
                        <li className="text-sm text-[var(--text-muted-sanskrit)] ml-6">
                          +{module.topics.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden space-y-4">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full card-sanskrit-premium p-4 text-left focus-sanskrit"
                  aria-expanded={expandedIndex === index}
                  aria-controls={`module-content-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-[var(--gold-sanskrit)] mb-1">
                        Module {index + 1}
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text-primary-sanskrit)] mb-1">
                        {module.title}
                      </h3>
                      <p className="text-sm text-[var(--accent-sanskrit)]">
                        {module.subtitle}
                      </p>
                      {module.duration && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-[var(--accent-sanskrit)]/10 rounded-full text-[var(--accent-sanskrit)] font-semibold">
                          {module.duration}
                        </span>
                      )}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4"
                    >
                      <svg className="w-6 h-6 text-[var(--accent-sanskrit)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      id={`module-content-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2 space-y-3">
                        <p className="text-sm text-[var(--text-secondary-sanskrit)]">
                          {module.description}
                        </p>
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary-sanskrit)] mb-2">
                            Topics Covered:
                          </p>
                          <ul className="space-y-1">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-2 text-sm text-[var(--text-secondary-sanskrit)]">
                                <svg className="w-4 h-4 text-[var(--gold-sanskrit)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

