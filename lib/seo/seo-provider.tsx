/**
 * SEO Provider Component
 * Comprehensive SEO metadata management for Next.js
 */

'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  SEOConfig, 
  OpenGraphConfig, 
  TwitterCardConfig,
  SEOPageConfig 
} from './types';
import { 
  generateMetaTags, 
  generateOpenGraphTags, 
  generateTwitterCardTags,
  generateCanonicalUrl,
  optimizeTitle,
  optimizeDescription
} from './seo-utils';

// ============================================================================
// SEO CONTEXT
// ============================================================================

interface SEOContextType {
  updateSEO: (config: Partial<SEOPageConfig>) => void;
  getCurrentSEO: () => SEOPageConfig | null;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

// ============================================================================
// SEO PROVIDER
// ============================================================================

interface SEOProviderProps {
  children: ReactNode;
  defaultSEO?: SEOPageConfig;
}

export function SEOProvider({ children, defaultSEO }: SEOProviderProps) {
  const [currentSEO, setCurrentSEO] = React.useState<SEOPageConfig | null>(defaultSEO || null);
  const router = useRouter();

  const updateSEO = React.useCallback((config: Partial<SEOPageConfig>) => {
    setCurrentSEO(prev => ({
      ...prev,
      ...config,
      seo: { ...prev?.seo, ...config.seo },
      openGraph: { ...prev?.openGraph, ...config.openGraph },
      twitter: { ...prev?.twitter, ...config.twitter },
    }));
  }, []);

  const getCurrentSEO = React.useCallback(() => currentSEO, [currentSEO]);

  // Update SEO when route changes
  useEffect(() => {
    if (router.isReady && currentSEO) {
      // Update canonical URL based on current route
      const canonical = generateCanonicalUrl(router.asPath);
      updateSEO({
        seo: { ...currentSEO.seo, canonical, url: canonical },
        openGraph: currentSEO.openGraph ? { ...currentSEO.openGraph, url: canonical } : undefined,
      });
    }
  }, [router.asPath, router.isReady, currentSEO, updateSEO]);

  const contextValue = React.useMemo(() => ({
    updateSEO,
    getCurrentSEO,
  }), [updateSEO, getCurrentSEO]);

  return (
    <SEOContext.Provider value={contextValue}>
      {children}
      {currentSEO && <SEOHead config={currentSEO} />}
    </SEOContext.Provider>
  );
}

// ============================================================================
// SEO HEAD COMPONENT
// ============================================================================

interface SEOHeadProps {
  config: SEOPageConfig;
}

function SEOHead({ config }: SEOHeadProps) {
  const { seo, openGraph, twitter, structuredData, breadcrumbs } = config;

  // Generate optimized meta tags
  const metaTags = generateMetaTags({
    ...seo,
    title: optimizeTitle(seo.title),
    description: optimizeDescription(seo.description),
  });

  const ogTags = openGraph ? generateOpenGraphTags({
    ...openGraph,
    title: optimizeTitle(openGraph.title),
    description: optimizeDescription(openGraph.description),
  }) : {};

  const twitterTags = twitter ? generateTwitterCardTags({
    ...twitter,
    title: optimizeTitle(twitter.title),
    description: optimizeDescription(twitter.description),
  }) : {};

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      {metaTags.keywords && <meta name="keywords" content={metaTags.keywords} />}
      <meta name="author" content={metaTags.author} />
      <meta name="publisher" content={metaTags.publisher} />
      <meta name="language" content={metaTags.language} />
      <meta name="robots" content={metaTags.robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      {metaTags.canonical && <link rel="canonical" href={metaTags.canonical} />}

      {/* Open Graph Tags */}
      {Object.entries(ogTags).map(([key, value]) => (
        <meta key={key} property={key} content={value} />
      ))}

      {/* Twitter Card Tags */}
      {Object.entries(twitterTags).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Breadcrumb Structured Data */}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbs),
          }}
        />
      )}

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#8B4513" />
      <meta name="msapplication-TileColor" content="#8B4513" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Shikshanam" />
    </Head>
  );
}

// ============================================================================
// SEO HOOK
// ============================================================================

export function useSEO() {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
}

// ============================================================================
// SEO COMPONENT
// ============================================================================

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  openGraph?: Partial<OpenGraphConfig>;
  twitter?: Partial<TwitterCardConfig>;
  structuredData?: any;
  breadcrumbs?: any;
}

export function SEO({
  title,
  description,
  keywords,
  image,
  imageAlt,
  type = 'website',
  noindex = false,
  nofollow = false,
  canonical,
  openGraph,
  twitter,
  structuredData,
  breadcrumbs,
}: SEOProps) {
  const { updateSEO } = useSEO();

  useEffect(() => {
    const robots = [
      noindex ? 'noindex' : 'index',
      nofollow ? 'nofollow' : 'follow',
    ].join(', ');

    const seoConfig: SEOPageConfig = {
      seo: {
        title,
        description,
        keywords,
        image,
        imageAlt,
        type,
        robots,
        canonical,
      },
      openGraph: openGraph ? {
        title,
        description,
        type: type as any,
        url: canonical || '',
        siteName: 'Shikshanam',
        image,
        imageAlt,
        ...openGraph,
      } : undefined,
      twitter: twitter ? {
        card: 'summary_large_image',
        title,
        description,
        image,
        imageAlt,
        ...twitter,
      } : undefined,
      structuredData,
      breadcrumbs,
    };

    updateSEO(seoConfig);
  }, [
    title,
    description,
    keywords,
    image,
    imageAlt,
    type,
    noindex,
    nofollow,
    canonical,
    openGraph,
    twitter,
    structuredData,
    breadcrumbs,
    updateSEO,
  ]);

  return null;
}

// ============================================================================
// BREADCRUMB COMPONENT
// ============================================================================

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
    current?: boolean;
  }>;
  showHome?: boolean;
  homeLabel?: string;
  separator?: string;
  className?: string;
}

export function Breadcrumb({
  items,
  showHome = true,
  homeLabel = 'Home',
  separator = '/',
  className = '',
}: BreadcrumbProps) {
  const router = useRouter();

  const allItems = showHome ? [
    { label: homeLabel, href: '/', current: false },
    ...items,
  ] : items;

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href.startsWith('http') ? item.href : `https://shikshanam.com${item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={`breadcrumb ${className}`}>
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.current ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-gray-900 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.href);
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}

// ============================================================================
// KEYWORD COMPONENT
// ============================================================================

interface KeywordProps {
  keywords: string[];
  className?: string;
}

export function KeywordTags({ keywords, className = '' }: KeywordProps) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div className={`keyword-tags ${className}`}>
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}
