'use client';

import { useEffect, useState } from 'react';
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

export default function KashmirShaivismPage() {
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
