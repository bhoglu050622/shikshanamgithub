'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Calendar,
  Video,
  Headphones,
  FileText,
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
  Package
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import Button, { CTAButton } from '@/components/ui/button'
import { ROUTES, generateRoutes } from '@/lib/routes'
import { trackEvent } from '@/lib/analytics'
import Link from 'next/link'

// Course categories based on Shikshanam's actual course offerings
const courseCategories = [
  {
    id: 'free-courses',
    title: '🆓 Free Courses',
    subtitle: 'Explore Our Teaching Style',
    description: 'Start your journey with these complimentary courses to experience our teaching methodology and content quality.',
    icon: Gift,
    color: 'from-green-500 to-emerald-500',
    hoverColor: 'from-green-600 to-emerald-600',
    courses: [
      {
        title: 'प्राचीन तंत्र दर्शन',
        subtitle: 'Decoding the principles of Tantra',
        type: 'Free Course',
        description: 'Introduction to ancient tantric philosophy and its practical applications in modern life',
        status: 'available',
        price: 'Free',
        duration: '2-3 hours',
        level: 'All Levels',
        features: ['Basic Tantric Concepts', 'Safe Introduction', 'Community Access', 'Path to Advanced Study'],
        link: '/courses/tantra-darshan'
      },
      {
        title: 'Tatvabodha: Masterclass 3 – Yoga Darshan',
        subtitle: 'Vibhuti and Kaivalya Pada',
        type: 'Free Masterclass',
        description: 'Deep dive into the advanced concepts of Yoga philosophy focusing on supernatural powers and liberation',
        status: 'available',
        price: 'Free',
        duration: '3-4 hours',
        level: 'Intermediate',
        features: ['Advanced Yoga Concepts', 'Liberation Theory', 'Practical Application', 'Live Q&A'],
        link: '/courses/yoga-advanced'
      },
      {
        title: 'Tatvabodha: Yoga Darshan Live Class',
        type: 'Free Live Session',
        description: 'Interactive live session covering fundamental concepts of Yoga philosophy',
        status: 'available',
        price: 'Free',
        duration: '2 hours',
        level: 'Beginner',
        features: ['Live Interaction', 'Yoga Philosophy Basics', 'Q&A Session', 'Community Access'],
        link: '/courses/yoga-darshan'
      },
      {
        title: 'Tatvabodha: Samkhya Darshan Live Class',
        type: 'Free Live Session',
        description: 'Introduction to Samkhya philosophy - understanding consciousness and matter',
        status: 'available',
        price: 'Free',
        duration: '2 hours',
        level: 'Beginner',
        features: ['Samkhya Basics', '24 Tattvas', 'Live Discussion', 'Study Materials'],
        link: '/courses/samkhya-darshan'
      }
    ]
  },
  {
    id: 'individual-premium',
    title: '💎 Individual Premium Courses',
    subtitle: 'Specialized Learning Paths',
    description: 'Deep dive into specific areas of knowledge with our carefully crafted premium courses.',
    icon: Crown,
    color: 'from-purple-500 to-indigo-500',
    hoverColor: 'from-purple-600 to-indigo-600',
    courses: [
      {
        title: 'Chanakya\'s Code: Dominate Negotiation & Business Tactics!',
        type: 'Premium Course',
        description: 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings',
        status: 'available',
        price: '₹3,999',
        duration: '8-10 weeks',
        level: 'Professional',
        features: ['Business Strategy', 'Negotiation Skills', 'Leadership Principles', 'Case Studies'],
        link: '/courses/chanakya-code'
      },
      {
        title: 'संस्कृत: प्रारंभ से संभाषण तक: Level-1: Package',
        type: 'Premium Course',
        description: 'Complete Sanskrit foundation course from basics to conversation level',
        status: 'available',
        price: '₹2,898',
        duration: '12-15 weeks',
        level: 'Beginner',
        features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context'],
        link: '/courses/sanskrit-beginner'
      },
      {
        title: 'संस्कृत संभाषण: Speak Sanskrit Without Grammar: Level-1',
        type: 'Premium Course',
        description: 'Learn to speak Sanskrit naturally without getting bogged down by complex grammar rules',
        status: 'available',
        price: '₹399',
        duration: '4-6 weeks',
        level: 'Beginner',
        features: ['Conversational Sanskrit', 'Practical Usage', 'Audio Lessons', 'Speaking Practice'],
        link: '/courses/sanskrit-conversation'
      },
      {
        title: 'Advaita Vedanta Darshan: दृग दृश्य विवेक द्वारा अद्वैत की व्याख्या',
        type: 'Premium Course',
        description: 'Deep exploration of non-dual philosophy through the lens of Drig Drishya Viveka',
        status: 'available',
        price: '₹1,999',
        duration: '8-10 weeks',
        level: 'Advanced',
        features: ['Non-Dual Philosophy', 'Text Study', 'Meditation Practices', 'Spiritual Insights'],
        link: '/courses/advaita-vedanta'
      },
      {
        title: 'कश्मीरी शैव दर्शन – अनंत सत्य की खोज',
        type: 'Premium Course',
        description: 'Journey into the profound depths of Kashmiri Shaivism and the search for infinite truth',
        status: 'available',
        price: '₹1,999',
        duration: '10-12 weeks',
        level: 'Advanced',
        features: ['Tantric Philosophy', 'Consciousness Studies', 'Spiritual Practices', 'Advanced Concepts'],
        link: '/courses/kashmir-shaivism'
      },
      {
        title: 'संस्कृत भाषा प्रज्ञा: Online Sanskrit Course in Hindi for Beginners',
        type: 'Premium Course',
        description: 'Comprehensive Sanskrit language course taught in Hindi for complete beginners',
        status: 'available',
        price: '₹2,499',
        duration: '12-15 weeks',
        level: 'Beginner',
        features: ['Hindi Instruction', 'Grammar Fundamentals', 'Reading Practice', 'Writing Exercises'],
        link: '/courses/sanskrit-course'
      },
      {
        title: 'प्रश्न उपनिषद्: Online Course on The Prashna Upanishad',
        type: 'Premium Course',
        description: 'Deep study of the Prashna Upanishad with question-answer format exploration',
        status: 'available',
        price: '₹1,499',
        duration: '6-8 weeks',
        level: 'Intermediate',
        features: ['Text Study', 'Question-Answer Format', 'Meditation Practices', 'Spiritual Insights'],
        link: '/courses/prashna-upanishad'
      },
      {
        title: 'ईशावास्य उपनिषद्: Online Course on The Isha Upanishad',
        type: 'Premium Course',
        description: 'Introduction to Upanishadic wisdom through the Isha Upanishad',
        status: 'available',
        price: '₹999',
        duration: '4-6 weeks',
        level: 'Beginner',
        features: ['Upanishadic Wisdom', 'Chanting Practice', 'Philosophical Discussion', 'Practical Application'],
        link: '/courses/isha-upanishad'
      },
      {
        title: 'न्याय दर्शन: The Art of Perception: Nyaya Darshan',
        type: 'Premium Course',
        description: 'Master the art of logical reasoning and systematic debate through Nyaya philosophy',
        status: 'available',
        price: '₹999',
        duration: '6-8 weeks',
        level: 'Intermediate',
        features: ['Logical Reasoning', 'Debate Techniques', 'Fallacy Recognition', 'Valid Inference'],
        link: '/courses/nyaya-darshan'
      }
    ]
  },
  {
    id: 'bundles-packages',
    title: '📦 Bundles & Special Packages',
    subtitle: 'Complete Learning Journeys',
    description: 'Comprehensive packages that combine multiple courses for a complete learning experience at special prices.',
    icon: Package,
    color: 'from-orange-500 to-red-500',
    hoverColor: 'from-orange-600 to-red-600',
    courses: [
      {
        title: 'Sanskrit + Darshan + Upanishad (7-course bundle)',
        type: 'Premium Bundle',
        description: 'Complete package combining Sanskrit language, philosophical systems, and Upanishadic wisdom',
        status: 'available',
        price: '₹7,399',
        originalPrice: '₹12,000+',
        duration: '30-35 weeks',
        level: 'Complete Path',
        features: ['7 Complete Courses', 'Sanskrit Language', 'Darshan Philosophy', 'Upanishadic Study', 'Certificate'],
        link: '/courses/sanskrit-darshan-upanishad-bundle'
      },
      {
        title: 'Combo Package: Sanskrit Language + Hindu Philosophies (5 courses)',
        type: 'Premium Bundle',
        description: 'Perfect blend of Sanskrit language learning with core Hindu philosophical systems',
        status: 'available',
        price: '₹5,899',
        originalPrice: '₹9,500+',
        duration: '25-30 weeks',
        level: 'Complete Path',
        features: ['5 Complete Courses', 'Sanskrit Mastery', 'Philosophy Systems', 'Cultural Context', 'Certificate'],
        link: '/courses/sanskrit-philosophy-bundle'
      },
      {
        title: 'Combo Package: Hindu Philosophies + Upanishads (6 courses)',
        type: 'Premium Bundle',
        description: 'Deep philosophical exploration combining classical darshanas with Upanishadic wisdom',
        status: 'available',
        price: '₹5,665',
        originalPrice: '₹9,000+',
        duration: '28-32 weeks',
        level: 'Complete Path',
        features: ['6 Complete Courses', 'Philosophical Systems', 'Upanishadic Study', 'Advanced Concepts', 'Certificate'],
        link: '/courses/philosophy-upanishad-bundle'
      },
      {
        title: 'The Essence of Enlightenment: Isha and Prashna Upanishad Package (2 courses)',
        type: 'Premium Bundle',
        description: 'Focused study of two essential Upanishads for spiritual seekers',
        status: 'available',
        price: '₹2,248',
        originalPrice: '₹2,498',
        duration: '10-12 weeks',
        level: 'Intermediate',
        features: ['2 Upanishad Courses', 'Spiritual Wisdom', 'Chanting Practice', 'Meditation Techniques'],
        link: '/courses/upanishad-bundle'
      },
      {
        title: 'Dual Path of Enlightenment Package: Nyaya + Vaisheshik (2 courses)',
        type: 'Premium Bundle',
        description: 'Explore the logical and analytical schools of Indian philosophy',
        status: 'available',
        price: '₹1,799',
        originalPrice: '₹1,998',
        duration: '12-14 weeks',
        level: 'Intermediate',
        features: ['2 Darshan Courses', 'Logical Reasoning', 'Analytical Thinking', 'Debate Techniques'],
        link: '/courses/nyaya-vaisheshik-bundle'
      }
    ]
  },
  {
    id: 'ultimate-bundles',
    title: '🌟 Ultimate Learning Bundles',
    subtitle: 'Complete Mastery Paths',
    description: 'The most comprehensive learning experiences with massive savings and exclusive access.',
    icon: Star,
    color: 'from-indigo-500 to-purple-500',
    hoverColor: 'from-indigo-600 to-purple-600',
    courses: [
      {
        title: 'Parā + Aparā Courses Bundle',
        subtitle: 'Complete Journey with Chanakya\'s Code',
        type: 'Ultimate Bundle',
        description: 'The most comprehensive package including all Parā courses plus Chanakya\'s Code with 1-year access',
        status: 'available',
        price: '₹15,999',
        originalPrice: '₹27,999',
        savings: '₹12,000',
        duration: 'Lifetime Access',
        level: 'Complete Mastery',
        features: [
          'All Parā Courses',
          'Chanakya\'s Code (1-year)',
          'Sanskrit Mastery',
          'All Darshanas',
          'Upanishadic Study',
          'Kashmiri Shaivism',
          'Advaita Vedanta',
          'Priority Support',
          'Master Certificate'
        ],
        link: '/courses/para-apara-bundle'
      },
      {
        title: 'All Parā Courses Bundle',
        subtitle: 'Complete Traditional Wisdom',
        type: 'Ultimate Bundle',
        description: 'Everything in traditional wisdom except Chanakya\'s Code - pure spiritual and philosophical learning',
        status: 'available',
        price: '₹12,999',
        originalPrice: '₹21,999',
        savings: '₹9,000',
        duration: 'Lifetime Access',
        level: 'Complete Mastery',
        features: [
          'All Parā Courses',
          'Sanskrit Language',
          'All 6 Darshanas',
          'Upanishadic Study',
          'Kashmiri Shaivism',
          'Advaita Vedanta',
          'Community Access',
          'Master Certificate'
        ],
        link: '/courses/para-bundle'
      }
    ]
  }
]

// Stats for the page
const stats = [
  { number: '20+', label: 'Courses Available', icon: BookOpen },
  { number: '1,000+', label: 'Active Students', icon: Users },
  { number: '98%', label: 'Satisfaction Rate', icon: Star },
  { number: 'Lifetime', label: 'Access Support', icon: Clock }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [showFilters, setShowFilters] = useState(false)

  // Filter courses based on search and filters
  const filteredCategories = courseCategories.map(category => ({
    ...category,
    courses: category.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = filterType === 'all' || 
                         (filterType === 'free' && course.type.toLowerCase().includes('free')) ||
                         (filterType === 'live' && course.type.toLowerCase().includes('live')) ||
                         (filterType === 'self-paced' && course.type.toLowerCase().includes('self-paced'))
      
      return matchesSearch && matchesType
    })
  })).filter(category => category.courses.length > 0)

  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-saffron-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <BookOpen className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-hero text-high-contrast mb-8">
                Shikshanam{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  Course Collection
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-subheading text-medium-contrast mb-8 max-w-4xl mx-auto">
                Explore our comprehensive collection of courses in Sanskrit, Indian philosophy, Upanishads, and practical wisdom. 
                From free introductory courses to complete mastery bundles, find your perfect learning path.
              </p>
            </StaggerItem>

            {/* Stats */}
            <StaggerItem>
              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={`stat-${stat.label}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 text-medium-contrast"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-high-contrast">{stat.number}</div>
                        <div className="text-sm text-wisdom-500">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-premium p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-wisdom-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        if (e.target.value.length > 2) {
                          trackEvent('search_query', { 
                            query: e.target.value,
                            page: 'courses'
                          })
                        }
                      }}
                      className="w-full pl-12 pr-4 py-3 border border-wisdom-200 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Filter Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-6 py-3 bg-saffron-100 text-saffron-700 rounded-xl hover:bg-saffron-200 transition-colors"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </motion.button>
              </div>

              {/* Filter Options */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-wisdom-200"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Type Filter */}
                      <div>
                        <label className="block text-sm font-medium text-wisdom-700 mb-3">Course Type</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'all', label: 'All Types', icon: Globe },
                            { value: 'free', label: 'Free', icon: Gift },
                            { value: 'live', label: 'Live', icon: Video },
                            { value: 'self-paced', label: 'Self-Paced', icon: Clock }
                          ].map((type) => (
                            <button
                              key={type.value}
                              onClick={() => setFilterType(type.value)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                filterType === type.value
                                  ? 'bg-saffron-500 text-white shadow-lg'
                                  : 'bg-wisdom-100 text-wisdom-700 hover:bg-wisdom-200'
                              }`}
                            >
                              <type.icon className="w-4 h-4" />
                              <span>{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sort Filter */}
                      <div>
                        <label className="block text-sm font-medium text-wisdom-700 mb-3">Sort By</label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { value: 'popular', label: 'Most Popular', icon: TrendingUp },
                            { value: 'newest', label: 'Newest', icon: Sparkles },
                            { value: 'price-low', label: 'Price: Low to High', icon: ArrowRight },
                            { value: 'price-high', label: 'Price: High to Low', icon: ArrowRight }
                          ].map((sort) => (
                            <button
                              key={sort.value}
                              onClick={() => setSortBy(sort.value)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                sortBy === sort.value
                                  ? 'bg-saffron-500 text-white shadow-lg'
                                  : 'bg-wisdom-100 text-wisdom-700 hover:bg-wisdom-200'
                              }`}
                            >
                              <sort.icon className="w-4 h-4" />
                              <span>{sort.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-body text-wisdom-600 max-w-3xl mx-auto">
              Each category offers a unique approach to learning. Find the path that resonates with your goals and interests.
            </p>
          </motion.div>

          <div className="space-y-16">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-display text-indigo-700 mb-4">
                    {category.title}
                  </h3>
                  
                  <p className="text-lg text-saffron-600 mb-2">
                    {category.subtitle}
                  </p>
                  
                  <p className="text-wisdom-600 max-w-3xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.courses.map((course, courseIndex) => (
                    <motion.div
                      key={course.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: courseIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <Link href={course.link || '#'} className="block">
                        <div className="card-premium p-6 h-full relative overflow-hidden">
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          {course.status === 'upcoming' && (
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                              Upcoming
                            </span>
                          )}
                          {course.status === 'available' && course.type.toLowerCase().includes('free') && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                              Free
                            </span>
                          )}
                          {course.status === 'available' && !course.type.toLowerCase().includes('free') && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              Available
                            </span>
                          )}
                        </div>

                        {/* Course Type */}
                        <div className="mb-4">
                          <span className="bg-saffron-100 text-saffron-700 px-3 py-1 rounded-full text-xs font-medium">
                            {course.type}
                          </span>
                        </div>

                        {/* Course Title */}
                        <h4 className="text-xl font-display text-indigo-700 mb-2 group-hover:text-saffron-600 transition-colors">
                          {course.title}
                        </h4>
                        
                        {'subtitle' in course && course.subtitle && (
                          <p className="text-sm text-saffron-600 mb-3">
                            {course.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-wisdom-600 mb-4 text-sm leading-relaxed">
                          {course.description}
                        </p>

                        {/* Course Details */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-wisdom-500">Duration:</span>
                            <span className="font-medium text-wisdom-700">{course.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-wisdom-500">Level:</span>
                            <span className="font-medium text-wisdom-700">{course.level}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-wisdom-500">Price:</span>
                            <div className="text-right">
                              {'originalPrice' in course && course.originalPrice && (
                                <div className="text-xs text-wisdom-400 line-through">
                                  {course.originalPrice}
                                </div>
                              )}
                              <span className="font-bold text-indigo-700">{course.price}</span>
                              {'savings' in course && course.savings && (
                                <div className="text-xs text-green-600 font-medium">
                                  Save {course.savings}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-indigo-700 mb-2">What's Included:</h5>
                          <div className="flex flex-wrap gap-2">
                            {course.features.slice(0, 3).map((feature, featureIndex) => (
                              <span key={featureIndex} className="bg-wisdom-100 text-wisdom-700 px-2 py-1 rounded-full text-xs">
                                {feature}
                              </span>
                            ))}
                            {course.features.length > 3 && (
                              <span className="bg-wisdom-100 text-wisdom-700 px-2 py-1 rounded-full text-xs">
                                +{course.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="w-full">
                          {course.type.toLowerCase().includes('free') ? (
                            <CTAButton.ViewCourse
                              courseId={course.link?.split('/').pop() || ''}
                              fullWidth
                              size="md"
                            />
                          ) : course.status === 'upcoming' ? (
                            <Button
                              variant="outline"
                              fullWidth
                              size="md"
                              onClick={() => trackEvent('get_notified_click', { 
                                course_name: course.title,
                                course_type: course.type
                              })}
                            >
                              Get Notified
                            </Button>
                          ) : (
                            <CTAButton.Enroll
                              courseId={course.link?.split('/').pop() || ''}
                              fullWidth
                              size="md"
                            />
                          )}
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Platform Notice */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="card-premium p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-display text-indigo-700 mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              
              <p className="text-wisdom-600 mb-8 leading-relaxed">
                All courses listed above are available for enrollment. Each course is carefully crafted with 
                expert instruction, comprehensive content, and practical applications. Choose from our free 
                courses to get started, or dive deep with our premium offerings and bundles.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-700 mb-2">Expert Instruction</h3>
                  <p className="text-sm text-wisdom-600">Learn from qualified teachers and scholars</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-700 mb-2">Community Support</h3>
                  <p className="text-sm text-wisdom-600">Join a community of dedicated learners</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-700 mb-2">Practical Application</h3>
                  <p className="text-sm text-wisdom-600">Apply ancient wisdom to modern life</p>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                href={ROUTES.COURSES}
                icon={<ArrowRight className="w-6 h-6" />}
                analytics={{
                  event: 'browse_all_courses_click',
                  properties: { from: 'courses_page_bottom' }
                }}
              >
                Browse All Courses
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
