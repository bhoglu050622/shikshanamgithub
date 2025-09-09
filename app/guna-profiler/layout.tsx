import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guṇa Profiler | Discover Your Vedic Personality Type',
  description: 'Discover your inner nature through ancient Vedic wisdom. Take our comprehensive assessment to understand your unique mix of Sattva, Rajas, and Tamas.',
  keywords: ['Guna profiler', 'Vedic personality', 'Sattva Rajas Tamas', 'ancient wisdom', 'self-discovery', 'spiritual assessment'],
  openGraph: {
    title: 'Guṇa Profiler | Shikshanam',
    description: 'Discover your inner nature through ancient Vedic wisdom',
    type: 'website',
    url: 'https://shikshanam.in/guna-profiler',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guṇa Profiler | Shikshanam',
    description: 'Discover your inner nature through ancient Vedic wisdom',
  },
}

export default function GunaProfilerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
