/**
 * SEO Utilities
 * Comprehensive SEO helper functions and utilities
 */

import { 
  SEOConfig, 
  OpenGraphConfig, 
  TwitterCardConfig,
  CourseStructuredData,
  LessonStructuredData,
  OrganizationStructuredData,
  BreadcrumbStructuredData,
  ReviewStructuredData,
  BreadcrumbConfig,
  SitemapConfig,
  RobotsConfig
} from './types';

// ============================================================================
// META TAG GENERATION
// ============================================================================

export function generateMetaTags(config: SEOConfig): Record<string, string> {
  const meta: Record<string, string> = {
    title: config.title,
    description: config.description,
    'robots': config.robots || 'index, follow',
    'author': config.author || 'Shikshanam',
    'publisher': config.publisher || 'Shikshanam',
    'language': config.language || 'en',
    'locale': config.locale || 'en_US',
    'type': config.type || 'website',
    'url': config.url || '',
    'canonical': config.canonical || config.url || '',
  };

  if (config.keywords && config.keywords.length > 0) {
    meta.keywords = config.keywords.join(', ');
  }

  if (config.image) {
    meta.image = config.image;
    meta['image:alt'] = config.imageAlt || config.title;
    
    if (config.imageWidth) meta['image:width'] = config.imageWidth.toString();
    if (config.imageHeight) meta['image:height'] = config.imageHeight.toString();
  }

  if (config.siteName) {
    meta['site_name'] = config.siteName;
  }

  return meta;
}

export function generateOpenGraphTags(config: OpenGraphConfig): Record<string, string> {
  const og: Record<string, string> = {
    'og:title': config.title,
    'og:description': config.description,
    'og:type': config.type,
    'og:url': config.url,
    'og:site_name': config.siteName,
  };

  if (config.locale) {
    og['og:locale'] = config.locale;
  }

  if (config.image) {
    og['og:image'] = config.image;
    og['og:image:alt'] = config.imageAlt || config.title;
    
    if (config.imageWidth) og['og:image:width'] = config.imageWidth.toString();
    if (config.imageHeight) og['og:image:height'] = config.imageHeight.toString();
  }

  // Article specific tags
  if (config.type === 'article' && config.article) {
    if (config.article.publishedTime) og['article:published_time'] = config.article.publishedTime;
    if (config.article.modifiedTime) og['article:modified_time'] = config.article.modifiedTime;
    if (config.article.expirationTime) og['article:expiration_time'] = config.article.expirationTime;
    if (config.article.author) og['article:author'] = config.article.author;
    if (config.article.section) og['article:section'] = config.article.section;
    if (config.article.tag) og['article:tag'] = config.article.tag.join(', ');
  }

  // Book specific tags
  if (config.type === 'book' && config.book) {
    if (config.book.isbn) og['book:isbn'] = config.book.isbn;
    if (config.book.author) og['book:author'] = config.book.author;
    if (config.book.releaseDate) og['book:release_date'] = config.book.releaseDate;
    if (config.book.tag) og['book:tag'] = config.book.tag.join(', ');
  }

  // Profile specific tags
  if (config.type === 'profile' && config.profile) {
    if (config.profile.firstName) og['profile:first_name'] = config.profile.firstName;
    if (config.profile.lastName) og['profile:last_name'] = config.profile.lastName;
    if (config.profile.username) og['profile:username'] = config.profile.username;
    if (config.profile.gender) og['profile:gender'] = config.profile.gender;
  }

  return og;
}

export function generateTwitterCardTags(config: TwitterCardConfig): Record<string, string> {
  const twitter: Record<string, string> = {
    'twitter:card': config.card,
    'twitter:title': config.title,
    'twitter:description': config.description,
  };

  if (config.site) twitter['twitter:site'] = config.site;
  if (config.creator) twitter['twitter:creator'] = config.creator;
  if (config.image) twitter['twitter:image'] = config.image;
  if (config.imageAlt) twitter['twitter:image:alt'] = config.imageAlt;

  // Player card specific tags
  if (config.card === 'player' && config.player) {
    twitter['twitter:player'] = config.player.url;
    twitter['twitter:player:width'] = config.player.width.toString();
    twitter['twitter:player:height'] = config.player.height.toString();
    if (config.player.stream) twitter['twitter:player:stream'] = config.player.stream;
  }

  // App card specific tags
  if (config.card === 'app' && config.app) {
    twitter['twitter:app:name:iphone'] = config.app.name;
    twitter['twitter:app:id:iphone'] = config.app.id;
    twitter['twitter:app:url:iphone'] = config.app.url;
  }

  return twitter;
}

// ============================================================================
// STRUCTURED DATA GENERATION
// ============================================================================

export function generateCourseStructuredData(course: {
  name: string;
  description: string;
  courseCode?: string;
  educationalLevel?: string;
  teaches?: string[];
  about?: string[];
  inLanguage?: string;
  isAccessibleForFree?: boolean;
  instructor?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  currency?: string;
  availability?: string;
}): CourseStructuredData {
  const structuredData: CourseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'Shikshanam',
      url: 'https://shikshanam.com',
    },
  };

  if (course.courseCode) structuredData.courseCode = course.courseCode;
  if (course.educationalLevel) structuredData.educationalLevel = course.educationalLevel;
  if (course.teaches) structuredData.teaches = course.teaches;
  if (course.about) structuredData.about = course.about;
  if (course.inLanguage) structuredData.inLanguage = course.inLanguage;
  if (course.isAccessibleForFree !== undefined) structuredData.isAccessibleForFree = course.isAccessibleForFree;

  if (course.instructor) {
    structuredData.hasCourseInstance = {
      '@type': 'CourseInstance',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: course.instructor,
      },
    };
  }

  if (course.rating && course.reviewCount) {
    structuredData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: course.rating,
      ratingCount: course.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (course.price && course.currency) {
    structuredData.offers = {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: course.currency,
      availability: course.availability || 'https://schema.org/InStock',
    };
  }

  return structuredData;
}

export function generateLessonStructuredData(lesson: {
  name: string;
  description: string;
  educationalLevel?: string;
  learningResourceType: 'lesson' | 'lecture' | 'video' | 'text';
  teaches?: string[];
  about?: string[];
  inLanguage?: string;
  courseName?: string;
  timeRequired?: string;
  educationalUse?: string;
  typicalAgeRange?: string;
  interactivityType?: string;
  mediaType?: string;
}): LessonStructuredData {
  const structuredData: LessonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.name,
    description: lesson.description,
    learningResourceType: lesson.learningResourceType,
  };

  if (lesson.educationalLevel) structuredData.educationalLevel = lesson.educationalLevel;
  if (lesson.teaches) structuredData.teaches = lesson.teaches;
  if (lesson.about) structuredData.about = lesson.about;
  if (lesson.inLanguage) structuredData.inLanguage = lesson.inLanguage;
  if (lesson.timeRequired) structuredData.timeRequired = lesson.timeRequired;
  if (lesson.educationalUse) structuredData.educationalUse = lesson.educationalUse;
  if (lesson.typicalAgeRange) structuredData.typicalAgeRange = lesson.typicalAgeRange;
  if (lesson.interactivityType) structuredData.interactivityType = lesson.interactivityType;
  if (lesson.mediaType) structuredData.mediaType = lesson.mediaType;

  if (lesson.courseName) {
    structuredData.isPartOf = {
      '@type': 'Course',
      name: lesson.courseName,
    };
  }

  return structuredData;
}

export function generateOrganizationStructuredData(): OrganizationStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Shikshanam',
    description: 'Learn Sanskrit, Vedic philosophy, and spiritual wisdom through comprehensive online courses.',
    url: 'https://shikshanam.com',
    logo: 'https://shikshanam.com/logo.png',
    image: 'https://shikshanam.com/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@shikshanam.com',
    },
    sameAs: [
      'https://facebook.com/shikshanam',
      'https://twitter.com/shikshanam',
      'https://instagram.com/shikshanam',
      'https://youtube.com/shikshanam',
    ],
    foundingDate: '2024',
    areaServed: 'Worldwide',
  };
}

export function generateBreadcrumbStructuredData(config: BreadcrumbConfig): BreadcrumbStructuredData {
  const items = config.showHome !== false ? [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: config.homeLabel || 'Home',
      item: 'https://shikshanam.com',
    },
    ...config.items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 2,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `https://shikshanam.com${item.href}`,
    })),
  ] : config.items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.label,
    item: item.href.startsWith('http') ? item.href : `https://shikshanam.com${item.href}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function generateReviewStructuredData(review: {
  courseName: string;
  rating: number;
  authorName: string;
  reviewBody: string;
  datePublished: string;
}): ReviewStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Course',
      name: review.courseName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.authorName,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  };
}

// ============================================================================
// SITEMAP GENERATION
// ============================================================================

export function generateSitemap(config: SitemapConfig): string {
  const entries = config.entries.map(entry => {
    const lastModified = entry.lastModified || config.lastModified || new Date().toISOString();
    const changeFrequency = entry.changeFrequency || 'weekly';
    const priority = entry.priority || 0.5;

    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

// ============================================================================
// ROBOTS.TXT GENERATION
// ============================================================================

export function generateRobotsTxt(config: RobotsConfig): string {
  const userAgentBlocks = config.userAgents.map(agent => {
    const directives: string[] = [`User-agent: ${agent.name}`];
    
    if (agent.allow) {
      agent.allow.forEach(path => directives.push(`Allow: ${path}`));
    }
    
    if (agent.disallow) {
      agent.disallow.forEach(path => directives.push(`Disallow: ${path}`));
    }
    
    if (agent.crawlDelay) {
      directives.push(`Crawl-delay: ${agent.crawlDelay}`);
    }
    
    return directives.join('\n');
  }).join('\n\n');

  const sitemapDirectives = config.sitemap ? 
    config.sitemap.map(url => `Sitemap: ${url}`).join('\n') : '';

  const hostDirective = config.host ? `Host: ${config.host}` : '';

  return [userAgentBlocks, sitemapDirectives, hostDirective]
    .filter(Boolean)
    .join('\n\n');
}

// ============================================================================
// KEYWORD UTILITIES
// ============================================================================

export function generateKeywords(baseKeywords: string[], context?: string): string[] {
  const keywords = [...baseKeywords];
  
  if (context) {
    keywords.push(context);
  }
  
  // Add Sanskrit education related keywords
  const sanskritKeywords = [
    'Sanskrit learning',
    'Vedic education',
    'spiritual learning',
    'ancient wisdom',
    'Sanskrit courses',
    'Vedic philosophy',
    'Sanskrit grammar',
    'Sanskrit literature',
    'Hindu philosophy',
    'spiritual education',
  ];
  
  keywords.push(...sanskritKeywords);
  
  // Remove duplicates and return
  return [...new Set(keywords)];
}

export function optimizeTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  // Try to cut at word boundary
  const truncated = title.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

export function optimizeDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  
  // Try to cut at sentence boundary
  const truncated = description.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }
  
  return truncated + '...';
}

// ============================================================================
// URL UTILITIES
// ============================================================================

export function generateCanonicalUrl(path: string, baseUrl: string = 'https://shikshanam.com'): string {
  if (path.startsWith('http')) return path;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

export function generatePreloadLinks(resources: Array<{
  href: string;
  as: 'script' | 'style' | 'image' | 'font' | 'fetch';
  type?: string;
  crossorigin?: boolean;
}>): string {
  return resources.map(resource => {
    const attributes = [
      `href="${resource.href}"`,
      `as="${resource.as}"`,
    ];
    
    if (resource.type) attributes.push(`type="${resource.type}"`);
    if (resource.crossorigin) attributes.push('crossorigin');
    
    return `<link rel="preload" ${attributes.join(' ')}>`;
  }).join('\n');
}

export function generateCriticalCSS(css: string): string {
  return `<style>${css}</style>`;
}
