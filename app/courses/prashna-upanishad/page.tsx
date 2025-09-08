'use client';

import './prashna-upanishad-landing.css';
import HeroSection from './components/HeroSection';
import WhyCourseSection from './components/WhyCourseSection';
import CourseHighlights from './components/CourseHighlights';
import SyllabusSection from './components/SyllabusSection';
import GuruSection from './components/GuruSection';
import OutcomesSection from './components/OutcomesSection';
import CertificateShowcase from './components/CertificateShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';

export default function PrashnaUpanishadPage() {
  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden">
      <HeroSection />
      
      <section className="section-padding bg-gradient-to-b from-parchment-ivory to-sand-beige/30">
        <div className="container-custom">
          <WhyCourseSection />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-sand-beige/30 to-parchment-ivory">
        <div className="container-custom">
          <CourseHighlights />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-parchment-ivory to-sand-beige/30">
        <div className="container-custom">
          <SyllabusSection />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-sand-beige/30 to-parchment-ivory">
        <div className="container-custom">
          <GuruSection />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-parchment-ivory to-sand-beige/30">
        <div className="container-custom">
          <OutcomesSection />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-sand-beige/30 to-parchment-ivory">
        <div className="container-custom">
          <CertificateShowcase />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-parchment-ivory to-sand-beige/30">
        <div className="container-custom">
          <TestimonialsSection />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-sand-beige/30 to-parchment-ivory">
        <div className="container-custom">
          <FAQSection />
        </div>
      </section>
      
      <section className="section-padding bg-gradient-to-b from-parchment-ivory to-sand-beige/30">
        <div className="container-custom">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
