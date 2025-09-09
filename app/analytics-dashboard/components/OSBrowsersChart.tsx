/**
 * OS/Browsers Chart Component
 * Displays operating system and browser breakdown
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Monitor, Smartphone, Tablet, Chrome, Globe } from 'lucide-react'

interface OSBrowserData {
  os: Record<string, number>
  browsers: Record<string, number>
  platforms: Record<string, number>
}

interface OSBrowsersChartProps {
  dateRange: { start: string; end: string }
}

export default function OSBrowsersChart({ dateRange }: OSBrowsersChartProps) {
  const [data, setData] = useState<OSBrowserData>({ os: {}, browsers: {}, platforms: {} })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/analytics/agg/os-browsers?start=${dateRange.start}&end=${dateRange.end}`
        )
        
        if (response.ok) {
          const osBrowserData = await response.json()
          setData(osBrowserData)
        }
      } catch (error) {
        console.error('Failed to fetch OS/browser data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dateRange])

  const getOSIcon = (os: string) => {
    if (os.toLowerCase().includes('windows')) return '🪟'
    if (os.toLowerCase().includes('mac')) return '🍎'
    if (os.toLowerCase().includes('linux')) return '🐧'
    if (os.toLowerCase().includes('android')) return '🤖'
    if (os.toLowerCase().includes('ios')) return '📱'
    return '💻'
  }

  const getBrowserIcon = (browser: string) => {
    if (browser.toLowerCase().includes('chrome')) return <Chrome className="w-4 h-4 text-yellow-500" />
    if (browser.toLowerCase().includes('firefox')) return <Globe className="w-4 h-4 text-orange-500" />
    if (browser.toLowerCase().includes('safari')) return <Globe className="w-4 h-4 text-blue-500" />
    if (browser.toLowerCase().includes('edge')) return <Globe className="w-4 h-4 text-blue-600" />
    return <Globe className="w-4 h-4 text-muted-foreground" />
  }

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes('mobile')) return <Smartphone className="w-4 h-4 text-green-500" />
    if (platform.toLowerCase().includes('tablet')) return <Tablet className="w-4 h-4 text-purple-500" />
    return <Monitor className="w-4 h-4 text-blue-500" />
  }

  const renderDataSection = (
    sectionData: Record<string, number>,
    getIcon: (name: string) => React.ReactNode,
    label: string
  ) => {
    const entries = Object.entries(sectionData).sort(([,a], [,b]) => b - a)
    const total = entries.reduce((sum, [, count]) => sum + count, 0)
    
    if (entries.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Monitor className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No {label.toLowerCase()} data available</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {entries.slice(0, 6).map(([name, count], index) => {
          const percentage = total > 0 ? (count / total) * 100 : 0
          const maxCount = entries[0][1]
          const barPercentage = (count / maxCount) * 100
          
          return (
            <div key={`${name}-${index}`} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0">
                    {getIcon(name)}
                  </span>
                  <div>
                    <h4 className="font-medium text-sm">{name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {percentage.toFixed(1)}% of users
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {count.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    users
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${barPercentage}%` }}
                />
              </div>
            </div>
          )
        })}
        
        {entries.length > 6 && (
          <div className="text-center pt-2 text-sm text-muted-foreground">
            +{entries.length - 6} more {label.toLowerCase()}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="text-lg">Technology</CardTitle>
            <CardDescription>OS, browsers & platforms</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="os" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="os" className="text-xs">
                Operating Systems
              </TabsTrigger>
              <TabsTrigger value="browsers" className="text-xs">
                Browsers
              </TabsTrigger>
              <TabsTrigger value="platforms" className="text-xs">
                Platforms
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="os" className="space-y-4">
              {renderDataSection(data.os, getOSIcon, 'Operating Systems')}
            </TabsContent>
            
            <TabsContent value="browsers" className="space-y-4">
              {renderDataSection(data.browsers, getBrowserIcon, 'Browsers')}
            </TabsContent>
            
            <TabsContent value="platforms" className="space-y-4">
              {renderDataSection(data.platforms, getPlatformIcon, 'Platforms')}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
