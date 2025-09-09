'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DraftManager, useAutoSave, useAnalytics } from '@/cms/lib/localStorage'
import { ContentType } from '@/cms/lib/generated/prisma'
import { 
  Save, 
  Eye, 
  Send, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle,
  Wifi,
  WifiOff
} from 'lucide-react'

interface EditorProps {
  contentType: ContentType
  contentId: string
  initialData?: any
  onSave?: (data: any) => Promise<void>
  onPreview?: (data: any) => Promise<string>
  onSubmitReview?: (data: any) => Promise<void>
}

interface CollaboratorCursor {
  id: string
  user: string
  avatar?: string
  position: number
  color: string
}

export function RichTextEditor({ 
  contentType, 
  contentId, 
  initialData = {},
  onSave,
  onPreview,
  onSubmitReview 
}: EditorProps) {
  const [data, setData] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [collaborators, setCollaborators] = useState<CollaboratorCursor[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const { trackUserAction } = useAnalytics()

  // Auto-save functionality
  useAutoSave(contentType, contentId, data, autoSaveEnabled && hasUnsavedChanges)

  // Simulate collaborative editing
  useEffect(() => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
    const users = ['Alice', 'Bob', 'Charlie', 'Diana']
    
    const updateCollaborators = () => {
      const activeCollaborators = Array.from({ length: Math.floor(Math.random() * 3) }, (_, i) => ({
        id: `collab-${i}`,
        user: users[i % users.length],
        avatar: `/avatars/${users[i % users.length].toLowerCase()}.jpg`,
        position: Math.floor(Math.random() * 100),
        color: colors[i % colors.length]
      }))
      setCollaborators(activeCollaborators)
    }

    updateCollaborators()
    const interval = setInterval(updateCollaborators, 15000)
    return () => clearInterval(interval)
  }, [])

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = DraftManager.getDraft(contentType, contentId)
    if (draft && draft.data) {
      setData({ ...initialData, ...draft.data })
      setHasUnsavedChanges(true)
    }
  }, [contentType, contentId, initialData])

  const handleDataChange = useCallback((field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }))
    setHasUnsavedChanges(true)
    
    // Track user action
    trackUserAction('content_edit', {
      contentType,
      contentId,
      field,
      timestamp: new Date().toISOString()
    })
  }, [contentType, contentId, trackUserAction])

  const handleSave = async () => {
    if (!onSave) return
    
    setIsSaving(true)
    try {
      await onSave(data)
      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      
      // Clear localStorage draft
      DraftManager.removeDraft(contentType, contentId)
      
      trackUserAction('content_save', {
        contentType,
        contentId,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = async () => {
    if (!onPreview) return
    
    try {
      const previewUrl = await onPreview(data)
      window.open(previewUrl, '_blank')
      
      trackUserAction('content_preview', {
        contentType,
        contentId,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Preview failed:', error)
    }
  }

  const handleSubmitReview = async () => {
    if (!onSubmitReview) return
    
    try {
      await onSubmitReview(data)
      trackUserAction('content_submit_review', {
        contentType,
        contentId,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Submit review failed:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <span className="capitalize">{contentType.toLowerCase()}</span> Editor
              {hasUnsavedChanges && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                  Unsaved changes
                </Badge>
              )}
            </CardTitle>
            
            <div className="flex items-center space-x-3">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-600" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-xs ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>

              {/* Auto-save Status */}
              {lastSaved && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}

              {/* Collaborators */}
              {collaborators.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div className="flex -space-x-1">
                    {collaborators.map((collab) => (
                      <Avatar key={collab.id} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={collab.avatar} />
                        <AvatarFallback 
                          className="text-xs"
                          style={{ backgroundColor: collab.color + '20', color: collab.color }}
                        >
                          {collab.user[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Editor Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Title
                </label>
                <Input
                  ref={titleRef}
                  value={data.title || ''}
                  onChange={(e) => handleDataChange('title', e.target.value)}
                  placeholder="Enter title..."
                  className="text-lg font-medium"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Content
                </label>
                <Textarea
                  ref={contentRef}
                  value={data.content || ''}
                  onChange={(e) => handleDataChange('content', e.target.value)}
                  placeholder="Start writing your content..."
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>

              {/* Live Collaboration Indicators */}
              {collaborators.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Currently editing:</span>
                    {collaborators.map((collab, index) => (
                      <Badge key={collab.id} variant="outline" className="text-xs">
                        <div 
                          className="w-2 h-2 rounded-full mr-1"
                          style={{ backgroundColor: collab.color }}
                        ></div>
                        {collab.user}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleSave}
                disabled={isSaving || !hasUnsavedChanges}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>

              <Button 
                variant="outline"
                onClick={handlePreview}
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <Button 
                variant="outline"
                onClick={handleSubmitReview}
                className="w-full"
                disabled={hasUnsavedChanges}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit for Review
              </Button>
            </CardContent>
          </Card>

          {/* Auto-save Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Auto-save</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Auto-save enabled</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                    className={autoSaveEnabled ? 'bg-green-50 text-green-700' : ''}
                  >
                    {autoSaveEnabled ? 'ON' : 'OFF'}
                  </Button>
                </div>
                
                {autoSaveEnabled && (
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Saves every 5 seconds</span>
                    </div>
                    <div>Stored locally for offline access</div>
                  </div>
                )}
                
                {!isOnline && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    Working offline - changes saved locally
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Version Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Version Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Version:</span>
                  <Badge variant="outline">v1.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-700">Today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modified:</span>
                  <span className="text-gray-700">
                    {lastSaved ? lastSaved.toLocaleTimeString() : 'Not saved'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
