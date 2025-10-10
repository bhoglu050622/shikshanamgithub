/**
 * SEO Types and Interfaces
 * Comprehensive SEO metadata and structured data types
 */

// ============================================================================
// BASIC SEO METADATA
// ============================================================================

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  robots?: string;
  author?: string;
  publisher?: string;
  language?: string;
  locale?: string;
  type?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  siteName?: string;
  url?: string;
}

// ============================================================================
// OPEN GRAPH METADATA
// ============================================================================

export interface OpenGraphConfig {
  title: string;
  description: string;
  type: 'website' | 'article' | 'book' | 'profile' | 'video.other';
  url: string;
  siteName: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  locale?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    author?: string;
    section?: string;
    tag?: string[];
  };
  book?: {
    isbn?: string;
    author?: string;
    releaseDate?: string;
    tag?: string[];
  };
  profile?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
  };
}

// ============================================================================
// TWITTER CARD METADATA
// ============================================================================

export interface TwitterCardConfig {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  player?: {
    url: string;
    width: number;
    height: number;
    stream?: string;
  };
  app?: {
    name: string;
    id: string;
    url: string;
  };
}

// ============================================================================
// STRUCTURED DATA TYPES
// ============================================================================

export interface CourseStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Course';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  courseCode?: string;
  educationalLevel?: string;
  teaches?: string[];
  about?: string[];
  inLanguage?: string;
  isAccessibleForFree?: boolean;
  hasCourseInstance?: {
    '@type': 'CourseInstance';
    courseMode: 'online' | 'offline' | 'blended';
    instructor: {
      '@type': 'Person';
      name: string;
    };
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    ratingCount: number;
    bestRating: number;
    worstRating: number;
  };
  offers?: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
    validThrough?: string;
  };
}

export interface LessonStructuredData {
  '@context': 'https://schema.org';
  '@type': 'LearningResource';
  name: string;
  description: string;
  educationalLevel?: string;
  learningResourceType: 'lesson' | 'lecture' | 'video' | 'text';
  teaches?: string[];
  about?: string[];
  inLanguage?: string;
  isPartOf?: {
    '@type': 'Course';
    name: string;
  };
  timeRequired?: string;
  educationalUse?: string;
  typicalAgeRange?: string;
  interactivityType?: string;
  mediaType?: string;
}

export interface OrganizationStructuredData {
  '@context': 'https://schema.org';
  '@type': 'EducationalOrganization';
  name: string;
  description: string;
  url: string;
  logo?: string;
  image?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone?: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  numberOfEmployees?: number;
  areaServed?: string;
}

export interface BreadcrumbStructuredData {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ReviewStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Review';
  itemReviewed: {
    '@type': 'Course';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewBody: string;
  datePublished: string;
}

// ============================================================================
// BREADCRUMB TYPES
// ============================================================================

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface BreadcrumbConfig {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeLabel?: string;
  separator?: string;
}

// ============================================================================
// SITEMAP TYPES
// ============================================================================

export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  entries: SitemapEntry[];
  baseUrl: string;
  lastModified?: string;
}

// ============================================================================
// ROBOTS.TXT TYPES
// ============================================================================

export interface RobotsConfig {
  userAgents: Array<{
    name: string;
    allow?: string[];
    disallow?: string[];
    crawlDelay?: number;
  }>;
  sitemap?: string[];
  host?: string;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface AnalyticsConfig {
  googleAnalytics?: {
    measurementId: string;
    anonymizeIp?: boolean;
    respectDnt?: boolean;
  };
  googleTagManager?: {
    containerId: string;
  };
  facebookPixel?: {
    pixelId: string;
  };
  hotjar?: {
    siteId: string;
  };
}

// ============================================================================
// PERFORMANCE TYPES
// ============================================================================

export interface PerformanceConfig {
  enableWebVitals?: boolean;
  enableLazyLoading?: boolean;
  enableImageOptimization?: boolean;
  enableCodeSplitting?: boolean;
  enableServiceWorker?: boolean;
  enablePreloading?: boolean;
}

// ============================================================================
// SEO PAGE CONFIG
// ============================================================================

export interface SEOPageConfig {
  seo: SEOConfig;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterCardConfig;
  structuredData?: any;
  breadcrumbs?: BreadcrumbConfig;
  analytics?: AnalyticsConfig;
  performance?: PerformanceConfig;
}

// ============================================================================
// KEYWORD RESEARCH TYPES
// ============================================================================

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
  relatedKeywords: string[];
}

export interface KeywordResearch {
  primary: KeywordData;
  secondary: KeywordData[];
  longTail: KeywordData[];
  competitors: KeywordData[];
  opportunities: KeywordData[];
}
