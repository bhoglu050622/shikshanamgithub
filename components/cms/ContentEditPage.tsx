'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Save, 
  RotateCcw, 
  Eye, 
  X, 
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Edit,
  Code,
  Palette,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Import existing editors
import HeroEditor from './HeroEditor';
import AlignYourselfEditor from './AlignYourselfEditor';
import SchoolsEditor from './SchoolsEditor';
import MeetGurusEditor from './MeetGurusEditor';
import StudentStoriesEditor from './StudentStoriesEditor';
import TestimonialsEditor from './TestimonialsEditor';
import CommunityPostsEditor from './CommunityPostsEditor';
import FoundersMissionEditor from './FoundersMissionEditor';
import ContributeEditor from './ContributeEditor';
import DownloadAppEditor from './DownloadAppEditor';
import FAQEditor from './FAQEditor';
import { ContentRegistry } from '@/lib/cms/content-registry';
import UniversalEditor from './UniversalEditor';

interface ContentTypeStatus {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon' | 'deprecated';
  category: string;
  features: string[];
  sections: string[];
  lastUpdated?: Date;
  isLoaded?: boolean;
}

interface ContentEditPageProps {
  contentType: ContentTypeStatus;
}

export default function ContentEditPage({ contentType }: ContentEditPageProps) {
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (contentType) {
      loadContent();
      // Set first section as active
      if (contentType.sections.length > 0) {
        setActiveSection(contentType.sections[0]);
      }
    }
  }, [contentType]);

  // Trigger layout refresh for Code Editor after mount
  useEffect(() => {
    if (activeTab === 'code') {
      // Force layout recalculation for Code Editor
      const timer = setTimeout(() => {
        const textarea = document.querySelector('textarea[placeholder="Enter JSON content..."]') as HTMLTextAreaElement;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Get the full content type configuration
      const contentConfig = ContentRegistry.getContentType(contentType.id);
      if (!contentConfig) {
        throw new Error(`Content type ${contentType.id} not found`);
      }

      // Load content from API
      const response = await fetch(`/api/cms/${contentType.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to prevent stale data
        cache: 'no-cache'
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setContent(result.data);
        } else {
          // Use default content if API fails
          setContent(contentConfig.defaultContent);
        }
      } else {
        console.warn(`API call failed for ${contentType.id}, using default content`);
        // Use default content if API fails
        setContent(contentConfig.defaultContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Use default content as fallback
      const contentConfig = ContentRegistry.getContentType(contentType.id);
      if (contentConfig) {
        setContent(contentConfig.defaultContent);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/cms/${contentType.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
        cache: 'no-cache'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setMessage({ type: 'success', text: 'Content saved successfully!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          throw new Error(result.message || 'Failed to save content');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to save content`);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to save content' 
      });
    } finally {
      setSaving(false);
    }
  };

  const resetContent = () => {
    const contentConfig = ContentRegistry.getContentType(contentType.id);
    if (contentConfig) {
      setContent(contentConfig.defaultContent);
      setMessage({ type: 'success', text: 'Content reset to default' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const previewSite = () => {
    window.open(`/${contentType.id}`, '_blank');
  };

  const updateSectionContent = (section: string, data: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const getSectionEditor = (section: string) => {
    const editorProps = {
      content: content?.[section] || {},
      onChange: (data: any) => updateSectionContent(section, data)
    };

    // Use specific editors where available, UniversalEditor as fallback
    switch (contentType.id) {
      case 'homepage':
        switch (section) {
          case 'hero': return <HeroEditor {...editorProps} />;
          case 'alignYourself': return <AlignYourselfEditor {...editorProps} />;
          case 'schools': return <SchoolsEditor {...editorProps} />;
          case 'meetGurus': return <MeetGurusEditor {...editorProps} />;
          case 'studentStories': return <StudentStoriesEditor {...editorProps} />;
          case 'testimonials': return <TestimonialsEditor {...editorProps} />;
          case 'communityPosts': return <CommunityPostsEditor {...editorProps} />;
          case 'foundersMission': return <FoundersMissionEditor {...editorProps} />;
          case 'contribute': return <ContributeEditor {...editorProps} />;
          case 'downloadApp': return <DownloadAppEditor {...editorProps} />;
          case 'faq': return <FAQEditor {...editorProps} />;
          default: return <UniversalEditor sectionName={section} {...editorProps} />;
        }
      case 'about':
        switch (section) {
          case 'hero': return <AboutHeroEditor {...editorProps} />;
          case 'mission': return <AboutMissionEditor {...editorProps} />;
          case 'values': return <AboutValuesEditor {...editorProps} />;
          case 'offerings': return <AboutOfferingsEditor {...editorProps} />;
          case 'cta': return <AboutCTAEditor {...editorProps} />;
          default: return <UniversalEditor sectionName={section} {...editorProps} />;
        }
      case 'contact':
        switch (section) {
          case 'hero': return <ContactHeroEditor {...editorProps} />;
          case 'form': return <ContactFormEditor {...editorProps} />;
          case 'info': return <ContactInfoEditor {...editorProps} />;
          case 'quickHelp': return <ContactQuickHelpEditor {...editorProps} />;
          default: return <UniversalEditor sectionName={section} {...editorProps} />;
        }
      case 'donation':
        switch (section) {
          case 'hero': return <DonationHeroEditor {...editorProps} />;
          case 'impact': return <DonationImpactEditor {...editorProps} />;
          case 'causes': return <DonationCausesEditor {...editorProps} />;
          case 'options': return <DonationOptionsEditor {...editorProps} />;
          case 'testimonials': return <DonationTestimonialsEditor {...editorProps} />;
          case 'faq': return <DonationFAQEditor {...editorProps} />;
          case 'cta': return <DonationCTAEditor {...editorProps} />;
          default: return <UniversalEditor sectionName={section} {...editorProps} />;
        }
      case 'schools':
        switch (section) {
          case 'hero': return <SchoolsHeroEditor {...editorProps} />;
          case 'list': return <SchoolsListEditor {...editorProps} />;
          case 'cta': return <SchoolsCTAEditor {...editorProps} />;
          default: return <UniversalEditor sectionName={section} {...editorProps} />;
        }
      default:
        // For all other content types (courses, etc.), use UniversalEditor
        return <UniversalEditor sectionName={section} {...editorProps} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading content...</p>
        </div>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Edit className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Edit {contentType.name}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {contentType.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${
                contentType.status === 'active' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              }`}>
                {contentType.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              onClick={saveContent} 
              disabled={saving || !content}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              onClick={resetContent} 
              disabled={saving || !content}
              variant="outline"
              className="px-6 py-2.5 rounded-lg font-medium border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={previewSite} 
              variant="outline"
              className="px-6 py-2.5 rounded-lg font-medium border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={loadContent} 
              disabled={loading}
              variant="outline"
              className="px-6 py-2.5 rounded-lg font-medium border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {content ? new Date().toLocaleTimeString() : 'Never'}
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {!content ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Failed to load content</p>
              <Button onClick={loadContent} className="mt-4">
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* Editor Mode Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-gray-200 px-6 py-4">
                <TabsList className="bg-gray-100 p-1 rounded-xl w-fit">
                  <TabsTrigger 
                    value="visual" 
                    className="flex items-center space-x-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Visual Editor</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="code" 
                    className="flex items-center space-x-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-600 rounded-lg font-medium transition-all duration-200"
                  >
                    <Code className="w-4 h-4" />
                    <span>Code Editor</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="visual" className="p-6">
                <div className="space-y-6">
                  <Tabs value={activeSection} onValueChange={setActiveSection}>
                    <div className="mb-6">
                      <TabsList className="bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                        {contentType.sections.map(section => (
                          <TabsTrigger 
                            key={section} 
                            value={section} 
                            className="whitespace-nowrap px-4 py-2.5 text-sm font-medium data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 rounded-lg transition-all duration-200 hover:bg-gray-50"
                          >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl border border-gray-200 p-8">
                      {contentType.sections.map(section => (
                        <TabsContent key={section} value={section} className="mt-0">
                          <div className="w-full">
                            {getSectionEditor(section)}
                          </div>
                        </TabsContent>
                      ))}
                    </div>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="code" className="p-6">
                <div className="bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Code className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Raw Content (JSON)</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Edit the raw JSON content directly. Be careful with syntax.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <textarea
                      className="w-full font-mono text-sm border border-gray-300 rounded-lg p-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={JSON.stringify(content, null, 2)}
                      onChange={(e) => {
                        try {
                          const newContent = JSON.parse(e.target.value);
                          setContent(newContent);
                        } catch (error) {
                          // Invalid JSON, don't update
                        }
                      }}
                      placeholder="Enter JSON content..."
                      style={{ 
                        minHeight: '500px',
                        height: '500px'
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
