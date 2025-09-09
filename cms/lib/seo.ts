import { prisma } from './prisma'

export interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export interface RedirectRule {
  source: string
  destination: string
  statusCode: number
  isActive: boolean
}

export class SEOManager {
  // Generate sitemap entries for all published content
  static async generateSitemap(baseUrl: string = 'https://shikshanam.com'): Promise<SitemapEntry[]> {
    const entries: SitemapEntry[] = []

    // Add static pages
    entries.push({
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })

    // Add published courses
    const courses = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    })

    courses.forEach(course => {
      entries.push({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: course.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Add published blog posts
    const blogPosts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    })

    blogPosts.forEach(post => {
      entries.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })

    // Add published packages
    const packages = await prisma.package.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    })

    packages.forEach(pkg => {
      entries.push({
        url: `${baseUrl}/packages/${pkg.slug}`,
        lastModified: pkg.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })

    // Add published pages
    const pages = await prisma.page.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    })

    pages.forEach(page => {
      entries.push({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    })

    return entries.sort((a, b) => b.priority - a.priority)
  }

  // Generate XML sitemap
  static generateSitemapXML(entries: SitemapEntry[]): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString().split('T')[0]}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`

    return xml
  }

  // Generate robots.txt
  static generateRobotsTxt(baseUrl: string = 'https://shikshanam.com'): string {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /cms/
Disallow: /admin/
Disallow: /api/cms/

# Disallow preview URLs
Disallow: /preview/`
  }

  // Get all active redirects
  static async getRedirects(): Promise<RedirectRule[]> {
    const redirects = await prisma.redirect.findMany({
      where: { isActive: true },
      select: {
        sourcePath: true,
        targetPath: true,
        statusCode: true,
        isActive: true,
      },
    })

    return redirects.map(redirect => ({
      source: redirect.sourcePath,
      destination: redirect.targetPath,
      statusCode: redirect.statusCode,
      isActive: redirect.isActive,
    }))
  }

  // Add or update redirect
  static async addRedirect(
    sourcePath: string,
    targetPath: string,
    statusCode: number = 301
  ): Promise<void> {
    await prisma.redirect.upsert({
      where: { sourcePath },
      update: {
        targetPath,
        statusCode,
        isActive: true,
      },
      create: {
        sourcePath,
        targetPath,
        statusCode,
        isActive: true,
      },
    })
  }

  // Remove redirect
  static async removeRedirect(sourcePath: string): Promise<void> {
    await prisma.redirect.update({
      where: { sourcePath },
      data: { isActive: false },
    })
  }

  // Generate structured data for content
  static generateStructuredData(type: 'course' | 'blog' | 'organization', data: any): object {
    switch (type) {
      case 'course':
        return {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: data.title,
          description: data.shortDescription || data.longDescription,
          provider: {
            '@type': 'Organization',
            name: 'Shikshanam',
            url: 'https://shikshanam.com',
          },
          educationalLevel: data.level?.toLowerCase(),
          inLanguage: data.language,
          ...(data.duration && {
            timeRequired: `PT${data.duration}M`,
          }),
          ...(data.coverImage && {
            image: data.coverImage,
          }),
        }

      case 'blog':
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          description: data.excerpt,
          author: {
            '@type': 'Person',
            name: data.author?.name || 'Shikshanam',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Shikshanam',
            url: 'https://shikshanam.com',
          },
          datePublished: data.publishDate,
          dateModified: data.updatedAt,
          ...(data.featuredImage && {
            image: data.featuredImage,
          }),
        }

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'Shikshanam',
          url: 'https://shikshanam.com',
          description: 'Ancient wisdom for modern living - courses in Sanskrit, philosophy, and spiritual practices',
          sameAs: [
            // Add social media URLs here
          ],
        }

      default:
        return {}
    }
  }

  // Validate SEO metadata
  static validateSEOData(seoMeta: any): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!seoMeta.title) {
      errors.push('Title is required')
    } else if (seoMeta.title.length > 60) {
      errors.push('Title should be 60 characters or less')
    }

    if (!seoMeta.description) {
      errors.push('Description is required')
    } else if (seoMeta.description.length > 160) {
      errors.push('Description should be 160 characters or less')
    }

    if (seoMeta.keywords && seoMeta.keywords.split(',').length > 10) {
      errors.push('Too many keywords (max 10)')
    }

    if (seoMeta.ogTitle && seoMeta.ogTitle.length > 95) {
      errors.push('OpenGraph title should be 95 characters or less')
    }

    if (seoMeta.ogDescription && seoMeta.ogDescription.length > 200) {
      errors.push('OpenGraph description should be 200 characters or less')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }
}

// Helper function to generate meta tags for Next.js
export function generateMetaTags(seoMeta: any, fallbackTitle: string, fallbackDescription: string) {
  return {
    title: seoMeta?.title || fallbackTitle,
    description: seoMeta?.description || fallbackDescription,
    keywords: seoMeta?.keywords,
    openGraph: {
      title: seoMeta?.ogTitle || seoMeta?.title || fallbackTitle,
      description: seoMeta?.ogDescription || seoMeta?.description || fallbackDescription,
      ...(seoMeta?.ogImage && { images: [seoMeta.ogImage] }),
    },
    twitter: {
      card: seoMeta?.twitterCard || 'summary_large_image',
    },
    ...(seoMeta?.canonical && { alternates: { canonical: seoMeta.canonical } }),
    ...(seoMeta?.noIndex && { robots: { index: false } }),
    ...(seoMeta?.noFollow && { robots: { follow: false } }),
  }
}
