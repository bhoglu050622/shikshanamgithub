'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageCircle, 
  Search,
  X,
  Play,
  Download,
  ExternalLink,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

interface HelpItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'tutorial' | 'faq';
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  url?: string;
  content?: string;
}

interface HelpSystemProps {
  isVisible: boolean;
  onClose: () => void;
  currentPage: string;
}

const HELP_ITEMS: HelpItem[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with CMS',
    description: 'Complete beginner guide to using the CMS',
    type: 'tutorial',
    duration: '10 min',
    difficulty: 'beginner',
    tags: ['basics', 'getting-started', 'tutorial'],
    content: 'Learn the fundamentals of content management with our step-by-step guide.'
  },
  {
    id: 'visual-builder',
    title: 'Visual Content Builder Guide',
    description: 'How to use the drag-and-drop content builder',
    type: 'video',
    duration: '5 min',
    difficulty: 'beginner',
    tags: ['visual-builder', 'drag-drop', 'content-creation'],
    url: '/help/videos/visual-builder.mp4'
  },
  {
    id: 'templates',
    title: 'Using Professional Templates',
    description: 'Maximize your productivity with pre-built templates',
    type: 'article',
    duration: '3 min',
    difficulty: 'beginner',
    tags: ['templates', 'productivity', 'design'],
    content: 'Templates are pre-designed layouts that you can customize for your content.'
  },
  {
    id: 'design-system',
    title: 'Design System & Themes',
    description: 'Apply consistent styling across your content',
    type: 'tutorial',
    duration: '7 min',
    difficulty: 'intermediate',
    tags: ['design', 'themes', 'styling', 'branding'],
    content: 'Learn how to use our design system to maintain consistent branding.'
  },
  {
    id: 'mobile-preview',
    title: 'Mobile-First Design',
    description: 'Ensure your content looks great on all devices',
    type: 'video',
    duration: '4 min',
    difficulty: 'beginner',
    tags: ['mobile', 'responsive', 'preview'],
    url: '/help/videos/mobile-preview.mp4'
  },
  {
    id: 'ai-assistant',
    title: 'AI Content Assistant',
    description: 'Leverage AI for better content optimization',
    type: 'tutorial',
    duration: '8 min',
    difficulty: 'intermediate',
    tags: ['ai', 'optimization', 'seo', 'assistant'],
    content: 'Use our AI assistant to improve your content quality and SEO.'
  },
  {
    id: 'analytics',
    title: 'Understanding Analytics',
    description: 'Track and analyze your content performance',
    type: 'article',
    duration: '6 min',
    difficulty: 'intermediate',
    tags: ['analytics', 'performance', 'metrics'],
    content: 'Learn how to interpret analytics data to improve your content strategy.'
  },
  {
    id: 'troubleshooting',
    title: 'Common Issues & Solutions',
    description: 'Quick fixes for common problems',
    type: 'faq',
    duration: '5 min',
    difficulty: 'beginner',
    tags: ['troubleshooting', 'issues', 'solutions'],
    content: 'Find solutions to the most common CMS issues and questions.'
  }
];

const QUICK_TIPS = [
  {
    icon: Lightbulb,
    title: 'Pro Tip',
    content: 'Use the Visual Builder to create content faster. Drag blocks from the left panel to the canvas.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Target,
    title: 'Best Practice',
    content: 'Always preview your content on mobile devices. Most users browse on mobile!',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Zap,
    title: 'Quick Action',
    content: 'Press Ctrl+S (Cmd+S on Mac) to save your work quickly.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }
];

export default function HelpSystem({ isVisible, onClose, currentPage }: HelpSystemProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<HelpItem | null>(null);

  const categories = [
    { id: 'all', label: 'All', count: HELP_ITEMS.length },
    { id: 'tutorial', label: 'Tutorials', count: HELP_ITEMS.filter(item => item.type === 'tutorial').length },
    { id: 'video', label: 'Videos', count: HELP_ITEMS.filter(item => item.type === 'video').length },
    { id: 'article', label: 'Articles', count: HELP_ITEMS.filter(item => item.type === 'article').length },
    { id: 'faq', label: 'FAQ', count: HELP_ITEMS.filter(item => item.type === 'faq').length }
  ];

  const filteredItems = HELP_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'article': return BookOpen;
      case 'tutorial': return Target;
      case 'faq': return MessageCircle;
      default: return BookOpen;
    }
  };

  const handleItemClick = useCallback((item: HelpItem) => {
    setSelectedItem(item);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedItem(null);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white shadow-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Help & Documentation</CardTitle>
                <p className="text-sm text-gray-600">Find answers and learn how to use the CMS</p>
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

        <CardContent className="p-0">
          {!selectedItem ? (
            <div className="space-y-6 p-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-1"
                  >
                    <span>{category.label}</span>
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Quick Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {QUICK_TIPS.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className={`p-3 rounded-lg ${tip.bgColor}`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Icon className={`w-4 h-4 ${tip.color}`} />
                          <span className="text-sm font-medium">{tip.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{tip.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Help Items */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Help Articles</h3>
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No articles found</h4>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <Card
                          key={item.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleItemClick(item)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <TypeIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge className={getDifficultyColor(item.difficulty)}>
                                    {item.difficulty}
                                  </Badge>
                                  {item.duration && (
                                    <span className="text-xs text-gray-500">{item.duration}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToList}
                >
                  ← Back to List
                </Button>
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(selectedItem.difficulty)}>
                    {selectedItem.difficulty}
                  </Badge>
                  {selectedItem.duration && (
                    <span className="text-sm text-gray-500">{selectedItem.duration}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                <p className="text-gray-600">{selectedItem.description}</p>

                {selectedItem.content && (
                  <div className="prose max-w-none">
                    <p>{selectedItem.content}</p>
                  </div>
                )}

                {selectedItem.url && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Video Tutorial</h4>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(selectedItem.url, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Play Video
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = selectedItem.url!;
                          link.download = `${selectedItem.title}.mp4`;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Tags:</span>
                  {selectedItem.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
