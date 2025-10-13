'use client'

import dynamic from 'next/dynamic'

const MarketingDashboard = dynamic(
  () => import('./MarketingDashboard'),
  { ssr: false }
)

export default function MarketingPage() {
  return <MarketingDashboard />
}

