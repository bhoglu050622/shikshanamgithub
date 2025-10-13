'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, Eye, Infinity, Sparkles, Award, Heart, Sun, Moon, Zap, Target } from 'lucide-react';
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

export default function VedantaShaivismBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Infinity,
      title: 'Advaita Vedānta Mastery',
      description: 'Deep study of non-dual philosophy - Brahman, Ātman identity, and the path to liberation through knowledge',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Sparkles,
      title: 'Kashmir Shaivism Wisdom',
      description: 'Explore Pratyabhijñā (recognition) philosophy - Shiva-Shakti unity and the tantric path to consciousness',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Eye,
      title: 'Comparative Philosophy',
      description: 'Understand how both traditions approach non-duality from different angles yet arrive at the same ultimate truth',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Meditation Practices',
      description: 'Learn authentic meditation techniques from both traditions for direct experience of non-dual reality',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Brain,
      title: 'Scriptural Study',
      description: 'Engage with key texts: Upanishads, Brahma Sutras, Shiva Sutras, and Pratyabhijñā classics',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Zap,
      title: 'Transformation Path',
      description: 'Apply non-dual wisdom to daily life for direct recognition of your true nature as infinite consciousness',
      gradient: 'from-emerald-500 to-green-600'
    }
  ];

  const courseModules: CourseModule[] = [
    {
      title: 'Foundations of Non-Duality',
      description: 'Introduction to Advaita Vedānta and Kashmir Shaivism - history, context, and fundamental concepts',
      duration: '2 weeks',
      level: 'Beginner',
      learningOutcomes: [
        'Understand non-dual philosophy basics',
        'Learn key terminology in both traditions',
        'Grasp the historical development',
        'Appreciate complementary approaches'
      ],
      lessons: [
        { title: 'What is Advaita Vedānta?', duration: '2 hours', type: 'video', preview: true },
        { title: 'Kashmir Shaivism Introduction', duration: '2 hours', type: 'video', preview: true },
        { title: 'Non-Dual Reality Overview', duration: '1.5 hours', type: 'video' }
      ]
    },
    {
      title: 'Advaita Vedānta Deep Dive',
      description: 'Complete study of Advaita - Brahman-Ātman identity, Maya, and the path of knowledge',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master Brahman-Ātman teaching',
        'Understand Maya and its role',
        'Learn the three states analysis',
        'Grasp Jñāna Yoga path'
      ],
      lessons: [
        { title: 'Brahman: Absolute Reality', duration: '4 hours', type: 'video', preview: true },
        { title: 'Ātman: True Self', duration: '3 hours', type: 'video' },
        { title: 'Maya: Cosmic Illusion', duration: '3 hours', type: 'video' },
        { title: 'Path to Liberation', duration: '4 hours', type: 'video' }
      ]
    },
    {
      title: 'Kashmir Shaivism Exploration',
      description: 'In-depth study of Pratyabhijñā philosophy and tantric wisdom',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Understand Shiva-Shakti unity',
        'Master recognition (Pratyabhijñā)',
        'Learn tantric cosmology',
        'Grasp consciousness philosophy'
      ],
      lessons: [
        { title: 'Shiva: Supreme Consciousness', duration: '4 hours', type: 'video', preview: true },
        { title: 'Shakti: Divine Power', duration: '3 hours', type: 'video' },
        { title: 'Recognition Philosophy', duration: '4 hours', type: 'video' },
        { title: 'Tantric Path', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Comparative Study & Integration',
      description: 'Compare and integrate insights from both traditions',
      duration: '2 weeks',
      level: 'Advanced',
      learningOutcomes: [
        'Compare methodologies',
        'Understand complementary nature',
        'Integrate both approaches',
        'Apply to spiritual practice'
      ],
      lessons: [
        { title: 'Two Paths, One Truth', duration: '3 hours', type: 'video', preview: true },
        { title: 'Meditation Synthesis', duration: '3 hours', type: 'video' },
        { title: 'Living Non-Duality', duration: '2 hours', type: 'video' }
      ]
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('vedanta') || t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('darshan'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Why study both Vedānta and Shaivism together?',
      answer: 'Both traditions teach non-duality but from different perspectives. Vedānta approaches through negation (neti neti) and knowledge, while Shaivism approaches through affirmation and recognition. Studying both provides a complete understanding of non-dual reality and multiple pathways to realization.',
      category: 'Philosophy'
    },
    {
      question: 'Is this course for advanced practitioners only?',
      answer: 'While the subject is advanced, we teach from foundations up. If you have basic familiarity with Indian philosophy or spiritual practice, you\'ll do well. Complete beginners may want to start with introductory philosophy courses first.',
      category: 'Prerequisites'
    },
    {
      question: 'What meditation practices are included?',
      answer: 'You\'ll learn Vedāntic self-inquiry (Ātma-vichāra), witness consciousness meditation, and Kashmir Shaiva practices including Pratyabhijñā recognition techniques and Shiva-Shakti integration meditations.',
      category: 'Practice'
    },
    {
      question: 'Do I need to know Sanskrit?',
      answer: 'Basic Sanskrit helps but isn\'t required. We provide translations and explain all Sanskrit terms thoroughly. However, if you plan deep study of original texts, consider our Sanskrit courses.',
      category: 'Language'
    },
    {
      question: 'How are these traditions different from Buddhism?',
      answer: 'While Buddhism emphasizes emptiness (śūnyatā), Vedānta and Shaivism affirm fullness - infinite consciousness as the ultimate reality. The course includes comparative perspectives to clarify these important distinctions.',
      category: 'Philosophy'
    },
    {
      question: 'Will this help my spiritual practice?',
      answer: 'Absolutely! Beyond philosophy, you\'ll gain direct practices for recognizing your true nature. Many students experience profound shifts in consciousness and deep peace through these teachings.',
      category: 'Benefits'
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
                <Infinity className="w-4 h-4" /><span>Non-Dual Wisdom</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                वेदान्त और शैविज्म<span className="block text-indigo-600 mt-2 text-3xl md:text-4xl">Vedānta & Shaivism</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Two profound paths to the same ultimate truth. Master Advaita Vedānta and Kashmir Shaivism - complete non-dual realization through knowledge and recognition.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-indigo-600" /><span>420+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-purple-600" /><span>10-12 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-indigo-500 text-indigo-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹2,899</div><div className="text-sm text-slate-400 line-through">₹4,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹2,100</div><div className="text-xs text-slate-500">42% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-indigo-600">
                  <Infinity className="w-4 h-4" /><span>Two Traditions • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1', '_blank')}>
                  Begin Non-Dual Journey
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-indigo-500 text-indigo-500" />))}
                </div>
                <span>Two Paths to Ultimate Truth</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sun className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Vedānta</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Moon className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Shaivism</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-pink-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Non-Dual</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Recognition</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Infinity className="w-20 h-20 text-indigo-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Ultimate Reality</p></div>
                  {['Brahman', 'Shiva', 'Ātman', 'Shakti'].map((text, index) => (
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
            title="Complete Non-Dual Education"
            subtitle="Master both Vedānta and Shaivism traditions"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseAccordion
            modules={courseModules}
            title="Complete Course Journey"
            subtitle="Systematic study of both non-dual traditions"
          />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Transformation Stories"
            subtitle="Students who realized their true nature"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about Vedānta and Shaivism study"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Non-Dual Realization?"
        subtitle="Join the journey to ultimate truth through two complementary wisdom traditions"
        price="₹2,899"
        originalPrice="₹4,999"
        savings="Save ₹2,100 (42%)"
        primaryCTA={{
          text: 'Begin Non-Dual Journey',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Explore Philosophy Packages',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Access to Both Traditions',
          '10 Live Meditation Sessions',
          'Certificate of Completion'
        ]}
        urgency={{
          type: 'discount',
          message: 'Discover your true nature today!'
        }}
      />
    </div>
  );
}
