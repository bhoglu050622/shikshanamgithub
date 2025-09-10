'use client'

import React, { useState } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { useCourse } from '@/cms/lib/core/hooks'
import { SectionEditor } from './SectionEditor'
import { ContentType } from '@/cms/lib/generated/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Settings, Eye, Edit } from 'lucide-react'

interface CourseSectionEditorProps {
  courseId: string
  className?: string
}

export function CourseSectionEditor({ courseId, className }: CourseSectionEditorProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('sections')
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Fetch course data
  const { data: course, isLoading, error } = useCourse(courseId, user)

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Please log in to edit course sections.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Error loading course: {error}</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Course Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {course.title}
              </CardTitle>
              <p className="text-muted-foreground mt-1">{course.shortDescription}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant={course.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                {course.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
              >
                {isPreviewMode ? <Edit className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Level:</span> {course.level}
            </div>
            <div>
              <span className="font-medium">Language:</span> {course.language}
            </div>
            <div>
              <span className="font-medium">Lessons:</span> {course._count?.lessons || 0}
            </div>
            <div>
              <span className="font-medium">Created:</span> {new Date(course.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Sections
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-4">
          <SectionEditor
            contentType={ContentType.COURSE}
            contentId={courseId}
          />
        </TabsContent>

        <TabsContent value="lessons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              {course.lessons && course.lessons.length > 0 ? (
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium">{lesson.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {lesson.duration ? `${lesson.duration} minutes` : 'No duration set'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={lesson.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                          {lesson.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No lessons yet. Create your first lesson!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Course Title</label>
                  <p className="text-sm text-muted-foreground">{course.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <p className="text-sm text-muted-foreground">{course.slug}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Level</label>
                  <p className="text-sm text-muted-foreground">{course.level}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <p className="text-sm text-muted-foreground">{course.language}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <p className="text-sm text-muted-foreground">
                    {course.price ? `$${course.price}` : 'Free'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Featured</label>
                  <p className="text-sm text-muted-foreground">
                    {course.isFeatured ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>
              
              {course.tags && course.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {course.categories && course.categories.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Categories</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {course.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
