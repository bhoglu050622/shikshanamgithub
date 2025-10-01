'use client';

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  DollarSign, 
  Users, 
  Target, 
  HelpCircle, 
  MessageCircle,
  Gift,
  TrendingUp,
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
  { id: 'hero', name: 'Hero Section', icon: Heart, description: 'Main donation call-to-action' },
  { id: 'impact', name: 'Impact Stories', icon: TrendingUp, description: 'Show the impact of donations' },
  { id: 'causes', name: 'Causes', icon: Target, description: 'Different causes to support' },
  { id: 'options', name: 'Donation Options', icon: DollarSign, description: 'Donation amounts and methods' },
  { id: 'testimonials', name: 'Testimonials', icon: MessageCircle, description: 'Donor testimonials' },
  { id: 'faq', name: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
  { id: 'cta', name: 'Call to Action', icon: Gift, description: 'Final call to action' }
];

function DonationCMSContent() {
  const { content, loading, error, updateContent } = useCMSContent('/api/cms/donation');
  const [previewMode, setPreviewMode] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading donation content...</p>
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
              <Heart className="w-12 h-12 mx-auto" />
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
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Donation Page CMS
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your donation page content
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant={previewMode ? "outline" : "primary"}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{previewMode ? 'Edit Mode' : 'Preview Mode'}</span>
              </Button>
              <Button 
                onClick={() => updateContent(content)}
                className="bg-red-600 hover:bg-red-700 text-white"
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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {sections.map(section => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center space-x-2">
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.name}</span>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    {section.id === 'options' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Donation Amounts (comma-separated)
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          value={content?.[section.id]?.amounts || ''}
                          onChange={(e) => {
                            const newContent = { ...content };
                            if (!newContent[section.id]) newContent[section.id] = {};
                            newContent[section.id].amounts = e.target.value;
                            updateContent(newContent);
                          }}
                          placeholder="e.g., 25, 50, 100, 250"
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

export default function DonationCMSEnhanced() {
  return (
    <DonationCMSContent />
  );
}