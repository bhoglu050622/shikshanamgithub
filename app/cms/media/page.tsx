'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Edit,
  Copy,
  Eye,
  Image,
  Video,
  File,
  Folder,
  Plus,
  MoreHorizontal,
  Crop,
  RotateCw,
  Palette,
  Maximize,
} from 'lucide-react'

interface MediaItem {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio'
  url: string
  thumbnail?: string
  size: number
  dimensions?: { width: number; height: number }
  uploaded: string
  author: string
  tags: string[]
  alt?: string
  caption?: string
  folder: string
}

const mockMedia: MediaItem[] = [
  {
    id: '1',
    name: 'sanskrit-hero-banner.jpg',
    type: 'image',
    url: '/images/sanskrit-hero-banner.jpg',
    thumbnail: '/images/sanskrit-hero-banner-thumb.jpg',
    size: 2048576,
    dimensions: { width: 1920, height: 1080 },
    uploaded: '2024-01-15T10:30:00Z',
    author: 'Dr. Priya Sharma',
    tags: ['hero', 'banner', 'sanskrit'],
    alt: 'Sanskrit learning hero banner',
    caption: 'Beautiful Sanskrit script on traditional background',
    folder: 'heroes'
  },
  {
    id: '2',
    name: 'yoga-practice-video.mp4',
    type: 'video',
    url: '/videos/yoga-practice-video.mp4',
    thumbnail: '/videos/yoga-practice-thumb.jpg',
    size: 52428800,
    uploaded: '2024-01-14T15:45:00Z',
    author: 'Rajesh Kumar',
    tags: ['yoga', 'practice', 'video'],
    caption: 'Yoga practice demonstration',
    folder: 'videos'
  },
  {
    id: '3',
    name: 'sanskrit-grammar-guide.pdf',
    type: 'document',
    url: '/documents/sanskrit-grammar-guide.pdf',
    size: 1048576,
    uploaded: '2024-01-13T12:20:00Z',
    author: 'Meera Patel',
    tags: ['grammar', 'guide', 'pdf'],
    folder: 'documents'
  },
  {
    id: '4',
    name: 'meditation-audio.mp3',
    type: 'audio',
    url: '/audio/meditation-audio.mp3',
    size: 8388608,
    uploaded: '2024-01-12T14:15:00Z',
    author: 'Dr. Ananda',
    tags: ['meditation', 'audio', 'spiritual'],
    folder: 'audio'
  }
]

export default function MediaPage() {
  const { user } = useAuth()
  const [media, setMedia] = useState<MediaItem[]>(mockMedia)
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>(mockMedia)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [folderFilter, setFolderFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter media based on search and filters
  useEffect(() => {
    let filtered = media

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter)
    }

    if (folderFilter !== 'all') {
      filtered = filtered.filter(item => item.folder === folderFilter)
    }

    setFilteredMedia(filtered)
  }, [media, searchTerm, typeFilter, folderFilter])

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-8 h-8 text-blue-500" />
      case 'video': return <Video className="w-8 h-8 text-red-500" />
      case 'document': return <File className="w-8 h-8 text-green-500" />
      case 'audio': return <File className="w-8 h-8 text-purple-500" />
      default: return <File className="w-8 h-8 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    
    // Simulate upload process
    Array.from(files).forEach((file, index) => {
      setTimeout(() => {
        const newMedia: MediaItem = {
          id: Date.now().toString() + index,
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' :
                file.type.startsWith('audio/') ? 'audio' : 'document',
          url: URL.createObjectURL(file),
          size: file.size,
          uploaded: new Date().toISOString(),
          author: user?.username || 'Unknown',
          tags: [],
          folder: 'uploads'
        }
        
        setMedia(prev => [newMedia, ...prev])
        
        if (index === files.length - 1) {
          setIsUploading(false)
        }
      }, 1000 * (index + 1))
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredMedia.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id))
    }
  }

  const uniqueFolders = [...new Set(media.map(item => item.folder))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage your images, videos, documents, and other media files</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />
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
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Media Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>

            <Select value={folderFilter} onValueChange={setFolderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Folders</SelectItem>
                {uniqueFolders.map(folder => (
                  <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {filteredMedia.length} items
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {selectedItems.length} item(s) selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Grid/List */}
      <Card>
        <CardContent className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.alt || item.name || 'Media thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Selection checkbox */}
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectItem(item.id, e.target.checked)
                      }}
                      className="w-4 h-4"
                    />
                  </div>

                  {/* File info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="truncate">{item.name}</div>
                    <div>{formatFileSize(item.size)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleSelectItem(item.id, e.target.checked)
                    }}
                    className="w-4 h-4"
                  />
                  
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.alt || item.name || 'Media thumbnail'}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatFileSize(item.size)} • {item.type} • {new Date(item.uploaded).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.folder}</Badge>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Media Details Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedMedia?.name}</DialogTitle>
            <DialogDescription>
              Media details and editing options
            </DialogDescription>
          </DialogHeader>
          
          {selectedMedia && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Media Preview */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                  {selectedMedia.type === 'image' ? (
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.alt || selectedMedia.name || 'Media preview'}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      {getFileIcon(selectedMedia.type)}
                      <p className="mt-2 text-gray-600">{selectedMedia.name}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Crop className="w-4 h-4 mr-2" />
                    Crop
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCw className="w-4 h-4 mr-2" />
                    Rotate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Palette className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize className="w-4 h-4 mr-2" />
                    Resize
                  </Button>
                </div>
              </div>
              
              {/* Media Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Alt Text</label>
                  <Input
                    value={selectedMedia.alt || ''}
                    placeholder="Describe this image for accessibility"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Caption</label>
                  <Input
                    value={selectedMedia.caption || ''}
                    placeholder="Optional caption"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedMedia.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Input placeholder="Add tag..." />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Size:</span>
                    <p>{formatFileSize(selectedMedia.size)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                    <p>{selectedMedia.type}</p>
                  </div>
                  <div>
                    <span className="font-medium">Uploaded:</span>
                    <p>{new Date(selectedMedia.uploaded).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-medium">Author:</span>
                    <p>{selectedMedia.author}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Download</Button>
                  <Button variant="outline">Copy URL</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
