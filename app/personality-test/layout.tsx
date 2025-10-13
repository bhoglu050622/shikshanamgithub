import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Personality Tests | Shikshanam - Ancient Wisdom Meets Modern Insight',
  description: 'Discover your inner nature through our comprehensive personality assessments. Take the Guna Profiler or How Aligned Are You test to gain insights based on ancient Vedic wisdom.',
  keywords: [
    'personality test',
    'guna profiler',
    'spiritual alignment',
    'vedic personality assessment',
    'sattva rajas tamas',
    'consciousness test',
    'ancient wisdom',
    'self-discovery',
    'spiritual growth',
    'personality assessment'
  ],
  openGraph: {
    title: 'Personality Tests | Shikshanam',
    description: 'Discover your inner nature through ancient wisdom and modern insights. Choose from our comprehensive personality assessments.',
    type: 'website',
    url: 'https://shikshanam.in/personality-test',
    images: [
      {
        url: '/assets/personality-test-og.png',
        width: 1200,
        height: 630,
        alt: 'Shikshanam Personality Tests'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personality Tests | Shikshanam',
    description: 'Discover your inner nature through ancient wisdom and modern insights.',
    images: ['/assets/personality-test-og.png']
  },
  alternates: {
    canonical: 'https://shikshanam.in/personality-test'
  }
}

export default function PersonalityTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

