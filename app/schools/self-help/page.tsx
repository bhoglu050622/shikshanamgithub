import type { Metadata } from 'next'
import SchoolOfSelfHelpPage from '@/components/sections/SchoolOfSelfHelpPage'

export const metadata: Metadata = {
  title: 'School of Self-Help - Shikshanam | Transform Your Life with Ancient Wisdom',
  description: 'Discover practical self-help through Indian wisdom traditions. Learn emotional intelligence, leadership, and personal growth with timeless principles.',
  keywords: 'self-help, personal growth, emotional intelligence, leadership, Indian wisdom, Chanakya, Samkhya, Kashmir Shaiva, life transformation',
  openGraph: {
    title: 'School of Self-Help - Shikshanam',
    description: 'Transform your life with ancient Indian wisdom. Learn emotional intelligence, leadership, and personal growth.',
    url: 'https://shikshanam.com/schools/self-help',
    images: [
      {
        url: '/og-self-help-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Self-Help - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Self-Help - Shikshanam',
    description: 'Transform your life with ancient Indian wisdom. Learn emotional intelligence, leadership, and personal growth.',
    images: ['/og-self-help-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Self-Help",
  "description": "Transform your life through ancient Indian wisdom traditions including Chanakya's leadership principles, Samkhya philosophy, and Kashmir Shaiva practices",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Shikshanam",
    "url": "https://shikshanam.com"
  },
  "courseMode": ["Online", "Live Classes", "Self-paced"],
  "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
  "inLanguage": ["English"],
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "Entrepreneurship & Leadership through Chanakya's Principles",
      "description": "Master leadership and business skills through ancient Indian wisdom and practical application",
      "courseMode": "Online",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance", 
      "name": "Emotional Intelligence through Sāṅkhya Darśana",
      "description": "Develop emotional intelligence and self-awareness through Samkhya philosophy",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance",
      "name": "Emotional Intelligence through Kashmir Shaiva Darśana",
      "description": "Advanced emotional intelligence through Kashmir Shaiva philosophy and practices",
      "courseMode": "Online", 
      "educationalLevel": "Advanced"
    }
  ]
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://shikshanam.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Schools",
      "item": "https://shikshanam.com/schools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "School of Self-Help",
      "item": "https://shikshanam.com/schools/self-help"
    }
  ]
}

export default function SelfHelpSchoolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      <SchoolOfSelfHelpPage />
    </>
  )
}
