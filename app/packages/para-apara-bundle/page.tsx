'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ParaAparaBundlePage() {
  const router = useRouter();

  const features = [
    'Complete Parā courses covering spiritual and philosophical wisdom',
    'Aparā courses including practical life skills and modern applications',
    'Chanakya Code for leadership and strategic thinking',
    'Comprehensive learning path from spiritual to practical wisdom',
    'Lifetime access to all materials and future updates',
    'Master certificate for completing the ultimate learning journey'
  ];

  const paraCourses = [
    {
      name: 'Sanskrit Language Mastery',
      description: 'Complete Sanskrit language course from basics to advanced',
      duration: '6 months',
      level: 'Beginner to Advanced',
      icon: '📚'
    },
    {
      name: 'Six Darshanas',
      description: 'All six classical schools of Indian philosophy',
      duration: '6 months',
      level: 'Intermediate to Advanced',
      icon: '🧘‍♂️'
    },
    {
      name: 'Upanishadic Wisdom',
      description: 'Deep exploration of Upanishadic teachings',
      duration: '4 months',
      level: 'Advanced',
      icon: '🌟'
    },
    {
      name: 'Vedantic Philosophy',
      description: 'Advanced study of Vedantic traditions',
      duration: '4 months',
      level: 'Advanced',
      icon: '🕉️'
    }
  ];

  const aparaCourses = [
    {
      name: 'Chanakya Code',
      description: 'Leadership and strategic thinking principles',
      duration: '3 months',
      level: 'All Levels',
      icon: '👑'
    },
    {
      name: 'Modern Applications',
      description: 'Applying ancient wisdom to modern life',
      duration: '2 months',
      level: 'All Levels',
      icon: '💡'
    },
    {
      name: 'Practical Life Skills',
      description: 'Essential skills for contemporary living',
      duration: '2 months',
      level: 'All Levels',
      icon: '🛠️'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Spiritual Teacher',
      content: 'This is the most comprehensive learning package available. It perfectly balances spiritual wisdom with practical life skills.',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Leader',
      content: 'The Chanakya Code combined with spiritual wisdom has transformed my leadership approach and business strategy.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Student',
      content: 'This bundle offers everything - from deep spiritual wisdom to practical life applications. Truly transformative.',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'What is the difference between Parā and Aparā courses?',
      answer: 'Parā courses focus on spiritual and philosophical wisdom (Sanskrit, Darshanas, Upanishads), while Aparā courses cover practical life skills and modern applications.'
    },
    {
      question: 'How long does it take to complete the entire bundle?',
      answer: 'The bundle is self-paced and typically takes 18-24 months to complete all courses with regular study.'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes, the bundle is designed for all levels. Parā courses start from basics, while Aparā courses are accessible to everyone.'
    },
    {
      question: 'What makes this the ultimate learning package?',
      answer: 'This bundle combines the deepest spiritual wisdom (Parā) with the most practical life skills (Aparā), plus the strategic wisdom of Chanakya Code.'
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
                Ultimate Bundle
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Parā + Aparā Bundle
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                The most comprehensive package including all Parā courses plus Chanakya Code. 
                Complete spiritual wisdom combined with practical life skills and strategic thinking.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>18-24 months</span>
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
                  <span className="text-2xl font-bold text-slate-800">₹19,999</span>
                  <span className="text-lg text-slate-500 line-through">₹29,999</span>
                </div>
                <p className="text-saffron-800 font-semibold">Save ₹10,000 (33% off)</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
                  Get Ultimate Bundle - ₹19,999
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
                    <div className="text-6xl mb-4">👑</div>
                    <p className="text-slate-600">Ultimate Learning Bundle</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Bundle includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• All Parā Courses</span>
                    <span>• Chanakya Code</span>
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
              Complete mastery of both spiritual wisdom and practical life skills
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

      {/* Parā Courses Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Parā Courses (Spiritual Wisdom)
            </h2>
            <p className="text-xl text-slate-600">
              Deep spiritual and philosophical learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paraCourses.map((course, index) => (
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

      {/* Aparā Courses Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Aparā Courses (Practical Skills)
            </h2>
            <p className="text-xl text-slate-600">
              Practical life skills and modern applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aparaCourses.map((course, index) => (
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
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Why Choose This Ultimate Bundle?
            </h2>
            <p className="text-xl text-slate-600">
              The most comprehensive learning experience available
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Complete Wisdom</h3>
              <p className="text-slate-600 text-sm">Both spiritual and practical wisdom in one package</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Comprehensive Learning</h3>
              <p className="text-slate-600 text-sm">From Sanskrit to strategic thinking</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Strategic Thinking</h3>
              <p className="text-slate-600 text-sm">Chanakya Code for leadership and strategy</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Life Transformation</h3>
              <p className="text-slate-600 text-sm">Complete personal and professional development</p>
            </div>
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
              Hear from students who have completed this ultimate bundle
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
              Common questions about the Parā + Aparā bundle
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
            Ready for the Ultimate Learning Journey?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join the most comprehensive learning experience combining spiritual wisdom with practical life skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Ultimate Bundle - ₹19,999
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
