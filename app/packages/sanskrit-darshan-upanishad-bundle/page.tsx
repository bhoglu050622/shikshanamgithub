'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Target, Globe, Scroll } from 'lucide-react';
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
    {
      icon: BookOpen,
      title: 'Complete Sanskrit Mastery',
      description: 'From Devanagari basics to advanced text reading - master the language of wisdom and unlock direct access',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Brain,
      title: 'All Six Darshanas',
      description: 'Complete philosophical education - Nyāya, Vaisheshika, Sāṅkhya, Yoga, Mīmāṁsā, and Vedānta systematically taught',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Scroll,
      title: 'Major Upanishads Study',
      description: 'Deep exploration of principal Upanishads with expert commentary - supreme knowledge texts in original language',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'Text Reading Fluency',
      description: 'Develop ability to read and understand original philosophical and spiritual texts in Sanskrit with confidence',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Infinity,
      title: 'Philosophy to Practice',
      description: 'Connect philosophical concepts with meditation, self-inquiry, and spiritual practices for complete realization',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Complete Wisdom Education',
      description: 'Language + Philosophy + Upanishads = Total access to India\'s wisdom tradition without intermediaries',
      gradient: 'from-rose-500 to-red-600'
    }
  ];

  const valueItems = [
    { name: 'Complete Sanskrit Language Course', individualPrice: 7999, included: true },
    { name: 'All Six Darshana Philosophy Courses', individualPrice: 11999, included: true },
    { name: 'Major Upanishads with Commentary', individualPrice: 8999, included: true },
    { name: 'Sanskrit Text Reading Practice', individualPrice: 2999, included: true },
    { name: 'Philosophical Sanskrit Vocabulary', individualPrice: 1999, included: true },
    { name: '20 Live Study Sessions', individualPrice: 2999, included: true },
    { name: 'Reading Materials & Texts', individualPrice: 1999, included: true },
    { name: 'Lifetime Access & Updates', individualPrice: 0, included: true }
  ];

  const bundleFeatures = [
    'Complete Sanskrit from basics to advanced',
    'All six Darshana philosophies',
    'Major Upanishads with commentary',
    'Direct text reading ability',
    'Philosophical vocabulary mastery',
    '20 live sessions with scholars',
    'Devanagari script fluency',
    'Grammar and syntax mastery',
    'Original text comprehension',
    'Lifetime access to all materials',
    'Multiple certificates included',
    'Sanskrit-philosophy integration'
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('sanskrit') || t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('upanishad'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Why learn Sanskrit along with philosophy and Upanishads?',
      answer: 'Sanskrit unlocks direct access to original texts. No translation fully captures the depth of philosophical terms like Brahman, Ātman, or Prakriti. Knowing Sanskrit lets you engage with wisdom in its purest form, understand nuances, and verify interpretations yourself.',
      category: 'Approach'
    },
    {
      question: 'Can complete beginners take this bundle?',
      answer: 'Absolutely! We start Sanskrit from Devanagari alphabet and build systematically. Philosophy and Upanishads also begin from foundations. The beauty is learning them together - Sanskrit vocabulary grows naturally as you study philosophical texts.',
      category: 'Prerequisites'
    },
    {
      question: 'How long to read original Sanskrit texts?',
      answer: 'Basic reading develops in 12-15 weeks. Reading philosophical texts with understanding takes 16-20 weeks of consistent study. By completion, you\'ll comfortably read Upanishads and philosophical works in original Sanskrit.',
      category: 'Timeline'
    },
    {
      question: 'Is this better than learning them separately?',
      answer: 'Yes! Studying together creates synergy. Sanskrit learning is reinforced by reading actual philosophical texts. Philosophy is deeper when studied in original language. Upanishads reveal more when you understand linguistic nuances. The integration accelerates mastery.',
      category: 'Benefits'
    },
    {
      question: 'What level of Sanskrit will I achieve?',
      answer: 'You\'ll achieve intermediate to advanced level in philosophical Sanskrit - ability to read, understand, and analyze Upanishads, Bhagavad Gita, philosophical texts, and basic conversational ability. Perfect for serious students of Indian wisdom.',
      category: 'Proficiency'
    },
    {
      question: 'Are live sessions in Sanskrit?',
      answer: 'Live sessions are bilingual - Sanskrit with English explanations. As the course progresses, more Sanskrit is incorporated. This gradual immersion builds confidence while ensuring clear understanding of all concepts.',
      category: 'Format'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-saffron-50 via-indigo-50 to-emerald-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-indigo-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-emerald-200/20 via-saffron-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 via-indigo-100 to-emerald-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /><span>Complete Wisdom Access</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                संस्कृत + दर्शन + उपनिषद<span className="block text-saffron-600 mt-2 text-3xl md:text-4xl">Ultimate Wisdom Bundle</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Complete mastery of Sanskrit, all six Darshanas, and major Upanishads. Language + Philosophy + Wisdom = Total access to India's ancient knowledge.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-saffron-600" /><span>1,120+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-indigo-600" /><span>20-24 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-saffron-500 text-saffron-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-saffron-50 via-indigo-50 to-emerald-50 rounded-2xl p-6 border-2 border-saffron-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹7,399</div><div className="text-sm text-slate-400 line-through">₹11,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹4,600</div><div className="text-xs text-slate-500">38% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Multiple Certificates</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-saffron-600">
                  <BookOpen className="w-4 h-4" /><span>Language + Philosophy • Complete Access</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-saffron-600 via-indigo-600 to-emerald-600 hover:from-saffron-700 hover:via-indigo-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/66141e980049fe208aba2125?pid=p1', '_blank')}>
                  Get Complete Access
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  See Everything
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />))}
                </div>
                <span>Complete Wisdom Education Package</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-saffron-100 via-indigo-100 to-emerald-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sanskrit</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshana</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Scroll className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Upanishad</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Wisdom</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-saffron-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Globe className="w-20 h-20 text-saffron-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Total Access</p></div>
                  {['Language', 'Philosophy', 'Texts', 'Mastery'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-saffron-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Complete Wisdom Education
            </h2>
            <p className="text-xl text-slate-600">
              Sanskrit + Philosophy + Upanishads = Total mastery
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={7399}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Your Complete Learning Journey"
            subtitle="Language, philosophy, and wisdom united in one comprehensive program"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Student Success Stories"
            subtitle="Students who unlocked direct access to wisdom"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about the ultimate wisdom bundle"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Complete Wisdom Access?"
        subtitle="Master Sanskrit, all philosophies, and Upanishads - everything for direct access to India's ancient knowledge"
        price="₹7,399"
        originalPrice="₹11,999"
        savings="Save ₹4,600 (38%)"
        primaryCTA={{
          text: 'Get Complete Access',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/66141e980049fe208aba2125?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'View Individual Components',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Lifetime Access',
          '20 Live Scholar Sessions',
          'Sanskrit + Philosophy + Upanishad Certificates'
        ]}
        urgency={{
          type: 'discount',
          message: 'Complete wisdom education - Save ₹4,600 today!'
        }}
      />
    </div>
  );
}
