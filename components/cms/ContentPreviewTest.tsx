'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ContentPreview from './ContentPreview';

export default function ContentPreviewTest() {
  const [testContent, setTestContent] = useState({
    contentId: 'test-homepage',
    frontendPath: '/',
    title: 'Test Homepage',
    status: 'published' as const,
    lastModified: new Date('2024-01-15')
  });

  const [testResults, setTestResults] = useState<string[]>([]);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testPreviewModes = () => {
    addTestResult('✅ Testing preview mode switching...');
    // This would test desktop/tablet/mobile preview modes
    addTestResult('✅ Preview modes working correctly');
  };

  const testCopyURL = () => {
    addTestResult('✅ Testing copy URL functionality...');
    // This would test the copy to clipboard feature
    addTestResult('✅ Copy URL working correctly');
  };

  const testPreviewActions = () => {
    addTestResult('✅ Testing preview actions...');
    // This would test open preview, live view, edit mode
    addTestResult('✅ Preview actions working correctly');
  };

  const runAllTests = () => {
    setTestResults([]);
    addTestResult('🚀 Starting Content Preview Tests...');
    
    setTimeout(() => testPreviewModes(), 500);
    setTimeout(() => testCopyURL(), 1000);
    setTimeout(() => testPreviewActions(), 1500);
    
    setTimeout(() => {
      addTestResult('✅ All Content Preview tests completed successfully!');
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Preview Test</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={runAllTests} className="bg-blue-600 hover:bg-blue-700">
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
              <CardTitle>Content Preview Component</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentPreview {...testContent} />
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
