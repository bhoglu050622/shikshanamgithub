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
  X,
  Package,
  Star,
  Users,
  Clock,
  IndianRupee,
  TrendingUp,
  Award,
  Zap,
  Heart,
  Shield,
  Globe,
  Target,
  Lightbulb,
  BookMarked,
  Trophy,
  Diamond,
  ChevronDown
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import Link from 'next/link'

// Package type definitions
type PackageCategory = 'all' | 'sanskrit' | 'philosophy' | 'complete' | 'special'
type PackageLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'

interface Package {
  id: string
  title: string
  subtitle: string
  description: string
  originalPrice: string
  currentPrice: string
  savings: string
  duration: string
  level: PackageLevel
  features: string[]
  includes: string[]
  ctaText: string
  ctaLink: string
  category: PackageCategory
  isPopular: boolean
  isFeatured: boolean
  rating: number
  students: number
  status: 'available' | 'upcoming' | 'limited'
}

// All packages with proper categorization
const allPackages: Package[] = [
  // Sanskrit Packages
  {
    id: 'sanskrit-basics-to-conversation',
    title: 'Sanskrit Package: Learn Sanskrit from Basics to Conversation',
    subtitle: 'Complete Sanskrit Foundation Course',
    description: 'Master Sanskrit from absolute basics to conversational level. This comprehensive package includes grammar, vocabulary, pronunciation, and practical conversation skills.',
    originalPrice: '₹4,999',
    currentPrice: '₹2,898',
    savings: '₹2,101 (42% OFF)',
    duration: '12-15 weeks',
    level: 'Beginner',
    features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context', 'Audio Lessons', 'Writing Exercises'],
    includes: ['Video Lessons', 'Audio Files', 'PDF Materials', 'Live Q&A Sessions', 'Certificate of Completion', 'Lifetime Access'],
    ctaText: 'Enroll Now',
    ctaLink: 'https://shikshanam.in/package-of-%e0%a4%b8%e0%a4%82%e0%a4%b8%e0%a5%8d%e0%a4%95%e0%a5%83%e0%a4%a4/',
    category: 'sanskrit',
    isPopular: true,
    isFeatured: true,
    rating: 4.9,
    students: 1250,
    status: 'available'
  },
  {
    id: 'sanskrit-philosophies-bundle',
    title: 'Sanskrit Language + Hindu Philosophies Course Bundle',
    subtitle: 'Language and Wisdom Combined',
    description: 'Master Sanskrit language while exploring Hindu philosophical systems. Perfect combination for those seeking both linguistic and philosophical mastery.',
    originalPrice: '₹6,499',
    currentPrice: '₹3,999',
    savings: '₹2,500 (38% OFF)',
    duration: '12-15 weeks',
    level: 'Beginner',
    features: ['Sanskrit Grammar', 'Vocabulary Building', 'Philosophical Systems', 'Text Reading', 'Cultural Understanding'],
    includes: ['Language Lessons', 'Philosophy Study', 'Reading Materials', 'Practice Exercises', 'Cultural Context'],
    ctaText: 'Master Language & Philosophy',
    ctaLink: 'https://courses.shikshanam.in/courses/All-Course-Bundle-65a12c60e4b05ac7edb4876c',
    category: 'sanskrit',
    isPopular: false,
    isFeatured: false,
    rating: 4.7,
    students: 920,
    status: 'available'
  },
  {
    id: 'sanskrit-darshan-upanishad-special',
    title: 'Sanskrit + Darshan + Upanishad: Hindu New Year Special Course Bundle',
    subtitle: 'Complete Traditional Learning Package',
    description: 'Special New Year bundle combining Sanskrit language, philosophical systems (Darshanas), and Upanishadic wisdom for comprehensive traditional education.',
    originalPrice: '₹7,999',
    currentPrice: '₹4,999',
    savings: '₹3,000 (37% OFF)',
    duration: '15-18 weeks',
    level: 'All Levels',
    features: ['Sanskrit Language', 'Philosophical Systems', 'Upanishadic Wisdom', 'Cultural Context', 'Traditional Methods'],
    includes: ['Language Training', 'Philosophy Study', 'Text Analysis', 'Cultural Insights', 'Traditional Practices'],
    ctaText: 'Start Traditional Journey',
    ctaLink: 'https://courses.shikshanam.in/courses/Hindu-New-Year-Special-Package-All-Course-Bundle-66141e980049fe208aba2125',
    category: 'sanskrit',
    isPopular: true,
    isFeatured: true,
    rating: 4.9,
    students: 1400,
    status: 'available'
  },
  // Philosophy Packages
  {
    id: 'ultimate-sankhya-bundle',
    title: 'Ultimate Bundle of Sāṅkhya Philosophy',
    subtitle: 'Complete Sāṅkhya Darshan Mastery',
    description: 'Deep dive into the ancient wisdom of Sāṅkhya philosophy. Understand the fundamental principles of creation, consciousness, and the path to liberation.',
    originalPrice: '₹3,999',
    currentPrice: '₹2,499',
    savings: '₹1,500 (37% OFF)',
    duration: '8-10 weeks',
    level: 'Advanced',
    features: ['Philosophical Foundations', 'Text Study', 'Practical Applications', 'Meditation Techniques', 'Q&A Sessions'],
    includes: ['Video Lectures', 'Reading Materials', 'Practice Exercises', 'Community Access', 'Certificate'],
    ctaText: 'Start Learning',
    ctaLink: 'https://courses.shikshanam.in/courses/Ultimate-Bundle-of-Sankhya-Philosophy-687b56fc55ab5b6dc3bb51de',
    category: 'philosophy',
    isPopular: true,
    isFeatured: false,
    rating: 4.8,
    students: 890,
    status: 'available'
  },
  {
    id: 'vedanta-shaivism-bundle',
    title: 'Vedanta aur Shaivism: Adhyayan aur Anubhuti',
    subtitle: 'Dual Path of Spiritual Wisdom',
    description: 'Explore the profound teachings of both Vedanta and Shaivism. Understand the non-dual nature of reality through these complementary philosophical traditions.',
    originalPrice: '₹4,499',
    currentPrice: '₹2,999',
    savings: '₹1,500 (33% OFF)',
    duration: '10-12 weeks',
    level: 'Advanced',
    features: ['Vedantic Philosophy', 'Shaivite Teachings', 'Comparative Study', 'Spiritual Practices', 'Text Analysis'],
    includes: ['Comprehensive Lectures', 'Sacred Texts', 'Meditation Guides', 'Discussion Forums', 'Expert Guidance'],
    ctaText: 'Explore Bundle',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1',
    category: 'philosophy',
    isPopular: false,
    isFeatured: true,
    rating: 4.9,
    students: 650,
    status: 'available'
  },
  {
    id: 'samkhya-emotional-intelligence',
    title: 'Samkhya Darshan + Emotional Intelligence Combo Course',
    subtitle: 'Ancient Wisdom Meets Modern Psychology',
    description: 'Combine the timeless wisdom of Samkhya philosophy with modern emotional intelligence principles for personal transformation and self-mastery.',
    originalPrice: '₹3,499',
    currentPrice: '₹2,199',
    savings: '₹1,300 (37% OFF)',
    duration: '8-10 weeks',
    level: 'Intermediate',
    features: ['Samkhya Philosophy', 'Emotional Intelligence', 'Practical Applications', 'Self-Assessment Tools', 'Transformation Techniques'],
    includes: ['Video Lessons', 'Workbooks', 'Assessment Tools', 'Group Sessions', 'Personal Guidance'],
    ctaText: 'Transform Yourself',
    ctaLink: 'https://courses.shikshanam.in/courses/Samkhya-Darshan--Emotional-Intelligence-Combo-Course-6868be22998a012a18cc0360',
    category: 'philosophy',
    isPopular: false,
    isFeatured: false,
    rating: 4.7,
    students: 720,
    status: 'available'
  },
  {
    id: 'eradication-suffering-samkhya-yoga',
    title: 'Eradication of Suffering Package: Samkhya + Yoga',
    subtitle: 'Path to Liberation from Suffering',
    description: 'Learn the ancient techniques for understanding and transcending suffering through the combined wisdom of Samkhya philosophy and Yoga practices.',
    originalPrice: '₹4,999',
    currentPrice: '₹2,999',
    savings: '₹2,000 (40% OFF)',
    duration: '10-12 weeks',
    level: 'Advanced',
    features: ['Samkhya Philosophy', 'Yoga Practices', 'Suffering Analysis', 'Liberation Techniques', 'Practical Applications'],
    includes: ['Philosophical Study', 'Yoga Sessions', 'Meditation Practices', 'Personal Guidance', 'Transformation Tools'],
    ctaText: 'Begin Liberation Journey',
    ctaLink: 'https://courses.shikshanam.in/courses/Matters-meet-Mind--The-Metaphysics-of-Yoga-1686733423615-6489826fe4b046d958772a4a',
    category: 'philosophy',
    isPopular: false,
    isFeatured: true,
    rating: 4.8,
    students: 950,
    status: 'available'
  },
  {
    id: 'hindu-philosophies-upanishads',
    title: 'Hindu Philosophies + Upanishads: Wisdom Package',
    subtitle: 'Complete Philosophical Foundation',
    description: 'Comprehensive study of Hindu philosophical systems (Darshanas) combined with Upanishadic wisdom for a complete understanding of Indian philosophy.',
    originalPrice: '₹5,999',
    currentPrice: '₹3,999',
    savings: '₹2,000 (33% OFF)',
    duration: '12-15 weeks',
    level: 'Advanced',
    features: ['Six Darshanas', 'Upanishadic Wisdom', 'Comparative Study', 'Philosophical Analysis', 'Practical Applications'],
    includes: ['Comprehensive Lectures', 'Text Study', 'Discussion Forums', 'Expert Guidance', 'Certificate'],
    ctaText: 'Master Hindu Philosophy',
    ctaLink: 'https://courses.shikshanam.in/courses/Combo-Package-Hindu-Darshans--Upnishads-6620c94d738059528460072e',
    category: 'philosophy',
    isPopular: false,
    isFeatured: true,
    rating: 4.8,
    students: 850,
    status: 'available'
  },
  {
    id: 'nyaya-vaisheshik-enlightenment',
    title: 'Dual Path of Enlightenment Package: Nyaya + Vaisheshik',
    subtitle: 'Logic and Atomism for Spiritual Growth',
    description: 'Explore the logical foundations of Hindu philosophy through Nyaya (logic) and Vaisheshik (atomism) systems for enhanced reasoning and spiritual understanding.',
    originalPrice: '₹3,499',
    currentPrice: '₹2,299',
    savings: '₹1,200 (34% OFF)',
    duration: '8-10 weeks',
    level: 'Intermediate',
    features: ['Nyaya Logic', 'Vaisheshik Atomism', 'Logical Reasoning', 'Debate Techniques', 'Spiritual Applications'],
    includes: ['Logic Training', 'Philosophical Texts', 'Practice Exercises', 'Debate Sessions', 'Reasoning Tools'],
    ctaText: 'Develop Logical Wisdom',
    ctaLink: 'https://courses.shikshanam.in/courses/Eradication-of-Suffering-64bfab06e4b06ed046925620',
    category: 'philosophy',
    isPopular: false,
    isFeatured: false,
    rating: 4.6,
    students: 680,
    status: 'available'
  },
  {
    id: 'sanatan-chatushtay',
    title: 'सनातन चतुष्टय: Exploring Eternal Philosophies of Hinduism',
    subtitle: 'Four Pillars of Eternal Wisdom',
    description: 'Explore the four fundamental pillars of Sanatana Dharma through comprehensive study of Vedanta, Yoga, Samkhya, and other eternal philosophical traditions.',
    originalPrice: '₹4,999',
    currentPrice: '₹2,999',
    savings: '₹2,000 (40% OFF)',
    duration: '10-12 weeks',
    level: 'Advanced',
    features: ['Vedantic Philosophy', 'Yoga Systems', 'Samkhya Wisdom', 'Eternal Principles', 'Practical Applications'],
    includes: ['Comprehensive Study', 'Sacred Texts', 'Philosophical Analysis', 'Spiritual Practices', 'Traditional Wisdom'],
    ctaText: 'Explore Eternal Wisdom',
    ctaLink: 'https://courses.shikshanam.in/courses/--Exploring-Eternal-Philosophies-of-Hinduism-650a824be4b03b5745557827',
    category: 'philosophy',
    isPopular: true,
    isFeatured: false,
    rating: 4.8,
    students: 780,
    status: 'available'
  },
  // Complete Packages
  {
    id: 'para-apara-all-courses',
    title: 'Parā + Aparā (All Shikshanam Courses)',
    subtitle: 'Complete Learning Ecosystem',
    description: 'Access to all Shikshanam courses covering Sanskrit, philosophy, Upanishads, and practical wisdom. The ultimate learning package for serious students.',
    originalPrice: '₹19,999',
    currentPrice: '₹9,999',
    savings: '₹10,000 (50% OFF)',
    duration: 'Lifetime Access',
    level: 'All Levels',
    features: ['All Sanskrit Courses', 'All Philosophy Courses', 'All Upanishad Courses', 'Tools & Resources', 'Community Access'],
    includes: ['Unlimited Access', 'New Course Updates', 'Priority Support', 'Exclusive Content', 'Master Certificate'],
    ctaText: 'Get Complete Access',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/678e46e9ec4fa55804909de1?pid=p1',
    category: 'complete',
    isPopular: true,
    isFeatured: true,
    rating: 5.0,
    students: 2100,
    status: 'available'
  },
  {
    id: 'all-para-courses',
    title: 'All Parā Courses Combo Package',
    subtitle: 'Transcendent Knowledge Collection',
    description: 'Access all Parā (transcendent) level courses covering advanced philosophical concepts, deep spiritual practices, and profound wisdom teachings.',
    originalPrice: '₹12,999',
    currentPrice: '₹6,999',
    savings: '₹6,000 (46% OFF)',
    duration: 'Lifetime Access',
    level: 'Advanced',
    features: ['Advanced Philosophy', 'Spiritual Practices', 'Deep Text Study', 'Meditation Techniques', 'Wisdom Traditions'],
    includes: ['All Parā Courses', 'Exclusive Content', 'Advanced Materials', 'Expert Mentorship', 'Spiritual Community'],
    ctaText: 'Access Transcendent Wisdom',
    ctaLink: 'https://courses.shikshanam.in/single-checkout/678e3649f4f9ad20d3001578?pid=p1',
    category: 'complete',
    isPopular: true,
    isFeatured: false,
    rating: 4.9,
    students: 580,
    status: 'available'
  },
  // Special Packages
  {
    id: 'isha-prashna-upanishad-bundle',
    title: 'The Essence of Enlightenment: Isha and Prashna Upanishad Package',
    subtitle: 'Upanishadic Wisdom for Modern Seekers',
    description: 'Dive deep into two of the most profound Upanishads - Isha and Prashna. Discover the essence of enlightenment through ancient wisdom texts.',
    originalPrice: '₹2,999',
    currentPrice: '₹1,999',
    savings: '₹1,000 (33% OFF)',
    duration: '6-8 weeks',
    level: 'Intermediate',
    features: ['Isha Upanishad Study', 'Prashna Upanishad Study', 'Text Analysis', 'Philosophical Discussion', 'Practical Application'],
    includes: ['Detailed Lectures', 'Text Translations', 'Commentary', 'Discussion Sessions', 'Practice Exercises'],
    ctaText: 'Discover Upanishadic Wisdom',
    ctaLink: 'https://courses.shikshanam.in/courses/The-Essence-of-Enlightenment-Isha-and-Prashna-Upanishad-Package-66142b3d16c5b80f956291ea',
    category: 'special',
    isPopular: true,
    isFeatured: false,
    rating: 4.9,
    students: 1100,
    status: 'available'
  }
]

// Category tabs configuration
const categoryTabs = [
  {
    id: 'all' as PackageCategory,
    label: 'All Packages',
    icon: Package,
    color: 'from-slate-500 to-gray-500',
    description: 'Browse all available packages'
  },
  {
    id: 'sanskrit' as PackageCategory,
    label: 'Sanskrit Packages',
    icon: Languages,
    color: 'from-blue-500 to-cyan-500',
    description: 'Master the ancient language'
  },
  {
    id: 'philosophy' as PackageCategory,
    label: 'Philosophy Packages',
    icon: Brain,
    color: 'from-purple-500 to-violet-500',
    description: 'Deep philosophical wisdom'
  },
  {
    id: 'complete' as PackageCategory,
    label: 'Complete Bundles',
    icon: Crown,
    color: 'from-orange-500 to-amber-500',
    description: 'Comprehensive learning paths'
  },
  {
    id: 'special' as PackageCategory,
    label: 'Special Offers',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
    description: 'Limited time special packages'
  }
]

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState<PackageCategory>('all')
  const [priceFilter, setPriceFilter] = useState<'all' | 'under-3000' | 'under-5000' | 'over-5000'>('all')
  const [levelFilter, setLevelFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter packages based on active tab and filters
  const filteredPackages = allPackages.filter(pkg => {
    if (activeTab !== 'all' && pkg.category !== activeTab) return false
    if (priceFilter === 'under-3000' && parseInt(pkg.currentPrice.replace(/[₹,]/g, '')) >= 3000) return false
    if (priceFilter === 'under-5000' && parseInt(pkg.currentPrice.replace(/[₹,]/g, '')) >= 5000) return false
    if (priceFilter === 'over-5000' && parseInt(pkg.currentPrice.replace(/[₹,]/g, '')) < 5000) return false
    if (levelFilter !== 'all' && pkg.level !== levelFilter) return false
    return true
  })

  // Get package counts for each category
  const packageCounts = {
    all: allPackages.length,
    sanskrit: allPackages.filter(pkg => pkg.category === 'sanskrit').length,
    philosophy: allPackages.filter(pkg => pkg.category === 'philosophy').length,
    complete: allPackages.filter(pkg => pkg.category === 'complete').length,
    special: allPackages.filter(pkg => pkg.category === 'special').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
              <Sparkles className="w-4 h-4" />
              <span>Premium Learning Packages</span>
                </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
                  Learning Packages
              </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Comprehensive learning bundles combining multiple courses, resources, and exclusive content.
              <br className="hidden md:block" />
              Master Sanskrit, Philosophy, and Ancient Wisdom.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6" />
                <span className="text-lg font-semibold">{allPackages.length} Packages</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span className="text-lg font-semibold">10K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6" />
                <span className="text-lg font-semibold">4.8 Rating</span>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className="bg-white/20 dark:bg-slate-600/20 px-2 py-1 rounded-full text-xs">
                    {packageCounts[tab.id]}
                  </span>
                </button>
              ))}
                      </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Price Filter */}
                      <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'under-3000', label: 'Under ₹3,000' },
                      { value: 'under-5000', label: 'Under ₹5,000' },
                      { value: 'over-5000', label: 'Over ₹5,000' }
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setPriceFilter(filter.value as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          priceFilter === filter.value
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                      </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Level</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'All Levels' },
                      { value: 'Beginner', label: 'Beginner' },
                      { value: 'Intermediate', label: 'Intermediate' },
                      { value: 'Advanced', label: 'Advanced' },
                      { value: 'All Levels', label: 'All Levels' }
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setLevelFilter(filter.value as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          levelFilter === filter.value
                            ? 'bg-purple-600 text-white shadow-lg'
                            : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                        }`}
                      >
                        {filter.label}
                      </button>
                  ))}
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Featured Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our most popular and comprehensive packages designed for serious learners seeking mastery in Sanskrit and ancient wisdom.
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.filter(pkg => pkg.isFeatured).map((pkg, index) => (
              <HydrationSafeMotion
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/packages/${pkg.id}`} className="block h-full">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-slate-700 h-full">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                          FEATURED
                      </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pkg.category === 'sanskrit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          pkg.category === 'philosophy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          pkg.category === 'complete' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                        }`}>
                          {categoryTabs.find(c => c.id === pkg.category)?.label}
                      </span>
                    </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                      {pkg.title}
                    </h3>
                      <p className="text-orange-600 dark:text-orange-400 mb-3 font-medium">
                      {pkg.subtitle}
                    </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {pkg.description}
                    </p>

                      <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Level:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Students:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                            {pkg.originalPrice}
                          </div>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {pkg.currentPrice}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {pkg.savings}
                      </div>
                    </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                        {pkg.ctaText}
                      </button>
                    </div>
                  </div>
                </Link>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      {/* All Packages */}
      <section className="py-16 bg-white dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              All Packages
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <HydrationSafeMotion
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="group cursor-pointer"
              >
                <Link href={`/packages/${pkg.id}`} className="block h-full">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-slate-700 h-full">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                      {pkg.isPopular && (
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pkg.category === 'sanskrit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          pkg.category === 'philosophy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          pkg.category === 'complete' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                          'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                        }`}>
                          {categoryTabs.find(c => c.id === pkg.category)?.label}
                        </span>
                    </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                      {pkg.title}
                    </h3>
                      <p className="text-orange-600 dark:text-orange-400 mb-3 font-medium text-sm">
                      {pkg.subtitle}
                    </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                      {pkg.description}
                    </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.duration}</span>
                      </div>
                        <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">Level:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.level}</span>
                      </div>
                        <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">Students:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.students.toLocaleString()}</span>
                      </div>
                        <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-300">Rating:</span>
                        <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-800 dark:text-gray-100">{pkg.rating}</span>
                        </div>
                      </div>
                    </div>

                      <div className="mb-4">
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                            {pkg.originalPrice}
                          </div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {pkg.currentPrice}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                            {pkg.savings}
                      </div>
                    </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm">
                        {pkg.ctaText}
                      </button>
                    </div>
                  </div>
                </Link>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Choose from our premium packages and save up to 50% on comprehensive learning bundles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                      href="/packages"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Browse All Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/courses"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                View Individual Courses
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </div>
  )
}