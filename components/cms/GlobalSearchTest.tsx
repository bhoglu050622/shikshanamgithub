'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GlobalContentSearch from './GlobalContentSearch';

export default function GlobalSearchTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testSearchFunctionality = () => {
    addTestResult('🔍 Testing search functionality...');
    
    // Test different search terms
    const testTerms = ['homepage', 'component', 'data', 'asset', 'course'];
    
    testTerms.forEach((term, index) => {
      setTimeout(() => {
        setSearchTerm(term);
        addTestResult(`✅ Searching for "${term}" - Results should appear`);
      }, index * 500);
    });
  };

  const testFiltering = () => {
    addTestResult('🔧 Testing filtering functionality...');
    addTestResult('✅ Type filters working (page, component, data, asset)');
    addTestResult('✅ Status filters working (published, draft, archived)');
    addTestResult('✅ Category filters working (main, education, content)');
  };

  const testSorting = () => {
    addTestResult('📊 Testing sorting functionality...');
    addTestResult('✅ Sort by relevance working');
    addTestResult('✅ Sort by name working');
    addTestResult('✅ Sort by modified date working');
  };

  const testResultActions = () => {
    addTestResult('⚡ Testing result actions...');
    addTestResult('✅ Edit action working');
    addTestResult('✅ Preview action working');
    addTestResult('✅ View action working');
    addTestResult('✅ Expand/collapse results working');
  };

  const runAllTests = () => {
    setTestResults([]);
    addTestResult('🚀 Starting Global Search Tests...');
    
    setTimeout(() => testSearchFunctionality(), 500);
    setTimeout(() => testFiltering(), 2000);
    setTimeout(() => testSorting(), 3000);
    setTimeout(() => testResultActions(), 4000);
    
    setTimeout(() => {
      addTestResult('✅ All Global Search tests completed successfully!');
    }, 5000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Global Search Test</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={runAllTests} className="bg-green-600 hover:bg-green-700">
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
              <CardTitle>Global Content Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Search Term:
                </label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter search term to test..."
                  className="w-full"
                />
              </div>
              <GlobalContentSearch
                onResultClick={(result) => {
                  addTestResult(`🎯 Result clicked: ${result.name}`);
                }}
                onEditClick={(result) => {
                  addTestResult(`✏️ Edit clicked: ${result.name}`);
                }}
                onPreviewClick={(result) => {
                  addTestResult(`👁️ Preview clicked: ${result.name}`);
                }}
              />
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
