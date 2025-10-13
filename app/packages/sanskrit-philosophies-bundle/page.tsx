'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, BookOpen, Brain, Globe, Zap, Award, Infinity, Sparkles, Eye, Heart, Target, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { ValueBreakdown } from '@/components/packages/ValueBreakdown';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SanskritPhilosophiesBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    { icon: BookOpen, title: 'Sanskrit Language Complete', description: 'Master Sanskrit from basics to advanced - script, grammar, vocabulary, text reading', gradient: 'from-blue-500 to-cyan-600' },
    { icon: Brain, title: 'All Six Darshanas', description: 'Complete systematic study - Nyaya, Vaisheshik, Samkhya, Yoga, Mimamsa, Vedanta', gradient: 'from-purple-500 to-indigo-600' },
    { icon: Globe, title: 'Read Original Sutras', description: 'Develop ability to read philosophical texts in original Sanskrit', gradient: 'from-saffron-500 to-amber-600' },
    { icon: Zap, title: 'Integrated Learning', description: 'Language unlocks philosophy - both taught progressively together', gradient: 'from-emerald-500 to-green-600' },
    { icon: Infinity, title: 'Traditional Method', description: 'Authentic traditional education combining language with philosophy', gradient: 'from-rose-500 to-pink-600' },
    { icon: Award, title: 'Complete Mastery', description: 'Comprehensive certification in Sanskrit and Indian philosophy', gradient: 'from-orange-500 to-red-600' }
  ];

  const valueItems = [
    { name: 'Sanskrit Language Foundations', individualPrice: 4999, included: true },
    { name: 'Nyaya Darshan', individualPrice: 1499, included: true },
    { name: 'Vaisheshika Darshan', individualPrice: 1499, included: true },
    { name: 'Samkhya Darshan', individualPrice: 1499, included: true },
    { name: 'Yoga Darshan', individualPrice: 1499, included: true },
    { name: 'Purva Mimamsa', individualPrice: 1499, included: true },
    { name: 'Vedanta Darshan', individualPrice: 1999, included: true },
    { name: 'Live Q&A Sessions', individualPrice: 1499, included: true }
  ];

  const bundleFeatures = ['3 years access to Sanskrit + All 6 Darshanas', 'Learn to read original Sutras', 'Traditional integrated education', 'Weekly live sessions', 'Expert scholar support', 'Downloadable materials', 'Master certificate', 'Community access'];

  const relevantTestimonials = testimonialsData.testimonials.filter(t => t.course.toLowerCase().includes('sanskrit') || t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('darshan')).slice(0, 6);

  const faq = [
    { question: 'Why learn Sanskrit for philosophy?', answer: 'Sanskrit philosophical terms are untranslatable. Direct access to concepts like Dharma, Prakriti, Purusha without losing meaning. This bundle teaches both progressively.', category: 'Approach' },
    { question: 'Can beginners start?', answer: 'Yes! Sanskrit starts from scratch (Devanagari), philosophy builds systematically. Perfect for beginners wanting comprehensive traditional education.', category: 'Prerequisites' },
    { question: 'How comprehensive?', answer: 'Complete - all six Darshanas with their foundational texts, key concepts, debates, applications. Plus full Sanskrit proficiency.', category: 'Content' },
    { question: 'Timeline?', answer: 'Typically 15-18 months with regular study. 3 years access allows your own pace.', category: 'Duration' }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/20 via-purple-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-200/20 via-blue-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /><span>Language + Philosophy</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Sanskrit + Six Darshanas<span className="block text-blue-600 mt-2">Bundle</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Master Sanskrit language and all six schools of Indian philosophy in one comprehensive traditional education bundle for complete learning.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-blue-600" /><span>380+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>15-18 Months</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-blue-500 text-blue-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹5,899</div><div className="text-sm text-slate-400 line-through">₹6,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,100</div><div className="text-xs text-slate-500">16% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Master Certificate</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <BookOpen className="w-4 h-4" /><span>Sanskrit + Philosophies • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
                  Get Bundle
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />))}
                </div>
                <span>Language + Philosophy - Complete Traditional Education</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-blue-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sanskrit</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Logic</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-blue-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Wisdom</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Brain className="w-20 h-20 text-blue-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Language + Philosophy</p></div>
                  {['Sanskrit', 'Darshanas', 'Logic', 'Wisdom'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-blue-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><ValueBreakdown items={valueItems} bundlePrice={5899} currency="₹" features={bundleFeatures} /></div></div>
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFeatures title="Traditional Education System" subtitle="Language + Philosophy integrated learning" features={premiumFeatures} layout="staggered" /></div></div>
      <div className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumTestimonials testimonials={relevantTestimonials} title="Success Stories" subtitle="Students mastering language and philosophy" /></div></div>
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFAQ faqs={faq} title="Questions & Answers" /></div></div>
      <PremiumCTA title="Ready for Traditional Education?" subtitle="Master Sanskrit and all six schools of philosophy" price="₹5,899" originalPrice="₹6,999" savings="Save ₹1,100 (16%)" primaryCTA={{ text: 'Get Bundle Now', action: () => window.open('https://courses.shikshanam.in', '_blank') }} secondaryCTA={{ text: 'View All', action: () => router.push('/packages') }} trustBadges={['3 years Access', 'Master Certificate', 'Expert Support']} urgency={{ type: 'discount', message: 'Special bundle pricing - Save 16% today!' }} />
    </div>
  );
}
