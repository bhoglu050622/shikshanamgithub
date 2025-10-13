'use client';

import '../_shared/course-landing.css';
import './sanskrit-course-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { sanskritCourseCourseData } from './courseData';
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
import { BookOpen, MessageCircle, Award, Users } from 'lucide-react';

export default function SanskritCoursePage() {
  const courseData = sanskritCourseCourseData;

  const whyFeatures = [
    {
      icon: BookOpen,
      title: 'Read Classical Texts',
      description: 'Understand Bhagavad Gita, Upanishads in original Sanskrit'
    },
    {
      icon: MessageCircle,
      title: 'Live Q&A Weekly',
      description: 'Unlimited doubt clearing every Sunday at 7 PM'
    },
    {
      icon: Award,
      title: 'Gurukul Method',
      description: 'Traditional teaching adapted for modern learners'
    },
    {
      icon: Users,
      title: '10K+ Community',
      description: 'Join India\'s largest online Sanskrit learning community'
    }
  ];

  return (
    <CourseLayout theme="sanskrit">
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="The Mother of All Languages"
            title="Why Learn Sanskrit?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
        </div>
      </section>

      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Features"
        subtitle="What You'll Get"
        description="Complete Sanskrit learning from basics to reading classical texts"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master Sanskrit from Devanagari script to reading Bhagavad Gita"
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
        title="Skills You'll Develop"
        subtitle="Learning Outcomes"
        description="Transform from beginner to confident Sanskrit reader"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Success Stories"
        subtitle="What Our 10K+ Students Say"
        description="Hear from learners who mastered Sanskrit with us"
        maxDisplay={6}
      />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Start Your Sanskrit Journey Today"
            description="Master the divine language from basics. Read Bhagavad Gita, understand mantras, and connect with ancient wisdom. Join 10K+ students learning from Gurukul Acharya."
            primaryButtonText="Enroll Now - ₹1,499"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Live Q&A Weekly', '10K+ Students']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
