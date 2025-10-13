'use client';

import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { Clock, ChevronDown } from 'lucide-react';
import { advaitaVedantaCourseData } from '../../courseData';
import { syllabusGridVariants, syllabusCardVariants, safeVariants } from '../../motion.config';
import { useState } from 'react';

export default function SyllabusVerseGrid() {
  const { syllabus } = advaitaVedantaCourseData;
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <section className="advaita-syllabus-section">
      <div className="advaita-section-header">
        <h2>Complete Course Syllabus</h2>
        <p>All 46 Shlokas — Systematic journey through Drig Drishya Viveka with detailed verse-by-verse analysis</p>
      </div>

      {/* Desktop: Grid View */}
      <motion.div 
        className="advaita-syllabus-grid hidden md:grid"
        variants={safeVariants(syllabusGridVariants)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {syllabus.map((module, index) => (
          <motion.div
            key={index}
            className="advaita-syllabus-card"
            variants={syllabusCardVariants}
          >
            <div className="advaita-syllabus-card-header">
              <div>
                <h3>{module.title}</h3>
                <h4>{module.subtitle}</h4>
              </div>
              <div className="advaita-syllabus-duration">
                <Clock className="w-4 h-4" />
                {module.duration}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            
            <ul className="advaita-syllabus-topics">
              {module.topics.map((topic, topicIndex) => (
                <li key={topicIndex}>{topic}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: Accordion View */}
      <Accordion.Root 
        type="multiple" 
        className="md:hidden max-w-2xl mx-auto"
        defaultValue={['item-0']}
      >
        {syllabus.map((module, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="advaita-syllabus-card mb-4"
          >
            <Accordion.Header>
              <Accordion.Trigger className="w-full">
                <div className="advaita-syllabus-card-header w-full">
                  <div className="text-left flex-1">
                    <h3>{module.title}</h3>
                    <h4>{module.subtitle}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="advaita-syllabus-duration">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </div>
                    <ChevronDown className="w-5 h-5 text-[#0D3B4A] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </div>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <p className="text-sm text-gray-600 mb-3">{module.description}</p>
              
              <ul className="advaita-syllabus-topics">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
              </ul>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}


