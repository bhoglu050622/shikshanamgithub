'use client';

import { useState } from 'react';
import './vaisheshik-premium.css';
import { vaisheshikDarshanCourseData } from './courseData';
import {
  HeroVaisheshik,
  FeatureChips,
  DemoModal,
  SyllabusExplorer,
  InstructorCard,
  OutcomesGrid,
  PurchaseCard,
  TestimonialsCarousel,
  FAQAccordion,
} from './components/premium';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function VaisheshikDarshanPremiumPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);

  const courseData = vaisheshikDarshanCourseData;

  const handleDemoClick = (index: number = 0) => {
    setSelectedDemoIndex(index);
    setIsDemoOpen(true);
  };

  const handleEnrollClick = () => {
    window.location.href = courseData.enrollment.checkoutLink;
  };

  return (
    <div className="vaisheshik-premium-page min-h-screen">
      {/* Hero Section */}
      <HeroVaisheshik
        title={courseData.metadata.title}
        subtitle={courseData.metadata.subtitle || ''}
        price={courseData.metadata.price || '₹999'}
        duration={courseData.metadata.duration || '30 Sessions'}
        level={courseData.metadata.level || 'Beginner'}
        language={courseData.metadata.language || 'हिन्दी'}
        onDemoClick={() => handleDemoClick(0)}
        onEnrollClick={handleEnrollClick}
        stats={courseData.stats}
      />

      {/* Feature Chips */}
      <FeatureChips features={courseData.highlights} />

      {/* Demo Section - Highlighted Free Demo */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
            Watch the Free Demo
          </h2>
          <p className="vaisheshik-body-text text-lg mb-8">
            Experience the teaching style before you enroll
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseData.demoVideos?.map((demo, index) => (
              <div
                key={index}
                className="vaisheshik-demo-thumbnail cursor-pointer"
                onClick={() => handleDemoClick(index)}
              >
                <div className="aspect-video bg-gradient-to-br from-[var(--vaisheshik-primary-indigo)] to-[var(--vaisheshik-accent-saffron)] rounded-lg flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <p className="text-sm font-semibold mb-2">{demo.title}</p>
                    <p className="text-xs opacity-90">{demo.duration}</p>
                  </div>
                </div>
                <div className="vaisheshik-demo-play-button">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Layout: Main Content + Sticky Sidebar */}
      <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-8 lg:max-w-7xl lg:mx-auto lg:px-4">
        {/* Main Content */}
        <div className="lg:col-span-1">
          {/* Syllabus Explorer */}
          <SyllabusExplorer
            syllabus={courseData.syllabus}
            onPreviewClick={handleDemoClick}
          />

          {/* What You'll Master */}
          <OutcomesGrid outcomes={courseData.outcomes} />

          {/* Instructor */}
          <InstructorCard instructor={courseData.instructor} />

          {/* Testimonials */}
          <TestimonialsCarousel testimonials={courseData.testimonials} />

          {/* Sacred Shloka Section - Preserved from original */}
          <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, var(--vaisheshik-primary-indigo), var(--vaisheshik-accent-saffron))' }}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed"
                  style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
                >
                  द्रव्यगुणकर्मसामान्यविशेषसमवायानां पदार्थानां साधर्म्यवैधर्म्याभ्यां तत्त्वज्ञानान्निःश्रेयसम्।
                </h2>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-4">
                  Liberation comes from true knowledge of the six categories: substance, quality,
                  action, generality, particularity, and inherence.
                </p>
                <p className="text-white/70 text-sm md:text-base">— Vaisheshika Sutras</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion
            faqs={courseData.faqs}
            contactEmail={courseData.enrollment.contactEmail || 'support@shikshanam.in'}
            contactPhone={courseData.enrollment.contactPhone || '+91-9910032165'}
          />

          {/* Final CTA */}
          <section className="py-16 px-4 bg-gradient-to-br from-[var(--vaisheshik-cream-light)] to-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
                Begin Your Journey into Ancient Wisdom
              </h2>
              <p className="vaisheshik-body-text text-lg mb-8">
                Master the six Padarthas and unlock the secrets of Vaisheshik philosophy
              </p>
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="vaisheshik-cta-primary text-lg px-8 py-4"
              >
                Enroll Now — {courseData.metadata.price}
              </ProtectedExternalLink>
              <p className="text-sm text-[var(--vaisheshik-muted-gray)] mt-4">
                Join thousands of learners on this philosophical journey
              </p>
            </div>
          </section>
        </div>

        {/* Sticky Purchase Card - Desktop Only */}
        <div className="hidden lg:block lg:col-span-1">
          <PurchaseCard
            price={courseData.metadata.price || '₹999'}
            features={courseData.metadata.features}
            checkoutLink={courseData.enrollment.checkoutLink}
            contactEmail={courseData.enrollment.contactEmail || 'support@shikshanam.in'}
            contactPhone={courseData.enrollment.contactPhone || '+91-9910032165'}
            isMobile={false}
          />
        </div>
      </div>

      {/* Mobile Purchase Card - Bottom Sheet */}
      <div className="lg:hidden">
        <PurchaseCard
          price={courseData.metadata.price || '₹999'}
          features={courseData.metadata.features}
          checkoutLink={courseData.enrollment.checkoutLink}
          contactEmail={courseData.enrollment.contactEmail || 'support@shikshanam.in'}
          contactPhone={courseData.enrollment.contactPhone || '+91-9910032165'}
          isMobile={true}
        />
      </div>

      {/* Demo Modal */}
      {courseData.demoVideos && courseData.demoVideos[selectedDemoIndex] && (
        <DemoModal
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          video={courseData.demoVideos[selectedDemoIndex]}
        />
      )}
    </div>
  );
}
