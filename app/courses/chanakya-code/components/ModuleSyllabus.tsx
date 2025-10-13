'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, FileText, Info } from 'lucide-react';
import { chanakyaCodeCourseData } from '../courseData';

export default function ModuleSyllabus() {
  const [openModule, setOpenModule] = useState<number | null>(0); // First module open by default
  const syllabus = chanakyaCodeCourseData.syllabus;

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <section id="syllabus" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#FAF7F2]">
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
            10 Secret Chanakya Codes
          </h2>
          <p className="text-lg text-[#6C6C6C]">
            Ancient strategies for modern success - Each code unlocks powerful skills
          </p>
        </motion.div>

        {/* Syllabus Accordion */}
        <div className="max-w-5xl mx-auto space-y-4">
          {syllabus.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="chanakya-module-card"
            >
              {/* Module Header */}
              <button
                onClick={() => toggleModule(index)}
                className="w-full flex items-center justify-between gap-4 text-left"
                aria-expanded={openModule === index}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0B2B3A] to-[#D87A2B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-[#0B2B3A]">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Sanskrit Subtitle with Tooltip */}
                  <div className="flex items-center gap-2 ml-13">
                    <p className="text-[#D87A2B] font-semibold" style={{ fontFamily: 'var(--font-devanagari)' }}>
                      {module.subtitle?.split('(')[0].trim()}
                    </p>
                    
                    {/* Transliteration Tooltip */}
                    {module.subtitle?.includes('(') && (
                      <div className="chanakya-tooltip">
                        <Info className="w-4 h-4 text-[#6C6C6C] cursor-help" />
                        <div className="chanakya-tooltip-content">
                          {module.subtitle.match(/\((.*?)\)/)?.[1]}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-[#6C6C6C] ml-13">
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {module.duration}
                    </span>
                    {module.caseStudy && (
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Case Study
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {openModule === index ? (
                    <ChevronUp className="w-6 h-6 text-[#D87A2B]" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[#6C6C6C]" />
                  )}
                </div>
              </button>

              {/* Module Content */}
              <AnimatePresence>
                {openModule === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-gray-200 ml-13">
                      {/* Description */}
                      <p className="text-[#0B2B3A] font-medium mb-4">
                        {module.description}
                      </p>

                      {/* Topics List */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-[#0B2B3A] uppercase tracking-wide mb-3">
                          What You'll Learn
                        </h4>
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-[#D87A2B] rounded-full mt-2 flex-shrink-0" />
                              <span className="text-[#6C6C6C]">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Case Study */}
                      {module.caseStudy && (
                        <div className="bg-gradient-to-br from-[#D87A2B]/5 to-[#0B2B3A]/5 rounded-xl p-4">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-[#D87A2B] flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-[#0B2B3A] mb-1">
                                Real-World Case Study
                              </h4>
                              <p className="text-sm text-[#6C6C6C]">
                                {module.caseStudy}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[#6C6C6C] mb-4">
            Ready to unlock all 10 Secret Codes?
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span>Start Learning Now</span>
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

