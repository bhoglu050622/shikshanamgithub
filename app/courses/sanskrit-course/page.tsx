'use client';

import './sanskrit-course-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import InteractiveFlashcards from './components/InteractiveFlashcards';
import InstructorSection from './components/InstructorSection';
import ShlokaSection from './components/ShlokaSection';
import { sanskritCourseCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseCTA, CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { BookOpen, MessageCircle, Award, Users } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

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
    <div className="min-h-screen bg-[#FDF6E3]">
      {/* Font Awesome for Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        crossOrigin="anonymous"
      />

      <HeroSection />

      <InteractiveFlashcards />

      <section className="course-section bg-gradient-to-b from-white to-[#FDF6E3]">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="The Mother of All Languages"
            title="Why Learn Sanskrit?"
            description="Unlock the divine language that holds the key to ancient wisdom, spiritual texts, and India's rich cultural heritage"
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
        className="bg-[#FDF6E3]/50"
      />

      <InstructorSection />

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Skills You'll Develop"
        subtitle="Learning Outcomes"
        description="Transform from beginner to confident Sanskrit reader"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Success Stories"
        subtitle="What Our 10K+ Students Say"
        description="Hear from learners who mastered Sanskrit with us"
        maxDisplay={6}
        className="bg-[#FDF6E3]/50"
      />

      <ShlokaSection />

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-[#FF6B35]/10 via-white to-[#FDF6E3]">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#FF6B35]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#8B4513] mb-6">
              Start Your Sanskrit Journey Today
            </h2>
            <p className="text-center text-[#654321] text-lg mb-8">
              Master the divine language from basics. Read Bhagavad Gita, understand mantras, and connect with ancient wisdom. Join 10K+ students learning from Gurukul Acharya.
            </p>
            
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>Enroll Now - ₹1,499</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#8B6F47]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>1 Year Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificate Included</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                <span>Live Q&A Weekly</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>10K+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
