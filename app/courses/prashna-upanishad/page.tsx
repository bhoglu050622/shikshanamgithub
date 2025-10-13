'use client';

import '../_shared/course-landing.css';
import './prashna-upanishad-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { prashnaUpanishadCourseData } from './courseData';
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
import { Zap, Brain, Eye, MessageCircle, ArrowRight } from 'lucide-react';

export default function PrashnaUpanishadPage() {
  const courseData = prashnaUpanishadCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: Zap,
      title: 'Master Prana Science',
      description: 'Understand the five vital forces and their functions in the body'
    },
    {
      icon: Brain,
      title: 'Explore Consciousness',
      description: 'Deep dive into waking, dream, and sleep states of awareness'
    },
    {
      icon: Eye,
      title: 'Om Meditation',
      description: 'Learn authentic Upanishadic meditation on the sacred syllable'
    },
    {
      icon: MessageCircle,
      title: 'Questions & Answers',
      description: 'Systematic inquiry into life\'s most profound questions'
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
            subtitle="Six Questions, Infinite Wisdom"
            title="Why Study Prashna Upanishad?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          {/* Additional Benefits */}
          <div className="mt-16 course-card-premium bg-gradient-to-br from-[var(--theme-primary-50)] to-[var(--theme-secondary-50)]">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              Journey Through Six Profound Questions
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
        description="Comprehensive exploration of prana, consciousness, and meditation"
        columns={3}
        className="bg-white"
      />

      {/* Syllabus */}
      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Six Prashnas of Wisdom"
        subtitle="Complete Course Structure"
        description="Systematic study of all six questions from creation to liberation"
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
        title="Transform Your Understanding"
        subtitle="Learning Outcomes"
        description="Master the science of prana, consciousness, and meditation"
        className="bg-gradient-to-b from-white to-[var(--theme-secondary-50)]"
      />

      {/* Testimonials */}
      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Experiences"
        subtitle="What Our Students Say"
        description="Hear from practitioners who have deepened their understanding"
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
            title="Discover the Answers to Life's Profound Questions"
            description="Embark on a transformative journey through Prashna Upanishad. Master the science of prana, explore consciousness, and learn authentic meditation techniques from ancient wisdom."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', '6 Prashnas', 'Meditation Techniques']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
