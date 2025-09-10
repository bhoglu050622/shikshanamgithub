'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Calendar,
  User,
  FileText,
  BookOpen,
  Package,
  RefreshCw,
  Play,
  Pause,
  Trash2
} from 'lucide-react'

interface PublishingItem {
  id: string
  title: string
  type: 'course' | 'lesson' | 'blog' | 'package'
  status: 'scheduled' | 'publishing' | 'published' | 'failed'
  scheduledFor?: string
  publishedAt?: string
  author: {
    id: string
    username: string
  }
  createdAt: string
  error?: string
}

interface PublishingQueue {
  scheduled: PublishingItem[]
  publishing: PublishingItem[]
  published: PublishingItem[]
  failed: PublishingItem[]
}

export default function PublishingPage() {
  const { user } = useAuth()
  const [publishingQueue, setPublishingQueue] = useState<PublishingQueue>({
    scheduled: [],
    publishing: [],
    published: [],
    failed: []
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  const fetchPublishingQueue = useCallback(async () => {
    try {
      setRefreshing(true)
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch('/api/cms/publishing/queue', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPublishingQueue(data)
      } else {
        console.error('Failed to fetch publishing queue')
      }
    } catch (error) {
      console.error('Error fetching publishing queue:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchPublishingQueue()
  }, [fetchPublishingQueue])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'publishing': return 'bg-yellow-100 text-yellow-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4" />
      case 'publishing': return <Send className="w-4 h-4" />
      case 'published': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />
      case 'lesson': return <FileText className="w-4 h-4" />
      case 'blog': return <FileText className="w-4 h-4" />
      case 'package': return <Package className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const handlePublishNow = async (itemId: string) => {
    try {
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch(`/api/cms/publishing/${itemId}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchPublishingQueue()
      } else {
        console.error('Failed to publish item')
      }
    } catch (error) {
      console.error('Error publishing item:', error)
    }
  }

  const handleCancelSchedule = async (itemId: string) => {
    try {
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch(`/api/cms/publishing/${itemId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchPublishingQueue()
      } else {
        console.error('Failed to cancel scheduled item')
      }
    } catch (error) {
      console.error('Error canceling scheduled item:', error)
    }
  }

  const handleRetryFailed = async (itemId: string) => {
    try {
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch(`/api/cms/publishing/${itemId}/retry`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchPublishingQueue()
      } else {
        console.error('Failed to retry failed item')
      }
    } catch (error) {
      console.error('Error retrying failed item:', error)
    }
  }

  const allItems = [
    ...publishingQueue.scheduled,
    ...publishingQueue.publishing,
    ...publishingQueue.published,
    ...publishingQueue.failed
  ]

  const filteredItems = filter === 'all' 
    ? allItems 
    : allItems.filter(item => item.status === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading publishing queue...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Publishing Queue</h1>
          <p className="text-gray-600">Manage content publishing and scheduling</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="publishing">Publishing</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={fetchPublishingQueue}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{publishingQueue.scheduled.length}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publishing</p>
                <p className="text-2xl font-bold text-yellow-600">{publishingQueue.publishing.length}</p>
              </div>
              <Send className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{publishingQueue.published.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{publishingQueue.failed.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Publishing Queue */}
      {filteredItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Send className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items in queue</h3>
            <p className="text-gray-600 text-center">
              {filter === 'all' 
                ? 'No content is scheduled for publishing'
                : `No items with status "${filter}"`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-3 h-3 mr-1" />
                          {item.author.username}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.scheduledFor ? formatDate(item.scheduledFor) : formatDate(item.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(item.status)}>
                      <div className="flex items-center">
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status}</span>
                      </div>
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`/preview/${item.type}/${item.id}`, '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {item.status === 'scheduled' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePublishNow(item.id)}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelSchedule(item.id)}
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      {item.status === 'failed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRetryFailed(item.id)}
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {item.error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-sm text-red-800">{item.error}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}