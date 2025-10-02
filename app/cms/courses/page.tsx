'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Edit, 
  Eye, 
  Trash2, 
  BookOpen,
  Clock,
  Users,
  Star,
  DollarSign,
  ArrowLeft,
  Save,
  RefreshCw,
  Code
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CourseEditor from '@/components/cms/CourseEditor';

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
  status: 'available' | 'coming-soon' | 'archived';
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
  instructorImage?: string;
  courseImage?: string;
  tags: string[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subtitles: string[];
  certificate: boolean;
  lifetimeAccess: boolean;
  mobileFriendly: boolean;
  supportIncluded: boolean;
  liveSessions: boolean;
  communityAccess: boolean;
  bonusMaterials: boolean;
  moneyBackGuarantee: boolean;
  earlyBirdDiscount: boolean;
  groupDiscount: boolean;
  paymentPlans: Array<{
    name: string;
    price: string;
    duration: string;
    features: string[];
  }>;
  comparison: any[];
  lastModified: Date;
  views: number;
  popularity: number;
}

const defaultCourses: Course[] = [];

export default function CoursesCMSAdmin() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'popularity'>('name');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'coming-soon' | 'archived'>('all');

  // Load courses from API
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
        console.log('Loaded courses:', result.data.length);
        setCourses(result.data);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'modified':
          return b.lastModified.getTime() - a.lastModified.getTime();
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setShowCourseEditor(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseEditor(true);
  };

  const handleUpdateCourse = (content: any) => {
    const updatedCourse: Course = {
      ...content,
      id: selectedCourse?.id || `course-${Date.now()}`,
      lastModified: new Date(),
      views: selectedCourse?.views || 0,
      popularity: selectedCourse?.popularity || 0
    };
    
    if (selectedCourse) {
      setCourses(courses.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      ));
    } else {
      setCourses([...courses, updatedCourse]);
    }
    setShowCourseEditor(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  if (showCourseEditor) {
    const defaultContent = {
      title: '',
      subtitle: '',
      instructor: '',
      language: 'Hindi',
      price: '',
      originalPrice: undefined,
      duration: '',
      level: '',
      rating: 0,
      reviewCount: 0,
      type: '',
      status: 'available' as const,
      checkoutLink: '',
      contactNumber: '',
      description: '',
      features: [],
      learningObjectives: [],
      keyHighlights: [],
      syllabus: [],
      testimonials: [],
      faq: [],
      requirements: [],
      outcomes: [],
      instructorBio: '',
      instructorImage: undefined,
      courseImage: undefined,
      tags: [],
      category: '',
      difficulty: 'beginner' as const,
      subtitles: [],
      certificate: false,
      lifetimeAccess: false,
      mobileFriendly: false,
      supportIncluded: false,
      liveSessions: false,
      communityAccess: false,
      bonusMaterials: false,
      moneyBackGuarantee: false,
      earlyBirdDiscount: false,
      groupDiscount: false,
      paymentPlans: [],
      comparison: []
    };

    return (
      <CourseEditor
        content={selectedCourse || defaultContent}
        onUpdate={handleUpdateCourse}
        courseId={selectedCourse?.id || 'new'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Courses Management</h1>
            <p className="text-gray-600 mt-2">Manage all your courses and their content</p>
          </div>
          <Button 
            variant="outline" 
            onClick={loadCourses}
            className="mr-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Link href="/cms/courses/code-editor">
            <Button variant="outline" className="mr-2">
              <Code className="h-4 w-4 mr-2" />
              Code Editor
            </Button>
          </Link>
          <Button onClick={handleAddCourse}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="coming-soon">Coming Soon</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="modified">Sort by Modified</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? undefined : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? undefined : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Courses Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{course.subtitle}</p>
                    </div>
                    <Badge variant={course.status === 'available' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        onClick={() => handleEditCourse(course)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/courses/${course.id}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first course.'}
            </p>
            <Button onClick={handleAddCourse}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
