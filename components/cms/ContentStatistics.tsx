'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Edit, 
  Clock, 
  Users, 
  FileText,
  Code,
  Image,
  Database,
  Globe,
  Star,
  Activity,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface ContentStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  archivedContent: number;
  totalViews: number;
  averageViews: number;
  mostPopular: ContentItem[];
  recentlyModified: ContentItem[];
  contentByType: TypeStats[];
  contentByCategory: CategoryStats[];
  monthlyTrends: TrendData[];
}

interface ContentItem {
  id: string;
  name: string;
  type: string;
  category: string;
  views: number;
  lastModified: Date;
  status: string;
}

interface TypeStats {
  type: string;
  count: number;
  percentage: number;
  views: number;
}

interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
  views: number;
}

interface TrendData {
  month: string;
  views: number;
  content: number;
  published: number;
}

export default function ContentStatistics() {
  const [stats, setStats] = useState<ContentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in real implementation, this would come from API
  const mockStats: ContentStats = useMemo(() => ({
    totalContent: 156,
    publishedContent: 142,
    draftContent: 12,
    archivedContent: 2,
    totalViews: 45678,
    averageViews: 293,
    mostPopular: [
      { id: 'homepage', name: 'Homepage', type: 'page', category: 'main', views: 1250, lastModified: new Date('2024-01-15'), status: 'published' },
      { id: 'about', name: 'About Page', type: 'page', category: 'main', views: 890, lastModified: new Date('2024-01-10'), status: 'published' },
      { id: 'sanskrit-course', name: 'Sanskrit Course', type: 'course', category: 'education', views: 1100, lastModified: new Date('2024-01-07'), status: 'published' },
      { id: 'hero-component', name: 'Hero Component', type: 'component', category: 'components', views: 950, lastModified: new Date('2024-01-12'), status: 'published' },
      { id: 'schools-data', name: 'Schools Data', type: 'data', category: 'data', views: 720, lastModified: new Date('2024-01-14'), status: 'published' }
    ],
    recentlyModified: [
      { id: 'homepage', name: 'Homepage', type: 'page', category: 'main', views: 1250, lastModified: new Date('2024-01-15'), status: 'published' },
      { id: 'self-help-school', name: 'Self-Help School', type: 'page', category: 'education', views: 580, lastModified: new Date('2024-01-14'), status: 'published' },
      { id: 'schools-data', name: 'Schools Data', type: 'data', category: 'data', views: 720, lastModified: new Date('2024-01-14'), status: 'published' },
      { id: 'hero-component', name: 'Hero Component', type: 'component', category: 'components', views: 950, lastModified: new Date('2024-01-12'), status: 'published' },
      { id: 'about', name: 'About Page', type: 'page', category: 'main', views: 890, lastModified: new Date('2024-01-10'), status: 'published' }
    ],
    contentByType: [
      { type: 'page', count: 45, percentage: 28.8, views: 15600 },
      { type: 'component', count: 38, percentage: 24.4, views: 8900 },
      { type: 'data', count: 32, percentage: 20.5, views: 12000 },
      { type: 'asset', count: 25, percentage: 16.0, views: 5600 },
      { type: 'course', count: 16, percentage: 10.3, views: 3578 }
    ],
    contentByCategory: [
      { category: 'main', count: 25, percentage: 16.0, views: 8500 },
      { category: 'education', count: 45, percentage: 28.8, views: 15600 },
      { category: 'components', count: 38, percentage: 24.4, views: 8900 },
      { category: 'data', count: 32, percentage: 20.5, views: 12000 },
      { category: 'assets', count: 16, percentage: 10.3, views: 3578 }
    ],
    monthlyTrends: [
      { month: 'Oct', views: 3200, content: 12, published: 10 },
      { month: 'Nov', views: 4100, content: 18, published: 15 },
      { month: 'Dec', views: 3800, content: 14, published: 12 },
      { month: 'Jan', views: 5200, content: 22, published: 18 }
    ]
  }), []);

  const loadStats = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }, [mockStats]);

  const refreshStats = async () => {
    setRefreshing(true);
    try {
      await loadStats();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [timeRange, loadStats]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return FileText;
      case 'component': return Code;
      case 'data': return Database;
      case 'asset': return Image;
      case 'course': return Globe;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content statistics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No statistics available</h3>
          <p className="text-gray-600">Unable to load content statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Statistics</h1>
          <p className="text-gray-600 mt-1">Analytics and insights for your content</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button
            onClick={refreshStats}
            disabled={refreshing}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Content</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalContent}</p>
                <p className="text-xs text-blue-700 mt-1">
                  {stats.publishedContent} published, {stats.draftContent} drafts
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Views</p>
                <p className="text-2xl font-bold text-green-900">{stats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-green-700 mt-1">
                  {stats.averageViews} avg per content
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Published</p>
                <p className="text-2xl font-bold text-purple-900">{stats.publishedContent}</p>
                <p className="text-xs text-purple-700 mt-1">
                  {Math.round((stats.publishedContent / stats.totalContent) * 100)}% of total
                </p>
              </div>
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Draft Content</p>
                <p className="text-2xl font-bold text-yellow-900">{stats.draftContent}</p>
                <p className="text-xs text-yellow-700 mt-1">
                  {stats.archivedContent} archived
                </p>
              </div>
              <Edit className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Popular Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span>Most Popular Content</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.mostPopular.map((item, index) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                        <TypeIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm font-medium text-gray-900">
                        <Eye className="w-4 h-4" />
                        <span>{item.views.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recently Modified */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Recently Modified</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentlyModified.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                        <TypeIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.lastModified.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Content by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span>Content by Type</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.contentByType.map((type) => (
                <div key={type.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 capitalize">{type.type}</span>
                      <Badge variant="outline" className="text-xs">
                        {type.count} items
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">{type.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{type.views.toLocaleString()} views</span>
                    <span>{Math.round(type.views / type.count)} avg</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span>Content by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.contentByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 capitalize">{category.category}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count} items
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{category.views.toLocaleString()} views</span>
                    <span>{Math.round(category.views / category.count)} avg</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
