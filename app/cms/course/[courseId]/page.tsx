'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Code, 
  Copy, 
  CheckCircle,
  BookOpen,
  Clock,
  Star,
  Users,
  DollarSign,
  User,
  Globe,
  Phone,
  ExternalLink
} from 'lucide-react';
import EnhancedCodeEditor from '@/components/cms/EnhancedCodeEditor';

interface CourseData {
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
  features: string[];
  curriculum: {
    modules: Array<{
      moduleNumber: number;
      title: string;
      description: string;
      tag: string;
      totalTime: string;
      lessons: Array<{
        title: string;
        type: string;
        duration: string;
      }>;
    }>;
  };
  testimonials: Array<{
    name: string;
    quote: string;
    rating: number;
    role: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export default function IndividualCourseEditor() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadCourseData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cms/course/${courseId}`);
      const result = await response.json();
      
      if (result.success) {
        setCourseData(result.data);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to load course data' });
      }
    } catch (error) {
      console.error('Error loading course data:', error);
      setMessage({ type: 'error', text: 'Failed to load course data' });
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  const saveCourseData = async () => {
    if (!courseData) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/cms/course/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Course updated successfully!' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update course' });
      }
    } catch (error) {
      console.error('Error saving course data:', error);
      setMessage({ type: 'error', text: 'Failed to save course data' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-4">The requested course could not be found.</p>
          <Button onClick={() => router.push('/cms')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CMS
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/cms')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to CMS
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Editor</h1>
              <p className="text-gray-600 mt-1">{courseData.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => window.open(`/courses/${courseId}`, '_blank')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={saveCourseData}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {message.text}
            </div>
          </div>
        )}


        {/* Enhanced Code Editor */}
        <div className="bg-gray-50 rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Course Data Editor</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Edit the complete course data with syntax highlighting and validation.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (courseData) {
                      const formatted = JSON.stringify(courseData, null, 2);
                      navigator.clipboard.writeText(formatted);
                      setMessage({ type: 'success', text: 'Course data copied to clipboard!' });
                      setTimeout(() => setMessage(null), 3000);
                    }
                  }}
                  className="text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <EnhancedCodeEditor
              value={courseData ? JSON.stringify(courseData, null, 2) : '{}'}
              onChange={(value) => {
                try {
                  const newCourseData = JSON.parse(value);
                  setCourseData(newCourseData);
                  setMessage(null);
                } catch (error) {
                  setMessage({
                    type: 'error',
                    text: 'Invalid JSON syntax. Please check your formatting.'
                  });
                }
              }}
              onSave={saveCourseData}
              language="json"
              height="600px"
              placeholder="Enter course JSON data..."
              enableSearch={true}
              enableUndoRedo={true}
              enableAutoFormat={true}
              showLineNumbers={true}
            />
            {courseData && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Valid JSON with course data
                  </span>
                </div>
                <div className="mt-2 text-xs text-green-700">
                  Course: {courseData.title} | Instructor: {courseData.instructor} | Price: {courseData.price}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{courseData.level}</Badge>
                <Badge variant="outline">{courseData.language}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {courseData.duration}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                {courseData.instructor}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {courseData.rating} ({courseData.reviewCount} reviews)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-gray-900">{courseData.price}</div>
              {courseData.originalPrice && (
                <div className="text-sm text-gray-500 line-through">{courseData.originalPrice}</div>
              )}
              <Badge variant="outline">{courseData.type}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">Modules: {courseData.curriculum?.modules?.length || 0}</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Features: {courseData.features?.length || 0}</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">FAQs: {courseData.faq?.length || 0}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}