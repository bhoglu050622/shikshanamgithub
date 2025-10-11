'use client'

import { useState, useMemo } from 'react'
import { 
  BookOpen,
  Sparkles,
  Video,
  FileText,
  ArrowRight,
  GraduationCap,
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  Tag,
  Globe,
  ChevronDown,
  X
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Link from 'next/link'
import Image from 'next/image'

// Article data structure
interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: 'philosophy' | 'sanskrit' | 'spirituality' | 'culture' | 'wellness'
  language: 'english' | 'hindi'
  tags: string[]
  featuredImage: string
  views: string
  featured?: boolean
}

// Sample articles from shikshanam.in blog
const allArticles: Article[] = [
  {
    id: '1',
    title: 'सांख्य दर्शन क्या है?',
    slug: 'samkhya-darshan-kya-hai',
    excerpt: 'सांख्य दर्शन हिंदू दर्शन के छह आस्तिक दर्शनों में से एक है। यह दर्शन पुरुष और प्रकृति के द्वैतवादी ढांचे पर आधारित है।',
    author: 'Vishal Chaurasia',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'philosophy',
    language: 'hindi',
    tags: ['Samkhya', 'Philosophy', 'Darshan', 'Purusha', 'Prakriti'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '2.5K',
    featured: true
  },
  {
    id: '2',
    title: 'What is Sankhya Philosophy?',
    slug: 'what-is-sankhya-philosophy',
    excerpt: 'Sankhya philosophy is one of the six orthodox schools of Hindu philosophy, focusing on the dualistic framework of Purusha (consciousness) and Prakriti (matter).',
    author: 'Vishal Chaurasia',
    date: '2024-03-20',
    readTime: '10 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Samkhya', 'Philosophy', 'Consciousness', 'Matter', 'Dualism'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '3.2K',
    featured: true
  },
  {
    id: '3',
    title: 'The Mysteries of the Four Yugas: Understanding Their Secrets (Part 1)',
    slug: 'four-yugas-secrets-part-1',
    excerpt: 'Explore the cyclical nature of time in Hindu philosophy, examining the durations and characteristics of the four Yugas that govern cosmic cycles.',
    author: 'Vishal Chaurasia',
    date: '2024-04-10',
    readTime: '12 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Yugas', 'Time', 'Cosmology', 'Hindu Philosophy', 'Cycles'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '4.1K',
    featured: true
  },
  {
    id: '4',
    title: 'The Mysteries of the Four Yugas: Is Kali Yuga Over? (Part 2)',
    slug: 'four-yugas-kali-yuga-over-part-2',
    excerpt: 'Delve deeper into the concept of Kali Yuga, examining different perspectives on its duration and whether we are still in the age of darkness.',
    author: 'Vishal Chaurasia',
    date: '2024-04-25',
    readTime: '15 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Kali Yuga', 'Yugas', 'Time', 'Darkness', 'Spirituality'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '5.8K'
  },
  {
    id: '5',
    title: 'Truth Behind the Brahma-Saraswati Controversy: Debunking Myths with Wisdom',
    slug: 'brahma-saraswati-controversy',
    excerpt: 'Address misconceptions surrounding the relationship between Lord Brahma and Goddess Saraswati, providing context and interpretations from ancient scriptures.',
    author: 'Vishal Chaurasia',
    date: '2024-05-05',
    readTime: '9 min read',
    category: 'spirituality',
    language: 'english',
    tags: ['Brahma', 'Saraswati', 'Mythology', 'Scriptures', 'Wisdom'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '2.9K'
  },
  {
    id: '6',
    title: 'सनातन धर्म में सोलह संस्कार',
    slug: 'solah-sanskars-sanatan-dharma',
    excerpt: 'सनातन धर्म में सोलह संस्कारों का महत्व और उनका मानव जीवन में क्या योगदान है, इसके बारे में विस्तार से जानें।',
    author: 'Vishal Chaurasia',
    date: '2024-05-20',
    readTime: '11 min read',
    category: 'culture',
    language: 'hindi',
    tags: ['Sanskars', 'Sanatan Dharma', 'Rituals', 'Life Stages', 'Traditions'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '3.7K'
  },
  {
    id: '7',
    title: 'Understanding the Upanishads: Gateway to Spiritual Knowledge',
    slug: 'understanding-upanishads',
    excerpt: 'The Upanishads are the philosophical foundation of Hinduism, containing profound insights into the nature of reality, consciousness, and the ultimate truth.',
    author: 'Vishal Chaurasia',
    date: '2024-06-01',
    readTime: '14 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Upanishads', 'Vedanta', 'Spirituality', 'Philosophy', 'Knowledge'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '4.3K'
  },
  {
    id: '8',
    title: 'संस्कृत भाषा का महत्व और आधुनिक युग में उसकी प्रासंगिकता',
    slug: 'sanskrit-bhasha-mahatva',
    excerpt: 'संस्कृत भाषा न केवल भारत की प्राचीन भाषा है बल्कि विज्ञान, दर्शन और आध्यात्मिक ज्ञान का भंडार है।',
    author: 'Vishal Chaurasia',
    date: '2024-06-15',
    readTime: '7 min read',
    category: 'sanskrit',
    language: 'hindi',
    tags: ['Sanskrit', 'Language', 'Ancient', 'Science', 'Philosophy'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '2.8K'
  },
  {
    id: '9',
    title: 'Yoga Philosophy: Beyond Physical Postures',
    slug: 'yoga-philosophy-beyond-postures',
    excerpt: 'Yoga is much more than physical exercise. Discover the eight limbs of yoga and how they can transform your life through spiritual practice.',
    author: 'Vishal Chaurasia',
    date: '2024-06-30',
    readTime: '13 min read',
    category: 'wellness',
    language: 'english',
    tags: ['Yoga', 'Philosophy', 'Eight Limbs', 'Spirituality', 'Practice'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '3.5K'
  },
  {
    id: '10',
    title: 'The Concept of Dharma in Hindu Philosophy',
    slug: 'concept-dharma-hindu-philosophy',
    excerpt: 'Dharma is not just duty or righteousness, but the cosmic order that maintains harmony in the universe. Explore its deeper meanings and applications.',
    author: 'Vishal Chaurasia',
    date: '2024-07-10',
    readTime: '16 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Dharma', 'Righteousness', 'Cosmic Order', 'Philosophy', 'Ethics'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '4.7K'
  },
  {
    id: '11',
    title: 'कर्म सिद्धांत: जीवन में कर्म का महत्व',
    slug: 'karma-siddhant-jivan-mahatva',
    excerpt: 'कर्म सिद्धांत हिंदू दर्शन का मूल आधार है। जानें कि कर्म कैसे हमारे वर्तमान और भविष्य को प्रभावित करता है।',
    author: 'Vishal Chaurasia',
    date: '2024-07-25',
    readTime: '9 min read',
    category: 'philosophy',
    language: 'hindi',
    tags: ['Karma', 'Action', 'Philosophy', 'Life', 'Consequences'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '3.1K'
  },
  {
    id: '12',
    title: 'Meditation Techniques from Ancient Indian Traditions',
    slug: 'meditation-techniques-ancient-indian',
    excerpt: 'Discover various meditation techniques rooted in ancient Indian traditions, from Vipassana to Transcendental Meditation and their benefits.',
    author: 'Vishal Chaurasia',
    date: '2024-08-05',
    readTime: '11 min read',
    category: 'wellness',
    language: 'english',
    tags: ['Meditation', 'Vipassana', 'TM', 'Spirituality', 'Wellness'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '2.6K'
  },
  {
    id: '13',
    title: 'वेदों में छुपा वैज्ञानिक ज्ञान',
    slug: 'vedon-mein-chupa-vaigyanik-gyan',
    excerpt: 'वेदों में न केवल आध्यात्मिक ज्ञान है बल्कि वैज्ञानिक सिद्धांत भी छुपे हुए हैं। आधुनिक विज्ञान के साथ उनकी तुलना करें।',
    author: 'Vishal Chaurasia',
    date: '2024-08-20',
    readTime: '18 min read',
    category: 'sanskrit',
    language: 'hindi',
    tags: ['Vedas', 'Science', 'Ancient Knowledge', 'Modern Science', 'Wisdom'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '5.2K'
  },
  {
    id: '14',
    title: 'The Bhagavad Gita: Timeless Wisdom for Modern Life',
    slug: 'bhagavad-gita-timeless-wisdom',
    excerpt: 'The Bhagavad Gita offers profound insights into duty, righteousness, and the path to liberation. Learn how its teachings apply to modern challenges.',
    author: 'Vishal Chaurasia',
    date: '2024-09-01',
    readTime: '20 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Bhagavad Gita', 'Krishna', 'Arjuna', 'Duty', 'Liberation'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '6.8K'
  },
  {
    id: '15',
    title: 'हिंदू त्योहारों का दार्शनिक महत्व',
    slug: 'hindu-tyoharon-ka-darshnik-mahatva',
    excerpt: 'हिंदू त्योहार केवल उत्सव नहीं हैं बल्कि गहरे दार्शनिक अर्थ रखते हैं। जानें कि कैसे ये त्योहार हमारे जीवन को प्रभावित करते हैं।',
    author: 'Vishal Chaurasia',
    date: '2024-09-15',
    readTime: '8 min read',
    category: 'culture',
    language: 'hindi',
    tags: ['Festivals', 'Philosophy', 'Traditions', 'Culture', 'Celebrations'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '2.4K'
  },
  {
    id: '16',
    title: 'Nyaya Darshan: The Science of Logic in Indian Philosophy',
    slug: 'nyaya-darshan-science-logic',
    excerpt: 'Explore Nyaya Darshan, one of the six orthodox schools of Hindu philosophy, which focuses on logic, epistemology, and the nature of knowledge.',
    author: 'Vishal Chaurasia',
    date: '2024-09-30',
    readTime: '12 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Nyaya', 'Logic', 'Epistemology', 'Philosophy', 'Knowledge'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '3.9K'
  },
  {
    id: '17',
    title: 'वैशेषिक दर्शन: परमाणु सिद्धांत का प्राचीन ज्ञान',
    slug: 'vaisheshik-darshan-paramanu-siddhant',
    excerpt: 'वैशेषिक दर्शन में परमाणु सिद्धांत का विस्तृत वर्णन मिलता है। जानें कि कैसे प्राचीन भारतीय दार्शनिकों ने आधुनिक विज्ञान से पहले ही परमाणु की खोज की थी।',
    author: 'Vishal Chaurasia',
    date: '2024-10-10',
    readTime: '14 min read',
    category: 'philosophy',
    language: 'hindi',
    tags: ['Vaisheshika', 'Atom', 'Philosophy', 'Science', 'Ancient Knowledge'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '4.1K'
  },
  {
    id: '18',
    title: 'Mimamsa Darshan: The Philosophy of Ritual and Action',
    slug: 'mimamsa-darshan-philosophy-ritual',
    excerpt: 'Discover Mimamsa Darshan, the school of philosophy that focuses on the interpretation of Vedic texts and the importance of ritual actions in Hindu tradition.',
    author: 'Vishal Chaurasia',
    date: '2024-10-25',
    readTime: '11 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Mimamsa', 'Ritual', 'Vedic', 'Philosophy', 'Action'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '2.7K'
  },
  {
    id: '19',
    title: 'आयुर्वेद: प्राचीन भारतीय चिकित्सा पद्धति',
    slug: 'ayurveda-praachin-bharatiya-chikitsa',
    excerpt: 'आयुर्वेद न केवल एक चिकित्सा पद्धति है बल्कि जीवन जीने का एक संपूर्ण दर्शन है। जानें इसके मूल सिद्धांत और आधुनिक युग में इसकी प्रासंगिकता।',
    author: 'Vishal Chaurasia',
    date: '2024-11-05',
    readTime: '16 min read',
    category: 'wellness',
    language: 'hindi',
    tags: ['Ayurveda', 'Medicine', 'Health', 'Ancient', 'Wellness'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '5.3K'
  },
  {
    id: '20',
    title: 'Vedanta Philosophy: The Path to Self-Realization',
    slug: 'vedanta-philosophy-path-self-realization',
    excerpt: 'Explore Vedanta, the culmination of Vedic wisdom, which teaches the unity of the individual soul with the universal consciousness and the path to liberation.',
    author: 'Vishal Chaurasia',
    date: '2024-11-20',
    readTime: '17 min read',
    category: 'philosophy',
    language: 'english',
    tags: ['Vedanta', 'Self-Realization', 'Liberation', 'Philosophy', 'Consciousness'],
    featuredImage: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    views: '4.8K'
  }
]

const categories = [
  { id: 'all', label: 'All Articles', count: allArticles.length },
  { id: 'philosophy', label: 'Philosophy', count: allArticles.filter(a => a.category === 'philosophy').length },
  { id: 'sanskrit', label: 'Sanskrit', count: allArticles.filter(a => a.category === 'sanskrit').length },
  { id: 'spirituality', label: 'Spirituality', count: allArticles.filter(a => a.category === 'spirituality').length },
  { id: 'culture', label: 'Culture', count: allArticles.filter(a => a.category === 'culture').length },
  { id: 'wellness', label: 'Wellness', count: allArticles.filter(a => a.category === 'wellness').length }
]

const languages = [
  { id: 'all', label: 'All Languages' },
  { id: 'english', label: 'English' },
  { id: 'hindi', label: 'हिंदी' }
]

export default function WisdomPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLanguage, setActiveLanguage] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      const matchesCategory = activeCategory === 'all' || article.category === activeCategory
      const matchesLanguage = activeLanguage === 'all' || article.language === activeLanguage
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesLanguage && matchesSearch
    })
  }, [activeCategory, activeLanguage, searchQuery])

  const featuredArticles = allArticles.filter(article => article.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2"></div>

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
              <span>Ancient Wisdom • Modern Insights</span>
      </div>
      
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Wisdom Articles
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Explore profound insights into Sanskrit, Philosophy, and Ancient Indian Knowledge.
              <br className="hidden md:block" />
              Discover timeless wisdom for modern life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6" />
                <span className="text-lg font-semibold">{allArticles.length} Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-lg font-semibold">{categories.length - 1} Categories</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                <span className="text-lg font-semibold">Expert Authors</span>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
      </div>
      
            {/* Filters */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 space-y-4">
              {/* Category Tabs */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
        ))}
      </div>
    </div>

              {/* Language Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Language</h3>
                <div className="flex gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => setActiveLanguage(language.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeLanguage === language.id
                          ? 'bg-orange-600 text-white shadow-lg'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <HydrationSafeMotion
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Featured Articles
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our most popular and insightful articles on ancient wisdom and modern applications.
              </p>
            </HydrationSafeMotion>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <HydrationSafeMotion
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${article.slug}`} className="block h-full">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-slate-700 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/9333ea/white?text=Article+Image'
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            FEATURED
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.language === 'hindi' 
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {article.language === 'hindi' ? 'हिंदी' : 'English'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            article.category === 'philosophy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            article.category === 'sanskrit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            article.category === 'spirituality' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                            article.category === 'culture' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {categories.find(c => c.id === article.category)?.label}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </HydrationSafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              All Articles
          </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
            </p>
        </div>
        
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                  setActiveLanguage('all')
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <HydrationSafeMotion
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${article.slug}`} className="block h-full">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-slate-700 h-full">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/9333ea/white?text=Article+Image'
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            article.language === 'hindi' 
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {article.language === 'hindi' ? 'हिंदी' : 'English'}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            article.category === 'philosophy' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                            article.category === 'sanskrit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            article.category === 'spirituality' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                            article.category === 'culture' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {categories.find(c => c.id === article.category)?.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{article.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </HydrationSafeMotion>
              ))}
          </div>
        )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Ancient Wisdom
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get the latest articles on Sanskrit, Philosophy, and Spiritual practices delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </div>
  )
}