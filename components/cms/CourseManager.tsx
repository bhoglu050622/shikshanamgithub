'use client'

import React, { useState } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { useCourses, useCourse } from '@/cms/lib/core/hooks'
import { useCMSRealtime, useEntityRealtime } from '@/cms/lib/core/realtime-hooks'
import { CreateCourseData, UpdateCourseData } from '@/cms/lib/core/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface CourseManagerProps {
  className?: string
}

export function CourseManager({ className }: CourseManagerProps) {
  const { user } = useAuth()
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingCourse, setEditingCourse] = useState<string | null>(null)

  // Real-time connection status
  const { isConnected, lastEvent } = useCMSRealtime()

  // Fetch courses with real-time updates
  const {
    courses,
    isLoading: coursesLoading,
    error: coursesError,
    refetch: refetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    unpublishCourse
  } = useCourses({ limit: 20 }, user)

  // Fetch selected course with real-time updates
  const {
    data: selectedCourse,
    isLoading: courseLoading,
    error: courseError,
    setData: setSelectedCourse
  } = useCourse(selectedCourseId || '', user)

  // Real-time updates for selected course
  const { data: realtimeCourse, setData: setRealtimeCourse } = useEntityRealtime('course', selectedCourseId || '', selectedCourse)

  // Course form state
  const [formData, setFormData] = useState<CreateCourseData>({
    title: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    level: 'BEGINNER',
    language: 'en',
    currency: 'USD',
    tags: [],
    categories: [],
    isFeatured: false
  })

  const handleCreateCourse = async () => {
    try {
      await createCourse(formData)
      setIsCreating(false)
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
        longDescription: '',
        level: 'BEGINNER',
        language: 'en',
        currency: 'USD',
        tags: [],
        categories: [],
        isFeatured: false
      })
    } catch (error) {
      console.error('Failed to create course:', error)
    }
  }

  const handleUpdateCourse = async (id: string, data: UpdateCourseData) => {
    try {
      await updateCourse(data)
      setEditingCourse(null)
    } catch (error) {
      console.error('Failed to update course:', error)
    }
  }

  const handleDeleteCourse = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id)
        if (selectedCourseId === id) {
          setSelectedCourseId(null)
        }
      } catch (error) {
        console.error('Failed to delete course:', error)
      }
    }
  }

  const handlePublishCourse = async (id: string) => {
    try {
      await publishCourse(id)
    } catch (error) {
      console.error('Failed to publish course:', error)
    }
  }

  const handleUnpublishCourse = async (id: string) => {
    try {
      await unpublishCourse(id)
    } catch (error) {
      console.error('Failed to unpublish course:', error)
    }
  }

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to manage courses.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Real-time status indicator */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm text-muted-foreground">
          {isConnected ? 'Real-time connected' : 'Real-time disconnected'}
        </span>
        {lastEvent && (
          <Badge variant="outline" className="text-xs">
            Last update: {new Date(lastEvent.timestamp).toLocaleTimeString()}
          </Badge>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Create Course Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Course title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="course-slug"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Short Description</label>
              <Input
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief description"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Long Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Detailed description"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateCourse}>
                Create Course
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {coursesError && (
        <Alert variant="destructive">
          <AlertDescription>
            {coursesError}
          </AlertDescription>
        </Alert>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coursesLoading ? (
          <div className="col-span-full flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          courses?.data.map((course) => (
            <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="flex gap-1">
                    <Badge variant={course.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                    {course.isFeatured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {course.shortDescription}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Level:</span> {course.level}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Lessons:</span> {course._count?.lessons || 0}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Created:</span> {new Date(course.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCourseId(course.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingCourse(course.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  {course.status === 'PUBLISHED' ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUnpublishCourse(course.id)}
                    >
                      <EyeOff className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePublishCourse(course.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Course Details Modal */}
      {selectedCourseId && selectedCourse && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{selectedCourse.title}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedCourseId(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Slug:</span> {selectedCourse.slug}
              </div>
              <div>
                <span className="font-medium">Status:</span> {selectedCourse.status}
              </div>
              <div>
                <span className="font-medium">Level:</span> {selectedCourse.level}
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1">{selectedCourse.longDescription}</p>
              </div>
              {selectedCourse.lessons && selectedCourse.lessons.length > 0 && (
                <div>
                  <span className="font-medium">Lessons:</span>
                  <ul className="mt-1 list-disc list-inside">
                    {selectedCourse.lessons.map((lesson) => (
                      <li key={lesson.id}>{lesson.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {courses?.pagination && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={courses.pagination.page === 1}
            onClick={() => refetchCourses()}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {courses.pagination.page} of {courses.pagination.pages}
          </span>
          <Button
            variant="outline"
            disabled={courses.pagination.page === courses.pagination.pages}
            onClick={() => refetchCourses()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
