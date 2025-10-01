'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Palette, 
  Image as ImageIcon, 
  Video, 
  Link as LinkIcon,
  Eye,
  Save,
  Settings,
  Wand2
} from 'lucide-react';

import EnhancedCMS from '@/components/cms/EnhancedCMS';
import { useCMSContent } from '@/lib/cms/hooks';

export default function CMSHomepageEnhanced() {
  const { content, loading, error, updateContent } = useCMSContent();
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState(false);

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: Home },
    { id: 'alignYourself', name: 'Align Yourself', icon: Palette },
    { id: 'schools', name: 'Schools', icon: ImageIcon },
    { id: 'meetGurus', name: 'Meet Gurus', icon: Video },
    { id: 'studentStories', name: 'Student Stories', icon: LinkIcon },
    { id: 'testimonials', name: 'Testimonials', icon: Eye },
    { id: 'communityPosts', name: 'Community Posts', icon: Save },
    { id: 'foundersMission', name: 'Founders Mission', icon: Settings },
    { id: 'contribute', name: 'Contribute', icon: Wand2 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Error Loading Content</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enhanced Homepage CMS</h1>
              <p className="text-gray-600 mt-2">Customize your homepage with colors, images, videos, and links</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {content ? 'Connected' : 'Disconnected'}
              </Badge>
              <Button
                variant={previewMode ? "primary" : "outline"}
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "primary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <section.icon className="w-4 h-4 mr-2" />
                      {section.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const newContent = { ...content };
                      newContent.customization = {
                        colors: {},
                        text: {},
                        images: [],
                        videos: [],
                        links: []
                      };
                      updateContent(newContent);
                    }}
                  >
                    Reset All Customizations
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const css = `
                        /* Generated CSS for ${activeSection} */
                        .custom-${activeSection} {
                          --primary-color: ${content?.customization?.colors?.primary || '#3b82f6'};
                          --secondary-color: ${content?.customization?.colors?.secondary || '#64748b'};
                          --accent-color: ${content?.customization?.colors?.accent || '#f59e0b'};
                          --background-color: ${content?.customization?.colors?.background || '#ffffff'};
                          --text-color: ${content?.customization?.colors?.text || '#1f2937'};
                        }
                      `;
                      navigator.clipboard.writeText(css);
                      alert('CSS copied to clipboard!');
                    }}
                  >
                    Copy CSS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {previewMode ? (
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">Preview Mode</h2>
                      <p className="text-gray-600">This is how your {activeSection} section will look</p>
                    </div>
                    
                    {/* Preview content based on active section */}
                    {activeSection === 'hero' && (
                      <div className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                        <h1 className="text-4xl font-bold mb-4">
                          {content?.hero?.title || 'Welcome to Shikshanam'}
                        </h1>
                        <p className="text-xl mb-8">
                          {content?.hero?.subtitle || 'Where AI meets Ancient India'}
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                            School of Sanskrit
                          </button>
                          <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold">
                            School of Darshan
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {activeSection === 'alignYourself' && (
                      <div className="text-center py-8">
                        <h2 className="text-3xl font-bold mb-4">
                          {content?.alignYourself?.title || 'Two Ways to Begin Your Journey!'}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                          {content?.alignYourself?.subtitle || 'Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.'}
                        </p>
                      </div>
                    )}
                    
                    {/* Add more preview sections as needed */}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <EnhancedCMS
                content={content}
                onUpdate={updateContent}
                section={activeSection}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
