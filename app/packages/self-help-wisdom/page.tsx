'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Heart, Brain, Lightbulb, Shield, Sparkles, Target, Compass, Award, Infinity, Eye, BookOpen, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SelfHelpWisdomPackagePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Heart,
      title: 'Ancient Wisdom for Modern Life',
      description: 'Apply timeless Indian wisdom to contemporary challenges - Dharma, Karma, and Moksha in daily living',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Brain,
      title: 'Meditation & Mindfulness',
      description: 'Traditional meditation techniques adapted for modern practitioners - breathing, mantras, and mindful living',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Lightbulb,
      title: 'Life Coaching Through Wisdom',
      description: 'Personal development using ancient principles - self-discovery, goal setting, and overcoming obstacles',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Target,
      title: 'Practical Daily Exercises',
      description: 'Real-world applications and exercises based on ancient wisdom for immediate transformation',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Compass,
      title: 'Personal Transformation Tools',
      description: 'Proven techniques and rituals from Indian traditions for lasting personal growth',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Community Support',
      description: 'Join a supportive community of practitioners on the path of wisdom-based transformation',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const learningPath = [
    {
      title: 'Ancient Wisdom Foundations',
      description: 'Explore core concepts of Dharma (righteous living), Karma (action and consequence), and Moksha (liberation) applied to modern life.',
      duration: '2 weeks'
    },
    {
      title: 'Meditation & Practice',
      description: 'Master traditional meditation techniques including breathing practices, mantra meditation, and cultivating mindfulness in daily activities.',
      duration: '3 weeks'
    },
    {
      title: 'Personal Transformation',
      description: 'Apply wisdom to personal development - self-discovery exercises, goal alignment with dharma, and overcoming inner obstacles.',
      duration: '3 weeks'
    },
    {
      title: 'Daily Living Integration',
      description: 'Create sustainable practices and rituals that integrate ancient wisdom into your modern lifestyle for lasting transformation.',
      duration: 'Ongoing'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.featured || t.rating === 5)
    .slice(0, 6);

  const faq = [
    {
      question: 'Is this only theoretical or also practical?',
      answer: 'Highly practical! While rooted in ancient wisdom, the course focuses on real-world applications, daily exercises, and techniques you can implement immediately in modern life.',
      category: 'Approach'
    },
    {
      question: 'Do I need prior knowledge of Indian philosophy?',
      answer: 'No prior knowledge needed. We explain all concepts clearly and focus on practical application rather than academic study. Perfect for beginners seeking transformation.',
      category: 'Prerequisites'
    },
    {
      question: 'How is this different from modern self-help?',
      answer: 'This draws from thousands of years of tested wisdom traditions. Rather than quick fixes, it provides deep, lasting transformation based on understanding universal principles of Dharma, Karma, and conscious living.',
      category: 'Philosophy'
    },
    {
      question: 'Will I get personalized guidance?',
      answer: 'Yes! The package includes community support, live Q&A sessions, and practical exercises tailored to your personal transformation journey.',
      category: 'Support'
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
                <Heart className="w-4 h-4" /><span>Wisdom-Based Transformation</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Self-Help Through<span className="block text-rose-600 mt-2">Ancient Wisdom</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Transform your life using timeless Indian wisdom. Practical tools and techniques from ancient traditions for modern challenges and personal growth.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-rose-600" /><span>520+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>8 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-rose-500 text-rose-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-rose-50 via-purple-50 to-saffron-50 rounded-2xl p-6 border-2 border-rose-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹1,999</div><div className="text-sm text-slate-400 line-through">₹3,499</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,500</div><div className="text-xs text-slate-500">43% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-rose-600">
                  <Heart className="w-4 h-4" /><span>Life Transformation • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
                  Begin Transformation
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-rose-600 text-rose-700 hover:bg-rose-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-rose-500 text-rose-500" />))}
                </div>
                <span>Ancient Wisdom for Modern Life Transformation</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-rose-100 via-purple-100 to-saffron-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Heart className="w-8 h-8 text-rose-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Dharma Living</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Meditation</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Target className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Transformation</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Daily Practice</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-rose-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Heart className="w-20 h-20 text-rose-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Ancient Wisdom</p></div>
                  {['Dharma', 'Meditation', 'Growth', 'Practice'].map((text, index) => (
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
          <PremiumFeatures title="Practical Wisdom Tools" subtitle="Ancient knowledge for modern transformation" features={premiumFeatures} layout="staggered" />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningPathTimeline steps={learningPath} orientation="vertical" />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials testimonials={relevantTestimonials} title="Transformation Stories" subtitle="Real change through ancient wisdom" />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ faqs={faq} title="Frequently Asked Questions" subtitle="Everything about wisdom-based transformation" />
        </div>
      </div>

      <PremiumCTA
        title="Ready to Transform Your Life?"
        subtitle="Apply ancient wisdom to modern challenges for lasting personal growth"
        price="₹1,999"
        originalPrice="₹2,999"
        savings="Save ₹1,000 (33%)"
        primaryCTA={{ text: 'Begin Transformation', action: () => window.open('https://courses.shikshanam.in', '_blank') }}
        secondaryCTA={{ text: 'View All Packages', action: () => router.push('/packages') }}
        trustBadges={['3 years Access', 'Community Support', 'Certificate Included']}
        urgency={{ type: 'discount', message: 'Transform your life with ancient wisdom today!' }}
      />
    </div>
  );
}
