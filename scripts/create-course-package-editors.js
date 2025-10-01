#!/usr/bin/env node

/**
 * Create Course and Package Editors
 * Generates specific editors for each course and package
 */

const fs = require('fs');
const path = require('path');

console.log('📚 Creating Course and Package Editors');
console.log('=====================================\n');

// Course editors to create
const courses = [
  {
    id: 'sanskrit-course',
    name: 'Sanskrit Course',
    description: 'Complete Sanskrit Language Learning Program',
    frontendPath: '/courses/sanskrit-course'
  },
  {
    id: 'samkhya-darshan-course',
    name: 'Samkhya Darshan Course',
    description: 'Samkhya Darshan - The Philosophy of Numbers and Categories',
    frontendPath: '/courses/samkhya-darshan'
  },
  {
    id: 'nyaya-darshan-course',
    name: 'Nyaya Darshan Course',
    description: 'Nyaya Darshan - Logic and Reasoning in Indian Philosophy',
    frontendPath: '/courses/nyaya-darshan'
  },
  {
    id: 'vaisheshik-darshan-course',
    name: 'Vaisheshik Darshan Course',
    description: 'Vaisheshik Darshan - The Philosophy of Particularity',
    frontendPath: '/courses/vaisheshik-darshan'
  },
  {
    id: 'yoga-darshan-course',
    name: 'Yoga Darshan Course',
    description: 'Yoga Darshan - The Philosophy of Union and Liberation',
    frontendPath: '/courses/yoga-darshan'
  },
  {
    id: 'tantra-darshan-course',
    name: 'Tantra Darshan Course',
    description: 'Tantra Darshan - Ancient Tantric Philosophy',
    frontendPath: '/courses/tantra-darshan'
  },
  {
    id: 'kashmir-shaivism-course',
    name: 'Kashmir Shaivism Course',
    description: 'Kashmir Shaivism - The Philosophy of Consciousness',
    frontendPath: '/courses/kashmir-shaivism'
  },
  {
    id: 'emotional-intelligence-course',
    name: 'Emotional Intelligence Course',
    description: 'Emotional Intelligence with Samkhya Darshan',
    frontendPath: '/courses/emotional-intelligence-with-samkhya-darshan'
  },
  {
    id: 'sanskrit-live-class-course',
    name: 'Sanskrit Live Class Course',
    description: 'Sanskrit Live Class - Interactive Learning',
    frontendPath: '/courses/sanskrit-live-class'
  }
];

// Package editors to create
const packages = [
  {
    id: 'sanskrit-darshan-upanishad-bundle',
    name: 'Sanskrit + Darshan + Upanishad Bundle',
    description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom',
    frontendPath: '/packages/sanskrit-darshan-upanishad-bundle'
  },
  {
    id: 'hindu-philosophies-upanishads-bundle',
    name: 'Hindu Philosophies + Upanishads Bundle',
    description: 'Comprehensive package focusing on philosophical systems and Upanishadic wisdom',
    frontendPath: '/packages/hindu-philosophies-upanishads-bundle'
  },
  {
    id: 'para-apara-bundle',
    name: 'Parā + Aparā Courses Bundle',
    description: 'The most comprehensive package including all Parā courses plus Chanakya Code',
    frontendPath: '/packages/para-apara-bundle'
  },
  {
    id: 'para-bundle',
    name: 'All Parā Courses Bundle',
    description: 'Everything in traditional wisdom except Chanakya Code - pure spiritual and philosophical learning',
    frontendPath: '/packages/para-bundle'
  }
];

// Course editor template
const courseEditorTemplate = (course) => `'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, BookOpen } from 'lucide-react';
import EnhancedContentEditor from '@/components/cms/EnhancedContentEditor';
import ContentPreview from '@/components/cms/ContentPreview';
import AutoSaveIndicator from '@/components/cms/AutoSaveIndicator';

interface CourseContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
  syllabus: {
    title: string;
    description: string;
    modules: Array<{
      id: string;
      title: string;
      description: string;
      duration: string;
      lessons: Array<{
        title: string;
        duration: string;
      }>;
    }>;
  };
  outcomes: {
    title: string;
    description: string;
    benefits: string[];
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
    }>;
  };
  pricing: {
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    currency: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
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

export default function ${course.id.charAt(0).toUpperCase() + course.id.slice(1).replace(/-/g, '')}Editor() {
  const router = useRouter();
  const [content, setContent] = useState<CourseContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/cms/${course.id}');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Create default content if not found
        setContent({
          hero: {
            title: '${course.name}',
            subtitle: '${course.description}',
            description: 'Explore this comprehensive course designed to provide deep understanding and practical application.',
            image: '/images/courses/${course.id}.jpg',
            ctaText: 'Enroll Now',
            ctaLink: '${course.frontendPath}'
          },
          syllabus: {
            title: 'Course Syllabus',
            description: 'Comprehensive curriculum covering all essential topics',
            modules: [
              {
                id: 'module-1',
                title: 'Introduction',
                description: 'Introduction to the fundamental concepts',
                duration: '2 weeks',
                lessons: [
                  { title: 'Overview', duration: '30 min' },
                  { title: 'Key Concepts', duration: '45 min' }
                ]
              }
            ]
          },
          outcomes: {
            title: 'What You Will Learn',
            description: 'Key learning outcomes and skills you will gain',
            benefits: [
              'Deep understanding of core concepts',
              'Practical application of knowledge',
              'Critical thinking and analytical skills',
              'Cultural and historical context'
            ]
          },
          testimonials: {
            title: 'Student Testimonials',
            description: 'Hear from students who have completed this course',
            testimonials: [
              {
                id: 'testimonial-1',
                name: 'Dr. Sarah Johnson',
                role: 'Student',
                content: 'This course provided deep insights with modern relevance.',
                rating: 5
              }
            ]
          },
          pricing: {
            title: 'Course Pricing',
            description: 'Flexible pricing options for all learners',
            price: 299,
            originalPrice: 399,
            currency: 'USD',
            features: [
              'Lifetime access to course materials',
              'Interactive learning tools',
              'Certificate of completion',
              'Community support'
            ],
            ctaText: 'Enroll Now',
            ctaLink: '${course.frontendPath}'
          },
          faq: {
            title: 'Frequently Asked Questions',
            description: 'Common questions about this course',
            questions: [
              {
                id: 'faq-1',
                question: 'Do I need prior knowledge?',
                answer: 'No prior knowledge is required. The course starts from basics.'
              },
              {
                id: 'faq-2',
                question: 'How long does it take to complete?',
                answer: 'The course is self-paced and typically takes 4-6 weeks to complete.'
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
      const response = await fetch('/api/cms/${course.id}', {
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
          <p className="mt-4 text-gray-600">Loading course editor...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h1>
          <p className="text-gray-600">Unable to load course content.</p>
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
                <BookOpen className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    ${course.name} Editor
                  </h1>
                  <p className="text-sm text-gray-500">
                    Edit course content and settings
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
          <ContentPreview content={content} type="course" />
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
                      className={\`w-full text-left px-3 py-2 rounded-md text-sm font-medium \${
                        activeSection === section
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }\`}
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
                  content={content[activeSection as keyof CourseContent]}
                  onUpdate={(data) => updateContent(activeSection, data)}
                  contentType="course"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`;

// Package editor template
const packageEditorTemplate = (pkg) => `'use client';

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

export default function ${pkg.id.charAt(0).toUpperCase() + pkg.id.slice(1).replace(/-/g, '')}Editor() {
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
      const response = await fetch('/api/cms/${pkg.id}');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Create default content if not found
        setContent({
          hero: {
            title: '${pkg.name}',
            subtitle: 'Complete Learning Journey',
            description: '${pkg.description}',
            image: '/images/packages/${pkg.id}.jpg',
            ctaText: 'Get This Bundle',
            ctaLink: '${pkg.frontendPath}'
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
            ctaLink: '${pkg.frontendPath}'
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
                course: '${pkg.name}'
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
      const response = await fetch('/api/cms/${pkg.id}', {
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
                    ${pkg.name} Editor
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
                      className={\`w-full text-left px-3 py-2 rounded-md text-sm font-medium \${
                        activeSection === section
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }\`}
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
}`;

// Create course editors
console.log('📚 Creating Course Editors...');
courses.forEach(course => {
  const dirPath = path.join(process.cwd(), 'app', 'cms', 'edit', course.id);
  const filePath = path.join(dirPath, 'page.tsx');
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Write the editor file
    fs.writeFileSync(filePath, courseEditorTemplate(course));
    console.log(`✅ Created: ${course.id} editor`);
  } catch (error) {
    console.error(`❌ Error creating ${course.id} editor:`, error.message);
  }
});

// Create package editors
console.log('\n📦 Creating Package Editors...');
packages.forEach(pkg => {
  const dirPath = path.join(process.cwd(), 'app', 'cms', 'edit', pkg.id);
  const filePath = path.join(dirPath, 'page.tsx');
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Write the editor file
    fs.writeFileSync(filePath, packageEditorTemplate(pkg));
    console.log(`✅ Created: ${pkg.id} editor`);
  } catch (error) {
    console.error(`❌ Error creating ${pkg.id} editor:`, error.message);
  }
});

console.log('\n🎯 Course and Package Editors Created!');
console.log('=====================================');
console.log(`✅ Course editors created: ${courses.length}`);
console.log(`✅ Package editors created: ${packages.length}`);
console.log('All editors are now available with proper routing and functionality.');
