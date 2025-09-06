import type { Metadata } from 'next'
import SchoolOfSamkhyaPage from '@/components/sections/SchoolOfSamkhyaPage'

export const metadata: Metadata = {
  title: 'School of Sāṅkhya - Shikshanam | Master the Map of Consciousness',
  description: 'Discover the profound understanding of consciousness and matter through Sāṅkhya philosophy. Learn about the 24 principles (tattvas) that make up reality.',
  keywords: 'Sāṅkhya philosophy, consciousness, matter, tattvas, Puruṣa, Prakṛti, Indian philosophy, liberation, Kaivalya',
  openGraph: {
    title: 'School of Sāṅkhya - Shikshanam',
    description: 'Discover the profound understanding of consciousness and matter through Sāṅkhya philosophy.',
    url: 'https://shikshanam.com/schools/samkhya',
    images: [
      {
        url: '/og-samkhya-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Sāṅkhya - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Sāṅkhya - Shikshanam',
    description: 'Discover the profound understanding of consciousness and matter through Sāṅkhya philosophy.',
    images: ['/og-samkhya-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Sāṅkhya",
  "description": "Discover the profound understanding of consciousness and matter through Sāṅkhya philosophy",
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
      "name": "Sāṅkhya Fundamentals",
      "description": "Learn the basic principles of consciousness and matter",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "The 24 Tattvas",
      "description": "Master the understanding of the 24 principles of reality",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Sāṅkhya Kārikā Study",
      "description": "Deep dive into the classical Sāṅkhya Kārikā with practical applications",
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
      "name": "School of Sāṅkhya",
      "item": "https://shikshanam.com/schools/samkhya"
    }
  ]
}

export default function SamkhyaSchoolPage() {
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
      <SchoolOfSamkhyaPage />
    </>
  )
}
