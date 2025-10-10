/**
 * Course Structured Data Component
 * 
 * Adds JSON-LD structured data for courses to improve SEO and enable rich snippets
 */

interface CourseStructuredDataProps {
  name: string
  description: string
  provider: string
  price?: string
  currency?: string
  duration?: string
  level?: string
  url: string
}

export function CourseStructuredData({
  name,
  description,
  provider = "Shikshanam",
  price,
  currency = "INR",
  duration,
  level = "All Levels",
  url
}: CourseStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "sameAs": "https://shikshanam.com"
    },
    "url": url,
    ...(price && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock"
      }
    }),
    ...(duration && {
      "timeRequired": duration
    }),
    "coursePrerequisites": level,
    "inLanguage": ["en", "hi", "sa"],
    "educationalLevel": level,
    "teaches": description
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
      suppressHydrationWarning
    />
  )
}

export default CourseStructuredData

