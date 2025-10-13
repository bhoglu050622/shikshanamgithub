'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { ishaUpanishadCourseData } from '../../courseData';
import { fadeInUpVariants, cardRevealVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

export default function SyllabusGrid() {
  const { syllabus } = ishaUpanishadCourseData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05
  });

  return (
    <section className="isha-syllabus-section">
      <div className="isha-demo-container">
        {/* Section Header */}
        <motion.div 
          className="isha-section-header"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="isha-section-subtitle">Complete Curriculum</p>
          <h2 className="isha-section-title">Journey Through 18 Mantras</h2>
          <p className="isha-section-description">
            Systematic exploration of Isha Upanishad from introduction to final wisdom
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <motion.div
          ref={ref}
          className="hidden md:grid isha-syllabus-grid"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {syllabus.map((module, index) => (
            <motion.div
              key={index}
              className="isha-module-card"
              variants={cardRevealVariants}
            >
              <div className="isha-module-header">
                <div>
                  <p className="isha-module-number">Module {index + 1}</p>
                  <h3 className="isha-module-title">{module.title}</h3>
                  <p className="isha-module-subtitle">{module.subtitle}</p>
                </div>
                <div className="isha-module-duration">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {module.duration}
                </div>
              </div>
              <ul className="isha-module-topics">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Accordion View */}
        <Accordion.Root
          type="multiple"
          defaultValue={['0']}
          className="md:hidden mt-6 space-y-4"
        >
          {syllabus.map((module, index) => (
            <Accordion.Item
              key={index}
              value={index.toString()}
              className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-transparent hover:border-[#D97B2A] transition-colors"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center group">
                  <div className="text-left flex-1">
                    <p className="isha-module-number">Module {index + 1}</p>
                    <h3 className="isha-module-title text-base">{module.title}</h3>
                    <p className="isha-module-subtitle">{module.subtitle}</p>
                    <div className="mt-2 text-sm text-[#D97B2A] font-medium">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {module.duration}
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-[#0D3B4A] transition-transform group-data-[state=open]:rotate-180 ml-4 flex-shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="px-6 pb-4">
                  <ul className="isha-module-topics">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

