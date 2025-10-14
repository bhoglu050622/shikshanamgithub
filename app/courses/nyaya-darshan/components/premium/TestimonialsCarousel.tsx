'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { nyayaDarshanCourseData } from '../../courseData';
import { testimonialVariants } from '../../motion.config';

export default function TestimonialsCarousel() {
  const { testimonials } = nyayaDarshanCourseData;
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentIndex = ((page % testimonials.length) + testimonials.length) % testimonials.length;
  const currentTestimonial = testimonials[currentIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [page, isAutoPlaying, paginate]);

  return (
    <section 
      className="py-16 px-4 bg-gradient-to-b from-[#FFF9F2] to-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3B4A] mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-gray-600 text-center">
            Hear from students who have mastered logical reasoning
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white border-2 border-[#E5DDD5] rounded-2xl p-8 md:p-12 shadow-lg"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#D97B2A]/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-[#D97B2A]" />
                </div>
              </div>

              {/* Testimonial Content */}
              <p className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 font-serif italic">
                "{currentTestimonial.content}"
              </p>

              {/* Rating */}
              {currentTestimonial.rating && (
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating!
                          ? 'text-[#D97B2A] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Author Info */}
              <div className="text-center">
                <p className="text-lg font-semibold text-[#0D3B4A]">
                  {currentTestimonial.name}
                </p>
                <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

