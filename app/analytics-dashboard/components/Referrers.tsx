/**
 * Referrers Component
 * Displays top referrer sources
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Download, Globe, Search, Share2 } from 'lucide-react'

interface Referrer {
  host: string
  count: number
}

interface ReferrersProps {
  dateRange: { start: string; end: string }
  onExport: () => void
}

export default function Referrers({ dateRange, onExport }: ReferrersProps) {
  const [referrers, setReferrers] = useState<Referrer[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/analytics/agg/referrers?start=${dateRange.start}&end=${dateRange.end}&limit=10`
      )
      
      if (response.ok) {
        const referrersData = await response.json()
        setReferrers(referrersData)
      }
    } catch (error) {
      console.error('Failed to fetch referrers:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getReferrerIcon = (host: string) => {
    if (host.includes('google')) return <Search className="w-4 h-4 text-blue-500" />
    if (host.includes('facebook')) return <Share2 className="w-4 h-4 text-blue-600" />
    if (host.includes('twitter') || host.includes('x.com')) return <Share2 className="w-4 h-4 text-sky-500" />
    if (host.includes('linkedin')) return <Share2 className="w-4 h-4 text-blue-700" />
    if (host.includes('youtube')) return <Share2 className="w-4 h-4 text-red-500" />
    return <Globe className="w-4 h-4 text-muted-foreground" />
  }

  const getReferrerType = (host: string) => {
    if (host.includes('google') || host.includes('bing') || host.includes('yahoo')) return 'Search Engine'
    if (host.includes('facebook') || host.includes('twitter') || host.includes('linkedin') || host.includes('instagram')) return 'Social Media'
    if (host.includes('youtube') || host.includes('vimeo')) return 'Video Platform'
    return 'Website'
  }

  const maxCount = referrers.length > 0 ? referrers[0].count : 1

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Top Referrers</CardTitle>
            <CardDescription>Traffic sources</CardDescription>
          </div>
          
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))
        ) : referrers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No referrer data available</p>
            <p className="text-sm">Direct traffic only</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrers.map((referrer, index) => {
              const percentage = (referrer.count / maxCount) * 100
              const type = getReferrerType(referrer.host)
              
              return (
                <div key={`${referrer.host}-${index}`} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-sm font-medium text-muted-foreground w-6 text-center">
                        {index + 1}
                      </span>
                      
                      {getReferrerIcon(referrer.host)}
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm truncate">
                            {referrer.host}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          {referrer.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          visits
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(`https://${referrer.host}`, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            
            {/* Summary stats */}
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total referral traffic</span>
                <span className="font-medium">
                  {referrers.reduce((sum, ref) => sum + ref.count, 0).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unique sources</span>
                <span className="font-medium">{referrers.length}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
