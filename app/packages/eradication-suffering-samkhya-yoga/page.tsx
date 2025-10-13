'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, Activity, Eye, Infinity, Heart, Mountain, Sparkles, Zap, BookOpen, Target, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function EradicationSufferingPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Sāṅkhya Philosophy Complete',
      description: 'Understanding the root of suffering through discriminative knowledge - Purusha-Prakriti duality and the 25 Tattvas',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Eye,
      title: 'Yoga Sutras of Patanjali',
      description: 'Complete study of Patanjali\'s timeless wisdom - from Chitta Vritti Nirodha to Kaivalya',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Mountain,
      title: 'Eight Limbs Detailed Study',
      description: 'Systematic practice of Ashtanga Yoga - Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Practical Liberation Path',
      description: 'Daily meditation techniques, asana and pranayama practices for direct experience',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Weekly Live Practice Sessions',
      description: 'Expert-guided meditation, pranayama, and philosophical discussions for deeper understanding',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Infinity,
      title: 'Path to Freedom from Suffering',
      description: 'Integration of Sāṅkhya knowledge with Yoga practice for complete liberation',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const learningPath = [
    {
      title: 'Sāṅkhya Philosophy Foundation',
      description: 'Understanding consciousness and matter, the root of suffering through discriminative knowledge. Master the 25 Tattvas and Purusha-Prakriti dynamics.',
      duration: '4 weeks'
    },
    {
      title: 'Yoga Sutras Complete Study',
      description: 'Deep dive into Patanjali\'s Yoga Sutras - definitions of Yoga, obstacles, means of overcoming, and the path to Samadhi.',
      duration: '4 weeks'
    },
    {
      title: 'Eight Limbs Systematic Practice',
      description: 'Progressive mastery of Ashtanga Yoga from ethical foundations to meditative absorption and liberation.',
      duration: '4 weeks'
    },
    {
      title: 'Integration & Daily Practice',
      description: 'Synthesize Sāṅkhya wisdom with Yoga practice. Develop sustainable daily routines for continuous spiritual growth.',
      duration: 'Ongoing'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('yoga') || t.course.toLowerCase().includes('samkhya') || t.course.toLowerCase().includes('meditation'))
    .slice(0, 6);

  const faq = [
    {
      question: 'How do Sāṅkhya and Yoga work together?',
      answer: 'Sāṅkhya provides the theoretical knowledge - understanding consciousness, matter, and the causes of suffering. Yoga provides the practical path - techniques for liberation. Together they form a complete system: Sāṅkhya tells you WHY you suffer, Yoga shows you HOW to end it.',
      category: 'Philosophy'
    },
    {
      question: 'Is this only philosophical or also practical?',
      answer: 'Both! You get deep theoretical understanding through Sāṅkhya philosophy AND practical techniques through Yoga - meditation, pranayama, asana, and daily spiritual practices. Theory and practice are perfectly integrated.',
      category: 'Approach'
    },
    {
      question: 'Do I need meditation experience?',
      answer: 'No prior experience needed. We start from basics and progress systematically. Whether you\'re new to meditation or experienced, you\'ll gain profound insights and deepen your practice.',
      category: 'Prerequisites'
    },
    {
      question: 'Will this really help end suffering?',
      answer: 'Yes, if you apply the teachings sincerely. Sāṅkhya-Yoga offers a time-tested path to liberation from suffering through discriminative knowledge and practical techniques. Many students report significant transformation in their relationship with suffering.',
      category: 'Benefits'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-cyan-50 to-emerald-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-cyan-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200/20 via-purple-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Packages
          </Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 via-cyan-100 to-emerald-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Infinity className="w-4 h-4" /><span>Liberation Path</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Eradication of Suffering<span className="block text-purple-600 mt-2">Sāṅkhya + Yoga</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Master the complete path from understanding to liberation. Sāṅkhya wisdom united with Yoga practice for freedom from suffering.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" /><span>780+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-cyan-600" /><span>12-14 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-purple-50 via-cyan-50 to-emerald-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹2,699</div><div className="text-sm text-slate-400 line-through">₹3,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,300</div><div className="text-xs text-slate-500">33% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Infinity className="w-4 h-4" /><span>Liberation Path • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
                  Begin Liberation Path
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />))}
                </div>
                <span>Complete Path to Freedom from Suffering</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-purple-100 via-cyan-100 to-emerald-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sāṅkhya</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Mountain className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Yoga</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Practice</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-rose-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Liberation</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-purple-100 to-cyan-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Infinity className="w-20 h-20 text-purple-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Path to Liberation</p></div>
                  {['Sāṅkhya', 'Yoga', 'Practice', 'Freedom'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-purple-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures title="Complete Liberation System" subtitle="Theory and practice united for freedom from suffering" features={premiumFeatures} layout="staggered" />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningPathTimeline steps={learningPath} orientation="vertical" />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials testimonials={relevantTestimonials} title="Liberation Stories" subtitle="Real transformations from students on the path" />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ faqs={faq} title="Frequently Asked Questions" subtitle="Everything about the path to liberation" />
        </div>
      </div>

      <PremiumCTA
        title="Ready to End Suffering?"
        subtitle="Master the complete path from Sāṅkhya wisdom to Yoga practice"
        price="₹2,699"
        originalPrice="₹3,999"
        savings="Save ₹1,300 (33%)"
        primaryCTA={{ text: 'Begin Liberation Journey', action: () => window.open('https://courses.shikshanam.in', '_blank') }}
        secondaryCTA={{ text: 'View All Packages', action: () => router.push('/packages') }}
        trustBadges={['3 years Access', 'Weekly Live Sessions', 'Certificate Included']}
        urgency={{ type: 'discount', message: 'Transform your relationship with suffering today!' }}
      />
    </div>
  );
}
