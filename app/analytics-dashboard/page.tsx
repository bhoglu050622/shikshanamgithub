/**
 * Analytics Dashboard - Main Page
 * Self-hosted analytics dashboard with comprehensive metrics
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CalendarDays, 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  TrendingUp,
  Globe,
  Monitor,
  Smartphone,
  Download,
  RefreshCw,
  Settings
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

// Components
import KPIRow from './components/KPIRow'
import TimeseriesChart from './components/TimeseriesChart'
import TopPages from './components/TopPages'
import Referrers from './components/Referrers'
import CountriesTable from './components/CountriesTable'
import OSBrowsersChart from './components/OSBrowsersChart'
import HeatmapGrid from './components/HeatmapGrid'
import DateRangeFilter from './components/DateRangeFilter'
import LoginModal from './components/LoginModal'

interface AnalyticsTotals {
  uniqueVisitors: number
  pageViews: number
  sessions: number
  bounceRate: number
  avgSessionDuration: number
  previousPeriod?: {
    uniqueVisitors: number
    pageViews: number
    sessions: number
    bounceRate: number
    avgSessionDuration: number
  }
}

export default function AnalyticsDashboard() {
  const { theme } = useTheme()
  const router = useRouter()
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(true)
  
  // Dashboard state
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
    end: new Date().toISOString().split('T')[0] // today
  })
  const [isLoading, setIsLoading] = useState(false)
  const [totals, setTotals] = useState<AnalyticsTotals | null>(null)
  const [compareMode, setCompareMode] = useState<'previous' | 'none'>('previous')
  const [refreshInterval, setRefreshInterval] = useState<number | null>(null)

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('analytics_dashboard_auth')
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true)
      setShowLoginModal(false)
    }
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    if (refreshInterval && isAuthenticated) {
      const interval = setInterval(() => {
        fetchDashboardData()
      }, refreshInterval * 1000)
      
      return () => clearInterval(interval)
    }
  }, [refreshInterval, isAuthenticated, dateRange, fetchDashboardData])

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true)
      setShowLoginModal(false)
      localStorage.setItem('analytics_dashboard_auth', 'authenticated')
      fetchDashboardData()
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLoginModal(true)
    localStorage.removeItem('analytics_dashboard_auth')
  }

  const fetchDashboardData = useCallback(async () => {
    if (!isAuthenticated) return
    
    setIsLoading(true)
    try {
      // Fetch totals
      const totalsResponse = await fetch(`/api/analytics/agg/totals?start=${dateRange.start}&end=${dateRange.end}&compare=${compareMode}`)
      if (totalsResponse.ok) {
        const totalsData = await totalsResponse.json()
        setTotals(totalsData)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, dateRange.start, dateRange.end, compareMode])

  const handleDateRangeChange = (newRange: { start: string; end: string }) => {
    setDateRange(newRange)
  }

  const exportData = async (type: 'pages' | 'referrers' | 'events') => {
    try {
      const response = await fetch(`/api/analytics/export/csv?start=${dateRange.start}&end=${dateRange.end}&type=${type}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-${type}-${dateRange.start}-${dateRange.end}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Failed to export data:', error)
    }
  }

  // Show login modal if not authenticated
  if (!isAuthenticated) {
    return <LoginModal isOpen={showLoginModal} onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive website analytics and insights
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Date Range Filter */}
              <DateRangeFilter 
                dateRange={dateRange}
                onChange={handleDateRangeChange}
              />
              
              {/* Compare Mode Toggle */}
              <Button
                variant={compareMode === 'previous' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCompareMode(compareMode === 'previous' ? 'none' : 'previous')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Compare
              </Button>
              
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={fetchDashboardData}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              {/* Generate Sample Data (Development) */}
              {process.env.NODE_ENV === 'development' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/analytics/generate-sample', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ days: 30 })
                      })
                      if (response.ok) {
                        alert('Sample data generated! Refresh to see data.')
                        fetchDashboardData()
                      }
                    } catch (error) {
                      console.error('Failed to generate sample data:', error)
                    }
                  }}
                >
                  Generate Sample Data
                </Button>
              )}
              
              {/* Settings */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {/* TODO: Settings modal */}}
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              {/* Logout */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* KPI Row */}
          <KPIRow 
            totals={totals}
            isLoading={isLoading}
            compareMode={compareMode}
          />

          {/* Main Charts and Tables */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="realtime">Real-time</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Timeseries Chart */}
              <TimeseriesChart 
                dateRange={dateRange}
                compareMode={compareMode}
              />
              
              {/* Top Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPages dateRange={dateRange} onExport={() => exportData('pages')} />
                <Referrers dateRange={dateRange} onExport={() => exportData('referrers')} />
              </div>
            </TabsContent>

            {/* Pages Tab */}
            <TabsContent value="pages" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TopPages dateRange={dateRange} onExport={() => exportData('pages')} expanded />
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Page Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg. Load Time</span>
                          <span className="font-medium">1.2s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Bounce Rate</span>
                          <span className="font-medium">{totals?.bounceRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Exit Rate</span>
                          <span className="font-medium">45.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Audience Tab */}
            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CountriesTable dateRange={dateRange} />
                <OSBrowsersChart dateRange={dateRange} />
              </div>
              
              {/* Heatmap */}
              <HeatmapGrid dateRange={dateRange} />
            </TabsContent>

            {/* Behavior Tab */}
            <TabsContent value="behavior" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Flow</CardTitle>
                    <CardDescription>Most common user paths</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      User flow visualization coming soon
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Events</CardTitle>
                    <CardDescription>Custom event tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Event analytics coming soon
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Real-time Tab */}
            <TabsContent value="realtime" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">--</div>
                    <p className="text-sm text-muted-foreground">Users in last 5 minutes</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Active Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4 text-muted-foreground">
                      Real-time data coming soon
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4 text-muted-foreground">
                      Live event stream coming soon
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
