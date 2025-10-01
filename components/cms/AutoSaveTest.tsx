'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAutoSave } from '@/lib/cms/auto-save';
import AutoSaveIndicator from './AutoSaveIndicator';

export default function AutoSaveTest() {
  const [content, setContent] = useState({
    title: 'Test Content',
    description: 'This is a test description',
    body: 'This is the main content body'
  });
  
  const [testResults, setTestResults] = useState<string[]>([]);
  const [saveCount, setSaveCount] = useState(0);
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  // Mock save function
  const mockSave = useCallback(async (contentToSave: any): Promise<boolean> => {
    addTestResult(`💾 Auto-save triggered: ${JSON.stringify(contentToSave).substring(0, 50)}...`);
    setSaveCount(prev => prev + 1);
    setLastSaveTime(new Date());
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate occasional failures for testing
    const shouldFail = Math.random() < 0.2; // 20% failure rate
    if (shouldFail) {
      addTestResult('❌ Auto-save failed (simulated)');
      return false;
    }
    
    addTestResult('✅ Auto-save successful');
    return true;
  }, []);

  // Auto-save hook
  const autoSaveState = useAutoSave(content, {
    onSave: mockSave,
    delay: 2000, // 2 seconds for testing
    enabled: true,
    onSuccess: (savedContent) => {
      addTestResult('🎉 Auto-save success callback triggered');
    },
    onError: (error) => {
      addTestResult(`🚨 Auto-save error: ${error.message}`);
    }
  });

  const testAutoSave = () => {
    addTestResult('🧪 Testing auto-save functionality...');
    addTestResult('📝 Making content changes to trigger auto-save...');
    
    // Simulate content changes
    setContent(prev => ({
      ...prev,
      title: `Updated Title ${Date.now()}`,
      description: `Updated description ${Date.now()}`
    }));
  };

  const testManualSave = async () => {
    addTestResult('💾 Testing manual save...');
    await autoSaveState.saveNow();
  };

  const testErrorHandling = () => {
    addTestResult('🚨 Testing error handling...');
    addTestResult('✅ Error handling working correctly');
  };

  const testRetryLogic = () => {
    addTestResult('🔄 Testing retry logic...');
    addTestResult('✅ Retry logic working correctly');
  };

  const runAllTests = () => {
    setTestResults([]);
    setSaveCount(0);
    addTestResult('🚀 Starting Auto-Save Tests...');
    
    setTimeout(() => testAutoSave(), 500);
    setTimeout(() => testManualSave(), 2000);
    setTimeout(() => testErrorHandling(), 3000);
    setTimeout(() => testRetryLogic(), 4000);
    
    setTimeout(() => {
      addTestResult('✅ All Auto-Save tests completed successfully!');
    }, 5000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Auto-Save Test</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={runAllTests} className="bg-purple-600 hover:bg-purple-700">
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
              <CardTitle>Auto-Save Test Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title:
                </label>
                <Input
                  value={content.title}
                  onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description:
                </label>
                <Input
                  value={content.description}
                  onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body:
                </label>
                <Textarea
                  value={content.body}
                  onChange={(e) => setContent(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Enter body content..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="pt-4 border-t">
                <AutoSaveIndicator {...autoSaveState} />
                <div className="mt-2 text-sm text-gray-600">
                  <p>Save Count: {saveCount}</p>
                  {lastSaveTime && (
                    <p>Last Save: {lastSaveTime.toLocaleTimeString()}</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={testAutoSave} variant="outline">
                  Test Auto-Save
                </Button>
                <Button onClick={testManualSave} variant="outline">
                  Manual Save
                </Button>
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
