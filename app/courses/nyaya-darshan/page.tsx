'use client';

import './nyaya-darshan-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { nyayaDarshanCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Brain, Scale, Lightbulb, Target } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { nyayaDarshanFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import Image from 'next/image';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';

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
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      <HeroSection />

      <PhilosophyFlashcards 
        flashcards={nyayaDarshanFlashcards}
        title="न्याय दर्शन के मूल सिद्धांत"
        subtitle="Core Concepts of Indian Logic - Click to Reveal"
        className="nyaya-flashcards"
      />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-blue-50/20">
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

      <HighlightsTemplate
        highlights={courseData.highlights}
        title="Course Highlights"
        subtitle="What You'll Master"
        description="Comprehensive training in Indian logic, epistemology, and critical thinking"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Course Curriculum"
        subtitle="Systematic Learning Path"
        description="Master Nyaya philosophy through structured modules covering logic, epistemology, and debate"
        defaultOpen={[0]}
        className="bg-blue-50/20"
      />

      <section className="instructor-section-nyaya">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-4" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
              आचार्य परिचय
            </h2>
            <p className="text-xl text-gray-700">Learn from a Master of Logic</p>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-50/50 to-gray-50/50 rounded-3xl shadow-2xl overflow-hidden border-2 border-[#2563EB]/20">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={vishalChaurasiaData.image || 'https://placehold.co/600x600/2563EB/FFFFFF?text=Vishal+Chaurasia'}
                  alt={vishalChaurasiaData.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x600/2563EB/FFFFFF?text=Vishal+Chaurasia';
                  }}
                />
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{courseData.instructor?.name}</h3>
                <p className="text-lg text-[#2563EB] font-semibold mb-6">{courseData.instructor?.title}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{courseData.instructor?.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {courseData.instructor?.specialization?.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#2563EB]/10 text-[#2563EB] text-sm rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Skills You'll Develop"
        subtitle="Learning Outcomes"
        description="Transform your thinking with logical reasoning and critical analysis skills"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success Stories"
        subtitle="What Our Students Say"
        description="Hear from students who have mastered logical reasoning through this course"
        maxDisplay={6}
        className="bg-blue-50/20"
      />

      <section className="shloka-section-nyaya">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#2563EB] to-[#1E40AF] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                प्रमाणैरर्थपरीक्षणं न्यायः।
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Nyaya is the examination of objects through valid means of knowledge.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Nyaya Sutras</p>
            </div>
          </div>
        </div>
      </section>

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#2563EB]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Master the Art of Logic and Reasoning</h2>
            <p className="text-center text-gray-700 text-lg mb-8">Join hundreds of students who have developed sharp critical thinking skills through Nyaya philosophy.</p>
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
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
