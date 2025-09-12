/**
 * Course SEO Component
 * Comprehensive SEO optimization for course pages
 */

import React from 'react';

interface CourseSEOProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    tags: string[];
    instructor: string;
    publishedAt: string;
    updatedAt: string;
  };
  breadcrumbItems?: Array<{
    name: string;
    url: string;
  }>;
}

export default function CourseSEO({ course, breadcrumbItems = [] }: CourseSEOProps) {
  // Temporarily disabled to troubleshoot build issues
  return null;
}