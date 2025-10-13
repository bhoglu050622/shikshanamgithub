'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Star, ArrowLeft, Infinity, Eye, Sparkles, Mountain, Heart, Zap, BookOpen, Brain, Award, Target, Lightbulb, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { CourseAccordion } from '@/components/packages/CourseAccordion';
import { ValueBreakdown } from '@/components/packages/ValueBreakdown';
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
      title: 'Advaita Vedānta',
      description: 'Complete study of non-dual philosophy - Brahman-Atman identity and ultimate reality through negation',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Mountain,
      title: 'Kashmir Shaivism',
      description: 'Recognition school (Pratyabhijñā) - Divine consciousness pervading all existence',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Comparative Philosophy',
      description: 'Deep analysis of parallels and differences between Vedānta and Shaivism approaches to non-duality',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Heart,
      title: 'Spanda Philosophy',
      description: 'Understanding the vibration of consciousness - the dynamic aspect of reality',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Meditation Practices',
      description: 'Authentic techniques from both traditions for direct experience of non-dual reality',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Brain,
      title: 'Expert Commentary',
      description: 'Insights from traditional masters and modern scholars bridging ancient wisdom with contemporary understanding',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const courseModules: CourseModule[] = [
    {
      title: 'Introduction to Non-Dual Philosophy',
      description: 'Overview of non-dualism in Indian philosophy and the unique approaches of Vedānta and Shaivism',
      duration: '2 weeks',
      level: 'Beginner to Intermediate',
      learningOutcomes: [
        'Understand the concept of non-duality',
        'Learn historical development of both traditions',
        'Grasp key terminology and concepts',
        'Appreciate different paths to the same truth'
      ],
      lessons: [
        { title: 'What is Non-Duality?', duration: '2 hours', type: 'video', preview: true },
        { title: 'Two Rivers, One Ocean', duration: '2 hours', type: 'video', preview: true },
        { title: 'Key Concepts Overview', duration: '1.5 hours', type: 'video' }
      ]
    },
    {
      title: 'Advaita Vedānta Complete Study',
      description: 'Comprehensive exploration of non-dual Vedānta - neti neti approach to ultimate reality',
      duration: '5 weeks',
      level: 'Intermediate to Advanced',
      learningOutcomes: [
        'Master Brahman-Atman identity',
        'Understand Maya and levels of reality',
        'Study major Upanishads in depth',
        'Grasp the method of negation (neti neti)'
      ],
      lessons: [
        { title: 'Foundations of Advaita', duration: '6 hours', type: 'video', preview: true },
        { title: 'Brahman & Atman', duration: '8 hours', type: 'video' },
        { title: 'Maya & Vivarta', duration: '6 hours', type: 'video' },
        { title: 'Upanishadic Study', duration: '8 hours', type: 'video' },
        { title: 'Path to Self-Realization', duration: '5 hours', type: 'video' }
      ]
    },
    {
      title: 'Kashmir Shaivism Complete Study',
      description: 'Deep dive into Recognition school - Pratyabhijñā and Spanda philosophies',
      duration: '5 weeks',
      level: 'Intermediate to Advanced',
      learningOutcomes: [
        'Understand Shiva-Shakti philosophy',
        'Master the 36 Tattvas framework',
        'Study Pratyabhijñā (Recognition)',
        'Grasp Spanda (Divine vibration)'
      ],
      lessons: [
        { title: 'Foundations of Kashmir Shaivism', duration: '6 hours', type: 'video', preview: true },
        { title: 'Shiva-Shakti Non-Duality', duration: '8 hours', type: 'video' },
        { title: 'The 36 Tattvas', duration: '7 hours', type: 'video' },
        { title: 'Pratyabhijñā Philosophy', duration: '6 hours', type: 'video' },
        { title: 'Spanda: Divine Vibration', duration: '6 hours', type: 'video' }
      ]
    },
    {
      title: 'Comparative Study & Integration',
      description: 'Exploring parallels, differences, and the unity underlying both paths',
      duration: '2 weeks',
      level: 'Advanced',
      learningOutcomes: [
        'Compare methodologies of both traditions',
        'Understand complementary insights',
        'Integrate dual perspectives',
        'Appreciate universal truth'
      ],
      lessons: [
        { title: 'Vedānta vs Shaivism: Comparison', duration: '5 hours', type: 'video', preview: true },
        { title: 'Negation vs Recognition', duration: '4 hours', type: 'video' },
        { title: 'Unity in Diversity', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Meditation Practices from Both Traditions',
      description: 'Authentic techniques for direct experience of non-dual reality',
      duration: 'Ongoing',
      level: 'All Levels',
      learningOutcomes: [
        'Learn Vedantic meditation methods',
        'Practice Shaiva contemplations',
        'Develop witness consciousness',
        'Experience non-dual awareness'
      ],
      lessons: [
        { title: 'Vedantic Meditation Techniques', duration: '4 hours', type: 'video', preview: true },
        { title: 'Kashmir Shaiva Practices', duration: '4 hours', type: 'video' },
        { title: 'Integration Practice', duration: '3 hours', type: 'video' },
        { title: 'Guided Meditations', duration: '2 hours', type: 'video' }
      ]
    }
  ];

  const valueItems = [
    { name: 'Advaita Vedānta Complete Course', individualPrice: 2499, included: true },
    { name: 'Kashmir Shaivism Complete Course', individualPrice: 2499, included: true },
    { name: 'Comparative Philosophy Module', individualPrice: 999, included: true },
    { name: 'Meditation Practices Collection', individualPrice: 1499, included: true },
    { name: 'Live Q&A Sessions (8 sessions)', individualPrice: 1499, included: true },
    { name: 'Expert Commentary Library', individualPrice: 999, included: true }
  ];

  const bundleFeatures = [
    '3 years access to both complete courses',
    'Exclusive comparative study module',
    'Traditional meditation techniques',
    'Weekly live discussions',
    'Private study group access',
    'Downloadable resources',
    'Certificate of completion',
    'Expert mentor support'
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.featured || t.course.toLowerCase().includes('vedanta') || t.course.toLowerCase().includes('shaivism') || t.course.toLowerCase().includes('philosophy'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Why study both Vedānta and Shaivism together?',
      answer: 'Both lead to non-dual realization but through different approaches. Vedānta emphasizes negation (neti neti - "not this, not this"), while Shaivism celebrates recognition of divinity everywhere. Studying both provides complete perspective on non-dual truth and enriches understanding significantly.',
      category: 'Philosophy'
    },
    {
      question: 'Are these philosophies contradictory?',
      answer: 'No, they\'re complementary paths to the same truth. Both affirm ultimate non-duality but use different methods and language. Vedānta approaches through negation and discrimination, while Shaivism through recognition and affirmation. Together they illuminate the complete picture.',
      category: 'Philosophy'
    },
    {
      question: 'Which should I study first?',
      answer: 'Either works! Vedānta is more analytical and systematic, while Shaivism is more devotional and experiential. The course integrates both, showing connections as you progress through each system, so you can follow the natural flow.',
      category: 'Approach'
    },
    {
      question: 'Is this only theoretical?',
      answer: 'No! Both traditions include rich meditation practices and contemplative techniques. Theory and practice are integrated throughout the course. You\'ll learn authentic methods for direct experience, not just intellectual understanding.',
      category: 'Practice'
    },
    {
      question: 'Do I need prior knowledge of philosophy?',
      answer: 'No prior knowledge is required. We start with fundamentals and build systematically. However, some familiarity with basic Indian philosophy concepts would be helpful. The course is designed to be accessible while offering profound depth.',
      category: 'Prerequisites'
    },
    {
      question: 'How long does it take to complete?',
      answer: 'The course typically takes 10-12 weeks with regular study of 6-8 hours per week. However, you have 3 years access to study at your own pace. Many students revisit the material multiple times for deeper understanding.',
      category: 'Duration'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200/20 via-indigo-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-cyan-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                <Infinity className="w-4 h-4" /><span>Non-Dual Wisdom Bundle</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                वेदान्त और शैव दर्शन<span className="block text-indigo-600 mt-2 text-3xl md:text-4xl">Vedānta & Shaivism</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Two rivers flowing to the same ocean - explore both paths to ultimate truth. Master Advaita Vedānta and Kashmir Shaivism in one comprehensive bundle.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-indigo-600" /><span>650+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-cyan-600" /><span>10-12 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-indigo-500 text-indigo-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 rounded-2xl p-6 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹2,899</div><div className="text-sm text-slate-400 line-through">₹4,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹2,100</div><div className="text-xs text-slate-500">42% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-indigo-600">
                  <Infinity className="w-4 h-4" /><span>Non-Dual Wisdom • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
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
                <span>Two Paths to Ultimate Truth - Non-Dual Wisdom</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Vedānta</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Mountain className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Shaivism</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Witness</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Non-Duality</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-indigo-100 to-cyan-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Infinity className="w-20 h-20 text-indigo-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Non-Dual Reality</p></div>
                  {['Vedānta', 'Shaivism', 'Witness', 'Truth'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-indigo-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Breakdown Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Comprehensive Value
            </h2>
            <p className="text-xl text-slate-600">
              Two complete philosophical systems in one transformative bundle
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={2899}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Path to Non-Dual Wisdom"
            subtitle="Master both Vedānta and Shaivism approaches to ultimate reality"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseAccordion
            modules={courseModules}
            title="Complete Curriculum"
            subtitle="Systematic journey through both non-dual traditions"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Transformation Through Non-Dual Wisdom"
            subtitle="Experiences from students who explored both paths"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Common questions about this unique bundle"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready for Non-Dual Realization?"
        subtitle="Explore two profound paths to the same ultimate truth. Join seekers worldwide discovering non-dual wisdom."
        price="₹2,899"
        originalPrice="₹4,999"
        savings="Save ₹2,100 (42%)"
        primaryCTA={{
          text: 'Begin Non-Dual Journey',
          action: () => window.open('https://courses.shikshanam.in', '_blank')
        }}
        secondaryCTA={{
          text: 'View All Packages',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 years Access to Both Traditions',
          'Weekly Live Philosophy Discussions',
          'Authentic Meditation Practices'
        ]}
        urgency={{
          type: 'seats',
          message: 'Limited enrollment for personalized guidance - Only 40 seats per cohort!'
        }}
      />
    </div>
  );
}
