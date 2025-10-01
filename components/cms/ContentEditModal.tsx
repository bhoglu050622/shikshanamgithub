'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Palette
} from 'lucide-react';

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
import VisualEditor from './VisualEditor';
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

interface ContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: ContentTypeStatus;
  onRefresh: () => void;
}

export default function ContentEditModal({ 
  isOpen, 
  onClose, 
  contentType, 
  onRefresh 
}: ContentEditModalProps) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (isOpen && contentType) {
      loadContent();
      // Set first section as active
      if (contentType.sections.length > 0) {
        setActiveSection(contentType.sections[0]);
      }
    }
  }, [isOpen, contentType]);

  const loadContent = async () => {
    setLoading(true);
    try {
      // Get the full content type configuration
      const fullContentType = ContentRegistry.getContentType(contentType.id);
      const apiEndpoint = fullContentType?.apiEndpoint;
      
      if (!apiEndpoint) {
        throw new Error(`API endpoint not found for content type: ${contentType.id}`);
      }

      const response = await fetch(apiEndpoint);
      const result = await response.json();
      
      if (result.success) {
        // Ensure content has proper structure with fallback values
        const contentData = result.data || {};
        console.log('Loaded content data:', contentData);
        
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
        setMessage({ type: 'error', text: 'Failed to load content' });
        // Set empty content structure as fallback
        setContent({
          hero: {},
          alignYourself: {},
          schools: {},
          meetGurus: {},
          studentStories: {},
          testimonials: {},
          communityPosts: {},
          foundersMission: {},
          contribute: {},
          downloadApp: {},
          faq: {}
        });
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
      // Set empty content structure as fallback
      setContent({
        hero: {},
        alignYourself: {},
        schools: {},
        meetGurus: {},
        studentStories: {},
        testimonials: {},
        communityPosts: {},
        foundersMission: {},
        contribute: {},
        downloadApp: {},
        faq: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const fullContentType = ContentRegistry.getContentType(contentType.id);
      const apiEndpoint = fullContentType?.apiEndpoint;
      if (!apiEndpoint) {
        throw new Error('API endpoint not found');
      }

      const response = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Content saved successfully!' });
        setTimeout(() => setMessage(null), 3000);
        onRefresh(); // Refresh the main dashboard
      } else {
        setMessage({ type: 'error', text: 'Failed to save content' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save content' });
    } finally {
      setSaving(false);
    }
  };

  const resetContent = async () => {
    if (!confirm('Are you sure you want to reset all content to default? This action cannot be undone.')) {
      return;
    }
    
    setSaving(true);
    try {
      const fullContentType = ContentRegistry.getContentType(contentType.id);
      const apiEndpoint = fullContentType?.apiEndpoint;
      if (!apiEndpoint) {
        throw new Error('API endpoint not found');
      }

      const response = await fetch(`${apiEndpoint}/reset`, {
        method: 'POST',
      });
      
      const result = await response.json();
      
      if (result.success) {
        await loadContent();
        setMessage({ type: 'success', text: 'Content reset to default' });
        setTimeout(() => setMessage(null), 3000);
        onRefresh();
      } else {
        setMessage({ type: 'error', text: 'Failed to reset content' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reset content' });
    } finally {
      setSaving(false);
    }
  };

  const previewSite = () => {
    const fullContentType = ContentRegistry.getContentType(contentType.id);
    const frontendPath = fullContentType?.frontendPath;
    if (frontendPath) {
      window.open(frontendPath, '_blank');
    }
  };

  const getSectionEditor = (section: string) => {
    if (!content) return null;

    const sectionKey = section.charAt(0).toLowerCase() + section.slice(1);
    
    // Provide proper default values for each section
    const getDefaultSectionContent = (section: string) => {
      switch (section) {
        case 'hero':
          return {
            title: '',
            subtitle: '',
            ctaButtons: {
              sanskrit: { text: '', link: '' },
              darshan: { text: '', link: '' },
              lifeSkills: { text: '', link: '' }
            }
          };
        case 'alignYourself':
          return {
            title: '',
            subtitle: '',
            liveClasses: [],
            selfPacedCourses: []
          };
        case 'schools':
          return {
            title: '',
            subtitle: '',
            schools: []
          };
        case 'meetGurus':
          return {
            title: '',
            subtitle: '',
            gurus: []
          };
        case 'studentStories':
          return {
            title: '',
            subtitle: '',
            stories: []
          };
        case 'testimonials':
          return {
            title: '',
            subtitle: '',
            stats: {},
            testimonials: []
          };
        case 'communityPosts':
          return {
            title: '',
            subtitle: '',
            stats: {},
            posts: []
          };
        case 'foundersMission':
          return {
            title: '',
            subtitle: '',
            content: '',
            image: '',
            founderName: '',
            founderTitle: ''
          };
        case 'contribute':
          return {
            title: '',
            subtitle: '',
            sections: [],
            projects: []
          };
        case 'downloadApp':
          return {
            title: '',
            subtitle: '',
            features: [],
            stats: {},
            downloadLinks: {},
            cta: ''
          };
        case 'faq':
          return {
            title: '',
            subtitle: '',
            questions: [],
            support: {}
          };
        default:
          return {};
      }
    };

    const sectionContent = content[sectionKey] || getDefaultSectionContent(sectionKey);

    // Add error boundary wrapper for each editor
    const createEditorWithErrorBoundary = (EditorComponent: any, props: any) => {
      try {
        // Add debugging
        console.log(`Rendering ${section} editor with content:`, sectionContent);
        
        // Ensure content has proper structure
        const safeProps = {
          ...props,
          content: sectionContent || {}
        };
        
        return <EditorComponent {...safeProps} />;
      } catch (error) {
        console.error(`Error rendering ${section} editor:`, error);
        console.error('Section content:', sectionContent);
        return (
          <div className="p-8 text-center text-slate-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p>Error loading {section} editor.</p>
            <p className="text-sm mt-2">Using fallback editor instead.</p>
            <details className="mt-4 text-xs">
              <summary>Error details</summary>
              <pre className="mt-2 text-left bg-slate-100 p-2 rounded">
                {error?.toString()}
              </pre>
            </details>
          </div>
        );
      }
    };

    const editors: Record<string, any> = {
      hero: createEditorWithErrorBoundary(HeroEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      alignYourself: createEditorWithErrorBoundary(AlignYourselfEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      schools: createEditorWithErrorBoundary(SchoolsEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      meetGurus: createEditorWithErrorBoundary(MeetGurusEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      studentStories: createEditorWithErrorBoundary(StudentStoriesEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      testimonials: createEditorWithErrorBoundary(TestimonialsEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      communityPosts: createEditorWithErrorBoundary(CommunityPostsEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      foundersMission: createEditorWithErrorBoundary(FoundersMissionEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      contribute: createEditorWithErrorBoundary(ContributeEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      downloadApp: createEditorWithErrorBoundary(DownloadAppEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      }),
      faq: createEditorWithErrorBoundary(FAQEditor, { 
        content: sectionContent, 
        onChange: (newContent: any) => setContent({ ...content, [sectionKey]: newContent }) 
      })
    };

    return editors[sectionKey] || (
      <VisualEditor 
        content={sectionContent} 
        onChange={(newContent) => setContent({ ...content, [sectionKey]: newContent })}
        section={section}
      />
    );
  };

  if (!isOpen) return null;

  // Fallback modal if Dialog component fails
  const FallbackModal = () => (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-7xl w-[90vw] h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800">Edit {contentType.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="flex-1 p-6 overflow-auto">
          <p className="text-slate-600">Fallback modal - Content editor would go here</p>
          <p className="text-sm text-slate-500 mt-2">This is a simplified version for testing</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-7xl h-[90vh] flex flex-col overflow-hidden z-[9999]"
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          height: '90vh',
          overflow: 'hidden',
          position: 'fixed',
          zIndex: 9999,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '0.75rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-800">
                Edit {contentType.name}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {contentType.description}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={contentType.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {contentType.status}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Message */}
        {message && (
          <div className={`flex-shrink-0 mb-4 p-4 rounded-lg ${
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
        )}

        {/* Action Buttons */}
        <div className="flex-shrink-0 flex items-center justify-between mb-4 px-1">
          <div className="flex items-center space-x-3">
            <Button 
              onClick={saveContent} 
              disabled={saving || !content}
              className="bg-saffron-600 hover:bg-saffron-700 text-white px-4 py-2"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              onClick={resetContent} 
              disabled={saving || !content}
              variant="outline"
              className="px-4 py-2"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              onClick={previewSite} 
              variant="outline"
              className="px-4 py-2"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={loadContent} 
              disabled={loading}
              variant="outline"
              className="px-4 py-2"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 min-h-0 overflow-hidden relative bg-gray-50 rounded-lg">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading content...</p>
              </div>
            </div>
          ) : !content ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Failed to load content</p>
                <Button onClick={loadContent} className="mt-4">
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col p-4 min-h-0">
              {/* Editor Mode Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                <TabsList className="flex-shrink-0 mb-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="visual" className="flex items-center space-x-2 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Palette className="w-4 h-4" />
                    <span>Visual Editor</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center space-x-2 px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    <Code className="w-4 h-4" />
                    <span>Code Editor</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="visual" className="flex-1 flex flex-col mt-4 min-h-0">
                  <div className="flex-1 flex flex-col min-h-0">
                    <Tabs value={activeSection} onValueChange={setActiveSection} className="flex-1 flex flex-col min-h-0">
                      <TabsList className="flex-shrink-0 overflow-x-auto mb-4 bg-white p-1 rounded-lg border">
                        {contentType.sections.map(section => (
                          <TabsTrigger key={section} value={section} className="whitespace-nowrap px-3 py-2 text-sm data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200">
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
                        {contentType.sections.map(section => (
                          <TabsContent key={section} value={section} className="mt-0 p-6 bg-white rounded-lg border min-h-full">
                            <div className="w-full max-w-none">
                              {getSectionEditor(section)}
                            </div>
                          </TabsContent>
                        ))}
                      </div>
                    </Tabs>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="flex-1 flex flex-col mt-4 min-h-0">
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-shrink-0 p-6 border-b bg-gray-50 rounded-t-lg">
                      <h3 className="text-lg font-semibold text-gray-900">Raw Content (JSON)</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Edit the raw JSON content directly. Be careful with syntax.
                      </p>
                    </div>
                    <div className="flex-1 p-6 bg-white min-h-0">
                      <div className="h-full min-h-0">
                        <textarea
                          className="w-full h-full font-mono text-sm border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 overflow-y-auto"
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
                            minHeight: 'calc(100vh - 300px)',
                            maxHeight: 'calc(100vh - 300px)',
                            height: 'calc(100vh - 300px)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    
    {/* Fallback modal - uncomment this line to test with fallback instead of Dialog */}
    {/* <FallbackModal /> */}
    </>
  );
}
