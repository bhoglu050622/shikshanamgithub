'use client';

import '../_shared/course-landing.css';
import './nyaya-darshan-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { nyayaDarshanCourseData } from './courseData';
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
import { Brain, Scale, Lightbulb, Target } from 'lucide-react';

export default function NyayaDarshanCoursePage() {
  const courseData = nyayaDarshanCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: Brain,
      title: 'Master Indian Logic Systems',
      description: 'Learn the sophisticated Nyaya logical framework including the five-membered syllogism'
    },
    {
      icon: Target,
      title: 'Understand Epistemology (Pramanas)',
      description: 'Explore the four means of valid knowledge: perception, inference, comparison, and testimony'
    },
    {
      icon: Scale,
      title: 'Debate and Argumentation',
      description: 'Master classical Indian debate techniques and logical reasoning'
    },
    {
      icon: Lightbulb,
      title: 'Develop Critical Thinking',
      description: 'Enhance your logical reasoning skills and apply ancient wisdom to modern problem-solving'
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
            subtitle="Indian Logic & Epistemology"
            title="क्यों पढ़ें न्याय दर्शन?"
            description="Nyaya philosophy offers the most sophisticated logical systems in Indian thought. Master the art of reasoning, debate, and critical thinking that has shaped intellectual discourse for centuries."
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
        </div>
      </section>

      {/* Course Highlights */}
      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Highlights"
        subtitle="What You'll Master"
        description="Comprehensive training in Indian logic, epistemology, and critical thinking"
        columns={3}
        className="bg-white"
      />

      {/* Syllabus */}
      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Course Curriculum"
        subtitle="Systematic Learning Path"
        description="Master Nyaya philosophy through structured modules covering logic, epistemology, and debate"
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
        title="Skills You'll Develop"
        subtitle="Learning Outcomes"
        description="Transform your thinking with logical reasoning and critical analysis skills"
      />

      {/* Testimonials */}
      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success Stories"
        subtitle="What Our Students Say"
        description="Hear from students who have mastered logical reasoning through this course"
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
            title="Master the Art of Logic and Reasoning"
            description="Join hundreds of students who have developed sharp critical thinking skills through Nyaya philosophy. Transform your approach to logic and debate."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            badges={['1 Year Access', 'Certificate Included', 'Community Support', 'Hindi Medium']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}
