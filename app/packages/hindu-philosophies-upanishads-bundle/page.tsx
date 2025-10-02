'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePackageData } from '@/lib/hooks/usePackageData';

// Default package data (fallback)
const defaultPackageData = {
  id: 'hindu-philosophies-upanishads-bundle',
  title: 'Hindu Philosophies & Upanishads Bundle',
  subtitle: 'Complete Journey Through Ancient Indian Wisdom',
  description: 'Master the six classical schools of Hindu philosophy and explore the profound wisdom of the Upanishads in this comprehensive learning bundle.',
  price: '₹9,999',
  originalPrice: '₹19,999',
  duration: '12 months',
  level: 'Intermediate',
  rating: 4.9,
  reviewCount: 127,
  type: 'Premium Bundle',
  status: 'available',
  checkoutLink: 'https://courses.shikshanam.in/checkout/hindu-philosophies-upanishads-bundle',
  contactNumber: '9910032165'
};

export default function HinduPhilosophiesUpanishadsBundlePage() {
  const router = useRouter();
  
  // Use the custom hook for dynamic package data
  const { packageData, loading, error } = usePackageData('hindu-philosophies-upanishads-bundle', defaultPackageData);

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

  // Use dynamic features from packageData or fallback to static
  const dynamicFeatures = packageData.features || [
    'Six classical schools of Hindu philosophy (Darshanas)',
    'Deep exploration of Upanishadic wisdom and teachings',
    'Interactive learning with renowned philosophy scholars',
    'Comprehensive study materials and reading lists',
    'Lifetime access to all materials and updates',
    'Master certificate for completing the entire bundle'
  ];

  const courses = [
    {
      id: 'samkhya-darshan',
      name: 'Samkhya Darshan',
      description: 'Explore the analytical philosophy of Samkhya',
      duration: '3 months',
      level: 'Intermediate',
      icon: '🔍'
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
      id: 'yoga-darshan',
      name: 'Yoga Darshan',
      description: 'Learn the practical philosophy of Yoga',
      duration: '3 months',
      level: 'Intermediate',
      icon: '🧘‍♂️'
    },
    {
      id: 'tantra-darshan',
      name: 'Tantra Darshan',
      description: 'Explore the esoteric philosophy of Tantra',
      duration: '3 months',
      level: 'Advanced',
      icon: '🌀'
    },
    {
      id: 'kashmir-shaivism',
      name: 'Kashmir Shaivism',
      description: 'Study the non-dual philosophy of Kashmir Shaivism',
      duration: '3 months',
      level: 'Advanced',
      icon: '🌟'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Philosophy Professor',
      content: 'This bundle provides a comprehensive understanding of Hindu philosophical traditions. The integration with Upanishadic wisdom is exceptional.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Meditation Teacher',
      content: 'The philosophical depth combined with practical application has transformed my meditation practice and teaching.',
      rating: 5
    },
    {
      name: 'David Wilson',
      role: 'Student',
      content: 'The structured approach to different philosophical schools makes complex concepts accessible. Highly recommended.',
      rating: 5
    }
  ];

  const faq = [
    {
      question: 'Do I need prior knowledge of Hindu philosophy?',
      answer: 'No prior knowledge is required. The courses start from basics and build up to advanced concepts.'
    },
    {
      question: 'How long does it take to complete the bundle?',
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
                Philosophy Bundle
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                {packageData.title}
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                {packageData.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>12-15 months</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Intermediate to Advanced</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Master Certificate</span>
                </div>
              </div>

              <div className="bg-saffron-100 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-slate-800">{packageData.price}</span>
                  {packageData.originalPrice && (
                    <span className="text-lg text-slate-500 line-through">{packageData.originalPrice}</span>
                  )}
                </div>
                {packageData.originalPrice && (
                  <p className="text-saffron-800 font-semibold">
                    Save ₹{parseInt(packageData.originalPrice.replace('₹', '').replace(',', '')) - parseInt(packageData.price.replace('₹', '').replace(',', ''))} 
                    ({Math.round(((parseInt(packageData.originalPrice.replace('₹', '').replace(',', '')) - parseInt(packageData.price.replace('₹', '').replace(',', ''))) / parseInt(packageData.originalPrice.replace('₹', '').replace(',', ''))) * 100)}% off)
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-saffron-600 hover:bg-saffron-700"
                  onClick={() => window.open(packageData.checkoutLink, '_blank')}
                >
                  Get This Bundle - {packageData.price}
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
                    <div className="text-6xl mb-4">🧘‍♂️</div>
                    <p className="text-slate-600">Philosophy Learning Bundle</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">Bundle includes:</p>
                  <div className="flex justify-center space-x-4 text-sm text-slate-600">
                    <span>• 6 Courses</span>
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
              Comprehensive mastery of Hindu philosophical traditions and Upanishadic wisdom
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dynamicFeatures.map((feature, index) => (
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
              Complete curriculum covering all major Hindu philosophical traditions
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
              Discover the unique advantages of studying Hindu philosophies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Complete Philosophical System</h3>
              <p className="text-slate-600 text-sm">Master all six schools of Hindu philosophy</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Upanishadic Integration</h3>
              <p className="text-slate-600 text-sm">Connect philosophical concepts with Upanishadic wisdom</p>
            </div>
            
            <div className="text-center">
              <div className="bg-saffron-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-saffron-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Expert Guidance</h3>
              <p className="text-slate-600 text-sm">Learn from experienced philosophy scholars</p>
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
              Common questions about the Hindu Philosophies + Upanishads bundle
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
            Ready to Explore Hindu Philosophy?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students discovering the profound wisdom of Hindu philosophical traditions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-saffron-600 hover:bg-saffron-700">
              Get Philosophy Bundle - ₹12,999
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
