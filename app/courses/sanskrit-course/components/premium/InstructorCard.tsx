'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useState } from 'react';

interface InstructorCardProps {
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  stats: { label: string; value: string }[];
  specialization: string[];
}

export default function InstructorCard({
  name,
  title,
  bio,
  photoUrl,
  stats,
  specialization
}: InstructorCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--bg-sanskrit)] to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-sanskrit)]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary-sanskrit)] mb-4"
            >
              Meet Your Instructor
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[var(--text-secondary-sanskrit)] text-center"
            >
              Learn from a traditionally trained Sanskrit Acharya
            </motion.p>
          </div>

          {/* Instructor Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-sanskrit-premium p-8 md:p-12"
          >
            <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-start">
              
              {/* Photo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mx-auto md:mx-0"
              >
                <div className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-[var(--gold-sanskrit)]/30 ring-offset-4">
                  <Image
                    src={photoUrl}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="sanskrit-heading-primary text-2xl md:text-3xl text-[var(--text-primary-sanskrit)] mb-2">
                    {name}
                  </h3>
                  <p className="text-lg text-[var(--accent-sanskrit)] font-medium">{title}</p>
                </div>

                {/* Stats Chips */}
                <div className="flex flex-wrap gap-3">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-[var(--accent-sanskrit)]/10 rounded-full"
                    >
                      <span className="text-sm font-semibold text-[var(--accent-sanskrit)]">
                        {stat.value}
                      </span>
                      <span className="text-sm text-[var(--text-muted-sanskrit)] ml-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-[var(--text-secondary-sanskrit)] leading-relaxed">
                    {showFullBio ? bio : `${bio.slice(0, 200)}...`}
                  </p>
                  {bio.length > 200 && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="btn-instructor-readmore mt-2 focus-sanskrit"
                    >
                      {showFullBio ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <h4 className="font-semibold text-[var(--text-primary-sanskrit)] mb-3">
                    Areas of Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {specialization.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--gold-sanskrit)]/10 border border-[var(--gold-sanskrit)]/30 rounded-lg text-sm text-[var(--text-primary-sanskrit)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-[var(--text-muted-sanskrit)] text-sm">
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--gold-sanskrit)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Trusted by 10,000+ students nationwide
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

