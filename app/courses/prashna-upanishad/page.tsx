'use client';

import './prashna-upanishad-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { prashnaUpanishadCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Zap, Brain, Eye, MessageCircle, ArrowRight } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { prashnaUpanishadFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function PrashnaUpanishadPage() {
  const courseData = prashnaUpanishadCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: Zap,
      title: 'Master Prana Science',
      description: 'Understand the five vital forces and their functions in the body'
    },
    {
      icon: Brain,
      title: 'Explore Consciousness',
      description: 'Deep dive into waking, dream, and sleep states of awareness'
    },
    {
      icon: Eye,
      title: 'Om Meditation',
      description: 'Learn authentic Upanishadic meditation on the sacred syllable'
    },
    {
      icon: MessageCircle,
      title: 'Questions & Answers',
      description: 'Systematic inquiry into life\'s most profound questions'
    }
  ];

  return (
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      <HeroSection />

      <PhilosophyFlashcards 
        flashcards={prashnaUpanishadFlashcards}
        title="प्रश्न उपनिषद् के मूल सिद्धांत"
        subtitle="Six Cosmic Questions - Click to Reveal"
        className="prashna-flashcards"
      />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-blue-50/20">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Six Questions, Infinite Wisdom"
            title="Why Study Prashna Upanishad?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          <div className="mt-16 course-card-premium bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              Journey Through Six Profound Questions
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-1" />
                  <span className="course-body text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Features"
        subtitle="What's Included"
        description="Comprehensive exploration of prana, consciousness, and meditation"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Six Prashnas of Wisdom"
        subtitle="Complete Course Structure"
        description="Systematic study of all six questions from creation to liberation"
        defaultOpen={[0]}
        className="bg-blue-50/20"
      />

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Transform Your Understanding"
        subtitle="Learning Outcomes"
        description="Master the science of prana, consciousness, and meditation"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Experiences"
        subtitle="What Our Students Say"
        description="Hear from practitioners who have deepened their understanding"
        maxDisplay={6}
        className="bg-blue-50/20"
      />

      <section className="shloka-section-prashna">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                ओमित्येतदक्षरमुद्गीथमुपासीत।
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Meditate on the sacred syllable Om, the imperishable reality.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Prashna Upanishad</p>
            </div>
          </div>
        </div>
      </section>

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#1E40AF]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Discover the Answers to Life's Profound Questions</h2>
            <p className="text-center text-gray-700 text-lg mb-8">Master the science of prana, explore consciousness, and learn authentic meditation techniques.</p>
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
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
