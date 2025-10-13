'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Star, ArrowLeft, BookOpen, MessageCircle, Brain, Sparkles, Globe, Award, Mic, FileText, Zap, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { LearningPathTimeline } from '@/components/packages/LearningPathTimeline';
import { PremiumTestimonials } from '@/components/packages/PremiumTestimonials';
import { PremiumFAQ } from '@/components/packages/PremiumFAQ';
import { PremiumCTA } from '@/components/packages/PremiumCTA';
import testimonialsData from '@/data/testimonials.json';

export default function SanskritBasicsToConversationPage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: FileText,
      title: 'Devanagari Script Mastery',
      description: 'Complete mastery of reading and writing Sanskrit in Devanagari script from absolute basics',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Brain,
      title: 'Grammar Foundations',
      description: 'Master essential Sanskrit grammar including Sandhi, Samasa, and core grammatical structures',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: BookOpen,
      title: 'Vocabulary Building',
      description: 'Build a strong foundation with 1000+ commonly used Sanskrit words and phrases',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: MessageCircle,
      title: 'Conversational Sanskrit',
      description: 'Learn to speak Sanskrit for daily communication with native pronunciation',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'Text Reading Skills',
      description: 'Develop confidence in reading and understanding original Sanskrit texts',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Mic,
      title: 'Live Practice Sessions',
      description: 'Weekly live conversation practice with experienced Sanskrit speakers',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const learningPath = [
    {
      title: 'Devanagari Script',
      description: 'Master reading and writing Sanskrit script with proper pronunciation techniques. Learn all 50 letters and their combinations.',
      duration: '2-3 weeks'
    },
    {
      title: 'Grammar Essentials',
      description: 'Build strong grammatical foundation covering Sandhi rules, declensions, conjugations, and sentence structure.',
      duration: '4-5 weeks'
    },
    {
      title: 'Vocabulary Building',
      description: 'Expand your Sanskrit vocabulary with 1000+ essential words, phrases, and their contextual usage in conversations.',
      duration: '4 weeks'
    },
    {
      title: 'Conversational Practice',
      description: 'Develop fluency through speaking exercises, dialogues, and live conversation sessions with instructors.',
      duration: '3-4 weeks'
    },
    {
      title: 'Text Reading Mastery',
      description: 'Apply all your learning to read and understand original Sanskrit texts including classical literature.',
      duration: '2 weeks'
    }
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('sanskrit'))
    .slice(0, 6);

  const faq = [
    { 
      question: 'Is this suitable for complete beginners?',
      answer: 'Absolutely! We start from the very basics - learning the Devanagari script. No prior knowledge of Sanskrit is needed. The course is designed to take you from zero to conversational fluency.',
      category: 'Getting Started'
    },
    {
      question: 'Will I be able to speak Sanskrit?',
      answer: 'Yes! The course emphasizes conversational Sanskrit. You\'ll learn practical phrases for daily use and participate in live speaking sessions with experienced instructors and fellow learners.',
      category: 'Learning Outcomes'
    },
    { 
      question: 'How long does it take to become fluent?',
      answer: 'With consistent practice of 5-6 hours per week, most students can hold basic conversations in 12-15 weeks and read simple texts comfortably. Advanced fluency typically develops over 6-12 months.',
      category: 'Timeline'
    },
    {
      question: 'Are live sessions included?',
      answer: 'Yes! Weekly live conversation practice sessions with native speakers and grammar Q&A sessions are included. All sessions are recorded for later review.',
      category: 'Course Content'
    },
    {
      question: 'What materials are provided?',
      answer: 'You get 3 years access to video lessons, downloadable practice worksheets, vocabulary flashcards, audio pronunciation guides, and reading materials. Everything you need to master Sanskrit!',
      category: 'Course Content'
    },
    {
      question: 'Can I read classical texts after this course?',
      answer: 'Yes! By the end of the course, you\'ll be able to read and understand classical Sanskrit texts like Bhagavad Gita, Upanishads, and other scriptures with reasonable comprehension.',
      category: 'Learning Outcomes'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Section with Animations */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-saffron-50 to-amber-50">
        {/* Background Gradient Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-amber-200/15 to-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/20 via-saffron-200/15 to-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        
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
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 to-amber-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>Complete Language Mastery</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
              >
                संस्कृत भाषा यात्रा
                <span className="block text-saffron-600 mt-2 text-3xl md:text-4xl">
                  From Script to Conversation
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                Master Sanskrit from complete basics to fluent conversation and text reading. A comprehensive journey through the world's most ancient living language.
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
                  <Users className="w-5 h-5 text-saffron-600" />
                  <span>1,250+ Students</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>12-15 Weeks</span>
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
                className="bg-gradient-to-br from-saffron-50 to-amber-50 rounded-2xl p-6 border-2 border-saffron-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-700">₹2,898</div>
                    <div className="text-sm text-slate-400 line-through">₹4,999</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Save ₹2,101</div>
                    <div className="text-xs text-slate-500">42% off</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-saffron-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>Complete Sanskrit Mastery • Premium Quality</span>
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
                  onClick={() => window.open('https://courses.shikshanam.in/courses/Sanskrit-from-Basics-to-Conversation-655f7abae4b0ed7a05c95cfc', '_blank')}
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
                <span>Master the World's Most Ancient Living Language</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-saffron-100 to-amber-100 rounded-3xl p-8 shadow-2xl">
                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <FileText className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Script</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Brain className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Grammar</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <MessageCircle className="w-8 h-8 text-emerald-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Conversation</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Globe className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Reading</p>
                  </motion.div>
                </div>

                {/* Center Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-video bg-gradient-to-br from-saffron-100 to-amber-200 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div className="text-center">
                    <BookOpen className="w-20 h-20 text-saffron-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">संस्कृत भाषा</p>
                  </div>
                  
                  {/* Floating Elements */}
                  {['Script', 'Grammar', 'Speaking', 'Reading'].map((text, index) => (
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

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Complete Learning Experience"
            subtitle="Everything you need to master Sanskrit from basics to fluent conversation"
            features={premiumFeatures}
            layout="staggered"
          />
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LearningPathTimeline 
            steps={learningPath}
            orientation="vertical"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Student Success Stories"
            subtitle="Join thousands who have mastered Sanskrit with our comprehensive program"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about mastering Sanskrit"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready to Awaken the Divine Language?"
        subtitle="Join thousands of students learning Sanskrit from scratch to fluency. Start your journey into the world's most ancient living language today."
        price="₹2,898"
        originalPrice="₹4,999"
        savings="Save ₹2,101 (42%)"
        primaryCTA={{
          text: 'Begin Sanskrit Journey',
          action: () => window.open('https://courses.shikshanam.in/courses/Sanskrit-from-Basics-to-Conversation-655f7abae4b0ed7a05c95cfc', '_blank')
        }}
        secondaryCTA={{
          text: 'Download Course Syllabus',
          action: () => router.push('/courses')
        }}
        trustBadges={[
          '3 years Access to All Materials',
          'Weekly Live Conversation Sessions',
          'Certificate Upon Completion'
        ]}
        urgency={{
          type: 'discount',
          message: 'Special introductory pricing - Save 42% today!'
        }}
      />
    </div>
  );
}
