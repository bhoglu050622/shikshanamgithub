import Hero from '@/components/sections/Hero'
import AlignYourself from '@/components/sections/AlignYourself'
import Schools from '@/components/sections/Schools'
import MeetGurus from '@/components/sections/MeetGurus'
import StudentStoriesSection from '@/components/sections/StudentStoriesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CommunityPostsSection from '@/components/sections/CommunityPostsSection'
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
      <StudentStoriesSection />
      <TestimonialsSection />
      <CommunityPostsSection />
      <FoundersMission />
      <Contribute />
      <DownloadAppNew />
      <FAQ />
    </>
  )
}