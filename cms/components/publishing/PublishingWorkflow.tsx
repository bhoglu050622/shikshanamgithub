'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Send,
  Clock,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Globe,
  Lock,
  Unlock,
  Settings,
  Bell,
  Mail,
  MessageSquare,
  FileText,
  Users,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Share2,
  Copy,
  ExternalLink,
  Filter,
  Search,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Activity,
  BarChart3,
  TrendingUp,
  Target,
  Shield,
  Key,
  Timer,
  CheckSquare,
  Square
} from 'lucide-react'

interface PublishingWorkflowItem {
  id: string
  title: string
  type: 'course' | 'lesson' | 'blog' | 'page' | 'package'
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'published' | 'rejected'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  author: {
    id: string
    name: string
    avatar?: string
  }
  reviewer?: {
    id: string
    name: string
    avatar?: string
  }
  publisher?: {
    id: string
    name: string
    avatar?: string
  }
  createdAt: Date
  updatedAt: Date
  scheduledAt?: Date
  publishedAt?: Date
  reviewNotes?: string
  publishNotes?: string
  tags: string[]
  category: string
  estimatedReadTime?: number
  wordCount?: number
  isUrgent: boolean
  requiresApproval: boolean
  autoPublish: boolean
  notifySubscribers: boolean
  socialMediaShare: boolean
  seoOptimized: boolean
  accessibilityChecked: boolean
  mobileOptimized: boolean
  previewUrl?: string
  liveUrl?: string
}

interface PublishingWorkflowProps {
  items: PublishingWorkflowItem[]
  onUpdateStatus: (itemId: string, status: PublishingWorkflowItem['status'], notes?: string) => Promise<void>
  onSchedule: (itemId: string, scheduledAt: Date, options: any) => Promise<void>
  onPublish: (itemId: string, options: any) => Promise<void>
  onReject: (itemId: string, reason: string) => Promise<void>
  onApprove: (itemId: string, notes?: string) => Promise<void>
  onBulkAction: (itemIds: string[], action: string, options?: any) => Promise<void>
  userRole: 'content_editor' | 'publisher' | 'instructor' | 'support_moderator' | 'admin'
  showFilters?: boolean
  showBulkActions?: boolean
  showAnalytics?: boolean
}

export function PublishingWorkflow({
  items,
  onUpdateStatus,
  onSchedule,
  onPublish,
  onReject,
  onApprove,
  onBulkAction,
  userRole,
  showFilters = true,
  showBulkActions = true,
  showAnalytics = true
}: PublishingWorkflowProps) {
  const [activeTab, setActiveTab] = useState('workflow')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // Modal states
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PublishingWorkflowItem | null>(null)
  
  // Form states
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [publishOptions, setPublishOptions] = useState({
    notifySubscribers: true,
    socialMediaShare: false,
    seoOptimized: true,
    accessibilityChecked: true,
    mobileOptimized: true
  })
  const [rejectReason, setRejectReason] = useState('')
  const [approveNotes, setApproveNotes] = useState('')

  const canApprove = ['publisher', 'admin'].includes(userRole)
  const canPublish = ['publisher', 'admin'].includes(userRole)
  const canReject = ['publisher', 'admin'].includes(userRole)
  const canSchedule = ['content_editor', 'publisher', 'instructor', 'admin'].includes(userRole)

  const filteredItems = items.filter(item => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesStatus && matchesType && matchesPriority && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'date':
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime()
        break
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === sortedItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(sortedItems.map(item => item.id))
    }
  }

  const handleBulkActionClick = async (action: string) => {
    if (selectedItems.length === 0) return
    
    try {
      await onBulkAction(selectedItems, action, publishOptions)
      setSelectedItems([])
    } catch (error) {
      console.error('Bulk action failed:', error)
    }
  }

  const handleScheduleClick = (item: PublishingWorkflowItem) => {
    setSelectedItem(item)
    setShowScheduleModal(true)
  }

  const handlePublishClick = (item: PublishingWorkflowItem) => {
    setSelectedItem(item)
    setShowPublishModal(true)
  }

  const handleRejectClick = (item: PublishingWorkflowItem) => {
    setSelectedItem(item)
    setShowRejectModal(true)
  }

  const handleApproveClick = (item: PublishingWorkflowItem) => {
    setSelectedItem(item)
    setShowApproveModal(true)
  }

  const handleScheduleSubmit = async () => {
    if (!selectedItem || !scheduleDate || !scheduleTime) return
    
    try {
      const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`)
      await onSchedule(selectedItem.id, scheduledAt, publishOptions)
      setShowScheduleModal(false)
      setSelectedItem(null)
      setScheduleDate('')
      setScheduleTime('')
    } catch (error) {
      console.error('Schedule failed:', error)
    }
  }

  const handlePublishSubmit = async () => {
    if (!selectedItem) return
    
    try {
      await onPublish(selectedItem.id, publishOptions)
      setShowPublishModal(false)
      setSelectedItem(null)
    } catch (error) {
      console.error('Publish failed:', error)
    }
  }

  const handleRejectSubmit = async () => {
    if (!selectedItem || !rejectReason.trim()) return
    
    try {
      await onReject(selectedItem.id, rejectReason)
      setShowRejectModal(false)
      setSelectedItem(null)
      setRejectReason('')
    } catch (error) {
      console.error('Reject failed:', error)
    }
  }

  const handleApproveSubmit = async () => {
    if (!selectedItem) return
    
    try {
      await onApprove(selectedItem.id, approveNotes)
      setShowApproveModal(false)
      setSelectedItem(null)
      setApproveNotes('')
    } catch (error) {
      console.error('Approve failed:', error)
    }
  }

  const getStatusIcon = (status: PublishingWorkflowItem['status']) => {
    switch (status) {
      case 'published': return CheckCircle
      case 'approved': return CheckCircle
      case 'scheduled': return Clock
      case 'pending_review': return Eye
      case 'rejected': return XCircle
      case 'draft': return FileText
      default: return AlertCircle
    }
  }

  const getStatusColor = (status: PublishingWorkflowItem['status']) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100'
      case 'approved': return 'text-blue-600 bg-blue-100'
      case 'scheduled': return 'text-purple-600 bg-purple-100'
      case 'pending_review': return 'text-yellow-600 bg-yellow-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'draft': return 'text-gray-600 bg-gray-100'
      default: return 'text-orange-600 bg-orange-100'
    }
  }

  const getPriorityColor = (priority: PublishingWorkflowItem['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getWorkflowStats = () => {
    const stats = {
      total: items.length,
      draft: items.filter(i => i.status === 'draft').length,
      pendingReview: items.filter(i => i.status === 'pending_review').length,
      approved: items.filter(i => i.status === 'approved').length,
      scheduled: items.filter(i => i.status === 'scheduled').length,
      published: items.filter(i => i.status === 'published').length,
      rejected: items.filter(i => i.status === 'rejected').length
    }
    return stats
  }

  const stats = getWorkflowStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Publishing Workflow</h2>
          <p className="text-gray-600">Manage content approval and publishing process</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {showAnalytics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
                <div className="text-sm text-gray-600">Draft</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.approved}</div>
                <div className="text-sm text-gray-600">Approved</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.scheduled}</div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.published}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                <div className="text-sm text-gray-600">Rejected</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="lesson">Lesson</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="package">Package</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions */}
      {showBulkActions && selectedItems.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                {canApprove && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkActionClick('approve')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                )}
                {canPublish && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkActionClick('publish')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                )}
                {canReject && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkActionClick('reject')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content Pipeline</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedItems.length === sortedItems.length && sortedItems.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedItems.map((item) => {
              const StatusIcon = getStatusIcon(item.status)
              const isSelected = selectedItems.includes(item.id)
              
              return (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg transition-all ${
                    isSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleItemSelect(item.id)}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {item.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                          {item.isUrgent && (
                            <Badge variant="destructive">Urgent</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {item.author.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.updatedAt)}
                          </div>
                          {item.wordCount && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {item.wordCount} words
                            </div>
                          )}
                          {item.estimatedReadTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.estimatedReadTime} min read
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{item.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {item.previewUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(item.previewUrl, '_blank')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {item.liveUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(item.liveUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      
                      {canSchedule && item.status === 'approved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleScheduleClick(item)}
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                      )}
                      
                      {canPublish && item.status === 'approved' && (
                        <Button
                          size="sm"
                          onClick={() => handlePublishClick(item)}
                        >
                          <Globe className="w-4 h-4 mr-1" />
                          Publish
                        </Button>
                      )}
                      
                      {canApprove && item.status === 'pending_review' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApproveClick(item)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      
                      {canReject && ['pending_review', 'approved'].includes(item.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectClick(item)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {item.reviewNotes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{item.reviewNotes}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {sortedItems.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your filters or search terms'
                  : 'No content in the publishing workflow yet'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Modal */}
      {showScheduleModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Schedule Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="schedule-date">Date</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time">Time</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Publishing Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notify-subscribers"
                      checked={publishOptions.notifySubscribers}
                      onCheckedChange={(checked) => 
                        setPublishOptions(prev => ({ ...prev, notifySubscribers: !!checked }))
                      }
                    />
                    <Label htmlFor="notify-subscribers">Notify subscribers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="social-media-share"
                      checked={publishOptions.socialMediaShare}
                      onCheckedChange={(checked) => 
                        setPublishOptions(prev => ({ ...prev, socialMediaShare: !!checked }))
                      }
                    />
                    <Label htmlFor="social-media-share">Share on social media</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleSubmit}>
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Publish Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This will immediately publish "{selectedItem.title}" to the live site.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Label>Publishing Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publish-notify-subscribers"
                      checked={publishOptions.notifySubscribers}
                      onCheckedChange={(checked) => 
                        setPublishOptions(prev => ({ ...prev, notifySubscribers: !!checked }))
                      }
                    />
                    <Label htmlFor="publish-notify-subscribers">Notify subscribers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="publish-social-media-share"
                      checked={publishOptions.socialMediaShare}
                      onCheckedChange={(checked) => 
                        setPublishOptions(prev => ({ ...prev, socialMediaShare: !!checked }))
                      }
                    />
                    <Label htmlFor="publish-social-media-share">Share on social media</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPublishModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePublishSubmit} className="bg-green-600 hover:bg-green-700">
                  Publish Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reject Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reject-reason">Reason for rejection</Label>
                <Textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Explain why this content is being rejected..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleRejectSubmit}
                  disabled={!rejectReason.trim()}
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Approve Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="approve-notes">Approval notes (optional)</Label>
                <Textarea
                  id="approve-notes"
                  value={approveNotes}
                  onChange={(e) => setApproveNotes(e.target.value)}
                  placeholder="Add any notes about this approval..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowApproveModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApproveSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
