import React from 'react';
import { notFound } from 'next/navigation';
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
import Link from 'next/link';

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

async function getCourseData(courseId: string): Promise<CourseData | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cms/course/${courseId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching course data:', error);
    return null;
  }
}

export default async function IndividualCourseEditor({ 
  params 
}: { 
  params: Promise<{ courseId: string }> 
}) {
  const { courseId } = await params;
  const courseData = await getCourseData(courseId);

  if (!courseData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/cms">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to CMS</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{courseData.subtitle}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{courseData.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{courseData.rating} ({courseData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{courseData.language}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 mb-2">{courseData.price}</div>
                {courseData.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">{courseData.originalPrice}</div>
                )}
                <Badge variant="outline" className="mt-2">
                  {courseData.type}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Course Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{courseData.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>
                  {courseData.curriculum.modules.length} modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseData.curriculum.modules.map((module) => (
                    <div key={module.moduleNumber} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{module.title}</h4>
                        <Badge variant="outline">{module.tag}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                      <div className="text-sm text-gray-500 mb-3">
                        {module.lessons.length} lessons • {module.totalTime}
                      </div>
                      <div className="space-y-2">
                        {module.lessons.map((lesson, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">{lesson.title}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {lesson.type}
                              </Badge>
                              <span className="text-gray-500">{lesson.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseData.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-2">"{testimonial.quote}"</p>
                      <div className="text-sm text-gray-500">
                        <span className="font-semibold">{testimonial.name}</span>
                        <span className="ml-2">• {testimonial.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseData.faq.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-green-600">{courseData.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{courseData.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold">{courseData.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-semibold">{courseData.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={courseData.status === 'available' ? 'default' : 'secondary'}>
                    {courseData.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{courseData.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-5 h-5 text-gray-500" />
                  <a 
                    href={courseData.checkoutLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Course Page
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Course
                </Button>
                <Button variant="outline" className="w-full">
                  <Code className="w-4 h-4 mr-2" />
                  Edit Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}