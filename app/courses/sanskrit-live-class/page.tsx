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
    <div className="min-h-screen bg-[#fcf8f3]">
      <CountdownHeader />
      <HeroSection />
      <InteractiveFlashcards />
      <CourseInfoSection />
      <MasterTeachersSection />
      <BonusFeaturesSection />
      <CourseCurriculumSection />
      <FoundersMissionSection />
      <PricingSection />
      <ShlokaSection />
      <PopupWidget />
    </div>
  );
}
