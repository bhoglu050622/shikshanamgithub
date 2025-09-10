'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Eye, 
  FileText, 
  BookOpen, 
  Package,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  Target,
  Award,
  Clock
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalUsers: number
    activeUsers: number
    totalContent: number
    publishedContent: number
    totalViews: number
    totalEngagement: number
  }
  contentStats: {
    courses: number
    publishedCourses: number
    blogPosts: number
    publishedBlogPosts: number
    packages: number
    publishedPackages: number
  }
  userActivity: {
    newUsers: number
    activeUsers: number
    returningUsers: number
    userGrowth: number
  }
  popularContent: Array<{
    id: string
    title: string
    type: string
    views: number
    engagement: number
  }>
  recentActivity: Array<{
    id: string
    action: string
    content: string
    user: string
    timestamp: string
  }>
}

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [refreshing, setRefreshing] = useState(false)

  const fetchAnalytics = useCallback(async () => {
    try {
      setRefreshing(true)
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch(`/api/cms/analytics?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAnalyticsData(data)
      } else {
        console.error('Failed to fetch analytics')
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange, fetchAnalytics])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
          <p className="text-gray-600">Analytics data will appear here once content is published.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your content performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={fetchAnalytics}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalUsers)}</p>
                <div className="flex items-center mt-1">
                  {getGrowthIcon(analyticsData.userActivity.userGrowth)}
                  <span className={`text-sm ml-1 ${getGrowthColor(analyticsData.userActivity.userGrowth)}`}>
                    {Math.abs(analyticsData.userActivity.userGrowth)}%
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.activeUsers)}</p>
                <div className="flex items-center mt-1">
                  <Activity className="w-4 h-4 text-green-600" />
                  <span className="text-sm ml-1 text-green-600">
                    {Math.round((analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100)}% active
                  </span>
                </div>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalViews)}</p>
                <div className="flex items-center mt-1">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span className="text-sm ml-1 text-gray-600">
                    {formatNumber(analyticsData.overview.totalEngagement)} engagement
                  </span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Content</p>
                <p className="text-2xl font-bold">{analyticsData.overview.publishedContent}</p>
                <div className="flex items-center mt-1">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span className="text-sm ml-1 text-gray-600">
                    {analyticsData.overview.totalContent} total
                  </span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Content Statistics</CardTitle>
            <CardDescription>Breakdown of your content by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Courses</p>
                    <p className="text-sm text-gray-600">
                      {analyticsData.contentStats.publishedCourses} of {analyticsData.contentStats.courses} published
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{analyticsData.contentStats.courses}</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Blog Posts</p>
                    <p className="text-sm text-gray-600">
                      {analyticsData.contentStats.publishedBlogPosts} of {analyticsData.contentStats.blogPosts} published
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{analyticsData.contentStats.blogPosts}</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium">Packages</p>
                    <p className="text-sm text-gray-600">
                      {analyticsData.contentStats.publishedPackages} of {analyticsData.contentStats.packages} published
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{analyticsData.contentStats.packages}</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Content */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Content</CardTitle>
            <CardDescription>Most viewed content this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.popularContent.slice(0, 5).map((content, index) => (
                <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{content.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{content.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatNumber(content.views)} views</p>
                    <p className="text-xs text-gray-500">{content.engagement}% engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions in your CMS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}: {activity.content}
                  </p>
                  <p className="text-xs text-gray-500">
                    by {activity.user} • {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}