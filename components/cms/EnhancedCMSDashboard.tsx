'use client';

import React, { useState, useEffect } from 'react';
import { formatDateLong } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink,
  RefreshCw,
  Zap,
  Palette,
  Code,
  Image,
  Video,
  Link,
  Type,
  Layout,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronDown,
  MoreHorizontal,
  BookOpen,
  GraduationCap,
  Heart,
  DollarSign,
  MessageSquare,
  FileText,
  Package,
  Target,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ContentPreview from './ContentPreview';
import GlobalContentSearch from './GlobalContentSearch';
import ContentStatistics from './ContentStatistics';

interface ContentTypeStatus {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'coming-soon' | 'deprecated';
  category: string;
  features: string[];
  sections: string[];
  isLoaded: boolean;
  lastModified?: Date;
  views?: number;
  popularity?: number;
}

interface EnhancedCMSDashboardProps {
  onEditContent?: (contentId: string) => void;
  onPreviewContent?: (contentId: string) => void;
  onDuplicateContent?: (contentId: string) => void;
  onDeleteContent?: (contentId: string) => void;
}

export default function EnhancedCMSDashboard({ 
  onEditContent, 
  onPreviewContent, 
  onDuplicateContent, 
  onDeleteContent 
}: EnhancedCMSDashboardProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'popularity'>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'statistics'>('dashboard');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const contentTypes: ContentTypeStatus[] = [
    // Main Pages
    {
      id: 'homepage',
      name: 'Homepage',
      description: 'Main homepage content and sections',
      status: 'active',
      category: 'main',
      features: ['hero', 'courses', 'schools', 'gurus', 'testimonials', 'community', 'mission'],
      sections: ['hero', 'alignYourself', 'schools', 'meetGurus', 'studentStories', 'testimonials', 'communityPosts', 'foundersMission', 'contribute', 'downloadApp', 'faq'],
      isLoaded: true,
      lastModified: new Date('2024-01-15'),
      views: 1250,
      popularity: 95
    },
    {
      id: 'about',
      name: 'About Page',
      description: 'About page content and company information',
      status: 'active',
      category: 'main',
      features: ['hero', 'mission', 'values', 'offerings', 'cta'],
      sections: ['hero', 'mission', 'values', 'offerings', 'cta'],
      isLoaded: true,
      lastModified: new Date('2024-01-10'),
      views: 890,
      popularity: 78
    },
    {
      id: 'contact',
      name: 'Contact Page',
      description: 'Contact page and form settings',
      status: 'active',
      category: 'main',
      features: ['hero', 'form', 'contact-info', 'quick-help'],
      sections: ['hero', 'form', 'contactInfo', 'quickHelp'],
      isLoaded: true,
      lastModified: new Date('2024-01-12'),
      views: 650,
      popularity: 65
    },
    {
      id: 'donation',
      name: 'Donation Page',
      description: 'Donation page content and fundraising sections',
      status: 'active',
      category: 'main',
      features: ['hero', 'impact', 'causes', 'donation-options', 'testimonials', 'faq'],
      sections: ['hero', 'impact', 'causes', 'donationOptions', 'testimonials', 'faq', 'cta'],
      isLoaded: true,
      lastModified: new Date('2024-01-08'),
      views: 420,
      popularity: 45
    },
    {
      id: 'schools',
      name: 'Schools Overview',
      description: 'Schools overview page',
      status: 'active',
      category: 'main',
      features: ['hero', 'list'],
      sections: ['hero', 'list'],
      isLoaded: true,
      lastModified: new Date('2024-01-14'),
      views: 780,
      popularity: 72
    },
    // Education
    {
      id: 'sanskrit-school',
      name: 'Sanskrit School',
      description: 'Sanskrit school page',
      status: 'active',
      category: 'education',
      features: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      isLoaded: true,
      lastModified: new Date('2024-01-13'),
      views: 950,
      popularity: 88
    },
    {
      id: 'darshana-school',
      name: 'Darshana School',
      description: 'Darshana school page',
      status: 'active',
      category: 'education',
      features: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      sections: ['hero', 'meetGurus', 'learningPath', 'mission', 'community', 'app'],
      isLoaded: true,
      lastModified: new Date('2024-01-11'),
      views: 720,
      popularity: 68
    },
    {
      id: 'self-help-school',
      name: 'Self-Help School',
      description: 'Self-help school page',
      status: 'active',
      category: 'education',
      features: ['hero', 'benefits', 'courses', 'testimonials', 'cta'],
      sections: ['hero', 'benefits', 'courses', 'testimonials', 'cta'],
      isLoaded: true,
      lastModified: new Date('2024-01-09'),
      views: 580,
      popularity: 55
    },
    // Content Management
    {
      id: 'blog',
      name: 'Blog Posts',
      description: 'Blog content management',
      status: 'active',
      category: 'content',
      features: ['posts', 'categories', 'tags', 'authors'],
      sections: ['posts', 'categories', 'tags', 'authors'],
      isLoaded: true,
      lastModified: new Date('2024-01-04'),
      views: 450,
      popularity: 55
    },
    {
      id: 'gurus',
      name: 'Gurus',
      description: 'Guru profiles and information',
      status: 'active',
      category: 'content',
      features: ['profiles', 'biographies', 'teachings', 'photos'],
      sections: ['profiles', 'biographies', 'teachings', 'photos'],
      isLoaded: true,
      lastModified: new Date('2024-01-03'),
      views: 380,
      popularity: 50
    },
    {
      id: 'wisdom',
      name: 'Wisdom',
      description: 'Wisdom content and articles',
      status: 'active',
      category: 'content',
      features: ['articles', 'quotes', 'teachings', 'insights'],
      sections: ['articles', 'quotes', 'teachings', 'insights'],
      isLoaded: true,
      lastModified: new Date('2023-12-31'),
      views: 250,
      popularity: 35
    },
    // Courses
    {
      id: 'courses',
      name: 'Courses',
      description: 'Individual courses and learning programs',
      status: 'active',
      category: 'education',
      features: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      sections: ['hero', 'syllabus', 'outcomes', 'testimonials', 'pricing', 'faq'],
      isLoaded: true,
      lastModified: new Date('2024-01-15'),
      views: 1200,
      popularity: 90
    },
    // Packages
    {
      id: 'packages',
      name: 'Packages',
      description: 'Course packages and bundles',
      status: 'active',
      category: 'education',
      features: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      sections: ['hero', 'courses', 'pricing', 'benefits', 'testimonials', 'faq'],
      isLoaded: true,
      lastModified: new Date('2024-01-15'),
      views: 950,
      popularity: 85
    },
  ];

  const categories = [
    { id: 'all', name: 'All Content', icon: Grid, count: contentTypes.length },
    { id: 'main', name: 'Main Pages', icon: Globe, count: contentTypes.filter(c => c.category === 'main').length },
    { id: 'education', name: 'Education', icon: GraduationCap, count: contentTypes.filter(c => c.category === 'education').length },
    { id: 'content', name: 'Content', icon: FileText, count: contentTypes.filter(c => c.category === 'content').length }
  ];

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData?.icon || Grid;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'deprecated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 80) return 'text-green-600';
    if (popularity >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredContent = contentTypes.filter(content => {
    const matchesSearch = content.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || content.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'modified':
        return (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0);
      case 'popularity':
        return (b.popularity || 0) - (a.popularity || 0);
      default:
        return 0;
    }
  });

  const handleEdit = (contentId: string) => {
    if (onEditContent) {
      onEditContent(contentId);
    } else {
      router.push(`/cms/edit/${contentId}`);
    }
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const newList = [contentId, ...prev.filter(id => id !== contentId)].slice(0, 5);
      localStorage.setItem('cms-recently-viewed', JSON.stringify(newList));
      return newList;
    });
  };

  const handlePreview = (contentId: string) => {
    if (onPreviewContent) {
      onPreviewContent(contentId);
    } else {
      window.open(`/${contentId}`, '_blank');
    }
  };

  const handleDuplicate = (contentId: string) => {
    if (onDuplicateContent) {
      onDuplicateContent(contentId);
    } else {
      // Implement duplication logic
      console.log('Duplicating content:', contentId);
    }
  };

  const handleDelete = (contentId: string) => {
    if (onDeleteContent) {
      onDeleteContent(contentId);
    } else {
      if (confirm('Are you sure you want to delete this content?')) {
        console.log('Deleting content:', contentId);
      }
    }
  };

  useEffect(() => {
    // Load recently viewed from localStorage
    const saved = localStorage.getItem('cms-recently-viewed');
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recently viewed:', error);
      }
    }
  }, []);

  const recentlyViewedContent = contentTypes.filter(content => 
    recentlyViewed.includes(content.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Enhanced CMS Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your website content with powerful tools and intuitive design
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => router.push('/cms/test')}
                className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80"
              >
                <Settings className="w-4 h-4 mr-2" />
                Test Suite
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Content
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-1">
            <Button
              variant={activeTab === 'dashboard' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-2 px-4 py-2"
            >
              <Grid className="w-4 h-4" />
              <span>Dashboard</span>
            </Button>
            <Button
              variant={activeTab === 'search' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('search')}
              className="flex items-center space-x-2 px-4 py-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
            <Button
              variant={activeTab === 'statistics' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('statistics')}
              className="flex items-center space-x-2 px-4 py-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Statistics</span>
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'search' && (
          <GlobalContentSearch
            onResultClick={(result) => {
              setSelectedContent(result.id);
              setActiveTab('dashboard');
            }}
            onEditClick={(result) => handleEdit(result.id)}
            onPreviewClick={(result) => handlePreview(result.id)}
          />
        )}

        {activeTab === 'statistics' && (
          <ContentStatistics />
        )}

        {activeTab === 'dashboard' && (
          <>
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/80 backdrop-blur-sm border-gray-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="modified">Sort by Modified</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="coming-soon">Coming Soon</option>
                    <option value="deprecated">Deprecated</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        {recentlyViewedContent.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Recently Viewed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyViewedContent.slice(0, 3).map(content => (
                <Card key={content.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {React.createElement(getCategoryIcon(content.category), { className: "w-4 h-4 text-gray-600" })}
                        <span className="text-sm font-medium text-gray-600">{content.category}</span>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(content.status)}`}>
                        {content.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{content.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{content.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(content.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePreview(content.id)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 p-1 rounded-xl">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-2 px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg"
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Content Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {sortedContent.map(content => (
            <Card key={content.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                      {React.createElement(getCategoryIcon(content.category), { 
                        className: "w-5 h-5 text-blue-600" 
                      })}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {content.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`text-xs ${getStatusColor(content.status)}`}>
                          {content.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {content.sections.length} sections
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDuplicate(content.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(content.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4">
                  {content.description}
                </CardDescription>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{content.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className={getPopularityColor(content.popularity || 0)}>
                        {content.popularity || 0}%
                      </span>
                    </div>
                  </div>
                  {content.lastModified && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDateLong(content.lastModified)}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {content.features.slice(0, 3).map(feature => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {content.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{content.features.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleEdit(content.id)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handlePreview(content.id)}
                      className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(content.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedContent.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Content</p>
                  <p className="text-2xl font-bold text-blue-900">{contentTypes.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Content</p>
                  <p className="text-2xl font-bold text-green-900">
                    {contentTypes.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Total Views</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {contentTypes.reduce((sum, c) => sum + (c.views || 0), 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Avg. Popularity</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {Math.round(contentTypes.reduce((sum, c) => sum + (c.popularity || 0), 0) / contentTypes.length)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
