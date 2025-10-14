'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { nyayaDarshanCourseData } from '../../courseData';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';
import { cardRevealVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';

export default function InstructorCard() {
  const { instructor } = nyayaDarshanCourseData;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (!instructor) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-bold text-[#0D3B4A] mb-4"
            style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
          >
            आचार्य परिचय
          </h2>
          <p className="text-xl text-gray-600 text-center">Learn from a Master of Logic</p>
        </div>

        {/* Instructor Card */}
        <motion.div
          ref={ref}
          className="nyaya-instructor-card max-w-5xl mx-auto"
          variants={safeVariants(cardRevealVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Instructor Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <Image
                src={vishalChaurasiaData.image || 'https://placehold.co/400x400/0D3B4A/FFFFFF?text=Vishal+Chaurasia'}
                alt={instructor.name}
                fill
                className="nyaya-instructor-image object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/400x400/0D3B4A/FFFFFF?text=Vishal+Chaurasia';
                }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Instructor Details */}
          <div>
            <h3 className="nyaya-instructor-name">{instructor.name}</h3>
            <p className="nyaya-instructor-title">{instructor.title}</p>
            <p className="nyaya-instructor-bio">{instructor.bio}</p>

            {/* Specializations */}
            {instructor.specialization && (
              <div>
                <p className="text-sm font-semibold text-[#0D3B4A] mb-2">Expertise:</p>
                <div className="nyaya-instructor-skills">
                  {instructor.specialization.map((skill, index) => (
                    <span key={index} className="nyaya-skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured In / Social Links - Placeholder */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {instructor.experience}
              </p>
              {/* TODO: Add featured-in logos and social links */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

