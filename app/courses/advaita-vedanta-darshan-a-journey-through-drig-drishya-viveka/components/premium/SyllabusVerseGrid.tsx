'use client';

import { motion } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { Clock, ChevronDown, BookOpen } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D97B2A] text-white rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            Complete Curriculum
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
            Complete Course Syllabus
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All 46 Shlokas — Systematic journey through Drig Drishya Viveka with detailed verse-by-verse analysis
          </p>
          
          {/* Course Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0D3B4A]">46</div>
              <div className="text-sm text-gray-600">Shlokas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0D3B4A]">7+</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0D3B4A]">6</div>
              <div className="text-sm text-gray-600">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0D3B4A]">51</div>
              <div className="text-sm text-gray-600">Lectures</div>
            </div>
          </div>
        </div>

        {/* Desktop: Enhanced Grid View */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 hidden md:grid"
          variants={safeVariants(syllabusGridVariants)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {syllabus.map((module, index) => (
            <motion.div
              key={index}
              className="group relative bg-white border-2 border-[#0D3B4A] rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              variants={syllabusCardVariants}
            >
              {/* Module Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#D97B2A] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4">
                  <h3 className="text-xl font-bold text-[#0D3B4A] mb-1 group-hover:text-[#D97B2A] transition-colors">
                    {module.title}
                  </h3>
                  <h4 className="text-sm text-[#D97B2A] font-medium italic mb-2">
                    {module.subtitle}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{module.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0D3B4A] to-[#D97B2A] rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {module.description}
              </p>
              
              {/* Topics List */}
              <div className="space-y-2">
                <h5 className="text-xs font-semibold text-[#0D3B4A] uppercase tracking-wide mb-2">
                  Topics Covered
                </h5>
                <ul className="space-y-1">
                  {module.topics.slice(0, 4).map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-2 text-xs text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#D97B2A] rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{topic}</span>
                    </li>
                  ))}
                  {module.topics.length > 4 && (
                    <li className="text-xs text-[#D97B2A] font-medium ml-3.5">
                      +{module.topics.length - 4} more topics
                    </li>
                  )}
                </ul>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(((index + 1) / syllabus.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-[#0D3B4A] to-[#D97B2A] h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${((index + 1) / syllabus.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Enhanced Accordion View */}
        <Accordion.Root 
          type="multiple" 
          className="md:hidden max-w-4xl mx-auto space-y-4"
          defaultValue={['item-0']}
        >
          {syllabus.map((module, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-white border-2 border-[#0D3B4A] rounded-2xl overflow-hidden shadow-lg"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full p-4 hover:bg-[#FFF9F2] transition-colors group">
                  <div className="flex items-center gap-4">
                    {/* Module Number */}
                    <div className="w-10 h-10 bg-[#D97B2A] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-[#0D3B4A] text-lg group-hover:text-[#D97B2A] transition-colors">
                        {module.title}
                      </h3>
                      <h4 className="text-sm text-[#D97B2A] font-medium italic mb-1">
                        {module.subtitle}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                    
                    {/* Chevron */}
                    <ChevronDown className="w-5 h-5 text-[#0D3B4A] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="p-4 pt-0">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-[#0D3B4A] uppercase tracking-wide">
                      Topics Covered
                    </h5>
                    <ul className="space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start gap-3 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-[#D97B2A] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}


