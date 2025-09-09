'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/cms/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentType } from '@/cms/lib/generated/prisma'
import { DraftManager } from '@/cms/lib/localStorage'
import { 
  BookOpen, 
  Save, 
  Eye, 
  Send,
  ArrowLeft,
  Plus,
  X,
  Edit,
  Clock,
  User,
  Calendar
} from 'lucide-react'

interface Course {
  id: string
  title: string
  subtitle?: string
  slug: string
  shortDescription?: string
  longDescription?: string
  coverImage?: string
  duration?: number
  level: string
  language: string
  price?: number
  currency: string
  tags: string[]
  categories: string[]
  status: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  creator: {
    username: string
  }
  seoMeta?: {
    title?: string
    description?: string
    keywords?: string
  }
}

export default function EditCoursePage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('cmsAccessToken')
        const response = await fetch(`/api/cms/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          setCourse(data.course)
          
          // Check for localStorage draft
          const draft = DraftManager.getDraft(ContentType.COURSE, courseId)
          if (draft) {
            setCourse(prev => ({ ...prev!, ...draft.data }))
            setHasUnsavedChanges(true)
          }
        } else {
          setError('Failed to load course')
        }
      } catch (err) {
        setError('Error loading course')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  // Auto-save to localStorage
  useEffect(() => {
    if (course && hasUnsavedChanges) {
      const autoSaveInterval = setInterval(() => {
        DraftManager.saveDraft(ContentType.COURSE, courseId, course)
        setLastSaved(new Date())
      }, 5000)

      return () => clearInterval(autoSaveInterval)
    }
  }, [course, hasUnsavedChanges, courseId])

  const updateCourse = (field: string, value: any) => {
    setCourse(prev => prev ? { ...prev, [field]: value } : null)
    setHasUnsavedChanges(true)
  }

  const updateSeoMeta = (field: string, value: string) => {
    setCourse(prev => prev ? {
      ...prev,
      seoMeta: { ...prev.seoMeta, [field]: value }
    } : null)
    setHasUnsavedChanges(true)
  }

  const handleSave = async () => {
    if (!course) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('cmsAccessToken')
      const response = await fetch(`/api/cms/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(course)
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('Course saved successfully!')
        setHasUnsavedChanges(false)
        DraftManager.removeDraft(ContentType.COURSE, courseId)
        setCourse(result)
      } else {
        throw new Error(result.error || 'Failed to save course')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const addTag = (tag: string) => {
    if (tag.trim() && course && !course.tags.includes(tag.trim())) {
      updateCourse('tags', [...course.tags, tag.trim()])
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (course) {
      updateCourse('tags', course.tags.filter(tag => tag !== tagToRemove))
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription>Course not found or you don't have permission to edit it.</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/cms/courses')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
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
            onClick={() => router.push('/cms/courses')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
            <p className="text-gray-600">{course.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Clock className="w-3 h-3 mr-1" />
              Unsaved changes
            </Badge>
          )}
          {lastSaved && (
            <div className="text-xs text-gray-500">
              Auto-saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
          <Button variant="outline" disabled={saving}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={saving || !hasUnsavedChanges}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
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

      {/* Course Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className={
                course.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                course.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }>
                {course.status}
              </Badge>
              <Badge variant="outline">{course.level}</Badge>
              <Badge variant="outline">{course.language.toUpperCase()}</Badge>
              {course.isFeatured && (
                <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {course.creator.username}
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Updated {new Date(course.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Course Title *
                      </label>
                      <Input
                        value={course.title}
                        onChange={(e) => updateCourse('title', e.target.value)}
                        placeholder="Enter course title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Slug *
                      </label>
                      <Input
                        value={course.slug}
                        onChange={(e) => updateCourse('slug', e.target.value)}
                        placeholder="course-url-slug"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Subtitle
                    </label>
                    <Input
                      value={course.subtitle || ''}
                      onChange={(e) => updateCourse('subtitle', e.target.value)}
                      placeholder="Course subtitle"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Short Description
                    </label>
                    <Textarea
                      value={course.shortDescription || ''}
                      onChange={(e) => updateCourse('shortDescription', e.target.value)}
                      placeholder="Brief course description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Level
                      </label>
                      <Select value={course.level} onValueChange={(value) => updateCourse('level', value)}>
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
                        value={course.duration || ''}
                        onChange={(e) => updateCourse('duration', parseInt(e.target.value) || null)}
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Language
                      </label>
                      <Select value={course.language} onValueChange={(value) => updateCourse('language', value)}>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Long Description
                    </label>
                    <Textarea
                      value={course.longDescription || ''}
                      onChange={(e) => updateCourse('longDescription', e.target.value)}
                      placeholder="Detailed course description..."
                      rows={10}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Price
                      </label>
                      <div className="flex">
                        <Select value={course.currency} onValueChange={(value) => updateCourse('currency', value)}>
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
                          value={course.price || ''}
                          onChange={(e) => updateCourse('price', parseFloat(e.target.value) || null)}
                          placeholder="99.00"
                          className="ml-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={course.isFeatured}
                      onChange={(e) => updateCourse('isFeatured', e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Mark as featured course
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Search engine optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      SEO Title
                    </label>
                    <Input
                      value={course.seoMeta?.title || ''}
                      onChange={(e) => updateSeoMeta('title', e.target.value)}
                      placeholder="SEO optimized title"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(course.seoMeta?.title || '').length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Meta Description
                    </label>
                    <Textarea
                      value={course.seoMeta?.description || ''}
                      onChange={(e) => updateSeoMeta('description', e.target.value)}
                      placeholder="SEO meta description"
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {(course.seoMeta?.description || '').length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Keywords
                    </label>
                    <Input
                      value={course.seoMeta?.keywords || ''}
                      onChange={(e) => updateSeoMeta('keywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                />
                <Button 
                  type="button" 
                  size="sm"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addTag(input.value)
                    input.value = ''
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
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
            </CardContent>
          </Card>

          {/* Course Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Course Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Modified:</span>
                  <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Author:</span>
                  <span>{course.creator.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={
                    course.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {course.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="w-4 h-4 mr-2" />
                Preview Course
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Submit for Review
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
