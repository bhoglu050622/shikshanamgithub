'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Heart, Brain, Target, Eye, Sparkles, Award, Infinity, Zap, Shield, Compass } from 'lucide-react';
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
      title: 'Three Gunas Mastery',
      description: 'Deep understanding of Sattva, Rajas, and Tamas - the three fundamental qualities that shape all emotions and experiences',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Heart,
      title: 'Emotional Pattern Recognition',
      description: 'Learn to identify and understand emotional patterns through the lens of Sāṅkhya philosophy and Guna theory',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Eye,
      title: 'Witness Consciousness Practice',
      description: 'Develop Purusha awareness - the observer consciousness that transforms your relationship with emotions',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Practical Emotional Tools',
      description: 'Apply ancient Sāṅkhya wisdom to modern emotional challenges with practical exercises and techniques',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Sparkles,
      title: 'Guna Profiler Assessment',
      description: 'Personalized Guna assessment tool to understand your dominant emotional and personality patterns',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Infinity,
      title: 'Path to Emotional Freedom',
      description: 'Journey towards emotional mastery and liberation through discriminative knowledge and witness consciousness',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const learningPath = [
    {
      title: 'Sāṅkhya Foundations',
      description: 'Introduction to Sāṅkhya philosophy - understanding Purusha, Prakriti, and the framework for emotional intelligence.',
      duration: '2 weeks'
    },
    {
      title: 'Three Gunas Deep Dive',
      description: 'Comprehensive study of Sattva (harmony), Rajas (activity), and Tamas (inertia) and how they create emotional states.',
      duration: '3 weeks'
    },
    {
      title: 'Emotional Pattern Analysis',
      description: 'Learn to analyze your emotional patterns, triggers, and responses through the Guna framework with practical tools.',
      duration: '2 weeks'
    },
    {
      title: 'Witnessing Practice & Integration',
      description: 'Develop Purusha consciousness and integrate Sāṅkhya wisdom into daily life for lasting emotional transformation.',
      duration: '2 weeks'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('samkhya') || t.course.toLowerCase().includes('emotional') || t.course.toLowerCase().includes('self-help'))
    .slice(0, 6);

  const faq = [
    {
      question: 'How does Sāṅkhya help with emotional intelligence?',
      answer: 'Sāṅkhya provides a profound framework for understanding emotions through the three Gunas. By recognizing which Guna dominates your emotional state, you gain the power to transform it. The philosophy also teaches witness consciousness (Purusha awareness), which creates space between you and your emotions, leading to true emotional mastery.',
      category: 'Philosophy & Practice'
    },
    {
      question: 'What is the Guna Profiler tool?',
      answer: 'The Guna Profiler is an assessment tool based on classical Sāṅkhya texts that helps you understand your dominant Guna patterns. It provides personalized insights into your emotional tendencies, personality traits, and psychological states, along with specific practices for balance and growth.',
      category: 'Tools'
    },
    {
      question: 'Do I need prior knowledge of Sāṅkhya or philosophy?',
      answer: 'No prior knowledge is needed! We start from absolute basics and build systematically. The course is designed for anyone interested in emotional mastery, whether you\'re new to philosophy or have studied it before.',
      category: 'Prerequisites'
    },
    {
      question: 'Is this theoretical or practical?',
      answer: 'Both! While grounded in authentic Sāṅkhya philosophy, the course is highly practical. You\'ll learn specific techniques for emotional awareness, pattern recognition, and transformation that you can apply immediately to daily life.',
      category: 'Approach'
    },
    {
      question: 'How long until I see results?',
      answer: 'Many students report increased emotional awareness within the first 2 weeks. Deeper transformation through witness consciousness typically develops over 6-8 weeks of consistent practice. The tools and insights continue to deepen over time.',
      category: 'Results'
    },
    {
      question: 'Are live sessions included?',
      answer: 'Yes! The package includes 8 live Q&A and practice sessions with experienced teachers. All sessions are recorded, so you can review them anytime even if you miss the live session.',
      category: 'Course Content'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-saffron-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-rose-200/20 via-purple-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-saffron-200/20 via-rose-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-100 via-purple-100 to-saffron-100 text-rose-700 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" /><span>Emotional Mastery</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                सांख्य दर्शन + भावात्मक बुद्धि<span className="block text-rose-600 mt-2 text-3xl md:text-4xl">Emotional Intelligence</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Transform your emotional intelligence using ancient Sāṅkhya wisdom. Master the three Gunas, develop witness consciousness, and achieve lasting emotional freedom.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-rose-600" /><span>750+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>8-10 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-rose-500 text-rose-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-rose-50 via-purple-50 to-saffron-50 rounded-2xl p-6 border-2 border-rose-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹3,299</div><div className="text-sm text-slate-400 line-through">₹4,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,700</div><div className="text-xs text-slate-500">34% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-rose-600">
                  <Heart className="w-4 h-4" /><span>Guna Profiler • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/6868be22998a012a18cc0360?pid=p1', '_blank')}>
                  Master Emotions Now
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-rose-600 text-rose-700 hover:bg-rose-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-rose-500 text-rose-500" />))}
                </div>
                <span>Ancient Wisdom for Emotional Mastery</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-rose-100 via-purple-100 to-saffron-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Gunas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Heart className="w-8 h-8 text-rose-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Emotions</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Witness</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Freedom</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-rose-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Heart className="w-20 h-20 text-rose-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Emotional Wisdom</p></div>
                  {['Sattva', 'Rajas', 'Tamas', 'Witness'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-rose-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-rose-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Transform Your Emotional Intelligence"
            subtitle="Ancient Sāṅkhya wisdom for modern emotional mastery"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningPathTimeline steps={learningPath} orientation="vertical" />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Emotional Transformation Stories"
            subtitle="Real students who achieved emotional mastery"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about Sāṅkhya emotional intelligence"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Emotional Freedom?"
        subtitle="Master your emotions through ancient Sāṅkhya wisdom and develop true emotional intelligence"
        price="₹3,299"
        originalPrice="₹4,999"
        savings="Save ₹1,700 (34%)"
        primaryCTA={{
          text: 'Master Emotions Now',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/6868be22998a012a18cc0360?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Take Free Guna Assessment',
          action: () => router.push('/guna-profiler')
        }}
        trustBadges={[
          '3 Years Access to All Materials',
          'Guna Profiler Tool Included',
          '8 Live Practice Sessions'
        ]}
        urgency={{
          type: 'discount',
          message: 'Transform your emotional life today!'
        }}
      />
    </div>
  );
}
