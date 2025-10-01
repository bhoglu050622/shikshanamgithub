'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Section {
  id: string
  type: string
  position: number
  content: any
}

interface Page {
  id: string
  title: string
  slug: string
  status: string
  sections: Section[]
}

interface DynamicPageProps {
  slug?: string
}

export default function DynamicPage({ slug }: DynamicPageProps) {
  const params = useParams()
  const pageSlug = slug || (params?.slug as string)
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pageSlug) return

    const fetchPage = async () => {
      try {
        const response = await fetch(`/api/pages/${pageSlug}`)
        if (!response.ok) {
          throw new Error('Page not found')
        }
        const pageData = await response.json()
        setPage(pageData)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load page')
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [pageSlug])

  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'hero':
        return (
          <section key={section.id} className="relative bg-gradient-to-br from-premium-accent-primary to-premium-accent-secondary text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {section.content.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {section.content.subtitle}
              </p>
              {section.content.ctaText && section.content.ctaLink && (
                <a
                  href={section.content.ctaLink}
                  className="inline-block bg-white text-premium-accent-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  {section.content.ctaText}
                </a>
              )}
            </div>
          </section>
        )

      case 'text':
        return (
          <section key={section.id} className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-6 text-premium-text-primary">
                {section.content.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-premium-text-secondary leading-relaxed">
                  {section.content.content}
                </p>
              </div>
            </div>
          </section>
        )

      case 'features':
        return (
          <section key={section.id} className="py-16 bg-premium-bg-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12 text-premium-text-primary">
                {section.content.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.content.features?.map((feature: any, index: number) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-premium-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-premium-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-premium-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      case 'course-grid':
        return (
          <section key={section.id} className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12 text-premium-text-primary">
                {section.content.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.content.courses?.map((course: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-semibold mb-3 text-premium-text-primary">
                      {course.title}
                    </h3>
                    <p className="text-premium-text-secondary mb-4">
                      {course.description}
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{course.duration}</span>
                      <span className="bg-premium-accent-primary text-white px-2 py-1 rounded">
                        {course.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )

      default:
        return (
          <section key={section.id} className="py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  Unknown section type: {section.type}
                </p>
              </div>
            </div>
          </section>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading page...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-premium-accent-primary text-white px-6 py-3 rounded-lg hover:bg-premium-accent-primary/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-block bg-premium-accent-primary text-white px-6 py-3 rounded-lg hover:bg-premium-accent-primary/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {page.sections?.map(renderSection)}
    </div>
  )
}
