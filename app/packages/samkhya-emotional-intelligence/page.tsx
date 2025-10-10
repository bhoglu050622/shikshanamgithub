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
  Users as UsersIcon
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button, { CTAButton } from '@/components/ui/button'
import Link from 'next/link'
import RobustImage from '@/components/optimization/RobustImage'

// Package data
const packageData = {
  id: 'samkhya-emotional-intelligence',
  title: 'Samkhya Darshan + Emotional Intelligence Combo Course',
  subtitle: 'Ancient Wisdom Meets Modern Psychology',
  description: 'Combine the timeless wisdom of Samkhya philosophy with modern emotional intelligence principles for personal transformation and self-mastery. Learn how ancient Indian philosophy can enhance your emotional well-being and interpersonal relationships.',
  originalPrice: '₹3,499',
  currentPrice: '₹2,199',
  savings: '₹1,300 (37% OFF)',
  duration: '8-10 weeks',
  level: 'Intermediate',
  rating: 4.7,
  students: 720,
  status: 'available',
  category: 'Philosophy + Psychology',
  instructor: 'Dr. Philosophy & Psychology Expert',
  language: 'Hindi & English',
  lastUpdated: 'December 2024',
  
  features: [
    'Samkhya Philosophy Foundation',
    'Emotional Intelligence Principles',
    'Practical Applications',
    'Self-Assessment Tools',
    'Transformation Techniques',
    'Mind-Body Connection',
    'Relationship Skills',
    'Personal Growth Methods'
  ],
  
  includes: [
    '35+ Video Lessons (HD Quality)',
    'Samkhya Philosophy Study',
    'EI Assessment Tools',
    'Practical Exercises & Workbooks',
    'Group Discussion Sessions',
    'Personal Development Plans',
    'PDF Study Materials',
    'Live Q&A Sessions (Weekly)',
    'Certificate of Completion',
    'Lifetime Access',
    'Community Forum Access',
    'Progress Tracking',
    'Expert Mentorship',
    'Integration Workshops'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-2',
      title: 'Samkhya Philosophy Basics',
      topics: ['Prakriti & Purusha', '25 Tattvas Overview', 'Mind-Body Connection', 'Consciousness & Matter'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 3-4',
      title: 'Emotional Intelligence Fundamentals',
      topics: ['Self-Awareness', 'Self-Regulation', 'Motivation', 'Empathy & Social Skills'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 5-6',
      title: 'Integration & Application',
      topics: ['Samkhya-EI Connection', 'Practical Exercises', 'Real-life Applications', 'Transformation Techniques'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 7-8',
      title: 'Advanced Practices',
      topics: ['Advanced EI Skills', 'Samkhya Meditation', 'Personal Growth Plans', 'Long-term Integration'],
      duration: '6 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      role: 'Psychologist & Life Coach',
      rating: 5,
      text: 'This course brilliantly bridges ancient wisdom with modern psychology. The Samkhya philosophy provides a deep foundation for understanding emotions, while EI principles offer practical tools for transformation.',
      avatar: '/assets/testimonials/priya-sharma.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Business Executive',
      rating: 5,
      text: 'The combination of Samkhya philosophy and emotional intelligence has transformed my leadership style. I now understand the deeper aspects of human nature and can apply this wisdom in my professional relationships.',
      avatar: '/assets/testimonials/rajesh-kumar.jpg'
    },
    {
      name: 'Anita Singh',
      role: 'Teacher & Mother',
      rating: 5,
      text: 'This course has helped me understand my emotions better and improved my relationships with family and students. The ancient wisdom of Samkhya provides a profound framework for emotional growth.',
      avatar: '/assets/testimonials/anita-singh.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'How does Samkhya philosophy relate to emotional intelligence?',
      answer: 'Samkhya philosophy provides a deep understanding of the nature of mind, consciousness, and matter, which forms the theoretical foundation for understanding emotions. This knowledge enhances emotional intelligence by providing insights into the root causes of emotional patterns.'
    },
    {
      question: 'Do I need prior knowledge of philosophy or psychology?',
      answer: 'No prior knowledge is required. The course is designed for intermediate learners and covers both Samkhya philosophy and emotional intelligence from the basics, making it accessible to everyone.'
    },
    {
      question: 'What practical tools will I learn?',
      answer: 'You\'ll learn self-assessment techniques, emotional regulation methods, mindfulness practices based on Samkhya principles, and practical strategies for improving relationships and personal growth.'
    },
    {
      question: 'How is this different from regular EI courses?',
      answer: 'This course combines the depth of ancient Indian philosophy with modern EI principles, providing a more comprehensive understanding of human nature and emotions than traditional EI courses.'
    },
    {
      question: 'Can I apply this in my professional life?',
      answer: 'Absolutely! The course includes specific applications for leadership, teamwork, communication, and professional relationships, making it valuable for career development.'
    }
  ],
  
  ctaText: 'Transform Yourself',
  ctaLink: 'https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360',
  image: '/assets/samkhya-ei-combo.jpg'
}

export default function SamkhyaEmotionalIntelligencePage() {
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
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30 dark:from-slate-900 dark:via-green-900/20 dark:to-blue-900/20">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-green-200/20 via-blue-200/15 to-indigo-200/20 dark:from-green-500/10 dark:via-blue-500/10 dark:to-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-4 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-blue-200/20 via-green-200/15 to-indigo-200/20 dark:from-blue-500/10 dark:via-green-500/10 dark:to-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <BrainIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/40 dark:to-blue-900/40 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
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
                <p className="text-xl text-green-600 dark:text-green-400 mb-4 font-medium">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl overflow-hidden shadow-2xl relative group">
                    <RobustImage
                      src="https://d502jbuhuh9wk.cloudfront.net/courses/6868be22998a012a18cc0360/6868be22998a012a18cc0360_scaled_cover.jpg?v=4"
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
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-blue-400/30 to-green-400/30 blur-sm"></div>
                    </div>
                    {/* Continuous Shine */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-600">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <HeartIcon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
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
              Combine ancient wisdom with modern psychology for complete personal transformation.
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
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BrainIcon className="w-6 h-6 text-white" />
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
              Everything you need to master both Samkhya philosophy and emotional intelligence.
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
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
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
                      This innovative course combines the ancient wisdom of Samkhya philosophy with modern emotional intelligence principles to provide a comprehensive approach to personal transformation and self-mastery. Samkhya philosophy offers deep insights into the nature of consciousness, mind, and matter, while emotional intelligence provides practical tools for understanding and managing emotions.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6">
                      You'll learn how the 25 tattvas (principles) of Samkhya philosophy relate to emotional patterns, how to use this understanding to develop greater self-awareness, and how to apply both ancient wisdom and modern psychology to improve your relationships, decision-making, and overall well-being.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      The course includes practical exercises, self-assessment tools, and real-world applications that will help you integrate these insights into your daily life for lasting transformation.
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
                          <p className="text-green-600 dark:text-green-400 font-medium">
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
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
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
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
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
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-green-200/40 to-blue-200/40 dark:from-green-500/30 dark:to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 dark:from-blue-500/30 dark:to-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 border-2 border-green-200 dark:border-green-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <HydrationSafeMotion 
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <BrainIcon className="w-8 h-8 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-shadow-sm">
                    Ready to Transform Yourself?
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
                      Start your transformation journey today and save
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
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg shadow-lg"
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
                      <span className="font-medium">Personal Growth</span>
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
