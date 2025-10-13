'use client';

import { motion } from 'framer-motion';
import { Linkedin, Twitter, Youtube } from 'lucide-react';
import { ishaUpanishadCourseData } from '../../courseData';
import { fadeInUpVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';
import Image from 'next/image';

export default function InstructorCard() {
  const { instructor } = ishaUpanishadCourseData;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-[#FFF9F2]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="isha-section-header"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="isha-section-subtitle">Learn from the Best</p>
          <h2 className="isha-section-title">आचार्य परिचय</h2>
          <p className="isha-section-description">
            Master of Indian Philosophy with Modern Perspective
          </p>
        </motion.div>

        {/* Instructor Card */}
        <motion.div
          ref={ref}
          className="isha-instructor-card"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="isha-instructor-grid">
            {/* Portrait */}
            <div className="isha-instructor-portrait">
              <Image
                src={vishalChaurasiaData.image || 'https://placehold.co/400x400/0D3B4A/FFF9F2?text=Vishal+Chaurasia'}
                alt={instructor?.name || 'Instructor'}
                width={200}
                height={200}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/400x400/0D3B4A/FFF9F2?text=Vishal+Chaurasia';
                }}
              />
            </div>

            {/* Info */}
            <div>
              <h3 className="isha-instructor-name">{instructor?.name}</h3>
              <p className="isha-instructor-title">{instructor?.title}</p>
              <p className="text-gray-700 leading-relaxed mb-4">{instructor?.bio}</p>
              
              {/* Specializations */}
              {instructor?.specialization && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#0D3B4A] mb-2 uppercase tracking-wide">
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialization.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#D97B2A]/10 text-[#D97B2A] text-sm rounded-full border border-[#D97B2A]/30 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="isha-social-links">
                <a
                  href="https://www.youtube.com/@shikshanam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isha-social-link"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/shikshanam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isha-social-link"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/shikshanam_in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="isha-social-link"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>

              {/* Experience Badge */}
              {instructor?.experience && (
                <div className="mt-4 inline-block px-4 py-2 bg-[#0D3B4A] text-white rounded-lg text-sm font-medium">
                  {instructor.experience}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

