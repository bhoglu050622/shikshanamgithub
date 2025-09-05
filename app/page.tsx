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
import Footer from '@/components/Footer'
import IndianPatterns from '@/components/ornaments/IndianPatterns'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white-500 via-sand-500 to-sand-400 dark:from-wisdom-900 dark:via-wisdom-800 dark:to-wisdom-900 transition-colors duration-300">
      <IndianPatterns />
      <Header />
      <main className="main-container" role="main">
        <Hero />
        <AlignYourself />
        <Schools />
        <MeetGurus />
        <RecognitionTestimonials />
        <Numbers />
        <FoundersMission />
        <Contribute />
        <Community />
      </main>
      <Footer />
    </div>
  )
}
