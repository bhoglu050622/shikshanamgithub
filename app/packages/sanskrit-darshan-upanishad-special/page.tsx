'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Play,
  Download,
  Sparkles,
  Flame,
  Heart,
  Brain,
  Lightbulb,
  Target,
  Award,
  Globe,
  Zap,
  CheckCircle,
  Lock,
  Unlock,
  Crown,
  Gift,
  TrendingUp,
  MessageCircle,
  Instagram,
  Mail,
  ExternalLink,
  User,
  Shield,
  HelpCircle,
  Settings,
  Bell,
  Bookmark,
  Share2,
  ThumbsUp,
  Eye,
  EyeOff,
  IndianRupee,
  Percent,
  Package,
  BookMarked,
  GraduationCap,
  Trophy,
  Diamond,
  Volume2,
  FileText,
  Video,
  Headphones,
  Calendar,
  MapPin,
  Phone,
  Mail as MailIcon,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Quote,
  UserCheck,
  Award as AwardIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  Languages,
  Book,
  PenTool,
  Mic,
  HeadphonesIcon,
  FileAudio,
  FileVideo,
  FileImage,
  File,
  Download as DownloadIcon,
  Wifi,
  WifiOff,
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Infinity,
  Layers,
  Database,
  Server,
  Cloud,
  Zap as ZapIcon,
  Rocket,
  Gem,
  Star as StarIcon,
  Moon,
  Sun,
  TreePine,
  Mountain,
  Eye as EyeIcon,
  Atom,
  Brain as BrainIcon,
  Heart as HeartIcon,
  Smile,
  UserPlus,
  Users as UsersIcon,
  Activity,
  Shield as ShieldIcon,
  Zap as ZapIcon2,
  Calendar as CalendarIcon
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button, { CTAButton } from '@/components/ui/button'
import Link from 'next/link'
import RobustImage from '@/components/optimization/RobustImage'

// Package data
const packageData = {
  id: 'sanskrit-darshan-upanishad-special',
  title: 'Sanskrit + Darshan + Upanishad: Hindu New Year Special Course Bundle',
  subtitle: 'Complete Spiritual Education Package',
  description: 'Celebrate the Hindu New Year with this comprehensive bundle combining Sanskrit language, philosophical systems (Darshan), and Upanishadic wisdom. A complete spiritual education package for the new beginning.',
  originalPrice: '₹8,999',
  currentPrice: '₹4,999',
  savings: '₹4,000 (44% OFF)',
  duration: '16-20 weeks',
  level: 'Beginner to Advanced',
  rating: 4.9,
  students: 1850,
  status: 'available',
  category: 'Complete Bundle',
  instructor: 'Multiple Expert Instructors',
  language: 'Hindi & English',
  lastUpdated: 'December 2024',
  
  features: [
    'Sanskrit Language Mastery',
    'Six Darshanas Study',
    'Upanishadic Wisdom',
    'Cultural Context',
    'Practical Applications',
    'Spiritual Practices',
    'Text Analysis',
    'Integration Methods'
  ],
  
  includes: [
    '60+ Video Lessons (HD Quality)',
    'Sanskrit Grammar & Vocabulary',
    'Six Darshanas Study',
    'Upanishadic Texts',
    'Cultural Context Lessons',
    'PDF Study Materials',
    'Live Q&A Sessions (Weekly)',
    'Certificate of Completion',
    'Lifetime Access',
    'Community Forum Access',
    'Progress Tracking',
    'Expert Mentorship',
    'Practice Workbooks',
    'Integration Workshops',
    'Special New Year Bonus Content'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-4',
      title: 'Sanskrit Foundation',
      topics: ['Alphabet & Pronunciation', 'Basic Grammar', 'Vocabulary Building', 'Simple Sentences'],
      duration: '12 hours'
    },
    {
      week: 'Weeks 5-8',
      title: 'Sanskrit Intermediate',
      topics: ['Advanced Grammar', 'Complex Sentences', 'Text Reading', 'Writing Practice'],
      duration: '12 hours'
    },
    {
      week: 'Weeks 9-12',
      title: 'Six Darshanas',
      topics: ['Nyaya & Vaisheshika', 'Samkhya & Yoga', 'Mimamsa & Vedanta', 'Comparative Study'],
      duration: '16 hours'
    },
    {
      week: 'Weeks 13-16',
      title: 'Upanishadic Wisdom',
      topics: ['Major Upanishads', 'Key Concepts', 'Spiritual Practices', 'Integration'],
      duration: '16 hours'
    },
    {
      week: 'Weeks 17-20',
      title: 'Integration & Practice',
      topics: ['Combined Study', 'Practical Applications', 'Spiritual Development', 'Advanced Topics'],
      duration: '12 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      role: 'Sanskrit Scholar',
      rating: 5,
      text: 'This bundle is exceptional! The combination of Sanskrit, Darshanas, and Upanishads provides a complete spiritual education. Perfect for the Hindu New Year celebration.',
      avatar: '/assets/testimonials/priya-sharma.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Spiritual Practitioner',
      rating: 5,
      text: 'The comprehensive approach to spiritual education is outstanding. Learning Sanskrit alongside the philosophical systems and Upanishads creates a deep understanding.',
      avatar: '/assets/testimonials/rajesh-kumar.jpg'
    },
    {
      name: 'Dr. Anjali Mehta',
      role: 'Philosophy Professor',
      rating: 5,
      text: 'This bundle offers incredible value. The integration of language, philosophy, and spiritual wisdom provides a complete foundation for spiritual growth.',
      avatar: '/assets/testimonials/anjali-mehta.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'What makes this a special New Year bundle?',
      answer: 'This bundle combines three essential components of Hindu spiritual education - Sanskrit language, the six philosophical systems (Darshanas), and Upanishadic wisdom - offering a complete spiritual foundation for the new year.'
    },
    {
      question: 'Do I need prior knowledge of Sanskrit?',
      answer: 'No prior knowledge is required. The course starts from the basics and progresses to advanced levels, making it suitable for complete beginners.'
    },
    {
      question: 'What are the six Darshanas covered?',
      answer: 'The course covers all six classical Darshanas: Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta, providing a comprehensive understanding of Hindu philosophy.'
    },
    {
      question: 'Which Upanishads are included?',
      answer: 'The course includes major Upanishads such as Isha, Kena, Katha, Prashna, Mundaka, Mandukya, Taittiriya, Aitareya, Chandogya, and Brihadaranyaka.'
    },
    {
      question: 'How long does it take to complete?',
      answer: 'The complete bundle takes 16-20 weeks to finish, but you have lifetime access and can learn at your own pace.'
    }
  ],
  
  ctaText: 'Start New Year Journey',
  ctaLink: 'https://courses.shikshanam.in/single-checkout/65a12c60e4b05ac7edb4876c?pid=p1',
  image: 'https://d502jbuhuh9wk.cloudfront.net/courses/65a12c60e4b05ac7edb4876c/65a12c60e4b05ac7edb4876c_scaled_cover.jpg?v=10'
}

export default function SanskritDarshanUpanishadSpecialPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 dark:from-slate-900 dark:via-orange-900/20 dark:to-red-900/20">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-orange-200/20 via-red-200/15 to-yellow-200/20 dark:from-orange-500/10 dark:via-red-500/10 dark:to-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-4 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-red-200/20 via-orange-200/15 to-yellow-200/20 dark:from-red-500/10 dark:via-orange-500/10 dark:to-yellow-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium">
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
                <p className="text-xl text-orange-600 dark:text-orange-400 mb-4 font-medium">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.duration}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Duration</div>
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
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl overflow-hidden shadow-2xl relative group">
                    <RobustImage
                      src={packageData.image}
                      alt={packageData.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      fallbackSrc="https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Enhanced Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-enhanced-shine"></div>
                    </div>
                    {/* Secondary Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-500 delay-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/25 transform rotate-12 animate-shimmer"></div>
                    </div>
                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-400">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-red-400/30 to-orange-400/30 blur-sm"></div>
                    </div>
                    {/* Continuous Shine */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-600">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
                    </div>
                    {/* Fallback content in case image fails to load */}
                    <div className="absolute inset-0 flex items-center justify-center hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <CalendarIcon className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">Course Preview</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CalendarIcon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
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
              What You'll Master
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto text-readable font-medium">
              Complete spiritual education combining Sanskrit language, philosophical systems, and Upanishadic wisdom.
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
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-6 h-6 text-white" />
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
              Everything you need for complete spiritual education and New Year transformation.
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
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
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
                    Course Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      This special New Year bundle offers a complete spiritual education combining three essential components of Hindu wisdom: Sanskrit language, the six philosophical systems (Darshanas), and Upanishadic teachings. Perfect for starting the new year with deep spiritual learning.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      Sanskrit serves as the foundation, providing access to original texts. The six Darshanas offer systematic philosophical understanding, while the Upanishads provide the highest spiritual wisdom. Together, they create a comprehensive spiritual education.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      This bundle is designed for serious spiritual seekers who want to understand the depth and breadth of Hindu spiritual tradition, making it an ideal way to begin the new year with profound learning.
                    </p>
                  </div>
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'curriculum' && (
              <HydrationSafeMotion
                key="curriculum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="space-y-6">
                  {packageData.curriculum.map((module, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-orange-600 dark:text-orange-400 font-medium">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                            <span className="text-gray-700 dark:text-gray-200 text-sm">{topic}</span>
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
                className="max-w-4xl mx-auto"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packageData.testimonials.map((testimonial, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
      <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-orange-200/40 to-red-200/40 dark:from-orange-500/30 dark:to-red-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-red-200/40 to-yellow-200/40 dark:from-red-500/30 dark:to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <HydrationSafeMotion 
                    className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <CalendarIcon className="w-8 h-8 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-shadow-sm">
                    Ready to Begin Your New Year Journey?
                  </h3>
                </div>
                
                <HydrationSafeMotion 
                  className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/30 dark:via-orange-900/30 dark:to-red-900/30 rounded-2xl p-6 mb-8 border-2 border-orange-200 dark:border-orange-700 shadow-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl font-medium">
                      Start your spiritual education today and save
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
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg shadow-lg"
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
                    <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/30 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-700">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      <span className="font-medium">New Year Special</span>
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
