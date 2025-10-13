import Hero from '@/components/sections/Hero'
import AlignYourself from '@/components/sections/AlignYourself'
import Schools from '@/components/sections/Schools'
import MeetGurus from '@/components/sections/MeetGurus'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import JoinCommunity from '@/components/sections/JoinCommunity'
import FoundersMission from '@/components/sections/FoundersMission'
import Contribute from '@/components/sections/Contribute'
import DownloadAppNew from '@/components/sections/DownloadAppNew'
import FAQ from '@/components/sections/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <AlignYourself />
      <Schools />
      <MeetGurus />
      <TestimonialsSection />
      <JoinCommunity />
      <FoundersMission />
      <Contribute />
      <DownloadAppNew />
      <FAQ />
    </>
  )
}