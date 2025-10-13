'use client';

import '../_shared/course-landing.css';
import './yoga-advanced-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { yogaAdvancedCourseData } from './courseData';
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
import { Brain, Sparkles, Eye, Compass } from 'lucide-react';

export default function YogaAdvancedCoursePage() {
  const courseData = yogaAdvancedCourseData;

  const whyFeatures = [
    {
      icon: Brain,
      title: 'Advanced Philosophy',
      description: 'Master deeper dimensions beyond basic yoga concepts'
    },
    {
      icon: Sparkles,
      title: 'Higher Consciousness',
      description: 'Explore advanced states of awareness and samadhi'
    },
    {
      icon: Eye,
      title: 'Subtle Mastery',
      description: 'Understand chakras, nadis, and energy systems in depth'
    },
    {
      icon: Compass,
      title: 'Liberation Path',
      description: 'Clear guidance toward ultimate spiritual freedom'
    }
  ];

  return (
    <CourseLayout theme="advanced">
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="For Serious Practitioners"
            title="Why Take Advanced Yoga?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
        </div>
      </section>

      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Features"
        subtitle="What You'll Master"
        description="Advanced training in classical yoga philosophy and meditation"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master advanced yoga from higher meditation to ultimate liberation"
        defaultOpen={[0]}
      />

      {courseData.instructor && (
        <InstructorTemplate
          instructor={courseData.instructor}
          className="bg-white"
        />
      )}

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Mastery You'll Achieve"
        subtitle="Learning Outcomes"
        description="Develop profound understanding and practice of advanced yoga"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Transformations"
        subtitle="What Advanced Practitioners Say"
        description="Hear from serious seekers transformed by deeper yoga wisdom"
        maxDisplay={6}
      />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Master Advanced Yoga Philosophy"
            description="Take your practice to the highest levels. Explore advanced consciousness states, meditation mastery, and the path to liberation with expert guidance."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Advanced Meditation', 'Expert Mentorship']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
