'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Target, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SanskritPhilosophiesBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: BookOpen,
      title: 'Sanskrit Language Mastery',
      description: 'Complete Sanskrit from Devanagari to advanced - master grammar, vocabulary, and text reading for philosophical study',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Brain,
      title: 'All Six Darshanas Complete',
      description: 'Systematic study of Nyāya, Vaisheshika, Sāṅkhya, Yoga, Mīmāṁsā, and Vedānta in their full depth',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Direct Text Access',
      description: 'Read and understand original philosophical texts in Sanskrit - no dependence on translations',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Eye,
      title: 'Philosophical Vocabulary',
      description: 'Master technical philosophical terms in Sanskrit - understand concepts as originally expressed',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Integrated Learning',
      description: 'Language and philosophy taught together - Sanskrit vocabulary grows naturally through philosophical study',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Infinity,
      title: 'Liberation Through Knowledge',
      description: 'Complete path from language foundations to philosophical liberation - Jñāna mārga in its fullness',
      gradient: 'from-rose-500 to-red-600'
    }
  ];

  const learningPath = [
    {
      title: 'Sanskrit Foundations',
      description: 'Devanagari script, basic grammar, essential vocabulary, and pronunciation - building blocks for philosophical study.',
      duration: '4-5 weeks'
    },
    {
      title: 'Logical & Analytical Systems',
      description: 'Study Nyāya and Vaisheshika in Sanskrit - develop logical reasoning while advancing language skills.',
      duration: '3-4 weeks'
    },
    {
      title: 'Dualistic & Practical Philosophies',
      description: 'Explore Sāṅkhya and Yoga with Sanskrit texts - understand consciousness philosophy in original language.',
      duration: '3-4 weeks'
    },
    {
      title: 'Vedic & Liberation Philosophy',
      description: 'Master Mīmāṁsā and Vedānta in Sanskrit - achieve fluency in highest philosophical discourse.',
      duration: '4-5 weeks'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('sanskrit') || t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('darshan'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Why study Sanskrit and philosophy together?',
      answer: 'Sanskrit is the language of philosophy. Technical terms like Brahman, Prakriti, or Kaivalya lose depth in translation. Learning them together means you understand concepts as originally expressed, verify interpretations yourself, and gain direct access to the tradition.',
      category: 'Approach'
    },
    {
      question: 'Is this suitable for complete beginners?',
      answer: 'Yes! We start Sanskrit from Devanagari alphabet and philosophy from foundations. The courses are designed to build together systematically. No prior knowledge needed - just sincere interest in deep learning.',
      category: 'Prerequisites'
    },
    {
      question: 'How does this compare to academic philosophy?',
      answer: 'Academic philosophy is often in English/translation. This gives you authentic access - studying philosophy in the language it was written. You\'ll understand nuances, engage with original texts, and verify scholarly translations yourself.',
      category: 'Benefits'
    },
    {
      question: 'Will I be fluent in Sanskrit?',
      answer: 'You\'ll achieve intermediate to advanced level in philosophical Sanskrit. This means reading and understanding philosophical texts confidently, using technical vocabulary correctly, and basic conversational ability. Perfect for serious students.',
      category: 'Proficiency'
    },
    {
      question: 'How much time should I dedicate?',
      answer: 'Recommend 6-8 hours weekly. Sanskrit needs regular practice, philosophy needs contemplation. The bundle is designed for 14-16 weeks of focused study, but you have 3 years access to learn at your pace.',
      category: 'Time'
    },
    {
      question: 'Are live sessions bilingual?',
      answer: 'Yes! Sessions start English-heavy with Sanskrit introduction, gradually increasing Sanskrit use. This builds confidence while ensuring clear understanding. By the end, you\'ll comfortably follow philosophical discussions in Sanskrit.',
      category: 'Format'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-saffron-50 via-indigo-50 to-purple-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-indigo-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-200/20 via-saffron-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 via-indigo-100 to-purple-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" /><span>Language + Philosophy</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                संस्कृत + हिन्दू दर्शन<span className="block text-saffron-600 mt-2 text-3xl md:text-4xl">Sanskrit + Philosophies</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Master Sanskrit language and all six Darshana philosophies together. Language unlocks direct access to India's complete philosophical tradition.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-saffron-600" /><span>1,450+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-indigo-600" /><span>14-16 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-saffron-500 text-saffron-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-saffron-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-saffron-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹5,899</div><div className="text-sm text-slate-400 line-through">₹6,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,100</div><div className="text-xs text-slate-500">16% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Dual Certification</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-saffron-600">
                  <BookOpen className="w-4 h-4" /><span>Sanskrit + Six Darshanas • Premium</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-saffron-600 to-indigo-600 hover:from-saffron-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/65a12c60e4b05ac7edb4876c?pid=p1', '_blank')}>
                  Master Both Now
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />))}
                </div>
                <span>Language + Philosophy - Direct Tradition Access</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-saffron-100 via-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sanskrit</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Globe className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Texts</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-rose-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Mastery</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-saffron-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Globe className="w-20 h-20 text-saffron-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Direct Access</p></div>
                  {['भाषा', 'दर्शन', 'Nyāya', 'Vedānta'].map((text, index) => (
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

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Language & Philosophy Mastery"
            subtitle="Sanskrit + all six Darshanas for direct philosophical access"
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
            title="Student Transformations"
            subtitle="Mastering language and philosophy together"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about Sanskrit and philosophy study"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Direct Philosophical Access?"
        subtitle="Master Sanskrit and all six Darshanas - unlock the complete Indian philosophical tradition"
        price="₹5,899"
        originalPrice="₹6,999"
        savings="Save ₹1,100 (16%)"
        primaryCTA={{
          text: 'Master Both Now',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/65a12c60e4b05ac7edb4876c?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'View Course Details',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Access to All Content',
          '14 Live Study Sessions',
          'Sanskrit + Philosophy Certificates'
        ]}
        urgency={{
          type: 'discount',
          message: 'Direct access to wisdom tradition - Enroll today!'
        }}
      />
    </div>
  );
}
