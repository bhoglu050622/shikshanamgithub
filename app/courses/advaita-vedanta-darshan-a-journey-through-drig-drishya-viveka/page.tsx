'use client';

import './advaita-vedanta-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { advaitaVedantaCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { BookOpen, Eye, Lightbulb, Users, ArrowRight } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { advaitaVedantaFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';
import Image from 'next/image';

export default function AdvaitaVedantaDarshanCoursePage() {
  const courseData = advaitaVedantaCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: BookOpen,
      title: 'जीवन का वास्तविक लक्ष्य क्या है?',
      description: 'Understand the true purpose of life through the lens of Advaita Vedanta philosophy'
    },
    {
      icon: Eye,
      title: 'क्या ये संसार सच में मिथ्या है?',
      description: 'Explore whether this world is truly an illusion and what that means for your daily life'
    },
    {
      icon: Lightbulb,
      title: 'अद्वैत वेदान्त से जीवन कैसे जिया जाए?',
      description: 'Learn practical ways to live life guided by the principles of non-duality'
    },
    {
      icon: Users,
      title: 'मैं और ये संसार एक कैसे हो सकते हैं?',
      description: 'Discover how you and the world are fundamentally one in the non-dual reality'
    }
  ];

  return (
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      <HeroSection />

      <PhilosophyFlashcards 
        flashcards={advaitaVedantaFlashcards}
        title="अद्वैत वेदान्त के मूल सिद्धांत"
        subtitle="Core Concepts of Non-Duality - Click to Reveal"
        className="advaita-flashcards"
      />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-teal-50/20">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Deep Questions of Existence"
            title="What Questions You Might Be Seeking to Answer"
            description="तो आज ही जुड़ें वेदान्त [उपनिषदों] के अद्वैत दर्शन से! Join thousands of seekers who have discovered profound answers."
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          <div className="mt-16 course-card-premium bg-gradient-to-br from-teal-50 to-cyan-50">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              Journey into Non-Dual Wisdom
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#14B8A6] flex-shrink-0 mt-1" />
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
        description="Comprehensive study of Drig Drishya Viveka with traditional wisdom and modern teaching"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Course Syllabus"
        subtitle="All 46 Shlokas Covered"
        description="Systematic journey through Drig Drishya Viveka with detailed verse-by-verse analysis"
        defaultOpen={[0]}
        className="bg-teal-50/20"
      />

      <section className="instructor-section-advaita">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#14B8A6] mb-4" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
              आचार्य परिचय
            </h2>
            <p className="text-xl text-gray-700">Learn from a Master of Advaita Vedanta</p>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-teal-50/50 to-cyan-50/50 rounded-3xl shadow-2xl overflow-hidden border-2 border-[#14B8A6]/20">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/20 to-[#0D9488]/20"></div>
                <Image
                  src={vishalChaurasiaData.image || 'https://placehold.co/600x600/14B8A6/FFFFFF?text=Vishal+Chaurasia'}
                  alt={vishalChaurasiaData.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x600/14B8A6/FFFFFF?text=Vishal+Chaurasia';
                  }}
                />
              </div>

              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{courseData.instructor?.name}</h3>
                <p className="text-lg text-[#14B8A6] font-semibold mb-6">{courseData.instructor?.title}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{courseData.instructor?.bio}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {courseData.instructor?.specialization?.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-[#14B8A6]/10 text-[#14B8A6] text-sm rounded-full border border-[#14B8A6]/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Transform Your Understanding"
        subtitle="Learning Outcomes"
        description="Master the profound teachings of Advaita Vedanta and realize your true nature"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Experiences"
        subtitle="What Our Students Say"
        description="Hear from seekers who have deepened their spiritual understanding through this course"
        maxDisplay={6}
        className="bg-teal-50/20"
      />

      <section className="shloka-section-advaita">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                द्रश्यं दृश्यत्वात् जडम् प्रतीयते।<br />
                दृक् तु चैतन्यरूपः सदा॥
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                The seen is inert because it is an object of perception.<br />
                But the Seer is always of the nature of consciousness.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Drig Drishya Viveka</p>
            </div>
          </div>
        </div>
      </section>

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#14B8A6]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Begin Your Journey to Self-Realization
            </h2>
            <p className="text-center text-gray-700 text-lg mb-8">
              Discover the non-dual truth of existence through comprehensive study of Drig Drishya Viveka.
            </p>
            
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>Enroll Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#14B8A6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>1 Year Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#14B8A6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#14B8A6]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span>46 Shlokas</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#14B8A6]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span>Community Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
