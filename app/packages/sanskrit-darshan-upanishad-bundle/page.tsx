'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SanskritDarshanUpanishadBundlePage() {
  const router = useRouter();

  const features = [
    'Complete Sanskrit language course from basics to advanced',
    'Six classical schools of Indian philosophy (Darshanas)',
    'Deep dive into Upanishadic wisdom and teachings',
    'Interactive learning with expert scholars',
    'Lifetime access to all materials and updates',
    'Master certificate for completing the entire bundle'
  ];

  const courses = [
    {
      id: 'sanskrit-course',
      name: 'Sanskrit Language Mastery',
      description: 'Complete Sanskrit language course from basics to advanced',
      duration: '6 months',
      level: 'Beginner to Advanced',
      icon: '📚'
    },
    {
      id: 'nyaya-darshan',
      name: 'Nyaya Darshan',
      description: 'Master the logical reasoning system of Nyaya',
      duration: '3 months',
      level: 'Intermediate',
      icon: '🧠'
    },
    {
      id: 'vaisheshik-darshan',
      name: 'Vaisheshik Darshan',
      description: 'Understand the atomic theory of Vaisheshik',
      duration: '3 months',
      level: 'Intermediate',
      icon: '⚛️'
    },
    {
      id: 'samkhya-darshan',
      name: 'Samkhya Darshan',
      description: 'Explore the analytical philosophy of Samkhya',
      duration: '3 months',
      level: 'Intermediate',
      icon: '🔍'
    },
    {
      id: 'yoga-darshan',
      name: 'Yoga Darshan',
      description: 'Learn the practical philosophy of Yoga',
      duration: '3 months',
      level: 'Intermediate',
      icon: '🧘‍♂️'
    },
    {
      id: 'vedanta-darshan',
      name: 'Vedanta Darshan',
      description: 'Study the culmination of philosophical wisdom',
      duration: '3 months',
      level: 'Advanced',
      icon: '🌟'
    },
    {
      id: 'mimamsa-darshan',
      name: 'Mimamsa Darshan',
      description: 'Explore the ritual and interpretive school',
      duration: '3 months',
      level: 'Intermediate',
      icon: '📜'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Philosophy Professor',
      content: 'This bundle perfectly combines linguistic and philosophical learning. The Sanskrit course is excellent, and the philosophical courses provide deep insights.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Yoga Teacher',
      content: 'Learning Sanskrit with the philosophical context has transformed my understanding of yoga and meditation practices.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Student',
      content: 'The structured approach makes complex philosophical concepts accessible. Highly recommended for anyone interested in Hindu philosophy.',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'Do I need prior knowledge of Sanskrit or philosophy?',
      answer: 'No prior knowledge is required. The bundle starts from basics and takes you through to advanced levels in both Sanskrit and philosophy.'
    },
    {
      question: 'How long does it take to complete the entire bundle?',
      answer: 'The bundle is self-paced and typically takes 12-15 months to complete all courses with regular study.'
    },
    {
      question: 'Can I take individual courses instead of the bundle?',
      answer: 'Yes, all courses are available individually, but the bundle offers significant savings and a structured learning path.'
    },
    {
      question: 'Will I get certificates for each course?',
      answer: 'Yes, you will receive a certificate of completion for each course and a master certificate for completing the entire bundle.'
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
                Complete Bundle
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Sanskrit + Darshan + Upanishad Bundle
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Complete learning journey with 7 courses combining Sanskrit language, 
                six classical schools of philosophy, and Upanishadic wisdom.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>12-15 months</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>All Levels</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Master Certificate</span>
                </div>
              </div>

              <div className="bg-saffron-100 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-slate-800">₹9,999</span>
                  <span className="text-lg text-slate-500 line-through">₹15,000</span>
                </div>
                <p className="text-saffron-800 font-semibold">Save ₹5,001 (33% off)</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
                  Get This Bundle - ₹9,999
                </Button>
                <Button size="lg" variant="outline">
                  View Sample Lessons
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-video bg-gradient-to-br from-saffron-100 to-amber-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🕉️</div>
                    <p className="text-slate-600">Complete Learning Bundle</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Bundle includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• 7 Courses</span>
                    <span>• Lifetime Access</span>
                    <span>• Master Certificate</span>
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
              Comprehensive mastery of Sanskrit language and Hindu philosophical traditions
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

      {/* Courses Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Included Courses
            </h2>
            <p className="text-xl text-slate-600">
              Complete curriculum covering language, philosophy, and wisdom
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-2xl mr-3">{course.icon}</span>
                    {course.name}
                  </CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Why Choose This Bundle?
            </h2>
            <p className="text-xl text-slate-600">
              Discover the unique advantages of this comprehensive learning package
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Comprehensive Learning</h3>
              <p className="text-slate-600 text-sm">Master both language and philosophical concepts together</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Structured Approach</h3>
              <p className="text-slate-600 text-sm">Carefully designed curriculum for optimal learning</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Expert Guidance</h3>
              <p className="text-slate-600 text-sm">Learn from experienced Sanskrit and philosophy scholars</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Practical Application</h3>
              <p className="text-slate-600 text-sm">Apply philosophical concepts in daily life</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Student Testimonials
            </h2>
            <p className="text-xl text-slate-600">
              Hear from students who have completed this bundle
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
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about the Sanskrit + Darshan + Upanishad bundle
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
            Ready to Start Your Complete Learning Journey?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students mastering Sanskrit language and Hindu philosophical traditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Complete Bundle - ₹9,999
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
