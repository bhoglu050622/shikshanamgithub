'use client';

import React, { useState, useEffect } from 'react';
import { ContentRegistry } from '@/lib/cms/content-registry';
import ContentEditModal from './ContentEditModal';

interface ContentTypeStatus {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon' | 'deprecated';
  category: string;
  features: string[];
  sections: string[];
  isLoaded: boolean;
}

export default function FullCMS() {
  const [loading, setLoading] = useState(true);
  const [contentTypes, setContentTypes] = useState<ContentTypeStatus[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentTypeStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadContentTypes();
  }, []);

  const loadContentTypes = () => {
    setLoading(true);
    try {
      console.log('FullCMS: Starting to load content types');
      
      // Try to use ContentRegistry first
      let navigationStructure;
      try {
        if (!ContentRegistry) {
          throw new Error('ContentRegistry is not available');
        }
        
        console.log('FullCMS: ContentRegistry found, calling getNavigationStructure');
        navigationStructure = ContentRegistry.getNavigationStructure();
        console.log('FullCMS: Navigation structure received:', navigationStructure);
        
        if (!navigationStructure || !Array.isArray(navigationStructure)) {
          throw new Error('Invalid navigation structure received');
        }
      } catch (registryError) {
        console.warn('FullCMS: ContentRegistry failed, using fallback:', registryError);
        
        // Fallback: Create a comprehensive structure
        navigationStructure = [
          {
            id: 'main',
            title: 'Main Pages',
            items: [
              { id: 'homepage', title: 'Homepage', description: 'Main homepage content', status: 'active', features: ['hero', 'courses', 'schools', 'gurus', 'testimonials', 'community', 'mission'], sections: ['hero', 'alignYourself', 'schools', 'meetGurus', 'studentStories', 'testimonials', 'communityPosts', 'foundersMission', 'contribute', 'downloadApp', 'faq'] },
              { id: 'about', title: 'About', description: 'About page content', status: 'active', features: ['hero', 'mission', 'values', 'offerings', 'cta'], sections: ['hero', 'mission', 'values', 'offerings', 'cta'] },
              { id: 'contact', title: 'Contact', description: 'Contact page content', status: 'active', features: ['hero', 'form', 'info', 'quickHelp'], sections: ['hero', 'form', 'info', 'quickHelp'] },
              { id: 'donation', title: 'Donation', description: 'Donation page content', status: 'active', features: ['hero', 'causes', 'options', 'impact', 'testimonials', 'cta', 'faq'], sections: ['hero', 'causes', 'options', 'impact', 'testimonials', 'cta', 'faq'] },
              { id: 'schools', title: 'Schools Overview', description: 'Schools overview page', status: 'active', features: ['hero', 'list'], sections: ['hero', 'list'] }
            ]
          },
          {
            id: 'education',
            title: 'Education',
            items: [
              { id: 'sanskrit-school', title: 'Sanskrit School', description: 'Sanskrit school page', status: 'active', features: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'], sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'] },
              { id: 'darshana-school', title: 'Darshana School', description: 'Darshana school page', status: 'active', features: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'], sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'] },
              { id: 'self-help-school', title: 'Self-Help School', description: 'Self-help school page', status: 'active', features: ['hero', 'benefits', 'courses', 'testimonials', 'cta'], sections: ['hero', 'benefits', 'courses', 'testimonials', 'cta'] },
              { id: 'sanskrit-course', title: 'Sanskrit Course', description: 'Sanskrit language course', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'advaita-vedanta-course', title: 'Advaita Vedanta Course', description: 'Advaita Vedanta Darshan - A Journey Through Drig Drishya Viveka', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'chanakya-code-course', title: 'Chanakya Code Course', description: 'Chanakya Code - Ancient Wisdom for Modern Leadership', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'yoga-darshan-course', title: 'Yoga Darshan Course', description: 'Yoga Darshan - Understanding the Philosophy of Yoga', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'nyaya-vaisheshika-course', title: 'Nyaya Vaisheshika Course', description: 'Nyaya Vaisheshika - Logic and Atomism in Indian Philosophy', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'mimamsa-course', title: 'Mimamsa Course', description: 'Mimamsa - The Science of Vedic Interpretation', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'vedanta-course', title: 'Vedanta Course', description: 'Vedanta - The Philosophy of the Upanishads', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'sankhya-course', title: 'Sankhya Course', description: 'Sankhya - The Philosophy of Numbers and Categories', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'vaisheshika-course', title: 'Vaisheshika Course', description: 'Vaisheshika - The Philosophy of Particularity', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'nyaya-course', title: 'Nyaya Course', description: 'Nyaya - The Philosophy of Logic and Reasoning', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'purva-mimamsa-course', title: 'Purva Mimamsa Course', description: 'Purva Mimamsa - The Philosophy of Vedic Rituals', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] },
              { id: 'uttara-mimamsa-course', title: 'Uttara Mimamsa Course', description: 'Uttara Mimamsa - The Philosophy of the Upanishads', status: 'active', features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'], sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'] }
            ]
          },
          {
            id: 'packages',
            title: 'Learning Packages',
            items: [
              { id: 'sanskrit-darshan-upanishad-bundle', title: 'Sanskrit + Darshan + Upanishad Bundle', description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom', status: 'active', features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'], sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'] },
              { id: 'para-apara-bundle', title: 'Para Apara Bundle', description: 'Comprehensive package covering both Para and Apara Vidya', status: 'active', features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'], sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'] },
              { id: 'darshan-bundle', title: 'Darshan Bundle', description: 'Complete philosophical systems package', status: 'active', features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'], sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'] },
              { id: 'sanskrit-bundle', title: 'Sanskrit Bundle', description: 'Complete Sanskrit language learning package', status: 'active', features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'], sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'] },
              { id: 'upanishad-bundle', title: 'Upanishad Bundle', description: 'Complete Upanishadic wisdom package', status: 'active', features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'], sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'] }
            ]
          },
          {
            id: 'content',
            title: 'Content Management',
            items: [
              { id: 'blog', title: 'Blog Posts', description: 'Blog content management', status: 'coming-soon', features: ['posts', 'categories', 'tags', 'authors'], sections: ['posts', 'categories', 'tags', 'authors'] }
            ]
          }
        ];
      }
      
      const allContentTypes: ContentTypeStatus[] = [];
      
      navigationStructure.forEach(category => {
        if (!category || !category.items) {
          console.warn('FullCMS: Invalid category structure:', category);
          return;
        }
        
        category.items.forEach(item => {
          if (!item || !item.id) {
            console.warn('FullCMS: Invalid item structure:', item);
            return;
          }
          
          allContentTypes.push({
            id: item.id,
            name: item.title || 'Untitled',
            description: item.description || 'No description',
            status: (item.status as 'active' | 'coming-soon' | 'deprecated') || 'active',
            category: category.id || 'unknown',
            features: item.features || [],
            sections: item.sections || [],
            isLoaded: false
          });
        });
      });
      
      console.log('FullCMS: Processed content types:', allContentTypes);
      setContentTypes(allContentTypes);
    } catch (error) {
      console.error('FullCMS: Failed to load content types:', error);
      // Set a fallback to prevent infinite loading
      setContentTypes([]);
    } finally {
      console.log('FullCMS: Setting loading to false');
      setLoading(false);
    }
  };

  const handleEdit = (contentType: ContentTypeStatus) => {
    console.log('FullCMS: Opening edit modal for:', contentType);
    setSelectedContent(contentType);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    try {
      loadContentTypes();
    } finally {
      setTimeout(() => setRefreshing(false), 1000);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'main': return 'bg-blue-100 text-blue-800';
      case 'education': return 'bg-green-100 text-green-800';
      case 'packages': return 'bg-purple-100 text-purple-800';
      case 'content': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management System</h1>
              <p className="text-slate-600">Manage your website content and sections</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {refreshing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Content Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contentTypes.map((contentType) => (
            <div key={contentType.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{contentType.name}</h3>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contentType.status)}`}>
                    {contentType.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(contentType.category)}`}>
                    {contentType.category}
                  </span>
                </div>
              </div>
              
              <p className="text-slate-600 mb-4 text-sm">{contentType.description}</p>
              
              {contentType.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {contentType.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {contentType.features.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                        +{contentType.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {contentType.sections.length} sections
                </span>
                <button
                  onClick={() => handleEdit(contentType)}
                  className="px-4 py-2 bg-saffron-600 text-white rounded-md hover:bg-saffron-700 transition-colors text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedContent && (
          <ContentEditModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedContent(null);
            }}
            contentType={selectedContent}
            onRefresh={handleRefresh}
          />
        )}
      </div>
    </div>
  );
}
