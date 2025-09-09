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
  Eye,
  Globe,
  Share,
  Copy,
  Smartphone,
  Tablet,
  Monitor,
  ExternalLink,
  Clock,
  User,
  Settings,
  RefreshCw,
  Link,
  QrCode,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
} from 'lucide-react'

interface PreviewEnvironment {
  id: string
  name: string
  url: string
  status: 'active' | 'building' | 'error' | 'expired'
  createdAt: string
  expiresAt?: string
  branch?: string
  commit?: string
  author: string
  type: 'content' | 'staging' | 'feature'
}

interface PreviewContent {
  id: string
  title: string
  type: 'page' | 'post' | 'product'
  status: 'draft' | 'published' | 'scheduled'
  previewUrl: string
  lastModified: string
  author: string
}

const mockEnvironments: PreviewEnvironment[] = [
  {
    id: '1',
    name: 'Production',
    url: 'https://shikshanam.com',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    author: 'System',
    type: 'content'
  },
  {
    id: '2',
    name: 'Staging',
    url: 'https://staging.shikshanam.com',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    author: 'Dr. Priya Sharma',
    type: 'staging'
  },
  {
    id: '3',
    name: 'Feature: Sanskrit Grammar Updates',
    url: 'https://feature-sanskrit-grammar.shikshanam.com',
    status: 'active',
    createdAt: '2024-01-14T15:45:00Z',
    expiresAt: '2024-01-21T15:45:00Z',
    branch: 'feature/sanskrit-grammar',
    commit: 'abc123',
    author: 'Rajesh Kumar',
    type: 'feature'
  },
  {
    id: '4',
    name: 'Content Preview: Yoga Philosophy',
    url: 'https://preview-yoga-philosophy.shikshanam.com',
    status: 'building',
    createdAt: '2024-01-13T12:20:00Z',
    author: 'Meera Patel',
    type: 'content'
  }
]

const mockContent: PreviewContent[] = [
  {
    id: '1',
    title: 'Introduction to Sanskrit Grammar',
    type: 'page',
    status: 'draft',
    previewUrl: '/preview/sanskrit-grammar',
    lastModified: '2024-01-15T10:30:00Z',
    author: 'Dr. Priya Sharma'
  },
  {
    id: '2',
    title: 'Advanced Yoga Philosophy',
    type: 'post',
    status: 'draft',
    previewUrl: '/preview/yoga-philosophy',
    lastModified: '2024-01-14T15:45:00Z',
    author: 'Rajesh Kumar'
  },
  {
    id: '3',
    title: 'Sanskrit Learning Package',
    type: 'product',
    status: 'scheduled',
    previewUrl: '/preview/sanskrit-package',
    lastModified: '2024-01-13T12:20:00Z',
    author: 'Meera Patel'
  }
]

export default function PreviewPage() {
  const { user } = useAuth()
  const [environments, setEnvironments] = useState<PreviewEnvironment[]>(mockEnvironments)
  const [content, setContent] = useState<PreviewContent[]>(mockContent)
  const [selectedEnvironment, setSelectedEnvironment] = useState<PreviewEnvironment | null>(null)
  const [selectedContent, setSelectedContent] = useState<PreviewContent | null>(null)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'building': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />
      case 'expired': return <AlertCircle className="w-4 h-4 text-orange-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      building: 'bg-blue-100 text-blue-800',
      error: 'bg-red-100 text-red-800',
      expired: 'bg-orange-100 text-orange-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      content: 'bg-blue-100 text-blue-800',
      staging: 'bg-purple-100 text-purple-800',
      feature: 'bg-green-100 text-green-800'
    }
    return variants[type as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const handleCreatePreview = () => {
    // Implement create preview logic
    console.log('Creating new preview environment')
  }

  const handleSharePreview = (environment: PreviewEnvironment) => {
    setShareUrl(environment.url)
    setShareDialogOpen(true)
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // Show toast notification
  }

  const generateQRCode = (url: string) => {
    // Implement QR code generation
    console.log('Generating QR code for:', url)
  }

  const getDeviceDimensions = () => {
    switch (deviceView) {
      case 'mobile': return { width: '375px', height: '667px' }
      case 'tablet': return { width: '768px', height: '1024px' }
      default: return { width: '100%', height: '600px' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Preview & Staging</h1>
          <p className="text-gray-600">Preview content changes and manage staging environments</p>
        </div>
        <Button onClick={handleCreatePreview}>
          <Plus className="w-4 h-4 mr-2" />
          Create Preview
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environments List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Preview Environments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {environments.map((env) => (
                  <div
                    key={env.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedEnvironment?.id === env.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedEnvironment(env)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{env.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(env.status)}
                        <Badge className={getStatusBadge(env.status)}>
                          {env.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Link className="w-4 h-4" />
                        <span className="truncate">{env.url}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{env.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(env.createdAt).toLocaleDateString()}</span>
                      </div>
                      {env.expiresAt && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Expires: {new Date(env.expiresAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <Badge className={getTypeBadge(env.type)}>
                        {env.type}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSharePreview(env)
                          }}
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(env.url, '_blank')
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Preview
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={deviceView} onValueChange={(value: any) => setDeviceView(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">
                        <div className="flex items-center">
                          <Monitor className="w-4 h-4 mr-2" />
                          Desktop
                        </div>
                      </SelectItem>
                      <SelectItem value="tablet">
                        <div className="flex items-center">
                          <Tablet className="w-4 h-4 mr-2" />
                          Tablet
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Mobile
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedEnvironment ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{selectedEnvironment.name}</h3>
                      <p className="text-sm text-gray-600">{selectedEnvironment.url}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSharePreview(selectedEnvironment)}
                      >
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(selectedEnvironment.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedEnvironment.url}
                      </div>
                    </div>
                    
                    <div 
                      className="bg-white"
                      style={{
                        width: getDeviceDimensions().width,
                        height: getDeviceDimensions().height,
                        margin: '0 auto',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <iframe
                        src={selectedEnvironment.url}
                        className="w-full h-full border-0"
                        title={`Preview of ${selectedEnvironment.name}`}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Environment</h3>
                  <p className="text-gray-600">Choose a preview environment from the list to see the live preview</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Previews */}
      <Card>
        <CardHeader>
          <CardTitle>Content Previews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1 mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(item.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Preview</DialogTitle>
            <DialogDescription>
              Share this preview environment with others
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preview URL</label>
              <div className="flex space-x-2">
                <Input value={shareUrl} readOnly />
                <Button
                  variant="outline"
                  onClick={() => handleCopyUrl(shareUrl)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">QR Code</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => generateQRCode(shareUrl)}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Code
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Share Options</h4>
              <div className="space-y-2 text-sm">
                <div>• Link expires in 7 days</div>
                <div>• Viewers can see live changes</div>
                <div>• No login required for preview</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleCopyUrl(shareUrl)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
