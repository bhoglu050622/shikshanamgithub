'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  Play,
  Pause,
  Calendar,
  User,
  FileText,
  GitBranch,
  Server,
  Zap,
  History,
  Settings,
  Plus,
  Eye,
  Trash2,
} from 'lucide-react'

interface PublishItem {
  id: string
  title: string
  type: 'page' | 'post' | 'product' | 'collection'
  status: 'pending' | 'publishing' | 'published' | 'failed' | 'scheduled'
  scheduledDate?: string
  author: string
  createdAt: string
  publishedAt?: string
  error?: string
  environment: 'staging' | 'production'
  priority: 'low' | 'medium' | 'high'
}

interface Release {
  id: string
  name: string
  version: string
  status: 'draft' | 'ready' | 'deploying' | 'deployed' | 'failed' | 'rolled_back'
  items: PublishItem[]
  createdAt: string
  deployedAt?: string
  author: string
  description: string
  environment: 'staging' | 'production'
}

const mockPublishQueue: PublishItem[] = [
  {
    id: '1',
    title: 'Introduction to Sanskrit Grammar',
    type: 'page',
    status: 'scheduled',
    scheduledDate: '2024-01-20T10:00:00Z',
    author: 'Dr. Priya Sharma',
    createdAt: '2024-01-15T10:30:00Z',
    environment: 'production',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Advanced Yoga Philosophy',
    type: 'post',
    status: 'pending',
    author: 'Rajesh Kumar',
    createdAt: '2024-01-14T15:45:00Z',
    environment: 'staging',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Sanskrit Learning Package',
    type: 'product',
    status: 'publishing',
    author: 'Meera Patel',
    createdAt: '2024-01-13T12:20:00Z',
    environment: 'production',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Vedic Wisdom Collection',
    type: 'collection',
    status: 'failed',
    author: 'Dr. Ananda',
    createdAt: '2024-01-12T14:15:00Z',
    error: 'Build failed: Missing dependencies',
    environment: 'production',
    priority: 'low'
  }
]

const mockReleases: Release[] = [
  {
    id: '1',
    name: 'Sanskrit Content Update',
    version: 'v1.2.3',
    status: 'deployed',
    items: mockPublishQueue.slice(0, 2),
    createdAt: '2024-01-15T10:30:00Z',
    deployedAt: '2024-01-15T11:00:00Z',
    author: 'Dr. Priya Sharma',
    description: 'Updated Sanskrit grammar content with new examples and exercises',
    environment: 'production'
  },
  {
    id: '2',
    name: 'Yoga Philosophy Expansion',
    version: 'v1.2.4',
    status: 'ready',
    items: mockPublishQueue.slice(1, 3),
    createdAt: '2024-01-14T15:45:00Z',
    author: 'Rajesh Kumar',
    description: 'Added new yoga philosophy content and meditation guides',
    environment: 'staging'
  },
  {
    id: '3',
    name: 'Product Catalog Update',
    version: 'v1.2.5',
    status: 'deploying',
    items: mockPublishQueue.slice(2, 4),
    createdAt: '2024-01-13T12:20:00Z',
    author: 'Meera Patel',
    description: 'Updated product catalog with new Sanskrit learning packages',
    environment: 'production'
  }
]

export default function PublishingPage() {
  const { user } = useAuth()
  const [publishQueue, setPublishQueue] = useState<PublishItem[]>(mockPublishQueue)
  const [releases, setReleases] = useState<Release[]>(mockReleases)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [createReleaseDialog, setCreateReleaseDialog] = useState(false)
  const [newRelease, setNewRelease] = useState({
    name: '',
    description: '',
    environment: 'staging' as 'staging' | 'production'
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      case 'publishing': return <Zap className="w-4 h-4 text-blue-500 animate-pulse" />
      case 'published': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />
      case 'scheduled': return <Calendar className="w-4 h-4 text-purple-500" />
      case 'ready': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'deploying': return <Zap className="w-4 h-4 text-blue-500 animate-pulse" />
      case 'deployed': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rolled_back': return <RotateCcw className="w-4 h-4 text-orange-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      publishing: 'bg-blue-100 text-blue-800',
      published: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      scheduled: 'bg-purple-100 text-purple-800',
      ready: 'bg-green-100 text-green-800',
      deploying: 'bg-blue-100 text-blue-800',
      deployed: 'bg-green-100 text-green-800',
      rolled_back: 'bg-orange-100 text-orange-800',
      draft: 'bg-gray-100 text-gray-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    }
    return variants[priority as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const handlePublishNow = (itemId: string) => {
    setPublishQueue(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'publishing' } : item
    ))
    
    // Simulate publishing
    setTimeout(() => {
      setPublishQueue(prev => prev.map(item => 
        item.id === itemId ? { ...item, status: 'published', publishedAt: new Date().toISOString() } : item
      ))
    }, 3000)
  }

  const handleSchedulePublish = (itemId: string, date: string) => {
    setPublishQueue(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'scheduled', scheduledDate: date } : item
    ))
  }

  const handleRetryPublish = (itemId: string) => {
    setPublishQueue(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'pending', error: undefined } : item
    ))
  }

  const handleCreateRelease = () => {
    if (selectedItems.length === 0) return
    
    const newReleaseData: Release = {
      id: Date.now().toString(),
      name: newRelease.name,
      version: `v1.${releases.length + 1}.0`,
      status: 'draft',
      items: publishQueue.filter(item => selectedItems.includes(item.id)),
      createdAt: new Date().toISOString(),
      author: user?.username || 'Unknown',
      description: newRelease.description,
      environment: newRelease.environment
    }
    
    setReleases(prev => [newReleaseData, ...prev])
    setCreateReleaseDialog(false)
    setNewRelease({ name: '', description: '', environment: 'staging' })
    setSelectedItems([])
  }

  const handleDeployRelease = (releaseId: string) => {
    setReleases(prev => prev.map(release => 
      release.id === releaseId ? { ...release, status: 'deploying' } : release
    ))
    
    // Simulate deployment
    setTimeout(() => {
      setReleases(prev => prev.map(release => 
        release.id === releaseId ? { 
          ...release, 
          status: 'deployed', 
          deployedAt: new Date().toISOString() 
        } : release
      ))
    }, 5000)
  }

  const handleRollbackRelease = (releaseId: string) => {
    setReleases(prev => prev.map(release => 
      release.id === releaseId ? { ...release, status: 'rolled_back' } : release
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Publishing & Deployment</h1>
          <p className="text-gray-600">Manage content publishing, releases, and deployments</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedItems.length > 0 && (
            <Button onClick={() => setCreateReleaseDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Release
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="queue">Publish Queue</TabsTrigger>
          <TabsTrigger value="releases">Releases</TabsTrigger>
          <TabsTrigger value="history">Deployment History</TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="space-y-6">
          {/* Publish Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Publish Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishQueue.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, item.id])
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== item.id))
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <Badge className={getStatusBadge(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge className={getPriorityBadge(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Server className="w-4 h-4" />
                        <span>{item.environment}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      {item.scheduledDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(item.scheduledDate).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {item.error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2 text-red-800">
                          <XCircle className="w-4 h-4" />
                          <span className="font-medium">Error:</span>
                        </div>
                        <p className="text-red-700 text-sm mt-1">{item.error}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {item.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => handlePublishNow(item.id)}>
                            <Send className="w-4 h-4 mr-2" />
                            Publish Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                          </Button>
                        </>
                      )}
                      {item.status === 'failed' && (
                        <Button size="sm" onClick={() => handleRetryPublish(item.id)}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Retry
                        </Button>
                      )}
                      {item.status === 'scheduled' && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="releases" className="space-y-6">
          {/* Releases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                Releases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {releases.map((release) => (
                  <div key={release.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{release.name}</h3>
                        <p className="text-sm text-gray-600">{release.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(release.status)}
                        <Badge className={getStatusBadge(release.status)}>
                          {release.status}
                        </Badge>
                        <Badge variant="outline">{release.version}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{release.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Server className="w-4 h-4" />
                        <span>{release.environment}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(release.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>{release.items.length} items</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {release.status === 'ready' && (
                        <Button size="sm" onClick={() => handleDeployRelease(release.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Deploy
                        </Button>
                      )}
                      {release.status === 'deployed' && (
                        <Button variant="outline" size="sm" onClick={() => handleRollbackRelease(release.id)}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Rollback
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Deployment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Deployment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {releases.filter(r => r.status === 'deployed' || r.status === 'rolled_back').map((release) => (
                  <div key={release.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{release.name}</h3>
                        <p className="text-sm text-gray-600">{release.version}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(release.status)}
                        <Badge className={getStatusBadge(release.status)}>
                          {release.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{release.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Server className="w-4 h-4" />
                        <span>{release.environment}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{release.deployedAt ? new Date(release.deployedAt).toLocaleString() : 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>{release.items.length} items</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Release Dialog */}
      <Dialog open={createReleaseDialog} onOpenChange={setCreateReleaseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Release</DialogTitle>
            <DialogDescription>
              Group selected items into a release for deployment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Release Name</label>
              <Input
                value={newRelease.name}
                onChange={(e) => setNewRelease(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Sanskrit Content Update"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={newRelease.description}
                onChange={(e) => setNewRelease(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this release includes..."
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Environment</label>
              <Select value={newRelease.environment} onValueChange={(value: any) => setNewRelease(prev => ({ ...prev, environment: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Selected Items ({selectedItems.length})</h4>
              <div className="space-y-1">
                {publishQueue.filter(item => selectedItems.includes(item.id)).map(item => (
                  <div key={item.id} className="text-sm text-gray-600">
                    • {item.title} ({item.type})
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setCreateReleaseDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRelease}>
              Create Release
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
