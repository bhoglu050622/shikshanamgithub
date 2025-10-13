'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, Eye, Infinity, Zap, Heart, Sun, Wind, Sparkles, Award, Target, BookOpen, Mountain } from 'lucide-react';
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

export default function UltimateSankhyaBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Complete Sāṅkhya Philosophy',
      description: 'Master all 25 Tattvas systematically - from Prakriti to Purusha, understanding the complete evolution of consciousness',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Eye,
      title: 'Purusha-Prakriti Dynamics',
      description: 'Deep understanding of the eternal witness (Purusha) and primordial nature (Prakriti) - the foundation of dualistic philosophy',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Three Gunas Mastery',
      description: 'Complete exploration of Sattva, Rajas, and Tamas - how these three qualities create all experiences and phenomena',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Infinity,
      title: 'Path to Kaivalya',
      description: 'Journey to absolute liberation through discriminative knowledge and witnessing consciousness',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Emotional Intelligence Application',
      description: 'Apply Sāṅkhya wisdom to understand and master emotional patterns, personality traits, and psychological states',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Meditation & Liberation Practices',
      description: 'Authentic Sāṅkhya-based meditation techniques for developing witness consciousness and achieving Kaivalya',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const courseModules = [
    {
      title: 'Sāṅkhya Foundations',
      description: 'Introduction to one of the oldest philosophical systems - dualistic framework and core concepts',
      duration: '2 weeks',
      level: 'Beginner',
      learningOutcomes: [
        'Understand Sāṅkhya\'s place in Indian philosophy',
        'Grasp the dualistic worldview',
        'Learn fundamental terminology',
        'Appreciate systematic approach'
      ],
      lessons: [
        { title: 'What is Sāṅkhya?', duration: '2 hours', type: 'video', preview: true },
        { title: 'Historical Development', duration: '1.5 hours', type: 'video', preview: true },
        { title: 'Core Concepts Overview', duration: '2 hours', type: 'video' }
      ]
    },
    {
      title: 'The 25 Tattvas Complete Study',
      description: 'Systematic exploration of all 25 principles of manifestation from Purusha to gross elements',
      duration: '3 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master all 25 Tattvas in sequence',
        'Understand evolution of consciousness',
        'Grasp subtle and gross elements',
        'Learn cosmic manifestation process'
      ],
      lessons: [
        { title: 'Purusha: Pure Consciousness', duration: '3 hours', type: 'video', preview: true },
        { title: 'Prakriti & Mahat', duration: '4 hours', type: 'video' },
        { title: 'Ahamkara & Manas', duration: '3 hours', type: 'video' },
        { title: 'Sense Organs & Action Organs', duration: '4 hours', type: 'video' },
        { title: 'Tanmatras & Mahabhutas', duration: '4 hours', type: 'video' }
      ]
    },
    {
      title: 'Purusha & Prakriti Deep Dive',
      description: 'Comprehensive study of consciousness-matter duality - the heart of Sāṅkhya',
      duration: '2 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Understand Purusha nature deeply',
        'Grasp Prakriti\'s creative power',
        'Learn their interaction dynamics',
        'Master dualistic perspective'
      ],
      lessons: [
        { title: 'Nature of Purusha', duration: '4 hours', type: 'video', preview: true },
        { title: 'Prakriti\'s Evolution', duration: '4 hours', type: 'video' },
        { title: 'Their Eternal Dance', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Three Gunas Complete Mastery',
      description: 'In-depth understanding of Sattva, Rajas, and Tamas in all their manifestations',
      duration: '2 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master Sattva (harmony) qualities',
        'Understand Rajas (activity) nature',
        'Grasp Tamas (inertia) characteristics',
        'Apply Guna knowledge to life'
      ],
      lessons: [
        { title: 'Sattva: Harmony & Light', duration: '3 hours', type: 'video', preview: true },
        { title: 'Rajas: Activity & Passion', duration: '3 hours', type: 'video' },
        { title: 'Tamas: Inertia & Darkness', duration: '3 hours', type: 'video' },
        { title: 'Guna Interactions', duration: '2 hours', type: 'video' }
      ]
    },
    {
      title: 'Emotional Intelligence Through Sāṅkhya',
      description: 'Practical application of Sāṅkhya wisdom to emotional mastery',
      duration: '2 weeks',
      level: 'All Levels',
      learningOutcomes: [
        'Understand emotions through Gunas',
        'Develop emotional awareness',
        'Master emotional patterns',
        'Transform psychological states'
      ],
      lessons: [
        { title: 'Emotions & Gunas', duration: '3 hours', type: 'video', preview: true },
        { title: 'Personality Through Sāṅkhya', duration: '3 hours', type: 'video' },
        { title: 'Practical Exercises', duration: '2 hours', type: 'video' }
      ]
    },
    {
      title: 'Path to Kaivalya (Liberation)',
      description: 'The ultimate goal - absolute liberation through discriminative knowledge',
      duration: '1 week',
      level: 'Advanced',
      learningOutcomes: [
        'Understand Kaivalya concept',
        'Learn discrimination practice',
        'Develop witness consciousness',
        'Grasp liberation mechanics'
      ],
      lessons: [
        { title: 'What is Kaivalya?', duration: '2 hours', type: 'video', preview: true },
        { title: 'Path of Discrimination', duration: '2 hours', type: 'video' },
        { title: 'Witness Consciousness Practice', duration: '2 hours', type: 'video' }
      ]
    }
  ];

  const valueItems = [
    { name: 'Sāṅkhya Foundations Course', individualPrice: 1499, included: true },
    { name: '25 Tattvas Complete Study', individualPrice: 1999, included: true },
    { name: 'Purusha-Prakriti Deep Dive', individualPrice: 1499, included: true },
    { name: 'Three Gunas Mastery', individualPrice: 1499, included: true },
    { name: 'Emotional Intelligence Module', individualPrice: 1999, included: true },
    { name: 'Kaivalya Liberation Path', individualPrice: 999, included: true },
    { name: 'Meditation Practices Library', individualPrice: 999, included: true },
    { name: 'Live Q&A Sessions (10 sessions)', individualPrice: 1499, included: true }
  ];

  const bundleFeatures = [
    '3 years access to complete Sāṅkhya curriculum',
    'All 25 Tattvas systematically explained',
    'Three Gunas mastery with practical applications',
    'Emotional intelligence development',
    'Meditation and liberation practices',
    'Live sessions with Sāṅkhya experts',
    'Downloadable study materials',
    'Certificate of completion'
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('samkhya') || t.course.toLowerCase().includes('emotional') || t.course.toLowerCase().includes('darshan'))
    .slice(0, 6);

  const faq = [
    {
      question: 'What makes this "Ultimate" Sāṅkhya?',
      answer: 'This is the most comprehensive Sāṅkhya course available - covering everything from foundational concepts to liberation (Kaivalya). All 25 Tattvas, complete Guna mastery, Purusha-Prakriti dynamics, practical emotional intelligence applications, and meditation practices. Nothing is omitted.',
      category: 'Course Overview'
    },
    {
      question: 'Is Sāṅkhya relevant to modern life?',
      answer: 'Absolutely! Sāṅkhya provides a profound framework for understanding consciousness, emotions, personality (through the Gunas), psychological states, and the path to liberation. It\'s incredibly practical for emotional intelligence, self-understanding, and spiritual development.',
      category: 'Relevance'
    },
    {
      question: 'How does Sāṅkhya relate to Yoga?',
      answer: 'Sāṅkhya and Yoga are sister philosophies - two sides of the same coin. Sāṅkhya provides the theoretical knowledge and metaphysical framework, while Yoga (Patanjali\'s system) provides the practical path and techniques. This course focuses on Sāṅkhya theory with some meditation practices.',
      category: 'Philosophy'
    },
    {
      question: 'Do I need prior philosophy knowledge?',
      answer: 'No prior knowledge is needed. We start from absolute basics and build systematically to advanced concepts. The course is designed to make this profound 2,500-year-old philosophy accessible to sincere students at any level.',
      category: 'Prerequisites'
    },
    {
      question: 'What is the Guna Profiler tool?',
      answer: 'The Guna Profiler is an assessment tool based on Sāṅkhya principles that helps you understand your dominant Guna patterns (Sattva, Rajas, Tamas) and how they affect your personality, emotions, and behavior. It provides personalized insights for transformation.',
      category: 'Tools'
    },
    {
      question: 'Will this help with emotional challenges?',
      answer: 'Yes! Understanding emotions through the Guna framework and developing witness consciousness (Purusha awareness) are powerful tools for emotional mastery. Many students report significant improvements in managing stress, anxiety, and emotional reactivity.',
      category: 'Benefits'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-indigo-200/15 to-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200/20 via-purple-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 via-indigo-100 to-cyan-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" /><span>Complete Sāṅkhya Philosophy</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                सांख्य दर्शन<span className="block text-purple-600 mt-2 text-3xl md:text-4xl">Ultimate Sāṅkhya</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Master the profound dualistic philosophy from foundations to absolute liberation. Understand consciousness, the 25 Tattvas, three Gunas, and the path to Kaivalya.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" /><span>890+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-indigo-600" /><span>8-10 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹2,499</div><div className="text-sm text-slate-400 line-through">₹3,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,500</div><div className="text-xs text-slate-500">38% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Brain className="w-4 h-4" /><span>Complete Sāṅkhya • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
                  Begin Sāṅkhya Journey
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />))}
                </div>
                <span>Profound Dualistic Philosophy - Path to Liberation</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-purple-100 via-indigo-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Purusha</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Zap className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Prakriti</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sun className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">25 Tattvas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Kaivalya</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-purple-100 to-cyan-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Brain className="w-20 h-20 text-purple-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Sāṅkhya Philosophy</p></div>
                  {['Purusha', 'Prakriti', 'Tattvas', 'Liberation'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-purple-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse-gentle" />
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
              Complete Sāṅkhya Mastery
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to master this ancient philosophical system
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={2499}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Sāṅkhya Curriculum"
            subtitle="From fundamental concepts to absolute liberation"
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
            title="Detailed Course Journey"
            subtitle="Systematic progression through Sāṅkhya philosophy"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Transformation Through Sāṅkhya"
            subtitle="Real experiences from students mastering consciousness"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about the Ultimate Sāṅkhya Bundle"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready for Liberation?"
        subtitle="Master complete Sāṅkhya philosophy and discover the path to Kaivalya through ancient wisdom"
        price="₹2,499"
        originalPrice="₹3,999"
        savings="Save ₹1,500 (38%)"
        primaryCTA={{
          text: 'Begin Sāṅkhya Journey',
          action: () => window.open('https://courses.shikshanam.in', '_blank')
        }}
        secondaryCTA={{
          text: 'Take Free Guna Assessment',
          action: () => router.push('/guna-profiler')
        }}
        trustBadges={[
          '3 years Access to All Modules',
          'Guna Profiler Tool Included',
          'Live Sessions with Experts'
        ]}
        urgency={{
          type: 'discount',
          message: 'Special launch pricing - Master Sāṅkhya today!'
        }}
      />
    </div>
  );
}
