'use client';

import { MotionDiv } from '@/components/motion/MotionWrapper';
import { Award, BookOpen, Users } from 'lucide-react';
import { prashnaUpanishadCourseData } from '../../courseData';
import { instructorVariants, safeVariants } from '../../motion.config';

export default function InstructorCard() {
  const { instructor } = prashnaUpanishadCourseData;

  if (!instructor) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#FFF9F2] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
            Meet Your Instructor
          </h2>
          <p className="text-lg text-gray-600">
            Learn from an expert who bridges ancient wisdom with modern understanding
          </p>
        </div>

        <MotionDiv
          className="prashna-instructor-card"
          variants={safeVariants(instructorVariants)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="prashna-instructor-grid">
            {/* Instructor Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="https://shikshanam.in/wp-content/uploads/2024/05/1.png"
                alt={instructor.name}
                className="prashna-instructor-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/200x200/0D3B4A/FFF9F2?text=Vishal+Chaurasia';
                }}
              />
            </div>

            {/* Instructor Info */}
            <div>
              <h3 className="prashna-instructor-name">{instructor.name}</h3>
              <p className="prashna-instructor-title">{instructor.title}</p>
              <p className="prashna-instructor-bio">{instructor.bio}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg border-2 border-[#0D3B4A]/10">
                  <Award className="w-8 h-8 text-[#D97B2A] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#0D3B4A]">10+</div>
                  <div className="text-xs text-gray-600">Years Teaching</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-2 border-[#0D3B4A]/10">
                  <Users className="w-8 h-8 text-[#D97B2A] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#0D3B4A]">10K+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border-2 border-[#0D3B4A]/10">
                  <BookOpen className="w-8 h-8 text-[#D97B2A] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#0D3B4A]">4.8</div>
                  <div className="text-xs text-gray-600">Avg Rating</div>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0D3B4A] mb-3">Areas of Expertise:</p>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialization?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#D97B2A]/10 text-[#D97B2A] text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured In (Placeholder) */}
              <div>
                <p className="text-sm font-semibold text-[#0D3B4A] mb-3">Featured In:</p>
                <div className="flex flex-wrap gap-4 items-center opacity-50">
                  <div className="px-4 py-2 bg-gray-100 rounded text-xs text-gray-600">
                    Leading Universities
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded text-xs text-gray-600">
                    Philosophy Forums
                  </div>
                  <div className="px-4 py-2 bg-gray-100 rounded text-xs text-gray-600">
                    Spiritual Conferences
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}

