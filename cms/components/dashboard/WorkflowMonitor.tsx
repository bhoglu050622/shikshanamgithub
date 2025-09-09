'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  GitBranch, 
  Clock, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  FileText,
  BookOpen,
  Package,
  User,
  ArrowRight,
  Pause,
  Play
} from 'lucide-react'

interface WorkflowItem {
  id: string
  title: string
  type: 'course' | 'lesson' | 'blog' | 'package' | 'page'
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'needs_changes'
  author: {
    name: string
    avatar?: string
  }
  reviewer?: {
    name: string
    avatar?: string
  }
  publisher?: {
    name: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  version: number
}

export function WorkflowMonitor() {
  const [workflowItems, setWorkflowItems] = useState<WorkflowItem[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'urgent'>('all')

  useEffect(() => {
    const generateWorkflowItems = (): WorkflowItem[] => {
      const titles = [
        'Advanced Sanskrit Grammar Course',
        'Bhagavad Gita Chapter 2 Analysis',
        'Introduction to Vedanta Philosophy',
        'Yoga Sutras Deep Dive',
        'Meditation Techniques Guide',
        'Ancient Wisdom Blog Series',
        'Complete Philosophy Package',
        'Sanskrit Learning Path'
      ]

      const authors = [
        { name: 'Dr. Priya Sharma', avatar: '/avatars/priya.jpg' },
        { name: 'Prof. Rajesh Kumar', avatar: '/avatars/rajesh.jpg' },
        { name: 'Swami Ananda', avatar: '/avatars/ananda.jpg' },
        { name: 'Dr. Meera Patel', avatar: '/avatars/meera.jpg' }
      ]

      const reviewers = [
        { name: 'Senior Editor', avatar: '/avatars/editor.jpg' },
        { name: 'Content Reviewer', avatar: '/avatars/reviewer.jpg' }
      ]

      const types: ('course' | 'lesson' | 'blog' | 'package' | 'page')[] = ['course', 'lesson', 'blog', 'package', 'page']
      const statuses: ('draft' | 'pending_review' | 'approved' | 'published' | 'needs_changes')[] = 
        ['draft', 'pending_review', 'approved', 'published', 'needs_changes']
      const priorities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high']

      return Array.from({ length: 12 }, (_, i) => {
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const author = authors[Math.floor(Math.random() * authors.length)]
        const reviewer = status !== 'draft' ? reviewers[Math.floor(Math.random() * reviewers.length)] : undefined
        
        return {
          id: `workflow-${i}`,
          title: titles[Math.floor(Math.random() * titles.length)],
          type: types[Math.floor(Math.random() * types.length)],
          status,
          author,
          reviewer,
          publisher: status === 'published' ? reviewers[0] : undefined,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
          priority: priorities[Math.floor(Math.random() * priorities.length)],
          version: Math.floor(Math.random() * 5) + 1
        }
      })
    }

    const updateWorkflow = () => {
      setWorkflowItems(generateWorkflowItems())
    }

    updateWorkflow()
    const interval = setInterval(updateWorkflow, 12000) // Update every 12 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4 text-gray-600" />
      case 'pending_review': return <Clock className="w-4 h-4 text-yellow-600" />
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'published': return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'needs_changes': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'pending_review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'published': return 'bg-blue-100 text-blue-800'
      case 'needs_changes': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4 text-blue-600" />
      case 'lesson': return <FileText className="w-4 h-4 text-green-600" />
      case 'blog': return <FileText className="w-4 h-4 text-orange-600" />
      case 'package': return <Package className="w-4 h-4 text-purple-600" />
      case 'page': return <FileText className="w-4 h-4 text-gray-600" />
      default: return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const filteredItems = workflowItems.filter(item => {
    switch (filter) {
      case 'pending': return item.status === 'pending_review' || item.status === 'needs_changes'
      case 'urgent': return item.priority === 'high' || isOverdue(item.dueDate)
      default: return true
    }
  })

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <GitBranch className="w-5 h-5 mr-2" />
              Content Workflow
              <div className="ml-3 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-blue-600">Live</span>
              </div>
            </CardTitle>
            <CardDescription>
              Real-time content workflow status and pending actions
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({workflowItems.length})
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pending ({workflowItems.filter(i => i.status === 'pending_review' || i.status === 'needs_changes').length})
            </Button>
            <Button
              variant={filter === 'urgent' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('urgent')}
            >
              Urgent ({workflowItems.filter(i => i.priority === 'high' || isOverdue(i.dueDate)).length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[480px] px-6">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <GitBranch className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm">No workflow items found</p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    item.priority === 'high' ? 'border-red-200 bg-red-50' :
                    isOverdue(item.dueDate) ? 'border-orange-200 bg-orange-50' :
                    'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getTypeIcon(item.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                          {item.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            v{item.version}
                          </Badge>
                          <Badge className={getPriorityColor(item.priority)} variant="outline">
                            {item.priority}
                          </Badge>
                          {isOverdue(item.dueDate) && (
                            <Badge className="bg-red-100 text-red-800">
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>

                  {/* Workflow Progress */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={item.author.avatar} />
                        <AvatarFallback className="text-xs">
                          {item.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{item.author.name}</span>
                    </div>
                    
                    {item.status !== 'draft' && (
                      <>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <div className="flex items-center space-x-1">
                          {item.reviewer && (
                            <>
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={item.reviewer.avatar} />
                                <AvatarFallback className="text-xs">
                                  {item.reviewer.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">{item.reviewer.name}</span>
                            </>
                          )}
                        </div>
                      </>
                    )}

                    {item.status === 'published' && item.publisher && (
                      <>
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <div className="flex items-center space-x-1">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={item.publisher.avatar} />
                            <AvatarFallback className="text-xs">
                              {item.publisher.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-600">{item.publisher.name}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Timestamps and Actions */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                      </div>
                      {item.dueDate && (
                        <div className={`flex items-center space-x-1 ${isOverdue(item.dueDate) ? 'text-red-600' : ''}`}>
                          <AlertCircle className="w-3 h-3" />
                          <span>Due {new Date(item.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {item.status === 'pending_review' && (
                        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Review
                        </Button>
                      )}
                      {item.status === 'approved' && (
                        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                          <Play className="w-3 h-3 mr-1" />
                          Publish
                        </Button>
                      )}
                      {item.status === 'needs_changes' && (
                        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                          <Pause className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      )}
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
