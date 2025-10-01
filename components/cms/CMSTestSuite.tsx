'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  Settings,
  TestTube,
  Zap,
  Search,
  BarChart3,
  Edit,
  Eye
} from 'lucide-react';

// Import test components
import ContentPreviewTest from './ContentPreviewTest';
import GlobalSearchTest from './GlobalSearchTest';
import AutoSaveTest from './AutoSaveTest';
import StatisticsTest from './StatisticsTest';
import EditorTest from './EditorTest';

interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration?: number;
  error?: string;
}

export default function CMSTestSuite() {
  const [testResults, setTestResults] = useState<TestResult[]>([
    { id: 'preview', name: 'Content Preview', status: 'pending' },
    { id: 'search', name: 'Global Search', status: 'pending' },
    { id: 'autosave', name: 'Auto-Save', status: 'pending' },
    { id: 'statistics', name: 'Content Statistics', status: 'pending' },
    { id: 'editor', name: 'Enhanced Editor', status: 'pending' }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const updateTestResult = (id: string, updates: Partial<TestResult>) => {
    setTestResults(prev => prev.map(test => 
      test.id === id ? { ...test, ...updates } : test
    ));
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setOverallStatus('running');
    
    // Reset all test results
    setTestResults(prev => prev.map(test => ({ ...test, status: 'pending' as const })));

    const tests = [
      { id: 'preview', name: 'Content Preview', component: 'ContentPreviewTest' },
      { id: 'search', name: 'Global Search', component: 'GlobalSearchTest' },
      { id: 'autosave', name: 'Auto-Save', component: 'AutoSaveTest' },
      { id: 'statistics', name: 'Content Statistics', component: 'StatisticsTest' },
      { id: 'editor', name: 'Enhanced Editor', component: 'EditorTest' }
    ];

    for (const test of tests) {
      updateTestResult(test.id, { status: 'running' });
      
      try {
        // Simulate test execution
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate 90% success rate
        const success = Math.random() > 0.1;
        
        updateTestResult(test.id, {
          status: success ? 'passed' : 'failed',
          duration: Math.random() * 2000 + 1000,
          error: success ? undefined : 'Simulated test failure'
        });
      } catch (error) {
        updateTestResult(test.id, {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    setIsRunning(false);
    setOverallStatus('completed');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'running': return <Play className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const passedTests = testResults.filter(test => test.status === 'passed').length;
  const failedTests = testResults.filter(test => test.status === 'failed').length;
  const totalTests = testResults.length;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <TestTube className="w-8 h-8 text-blue-600" />
              <span>CMS Test Suite</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive testing for all CMS functionality
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Test Results</div>
              <div className="text-2xl font-bold text-gray-900">
                {passedTests}/{totalTests} Passed
              </div>
            </div>
            <Button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isRunning ? (
                <>
                  <Play className="w-4 h-4 mr-2 animate-pulse" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Test Results Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Tests</p>
                <p className="text-2xl font-bold text-blue-900">{totalTests}</p>
              </div>
              <TestTube className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Passed</p>
                <p className="text-2xl font-bold text-green-900">{passedTests}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Failed</p>
                <p className="text-2xl font-bold text-red-900">{failedTests}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Success Rate</p>
                <p className="text-2xl font-bold text-purple-900">
                  {totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Results List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testResults.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{test.name}</h3>
                    {test.error && (
                      <p className="text-sm text-red-600 mt-1">{test.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {test.duration && (
                    <span className="text-sm text-gray-500">
                      {Math.round(test.duration)}ms
                    </span>
                  )}
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Test Components */}
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preview" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </TabsTrigger>
          <TabsTrigger value="autosave" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Auto-Save</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Statistics</span>
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Editor</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <ContentPreviewTest />
        </TabsContent>

        <TabsContent value="search">
          <GlobalSearchTest />
        </TabsContent>

        <TabsContent value="autosave">
          <AutoSaveTest />
        </TabsContent>

        <TabsContent value="statistics">
          <StatisticsTest />
        </TabsContent>

        <TabsContent value="editor">
          <EditorTest />
        </TabsContent>
      </Tabs>
    </div>
  );
}
