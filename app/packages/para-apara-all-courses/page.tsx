'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Crown, Gem, Infinity, Award, Sparkles, Target, BookOpen, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
    { icon: Infinity, title: 'Complete Parā Vidya', description: 'All supreme knowledge courses - Sanskrit, philosophy, Upanishads, Vedanta', gradient: 'from-purple-500 to-indigo-600' },
    { icon: Target, title: 'Complete Aparā Vidya', description: 'All practical wisdom - Chanakya Code, emotional intelligence, life skills', gradient: 'from-emerald-500 to-green-600' },
    { icon: Crown, title: 'Everything Included', description: 'Over 150+ courses covering complete traditional education system', gradient: 'from-saffron-500 to-amber-600' },
    { icon: Gem, title: 'Ultimate Value', description: 'Individual value ₹50,000+ - Get everything at massive 70%+ savings', gradient: 'from-cyan-500 to-blue-600' },
    { icon: Sparkles, title: 'Master Certification', description: 'Comprehensive certification demonstrating complete mastery', gradient: 'from-rose-500 to-pink-600' },
    { icon: Award, title: '3 Years Access', description: 'All courses, updates, and future additions for 3 years', gradient: 'from-orange-500 to-red-600' }
  ];

  const valueItems = [
    { name: 'Complete Parā Collection (All spiritual courses)', individualPrice: 25000, included: true },
    { name: 'Complete Aparā Collection (All practical courses)', individualPrice: 15000, included: true },
    { name: 'Sanskrit Language Mastery', individualPrice: 4999, included: true },
    { name: 'Six Darshanas Complete', individualPrice: 5999, included: true },
    { name: 'All Upanishads Collection', individualPrice: 3999, included: true },
    { name: 'Chanakya Code Complete', individualPrice: 3499, included: true },
    { name: 'Live Sessions (Unlimited)', individualPrice: 4999, included: true },
    { name: 'Master Certification', individualPrice: 2999, included: true }
  ];

  const bundleFeatures = ['3 years access to ALL courses', 'Complete Parā + Aparā education', 'Sanskrit to philosophy mastery', 'Spiritual + practical wisdom', 'Unlimited live sessions', 'Master certification', 'All future updates included', 'Priority expert support'];

  const relevantTestimonials = testimonialsData.testimonials.filter(t => t.featured || t.rating === 5).slice(0, 6);

  const faq = [
    { question: 'What is included?', answer: 'EVERYTHING! All Parā Vidya (philosophical/spiritual), all Aparā Vidya (practical), Sanskrit, Darshanas, Upanishads, Chanakya, emotional intelligence, and more. Over 150+ courses with 3 years access.', category: 'Content' },
    { question: 'Suitable for beginners?', answer: 'Yes! Includes beginner to advanced. Start with basics and progress systematically through complete traditional education.', category: 'Level' },
    { question: 'The value?', answer: 'Individual courses cost ₹50,000+. This complete bundle gives 70%+ savings - the best value for complete traditional education.', category: 'Pricing' },
    { question: 'Time to complete?', answer: '24+ months for complete mastery. With 3 years access, learn at your own pace and revisit anytime.', category: 'Duration' }
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
                <span>Complete Knowledge Collection</span>
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
                  All Courses
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                The ultimate complete collection - ALL spiritual wisdom AND practical skills. Over 150+ courses covering complete traditional education system in one comprehensive bundle.
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
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>180+ Students</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>24+ Months</span>
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
                    <div className="text-3xl font-bold text-slate-700">₹15,999</div>
                    <div className="text-sm text-slate-400 line-through">₹50,000+</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Save ₹34,000+</div>
                    <div className="text-xs text-slate-500">68% off</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>3 Years Access • Master Certificate</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Infinity className="w-4 h-4" />
                  <span>Complete Parā + Aparā Collection • Premium Quality</span>
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
                  onClick={() => window.open('https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1', '_blank')}
                >
                  Get Everything Now
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
                <span>Complete Traditional Education - Spiritual & Practical Mastery</span>
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
                    <BookOpen className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">All Courses</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Crown className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Master Cert</p>
                  </motion.div>
                </div>

                {/* Center Visual with Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-video bg-gradient-to-br from-purple-100 to-emerald-200 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src="/assets/para-apara-all-courses.jpg"
                      alt="Complete Parā + Aparā Collection"
                      width={400}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  {['Parā Vidya', 'Aparā Vidya', 'Sanskrit', 'Chanakya'].map((text, index) => (
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

      <div id="features" className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><ValueBreakdown items={valueItems} bundlePrice={15999} currency="₹" features={bundleFeatures} /></div></div>
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFeatures title="Complete Education System" subtitle="Everything you need for total mastery" features={premiumFeatures} layout="staggered" /></div></div>
      <div className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumTestimonials testimonials={relevantTestimonials} title="Complete Transformation" subtitle="Students who got everything" /></div></div>
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFAQ faqs={faq} title="Everything You Need to Know" /></div></div>
      <PremiumCTA title="Get Everything Now" subtitle="Complete traditional education - spiritual + practical wisdom" price="₹15,999" originalPrice="₹50,000+" savings="Save ₹34,000+ (68%)" primaryCTA={{ text: 'Get Complete Collection', action: () => window.open('https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1', '_blank') }} secondaryCTA={{ text: 'View Packages', action: () => router.push('/packages') }} trustBadges={['3 years Access to ALL', '68% Savings', 'Master Certificate', '150+ Courses']} urgency={{ type: 'seats', message: 'Ultimate collection - Only 25 students per year!' }} />
    </div>
  );
}
