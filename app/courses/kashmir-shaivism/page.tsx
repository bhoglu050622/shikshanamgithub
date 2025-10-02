'use client';

import { useEffect, useState } from 'react';
import { useCourseData } from '@/lib/hooks/useCourseData';
import HeroSection from './components/HeroSection';
import QuizPopup from './components/QuizPopup';
import QuizSection from './components/QuizSection';
import InfoSection from './components/InfoSection';
import StatsSection from './components/StatsSection';
import TeacherSection from './components/TeacherSection';
import BonusFeaturesSection from './components/BonusFeaturesSection';
import SyllabusSection from './components/SyllabusSection';
import QuizInvitationSection from './components/QuizInvitationSection';
import FoundersMissionSection from './components/FoundersMissionSection';
import ShlokaSection from './components/ShlokaSection';
import PricingSection from './components/PricingSection';
import './kashmir-shaivism-landing.css';

// Default course data (fallback)
const defaultCourseData = {
  id: 'kashmir-shaivism',
  title: 'कश्मीर शैव दर्शन',
  subtitle: 'The Philosophy of Recognition and Consciousness',
  instructor: 'Dr. Vishal Chaurasia',
  language: 'Hindi',
  price: '₹3,499',
  originalPrice: '₹5,999',
  duration: '6 months',
  level: 'Advanced',
  rating: 4.9,
  reviewCount: 134,
  type: 'Premium Course',
  status: 'available',
  checkoutLink: 'https://courses.shikshanam.in/checkout/kashmir-shaivism',
  contactNumber: '9910032165'
};

export default function KashmirShaivismPage() {
  // Use the custom hook for dynamic course data
  const { courseData, loading, error } = useCourseData('kashmir-shaivism', defaultCourseData);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 1.5 seconds
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => {
      clearTimeout(popupTimer);
    };
  }, []);

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
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden">
      <HeroSection onShowPopup={() => setShowPopup(true)} />
      
      <QuizSection />
      
      <InfoSection />
      
      <StatsSection />
      
      <TeacherSection />
      
      <BonusFeaturesSection />
      
      <SyllabusSection />
      
      <QuizInvitationSection />
      
      <FoundersMissionSection />
      
      <ShlokaSection />
      
      <PricingSection />
      
      <QuizPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}
