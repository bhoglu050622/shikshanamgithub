'use client';

import './yoga-advanced-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { yogaAdvancedCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Brain, Sparkles, Eye, Compass } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { yogaAdvancedFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function YogaAdvancedCoursePage() {
  const courseData = yogaAdvancedCourseData;

  const whyFeatures = [
    {
      icon: Brain,
      title: 'Advanced Philosophy',
      description: 'Master deeper dimensions beyond basic yoga concepts'
    },
    {
      icon: Sparkles,
      title: 'Higher Consciousness',
      description: 'Explore advanced states of awareness and samadhi'
    },
    {
      icon: Eye,
      title: 'Subtle Mastery',
      description: 'Understand chakras, nadis, and energy systems in depth'
    },
    {
      icon: Compass,
      title: 'Liberation Path',
      description: 'Clear guidance toward ultimate spiritual freedom'
    }
  ];

  return (
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      <HeroSection />

      <PhilosophyFlashcards 
        flashcards={yogaAdvancedFlashcards}
        title="Advanced Yoga Concepts"
        subtitle="Vibhuti & Kaivalya Pada - Click to Reveal"
        className="yoga-advanced-flashcards"
      />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-orange-50/20">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="For Serious Practitioners"
            title="Why Take Advanced Yoga?"
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
        description="Advanced training in classical yoga philosophy and meditation"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master advanced yoga from higher meditation to ultimate liberation"
        defaultOpen={[0]}
        className="bg-orange-50/20"
      />

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Mastery You'll Achieve"
        subtitle="Learning Outcomes"
        description="Develop profound understanding and practice of advanced yoga"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Transformations"
        subtitle="What Advanced Practitioners Say"
        description="Hear from serious seekers transformed by deeper yoga wisdom"
        maxDisplay={6}
        className="bg-orange-50/20"
      />

      <section className="shloka-section-yoga-advanced">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#F97316] to-[#FBBF24] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                तत्र प्रत्ययैकतानता ध्यानम्।<br />
                तदेवार्थमात्रनिर्भासं स्वरूपशून्यमिव समाधिः॥
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Meditation is the one-pointed flow of awareness.<br />
                When only the object shines forth, as if devoid of one's own form, that is Samadhi.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Yoga Sutras 3.2-3.3</p>
            </div>
          </div>
        </div>
      </section>

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#F97316]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Master Advanced Yoga Philosophy</h2>
            <p className="text-center text-gray-700 text-lg mb-8">Take your practice to the highest levels with Vibhuti and Kaivalya Pada teachings.</p>
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
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
