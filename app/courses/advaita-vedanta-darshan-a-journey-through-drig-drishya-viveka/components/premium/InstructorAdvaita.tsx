'use client';

import { motion } from 'framer-motion';
import { Award, Youtube, Linkedin, Twitter } from 'lucide-react';
import { advaitaVedantaCourseData } from '../../courseData';
import { fadeInVariants, safeVariants } from '../../motion.config';
import Image from 'next/image';

export default function InstructorAdvaita() {
  const { instructor } = advaitaVedantaCourseData;

  return (
    <section className="advaita-instructor-section">
      <div className="advaita-section-header text-center">
        <h2 style={{ fontFamily: 'var(--font-devanagari)' }}>आचार्य परिचय</h2>
        <p>Learn from a Master of Advaita Vedanta</p>
      </div>

      <motion.div
        className="advaita-instructor-card"
        variants={safeVariants(fadeInVariants)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Portrait */}
        <div className="advaita-instructor-portrait">
          <Image
            src="https://shikshanam.in/wp-content/uploads/2024/05/1.png"
            alt={instructor?.name || 'Vishal Chaurasia'}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x600/0D3B4A/FFFFFF?text=Vishal+Chaurasia';
            }}
          />
        </div>

        {/* Info */}
        <div className="advaita-instructor-info">
          <h3>{instructor?.name}</h3>
          <p className="advaita-instructor-title">{instructor?.title}</p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            {instructor?.bio}
          </p>

          {/* Experience Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D97B2A] text-white rounded-full mb-4">
            <Award className="w-5 h-5" />
            <span className="font-semibold text-sm">{instructor?.experience}</span>
          </div>

          {/* Specializations */}
          {instructor?.specialization && instructor.specialization.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-[#0D3B4A] mb-2 uppercase tracking-wide">
                Specializations
              </h4>
              <div className="advaita-instructor-specializations">
                {instructor.specialization.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Featured In Section (Placeholder) */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <h4 className="text-sm font-semibold text-[#0D3B4A] mb-3 uppercase tracking-wide">
              Featured In
            </h4>
            <div className="flex flex-wrap gap-4 items-center opacity-60">
              <div className="px-4 py-2 bg-gray-100 rounded text-xs font-medium">
                Educational Platform Logos
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded text-xs font-medium">
                Media Mentions
              </div>
            </div>
          </div>

          {/* Social Links (Placeholder) */}
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#D97B2A] text-white flex items-center justify-center hover:bg-[#E89B5A] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#D97B2A] text-white flex items-center justify-center hover:bg-[#E89B5A] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#D97B2A] text-white flex items-center justify-center hover:bg-[#E89B5A] transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


