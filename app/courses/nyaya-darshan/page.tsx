'use client';

import { useState } from 'react';
import './nyaya-darshan-premium.css';
import '../_shared/course-landing.css';
import { nyayaDarshanCourseData } from './courseData';
import {
  HeroNyaya,
  FeatureChips,
  DemoModal,
  SyllabusExplorer,
  InstructorCard,
  PurchaseCard,
  FAQAccordion,
  TestimonialsCarousel
} from './components/premium';
import { OutcomesTemplate } from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Brain, Scale, Lightbulb, Target, BookOpen, Award } from 'lucide-react';

export default function NyayaDarshanCoursePage() {
  const courseData = nyayaDarshanCourseData;
  const [showDemoModal, setShowDemoModal] = useState(false);

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
    <div className="min-h-screen">
      {/* Hero Section with Demo CTA */}
      <HeroNyaya onDemoClick={() => setShowDemoModal(true)} />

      {/* Feature Chips Strip */}
      <FeatureChips />

      {/* Demo Modal */}
      <DemoModal 
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title="Introduction - Free Demo"
      />

      {/* Demo & Sample Lessons Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <CourseSectionHeader
            subtitle="Free Preview"
            title="Watch Demo & Sample Lessons"
            description="Experience the teaching style and course content before enrolling"
            centered={true}
          />
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Demo videos would be mapped here */}
            <div className="bg-[#FFF9F2] border-2 border-[#D97B2A] rounded-xl p-6 text-center">
              <BookOpen className="w-12 h-12 text-[#D97B2A] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0D3B4A] mb-2">Introduction Demo</h3>
              <p className="text-gray-600 mb-4">6:09 min • Free</p>
              <button 
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-2 bg-[#D97B2A] text-white font-semibold rounded-lg hover:bg-[#E89450] transition-colors"
              >
                Watch Now
              </button>
            </div>
            <div className="bg-[#FFF9F2] border-2 border-[#E5DDD5] rounded-xl p-6 text-center opacity-75">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0D3B4A] mb-2">Sample Lesson 1</h3>
              <p className="text-gray-600 mb-4">Coming soon</p>
            </div>
            <div className="bg-[#FFF9F2] border-2 border-[#E5DDD5] rounded-xl p-6 text-center opacity-75">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0D3B4A] mb-2">Sample Lesson 2</h3>
              <p className="text-gray-600 mb-4">Coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study Section */}
      <section id="course-details" className="course-section bg-gradient-to-b from-white to-[#FFF9F2]">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Indian Logic & Epistemology"
            title="क्यों पढ़ें न्याय दर्शन?"
            description="Nyaya philosophy offers the most sophisticated logical systems in Indian thought. Master the art of reasoning, debate, and critical thinking that has shaped intellectual discourse for centuries."
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />

          {/* What You'll Be Able To Do */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-[#0D3B4A] mb-8">
              What You'll Be Able To Do
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#E5DDD5]">
                  <div className="w-6 h-6 bg-[#D97B2A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Explorer */}
      <SyllabusExplorer />

      {/* Learning Outcomes */}
      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Skills You'll Develop"
        subtitle="Learning Outcomes"
        description="Transform your thinking with logical reasoning and critical analysis skills"
        className="bg-white"
      />

      {/* Instructor Card */}
      <InstructorCard />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Sacred Shloka Section */}
      <section className="shloka-section-nyaya py-16 px-4 bg-gradient-to-b from-[#FFF9F2] to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#0D3B4A] to-[#1A5568] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                प्रमाणैरर्थपरीक्षणं न्यायः।
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed text-center">
                Nyaya is the examination of objects through valid means of knowledge.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4 text-center">— Nyaya Sutras</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FAQAccordion />

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#D97B2A]/20">
            <div className="text-center">
              <Award className="w-16 h-16 text-[#D97B2A] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
                Master the Art of Logic and Reasoning
              </h2>
              <p className="text-xl text-gray-700 mb-8 text-center">
                Join thousands of students who have developed sharp critical thinking skills through Nyaya philosophy
              </p>
              <a
                href={courseData.enrollment.checkoutLink}
                className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <span>Enroll Now — {courseData.metadata.price}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Purchase Card - Desktop */}
      <div className="hidden lg:block fixed right-8 top-24 w-80 z-40">
        <PurchaseCard />
      </div>

      {/* Mobile Purchase Card - Bottom Sheet - DISABLED */}
      <div className="hidden lg:hidden">
        <PurchaseCard />
      </div>
    </div>
  );
}
