'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Wand2, 
  BookOpen, 
  Palette, 
  Smartphone, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

interface WelcomeModalProps {
  isVisible: boolean;
  onStartTour: () => void;
  onSkip: () => void;
  pageType: string;
}

const FEATURES = [
  {
    icon: Wand2,
    title: 'Visual Content Builder',
    description: 'Drag and drop to create beautiful content',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: BookOpen,
    title: 'Professional Templates',
    description: 'Start with proven, conversion-focused designs',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: Palette,
    title: 'One-Click Design System',
    description: 'Apply beautiful themes instantly',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Smartphone,
    title: 'Mobile Preview',
    description: 'Test your content on all devices',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Lightbulb,
    title: 'AI Content Assistant',
    description: 'Get smart suggestions for better content',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    description: 'Track performance and optimize content',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50'
  }
];

const BENEFITS = [
  'No coding knowledge required',
  'Professional results guaranteed',
  'Mobile-optimized content',
  'SEO-friendly structure',
  'Consistent branding',
  'Time-efficient workflow'
];

export default function WelcomeModal({ isVisible, onStartTour, onSkip, pageType }: WelcomeModalProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureTitle: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureTitle) 
        ? prev.filter(f => f !== featureTitle)
        : [...prev, featureTitle]
    );
  };

  if (!isVisible) return null;

  const getPageTitle = () => {
    switch (pageType) {
      case 'cms-dashboard':
        return 'Welcome to Your CMS Dashboard';
      case 'cms-edit':
        return 'Welcome to the Content Editor';
      case 'cms-analytics':
        return 'Welcome to Analytics';
      default:
        return 'Welcome to Shikshanam CMS';
    }
  };

  const getPageDescription = () => {
    switch (pageType) {
      case 'cms-dashboard':
        return 'Your central hub for managing all content. From here you can access all your content management tools.';
      case 'cms-edit':
        return 'Create and edit content with our powerful, user-friendly editor. No technical skills required!';
      case 'cms-analytics':
        return 'Track your content performance and get insights to improve your results.';
      default:
        return 'A powerful content management system designed for non-technical users.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {getPageTitle()}
          </CardTitle>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getPageDescription()}
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              What makes our CMS special?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                const isSelected = selectedFeatures.includes(feature.title);
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleFeature(feature.title)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${feature.color}`} />
                      </div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Why choose our CMS?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">6</div>
              <div className="text-sm text-gray-600">Professional Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">No-Code Solution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">AI Assistant</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <blockquote className="text-gray-700 italic mb-2">
                  "This CMS transformed how we create content. What used to take hours now takes minutes, and the results look more professional than ever!"
                </blockquote>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Sarah Johnson</div>
                  <div>Content Manager, TechCorp</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onStartTour}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Start Interactive Tour
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={onSkip}
              variant="outline"
              className="px-8 py-3 text-lg"
            >
              Skip Tour
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-gray-500">
            <p>
              💡 <strong>Tip:</strong> You can always access the tour from the help menu in the top navigation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
