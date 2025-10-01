'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Lightbulb, 
  Wand2, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Zap,
  HelpCircle,
  Star
} from 'lucide-react';

interface ContentSuggestion {
  id: string;
  type: 'improvement' | 'optimization' | 'seo' | 'accessibility' | 'engagement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  impact: string;
}

interface SmartContentAssistantProps {
  content: any;
  sectionName: string;
  onApplySuggestion: (suggestion: ContentSuggestion, updatedContent: any) => void;
}

const CONTENT_TEMPLATES = {
  hero: {
    title: "Hero Section Template",
    description: "High-converting hero section with clear value proposition",
    template: {
      headline: "Transform Your Life with Ancient Wisdom",
      subheadline: "Discover the timeless teachings of Sanskrit, Yoga, and Indian Philosophy",
      cta: "Start Your Journey",
      ctaLink: "/courses"
    }
  },
  testimonial: {
    title: "Testimonial Template",
    description: "Compelling testimonial that builds trust and credibility",
    template: {
      quote: "This course completely transformed my understanding of ancient wisdom.",
      author: "Sarah Johnson",
      role: "Student",
      rating: 5
    }
  },
  course: {
    title: "Course Description Template",
    description: "Engaging course description that drives enrollment",
    template: {
      title: "Learn Sanskrit Fundamentals",
      description: "Master the ancient language of the Vedas with our comprehensive course",
      benefits: ["Interactive lessons", "Expert guidance", "Lifetime access"],
      duration: "8 weeks",
      level: "Beginner"
    }
  }
};

const SEO_SUGGESTIONS = [
  {
    id: 'seo-meta-description',
    type: 'seo',
    title: 'Add Meta Description',
    description: 'Your content is missing a meta description. This helps with search engine visibility.',
    priority: 'high',
    action: 'Add a compelling meta description (150-160 characters)',
    impact: 'Improves search engine ranking and click-through rates'
  },
  {
    id: 'seo-optimize-headings',
    type: 'seo',
    title: 'Optimize Headings',
    description: 'Use proper heading hierarchy (H1, H2, H3) for better SEO.',
    priority: 'medium',
    action: 'Structure your content with proper heading tags',
    impact: 'Better search engine understanding and accessibility'
  },
  {
    id: 'seo-alt-text',
    type: 'seo',
    title: 'Add Alt Text to Images',
    description: 'Images should have descriptive alt text for accessibility and SEO.',
    priority: 'high',
    action: 'Add descriptive alt text to all images',
    impact: 'Improves accessibility and image search visibility'
  }
];

const ENGAGEMENT_SUGGESTIONS = [
  {
    id: 'engagement-cta',
    type: 'engagement',
    title: 'Add Call-to-Action',
    description: 'Include a clear call-to-action to guide user behavior.',
    priority: 'high',
    action: 'Add a prominent CTA button or link',
    impact: 'Increases user engagement and conversions'
  },
  {
    id: 'engagement-social-proof',
    type: 'engagement',
    title: 'Include Social Proof',
    description: 'Add testimonials or user reviews to build trust.',
    priority: 'medium',
    action: 'Include customer testimonials or success stories',
    impact: 'Builds credibility and increases conversions'
  },
  {
    id: 'engagement-scannable',
    type: 'engagement',
    title: 'Create Scannable Content',
    description: 'Use bullet points, headings, and short paragraphs.',
    priority: 'medium',
    action: 'Break up long text with formatting',
    impact: 'Improves readability and user engagement'
  }
];

export default function SmartContentAssistant({ content, sectionName, onApplySuggestion }: SmartContentAssistantProps) {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const analyzeContent = useCallback(async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const newSuggestions: ContentSuggestion[] = [];
      
      // SEO Analysis
      if (!content.metaDescription) {
        newSuggestions.push(SEO_SUGGESTIONS[0] as ContentSuggestion);
      }
      
      if (!content.headings || content.headings.length < 2) {
        newSuggestions.push(SEO_SUGGESTIONS[1] as ContentSuggestion);
      }
      
      if (content.images && content.images.some((img: any) => !img.alt)) {
        newSuggestions.push(SEO_SUGGESTIONS[2] as ContentSuggestion);
      }
      
      // Engagement Analysis
      if (!content.cta) {
        newSuggestions.push(ENGAGEMENT_SUGGESTIONS[0] as ContentSuggestion);
      }
      
      if (!content.testimonials) {
        newSuggestions.push(ENGAGEMENT_SUGGESTIONS[1] as ContentSuggestion);
      }
      
      // Content Quality Analysis
      if (content.text && content.text.length < 100) {
        newSuggestions.push({
          id: 'improvement-expand-content',
          type: 'improvement',
          title: 'Expand Content',
          description: 'Your content is quite short. Consider adding more detail.',
          priority: 'medium',
          action: 'Add more detailed information and examples',
          impact: 'Provides more value to readers and improves SEO'
        });
      }
      
      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
    }, 2000);
  }, [content]);

  const applySuggestion = useCallback((suggestion: ContentSuggestion) => {
    let updatedContent = { ...content };
    
    switch (suggestion.type) {
      case 'seo':
        if (suggestion.title === 'Add Meta Description') {
          updatedContent.metaDescription = 'Discover ancient wisdom and transform your life with our comprehensive Sanskrit and philosophy courses.';
        }
        break;
      case 'engagement':
        if (suggestion.title === 'Add Call-to-Action') {
          updatedContent.cta = {
            text: 'Start Learning Today',
            link: '/courses',
            style: 'primary'
          };
        }
        break;
      case 'improvement':
        if (suggestion.title === 'Expand Content') {
          updatedContent.text = content.text + ' This comprehensive approach ensures you get the most out of your learning journey.';
        }
        break;
    }
    
    onApplySuggestion(suggestion, updatedContent);
    
    // Remove applied suggestion
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  }, [content, onApplySuggestion]);

  const applyTemplate = useCallback((templateKey: string) => {
    const template = CONTENT_TEMPLATES[templateKey as keyof typeof CONTENT_TEMPLATES];
    if (template) {
      const updatedContent = { ...content, ...template.template };
      onApplySuggestion({
        id: `template-${templateKey}`,
        type: 'improvement',
        title: `Applied ${template.title}`,
        description: template.description,
        priority: 'medium',
        action: 'Template applied',
        impact: 'Improved content structure'
      }, updatedContent);
    }
  }, [content, onApplySuggestion]);

  const generateWithAI = useCallback(async () => {
    if (!customPrompt.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = {
        ...content,
        aiGenerated: true,
        aiPrompt: customPrompt,
        generatedAt: new Date().toISOString()
      };
      
      // Add AI-generated content based on prompt
      if (customPrompt.toLowerCase().includes('hero')) {
        generatedContent.headline = "Unlock Ancient Wisdom for Modern Life";
        generatedContent.subheadline = "Join thousands of students learning Sanskrit, Yoga, and Indian Philosophy";
      } else if (customPrompt.toLowerCase().includes('testimonial')) {
        generatedContent.quote = "This course changed my perspective on life completely.";
        generatedContent.author = "Student";
      }
      
      onApplySuggestion({
        id: 'ai-generated',
        type: 'improvement',
        title: 'AI-Generated Content',
        description: 'Content generated based on your prompt',
        priority: 'medium',
        action: 'AI content applied',
        impact: 'Enhanced content quality'
      }, generatedContent);
      
      setCustomPrompt('');
      setIsAnalyzing(false);
    }, 3000);
  }, [customPrompt, content, onApplySuggestion]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seo': return <TrendingUp className="w-4 h-4" />;
      case 'engagement': return <Users className="w-4 h-4" />;
      case 'improvement': return <Lightbulb className="w-4 h-4" />;
      case 'optimization': return <Zap className="w-4 h-4" />;
      case 'accessibility': return <HelpCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Wand2 className="w-5 h-5 text-purple-500" />
            <span>Smart Content Assistant</span>
          </h3>
          <p className="text-sm text-gray-600">AI-powered suggestions to improve your content</p>
        </div>
        <Button
          onClick={analyzeContent}
          disabled={isAnalyzing}
          className="bg-purple-500 hover:bg-purple-600"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Analyze Content
            </>
          )}
        </Button>
      </div>

      {/* AI Content Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <span>AI Content Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Describe what you want to create:</label>
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'Create a compelling hero section for a Sanskrit course' or 'Write a testimonial for our yoga program'"
              className="min-h-[80px]"
            />
          </div>
          <Button
            onClick={generateWithAI}
            disabled={!customPrompt.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Content Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span>Content Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(CONTENT_TEMPLATES).map(([key, template]) => (
              <Card
                key={key}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === key ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedTemplate(selectedTemplate === key ? null : key)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{template.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      applyTemplate(key);
                    }}
                    className="w-full"
                  >
                    Apply Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span>AI Suggestions</span>
              <Badge variant="secondary">{suggestions.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(suggestion.type)}
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  
                  <div className="bg-blue-50 p-3 rounded mb-3">
                    <p className="text-sm font-medium text-blue-900 mb-1">Action:</p>
                    <p className="text-sm text-blue-800">{suggestion.action}</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded mb-3">
                    <p className="text-sm font-medium text-green-900 mb-1">Impact:</p>
                    <p className="text-sm text-green-800">{suggestion.impact}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => applySuggestion(suggestion)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Apply Suggestion
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSuggestions(prev => prev.filter(s => s.id !== suggestion.id))}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Quick Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Use Clear Headlines</h4>
                <p className="text-sm text-gray-600">Make your headlines descriptive and benefit-focused</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Include Social Proof</h4>
                <p className="text-sm text-gray-600">Add testimonials and success stories to build trust</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Optimize for Mobile</h4>
                <p className="text-sm text-gray-600">Ensure your content looks great on all devices</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Add Clear CTAs</h4>
                <p className="text-sm text-gray-600">Guide users with clear call-to-action buttons</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
