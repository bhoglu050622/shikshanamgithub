import Script from 'next/script';
import CountdownHeader from './components/CountdownHeader';
import HeroSection from './components/HeroSection';
import PopupWidget from './components/PopupWidget';
import InteractiveFlashcards from './components/InteractiveFlashcards';
import CourseInfoSection from './components/CourseInfoSection';
import MasterTeachersSection from './components/MasterTeachersSection';
import BonusFeaturesSection from './components/BonusFeaturesSection';
import CourseCurriculumSection from './components/CourseCurriculumSection';
import FoundersMissionSection from './components/FoundersMissionSection';
import PricingSection from './components/PricingSection';
import ShlokaSection from './components/ShlokaSection';
import './sanskrit-live-class-landing.css';
import './additional-sections.css';

export default function SanskritLiveClassPage() {
  return (
    <>
      {/* Font Awesome for Icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        crossOrigin="anonymous"
      />
      
      <div className="min-h-screen bg-[#fcf8f3]">
        <CountdownHeader />
        <HeroSection />
        <InteractiveFlashcards />
        <CourseInfoSection />
        <MasterTeachersSection />
        <BonusFeaturesSection />
        <CourseCurriculumSection />
        <PricingSection />
        <FoundersMissionSection />
        <ShlokaSection />
        <PopupWidget />
      </div>
    </>
  );
}
