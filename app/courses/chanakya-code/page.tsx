'use client';

import './chanakya-code-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { chanakyaCodeCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Target, TrendingUp, Users, Lightbulb } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { chanakyaCodeFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

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
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      <HeroSection />

      <PhilosophyFlashcards 
        flashcards={chanakyaCodeFlashcards}
        title="चाणक्य नीति के मूल सिद्धांत"
        subtitle="Core Principles of Statecraft - Click to Reveal"
        className="chanakya-flashcards"
      />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-red-50/20">
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
        className="bg-red-50/20"
      />

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Success You'll Achieve"
        subtitle="Learning Outcomes"
        description="Transform your career and life with Chanakya's timeless strategies"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Success Stories"
        subtitle="What Our Students Achieved"
        description="Hear from professionals transformed by Chanakya's wisdom"
        maxDisplay={6}
        className="bg-red-50/20"
      />

      <section className="shloka-section-chanakya">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#991B1B] to-[#D97706] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                दुर्जनः परिहर्तव्यो विद्ययालंकृतोऽपि सन्।<br />
                मणिना भूषितः सर्पः किमसौ न भयंकरः॥
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Avoid wicked people, even if they are learned.<br />
                A serpent adorned with jewels is still frightening.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Chanakya Niti</p>
            </div>
          </div>
        </div>
      </section>

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-red-50 via-white to-amber-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#991B1B]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Master Chanakya's Strategies for Success</h2>
            <p className="text-center text-gray-700 text-lg mb-8">Transform your career and life with 2300+ years of proven wisdom.</p>
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#991B1B] to-[#D97706] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>Enroll Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
