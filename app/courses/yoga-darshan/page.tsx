'use client';

import './yoga-darshan-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import InteractiveFlashcards from './components/InteractiveFlashcards';
import InstructorSection from './components/InstructorSection';
import ShlokaSection from './components/ShlokaSection';
import { yogaDarshanCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Brain, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function YogaDarshanPage() {
  const courseData = yogaDarshanCourseData;

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
    <div className="min-h-screen">
      {/* Font Awesome for Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        crossOrigin="anonymous"
      />

      <HeroSection />

      <InteractiveFlashcards />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-purple-50/30">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Transform Your Life"
            title={courseData.whyCourse?.title || 'क्यों पढ़ें योग दर्शन?'}
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          <div className="mt-16 course-card-premium bg-gradient-to-br from-purple-50 to-blue-50">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              Complete Yoga Philosophy Package
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#8B5CF6] flex-shrink-0 mt-1" />
                  <span className="course-body text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Highlights"
        subtitle="What Makes This Special"
        description="Everything you need to master the profound wisdom of Patanjali's Yoga Sutras"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Course Journey — From Sutra 1 to 195"
        subtitle="Complete Curriculum"
        description="The course systematically covers all 195 Yoga Sutras of Maharshi Patanjali, presented in grouped modules for easy learning"
        defaultOpen={[0]}
        className="bg-purple-50/30"
      />

      <InstructorSection />

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="What You'll Achieve"
        subtitle="Learning Outcomes"
        description="Transform your knowledge and skills with these concrete learning outcomes"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success Stories"
        subtitle="What Our Students Say"
        description="Hear from students who have transformed their lives through this course"
        maxDisplay={6}
        className="bg-purple-50/30"
      />

      <ShlokaSection />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#8B5CF6]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-6">
              Start Your Yoga Philosophy Journey Today
            </h2>
            <p className="text-center text-[#4B5563] text-lg mb-8">
              Join thousands of students who have transformed their understanding of consciousness and spiritual growth through this comprehensive course.
            </p>
            
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>Enroll Now - ₹3,999</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>1 Year Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificate Included</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>Community Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.894L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                </svg>
                <span>Hindi Medium</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}