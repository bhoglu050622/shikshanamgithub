'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Eye,
  Clock,
  User,
  Calendar,
  RotateCcw,
  Copy,
  Share2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  History,
  GitBranch,
  Tag,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Globe,
  Lock,
  Unlock,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
  Plus,
  Minus,
  Maximize,
  Minimize
} from 'lucide-react'

interface ContentRevision {
  id: string
  version: number
  title: string
  status: 'draft' | 'pending_review' | 'approved' | 'needs_changes' | 'published'
  data: Record<string, any>
  previewToken?: string
  previewUrl?: string
  previewExpiresAt?: Date
  createdAt: Date
  createdBy: {
    id: string
    name: string
    avatar?: string
  }
  reviewedBy?: {
    id: string
    name: string
    avatar?: string
  }
  publishedBy?: {
    id: string
    name: string
    avatar?: string
  }
  reviewNotes?: string
  publishedAt?: Date
  changes: string[]
  isCurrent: boolean
}

interface PreviewSystemProps {
  contentType: string
  contentId: string
  currentData: Record<string, any>
  revisions: ContentRevision[]
  onSaveRevision: (data: Record<string, any>) => Promise<ContentRevision>
  onPublishRevision: (revisionId: string) => Promise<void>
  onRollbackToRevision: (revisionId: string) => Promise<void>
  onGeneratePreview: (revisionId: string) => Promise<{ token: string; url: string; expiresAt: Date }>
  onAddReviewComment: (revisionId: string, comment: string) => Promise<void>
  canPublish?: boolean
  canReview?: boolean
  canRollback?: boolean
}

export function PreviewSystem({
  contentType,
  contentId,
  currentData,
  revisions,
  onSaveRevision,
  onPublishRevision,
  onRollbackToRevision,
  onGeneratePreview,
  onAddReviewComment,
  canPublish = false,
  canReview = false,
  canRollback = false
}: PreviewSystemProps) {
  const [activeTab, setActiveTab] = useState('preview')
  const [selectedRevision, setSelectedRevision] = useState<ContentRevision | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [reviewComment, setReviewComment] = useState('')
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)
  const [isSavingRevision, setIsSavingRevision] = useState(false)

  // Set the current revision as selected by default
  useEffect(() => {
    const currentRevision = revisions.find(r => r.isCurrent)
    if (currentRevision) {
      setSelectedRevision(currentRevision)
    }
  }, [revisions])

  const handleSaveRevision = async () => {
    setIsSavingRevision(true)
    try {
      const newRevision = await onSaveRevision(currentData)
      setSelectedRevision(newRevision)
    } catch (error) {
      console.error('Failed to save revision:', error)
    } finally {
      setIsSavingRevision(false)
    }
  }

  const handleGeneratePreview = async (revision: ContentRevision) => {
    if (!revision.previewToken || !revision.previewUrl) {
      setIsGeneratingPreview(true)
      try {
        const previewData = await onGeneratePreview(revision.id)
        // Update the revision with preview data
        const updatedRevision = {
          ...revision,
          previewToken: previewData.token,
          previewUrl: previewData.url,
          previewExpiresAt: previewData.expiresAt
        }
        setSelectedRevision(updatedRevision)
      } catch (error) {
        console.error('Failed to generate preview:', error)
      } finally {
        setIsGeneratingPreview(false)
      }
    }
  }

  const handlePublishRevision = async (revision: ContentRevision) => {
    try {
      await onPublishRevision(revision.id)
    } catch (error) {
      console.error('Failed to publish revision:', error)
    }
  }

  const handleRollbackToRevision = async (revision: ContentRevision) => {
    try {
      await onRollbackToRevision(revision.id)
    } catch (error) {
      console.error('Failed to rollback to revision:', error)
    }
  }

  const handleAddReviewComment = async () => {
    if (!selectedRevision || !reviewComment.trim()) return
    
    try {
      await onAddReviewComment(selectedRevision.id, reviewComment)
      setReviewComment('')
    } catch (error) {
      console.error('Failed to add review comment:', error)
    }
  }

  const getStatusIcon = (status: ContentRevision['status']) => {
    switch (status) {
      case 'published': return CheckCircle
      case 'approved': return CheckCircle
      case 'pending_review': return Clock
      case 'needs_changes': return AlertCircle
      case 'draft': return FileText
      default: return XCircle
    }
  }

  const getStatusColor = (status: ContentRevision['status']) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100'
      case 'approved': return 'text-blue-600 bg-blue-100'
      case 'pending_review': return 'text-yellow-600 bg-yellow-100'
      case 'needs_changes': return 'text-orange-600 bg-orange-100'
      case 'draft': return 'text-gray-600 bg-gray-100'
      default: return 'text-red-600 bg-red-100'
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

  const getPreviewUrl = (revision: ContentRevision) => {
    if (revision.previewUrl) {
      return revision.previewUrl
    }
    return `/preview/${contentType}/${contentId}/${revision.id}`
  }

  const isPreviewExpired = (revision: ContentRevision) => {
    if (!revision.previewExpiresAt) return false
    return new Date() > revision.previewExpiresAt
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Preview & Versioning</h2>
          <p className="text-gray-600">Preview content and manage versions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
          <Button
            onClick={handleSaveRevision}
            disabled={isSavingRevision}
          >
            <FileText className="w-4 h-4 mr-2" />
            {isSavingRevision ? 'Saving...' : 'Save Revision'}
          </Button>
        </div>
      </div>

      <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Preview Area */}
        <div className={`${isFullscreen ? 'col-span-1' : 'lg:col-span-2'}`}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                  {selectedRevision && (
                    <Badge variant="outline">
                      v{selectedRevision.version}
                    </Badge>
                  )}
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <Select value={previewMode} onValueChange={(value: any) => setPreviewMode(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {selectedRevision && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectedRevision && handleGeneratePreview(selectedRevision)}
                      disabled={isGeneratingPreview}
                    >
                      {isGeneratingPreview ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <RefreshCw className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedRevision ? (
                <div className="space-y-4">
                  {/* Preview Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedRevision.status)}>
                        {selectedRevision.status.replace('_', ' ')}
                      </Badge>
                      {selectedRevision.isCurrent && (
                        <Badge variant="outline">Current</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {selectedRevision.previewUrl && !isPreviewExpired(selectedRevision) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(getPreviewUrl(selectedRevision), '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(getPreviewUrl(selectedRevision))}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  {/* Preview Frame */}
                  <div className={`border rounded-lg overflow-hidden ${
                    previewMode === 'mobile' ? 'max-w-sm mx-auto' :
                    previewMode === 'tablet' ? 'max-w-2xl mx-auto' :
                    'w-full'
                  }`}>
                    <div className="bg-gray-100 p-2 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-center text-sm text-gray-600">
                        {getPreviewUrl(selectedRevision)}
                      </div>
                    </div>
                    
                    <div className="bg-white min-h-96">
                      {selectedRevision.previewUrl && !isPreviewExpired(selectedRevision) ? (
                        <iframe
                          src={getPreviewUrl(selectedRevision)}
                          className="w-full h-96 border-0"
                          title={`Preview of ${selectedRevision.title}`}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-96 text-gray-500">
                          <div className="text-center">
                            <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-lg font-medium mb-2">No Preview Available</p>
                            <p className="text-sm mb-4">
                              {isPreviewExpired(selectedRevision) 
                                ? 'Preview has expired. Generate a new one.'
                                : 'Generate a preview to see how this content will look.'
                              }
                            </p>
                            <Button
                              onClick={() => handleGeneratePreview(selectedRevision)}
                              disabled={isGeneratingPreview}
                            >
                              {isGeneratingPreview ? (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-4 h-4 mr-2" />
                                  Generate Preview
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Created {formatDate(selectedRevision.createdAt)} by {selectedRevision.createdBy.name}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {canPublish && selectedRevision.status === 'approved' && (
                        <Button
                          onClick={() => handlePublishRevision(selectedRevision)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Publish
                        </Button>
                      )}
                      
                      {canRollback && !selectedRevision.isCurrent && (
                        <Button
                          variant="outline"
                          onClick={() => handleRollbackToRevision(selectedRevision)}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Rollback
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a revision to preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Version History */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {revisions.map((revision) => {
                  const StatusIcon = getStatusIcon(revision.status)
                  const isSelected = selectedRevision?.id === revision.id
                  
                  return (
                    <div
                      key={revision.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedRevision(revision)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">v{revision.version}</Badge>
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(revision.status).split(' ')[0]}`} />
                        </div>
                        {revision.isCurrent && (
                          <Badge variant="secondary" className="text-xs">Current</Badge>
                        )}
                      </div>
                      
                      <h4 className="font-medium text-sm mb-1">{revision.title}</h4>
                      
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {revision.createdBy.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(revision.createdAt)}
                        </div>
                      </div>
                      
                      {revision.changes.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Changes:</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {revision.changes.slice(0, 2).map((change, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {change}
                              </li>
                            ))}
                            {revision.changes.length > 2 && (
                              <li className="text-gray-500">
                                +{revision.changes.length - 2} more changes
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Review Comments */}
          {selectedRevision && canReview && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Review Comments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="review-comment">Add Comment</Label>
                  <Textarea
                    id="review-comment"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Add your review comment..."
                    rows={3}
                  />
                  <Button
                    onClick={handleAddReviewComment}
                    disabled={!reviewComment.trim()}
                    size="sm"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
                
                {selectedRevision.reviewNotes && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedRevision.reviewNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
