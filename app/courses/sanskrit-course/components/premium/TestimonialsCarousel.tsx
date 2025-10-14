'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  videoTestimonials?: { url: string; thumbnail?: string }[];
}

export default function TestimonialsCarousel({
  testimonials,
  videoTestimonials = []
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[var(--bg-sanskrit)] to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold-sanskrit)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary-sanskrit)] mb-4">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary-sanskrit)]">
            What Our 10,000+ Students Say
          </p>
        </motion.div>

        {/* Video Testimonials (if available) */}
        {videoTestimonials.length > 0 && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {videoTestimonials.slice(0, 3).map((video, index) => (
                <button
                  key={index}
                  onClick={() => setVideoModalUrl(video.url)}
                  className="group relative aspect-video rounded-xl overflow-hidden card-sanskrit-premium focus-sanskrit"
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={`Video Testimonial ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--accent-sanskrit)] to-[var(--gold-sanskrit)] flex items-center justify-center">
                      <span className="text-white font-semibold">Student Testimonial</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-[var(--accent-sanskrit)] ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Text Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-80 md:h-64">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <div className="card-sanskrit-premium p-8 md:p-12 h-full flex flex-col justify-between">
                  {/* Rating Stars */}
                  {testimonials[currentIndex].rating && (
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < (testimonials[currentIndex].rating || 0)
                              ? 'text-[var(--gold-sanskrit)]'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <blockquote className="flex-1 mb-6">
                    <p className="text-lg md:text-xl text-[var(--text-secondary-sanskrit)] leading-relaxed">
                      "{testimonials[currentIndex].content}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div>
                    <p className="font-bold text-[var(--text-primary-sanskrit)]">
                      {testimonials[currentIndex].name}
                    </p>
                    {testimonials[currentIndex].role && (
                      <p className="text-sm text-[var(--text-muted-sanskrit)]">
                        {testimonials[currentIndex].role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-16 btn-testimonial-nav focus-sanskrit"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-16 btn-testimonial-nav focus-sanskrit"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`btn-testimonial-dot transition-all focus-sanskrit ${
                  index === currentIndex ? 'active' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setVideoModalUrl(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalUrl(null)}
              className="absolute top-4 right-4 z-10 btn-modal-close focus-sanskrit"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={videoModalUrl.replace('shorts/', 'embed/')}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

