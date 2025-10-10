'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Download,
  Sparkles,
  CheckCircle,
  IndianRupee,
  Package,
  BookMarked,
  GraduationCap,
  Trophy,
  Diamond,
  Video,
  Headphones,
  Calendar,
  ChevronDown,
  ChevronUp,
  Quote,
  UserCheck,
  Book,
  Award,
  Brain,
  Heart,
  Lightbulb,
  Target,
  Shield,
  Infinity,
  Rocket,
  Gem,
} from '@/lib/icons'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button, { CTAButton } from '@/components/ui/button'
import Link from 'next/link'

// Package data
const packageData = {
  id: 'para-apara-all-courses',
  title: 'Parā + Aparā (All Shikshanam Courses)',
  subtitle: 'Complete Learning Ecosystem',
  description: 'Access to all Shikshanam courses covering Sanskrit, philosophy, Upanishads, and practical wisdom. The ultimate learning package for serious students seeking comprehensive mastery of ancient Indian knowledge systems.',
  originalPrice: '₹19,999',
  currentPrice: '₹9,999',
  savings: '₹10,000 (50% OFF)',
  duration: 'Lifetime Access',
  level: 'All Levels',
  rating: 5.0,
  students: 2100,
  status: 'available',
  category: 'Complete Bundle',
  instructor: 'Multiple Expert Instructors',
  language: 'Hindi & English',
  lastUpdated: 'December 2024',
  
  features: [
    'All Sanskrit Courses',
    'All Philosophy Courses',
    'All Upanishad Courses',
    'Tools & Resources',
    'Community Access',
    'Expert Mentorship',
    'Lifetime Updates',
    'Priority Support'
  ],
  
  includes: [
    '50+ Complete Courses',
    '500+ Video Lectures (HD)',
    '1000+ Audio Files',
    'Comprehensive Study Materials',
    'Interactive Tools & Resources',
    'Live Q&A Sessions (Weekly)',
    'Community Forum Access',
    'Mobile App Access',
    'Progress Tracking System',
    'Certificate of Mastery',
    'Lifetime Access to All Content',
    'New Course Updates (Free)',
    'Priority Customer Support',
    'Exclusive Masterclasses',
    'Advanced Learning Paths'
  ],
  
  courseCategories: [
    {
      category: 'Sanskrit Language',
      courses: [
        'Sanskrit Basics to Conversation',
        'Sanskrit Grammar Mastery',
        'Sanskrit Literature Study',
        'Sanskrit Pronunciation & Phonetics',
        'Sanskrit Writing & Reading'
      ],
      icon: Languages,
      color: 'from-orange-500 to-amber-500'
    },
    {
      category: 'Philosophy (Darshanas)',
      courses: [
        'Sāṅkhya Philosophy',
        'Yoga Philosophy',
        'Nyaya Logic',
        'Vaisheshik Atomism',
        'Mimamsa Interpretation',
        'Vedanta Non-Dualism'
      ],
      icon: Brain,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      category: 'Upanishads',
      courses: [
        'Isha Upanishad',
        'Prashna Upanishad',
        'Katha Upanishad',
        'Mundaka Upanishad',
        'Mandukya Upanishad',
        'Chandogya Upanishad'
      ],
      icon: Book,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Practical Wisdom',
      courses: [
        'Chanakya\'s Code',
        'Emotional Intelligence',
        'Life Skills & Ethics',
        'Meditation & Mindfulness',
        'Yoga Practices',
        'Spiritual Development'
      ],
      icon: Lightbulb,
      color: 'from-green-500 to-emerald-500'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Anjali Sharma',
      role: 'Professor of Sanskrit',
      rating: 5,
      text: 'This is the most comprehensive collection of Indian knowledge systems I have ever seen. The quality of content and depth of coverage is exceptional. Every serious student of Indian philosophy should have this.',
      avatar: '/assets/testimonials/anjali-sharma.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer & Spiritual Seeker',
      rating: 5,
      text: 'I\'ve been studying Sanskrit and philosophy for years, but this bundle has given me access to resources I never knew existed. The lifetime access and continuous updates make it an incredible value.',
      avatar: '/assets/testimonials/rajesh-kumar.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'Yoga Teacher & Life Coach',
      rating: 5,
      text: 'This complete bundle has transformed my teaching practice. Having access to all these courses has deepened my understanding and allowed me to offer more comprehensive guidance to my students.',
      avatar: '/assets/testimonials/priya-patel.jpg'
    },
    {
      name: 'Amit Singh',
      role: 'Business Executive',
      rating: 5,
      text: 'The practical wisdom courses, especially Chanakya\'s Code, have been game-changers for my business and personal life. The combination of ancient wisdom with modern applications is brilliant.',
      avatar: '/assets/testimonials/amit-singh.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'What exactly is included in this bundle?',
      answer: 'This bundle includes access to all current and future Shikshanam courses, covering Sanskrit language, all six schools of Indian philosophy, major Upanishads, practical wisdom courses, tools, resources, and community access.'
    },
    {
      question: 'Do I get lifetime access to everything?',
      answer: 'Yes, you get lifetime access to all current courses and any new courses that are added in the future. This includes updates, new content, and additional resources.'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Absolutely! The bundle includes courses for all levels, from complete beginners to advanced students. You can start with basic courses and progress at your own pace.'
    },
    {
      question: 'How does this compare to buying courses individually?',
      answer: 'If you were to buy all courses individually, it would cost over ₹50,000. This bundle gives you everything for ₹9,999, saving you more than ₹40,000 while providing additional benefits like lifetime access and priority support.'
    },
    {
      question: 'What if I only want to focus on specific areas?',
      answer: 'You can access any course you want at any time. The bundle gives you the flexibility to study whatever interests you most, whether it\'s Sanskrit, philosophy, Upanishads, or practical wisdom.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not completely satisfied with the bundle, you can request a full refund within 30 days of purchase.'
    }
  ],
  
  ctaText: 'Get Complete Access',
  ctaLink: 'https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1',
  image: '/assets/all-courses-bundle.jpg'
}

export default function ParaAparaAllCoursesPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'courses', label: 'All Courses', icon: Layers },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/30 dark:from-slate-900 dark:via-amber-900/20 dark:to-orange-900/20">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-amber-200/20 via-orange-200/15 to-yellow-200/20 dark:from-amber-500/10 dark:via-orange-500/10 dark:to-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-4 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-orange-200/20 via-amber-200/15 to-yellow-200/20 dark:from-orange-500/10 dark:via-amber-500/10 dark:to-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-medium">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight text-shadow-sm">
                  {packageData.title}
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-amber-600 dark:text-amber-400 mb-4 font-medium">
                  {packageData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed text-readable font-medium">
                  {packageData.description}
                </p>
              </StaggerItem>

              {/* Stats */}
              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Infinity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">Lifetime</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Access</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Price */}
              <StaggerItem>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {packageData.savings}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300">Level</div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">{packageData.level}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    href={packageData.ctaLink}
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Image/Video */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">Complete Bundle Preview</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-shadow-sm">
              Complete Learning Ecosystem
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto text-readable font-medium">
              Access everything you need to master ancient Indian knowledge systems in one comprehensive package.
            </p>
          </HydrationSafeMotion>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packageData.features.map((feature, index) => (
              <HydrationSafeMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {feature}
                </h3>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-shadow-sm">
              What's Included
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto text-readable font-medium">
              Everything you need for complete mastery of ancient Indian knowledge systems.
            </p>
          </HydrationSafeMotion>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageData.includes.map((item, index) => (
              <HydrationSafeMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      {item}
                    </h3>
                  </div>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <HydrationSafeMotion
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Complete Learning Ecosystem
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      This is the ultimate package for anyone serious about mastering ancient Indian knowledge systems. The Parā + Aparā bundle gives you access to everything Shikshanam has to offer - from Sanskrit language mastery to deep philosophical insights, from Upanishadic wisdom to practical life skills.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      Whether you're a complete beginner or an advanced practitioner, this bundle provides a comprehensive learning path that covers all aspects of traditional Indian education. You'll have lifetime access to all current courses and any future additions, making this an investment in your lifelong learning journey.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      The bundle includes expert instruction, comprehensive materials, interactive tools, community support, and continuous updates. It's designed to be your complete resource for understanding and applying ancient wisdom in modern life.
                    </p>
                  </div>
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'courses' && (
              <HydrationSafeMotion
                key="courses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="space-y-8">
                  {packageData.courseCategories.map((category, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg"
                    >
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                          {category.category}
                        </h3>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">{course}</span>
                          </div>
                        ))}
                      </div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'testimonials' && (
              <HydrationSafeMotion
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {packageData.testimonials.map((testimonial, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'faq' && (
              <HydrationSafeMotion
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="space-y-4">
                  {packageData.faqs.map((faq, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-gray-500" />
                        ) : (
                          <Plus className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <HydrationSafeMotion
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4">
                              <p className="text-gray-700 dark:text-gray-200">
                                {faq.answer}
                              </p>
                            </div>
                          </HydrationSafeMotion>
                        )}
                      </AnimatePresence>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </HydrationSafeMotion>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-orange-200/40 dark:from-amber-500/30 dark:to-orange-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-orange-200/40 to-yellow-200/40 dark:from-orange-500/30 dark:to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <HydrationSafeMotion 
                    className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Crown className="w-8 h-8 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-shadow-sm">
                    Ready for Complete Mastery?
                  </h3>
                </div>
                
                <HydrationSafeMotion 
                  className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-green-900/30 rounded-2xl p-6 mb-8 border-2 border-green-200 dark:border-green-700 shadow-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl font-medium">
                      Get lifetime access to everything and save
                    </p>
                    <HydrationSafeMotion 
                      className="font-bold text-3xl md:text-4xl text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-xl shadow-lg border border-green-300 dark:border-green-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {packageData.savings}
                    </HydrationSafeMotion>
                  </div>
                </HydrationSafeMotion>
                
                <div className="space-y-6">
                  <HydrationSafeMotion
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      href={packageData.ctaLink}
                      icon={<ArrowRight className="w-6 h-6" />}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg shadow-lg"
                    >
                      {packageData.ctaText}
                    </Button>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion 
                    className="flex items-center justify-center gap-3 text-sm md:text-base text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full border border-green-200 dark:border-green-700">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Ultimate Value</span>
                    </div>
                  </HydrationSafeMotion>
                </div>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </>
  )
}
