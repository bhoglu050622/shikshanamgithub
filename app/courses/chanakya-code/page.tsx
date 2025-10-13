'use client';

import './chanakya-code-landing.css';
import '../_shared/course-landing.css';
import HeroSection from './components/HeroSection';
import BenefitGrid from './components/BenefitGrid';
import HowItWorksTimeline from './components/HowItWorksTimeline';
import ToolkitStats from './components/ToolkitStats';
import PurchaseCard from './components/PurchaseCard';
import ModuleSyllabus from './components/ModuleSyllabus';
import InstructorSection from './components/InstructorSection';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import FinalCTA from './components/FinalCTA';
import { chanakyaCodeCourseData } from './courseData';
import { OutcomesTemplate, FAQTemplate } from '../_shared/sections';

export default function ChanakyaCodeCoursePage() {
  const courseData = chanakyaCodeCourseData;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section */}
      <HeroSection />

      {/* Benefits Grid */}
      <BenefitGrid />

      {/* How It Works Timeline */}
      <HowItWorksTimeline />

      {/* Toolkit Stats Strip */}
      <ToolkitStats />

      {/* Main Content with Sticky Purchase Card */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* Learning Outcomes */}
              <OutcomesTemplate
                outcomes={courseData.outcomes}
                title="Transform Your Career"
                subtitle="Learning Outcomes"
                description="Master these critical skills with Chanakya's proven frameworks"
                className="bg-transparent"
              />
            </div>

            {/* Sticky Purchase Card Column */}
            <div className="lg:col-span-1">
              <PurchaseCard />
            </div>
          </div>
        </div>
      </div>

      {/* 10 Secret Chanakya Codes - Full Width */}
      <ModuleSyllabus />

      {/* Instructor Section */}
      <InstructorSection />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Sanskrit Shloka Section */}
      <section className="shloka-section-chanakya">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#0B2B3A] to-[#D87A2B] rounded-3xl p-8 md:p-12 shadow-2xl">
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

      {/* FAQ Section */}
      <FAQTemplate
        faqs={courseData.faqs}
        className="bg-white"
      />

      {/* Final CTA with Certificate */}
      <FinalCTA />
    </div>
  );
}
