'use client';

import '../_shared/course-landing.css';
import './chanakya-code-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { chanakyaCodeCourseData } from './courseData';
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
import { Target, TrendingUp, Users, Lightbulb } from 'lucide-react';

export default function ChanakyaCodeCoursePage() {
  const courseData = chanakyaCodeCourseData;

  const whyFeatures = [
    {
      icon: Target,
      title: 'Strategic Mastery',
      description: 'Learn proven strategies from the ancient master tactician'
    },
    {
      icon: TrendingUp,
      title: 'Career Success',
      description: 'Accelerate professional growth with timeless principles'
    },
    {
      icon: Users,
      title: 'Leadership Skills',
      description: 'Develop powerful leadership and people management abilities'
    },
    {
      icon: Lightbulb,
      title: 'Practical Wisdom',
      description: 'Apply ancient strategies to modern challenges immediately'
    }
  ];

  return (
    <CourseLayout theme="practical">
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Ancient Wisdom for Modern Success"
            title="Why Learn The Chanakya Code?"
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
        description="Practical wisdom from Chanakya for leadership and success"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master strategic thinking and leadership from ancient wisdom"
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
        title="Success You'll Achieve"
        subtitle="Learning Outcomes"
        description="Transform your career and life with Chanakya's timeless strategies"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Success Stories"
        subtitle="What Our Students Achieved"
        description="Hear from professionals transformed by Chanakya's wisdom"
        maxDisplay={6}
      />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Master Chanakya's Strategies for Success"
            description="Transform your career and life with 2300+ years of proven wisdom. Learn strategic thinking, leadership, and practical skills for modern success."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Practical Wisdom', 'Immediate Results']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
