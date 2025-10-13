'use client';

import '../_shared/course-landing.css';
import './advaita-vedanta-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { advaitaVedantaCourseData } from './courseData';
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
import { BookOpen, Eye, Lightbulb, Users, ArrowRight } from 'lucide-react';

export default function AdvaitaVedantaDarshanCoursePage() {
  const courseData = advaitaVedantaCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: BookOpen,
      title: 'जीवन का वास्तविक लक्ष्य क्या है?',
      description: 'Understand the true purpose of life through the lens of Advaita Vedanta philosophy'
    },
    {
      icon: Eye,
      title: 'क्या ये संसार सच में मिथ्या है?',
      description: 'Explore whether this world is truly an illusion and what that means for your daily life'
    },
    {
      icon: Lightbulb,
      title: 'अद्वैत वेदान्त से जीवन कैसे जिया जाए?',
      description: 'Learn practical ways to live life guided by the principles of non-duality'
    },
    {
      icon: Users,
      title: 'मैं और ये संसार एक कैसे हो सकते हैं?',
      description: 'Discover how you and the world are fundamentally one in the non-dual reality'
    }
  ];

  return (
    <CourseLayout theme="philosophy">
      {/* Hero Section */}
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      {/* Why This Course Section */}
      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Deep Questions of Existence"
            title="What Questions You Might Be Seeking to Answer"
            description="तो आज ही जुड़ें वेदान्त [उपनिषदों] के अद्वैत दर्शन से! Join thousands of seekers who have discovered profound answers."
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          {/* Additional Benefits */}
          <div className="mt-16 course-card-premium bg-gradient-to-br from-[var(--theme-primary-50)] to-[var(--theme-secondary-50)]">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              Journey into Non-Dual Wisdom
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
        description="Comprehensive study of Drig Drishya Viveka with traditional wisdom and modern teaching"
        columns={3}
        className="bg-white"
      />

      {/* Syllabus */}
      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Course Syllabus"
        subtitle="All 46 Shlokas Covered"
        description="Systematic journey through Drig Drishya Viveka with detailed verse-by-verse analysis"
        defaultOpen={[0]}
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
        description="Master the profound teachings of Advaita Vedanta and realize your true nature"
      />

      {/* Testimonials */}
      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Experiences"
        subtitle="What Our Students Say"
        description="Hear from seekers who have deepened their spiritual understanding through this course"
        maxDisplay={6}
      />

      {/* FAQ */}
      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      {/* Final CTA */}
      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Begin Your Journey to Self-Realization"
            description="Discover the non-dual truth of existence through this comprehensive study of Drig Drishya Viveka. Transform your understanding of reality and find lasting inner peace."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Community Support', 'Hindi Medium', 'WhatsApp Group']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
