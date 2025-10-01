'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

interface AlignYourselfEditorProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    courses: Array<{
      id: string;
      title: string;
      description: string;
      link: string;
      icon: string;
    }>;
  };
  onChange: (content: any) => void;
}

export default function AlignYourselfEditor({ content, onChange }: AlignYourselfEditorProps) {
  // Add comprehensive null checks and default values
  const safeContent = {
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    description: content?.description || '',
    courses: content?.courses || []
  };

  const updateField = (field: string, value: string) => {
    onChange({
      ...safeContent,
      [field]: value
    });
  };

  const addCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      title: "New Course",
      description: "Course description",
      link: "/courses/new-course",
      icon: "book"
    };
    onChange({
      ...safeContent,
      courses: [...(safeContent.courses || []), newCourse]
    });
  };

  const updateCourse = (index: number, field: string, value: string) => {
    const updatedCourses = [...(safeContent.courses || [])];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    onChange({
      ...safeContent,
      courses: updatedCourses
    });
  };

  const removeCourse = (index: number) => {
    const updatedCourses = (safeContent.courses || []).filter((_, i) => i !== index);
    onChange({
      ...safeContent,
      courses: updatedCourses
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Align Yourself Section</CardTitle>
          <CardDescription>
            Edit the courses section that shows available courses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={safeContent.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter section title"
            />
          </div>
          
          <div>
            <Label htmlFor="subtitle">Section Subtitle</Label>
            <Textarea
              id="subtitle"
              value={safeContent.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter section subtitle"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="description">Section Description</Label>
            <Textarea
              id="description"
              value={safeContent.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Enter section description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                Manage the courses displayed in this section
              </CardDescription>
            </div>
            <Button onClick={addCourse} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(safeContent.courses || []).map((course, index) => (
              <Card key={course.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium">Course {index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCourse(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor={`course-title-${index}`}>Course Title</Label>
                    <Input
                      id={`course-title-${index}`}
                      value={course.title}
                      onChange={(e) => updateCourse(index, 'title', e.target.value)}
                      placeholder="Enter course title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`course-description-${index}`}>Description</Label>
                    <Textarea
                      id={`course-description-${index}`}
                      value={course.description}
                      onChange={(e) => updateCourse(index, 'description', e.target.value)}
                      placeholder="Enter course description"
                      rows={2}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`course-link-${index}`}>Link</Label>
                      <Input
                        id={`course-link-${index}`}
                        value={course.link}
                        onChange={(e) => updateCourse(index, 'link', e.target.value)}
                        placeholder="/courses/course-name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`course-icon-${index}`}>Icon</Label>
                      <Input
                        id={`course-icon-${index}`}
                        value={course.icon}
                        onChange={(e) => updateCourse(index, 'icon', e.target.value)}
                        placeholder="e.g., book, users, brain"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {(!safeContent.courses || safeContent.courses.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No courses added yet.</p>
                <p className="text-sm">Click "Add Course" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}