import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shikshanam.com'
  const now = new Date()
  
  // Static pages with high priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // School pages
  const schoolPages = [
    {
      url: `${baseUrl}/schools`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/schools/sanskrit`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/darshana`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/self-help`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/vedanta`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/yoga`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/samkhya`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/nyaya`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/vaisheshika`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schools/mimamsa`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Course pages (dynamic - would be generated from database in production)
  const coursePages = [
    {
      url: `${baseUrl}/courses/sanskrit-course`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/sanskrit-live-class`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/emotional-intelligence-with-samkhya-darshan`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/isha-upanishad`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/kashmir-shaivism`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/nyaya-darshan`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/prashna-upanishad`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/samkhya-darshan`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/tantra-darshan`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/vaisheshik-darshan`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/yoga-darshan`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courses/yoga-advanced`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Guru pages
  const guruPages = [
    {
      url: `${baseUrl}/gurus`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gurus/meera-patel`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/gurus/priya-sharma`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/gurus/rajesh-kumar`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Blog and content pages
  const contentPages = [
    {
      url: `${baseUrl}/blogs/sanskrit`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/glossaries/sanskrit`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/practice/sanskrit`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wisdom`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dharma-path`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guna-profiler`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/how-aligned-are-you`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Tool pages
  const toolPages = [
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/keyboard`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools/sandhi`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Legal and support pages
  const legalPages = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  return [
    ...staticPages,
    ...schoolPages,
    ...coursePages,
    ...guruPages,
    ...contentPages,
    ...toolPages,
    ...legalPages,
  ]
}
