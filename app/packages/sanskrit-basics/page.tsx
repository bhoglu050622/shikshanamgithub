'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, MessageCircle, FileText, Mic, Brain, Zap, Sparkles, Infinity, Eye, Heart, Target } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { usePackageData } from '@/lib/hooks/usePackageData';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

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

  const premiumFeatures = [
    {
      icon: Mic,
      title: 'Audio Pronunciation Guide',
      description: 'Interactive Sanskrit lessons with authentic audio pronunciation from expert scholars',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: FileText,
      title: 'Devanagari Script Mastery',
      description: 'Complete Devanagari script learning with writing exercises and practice materials',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Brain,
      title: 'Grammar Foundation',
      description: 'Comprehensive grammar training from basics to intermediate level',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: BookOpen,
      title: 'Vocabulary Building',
      description: 'Master 1000+ essential Sanskrit words with contextual usage and examples',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Q&A Sessions',
      description: 'Regular interactive sessions with Sanskrit scholars to clarify doubts',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Award,
      title: 'Certification',
      description: 'Verified certificate of completion upon successfully finishing the package',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const learningPath = [
    {
      title: 'Sanskrit Alphabet & Script',
      description: 'Master the Devanagari script with proper pronunciation and writing techniques. Learn to recognize and write all Sanskrit letters.',
      duration: '2 weeks'
    },
    {
      title: 'Grammar Fundamentals',
      description: 'Build a strong foundation in Sanskrit grammar including noun declensions, verb conjugations, and sentence structure.',
      duration: '4 weeks'
    },
    {
      title: 'Vocabulary Building',
      description: 'Expand your Sanskrit vocabulary with essential words, phrases, and their contextual usage in classical texts.',
      duration: '3 weeks'
    },
    {
      title: 'Reading & Practice',
      description: 'Apply your knowledge by reading simple Sanskrit texts and engaging in conversation practice with peers.',
      duration: '3 weeks'
    }
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('sanskrit'))
    .slice(0, 6);

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
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-saffron-50 to-amber-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-amber-200/15 to-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/20 via-saffron-200/15 to-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 to-amber-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /><span>Sanskrit Language</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Sanskrit Basics<span className="block text-saffron-600 mt-2">Package</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Complete introduction to Sanskrit language and grammar with interactive lessons, pronunciation guides, and expert guidance from Sanskrit scholars.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-saffron-600" /><span>800+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-amber-600" /><span>3 Months</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-saffron-500 text-saffron-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-saffron-50 to-amber-50 rounded-2xl p-6 border-2 border-saffron-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹7,999</div><div className="text-sm text-slate-400 line-through">₹12,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹5,000</div><div className="text-xs text-slate-500">38% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-saffron-600">
                  <BookOpen className="w-4 h-4" /><span>Complete Sanskrit Basics • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-700 hover:to-amber-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Get This Package
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />))}
                </div>
                <span>Master Sanskrit Fundamentals - Ancient Language Basics</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-saffron-100 to-amber-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <FileText className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Script</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-amber-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Grammar</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <MessageCircle className="w-8 h-8 text-orange-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Basics</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Practice</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-saffron-100 to-amber-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><div className="text-6xl mb-4">🕉️</div><p className="text-slate-700 font-semibold">Sanskrit Learning</p></div>
                  {['Script', 'Grammar', 'Words', 'Practice'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-saffron-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="What You'll Master"
            subtitle="Comprehensive Sanskrit learning journey from basics to fluency"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningPathTimeline 
            steps={learningPath}
            orientation="vertical"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Student Success Stories"
            subtitle="Real experiences from students who have mastered Sanskrit with us"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about the Sanskrit Basics package"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready to Start Your Sanskrit Journey?"
        subtitle="Join thousands of students learning Sanskrit with our comprehensive package and master this ancient language"
        price="₹7,999"
        originalPrice="₹12,999"
        savings="Save ₹5,000 (38%)"
        primaryCTA={{
          text: 'Enroll in Sanskrit Basics',
          action: () => window.open('https://courses.shikshanam.in/checkout/sanskrit-basics', '_blank')
        }}
        secondaryCTA={{
          text: 'View Sample Lessons',
          action: () => router.push('/courses')
        }}
        trustBadges={[
          '3 years Access to All Content',
          'Expert Sanskrit Scholar Support',
          'Certificate of Completion'
        ]}
        urgency={{
          type: 'seats',
          message: 'Limited seats remaining for this cohort - Enroll now!'
        }}
      />
    </div>
  );
}
