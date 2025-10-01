'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Settings, 
  BarChart3, 
  Users, 
  Brain,
  Palette,
  Share2,
  Target,
  Lightbulb
} from 'lucide-react';

interface GunaProfilerContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    backgroundImage?: string;
  };
  quiz: {
    title: string;
    description: string;
    questions: Array<{
      id: string;
      text: string;
      options: Array<{
        text: string;
        value: string;
        guna: 'sattva' | 'rajas' | 'tamas';
      }>;
    }>;
  };
  results: {
    title: string;
    description: string;
    analysisTitle: string;
    recommendationsTitle: string;
  };
  analysis: {
    sattva: {
      title: string;
      description: string;
      characteristics: string[];
      color: string;
    };
    rajas: {
      title: string;
      description: string;
      characteristics: string[];
      color: string;
    };
    tamas: {
      title: string;
      description: string;
      characteristics: string[];
      color: string;
    };
  };
  recommendations: {
    title: string;
    description: string;
    practices: Array<{
      title: string;
      description: string;
      type: 'sattva' | 'rajas' | 'tamas';
    }>;
  };
  colorTherapy: {
    title: string;
    description: string;
    colors: Array<{
      name: string;
      hex: string;
      description: string;
      guna: 'sattva' | 'rajas' | 'tamas';
    }>;
  };
}

export default function GunaProfilerCMS() {
  const [content, setContent] = useState<GunaProfilerContent>({
    hero: {
      title: 'Discover Your Guna Profile',
      subtitle: 'Ancient Wisdom for Modern Self-Discovery',
      description: 'Take our comprehensive Guna assessment to understand your personality type and receive personalized recommendations for spiritual growth.',
      ctaText: 'Start Your Assessment'
    },
    quiz: {
      title: 'Guna Assessment Quiz',
      description: 'Answer these questions honestly to discover your dominant Guna type.',
      questions: []
    },
    results: {
      title: 'Your Guna Profile',
      description: 'Based on your responses, here is your personalized Guna analysis.',
      analysisTitle: 'Guna Analysis',
      recommendationsTitle: 'Personalized Recommendations'
    },
    analysis: {
      sattva: {
        title: 'Sattva Guna',
        description: 'The quality of purity, wisdom, and spiritual growth.',
        characteristics: ['Peaceful', 'Wise', 'Compassionate', 'Balanced'],
        color: '#4ade80'
      },
      rajas: {
        title: 'Rajas Guna',
        description: 'The quality of activity, passion, and ambition.',
        characteristics: ['Active', 'Ambitious', 'Passionate', 'Dynamic'],
        color: '#f59e0b'
      },
      tamas: {
        title: 'Tamas Guna',
        description: 'The quality of inertia, stability, and material focus.',
        characteristics: ['Stable', 'Practical', 'Grounded', 'Material'],
        color: '#6b7280'
      }
    },
    recommendations: {
      title: 'Personalized Recommendations',
      description: 'Based on your Guna profile, here are practices to help you grow spiritually.',
      practices: []
    },
    colorTherapy: {
      title: 'Color Therapy for Your Guna',
      description: 'Use these colors to balance and enhance your dominant Guna qualities.',
      colors: []
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load content on component mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cms/guna-profiler');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/cms/guna-profiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert('Content saved successfully!');
      } else {
        alert('Error saving content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content');
    } finally {
      setIsSaving(false);
    }
  };

  const previewContent = () => {
    window.open('/guna-profiler', '_blank');
  };

  const updateContent = (section: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof GunaProfilerContent],
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading Guna Profiler content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Guna Profiler CMS</h1>
              <p className="text-sm text-gray-600">Manage the Guna assessment tool content</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={previewContent}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </Button>
            <Button
              onClick={saveContent}
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="p-6">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Hero</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Results</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="color-therapy" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Colors</span>
            </TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={content.hero.title}
                    onChange={(e) => updateContent('hero', 'title', e.target.value)}
                    placeholder="Enter hero title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <Input
                    value={content.hero.subtitle}
                    onChange={(e) => updateContent('hero', 'subtitle', e.target.value)}
                    placeholder="Enter hero subtitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={content.hero.description}
                    onChange={(e) => updateContent('hero', 'description', e.target.value)}
                    placeholder="Enter hero description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Text
                  </label>
                  <Input
                    value={content.hero.ctaText}
                    onChange={(e) => updateContent('hero', 'ctaText', e.target.value)}
                    placeholder="Enter CTA button text"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Section */}
          <TabsContent value="quiz">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz Title
                  </label>
                  <Input
                    value={content.quiz.title}
                    onChange={(e) => updateContent('quiz', 'title', e.target.value)}
                    placeholder="Enter quiz title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quiz Description
                  </label>
                  <Textarea
                    value={content.quiz.description}
                    onChange={(e) => updateContent('quiz', 'description', e.target.value)}
                    placeholder="Enter quiz description"
                    rows={3}
                  />
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Questions are managed through the quiz interface. 
                    Use the preview to test the quiz functionality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Section */}
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Results Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Results Title
                  </label>
                  <Input
                    value={content.results.title}
                    onChange={(e) => updateContent('results', 'title', e.target.value)}
                    placeholder="Enter results title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Results Description
                  </label>
                  <Textarea
                    value={content.results.description}
                    onChange={(e) => updateContent('results', 'description', e.target.value)}
                    placeholder="Enter results description"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analysis Section Title
                  </label>
                  <Input
                    value={content.results.analysisTitle}
                    onChange={(e) => updateContent('results', 'analysisTitle', e.target.value)}
                    placeholder="Enter analysis section title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recommendations Section Title
                  </label>
                  <Input
                    value={content.results.recommendationsTitle}
                    onChange={(e) => updateContent('results', 'recommendationsTitle', e.target.value)}
                    placeholder="Enter recommendations section title"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Section */}
          <TabsContent value="analysis">
            <div className="space-y-6">
              {Object.entries(content.analysis).map(([guna, data]) => (
                <Card key={guna}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: data.color }}
                      />
                      <span>{data.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Textarea
                        value={data.description}
                        onChange={(e) => updateContent('analysis', guna, { ...data, description: e.target.value })}
                        placeholder={`Enter ${guna} description`}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color (Hex Code)
                      </label>
                      <Input
                        value={data.color}
                        onChange={(e) => updateContent('analysis', guna, { ...data, color: e.target.value })}
                        placeholder="#000000"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recommendations Section */}
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={content.recommendations.title}
                    onChange={(e) => updateContent('recommendations', 'title', e.target.value)}
                    placeholder="Enter recommendations title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={content.recommendations.description}
                    onChange={(e) => updateContent('recommendations', 'description', e.target.value)}
                    placeholder="Enter recommendations description"
                    rows={3}
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Practice recommendations are managed through the recommendations system. 
                    Use the preview to see the full recommendations interface.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Color Therapy Section */}
          <TabsContent value="color-therapy">
            <Card>
              <CardHeader>
                <CardTitle>Color Therapy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={content.colorTherapy.title}
                    onChange={(e) => updateContent('colorTherapy', 'title', e.target.value)}
                    placeholder="Enter color therapy title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={content.colorTherapy.description}
                    onChange={(e) => updateContent('colorTherapy', 'description', e.target.value)}
                    placeholder="Enter color therapy description"
                    rows={3}
                  />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Color configurations are managed through the color therapy system. 
                    Use the preview to see the full color therapy interface.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
