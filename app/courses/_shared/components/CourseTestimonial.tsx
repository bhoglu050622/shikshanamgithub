'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

interface CourseTestimonialProps {
  testimonial: Testimonial;
  delay?: number;
  className?: string;
}

export default function CourseTestimonial({
  testimonial,
  delay = 0,
  className = '',
}: CourseTestimonialProps) {
  const { name, role, avatar, content, rating = 5 } = testimonial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`course-card-premium ${className}`}
      suppressHydrationWarning
    >
      {/* Quote Icon */}
      <div className="course-mb-md">
        <Quote className="w-10 h-10 text-gray-300" />
      </div>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-1 course-mb-md">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <p className="course-body-lg text-gray-700 course-mb-lg leading-relaxed">
        "{content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {avatar && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        )}
        <div>
          <p className="course-heading-4 text-gray-900">{name}</p>
          {role && (
            <p className="course-body-sm text-gray-600">{role}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

