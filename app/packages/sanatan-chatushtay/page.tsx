'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Brain, BookOpen, Infinity, Sparkles, Award, Heart, Eye, Zap, Target, Scale, Gem, Sunrise } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SanatanChatushtayPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Scale,
      title: 'Dharma - Righteous Living',
      description: 'Understand and practice Dharma - duty, ethics, righteousness, and living in harmony with cosmic order',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Gem,
      title: 'Artha - Prosperity Wisdom',
      description: 'Master Artha - wealth creation, material success, and prosperity aligned with dharmic principles',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Kāma - Fulfilled Desires',
      description: 'Explore Kāma - pleasure, beauty, love, and legitimate desires in balance with higher goals',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: Infinity,
      title: 'Moksha - Ultimate Liberation',
      description: 'Journey toward Moksha - spiritual liberation, self-realization, and freedom from all limitations',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Integrated Life Framework',
      description: 'Learn to balance all four goals for complete, harmonious, and meaningful human existence',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Sparkles,
      title: 'Practical Application',
      description: 'Apply eternal wisdom to modern life - career, relationships, spirituality, and personal growth',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const learningPath = [
    {
      title: 'Dharma Foundation',
      description: 'Understand righteous living, ethical conduct, and your unique duties (svadharma) in modern context.',
      duration: '3 weeks'
    },
    {
      title: 'Artha Mastery',
      description: 'Learn wealth creation, career success, and material prosperity aligned with dharmic principles.',
      duration: '3 weeks'
    },
    {
      title: 'Kāma Understanding',
      description: 'Explore legitimate pleasures, aesthetic appreciation, and desire fulfillment in balanced way.',
      duration: '2 weeks'
    },
    {
      title: 'Moksha Path',
      description: 'Journey toward liberation - meditation, self-inquiry, and spiritual practices for ultimate freedom.',
      duration: '4 weeks'
    },
    {
      title: 'Integration & Balance',
      description: 'Synthesize all four goals into harmonious life framework for complete human fulfillment.',
      duration: '2 weeks'
    }
  ];

  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('self-help') || t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('dharma'))
    .slice(0, 6);

  const faq = [
    {
      question: 'What is Sanatan Chatushtay?',
      answer: 'Chatushtay means "the four" - referring to the four Purusharthas or goals of human life: Dharma (duty/righteousness), Artha (prosperity), Kāma (pleasure), and Moksha (liberation). These four together provide a complete framework for meaningful existence.',
      category: 'Concept'
    },
    {
      question: 'How is this different from modern self-help?',
      answer: 'Modern self-help often focuses on one aspect (usually success/pleasure). The Chatushtay framework is comprehensive - it balances material success with ethical living and spiritual growth. It\'s thousands of years old, tested wisdom for complete human fulfillment.',
      category: 'Approach'
    },
    {
      question: 'Can I pursue both material success and spiritual growth?',
      answer: 'Absolutely! That\'s the beauty of this framework. Artha (prosperity) and Kāma (pleasure) are legitimate goals when pursued within Dharma (righteousness) and ultimately leading to Moksha (liberation). It\'s about integration, not renunciation.',
      category: 'Balance'
    },
    {
      question: 'Is this religious or philosophical?',
      answer: 'It\'s philosophical wisdom applicable to anyone, regardless of religion. While rooted in Hindu philosophy, the four goals are universal human aspirations. We teach practical application, not religious doctrine.',
      category: 'Nature'
    },
    {
      question: 'How do I apply this to modern career and life?',
      answer: 'You\'ll learn to: pursue career success (Artha) ethically (Dharma), enjoy life\'s pleasures (Kāma) mindfully, and maintain spiritual practice (Moksha) for inner peace. It\'s complete life guidance, not just theory.',
      category: 'Application'
    },
    {
      question: 'Which goal should I prioritize?',
      answer: 'All four are important at different life stages. Young adulthood emphasizes Artha and Kāma. Maturity adds Dharma awareness. Later life focuses on Moksha. But ultimately, all four should be balanced according to your unique situation.',
      category: 'Practice'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-saffron-50 via-emerald-50 to-indigo-50">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-emerald-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-200/20 via-saffron-200/15 to-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Mandala size={600} speed={120} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <Button variant="ghost" onClick={() => router.push('/packages')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Back to Packages</Button>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 via-emerald-100 to-indigo-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium">
                <Sunrise className="w-4 h-4" /><span>Four Goals of Life</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                सनातन चतुष्टय<span className="block text-saffron-600 mt-2 text-3xl md:text-4xl">Eternal Philosophies</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl text-slate-600 leading-relaxed">
                Master the four Purusharthas - Dharma, Artha, Kāma, and Moksha. Complete framework for balanced living, material success, and spiritual fulfillment.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center space-x-2 text-slate-600">
                  <Users className="w-5 h-5 text-saffron-600" /><span>670+ Students</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-emerald-600" /><span>12-15 Weeks</span>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex items-center space-x-2 text-slate-600">
                  <Star className="w-5 h-5 fill-saffron-500 text-saffron-500" /><span>4.8/5 Rating</span>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-saffron-50 via-emerald-50 to-indigo-50 rounded-2xl p-6 border-2 border-saffron-200">
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-3xl font-bold text-slate-700">₹3,999</div><div className="text-sm text-slate-400 line-through">₹4,999</div></div>
                  <div className="text-right"><div className="text-sm font-semibold text-green-600">Save ₹1,000</div><div className="text-xs text-slate-500">20% off</div></div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" /><span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-saffron-600">
                  <Scale className="w-4 h-4" /><span>Four Goals • Complete Framework</span>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-gradient-to-r from-saffron-600 via-emerald-600 to-indigo-600 hover:from-saffron-700 hover:via-emerald-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => window.open('https://courses.shikshanam.in/single-checkout/650a824be4b03b5745557827?pid=p1', '_blank')}>
                  Begin Balanced Life
                </Button>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300">
                  Explore Goals
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />))}
                </div>
                <span>Complete Life Framework - Four Eternal Goals</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative bg-gradient-to-br from-saffron-100 via-emerald-100 to-indigo-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Scale className="w-8 h-8 text-saffron-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Dharma</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Gem className="w-8 h-8 text-emerald-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Artha</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Heart className="w-8 h-8 text-rose-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Kāma</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="bg-white rounded-2xl p-6 shadow-lg">
                    <Infinity className="w-8 h-8 text-indigo-600 mb-2" /><p className="text-xs font-semibold text-slate-700">Moksha</p>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="aspect-video bg-gradient-to-br from-saffron-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="text-center"><Sunrise className="w-20 h-20 text-saffron-600 mx-auto mb-4" /><p className="text-slate-700 font-semibold">Four Goals</p></div>
                  {['Dharma', 'Artha', 'Kāma', 'Moksha'].map((text, index) => (
                    <motion.div key={text} className="absolute text-xs font-bold text-saffron-600/60 bg-white/80 px-2 py-1 rounded-lg" style={{ left: `${15 + (index * 18)}%`, top: `${20 + (index % 2) * 50}%` }}
                      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 3 + index * 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: index * 0.3, ease: "easeInOut" }}>
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="The Four Purusharthas"
            subtitle="Complete framework for balanced and meaningful life"
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
            title="Life Transformations"
            subtitle="Students who found balance through the four goals"
          />
        </div>
      </div>

      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Understanding the four goals of human life"
            showSearch={false}
          />
        </div>
      </div>

      <PremiumCTA
        title="Ready for Complete Life Balance?"
        subtitle="Master Dharma, Artha, Kāma, and Moksha - the eternal framework for meaningful human existence"
        price="₹3,999"
        originalPrice="₹4,999"
        savings="Save ₹1,000 (20%)"
        primaryCTA={{
          text: 'Begin Balanced Life',
          action: () => window.open('https://courses.shikshanam.in/single-checkout/650a824be4b03b5745557827?pid=p1', '_blank')
        }}
        secondaryCTA={{
          text: 'Explore Life Wisdom',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 Years Access to All Four Goals',
          '12 Live Integration Sessions',
          'Complete Life Framework Certificate'
        ]}
        urgency={{
          type: 'discount',
          message: 'Balance your life with eternal wisdom!'
        }}
      />
    </div>
  );
}
