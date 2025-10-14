'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, BookOpen, Users, CheckCircle } from 'lucide-react';
import { chanakyaCodeCourseData } from '../courseData';

const featuredLogos = [
  { name: 'IIT Patna', logo: '/images/logos/iit.svg' },
  { name: 'TEDx', logo: '/images/logos/tedx.svg' },
  { name: 'Education Times', logo: '/images/logos/education-times.svg' }
];

export default function InstructorSection() {
  const instructors = chanakyaCodeCourseData.instructors || [];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B2B3A] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Learn from the Masters
          </h2>
          <p className="text-lg text-[#6C6C6C] text-center">
            Expert instructors with decades of experience in strategy, leadership, and ancient wisdom
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="chanakya-instructor-card"
            >
              {/* Instructor Photo */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative">
                    <Image
                      src={instructor.image || '/assets/placeholder-instructor.jpg'}
                      alt={instructor.name}
                      width={160}
                      height={160}
                      className="chanakya-instructor-photo"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#D87A2B] rounded-full flex items-center justify-center border-4 border-white">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B2B3A] mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-[#D87A2B] font-semibold mb-3">
                    {instructor.title}
                  </p>
                  <p className="text-sm text-[#6C6C6C] mb-4">
                    {instructor.experience}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[#6C6C6C] leading-relaxed mb-6">
                {instructor.bio}
              </p>

              {/* Specializations */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#0B2B3A] uppercase tracking-wide mb-3">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialization?.map((spec, specIndex) => (
                    <span
                      key={specIndex}
                      className="px-3 py-1 bg-[#D87A2B]/10 text-[#D87A2B] rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              {instructor.achievements && instructor.achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-[#0B2B3A] uppercase tracking-wide mb-3">
                    Key Achievements
                  </h4>
                  {instructor.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#D87A2B] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#6C6C6C]">{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Featured In / As Seen On */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm font-semibold text-[#6C6C6C] uppercase tracking-wide mb-6">
            Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {featuredLogos.map((item, index) => (
              <div key={index} className="text-[#0B2B3A] font-bold text-lg">
                {item.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <div className="text-center p-4 bg-gradient-to-br from-[#D87A2B]/5 to-[#0B2B3A]/5 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-[#D87A2B]" />
              <div className="text-2xl md:text-3xl font-bold text-[#0B2B3A]">5000+</div>
            </div>
            <div className="text-sm text-[#6C6C6C]">Students Trained</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-[#D87A2B]/5 to-[#0B2B3A]/5 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-[#D87A2B]" />
              <div className="text-2xl md:text-3xl font-bold text-[#0B2B3A]">15+</div>
            </div>
            <div className="text-sm text-[#6C6C6C]">Years Experience</div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-[#D87A2B]/5 to-[#0B2B3A]/5 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-[#D87A2B]" />
              <div className="text-2xl md:text-3xl font-bold text-[#0B2B3A]">4.9</div>
            </div>
            <div className="text-sm text-[#6C6C6C]">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

