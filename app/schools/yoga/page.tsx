import type { Metadata } from 'next'
import SchoolOfYogaPage from '@/components/sections/SchoolOfYogaPage'

export const metadata: Metadata = {
  title: 'School of Yoga - Shikshanam | Master the Path of Self-Realization',
  description: 'Transform your life through the eight limbs of yoga. From ethical living to meditation, discover the complete path to inner peace and self-realization.',
  keywords: 'Yoga philosophy, eight limbs, meditation, self-realization, Indian philosophy, Patañjali, Yoga Sūtra, liberation, Kaivalya',
  openGraph: {
    title: 'School of Yoga - Shikshanam',
    description: 'Transform your life through the eight limbs of yoga. From ethical living to meditation, discover the complete path to inner peace.',
    url: 'https://shikshanam.com/schools/yoga',
    images: [
      {
        url: '/og-yoga-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Yoga - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Yoga - Shikshanam',
    description: 'Transform your life through the eight limbs of yoga. From ethical living to meditation, discover the complete path to inner peace.',
    images: ['/og-yoga-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Yoga",
  "description": "Transform your life through the eight limbs of yoga. From ethical living to meditation, discover the complete path to inner peace and self-realization",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Shikshanam",
    "url": "https://shikshanam.com"
  },
  "courseMode": ["Online", "Live Classes", "Self-paced"],
  "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
  "inLanguage": ["English", "Sanskrit"],
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "name": "Yoga Fundamentals",
      "description": "Learn the basic principles and eight limbs of yoga",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "Meditation & Mindfulness",
      "description": "Master meditation techniques and mindfulness practices",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Yoga Sūtra Study",
      "description": "Deep dive into the classical Yoga Sūtra with practical applications",
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
      "name": "School of Darshanas",
      "item": "https://shikshanam.com/schools/darshana"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "School of Yoga",
      "item": "https://shikshanam.com/schools/yoga"
    }
  ]
}

export default function YogaSchoolPage() {
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
      <SchoolOfYogaPage />
    </>
  )
}
