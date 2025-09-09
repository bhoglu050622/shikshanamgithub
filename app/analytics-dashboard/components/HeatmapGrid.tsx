/**
 * Heatmap Grid Component
 * Displays weekday×hour activity heatmap
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock, Calendar } from 'lucide-react'

interface HeatmapData {
  weekday: number // 0-6 (Sunday-Saturday)
  hour: number // 0-23
  count: number
}

interface HeatmapGridProps {
  dateRange: { start: string; end: string }
}

export default function HeatmapGrid({ dateRange }: HeatmapGridProps) {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/analytics/agg/heatmap?start=${dateRange.start}&end=${dateRange.end}`
        )
        
        if (response.ok) {
          const data = await response.json()
          setHeatmapData(data)
        }
      } catch (error) {
        console.error('Failed to fetch heatmap data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dateRange])

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Create a map for quick lookup
  const dataMap = new Map<string, number>()
  heatmapData.forEach(item => {
    dataMap.set(`${item.weekday}-${item.hour}`, item.count)
  })

  // Find max value for color scaling
  const maxValue = Math.max(...heatmapData.map(d => d.count), 1)

  const getIntensity = (count: number) => {
    if (count === 0) return 0
    return Math.min(1, count / maxValue)
  }

  const getColor = (intensity: number) => {
    if (intensity === 0) return 'hsl(var(--muted))'
    
    // Use CSS custom properties for theme-aware colors
    const hue = 'var(--primary)'
    const alpha = Math.max(0.1, intensity)
    return `hsl(${hue} / ${alpha})`
  }

  const formatHour = (hour: number) => {
    if (hour === 0) return '12am'
    if (hour < 12) return `${hour}am`
    if (hour === 12) return '12pm'
    return `${hour - 12}pm`
  }

  const getTotalForDay = (weekday: number) => {
    return hours.reduce((sum, hour) => {
      return sum + (dataMap.get(`${weekday}-${hour}`) || 0)
    }, 0)
  }

  const getTotalForHour = (hour: number) => {
    return weekdays.reduce((sum, _, weekday) => {
      return sum + (dataMap.get(`${weekday}-${hour}`) || 0)
    }, 0)
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="text-lg">Activity Heatmap</CardTitle>
            <CardDescription>Page views by day of week and hour</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-12" />
              {Array.from({ length: 24 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-6" />
              ))}
            </div>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-2">
                <Skeleton className="h-6 w-12" />
                {Array.from({ length: 24 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-6" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Hour labels */}
            <div className="flex gap-1">
              <div className="w-12"></div> {/* Space for day labels */}
              {hours.map(hour => (
                <div
                  key={hour}
                  className="w-6 h-6 flex items-center justify-center text-xs text-muted-foreground"
                  title={formatHour(hour)}
                >
                  {hour % 6 === 0 ? hour : ''}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="space-y-1">
              {weekdays.map((day, weekday) => (
                <div key={weekday} className="flex gap-1 items-center">
                  {/* Day label */}
                  <div className="w-12 text-sm font-medium text-right pr-2">
                    {day}
                  </div>
                  
                  {/* Hour cells */}
                  {hours.map(hour => {
                    const count = dataMap.get(`${weekday}-${hour}`) || 0
                    const intensity = getIntensity(count)
                    
                    return (
                      <div
                        key={hour}
                        className="w-6 h-6 rounded-sm border border-border hover:border-primary/50 cursor-pointer transition-all duration-200"
                        style={{
                          backgroundColor: getColor(intensity),
                        }}
                        title={`${day} ${formatHour(hour)}: ${count.toLocaleString()} page views`}
                      />
                    )
                  })}
                  
                  {/* Day total */}
                  <div className="ml-2 text-xs text-muted-foreground">
                    {getTotalForDay(weekday).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Legend and stats */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Less</span>
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map((intensity, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-sm border border-border"
                        style={{ backgroundColor: getColor(intensity) }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">More</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Peak: {formatHour(
                    hours.reduce((maxHour, hour) => 
                      getTotalForHour(hour) > getTotalForHour(maxHour) ? hour : maxHour
                    , 0)
                  )}</span>
                </div>
                
                <div>
                  Total: {heatmapData.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
