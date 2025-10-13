'use client';

import './vaisheshik-darshan-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import { vaisheshikDarshanCourseData } from './courseData';
import {
  HighlightsTemplate,
  SyllabusTemplate,
  InstructorTemplate,
  OutcomesTemplate,
  TestimonialsTemplate,
  FAQTemplate,
} from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Atom, Layers, Zap, Microscope } from 'lucide-react';
import PhilosophyFlashcards from '../_shared/components/PhilosophyFlashcards';
import { vaisheshikDarshanFlashcards } from '@/lib/courses/flashcardData';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import Image from 'next/image';
import { vishalChaurasiaData } from '@/lib/courses/instructorData';

export default function VaisheshikDarshanCoursePage() {
  const courseData = vaisheshikDarshanCourseData;

  const whyFeatures = [
    {
      icon: Atom,
      title: 'Ancient Atomic Theory',
      description: 'Discover the sophisticated Indian atomic theory that predates modern physics'
    },
    {
      icon: Layers,
      title: 'Six Categories',
      description: 'Master the systematic categorization of all reality'
    },
    {
      icon: Zap,
      title: 'Metaphysics & Physics',
      description: 'Explore the nature of substance, quality, and action'
    },
    {
      icon: Microscope,
      title: 'Ancient Science',
      description: 'Bridge ancient wisdom with modern scientific understanding'
    }
  ];

  return (
    <div className="min-h-screen">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossOrigin="anonymous" />

      <HeroSection />

      <PhilosophyFlashcards 
        flashcards={vaisheshikDarshanFlashcards}
        title="वैशेषिक दर्शन के मूल सिद्धांत"
        subtitle="Core Concepts of Atomic Philosophy - Click to Reveal"
        className="vaisheshik-flashcards"
      />

      <section id="course-details" className="course-section bg-gradient-to-b from-white to-emerald-50/20">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Indian Physics & Metaphysics"
            title="Why Study Vaisheshika Darshan?"
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
        description="Comprehensive training in ancient atomic theory and category system"
        columns={3}
        className="bg-white"
      />

      <SyllabusTemplate
        syllabus={courseData.syllabus}
        title="Complete Curriculum"
        subtitle="Systematic Learning Path"
        description="Master Vaisheshika philosophy from fundamentals to atomic theory"
        defaultOpen={[0]}
        className="bg-emerald-50/20"
      />

      <section className="instructor-section-vaisheshik">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#10B981] mb-4" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
              आचार्य परिचय
            </h2>
            <p className="text-xl text-gray-700">Learn from a Master of Atomic Philosophy</p>
          </div>

          <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 rounded-3xl shadow-2xl overflow-hidden border-2 border-[#10B981]/20">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={vishalChaurasiaData.image || 'https://placehold.co/600x600/10B981/FFFFFF?text=Vishal+Chaurasia'}
                  alt={vishalChaurasiaData.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/600x600/10B981/FFFFFF?text=Vishal+Chaurasia';
                  }}
                />
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{courseData.instructor?.name}</h3>
                <p className="text-lg text-[#10B981] font-semibold mb-6">{courseData.instructor?.title}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">{courseData.instructor?.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {courseData.instructor?.specialization?.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-[#10B981]/10 text-[#10B981] text-sm rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Knowledge You'll Gain"
        subtitle="Learning Outcomes"
        description="Develop systematic understanding of reality through ancient wisdom"
        className="bg-white"
      />

      <TestimonialsTemplate
        testimonials={courseData.testimonials}
        title="Student Success"
        subtitle="What Our Students Say"
        description="Hear from learners amazed by ancient Indian atomic theory"
        maxDisplay={6}
        className="bg-emerald-50/20"
      />

      <section className="shloka-section-vaisheshik">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed" style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}>
                द्रव्यगुणकर्मसामान्यविशेषसमवायानां पदार्थानां साधर्म्यवैधर्म्याभ्यां तत्त्वज्ञानान्निःश्रेयसम्।
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                Liberation comes from true knowledge of the six categories: substance, quality, action, generality, particularity, and inherence.
              </p>
              <p className="text-white/70 text-sm md:text-base mt-4">— Vaisheshika Sutras</p>
            </div>
          </div>
        </div>
      </section>

      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      <section className="course-section bg-gradient-to-br from-emerald-50 via-white to-cyan-50">
        <div className="course-container">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#10B981]/20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">Master Ancient Indian Physics & Metaphysics</h2>
            <p className="text-center text-gray-700 text-lg mb-8">Discover the sophisticated category system and atomic theory that predates modern science.</p>
            <div className="flex justify-center mb-8">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-10 py-4 bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white font-bold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-2"
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
