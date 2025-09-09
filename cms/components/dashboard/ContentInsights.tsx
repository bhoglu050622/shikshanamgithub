'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Clock, 
  Star,
  Users,
  MessageSquare,
  Share2,
  BarChart3
} from 'lucide-react'

interface ContentMetric {
  id: string
  title: string
  type: 'course' | 'lesson' | 'blog' | 'package'
  views: number
  engagement: number
  rating: number
  comments: number
  shares: number
  revenue?: number
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
  lastUpdated: string
}

export function ContentInsights() {
  const [insights, setInsights] = useState<ContentMetric[]>([])
  const [loading, setLoading] = useState(true)

  // Generate mock real-time content insights
  useEffect(() => {
    const generateInsights = (): ContentMetric[] => {
      const contentItems = [
        { id: '1', title: 'Advanced Sanskrit Grammar', type: 'course' as const },
        { id: '2', title: 'Bhagavad Gita Chapter 1', type: 'lesson' as const },
        { id: '3', title: 'Introduction to Vedanta', type: 'blog' as const },
        { id: '4', title: 'Complete Philosophy Bundle', type: 'package' as const },
        { id: '5', title: 'Yoga Sutras Explained', type: 'course' as const },
        { id: '6', title: 'Meditation Techniques', type: 'lesson' as const },
        { id: '7', title: 'Ancient Wisdom for Modern Life', type: 'blog' as const },
        { id: '8', title: 'Premium Learning Package', type: 'package' as const },
      ]

      return contentItems.map(item => {
        const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'
        return {
          ...item,
          views: Math.floor(Math.random() * 10000) + 500,
          engagement: Math.random() * 100,
          rating: Math.random() * 2 + 3, // 3-5 star rating
          comments: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50),
          revenue: item.type === 'package' || item.type === 'course' ? Math.floor(Math.random() * 5000) + 1000 : undefined,
          trend,
          trendPercentage: Math.random() * 20 + 1,
          lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString()
        }
      })
    }

    const updateInsights = () => {
      setInsights(generateInsights())
      setLoading(false)
    }

    updateInsights()

    // Update every 10 seconds
    const interval = setInterval(updateInsights, 10000)
    return () => clearInterval(interval)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />
      case 'lesson': return <Clock className="w-4 h-4" />
      case 'blog': return <MessageSquare className="w-4 h-4" />
      case 'package': return <Star className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-800'
      case 'lesson': return 'bg-green-100 text-green-800'
      case 'blog': return 'bg-orange-100 text-orange-800'
      case 'package': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === 'up') {
      return <TrendingUp className="w-3 h-3 text-green-600" />
    } else if (trend === 'down') {
      return <TrendingDown className="w-3 h-3 text-red-600" />
    }
    return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
  }

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const sortedByViews = [...insights].sort((a, b) => b.views - a.views)
  const sortedByEngagement = [...insights].sort((a, b) => b.engagement - a.engagement)
  const sortedByRevenue = [...insights].filter(item => item.revenue).sort((a, b) => (b.revenue || 0) - (a.revenue || 0))

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Content Performance Insights
          <div className="ml-auto flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-green-600">Live</span>
          </div>
        </CardTitle>
        <CardDescription>
          Real-time performance metrics for your content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="views">Most Viewed</TabsTrigger>
            <TabsTrigger value="engagement">Top Engagement</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Leaders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="views" className="mt-4">
            <div className="space-y-3">
              {sortedByViews.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded text-xs font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </Badge>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500">Updated {formatTimeAgo(item.lastUpdated)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span className="text-sm font-medium">{item.views.toLocaleString()}</span>
                        {getTrendIcon(item.trend, item.trendPercentage)}
                      </div>
                      <p className="text-xs text-gray-500">
                        {item.trend === 'up' ? '+' : item.trend === 'down' ? '-' : ''}{item.trendPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="mt-4">
            <div className="space-y-3">
              {sortedByEngagement.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded text-xs font-bold text-green-600">
                      {index + 1}
                    </div>
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </Badge>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>★ {item.rating.toFixed(1)}</span>
                        <span>•</span>
                        <span>{item.comments} comments</span>
                        <span>•</span>
                        <span>{item.shares} shares</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {item.engagement.toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-500">engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-4">
            <div className="space-y-3">
              {sortedByRevenue.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded text-xs font-bold text-orange-600">
                      {index + 1}
                    </div>
                    <Badge className={getTypeColor(item.type)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </Badge>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.views.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      ${(item.revenue || 0).toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(item.trend, item.trendPercentage)}
                      <span className="text-xs text-gray-500">
                        {item.trendPercentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
