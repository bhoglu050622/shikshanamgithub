/**
 * Timeseries Chart Component
 * Displays analytics data over time
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, BarChart3, LineChart } from 'lucide-react'

interface TimeseriesData {
  label: string
  value: number
}

interface TimeseriesChartProps {
  dateRange: { start: string; end: string }
  compareMode: 'previous' | 'none'
}

export default function TimeseriesChart({ dateRange, compareMode }: TimeseriesChartProps) {
  const [data, setData] = useState<TimeseriesData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<'pageViews' | 'uniqueVisitors' | 'sessions'>('pageViews')
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')

  const metrics = [
    { key: 'pageViews' as const, label: 'Page Views', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'uniqueVisitors' as const, label: 'Unique Visitors', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'sessions' as const, label: 'Sessions', icon: <LineChart className="w-4 h-4" /> }
  ]

  useEffect(() => {
    fetchData()
  }, [dateRange, selectedMetric])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Determine interval based on date range
      const daysDiff = Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24))
      const interval = daysDiff <= 7 ? 'hour' : 'day'

      const response = await fetch(
        `/api/analytics/agg/timeseries?metric=${selectedMetric}&interval=${interval}&start=${dateRange.start}&end=${dateRange.end}`
      )
      
      if (response.ok) {
        const timeseriesData = await response.json()
        setData(timeseriesData)
      }
    } catch (error) {
      console.error('Failed to fetch timeseries data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const daysDiff = Math.ceil((new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff <= 7) {
      // Show hour format for short ranges
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric'
      })
    } else {
      // Show date format for longer ranges
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      })
    }
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Analytics Overview</CardTitle>
            <CardDescription>
              Showing {selectedMetric.replace(/([A-Z])/g, ' $1').toLowerCase()} over time
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Metric Selector */}
            <div className="flex rounded-lg border p-1">
              {metrics.map((metric) => (
                <Button
                  key={metric.key}
                  variant={selectedMetric === metric.key ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedMetric(metric.key)}
                  className="h-8"
                >
                  {metric.icon}
                  <span className="ml-1 hidden sm:inline">{metric.label}</span>
                </Button>
              ))}
            </div>
            
            {/* Chart Type Selector */}
            <div className="flex rounded-lg border p-1">
              <Button
                variant={chartType === 'line' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setChartType('line')}
                className="h-8 px-2"
              >
                <LineChart className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === 'bar' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setChartType('bar')}
                className="h-8 px-2"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="h-64 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="h-64 w-full">
            {data.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No data available for the selected period
              </div>
            ) : (
              <div className="relative h-full">
                {/* Simple SVG Chart */}
                <svg viewBox="0 0 800 200" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <g key={percent}>
                      <line
                        x1="50"
                        y1={200 - (percent * 150) / 100}
                        x2="750"
                        y2={200 - (percent * 150) / 100}
                        stroke="currentColor"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                      <text
                        x="40"
                        y={205 - (percent * 150) / 100}
                        fill="currentColor"
                        className="text-xs fill-muted-foreground"
                        textAnchor="end"
                      >
                        {Math.round(minValue + (range * percent) / 100)}
                      </text>
                    </g>
                  ))}
                  
                  {/* Data visualization */}
                  {chartType === 'line' ? (
                    // Line chart
                    <polyline
                      points={data.map((point, index) => {
                        const x = 50 + (index * 700) / (data.length - 1 || 1)
                        const y = 200 - 25 - ((point.value - minValue) / range) * 150
                        return `${x},${y}`
                      }).join(' ')}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="drop-shadow-sm"
                    />
                  ) : (
                    // Bar chart
                    data.map((point, index) => {
                      const barWidth = Math.max(1, 700 / data.length - 2)
                      const x = 50 + (index * 700) / data.length
                      const height = ((point.value - minValue) / range) * 150
                      const y = 200 - 25 - height
                      
                      return (
                        <rect
                          key={index}
                          x={x}
                          y={y}
                          width={barWidth}
                          height={height}
                          fill="hsl(var(--primary))"
                          className="opacity-80 hover:opacity-100"
                        />
                      )
                    })
                  )}
                  
                  {/* Data points for interaction */}
                  {data.map((point, index) => {
                    const x = 50 + (index * 700) / (data.length - 1 || 1)
                    const y = 200 - 25 - ((point.value - minValue) / range) * 150
                    
                    return (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r="3"
                          fill="hsl(var(--primary))"
                          className="hover:r-4 cursor-pointer"
                        />
                        <title>{`${formatDate(point.label)}: ${point.value.toLocaleString()}`}</title>
                      </g>
                    )
                  })}
                </svg>
                
                {/* X-axis labels */}
                <div className="flex justify-between mt-2 px-12 text-xs text-muted-foreground">
                  {data.length > 0 && (
                    <>
                      <span>{formatDate(data[0].label)}</span>
                      {data.length > 2 && (
                        <span>{formatDate(data[Math.floor(data.length / 2)].label)}</span>
                      )}
                      <span>{formatDate(data[data.length - 1].label)}</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
