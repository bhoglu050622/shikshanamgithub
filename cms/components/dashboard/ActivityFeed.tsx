'use client'

import { useRealtimeActivity } from '@/cms/lib/realtime'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Activity, Clock, User, FileText, Package, BookOpen, Edit, Trash2, Eye, CheckCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function ActivityFeed() {
  const activities = useRealtimeActivity()

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'created': return <FileText className="w-4 h-4 text-green-600" />
      case 'updated': return <Edit className="w-4 h-4 text-blue-600" />
      case 'published': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'deleted': return <Trash2 className="w-4 h-4 text-red-600" />
      case 'reviewed': return <Eye className="w-4 h-4 text-purple-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getResourceIcon = (resource: string) => {
    switch (resource.toLowerCase()) {
      case 'course': return <BookOpen className="w-4 h-4 text-blue-600" />
      case 'lesson': return <FileText className="w-4 h-4 text-green-600" />
      case 'package': return <Package className="w-4 h-4 text-purple-600" />
      case 'blog post': return <FileText className="w-4 h-4 text-orange-600" />
      case 'page': return <FileText className="w-4 h-4 text-gray-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'created': return 'bg-green-100 text-green-800'
      case 'updated': return 'bg-blue-100 text-blue-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'deleted': return 'bg-red-100 text-red-800'
      case 'reviewed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Live Activity Feed
          <div className="ml-auto flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs text-green-600">Live</span>
          </div>
        </CardTitle>
        <CardDescription>
          Real-time updates from your content management system
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[480px] px-6">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Activity className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm">Waiting for activity...</p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {activities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    index === 0 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(activity.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getActionColor(activity.action)}>
                        {activity.action}
                      </Badge>
                      {getResourceIcon(activity.resource)}
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {activity.resource}
                      </span>
                      {activity.metadata?.live && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="w-3 h-3 mr-1" />
                        {activity.user}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
