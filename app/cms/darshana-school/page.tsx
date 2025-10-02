'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye, Code } from 'lucide-react';
import Link from 'next/link';
import { useGenericCMSContent } from '@/lib/cms/generic-hooks';
import { DarshanaSchoolContent } from '@/lib/cms/darshana-school-types';

// Import editor components
import DarshanaHeroEditor from '@/components/cms/DarshanaHeroEditor';
import DarshanaSchoolsEditor from '@/components/cms/DarshanaSchoolsEditor';
import DarshanaLearningPathEditor from '@/components/cms/DarshanaLearningPathEditor';
import DarshanaMissionEditor from '@/components/cms/DarshanaMissionEditor';
import DarshanaAppEditor from '@/components/cms/DarshanaAppEditor';
import DarshanaCommunityEditor from '@/components/cms/DarshanaCommunityEditor';

export default function DarshanaSchoolCMSAdmin() {
  const { content, updateContent, loading: isLoading, error } = useGenericCMSContent<DarshanaSchoolContent>('/api/cms/darshana-school');
  const [activeTab, setActiveTab] = useState('hero');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Darshana School CMS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading Darshana School CMS: {error}</p>
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
                <h1 className="text-xl font-semibold text-gray-900">Darshana School CMS</h1>
                <p className="text-sm text-gray-500">Manage Darshana school page content</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/schools/darshana" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Darshana School
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
            <TabsTrigger value="darshanas">Schools</TabsTrigger>
            <TabsTrigger value="learningPath">Learning Path</TabsTrigger>
            <TabsTrigger value="mission">Mission</TabsTrigger>
            <TabsTrigger value="app">App</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
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
                  Edit the main hero section of the Darshana school page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DarshanaHeroEditor
                  content={content.hero}
                  onUpdate={(hero) => updateContent({ ...content, hero })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="darshanas">
            <Card>
              <CardHeader>
                <CardTitle>Darshanas Section</CardTitle>
                <CardDescription>
                  Edit the six schools of philosophy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DarshanaSchoolsEditor
                  content={content.darshanas}
                  onUpdate={(darshanas) => updateContent({ ...content, darshanas })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learningPath">
            <Card>
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
                <CardDescription>
                  Edit the structured learning phases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DarshanaLearningPathEditor
                  content={content.learningPath}
                  onUpdate={(learningPath) => updateContent({ ...content, learningPath })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mission">
            <Card>
              <CardHeader>
                <CardTitle>Mission Section</CardTitle>
                <CardDescription>
                  Edit the mission statement and values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DarshanaMissionEditor
                  content={content.mission}
                  onUpdate={(mission) => updateContent({ ...content, mission })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="app">
            <Card>
              <CardHeader>
                <CardTitle>App Section</CardTitle>
                <CardDescription>
                  Edit the mobile app features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DarshanaAppEditor
                  content={content.app}
                  onUpdate={(app) => updateContent({ ...content, app })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Section</CardTitle>
                <CardDescription>
                  Edit the community platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DarshanaCommunityEditor
                  content={content.community}
                  onUpdate={(community) => updateContent({ ...content, community })}
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
                  Edit the complete Darshana School content as JSON. Be careful with syntax - invalid JSON will not be saved.
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
