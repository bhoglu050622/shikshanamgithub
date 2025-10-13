'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Star, ArrowLeft, Infinity, Sparkles, Award, BookOpen, TrendingUp, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClientMotion, ClientMotionDiv, ClientMotionH1, ClientMotionP } from '@/components/motion/ClientMotion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { ValueBreakdown } from '@/components/packages/ValueBreakdown';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function AllParaCoursesPage() {
  const router = useRouter();

  const premiumFeatures = [
    { icon: Infinity, title: 'Complete Parā Collection', description: '100+ wisdom transmissions - all spiritual and philosophical courses', gradient: 'from-purple-500 to-indigo-600' },
    { icon: BookOpen, title: 'Six Darshanas Complete', description: 'All classical schools systematically taught', gradient: 'from-cyan-500 to-blue-600' },
    { icon: Sparkles, title: 'All Upanishads', description: 'Complete collection with traditional commentary', gradient: 'from-saffron-500 to-amber-600' },
    { icon: Award, title: 'Sanskrit Mastery', description: 'Read original texts in Sanskrit', gradient: 'from-emerald-500 to-green-600' }
  ];

  const valueItems = [
    { name: 'Six Darshanas Complete', individualPrice: 5999, included: true },
    { name: 'Complete Upanishad Collection', individualPrice: 3999, included: true },
    { name: 'Sanskrit Mastery Program', individualPrice: 4999, included: true },
    { name: 'Vedanta Advanced Studies', individualPrice: 3499, included: true },
    { name: 'Meditation & Spiritual Practices', individualPrice: 2999, included: true },
    { name: 'Live Master Sessions', individualPrice: 2999, included: true }
  ];

  const bundleFeatures = ['3 years access to all Parā courses', 'Complete spiritual education', 'Traditional certification', 'Expert guidance'];

  const relevantTestimonials = testimonialsData.testimonials.filter(t => t.featured).slice(0, 6);

  const faq = [
    { question: 'What is Parā Vidya?', answer: 'Supreme knowledge - spiritual and philosophical wisdom including philosophy, Sanskrit, Upanishads, and Vedanta.', category: 'Concept' },
    { question: 'Is this complete?', answer: 'Yes! All Parā courses - nothing excluded except Chanakya (which is Aparā).', category: 'Content' }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Section with Animations */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50">
        {/* Background Gradient Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-indigo-200/15 to-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-indigo-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        
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
            <ClientMotionDiv
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Badge */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Infinity className="w-4 h-4" />
                <span>Supreme Knowledge Collection</span>
              </ClientMotionDiv>

              {/* Main Headline */}
              <ClientMotionH1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 leading-tight"
              >
                Complete Parā Vidya
                <span className="block text-purple-600 mt-2">
                  Collection
                </span>
              </ClientMotionH1>

              {/* Subheadline */}
              <ClientMotionP
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-indigo-700 leading-relaxed"
              >
                Access all supreme knowledge courses - 100+ wisdom transmissions, all six Darshanas, complete Upanishads, Sanskrit mastery, and traditional certification.
              </ClientMotionP>

              {/* Stats */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                <ClientMotionDiv
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center space-x-2 text-indigo-600"
                >
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>5,000+ Students</span>
                </ClientMotionDiv>
                <ClientMotionDiv
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 text-indigo-600"
                >
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>20-24 Weeks</span>
                </ClientMotionDiv>
                <ClientMotionDiv
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center space-x-2 text-indigo-600"
                >
                  <Star className="w-5 h-5 fill-purple-500 text-purple-500" />
                  <span>4.9/5 Rating</span>
                </ClientMotionDiv>
              </ClientMotionDiv>

              {/* Pricing */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200"
              >
                <div className="flex items-center justify-between mb-4">
            <div>
                    <div className="text-3xl font-bold text-indigo-700">₹12,999</div>
                    <div className="text-sm text-indigo-400 line-through">₹25,999</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Save ₹13,000</div>
                    <div className="text-xs text-indigo-500">50% off</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-indigo-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <Infinity className="w-4 h-4" />
                  <span>20 Live Master Sessions • Expert Support</span>
                </div>
              </ClientMotionDiv>

              {/* CTA Buttons */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://courses.shikshanam.in/single-checkout/678e3649f4f9ad20d3001578?pid=p1', '_blank')}
                >
                  Enroll Now
                </Button>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300"
                >
                  View Details
                </a>
              </ClientMotionDiv>

              {/* Trust Line */}
              <ClientMotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-center space-x-4 text-sm text-indigo-600"
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-500 text-purple-500" />
                  ))}
                </div>
                <span>Trusted by Spiritual Seekers Worldwide</span>
              </ClientMotionDiv>
            </ClientMotionDiv>

            {/* Right Column - Visual */}
            <ClientMotionDiv
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-8 shadow-2xl">
                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <ClientMotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Infinity className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">All Darshanas</p>
                  </ClientMotionDiv>
                  <ClientMotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <BookOpen className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">Upanishads</p>
                  </ClientMotionDiv>
                  <ClientMotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">Sanskrit</p>
                  </ClientMotionDiv>
                  <ClientMotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Award className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">Certification</p>
                  </ClientMotionDiv>
                </div>

                {/* Center Visual with Image */}
                <ClientMotionDiv
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src="/assets/para-courses-package.png"
                      alt="Para Courses Collection"
                      width={400}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  {['Darshanas', 'Upanishads', 'Sanskrit', 'Vedanta'].map((text, index) => (
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
                </ClientMotionDiv>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-pulse-gentle animation-delay-2000" />
            </div>
            </ClientMotionDiv>
          </div>
        </div>
      </section>

      <div id="features" className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><ValueBreakdown items={valueItems} bundlePrice={12999} currency="₹" features={bundleFeatures} /></div></div>
      <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFeatures title="Complete Parā Education" features={premiumFeatures} layout="grid" /></div></div>
      <div className="py-24 bg-white"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumTestimonials testimonials={relevantTestimonials} title="Spiritual Mastery" /></div></div>
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><PremiumFAQ faqs={faq} /></div></div>
      <PremiumCTA title="Complete Spiritual Education" price="₹12,999" primaryCTA={{ text: 'Enroll Now', action: () => window.open('https://courses.shikshanam.in/single-checkout/678e3649f4f9ad20d3001578?pid=p1', '_blank') }} trustBadges={['3 years Access', 'Certification', 'Expert Support']} />
    </div>
  );
}
