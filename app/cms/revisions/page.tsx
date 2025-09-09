'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
  History,
  GitCompare,
  RotateCcw,
  Eye,
  User,
  Clock,
  FileText,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
} from 'lucide-react'

interface Revision {
  id: string
  contentId: string
  title: string
  content: string
  author: string
  timestamp: string
  changeSummary: string
  version: number
  status: 'current' | 'previous' | 'rollback'
  changes: {
    added: number
    removed: number
    modified: number
  }
}

interface ContentItem {
  id: string
  title: string
  type: 'page' | 'post' | 'product'
  currentVersion: number
  lastModified: string
  author: string
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Introduction to Sanskrit Grammar',
    type: 'page',
    currentVersion: 5,
    lastModified: '2024-01-15T10:30:00Z',
    author: 'Dr. Priya Sharma'
  },
  {
    id: '2',
    title: 'Advanced Yoga Philosophy',
    type: 'post',
    currentVersion: 3,
    lastModified: '2024-01-14T15:45:00Z',
    author: 'Rajesh Kumar'
  },
  {
    id: '3',
    title: 'Sanskrit Learning Package',
    type: 'product',
    currentVersion: 2,
    lastModified: '2024-01-13T12:20:00Z',
    author: 'Meera Patel'
  }
]

const mockRevisions: Revision[] = [
  {
    id: '1',
    contentId: '1',
    title: 'Introduction to Sanskrit Grammar',
    content: 'Updated content with new examples and exercises...',
    author: 'Dr. Priya Sharma',
    timestamp: '2024-01-15T10:30:00Z',
    changeSummary: 'Added new grammar examples and practice exercises',
    version: 5,
    status: 'current',
    changes: { added: 15, removed: 3, modified: 8 }
  },
  {
    id: '2',
    contentId: '1',
    title: 'Introduction to Sanskrit Grammar',
    content: 'Previous version with basic content...',
    author: 'Dr. Priya Sharma',
    timestamp: '2024-01-14T09:15:00Z',
    changeSummary: 'Fixed typos and improved formatting',
    version: 4,
    status: 'previous',
    changes: { added: 2, removed: 1, modified: 5 }
  },
  {
    id: '3',
    contentId: '1',
    title: 'Introduction to Sanskrit Grammar',
    content: 'Earlier version with initial content...',
    author: 'Dr. Priya Sharma',
    timestamp: '2024-01-13T14:20:00Z',
    changeSummary: 'Initial content creation',
    version: 3,
    status: 'previous',
    changes: { added: 25, removed: 0, modified: 0 }
  },
  {
    id: '4',
    contentId: '2',
    title: 'Advanced Yoga Philosophy',
    content: 'Latest version of yoga philosophy content...',
    author: 'Rajesh Kumar',
    timestamp: '2024-01-14T15:45:00Z',
    changeSummary: 'Expanded philosophical concepts section',
    version: 3,
    status: 'current',
    changes: { added: 12, removed: 2, modified: 6 }
  }
]

export default function RevisionsPage() {
  const { user } = useAuth()
  const [content, setContent] = useState<ContentItem[]>(mockContent)
  const [revisions, setRevisions] = useState<Revision[]>(mockRevisions)
  const [selectedContent, setSelectedContent] = useState<string>('')
  const [selectedRevisions, setSelectedRevisions] = useState<string[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [authorFilter, setAuthorFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')

  const filteredRevisions = revisions.filter(revision => {
    const matchesContent = !selectedContent || revision.contentId === selectedContent
    const matchesSearch = !searchTerm || 
      revision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      revision.changeSummary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAuthor = authorFilter === 'all' || revision.author === authorFilter
    
    return matchesContent && matchesSearch && matchesAuthor
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'previous': return <Clock className="w-4 h-4 text-gray-500" />
      case 'rollback': return <RotateCcw className="w-4 h-4 text-orange-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      current: 'bg-green-100 text-green-800',
      previous: 'bg-gray-100 text-gray-800',
      rollback: 'bg-orange-100 text-orange-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const handleCompare = () => {
    if (selectedRevisions.length === 2) {
      setCompareMode(true)
    }
  }

  const handleRollback = (revisionId: string) => {
    // Implement rollback logic
    console.log('Rolling back to revision:', revisionId)
  }

  const handleSelectRevision = (revisionId: string) => {
    if (selectedRevisions.includes(revisionId)) {
      setSelectedRevisions(selectedRevisions.filter(id => id !== revisionId))
    } else if (selectedRevisions.length < 2) {
      setSelectedRevisions([...selectedRevisions, revisionId])
    }
  }

  const uniqueAuthors = [...new Set(revisions.map(revision => revision.author))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Revisions</h1>
          <p className="text-gray-600">Track changes, compare versions, and manage content history</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedRevisions.length === 2 && (
            <Button onClick={handleCompare}>
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search revisions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedContent} onValueChange={setSelectedContent}>
              <SelectTrigger>
                <SelectValue placeholder="Content Item" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Content</SelectItem>
                {content.map(item => (
                  <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {uniqueAuthors.map(author => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {filteredRevisions.length} revisions
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.map(item => (
              <div
                key={item.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedContent === item.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedContent(selectedContent === item.id ? '' : item.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <Badge variant="outline">v{item.currentVersion}</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(item.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revisions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="w-5 h-5 mr-2" />
            Revision History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRevisions.map((revision) => (
              <div
                key={revision.id}
                className={`p-4 border rounded-lg ${
                  selectedRevisions.includes(revision.id) ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedRevisions.includes(revision.id)}
                        onChange={() => handleSelectRevision(revision.id)}
                        disabled={selectedRevisions.length >= 2 && !selectedRevisions.includes(revision.id)}
                        className="w-4 h-4"
                      />
                      <h3 className="font-medium">{revision.title}</h3>
                      <Badge className={getStatusBadge(revision.status)}>
                        {getStatusIcon(revision.status)}
                        <span className="ml-1">v{revision.version}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{revision.changeSummary}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{revision.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(revision.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>+{revision.changes.added} -{revision.changes.removed} ~{revision.changes.modified}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {revision.status !== 'current' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRollback(revision.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Rollback
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compare Dialog */}
      <Dialog open={compareMode} onOpenChange={setCompareMode}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Compare Revisions</DialogTitle>
            <DialogDescription>
              Side-by-side comparison of selected revisions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6">
            {selectedRevisions.map((revisionId, index) => {
              const revision = revisions.find(r => r.id === revisionId)
              if (!revision) return null
              
              return (
                <div key={revisionId} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Version {revision.version}</h3>
                    <Badge className={getStatusBadge(revision.status)}>
                      {getStatusIcon(revision.status)}
                      <span className="ml-1">{revision.status}</span>
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Author:</strong> {revision.author}</p>
                    <p><strong>Date:</strong> {new Date(revision.timestamp).toLocaleString()}</p>
                    <p><strong>Changes:</strong> +{revision.changes.added} -{revision.changes.removed} ~{revision.changes.modified}</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-auto">
                    <pre className="text-sm whitespace-pre-wrap">{revision.content}</pre>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setCompareMode(false)}>
              Close
            </Button>
            <Button>
              <RotateCcw className="w-4 h-4 mr-2" />
              Rollback to Selected
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
