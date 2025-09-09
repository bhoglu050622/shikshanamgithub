'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Save,
  Eye,
  Send,
  Calendar,
  User,
  Globe,
  Tag,
  Image,
  Link,
  Bold,
  Italic,
  Underline,
  List,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Settings,
  FileText,
  Type,
  Palette,
  Layout,
} from 'lucide-react'

interface ContentBlock {
  id: string
  type: 'text' | 'heading' | 'image' | 'quote' | 'code' | 'list' | 'cta' | 'gallery'
  content: string
  props?: Record<string, any>
}

interface EditorState {
  title: string
  slug: string
  excerpt: string
  content: ContentBlock[]
  status: 'draft' | 'published' | 'scheduled'
  author: string
  locale: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  scheduledDate?: string
  featuredImage?: string
}

export default function EditorPage() {
  const { user } = useAuth()
  const [editorState, setEditorState] = useState<EditorState>({
    title: '',
    slug: '',
    excerpt: '',
    content: [
      { id: '1', type: 'text', content: 'Start writing your content here...' }
    ],
    status: 'draft',
    author: user?.username || '',
    locale: 'en',
    tags: [],
    seoTitle: '',
    seoDescription: '',
  })
  
  const [activeTab, setActiveTab] = useState('content')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (editorState.title || editorState.content.length > 0) {
        setIsAutoSaving(true)
        // Simulate auto-save
        setTimeout(() => {
          setIsAutoSaving(false)
          setLastSaved(new Date())
        }, 1000)
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSave)
  }, [editorState])

  const handleTitleChange = (value: string) => {
    setEditorState(prev => ({
      ...prev,
      title: value,
      slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      seoTitle: value
    }))
  }

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? '' : type === 'heading' ? 'New Heading' : type === 'quote' ? 'Quote text...' : type === 'code' ? '// Code here' : type === 'list' ? 'List item' : type === 'cta' ? 'Call to Action' : '',
    }
    
    setEditorState(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }))
  }

  const updateBlock = (id: string, content: string) => {
    setEditorState(prev => ({
      ...prev,
      content: prev.content.map(block =>
        block.id === id ? { ...block, content } : block
      )
    }))
  }

  const deleteBlock = (id: string) => {
    setEditorState(prev => ({
      ...prev,
      content: prev.content.filter(block => block.id !== id)
    }))
  }

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    setEditorState(prev => {
      const blocks = [...prev.content]
      const index = blocks.findIndex(block => block.id === id)
      
      if (direction === 'up' && index > 0) {
        [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]]
      } else if (direction === 'down' && index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]]
      }
      
      return { ...prev, content: blocks }
    })
  }

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className="text-2xl font-bold border-none outline-none w-full bg-transparent"
            placeholder="Heading..."
          />
        )
      case 'text':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className="w-full border-none outline-none resize-none bg-transparent min-h-[100px]"
            placeholder="Start writing..."
          />
        )
      case 'quote':
        return (
          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600">
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              className="w-full border-none outline-none resize-none bg-transparent"
              placeholder="Quote text..."
            />
          </blockquote>
        )
      case 'code':
        return (
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>
              <textarea
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                className="w-full border-none outline-none resize-none bg-transparent font-mono"
                placeholder="// Code here..."
              />
            </code>
          </pre>
        )
      case 'list':
        return (
          <ul className="list-disc list-inside">
            <li>
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, e.target.value)}
                className="border-none outline-none bg-transparent"
                placeholder="List item..."
              />
            </li>
          </ul>
        )
      case 'cta':
        return (
          <div className="bg-orange-100 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Call to Action</h3>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              className="w-full border-none outline-none resize-none bg-transparent"
              placeholder="CTA text..."
            />
            <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
              Action Button
            </Button>
          </div>
        )
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p>Block type: {block.type}</p>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              className="w-full border-none outline-none resize-none bg-transparent mt-2"
            />
          </div>
        )
    }
  }

  const handleSave = () => {
    setIsAutoSaving(true)
    // Simulate save
    setTimeout(() => {
      setIsAutoSaving(false)
      setLastSaved(new Date())
    }, 1000)
  }

  const handlePublish = () => {
    setEditorState(prev => ({ ...prev, status: 'published' }))
    handleSave()
  }

  const handleSchedule = () => {
    setEditorState(prev => ({ ...prev, status: 'scheduled' }))
    handleSave()
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Content Editor</h1>
          {isAutoSaving && (
            <Badge variant="outline" className="text-orange-600">
              Saving...
            </Badge>
          )}
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={handleSchedule}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button onClick={handlePublish}>
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mx-6 mt-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="flex-1 p-6 overflow-auto">
              <div className="max-w-4xl mx-auto">
                {/* Title */}
                <input
                  type="text"
                  value={editorState.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-3xl font-bold border-none outline-none w-full mb-4 bg-transparent"
                  placeholder="Enter title..."
                />

                {/* Content Blocks */}
                <div className="space-y-4">
                  {editorState.content.map((block, index) => (
                    <div key={block.id} className="group relative">
                      <div className="flex items-start space-x-2">
                        <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveBlock(block.id, 'up')}
                            disabled={index === 0}
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveBlock(block.id, 'down')}
                            disabled={index === editorState.content.length - 1}
                          >
                            ↓
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBlock(block.id)}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="flex-1">
                          {renderBlock(block)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Block Buttons */}
                <div className="mt-8 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-4">Add content block:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => addBlock('text')}>
                      <Type className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addBlock('heading')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Heading
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addBlock('image')}>
                      <Image className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addBlock('quote')}>
                      <Quote className="w-4 h-4 mr-2" />
                      Quote
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addBlock('code')}>
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addBlock('list')}>
                      <List className="w-4 h-4 mr-2" />
                      List
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addBlock('cta')}>
                      <Layout className="w-4 h-4 mr-2" />
                      CTA
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="flex-1 p-6 overflow-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={editorState.slug}
                        onChange={(e) => setEditorState(prev => ({ ...prev, slug: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={editorState.excerpt}
                        onChange={(e) => setEditorState(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={editorState.author}
                        onChange={(e) => setEditorState(prev => ({ ...prev, author: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="locale">Locale</Label>
                      <Select value={editorState.locale} onValueChange={(value) => setEditorState(prev => ({ ...prev, locale: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="sa">Sanskrit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {editorState.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                          <button
                            onClick={() => setEditorState(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== index) }))}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Add tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const value = e.currentTarget.value.trim()
                          if (value && !editorState.tags.includes(value)) {
                            setEditorState(prev => ({ ...prev, tags: [...prev.tags, value] }))
                            e.currentTarget.value = ''
                          }
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="flex-1 p-6 overflow-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="seo-title">SEO Title</Label>
                      <Input
                        id="seo-title"
                        value={editorState.seoTitle}
                        onChange={(e) => setEditorState(prev => ({ ...prev, seoTitle: e.target.value }))}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {editorState.seoTitle.length}/60 characters
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="seo-description">SEO Description</Label>
                      <Textarea
                        id="seo-description"
                        value={editorState.seoDescription}
                        onChange={(e) => setEditorState(prev => ({ ...prev, seoDescription: e.target.value }))}
                        rows={3}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {editorState.seoDescription.length}/160 characters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 p-6 overflow-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publishing Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={editorState.status} onValueChange={(value: any) => setEditorState(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {editorState.status === 'scheduled' && (
                      <div>
                        <Label htmlFor="scheduled-date">Scheduled Date</Label>
                        <Input
                          id="scheduled-date"
                          type="datetime-local"
                          value={editorState.scheduledDate}
                          onChange={(e) => setEditorState(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
