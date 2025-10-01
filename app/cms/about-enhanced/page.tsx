'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  Heart,
  Globe,
  Lightbulb,
  Shield,
  RefreshCw,
  Save,
  Eye,
  Settings
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCMSContent } from '@/lib/cms/hooks';

const sections = [
  { id: 'hero', name: 'Hero Section', icon: Users, description: 'Main about page introduction' },
  { id: 'mission', name: 'Mission & Vision', icon: Target, description: 'Our mission and vision statements' },
  { id: 'values', name: 'Our Values', icon: Heart, description: 'Core values and principles' },
  { id: 'offerings', name: 'What We Offer', icon: BookOpen, description: 'Our educational offerings' },
  { id: 'cta', name: 'Call to Action', icon: Globe, description: 'Final call to action section' }
];

function AboutCMSContent() {
  const { content, loading, error, updateContent } = useCMSContent('/api/cms/about');
  const [previewMode, setPreviewMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading about content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <div className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <Users className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Error Loading Content
            </h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  About Page CMS
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your about page content
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant={previewMode ? "outline" : "default"}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{previewMode ? 'Edit Mode' : 'Preview Mode'}</span>
              </Button>
              <Button 
                onClick={() => updateContent(content)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {sections.map(section => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center space-x-2">
                <section.icon className="w-4 h-4" />
                <span>{section.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map(section => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <section.icon className="w-5 h-5" />
                    <span>{section.name}</span>
                  </CardTitle>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={content?.[section.id]?.title || ''}
                        onChange={(e) => {
                          const newContent = { ...content };
                          if (!newContent[section.id]) newContent[section.id] = {};
                          newContent[section.id].title = e.target.value;
                          updateContent(newContent);
                        }}
                        placeholder={`Enter ${section.name} title...`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        value={content?.[section.id]?.description || ''}
                        onChange={(e) => {
                          const newContent = { ...content };
                          if (!newContent[section.id]) newContent[section.id] = {};
                          newContent[section.id].description = e.target.value;
                          updateContent(newContent);
                        }}
                        placeholder={`Enter ${section.name} description...`}
                      />
                    </div>
                    {section.id === 'hero' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="url"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={content?.[section.id]?.imageUrl || ''}
                          onChange={(e) => {
                            const newContent = { ...content };
                            if (!newContent[section.id]) newContent[section.id] = {};
                            newContent[section.id].imageUrl = e.target.value;
                            updateContent(newContent);
                          }}
                          placeholder="Enter image URL..."
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default function AboutCMSEnhanced() {
  return (
    <AboutCMSContent />
  );
}