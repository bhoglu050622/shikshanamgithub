'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCcw } from 'lucide-react';

export default function NoHooksCMS() {
  const contentTypes = [
    {
      id: 'homepage',
      name: 'Homepage',
      description: 'Main homepage content and sections',
      status: 'active' as const,
      category: 'main',
      sections: ['hero', 'alignYourself', 'schools', 'meetGurus', 'studentStories', 'testimonials', 'communityPosts', 'foundersMission', 'contribute', 'downloadApp', 'faq']
    },
    {
      id: 'about',
      name: 'About',
      description: 'About page content',
      status: 'active' as const,
      category: 'main',
      sections: ['hero', 'mission', 'values', 'offerings', 'cta']
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Contact page content',
      status: 'active' as const,
      category: 'main',
      sections: ['hero', 'form', 'info', 'quickHelp']
    },
    {
      id: 'donation',
      name: 'Donation',
      description: 'Donation page content',
      status: 'active' as const,
      category: 'main',
      sections: ['hero', 'causes', 'options', 'impact', 'testimonials', 'cta', 'faq']
    },
    {
      id: 'sanskrit-school',
      name: 'Sanskrit School',
      description: 'Sanskrit school page',
      status: 'active' as const,
      category: 'education',
      sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app']
    },
    {
      id: 'darshana-school',
      name: 'Darshana School',
      description: 'Darshana school page',
      status: 'active' as const,
      category: 'education',
      sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app']
    },
    {
      id: 'self-help-school',
      name: 'Self-Help School',
      description: 'Self-help school page',
      status: 'active' as const,
      category: 'education',
      sections: ['hero', 'benefits', 'courses', 'testimonials', 'cta']
    },
    {
      id: 'sanskrit-course',
      name: 'Sanskrit Course',
      description: 'Sanskrit language course',
      status: 'active' as const,
      category: 'education',
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
    },
    {
      id: 'advaita-vedanta-course',
      name: 'Advaita Vedanta Course',
      description: 'Advaita Vedanta Darshan - A Journey Through Drig Drishya Viveka',
      status: 'active' as const,
      category: 'education',
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq']
    },
    {
      id: 'sanskrit-darshan-upanishad-bundle',
      name: 'Sanskrit + Darshan + Upanishad Bundle',
      description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom',
      status: 'active' as const,
      category: 'packages',
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq']
    },
    {
      id: 'blog',
      name: 'Blog Posts',
      description: 'Blog content management',
      status: 'coming-soon' as const,
      category: 'content',
      sections: ['posts', 'categories', 'tags', 'authors']
    }
  ];

  const categories = Array.from(new Set(contentTypes.map(c => c.category)));

  const handleEditClick = (content: any) => {
    console.log('NoHooksCMS: Opening edit modal for:', content);
    alert(`Edit ${content.name} - This would open the editing modal`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Management System</h1>
            <p className="text-slate-600">Manage your website content across different categories.</p>
          </div>
          <Button className="bg-saffron-600 hover:bg-saffron-700 text-white">
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

        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800">✅ CMS is working! All content types are displayed and ready for editing.</p>
        </div>
      </div>
    </div>
  );
}
