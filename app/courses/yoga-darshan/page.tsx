'use client';

import '../_shared/course-landing.css';
import './yoga-darshan-landing.css';
import CourseLayout from '../_shared/layouts/CourseLayout';
import { yogaDarshanCourseData } from './courseData';
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
import { Brain, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function YogaDarshanPage() {
  const courseData = yogaDarshanCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: Brain,
      title: 'दैनिक-तनाव को दूर कर पाएंगे',
      description: 'Learn to manage and eliminate daily stress through ancient Yoga philosophy principles'
    },
    {
      icon: Heart,
      title: 'कठिन निर्णयों को आसानी से ले पाएंगे',
      description: 'Develop clarity of mind to make better decisions using Yoga wisdom'
    },
    {
      icon: Sparkles,
      title: 'सभी प्रकार के भय से मुक्त होंगे',
      description: 'Overcome various fears and anxieties through spiritual understanding'
    },
    {
      icon: Brain,
      title: 'गीता के गूढ़ रहस्यों को समझ पाएंगे',
      description: 'Gain profound insights into ancient scriptures and spiritual teachings'
    }
  ];

  return (
    <CourseLayout theme="philosophy">
      {/* Hero Section */}
      <HeroTemplate
        metadata={courseData.metadata}
        stats={courseData.stats}
        enrollmentLink={courseData.enrollment.checkoutLink}
        demoVideoLink="https://www.youtube.com/watch?v=ekeTLlgFwGg"
        backgroundImage={courseData.metadata.thumbnail}
      />

      {/* Why This Course Section */}
      <section className="course-section bg-gradient-to-b from-white to-gray-50">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Transform Your Life"
            title={courseData.whyCourse?.title || 'क्यों पढ़ें योग दर्शन?'}
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          {/* Additional Benefits */}
          <div className="mt-16 course-card-premium bg-gradient-to-br from-[var(--theme-primary-50)] to-[var(--theme-secondary-50)]">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              Complete Yoga Philosophy Package
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
        title="Course Highlights"
        subtitle="What Makes This Special"
        description="Everything you need to master the profound wisdom of Patanjali's Yoga Sutras"
        columns={3}
        className="bg-white"
      />

      {/* Syllabus */}
      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Course Journey — From Sutra 1 to 195"
        subtitle="Complete Curriculum"
        description="The course systematically covers all 195 Yoga Sutras of Maharshi Patanjali, presented in grouped modules for easy learning"
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
        title="What You'll Achieve"
        subtitle="Learning Outcomes"
        description="Transform your knowledge and skills with these concrete learning outcomes"
      />

      {/* Testimonials */}
      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success Stories"
        subtitle="What Our Students Say"
        description="Hear from students who have transformed their lives through this course"
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
            title="Start Your Yoga Philosophy Journey Today"
            description="Join thousands of students who have transformed their understanding of consciousness and spiritual growth through this comprehensive course."
            primaryButtonText="Enroll Now"
            primaryButtonHref={courseData.enrollment.checkoutLink}
            secondaryButtonText="Watch Demo"
            secondaryButtonHref="https://www.youtube.com/watch?v=ekeTLlgFwGg"
            badges={['1 Year Access', 'Certificate Included', 'Community Support', 'Hindi Medium']}
            backgroundGradient={false}
          />
        </div>
      </section>
    </CourseLayout>
  );
}