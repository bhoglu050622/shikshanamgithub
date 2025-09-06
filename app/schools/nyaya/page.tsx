import type { Metadata } from 'next'
import SchoolOfNyayaPage from '@/components/sections/SchoolOfNyayaPage'

export const metadata: Metadata = {
  title: 'School of Nyaya - Shikshanam | Master Logic & Reasoning',
  description: 'Master the art of clear thinking, valid inference, and systematic debate through Nyaya philosophy. Learn logical reasoning, argumentation, and critical thinking skills.',
  keywords: 'Nyaya philosophy, logical reasoning, debate skills, critical thinking, Indian philosophy, logic, argumentation, reasoning, systematic thinking',
  openGraph: {
    title: 'School of Nyaya - Shikshanam',
    description: 'Master the art of clear thinking, valid inference, and systematic debate through Nyaya philosophy.',
    url: 'https://shikshanam.com/schools/nyaya',
    images: [
      {
        url: '/og-nyaya-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Nyaya - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Nyaya - Shikshanam',
    description: 'Master the art of clear thinking, valid inference, and systematic debate through Nyaya philosophy.',
    images: ['/og-nyaya-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Nyaya",
  "description": "Master the art of clear thinking, valid inference, and systematic debate through Nyaya philosophy",
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
      "name": "Nyaya Logic Foundation",
      "description": "Learn the fundamentals of logical reasoning, valid inference, and systematic debate",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "Advanced Debate Techniques",
      "description": "Master advanced argumentation skills and fallacy recognition",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Nyaya Sūtra Study",
      "description": "Deep dive into the classical Nyaya Sūtra with practical applications",
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
      "name": "School of Nyaya",
      "item": "https://shikshanam.com/schools/nyaya"
    }
  ]
}

export default function NyayaSchoolPage() {
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
      <SchoolOfNyayaPage />
    </>
  )
}
