'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  BookOpen,
  Package,
  FileText,
  Users,
  User,
  Globe,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  MoreHorizontal,
  Target,
  Lightbulb,
  Zap,
  Shield,
  Sparkles,
  Heart,
  DollarSign,
  MessageSquare,
  Video,
  Image,
  Code,
  Palette,
  Layout,
  Type,
  GraduationCap,
  School,
  ChevronRight,
  FolderOpen,
  Layers,
  BookMarked
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ContentType {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  category: 'main' | 'education' | 'content';
  features: string[];
  sections: string[];
  isLoaded: boolean;
  lastModified: Date;
  views: number;
  popularity: number;
  count?: number;
}

interface CMSDashboardProps {
  onEditContent?: (contentId: string) => void;
  onPreviewContent?: (contentId: string) => void;
  onDuplicateContent?: (contentId: string) => void;
  onDeleteContent?: (contentId: string) => void;
}

export default function RevampedCMSDashboard({
  onEditContent,
  onPreviewContent,
  onDuplicateContent,
  onDeleteContent
}: CMSDashboardProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    totalContent: 0,
    totalViews: 0,
    totalCourses: 0,
    totalPackages: 0
  });
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Toggle expanded state for dropdowns
  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  // State for courses and packages data
  const [coursesData, setCoursesData] = useState<any[]>([]);
  const [packagesData, setPackagesData] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [packagesLoading, setPackagesLoading] = useState(false);

  // Content types with real data
  const contentTypes: ContentType[] = useMemo(() => [
    // Main Pages
    {
      id: 'homepage',
      name: 'Homepage',
      description: 'Main landing page with hero section, features, and call-to-action',
      status: 'active',
      category: 'main',
      features: ['hero', 'features', 'testimonials', 'cta'],
      sections: ['hero', 'features', 'testimonials', 'cta'],
      isLoaded: true,
      lastModified: new Date('2024-01-15'),
      views: 15420,
      popularity: 95
    },
    {
      id: 'about',
      name: 'About Us',
      description: 'Company information, mission, vision, and team details',
      status: 'active',
      category: 'main',
      features: ['mission', 'vision', 'team', 'values'],
      sections: ['mission', 'vision', 'team', 'values'],
      isLoaded: true,
      lastModified: new Date('2024-01-14'),
      views: 3200,
      popularity: 78
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Contact information, forms, and location details',
      status: 'active',
      category: 'main',
      features: ['contact-form', 'location', 'hours', 'social'],
      sections: ['contact-form', 'location', 'hours', 'social'],
      isLoaded: true,
      lastModified: new Date('2024-01-13'),
      views: 1800,
      popularity: 65
    },
    {
      id: 'donation',
      name: 'Donation',
      description: 'Donation page with payment integration and impact stories',
      status: 'active',
      category: 'main',
      features: ['payment', 'impact', 'stories', 'progress'],
      sections: ['payment', 'impact', 'stories', 'progress'],
      isLoaded: true,
      lastModified: new Date('2024-01-12'),
      views: 2100,
      popularity: 70
    },
    {
      id: 'career',
      name: 'Career',
      description: 'Job listings, company culture, and application process',
      status: 'active',
      category: 'main',
      features: ['jobs', 'culture', 'benefits', 'application'],
      sections: ['jobs', 'culture', 'benefits', 'application'],
      isLoaded: true,
      lastModified: new Date('2024-01-11'),
      views: 950,
      popularity: 45
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      description: 'Accessibility statement and compliance information',
      status: 'active',
      category: 'main',
      features: ['statement', 'compliance', 'features', 'support'],
      sections: ['statement', 'compliance', 'features', 'support'],
      isLoaded: true,
      lastModified: new Date('2024-01-10'),
      views: 420,
      popularity: 25
    },
    {
      id: 'privacy',
      name: 'Privacy Policy',
      description: 'Privacy policy and data protection information',
      status: 'active',
      category: 'main',
      features: ['policy', 'data-protection', 'cookies', 'rights'],
      sections: ['policy', 'data-protection', 'cookies', 'rights'],
      isLoaded: true,
      lastModified: new Date('2024-01-09'),
      views: 680,
      popularity: 30
    },
    {
      id: 'terms',
      name: 'Terms of Service',
      description: 'Terms and conditions for using the platform',
      status: 'active',
      category: 'main',
      features: ['terms', 'conditions', 'liability', 'governance'],
      sections: ['terms', 'conditions', 'liability', 'governance'],
      isLoaded: true,
      lastModified: new Date('2024-01-08'),
      views: 520,
      popularity: 28
    },
    {
      id: 'help',
      name: 'Help Center',
      description: 'FAQ, tutorials, and support documentation',
      status: 'active',
      category: 'main',
      features: ['faq', 'tutorials', 'support', 'documentation'],
      sections: ['faq', 'tutorials', 'support', 'documentation'],
      isLoaded: true,
      lastModified: new Date('2024-01-07'),
      views: 1200,
      popularity: 55
    },
    {
      id: 'wisdom',
      name: 'Wisdom',
      description: 'Wisdom articles and spiritual teachings',
      status: 'active',
      category: 'content',
      features: ['articles', 'teachings', 'insights', 'meditation'],
      sections: ['articles', 'teachings', 'insights', 'meditation'],
      isLoaded: true,
      lastModified: new Date('2024-01-06'),
      views: 2800,
      popularity: 72
    },
    {
      id: 'gurus',
      name: 'Gurus',
      description: 'Spiritual teachers and their teachings',
      status: 'active',
      category: 'content',
      features: ['profiles', 'teachings', 'biographies', 'quotes'],
      sections: ['profiles', 'teachings', 'biographies', 'quotes'],
      isLoaded: true,
      lastModified: new Date('2024-01-05'),
      views: 1900,
      popularity: 68
    },
    {
      id: 'tools',
      name: 'Tools',
      description: 'Spiritual tools and calculators',
      status: 'active',
      category: 'content',
      features: ['calculators', 'assessments', 'tools', 'resources'],
      sections: ['calculators', 'assessments', 'tools', 'resources'],
      isLoaded: true,
      lastModified: new Date('2024-01-04'),
      views: 1500,
      popularity: 60
    },
    {
      id: 'blog',
      name: 'Blog',
      description: 'Blog posts and articles',
      status: 'active',
      category: 'content',
      features: ['posts', 'categories', 'tags', 'comments'],
      sections: ['posts', 'categories', 'tags', 'comments'],
      isLoaded: true,
      lastModified: new Date('2024-01-03'),
      views: 4200,
      popularity: 82
    },
    {
      id: 'schools',
      name: 'Schools',
      description: 'Educational institutions and programs',
      status: 'active',
      category: 'education',
      features: ['institutions', 'programs', 'admissions', 'faculty'],
      sections: ['institutions', 'programs', 'admissions', 'faculty'],
      isLoaded: true,
      lastModified: new Date('2024-01-02'),
      views: 3200,
      popularity: 75
    },
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
      views: 12000,
      popularity: 90
    },
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
      views: 9500,
      popularity: 85
    }
  ], []);

  // Categories
  const categories = [
    { id: 'all', name: 'All Content', icon: Grid, count: contentTypes.length },
    { id: 'main', name: 'Main Pages', icon: Globe, count: contentTypes.filter(c => c.category === 'main').length },
    { id: 'education', name: 'Education', icon: GraduationCap, count: contentTypes.filter(c => c.category === 'education').length },
    { id: 'content', name: 'Content', icon: FileText, count: contentTypes.filter(c => c.category === 'content').length }
  ];

  // Filter content based on search and category
  const filteredContent = contentTypes.filter(content => {
    const matchesSearch = content.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Fetch courses data
  const fetchCourses = async () => {
    setCoursesLoading(true);
    try {
      const response = await fetch(`/api/cms/courses?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const result = await response.json();
      if (result.success && result.data) {
        console.log('Fetched courses:', result.data.length);
        // Remove duplicates based on ID
        const uniqueCourses = result.data.filter((course: any, index: number, self: any[]) => 
          index === self.findIndex((c: any) => c.id === course.id)
        );
        setCoursesData(uniqueCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setCoursesLoading(false);
    }
  };

  // Fetch packages data
  const fetchPackages = async () => {
    setPackagesLoading(true);
    try {
      const response = await fetch(`/api/cms/packages?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const result = await response.json();
      if (result.success && result.data) {
        console.log('Fetched packages:', result.data.length);
        // Remove duplicates based on ID
        const uniquePackages = result.data.filter((pkg: any, index: number, self: any[]) => 
          index === self.findIndex((p: any) => p.id === pkg.id)
        );
        setPackagesData(uniquePackages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setPackagesLoading(false);
    }
  };

  // Load real-time analytics data
  const loadAnalyticsData = async () => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch('/api/cms/analytics', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
        
        // Update stats with real analytics data
        setStats({
          totalContent: data.contentTypes.length,
          totalViews: data.performance.totalViews,
          totalCourses: data.contentTypes.filter((ct: any) => ct.type === 'course').length,
          totalPackages: data.contentTypes.filter((ct: any) => ct.type === 'package').length
        });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Calculate stats (fallback)
  useEffect(() => {
    if (!analyticsData) {
      setStats({
        totalContent: contentTypes.length,
        totalViews: contentTypes.reduce((sum, content) => sum + content.views, 0),
        totalCourses: coursesData.length,
        totalPackages: packagesData.length
      });
    }
  }, [coursesData, packagesData, contentTypes, analyticsData]);

  // Fetch data on component mount
  useEffect(() => {
    fetchCourses();
    fetchPackages();
    loadAnalyticsData(); // Load real-time analytics
  }, []);

  // Auto-refresh analytics every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadAnalyticsData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleContentAction = (contentId: string, action: string) => {
    switch (action) {
      case 'edit':
        if (onEditContent) {
          onEditContent(contentId);
        } else {
          router.push(`/cms/${contentId}`);
        }
        break;
      case 'preview':
        if (onPreviewContent) {
          onPreviewContent(contentId);
        } else {
          window.open(`/${contentId}`, '_blank');
        }
        break;
      case 'duplicate':
        if (onDuplicateContent) {
          onDuplicateContent(contentId);
        }
        break;
      case 'delete':
        if (onDeleteContent) {
          onDeleteContent(contentId);
        }
        break;
    }
  };

  const getContentIcon = (contentId: string) => {
    const iconMap: Record<string, any> = {
      homepage: Globe,
      about: Users,
      contact: MessageSquare,
      donation: Heart,
      career: Target,
      accessibility: Shield,
      privacy: Shield,
      terms: FileText,
      help: Lightbulb,
      wisdom: Sparkles,
      gurus: Users,
      tools: Zap,
      blog: FileText,
      schools: GraduationCap,
      courses: BookOpen,
      packages: Package
    };
    return iconMap[contentId] || FileText;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Better Design */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Content Hub
                  </h1>
                </div>
                <p className="text-blue-100 text-xl mb-6 max-w-2xl">
                  Your comprehensive dashboard for managing all website content, courses, and packages with powerful analytics and intuitive controls.
                </p>
                
                {/* Real-Time Status Indicators */}
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <div className={`w-3 h-3 rounded-full ${analyticsLoading ? 'bg-yellow-400' : 'bg-green-400 animate-pulse'}`}></div>
                    <span className="text-sm font-medium">
                      {analyticsLoading ? 'Loading Analytics...' : 'Real-time Analytics Active'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Auto-refresh: 30s</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">
                      {analyticsData ? `${analyticsData.contentTypes.length} content items` : 'Loading data...'}
                    </span>
                  </div>
                  {analyticsData && (
                    <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm">
                        {analyticsData.performance.totalViews.toLocaleString()} total views
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105" 
                  onClick={loadAnalyticsData}
                  disabled={analyticsLoading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${analyticsLoading ? 'animate-spin' : ''}`} />
                  {analyticsLoading ? 'Loading Analytics...' : 'Refresh Analytics'}
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  onClick={() => router.push('/cms/analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Full Analytics
                </Button>
                <Button className="bg-white text-purple-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview with Better Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Content</p>
                  <p className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {stats.totalContent}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <p className="text-xs text-green-600 font-medium">+12% from last month</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Views</p>
                  <p className="text-4xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {stats.totalViews.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <p className="text-xs text-green-600 font-medium">+8% from last month</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-violet-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Courses</p>
                  <div className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {coursesLoading ? (
                      <div className="animate-pulse bg-gray-300 h-10 w-16 rounded"></div>
                    ) : (
                      stats.totalCourses
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3 w-3 text-purple-500" />
                    <p className="text-xs text-purple-600 font-medium">Active courses</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Packages</p>
                  <div className="text-4xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                    {packagesLoading ? (
                      <div className="animate-pulse bg-gray-300 h-10 w-16 rounded"></div>
                    ) : (
                      stats.totalPackages
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-3 w-3 text-orange-500" />
                    <p className="text-xs text-orange-600 font-medium">Course bundles</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search pages, courses, packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* View Mode & Actions */}
            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-md"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-md"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-2 rounded-xl h-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <TabsTrigger 
                  key={`category-${category.id}-${index}`} 
                  value={category.id} 
                  className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{category.name}</span>
                  <Badge 
                    variant="secondary" 
                    className="ml-auto bg-gray-200 group-data-[state=active]:bg-blue-100 group-data-[state=active]:text-blue-700"
                  >
                    {category.count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Content Grid */}
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredContent.map((content, index) => {
            const Icon = getContentIcon(content.id);
            const isExpanded = expandedItems.has(content.id);
            
            return (
              <Card key={`content-${content.id}-${index}`} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-300 hover:-translate-y-1 overflow-hidden">
                <CardHeader className="pb-3 bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                          {content.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1">
                          {content.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(content.status)} px-3 py-1 font-medium`}>
                        {content.status}
                      </Badge>
                      {(content.id === 'courses' || content.id === 'packages') && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleExpanded(content.id)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-blue-600" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {content.views.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {content.popularity}%
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {content.lastModified.toISOString().split('T')[0]}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {content.features.slice(0, 3).map((feature, index) => (
                        <Badge key={`feature-${content.id}-${index}`} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {content.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{content.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Enhanced Dropdown Content for Courses and Packages */}
                    {isExpanded && content.id === 'courses' && (
                      <div className="mt-4 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <BookOpen className="h-5 w-5 text-purple-600" />
                            </div>
                            Individual Courses ({coursesData.length})
                          </h4>
                          {coursesLoading && (
                            <div className="flex items-center gap-2 text-sm text-purple-600">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Loading...
                            </div>
                          )}
                        </div>
                        
                        {coursesLoading ? (
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="animate-pulse bg-white rounded-lg p-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            ))}
                          </div>
                        ) : coursesData.length > 0 ? (
                          <div className="space-y-3">
                            {coursesData.map((course, index) => (
                              <div 
                                key={`course-${course.id}-${index}`} 
                                className="group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-purple-400 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                                    {course.title || course.name}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1 line-clamp-1">
                                    {course.subtitle || course.description}
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 flex-wrap">
                                    <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                      <User className="h-3 w-3" />
                                      {course.instructor || 'Vishal Chaurasia'}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                      <Clock className="h-3 w-3" />
                                      {course.duration || '2-3 hours'}
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-md">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {course.rating || 5}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                  <div className="text-right">
                                    <div className="font-bold text-green-700 text-sm">{course.price || 'Free'}</div>
                                    {course.originalPrice && (
                                      <div className="text-xs text-gray-500 line-through">{course.originalPrice}</div>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => router.push(`/cms/course/${course.id}`)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    <Code className="h-3.5 w-3.5 mr-1.5" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No courses found</p>
                          </div>
                        )}
                      </div>
                    )}

                    {isExpanded && content.id === 'packages' && (
                      <div className="mt-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                              <Package className="h-5 w-5 text-orange-600" />
                            </div>
                            Course Packages ({packagesData.length})
                          </h4>
                          {packagesLoading && (
                            <div className="flex items-center gap-2 text-sm text-orange-600">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              Loading...
                            </div>
                          )}
                        </div>
                        
                        {packagesLoading ? (
                          <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="animate-pulse bg-white rounded-lg p-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            ))}
                          </div>
                        ) : packagesData.length > 0 ? (
                          <div className="space-y-3">
                            {packagesData.map((pkg, index) => (
                              <div 
                                key={`package-${pkg.id}-${index}`} 
                                className="group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-orange-400 transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors truncate">
                                    {pkg.title || pkg.name}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1 line-clamp-1">
                                    {pkg.description}
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 flex-wrap">
                                    <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                      <BookOpen className="h-3 w-3" />
                                      {pkg.courses || 0} courses
                                    </span>
                                    <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                      <Clock className="h-3 w-3" />
                                      {pkg.duration || '12 weeks'}
                                    </span>
                                    {pkg.students && (
                                      <span className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md">
                                        <Users className="h-3 w-3" />
                                        {pkg.students} students
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 ml-4">
                                  <div className="text-right">
                                    <div className="font-bold text-green-700 text-sm">{pkg.price || '₹4,999'}</div>
                                    {pkg.originalPrice && (
                                      <div className="text-xs text-gray-500 line-through">{pkg.originalPrice}</div>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => router.push(`/cms/package/${pkg.id}`)}
                                    className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    <Code className="h-3.5 w-3.5 mr-1.5" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No packages found</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Actions */}
                    <div className="flex items-center gap-2 pt-4 mt-3 border-t border-gray-100">
                      <Button
                        size="sm"
                        onClick={() => handleContentAction(content.id, 'edit')}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Edit JSON
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleContentAction(content.id, 'preview')}
                        className="border-gray-300 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 px-3"
                        title="Preview Page"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <FileText className="h-full w-full" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

