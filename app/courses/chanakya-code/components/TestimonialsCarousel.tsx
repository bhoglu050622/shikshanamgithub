'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { chanakyaCodeCourseData } from '../courseData';

const categories = ['All', 'Business', 'Leadership', 'Professional'];

export default function TestimonialsCarousel() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = chanakyaCodeCourseData.testimonials || [];
  
  // Filter testimonials by category
  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  

  const visibleTestimonials = filteredTestimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FAF7F2] to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B2B3A] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Success Stories
          </h2>
          <p className="text-lg text-[#6C6C6C] text-center">
            See how Chanakya's wisdom transformed careers and businesses
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white shadow-lg hover:shadow-xl'
                  : 'bg-white text-[#6C6C6C] border-2 border-gray-200 hover:border-[#D87A2B] hover:text-[#0B2B3A]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Add padding to prevent button overlap */}
          <div className="chanakya-testimonials-container px-4 sm:px-8 md:px-16 lg:px-20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="chanakya-testimonial-card group"
                  >
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="w-10 h-10 text-[#D87A2B]/20" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D87A2B] text-[#D87A2B]" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-[#0B2B3A] leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0B2B3A] to-[#D87A2B] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-[#0B2B3A]">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-[#6C6C6C]">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Enhanced Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-10 h-3 bg-black shadow-lg'
                    : 'w-3 h-3 bg-gray-300 hover:bg-[#D87A2B] hover:scale-110'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#D87A2B]/20 rounded-full">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#D87A2B] text-[#D87A2B]" />
              <span className="font-bold text-[#0B2B3A] text-lg">
                {chanakyaCodeCourseData.stats?.rating}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <span className="text-[#6C6C6C]">
              Based on {chanakyaCodeCourseData.stats?.reviews} reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

