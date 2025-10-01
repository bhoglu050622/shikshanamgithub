'use client';

import React, { useState } from 'react';
import ContentEditModal from './ContentEditModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw } from 'lucide-react';

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

export default function FinalFullCMS() {
  const [selectedContent, setSelectedContent] = useState<ContentTypeStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contentTypes: ContentTypeStatus[] = [
    // Main Pages
    {
      id: 'homepage',
      name: 'Homepage',
      description: 'Main homepage content and sections',
      status: 'active',
      category: 'main',
      features: ['hero', 'courses', 'schools', 'gurus', 'testimonials', 'community', 'mission'],
      sections: ['hero', 'alignYourself', 'schools', 'meetGurus', 'studentStories', 'testimonials', 'communityPosts', 'foundersMission', 'contribute', 'downloadApp', 'faq'],
      isLoaded: false
    },
    {
      id: 'about',
      name: 'About',
      description: 'About page content',
      status: 'active',
      category: 'main',
      features: ['hero', 'mission', 'values', 'offerings', 'cta'],
      sections: ['hero', 'mission', 'values', 'offerings', 'cta'],
      isLoaded: false
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Contact page content',
      status: 'active',
      category: 'main',
      features: ['hero', 'form', 'info', 'quickHelp'],
      sections: ['hero', 'form', 'info', 'quickHelp'],
      isLoaded: false
    },
    {
      id: 'donation',
      name: 'Donation',
      description: 'Donation page content',
      status: 'active',
      category: 'main',
      features: ['hero', 'causes', 'options', 'impact', 'testimonials', 'cta', 'faq'],
      sections: ['hero', 'causes', 'options', 'impact', 'testimonials', 'cta', 'faq'],
      isLoaded: false
    },
    {
      id: 'schools',
      name: 'Schools Overview',
      description: 'Schools overview page',
      status: 'active',
      category: 'main',
      features: ['hero', 'list'],
      sections: ['hero', 'list'],
      isLoaded: false
    },
    // Education
    {
      id: 'sanskrit-school',
      name: 'Sanskrit School',
      description: 'Sanskrit school page',
      status: 'active',
      category: 'education',
      features: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      isLoaded: false
    },
    {
      id: 'darshana-school',
      name: 'Darshana School',
      description: 'Darshana school page',
      status: 'active',
      category: 'education',
      features: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      isLoaded: false
    },
    {
      id: 'self-help-school',
      name: 'Self-Help School',
      description: 'Self-help school page',
      status: 'active',
      category: 'education',
      features: ['hero', 'benefits', 'courses', 'testimonials', 'cta'],
      sections: ['hero', 'benefits', 'courses', 'testimonials', 'cta'],
      isLoaded: false
    },
    // Courses
    {
      id: 'sanskrit-course',
      name: 'Sanskrit Course',
      description: 'Sanskrit language course',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'advaita-vedanta-course',
      name: 'Advaita Vedanta Course',
      description: 'Advaita Vedanta Darshan - A Journey Through Drig Drishya Viveka',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'chanakya-code-course',
      name: 'Chanakya Code Course',
      description: 'Chanakya Code - Ancient Wisdom for Modern Leadership',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'yoga-darshan-course',
      name: 'Yoga Darshan Course',
      description: 'Yoga Darshan - Understanding the Philosophy of Yoga',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'nyaya-vaisheshika-course',
      name: 'Nyaya Vaisheshika Course',
      description: 'Nyaya Vaisheshika - Logic and Atomism in Indian Philosophy',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'mimamsa-course',
      name: 'Mimamsa Course',
      description: 'Mimamsa - The Science of Vedic Interpretation',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'vedanta-course',
      name: 'Vedanta Course',
      description: 'Vedanta - The Philosophy of the Upanishads',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'sankhya-course',
      name: 'Sankhya Course',
      description: 'Sankhya - The Philosophy of Numbers and Categories',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'vaisheshika-course',
      name: 'Vaisheshika Course',
      description: 'Vaisheshika - The Philosophy of Particularity',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'nyaya-course',
      name: 'Nyaya Course',
      description: 'Nyaya - The Philosophy of Logic and Reasoning',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'purva-mimamsa-course',
      name: 'Purva Mimamsa Course',
      description: 'Purva Mimamsa - The Philosophy of Vedic Rituals',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    {
      id: 'uttara-mimamsa-course',
      name: 'Uttara Mimamsa Course',
      description: 'Uttara Mimamsa - The Philosophy of the Upanishads',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: false
    },
    // Packages
    {
      id: 'sanskrit-darshan-upanishad-bundle',
      name: 'Sanskrit + Darshan + Upanishad Bundle',
      description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom',
      status: 'active',
      category: 'packages',
      features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      isLoaded: false
    },
    {
      id: 'para-apara-bundle',
      name: 'Para Apara Bundle',
      description: 'Comprehensive package covering both Para and Apara Vidya',
      status: 'active',
      category: 'packages',
      features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      isLoaded: false
    },
    {
      id: 'darshan-bundle',
      name: 'Darshan Bundle',
      description: 'Complete philosophical systems package',
      status: 'active',
      category: 'packages',
      features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      isLoaded: false
    },
    {
      id: 'sanskrit-bundle',
      name: 'Sanskrit Bundle',
      description: 'Complete Sanskrit language learning package',
      status: 'active',
      category: 'packages',
      features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      isLoaded: false
    },
    {
      id: 'upanishad-bundle',
      name: 'Upanishad Bundle',
      description: 'Complete Upanishadic wisdom package',
      status: 'active',
      category: 'packages',
      features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      isLoaded: false
    },
    // Content Management
    {
      id: 'blog',
      name: 'Blog Posts',
      description: 'Blog content management',
      status: 'coming-soon',
      category: 'content',
      features: ['posts', 'categories', 'tags', 'authors'],
      sections: ['posts', 'categories', 'tags', 'authors'],
      isLoaded: false
    }
  ];

  const categories = Array.from(new Set(contentTypes.map(c => c.category)));

  const handleEditClick = (content: ContentTypeStatus) => {
    console.log('FinalFullCMS: Opening edit modal for:', content);
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    console.log('FinalFullCMS: Refreshing...');
    // In a real implementation, this would reload data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management System</h1>
            <p className="text-slate-600">Manage your website content across different categories.</p>
          </div>
          <Button onClick={handleRefresh} className="bg-saffron-600 hover:bg-saffron-700 text-white">
            <RefreshCcw className="mr-2" /> Refresh
          </Button>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 capitalize">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTypes
                .filter(content => content.category === category)
                .map(content => (
                  <Card key={content.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{content.name}</CardTitle>
                        <Badge
                          className={`${
                            content.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : content.status === 'coming-soon'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {content.status}
                        </Badge>
                      </div>
                      <CardDescription>{content.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-500">
                        Sections: {content.sections.length > 0 ? content.sections.join(', ') : 'N/A'}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => handleEditClick(content)} className="bg-saffron-600 hover:bg-saffron-700 text-white">
                        Edit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        ))}

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

        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800">✅ CMS is working! All content types are displayed and ready for editing.</p>
        </div>
      </div>
    </div>
  );
}
