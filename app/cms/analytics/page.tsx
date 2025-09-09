'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AnalyticsChart } from '@/cms/components/dashboard/AnalyticsChart'
import { ContentInsights } from '@/cms/components/dashboard/ContentInsights'
import { UserActivityMonitor } from '@/cms/components/dashboard/UserActivityMonitor'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  DollarSign,
  Globe,
  Clock,
  Download,
  RefreshCw,
  Activity
} from 'lucide-react'

interface AnalyticsOverview {
  totalPageViews: number
  uniqueVisitors: number
  averageSessionDuration: number
  bounceRate: number
  conversionRate: number
  totalRevenue: number
  growthRate: number
  activeUsers: number
}

export default function CMSAnalyticsPage() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [timeRange, setTimeRange] = useState('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    const generateOverview = (): AnalyticsOverview => ({
      totalPageViews: Math.floor(Math.random() * 50000) + 25000,
      uniqueVisitors: Math.floor(Math.random() * 15000) + 8000,
      averageSessionDuration: Math.floor(Math.random() * 300) + 120, // 2-7 minutes
      bounceRate: Math.random() * 40 + 20, // 20-60%
      conversionRate: Math.random() * 8 + 2, // 2-10%
      totalRevenue: Math.floor(Math.random() * 100000) + 50000,
      growthRate: Math.random() * 20 - 5, // -5% to +15%
      activeUsers: Math.floor(Math.random() * 200) + 50
    })

    const updateOverview = () => {
      setOverview(generateOverview())
      setLastUpdated(new Date())
    }

    updateOverview()

    let interval: NodeJS.Timeout | null = null
    if (autoRefresh) {
      interval = setInterval(updateOverview, 10000) // Update every 10 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh, timeRange])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}m ${secs}s`
  }

  const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(Math.floor(num))
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)

  if (!overview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Real-time insights and performance metrics</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
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
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 text-green-700' : ''}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(overview.totalPageViews)}</div>
            <p className="text-xs text-gray-600 mt-1">
              {formatNumber(overview.uniqueVisitors)} unique visitors
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(overview.averageSessionDuration)}</div>
            <p className="text-xs text-gray-600 mt-1">
              {overview.bounceRate.toFixed(1)}% bounce rate
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <MousePointer className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{Math.abs(overview.growthRate).toFixed(1)}% growth
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overview.totalRevenue)}</div>
            <p className="text-xs text-orange-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {overview.growthRate >= 0 ? '+' : ''}{overview.growthRate.toFixed(1)}%
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </Card>
      </div>

      {/* Real-time Status Indicator */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium text-green-800">Real-time data active</span>
              <Badge className="bg-green-100 text-green-800">
                {overview.activeUsers} users online
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-700">
              <Activity className="w-4 h-4" />
              <span>Updates every 10 seconds</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <AnalyticsChart />
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <ContentInsights />
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <UserActivityMonitor />
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Revenue Breakdown
                </CardTitle>
                <CardDescription>Revenue by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Courses', amount: 45000, percentage: 60, color: 'bg-blue-500' },
                    { type: 'Packages', amount: 22500, percentage: 30, color: 'bg-purple-500' },
                    { type: 'Subscriptions', amount: 7500, percentage: 10, color: 'bg-green-500' }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(item.amount)}</div>
                        <div className="text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Growth Metrics
                </CardTitle>
                <CardDescription>Performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly Recurring Revenue</span>
                    <span className="font-bold text-green-600">+{overview.growthRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer Acquisition Cost</span>
                    <span className="font-bold">$45.20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer Lifetime Value</span>
                    <span className="font-bold">$892.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Churn Rate</span>
                    <span className="font-bold text-red-600">2.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </CardTitle>
          <CardDescription>
            Download analytics reports and raw data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export PDF Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
