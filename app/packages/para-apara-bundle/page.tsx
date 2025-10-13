'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Zap, Crown, Sparkles, Infinity, Target, Award } from 'lucide-react';
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

export default function ParaAparaBundlePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Infinity,
      title: 'Complete Parā Wisdom',
      description: 'All spiritual and philosophical courses - Sanskrit, six Darshanas, Upanishads, and Vedanta for ultimate knowledge',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Target,
      title: 'Practical Aparā Skills',
      description: 'Modern life applications, practical skills, and contemporary wisdom for real-world success',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Crown,
      title: 'Chanakya Code Mastery',
      description: 'Ancient strategic wisdom for leadership, negotiation, and business success in modern world',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Brain,
      title: 'Complete Knowledge System',
      description: 'Integration of spiritual depth with practical application - the ultimate learning journey',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Transformation Path',
      description: 'Systematic progression from foundational knowledge to mastery in both spiritual and practical domains',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Award,
      title: 'Ultimate Master Certificate',
      description: 'Prestigious certification recognizing comprehensive mastery of Indian wisdom traditions',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const courseModules: CourseModule[] = [
    {
      title: 'Sanskrit Language Complete',
      description: 'Master Sanskrit from Devanagari basics to advanced grammar and text reading',
      duration: '6 months',
      level: 'Beginner to Advanced',
      learningOutcomes: [
        'Read and write Devanagari script fluently',
        'Understand complex Sanskrit grammar',
        'Read classical texts with comprehension',
        'Engage in basic Sanskrit conversation'
      ],
      lessons: [
        { title: 'Devanagari Script & Pronunciation', duration: '8 hours', type: 'video', preview: true },
        { title: 'Sanskrit Grammar Foundation', duration: '20 hours', type: 'video' },
        { title: 'Vocabulary & Text Reading', duration: '15 hours', type: 'reading' }
      ]
    },
    {
      title: 'Six Darshanas Complete',
      description: 'All six classical schools of Indian philosophy in comprehensive detail',
      duration: '6 months',
      level: 'Intermediate to Advanced',
      learningOutcomes: [
        'Master Nyaya, Vaisheshik, Samkhya, Yoga, Mimamsa, Vedanta',
        'Understand epistemology and metaphysics',
        'Apply philosophical insights to life',
        'Develop systematic thinking'
      ],
      lessons: [
        { title: 'Nyaya & Vaisheshik', duration: '12 hours', type: 'video', preview: true },
        { title: 'Samkhya & Yoga', duration: '14 hours', type: 'video' },
        { title: 'Mimamsa & Vedanta', duration: '16 hours', type: 'video' }
      ]
    },
    {
      title: 'Upanishadic Wisdom & Vedanta',
      description: 'Deep exploration of principal Upanishads and Vedantic philosophy',
      duration: '4 months',
      level: 'Advanced',
      learningOutcomes: [
        'Study major Upanishads in depth',
        'Understand Brahman-Atman philosophy',
        'Grasp non-dual wisdom',
        'Apply Upanishadic insights'
      ],
      lessons: [
        { title: 'Principal Upanishads', duration: '15 hours', type: 'video', preview: true },
        { title: 'Advaita Vedanta Complete', duration: '12 hours', type: 'video' }
      ]
    },
    {
      title: 'Chanakya Code: Strategic Wisdom',
      description: 'Ancient strategic principles for modern leadership and business',
      duration: '3 months',
      level: 'All Levels',
      learningOutcomes: [
        'Master strategic thinking',
        'Learn negotiation tactics',
        'Develop leadership skills',
        'Apply Chanakya principles to business'
      ],
      lessons: [
        { title: 'Chanakya Niti Fundamentals', duration: '8 hours', type: 'video', preview: true },
        { title: 'Strategic Leadership', duration: '6 hours', type: 'video' },
        { title: 'Business Applications', duration: '5 hours', type: 'video' }
      ]
    },
    {
      title: 'Modern Applications of Ancient Wisdom',
      description: 'Bridging traditional knowledge with contemporary life',
      duration: '2 months',
      level: 'All Levels',
      learningOutcomes: [
        'Apply philosophical wisdom to modern challenges',
        'Integrate spiritual practices into daily life',
        'Use strategic thinking in career',
        'Balance spiritual and material goals'
      ],
      lessons: [
        { title: 'Wisdom in Modern Life', duration: '6 hours', type: 'video', preview: true },
        { title: 'Practical Integration', duration: '4 hours', type: 'video' }
      ]
    },
    {
      title: 'Master Integration & Practice',
      description: 'Synthesizing all learning into a comprehensive life approach',
      duration: 'Ongoing',
      level: 'Advanced',
      learningOutcomes: [
        'Integrate Parā and Aparā wisdom',
        'Develop personal practice',
        'Create life transformation plan',
        'Join master community'
      ],
      lessons: [
        { title: 'Integration Practices', duration: '8 hours', type: 'video' },
        { title: 'Ongoing Mentorship', duration: 'Continuous', type: 'video' }
      ]
    }
  ];

  const valueItems = [
    { name: 'Sanskrit Language Complete Course', individualPrice: 4999, included: true },
    { name: 'Six Darshanas Philosophy Bundle', individualPrice: 5999, included: true },
    { name: 'Upanishadic Wisdom & Vedanta', individualPrice: 3999, included: true },
    { name: 'Chanakya Code Leadership Course', individualPrice: 3499, included: true },
    { name: 'Modern Applications Module', individualPrice: 2499, included: true },
    { name: 'Live Mentorship Sessions (36 sessions)', individualPrice: 3999, included: true },
    { name: 'Ultimate Master Certificate', individualPrice: 1999, included: true },
    { name: 'Private Master Community Access', individualPrice: 999, included: true }
  ];

  const bundleFeatures = [
    '3 years access to all Parā & Aparā courses',
    'Complete Sanskrit to advanced philosophy',
    'Chanakya strategic wisdom included',
    'Weekly live sessions with experts',
    'Private master community access',
    'Personalized mentorship program',
    'Ultimate master certificate',
    'All future course updates included'
  ];

  // Get diverse testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.featured || t.rating === 5)
    .slice(0, 6);

  const faq = [
    {
      question: 'What is the difference between Parā and Aparā?',
      answer: 'Parā Vidya refers to higher spiritual knowledge - Sanskrit, philosophy, Upanishads, and Vedanta. Aparā Vidya refers to practical knowledge - life skills, strategic thinking (Chanakya Code), and modern applications. This bundle uniquely combines both for complete transformation.',
      category: 'Bundle Overview'
    },
    {
      question: 'Why is this called the ultimate bundle?',
      answer: 'This is our most comprehensive offering, combining spiritual depth (all Parā courses), practical wisdom (Chanakya Code), and modern applications. It represents the complete knowledge system from ancient Indian wisdom traditions adapted for contemporary life.',
      category: 'Bundle Overview'
    },
    {
      question: 'How long does it take to complete everything?',
      answer: 'The complete bundle typically takes 18-24 months with regular study of 8-10 hours per week. However, you have 3 years access and can progress at your own pace. Many students revisit courses multiple times for deeper understanding.',
      category: 'Timeline'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes! The bundle is designed to take you from complete beginner to advanced mastery. Sanskrit starts from basics, philosophy builds systematically, and Chanakya Code is accessible to all levels. The curriculum is carefully sequenced for optimal learning.',
      category: 'Prerequisites'
    },
    {
      question: 'What makes this different from just buying individual courses?',
      answer: 'Beyond massive savings (over ₹10,000), the bundle offers integrated learning with connections between courses, exclusive mentorship sessions, master community access, and a comprehensive transformation path. The integration between spiritual and practical wisdom is unique.',
      category: 'Value'
    },
    {
      question: 'Do I get individual certificates or one master certificate?',
      answer: 'You receive individual certificates for each course completed PLUS an exclusive Ultimate Master Certificate upon completing the entire bundle - a prestigious recognition of comprehensive mastery.',
      category: 'Certification'
    },
    {
      question: 'Can I access courses in any order?',
      answer: 'Yes, though we recommend the suggested learning path. Start with Sanskrit basics, move to philosophy, then advanced topics. Chanakya Code and modern applications can be taken alongside other courses for immediate practical benefit.',
      category: 'Learning Path'
    },
    {
      question: 'Is ongoing support included?',
      answer: 'Yes! The bundle includes weekly live Q&A sessions, email support from scholars, private community forum access, and personalized mentorship guidance. You\'re never alone in your learning journey.',
      category: 'Support'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Section with Animations */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-saffron-50 to-emerald-50">
        {/* Background Gradient Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-saffron-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-emerald-200/20 via-purple-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        
        {/* Subtle Mandala Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6">
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
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 via-saffron-100 to-emerald-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Crown className="w-4 h-4" />
                <span>Ultimate Complete Bundle</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
              >
                Parā + Aparā
                <span className="block text-purple-600 mt-2">
                  Complete Bundle
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                The ultimate learning journey combining spiritual wisdom (Parā), practical skills (Aparā), and strategic mastery (Chanakya Code). Everything you need for complete transformation.
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
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  <span>10+ Complete Courses</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Clock className="w-5 h-5 text-saffron-600" />
                  <span>18-24 Months</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" />
                  <span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-purple-50 via-saffron-50 to-emerald-50 rounded-2xl p-6 border-2 border-purple-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-700">₹16,999</div>
                    <div className="text-sm text-slate-400 line-through">₹27,992</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Save ₹10,993</div>
                    <div className="text-xs text-slate-500">39% off</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>3 Years Access • Ultimate Master Certificate</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Crown className="w-4 h-4" />
                  <span>Complete Learning Journey • Premium Quality</span>
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
                  className="flex-1 bg-gradient-to-r from-purple-600 via-saffron-600 to-emerald-600 hover:from-purple-700 hover:via-saffron-700 hover:to-emerald-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://courses.shikshanam.in/checkout/para-apara-bundle', '_blank')}
                >
                  Get Ultimate Bundle
                </Button>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300"
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
                    <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <span>Complete Transformation - Spiritual + Practical + Strategic</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-purple-100 via-saffron-100 to-emerald-100 rounded-3xl p-8 shadow-2xl">
                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Infinity className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Parā Vidya</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Target className="w-8 h-8 text-emerald-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Aparā Vidya</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Crown className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Chanakya</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Award className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Mastery</p>
                  </motion.div>
                </div>

                {/* Center Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-video bg-gradient-to-br from-purple-100 to-emerald-200 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div className="text-center">
                    <Crown className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">Ultimate Complete Bundle</p>
                  </div>
                  
                  {/* Floating Elements */}
                  {['Parā', 'Aparā', 'Chanakya', 'Mastery'].map((text, index) => (
                    <motion.div
                      key={text}
                      className="absolute text-xs font-bold text-purple-600/60 bg-white/80 px-2 py-1 rounded-lg"
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
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-500 rounded-full animate-pulse-gentle animation-delay-2000" />
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
              Unmatched Value
            </h2>
            <p className="text-xl text-slate-600">
              See the incredible value and savings with this ultimate bundle
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={16999}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Transformation System"
            subtitle="Spiritual wisdom, practical skills, and strategic mastery united"
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
            title="Complete Learning Path"
            subtitle="From spiritual foundations to strategic mastery - your ultimate journey"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Ultimate Transformation Stories"
            subtitle="Real experiences from students who completed the ultimate journey"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about the Ultimate Bundle"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready for Ultimate Transformation?"
        subtitle="Join the elite group of students mastering both spiritual wisdom and practical success. This is your complete learning journey."
        price="₹16,999"
        originalPrice="₹27,992"
        savings="Save ₹10,993 (39%)"
        primaryCTA={{
          text: 'Get Ultimate Bundle Now',
          action: () => window.open('https://courses.shikshanam.in/checkout/para-apara-bundle', '_blank')
        }}
        secondaryCTA={{
          text: 'Schedule Consultation',
          action: () => router.push('/contact')
        }}
        trustBadges={[
          '3 years Access to All Courses',
          'Ultimate Master Certificate Included',
          'Personalized Mentorship Program'
        ]}
        urgency={{
          type: 'seats',
          message: 'Exclusive enrollment - Only 30 master students per cohort!'
        }}
      />
    </div>
  );
}
