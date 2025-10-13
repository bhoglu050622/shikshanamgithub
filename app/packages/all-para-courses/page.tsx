'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Target, Crown, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { ValueBreakdown } from '@/components/packages/ValueBreakdown';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function AllParaCoursesPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Infinity,
      title: 'Complete Upanishadic Wisdom',
      description: 'All major Upanishads with expert commentary - Isha, Kena, Katha, Prashna, Mundaka, Mandukya, and more',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Brain,
      title: 'All Six Darshanas',
      description: 'Complete philosophical education - Nyāya, Vaisheshika, Sāṅkhya, Yoga, Mīmāṁsā, and Vedānta systematically',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Eye,
      title: 'Advanced Spiritual Practices',
      description: 'Meditation, contemplation, and self-inquiry techniques from all traditions for direct realization',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Sanskrit Scriptural Access',
      description: 'Study original texts in Sanskrit with translations and deep commentary for authentic understanding',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Flame,
      title: 'Liberation Pathways',
      description: 'Multiple paths to Moksha - Jñāna, Bhakti, Karma, and Yoga yogas comprehensively taught',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Sparkles,
      title: 'Wisdom Transmissions',
      description: 'Direct teachings from realized masters in the lineage tradition - not just academic study',
      gradient: 'from-rose-500 to-red-600'
    }
  ];

  const valueItems = [
    { name: 'All Upanishad Study Courses (15+ Upanishads)', individualPrice: 8999, included: true },
    { name: 'Complete Six Darshana Philosophy', individualPrice: 11999, included: true },
    { name: 'Advanced Vedānta & Non-Duality', individualPrice: 4999, included: true },
    { name: 'Meditation & Liberation Practices', individualPrice: 3999, included: true },
    { name: 'Sanskrit for Spiritual Texts', individualPrice: 5999, included: true },
    { name: 'Bhagavad Gita Deep Study', individualPrice: 3999, included: true },
    { name: 'Yoga Sutras Complete', individualPrice: 2999, included: true },
    { name: '20 Live Master Sessions', individualPrice: 2999, included: true },
    { name: 'Lifetime Access & Updates', individualPrice: 0, included: true }
  ];

  const bundleFeatures = [
    'Complete Parā Vidyā (Supreme Knowledge) collection',
    'All 15+ major Upanishads with commentary',
    'All six Darshana philosophies systematically',
    'Advanced Vedānta and non-dual teachings',
    'Bhagavad Gita complete study',
    'Yoga Sutras of Patanjali',
    'Sanskrit for spiritual texts',
    'Authentic meditation practices',
    '20 live sessions with masters',
    'Lifetime access with updates',
    'Traditional certification',
    'Priority mentoring access'
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('upanishad') || t.course.toLowerCase().includes('vedanta') || t.course.toLowerCase().includes('philosophy'))
    .slice(0, 6);

  const faq = [
    {
      question: 'What is Parā Vidyā?',
      answer: 'Parā Vidyā means "supreme knowledge" - knowledge that leads to liberation (Moksha). It includes Upanishads, Darshana philosophies, Vedānta, and meditation practices. Unlike Aparā Vidyā (practical/worldly knowledge), Parā Vidyā directly addresses the nature of reality, consciousness, and ultimate freedom.',
      category: 'Philosophy'
    },
    {
      question: 'Is this different from academic philosophy?',
      answer: 'Yes! While academically rigorous, this is traditional wisdom transmission for realization, not just intellectual study. You\'ll learn from teachers in authentic lineages who practice what they teach. The goal is direct experience, not just theoretical understanding.',
      category: 'Approach'
    },
    {
      question: 'Do I need advanced prerequisites?',
      answer: 'Basic familiarity with Indian philosophy helps but isn\'t required. We include foundational courses that build systematically. However, sincere interest in spiritual growth and willingness to practice is essential - this isn\'t casual learning.',
      category: 'Prerequisites'
    },
    {
      question: 'How long to complete everything?',
      answer: 'The complete collection takes 20-24 weeks of full-time study, or 1-2 years part-time. But you have lifetime access, so take your time. Many students revisit courses multiple times as understanding deepens.',
      category: 'Timeline'
    },
    {
      question: 'Will this lead to spiritual realization?',
      answer: 'The teachings and practices are authentic paths to liberation. However, realization requires sincere practice, not just course completion. We provide the map and guidance; you must walk the path with dedication and proper practice.',
      category: 'Spiritual Goals'
    },
    {
      question: 'Why choose this over individual courses?',
      answer: 'Parā Vidyā is interconnected - Upanishads inform philosophy, philosophy informs practice. The bundle provides complete education worth ₹45,000+ for ₹12,999. You get the full wisdom tradition, not fragments.',
      category: 'Value'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-rose-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-rose-200/20 via-indigo-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-rose-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                <Infinity className="w-4 h-4" /><span>Supreme Knowledge</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                परा विद्या संग्रह<span className="block text-indigo-600 mt-2 text-3xl md:text-4xl">All Parā Courses</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Complete supreme knowledge collection - all Upanishads, six Darshanas, advanced spirituality, and the path to liberation. Everything for ultimate realization.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-indigo-600" /><span>1,240+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>20-24 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-indigo-500 text-indigo-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-indigo-50 via-purple-50 to-rose-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹12,999</div><div className="text-sm text-slate-400 line-through">₹18,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹6,000</div><div className="text-xs text-slate-500">32% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>Lifetime Access • Traditional Certification</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-indigo-600">
                  <Infinity className="w-4 h-4" /><span>Path to Liberation • Supreme Knowledge</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-700 hover:via-purple-700 hover:to-rose-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/678e3649f4f9ad20d3001578?pid=p1', '_blank')}>
                  Begin Liberation Journey
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  Explore Wisdom
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-indigo-500 text-indigo-500" />))}
                </div>
                <span>Complete Parā Vidyā - Knowledge for Liberation</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-rose-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Upanishads</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-rose-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Vedānta</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Flame className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Liberation</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Infinity className="w-20 h-20 text-indigo-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Supreme Knowledge</p></div>
                  {['Upanishads', 'Philosophy', 'Vedānta', 'Moksha'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-indigo-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Complete Supreme Knowledge Collection
            </h2>
            <p className="text-xl text-slate-600">
              Everything for spiritual realization and ultimate liberation
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={12999}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Your Path to Liberation"
            subtitle="Complete Parā Vidyā education for ultimate realization"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Spiritual Transformations"
            subtitle="Students on the path to liberation"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Understanding Parā Vidyā and the path to liberation"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Ultimate Liberation?"
        subtitle="Access the complete Parā Vidyā collection and embark on the supreme journey to self-realization"
        price="₹12,999"
        originalPrice="₹18,999"
        savings="Save ₹6,000 (32%)"
        primaryCTA={{
          text: 'Begin Liberation Journey',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/678e3649f4f9ad20d3001578?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Explore Individual Courses',
          action: () => router.push('/courses')
        }}
        trustBadges={[
          'Lifetime Access to Parā Vidyā',
          '20 Live Master Sessions',
          'Traditional Certification'
        ]}
        urgency={{
          type: 'discount',
          message: 'Complete supreme knowledge - Save ₹6,000 today!'
        }}
      />
    </div>
  );
}
