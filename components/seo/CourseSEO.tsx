/**
 * Course SEO Component
 * Comprehensive SEO optimization for course pages
 */

import React from 'react';
import { SEO, Breadcrumb } from '@/lib/seo';
import { 
  generateCourseStructuredData, 
  generateBreadcrumbStructuredData,
  generateKeywords 
} from '@/lib/seo';

interface CourseSEOProps {
  course: {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
    slug: string;
    category: string;
    tags: string[];
    difficulty: string;
    duration: number;
    price?: number;
    currency?: string;
    instructor?: string;
    rating?: number;
    reviewCount?: number;
    thumbnail?: string;
    isPublished: boolean;
    publishedAt?: string;
    updatedAt?: string;
  };
  lessons?: Array<{
    id: string;
    title: string;
    slug: string;
    duration: number;
    order: number;
  }>;
  reviews?: Array<{
    id: string;
    rating: number;
    review: string;
    author: string;
    createdAt: string;
  }>;
}

export function CourseSEO({ course, lessons = [], reviews = [] }: CourseSEOProps) {
  // Generate optimized title and description
  const title = `${course.title} - Sanskrit Course | Shikshanam`;
  const description = course.shortDescription || course.description;
  
  // Generate keywords
  const baseKeywords = [
    course.title,
    'Sanskrit course',
    'online Sanskrit learning',
    'Vedic education',
    course.category,
    course.difficulty,
  ];
  
  const keywords = generateKeywords(baseKeywords, course.category);

  // Generate canonical URL
  const canonical = `https://shikshanam.com/courses/${course.slug}`;

  // Generate breadcrumbs
  const breadcrumbItems = [
    { label: 'Courses', href: '/courses' },
    { label: course.category, href: `/schools/${course.category}` },
    { label: course.title, href: `/courses/${course.slug}`, current: true },
  ];

  const breadcrumbStructuredData = generateBreadcrumbStructuredData({
    items: breadcrumbItems,
    showHome: true,
  });

  // Generate course structured data
  const courseStructuredData = generateCourseStructuredData({
    name: course.title,
    description: course.description,
    courseCode: course.id,
    educationalLevel: course.difficulty,
    teaches: course.tags,
    about: [course.category, 'Sanskrit', 'Vedic philosophy'],
    inLanguage: 'en',
    isAccessibleForFree: !course.price,
    instructor: course.instructor,
    rating: course.rating,
    reviewCount: course.reviewCount,
    price: course.price,
    currency: course.currency || 'USD',
    availability: course.isPublished ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  });

  // Generate lesson structured data if lessons exist
  const lessonStructuredData = lessons.length > 0 ? lessons.map(lesson => ({
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.title,
    description: `Lesson ${lesson.order} of ${course.title}`,
    educationalLevel: course.difficulty,
    learningResourceType: 'lesson',
    teaches: course.tags,
    about: [course.category, 'Sanskrit'],
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Course',
      name: course.title,
    },
    timeRequired: `PT${lesson.duration}M`,
    educationalUse: 'instruction',
    interactivityType: 'active',
  })) : null;

  // Generate review structured data if reviews exist
  const reviewStructuredData = reviews.length > 0 ? reviews.map(review => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Course',
      name: course.title,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.review,
    datePublished: review.createdAt,
  })) : null;

  // Combine all structured data
  const allStructuredData = [
    courseStructuredData,
    ...(lessonStructuredData || []),
    ...(reviewStructuredData || []),
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        image={course.thumbnail}
        imageAlt={`${course.title} course thumbnail`}
        type="article"
        canonical={canonical}
        openGraph={{
          title,
          description,
          type: 'article',
          url: canonical,
          siteName: 'Shikshanam',
          image: course.thumbnail,
          imageAlt: `${course.title} course thumbnail`,
          article: {
            publishedTime: course.publishedAt,
            modifiedTime: course.updatedAt,
            author: course.instructor,
            section: course.category,
            tag: course.tags,
          },
        }}
        twitter={{
          card: 'summary_large_image',
          title,
          description,
          image: course.thumbnail,
          imageAlt: `${course.title} course thumbnail`,
        }}
        structuredData={allStructuredData}
        breadcrumbs={breadcrumbStructuredData}
      />
      
      <Breadcrumb
        items={breadcrumbItems}
        showHome={true}
        className="mb-6"
      />
    </>
  );
}

// ============================================================================
// COURSE LIST SEO COMPONENT
// ============================================================================

interface CourseListSEOProps {
  category?: string;
  totalCourses: number;
  page?: number;
}

export function CourseListSEO({ category, totalCourses, page = 1 }: CourseListSEOProps) {
  const title = category 
    ? `${category} Courses - Sanskrit Learning | Shikshanam`
    : 'All Sanskrit Courses - Online Learning | Shikshanam';
    
  const description = category
    ? `Explore our comprehensive collection of ${category} courses. Learn Sanskrit, Vedic philosophy, and ancient wisdom through structured online courses.`
    : 'Discover our complete collection of Sanskrit courses, Vedic philosophy, and ancient Indian wisdom. Start your spiritual learning journey today.';

  const keywords = generateKeywords([
    'Sanskrit courses',
    'online Sanskrit learning',
    'Vedic education',
    'ancient wisdom',
    'spiritual learning',
    category || 'all courses',
  ]);

  const canonical = category 
    ? `https://shikshanam.com/schools/${category}`
    : 'https://shikshanam.com/courses';

  const breadcrumbItems = [
    { label: 'Courses', href: '/courses' },
    ...(category ? [{ label: category, href: `/schools/${category}`, current: true }] : []),
  ];

  const breadcrumbStructuredData = generateBreadcrumbStructuredData({
    items: breadcrumbItems,
    showHome: true,
  });

  // Course list structured data
  const courseListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: description,
    numberOfItems: totalCourses,
    itemListElement: [], // Would be populated with actual course data
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        openGraph={{
          title,
          description,
          type: 'website',
          url: canonical,
          siteName: 'Shikshanam',
        }}
        twitter={{
          card: 'summary',
          title,
          description,
        }}
        structuredData={courseListStructuredData}
        breadcrumbs={breadcrumbStructuredData}
      />
      
      <Breadcrumb
        items={breadcrumbItems}
        showHome={true}
        className="mb-6"
      />
    </>
  );
}

// ============================================================================
// LESSON SEO COMPONENT
// ============================================================================

interface LessonSEOProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    slug: string;
    duration: number;
    order: number;
    courseId: string;
    courseTitle: string;
    courseSlug: string;
  };
  course: {
    title: string;
    category: string;
    tags: string[];
    difficulty: string;
  };
}

export function LessonSEO({ lesson, course }: LessonSEOProps) {
  const title = `${lesson.title} - ${course.title} | Shikshanam`;
  const description = lesson.description || `Lesson ${lesson.order} of ${course.title}`;
  
  const keywords = generateKeywords([
    lesson.title,
    course.title,
    'Sanskrit lesson',
    'online learning',
    course.category,
    course.difficulty,
  ]);

  const canonical = `https://shikshanam.com/courses/${course.courseSlug}/lessons/${lesson.slug}`;

  const breadcrumbItems = [
    { label: 'Courses', href: '/courses' },
    { label: course.category, href: `/schools/${course.category}` },
    { label: course.title, href: `/courses/${course.courseSlug}` },
    { label: lesson.title, href: `/courses/${course.courseSlug}/lessons/${lesson.slug}`, current: true },
  ];

  const breadcrumbStructuredData = generateBreadcrumbStructuredData({
    items: breadcrumbItems,
    showHome: true,
  });

  // Lesson structured data
  const lessonStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.title,
    description: lesson.description,
    educationalLevel: course.difficulty,
    learningResourceType: 'lesson',
    teaches: course.tags,
    about: [course.category, 'Sanskrit'],
    inLanguage: 'en',
    isPartOf: {
      '@type': 'Course',
      name: course.title,
    },
    timeRequired: `PT${lesson.duration}M`,
    educationalUse: 'instruction',
    interactivityType: 'active',
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        openGraph={{
          title,
          description,
          type: 'article',
          url: canonical,
          siteName: 'Shikshanam',
          article: {
            section: course.category,
            tag: course.tags,
          },
        }}
        twitter={{
          card: 'summary',
          title,
          description,
        }}
        structuredData={lessonStructuredData}
        breadcrumbs={breadcrumbStructuredData}
      />
      
      <Breadcrumb
        items={breadcrumbItems}
        showHome={true}
        className="mb-6"
      />
    </>
  );
}
