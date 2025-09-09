'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock } from 'lucide-react'

interface DataPoint {
  timestamp: string
  value: number
  label: string
}

interface ChartData {
  pageViews: DataPoint[]
  users: DataPoint[]
  conversions: DataPoint[]
  revenue: DataPoint[]
}

export function AnalyticsChart() {
  const [chartData, setChartData] = useState<ChartData>({
    pageViews: [],
    users: [],
    conversions: [],
    revenue: []
  })
  const [selectedMetric, setSelectedMetric] = useState<keyof ChartData>('pageViews')
  const [timeRange, setTimeRange] = useState('1h')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate real-time data
  useEffect(() => {
    const generateDataPoint = (baseValue: number, variance: number): number => {
      return Math.max(0, baseValue + (Math.random() - 0.5) * variance)
    }

    const updateData = () => {
      const now = new Date()
      const timestamp = now.toISOString()
      const label = now.toLocaleTimeString()

      setChartData(prev => ({
        pageViews: [...prev.pageViews.slice(-29), {
          timestamp,
          value: generateDataPoint(1000, 200),
          label
        }],
        users: [...prev.users.slice(-29), {
          timestamp,
          value: generateDataPoint(50, 20),
          label
        }],
        conversions: [...prev.conversions.slice(-29), {
          timestamp,
          value: generateDataPoint(10, 5),
          label
        }],
        revenue: [...prev.revenue.slice(-29), {
          timestamp,
          value: generateDataPoint(500, 200),
          label
        }]
      }))
    }

    // Initial data
    updateData()

    // Update every 5 seconds
    const interval = setInterval(updateData, 5000)
    return () => clearInterval(interval)
  }, [])

  // Draw chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const data = chartData[selectedMetric]
    if (data.length === 0) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const width = rect.width
    const height = rect.height
    const padding = 40

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    if (data.length < 2) return

    // Calculate scales
    const maxValue = Math.max(...data.map(d => d.value))
    const minValue = Math.min(...data.map(d => d.value))
    const valueRange = maxValue - minValue || 1

    const xStep = (width - 2 * padding) / (data.length - 1)
    const yScale = (height - 2 * padding) / valueRange

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i < data.length; i += 5) {
      const x = padding + i * xStep
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, height - padding)
      ctx.stroke()
    }

    // Draw area fill
    ctx.fillStyle = selectedMetric === 'pageViews' ? 'rgba(59, 130, 246, 0.1)' :
                    selectedMetric === 'users' ? 'rgba(16, 185, 129, 0.1)' :
                    selectedMetric === 'conversions' ? 'rgba(245, 158, 11, 0.1)' :
                    'rgba(139, 69, 19, 0.1)'

    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    
    data.forEach((point, index) => {
      const x = padding + index * xStep
      const y = height - padding - (point.value - minValue) * yScale
      if (index === 0) {
        ctx.lineTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.lineTo(width - padding, height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw line
    ctx.strokeStyle = selectedMetric === 'pageViews' ? '#3b82f6' :
                     selectedMetric === 'users' ? '#10b981' :
                     selectedMetric === 'conversions' ? '#f59e0b' :
                     '#8b4513'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    data.forEach((point, index) => {
      const x = padding + index * xStep
      const y = height - padding - (point.value - minValue) * yScale
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = ctx.strokeStyle
    data.forEach((point, index) => {
      const x = padding + index * xStep
      const y = height - padding - (point.value - minValue) * yScale
      
      ctx.beginPath()
      ctx.arc(x, y, 3, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = '#6b7280'
    ctx.font = '12px Inter'
    ctx.textAlign = 'center'

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange * i) / 5
      const y = height - padding - (i * (height - 2 * padding)) / 5
      ctx.fillText(Math.round(value).toString(), 20, y + 4)
    }

    // X-axis labels (show every 5th point)
    data.forEach((point, index) => {
      if (index % 5 === 0) {
        const x = padding + index * xStep
        ctx.save()
        ctx.translate(x, height - 10)
        ctx.rotate(-Math.PI / 4)
        ctx.fillText(point.label.split(':').slice(0, 2).join(':'), 0, 0)
        ctx.restore()
      }
    })

  }, [chartData, selectedMetric])

  const getCurrentValue = () => {
    const data = chartData[selectedMetric]
    return data.length > 0 ? data[data.length - 1].value : 0
  }

  const getPreviousValue = () => {
    const data = chartData[selectedMetric]
    return data.length > 1 ? data[data.length - 2].value : 0
  }

  const getChangePercentage = () => {
    const current = getCurrentValue()
    const previous = getPreviousValue()
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const getMetricConfig = (metric: keyof ChartData) => {
    const configs = {
      pageViews: { 
        icon: Eye, 
        title: 'Page Views', 
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        format: (val: number) => val.toLocaleString()
      },
      users: { 
        icon: Users, 
        title: 'Active Users', 
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        format: (val: number) => val.toLocaleString()
      },
      conversions: { 
        icon: MousePointer, 
        title: 'Conversions', 
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        format: (val: number) => val.toLocaleString()
      },
      revenue: { 
        icon: TrendingUp, 
        title: 'Revenue', 
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        format: (val: number) => `$${val.toLocaleString()}`
      }
    }
    return configs[metric]
  }

  const config = getMetricConfig(selectedMetric)
  const Icon = config.icon
  const changePercentage = getChangePercentage()

  return (
    <Card className="h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Real-time Analytics
              <div className="ml-3 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-green-600">Live</span>
              </div>
            </CardTitle>
            <CardDescription>
              Live metrics updated every 5 seconds
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as keyof ChartData)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(chartData).map(metric => {
                  const metricConfig = getMetricConfig(metric as keyof ChartData)
                  const MetricIcon = metricConfig.icon
                  return (
                    <SelectItem key={metric} value={metric}>
                      <div className="flex items-center">
                        <MetricIcon className="w-4 h-4 mr-2" />
                        {metricConfig.title}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current Value Display */}
        <div className={`p-4 rounded-lg mb-4 ${config.bgColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon className={`w-6 h-6 mr-3 ${config.color}`} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {config.format(getCurrentValue())}
                </h3>
                <p className="text-sm text-gray-600">{config.title}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`flex items-center ${changePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${changePercentage < 0 ? 'rotate-180' : ''}`} />
                <span className="text-sm font-medium">
                  {changePercentage >= 0 ? '+' : ''}{changePercentage.toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-gray-500">vs previous</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-64 rounded-lg border"
            style={{ width: '100%', height: '256px' }}
          />
          {chartData[selectedMetric].length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Collecting data...</p>
              </div>
            </div>
          )}
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>Last 30 data points</span>
          <span>Updated every 5 seconds</span>
        </div>
      </CardContent>
    </Card>
  )
}
