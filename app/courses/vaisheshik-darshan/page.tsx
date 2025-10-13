'use client';

import '../_shared/course-landing.css';
import './vaisheshik-darshan-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { vaisheshikDarshanCourseData } from './courseData';
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
import { Atom, Layers, Zap, Microscope } from 'lucide-react';

export default function VaisheshikDarshanCoursePage() {
  const courseData = vaisheshikDarshanCourseData;

  const whyFeatures = [
    {
      icon: Atom,
      title: 'Ancient Atomic Theory',
      description: 'Discover the sophisticated Indian atomic theory that predates modern physics'
    },
    {
      icon: Layers,
      title: 'Six Categories',
      description: 'Master the systematic categorization of all reality'
    },
    {
      icon: Zap,
      title: 'Metaphysics & Physics',
      description: 'Explore the nature of substance, quality, and action'
    },
    {
      icon: Microscope,
      title: 'Ancient Science',
      description: 'Bridge ancient wisdom with modern scientific understanding'
    }
  ];

  return (
    <CourseLayout theme="philosophy">
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        backgroundImage={courseData.metadata.thumbnail}
      />

      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Indian Physics & Metaphysics"
            title="Why Study Vaisheshika Darshan?"
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
        description="Comprehensive training in ancient atomic theory and category system"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master Vaisheshika philosophy from fundamentals to atomic theory"
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
        title="Knowledge You'll Gain"
        subtitle="Learning Outcomes"
        description="Develop systematic understanding of reality through ancient wisdom"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success"
        subtitle="What Our Students Say"
        description="Hear from learners amazed by ancient Indian atomic theory"
        maxDisplay={6}
      />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Master Ancient Indian Physics & Metaphysics"
            description="Discover the sophisticated category system and atomic theory that predates modern science. Transform your understanding of reality through Vaisheshika philosophy."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Ancient Atomic Theory', 'Six Categories']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
