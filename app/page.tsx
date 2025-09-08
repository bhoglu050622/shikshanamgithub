import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import AlignYourself from '@/components/sections/AlignYourself'
import Schools from '@/components/sections/Schools'
import MeetGurus from '@/components/sections/MeetGurus'
import RecognitionTestimonials from '@/components/sections/RecognitionTestimonials'
import Numbers from '@/components/sections/Numbers'
import FoundersMission from '@/components/sections/FoundersMission'
import Contribute from '@/components/sections/Contribute'
import Community from '@/components/sections/Community'
import DownloadAppNew from '@/components/sections/DownloadAppNew'
import Footer from '@/components/Footer'
import IndianPatterns from '@/components/ornaments/IndianPatterns'
import OAuthHandler from '@/components/OAuthHandler'

export default function Home() {
  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300 overflow-x-hidden">
      <OAuthHandler />
      <IndianPatterns />
      <Header />
      <main id="main-content" className="main-container" role="main">
        <Hero />
        <AlignYourself />
        <Schools />
        <MeetGurus />
        <RecognitionTestimonials />
        <Numbers />
        <FoundersMission />
        <Contribute />
        <Community />
        <DownloadAppNew />
      </main>
      <Footer />
    </div>
  )
}
