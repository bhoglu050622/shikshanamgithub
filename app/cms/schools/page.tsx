'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye, Code } from 'lucide-react';
import Link from 'next/link';
import { useGenericCMSContent } from '@/lib/cms/generic-hooks';
import { SchoolsContent } from '@/lib/cms/schools-types';

// Import editor components
import SchoolsHeroEditor from '@/components/cms/SchoolsHeroEditor';
import SchoolsListEditor from '@/components/cms/SchoolsListEditor';

export default function SchoolsCMSAdmin() {
  const { content, updateContent, loading: isLoading, error } = useGenericCMSContent<SchoolsContent>('/api/cms/schools');
  const [activeTab, setActiveTab] = useState('hero');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Schools CMS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading Schools CMS: {error}</p>
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
                <h1 className="text-xl font-semibold text-gray-900">Schools Page CMS</h1>
                <p className="text-sm text-gray-500">Manage Schools page content</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/schools" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Schools Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="schools">Schools List</TabsTrigger>
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
                  Edit the main hero section of the Schools page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolsHeroEditor
                  content={content.hero}
                  onUpdate={(hero) => updateContent({ ...content, hero })}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schools">
            <Card>
              <CardHeader>
                <CardTitle>Schools List</CardTitle>
                <CardDescription>
                  Edit the schools and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SchoolsListEditor
                  content={content.schools}
                  onUpdate={(schools) => updateContent({ ...content, schools })}
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
                  Edit the complete Schools page content as JSON. Be careful with syntax - invalid JSON will not be saved.
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
