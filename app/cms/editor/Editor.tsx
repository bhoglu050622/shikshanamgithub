'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Save, UploadCloud, HelpCircle, Info, AlertCircle, CheckCircle, Code, Zap } from 'lucide-react';
import Link from 'next/link';
import MonacoJsonEditor from './MonacoJsonEditor';
import SimpleJsonEditor from './SimpleJsonEditor';

function EditorContent() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get('file');
  
  const [content, setContent] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState('');
  const [useFallbackEditor, setUseFallbackEditor] = useState(false);

  useEffect(() => {
    console.log('Editor useEffect triggered, fileName:', fileName);
    if (fileName) {
      console.log('Fetching content for file:', fileName);
      setIsLoading(true);
      fetch(`/api/cms/editor?file=${fileName}`)
        .then(res => {
          console.log('API response status:', res.status);
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log('API response data:', data);
          if (data.success) {
            const formattedContent = JSON.stringify(data.content, null, 2);
            console.log('Setting content, length:', formattedContent.length);
            setContent(formattedContent);
            setInitialContent(formattedContent);
            setStatus('Content loaded successfully.');
          } else {
            console.error('API error:', data.error);
            setStatus(`Error: ${data.error}`);
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setStatus(`Error: ${err.message}`);
        })
        .finally(() => {
          console.log('Setting isLoading to false');
          setIsLoading(false);
        });
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
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [isLoading, content]);

  const handleSave = async (shouldPublish = false) => {
    setIsSaving(true);
    setStatus('Saving changes...');
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
          action: 'save',
          file: fileName,
          content: parsedContent,
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
            setStatus(`Success! Content saved locally.`);
          }
          setInitialContent(content); // Mark as no longer dirty
          
          // If shouldPublish is true, automatically publish after saving
          if (shouldPublish) {
            await handlePublish();
          }
        } else {
          throw new Error(result.error || 'Failed to save content');
        }
      } else {
        throw new Error(result.error || 'Failed to save content');
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
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
  
  const isDirty = content !== initialContent;

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
            </div>
          </div>
        </div>

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