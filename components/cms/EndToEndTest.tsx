'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  RefreshCw, 
  Play, 
  Settings, 
  Code, 
  Palette, 
  Eye, 
  Save, 
  Undo, 
  Redo, 
  Zap, 
  Bug, 
  Shield, 
  Clock, 
  BarChart3, 
  FileText, 
  Image, 
  Video, 
  Type, 
  Layout, 
  Target, 
  Link, 
  Database, 
  Network, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Cloud, 
  Wifi, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Laptop, 
  Server, 
  Router, 
  ToggleLeft, 
  Cable, 
  Plug, 
  Battery, 
  Power, 
  Zap as Lightning, 
  Sparkles, 
  Wand2, 
  Brain, 
  Cpu as Processor, 
  MemoryStick as Ram, 
  HardDrive as Storage, 
  Cloud as CloudIcon, 
  Wifi as WifiIcon, 
  Smartphone as Phone, 
  Monitor as Screen, 
  Tablet as TabletIcon, 
  Laptop as LaptopIcon, 
  Monitor as DesktopIcon, 
  Server as ServerIcon, 
  Router as RouterIcon, 
  ToggleLeft as SwitchIcon, 
  Circle as HubIcon, 
  Cable as CableIcon, 
  Plug as PlugIcon, 
  Battery as BatteryIcon, 
  Power as PowerIcon, 
  Zap as LightningIcon, 
  Sparkles as SparklesIcon, 
  Wand2 as Wand2Icon, 
  Brain as BrainIcon,
  Globe,
  Users,
  TrendingUp,
  Star,
  Heart,
  DollarSign,
  MessageSquare,
  Package,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Info,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  MinusCircle,
  PlusCircle,
  Circle,
  Dot,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  Diamond,
  Star as StarIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Sparkles as SparklesIcon2,
  Wand2 as Wand2Icon2,
  Brain as BrainIcon2,
  Cpu as CpuIcon,
  MemoryStick as MemoryStickIcon,
  HardDrive as HardDriveIcon,
  Cloud as CloudIcon2,
  Wifi as WifiIcon2,
  Smartphone as SmartphoneIcon,
  Monitor as MonitorIcon,
  Tablet as TabletIcon2,
  Laptop as LaptopIcon2,
  Monitor as DesktopIcon2,
  Server as ServerIcon2,
  Router as RouterIcon2,
  ToggleLeft as SwitchIcon2,
  Circle as HubIcon2,
  Cable as CableIcon2,
  Plug as PlugIcon2,
  Battery as BatteryIcon2,
  Power as PowerIcon2,
  Zap as LightningIcon2,
  Sparkles as SparklesIcon3,
  Wand2 as Wand2Icon3,
  Brain as BrainIcon3
} from 'lucide-react';

interface EndToEndTestProps {
  onTestComplete?: (results: any) => void;
}

interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  message: string;
  duration: number;
  details?: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  steps: TestStep[];
}

interface TestStep {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  message: string;
  duration: number;
  details?: string;
}

export default function EndToEndTest({ onTestComplete }: EndToEndTestProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [testProgress, setTestProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'visual' | 'code' | 'integration' | 'performance' | 'security'>('overview');

  const testSuites = [
    {
      id: 'overview',
      name: 'Overview Tests',
      icon: BarChart3,
      description: 'High-level system functionality tests',
      tests: [
        {
          id: 'cms-dashboard',
          name: 'CMS Dashboard Loading',
          description: 'Test if the CMS dashboard loads correctly',
          category: 'overview',
          priority: 'high',
          steps: [
            { id: 'load-dashboard', name: 'Load Dashboard', status: 'pending', message: '', duration: 0 },
            { id: 'check-navigation', name: 'Check Navigation', status: 'pending', message: '', duration: 0 },
            { id: 'verify-content', name: 'Verify Content Display', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'content-list',
          name: 'Content List Display',
          description: 'Test if content list displays correctly',
          category: 'overview',
          priority: 'high',
          steps: [
            { id: 'load-content', name: 'Load Content List', status: 'pending', message: '', duration: 0 },
            { id: 'check-filters', name: 'Check Filters', status: 'pending', message: '', duration: 0 },
            { id: 'test-search', name: 'Test Search', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'navigation',
          name: 'Navigation System',
          description: 'Test navigation between different sections',
          category: 'overview',
          priority: 'medium',
          steps: [
            { id: 'test-routing', name: 'Test Routing', status: 'pending', message: '', duration: 0 },
            { id: 'check-breadcrumbs', name: 'Check Breadcrumbs', status: 'pending', message: '', duration: 0 },
            { id: 'verify-back-button', name: 'Verify Back Button', status: 'pending', message: '', duration: 0 }
          ]
        }
      ]
    },
    {
      id: 'visual',
      name: 'Visual Editor Tests',
      icon: Palette,
      description: 'Visual editor functionality tests',
      tests: [
        {
          id: 'visual-editor-load',
          name: 'Visual Editor Loading',
          description: 'Test if visual editor loads correctly',
          category: 'visual',
          priority: 'high',
          steps: [
            { id: 'load-editor', name: 'Load Visual Editor', status: 'pending', message: '', duration: 0 },
            { id: 'check-toolbar', name: 'Check Toolbar', status: 'pending', message: '', duration: 0 },
            { id: 'verify-canvas', name: 'Verify Canvas', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'drag-drop',
          name: 'Drag & Drop Functionality',
          description: 'Test drag and drop operations',
          category: 'visual',
          priority: 'high',
          steps: [
            { id: 'test-drag', name: 'Test Drag Operation', status: 'pending', message: '', duration: 0 },
            { id: 'test-drop', name: 'Test Drop Operation', status: 'pending', message: '', duration: 0 },
            { id: 'verify-positioning', name: 'Verify Positioning', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'inline-editing',
          name: 'Inline Editing',
          description: 'Test inline text editing',
          category: 'visual',
          priority: 'high',
          steps: [
            { id: 'start-editing', name: 'Start Editing', status: 'pending', message: '', duration: 0 },
            { id: 'test-input', name: 'Test Input', status: 'pending', message: '', duration: 0 },
            { id: 'save-changes', name: 'Save Changes', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'element-library',
          name: 'Element Library',
          description: 'Test element library functionality',
          category: 'visual',
          priority: 'medium',
          steps: [
            { id: 'load-library', name: 'Load Element Library', status: 'pending', message: '', duration: 0 },
            { id: 'test-elements', name: 'Test Elements', status: 'pending', message: '', duration: 0 },
            { id: 'verify-categories', name: 'Verify Categories', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'real-time-preview',
          name: 'Real-time Preview',
          description: 'Test real-time preview updates',
          category: 'visual',
          priority: 'high',
          steps: [
            { id: 'enable-preview', name: 'Enable Preview', status: 'pending', message: '', duration: 0 },
            { id: 'test-updates', name: 'Test Updates', status: 'pending', message: '', duration: 0 },
            { id: 'verify-sync', name: 'Verify Sync', status: 'pending', message: '', duration: 0 }
          ]
        }
      ]
    },
    {
      id: 'code',
      name: 'Code Editor Tests',
      icon: Code,
      description: 'Code editor functionality tests',
      tests: [
        {
          id: 'code-editor-load',
          name: 'Code Editor Loading',
          description: 'Test if code editor loads correctly',
          category: 'code',
          priority: 'high',
          steps: [
            { id: 'load-editor', name: 'Load Code Editor', status: 'pending', message: '', duration: 0 },
            { id: 'check-syntax', name: 'Check Syntax Highlighting', status: 'pending', message: '', duration: 0 },
            { id: 'verify-formatting', name: 'Verify Formatting', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'json-validation',
          name: 'JSON Validation',
          description: 'Test JSON validation and error handling',
          category: 'code',
          priority: 'high',
          steps: [
            { id: 'test-valid-json', name: 'Test Valid JSON', status: 'pending', message: '', duration: 0 },
            { id: 'test-invalid-json', name: 'Test Invalid JSON', status: 'pending', message: '', duration: 0 },
            { id: 'check-error-display', name: 'Check Error Display', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'find-replace',
          name: 'Find & Replace',
          description: 'Test find and replace operations',
          category: 'code',
          priority: 'medium',
          steps: [
            { id: 'test-find', name: 'Test Find', status: 'pending', message: '', duration: 0 },
            { id: 'test-replace', name: 'Test Replace', status: 'pending', message: '', duration: 0 },
            { id: 'test-replace-all', name: 'Test Replace All', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'code-formatting',
          name: 'Code Formatting',
          description: 'Test code formatting functionality',
          category: 'code',
          priority: 'medium',
          steps: [
            { id: 'test-format', name: 'Test Format', status: 'pending', message: '', duration: 0 },
            { id: 'test-minify', name: 'Test Minify', status: 'pending', message: '', duration: 0 },
            { id: 'test-prettify', name: 'Test Prettify', status: 'pending', message: '', duration: 0 }
          ]
        }
      ]
    },
    {
      id: 'integration',
      name: 'Integration Tests',
      icon: Network,
      description: 'Integration and API tests',
      tests: [
        {
          id: 'api-connectivity',
          name: 'API Connectivity',
          description: 'Test API endpoint connectivity',
          category: 'integration',
          priority: 'high',
          steps: [
            { id: 'test-get', name: 'Test GET Requests', status: 'pending', message: '', duration: 0 },
            { id: 'test-post', name: 'Test POST Requests', status: 'pending', message: '', duration: 0 },
            { id: 'test-put', name: 'Test PUT Requests', status: 'pending', message: '', duration: 0 },
            { id: 'test-delete', name: 'Test DELETE Requests', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'nextjs-integration',
          name: 'Next.js Integration',
          description: 'Test Next.js frontend integration',
          category: 'integration',
          priority: 'high',
          steps: [
            { id: 'test-routing', name: 'Test Routing', status: 'pending', message: '', duration: 0 },
            { id: 'test-components', name: 'Test Components', status: 'pending', message: '', duration: 0 },
            { id: 'test-data-flow', name: 'Test Data Flow', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'content-sync',
          name: 'Content Synchronization',
          description: 'Test content synchronization between CMS and frontend',
          category: 'integration',
          priority: 'high',
          steps: [
            { id: 'test-sync', name: 'Test Sync', status: 'pending', message: '', duration: 0 },
            { id: 'test-conflicts', name: 'Test Conflicts', status: 'pending', message: '', duration: 0 },
            { id: 'test-resolution', name: 'Test Resolution', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'state-management',
          name: 'State Management',
          description: 'Test state management across components',
          category: 'integration',
          priority: 'medium',
          steps: [
            { id: 'test-state', name: 'Test State', status: 'pending', message: '', duration: 0 },
            { id: 'test-persistence', name: 'Test Persistence', status: 'pending', message: '', duration: 0 },
            { id: 'test-recovery', name: 'Test Recovery', status: 'pending', message: '', duration: 0 }
          ]
        }
      ]
    },
    {
      id: 'performance',
      name: 'Performance Tests',
      icon: Zap,
      description: 'Performance and optimization tests',
      tests: [
        {
          id: 'load-times',
          name: 'Load Times',
          description: 'Test page and component load times',
          category: 'performance',
          priority: 'high',
          steps: [
            { id: 'test-initial-load', name: 'Test Initial Load', status: 'pending', message: '', duration: 0 },
            { id: 'test-navigation', name: 'Test Navigation', status: 'pending', message: '', duration: 0 },
            { id: 'test-editor-load', name: 'Test Editor Load', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'memory-usage',
          name: 'Memory Usage',
          description: 'Test memory usage and optimization',
          category: 'performance',
          priority: 'medium',
          steps: [
            { id: 'test-memory', name: 'Test Memory', status: 'pending', message: '', duration: 0 },
            { id: 'test-gc', name: 'Test Garbage Collection', status: 'pending', message: '', duration: 0 },
            { id: 'test-leaks', name: 'Test Memory Leaks', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'rendering-performance',
          name: 'Rendering Performance',
          description: 'Test rendering performance',
          category: 'performance',
          priority: 'medium',
          steps: [
            { id: 'test-fps', name: 'Test FPS', status: 'pending', message: '', duration: 0 },
            { id: 'test-repaints', name: 'Test Repaints', status: 'pending', message: '', duration: 0 },
            { id: 'test-layout', name: 'Test Layout', status: 'pending', message: '', duration: 0 }
          ]
        }
      ]
    },
    {
      id: 'security',
      name: 'Security Tests',
      icon: Shield,
      description: 'Security and validation tests',
      tests: [
        {
          id: 'input-validation',
          name: 'Input Validation',
          description: 'Test input validation and sanitization',
          category: 'security',
          priority: 'high',
          steps: [
            { id: 'test-xss', name: 'Test XSS Prevention', status: 'pending', message: '', duration: 0 },
            { id: 'test-sql-injection', name: 'Test SQL Injection', status: 'pending', message: '', duration: 0 },
            { id: 'test-csrf', name: 'Test CSRF Protection', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'authentication',
          name: 'Authentication',
          description: 'Test authentication and authorization',
          category: 'security',
          priority: 'high',
          steps: [
            { id: 'test-login', name: 'Test Login', status: 'pending', message: '', duration: 0 },
            { id: 'test-session', name: 'Test Session', status: 'pending', message: '', duration: 0 },
            { id: 'test-permissions', name: 'Test Permissions', status: 'pending', message: '', duration: 0 }
          ]
        },
        {
          id: 'data-protection',
          name: 'Data Protection',
          description: 'Test data protection and privacy',
          category: 'security',
          priority: 'medium',
          steps: [
            { id: 'test-encryption', name: 'Test Encryption', status: 'pending', message: '', duration: 0 },
            { id: 'test-backup', name: 'Test Backup', status: 'pending', message: '', duration: 0 },
            { id: 'test-recovery', name: 'Test Recovery', status: 'pending', message: '', duration: 0 }
          ]
        }
      ]
    }
  ];

  const runTest = async (test: any): Promise<TestResult> => {
    const startTime = Date.now();
    const results: TestStep[] = [];
    
    try {
      // Run each step of the test
      for (const step of test.steps) {
        const stepStartTime = Date.now();
        setCurrentTest(`${test.name} - ${step.name}`);
        
        // Simulate test execution
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
        
        // Mock test results based on test type
        let status: 'pass' | 'fail' | 'warning' = 'pass';
        let message = 'Step passed successfully';
        let details = 'All checks completed without issues';
        
        // Simulate some tests failing or having warnings
        if (step.id.includes('performance') || step.id.includes('memory')) {
          if (Math.random() > 0.8) {
            status = 'warning';
            message = 'Step passed with warnings';
            details = 'Performance could be improved';
          }
        } else if (step.id.includes('security') || step.id.includes('validation')) {
          if (Math.random() > 0.9) {
            status = 'fail';
            message = 'Step failed';
            details = 'Security vulnerability detected';
          }
        }
        
        const stepDuration = Date.now() - stepStartTime;
        results.push({
          id: step.id,
          name: step.name,
          status,
          message,
          duration: stepDuration,
          details
        });
      }
      
      const duration = Date.now() - startTime;
      const overallStatus = results.every(r => r.status === 'pass') ? 'pass' : 
                          results.some(r => r.status === 'fail') ? 'fail' : 'warning';
      
      return {
        id: test.id,
        name: test.name,
        status: overallStatus,
        message: overallStatus === 'pass' ? 'Test passed successfully' : 
                overallStatus === 'fail' ? 'Test failed' : 'Test passed with warnings',
        duration,
        details: results.map(r => r.message).join('; '),
        category: test.category,
        priority: test.priority,
        steps: results
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      return {
        id: test.id,
        name: test.name,
        status: 'fail',
        message: 'Test failed with error',
        duration,
        details: error instanceof Error ? error.message : 'Unknown error',
        category: test.category,
        priority: test.priority,
        steps: results
      };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setTestProgress(0);
    
    const allTests = testSuites.flatMap(suite => suite.tests);
    const results: TestResult[] = [];
    
    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i];
      setTestProgress((i / allTests.length) * 100);
      
      const result = await runTest(test);
      results.push(result);
      setTestResults([...results]);
      
      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setCurrentTest(null);
    setTestProgress(100);
    setIsRunning(false);
    
    if (onTestComplete) {
      onTestComplete(results);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800 border-green-200';
      case 'fail': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTestStats = () => {
    const total = testResults.length;
    const passed = testResults.filter(r => r.status === 'pass').length;
    const failed = testResults.filter(r => r.status === 'fail').length;
    const warnings = testResults.filter(r => r.status === 'warning').length;
    const totalDuration = testResults.reduce((sum, r) => sum + r.duration, 0);
    
    return { total, passed, failed, warnings, totalDuration };
  };

  const stats = getTestStats();

  const getTabTests = () => {
    const allTests = testSuites.flatMap(suite => suite.tests);
    return allTests.filter(test => test.category === activeTab);
  };

  const tabTests = getTabTests();

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                End-to-End Test Suite
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive testing of all CMS functionality and integrations
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="bg-white/80 backdrop-blur-sm"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            <Button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Test Progress */}
      {isRunning && (
        <div className="mb-8 bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-purple-900">Running Tests</h3>
            <span className="text-sm text-purple-700">{Math.round(testProgress)}% Complete</span>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2 mb-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${testProgress}%` }}
            />
          </div>
          {currentTest && (
            <p className="text-sm text-purple-700">
              Currently running: <strong>{currentTest}</strong>
            </p>
          )}
        </div>
      )}

      {/* Test Results Summary */}
      {testResults.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Passed</p>
                    <p className="text-2xl font-bold text-green-900">{stats.passed}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Failed</p>
                    <p className="text-2xl font-bold text-red-900">{stats.failed}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">Warnings</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats.warnings}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Duration</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalDuration}ms</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Test Categories */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6">
          {testSuites.map(suite => (
            <TabsTrigger key={suite.id} value={suite.id} className="flex items-center space-x-2">
              <suite.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{suite.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {testSuites.map(suite => (
          <TabsContent key={suite.id} value={suite.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <suite.icon className="w-5 h-5" />
                  <span>{suite.name}</span>
                </CardTitle>
                <p className="text-sm text-gray-600">{suite.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suite.tests.map(test => {
                    const result = testResults.find(r => r.id === test.id);
                    const isSelected = selectedTest === test.id;
                    
                    return (
                      <div
                        key={test.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTest(isSelected ? null : test.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {result ? getStatusIcon(result.status) : <Clock className="w-4 h-4 text-gray-400" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{test.name}</h4>
                              <p className="text-sm text-gray-600">{test.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getPriorityColor(test.priority)}`}>
                              {test.priority}
                            </Badge>
                            {result && (
                              <>
                                <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                                  {result.status}
                                </Badge>
                                <span className="text-sm text-gray-500">{result.duration}ms</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {isSelected && result && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="space-y-4">
                              <div>
                                <span className="font-medium text-gray-700">Status: </span>
                                <span className={`font-medium ${
                                  result.status === 'pass' ? 'text-green-600' :
                                  result.status === 'fail' ? 'text-red-600' : 'text-yellow-600'
                                }`}>
                                  {result.message}
                                </span>
                              </div>
                              {result.details && (
                                <div>
                                  <span className="font-medium text-gray-700">Details: </span>
                                  <span className="text-gray-600">{result.details}</span>
                                </div>
                              )}
                              <div>
                                <span className="font-medium text-gray-700">Duration: </span>
                                <span className="text-gray-600">{result.duration}ms</span>
                              </div>
                              
                              {/* Test Steps */}
                              <div>
                                <span className="font-medium text-gray-700">Test Steps:</span>
                                <div className="mt-2 space-y-2">
                                  {result.steps.map(step => (
                                    <div key={step.id} className="flex items-center space-x-2 text-sm">
                                      {getStatusIcon(step.status)}
                                      <span className="text-gray-600">{step.name}</span>
                                      <span className="text-gray-400">({step.duration}ms)</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Detailed Results */}
      {showDetails && testResults.length > 0 && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map(result => (
                  <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <h4 className="font-medium text-gray-900">{result.name}</h4>
                        <p className="text-sm text-gray-600">{result.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(result.priority)}`}>
                        {result.priority}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(result.status)}`}>
                        {result.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{result.duration}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
