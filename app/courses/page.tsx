'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  ArrowRight,
  Video,
  FileText,
  CheckCircle,
  Crown,
  Sparkles,
  Brain,
  Languages,
  GraduationCap,
  Filter,
  X
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import Link from 'next/link'

// Course type definitions
type CourseCategory = 'all' | 'language' | 'philosophy' | 'practice' | 'live'
type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional'

interface Course {
  title: string
  type: string
  description: string
  status: 'available' | 'upcoming'
  price: string
  originalPrice?: string
  savings?: string
  duration: string
  level: CourseLevel
  features: string[]
  link: string
  category: CourseCategory
  isPaid: boolean
  isLive?: boolean
  subtitle?: string
}

// All courses with proper categorization
const allCourses: Course[] = [
  // Language Courses
  {
    title: 'संस्कृत भाषा प्रज्ञा: Online Sanskrit Course in Hindi for Beginners',
    type: 'Language Course',
    description: 'Comprehensive Sanskrit language course taught in Hindi for complete beginners',
    status: 'available',
    price: '₹2,499',
    duration: '12-15 weeks',
    level: 'Beginner',
    features: ['Hindi Instruction', 'Grammar Fundamentals', 'Reading Practice', 'Writing Exercises'],
    link: '/courses/sanskrit-bhasha-pragya',
    category: 'language',
    isPaid: true,
    isLive: true
  },
      {
        title: 'संस्कृत: प्रारंभ से संभाषण तक: Level-1: Package',
    type: 'Language Course',
        description: 'Complete Sanskrit foundation course from basics to conversation level',
        status: 'available',
        price: '₹2,898',
        duration: '12-15 weeks',
        level: 'Beginner',
        features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context'],
    link: '/courses/sanskrit-beginner',
    category: 'language',
    isPaid: true
      },
      {
        title: 'संस्कृत संभाषण: Speak Sanskrit Without Grammar: Level-1',
    type: 'Language Course',
        description: 'Learn to speak Sanskrit naturally without getting bogged down by complex grammar rules',
        status: 'available',
        price: '₹399',
        duration: '4-6 weeks',
        level: 'Beginner',
        features: ['Conversational Sanskrit', 'Practical Usage', 'Audio Lessons', 'Speaking Practice'],
    link: '/courses/sanskrit-conversation',
    category: 'language',
    isPaid: true
      },
  // Philosophy Courses
      {
        title: 'Advaita Vedanta Darshan: दृग दृश्य विवेक द्वारा अद्वैत की व्याख्या',
    type: 'Philosophy Course',
        description: 'Deep exploration of non-dual philosophy through the lens of Drig Drishya Viveka',
        status: 'available',
        price: '₹1,999',
        duration: '8-10 weeks',
        level: 'Advanced',
        features: ['Non-Dual Philosophy', 'Text Study', 'Meditation Practices', 'Spiritual Insights'],
    link: '/courses/advaita-vedanta',
    category: 'philosophy',
    isPaid: true
      },
      {
        title: 'कश्मीरी शैव दर्शन – अनंत सत्य की खोज',
    type: 'Philosophy Course',
        description: 'Journey into the profound depths of Kashmiri Shaivism and the search for infinite truth',
        status: 'available',
        price: '₹1,999',
        duration: '10-12 weeks',
        level: 'Advanced',
        features: ['Tantric Philosophy', 'Consciousness Studies', 'Spiritual Practices', 'Advanced Concepts'],
    link: '/courses/kashmir-shaivism',
    category: 'philosophy',
    isPaid: true
      },
      {
        title: 'प्रश्न उपनिषद्: Online Course on The Prashna Upanishad',
    type: 'Philosophy Course',
        description: 'Deep study of the Prashna Upanishad with question-answer format exploration',
        status: 'available',
        price: '₹1,499',
        duration: '6-8 weeks',
        level: 'Intermediate',
        features: ['Text Study', 'Question-Answer Format', 'Meditation Practices', 'Spiritual Insights'],
    link: '/courses/prashna-upanishad',
    category: 'philosophy',
    isPaid: true
      },
      {
        title: 'ईशावास्य उपनिषद्: Online Course on The Isha Upanishad',
    type: 'Philosophy Course',
        description: 'Introduction to Upanishadic wisdom through the Isha Upanishad',
        status: 'available',
        price: '₹999',
        duration: '4-6 weeks',
        level: 'Beginner',
        features: ['Upanishadic Wisdom', 'Chanting Practice', 'Philosophical Discussion', 'Practical Application'],
    link: '/courses/isha-upanishad-course',
    category: 'philosophy',
    isPaid: true
      },
      {
        title: 'न्याय दर्शन: The Art of Perception: Nyaya Darshan',
    type: 'Philosophy Course',
        description: 'Master the art of logical reasoning and systematic debate through Nyaya philosophy',
        status: 'available',
        price: '₹999',
        duration: '6-8 weeks',
        level: 'Intermediate',
        features: ['Logical Reasoning', 'Debate Techniques', 'Fallacy Recognition', 'Valid Inference'],
    link: '/courses/nyaya-darshan-course',
    category: 'philosophy',
    isPaid: true
      },
      {
        title: 'वैशेषिक दर्शन: Philosophy of Maharshi Kanada\'s Vaisheshik Sutras',
    type: 'Philosophy Course',
        description: 'Explore the atomic theory of reality and fundamental building blocks of existence through Vaisheshik philosophy',
        status: 'available',
        price: '₹999',
        duration: '8-10 weeks',
        level: 'Beginner',
        features: ['Atomic Theory', '30 Sessions', 'Quizzes & Notes', 'Free Updates'],
    link: '/courses/vaisheshik-darshan-course',
    category: 'philosophy',
    isPaid: true
      },
  {
    title: 'Emotional Intelligence with Samkhya Darshan',
    type: 'Philosophy Course',
    description: 'Transform your emotional landscape through ancient Samkhya philosophy and modern psychology',
    status: 'available',
    price: '₹2,499',
    duration: '12-15 weeks',
    level: 'Intermediate',
    features: ['Emotional Mastery', 'Samkhya Philosophy', '18 Modules', 'Practical Application'],
    link: '/courses/emotional-intelligence-with-samkhya-darshan',
    category: 'philosophy',
    isPaid: true,
    isLive: true
  },
  {
    title: 'योग दर्शन: Yoga Philosophy through Patanjali Yoga Sutras',
    type: 'Philosophy Course',
    description: 'Transform your life with the wisdom of all 195 Yoga Sutras of Maharshi Patanjali',
    status: 'available',
    price: '₹1,999',
    duration: '10-12 weeks',
    level: 'Beginner',
    features: ['195 Sutras Covered', '4 Chapters', 'Live Q&A', 'Certification'],
    link: '/courses/yoga-darshan-course',
    category: 'philosophy',
    isPaid: true,
    isLive: true
  },
  // Spiritual Practice Courses
  {
    title: 'Chanakya\'s Code: Dominate Negotiation & Business Tactics!',
    type: 'Practical Course',
    description: 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings',
    status: 'available',
    price: '₹3,999',
    duration: '8-10 weeks',
    level: 'Professional',
    features: ['Business Strategy', 'Negotiation Skills', 'Leadership Principles', 'Case Studies'],
    link: '/courses/chanakya-code',
    category: 'practice',
    isPaid: true
      },
  {
    title: 'Live Durgāsaptashatī Recitation Course',
    type: 'Spiritual Practice',
    description: 'Embark on a 3-month sacred journey into the Durga Saptashati — culminating in Navratri and Vijayadashami',
    status: 'available',
    price: '₹1,999',
    duration: '3 months',
    level: 'Intermediate',
    features: ['Sacred Recitation', 'Navratri Celebration', 'Weekend Classes', 'Spiritual Journey'],
    link: '/courses/durgasaptashi',
    category: 'practice',
    isPaid: true,
    isLive: true
  }
]

// Category tabs configuration
const categoryTabs = [
  {
    id: 'all' as CourseCategory,
    label: 'All Courses',
    icon: BookOpen,
    color: 'from-slate-500 to-gray-500',
    description: 'Browse all available courses'
  },
  {
    id: 'live' as CourseCategory,
    label: 'Live Classes',
    icon: Video,
    color: 'from-red-500 to-rose-500',
    description: 'Interactive live learning sessions'
  },
  {
    id: 'language' as CourseCategory,
    label: 'Language Courses',
    icon: Languages,
    color: 'from-blue-500 to-cyan-500',
    description: 'Master Sanskrit from basics to conversation'
  },
  {
    id: 'philosophy' as CourseCategory,
    label: 'Philosophy Courses',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    description: 'Explore Darshanas and Upanishads'
  },
  {
    id: 'practice' as CourseCategory,
    label: 'Spiritual Practice',
    icon: Sparkles,
    color: 'from-orange-500 to-red-500',
    description: 'Apply ancient wisdom practically'
  }
]

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<CourseCategory>('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all')
  const [levelFilter, setLevelFilter] = useState<'all' | CourseLevel>('all')

  // Filter courses based on active tab and filters
  const filteredCourses = allCourses.filter(course => {
    // Handle 'all' tab - show all courses
    if (activeTab === 'all') {
      // Only apply price and level filters
      if (priceFilter === 'free' && course.isPaid) return false
      if (priceFilter === 'paid' && !course.isPaid) return false
      if (levelFilter !== 'all' && course.level !== levelFilter) return false
      return true
    }
    
    // Handle 'live' tab - show only live courses
    if (activeTab === 'live') {
      if (!course.isLive) return false
      if (priceFilter === 'free' && course.isPaid) return false
      if (priceFilter === 'paid' && !course.isPaid) return false
      if (levelFilter !== 'all' && course.level !== levelFilter) return false
      return true
    }
    
    // Handle specific category tabs
    if (course.category !== activeTab) return false
    if (priceFilter === 'free' && course.isPaid) return false
    if (priceFilter === 'paid' && !course.isPaid) return false
    if (levelFilter !== 'all' && course.level !== levelFilter) return false
    return true
  })

  // Count courses by category for badges
  const courseCounts = {
    all: allCourses.length,
    live: allCourses.filter(c => c.isLive).length,
    language: allCourses.filter(c => c.category === 'language').length,
    philosophy: allCourses.filter(c => c.category === 'philosophy').length,
    practice: allCourses.filter(c => c.category === 'practice').length
  }

  const clearFilters = () => {
    setPriceFilter('all')
    setLevelFilter('all')
  }

  const hasActiveFilters = priceFilter !== 'all' || levelFilter !== 'all'

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-200 dark:border-orange-700">
              <GraduationCap className="w-4 h-4" />
              <span>12 Premium Courses Available</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-shadow-sm">
              Master Ancient Wisdom
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed text-readable font-medium">
              From Sanskrit language mastery to profound philosophical insights, embark on a transformative journey through India's timeless knowledge traditions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Live Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Lifetime Access</span>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>

      {/* Tabs & Courses Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-4 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300
                    flex flex-col items-center gap-2 text-center
                    ${activeTab === tab.id 
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105` 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm lg:text-base">{tab.label}</span>
                      <span className={`
                        px-1.5 py-0.5 rounded-full text-xs font-bold
                        ${activeTab === tab.id 
                          ? 'bg-white/20' 
                          : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                        }
                      `}>
                        {courseCounts[tab.id]}
                      </span>
                    </div>
                    <p className={`text-xs hidden lg:block ${activeTab === tab.id ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                      {tab.description}
                    </p>
                  </div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </HydrationSafeMotion>

          {/* Quick Filters */}
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
              </div>

              {/* Price Filter */}
              <div className="flex gap-2">
                {(['all', 'free', 'paid'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setPriceFilter(filter)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${priceFilter === filter
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {filter === 'all' ? 'All Prices' : filter === 'free' ? 'Free' : 'Paid'}
                  </button>
                ))}
              </div>

              {/* Level Filter */}
              <div className="flex gap-2 flex-wrap">
                {(['all', 'Beginner', 'Intermediate', 'Advanced', 'Professional'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setLevelFilter(level as any)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${levelFilter === level
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </button>
                ))}
                </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </HydrationSafeMotion>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCourses.map((course, courseIndex) => (
                    <HydrationSafeMotion
                      key={course.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(courseIndex * 0.1, 0.4) }}
                      viewport={{ once: true }}
                  className="group"
                    >
                  <Link href={course.link || '#'} className="block h-full">
                    <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 h-full relative overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:border-orange-400 dark:hover:border-orange-500 hover:-translate-y-2">
                      {/* Status & Live Badge */}
                      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                        {course.isLive && (
                          <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-xs font-bold border-2 border-red-300 dark:border-red-600 flex items-center gap-1.5 animate-pulse">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            LIVE
                          </span>
                        )}
                        {course.status === 'upcoming' ? (
                          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-bold border-2 border-orange-300 dark:border-orange-600">
                            Upcoming
                          </span>
                        ) : course.isPaid ? (
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold border-2 border-blue-300 dark:border-blue-600">
                            Premium
                          </span>
                        ) : (
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-bold border-2 border-green-300 dark:border-green-600">
                            Free
                          </span>
                        )}
                      </div>

                      {/* Category Badge */}
                        <div className="mb-4">
                        <span className={`
                          inline-block px-3 py-1 rounded-lg text-xs font-bold
                          ${course.category === 'language' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-2 border-blue-300 dark:border-blue-700' : ''}
                          ${course.category === 'philosophy' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 border-2 border-purple-300 dark:border-purple-700' : ''}
                          ${course.category === 'practice' ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 border-2 border-orange-300 dark:border-orange-700' : ''}
                        `}>
                            {course.type}
                          </span>
                        </div>

                        {/* Course Title */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors min-h-[3.5rem]">
                          {course.title}
                      </h3>

                        {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {course.description}
                        </p>

                      {/* Course Meta */}
                      <div className="space-y-2 mb-5 py-4 border-y border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">Duration</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-100">{course.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400 font-medium">Level</span>
                          <span className={`
                            px-2 py-0.5 rounded text-xs font-bold
                            ${course.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : ''}
                            ${course.level === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : ''}
                            ${course.level === 'Advanced' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : ''}
                            ${course.level === 'Professional' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : ''}
                          `}>
                            {course.level}
                          </span>
                        </div>
                        </div>

                        {/* Features */}
                      <div className="mb-5">
                        <div className="flex flex-wrap gap-1.5">
                          {course.features.slice(0, 4).map((feature, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
                            >
                                {feature}
                              </span>
                            ))}
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                              {course.price}
                            </div>
                            {course.originalPrice && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                {course.originalPrice}
                              </div>
                            )}
                          </div>
                          {course.savings && (
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg text-xs font-bold">
                              Save {course.savings}
                        </div>
                          )}
                        </div>

                        <button className={`
                          w-full py-3 px-4 rounded-xl font-bold transition-all duration-300
                          flex items-center justify-center gap-2 group/btn
                          ${course.isPaid
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg'
                          }
                        `}>
                          {course.status === 'upcoming' ? 'Get Notified' : 'View Course'}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                        </div>
                      </Link>
                    </HydrationSafeMotion>
                  ))}
            </div>
          ) : (
            // Empty State
            <HydrationSafeMotion
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  No Courses Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  No courses match your current filters. Try adjusting your selection.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Clear All Filters
                </button>
                </div>
              </HydrationSafeMotion>
          )}
        </div>
      </section>


      {/* Blogs and Free Masterclasses Promotion */}
      <section className="section-padding bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-blue-500 dark:from-orange-400 dark:to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-shadow-sm">
                Explore More Learning Resources
              </h2>
              
              <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed text-readable font-medium">
                Discover our comprehensive collection of blogs and free masterclasses. Dive deeper into Sanskrit, 
                philosophy, and ancient wisdom with expert insights and practical guidance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Blogs Section */}
                <div className="bg-gradient-to-br from-orange-600 to-amber-600 dark:from-orange-700 dark:to-amber-700 rounded-xl p-6 border border-orange-500 dark:border-orange-600">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Wisdom Articles</h3>
                  </div>
                  <p className="text-white/90 mb-4 font-medium">
                    Explore in-depth articles on Sanskrit, philosophy, and ancient wisdom. Learn from expert insights and practical applications.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    href="/wisdom"
                    icon={<ArrowRight className="w-5 h-5" />}
                    className="w-full bg-white hover:bg-gray-100 text-orange-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Explore Wisdom Articles
                  </Button>
                </div>
                
                {/* Free Masterclasses Section */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-xl p-6 border border-indigo-500 dark:border-indigo-600">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Free Masterclasses</h3>
                  </div>
                  <p className="text-white/90 mb-4 font-medium">
                    Access free masterclasses and introductory courses. Perfect for beginners and those exploring new areas of study.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    href="/free-courses"
                    icon={<ArrowRight className="w-5 h-5" />}
                    className="w-full bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Check Free Masterclasses
                  </Button>
                </div>
                </div>
                
                <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  All resources are free to access and designed to enhance your learning journey
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Expert Content</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free Access</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Practical Wisdom</span>
                </div>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>

    </>
  )
}
