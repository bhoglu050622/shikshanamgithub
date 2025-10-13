'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Target, Scroll } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function HinduPhilosophiesUpanishadsPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'All Six Darshanas Complete',
      description: 'Master Nyāya, Vaisheshika, Sāṅkhya, Yoga, Mīmāṁsā, and Vedānta - the complete philosophical framework of Hinduism',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Scroll,
      title: 'Major Upanishads Study',
      description: 'Deep dive into principal Upanishads - Isha, Kena, Katha, Prashna, Mundaka, Mandukya, and more with expert commentary',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Infinity,
      title: 'Philosophy to Practice',
      description: 'Connect philosophical concepts with spiritual practices - meditation, self-inquiry, and contemplation techniques',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Systematic Understanding',
      description: 'Build comprehensive knowledge from logical foundations to ultimate non-dual realization step by step',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: BookOpen,
      title: 'Sanskrit Text Study',
      description: 'Engage with original Sanskrit verses, learn key terms, and develop ability to read philosophical texts',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Sparkles,
      title: 'Liberation Pathways',
      description: 'Understand multiple approaches to Moksha through philosophical knowledge and Upanishadic wisdom',
      gradient: 'from-rose-500 to-pink-600'
    }
  ];

  const learningPath = [
    {
      title: 'Foundational Philosophies',
      description: 'Start with Nyāya logic and Vaisheshika atomism - building logical reasoning and analytical thinking skills.',
      duration: '4-5 weeks'
    },
    {
      title: 'Dualistic Systems',
      description: 'Study Sāṅkhya and Yoga - understanding consciousness-matter duality and the path of practical spiritual discipline.',
      duration: '4-5 weeks'
    },
    {
      title: 'Vedic Interpretation',
      description: 'Explore Mīmāṁsā and Vedānta - from ritual interpretation to ultimate non-dual philosophy and Brahman realization.',
      duration: '5-6 weeks'
    },
    {
      title: 'Upanishadic Wisdom',
      description: 'Deep study of major Upanishads - Ātman-Brahman teaching, meditation practices, and path to self-realization.',
      duration: '5-6 weeks'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('upanishad') || t.course.toLowerCase().includes('vedanta'))
    .slice(0, 6);

  const faq = [
    {
      question: 'What is the connection between Darshanas and Upanishads?',
      answer: 'The six Darshanas are systematic philosophical schools that developed to explain and systematize the wisdom found in the Upanishads. The Darshanas provide logical frameworks, while Upanishads contain the direct revelatory wisdom. Together they give both philosophical rigor and spiritual insight.',
      category: 'Philosophy'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes, if you\'re new to Hindu philosophy. We start from foundations and build systematically. However, some maturity of thought and sincere interest in philosophical inquiry is helpful. Complete beginners to philosophy may want foundational courses first.',
      category: 'Prerequisites'
    },
    {
      question: 'How much Sanskrit do I need?',
      answer: 'Basic Sanskrit familiarity helps but isn\'t essential. We provide all translations and explain key terms thoroughly. However, if you plan to study original texts deeply, consider our Sanskrit courses alongside this package.',
      category: 'Language'
    },
    {
      question: 'Will this help my spiritual practice?',
      answer: 'Absolutely! This isn\'t just academic philosophy - you\'ll learn meditation techniques, self-inquiry methods, and practices from each tradition. The Upanishads especially provide direct paths to realization that complement philosophical understanding.',
      category: 'Practice'
    },
    {
      question: 'How are the six Darshanas different?',
      answer: 'Each Darshana approaches truth from a different angle: Nyāya (logic), Vaisheshika (atomic theory), Sāṅkhya (dualism), Yoga (practice), Mīmāṁsā (ritual), and Vedānta (non-dualism). Together they provide complete philosophical coverage from logic to liberation.',
      category: 'Philosophy'
    },
    {
      question: 'Are live sessions interactive?',
      answer: 'Yes! The 18 live sessions include Q&A, discussions, and guided meditations. You can ask questions, clarify doubts, and engage in philosophical discussions with teachers and fellow students.',
      category: 'Format'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-200/20 via-indigo-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" /><span>Complete Hindu Philosophy</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                दर्शन + उपनिषद<span className="block text-indigo-600 mt-2 text-3xl md:text-4xl">Philosophies + Upanishads</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Complete Hindu philosophical education - all six Darshanas plus major Upanishads. From logical reasoning to ultimate liberation through systematic wisdom.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-indigo-600" /><span>980+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>18-22 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-indigo-500 text-indigo-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹5,665</div><div className="text-sm text-slate-400 line-through">₹7,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹2,334</div><div className="text-xs text-slate-500">29% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-indigo-600">
                  <Brain className="w-4 h-4" /><span>Complete Philosophy • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/6620c94d738059528460072e?pid=p1', '_blank')}>
                  Begin Wisdom Journey
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-indigo-500 text-indigo-500" />))}
                </div>
                <span>Complete Hindu Philosophy & Upanishads</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Scroll className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Upanishads</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Wisdom</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-pink-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Liberation</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Brain className="w-20 h-20 text-indigo-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Hindu Philosophy</p></div>
                  {['Nyāya', 'Sāṅkhya', 'Vedānta', 'Moksha'].map((text, index) => (
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

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Philosophical Education"
            subtitle="All six Darshanas plus major Upanishads for total wisdom"
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
            title="Philosophical Transformations"
            subtitle="Students who mastered Hindu wisdom traditions"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about Hindu philosophies and Upanishads"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready to Master Hindu Philosophy?"
        subtitle="Complete education in all six Darshanas and major Upanishads - from logic to liberation"
        price="₹5,665"
        originalPrice="₹7,999"
        savings="Save ₹2,334 (29%)"
        primaryCTA={{
          text: 'Begin Wisdom Journey',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/6620c94d738059528460072e?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Explore Philosophy Courses',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Access to All Content',
          '18 Live Philosophy Sessions',
          'Certificates for Each Darshana'
        ]}
        urgency={{
          type: 'discount',
          message: 'Master complete Hindu philosophy today!'
        }}
      />
    </div>
  );
}
