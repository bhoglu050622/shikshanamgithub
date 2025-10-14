'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { prashnaUpanishadCourseData } from '../../courseData';
import { fadeInUpVariants, safeVariants } from '../../motion.config';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { testimonials } = prashnaUpanishadCourseData;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from practitioners who have deepened their understanding
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={safeVariants(fadeInUpVariants)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-gradient-to-br from-[#FFF9F2] to-white border-2 border-[#D97B2A]/20 rounded-2xl p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#D97B2A]/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D97B2A] text-[#D97B2A]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                "{currentTestimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0D3B4A] to-[#1A5568] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#0D3B4A]">{currentTestimonial.name}</p>
                  <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-[#D97B2A] text-[#D97B2A] rounded-full flex items-center justify-center hover:bg-[#D97B2A] hover:text-white transition-colors shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-[#D97B2A] text-[#D97B2A] rounded-full flex items-center justify-center hover:bg-[#D97B2A] hover:text-white transition-colors shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#D97B2A] w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* All Testimonials Grid (Desktop Only) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#D97B2A]/30 transition-colors cursor-pointer"
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D97B2A] text-[#D97B2A]" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-[#0D3B4A] text-sm">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

