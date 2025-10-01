'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Copy, 
  Star, 
  Search, 
  Filter,
  Download,
  Upload,
  Heart,
  Eye,
  Clock,
  Tag,
  Plus,
  Check
} from 'lucide-react';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  content: any;
  preview: string;
  popularity: number;
  rating: number;
  author: string;
  createdAt: string;
  isPremium: boolean;
}

interface ContentTemplatesLibraryProps {
  content: any;
  onApplyTemplate: (template: ContentTemplate) => void;
  sectionName: string;
}

const CONTENT_TEMPLATES: ContentTemplate[] = [
  {
    id: 'hero-classic',
    name: 'Classic Hero Section',
    description: 'Traditional hero with headline, subheadline, and CTA button',
    category: 'Hero',
    tags: ['hero', 'landing', 'conversion'],
    content: {
      headline: 'Transform Your Life with Ancient Wisdom',
      subheadline: 'Discover the timeless teachings of Sanskrit, Yoga, and Indian Philosophy',
      cta: 'Start Your Journey',
      ctaLink: '/courses',
      backgroundImage: '/images/hero-bg.jpg'
    },
    preview: 'Hero with centered text and call-to-action',
    popularity: 95,
    rating: 4.8,
    author: 'Shikshanam Team',
    createdAt: '2024-01-15',
    isPremium: false
  },
  {
    id: 'testimonial-grid',
    name: 'Testimonial Grid',
    description: '3-column testimonial layout with photos and quotes',
    category: 'Social Proof',
    tags: ['testimonials', 'social-proof', 'trust'],
    content: {
      title: 'What Our Students Say',
      testimonials: [
        {
          quote: 'This course completely transformed my understanding of ancient wisdom.',
          author: 'Sarah Johnson',
          role: 'Student',
          image: '/images/testimonial-1.jpg',
          rating: 5
        },
        {
          quote: 'The best investment I made for my personal growth.',
          author: 'Michael Chen',
          role: 'Student',
          image: '/images/testimonial-2.jpg',
          rating: 5
        },
        {
          quote: 'Life-changing experience with practical applications.',
          author: 'Priya Sharma',
          role: 'Student',
          image: '/images/testimonial-3.jpg',
          rating: 5
        }
      ]
    },
    preview: '3-column testimonial grid with photos',
    popularity: 88,
    rating: 4.7,
    author: 'Shikshanam Team',
    createdAt: '2024-01-14',
    isPremium: false
  },
  {
    id: 'course-card',
    name: 'Course Card Layout',
    description: 'Professional course card with image, title, description, and pricing',
    category: 'Courses',
    tags: ['courses', 'education', 'pricing'],
    content: {
      title: 'Sanskrit Fundamentals',
      description: 'Master the ancient language of the Vedas with our comprehensive course',
      image: '/images/sanskrit-course.jpg',
      duration: '8 weeks',
      level: 'Beginner',
      price: '₹1,999',
      instructor: 'Dr. Vishal Chaurasia',
      features: ['Interactive lessons', 'Expert guidance', 'Lifetime access']
    },
    preview: 'Course card with image and pricing',
    popularity: 92,
    rating: 4.9,
    author: 'Shikshanam Team',
    createdAt: '2024-01-13',
    isPremium: false
  },
  {
    id: 'feature-grid',
    name: 'Feature Grid',
    description: '4-column feature grid with icons and descriptions',
    category: 'Features',
    tags: ['features', 'benefits', 'icons'],
    content: {
      title: 'Why Choose Shikshanam',
      features: [
        {
          icon: 'book',
          title: 'Expert Instructors',
          description: 'Learn from renowned scholars and practitioners'
        },
        {
          icon: 'users',
          title: 'Community Learning',
          description: 'Join a vibrant community of like-minded learners'
        },
        {
          icon: 'clock',
          title: 'Flexible Schedule',
          description: 'Learn at your own pace with flexible timing'
        },
        {
          icon: 'certificate',
          title: 'Certification',
          description: 'Get certified upon course completion'
        }
      ]
    },
    preview: '4-column feature grid with icons',
    popularity: 85,
    rating: 4.6,
    author: 'Shikshanam Team',
    createdAt: '2024-01-12',
    isPremium: false
  },
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    description: '3-tier pricing table with features and CTAs',
    category: 'Pricing',
    tags: ['pricing', 'plans', 'comparison'],
    content: {
      title: 'Choose Your Learning Path',
      plans: [
        {
          name: 'Basic',
          price: '₹999',
          period: 'per month',
          features: ['Access to basic courses', 'Community forum', 'Email support'],
          cta: 'Get Started',
          popular: false
        },
        {
          name: 'Premium',
          price: '₹1,999',
          period: 'per month',
          features: ['All courses', 'Live sessions', 'Personal mentor', 'Certificates'],
          cta: 'Most Popular',
          popular: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: 'contact us',
          features: ['Custom curriculum', 'Dedicated support', 'Team training', 'Analytics'],
          cta: 'Contact Sales',
          popular: false
        }
      ]
    },
    preview: '3-tier pricing table',
    popularity: 90,
    rating: 4.8,
    author: 'Shikshanam Team',
    createdAt: '2024-01-11',
    isPremium: true
  },
  {
    id: 'faq-accordion',
    name: 'FAQ Accordion',
    description: 'Expandable FAQ section with common questions',
    category: 'FAQ',
    tags: ['faq', 'questions', 'accordion'],
    content: {
      title: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'What is the course duration?',
          answer: 'Our courses range from 4-12 weeks depending on the complexity and depth of the subject.'
        },
        {
          question: 'Do I need prior knowledge?',
          answer: 'No prior knowledge is required. We start from the basics and build up gradually.'
        },
        {
          question: 'Are certificates provided?',
          answer: 'Yes, we provide certificates upon successful completion of each course.'
        },
        {
          question: 'Can I access courses offline?',
          answer: 'Yes, you can download course materials for offline access.'
        }
      ]
    },
    preview: 'Expandable FAQ accordion',
    popularity: 82,
    rating: 4.5,
    author: 'Shikshanam Team',
    createdAt: '2024-01-10',
    isPremium: false
  }
];

const CATEGORIES = ['All', 'Hero', 'Social Proof', 'Courses', 'Features', 'Pricing', 'FAQ'];

export default function ContentTemplatesLibrary({ content, onApplyTemplate, sectionName }: ContentTemplatesLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState<string | null>(null);

  const filteredTemplates = CONTENT_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFavorite = useCallback((templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  }, []);

  const applyTemplate = useCallback((template: ContentTemplate) => {
    onApplyTemplate(template);
  }, [onApplyTemplate]);

  const renderTemplatePreview = (template: ContentTemplate) => {
    if (showPreview !== template.id) return null;

    return (
      <Card className="mt-4 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base">Template Preview: {template.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Preview:</div>
            <div className="bg-white p-4 rounded border">
              {template.preview}
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => applyTemplate(template)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="w-4 h-4 mr-1" />
              Apply Template
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPreview(null)}
            >
              Close Preview
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>Content Templates Library</span>
          </h3>
          <p className="text-sm text-gray-600">Professional templates for {sectionName} section</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-1" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              showPreview === template.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setShowPreview(showPreview === template.id ? null : template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base flex items-center space-x-2">
                    <span>{template.name}</span>
                    {template.isPremium && (
                      <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                        Premium
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(template.id);
                  }}
                  className="p-1"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.includes(template.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`} 
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Template Preview */}
              <div className="bg-gray-50 p-3 rounded mb-3">
                <div className="text-xs text-gray-500 mb-1">Preview:</div>
                <div className="text-sm text-gray-700">{template.preview}</div>
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{template.popularity}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>by {template.author}</span>
                  <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {template.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    applyTemplate(template);
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Use Template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(showPreview === template.id ? null : template.id);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Template Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Template Library Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{CONTENT_TEMPLATES.length}</div>
              <div className="text-sm text-gray-600">Total Templates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {CONTENT_TEMPLATES.filter(t => !t.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Free Templates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {CONTENT_TEMPLATES.filter(t => t.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Premium Templates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{favorites.length}</div>
              <div className="text-sm text-gray-600">Your Favorites</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
