'use client'

import React from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { useSystemAnalytics } from '@/cms/lib/core/hooks'
import { useRealtimeAnalytics, useRealtimeNotifications } from '@/cms/lib/core/realtime-hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Users, BookOpen, DollarSign, TrendingUp, Bell } from 'lucide-react'

interface RealtimeAnalyticsProps {
  className?: string
}

export function RealtimeAnalytics({ className }: RealtimeAnalyticsProps) {
  const { user } = useAuth()

  // Real-time analytics
  const { analytics, isLoading } = useRealtimeAnalytics()
  
  // Real-time notifications
  const [notifications, markAsRead, clearAll] = useRealtimeNotifications()

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to view analytics.
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Real-time Analytics</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            Live
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: {analytics?.lastUpdated ? new Date(analytics.lastUpdated).toLocaleTimeString() : 'Never'}
          </span>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.activeUsers || 0} active users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalCourses || 0}</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.publishedCourses || 0} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalBlogPosts || 0}</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.publishedBlogPosts || 0} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packages</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalPackages || 0}</div>
            <p className="text-xs text-muted-foreground">
              {analytics?.publishedPackages || 0} published
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Notifications */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Real-time Notifications
            </CardTitle>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <Badge variant="secondary">
                  {notifications.filter(n => !n.read).length} unread
                </Badge>
                <button
                  onClick={clearAll}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No notifications yet
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.read ? 'bg-muted/50' : 'bg-background'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            notification.type === 'success' ? 'default' :
                            notification.type === 'warning' ? 'secondary' :
                            notification.type === 'error' ? 'destructive' : 'outline'
                          }
                          className="text-xs"
                        >
                          {notification.type}
                        </Badge>
                        <span className="font-medium text-sm">
                          {notification.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45ms</div>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">2.1GB</div>
              <p className="text-sm text-muted-foreground">Memory Usage</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15%</div>
              <p className="text-sm text-muted-foreground">CPU Usage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
