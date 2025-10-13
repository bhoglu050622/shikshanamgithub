'use client';

import { useState } from 'react';
import './isha-upanishad-premium.css';
import '../_shared/course-landing.css';
import { ishaUpanishadCourseData } from './courseData';
import {
  HeroIsha,
  FeatureChips,
  DemoCarousel,
  SyllabusGrid,
  InstructorCard,
  PurchaseCard,
  FAQAccordion,
  TestimonialsCarousel
} from './components/premium';
import { OutcomesTemplate } from '../_shared/sections';
import { CourseSectionHeader, CourseFeatureGrid } from '../_shared/components';
import { Sparkles, Sun, Heart, Compass, ArrowRight } from 'lucide-react';

export default function IshaUpanishadPage() {
  const courseData = ishaUpanishadCourseData;
  const [showDemoModal, setShowDemoModal] = useState(false);

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
    <div className="min-h-screen isha-premium-page">
      {/* Hero Section with Demo */}
      <HeroIsha onDemoClick={() => setShowDemoModal(true)} />

      {/* Feature Chips - Horizontal Scroll */}
      <FeatureChips />

      {/* Demo Carousel Section */}
      <DemoCarousel />

      {/* Why Study Section */}
      <section id="course-details" className="course-section bg-gradient-to-b from-white to-[#FFF9F2]">
        <div className="course-container">
          <CourseSectionHeader
            subtitle="Ancient Wisdom for Modern Living"
            title="Why Study Isha Upanishad?"
            description={courseData.whyCourse?.description}
            centered={true}
          />
          <CourseFeatureGrid features={whyFeatures} columns={4} />
          
          <div className="mt-16 course-card-premium bg-gradient-to-br from-[#FFF9F2] to-[#FAF7F2] border-2 border-[#D97B2A]/20">
            <h3 className="course-heading-3 text-center text-[#0D3B4A] mb-8">
              The Perfect Philosophy for Householders
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.whyCourse?.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-[#D97B2A] flex-shrink-0 mt-1" />
                  <span className="course-body text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Grid (Desktop) & Accordion (Mobile) */}
      <SyllabusGrid />

      {/* Learning Outcomes */}
      <OutcomesTemplate
        outcomes={courseData.outcomes}
        title="Transform Your Life"
        subtitle="Learning Outcomes"
        description="Discover practical wisdom that brings peace and freedom to daily living"
        className="bg-white"
      />

      {/* Instructor Card */}
      <InstructorCard />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Sacred Shloka Section */}
      <section className="shloka-section-isha py-16 px-4 bg-gradient-to-b from-[#FFF9F2] to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#0D3B4A] to-[#1A5568] rounded-3xl p-8 md:p-12 shadow-2xl">
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

      {/* FAQ Accordion with Search */}
      <FAQAccordion />

      {/* Sticky Purchase Card - Hidden on mobile (shows as bottom sheet) */}
      <div className="hidden lg:block fixed right-8 top-24 w-80 z-40">
        <PurchaseCard />
      </div>

      {/* Mobile Purchase Card - Bottom Sheet */}
      <div className="lg:hidden">
        <PurchaseCard />
      </div>
    </div>
  );
}
