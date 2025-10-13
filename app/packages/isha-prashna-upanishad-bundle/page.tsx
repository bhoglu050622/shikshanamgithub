'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Scroll, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function IshaProshnaUpanishadBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Sun,
      title: 'Isha Upanishad - Poetry of Truth',
      description: 'Beautiful poetic verses revealing the ultimate reality - harmony of renunciation and enjoyment in divine wisdom',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Prashna Upanishad - Systematic Inquiry',
      description: 'Six profound questions about life, death, consciousness, and reality answered through systematic philosophical inquiry',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Infinity,
      title: 'Non-Dual Realization',
      description: 'Understand the oneness of individual soul (Ātman) and universal reality (Brahman) through both traditions',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Sparkles,
      title: 'Meditation Practices',
      description: 'Authentic contemplation techniques from both Upanishads for direct experience of truth',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: BookOpen,
      title: 'Sanskrit Study',
      description: 'Engage with original Sanskrit verses, learn key terms, and develop understanding of Upanishadic language',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Heart,
      title: 'Integrated Wisdom',
      description: 'Combine poetic revelation with systematic inquiry for complete understanding of ultimate reality',
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const learningPath = [
    {
      title: 'Isha Upanishad Foundation',
      description: 'Study all 18 verses of Isha - understanding divine fullness, renunciation, and living in harmony with ultimate truth.',
      duration: '2 weeks'
    },
    {
      title: 'Isha Practice & Integration',
      description: 'Apply Isha teachings to daily life - balancing worldly duties with spiritual wisdom, action with detachment.',
      duration: '1 week'
    },
    {
      title: 'Prashna Upanishad Inquiry',
      description: 'Explore six fundamental questions - Prāṇa, consciousness, sleep states, Om, and the path to Brahman knowledge.',
      duration: '2 weeks'
    },
    {
      title: 'Synthesis & Realization',
      description: 'Integrate both Upanishads - meditation practices, self-inquiry, and direct contemplation of ultimate reality.',
      duration: '1 week'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('upanishad') || t.course.toLowerCase().includes('vedanta') || t.course.toLowerCase().includes('philosophy'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Why study Isha and Prashna together?',
      answer: 'Isha is poetic and revelatory - it presents truth through beautiful verses that inspire the heart. Prashna is systematic and analytical - it answers fundamental questions through logical inquiry. Together they provide both emotional inspiration and intellectual clarity for complete understanding.',
      category: 'Approach'
    },
    {
      question: 'Are these Upanishads suitable for beginners?',
      answer: 'Yes! Isha is one of the shortest and most accessible Upanishads - perfect for beginners. Prashna, while slightly more complex, is well-structured through six questions. We teach both from foundations with clear explanations.',
      category: 'Prerequisites'
    },
    {
      question: 'What makes Isha Upanishad special?',
      answer: 'Isha is unique for teaching how to live in the world while being established in spiritual truth. It doesn\'t advocate world-renunciation but shows how to enjoy life while seeing everything as pervaded by the Divine. It\'s practical wisdom for householders.',
      category: 'Content'
    },
    {
      question: 'What are the six questions in Prashna?',
      answer: 'The six questions explore: (1) Origin of life and matter, (2) Powers of Prāṇa, (3) Nature of Prāṇa, (4) Sleep and dream states, (5) Meditation on Om, (6) The sixteen parts of Purusha. Each reveals deeper layers of reality.',
      category: 'Content'
    },
    {
      question: 'Do I need Sanskrit knowledge?',
      answer: 'Sanskrit helps but isn\'t required. We provide complete translations, word-by-word meanings, and thorough explanations. The beauty is that studying these Upanishads actually helps you learn key Sanskrit terms naturally.',
      category: 'Language'
    },
    {
      question: 'How will this benefit my spiritual practice?',
      answer: 'You\'ll learn meditation on Om, self-inquiry techniques, and methods for seeing the Divine in all. The teachings directly support practices like mindfulness, contemplation, and developing witness consciousness.',
      category: 'Practice'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-cyan-200/20 via-emerald-200/15 to-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 via-cyan-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-100 via-emerald-100 to-blue-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
                <Scroll className="w-4 h-4" /><span>Upanishadic Wisdom</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                ईश + प्रश्न उपनिषद<span className="block text-cyan-600 mt-2 text-3xl md:text-4xl">Essence of Enlightenment</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Two profound Upanishads united - Isha's poetic wisdom combined with Prashna's systematic inquiry. Poetry meets philosophy for complete enlightenment.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-cyan-600" /><span>580+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-emerald-600" /><span>6-8 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-cyan-500 text-cyan-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-cyan-50 via-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹2,248</div><div className="text-sm text-slate-400 line-through">₹2,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹751</div><div className="text-xs text-slate-500">25% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-cyan-600">
                  <Scroll className="w-4 h-4" /><span>Two Upanishads • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/66142b3d16c5b80f956291ea?pid=p1', '_blank')}>
                  Begin Upanishad Study
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  Explore Wisdom
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-cyan-500 text-cyan-500" />))}
                </div>
                <span>Poetry & Philosophy - Complete Enlightenment</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-cyan-100 via-emerald-100 to-blue-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sun className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Isha</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Prashna</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-blue-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Truth</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Wisdom</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-cyan-100 to-emerald-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Scroll className="w-20 h-20 text-cyan-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Upanishadic Wisdom</p></div>
                  {['Poetry', 'Inquiry', 'Truth', 'Practice'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-cyan-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Two Paths to Ultimate Truth"
            subtitle="Poetry and systematic inquiry for complete understanding"
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
            title="Upanishadic Wisdom Experiences"
            subtitle="Students who discovered ultimate truth"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about Isha and Prashna Upanishads"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Upanishadic Wisdom?"
        subtitle="Unite poetic revelation with systematic inquiry and discover the essence of enlightenment"
        price="₹2,248"
        originalPrice="₹2,999"
        savings="Save ₹751 (25%)"
        primaryCTA={{
          text: 'Begin Upanishad Study',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/66142b3d16c5b80f956291ea?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Explore More Upanishads',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Access to Both Upanishads',
          '6 Live Commentary Sessions',
          'Meditation Practice Guides'
        ]}
        urgency={{
          type: 'discount',
          message: 'Discover Upanishadic wisdom today!'
        }}
      />
    </div>
  );
}
