'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Upload,
  Image,
  Video,
  FileText,
  Music,
  Archive,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Edit,
  Copy,
  Eye,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCw,
  Crop,
  Palette,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  File,
  Folder,
  Plus,
  X,
  Zap,
  Cloud,
  HardDrive
} from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  originalName: string
  type: 'image' | 'video' | 'audio' | 'document' | 'archive'
  mimeType: string
  size: number
  url: string
  thumbnailUrl?: string
  duration?: number // for video/audio
  dimensions?: { width: number; height: number } // for images/videos
  status: 'uploading' | 'processing' | 'ready' | 'error'
  progress?: number
  altText?: string
  caption?: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

interface UploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}

interface MediaManagerProps {
  onSelect?: (file: MediaFile) => void
  onInsert?: (file: MediaFile) => void
  multiple?: boolean
  acceptedTypes?: string[]
  maxFileSize?: number // in MB
  showUpload?: boolean
  showLibrary?: boolean
  showProcessing?: boolean
}

export function MediaManager({
  onSelect,
  onInsert,
  multiple = false,
  acceptedTypes = ['image/*', 'video/*', 'audio/*', 'application/pdf'],
  maxFileSize = 100, // 100MB default
  showUpload = true,
  showLibrary = true,
  showProcessing = true
}: MediaManagerProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'type'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [activeTab, setActiveTab] = useState('library')
  const [dragOver, setDragOver] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Load media files on mount
  useEffect(() => {
    loadMediaFiles()
  }, [])

  const loadMediaFiles = async () => {
    try {
      // In a real implementation, this would fetch from your API
      const mockFiles: MediaFile[] = [
        {
          id: '1',
          name: 'sanskrit-lesson-1.jpg',
          originalName: 'Sanskrit Lesson 1.jpg',
          type: 'image',
          mimeType: 'image/jpeg',
          size: 2048576, // 2MB
          url: '/api/media/1',
          thumbnailUrl: '/api/media/1/thumbnail',
          dimensions: { width: 1920, height: 1080 },
          status: 'ready',
          altText: 'Sanskrit lesson cover image',
          caption: 'Introduction to Sanskrit script',
          tags: ['sanskrit', 'lesson', 'cover'],
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: '2',
          name: 'yoga-practice.mp4',
          originalName: 'Yoga Practice Session.mp4',
          type: 'video',
          mimeType: 'video/mp4',
          size: 52428800, // 50MB
          url: '/api/media/2',
          thumbnailUrl: '/api/media/2/thumbnail',
          duration: 1800, // 30 minutes
          dimensions: { width: 1280, height: 720 },
          status: 'ready',
          altText: 'Yoga practice video',
          caption: 'Morning yoga routine',
          tags: ['yoga', 'practice', 'video'],
          createdAt: new Date('2024-01-14'),
          updatedAt: new Date('2024-01-14')
        }
      ]
      setFiles(mockFiles)
    } catch (error) {
      console.error('Failed to load media files:', error)
    }
  }

  const handleFileUpload = async (fileList: FileList) => {
    const newUploads: UploadProgress[] = []
    
    Array.from(fileList).forEach(file => {
      // Validate file
      if (!isValidFile(file)) {
        return
      }

      const fileId = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      newUploads.push({
        fileId,
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      })

      // Start upload
      uploadFile(file, fileId)
    })

    setUploadProgress(prev => [...prev, ...newUploads])
  }

  const isValidFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File ${file.name} is too large. Maximum size is ${maxFileSize}MB.`)
      return false
    }

    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1))
      }
      return file.type === type
    })

    if (!isValidType) {
      alert(`File type ${file.type} is not supported.`)
      return false
    }

    return true
  }

  const uploadFile = async (file: File, fileId: string) => {
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        setUploadProgress(prev => 
          prev.map(upload => 
            upload.fileId === fileId 
              ? { ...upload, progress }
              : upload
          )
        )
      }

      // Mark as processing
      setUploadProgress(prev => 
        prev.map(upload => 
          upload.fileId === fileId 
            ? { ...upload, status: 'processing' }
            : upload
        )
      )

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create media file object
      const mediaFile: MediaFile = {
        id: fileId,
        name: file.name,
        originalName: file.name,
        type: getFileType(file.type),
        mimeType: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        status: 'ready',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Add to files list
      setFiles(prev => [mediaFile, ...prev])

      // Remove from upload progress
      setUploadProgress(prev => prev.filter(upload => upload.fileId !== fileId))

    } catch (error) {
      console.error('Upload failed:', error)
      setUploadProgress(prev => 
        prev.map(upload => 
          upload.fileId === fileId 
            ? { ...upload, status: 'error', error: 'Upload failed' }
            : upload
        )
      )
    }
  }

  const getFileType = (mimeType: string): MediaFile['type'] => {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType.startsWith('audio/')) return 'audio'
    if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document'
    return 'archive'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleFileSelect = (file: MediaFile) => {
    if (multiple) {
      setSelectedFiles(prev => 
        prev.includes(file.id) 
          ? prev.filter(id => id !== file.id)
          : [...prev, file.id]
      )
    } else {
      setSelectedFiles([file.id])
      onSelect?.(file)
    }
  }

  const handleInsert = (file: MediaFile) => {
    onInsert?.(file)
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || file.type === typeFilter
    return matchesSearch && matchesType
  })

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'date':
        comparison = a.createdAt.getTime() - b.createdAt.getTime()
        break
      case 'size':
        comparison = a.size - b.size
        break
      case 'type':
        comparison = a.type.localeCompare(b.type)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'image': return Image
      case 'video': return Video
      case 'audio': return Music
      case 'document': return FileText
      case 'archive': return Archive
      default: return File
    }
  }

  const getStatusIcon = (status: MediaFile['status']) => {
    switch (status) {
      case 'ready': return CheckCircle
      case 'processing': return Clock
      case 'error': return AlertCircle
      default: return Clock
    }
  }

  const getStatusColor = (status: MediaFile['status']) => {
    switch (status) {
      case 'ready': return 'text-green-600'
      case 'processing': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Manager</h2>
          <p className="text-gray-600">Upload and manage your media files</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {showLibrary && <TabsTrigger value="library">Media Library</TabsTrigger>}
          {showUpload && <TabsTrigger value="upload">Upload</TabsTrigger>}
          {showProcessing && <TabsTrigger value="processing">Processing</TabsTrigger>}
        </TabsList>

        {/* Media Library */}
        {showLibrary && (
          <TabsContent value="library" className="space-y-4">
            {/* Filters and Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                      <SelectItem value="archive">Archives</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                    const [field, order] = value.split('-')
                    setSortBy(field as any)
                    setSortOrder(order as any)
                  }}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="date-desc">Newest First</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="size-desc">Largest First</SelectItem>
                      <SelectItem value="size-asc">Smallest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Files Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' : 'space-y-2'}>
              {sortedFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                const StatusIcon = getStatusIcon(file.status)
                const isSelected = selectedFiles.includes(file.id)

                if (viewMode === 'grid') {
                  return (
                    <Card
                      key={file.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        isSelected ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                      }`}
                      onClick={() => handleFileSelect(file)}
                    >
                      <CardContent className="p-3">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                          {file.thumbnailUrl ? (
                            <img
                              src={file.thumbnailUrl}
                              alt={file.altText || file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FileIcon className="w-8 h-8 text-gray-400" />
                          )}
                          
                          {file.status === 'processing' && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div className="text-white text-center">
                                <RotateCw className="w-6 h-6 animate-spin mx-auto mb-1" />
                                <p className="text-xs">Processing</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="absolute top-2 right-2">
                            <StatusIcon className={`w-4 h-4 ${getStatusColor(file.status)}`} />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                          {file.duration && (
                            <p className="text-xs text-gray-500">
                              {formatDuration(file.duration)}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                } else {
                  return (
                    <Card
                      key={file.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? 'ring-2 ring-orange-500 bg-orange-50' : ''
                      }`}
                      onClick={() => handleFileSelect(file)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            {file.thumbnailUrl ? (
                              <img
                                src={file.thumbnailUrl}
                                alt={file.altText || file.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <FileIcon className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">{file.name}</p>
                              <StatusIcon className={`w-4 h-4 ${getStatusColor(file.status)}`} />
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{formatFileSize(file.size)}</span>
                              {file.duration && <span>{formatDuration(file.duration)}</span>}
                              <span>{file.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleInsert(file)
                              }}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }
              })}
            </div>

            {sortedFiles.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || typeFilter !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Upload your first file to get started'
                    }
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}

        {/* Upload Tab */}
        {showUpload && (
          <TabsContent value="upload">
            <Card>
              <CardContent className="pt-6">
                <div
                  ref={dropZoneRef}
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragOver 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop files here or click to upload
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports images, videos, audio, and documents up to {maxFileSize}MB
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Processing Tab */}
        {showProcessing && (
          <TabsContent value="processing">
            <Card>
              <CardHeader>
                <CardTitle>Processing Files</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadProgress.length === 0 ? (
                  <div className="text-center py-8">
                    <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No files are currently being processed</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {uploadProgress.map((upload) => (
                      <div key={upload.fileId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{upload.fileName}</span>
                          <Badge variant={
                            upload.status === 'complete' ? 'default' :
                            upload.status === 'error' ? 'destructive' :
                            'secondary'
                          }>
                            {upload.status}
                          </Badge>
                        </div>
                        <Progress value={upload.progress} className="h-2" />
                        {upload.error && (
                          <p className="text-sm text-red-600">{upload.error}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
