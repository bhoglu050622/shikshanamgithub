'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye, Code } from 'lucide-react';
import Link from 'next/link';
import { useGenericCMSContent } from '@/lib/cms/generic-hooks';
import { SelfHelpSchoolContent } from '@/lib/cms/self-help-school-types';

// Import editor components
import SelfHelpHeroEditor from '@/components/cms/SelfHelpHeroEditor';
import SelfHelpCoursesEditor from '@/components/cms/SelfHelpCoursesEditor';
import SelfHelpBenefitsEditor from '@/components/cms/SelfHelpBenefitsEditor';
import SelfHelpTestimonialsEditor from '@/components/cms/SelfHelpTestimonialsEditor';
import SelfHelpCTAEditor from '@/components/cms/SelfHelpCTAEditor';

export default function SelfHelpSchoolCMSAdmin() {
  const { content, updateContent, loading: isLoading, error } = useGenericCMSContent<SelfHelpSchoolContent>('/api/cms/self-help-school');
  const [activeTab, setActiveTab] = useState('hero');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Self-Help School CMS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading Self-Help School CMS: {error}</p>
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
                <h1 className="text-xl font-semibold text-gray-900">Self-Help School CMS</h1>
                <p className="text-sm text-gray-500">Manage Self-Help school page content</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/schools/self-help" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Self-Help School
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
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
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
                  Edit the main hero section of the Self-Help school page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SelfHelpHeroEditor
                  content={content.hero}
                  onUpdate={(hero) => updateContent({ ...content, hero })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Courses Section</CardTitle>
                <CardDescription>
                  Edit the transformative programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SelfHelpCoursesEditor
                  content={content.courses}
                  onUpdate={(courses) => updateContent({ ...content, courses })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Benefits Section</CardTitle>
                <CardDescription>
                  Edit the advantages and benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SelfHelpBenefitsEditor
                  content={content.benefits}
                  onUpdate={(benefits) => updateContent({ ...content, benefits })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Section</CardTitle>
                <CardDescription>
                  Edit the success stories and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SelfHelpTestimonialsEditor
                  content={content.testimonials}
                  onUpdate={(testimonials) => updateContent({ ...content, testimonials })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cta">
            <Card>
              <CardHeader>
                <CardTitle>Call-to-Action Section</CardTitle>
                <CardDescription>
                  Edit the final call-to-action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SelfHelpCTAEditor
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
                  Edit the complete Self-Help School content as JSON. Be careful with syntax - invalid JSON will not be saved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={JSON.stringify(content, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        updateContent(parsed);
                      } catch (error) {
                        // Invalid JSON, don't update
                        console.error('Invalid JSON:', error);
                      }
                    }}
                    placeholder="Edit JSON content directly..."
                    rows={25}
                    className="font-mono text-sm bg-gray-50"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{JSON.stringify(content, null, 2).length} characters</span>
                    <span>Edit carefully - auto-saves on valid JSON</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
