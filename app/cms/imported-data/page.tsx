'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  BookOpen, 
  Users, 
  School, 
  FileText, 
  MessageCircle,
  Star,
  Eye,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

import { 
  UniversalCMSProvider, 
  UniversalCMS,
  CMSCard,
  CMSButton,
  CMSText,
  CMSAdminPanel
} from '@/components/cms/UniversalCMS';

const sections = [
  { id: 'overview', name: 'Data Overview', icon: Database, description: 'Summary of all imported data' },
  { id: 'courses', name: 'Courses', icon: BookOpen, description: 'All course data and content' },
  { id: 'instructors', name: 'Instructors', icon: Users, description: 'Teacher and instructor profiles' },
  { id: 'schools', name: 'Schools', icon: School, description: 'School pages and content' },
  { id: 'blogs', name: 'Blogs', icon: FileText, description: 'Blog posts and articles' },
  { id: 'testimonials', name: 'Testimonials', icon: MessageCircle, description: 'User testimonials and reviews' }
];

function ImportedDataContent() {
  const [importedData, setImportedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadImportedData();
  }, []);

  const loadImportedData = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would fetch from the API
      // For now, we'll simulate the data structure
      const mockData = {
        overview: {
          totalCourses: 25,
          totalInstructors: 8,
          totalSchools: 3,
          totalBlogs: 15,
          totalTestimonials: 12,
          lastUpdated: new Date().toISOString()
        },
        courses: [
          {
            id: 'advaita-vedanta',
            title: 'Advaita Vedanta Darshan',
            description: 'A Journey Through Drig Drishya Viveka',
            instructor: 'Vishal Chaurasia',
            duration: '6 weeks',
            level: 'Intermediate',
            price: '₹1,999',
            featured: true
          },
          {
            id: 'emotional-intelligence',
            title: 'Emotional Intelligence with Samkhya Darshan',
            description: 'Reset Your Emotions Through Ancient Wisdom',
            instructor: 'Dr. Priya Sharma',
            duration: '8 weeks',
            level: 'Beginner',
            price: '₹2,499',
            featured: true
          }
        ],
        instructors: [
          {
            id: 'vishal-chaurasia',
            name: 'Vishal Chaurasia',
            title: 'Founder & Lead Instructor',
            bio: 'IIT Patna graduate with expertise in Sanskrit and Indian philosophy',
            specializations: ['Sanskrit', 'Vedanta', 'Yoga Darshan']
          }
        ],
        schools: [
          {
            id: 'sanskrit',
            name: 'School of Sanskrit',
            description: 'Master the ancient language of the Vedas',
            courses: 8,
            instructors: 3
          }
        ],
        blogs: [
          {
            id: 'blog-1',
            title: 'Understanding Sanskrit Grammar',
            category: 'Sanskrit',
            published: '2024-01-15',
            featured: true
          }
        ],
        testimonials: [
          {
            id: 'testimonial-1',
            name: 'Priya Sharma',
            text: 'The Sanskrit course has been life-changing',
            rating: 5,
            course: 'Sanskrit Basics'
          }
        ]
      };
      
      setImportedData(mockData);
    } catch (err) {
      setError('Failed to load imported data');
    } finally {
      setLoading(false);
    }
  };

  const runDataImport = async () => {
    try {
      setLoading(true);
      // This would call the actual import script
      alert('Data import started! Check the console for progress.');
      await loadImportedData();
    } catch (err) {
      setError('Failed to run data import');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <CMSText variant="secondary">Loading imported data...</CMSText>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CMSCard className="max-w-md">
          <div className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <CMSText variant="primary" as="h2" className="text-xl font-semibold mb-2">
              Error Loading Data
            </CMSText>
            <CMSText variant="secondary" className="mb-4">{error}</CMSText>
            <CMSButton onClick={loadImportedData}>
              Try Again
            </CMSButton>
          </div>
        </CMSCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CMS Admin Panel */}
      <CMSAdminPanel 
        pageId="imported-data"
        pageTitle="Imported Data Management"
        sections={sections}
      />

      {/* Main CMS Interface */}
      <UniversalCMS
        pageId="imported-data"
        pageTitle="Imported Data Management"
        sections={sections}
        onUpdate={() => {}}
      >
        {/* Data Overview */}
        <div className="space-y-8">
          {/* Import Status */}
          <CMSCard elementId="import-status" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Database className="w-6 h-6 text-blue-600" />
                <CMSText variant="primary" as="h2" className="text-2xl font-bold">
                  Data Import Status
                </CMSText>
              </div>
              <div className="flex space-x-2">
                <CMSButton variant="primary" onClick={runDataImport}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Re-import Data
                </CMSButton>
                <CMSButton variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </CMSButton>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CMSCard elementId="courses-count" className="text-center p-4">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <CMSText variant="accent" as="h3" className="text-2xl font-bold">
                  {importedData?.overview?.totalCourses || 0}
                </CMSText>
                <CMSText variant="secondary">Courses</CMSText>
              </CMSCard>
              
              <CMSCard elementId="instructors-count" className="text-center p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <CMSText variant="accent" as="h3" className="text-2xl font-bold">
                  {importedData?.overview?.totalInstructors || 0}
                </CMSText>
                <CMSText variant="secondary">Instructors</CMSText>
              </CMSCard>
              
              <CMSCard elementId="schools-count" className="text-center p-4">
                <School className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <CMSText variant="accent" as="h3" className="text-2xl font-bold">
                  {importedData?.overview?.totalSchools || 0}
                </CMSText>
                <CMSText variant="secondary">Schools</CMSText>
              </CMSCard>
              
              <CMSCard elementId="blogs-count" className="text-center p-4">
                <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <CMSText variant="accent" as="h3" className="text-2xl font-bold">
                  {importedData?.overview?.totalBlogs || 0}
                </CMSText>
                <CMSText variant="secondary">Blog Posts</CMSText>
              </CMSCard>
            </div>
          </CMSCard>

          {/* Data Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="schools">Schools</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <CMSCard elementId="overview-content" className="p-6">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Data Import Overview
                </CMSText>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <CMSText variant="primary">Courses Data</CMSText>
                    </div>
                    <Badge variant="secondary">Imported</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <CMSText variant="primary">Instructors Data</CMSText>
                    </div>
                    <Badge variant="secondary">Imported</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <CMSText variant="primary">Schools Data</CMSText>
                    </div>
                    <Badge variant="secondary">Imported</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <CMSText variant="primary">Blog Data</CMSText>
                    </div>
                    <Badge variant="outline">Partial</Badge>
                  </div>
                </div>
              </CMSCard>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-6">
              <CMSCard elementId="courses-content" className="p-6">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Imported Courses
                </CMSText>
                <div className="space-y-4">
                  {importedData?.courses?.map((course: any, index: number) => (
                    <CMSCard key={index} elementId={`course-${index}`} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CMSText variant="primary" as="h4" className="font-semibold">
                            {course.title}
                          </CMSText>
                          <CMSText variant="secondary" className="text-sm">
                            {course.description}
                          </CMSText>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">{course.level}</Badge>
                            <Badge variant="outline">{course.duration}</Badge>
                            <Badge variant="outline">{course.price}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {course.featured && <Badge variant="secondary">Featured</Badge>}
                          <CMSButton variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </CMSButton>
                        </div>
                      </div>
                    </CMSCard>
                  ))}
                </div>
              </CMSCard>
            </TabsContent>

            {/* Instructors Tab */}
            <TabsContent value="instructors" className="mt-6">
              <CMSCard elementId="instructors-content" className="p-6">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Imported Instructors
                </CMSText>
                <div className="space-y-4">
                  {importedData?.instructors?.map((instructor: any, index: number) => (
                    <CMSCard key={index} elementId={`instructor-${index}`} className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <CMSText variant="primary" as="h4" className="font-semibold">
                            {instructor.name}
                          </CMSText>
                          <CMSText variant="accent" className="text-sm">
                            {instructor.title}
                          </CMSText>
                          <CMSText variant="secondary" className="text-sm">
                            {instructor.bio}
                          </CMSText>
                        </div>
                        <CMSButton variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </CMSButton>
                      </div>
                    </CMSCard>
                  ))}
                </div>
              </CMSCard>
            </TabsContent>

            {/* Schools Tab */}
            <TabsContent value="schools" className="mt-6">
              <CMSCard elementId="schools-content" className="p-6">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Imported Schools
                </CMSText>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {importedData?.schools?.map((school: any, index: number) => (
                    <CMSCard key={index} elementId={`school-${index}`} className="p-4">
                      <School className="w-8 h-8 text-blue-600 mb-3" />
                      <CMSText variant="primary" as="h4" className="font-semibold mb-2">
                        {school.name}
                      </CMSText>
                      <CMSText variant="secondary" className="text-sm mb-3">
                        {school.description}
                      </CMSText>
                      <div className="flex items-center justify-between text-sm">
                        <span>{school.courses} courses</span>
                        <span>{school.instructors} instructors</span>
                      </div>
                    </CMSCard>
                  ))}
                </div>
              </CMSCard>
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs" className="mt-6">
              <CMSCard elementId="blogs-content" className="p-6">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Imported Blog Posts
                </CMSText>
                <div className="space-y-4">
                  {importedData?.blogs?.map((blog: any, index: number) => (
                    <CMSCard key={index} elementId={`blog-${index}`} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CMSText variant="primary" as="h4" className="font-semibold">
                            {blog.title}
                          </CMSText>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{blog.category}</Badge>
                            <CMSText variant="secondary" className="text-sm">
                              {blog.published}
                            </CMSText>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {blog.featured && <Badge variant="secondary">Featured</Badge>}
                          <CMSButton variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </CMSButton>
                        </div>
                      </div>
                    </CMSCard>
                  ))}
                </div>
              </CMSCard>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-6">
              <CMSCard elementId="testimonials-content" className="p-6">
                <CMSText variant="primary" as="h3" className="text-xl font-semibold mb-4">
                  Imported Testimonials
                </CMSText>
                <div className="space-y-4">
                  {importedData?.testimonials?.map((testimonial: any, index: number) => (
                    <CMSCard key={index} elementId={`testimonial-${index}`} className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <CMSText variant="secondary" className="italic mb-2">
                            "{testimonial.text}"
                          </CMSText>
                          <div className="flex items-center justify-between">
                            <CMSText variant="primary" className="font-semibold">
                              - {testimonial.name}
                            </CMSText>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <Badge variant="outline">{testimonial.course}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CMSCard>
                  ))}
                </div>
              </CMSCard>
            </TabsContent>
          </Tabs>
        </div>
      </UniversalCMS>
    </div>
  );
}

export default function ImportedDataPage() {
  return (
    <UniversalCMSProvider pageId="imported-data">
      <ImportedDataContent />
    </UniversalCMSProvider>
  );
}
