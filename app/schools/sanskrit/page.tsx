import type { Metadata } from 'next'
import SchoolOfSanskritPage from '@/components/sections/SchoolOfSanskritPage'

export const metadata: Metadata = {
  title: 'Unlock the Language of the Gods - Shikshanam | Learn Sanskrit Online',
  description: 'Master Sanskrit through structured learning paths, live classes, and AI-powered practice. Unlock the Language of the Gods for grammar, conversation, and spiritual wisdom.',
  keywords: 'Sanskrit learning, Sanskrit grammar, Sanskrit conversation, Devanagari, Vedic knowledge, Sanskrit courses, Sanskrit teachers',
  openGraph: {
    title: 'Unlock the Language of the Gods - Shikshanam',
    description: 'Master Sanskrit through structured learning paths, live classes, and AI-powered practice.',
    url: 'https://shikshanam.com/schools/sanskrit',
    images: [
      {
        url: '/og-sanskrit-school.jpg',
        width: 1200,
        height: 630,
        alt: 'Unlock the Language of the Gods - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlock the Language of the Gods - Shikshanam',
    description: 'Master Sanskrit through structured learning paths, live classes, and AI-powered practice.',
    images: ['/og-sanskrit-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Unlock the Language of the Gods",
  "description": "Comprehensive Sanskrit learning program covering grammar, conversation, and spiritual wisdom",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Shikshanam",
    "url": "https://shikshanam.com"
  },
  "courseMode": ["Online", "Live Classes", "Self-paced"],
  "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
  "inLanguage": ["Sanskrit", "English"],
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "Sanskrit Grammar Foundation",
      "description": "Master Sanskrit grammar with structured lessons on declensions, conjugations, and sentence formation",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "Sanskrit Conversation Practice",
      "description": "Develop speaking skills through guided conversations and pronunciation practice",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Living Sanskrit",
      "description": "Experience Sanskrit as a living language through advanced conversations and spiritual discourse",
      "courseMode": "Live Classes", 
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
      "name": "Unlock the Language of the Gods",
      "item": "https://shikshanam.com/schools/sanskrit"
    }
  ]
}

export default function SanskritSchoolPage() {
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
      <SchoolOfSanskritPage />
    </>
  )
}
