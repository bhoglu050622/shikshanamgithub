'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Youtube, Linkedin, Twitter, Award } from 'lucide-react';
import { fadeInVariants, observerOptions } from '../../motion.config';
import { useState } from 'react';
import { CourseInstructor } from '../../../_shared/types/course.types';

interface InstructorCardProps {
  instructor?: CourseInstructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  const [ref, inView] = useInView(observerOptions);
  const [imageError, setImageError] = useState(false);

  if (!instructor) return null;

  return (
    <section className="py-20 px-4" style={{ background: 'var(--vaisheshik-bg-cream)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="vaisheshik-heading-devanagari text-3xl md:text-4xl mb-4">
            आचार्य परिचय
          </h2>
          <p className="vaisheshik-body-text text-lg">
            Learn from an Expert in Ancient Indian Philosophy
          </p>
        </div>

        {/* Instructor Card */}
        <motion.div
          ref={ref}
          className="vaisheshik-instructor-card"
          variants={fadeInVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Portrait */}
          <div className="flex flex-col items-center md:items-start">
            {!imageError && instructor.image ? (
              <img
                src={instructor.image}
                alt={instructor.name}
                className="vaisheshik-instructor-portrait"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="vaisheshik-instructor-portrait bg-gradient-to-br from-[var(--vaisheshik-primary-indigo)] to-[var(--vaisheshik-accent-saffron)] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            
            {/* Experience Badge */}
            {instructor.experience && (
              <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                <Award size={20} className="text-[var(--vaisheshik-accent-saffron)]" />
                <span className="text-sm font-medium text-[var(--vaisheshik-primary-indigo)]">
                  {instructor.experience}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-[var(--vaisheshik-primary-indigo)] mb-2">
              {instructor.name}
            </h3>
            <p className="text-lg text-[var(--vaisheshik-accent-saffron)] font-semibold mb-4">
              {instructor.title}
            </p>
            
            <p className="vaisheshik-body-text text-base leading-relaxed mb-6">
              {instructor.bio}
            </p>

            {/* Specializations */}
            {instructor.specialization && instructor.specialization.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--vaisheshik-primary-indigo)] mb-3">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialization.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white rounded-full text-sm font-medium text-[var(--vaisheshik-primary-indigo)] border border-[var(--vaisheshik-accent-saffron)]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {instructor.socialLinks && (instructor.socialLinks.youtube || instructor.socialLinks.linkedin || instructor.socialLinks.twitter) && (
              <div className="flex items-center gap-4 justify-center md:justify-start">
                {instructor.socialLinks.youtube && (
                  <a
                    href={instructor.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white hover:bg-[var(--vaisheshik-accent-saffron)] hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube size={20} />
                  </a>
                )}
                {instructor.socialLinks.linkedin && (
                  <a
                    href={instructor.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white hover:bg-[var(--vaisheshik-accent-saffron)] hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {instructor.socialLinks.twitter && (
                  <a
                    href={instructor.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white hover:bg-[var(--vaisheshik-accent-saffron)] hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

