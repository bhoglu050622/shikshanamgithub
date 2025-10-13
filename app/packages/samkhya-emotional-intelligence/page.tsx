'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, Brain, Heart, Eye, Zap, Wind, Sun, Sparkles, Infinity, Target, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SamkhyaEmotionalIntelligencePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Sāṅkhya Philosophy Foundation',
      description: 'Deep understanding of one of India\'s oldest philosophical systems and its practical applications in modern life',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Three Gunas Mastery',
      description: 'Complete exploration of Sattva, Rajas, and Tamas - the three fundamental qualities that shape all emotional experiences',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Eye,
      title: 'Witnessing Consciousness',
      description: 'Develop the observer awareness that allows you to witness emotions without being overwhelmed by them',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Emotional Pattern Recognition',
      description: 'Learn to identify and understand your emotional patterns through the lens of Sāṅkhya wisdom',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Guna Profiler Tool',
      description: 'Access to our exclusive assessment tool to understand your dominant guna patterns and emotional tendencies',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Wind,
      title: 'Daily Practices',
      description: 'Practical techniques and exercises for emotional mastery that you can apply in your daily life',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const learningPath = [
    {
      title: 'Introduction to Sāṅkhya',
      description: 'Explore the foundations of Sāṅkhya philosophy, understanding consciousness, Purusha-Prakriti duality, and the nature of existence.',
      duration: '2 weeks'
    },
    {
      title: 'Three Gunas Deep Dive',
      description: 'Master the understanding of Sattva (harmony), Rajas (activity), and Tamas (inertia) - how they create all emotional states and experiences.',
      duration: '3 weeks'
    },
    {
      title: 'Emotional Intelligence Through Sāṅkhya',
      description: 'Apply ancient wisdom to modern emotional challenges. Learn to recognize, understand, and transform emotional patterns.',
      duration: '2 weeks'
    },
    {
      title: 'Witnessing Practice & Observer Awareness',
      description: 'Develop the capacity to observe your emotions without identification, cultivating true emotional freedom.',
      duration: '2 weeks'
    },
    {
      title: 'Guna Profiling & Self-Discovery',
      description: 'Use our exclusive Guna Profiler to assess your emotional patterns and create a personalized transformation plan.',
      duration: '1 week'
    },
    {
      title: 'Integration & Daily Practice',
      description: 'Integrate Sāṅkhya wisdom into your daily life with practical exercises, meditation techniques, and ongoing support.',
      duration: 'Ongoing'
    }
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('emotional') || t.course.toLowerCase().includes('samkhya') || t.course.toLowerCase().includes('intelligence'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Do I need prior knowledge of philosophy?',
      answer: 'No prior knowledge is needed! We start from the basics and build systematically. The course is designed for beginners while offering depth for those familiar with Indian philosophy.',
      category: 'Getting Started'
    },
    {
      question: 'How is this different from modern emotional intelligence approaches?',
      answer: 'Sāṅkhya provides a 2,500-year-old framework based on understanding consciousness and the three gunas. It offers deep insights into why emotions arise and how to witness them rather than just managing symptoms. It goes beyond modern approaches by addressing the root causes of emotional patterns.',
      category: 'Philosophy'
    },
    {
      question: 'What is the Guna Profiler tool?',
      answer: 'The Guna Profiler is an exclusive assessment tool based on Sāṅkhya principles that helps you understand your dominant guna patterns and how they affect your emotional life. It provides personalized insights and recommendations for transformation.',
      category: 'Tools & Resources'
    },
    {
      question: 'Will this help with anxiety and stress?',
      answer: 'Yes, many students report significant improvements in managing anxiety and stress. Understanding emotions through the guna lens and developing witnessing consciousness are powerful tools for transforming your relationship with difficult emotions.',
      category: 'Benefits'
    },
    {
      question: 'Is this only theoretical or are there practical exercises?',
      answer: 'Both! You get theoretical understanding of Sāṅkhya AND practical daily exercises, meditation techniques, and tools to apply the wisdom in real life. The course balances ancient wisdom with modern application.',
      category: 'Course Content'
    },
    {
      question: 'How much time is required per week?',
      answer: 'We recommend 4-5 hours per week: video lessons (2 hours), daily practice (15-20 minutes), and optional live Q&A sessions (1 hour). The schedule is flexible and self-paced.',
      category: 'Time Commitment'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-saffron-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-indigo-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-saffron-200/20 via-purple-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 via-indigo-100 to-saffron-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" /><span>Emotional Mastery Through Ancient Wisdom</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                सांख्य से भावनात्मक बुद्धि<span className="block text-purple-600 mt-2 text-3xl md:text-4xl">Emotional Mastery</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Transform your relationship with emotions through the profound lens of Sāṅkhya philosophy. Understand how the three gunas create all emotional states and develop true emotional intelligence.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" /><span>890+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-indigo-600" /><span>8-10 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-purple-50 via-indigo-50 to-saffron-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹3,299</div><div className="text-sm text-slate-400 line-through">₹4,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,700</div><div className="text-xs text-slate-500">34% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Heart className="w-4 h-4" /><span>Emotional Intelligence • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/courses/Emotional-Intelligence-with-Samkhya-Darshan-655f7e47e4b0ed7a05c95d09', '_blank')}>
                  Master Your Emotions
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />))}
                </div>
                <span>Transform Emotions Through Ancient Wisdom</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-purple-100 via-indigo-100 to-saffron-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sun className="w-8 h-8 text-yellow-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sattva</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Zap className="w-8 h-8 text-red-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Rajas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Wind className="w-8 h-8 text-slate-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Tamas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Witness</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-purple-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Heart className="w-20 h-20 text-purple-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Emotional Intelligence</p></div>
                  {['Sattva', 'Rajas', 'Tamas', 'Wisdom'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-purple-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-pulse-gentle animation-delay-2000" />
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
            subtitle="Ancient Sāṅkhya wisdom applied to modern emotional intelligence"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="py-24 bg-gradient-to-br from-purple-50 to-indigo-50">
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
            title="Transformation Stories"
            subtitle="Real experiences from students who have mastered their emotions"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about emotional mastery through Sāṅkhya"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready to Transform Your Emotions?"
        subtitle="Join hundreds of students discovering true emotional intelligence through 2,500 years of Sāṅkhya wisdom"
        price="₹3,299"
        originalPrice="₹4,999"
        savings="Save ₹1,700 (34%)"
        primaryCTA={{
          text: 'Master Your Emotions Now',
          action: () => window.open('https://courses.shikshanam.in/courses/Emotional-Intelligence-with-Samkhya-Darshan-655f7e47e4b0ed7a05c95d09', '_blank')
        }}
        secondaryCTA={{
          text: 'Take Free Guna Assessment',
          action: () => router.push('/guna-profiler')
        }}
        trustBadges={[
          '3 years Access to Course Materials',
          'Exclusive Guna Profiler Tool Access',
          'Live Q&A with Philosophy Experts'
        ]}
        urgency={{
          type: 'discount',
          message: 'Special pricing - Transform your emotional life today!'
        }}
      />
    </div>
  );
}
