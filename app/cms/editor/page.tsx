'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  BookOpen, 
  Package, 
  Save, 
  Eye, 
  Send,
  ArrowLeft,
  Image,
  Link,
  Code,
  List,
  Quote,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo
} from 'lucide-react'

interface ContentData {
  id?: string
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  type: 'course' | 'lesson' | 'blog' | 'package'
  tags: string[]
  categories: string[]
  metadata: {
    seoTitle?: string
    seoDescription?: string
    featuredImage?: string
    author?: string
    publishDate?: string
  }
}

export default function EditorPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [contentData, setContentData] = useState<ContentData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'DRAFT',
    type: 'blog',
    tags: [],
    categories: [],
    metadata: {}
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [newCategory, setNewCategory] = useState('')

  const contentType = searchParams.get('type') as 'course' | 'lesson' | 'blog' | 'package' || 'blog'
  const contentId = searchParams.get('id')

  useEffect(() => {
    if (contentId) {
      // Load existing content
      loadContent(contentId)
    } else {
      // Set default type
      setContentData(prev => ({ ...prev, type: contentType }))
    }
  }, [contentId, contentType, loadContent])

  const loadContent = async (id: string) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('cmsAccessToken')
      const endpoint = `/api/cms/${contentData.type}s/${id}`
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setContentData(data)
      } else {
        console.error('Failed to load content')
      }
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setContentData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !contentData.tags.includes(newTag.trim())) {
      setContentData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setContentData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addCategory = () => {
    if (newCategory.trim() && !contentData.categories.includes(newCategory.trim())) {
      setContentData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }))
      setNewCategory('')
    }
  }

  const removeCategory = (categoryToRemove: string) => {
    setContentData(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category !== categoryToRemove)
    }))
  }

  const saveContent = async (status: 'DRAFT' | 'PUBLISHED' = 'DRAFT') => {
    try {
      setSaving(true)
      const token = localStorage.getItem('cmsAccessToken')
      const endpoint = contentId 
        ? `/api/cms/${contentData.type}s/${contentId}`
        : `/api/cms/${contentData.type}s`
      
      const method = contentId ? 'PUT' : 'POST'
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contentData,
          status
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (!contentId) {
          router.push(`/cms/editor?id=${data.id}&type=${contentData.type}`)
        }
        // Show success message
        console.log('Content saved successfully')
      } else {
        console.error('Failed to save content')
      }
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setSaving(false)
    }
  }

  const previewContent = () => {
    // Open preview in new tab
    const previewUrl = contentId 
      ? `/preview/${contentData.type}/${contentId}`
      : `/preview/${contentData.type}/draft`
    window.open(previewUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {contentId ? 'Edit' : 'Create'} {contentData.type.charAt(0).toUpperCase() + contentData.type.slice(1)}
            </h1>
            <p className="text-gray-600">
              {contentId ? 'Edit your content' : 'Create new content'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={previewContent}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button 
            variant="outline"
            onClick={() => saveContent('DRAFT')}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button 
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => saveContent('PUBLISHED')}
            disabled={saving}
          >
            <Send className="w-4 h-4 mr-2" />
            {saving ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  value={contentData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter content title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <Input
                  value={contentData.slug}
                  onChange={(e) => setContentData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={contentData.excerpt}
                  onChange={(e) => setContentData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of your content"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="visual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="visual">Visual Editor</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                </TabsList>
                <TabsContent value="visual" className="space-y-4">
                  {/* Toolbar */}
                  <div className="flex items-center space-x-2 p-2 border rounded-lg">
                    <Button variant="outline" size="sm">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Underline className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <Button variant="outline" size="sm">
                      <AlignLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlignCenter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlignRight className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <Button variant="outline" size="sm">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Quote className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Image className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <Button variant="outline" size="sm">
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Redo className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Editor */}
                  <Textarea
                    value={contentData.content}
                    onChange={(e) => setContentData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Start writing your content..."
                    rows={20}
                    className="min-h-[500px]"
                  />
                </TabsContent>
                <TabsContent value="html">
                  <Textarea
                    value={contentData.content}
                    onChange={(e) => setContentData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter HTML content..."
                    rows={20}
                    className="min-h-[500px] font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select 
                value={contentData.status} 
                onValueChange={(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') => 
                  setContentData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {contentData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Add category"
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                />
                <Button onClick={addCategory} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {contentData.categories.map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer" onClick={() => removeCategory(category)}>
                    {category} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <Input
                  value={contentData.metadata.seoTitle || ''}
                  onChange={(e) => setContentData(prev => ({ 
                    ...prev, 
                    metadata: { ...prev.metadata, seoTitle: e.target.value }
                  }))}
                  placeholder="SEO optimized title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <Textarea
                  value={contentData.metadata.seoDescription || ''}
                  onChange={(e) => setContentData(prev => ({ 
                    ...prev, 
                    metadata: { ...prev.metadata, seoDescription: e.target.value }
                  }))}
                  placeholder="SEO description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}