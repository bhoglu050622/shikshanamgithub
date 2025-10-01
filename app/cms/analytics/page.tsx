'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Edit, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Filter,
  Calendar
} from 'lucide-react';

interface AnalyticsData {
  contentTypes: {
    id: string;
    name: string;
    views: number;
    edits: number;
    lastModified: string;
    status: 'active' | 'inactive' | 'error';
  }[];
  performance: {
    totalViews: number;
    totalEdits: number;
    avgResponseTime: number;
    uptime: number;
  };
  recentActivity: {
    id: string;
    action: string;
    contentType: string;
    timestamp: string;
    user: string;
  }[];
}

export default function CMSAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate API call - in real implementation, this would fetch from analytics API
      const mockData: AnalyticsData = {
        contentTypes: [
          { id: 'homepage', name: 'Homepage', views: 1250, edits: 45, lastModified: '2024-01-15', status: 'active' },
          { id: 'donation', name: 'Donation Page', views: 890, edits: 23, lastModified: '2024-01-14', status: 'active' },
          { id: 'about', name: 'About Page', views: 650, edits: 12, lastModified: '2024-01-13', status: 'active' },
          { id: 'contact', name: 'Contact Page', views: 420, edits: 8, lastModified: '2024-01-12', status: 'active' },
          { id: 'schools', name: 'Schools Overview', views: 780, edits: 15, lastModified: '2024-01-11', status: 'active' },
          { id: 'sanskrit-school', name: 'Sanskrit School', views: 920, edits: 18, lastModified: '2024-01-10', status: 'active' },
          { id: 'darshana-school', name: 'Darshana School', views: 680, edits: 14, lastModified: '2024-01-09', status: 'active' },
          { id: 'self-help-school', name: 'Self-Help School', views: 550, edits: 11, lastModified: '2024-01-08', status: 'active' },
        ],
        performance: {
          totalViews: 6120,
          totalEdits: 146,
          avgResponseTime: 245,
          uptime: 99.8
        },
        recentActivity: [
          { id: '1', action: 'Content Updated', contentType: 'Homepage', timestamp: '2024-01-15 14:30', user: 'Admin' },
          { id: '2', action: 'Section Added', contentType: 'Donation Page', timestamp: '2024-01-15 13:45', user: 'Editor' },
          { id: '3', action: 'Content Published', contentType: 'About Page', timestamp: '2024-01-15 12:20', user: 'Admin' },
          { id: '4', action: 'Image Updated', contentType: 'Schools Overview', timestamp: '2024-01-15 11:15', user: 'Editor' },
          { id: '5', action: 'Text Modified', contentType: 'Sanskrit School', timestamp: '2024-01-15 10:30', user: 'Admin' },
        ]
      };
      
      setData(mockData);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Inactive</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-saffron-600" />
          <p className="text-gray-600">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Error</CardTitle>
            <CardDescription className="text-center">
              Failed to load analytics data. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={loadAnalyticsData} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">CMS Analytics</h1>
          <p className="text-gray-600">
            Monitor content performance and user engagement across all pages
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{data.performance.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Edit className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Edits</p>
                  <p className="text-2xl font-bold text-gray-900">{data.performance.totalEdits}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{data.performance.avgResponseTime}ms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{data.performance.uptime}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Content Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.contentTypes.map((contentType) => (
                <Card key={contentType.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(contentType.status)}
                        <div>
                          <CardTitle className="text-lg">{contentType.name}</CardTitle>
                          <CardDescription>Last modified: {contentType.lastModified}</CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(contentType.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Views</span>
                        <span className="text-sm font-medium">{contentType.views.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Edits</span>
                        <span className="text-sm font-medium">{contentType.edits}</span>
                      </div>

                      <div className="pt-4">
                        <Button size="sm" variant="outline" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>Views and engagement by content type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.contentTypes
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((contentType) => (
                        <div key={contentType.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{contentType.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{contentType.views} views</span>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ 
                                  width: `${(contentType.views / Math.max(...data.contentTypes.map(c => c.views))) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Edit Activity</CardTitle>
                  <CardDescription>Most frequently edited content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.contentTypes
                      .sort((a, b) => b.edits - a.edits)
                      .slice(0, 5)
                      .map((contentType) => (
                        <div key={contentType.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{contentType.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{contentType.edits} edits</span>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ 
                                  width: `${(contentType.edits / Math.max(...data.contentTypes.map(c => c.edits))) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest changes and updates across the CMS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Edit className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.contentType} • {activity.user}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </Button>
          </div>
          
          <Button onClick={loadAnalyticsData} variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
