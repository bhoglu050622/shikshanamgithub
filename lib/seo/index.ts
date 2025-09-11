/**
 * SEO Barrel Export
 * Centralized exports for all SEO utilities and components
 */

// Types and interfaces
export * from './types';

// Utilities
export * from './seo-utils';

// Components
export * from './seo-provider';

// Re-export commonly used items
export {
  generateMetaTags,
  generateOpenGraphTags,
  generateTwitterCardTags,
  generateCourseStructuredData,
  generateLessonStructuredData,
  generateOrganizationStructuredData,
  generateBreadcrumbStructuredData,
  generateReviewStructuredData,
  generateSitemap,
  generateRobotsTxt,
  generateKeywords,
  optimizeTitle,
  optimizeDescription,
  generateCanonicalUrl,
  generateSlug,
  generatePreloadLinks,
  generateCriticalCSS,
} from './seo-utils';

export {
  SEOProvider,
  useSEO,
  SEO,
  Breadcrumb,
  KeywordTags,
} from './seo-provider';
