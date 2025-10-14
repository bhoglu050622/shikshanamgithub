'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Clock, Video } from 'lucide-react';
import { nyayaDarshanCourseData } from '../../courseData';
import { moduleCardVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';

export default function SyllabusExplorer() {
  const { syllabus } = nyayaDarshanCourseData;
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-[#FFF9F2]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3B4A] mb-4">
            Complete Course Curriculum
          </h2>
          <p className="text-xl text-gray-600 text-center">
            Systematic learning path through Nyaya Sutras
          </p>
        </div>

        {/* Desktop: Grid View */}
        <div ref={ref} className="hidden md:grid nyaya-syllabus-grid">
          {syllabus.map((module, index) => (
            <motion.div
              key={index}
              className="nyaya-module-card"
              custom={index}
              variants={safeVariants(moduleCardVariants)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="nyaya-module-header">
                <h3 className="nyaya-module-title">{module.title}</h3>
                <p className="text-sm text-[#D97B2A] font-semibold mb-2">{module.subtitle}</p>
                <div className="nyaya-module-meta">
                  {module.videoCount && (
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      {module.videoCount} videos
                    </span>
                  )}
                  {module.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </span>
                  )}
                </div>
              </div>

              <ul className="nyaya-module-topics">
                {module.topics.slice(0, 4).map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
                {module.topics.length > 4 && (
                  <li className="text-[#D97B2A] font-semibold">
                    +{module.topics.length - 4} more topics
                  </li>
                )}
              </ul>

              {index === 0 && (
                <button className="w-full py-2 px-4 bg-[#D97B2A] text-white font-semibold rounded-lg hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Preview Demo (Free)
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: Accordion View */}
        <div className="md:hidden space-y-4">
          {syllabus.map((module, index) => (
            <div key={index} className="nyaya-module-card">
              <button
                onClick={() => toggleModule(index)}
                className="w-full text-left"
                aria-expanded={expandedModule === index}
                aria-controls={`module-content-${index}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#0D3B4A] mb-1">
                      {module.title}
                    </h3>
                    <p className="text-sm text-[#D97B2A] font-semibold mb-2">{module.subtitle}</p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      {module.videoCount && (
                        <span className="flex items-center gap-1">
                          <Video className="w-4 h-4" />
                          {module.videoCount}
                        </span>
                      )}
                      {module.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-[#D97B2A] transition-transform ${
                      expandedModule === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {expandedModule === index && (
                <div
                  id={`module-content-${index}`}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <ul className="nyaya-module-topics">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">{module.description}</p>
                  
                  {index === 0 && (
                    <button className="w-full mt-4 py-2 px-4 bg-[#D97B2A] text-white font-semibold rounded-lg hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Preview Demo (Free)
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

