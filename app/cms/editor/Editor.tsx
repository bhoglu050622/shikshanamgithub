'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Save, UploadCloud, HelpCircle, Info, AlertCircle, CheckCircle, Code, Zap, ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';
import MonacoJsonEditor from './MonacoJsonEditor';
import SimpleJsonEditor from './SimpleJsonEditor';
import { useCMSEditor } from '@/lib/cms/use-cms-editor';
import SyncStatus from '@/components/cms/SyncStatus';

// Page mapping function to show which page the user is editing
function getPageInfoFromFileName(fileName: string) {
  const pageMappings: Record<string, { page: string; title: string; description: string }> = {
    'homepage-content.json': { 
      page: '/', 
      title: 'Homepage', 
      description: 'Main landing page of the website' 
    },
    'about-content.json': { 
      page: '/about', 
      title: 'About Us', 
      description: 'About Shikshanam page' 
    },
    'contact-content.json': { 
      page: '/contact', 
      title: 'Contact Us', 
      description: 'Contact information and form' 
    },
    'accessibility-content.json': { 
      page: '/accessibility', 
      title: 'Accessibility', 
      description: 'Accessibility information' 
    },
    'account-content.json': { 
      page: '/account', 
      title: 'Account Settings', 
      description: 'User account management' 
    },
    'privacy-content.json': { 
      page: '/privacy', 
      title: 'Privacy Policy', 
      description: 'Privacy policy and data protection' 
    },
    'terms-content.json': { 
      page: '/terms', 
      title: 'Terms of Service', 
      description: 'Terms and conditions' 
    },
    'help-content.json': { 
      page: '/help', 
      title: 'Help Center', 
      description: 'Help and support information' 
    },
    'courses-content.json': { 
      page: '/courses', 
      title: 'Courses Overview', 
      description: 'All courses listing page' 
    },
    'sanskrit-beginner-course-content.json': { 
      page: '/courses/sanskrit-beginner', 
      title: 'Sanskrit Beginner Course', 
      description: 'Beginner level Sanskrit course' 
    },
    'sanskrit-course-content.json': { 
      page: '/courses/sanskrit-course', 
      title: 'Sanskrit Course', 
      description: 'Main Sanskrit course page' 
    },
    'sanskrit-live-class-course-content.json': { 
      page: '/courses/sanskrit-live-class', 
      title: 'Sanskrit Live Class', 
      description: 'Live Sanskrit classes' 
    },
    'advaita-vedanta-course-content.json': { 
      page: '/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka', 
      title: 'Advaita Vedanta Course', 
      description: 'Advaita Vedanta philosophy course' 
    },
    'chanakya-code-course-content.json': { 
      page: '/courses/chanakya-code', 
      title: 'Chanakya Code Course', 
      description: 'Chanakya leadership and strategy course' 
    },
    'emotional-intelligence-course-content.json': { 
      page: '/courses/emotional-intelligence-with-samkhya-darshan', 
      title: 'Emotional Intelligence Course', 
      description: 'Emotional intelligence with Samkhya philosophy' 
    },
    'isha-upanishad-course-content.json': { 
      page: '/courses/isha-upanishad', 
      title: 'Isha Upanishad Course', 
      description: 'Isha Upanishad study course' 
    },
    'kashmir-shaivism-course-content.json': { 
      page: '/courses/kashmir-shaivism', 
      title: 'Kashmir Shaivism Course', 
      description: 'Kashmir Shaivism philosophy course' 
    },
    'nyaya-darshan-course-content.json': { 
      page: '/courses/nyaya-darshan', 
      title: 'Nyaya Darshan Course', 
      description: 'Nyaya philosophy course' 
    },
    'prashna-upanishad-course-content.json': { 
      page: '/courses/prashna-upanishad', 
      title: 'Prashna Upanishad Course', 
      description: 'Prashna Upanishad study course' 
    },
    'samkhya-darshan-course-content.json': { 
      page: '/courses/samkhya-darshan', 
      title: 'Samkhya Darshan Course', 
      description: 'Samkhya philosophy course' 
    },
    'tantra-darshan-course-content.json': { 
      page: '/courses/tantra-darshan', 
      title: 'Tantra Darshan Course', 
      description: 'Tantra philosophy course' 
    },
    'vaisheshik-darshan-course-content.json': { 
      page: '/courses/vaisheshik-darshan', 
      title: 'Vaisheshik Darshan Course', 
      description: 'Vaisheshik philosophy course' 
    },
    'yoga-advanced-course-content.json': { 
      page: '/courses/yoga-advanced', 
      title: 'Yoga Advanced Course', 
      description: 'Advanced yoga philosophy course' 
    },
    'yoga-darshan-course-content.json': { 
      page: '/courses/yoga-darshan', 
      title: 'Yoga Darshan Course', 
      description: 'Yoga philosophy course' 
    },
    'schools-content.json': { 
      page: '/schools', 
      title: 'Schools Overview', 
      description: 'All schools listing page' 
    },
    'sanskrit-school-content.json': { 
      page: '/schools/sanskrit', 
      title: 'Sanskrit School', 
      description: 'Sanskrit learning school' 
    },
    'darshana-school-content.json': { 
      page: '/schools/darshana', 
      title: 'Darshana School', 
      description: 'Darshana philosophy school' 
    },
    'vedanta-school-content.json': { 
      page: '/schools/vedanta', 
      title: 'Vedanta School', 
      description: 'Vedanta philosophy school' 
    },
    'yoga-school-content.json': { 
      page: '/schools/yoga', 
      title: 'Yoga School', 
      description: 'Yoga philosophy school' 
    },
    'samkhya-school-content.json': { 
      page: '/schools/samkhya', 
      title: 'Samkhya School', 
      description: 'Samkhya philosophy school' 
    },
    'nyaya-school-content.json': { 
      page: '/schools/nyaya', 
      title: 'Nyaya School', 
      description: 'Nyaya philosophy school' 
    },
    'vaisheshika-school-content.json': { 
      page: '/schools/vaisheshika', 
      title: 'Vaisheshika School', 
      description: 'Vaisheshika philosophy school' 
    },
    'mimamsa-school-content.json': { 
      page: '/schools/mimamsa', 
      title: 'Mimamsa School', 
      description: 'Mimamsa philosophy school' 
    },
    'self-help-school-content.json': { 
      page: '/schools/self-help', 
      title: 'Self-Help School', 
      description: 'Self-help and personal development school' 
    },
    'packages-content.json': { 
      page: '/packages', 
      title: 'Packages Overview', 
      description: 'All learning packages' 
    },
    'sanskrit-basics-package.json': { 
      page: '/packages/sanskrit-basics', 
      title: 'Sanskrit Basics Package', 
      description: 'Sanskrit fundamentals package' 
    },
    'philosophy-foundations-package.json': { 
      page: '/packages/philosophy-foundations', 
      title: 'Philosophy Foundations Package', 
      description: 'Philosophy basics package' 
    },
    'self-help-wisdom-package.json': { 
      page: '/packages/self-help-wisdom', 
      title: 'Self-Help Wisdom Package', 
      description: 'Self-help and wisdom package' 
    },
    'para-bundle-package.json': { 
      page: '/packages/para-bundle', 
      title: 'Para Bundle Package', 
      description: 'Para bundle learning package' 
    },
    'para-apara-bundle-package.json': { 
      page: '/packages/para-apara-bundle', 
      title: 'Para-Apara Bundle Package', 
      description: 'Para-Apara bundle package' 
    },
    'package-hindu-philosophies-upanishads-bundle-content.json': { 
      page: '/packages/hindu-philosophies-upanishads-bundle', 
      title: 'Hindu Philosophies Upanishads Bundle', 
      description: 'Comprehensive Hindu philosophy bundle' 
    },
    'sanskrit-darshan-upanishad-bundle-content.json': { 
      page: '/packages/sanskrit-darshan-upanishad-bundle', 
      title: 'Sanskrit Darshan Upanishad Bundle', 
      description: 'Sanskrit and philosophy bundle' 
    },
    'tools-content.json': { 
      page: '/tools', 
      title: 'Tools Overview', 
      description: 'All tools and utilities' 
    },
    'tools-keyboard-content.json': { 
      page: '/tools/keyboard', 
      title: 'Sanskrit Keyboard', 
      description: 'Sanskrit typing tool' 
    },
    'tools-sandhi-content.json': { 
      page: '/tools/sandhi', 
      title: 'Sandhi Tool', 
      description: 'Sanskrit sandhi analysis tool' 
    },
    'practice-sanskrit-content.json': { 
      page: '/practice/sanskrit', 
      title: 'Sanskrit Practice', 
      description: 'Sanskrit practice exercises' 
    },
    'glossaries-content.json': { 
      page: '/glossaries/sanskrit', 
      title: 'Sanskrit Glossary', 
      description: 'Sanskrit terms and definitions' 
    },
    'gurus-content.json': { 
      page: '/gurus', 
      title: 'Gurus Overview', 
      description: 'All teachers and gurus' 
    },
    'blog-content.json': { 
      page: '/blog', 
      title: 'Blog Overview', 
      description: 'All blog posts and articles' 
    },
    'blogs-sanskrit-content.json': { 
      page: '/blogs/sanskrit', 
      title: 'Sanskrit Blog', 
      description: 'Sanskrit-related blog posts' 
    },
    'events-content.json': { 
      page: '/events', 
      title: 'Events', 
      description: 'Upcoming events and workshops' 
    },
    'donation-content.json': { 
      page: '/donation', 
      title: 'Donation', 
      description: 'Support and donation page' 
    },
    'career-content.json': { 
      page: '/career', 
      title: 'Career', 
      description: 'Career opportunities' 
    },
    'guna-profiler-content.json': { 
      page: '/guna-profiler', 
      title: 'Guna Profiler', 
      description: 'Personality assessment tool' 
    },
    'alignment-assessment-content.json': { 
      page: '/how-aligned-are-you', 
      title: 'Alignment Assessment', 
      description: 'Personal alignment assessment' 
    },
    'dharma-path-content.json': { 
      page: '/dharma-path', 
      title: 'Dharma Path', 
      description: 'Dharma path guidance' 
    },
    'wisdom-content.json': { 
      page: '/wisdom', 
      title: 'Wisdom Section', 
      description: 'Ancient wisdom and insights' 
    }
  };

  return pageMappings[fileName] || { 
    page: '/', 
    title: 'Unknown Page', 
    description: 'Page information not available' 
  };
}

function EditorContent() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get('file');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState('');
  const [useFallbackEditor, setUseFallbackEditor] = useState(false);
  const [initialContent, setInitialContent] = useState('');

  // Use the new CMS editor hook with local storage
  const {
    content,
    setContent,
    isDirty,
    isSaving,
    isOnline,
    lastSaved,
    pendingChanges,
    conflictDetected,
    save,
    forceSync,
    resolveConflict,
    clearDraft
  } = useCMSEditor({
    file: fileName || '',
    autoSave: true,
    autoSaveInterval: 30000,
    onSync: (syncState) => {
      if (syncState.conflictDetected) {
        setStatus('Conflict detected! Please resolve manually.');
      } else if (syncState.pendingChanges) {
        setStatus('Changes saved locally. Will sync when online.');
      } else {
        setStatus('All changes synced.');
      }
    },
    onConflict: (file) => {
      setStatus(`Conflict detected for ${file}. Please resolve manually.`);
    }
  });

  useEffect(() => {
    if (fileName) {
      setIsLoading(false);
      setStatus('Content loaded with local storage support.');
    } else {
      setStatus('No file selected for editing.');
      setIsLoading(false);
    }
  }, [fileName]);

  // Timeout to detect if Monaco Editor fails to load
  useEffect(() => {
    if (!isLoading && content) {
      const timeout = setTimeout(() => {
        console.log('Monaco Editor timeout - switching to fallback');
        setUseFallbackEditor(true);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isLoading, content]);

  // Manual fallback button handler
  const handleUseFallback = () => {
    console.log('Manually switching to fallback editor');
    setUseFallbackEditor(true);
  };

  const handleSave = async (shouldPublish = false) => {
    setStatus('Saving changes...');
    try {
      // Validate JSON content
      let parsedContent;
      try {
        parsedContent = JSON.parse(content);
      } catch (parseError) {
        throw new Error('Invalid JSON content. Please check your syntax.');
      }

      // Use the new save function from the hook
      const success = await save();
      
      if (success) {
        setStatus('Success! Content saved with local storage support.');
        
        // If shouldPublish is true, automatically publish after saving
        if (shouldPublish) {
          await handlePublish();
        }
      } else {
        throw new Error('Failed to save content');
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setTimeout(() => setStatus(''), 8000); // Longer timeout for GitHub operations
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setStatus('Publishing changes...');
    try {
      // Validate JSON content
      let parsedContent;
      try {
        parsedContent = JSON.parse(content);
      } catch (parseError) {
        throw new Error('Invalid JSON content. Please check your syntax.');
      }

      // Use GitHub API in production, local API in development
      const isProduction = process.env.NODE_ENV === 'production';
      const apiEndpoint = isProduction ? '/api/cms/github' : '/api/cms/local';
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'publish', 
          file: fileName,
          content: parsedContent 
        }),
      });
      const result = await response.json();
      if (response.ok) {
        if (result.success) {
          if (result.githubUrl) {
            setStatus(`Success! ${result.message} - ${result.note} | View commit: ${result.githubUrl}`);
          } else if (result.note) {
            setStatus(`Success! ${result.message} - ${result.note}`);
          } else {
            setStatus('Successfully published! Your changes are live.');
          }
          setInitialContent(content); // Mark as no longer dirty
        } else {
          throw new Error(result.error || 'Failed to publish');
        }
      } else {
        throw new Error(result.error || 'Failed to publish');
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setIsPublishing(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  if (!fileName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error: No file specified.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/cms" className="text-sm text-gray-500 hover:underline flex items-center mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
            <p className="text-gray-600 mt-2">Editing: <code className="bg-gray-100 p-1 rounded text-xs">{fileName}</code></p>
          </div>
          <div className="flex items-center space-x-2">
            {status && <p className="text-sm text-gray-500">{status}</p>}
            <Button onClick={() => handleSave()} disabled={isSaving || !isDirty}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            {isDirty && (
              <Button 
                onClick={() => handleSave(true)} 
                disabled={isSaving}
                variant="outline"
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving & Publishing...' : 'Save & Publish'}
              </Button>
            )}
          </div>
        </header>

        {/* Page Indicator */}
        {fileName && (
          <div className="mb-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg text-blue-900">
                        {getPageInfoFromFileName(fileName).title}
                      </CardTitle>
                      <CardDescription className="text-blue-700">
                        {getPageInfoFromFileName(fileName).description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      <a 
                        href={`${process.env.NODE_ENV === 'production' ? 'https://shikshanamgithub.vercel.app' : 'http://localhost:3001'}${getPageInfoFromFileName(fileName).page}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Page
                      </a>
                    </Button>
                    <div className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {getPageInfoFromFileName(fileName).page}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Editor Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Editor Instructions</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-blue-800">Edit the JSON content in the editor below</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-blue-800">Use "Save Draft" to save without publishing</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-blue-800">Use "Save & Publish" to make changes live</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-blue-800">Ensure JSON syntax is valid before saving</span>
                  </div>
                </div>
              </div>
              {!useFallbackEditor && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-yellow-800 text-sm">Monaco Editor taking too long to load?</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUseFallback}
                      className="text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                    >
                      Use Fallback Editor
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sync Status Component */}
        {fileName && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <SyncStatus file={fileName} />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-500" />
              {useFallbackEditor ? 'JSON Editor (Fallback)' : 'Monaco JSON Editor'}
            </CardTitle>
            <CardDescription>
              Professional code editor with syntax highlighting, validation, and formatting. Changes will be reflected on your website after saving and publishing.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading content...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Ready to edit</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <Zap className="w-4 h-4" />
                      <span>{useFallbackEditor ? 'JSON Editor (Fallback)' : 'Monaco JSON Editor'}</span>
                    </div>
                  </div>
                  {isDirty && (
                    <div className="flex items-center space-x-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Unsaved changes</span>
                    </div>
                  )}
                </div>
                
                {useFallbackEditor ? (
                  <SimpleJsonEditor 
                    value={content} 
                    onChange={setContent}
                    language="json"
                    height="500px"
                    onSave={() => handleSave()}
                    onFormat={() => {
                      try {
                        const parsed = JSON.parse(content);
                        const formatted = JSON.stringify(parsed, null, 2);
                        setContent(formatted);
                      } catch (error) {
                        setStatus('Error: Cannot format invalid JSON');
                      }
                    }}
                    onValidate={() => {
                      try {
                        JSON.parse(content);
                        setStatus('JSON is valid');
                      } catch (error) {
                        setStatus('Error: Invalid JSON syntax');
                      }
                    }}
                  />
                ) : (
                  <MonacoJsonEditor 
                    value={content} 
                    onChange={setContent}
                    language="json"
                    height="500px"
                    onSave={() => handleSave()}
                    onFormat={() => {
                      try {
                        const parsed = JSON.parse(content);
                        const formatted = JSON.stringify(parsed, null, 2);
                        setContent(formatted);
                      } catch (error) {
                        setStatus('Error: Cannot format invalid JSON');
                      }
                    }}
                    onValidate={() => {
                      try {
                        JSON.parse(content);
                        setStatus('JSON is valid');
                      } catch (error) {
                        setStatus('Error: Invalid JSON syntax');
                      }
                    }}
                  />
                )}
                
                <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-500 bg-gray-50 p-4 rounded">
                  <div>
                    <strong>Keyboard Shortcuts:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• <kbd className="bg-gray-200 px-1 rounded">Ctrl+F</kbd> Format JSON</li>
                      <li>• <kbd className="bg-gray-200 px-1 rounded">Ctrl+V</kbd> Validate JSON</li>
                      <li>• <kbd className="bg-gray-200 px-1 rounded">Ctrl+Z</kbd> Undo</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Features:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Real-time syntax highlighting</li>
                      <li>• Auto-completion and IntelliSense</li>
                      <li>• Error detection and validation</li>
                      <li>• Multi-cursor editing support</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Editor() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}