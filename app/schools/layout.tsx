import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schools - Shikshanam | Ancient Knowledge Learning',
  description: 'Explore our specialized schools for Sanskrit, Darshanas, and Self-help. Structured learning paths with expert guidance.',
  openGraph: {
    title: 'Schools - Shikshanam',
    description: 'Explore our specialized schools for Sanskrit, Darshanas, and Self-help.',
    url: 'https://shikshanam.com/schools',
  },
}

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
