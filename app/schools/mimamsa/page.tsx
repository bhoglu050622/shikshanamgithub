import type { Metadata } from 'next'
import SchoolOfMimamsaPage from '@/components/sections/SchoolOfMimamsaPage'

export const metadata: Metadata = {
  title: 'School of Mīmāṁsā - Shikshanam | Master the Science of Dharma',
  description: 'Understand the principles of right action, duty, and ethical living through Mīmāṁsā philosophy. Learn how to interpret sacred texts and apply their wisdom.',
  keywords: 'Mīmāṁsā philosophy, dharma, duty, ethics, Indian philosophy, Jaimini, Mīmāṁsā Sūtra, ritual, karma',
  openGraph: {
    title: 'School of Mīmāṁsā - Shikshanam',
    description: 'Understand the principles of right action, duty, and ethical living through Mīmāṁsā philosophy.',
    url: 'https://shikshanam.com/schools/mimamsa',
    images: [
      {
        url: '/og-mimamsa-school.jpg',
        width: 1200,
        height: 630,
        alt: 'School of Mīmāṁsā - Shikshanam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School of Mīmāṁsā - Shikshanam',
    description: 'Understand the principles of right action, duty, and ethical living through Mīmāṁsā philosophy.',
    images: ['/og-mimamsa-school.jpg'],
  },
}

// JSON-LD Structured Data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "School of Mīmāṁsā",
  "description": "Understand the principles of right action, duty, and ethical living through Mīmāṁsā philosophy",
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
      "name": "Mīmāṁsā Fundamentals",
      "description": "Learn the basic principles of dharma and ethical living",
      "courseMode": "Online",
      "educationalLevel": "Beginner"
    },
    {
      "@type": "CourseInstance", 
      "name": "Textual Interpretation",
      "description": "Master the art of interpreting sacred texts and applying their wisdom",
      "courseMode": "Live Classes",
      "educationalLevel": "Intermediate"
    },
    {
      "@type": "CourseInstance",
      "name": "Mīmāṁsā Sūtra Study",
      "description": "Deep dive into the classical Mīmāṁsā Sūtra with practical applications",
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
      "name": "School of Mīmāṁsā",
      "item": "https://shikshanam.com/schools/mimamsa"
    }
  ]
}

export default function MimamsaSchoolPage() {
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
      <SchoolOfMimamsaPage />
    </>
  )
}
