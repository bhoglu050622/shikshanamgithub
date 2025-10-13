'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Globe, Zap, Target, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { ValueBreakdown } from '@/components/packages/ValueBreakdown';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function ParaAparaAllCoursesPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Infinity,
      title: 'Complete Parā Vidyā',
      description: 'All supreme knowledge courses - philosophy, Upanishads, advanced spirituality, and path to liberation',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Target,
      title: 'Complete Aparā Vidyā',
      description: 'All practical wisdom courses - Chanakya Niti, self-help, life skills, and worldly excellence',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: BookOpen,
      title: 'Sanskrit Mastery',
      description: 'Complete Sanskrit education from basics to advanced - unlock direct access to original texts',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Brain,
      title: 'All Six Darshanas',
      description: 'Complete philosophical education - Nyāya, Vaisheshika, Sāṅkhya, Yoga, Mīmāṁsā, and Vedānta',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Chanakya Wisdom',
      description: 'Complete Nīti Śāstra education - strategy, statecraft, economics, and practical life wisdom',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Crown,
      title: 'Total Transformation',
      description: 'Everything for complete development - spiritual liberation and worldly success united in one journey',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const valueItems = [
    { name: 'All Parā Vidyā Courses (Supreme Knowledge)', individualPrice: 12999, included: true },
    { name: 'All Aparā Vidyā Courses (Practical Wisdom)', individualPrice: 8999, included: true },
    { name: 'Complete Sanskrit Language Program', individualPrice: 7999, included: true },
    { name: 'All Six Darshana Philosophy Courses', individualPrice: 11999, included: true },
    { name: 'Complete Chanakya Niti Collection', individualPrice: 6999, included: true },
    { name: 'All Upanishad Study Courses', individualPrice: 8999, included: true },
    { name: 'Self-Help & Transformation Series', individualPrice: 5999, included: true },
    { name: '30 Live Master Sessions', individualPrice: 4999, included: true },
    { name: 'Lifetime Access & Updates', individualPrice: 0, included: true }
  ];

  const bundleFeatures = [
    '100+ Complete courses across all categories',
    'All Parā Vidyā (Supreme Knowledge) courses',
    'All Aparā Vidyā (Practical Wisdom) courses',
    'Complete Sanskrit mastery program',
    'All six Darshana philosophies',
    'Complete Chanakya Niti collection',
    'All major Upanishads with commentary',
    '30 live sessions with master teachers',
    'Lifetime access with free updates',
    'Priority support and mentoring',
    'All certificates of completion',
    'Premium community access'
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.featured || t.rating === 5)
    .slice(0, 6);

  const faq = [
    {
      question: 'What exactly is included in this complete package?',
      answer: 'Literally everything Shikshanam offers! All Parā Vidyā (supreme knowledge: philosophy, Upanishads, spirituality), all Aparā Vidyā (practical wisdom: Chanakya Niti, self-help), complete Sanskrit program, all six Darshanas, and every course we have created. It\'s our most comprehensive offering - total Indian wisdom education.',
      category: 'Package Content'
    },
    {
      question: 'How is Parā and Aparā different?',
      answer: 'Parā Vidyā is "supreme knowledge" for liberation - philosophy, Upanishads, meditation, spiritual wisdom. Aparā Vidyā is "practical knowledge" for worldly excellence - Chanakya strategy, economics, self-help, life skills. Together they provide complete education for both material success and spiritual fulfillment.',
      category: 'Philosophy'
    },
    {
      question: 'Is this too much content to complete?',
      answer: 'You have lifetime access, so study at your own pace! Most students focus on one track at a time (either Parā or Aparā) then switch to the other. The beauty is having everything available - choose what resonates most at each life stage.',
      category: 'Learning Approach'
    },
    {
      question: 'Can beginners take this package?',
      answer: 'Absolutely! The package includes courses for all levels from complete beginner to advanced. Start with Sanskrit basics and introductory philosophy, then progressively move to advanced topics. The learning path is designed to build systematically.',
      category: 'Prerequisites'
    },
    {
      question: 'How much time should I dedicate?',
      answer: 'Flexible! Some students dedicate 5-10 hours weekly and complete in 2-3 years. Others take 5-7 years studying part-time. With lifetime access, there\'s no pressure - learn at the pace that suits your life.',
      category: 'Time Commitment'
    },
    {
      question: 'What makes this package worth the investment?',
      answer: 'You get our entire catalog worth ₹68,000+ for ₹15,999 - that\'s 76% savings! Plus lifetime access means you can return to courses as you grow, evolve, and face new life situations. It\'s a lifetime educational companion.',
      category: 'Value'
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
                <Crown className="w-4 h-4" /><span>Complete Education</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                परा + अपरा विद्या<span className="block text-purple-600 mt-2 text-3xl md:text-4xl">All Shikshanam Courses</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Complete Indian wisdom education - both supreme knowledge (Parā) and practical wisdom (Aparā). Everything for spiritual liberation and worldly excellence.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-purple-600" /><span>1,850+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <BookOpen className="w-5 h-5 text-saffron-600" /><span>100+ Courses</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" /><span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-purple-50 via-saffron-50 to-cyan-50 rounded-2xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹15,999</div><div className="text-sm text-slate-400 line-through">₹24,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹9,000</div><div className="text-xs text-slate-500">36% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>Lifetime Access • All Certificates</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Crown className="w-4 h-4" /><span>Complete Collection • Ultimate Value</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-purple-600 via-saffron-600 to-cyan-600 hover:from-purple-700 hover:via-saffron-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1', '_blank')}>
                  Get Complete Access
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  See What's Included
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />))}
                </div>
                <span>Total Indian Wisdom - Supreme & Practical</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-purple-100 via-saffron-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-purple-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Parā Vidyā</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Target className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Aparā Vidyā</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookOpen className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Sanskrit</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Brain className="w-8 h-8 text-cyan-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Darshanas</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-purple-100 to-cyan-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Crown className="w-20 h-20 text-purple-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Complete Wisdom</p></div>
                  {['Parā', 'Aparā', 'Sanskrit', 'Philosophy'].map((text, index) => (
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

      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Complete Indian Wisdom Education
            </h2>
            <p className="text-xl text-slate-600">
              Everything we offer - supreme knowledge and practical wisdom combined
            </p>
          </div>
          <ValueBreakdown
            items={valueItems}
            bundlePrice={15999}
            currency="₹"
            features={bundleFeatures}
          />
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="What You'll Master"
            subtitle="Complete education in both supreme and practical wisdom"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Life-Changing Transformations"
            subtitle="Students who completed their wisdom education"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything about the complete package"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Complete Transformation?"
        subtitle="Get lifetime access to everything Shikshanam offers - both supreme knowledge and practical wisdom for total development"
        price="₹15,999"
        originalPrice="₹24,999"
        savings="Save ₹9,000 (36%)"
        primaryCTA={{
          text: 'Get Complete Access',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'View Course Catalog',
          action: () => router.push('/courses')
        }}
        trustBadges={[
          'Lifetime Access to 100+ Courses',
          '30 Live Master Sessions',
          'All Certificates Included'
        ]}
        urgency={{
          type: 'discount',
          message: 'Ultimate wisdom package - Save ₹9,000 today!'
        }}
      />
    </div>
  );
}
