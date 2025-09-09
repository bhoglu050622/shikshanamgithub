'use client'

import { useAuth } from '@/cms/context/AuthContext'
import { Badge } from '@/components/ui/badge'
import { RealtimeMetrics } from '@/cms/components/dashboard/RealtimeMetrics'
import { ActivityFeed } from '@/cms/components/dashboard/ActivityFeed'
import { AnalyticsChart } from '@/cms/components/dashboard/AnalyticsChart'
import { ContentInsights } from '@/cms/components/dashboard/ContentInsights'
import { UserActivityMonitor } from '@/cms/components/dashboard/UserActivityMonitor'
import { WorkflowMonitor } from '@/cms/components/dashboard/WorkflowMonitor'

export default function CMSDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-orange-100">
          Monitor your content performance and manage your platform in real-time.
        </p>
        <div className="flex items-center space-x-3 mt-3">
          <Badge className="bg-white/20 text-white border-white/30">
            {user?.role} Access
          </Badge>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-100">Real-time data active</span>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <RealtimeMetrics />

      {/* Analytics Chart */}
      <AnalyticsChart />

      {/* Activity and Insights Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ActivityFeed />
        <ContentInsights />
      </div>

      {/* Workflow and User Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <WorkflowMonitor />
        <div className="xl:col-span-1">
          <UserActivityMonitor />
        </div>
      </div>
    </div>
  )
}
