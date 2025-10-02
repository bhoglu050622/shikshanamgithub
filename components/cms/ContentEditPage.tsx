'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  ArrowLeft,
  Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Code editor only - no visual editors needed

import { ContentRegistry } from '@/lib/cms/content-registry';

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
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);


  // Trigger layout refresh for Code Editor after mount
  useEffect(() => {
    // Force layout recalculation for Code Editor
    const timer = setTimeout(() => {
      const textarea = document.querySelector('textarea[placeholder="Enter JSON content..."]') as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      console.log('Loading content for:', contentType?.id);
      
      // For homepage sections, load from the content API
      if (contentType?.id === 'homepage') {
        const response = await fetch('/api/cms/content', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('Homepage API response:', result);
          if (result.success && result.data) {
            console.log('Full homepage data loaded:', result.data);
            setContent(result.data);
            setLoading(false);
            return;
          }
        }
      }
      
      // For other content types, try their specific API endpoints
      const contentConfig = ContentRegistry.getContentType(contentType?.id);
      if (contentConfig?.apiEndpoint) {
        try {
          const response = await fetch(contentConfig.apiEndpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-cache'
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log(`${contentType?.id} API response:`, result);
            if (result.success && result.data && result.data.length > 0) {
              console.log(`Full ${contentType?.id} data loaded:`, result.data[0]);
              setContent(result.data[0]);
              setLoading(false);
              return;
            }
          }
        } catch (error) {
          console.log(`API endpoint ${contentConfig.apiEndpoint} not available, using default data`);
        }
      }
      
      // Get the full content type configuration (already declared above)
      console.log('Content config:', contentConfig);
      if (!contentConfig) {
        console.error(`Content type ${contentType?.id} not found in ContentRegistry`);
        // Use default content structure based on content type sections
        const defaultContent: any = {};
        if (contentType?.sections && Array.isArray(contentType.sections)) {
          contentType.sections.forEach(section => {
            defaultContent[section] = {
              title: `${section.charAt(0).toUpperCase() + section.slice(1)} Section`,
              subtitle: `Edit the ${section} content`,
              description: `This is the ${section} section content.`,
              ...(section === 'hero' && {
                title: 'Welcome to Shikshanam',
                subtitle: 'Where AI meets Ancient India',
                description: 'Preserving and sharing ancient Indian wisdom with the modern world'
              })
            };
          });
        } else {
          // Fallback to basic structure
          defaultContent.hero = {
            title: 'Welcome to Shikshanam',
            subtitle: 'Where AI meets Ancient India',
            description: 'Preserving and sharing ancient Indian wisdom with the modern world'
          };
        }
        setContent(defaultContent);
        setLoading(false);
        return;
      }

      // Use the correct API endpoint from the content config
      const apiEndpoint = contentConfig.apiEndpoint;
      console.log('API endpoint:', apiEndpoint);
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control to prevent stale data
        cache: 'no-cache'
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('API response:', result);
        if (result.success && result.data) {
          // Ensure content has proper structure with fallback values
          const contentData = result.data || {};
          console.log('Content data:', contentData);
          
          const structuredContent = {
            hero: contentData.hero || {},
            alignYourself: contentData.alignYourself || {},
            schools: contentData.schools || {},
            meetGurus: contentData.meetGurus || {},
            studentStories: contentData.studentStories || {},
            testimonials: contentData.testimonials || {},
            communityPosts: contentData.communityPosts || {},
            foundersMission: contentData.foundersMission || {},
            contribute: contentData.contribute || {},
            downloadApp: contentData.downloadApp || {},
            faq: contentData.faq || {},
            ...contentData // Include any other properties
          };
          
          console.log('Structured content:', structuredContent);
          setContent(structuredContent);
        } else {
          // Use empty content structure if API fails
          const emptyContent: any = {};
          if (contentType?.sections && Array.isArray(contentType.sections)) {
            contentType.sections.forEach(section => {
              emptyContent[section] = {};
            });
          } else {
            emptyContent.hero = {};
          }
          setContent(emptyContent);
        }
        } else {
          console.warn(`API call failed for ${contentType?.id}, using empty content`);
          // Use empty content structure if API fails
          const emptyContent: any = {};
          if (contentType?.sections && Array.isArray(contentType.sections)) {
            contentType.sections.forEach(section => {
              emptyContent[section] = {};
            });
          } else {
            emptyContent.hero = {};
          }
          setContent(emptyContent);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        // Use empty content as fallback
        const emptyContent: any = {};
        if (contentType?.sections && Array.isArray(contentType.sections)) {
          contentType.sections.forEach(section => {
            emptyContent[section] = {};
          });
        } else {
          emptyContent.hero = {};
        }
        setContent(emptyContent);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    if (contentType && contentType.sections && Array.isArray(contentType.sections)) {
      // Always set some content to show the editor interface
      // Create default content structure based on the content type sections
      const defaultContent: any = {};
      contentType.sections.forEach(section => {
        defaultContent[section] = {};
      });
      setContent(defaultContent);
      // Then try to load actual content
      loadContent();
    } else {
      console.error('ContentType or sections not properly defined:', contentType);
      // Set a basic default content structure
      const defaultContent = { hero: {} };
      setContent(defaultContent);
    }
  }, [contentType, loadContent]);

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      // Get the correct API endpoint from content config
      const contentConfig = ContentRegistry.getContentType(contentType.id);
      const apiEndpoint = contentConfig?.apiEndpoint || `/api/cms/${contentType.id}`;
      
      const response = await fetch(apiEndpoint, {
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
    setContent({});
    setMessage({ type: 'success', text: 'Content reset to empty' });
    setTimeout(() => setMessage(null), 3000);
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
            Last updated: {content ? new Date().toISOString().split('T')[1].split('.')[0] : 'Never'}
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
            {/* Code Editor Only */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Enhanced Code Editor</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Edit the complete JSON content with syntax highlighting and validation.
                  </p>
                </div>
              </div>
            </div>

            {/* Code Editor Content */}
            <div className="p-6">
                <div className="bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Code className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Enhanced Code Editor</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Edit the complete JSON content with syntax highlighting and validation.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (content) {
                              const formatted = JSON.stringify(content, null, 2);
                              navigator.clipboard.writeText(formatted);
                              setMessage({ type: 'success', text: 'JSON copied to clipboard!' });
                              setTimeout(() => setMessage(null), 3000);
                            }
                          }}
                          className="text-xs"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (content) {
                              const formatted = JSON.stringify(content, null, 2);
                              const blob = new Blob([formatted], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `${contentType.id}-content.json`;
                              a.click();
                              URL.revokeObjectURL(url);
                            }
                          }}
                          className="text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="relative">
                      <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono">
                        {content ? Object.keys(content).length : 0} sections
                      </div>
                      <textarea
                        className="w-full font-mono text-sm border border-gray-300 rounded-lg p-6 pt-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        value={content ? JSON.stringify(content, null, 2) : '{}'}
                        onChange={(e) => {
                          try {
                            const newContent = JSON.parse(e.target.value);
                            setContent(newContent);
                            setMessage(null);
                          } catch (error) {
                            setMessage({ 
                              type: 'error', 
                              text: 'Invalid JSON syntax. Please check your formatting.' 
                            });
                          }
                        }}
                        placeholder="Enter JSON content..."
                        style={{ 
                          minHeight: '500px',
                          height: '500px',
                          background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 0%)',
                          backgroundSize: '20px 20px',
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, #e9ecef 20px)'
                        }}
                      />
                      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                        {content ? JSON.stringify(content, null, 2).length : 0} characters
                      </div>
                    </div>
                    {content && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Valid JSON with {Object.keys(content).length} sections
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-green-700">
                          Sections: {Object.keys(content).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
