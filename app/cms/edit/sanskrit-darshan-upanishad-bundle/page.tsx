'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Package, Users, Star } from 'lucide-react';
import EnhancedContentEditor from '@/components/cms/EnhancedContentEditor';
import ContentPreview from '@/components/cms/ContentPreview';
import AutoSaveIndicator from '@/components/cms/AutoSaveIndicator';

interface PackageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
  courses: {
    title: string;
    description: string;
    courseList: Array<{
      id: string;
      name: string;
      description: string;
      duration: string;
      level: string;
      features: string[];
    }>;
  };
  pricing: {
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    savings: number;
    currency: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
  };
  benefits: {
    title: string;
    description: string;
    benefits: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonials: {
    title: string;
    description: string;
    testimonials: Array<{
      id: string;
      name: string;
      role: string;
      content: string;
      rating: number;
      course: string;
    }>;
  };
  faq: {
    title: string;
    description: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}

export default function SanskritdarshanupanishadbundleEditor() {
  const router = useRouter();
  const [content, setContent] = useState<PackageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/cms/sanskrit-darshan-upanishad-bundle');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Create default content if not found
        setContent({
          hero: {
            title: 'Sanskrit + Darshan + Upanishad Bundle',
            subtitle: 'Complete Learning Journey',
            description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom',
            image: '/images/packages/sanskrit-darshan-upanishad-bundle.jpg',
            ctaText: 'Get This Bundle',
            ctaLink: '/packages/sanskrit-darshan-upanishad-bundle'
          },
          courses: {
            title: 'Included Courses',
            description: 'Comprehensive package with multiple courses',
            courseList: [
              {
                id: 'course-1',
                name: 'Course 1',
                description: 'First course in the bundle',
                duration: '4 weeks',
                level: 'All Levels',
                features: ['Interactive Learning', 'Certification', 'Community Access']
              }
            ]
          },
          pricing: {
            title: 'Bundle Pricing',
            description: 'Special package pricing with significant savings',
            price: 2999,
            originalPrice: 4999,
            savings: 2000,
            currency: 'INR',
            features: [
              'Multiple Courses',
              'Lifetime Access',
              'Certificate of Completion',
              'Community Support',
              'Mobile App Access'
            ],
            ctaText: 'Get This Bundle',
            ctaLink: '/packages/sanskrit-darshan-upanishad-bundle'
          },
          benefits: {
            title: 'Bundle Benefits',
            description: 'Why choose this comprehensive package',
            benefits: [
              {
                title: 'Complete Learning Path',
                description: 'Structured learning from basics to advanced',
                icon: '📚'
              },
              {
                title: 'Expert Guidance',
                description: 'Learn from experienced teachers',
                icon: '👨‍🏫'
              }
            ]
          },
          testimonials: {
            title: 'Student Testimonials',
            description: 'Hear from students who have completed this bundle',
            testimonials: [
              {
                id: 'testimonial-1',
                name: 'Student Name',
                role: 'Student',
                content: 'This bundle provided excellent value and comprehensive learning.',
                rating: 5,
                course: 'Sanskrit + Darshan + Upanishad Bundle'
              }
            ]
          },
          faq: {
            title: 'Frequently Asked Questions',
            description: 'Common questions about this bundle',
            questions: [
              {
                id: 'faq-1',
                question: 'What is included in this bundle?',
                answer: 'This bundle includes multiple courses with lifetime access.'
              }
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/cms/sanskrit-darshan-upanishad-bundle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        console.log('Content saved successfully');
      } else {
        console.error('Error saving content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (section: string, data: any) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: data
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading package editor...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h1>
          <p className="text-gray-600">Unable to load package content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center">
                <Package className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Sanskrit + Darshan + Upanishad Bundle Editor
                  </h1>
                  <p className="text-sm text-gray-500">
                    Edit package content and settings
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AutoSaveIndicator isSaving={saving} lastSaved={null} hasUnsavedChanges={false} saveError={null} retryCount={0} />
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={saveContent}
                disabled={saving}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ? (
          <ContentPreview contentId="package" frontendPath="/packages/package" title="Package" status="published" lastModified={new Date()} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sections</h3>
                <nav className="space-y-2">
                  {Object.keys(content).map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                        activeSection === section
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <EnhancedContentEditor
                  contentId="course"
                  content={content[activeSection as keyof PackageContent]}
                  onSave={async (data) => { updateContent(activeSection, data); return true; }}
                  fields={[]} title={activeSection} description={`Edit ${activeSection} section`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}