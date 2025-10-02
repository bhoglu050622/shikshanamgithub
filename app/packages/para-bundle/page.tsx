'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ParaBundlePage() {
  const router = useRouter();

  const features = [
    'Complete Sanskrit language mastery from basics to advanced',
    'All six classical schools of Indian philosophy (Darshanas)',
    'Deep exploration of Upanishadic wisdom and teachings',
    'Advanced study of Vedantic traditions and non-dualism',
    'Pure spiritual and philosophical learning without practical distractions',
    'Lifetime access to all materials and future updates'
  ];

  const courses = [
    {
      name: 'Sanskrit Language Mastery',
      description: 'Complete Sanskrit language course from basics to advanced',
      duration: '6 months',
      level: 'Beginner to Advanced',
      icon: '📚',
      focus: 'Language and Script'
    },
    {
      name: 'Six Darshanas',
      description: 'All six classical schools of Indian philosophy',
      duration: '6 months',
      level: 'Intermediate to Advanced',
      icon: '🧘‍♂️',
      focus: 'Philosophical Systems'
    },
    {
      name: 'Upanishadic Wisdom',
      description: 'Deep exploration of Upanishadic teachings',
      duration: '4 months',
      level: 'Advanced',
      icon: '🌟',
      focus: 'Spiritual Wisdom'
    },
    {
      name: 'Vedantic Philosophy',
      description: 'Advanced study of Vedantic traditions',
      duration: '4 months',
      level: 'Advanced',
      icon: '🕉️',
      focus: 'Non-dual Philosophy'
    },
    {
      name: 'Bhagavad Gita Study',
      description: 'Comprehensive study of the Bhagavad Gita',
      duration: '3 months',
      level: 'Intermediate',
      icon: '📖',
      focus: 'Practical Philosophy'
    },
    {
      name: 'Meditation and Yoga Philosophy',
      description: 'Traditional meditation and yoga philosophy',
      duration: '3 months',
      level: 'All Levels',
      icon: '🧘‍♀️',
      focus: 'Practical Application'
    }
  ];

  const testimonials = [
    {
      name: 'Swami Ananda',
      role: 'Spiritual Teacher',
      content: 'This bundle represents the purest form of spiritual learning. Everything in traditional wisdom except practical distractions.',
      rating: 5
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Philosophy Professor',
      content: 'The depth and authenticity of the spiritual content is remarkable. This is true traditional learning.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Meditation Teacher',
      content: 'Learning pure spiritual wisdom has transformed my meditation practice and teaching approach completely.',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'What makes this different from the Parā + Aparā bundle?',
      answer: 'This bundle focuses purely on spiritual and philosophical wisdom, without the practical life skills (Aparā) or Chanakya Code. It\'s for those seeking pure spiritual learning.'
    },
    {
      question: 'How long does it take to complete the bundle?',
      answer: 'The bundle is self-paced and typically takes 15-18 months to complete all courses with regular study.'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes, the Sanskrit course starts from basics, and the philosophical courses are designed to build understanding progressively.'
    },
    {
      question: 'What is the focus of this bundle?',
      answer: 'This bundle focuses purely on spiritual wisdom, philosophical systems, and traditional learning without modern practical applications.'
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
                Pure Spiritual Learning
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                All Parā Courses Bundle
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Everything in traditional wisdom except Chanakya Code - pure spiritual and philosophical learning. 
                Complete mastery of Sanskrit, philosophy, and spiritual wisdom.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>15-18 months</span>
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
                  <span className="text-2xl font-bold text-slate-800">₹14,999</span>
                  <span className="text-lg text-slate-500 line-through">₹22,999</span>
                </div>
                <p className="text-saffron-800 font-semibold">Save ₹8,000 (35% off)</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
                  Get Parā Bundle - ₹14,999
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
                    <p className="text-slate-600">Pure Spiritual Learning</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Bundle includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• 6 Parā Courses</span>
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
              Pure spiritual and philosophical mastery without practical distractions
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
              Complete spiritual and philosophical curriculum
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
                    <div className="flex items-center text-sm text-slate-600">
                      <Heart className="h-4 w-4 mr-2" />
                      <span>{course.focus}</span>
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
              Pure spiritual learning without practical distractions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Pure Spiritual Focus</h3>
              <p className="text-slate-600 text-sm">Dedicated to spiritual and philosophical wisdom only</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Traditional Learning</h3>
              <p className="text-slate-600 text-sm">Authentic spiritual and philosophical education</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Deep Understanding</h3>
              <p className="text-slate-600 text-sm">Comprehensive mastery of spiritual traditions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Spiritual Transformation</h3>
              <p className="text-slate-600 text-sm">Complete spiritual and philosophical development</p>
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
              Hear from students who have completed this spiritual bundle
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
              Common questions about the Parā bundle
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
            Ready for Pure Spiritual Learning?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students mastering traditional spiritual and philosophical wisdom
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Parā Bundle - ₹14,999
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
