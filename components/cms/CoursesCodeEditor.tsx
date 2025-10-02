'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  RefreshCw, 
  Download, 
  Upload, 
  Code, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Users,
  Clock,
  Star,
  DollarSign
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  subtitle: string;
  instructor: string;
  language: string;
  price: string;
  originalPrice?: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: string;
  checkoutLink: string;
  contactNumber: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  learningObjectives: string[];
  keyHighlights: string[];
  syllabus: Array<{
    id: number;
    title: string;
    type: string;
    duration: string;
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    rating: number;
    comment: string;
    verified: boolean;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  requirements: string[];
  outcomes: string[];
  instructorBio: string;
  tags: string[];
  category: string;
  difficulty: string;
  subtitles: string[];
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileFriendly: boolean;
  supportIncluded: boolean;
}

interface CoursesCodeEditorProps {
  onSave?: (courses: Course[]) => void;
  onPreview?: (course: Course) => void;
}

export default function CoursesCodeEditor({ onSave, onPreview }: CoursesCodeEditorProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load courses data
  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cms/courses?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const result = await response.json();
      
      if (result.success && result.data) {
        setCourses(result.data);
        setCode(JSON.stringify(result.data, null, 2));
        console.log('Loaded courses:', result.data.length);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      setError('Failed to load courses data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Save courses data
  const saveCourses = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate JSON
      const parsedCourses = JSON.parse(code);
      if (!Array.isArray(parsedCourses)) {
        throw new Error('Courses data must be an array');
      }

      // Validate course structure
      for (const course of parsedCourses) {
        if (!course.id || !course.title || !course.instructor) {
          throw new Error('Each course must have id, title, and instructor');
        }
      }

      // Save to API
      const response = await fetch('/api/cms/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courses: parsedCourses })
      });

      if (!response.ok) {
        throw new Error('Failed to save courses');
      }

      setCourses(parsedCourses);
      setSuccess('Courses saved successfully!');
      
      if (onSave) {
        onSave(parsedCourses);
      }
    } catch (error) {
      console.error('Error saving courses:', error);
      setError(error instanceof Error ? error.message : 'Failed to save courses');
    } finally {
      setSaving(false);
    }
  };

  // Download courses data
  const downloadCourses = () => {
    const dataStr = JSON.stringify(courses, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'courses-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Upload courses data
  const uploadCourses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        setCode(content);
        setError(null);
      } catch (error) {
        setError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Courses Code Editor</h2>
          <p className="text-gray-600 mt-1">Edit courses data directly in JSON format</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadCourses} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={downloadCourses}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={uploadCourses}
              className="hidden"
            />
          </label>
          <Button onClick={saveCourses} disabled={saving}>
            <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Course List</TabsTrigger>
          <TabsTrigger value="code">Code Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Course List Tab */}
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Courses ({courses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-gray-600 mt-1">{course.subtitle}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.instructor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {course.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={course.status === 'available' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onPreview) onPreview(course);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Code Editor Tab */}
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                JSON Code Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 border rounded-lg font-mono text-sm"
                placeholder="Enter courses JSON data..."
                style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
              />
              <div className="mt-4 text-sm text-gray-500">
                <p>• Edit the JSON data directly in the textarea above</p>
                <p>• Use the Save button to apply changes</p>
                <p>• Use Download/Upload to backup and restore data</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          {selectedCourse ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedCourse.title}</CardTitle>
                <p className="text-gray-600">{selectedCourse.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Instructor</h4>
                    <p>{selectedCourse.instructor}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Duration</h4>
                    <p>{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Level</h4>
                    <p>{selectedCourse.level}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Price</h4>
                    <p>{selectedCourse.price}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold">Description</h4>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Features</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedCourse.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{feature.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Course Selected</h3>
                <p className="text-gray-500">Select a course from the Course List tab to preview it here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
