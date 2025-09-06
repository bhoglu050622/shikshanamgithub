import type { Metadata } from 'next'
import SchoolOfVaisheshikaPage from '@/components/sections/SchoolOfVaisheshikaPage'

export const metadata: Metadata = {
  title: 'School of Vaiśeṣika - Shikshanam | Master the Atomic Theory of Reality',
  description: 'Explore the fundamental building blocks of existence through Vaiśeṣika philosophy. Understand how reality is structured through categories, atoms, and their interactions.',
  keywords: 'Vaiśeṣika philosophy, atomic theory, Indian philosophy, reality structure, categories, atoms, substance, quality, action, padārtha',
  openGraph: {
    title: 'School of Vaiśeṣika - Shikshanam',
    description: 'Explore the fundamental building blocks of existence through Vaiśeṣika philosophy.',
    url: 'https://shikshanam.com/schools/vaisheshika',
    images: [
      {
        url: '/og-vaisheshika-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Vaiśeṣika - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Vaiśeṣika - Shikshanam',
    description: 'Explore the fundamental building blocks of existence through Vaiśeṣika philosophy.',
    images: ['/og-vaisheshika-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Vaiśeṣika",
  "description": "Explore the fundamental building blocks of existence through Vaiśeṣika philosophy",
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
      "name": "Vaiśeṣika Categories Foundation",
      "description": "Learn the fundamental categories of reality and their interactions",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "Atomic Theory & Substance",
      "description": "Master the atomic theory and understanding of substance in Vaiśeṣika",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Vaiśeṣika Sūtra Study",
      "description": "Deep dive into the classical Vaiśeṣika Sūtra with practical applications",
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
      "name": "School of Vaiśeṣika",
      "item": "https://shikshanam.com/schools/vaisheshika"
    }
  ]
}

export default function VaisheshikaSchoolPage() {
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
      <SchoolOfVaisheshikaPage />
    </>
  )
}
