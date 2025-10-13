'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, BookOpen, Brain, Sparkles, Infinity, Award, Mic, FileText, Eye, Heart, Target, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { ValueBreakdown } from '@/components/packages/ValueBreakdown';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SanskritDarshanUpanishadBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    { icon: Mic, title: 'Complete Sanskrit Mastery', description: 'From Devanagari basics to advanced grammar and text reading - full language proficiency', gradient: 'from-blue-500 to-cyan-600' },
    { icon: Brain, title: 'Six Classical Darshanas', description: 'Complete study of all six schools of Indian philosophy - Nyaya, Vaisheshik, Samkhya, Yoga, Mimamsa, Vedanta', gradient: 'from-purple-500 to-indigo-600' },
    { icon: Sparkles, title: 'Upanishadic Wisdom', description: 'Deep exploration of principal Upanishads - Isha, Kena, Katha, Mundaka, Mandukya, Taittiriya', gradient: 'from-saffron-500 to-amber-600' },
    { icon: FileText, title: 'Read Original Texts', description: 'Develop ability to read and understand Sanskrit philosophical texts in original language', gradient: 'from-emerald-500 to-green-600' },
    { icon: Infinity, title: 'Integrated Learning', description: 'Sanskrit language skills unlock philosophical depth - language and philosophy taught together', gradient: 'from-rose-500 to-pink-600' },
    { icon: Award, title: 'Master Certificate', description: 'Comprehensive certification demonstrating mastery of Sanskrit, philosophy, and wisdom texts', gradient: 'from-orange-500 to-red-600' }
  ];

  const valueItems = [
    { name: 'Sanskrit Language Complete Course', individualPrice: 4999, included: true },
    { name: 'Nyaya & Vaisheshik Darshanas', individualPrice: 2999, included: true },
    { name: 'Samkhya & Yoga Darshanas', individualPrice: 2999, included: true },
    { name: 'Mimamsa & Vedanta Darshanas', individualPrice: 3499, included: true },
    { name: 'Upanishadic Wisdom Complete', individualPrice: 2999, included: true },
    { name: 'Live Sessions (20 sessions)', individualPrice: 1999, included: true },
    { name: 'Master Certificate', individualPrice: 999, included: true }
  ];

  const bundleFeatures = [
    '3 years access to Sanskrit + Philosophy + Upanishads',
    'Learn to read original Sanskrit texts',
    'Complete six Darshanas systematically',
    'Deep Upanishadic wisdom study',
    'Weekly live Q&A sessions',
    'Downloadable study materials',
    'Master certificate upon completion',
    'Expert scholar support'
  ];

  const relevantTestimonials = testimonialsData.testimonials.filter(t => t.featured || t.course.toLowerCase().includes('sanskrit') || t.course.toLowerCase().includes('philosophy')).slice(0, 6);

  const faq = [
    { question: 'Why bundle Sanskrit with philosophy?', answer: 'Sanskrit philosophical terms are untranslatable. Learning Sanskrit allows direct access to concepts without losing meaning in translation. This bundle teaches both progressively - use Sanskrit immediately in philosophy study.', category: 'Bundle' },
    { question: 'Is this suitable for complete beginners?', answer: 'Yes! Sanskrit starts from absolute basics (Devanagari script), and philosophical concepts build systematically. Designed for beginners wanting comprehensive traditional education.', category: 'Prerequisites' },
    { question: 'How long to complete everything?', answer: 'Typically 18-24 months with regular study (6-8 hours/week). You have 3 years access to learn at your own pace.', category: 'Timeline' },
    { question: 'Will I be able to read original texts?', answer: 'Yes! By completing Sanskrit + Upanishad courses, you\'ll be able to read and comprehend original Sanskrit philosophical texts including Upanishads and Sutras.', category: 'Outcomes' }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-saffron-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/20 via-purple-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-saffron-200/20 via-blue-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 via-purple-100 to-saffron-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /><span>Complete Bundle</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Sanskrit + Darshanas<span className="block text-purple-600 mt-2">+ Upanishads</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Master Sanskrit language, six schools of philosophy, and Upanishadic wisdom in one comprehensive bundle for complete traditional education.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-blue-600" /><span>450+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>18-24 Months</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-blue-50 via-purple-50 to-saffron-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹7,399</div><div className="text-sm text-slate-400 line-through">₹11,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹4,600</div><div className="text-xs text-slate-500">38% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Master Certificate</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <BookOpen className="w-4 h-4" /><span>Complete Education • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-saffron-600 hover:from-blue-700 hover:via-purple-700 hover:to-saffron-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
                  Get Complete Bundle
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />))}
                </div>
                <span>Complete Traditional Education - Language + Philosophy + Wisdom</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-saffron-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-blue-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sanskrit</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Upanishads</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Mastery</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-blue-100 via-purple-100 to-saffron-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><BookOpen className="w-20 h-20 text-purple-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Complete Bundle</p></div>
                  {['Sanskrit', 'Darshanas', 'Upanishads', 'Wisdom'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-purple-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-saffron-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><h2 className="text-4xl font-bold text-slate-800 mb-4">Exceptional Value</h2></div><ValueBreakdown items={valueItems} bundlePrice={7399} currency="₹" features={bundleFeatures} /></div></div>
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFeatures title="Complete Traditional Education" subtitle="Language, philosophy, and wisdom united" features={premiumFeatures} layout="staggered" /></div></div>
      <div className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumTestimonials testimonials={relevantTestimonials} title="Student Transformations" subtitle="Real experiences from comprehensive learners" /></div></div>
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFAQ faqs={faq} title="Frequently Asked Questions" /></div></div>
      <PremiumCTA title="Ready for Complete Mastery?" subtitle="Sanskrit language + Six philosophies + Upanishadic wisdom" price="₹7,399" originalPrice="₹11,999" savings="Save ₹4,600 (38%)" primaryCTA={{ text: 'Get Complete Bundle', action: () => window.open('https://courses.shikshanam.in', '_blank') }} secondaryCTA={{ text: 'View Packages', action: () => router.push('/packages') }} trustBadges={['3 years Access', 'Master Certificate', 'Expert Support']} urgency={{ type: 'seats', message: 'Limited enrollment - Only 40 students per cohort!' }} />
    </div>
  );
}
