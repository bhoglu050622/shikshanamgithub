'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonialVariants } from '../../motion.config';
import { CourseTestimonial } from '../../../_shared/types/course.types';

interface TestimonialsCarouselProps {
  testimonials: CourseTestimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 px-4" style={{ background: 'linear-gradient(to bottom, var(--vaisheshik-cream-light), var(--vaisheshik-bg-cream))' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
            Student Success Stories
          </h2>
          <p className="vaisheshik-body-text text-lg">
            Hear from learners who mastered Vaisheshik philosophy
          </p>
        </div>

        {/* Carousel */}
        <div className="vaisheshik-testimonial-carousel">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="vaisheshik-testimonial-card"
            >
              {/* Rating Stars */}
              {testimonials[currentIndex].rating && (
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < (testimonials[currentIndex].rating || 0)
                          ? 'fill-[var(--vaisheshik-accent-saffron)] text-[var(--vaisheshik-accent-saffron)]'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              )}

              {/* Testimonial Content */}
              <blockquote className="vaisheshik-testimonial-content">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div>
                <div className="vaisheshik-testimonial-author">
                  {testimonials[currentIndex].name}
                </div>
                {testimonials[currentIndex].role && (
                  <div className="text-sm text-[var(--vaisheshik-muted-gray)]">
                    {testimonials[currentIndex].role}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="vaisheshik-carousel-controls">
            <button
              onClick={slidePrev}
              className="vaisheshik-carousel-arrow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="vaisheshik-carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`vaisheshik-carousel-dot ${
                    index === currentIndex ? 'active' : ''
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={slideNext}
              className="vaisheshik-carousel-arrow"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-sm text-[var(--vaisheshik-muted-gray)]">
            Join {testimonials.length}+ satisfied learners on this philosophical journey
          </p>
        </div>
      </div>
    </section>
  );
}

