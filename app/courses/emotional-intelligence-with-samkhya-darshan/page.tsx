'use client'

import { useEffect, useState } from 'react'
import './emotional-intelligence-landing.css'
import CountdownHeader from './components/CountdownHeader'
import HeroSection from './components/HeroSection'
import EQCourseInfoWidget from './components/EQCourseInfoWidget'
import PopupWidget from './components/PopupWidget'
import StruggleSection from './components/StruggleSection'
import MasterTeachersSection from './components/MasterTeachersSection'
import CreatorReviewSection from './components/CreatorReviewSection'
import BonusFeaturesSection from './components/BonusFeaturesSection'
import ExploreWisdomSection from './components/ExploreWisdomSection'
import GunaProfilerSection from './components/GunaProfilerSection'
import FoundersMissionSection from './components/FoundersMissionSection'
import CourseCurriculumSection from './components/CourseCurriculumSection'
import EmotionalMasteryPricing from './components/EmotionalMasteryPricing'
import FAQSection from './components/FAQSection'

export default function EmotionalIntelligenceLanding() {
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsPopupVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden">
      {/* Countdown Header */}
      <CountdownHeader />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* EQ Course Info Widget */}
      <section className="section-padding bg-parchment-ivory">
        <div className="container-custom">
          <EQCourseInfoWidget />
        </div>
      </section>
      
      {/* Popup Widget */}
      {isPopupVisible && (
        <PopupWidget onClose={() => setIsPopupVisible(false)} />
      )}
      
      {/* Struggle Section */}
      <section className="section-padding">
        <div className="container-custom">
          <StruggleSection />
        </div>
      </section>
      
      {/* Master Teachers Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <MasterTeachersSection />
        </div>
      </section>
      
      {/* Creator Review Section */}
      <section className="section-padding">
        <div className="container-custom">
          <CreatorReviewSection />
        </div>
      </section>
      
      {/* Bonus Features Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <BonusFeaturesSection />
        </div>
      </section>
      
      {/* Explore the Wisdom Section */}
      <section className="section-padding">
        <div className="container-custom">
          <ExploreWisdomSection />
        </div>
      </section>
      
      {/* Guna Profiler Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <GunaProfilerSection />
        </div>
      </section>
      
      {/* Founder's Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <FoundersMissionSection />
        </div>
      </section>
      
      {/* Course Curriculum Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <CourseCurriculumSection />
        </div>
      </section>
      
      {/* Emotional Mastery Pricing Section */}
      <section className="section-padding">
        <div className="container-custom">
          <EmotionalMasteryPricing />
        </div>
      </section>
      
      {/* Shloka Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-temple-gold to-copper-orange rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-6 mb-6">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2024/03/logo-white-1.png" 
                alt="Shikshanam Logo" 
                className="w-12 h-12 opacity-90"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="w-px h-16 bg-white/50"></div>
              <div className="text-left">
                <p className="text-2xl text-white font-medium mb-2 font-tiro-devanagari">दु:खेष्वनुद्विग्नमना: सुखेषु विगतस्पृह:।</p>
                <p className="text-2xl text-white font-medium mb-4 font-tiro-devanagari">वीतरागभयक्रोध: स्थितधीर्मुनिरुच्यते॥</p>
                <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
                  One whose mind remains undisturbed amidst misery, who does not crave for pleasure, and who is free from attachment, fear, and anger, is called stable of mind.
                </p>
              </div>
            </div>
            <button 
              className="btn-shikshanam-primary text-lg px-8 py-4"
              onClick={() => {
                const pricingSection = document.getElementById('emotional-mastery-pricing-container');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <FAQSection />
        </div>
      </section>
    </div>
  )
}
