'use client';
import './samkhya-darshan-landing.css';
import { useCourseData } from '@/lib/hooks/useCourseData';
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

// Default course data (fallback)
const defaultCourseData = {
  id: 'samkhya-darshan',
  title: 'सांख्य दर्शन',
  subtitle: 'Understanding the Philosophy of Samkhya',
  instructor: 'Dr. Priya Sharma',
  language: 'Hindi',
  price: '₹3,499',
  originalPrice: '₹5,999',
  duration: '8 months',
  level: 'Advanced',
  rating: 4.9,
  reviewCount: 89,
  type: 'Premium Course',
  status: 'available',
  checkoutLink: 'https://courses.shikshanam.in/checkout/samkhya-darshan',
  contactNumber: '9910032165'
};

export default function SamkhyaDarshanCoursePage() {
  // Use the custom hook for dynamic course data
  const { courseData, loading, error } = useCourseData('samkhya-darshan', defaultCourseData);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <HeroSection />
      <section className="section-padding bg-gradient-to-b from-parchment to-parchment-light/30">
        <div className="container-custom">
          <WhyCourseSection />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment-light/30 to-parchment">
        <div className="container-custom">
          <CourseHighlights />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment to-parchment-light/20">
        <div className="container-custom">
          <SyllabusSection />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment-light/20 to-parchment">
        <div className="container-custom">
          <GuruSection />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment to-parchment-light/30">
        <div className="container-custom">
          <OutcomesSection />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment-light/30 to-parchment">
        <div className="container-custom">
          <CertificateShowcase />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment to-parchment-light/20">
        <div className="container-custom">
          <TestimonialsSection />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment-light/20 to-parchment">
        <div className="container-custom">
          <FAQSection />
        </div>
      </section>
      <section className="section-padding bg-gradient-to-b from-parchment to-parchment-light/30">
        <div className="container-custom">
          <FinalCTA />
        </div>
      </section>
    </>
  );
}