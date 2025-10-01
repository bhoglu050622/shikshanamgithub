'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Target,
  Zap,
  BookOpen,
  Eye,
  Settings
} from 'lucide-react';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  content: string;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: {
    type: 'click' | 'type' | 'scroll' | 'wait';
    selector?: string;
    value?: string;
    duration?: number;
  };
  tips?: string[];
  nextStep?: string;
  prevStep?: string;
}

interface OnScreenGuideProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: () => void;
  currentPage: string;
}

const GUIDE_STEPS: Record<string, GuideStep[]> = {
  'cms-dashboard': [
    {
      id: 'welcome',
      title: 'Welcome to Shikshanam CMS! 🎉',
      description: 'Let\'s take a quick tour of your new content management system',
      content: 'This is your CMS dashboard where you can manage all your content. We\'ll show you the key features that make content creation easy and professional.',
      position: 'top',
      tips: ['No coding required!', 'Everything is visual and intuitive', 'Professional results guaranteed']
    },
    {
      id: 'quick-stats',
      title: 'Quick Stats Overview',
      description: 'See your content performance at a glance',
      content: 'These cards show you important metrics about your content. You can see how many pages you have, recent activity, and system health.',
      target: '.stats-grid',
      position: 'bottom',
      tips: ['Monitor your content performance', 'Track user engagement', 'Identify popular content']
    },
    {
      id: 'navigation',
      title: 'Easy Navigation',
      description: 'Find what you need quickly',
      content: 'Use the sidebar to navigate between different sections. Each section has its own purpose and tools.',
      target: '.sidebar',
      position: 'right',
      tips: ['Pages: Manage your website pages', 'Courses: Edit course content', 'Analytics: View performance data']
    }
  ],
  'cms-edit': [
    {
      id: 'editor-welcome',
      title: 'Content Editor 🎨',
      description: 'This is where the magic happens!',
      content: 'The content editor is designed to be intuitive and powerful. You can create professional content without any technical knowledge.',
      position: 'top',
      tips: ['Visual editing interface', 'Real-time preview', 'Auto-save functionality']
    },
    {
      id: 'visual-builder',
      title: 'Visual Content Builder',
      description: 'Drag and drop to build your content',
      content: 'Use the Visual Builder to create content by dragging blocks. It\'s like building with digital LEGO blocks!',
      target: '[data-tour="visual-builder"]',
      position: 'bottom',
      action: {
        type: 'click',
        selector: '[data-tour="visual-builder-tab"]'
      },
      tips: ['Drag blocks from the left panel', 'Click blocks to edit them', 'Use the preview to see results']
    },
    {
      id: 'templates',
      title: 'Professional Templates',
      description: 'Start with proven designs',
      content: 'Choose from professionally designed templates that are proven to work. Each template is optimized for conversions.',
      target: '[data-tour="templates"]',
      position: 'bottom',
      action: {
        type: 'click',
        selector: '[data-tour="templates-tab"]'
      },
      tips: ['Templates save time', 'Professional designs', 'Mobile-optimized layouts']
    },
    {
      id: 'design-system',
      title: 'One-Click Design System',
      description: 'Apply beautiful themes instantly',
      content: 'Change the entire look of your content with one click. Choose from professional themes or create your own custom design.',
      target: '[data-tour="design-system"]',
      position: 'bottom',
      action: {
        type: 'click',
        selector: '[data-tour="design-tab"]'
      },
      tips: ['6 professional themes available', 'Custom color schemes', 'Typography options']
    },
    {
      id: 'mobile-preview',
      title: 'Mobile Preview',
      description: 'See how your content looks on mobile',
      content: 'Test your content on different devices to ensure it looks great everywhere. Mobile-first design is crucial for success.',
      target: '[data-tour="mobile-preview"]',
      position: 'bottom',
      action: {
        type: 'click',
        selector: '[data-tour="mobile-tab"]'
      },
      tips: ['Test on mobile, tablet, and desktop', 'Zoom in to see details', 'Check touch targets']
    },
    {
      id: 'ai-assistant',
      title: 'AI Content Assistant',
      description: 'Get smart suggestions for better content',
      content: 'Our AI assistant analyzes your content and provides suggestions to improve SEO, engagement, and overall quality.',
      target: '[data-tour="ai-assistant"]',
      position: 'bottom',
      action: {
        type: 'click',
        selector: '[data-tour="assistant-tab"]'
      },
      tips: ['SEO optimization suggestions', 'Content improvement tips', 'AI-generated content']
    }
  ],
  'cms-analytics': [
    {
      id: 'analytics-welcome',
      title: 'Analytics Dashboard 📊',
      description: 'Understand your content performance',
      content: 'Track how your content is performing with real-time analytics. See what\'s working and what needs improvement.',
      position: 'top',
      tips: ['Real-time data', 'Performance insights', 'Content optimization']
    },
    {
      id: 'content-stats',
      title: 'Content Statistics',
      description: 'Overview of your content library',
      content: 'See how many content pieces you have, their performance, and recent activity. This helps you understand your content ecosystem.',
      target: '.content-stats',
      position: 'bottom',
      tips: ['Track content growth', 'Monitor performance', 'Identify trends']
    },
    {
      id: 'performance-metrics',
      title: 'Performance Metrics',
      description: 'Key performance indicators',
      content: 'View important metrics like page views, engagement rates, and conversion data. Use this data to optimize your content strategy.',
      target: '.performance-metrics',
      position: 'bottom',
      tips: ['Monitor key metrics', 'Track improvements', 'Set goals']
    }
  ]
};

export default function OnScreenGuide({ isVisible, onClose, onComplete, currentPage }: OnScreenGuideProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showTips, setShowTips] = useState(true);

  const steps = GUIDE_STEPS[currentPage] || [];
  const currentStep = steps[currentStepIndex];

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  }, [currentStepIndex, steps.length, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  }, [currentStepIndex]);

  const skipTour = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const executeAction = useCallback((action: GuideStep['action']) => {
    if (!action) return;

    switch (action.type) {
      case 'click':
        if (action.selector) {
          const element = document.querySelector(action.selector);
          if (element) {
            (element as HTMLElement).click();
          }
        }
        break;
      case 'type':
        if (action.selector && action.value) {
          const element = document.querySelector(action.selector) as HTMLInputElement;
          if (element) {
            element.value = action.value;
            element.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
        break;
      case 'scroll':
        if (action.selector) {
          const element = document.querySelector(action.selector);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
      case 'wait':
        if (action.duration) {
          setTimeout(() => {
            nextStep();
          }, action.duration);
        }
        break;
    }
  }, [nextStep]);

  useEffect(() => {
    if (currentStep?.action) {
      executeAction(currentStep.action);
    }
  }, [currentStep, executeAction]);

  useEffect(() => {
    if (isPlaying && currentStep) {
      const timer = setTimeout(() => {
        nextStep();
      }, 5000); // Auto-advance every 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, nextStep]);

  if (!isVisible || !currentStep) {
    return null;
  }

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />
      
      {/* Guide Card */}
      <Card className="relative w-full max-w-2xl mx-auto bg-white shadow-2xl">
        {/* Header */}
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{currentStep.title}</CardTitle>
                <p className="text-sm text-gray-600">{currentStep.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <CardContent className="space-y-4">
          <div className="text-gray-700 leading-relaxed">
            {currentStep.content}
          </div>

          {/* Tips */}
          {showTips && currentStep.tips && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Pro Tips
              </h4>
              <ul className="space-y-1">
                {currentStep.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-blue-800 flex items-start">
                    <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Auto-play
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={skipTour}
                className="text-gray-500"
              >
                Skip Tour
              </Button>
              
              <Button
                onClick={nextStep}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlight Overlay */}
      {currentStep.target && (
        <div 
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '100px',
            border: '2px solid #3B82F6',
            borderRadius: '8px',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
}
