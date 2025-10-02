'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PhilosophyFoundationsPackagePage() {
  const router = useRouter();

  const features = [
    'Comprehensive overview of six classical schools of Indian philosophy',
    'Interactive discussions with philosophy experts',
    'Detailed study materials and reading lists',
    'Live Q&A sessions with renowned scholars',
    'Practical applications of philosophical concepts',
    'Certificate of completion for each school studied'
  ];

  const schools = [
    {
      name: 'Nyaya',
      description: 'The school of logic and reasoning',
      duration: '1 month',
      focus: 'Logical analysis and debate'
    },
    {
      name: 'Vaisheshik',
      description: 'The atomic theory school',
      duration: '1 month',
      focus: 'Material reality and atoms'
    },
    {
      name: 'Samkhya',
      description: 'The analytical school',
      duration: '1 month',
      focus: 'Dualism and consciousness'
    },
    {
      name: 'Yoga',
      description: 'The practical philosophy',
      duration: '1 month',
      focus: 'Meditation and self-realization'
    },
    {
      name: 'Mimamsa',
      description: 'The ritual school',
      duration: '1 month',
      focus: 'Vedic interpretation and dharma'
    },
    {
      name: 'Vedanta',
      description: 'The culmination school',
      duration: '1 month',
      focus: 'Non-dualism and ultimate reality'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Philosophy Professor',
      content: 'This course provides an excellent systematic approach to understanding Indian philosophy. The depth and clarity are remarkable.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Meditation Teacher',
      content: 'Learning the philosophical foundations has transformed my meditation practice and teaching approach.',
      rating: 5
    },
    {
      name: 'David Wilson',
      role: 'Student',
      content: 'The structured approach to different schools makes complex philosophical concepts accessible and practical.',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'Do I need prior knowledge of Indian philosophy?',
      answer: 'No prior knowledge is required. The course starts with basic concepts and builds up systematically through each school.'
    },
    {
      question: 'How long does it take to complete the course?',
      answer: 'The course is designed for 6 months of study, with each philosophical school taking approximately 1 month to complete.'
    },
    {
      question: 'Are the live sessions recorded?',
      answer: 'Yes, all live sessions are recorded and available for review, so you can catch up if you miss any session.'
    },
    {
      question: 'Will I get individual certificates for each school?',
      answer: 'Yes, you will receive a certificate of completion for each philosophical school you complete, plus a master certificate for the entire course.'
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
                Philosophy
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Philosophy Foundations
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Explore the six classical schools of Indian philosophy with expert guidance, 
                interactive discussions, and comprehensive study materials.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>6 months</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Intermediate</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Certificate</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
                  Get This Package - ₹11,999
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
                    <div className="text-6xl mb-4">🧘‍♂️</div>
                    <p className="text-slate-600">Philosophy Learning Preview</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Package includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• 8 Live Sessions</span>
                    <span>• 5 Mentor Hours</span>
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
              Comprehensive exploration of Indian philosophical traditions
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

      {/* Six Schools Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              The Six Classical Schools
            </h2>
            <p className="text-xl text-slate-600">
              Master each philosophical tradition systematically
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-saffron-100 text-saffron-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {school.name}
                  </CardTitle>
                  <CardDescription>{school.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{school.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Brain className="h-4 w-4 mr-2" />
                      <span>{school.focus}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Course Structure
            </h2>
            <p className="text-xl text-slate-600">
              Systematic learning path through Indian philosophical traditions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-3 text-saffron-600" />
                  Introduction to Darshanas
                </CardTitle>
                <CardDescription>4 hours of foundational content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li>• Overview of Indian philosophical tradition</li>
                  <li>• Understanding the concept of Darshana</li>
                  <li>• Historical context and development</li>
                  <li>• Key philosophical concepts</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-6 w-6 mr-3 text-saffron-600" />
                  Practical Applications
                </CardTitle>
                <CardDescription>Live sessions and discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li>• Interactive Q&A sessions</li>
                  <li>• Philosophical debates</li>
                  <li>• Modern applications</li>
                  <li>• Personal reflection exercises</li>
                </ul>
              </CardContent>
            </Card>
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
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Common questions about the Philosophy Foundations package
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
            Ready to Explore Indian Philosophy?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students discovering the profound wisdom of Indian philosophical traditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Philosophy Foundations - ₹11,999
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
