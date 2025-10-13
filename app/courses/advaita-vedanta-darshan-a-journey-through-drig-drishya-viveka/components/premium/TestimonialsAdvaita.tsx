'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { advaitaVedantaCourseData } from '../../courseData';
import { testimonialVariants } from '../../motion.config';

export default function TestimonialsAdvaita() {
  const { testimonials } = advaitaVedantaCourseData;
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection + testimonials.length) % testimonials.length;
    setPage([newPage, newDirection]);
  };

  const currentTestimonial = testimonials[page];

  return (
    <section className="advaita-testimonials-section">
      <div className="advaita-section-header">
        <h2>Student Experiences</h2>
        <p>Hear from seekers who have deepened their spiritual understanding through this course</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Testimonial Carousel */}
        <div className="relative overflow-hidden min-h-[300px] flex items-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <div className="advaita-testimonial-card">
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: currentTestimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D97B2A] text-[#D97B2A]" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="advaita-testimonial-content">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="advaita-testimonial-author">
                  <div className="w-12 h-12 rounded-full bg-[#0D3B4A] text-white flex items-center justify-center font-bold text-lg">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="advaita-testimonial-author-name">
                      {currentTestimonial.name}
                    </div>
                    <div className="advaita-testimonial-author-role">
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="advaita-carousel-controls">
          <button
            onClick={() => paginate(-1)}
            className="advaita-carousel-button"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="advaita-carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > page ? 1 : -1])}
                className={`advaita-carousel-indicator ${
                  index === page ? 'active' : ''
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="advaita-carousel-button"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Video Testimonials CTA (Placeholder) */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0D3B4A] text-[#0D3B4A] font-semibold rounded-lg hover:bg-[#0D3B4A] hover:text-white transition-colors">
            <Play className="w-5 h-5" />
            Watch Video Testimonials
          </button>
        </div>
      </div>
    </section>
  );
}


