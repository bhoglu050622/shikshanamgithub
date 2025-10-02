'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye, Code } from 'lucide-react';
import Link from 'next/link';
import { useSchoolCMSContent } from '@/lib/cms/school-hooks';
import { SchoolPageContent } from '@/lib/cms/school-page-types';

// Import editor components
import SchoolHeroEditor from '@/components/cms/SchoolHeroEditor';
import SchoolPlayLearnEditor from '@/components/cms/SchoolPlayLearnEditor';
import SchoolSequentialPathEditor from '@/components/cms/SchoolSequentialPathEditor';
import SchoolMeetGurusEditor from '@/components/cms/SchoolMeetGurusEditor';
import SchoolAIClockEditor from '@/components/cms/SchoolAIClockEditor';
import SchoolResourcesEditor from '@/components/cms/SchoolResourcesEditor';

export default function SanskritSchoolCMSAdmin() {
  const { content, updateContent, loading: isLoading, error } = useSchoolCMSContent('/api/cms/sanskrit-school');
  const [activeTab, setActiveTab] = useState('hero');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Sanskrit School CMS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading Sanskrit School CMS: {error}</p>
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
                <h1 className="text-xl font-semibold text-gray-900">Sanskrit School CMS</h1>
                <p className="text-sm text-gray-500">Manage Sanskrit school page content</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/schools/sanskrit" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Sanskrit School
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="playLearn">Play & Learn</TabsTrigger>
            <TabsTrigger value="sequentialPath">Sequential Path</TabsTrigger>
            <TabsTrigger value="meetGurus">Meet Gurus</TabsTrigger>
            <TabsTrigger value="aiClock">AI Clock</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
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
                  Edit the main hero section of the Sanskrit school page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolHeroEditor
                  content={content.hero}
                  onUpdate={(hero) => updateContent({ ...content, hero })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playLearn">
            <Card>
              <CardHeader>
                <CardTitle>Play & Learn Section</CardTitle>
                <CardDescription>
                  Edit the interactive learning section with flashcards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolPlayLearnEditor
                  content={content.playLearn}
                  onUpdate={(playLearn) => updateContent({ ...content, playLearn })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sequentialPath">
            <Card>
              <CardHeader>
                <CardTitle>Sequential Path</CardTitle>
                <CardDescription>
                  Edit the learning levels and progression path
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolSequentialPathEditor
                  content={content.sequentialPath}
                  onUpdate={(sequentialPath) => updateContent({ ...content, sequentialPath })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetGurus">
            <Card>
              <CardHeader>
                <CardTitle>Meet Your Gurus</CardTitle>
                <CardDescription>
                  Edit the gurus and teachers section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolMeetGurusEditor
                  content={content.meetGurus}
                  onUpdate={(meetGurus) => updateContent({ ...content, meetGurus })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aiClock">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Learning</CardTitle>
                <CardDescription>
                  Edit the AI features and capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolAIClockEditor
                  content={content.aiClock}
                  onUpdate={(aiClock) => updateContent({ ...content, aiClock })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resources & Treasury</CardTitle>
                <CardDescription>
                  Edit the learning resources and materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolResourcesEditor
                  content={content.resources}
                  onUpdate={(resources) => updateContent({ ...content, resources })}
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
                  Edit the complete Sanskrit School content as JSON. Be careful with syntax - invalid JSON will not be saved.
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
