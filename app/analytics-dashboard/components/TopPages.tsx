/**
 * Top Pages Component
 * Displays most visited pages
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Download, TrendingUp } from 'lucide-react'

interface TopPage {
  url: string
  title?: string
  count: number
}

interface TopPagesProps {
  dateRange: { start: string; end: string }
  onExport: () => void
  expanded?: boolean
}

export default function TopPages({ dateRange, onExport, expanded = false }: TopPagesProps) {
  const [pages, setPages] = useState<TopPage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const limit = expanded ? 50 : 10
      const response = await fetch(
        `/api/analytics/agg/top-pages?start=${dateRange.start}&end=${dateRange.end}&limit=${limit}`
      )
      
      if (response.ok) {
        const pagesData = await response.json()
        setPages(pagesData)
      }
    } catch (error) {
      console.error('Failed to fetch top pages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url, 'https://example.com')
      return urlObj.pathname + urlObj.search
    } catch {
      return url
    }
  }

  const getPageTitle = (page: TopPage) => {
    if (page.title && page.title !== page.url) {
      return page.title
    }
    
    // Extract meaningful title from URL path
    const path = formatUrl(page.url)
    if (path === '/' || path === '') return 'Home'
    
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return 'Home'
    
    // Convert kebab-case to title case
    return segments[segments.length - 1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const maxViews = pages.length > 0 ? pages[0].count : 1

  return (
    <Card className={expanded ? 'col-span-full' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Top Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: expanded ? 10 : 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          ))
        ) : pages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No page data available for the selected period
          </div>
        ) : (
          <div className="space-y-3">
            {pages.map((page, index) => {
              const percentage = (page.count / maxViews) * 100
              
              return (
                <div key={`${page.url}-${index}`} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-sm font-medium text-muted-foreground w-6 text-center">
                        {index + 1}
                      </span>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm truncate">
                            {getPageTitle(page)}
                          </h4>
                          {index < 3 && (
                            <Badge variant="secondary" className="text-xs">
                              {index === 0 ? 'Top' : `#${index + 1}`}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {formatUrl(page.url)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium text-sm">
                          {page.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          views
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(page.url, '_blank')}
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
                  
                  {expanded && index < pages.length - 1 && (
                    <div className="border-b border-muted mt-3" />
                  )}
                </div>
              )
            })}
            
            {!expanded && pages.length >= 10 && (
              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  View All Pages
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
