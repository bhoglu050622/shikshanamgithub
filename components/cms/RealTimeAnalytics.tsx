'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Edit3, 
  Clock, 
  Activity,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

interface RealTimeAnalyticsProps {
  onRefresh?: () => void;
}

interface AnalyticsData {
  contentTypes: Array<{
    id: string;
    name: string;
    views: number;
    edits: number;
    lastModified: string;
    status: string;
  }>;
  performance: {
    totalViews: number;
    totalEdits: number;
    avgResponseTime: number;
    uptime: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    contentType?: string;
    timestamp: string;
    user: string;
  }>;
}

export default function RealTimeAnalytics({ onRefresh }: RealTimeAnalyticsProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      console.log('📊 Loading real-time analytics...');
      const response = await fetch('/api/cms/analytics', {
        cache: 'no-store', // Ensure fresh data
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok) {
        const analyticsData = await response.json();
        console.log('✅ Real-time analytics loaded:', analyticsData);
        setData(analyticsData);
        setLastUpdated(new Date());
      } else {
        console.error('Failed to fetch analytics data:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = async () => {
    setRefreshing(true);
    try {
      await loadAnalyticsData();
      if (onRefresh) {
        onRefresh();
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  // Auto-refresh every 10 seconds for real-time feel
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      console.log('🔄 Auto-refreshing analytics data...');
      loadAnalyticsData();
    }, 10000); // Changed from 30s to 10s for more real-time feel

    return () => clearInterval(interval);
  }, [autoRefresh, loadAnalyticsData]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
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
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading real-time analytics...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Analytics</h3>
        <p className="text-gray-600 mb-4">Unable to fetch real-time analytics data.</p>
        <Button onClick={refreshData} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Real-Time Indicator */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold">Real-Time Analytics Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">
                  {autoRefresh ? 'Live Updates Active' : 'Auto-Refresh Paused'}
                </span>
              </div>
              {lastUpdated && (
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Activity className="h-4 w-4" />
                <span className="text-sm">Refreshes every 10s</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`${autoRefresh ? 'bg-green-500 text-white border-green-600 hover:bg-green-600' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'} backdrop-blur-sm transition-all`}
            >
              <Zap className="w-4 w-4 mr-2" />
              {autoRefresh ? 'Pause' : 'Resume'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={refreshing}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Now
            </Button>
          </div>
        </div>
      </div>

      {/* Real-Time Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Content Items</CardTitle>
            <Eye className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{data.contentTypes.length}</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-xs text-green-600 font-medium">
                {data.contentTypes.filter(ct => ct.status === 'active').length} active
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Views</CardTitle>
            <BarChart3 className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{data.performance.totalViews.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-2">
              Based on content metrics
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">File Modifications</CardTitle>
            <Edit3 className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{data.performance.totalEdits}</div>
            <p className="text-xs text-gray-600 mt-2">
              Real file system changes
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Avg Response</CardTitle>
            <Clock className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{data.performance.avgResponseTime}ms</div>
            <p className="text-xs text-gray-600 mt-2">
              API performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Content Analytics */}
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content Types</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Content Types Performance
              </CardTitle>
              <CardDescription>
                Real-time statistics from actual CMS data - {data.contentTypes.length} total items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.contentTypes
                  .sort((a, b) => b.views - a.views) // Sort by views descending
                  .map((contentType) => (
                  <div key={contentType.id} className="group flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {getStatusIcon(contentType.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                          {contentType.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-xs text-gray-500">
                            Modified: {new Date(contentType.lastModified).toLocaleDateString()}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {(contentType as any).type || 'page'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 ml-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">{contentType.views.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-600">{contentType.edits}</div>
                        <div className="text-xs text-gray-500">Edits</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(contentType.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity Feed
              </CardTitle>
              <CardDescription>
                Live feed of CMS changes based on file modifications - Updates every 10s
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.recentActivity.length > 0 ? (
                  data.recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{activity.action}</p>
                          {index === 0 && (
                            <Badge className="bg-green-100 text-green-700 text-xs">Latest</Badge>
                          )}
                        </div>
                        {activity.contentType && (
                          <p className="text-sm text-gray-600 mt-1">{activity.contentType}</p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md">
                          <Users className="h-3 w-3 text-gray-600" />
                          <p className="text-sm font-medium text-gray-700">{activity.user}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Active Content</span>
                    <span className="font-semibold">
                      {data.contentTypes.filter(ct => ct.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inactive Content</span>
                    <span className="font-semibold">
                      {data.contentTypes.filter(ct => ct.status === 'inactive').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span className="font-semibold text-green-600">
                      {data.performance.uptime.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Response</span>
                    <span className="font-semibold">
                      {data.performance.avgResponseTime}ms
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
