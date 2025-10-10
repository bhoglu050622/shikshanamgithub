import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import {
  AlignYourselfSkeleton,
  SchoolsSkeleton,
  MeetGurusSkeleton,
  CommunityPostsSkeleton,
  FoundersMissionSkeleton,
  ContributeSkeleton,
  DownloadAppSkeleton,
  FAQSkeleton,
} from '@/components/optimization/LoadingSkeletons'

// Dynamic imports for below-the-fold components with enhanced loading skeletons
const AlignYourself = dynamic(() => import('@/components/sections/AlignYourself'), {
  loading: () => <AlignYourselfSkeleton />,
  ssr: true
})

const Schools = dynamic(() => import('@/components/sections/Schools'), {
  loading: () => <SchoolsSkeleton />,
  ssr: true
})

const MeetGurus = dynamic(() => import('@/components/sections/MeetGurus'), {
  loading: () => <MeetGurusSkeleton />,
  ssr: true
})

const CommunityPostsSection = dynamic(() => import('@/components/sections/CommunityPostsSection'), {
  loading: () => <CommunityPostsSkeleton />,
  ssr: true
})

const FoundersMission = dynamic(() => import('@/components/sections/FoundersMission'), {
  loading: () => <FoundersMissionSkeleton />,
  ssr: true
})

const Contribute = dynamic(() => import('@/components/sections/Contribute'), {
  loading: () => <ContributeSkeleton />,
  ssr: true
})

const DownloadAppNew = dynamic(() => import('@/components/sections/DownloadAppNew'), {
  loading: () => <DownloadAppSkeleton />,
  ssr: true
})

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <FAQSkeleton />,
  ssr: true
})

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Above the fold, loads immediately */}
      <Hero />
      
      {/* Below the fold sections - Lazy loaded with skeletons */}
      <AlignYourself />
      <Schools />
      <MeetGurus />
      <CommunityPostsSection />
      <FoundersMission />
      <Contribute />
      <DownloadAppNew />
      <FAQ />
    </main>
  )
}