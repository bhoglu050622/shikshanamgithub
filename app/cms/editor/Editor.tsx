'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import Link from 'next/link';

// A simple code editor using a textarea for now.
// This can be replaced with a more advanced component like Monaco Editor later.
function CodeEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
}

export default function Editor() {
  const searchParams = useSearchParams();
  const fileName = searchParams.get('file');
  
  const [content, setContent] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (fileName) {
      setIsLoading(true);
      fetch(`/api/cms/editor?file=${fileName}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const formattedContent = JSON.stringify(data.content, null, 2);
            setContent(formattedContent);
            setInitialContent(formattedContent);
          } else {
            setStatus(`Error: ${data.error}`);
          }
        })
        .catch(err => setStatus(`Error: ${err.message}`))
        .finally(() => setIsLoading(false));
    }
  }, [fileName]);

  const handleSave = async (shouldPublish = false) => {
    setIsSaving(true);
    setStatus('Saving changes...');
    try {
      const response = await fetch('/api/cms/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          file: fileName,
          content: content,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus(`Success! Content saved locally.`);
        setInitialContent(content); // Mark as no longer dirty
        
        // If shouldPublish is true, automatically publish after saving
        if (shouldPublish) {
          await handlePublish();
        }
      } else {
        throw new Error(result.error || 'Failed to save content');
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setStatus('Publishing changes...');
    try {
      const response = await fetch('/api/cms/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'publish', 
          file: fileName,
          content: content 
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setStatus('Successfully published! Your changes are live.');
        setInitialContent(content); // Mark as no longer dirty
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
                onClick={() => handlePublish()} 
                disabled={isPublishing}
                variant="outline"
                className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                {isPublishing ? 'Publishing...' : 'Publish Changes'}
              </Button>
            )}
            {isDirty && (
              <Button 
                onClick={() => handleSave(true)} 
                disabled={isSaving}
                variant="outline"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                Save & Publish
              </Button>
            )}
          </div>
        </header>

        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading content...</p>
              </div>
            ) : (
              <CodeEditor value={content} onChange={setContent} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}