'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePackageData } from '@/lib/hooks/usePackageData';

// Default package data (fallback)
const defaultPackageData = {
  id: 'sanskrit-basics',
  title: 'Sanskrit Basics Package',
  subtitle: 'Complete introduction to Sanskrit language and grammar',
  description: 'Master the fundamentals of Sanskrit with interactive lessons, pronunciation guides, and expert guidance from Sanskrit scholars.',
  price: '₹4,999',
  originalPrice: '₹7,999',
  discount: '37%',
  duration: '3 months',
  level: 'Beginner',
  rating: 4.9,
  reviewCount: 45,
  type: 'Premium Package',
  status: 'available',
  checkoutLink: 'https://courses.shikshanam.in/checkout/sanskrit-basics',
  contactNumber: '9910032165'
};

export default function SanskritBasicsPackagePage() {
  const router = useRouter();
  
  // Use the custom hook for dynamic package data
  const { packageData, loading, error } = usePackageData('sanskrit-basics', defaultPackageData);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package data...</p>
        </div>
      </div>
    );
  }

  const features = [
    'Interactive Sanskrit lessons with audio pronunciation',
    'Complete grammar foundation from basics to intermediate',
    'Devanagari script mastery with writing exercises',
    'Vocabulary building with 1000+ essential words',
    'Live Q&A sessions with Sanskrit scholars',
    'Certificate of completion upon finishing'
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Linguistics Professor',
      content: 'This course provides an excellent foundation in Sanskrit. The interactive lessons make learning enjoyable and effective.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Yoga Teacher',
      content: 'Learning Sanskrit has deepened my understanding of yoga philosophy. The course structure is perfect for beginners.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Student',
      content: 'The pronunciation guides and interactive exercises made Sanskrit accessible. Highly recommended!',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'Do I need any prior knowledge of Sanskrit?',
      answer: 'No prior knowledge is required. This course starts from the very basics and takes you through to intermediate level.'
    },
    {
      question: 'How long does it take to complete the course?',
      answer: 'The course is self-paced and typically takes 3-4 months to complete with regular study of 2-3 hours per week.'
    },
    {
      question: 'Will I learn to read and write Devanagari script?',
      answer: 'Yes, the course includes comprehensive Devanagari script lessons with writing exercises and practice materials.'
    },
    {
      question: 'Are there live sessions included?',
      answer: 'Yes, the package includes 5 live Q&A sessions with Sanskrit scholars to clarify doubts and practice conversation.'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Header */}
      <div className="bg-gradient-to-br from-saffron-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-saffron-100 text-saffron-800">
                Sanskrit Language
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Sanskrit Basics Package
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Complete introduction to Sanskrit language and grammar with interactive lessons, 
                pronunciation guides, and expert guidance from Sanskrit scholars.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>3 months</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Beginner</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Certificate</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
                  Get This Package - ₹7,999
                </Button>
                <Button size="lg" variant="outline">
                  View Sample Lesson
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-video bg-gradient-to-br from-saffron-100 to-amber-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🕉️</div>
                    <p className="text-slate-600">Sanskrit Learning Preview</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Package includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• 5 Live Sessions</span>
                    <span>• 3 Mentor Hours</span>
                    <span>• Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              What You'll Learn
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive Sanskrit learning with practical applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-saffron-600 mr-3 mt-1 flex-shrink-0" />
                <p className="text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Course Structure
            </h2>
            <p className="text-xl text-slate-600">
              Structured learning path from basics to intermediate level
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-saffron-100 text-saffron-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Sanskrit Fundamentals
                </CardTitle>
                <CardDescription>2 hours of foundational content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li>• Introduction to Sanskrit language</li>
                  <li>• Devanagari script basics</li>
                  <li>• Pronunciation fundamentals</li>
                  <li>• Basic vocabulary</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-saffron-100 text-saffron-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Grammar Basics
                </CardTitle>
                <CardDescription>3 hours of grammar fundamentals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li>• Noun declensions</li>
                  <li>• Verb conjugations</li>
                  <li>• Sentence structure</li>
                  <li>• Reading practice</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Student Testimonials
            </h2>
            <p className="text-xl text-slate-600">
              Hear from students who have completed this package
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about the Sanskrit Basics package
            </p>
          </div>
          
          <div className="space-y-6">
            {faq.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-800 mb-3">{item.question}</h3>
                  <p className="text-slate-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-saffron-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Start Your Sanskrit Journey?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students learning Sanskrit with our comprehensive package
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Sanskrit Basics Package - ₹7,999
            </Button>
            <Button size="lg" variant="outline">
              View All Packages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
