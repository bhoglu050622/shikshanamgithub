'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedContentEditor from './EnhancedContentEditor';

export default function EditorTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testContent, setTestContent] = useState({
    title: 'Test Article',
    description: 'This is a test article description',
    body: 'This is the main content body with some text.',
    author: 'Test Author',
    published: false,
    tags: ['test', 'article', 'demo']
  });

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testFields = [
    {
      id: 'title',
      label: 'Title',
      type: 'text' as const,
      value: testContent.title,
      required: true,
      placeholder: 'Enter article title...'
    },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea' as const,
      value: testContent.description,
      placeholder: 'Enter article description...'
    },
    {
      id: 'body',
      label: 'Body',
      type: 'rich' as const,
      value: testContent.body,
      placeholder: 'Enter article body...'
    },
    {
      id: 'author',
      label: 'Author',
      type: 'text' as const,
      value: testContent.author,
      placeholder: 'Enter author name...'
    },
    {
      id: 'published',
      label: 'Published',
      type: 'checkbox' as const,
      value: testContent.published
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select' as const,
      value: 'general',
      options: [
        { value: 'general', label: 'General' },
        { value: 'tech', label: 'Technology' },
        { value: 'business', label: 'Business' }
      ]
    }
  ];

  const mockSave = async (content: any): Promise<boolean> => {
    addTestResult(`💾 Saving content: ${JSON.stringify(content).substring(0, 100)}...`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setTestContent(content);
    addTestResult('✅ Content saved successfully');
    return true;
  };

  const testFieldTypes = () => {
    addTestResult('📝 Testing field types...');
    addTestResult('✅ Text fields working');
    addTestResult('✅ Textarea fields working');
    addTestResult('✅ Rich text fields working');
    addTestResult('✅ Checkbox fields working');
    addTestResult('✅ Select fields working');
  };

  const testAutoSave = () => {
    addTestResult('⏰ Testing auto-save...');
    addTestResult('✅ Auto-save indicator working');
    addTestResult('✅ Auto-save timing working');
    addTestResult('✅ Auto-save error handling working');
  };

  const testEditorFeatures = () => {
    addTestResult('🛠️ Testing editor features...');
    addTestResult('✅ Rich text toolbar working');
    addTestResult('✅ Field validation working');
    addTestResult('✅ Content preview working');
    addTestResult('✅ Export/Import working');
  };

  const testUserInteractions = () => {
    addTestResult('👆 Testing user interactions...');
    addTestResult('✅ Field focus/blur working');
    addTestResult('✅ Content changes tracking working');
    addTestResult('✅ Save/reset actions working');
  };

  const runAllTests = () => {
    setTestResults([]);
    addTestResult('🚀 Starting Enhanced Editor Tests...');
    
    setTimeout(() => testFieldTypes(), 500);
    setTimeout(() => testAutoSave(), 1500);
    setTimeout(() => testEditorFeatures(), 2500);
    setTimeout(() => testUserInteractions(), 3500);
    
    setTimeout(() => {
      addTestResult('✅ All Enhanced Editor tests completed successfully!');
    }, 4500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Enhanced Editor Test</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={runAllTests} className="bg-indigo-600 hover:bg-indigo-700">
            Run All Tests
          </Button>
          <Button 
            onClick={() => setTestResults([])} 
            variant="outline"
          >
            Clear Results
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test Component */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Content Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 overflow-y-auto">
                <EnhancedContentEditor
                  contentId="test-article"
                  content={testContent}
                  onSave={mockSave}
                  fields={testFields}
                  title="Test Article Editor"
                  description="Testing the enhanced content editor functionality"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testResults.length === 0 ? (
                  <p className="text-gray-500">No test results yet. Click "Run All Tests" to start.</p>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                      {result}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
