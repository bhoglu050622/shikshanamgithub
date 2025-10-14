'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion/MotionWrapper';
import { ChevronDown, Clock, List, Play, Bell } from 'lucide-react';
import { prashnaUpanishadCourseData } from '../../courseData';
import { moduleVariants, accordionVariants, safeVariants } from '../../motion.config';

export default function SyllabusGrid() {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const { syllabus } = prashnaUpanishadCourseData;

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const handleNotifyMe = (moduleTitle: string) => {
    // Placeholder for notify me functionality
    alert(`You'll be notified when ${moduleTitle} is available!`);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
            Complete Course Syllabus
          </h2>
          <p className="text-lg text-gray-600">
            Systematic exploration of all six Prashnas with detailed topics
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:block prashna-syllabus-grid">
          {syllabus.map((module, index) => {
            const isFree = module.isFree;

            return (
              <MotionDiv
                key={index}
                className="prashna-module-card"
                variants={safeVariants(moduleVariants)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="prashna-module-header">
                  <div className="flex-1">
                    <h3 className="prashna-module-title">{module.title}</h3>
                    <p className="prashna-module-subtitle">{module.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isFree && (
                      <span className="prashna-demo-badge">Free Demo</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <List className="w-4 h-4" />
                    <span>{module.topics.length} topics</span>
                  </div>
                </div>

                {module.description && (
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#0D3B4A] mb-2">Topics Covered:</p>
                  <ul className="space-y-1">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-[#D97B2A] mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isFree && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#10B981] font-semibold">
                  <Play className="w-4 h-4" />
                  <span>Watch this demo for free!</span>
                </div>
              )}
            </MotionDiv>
            );
          })}
        </div>

        {/* Mobile/Tablet: Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {syllabus.map((module, index) => {
            const isExpanded = expandedModule === index;
            const isFree = module.isFree;

            return (
              <div key={index} className="prashna-faq-item">
                <button
                  onClick={() => toggleModule(index)}
                  className="prashna-faq-button"
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[#0D3B4A]">{module.title}</h3>
                      {isFree && (
                        <span className="prashna-demo-badge text-xs">Free Demo</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{module.subtitle}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <List className="w-3 h-3" />
                        {module.topics.length} topics
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <MotionDiv
                      variants={safeVariants(accordionVariants)}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="prashna-faq-content">
                        {module.description && (
                          <p className="text-sm mb-4 text-gray-600">{module.description}</p>
                        )}
                        
                        <p className="text-sm font-semibold text-[#0D3B4A] mb-2">Topics Covered:</p>
                        <ul className="space-y-2 mb-4">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-[#D97B2A] mt-1">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>

                        {isFree && (
                          <div className="flex items-center gap-2 text-sm text-[#10B981] font-semibold">
                            <Play className="w-4 h-4" />
                            <span>Watch this demo for free!</span>
                          </div>
                        )}
                      </div>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

