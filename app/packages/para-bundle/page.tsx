'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Zap, Heart, Sparkles, Infinity, Target } from 'lucide-react';
import Link from 'next/link';
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

export default function ParaBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: BookOpen,
      title: 'Complete Sanskrit Mastery',
      description: 'Master Sanskrit language from basics to advanced level - script, grammar, vocabulary, and conversation',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Brain,
      title: 'Six Classical Darshanas',
      description: 'Deep exploration of all six schools of Indian philosophy - Nyaya, Vaisheshik, Samkhya, Yoga, Mimamsa, and Vedanta',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Upanishadic Wisdom',
      description: 'Profound study of Upanishadic teachings and their timeless wisdom for spiritual awakening',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Infinity,
      title: 'Vedantic Philosophy',
      description: 'Advanced study of Vedantic traditions including Advaita, Vishishtadvaita, and Dvaita perspectives',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Pure Spiritual Focus',
      description: 'Dedicated spiritual and philosophical learning without practical distractions - for true seekers',
      gradient: 'from-rose-500 to-red-600'
    },
    {
      icon: Award,
      title: 'Master Certificate',
      description: 'Comprehensive certification upon completion demonstrating mastery of traditional Indian wisdom',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const courseModules = [
    {
      title: 'Sanskrit Language Mastery',
      description: 'Complete Sanskrit language course from Devanagari basics to advanced grammar and conversation',
      duration: '6 months',
      level: 'Beginner to Advanced',
      learningOutcomes: [
        'Read and write Devanagari script fluently',
        'Understand Sanskrit grammar and syntax',
        'Build vocabulary of 2000+ words',
        'Read classical texts with comprehension'
      ],
      lessons: [
        { title: 'Devanagari Script & Pronunciation', duration: '8 hours', type: 'video', preview: true },
        { title: 'Sanskrit Grammar Foundations', duration: '20 hours', type: 'video' },
        { title: 'Vocabulary Building Exercises', duration: '15 hours', type: 'reading' },
        { title: 'Text Reading Practice', duration: '10 hours', type: 'reading' }
      ]
    },
    {
      title: 'Nyaya & Vaisheshik Darshanas',
      description: 'Logic, epistemology, and atomic theory - the analytical schools of Indian philosophy',
      duration: '3 months',
      level: 'Intermediate',
      learningOutcomes: [
        'Master Nyaya logic and reasoning methods',
        'Understand Vaisheshik atomic theory',
        'Apply logical analysis to philosophical problems',
        'Develop critical thinking skills'
      ],
      lessons: [
        { title: 'Nyaya: Logic & Epistemology', duration: '12 hours', type: 'video', preview: true },
        { title: 'Vaisheshik: Atomic Theory', duration: '10 hours', type: 'video' },
        { title: 'Logical Reasoning Practice', duration: '6 hours', type: 'quiz' }
      ]
    },
    {
      title: 'Samkhya & Yoga Darshanas',
      description: 'Dualistic philosophy and practical realization through Patanjali\'s Yoga system',
      duration: '3 months',
      level: 'Intermediate',
      learningOutcomes: [
        'Understand Purusha-Prakriti duality',
        'Master the three Gunas concept',
        'Study Patanjali\'s Yoga Sutras in depth',
        'Learn meditation and consciousness practices'
      ],
      lessons: [
        { title: 'Samkhya Philosophy Complete', duration: '14 hours', type: 'video' },
        { title: 'Yoga Sutras of Patanjali', duration: '16 hours', type: 'video', preview: true },
        { title: 'Practical Meditation Techniques', duration: '8 hours', type: 'video' }
      ]
    },
    {
      title: 'Mimamsa & Vedanta Darshanas',
      description: 'Vedic interpretation and non-dual philosophy - the pinnacle of Indian thought',
      duration: '4 months',
      level: 'Advanced',
      learningOutcomes: [
        'Master Mimamsa hermeneutics',
        'Understand Advaita Vedanta deeply',
        'Study major Upanishads',
        'Comprehend non-dual realization'
      ],
      lessons: [
        { title: 'Mimamsa: Vedic Hermeneutics', duration: '10 hours', type: 'video' },
        { title: 'Advaita Vedanta Complete', duration: '20 hours', type: 'video', preview: true },
        { title: 'Major Upanishads Study', duration: '15 hours', type: 'reading' }
      ]
    },
    {
      title: 'Upanishadic Wisdom',
      description: 'Deep exploration of principal Upanishads and their profound teachings',
      duration: '4 months',
      level: 'Advanced',
      learningOutcomes: [
        'Study Isha, Kena, Katha, and other Upanishads',
        'Understand Mahavakyas (Great Statements)',
        'Grasp the nature of Brahman and Atman',
        'Apply Upanishadic wisdom to life'
      ],
      lessons: [
        { title: 'Principal Upanishads Overview', duration: '12 hours', type: 'video', preview: true },
        { title: 'Isha & Kena Upanishads', duration: '10 hours', type: 'video' },
        { title: 'Katha & Mundaka Upanishads', duration: '10 hours', type: 'video' },
        { title: 'Mandukya & Taittiriya', duration: '8 hours', type: 'video' }
      ]
    },
    {
      title: 'Integration & Practice',
      description: 'Synthesize all learning and develop a personal spiritual practice',
      duration: 'Ongoing',
      level: 'All Levels',
      learningOutcomes: [
        'Integrate philosophical understanding',
        'Develop daily spiritual practice',
        'Apply wisdom to modern life',
        'Join community of practitioners'
      ],
      lessons: [
        { title: 'Integration Practices', duration: '6 hours', type: 'video' },
        { title: 'Daily Sadhana Guide', duration: '4 hours', type: 'reading' },
        { title: 'Community Discussion Forums', duration: 'Ongoing', type: 'video' }
      ]
    }
  ];

  const valueItems = [
    { name: 'Sanskrit Language Mastery Course', individualPrice: 4999, included: true },
    { name: 'Nyaya & Vaisheshik Philosophy', individualPrice: 2999, included: true },
    { name: 'Samkhya & Yoga Darshanas', individualPrice: 2999, included: true },
    { name: 'Mimamsa & Vedanta Philosophy', individualPrice: 3499, included: true },
    { name: 'Upanishadic Wisdom Course', individualPrice: 2999, included: true },
    { name: 'Live Q&A Sessions (24 sessions)', individualPrice: 2499, included: true },
    { name: 'Master Certificate', individualPrice: 999, included: true }
  ];

  const bundleFeatures = [
    '3 years access to all 6 comprehensive courses',
    'Downloadable study materials and resources',
    'Weekly live Q&A sessions with experts',
    'Private community forum access',
    'Personalized learning path guidance',
    'Master certificate upon completion',
    'Email support from philosophy scholars',
    'Regular course content updates'
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.featured || t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('vedanta') || t.course.toLowerCase().includes('sanskrit'))
    .slice(0, 6);

  const faq = [
    {
      question: 'What makes this different from the Parā + Aparā bundle?',
      answer: 'This bundle focuses purely on spiritual and philosophical wisdom (Parā Vidya), without the practical life skills (Aparā Vidya) or Chanakya Code. It\'s designed for sincere seekers dedicated to traditional spiritual learning and philosophical understanding.',
      category: 'Bundle Details'
    },
    {
      question: 'How long does it take to complete the bundle?',
      answer: 'The bundle is self-paced and typically takes 15-18 months to complete all courses with regular study of 8-10 hours per week. However, you have 3 years access, so you can learn at your own pace.',
      category: 'Timeline'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes! The Sanskrit course starts from absolute basics, and the philosophical courses are designed to progressively build your understanding. We take you from beginner to advanced level systematically.',
      category: 'Prerequisites'
    },
    {
      question: 'What is the focus of this bundle?',
      answer: 'This bundle focuses purely on Parā Vidya - spiritual wisdom, philosophical systems, Sanskrit language, and traditional learning. It\'s for those seeking deep understanding of Indian spiritual traditions without modern practical applications.',
      category: 'Focus'
    },
    {
      question: 'Will I get certificates for individual courses?',
      answer: 'Yes! You receive individual certificates for each course completed, plus a prestigious Master Certificate upon completing the entire bundle, recognizing your comprehensive mastery of Indian wisdom traditions.',
      category: 'Certification'
    },
    {
      question: 'Are the courses taught in English or Sanskrit?',
      answer: 'All courses are taught in English (or Hindi) with Sanskrit terms properly explained and transliterated. As you progress through the Sanskrit course, you\'ll gain the ability to understand original texts in Sanskrit.',
      category: 'Language'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Section with Animations */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-saffron-50 via-amber-50 to-orange-50">
        {/* Background Gradient Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-amber-200/15 to-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-orange-200/20 via-saffron-200/15 to-amber-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        
        {/* Subtle Mandala Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />Back to Packages
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 via-amber-100 to-orange-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pure Spiritual Learning Bundle</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
              >
                All Parā Courses
                <span className="block text-saffron-600 mt-2">
                  Bundle
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                Everything in traditional wisdom - pure spiritual and philosophical learning. Complete mastery of Sanskrit, six Darshanas, Upanishads, and Vedantic philosophy.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <BookOpen className="w-5 h-5 text-saffron-600" />
                  <span>6 Complete Courses</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Clock className="w-5 h-5 text-saffron-600" />
                  <span>15-18 Months</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Star className="w-5 h-5 fill-saffron-500 text-saffron-500" />
                  <span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-saffron-50 via-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-saffron-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-700">₹14,999</div>
                    <div className="text-sm text-slate-400 line-through">₹22,993</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Save ₹7,994</div>
                    <div className="text-xs text-slate-500">35% off</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>3 Years Access • Master Certificate</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-saffron-600">
                  <Infinity className="w-4 h-4" />
                  <span>Complete Spiritual Wisdom • Premium Quality</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-700 hover:to-amber-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://courses.shikshanam.in/checkout/para-bundle', '_blank')}
                >
                  Enroll Now
                </Button>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300"
                >
                  View Details
                </a>
              </motion.div>

              {/* Trust Line */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-center space-x-4 text-sm text-slate-600"
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />
                  ))}
                </div>
                <span>Pure Spiritual Learning - Traditional Wisdom Path</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-saffron-100 via-amber-100 to-orange-100 rounded-3xl p-8 shadow-2xl">
                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <BookOpen className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Sanskrit</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Brain className="w-8 h-8 text-amber-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Sparkles className="w-8 h-8 text-orange-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Upanishads</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Infinity className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Vedanta</p>
                  </motion.div>
                </div>

                {/* Center Visual with Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-video bg-gradient-to-br from-saffron-100 to-amber-200 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div className="text-center">
                    <Infinity className="w-20 h-20 text-saffron-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">Complete Spiritual Wisdom</p>
                  </div>
                  
                  {/* Floating Elements */}
                  {['Sanskrit', 'Darshanas', 'Upanishads', 'Vedanta'].map((text, index) => (
                    <motion.div
                      key={text}
                      className="absolute text-xs font-bold text-saffron-600/60 bg-white/80 px-2 py-1 rounded-lg"
                      style={{
                        left: `${15 + (index * 18)}%`,
                        top: `${20 + (index % 2) * 50}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        delay: index * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-500 rounded-full animate-pulse-gentle animation-delay-2000" />
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
              Exceptional Value
            </h2>
            <p className="text-xl text-slate-600">
              See exactly how much you save with this comprehensive bundle
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={14999}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="What You'll Master"
            subtitle="Comprehensive spiritual and philosophical education from ancient Indian wisdom traditions"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      {/* Course Curriculum Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseAccordion
            modules={courseModules}
            title="Complete Course Curriculum"
            subtitle="Detailed breakdown of all courses included in this comprehensive bundle"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Transformation Through Wisdom"
            subtitle="Real experiences from students mastering traditional Indian wisdom"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about the Parā Bundle"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready for Pure Spiritual Learning?"
        subtitle="Join seekers worldwide mastering traditional spiritual and philosophical wisdom through this comprehensive bundle"
        price="₹14,999"
        originalPrice="₹22,993"
        savings="Save ₹7,994 (35%)"
        primaryCTA={{
          text: 'Get Parā Bundle Now',
          action: () => window.open('https://courses.shikshanam.in/checkout/para-bundle', '_blank')
        }}
        secondaryCTA={{
          text: 'Download Complete Syllabus',
          action: () => router.push('/courses')
        }}
        trustBadges={[
          '3 years Access to All 6 Courses',
          'Master Certificate Included',
          'Expert Philosophy Scholar Support'
        ]}
        urgency={{
          type: 'seats',
          message: 'Limited enrollment - Only 50 seats available per cohort!'
        }}
      />
    </div>
  );
}
