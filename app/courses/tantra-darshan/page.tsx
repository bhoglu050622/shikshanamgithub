'use client';

import '../_shared/course-landing.css';
import './tantra-darshan-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { tantraDarshanCourseData } from './courseData';
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
import { Flame, Sparkles, Zap, Lightbulb } from 'lucide-react';

export default function TantraDarshanCoursePage() {
  const courseData = tantraDarshanCourseData;

  const whyFeatures = [
    {
      icon: Flame,
      title: 'Authentic Philosophy',
      description: 'Learn classical tantra free from modern misconceptions'
    },
    {
      icon: Sparkles,
      title: 'Shakti & Shiva',
      description: 'Master the philosophy of consciousness and energy'
    },
    {
      icon: Zap,
      title: 'Energy Science',
      description: 'Understand kundalini, chakras, and subtle body'
    },
    {
      icon: Lightbulb,
      title: 'Practical Transformation',
      description: 'Apply tantric wisdom for spiritual growth'
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
            subtitle="Authentic Tantric Wisdom"
            title="Why Study Tantra Darshan?"
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
        description="Comprehensive training in authentic tantric philosophy and practices"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master authentic tantra from foundations to advanced realization"
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
        title="Transformation You'll Experience"
        subtitle="Learning Outcomes"
        description="Develop profound understanding of consciousness and energy through authentic tantra"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success"
        subtitle="What Our Students Say"
        description="Hear from learners transformed by authentic tantric wisdom"
        maxDisplay={6}
      />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]">
        <div className="course-container">
          <CourseCTA
            title="Master Authentic Tantric Philosophy"
            description="Discover the profound science of consciousness and energy. Transform your spiritual understanding through classical tantra, free from misconceptions."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Authentic Teachings', 'Expert Guidance']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
