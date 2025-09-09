/**
 * KPI Row Component
 * Displays key performance indicators with comparison
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Eye, MousePointer, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

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

interface KPIRowProps {
  totals: AnalyticsTotals | null
  isLoading: boolean
  compareMode: 'previous' | 'none'
}

interface KPICardProps {
  title: string
  value: string | number
  previousValue?: number
  icon: React.ReactNode
  format?: 'number' | 'percentage' | 'duration'
  isLoading: boolean
  compareMode: 'previous' | 'none'
}

function KPICard({ 
  title, 
  value, 
  previousValue, 
  icon, 
  format = 'number',
  isLoading,
  compareMode 
}: KPICardProps) {
  const formatValue = (val: string | number, fmt: string) => {
    if (typeof val === 'string') return val
    
    switch (fmt) {
      case 'number':
        return val.toLocaleString()
      case 'percentage':
        return `${val.toFixed(1)}%`
      case 'duration':
        const minutes = Math.floor(val / 60)
        const seconds = Math.floor(val % 60)
        return `${minutes}m ${seconds}s`
      default:
        return val.toString()
    }
  }

  const calculateChange = () => {
    if (!previousValue || typeof value !== 'number' || compareMode === 'none') return null
    
    const change = ((value - previousValue) / previousValue) * 100
    return {
      percentage: Math.abs(change),
      isPositive: change > 0,
      isNeutral: Math.abs(change) < 0.1
    }
  }

  const change = calculateChange()

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Skeleton className="h-4 w-24" />
          </CardTitle>
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatValue(value, format)}
        </div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {change.isNeutral ? (
              <span className="text-muted-foreground">No change from previous period</span>
            ) : (
              <>
                {change.isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span className={change.isPositive ? 'text-green-500' : 'text-red-500'}>
                  {change.percentage.toFixed(1)}%
                </span>
                <span className="ml-1">vs previous period</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function KPIRow({ totals, isLoading, compareMode }: KPIRowProps) {
  const kpis = [
    {
      title: 'Unique Visitors',
      value: totals?.uniqueVisitors || 0,
      previousValue: totals?.previousPeriod?.uniqueVisitors,
      icon: <Users className="h-4 w-4" />,
      format: 'number' as const
    },
    {
      title: 'Page Views',
      value: totals?.pageViews || 0,
      previousValue: totals?.previousPeriod?.pageViews,
      icon: <Eye className="h-4 w-4" />,
      format: 'number' as const
    },
    {
      title: 'Sessions',
      value: totals?.sessions || 0,
      previousValue: totals?.previousPeriod?.sessions,
      icon: <MousePointer className="h-4 w-4" />,
      format: 'number' as const
    },
    {
      title: 'Bounce Rate',
      value: totals?.bounceRate || 0,
      previousValue: totals?.previousPeriod?.bounceRate,
      icon: <TrendingDown className="h-4 w-4" />,
      format: 'percentage' as const
    },
    {
      title: 'Avg Session Duration',
      value: totals?.avgSessionDuration || 0,
      previousValue: totals?.previousPeriod?.avgSessionDuration,
      icon: <Clock className="h-4 w-4" />,
      format: 'duration' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <KPICard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          previousValue={kpi.previousValue}
          icon={kpi.icon}
          format={kpi.format}
          isLoading={isLoading}
          compareMode={compareMode}
        />
      ))}
    </div>
  )
}
