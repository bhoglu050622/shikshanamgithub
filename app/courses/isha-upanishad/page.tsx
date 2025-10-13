'use client';

import '../_shared/course-landing.css';
import './isha-upanishad-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { ishaUpanishadCourseData } from './courseData';
import {
  HeroTemplate,
  HighlightsTemplate,
  SyllabusTemplate,
  InstructorTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseCTA, CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Sparkles, Sun, Heart, Compass, ArrowRight } from 'lucide-react';

export default function IshaUpanishadPage() {
  const courseData = ishaUpanishadCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: Sparkles,
      title: 'Divine Presence',
      description: 'Learn to see the Lord in all beings and experience unity consciousness'
    },
    {
      icon: Sun,
      title: 'Balance & Harmony',
      description: 'Master the art of balancing worldly duties with spiritual pursuit'
    },
    {
      icon: Heart,
      title: 'Detached Action',
      description: 'Perform your duties with complete freedom and inner peace'
    },
    {
      icon: Compass,
      title: 'Path to Freedom',
      description: 'Discover the perfect philosophy for living freely in the modern world'
    }
  ];

  return (
    <CourseLayout theme="upanishad">
      {/* Hero Section */}
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      {/* Why This Course Section */}
      <section className="course-section bg-gradient-to-b from-white to-[var(--theme-primary-50)]">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Ancient Wisdom for Modern Living"
            title="Why Study Isha Upanishad?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          {/* Additional Benefits */}
          <div className="mt-16 course-card-premium bg-gradient-to-br from-[var(--theme-primary-50)] to-[var(--theme-secondary-50)]">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              The Perfect Philosophy for Householders
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[var(--theme-primary-600)] flex-shrink-0 mt-1" />
                  <span className="course-body text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Features"
        subtitle="What's Included"
        description="Comprehensive study of all 18 mantras with practical applications"
        columns={3}
        className="bg-white"
      />

      {/* Syllabus */}
      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Journey Through 18 Mantras"
        subtitle="Complete Course Structure"
        description="Systematic exploration of Isha Upanishad from introduction to final wisdom"
        defaultOpen={[0]}
        className="bg-gradient-to-b from-white to-[var(--theme-primary-50)]"
      />

      {/* Instructor */}
      {courseData.instructor && (
        <InstructorTemplate
          instructor={courseData.instructor}
          className="bg-white"
        />
      )}

      {/* Learning Outcomes */}
      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Transform Your Life"
        subtitle="Learning Outcomes"
        description="Discover practical wisdom that brings peace and freedom to daily living"
        className="bg-gradient-to-b from-white to-[var(--theme-secondary-50)]"
      />

      {/* Testimonials */}
      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Transformations"
        subtitle="What Our Students Say"
        description="Hear from learners who have integrated Isha Upanishad wisdom into their lives"
        maxDisplay={6}
        className="bg-white"
      />

      {/* FAQ */}
      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-[var(--theme-primary-50)]"
      />

      {/* Final CTA */}
      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Begin Your Upanishadic Journey"
            description="Discover the timeless wisdom of Isha Upanishad and learn to live with perfect balance, freedom, and inner peace. Join thousands who have transformed their lives through this profound teaching."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', '18 Mantras', 'Community Forum']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
