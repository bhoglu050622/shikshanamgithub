import type { Metadata } from 'next'
import SchoolOfVedantaPage from '@/components/sections/SchoolOfVedantaPage'

export const metadata: Metadata = {
  title: 'School of Vedānta - Shikshanam | Master the Ultimate Reality',
  description: 'Discover the non-dual nature of existence through Vedānta philosophy. Understand that the Self and the Absolute are one, leading to profound spiritual realization.',
  keywords: 'Vedānta philosophy, non-duality, Brahman, Ātman, Indian philosophy, Bādarāyaṇa, Brahma Sūtra, liberation, Mokṣa',
  openGraph: {
    title: 'School of Vedānta - Shikshanam',
    description: 'Discover the non-dual nature of existence through Vedānta philosophy. Understand that the Self and the Absolute are one.',
    url: 'https://shikshanam.com/schools/vedanta',
    images: [
      {
        url: '/og-vedanta-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Vedānta - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Vedānta - Shikshanam',
    description: 'Discover the non-dual nature of existence through Vedānta philosophy. Understand that the Self and the Absolute are one.',
    images: ['/og-vedanta-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Vedānta",
  "description": "Discover the non-dual nature of existence through Vedānta philosophy. Understand that the Self and the Absolute are one, leading to profound spiritual realization",
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
      "name": "Vedānta Fundamentals",
      "description": "Learn the basic principles of non-duality and ultimate reality",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "Self-Realization",
      "description": "Master the understanding of the Self and its relationship to the Absolute",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Brahma Sūtra Study",
      "description": "Deep dive into the classical Brahma Sūtra with practical applications",
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
      "name": "School of Vedānta",
      "item": "https://shikshanam.com/schools/vedanta"
    }
  ]
}

export default function VedantaSchoolPage() {
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
      <SchoolOfVedantaPage />
    </>
  )
}
