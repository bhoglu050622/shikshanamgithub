'use client'

import { useRealtimeMetrics } from '@/cms/lib/realtime'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Eye, 
  TrendingUp, 
  Activity,
  Cpu,
  HardDrive,
  Clock
} from 'lucide-react'

export function RealtimeMetrics() {
  const metrics = useRealtimeMetrics()

  if (!metrics) {
    return (
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
    )
  }

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-US').format(Math.floor(num))

  const getHealthColor = (value: number) => {
    if (value > 80) return 'text-red-600'
    if (value > 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getHealthBadgeColor = (value: number) => {
    if (value > 80) return 'bg-red-100 text-red-800'
    if (value > 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalUsers)}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {formatNumber(metrics.activeUsers)} active
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCourses}</div>
            <p className="text-xs text-gray-600 mt-1">
              {metrics.publishedCourses} published, {metrics.draftCourses} drafts
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalRevenue)}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              {formatCurrency(metrics.monthlyRevenue)} this month
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.pageViews)}</div>
            <p className="text-xs text-orange-600 mt-1">
              {formatNumber(metrics.uniqueVisitors)} unique visitors
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              System Health
            </CardTitle>
            <CardDescription>Real-time system performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.systemHealth.cpu}%` }}
                    ></div>
                  </div>
                  <Badge className={getHealthBadgeColor(metrics.systemHealth.cpu)}>
                    {metrics.systemHealth.cpu.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium">Memory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.systemHealth.memory}%` }}
                    ></div>
                  </div>
                  <Badge className={getHealthBadgeColor(metrics.systemHealth.memory)}>
                    {metrics.systemHealth.memory.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HardDrive className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${metrics.systemHealth.storage}%` }}
                    ></div>
                  </div>
                  <Badge className={getHealthBadgeColor(metrics.systemHealth.storage)}>
                    {metrics.systemHealth.storage.toFixed(1)}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm font-medium">Uptime</span>
                </div>
                <Badge variant="outline">
                  {metrics.systemHealth.uptime}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {metrics.conversionRate.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {formatNumber(metrics.pageViews)}
                  </div>
                  <p className="text-xs text-blue-700">Page Views</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {formatNumber(metrics.uniqueVisitors)}
                  </div>
                  <p className="text-xs text-purple-700">Unique Visitors</p>
                </div>
              </div>

              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(metrics.monthlyRevenue)}
                </div>
                <p className="text-xs text-green-700">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
