'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { ishaUpanishadCourseData } from '../../courseData';
import { testimonialVariants, fadeInUpVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';

export default function TestimonialsCarousel() {
  const { testimonials } = ishaUpanishadCourseData;
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + testimonials.length) % testimonials.length;
    setCurrentIndex([newIndex, newDirection]);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#FFF9F2] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="isha-section-header"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="isha-section-subtitle">Student Success</p>
          <h2 className="isha-section-title">What Our Students Say</h2>
          <p className="isha-section-description">
            Hear from learners who have integrated Isha Upanishad wisdom into their lives
          </p>
        </motion.div>

        {/* Carousel */}
        <div ref={ref} className="relative mt-12">
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-[#D97B2A]/20">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-[#D97B2A] mb-6" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D97B2A] text-[#D97B2A]" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 font-serif italic">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0D3B4A] to-[#1A5568] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {currentTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D3B4A] text-lg">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-gray-600 text-sm">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="p-3 bg-white border-2 border-[#0D3B4A] text-[#0D3B4A] rounded-full hover:bg-[#0D3B4A] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex([index, index > currentIndex ? 1 : -1])}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#D97B2A] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="p-3 bg-white border-2 border-[#0D3B4A] text-[#0D3B4A] rounded-full hover:bg-[#0D3B4A] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Counter */}
          <p className="text-center mt-4 text-gray-600 text-sm">
            {currentIndex + 1} of {testimonials.length}
          </p>
        </div>

        {/* Video Testimonials CTA (Placeholder) */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0D3B4A] to-[#1A5568] text-white rounded-lg hover:shadow-lg transition-shadow">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            <span>Watch Video Testimonials</span>
          </button>
        </div>
      </div>
    </section>
  );
}

