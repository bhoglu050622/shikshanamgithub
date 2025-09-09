'use client'

import SanskritHero from './SanskritHero'
import FlashcardGrid from './FlashcardGrid'
import SequentialPath from './SequentialPath'
import MeetGurus from './MeetGurus'
import AIClockWidget from './AIClockWidget'
import ResourcesTreasury from './ResourcesTreasury'


export default function SchoolOfSanskritPage() {
  return (
    <>
      
      {/* Hero Section */}
      <SanskritHero />
      
      {/* Play & Learn Section */}
      <div id="play-learn">
        <FlashcardGrid />
      </div>
      
      {/* Sequential Path Section */}
      <SequentialPath />
      
      {/* Meet Your Gurus Section */}
      <MeetGurus />
      
      {/* AI Clock Widget Section */}
      <AIClockWidget />
      
      {/* Resources & Treasury Section */}
      <ResourcesTreasury />
      
    </>
  )
}
