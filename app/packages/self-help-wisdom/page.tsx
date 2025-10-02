'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, Heart, Brain, Lightbulb, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SelfHelpWisdomPackagePage() {
  const router = useRouter();

  const features = [
    'Practical exercises based on ancient Indian wisdom',
    'Meditation techniques for modern life',
    'Life coaching sessions with spiritual guidance',
    'Community support and peer learning',
    'Daily wisdom practices and rituals',
    'Personal transformation tools and techniques'
  ];

  const modules = [
    {
      title: 'Ancient Wisdom for Modern Life',
      description: 'Apply timeless teachings to contemporary challenges',
      duration: '3 hours',
      topics: ['Dharma in daily life', 'Karma and responsibility', 'Moksha and liberation']
    },
    {
      title: 'Meditation and Mindfulness',
      description: 'Traditional meditation techniques for modern practitioners',
      duration: '2 hours',
      topics: ['Breathing techniques', 'Mantra meditation', 'Mindful living']
    },
    {
      title: 'Life Coaching Through Wisdom',
      description: 'Personal development using ancient principles',
      duration: '2 hours',
      topics: ['Self-discovery', 'Goal setting', 'Overcoming obstacles']
    }
  ];

  const testimonials = [
    {
      name: 'Swami Ananda',
      role: 'Spiritual Teacher',
      content: 'This course beautifully bridges ancient wisdom with modern life. The practical applications are transformative.',
      rating: 5
    },
    {
      name: 'Jennifer Martinez',
      role: 'Life Coach',
      content: 'Learning to apply ancient wisdom in my coaching practice has been revolutionary. My clients see remarkable changes.',
      rating: 5
    },
    {
      name: 'Robert Kim',
      role: 'Student',
      content: 'The meditation techniques and life principles have brought peace and clarity to my daily life.',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'Do I need any spiritual background to take this course?',
      answer: 'No spiritual background is required. The course is designed for anyone seeking personal growth and wisdom, regardless of their beliefs.'
    },
    {
      question: 'How practical are the teachings for modern life?',
      answer: 'All teachings are specifically adapted for modern life with practical exercises, daily practices, and real-world applications.'
    },
    {
      question: 'What kind of meditation techniques are taught?',
      answer: 'The course covers traditional Indian meditation techniques including breathing exercises, mantra meditation, and mindfulness practices.'
    },
    {
      question: 'Is there ongoing support after the course?',
      answer: 'Yes, you get access to a community forum and monthly group sessions for continued support and practice.'
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
                Self-Help & Wisdom
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Self-Help Through Ancient Wisdom
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Transform your life using timeless Indian teachings and practical techniques 
                for modern living, meditation, and personal growth.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>2 months</span>
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
                  Get This Package - ₹6,399
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
                    <div className="text-6xl mb-4">🧘‍♀️</div>
                    <p className="text-slate-600">Wisdom Learning Preview</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Package includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• 3 Live Sessions</span>
                    <span>• 2 Mentor Hours</span>
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
              Transform your life with ancient wisdom and modern practices
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

      {/* Modules Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Course Modules
            </h2>
            <p className="text-xl text-slate-600">
              Structured learning path for personal transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-saffron-100 text-saffron-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {module.title}
                  </CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{module.duration}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Topics covered:</p>
                      <ul className="space-y-1">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="text-sm text-slate-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-saffron-400 rounded-full mr-2"></span>
                            {topic}
                          </li>
                        ))}
                      </ul>
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
              Why Choose This Package?
            </h2>
            <p className="text-xl text-slate-600">
              Discover the unique advantages of ancient wisdom for modern life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Emotional Well-being</h3>
              <p className="text-slate-600 text-sm">Learn techniques for emotional balance and inner peace</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Mental Clarity</h3>
              <p className="text-slate-600 text-sm">Develop focus and clarity through meditation practices</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Life Purpose</h3>
              <p className="text-slate-600 text-sm">Discover your dharma and life's purpose through ancient wisdom</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Resilience</h3>
              <p className="text-slate-600 text-sm">Build inner strength to face life's challenges</p>
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
              Hear from students who have transformed their lives
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
              Common questions about the Self-Help Wisdom package
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
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students applying ancient wisdom to modern life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Self-Help Wisdom - ₹6,399
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
