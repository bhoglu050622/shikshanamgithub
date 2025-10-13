'use client';

import { motion } from 'framer-motion';
import { Award, GraduationCap, Star } from 'lucide-react';
import Image from 'next/image';
import { CourseInstructor } from '../types/course.types';
import { CourseSectionHeader, CourseCard } from '../components';

interface InstructorTemplateProps {
  instructor: CourseInstructor;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function InstructorTemplate({
  instructor,
  title = 'Meet Your Instructor',
  subtitle = 'Learn from the Expert',
  className = '',
}: InstructorTemplateProps) {
  return (
    <section className={`course-section ${className}`}>
      <div className="course-container">
        <CourseSectionHeader
          subtitle={subtitle}
          title={title}
          centered={true}
        />

        <div className="max-w-4xl mx-auto">
          <CourseCard variant="premium">
            <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
              {/* Instructor Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--theme-primary-100)] to-[var(--theme-secondary-100)]">
                      <GraduationCap className="w-24 h-24 text-[var(--theme-primary-600)]" />
                    </div>
                  )}
                </div>
                {/* Credentials Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-max">
                  <div className="course-badge course-badge-primary flex items-center gap-2 shadow-lg">
                    <Award className="w-4 h-4" />
                    <span className="font-bold">{instructor.title}</span>
                  </div>
                </div>
              </motion.div>

              {/* Instructor Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="course-heading-2 text-gray-900 mb-2">
                    {instructor.name}
                  </h3>
                  <p className="course-body-lg text-[var(--theme-primary-600)] font-semibold">
                    {instructor.title}
                  </p>
                </div>

                <p className="course-body-lg text-gray-700 leading-relaxed">
                  {instructor.bio}
                </p>

                {instructor.experience && (
                  <div className="flex items-start gap-3 bg-[var(--theme-primary-50)] p-4 rounded-lg">
                    <Star className="w-5 h-5 text-[var(--theme-primary-600)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="course-body-sm font-semibold text-gray-900 mb-1">
                        Experience
                      </p>
                      <p className="course-body text-gray-700">
                        {instructor.experience}
                      </p>
                    </div>
                  </div>
                )}

                {instructor.credentials && instructor.credentials.length > 0 && (
                  <div>
                    <p className="course-heading-4 text-gray-900 mb-3">
                      Credentials & Qualifications
                    </p>
                    <ul className="space-y-2">
                      {instructor.credentials.map((credential, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary-600)] flex-shrink-0 mt-2" />
                          <span className="course-body text-gray-700">{credential}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {instructor.specialization && instructor.specialization.length > 0 && (
                  <div>
                    <p className="course-heading-4 text-gray-900 mb-3">
                      Areas of Specialization
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialization.map((area, index) => (
                        <span key={index} className="course-badge course-badge-primary">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </CourseCard>
        </div>
      </div>
    </section>
  );
}

