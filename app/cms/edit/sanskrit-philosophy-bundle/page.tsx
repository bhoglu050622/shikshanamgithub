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

export default function SanskritPhilosophyBundleEditor() {
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
      const response = await fetch('/api/cms/sanskrit-philosophy-bundle');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Create default content if not found
        setContent({
          hero: {
            title: 'Sanskrit Language + Hindu Philosophies Bundle',
            subtitle: 'Complete Learning Journey',
            description: 'Perfect blend of Sanskrit language learning with core Hindu philosophical systems for a comprehensive understanding of ancient wisdom.',
            image: '/images/packages/sanskrit-philosophy-bundle.jpg',
            ctaText: 'Get This Bundle',
            ctaLink: '/packages/sanskrit-philosophy-bundle'
          },
          courses: {
            title: 'Included Courses',
            description: 'Comprehensive package combining Sanskrit language with philosophical systems',
            courseList: [
              {
                id: 'sanskrit-course',
                name: 'Complete Sanskrit Course',
                description: 'Master the language of the gods from basics to advanced levels',
                duration: '12 weeks',
                level: 'All Levels',
                features: ['Grammar', 'Vocabulary', 'Reading', 'Writing', 'Speaking']
              },
              {
                id: 'advaita-vedanta',
                name: 'Advaita Vedanta',
                description: 'Non-dual philosophy and its practical applications',
                duration: '8 weeks',
                level: 'Intermediate',
                features: ['Philosophy', 'Meditation', 'Self-inquiry', 'Wisdom texts']
              },
              {
                id: 'samkhya-darshan',
                name: 'Samkhya Darshan',
                description: 'The philosophy of numbers and categories',
                duration: '6 weeks',
                level: 'Intermediate',
                features: ['Analytical thinking', 'Cosmology', 'Psychology', 'Liberation']
              },
              {
                id: 'yoga-darshan',
                name: 'Yoga Darshan',
                description: 'The philosophy of union and liberation',
                duration: '8 weeks',
                level: 'All Levels',
                features: ['Asanas', 'Pranayama', 'Meditation', 'Philosophy']
              },
              {
                id: 'nyaya-darshan',
                name: 'Nyaya Darshan',
                description: 'Logic and reasoning in Indian philosophy',
                duration: '6 weeks',
                level: 'Advanced',
                features: ['Logic', 'Epistemology', 'Debate', 'Critical thinking']
              }
            ]
          },
          pricing: {
            title: 'Bundle Pricing',
            description: 'Special package pricing with significant savings',
            price: 5899,
            originalPrice: 9500,
            savings: 3601,
            currency: 'INR',
            features: [
              '5 Complete Courses',
              'Lifetime Access',
              'Certificate of Completion',
              'Community Support',
              'Mobile App Access',
              'Offline Materials'
            ],
            ctaText: 'Get This Bundle',
            ctaLink: '/packages/sanskrit-philosophy-bundle'
          },
          benefits: {
            title: 'Bundle Benefits',
            description: 'Why choose this comprehensive package',
            benefits: [
              {
                title: 'Complete Learning Path',
                description: 'From Sanskrit basics to advanced philosophical concepts',
                icon: '📚'
              },
              {
                title: 'Cultural Context',
                description: 'Understand the cultural and historical background',
                icon: '🏛️'
              },
              {
                title: 'Practical Application',
                description: 'Apply ancient wisdom to modern life',
                icon: '💡'
              },
              {
                title: 'Expert Guidance',
                description: 'Learn from experienced teachers and scholars',
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
                name: 'Priya Sharma',
                role: 'Sanskrit Student',
                content: 'This bundle gave me a complete understanding of Sanskrit and its philosophical foundations. Highly recommended!',
                rating: 5,
                course: 'Sanskrit + Philosophy Bundle'
              },
              {
                id: 'testimonial-2',
                name: 'Dr. Rajesh Kumar',
                role: 'Philosophy Professor',
                content: 'Excellent combination of language learning and philosophical study. Perfect for serious students.',
                rating: 5,
                course: 'Sanskrit + Philosophy Bundle'
              }
            ]
          },
          faq: {
            title: 'Frequently Asked Questions',
            description: 'Common questions about this bundle',
            questions: [
              {
                id: 'faq-1',
                question: 'Do I need prior knowledge of Sanskrit?',
                answer: 'No prior knowledge is required. The bundle starts from Sanskrit basics.'
              },
              {
                id: 'faq-2',
                question: 'How long does it take to complete the bundle?',
                answer: 'The bundle is self-paced and typically takes 6-8 months to complete all courses.'
              },
              {
                id: 'faq-3',
                question: 'Can I access courses individually?',
                answer: 'Yes, you can access all courses individually or follow the recommended learning path.'
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
      const response = await fetch('/api/cms/sanskrit-philosophy-bundle', {
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
                    Sanskrit Philosophy Bundle Editor
                  </h1>
                  <p className="text-sm text-gray-500">
                    Edit package content and settings
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AutoSaveIndicator saving={saving} />
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
          <ContentPreview content={content} type="package" />
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
                  section={activeSection}
                  content={content[activeSection as keyof PackageContent]}
                  onUpdate={(data) => updateContent(activeSection, data)}
                  contentType="package"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
