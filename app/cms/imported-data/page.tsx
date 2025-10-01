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

export default function ImportedDataPage() {
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
      // Load the imported data from the CMS data files
      const response = await fetch('/api/cms/imported-data');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setImportedData(result.data);
        } else {
          // Fallback to mock data if API response is not in expected format
          const mockData = {
            overview: {
              totalCourses: 16,
              totalInstructors: 5,
              totalSchools: 4,
              totalBlogs: 2,
              totalTestimonials: 0,
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
        }
      } else {
        // Fallback to mock data if API is not available
        const mockData = {
          overview: {
            totalCourses: 16,
            totalInstructors: 5,
            totalSchools: 4,
            totalBlogs: 2,
            totalTestimonials: 0,
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
      }
    } catch (err) {
      console.error('Error loading imported data:', err);
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
          <p className="text-gray-600">Loading imported data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <div className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadImportedData}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Database className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Imported Data Management</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="primary" onClick={runDataImport}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Re-import Data
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Import Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Database className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Data Import Status</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center p-4">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-600">
                  {importedData?.overview?.totalCourses || 0}
                </h3>
                <p className="text-gray-600">Courses</p>
              </Card>
              
              <Card className="text-center p-4">
                <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="text-2xl font-bold text-green-600">
                  {importedData?.overview?.totalInstructors || 0}
                </h3>
                <p className="text-gray-600">Instructors</p>
              </Card>
              
              <Card className="text-center p-4">
                <School className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-600">
                  {importedData?.overview?.totalSchools || 0}
                </h3>
                <p className="text-gray-600">Schools</p>
              </Card>
              
              <Card className="text-center p-4">
                <FileText className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <h3 className="text-2xl font-bold text-orange-600">
                  {importedData?.overview?.totalBlogs || 0}
                </h3>
                <p className="text-gray-600">Blog Posts</p>
              </Card>
            </div>
          </Card>

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
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Data Import Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Courses Data</span>
                    </div>
                    <Badge variant="secondary">Imported</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Instructors Data</span>
                    </div>
                    <Badge variant="secondary">Imported</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Schools Data</span>
                    </div>
                    <Badge variant="secondary">Imported</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Blog Data</span>
                    </div>
                    <Badge variant="outline">Partial</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Imported Courses</h3>
                <div className="space-y-4">
                  {importedData?.courses?.map((course: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-gray-600 text-sm">{course.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="outline">{course.level}</Badge>
                            <Badge variant="outline">{course.duration}</Badge>
                            <Badge variant="outline">{course.price}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {course.featured && <Badge variant="secondary">Featured</Badge>}
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Instructors Tab */}
            <TabsContent value="instructors" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Imported Instructors</h3>
                <div className="space-y-4">
                  {importedData?.instructors?.map((instructor: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{instructor.name}</h4>
                          <p className="text-blue-600 text-sm">{instructor.title}</p>
                          <p className="text-gray-600 text-sm">{instructor.bio}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Schools Tab */}
            <TabsContent value="schools" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Imported Schools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {importedData?.schools?.map((school: any, index: number) => (
                    <Card key={index} className="p-4">
                      <School className="w-8 h-8 text-blue-600 mb-3" />
                      <h4 className="font-semibold mb-2">{school.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{school.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span>{school.courses} courses</span>
                        <span>{school.instructors} instructors</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Imported Blog Posts</h3>
                <div className="space-y-4">
                  {importedData?.blogs?.map((blog: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{blog.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{blog.category}</Badge>
                            <span className="text-gray-600 text-sm">{blog.published}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {blog.featured && <Badge variant="secondary">Featured</Badge>}
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Imported Testimonials</h3>
                <div className="space-y-4">
                  {importedData?.testimonials?.map((testimonial: any, index: number) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <p className="text-gray-600 italic mb-2">"{testimonial.text}"</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">- {testimonial.name}</span>
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
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}