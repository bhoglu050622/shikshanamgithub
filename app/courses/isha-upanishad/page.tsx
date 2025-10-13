'use client';

import './isha-upanishad-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { ishaUpanishadCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Sparkles, Sun, Heart, Compass, ArrowRight } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { ishaUpanishadFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';
import Image from 'next/image';

export default function IshaUpanishadPage() {
  const courseData = ishaUpanishadCourseData;

  // Transform Why Course data to features for FeatureGrid
  const whyFeatures = [
    {
      icon: Sparkles,
      title: 'Divine Presence',
      description: 'Learn to see the Lord in all beings and experience unity consciousness'
    },
    {
      icon: Sun,
      title: 'Balance & Harmony',
      description: 'Master the art of balancing worldly duties with spiritual pursuit'
    },
    {
      icon: Heart,
      title: 'Detached Action',
      description: 'Perform your duties with complete freedom and inner peace'
    },
    {
      icon: Compass,
      title: 'Path to Freedom',
      description: 'Discover the perfect philosophy for living freely in the modern world'
    }
  ];

  return (
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      {/* Hero Section */}
      <HeroSection />

      {/* Philosophy Flashcards */}
      <PhilosophyFlashcards 
        flashcards={ishaUpanishadFlashcards}
        title="उपनिषद् के मूल सिद्धांत"
        subtitle="Key Concepts from Isha Upanishad - Click to Reveal"
        className="isha-flashcards"
      />

      {/* Why Study Section */}
      <section id="course-details" className="course-section bg-gradient-to-b from-white to-amber-50/30">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Ancient Wisdom for Modern Living"
            title="Why Study Isha Upanishad?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          <div className="mt-16 course-card-premium bg-gradient-to-br from-amber-50 to-orange-50">
            <h3 className="course-heading-3 text-center text-gray-900 mb-8">
              The Perfect Philosophy for Householders
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-1" />
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
        title="Course Features"
        subtitle="What's Included"
        description="Comprehensive study of all 18 mantras with practical applications"
        columns={3}
        className="bg-white"
      />

      {/* Course Syllabus */}
      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Journey Through 18 Mantras"
        subtitle="Complete Course Structure"
        description="Systematic exploration of Isha Upanishad from introduction to final wisdom"
        defaultOpen={[0]}
        className="bg-amber-50/30"
      />

      {/* Instructor Section */}
      <section className="instructor-section-isha">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F59E0B] mb-4" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
              आचार्य परिचय
            </h2>
            <p className="text-xl text-gray-700">Learn from a Master of Philosophy</p>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-amber-50/50 to-orange-50/50 rounded-3xl shadow-2xl overflow-hidden border-2 border-[#F59E0B]/20">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-[#FB923C]/20"></div>
                <Image
                  src={vishalChaurasiaData.image || 'https://placehold.co/600x600/F59E0B/FFFFFF?text=Vishal+Chaurasia'}
                  alt={vishalChaurasiaData.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x600/F59E0B/FFFFFF?text=Vishal+Chaurasia';
                  }}
                />
              </div>

              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{courseData.instructor?.name}</h3>
                <p className="text-lg text-[#F59E0B] font-semibold mb-6">{courseData.instructor?.title}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{courseData.instructor?.bio}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {courseData.instructor?.specialization?.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-sm rounded-full border border-[#F59E0B]/30">
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

      {/* Learning Outcomes */}
      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Transform Your Life"
        subtitle="Learning Outcomes"
        description="Discover practical wisdom that brings peace and freedom to daily living"
        className="bg-white"
      />

      {/* Student Testimonials */}
      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Transformations"
        subtitle="What Our Students Say"
        description="Hear from learners who have integrated Isha Upanishad wisdom into their lives"
        maxDisplay={6}
        className="bg-amber-50/30"
      />

      {/* Sacred Shloka Section */}
      <section className="shloka-section-isha">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#F59E0B] to-[#FB923C] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्।<br />
                तेन त्यक्तेन भुञ्जीथाः मा गृधः कस्यस्विद्धनम्॥
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                All this is pervaded by the Lord.<br />
                Therefore enjoy through renunciation; do not covet anyone's wealth.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Isha Upanishad, Mantra 1</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQTemplate
        faqs={courseData.faqs}
        title="Frequently Asked Questions"
        subtitle="Got Questions?"
        description="Find answers to common questions about the course"
        className="bg-white"
      />

      {/* Final CTA Section */}
      <section className="course-section bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#F59E0B]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Begin Your Upanishadic Journey
            </h2>
            <p className="text-center text-gray-700 text-lg mb-8">
              Discover the timeless wisdom of Isha Upanishad. Special offer - ₹999 only!
            </p>
            
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#F59E0B] to-[#FB923C] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>Enroll Now - ₹999</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>1 Year Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span>18 Mantras</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
