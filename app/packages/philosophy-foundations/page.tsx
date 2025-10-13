'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, Star, ArrowLeft, BookOpen, Brain, Lightbulb, Eye, Compass, Scroll, Sparkles, Target, Infinity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Mandala from '@/components/ornaments/Mandala';
import { PremiumFeatures } from '@/components/packages/PremiumFeatures';
import { CourseAccordion } from '@/components/packages/CourseAccordion';
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

export default function PhilosophyFoundationsPackagePage() {
  const router = useRouter();

  const premiumFeatures = [
    {
      icon: Brain,
      title: 'Complete Darshana Overview',
      description: 'Comprehensive study of all six classical schools of Indian philosophy - from logic to liberation',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Eye,
      title: 'Nyaya: Logic & Reasoning',
      description: 'Master the science of correct reasoning, logical analysis, and epistemology',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Sparkles,
      title: 'Vaisheshik: Atomic Theory',
      description: 'Explore ancient atomic theory and categorical analysis of reality',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Compass,
      title: 'Samkhya & Yoga',
      description: 'Understand dualistic philosophy and the practical path of Yoga',
      gradient: 'from-saffron-500 to-amber-600'
    },
    {
      icon: Scroll,
      title: 'Mimamsa & Vedanta',
      description: 'Study Vedic interpretation and non-dual philosophy - the pinnacle of Indian thought',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Lightbulb,
      title: 'Practical Application',
      description: 'Learn to apply philosophical insights to modern life and contemporary challenges',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const courseModules: CourseModule[] = [
    {
      title: 'Introduction to Indian Philosophy',
      description: 'Overview of the six Darshanas and their place in the Indian philosophical tradition',
      duration: '2 weeks',
      level: 'Beginner',
      learningOutcomes: [
        'Understand the concept of Darshana (philosophical viewpoint)',
        'Learn the historical development of Indian philosophy',
        'Grasp key philosophical concepts and terminology',
        'Appreciate the systematic nature of Indian thought'
      ],
      lessons: [
        { title: 'What is Darshana?', duration: '2 hours', type: 'video', preview: true },
        { title: 'Historical Context', duration: '1.5 hours', type: 'video', preview: true },
        { title: 'Key Concepts Overview', duration: '2 hours', type: 'video' }
      ]
    },
    {
      title: 'Nyaya Darshana: Logic & Epistemology',
      description: 'The school of correct reasoning, logical analysis, and theory of knowledge',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Master the Nyaya system of logic',
        'Understand the 16 categories of Nyaya',
        'Learn valid means of knowledge (Pramanas)',
        'Apply logical reasoning to philosophical problems'
      ],
      lessons: [
        { title: 'Nyaya Logic Fundamentals', duration: '6 hours', type: 'video', preview: true },
        { title: 'Theory of Knowledge', duration: '5 hours', type: 'video' },
        { title: 'Logical Inference', duration: '4 hours', type: 'video' },
        { title: 'Debate & Discussion Methods', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Vaisheshik Darshana: Atomic Theory',
      description: 'Ancient atomic theory and categorical analysis of the universe',
      duration: '3 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Understand Vaisheshik atomism',
        'Master the seven categories of reality',
        'Learn about substance, quality, and action',
        'Grasp the nature of causation'
      ],
      lessons: [
        { title: 'Atomic Theory Explained', duration: '5 hours', type: 'video', preview: true },
        { title: 'Seven Categories', duration: '6 hours', type: 'video' },
        { title: 'Nature of Reality', duration: '4 hours', type: 'video' }
      ]
    },
    {
      title: 'Samkhya Darshana: Dualistic Philosophy',
      description: 'The analytical system distinguishing consciousness from matter',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Understand Purusha-Prakriti duality',
        'Master the 25 tattvas (principles)',
        'Learn about the three Gunas',
        'Grasp the evolution of the universe'
      ],
      lessons: [
        { title: 'Purusha & Prakriti', duration: '5 hours', type: 'video', preview: true },
        { title: 'The 25 Tattvas', duration: '6 hours', type: 'video' },
        { title: 'Three Gunas in Detail', duration: '5 hours', type: 'video' },
        { title: 'Liberation in Samkhya', duration: '3 hours', type: 'video' }
      ]
    },
    {
      title: 'Yoga Darshana: Practical Philosophy',
      description: 'Patanjali\'s eight-limbed path and the science of consciousness',
      duration: '4 weeks',
      level: 'Intermediate',
      learningOutcomes: [
        'Study Patanjali\'s Yoga Sutras',
        'Understand the eight limbs of Yoga',
        'Learn meditation techniques',
        'Master consciousness transformation'
      ],
      lessons: [
        { title: 'Yoga Sutras Overview', duration: '4 hours', type: 'video', preview: true },
        { title: 'Eight Limbs of Yoga', duration: '8 hours', type: 'video' },
        { title: 'Meditation Practices', duration: '6 hours', type: 'video' },
        { title: 'Samadhi & Liberation', duration: '4 hours', type: 'video' }
      ]
    },
    {
      title: 'Mimamsa & Vedanta Darshanas',
      description: 'Vedic interpretation and non-dual philosophy - the ultimate truth',
      duration: '5 weeks',
      level: 'Advanced',
      learningOutcomes: [
        'Understand Mimamsa hermeneutics',
        'Master Vedanta non-dualism',
        'Study key Upanishadic concepts',
        'Grasp Brahman-Atman identity'
      ],
      lessons: [
        { title: 'Mimamsa: Vedic Interpretation', duration: '6 hours', type: 'video' },
        { title: 'Introduction to Vedanta', duration: '8 hours', type: 'video', preview: true },
        { title: 'Advaita Non-Dualism', duration: '8 hours', type: 'video' },
        { title: 'Brahman & Atman', duration: '6 hours', type: 'video' }
      ]
    }
  ];

  // Get relevant testimonials
  const relevantTestimonials = testimonialsData.testimonials
    .filter(t => t.course.toLowerCase().includes('philosophy') || t.course.toLowerCase().includes('darshan') || t.course.toLowerCase().includes('vedanta'))
    .slice(0, 6);

  const faq = [
    {
      question: 'Do I need prior knowledge of Indian philosophy?',
      answer: 'No prior knowledge is required. The course starts with basic concepts and builds up systematically through each school. We explain all technical terms and provide context for understanding.',
      category: 'Prerequisites'
    },
    {
      question: 'How long does it take to complete the course?',
      answer: 'The course is designed for 6 months of study with approximately 5-6 hours per week. Each school takes about 1 month to complete. You have 3 years access to study at your own pace.',
      category: 'Duration'
    },
    {
      question: 'Are the live sessions recorded?',
      answer: 'Yes, all live Q&A sessions and discussions are recorded and available for review. You can watch them anytime, even if you miss the live session.',
      category: 'Live Sessions'
    },
    {
      question: 'Will I get individual certificates for each school?',
      answer: 'Yes! You receive a certificate of completion for each philosophical school you complete, plus a master certificate for completing the entire Philosophy Foundations package.',
      category: 'Certification'
    },
    {
      question: 'Is this course theoretical or practical?',
      answer: 'Both! While we cover the theoretical foundations deeply, we also emphasize practical applications of philosophical insights to modern life, decision-making, and personal growth.',
      category: 'Approach'
    },
    {
      question: 'What is the teaching methodology?',
      answer: 'We use video lectures, interactive discussions, reading materials, quizzes, and live Q&A sessions. The teaching combines traditional wisdom with modern pedagogical methods for effective learning.',
      category: 'Methodology'
    }
  ];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Section with Animations */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Background Gradient Orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-pink-200/20 via-indigo-200/15 to-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />
        
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
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>Six Classical Schools</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
              >
                Philosophy
                <span className="block text-indigo-600 mt-2">
                  Foundations
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 leading-relaxed"
              >
                Explore the six classical schools of Indian philosophy with expert guidance, interactive discussions, and comprehensive study materials. Journey from logic to liberation.
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
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span>620+ Students</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>6 Months</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center space-x-2 text-slate-600"
                >
                  <Star className="w-5 h-5 fill-indigo-500 text-indigo-500" />
                  <span>4.9/5 Rating</span>
                </motion.div>
              </motion.div>

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-700">₹11,999</div>
                    <div className="text-sm text-slate-400 line-through">₹18,999</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Save ₹7,000</div>
                    <div className="text-xs text-slate-500">37% off</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span>3 Years Access • Certificate Included</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-indigo-600">
                  <Brain className="w-4 h-4" />
                  <span>Six Darshanas • Premium Quality</span>
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
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://courses.shikshanam.in/courses', '_blank')}
                >
                  Enroll Now
                </Button>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300"
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
                    <Star key={i} className="w-4 h-4 fill-indigo-500 text-indigo-500" />
                  ))}
              </div>
                <span>Journey from Logic to Liberation - Six Schools of Wisdom</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl">
                {/* Icon Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Eye className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Nyaya</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Sparkles className="w-8 h-8 text-emerald-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Vaisheshik</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Compass className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Samkhya</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <Brain className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Yoga</p>
                  </motion.div>
            </div>
            
                {/* Center Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div className="text-center">
                    <Brain className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
                    <p className="text-slate-700 font-semibold">Six Classical Schools</p>
                  </div>
                  
                  {/* Floating Elements */}
                  {['Nyaya', 'Vaisheshik', 'Samkhya', 'Yoga'].map((text, index) => (
                    <motion.div
                      key={text}
                      className="absolute text-xs font-bold text-indigo-600/60 bg-white/80 px-2 py-1 rounded-lg"
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
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse-gentle animation-delay-2000" />
                    </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatures
            title="Comprehensive Philosophical Education"
            subtitle="Master all six classical schools of Indian philosophy"
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
            title="Complete Philosophy Curriculum"
            subtitle="Systematic learning path through all six Darshanas"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials
            testimonials={relevantTestimonials}
            title="Student Insights"
            subtitle="Discover how philosophical wisdom has transformed lives"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ
            faqs={faq}
            title="Frequently Asked Questions"
            subtitle="Common questions about the Philosophy Foundations package"
            showSearch={false}
          />
        </div>
      </div>

      {/* CTA Section */}
      <PremiumCTA
        title="Ready to Explore Indian Philosophy?"
        subtitle="Join hundreds of students discovering the profound wisdom of six classical philosophical traditions"
        price="₹11,999"
        originalPrice="₹18,999"
        savings="Save ₹7,000 (37%)"
        primaryCTA={{
          text: 'Get Philosophy Foundations',
          action: () => window.open('https://courses.shikshanam.in/courses', '_blank')
        }}
        secondaryCTA={{
          text: 'View All Packages',
          action: () => router.push('/packages')
        }}
        trustBadges={[
          '3 years Access to All 6 Schools',
          'Weekly Live Q&A Sessions',
          'Individual Certificates Included'
        ]}
        urgency={{
          type: 'seats',
          message: 'Next cohort starts soon - Limited seats available!'
        }}
      />
    </div>
  );
}
