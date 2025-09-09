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
import IndianPatterns from '@/components/ornaments/IndianPatterns'
import OAuthHandler from '@/components/OAuthHandler'

export default function Home() {
  return (
    <>
      <OAuthHandler />
      <IndianPatterns />
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
    </>
  )
}
