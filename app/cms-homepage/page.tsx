import CMSHero from '@/components/sections/CMSHero'
import CMSAlignYourself from '@/components/sections/CMSAlignYourself'
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

export default function CMSHomepage() {
  return (
    <>
      <CMSHero />
      <CMSAlignYourself />
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
