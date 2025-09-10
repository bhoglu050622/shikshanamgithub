'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  Star,
  MessageSquare,
  Share2,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  Target,
  Zap,
  Award,
  BookOpen,
  FileText,
  Globe,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Activity,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react'

interface ContentMetrics {
  id: string
  title: string
  type: 'course' | 'lesson' | 'blog' | 'page' | 'package'
  views: number
  uniqueViews: number
  engagement: number
  rating: number
  comments: number
  shares: number
  revenue?: number
  enrollments?: number
  completions?: number
  timeSpent: number
  bounceRate: number
  conversionRate: number
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
  lastUpdated: Date
}

interface AnalyticsData {
  totalContent: number
  totalViews: number
  totalRevenue: number
  averageRating: number
  topPerforming: ContentMetrics[]
  recentActivity: Array<{
    id: string
    action: string
    content: string
    user: string
    timestamp: Date
  }>
  performanceByType: Record<string, {
    count: number
    views: number
    revenue: number
  }>
  monthlyTrends: Array<{
    month: string
    views: number
    revenue: number
    content: number
  }>
}

interface ContentAnalyticsProps {
  contentType?: string
  dateRange?: '7d' | '30d' | '90d' | '1y'
  onExport?: (data: any) => void
  showRevenue?: boolean
  showEngagement?: boolean
  showTrends?: boolean
}

export function ContentAnalytics({
  contentType,
  dateRange = '30d',
  onExport,
  showRevenue = true,
  showEngagement = true,
  showTrends = true
}: ContentAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [selectedDateRange, setSelectedDateRange] = useState(dateRange)
  const [selectedContentType, setSelectedContentType] = useState(contentType || 'all')
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedDateRange, selectedContentType])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    try {
      // Mock data - replace with actual API call
      const mockData: AnalyticsData = {
        totalContent: 247,
        totalViews: 125430,
        totalRevenue: 45670,
        averageRating: 4.6,
        topPerforming: [
          {
            id: '1',
            title: 'Introduction to Sanskrit',
            type: 'course',
            views: 15420,
            uniqueViews: 12350,
            engagement: 78,
            rating: 4.8,
            comments: 45,
            shares: 23,
            revenue: 5670,
            enrollments: 234,
            completions: 189,
            timeSpent: 45,
            bounceRate: 12,
            conversionRate: 15.2,
            trend: 'up',
            trendPercentage: 12.5,
            lastUpdated: new Date()
          }
        ],
        recentActivity: [
          {
            id: '1',
            action: 'published',
            content: 'Advanced Yoga Techniques',
            user: 'Sarah Johnson',
            timestamp: new Date()
          }
        ],
        performanceByType: {
          course: { count: 45, views: 67890, revenue: 23450 },
          blog: { count: 123, views: 45670, revenue: 0 },
          page: { count: 67, views: 23450, revenue: 0 },
          package: { count: 12, views: 12340, revenue: 22220 }
        },
        monthlyTrends: [
          { month: 'Jan', views: 12000, revenue: 4500, content: 15 },
          { month: 'Feb', views: 13500, revenue: 5200, content: 18 },
          { month: 'Mar', views: 15200, revenue: 6100, content: 22 }
        ]
      }
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp
      case 'down': return ArrowDown
      default: return Minus
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Data</h3>
        <p className="text-gray-600">Analytics data will appear here once content is published.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Analytics</h2>
          <p className="text-gray-600">Track performance and engagement metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedDateRange} onValueChange={(value) => setSelectedDateRange(value as "7d" | "30d" | "90d" | "1y")}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => loadAnalyticsData()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          {onExport && (
            <Button variant="outline" onClick={() => onExport(analyticsData)}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.totalContent}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.totalViews)}</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        {showRevenue && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.totalRevenue)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.averageRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          {showTrends && <TabsTrigger value="trends">Trends</TabsTrigger>}
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPerforming.map((item) => {
                    const TrendIcon = getTrendIcon(item.trend)
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {formatNumber(item.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {item.rating}
                            </span>
                            {showRevenue && item.revenue && (
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {formatCurrency(item.revenue)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendIcon className={`w-4 h-4 ${getTrendColor(item.trend)}`} />
                          <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                            {item.trendPercentage}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Performance by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Content Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.performanceByType).map(([type, data]) => (
                    <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          {type === 'course' && <BookOpen className="w-4 h-4 text-blue-600" />}
                          {type === 'blog' && <FileText className="w-4 h-4 text-green-600" />}
                          {type === 'page' && <Globe className="w-4 h-4 text-purple-600" />}
                          {type === 'package' && <Award className="w-4 h-4 text-orange-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm capitalize">{type}</h4>
                          <p className="text-xs text-gray-600">{data.count} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatNumber(data.views)} views</p>
                        {showRevenue && (
                          <p className="text-xs text-gray-600">{formatCurrency(data.revenue)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPerforming.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge variant="outline" className="mt-1 capitalize">{item.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const TrendIcon = getTrendIcon(item.trend)
                          return <TrendIcon className={`w-4 h-4 ${getTrendColor(item.trend)}`} />
                        })()}
                        <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                          {item.trendPercentage}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Views</p>
                        <p className="font-medium">{formatNumber(item.views)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Engagement</p>
                        <p className="font-medium">{item.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <p className="font-medium">{item.rating}/5</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Time Spent</p>
                        <p className="font-medium">{item.timeSpent} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends */}
        {showTrends && (
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.monthlyTrends.map((trend) => (
                    <div key={trend.month} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{trend.month}</h4>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-gray-600">Views</p>
                          <p className="font-medium">{formatNumber(trend.views)}</p>
                        </div>
                        {showRevenue && (
                          <div>
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-medium">{formatCurrency(trend.revenue)}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-600">Content</p>
                          <p className="font-medium">{trend.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Activity */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                        <span className="font-medium">{activity.content}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
