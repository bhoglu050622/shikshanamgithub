'use client'

import { useState } from 'react'
import SanskritHero from './SanskritHero'
import FlashcardGrid from './FlashcardGrid'
import SequentialPath from './SequentialPath'
import SanskritQuizModal from './SanskritQuizModal'
import MeetGurus from './MeetGurus'
import DownloadAppNew from './DownloadAppNew'
import JoinCommunity from './JoinCommunity'
import FAQ from './FAQ'

export default function SchoolOfSanskritPage() {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | null>(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  const handlePathSelection = (path: 'beginner' | 'intermediate') => {
    setSelectedLevel(path)
  }

  return (
    <>
      {/* Hero Section */}
      <SanskritHero 
        onQuizClick={() => setIsQuizOpen(true)}
        onPathSelection={handlePathSelection}
      />
      
      {/* Quiz Modal */}
      <SanskritQuizModal 
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
      
      {/* Play & Learn Section */}
      <div id="play-learn">
        <FlashcardGrid />
      </div>
      
      {/* Recommended Courses - Sequential Path */}
      <div id="recommended-courses">
        <SequentialPath selectedLevel={selectedLevel} />
      </div>
      
      {/* Meet Your Gurus Section */}
      <MeetGurus />
      
      {/* Homepage-Style Sections */}
      <DownloadAppNew />
      <JoinCommunity />
      <FAQ />
    </>
  )
}
