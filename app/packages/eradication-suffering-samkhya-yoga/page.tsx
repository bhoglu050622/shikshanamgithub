'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Target, Flame, Wind } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { CourseAccordion } from '@/components/packages/CourseAccordion';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

interface Lesson {
  title: string;
  duration: string;
  type?: 'video' | 'reading' | 'quiz' | 'assignment';
  preview?: boolean;
}

interface CourseModule {
  title: string;
  description: string;
  duration: string;
  level?: string;
  lessons?: Lesson[];
  learningOutcomes?: string[];
}

export default function EradicationSufferingSamkhyaYogaPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Sāṅkhya Knowledge Foundation',
      description: 'Master theoretical knowledge of suffering - 25 Tattvas, three Gunas, and Purusha-Prakriti duality',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Flame,
      title: 'Yoga Practical Path',
      description: 'Patanjali\'s eight-limbed path - systematic practices for ending suffering and achieving Kaivalya',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Eye,
      title: 'Understanding Suffering',
      description: 'Deep analysis of suffering\'s root causes through Sāṅkhya philosophy and discriminative wisdom',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Wind,
      title: 'Meditation & Breathwork',
      description: 'Prāṇāyāma, dhāraṇā, and dhyāna practices from Yoga Sutras for liberation from pain',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Sparkles,
      title: 'Sister Philosophies United',
      description: 'Sāṅkhya provides knowledge, Yoga provides practice - together they form complete path to freedom',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Infinity,
      title: 'Kaivalya Achievement',
      description: 'Journey to absolute liberation - freedom from all suffering through integrated knowledge and practice',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const courseModules: CourseModule[] = [
    {
      title: 'Understanding Suffering (Duḥkha)',
      description: 'Philosophical analysis of suffering\'s nature and causes',
      duration: '2 weeks',
      level: 'Beginner',
      learningOutcomes: [
        'Understand three types of suffering',
        'Identify root causes of pain',
        'Grasp Sāṅkhya analysis',
        'Learn Yoga perspective'
      ],
      lessons: [
        { title: 'Three Types of Duḥkha', duration: '2 hours', type: 'video', preview: true },
        { title: 'Root Causes Analysis', duration: '2 hours', type: 'video', preview: true },
        { title: 'Sāṅkhya-Yoga Approach', duration: '1.5 hours', type: 'video' }
      ]
    },
    {
      title: 'Sāṅkhya Theoretical Foundation',
      description: 'Complete knowledge system for understanding reality and suffering',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master 25 Tattvas system',
        'Understand Purusha-Prakriti',
        'Learn three Gunas dynamics',
        'Grasp discriminative knowledge'
      ],
      lessons: [
        { title: 'Purusha: Pure Consciousness', duration: '3 hours', type: 'video', preview: true },
        { title: 'Prakriti & Evolution', duration: '4 hours', type: 'video' },
        { title: 'Three Gunas Deep Dive', duration: '4 hours', type: 'video' },
        { title: 'Viveka: Discrimination', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Yoga Sutras - Eight Limbs',
      description: 'Patanjali\'s systematic path to ending suffering',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master Yama & Niyama ethics',
        'Learn Āsana & Prāṇāyāma',
        'Practice Pratyāhāra withdrawal',
        'Develop Dhāraṇā & Dhyāna'
      ],
      lessons: [
        { title: 'Yama & Niyama Foundations', duration: '4 hours', type: 'video', preview: true },
        { title: 'Āsana & Prāṇāyāma Practice', duration: '5 hours', type: 'video' },
        { title: 'Pratyāhāra & Inner Focus', duration: '3 hours', type: 'video' },
        { title: 'Dhāraṇā, Dhyāna, Samādhi', duration: '6 hours', type: 'video' }
      ]
    },
    {
      title: 'Integration & Kaivalya',
      description: 'Uniting knowledge and practice for liberation',
      duration: '2 weeks',
      level: 'Advanced',
      learningOutcomes: [
        'Integrate theory and practice',
        'Develop witness consciousness',
        'Understand Kaivalya state',
        'Apply to daily life'
      ],
      lessons: [
        { title: 'Knowledge + Practice', duration: '3 hours', type: 'video', preview: true },
        { title: 'Path to Kaivalya', duration: '4 hours', type: 'video' },
        { title: 'Living Free from Suffering', duration: '2 hours', type: 'video' }
      ]
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('samkhya') || t.course.toLowerCase().includes('yoga') || t.course.toLowerCase().includes('darshan'))
    .slice(0, 6);

  const faq = [
    {
      question: 'How do Sāṅkhya and Yoga work together?',
      answer: 'Sāṅkhya and Yoga are called "sister philosophies" because they\'re two sides of the same coin. Sāṅkhya provides the theoretical knowledge about suffering\'s causes and reality\'s nature. Yoga provides the practical methods to apply that knowledge and achieve liberation. Together they form a complete path.',
      category: 'Philosophy'
    },
    {
      question: 'What types of suffering does this address?',
      answer: 'Three types: (1) Ādhyātmika - suffering from within (mental/emotional pain), (2) Ādhibhautika - suffering from external sources (people, situations), (3) Ādhidaivika - suffering from cosmic/natural forces. The path addresses all three at their root.',
      category: 'Scope'
    },
    {
      question: 'Is this just philosophy or actual practice?',
      answer: 'Both! Sāṅkhya gives philosophical understanding, Yoga gives meditation, breathwork, ethical practices, and concentration techniques. You\'ll learn theory and practice authentic methods for ending suffering.',
      category: 'Approach'
    },
    {
      question: 'Do I need prior meditation experience?',
      answer: 'No prior experience needed. We teach from absolute basics - simple breath awareness to advanced Samādhi states. However, willingness to practice regularly (not just study) is essential for real transformation.',
      category: 'Prerequisites'
    },
    {
      question: 'What is Kaivalya?',
      answer: 'Kaivalya means "absolute independence" or "isolation" - the state where Purusha (consciousness) is completely free from identification with Prakriti (matter/mind). It\'s liberation from all suffering, total freedom, and self-realization.',
      category: 'Goal'
    },
    {
      question: 'How long until I see results?',
      answer: 'Understanding develops quickly (2-3 weeks). Emotional relief from practices begins in 4-6 weeks. Deep transformation through Viveka (discrimination) takes 3-6 months of consistent practice. Liberation is a gradual unfolding.',
      category: 'Timeline'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-saffron-50 to-cyan-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-saffron-200/15 to-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200/20 via-purple-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 via-saffron-100 to-cyan-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Flame className="w-4 h-4" /><span>Path to Liberation</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                दुःख निवारण मार्ग<span className="block text-purple-600 mt-2 text-3xl md:text-4xl">Sāṅkhya + Yoga</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Complete path to eradicating suffering. Sāṅkhya provides knowledge, Yoga provides practice. Together they lead to absolute liberation (Kaivalya).
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" /><span>720+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-saffron-600" /><span>10-12 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-purple-50 via-saffron-50 to-cyan-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹2,699</div><div className="text-sm text-slate-400 line-through">₹3,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,300</div><div className="text-xs text-slate-500">33% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Infinity className="w-4 h-4" /><span>Knowledge + Practice • Complete Path</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-saffron-600 hover:from-purple-700 hover:to-saffron-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/6489826fe4b046d958772a4a?pid=p1', '_blank')}>
                  End Suffering Now
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Path
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />))}
                </div>
                <span>Sister Philosophies - Complete Liberation</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-purple-100 via-saffron-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sāṅkhya</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Flame className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Yoga</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Viveka</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Kaivalya</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-purple-100 to-saffron-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Flame className="w-20 h-20 text-purple-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Path to Freedom</p></div>
                  {['Knowledge', 'Practice', 'Liberation', 'Freedom'].map((text, index) => (
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

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Path to Liberation"
            subtitle="Sister philosophies united for ending all suffering"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseAccordion
            modules={courseModules}
            title="Liberation Journey"
            subtitle="Systematic path from suffering to freedom"
          />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Liberation Stories"
            subtitle="Students who found freedom from suffering"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Understanding the path to liberation"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready to End Suffering?"
        subtitle="Unite Sāṅkhya knowledge with Yoga practice for complete liberation from all pain"
        price="₹2,699"
        originalPrice="₹3,999"
        savings="Save ₹1,300 (33%)"
        primaryCTA={{
          text: 'End Suffering Now',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/6489826fe4b046d958772a4a?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Explore Philosophy Path',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Access to Knowledge & Practice',
          '10 Live Meditation Sessions',
          'Sāṅkhya + Yoga Certificates'
        ]}
        urgency={{
          type: 'discount',
          message: 'Begin your liberation journey today!'
        }}
      />
    </div>
  );
}
