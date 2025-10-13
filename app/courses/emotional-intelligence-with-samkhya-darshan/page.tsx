'use client'

import HeroSection from './components/HeroSection'
import StruggleSection from './components/StruggleSection'
import MasterTeachersSection from './components/MasterTeachersSection'
import ReviewSection from './components/ReviewSection'
import BonusFeaturesSection from './components/BonusFeaturesSection'
import VideoGallerySection from './components/VideoGallerySection'
import CurriculumSection from './components/CurriculumSection'
import PricingSection from './components/PricingSection'
import ShlokaSection from './components/ShlokaSection'

export default function EmotionalIntelligenceCoursePage() {
  return (
    <div className="min-h-screen bg-[#fdfaf6]">
      <HeroSection />
      <StruggleSection />
      <MasterTeachersSection />
      <ReviewSection />
      <BonusFeaturesSection />
      <VideoGallerySection />
      <CurriculumSection />
      <PricingSection />
      <ShlokaSection />
    </div>
  )
}
