'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/cms/context/AuthContext'
import { RichTextEditor } from '@/cms/components/editor/RichTextEditor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentType } from '@/cms/lib/generated/prisma'
import { 
  BookOpen, 
  Save, 
  Eye, 
  Send,
  ArrowLeft,
  Plus,
  X,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Globe,
  Clock,
  BarChart3
} from 'lucide-react'

export default function NewCoursePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    coverImage: '',
    gallery: [] as string[],
    duration: '',
    level: 'BEGINNER',
    language: 'en',
    price: '',
    currency: 'USD',
    tags: [] as string[],
    categories: [] as string[],
    isFeatured: false,
    seoMeta: {
      title: '',
      description: '',
      keywords: '',
      ogImage: ''
    }
  })

  const [newTag, setNewTag] = useState('')
  const [newCategory, setNewCategory] = useState('')

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setCourseData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoMeta: {
        ...prev.seoMeta,
        title: title || prev.seoMeta.title
      }
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !courseData.tags.includes(newTag.trim())) {
      setCourseData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addCategory = () => {
    if (newCategory.trim() && !courseData.categories.includes(newCategory.trim())) {
      setCourseData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }))
      setNewCategory('')
    }
  }

  const removeCategory = (categoryToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }))
  }

  const handleSave = async (isDraft = true) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch('/api/cms/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...courseData,
          price: courseData.price ? parseFloat(courseData.price) : null,
          duration: courseData.duration ? parseInt(courseData.duration) : null
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save course')
      }

      setSuccess(isDraft ? 'Course draft saved successfully!' : 'Course created successfully!')
      
      // Redirect to course editor after creation
      setTimeout(() => {
        router.push(`/cms/courses/${result.id}`)
      }, 1500)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
            <p className="text-gray-600">Build engaging educational content</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => handleSave(true)} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave(false)} disabled={loading}>
            <BookOpen className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Course Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential course details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Course Title *
                      </label>
                      <Input
                        value={courseData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter course title"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Slug *
                      </label>
                      <Input
                        value={courseData.slug}
                        onChange={(e) => setCourseData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="course-url-slug"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Subtitle
                    </label>
                    <Input
                      value={courseData.subtitle}
                      onChange={(e) => setCourseData(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Course subtitle or tagline"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Short Description
                    </label>
                    <Textarea
                      value={courseData.shortDescription}
                      onChange={(e) => setCourseData(prev => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Brief course description (160 characters max)"
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {courseData.shortDescription.length}/160 characters
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Level
                      </label>
                      <Select value={courseData.level} onValueChange={(value) => setCourseData(prev => ({ ...prev, level: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEGINNER">Beginner</SelectItem>
                          <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                          <SelectItem value="ADVANCED">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Duration (minutes)
                      </label>
                      <Input
                        type="number"
                        value={courseData.duration}
                        onChange={(e) => setCourseData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Language
                      </label>
                      <Select value={courseData.language} onValueChange={(value) => setCourseData(prev => ({ ...prev, language: value }))}>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Price
                      </label>
                      <div className="flex">
                        <Select value={courseData.currency} onValueChange={(value) => setCourseData(prev => ({ ...prev, currency: value }))}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">$</SelectItem>
                            <SelectItem value="INR">₹</SelectItem>
                            <SelectItem value="EUR">€</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={courseData.price}
                          onChange={(e) => setCourseData(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="99.00"
                          className="ml-2"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>Detailed course description and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Long Description
                    </label>
                    <Textarea
                      value={courseData.longDescription}
                      onChange={(e) => setCourseData(prev => ({ ...prev, longDescription: e.target.value }))}
                      placeholder="Detailed course description, learning outcomes, and what students will gain..."
                      rows={8}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Media & Assets</CardTitle>
                  <CardDescription>Course images and media files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Cover Image URL
                    </label>
                    <Input
                      value={courseData.coverImage}
                      onChange={(e) => setCourseData(prev => ({ ...prev, coverImage: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {courseData.coverImage && (
                    <div className="border rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img 
                        src={courseData.coverImage} 
                        alt="Course cover" 
                        className="w-full max-w-xs h-48 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO & Metadata</CardTitle>
                  <CardDescription>Search engine optimization settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      SEO Title
                    </label>
                    <Input
                      value={courseData.seoMeta.title}
                      onChange={(e) => setCourseData(prev => ({ 
                        ...prev, 
                        seoMeta: { ...prev.seoMeta, title: e.target.value }
                      }))}
                      placeholder="SEO optimized title (60 chars max)"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {courseData.seoMeta.title.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Meta Description
                    </label>
                    <Textarea
                      value={courseData.seoMeta.description}
                      onChange={(e) => setCourseData(prev => ({ 
                        ...prev, 
                        seoMeta: { ...prev.seoMeta, description: e.target.value }
                      }))}
                      placeholder="SEO meta description (160 chars max)"
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {courseData.seoMeta.description.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Keywords
                    </label>
                    <Input
                      value={courseData.seoMeta.keywords}
                      onChange={(e) => setCourseData(prev => ({ 
                        ...prev, 
                        seoMeta: { ...prev.seoMeta, keywords: e.target.value }
                      }))}
                      placeholder="sanskrit, philosophy, vedanta (comma separated)"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags & Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Tags & Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tags */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Categories</label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add category"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                  />
                  <Button type="button" onClick={addCategory} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseData.categories.map((category) => (
                    <Badge key={category} variant="outline" className="flex items-center">
                      {category}
                      <button
                        onClick={() => removeCategory(category)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Course Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <Badge variant="outline">{courseData.level}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span>{courseData.duration || 'Not set'} {courseData.duration && 'minutes'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span>
                    {courseData.price ? `${courseData.currency} ${courseData.price}` : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tags:</span>
                  <span>{courseData.tags.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories:</span>
                  <span>{courseData.categories.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Preview Course
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Media
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add Lesson
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
