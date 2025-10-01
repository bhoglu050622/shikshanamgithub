'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ContentEditPage from '@/components/cms/ContentEditPage';

// Content type configurations
const contentTypes = {
  'homepage': {
    id: 'homepage',
    name: 'Homepage',
    description: 'Main homepage content and sections',
    status: 'active' as const,
    category: 'main',
    features: ['hero', 'courses', 'schools', 'gurus', 'testimonials', 'community', 'mission'],
    sections: ['hero', 'alignYourself', 'schools', 'meetGurus', 'studentStories', 'testimonials', 'communityPosts', 'foundersMission', 'contribute', 'downloadApp', 'faq'],
    isLoaded: false
  },
  'darshana-school': {
    id: 'darshana-school',
    name: 'Darshana School',
    description: 'Darshana school page',
    status: 'active' as const,
    category: 'schools',
    features: ['hero', 'gurus', 'learning-path', 'mission', 'community', 'app'],
    sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
    isLoaded: false
  },
  'donation': {
    id: 'donation',
    name: 'Donation',
    description: 'Donation page content',
    status: 'active' as const,
    category: 'pages',
    features: ['hero', 'impact', 'causes', 'options', 'testimonials', 'faq', 'cta'],
    sections: ['hero', 'impact', 'causes', 'options', 'testimonials', 'faq', 'cta'],
    isLoaded: false
  },
  'about': {
    id: 'about',
    name: 'About',
    description: 'About page content',
    status: 'active' as const,
    category: 'pages',
    features: ['hero', 'mission', 'team', 'values', 'history'],
    sections: ['hero', 'mission', 'team', 'values', 'history'],
    isLoaded: false
  },
  'contact': {
    id: 'contact',
    name: 'Contact',
    description: 'Contact page content',
    status: 'active' as const,
    category: 'pages',
    features: ['hero', 'form', 'info', 'map'],
    sections: ['hero', 'form', 'info', 'map'],
    isLoaded: false
  }
};

export default function EditContentPage() {
  const params = useParams();
  const contentTypeId = params.contentType as string;
  
  const contentType = contentTypes[contentTypeId as keyof typeof contentTypes];
  
  if (!contentType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Type Not Found</h1>
          <p className="text-gray-600">The content type "{contentTypeId}" does not exist.</p>
        </div>
      </div>
    );
  }

  return <ContentEditPage contentType={contentType} />;
}
