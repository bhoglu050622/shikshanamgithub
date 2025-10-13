'use client';

import { MessageCircle } from 'lucide-react';
import { CourseTestimonial as TestimonialType } from '../types/course.types';
import { CourseSectionHeader, CourseTestimonial } from '../components';

interface TestimonialsTemplateProps {
  testimonials: TestimonialType[];
  title?: string;
  subtitle?: string;
  description?: string;
  maxDisplay?: number;
  className?: string;
}

export default function TestimonialsTemplate({
  testimonials,
  title = 'Student Testimonials',
  subtitle = 'What Our Students Say',
  description = 'Hear from students who have transformed their lives through this course',
  maxDisplay = 6,
  className = '',
}: TestimonialsTemplateProps) {
  const displayTestimonials = testimonials.slice(0, maxDisplay);

  return (
    <section className={`course-section bg-gray-50 ${className}`}>
      <div className="course-container">
        <CourseSectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={MessageCircle}
          centered={true}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayTestimonials.map((testimonial, index) => (
            <CourseTestimonial
              key={index}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

