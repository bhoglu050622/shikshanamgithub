'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, Search, Atom, Lightbulb, Eye, Zap, Sparkles, Award, Infinity, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { CourseAccordion } from '@/components/packages/CourseAccordion';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function NyayaVaisheshikEnlightenmentPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Nyāya Logic & Epistemology',
      description: 'Master the science of correct reasoning, logical inference, and systematic methods for acquiring valid knowledge',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Eye,
      title: 'Pramāṇas: Means of Knowledge',
      description: 'Deep study of four Pramāṇas - Perception, Inference, Comparison, and Testimony',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Atom,
      title: 'Vaisheshika Atomic Theory',
      description: 'Ancient understanding of matter, atoms, and the fundamental building blocks of reality',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Sparkles,
      title: 'Seven Categories of Existence',
      description: 'Complete exploration of Padārthas - Substance, Quality, Action, Generality, Particularity, Inherence, Non-existence',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Search,
      title: 'Logical Debate & Argumentation',
      description: 'Learn the art of philosophical debate using Nyāya methodology - Vada, Jalpa, and Vitanda',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Lightbulb,
      title: 'Modern Applications',
      description: 'Connect ancient wisdom with modern physics, critical thinking, and analytical reasoning',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const courseModules = [
    {
      title: 'Introduction to Nyāya & Vaisheshika',
      description: 'Overview of both realist philosophies and their complementary nature',
      duration: '2 weeks',
      level: 'Beginner',
      learningOutcomes: [
        'Understand the historical development',
        'Grasp the realist worldview',
        'Learn key terminology',
        'Appreciate the systematic approach'
      ],
      lessons: [
        { title: 'What is Nyāya Philosophy?', duration: '2 hours', type: 'video', preview: true },
        { title: 'Vaisheshika: Ancient Atomic Theory', duration: '2 hours', type: 'video', preview: true },
        { title: 'Complementary Nature', duration: '1.5 hours', type: 'video' }
      ]
    },
    {
      title: 'Nyāya Foundations: Logic & Reasoning',
      description: 'Complete study of Nyāya system of logic and inference',
      duration: '3 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master Nyāya logic fundamentals',
        'Understand the 16 categories',
        'Learn valid inference methods',
        'Apply logical reasoning'
      ],
      lessons: [
        { title: 'Nyāya Logic Fundamentals', duration: '6 hours', type: 'video', preview: true },
        { title: 'The 16 Categories of Nyāya', duration: '5 hours', type: 'video' },
        { title: 'Inference (Anumāna) Deep Dive', duration: '4 hours', type: 'video' },
        { title: 'Fallacies & Their Avoidance', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Pramāṇas: Epistemology Deep Dive',
      description: 'The four means of valid knowledge in systematic detail',
      duration: '2 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master Pratyakṣa (Perception)',
        'Understand Anumāna (Inference)',
        'Learn Upamāna (Comparison)',
        'Grasp Śabda (Testimony)'
      ],
      lessons: [
        { title: 'Perception: Direct Knowledge', duration: '4 hours', type: 'video', preview: true },
        { title: 'Inference: Logical Knowledge', duration: '4 hours', type: 'video' },
        { title: 'Comparison & Testimony', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Vaisheshika System & Atomic Theory',
      description: 'Ancient atomic theory and categorical analysis of reality',
      duration: '3 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Understand atomic theory (Paramāṇu)',
        'Master the seven Padārthas',
        'Learn about causation',
        'Grasp substance-attribute theory'
      ],
      lessons: [
        { title: 'Ancient Atomic Theory', duration: '5 hours', type: 'video', preview: true },
        { title: 'Seven Categories of Existence', duration: '6 hours', type: 'video' },
        { title: 'Substances & Their Qualities', duration: '4 hours', type: 'video' },
        { title: 'Actions & Relations', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Logical Debate & Philosophical Argumentation',
      description: 'The art of debate and discussion using Nyāya methods',
      duration: '2 weeks',
      level: 'Advanced',
      learningOutcomes: [
        'Master debate methodology',
        'Learn argumentation techniques',
        'Practice logical reasoning',
        'Develop critical thinking'
      ],
      lessons: [
        { title: 'Types of Debate: Vāda, Jalpa, Vitaṇḍā', duration: '4 hours', type: 'video', preview: true },
        { title: 'Constructing Valid Arguments', duration: '3 hours', type: 'video' },
        { title: 'Practice Debates', duration: '4 hours', type: 'video' }
      ]
    },
    {
      title: 'Integration & Modern Applications',
      description: 'Connecting ancient wisdom with contemporary thought',
      duration: '1 week',
      level: 'All Levels',
      learningOutcomes: [
        'Compare with modern logic',
        'Connect atomic theory to physics',
        'Apply to critical thinking',
        'Integrate into daily life'
      ],
      lessons: [
        { title: 'Ancient vs Modern Logic', duration: '3 hours', type: 'video' },
        { title: 'Atomic Theory & Modern Physics', duration: '3 hours', type: 'video', preview: true },
        { title: 'Practical Applications', duration: '2 hours', type: 'video' }
      ]
    }
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('darshan') || t.course.toLowerCase().includes('nyaya'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Why study Nyāya and Vaisheshika together?',
      answer: 'Nyāya provides the logical and epistemological framework for acquiring valid knowledge, while Vaisheshika provides the ontological categories and atomic theory. Together they form a complete realist philosophy covering both epistemology (how we know) and metaphysics (what exists). They complement each other perfectly.',
      category: 'Philosophy'
    },
    {
      question: 'Is this course technical and difficult?',
      answer: 'These are systematic philosophies with technical terminology, but we start from absolute basics and build systematically. Complex concepts are broken down with clear explanations, examples, and visual aids. No prior philosophy knowledge is needed.',
      category: 'Difficulty'
    },
    {
      question: 'How is this relevant to modern life?',
      answer: 'Nyāya logic forms the basis of Indian debate traditions and dramatically develops critical thinking and analytical reasoning skills. Vaisheshika atomic theory shows remarkable ancient insights into physics. Both sharpen your ability to think clearly, argue logically, and understand reality systematically.',
      category: 'Relevance'
    },
    {
      question: 'Do I need a philosophy background?',
      answer: 'No prior philosophy background is needed. We teach from foundations and build systematically. However, an interest in systematic thinking, logic, and understanding reality will help you appreciate the depth of these philosophies.',
      category: 'Prerequisites'
    },
    {
      question: 'What is the connection to modern science?',
      answer: 'Vaisheshika\'s atomic theory (Paramāṇu vāda) predates modern atomic theory by thousands of years. While not identical, there are fascinating parallels in understanding matter\'s fundamental nature. We explore these connections while respecting both ancient wisdom and modern science.',
      category: 'Science'
    },
    {
      question: 'Will this improve my debating skills?',
      answer: 'Absolutely! Nyāya is renowned for its systematic approach to logical argumentation. Learning Nyāya debate methodology (Vāda, Jalpa, Vitaṇḍā) and fallacy identification dramatically improves critical thinking, argumentation, and debating abilities in any context.',
      category: 'Skills'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/20 via-cyan-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200/20 via-blue-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
          </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 via-cyan-100 to-emerald-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" /><span>Logic & Atomic Wisdom</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                न्याय-वैशेषिक साधना<span className="block text-blue-600 mt-2 text-3xl md:text-4xl">Nyāya & Vaisheshika</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Unite the power of logical reasoning with profound understanding of reality's atomic nature. Master ancient Indian logic and the world's first systematic atomic theory.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-blue-600" /><span>650+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-cyan-600" /><span>8-10 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-blue-500 text-blue-500" /><span>4.7/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹1,799</div><div className="text-sm text-slate-400 line-through">₹3,499</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,700</div><div className="text-xs text-slate-500">49% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <Brain className="w-4 h-4" /><span>Logic & Atoms • Premium Quality</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in', '_blank')}>
                  Begin Logical Journey
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  View Details
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />))}
                </div>
                <span>Logic Meets Reality - Ancient Atomic Theory</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-blue-100 via-cyan-100 to-emerald-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-blue-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Nyāya Logic</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Atom className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Vaisheshika</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Eye className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Pramāṇas</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Padārthas</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Brain className="w-20 h-20 text-blue-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Logic & Atoms</p></div>
                  {['Logic', 'Atoms', 'Knowledge', 'Reality'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-blue-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Master Logic & Atomic Wisdom"
            subtitle="Ancient Indian contributions to logic, epistemology, and atomic theory"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseAccordion
            modules={courseModules}
            title="Complete Curriculum"
            subtitle="Systematic journey through logic and atomic philosophy"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Student Transformations"
            subtitle="How logical thinking and philosophical wisdom changed lives"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about Nyāya & Vaisheshika"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready to Master Ancient Logic?"
        subtitle="Join students worldwide discovering the power of Nyāya logic and Vaisheshika atomic wisdom"
        price="₹1,799"
        originalPrice="₹3,499"
        savings="Save ₹1,700 (49%)"
        primaryCTA={{
          text: 'Begin Logical Journey',
          action: () => window.open('https://courses.shikshanam.in', '_blank')
        }}
        secondaryCTA={{
          text: 'View All Philosophy Packages',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 years Access to Course Materials',
          'Weekly Live Logic Sessions',
          'Certificate of Completion'
        ]}
        urgency={{
          type: 'discount',
          message: 'Special introductory pricing - Sharpen your logic today!'
        }}
      />
    </div>
  );
}
