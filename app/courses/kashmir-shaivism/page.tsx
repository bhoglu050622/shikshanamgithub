'use client';

import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import CountdownHeader from './components/CountdownHeader';
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
      <CountdownHeader />
      <HeroSection onShowPopup={() => setShowPopup(true)} />
      
      <section className="section-padding">
        <div className="container-custom">
          <QuizSection />
        </div>
      </section>
      
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <InfoSection />
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container-custom">
          <StatsSection />
        </div>
      </section>
      
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <TeacherSection />
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container-custom">
          <BonusFeaturesSection />
        </div>
      </section>
      
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <SyllabusSection />
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container-custom">
          <QuizInvitationSection />
        </div>
      </section>
      
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <FoundersMissionSection />
        </div>
      </section>
      
      <section className="section-padding">
        <div className="container-custom">
          <ShlokaSection />
        </div>
      </section>
      
      <QuizPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
}
