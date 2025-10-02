'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye, Code } from 'lucide-react';
import EnhancedCodeEditor from '@/components/cms/EnhancedCodeEditor';
import Link from 'next/link';
import { useGenericCMSContent } from '@/lib/cms/generic-hooks';
import { AboutContent } from '@/lib/cms/about-types';

// Import editor components
import AboutHeroEditor from '@/components/cms/AboutHeroEditor';
import AboutMissionEditor from '@/components/cms/AboutMissionEditor';
import AboutOfferingsEditor from '@/components/cms/AboutOfferingsEditor';
import AboutValuesEditor from '@/components/cms/AboutValuesEditor';
import AboutCTAEditor from '@/components/cms/AboutCTAEditor';

export default function AboutCMSAdmin() {
  const { content, updateContent, loading: isLoading, error } = useGenericCMSContent<AboutContent>('/api/cms/about');
  const [activeTab, setActiveTab] = useState('hero');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading About CMS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading About CMS: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No content found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/cms">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to CMS
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">About Page CMS</h1>
                <p className="text-sm text-gray-500">Manage About page content</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/about" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View About Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="offerings">Offerings</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="cta">Call to Action</TabsTrigger>
            <TabsTrigger value="code">
              <Code className="w-4 h-4 mr-2" />
              Total Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>
                  Edit the main hero section of the About page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutHeroEditor
                  content={content.hero}
                  onUpdate={(hero) => updateContent({ ...content, hero })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mission">
            <Card>
              <CardHeader>
                <CardTitle>Mission & Vision</CardTitle>
                <CardDescription>
                  Edit the mission statement and vision
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutMissionEditor
                  content={content.mission}
                  onUpdate={(mission) => updateContent({ ...content, mission })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offerings">
            <Card>
              <CardHeader>
                <CardTitle>What We Offer</CardTitle>
                <CardDescription>
                  Edit the offerings section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutOfferingsEditor
                  content={content.offerings}
                  onUpdate={(offerings) => updateContent({ ...content, offerings })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="values">
            <Card>
              <CardHeader>
                <CardTitle>Our Values</CardTitle>
                <CardDescription>
                  Edit the values section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutValuesEditor
                  content={content.values}
                  onUpdate={(values) => updateContent({ ...content, values })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cta">
            <Card>
              <CardHeader>
                <CardTitle>Call to Action</CardTitle>
                <CardDescription>
                  Edit the CTA section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutCTAEditor
                  content={content.cta}
                  onUpdate={(cta) => updateContent({ ...content, cta })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Total Content - Code Editor
                </CardTitle>
                <CardDescription>
                  Edit the complete About page content as JSON. Be careful with syntax - invalid JSON will not be saved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedCodeEditor
                  value={JSON.stringify(content, null, 2)}
                  onChange={(value) => {
                    try {
                      const parsed = JSON.parse(value);
                      updateContent(parsed);
                    } catch (error) {
                      // Invalid JSON, don't update
                      console.error('Invalid JSON:', error);
                    }
                  }}
                  onSave={() => updateContent(content)}
                  language="json"
                  height="600px"
                  placeholder="Edit JSON content directly..."
                  enableSearch={true}
                  enableUndoRedo={true}
                  enableAutoFormat={true}
                  showLineNumbers={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
