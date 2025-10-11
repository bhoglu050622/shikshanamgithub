'use client'

import Image from 'next/image';
import { useState } from 'react'
import { 
  Video,
  Play,
  BookOpen,
  Brain,
  Languages,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Link from 'next/link'

// Masterclass type definitions
type MasterclassCategory = 'all' | 'philosophy' | 'sanskrit' | 'wellness' | 'spirituality'

interface Masterclass {
  id: string
  title: string
  instructor: string
  description: string
  duration: string
  views: string
  thumbnail: string
  videoUrl: string
  category: MasterclassCategory
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  featured?: boolean
  isNew?: boolean
}

// Free Masterclasses Data
const masterclasses: Masterclass[] = [
  {
    id: '1',
    title: 'Introduction to Nyaya Darshan: The Art of Logical Reasoning',
    instructor: 'Vishal Chaurasia',
    description: 'Discover the fundamentals of Nyaya philosophy and learn how ancient Indian logic can transform your thinking',
    duration: '45 min',
    views: '50K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    videoUrl: 'https://www.youtube.com/embed/zZRzMdHWp-w?autoplay=1&modestbranding=1&rel=0',
    category: 'philosophy',
    level: 'Beginner',
    tags: ['Logic', 'Reasoning', 'Philosophy'],
    featured: true
  },
  {
    id: '2',
    title: 'Sanskrit for Beginners: Your First Steps',
    instructor: 'Vishal Chaurasia',
    description: 'Learn the basics of Sanskrit language, alphabet, and pronunciation in this comprehensive introduction',
    duration: '35 min',
    views: '75K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
    videoUrl: 'https://www.youtube.com/embed/iyTo_C_db5w?autoplay=1&modestbranding=1&rel=0',
    category: 'sanskrit',
    level: 'Beginner',
    tags: ['Sanskrit', 'Language', 'Basics'],
    featured: true
  },
  {
    id: '3',
    title: 'Understanding Samkhya: The Philosophy of Consciousness',
    instructor: 'Vishal Chaurasia',
    description: 'Explore the dualistic framework of Samkhya philosophy and its relevance to emotional intelligence',
    duration: '50 min',
    views: '40K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1.png',
    videoUrl: 'https://www.youtube.com/embed/An-t_C6-j7A?autoplay=1&modestbranding=1&rel=0',
    category: 'philosophy',
    level: 'Intermediate',
    tags: ['Samkhya', 'Consciousness', 'Mind'],
    featured: true
  },
  {
    id: '4',
    title: 'Yoga Philosophy 101: Beyond the Asanas',
    instructor: 'Vishal Chaurasia',
    description: 'Understand the philosophical foundations of Yoga beyond physical postures',
    duration: '40 min',
    views: '60K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
    videoUrl: 'https://www.youtube.com/embed/An-t_C6-j7A?autoplay=1&modestbranding=1&rel=0',
    category: 'wellness',
    level: 'Beginner',
    tags: ['Yoga', 'Philosophy', 'Wellness']
  },
  {
    id: '5',
    title: 'Vedanta Basics: The Science of Self-Realization',
    instructor: 'Vishal Chaurasia',
    description: 'Introduction to Advaita Vedanta and the non-dual understanding of reality',
    duration: '55 min',
    views: '35K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1.png',
    videoUrl: 'https://www.youtube.com/embed/zZRzMdHWp-w?autoplay=1&modestbranding=1&rel=0',
    category: 'spirituality',
    level: 'Intermediate',
    tags: ['Vedanta', 'Self', 'Spirituality']
  },
  {
    id: '6',
    title: 'Practical Sanskrit: Reading Classical Texts',
    instructor: 'Vishal Chaurasia',
    description: 'Learn practical skills to start reading and understanding Sanskrit texts',
    duration: '45 min',
    views: '45K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
    videoUrl: 'https://www.youtube.com/embed/iyTo_C_db5w?autoplay=1&modestbranding=1&rel=0',
    category: 'sanskrit',
    level: 'Intermediate',
    tags: ['Sanskrit', 'Reading', 'Texts']
  },
  {
    id: '7',
    title: 'The Concept of Dharma: Aligning with Cosmic Order',
    instructor: 'Vishal Chaurasia',
    description: 'Understand the multifaceted concept of Dharma and its importance in leading a meaningful life.',
    duration: '48 min',
    views: '25K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/07/Vishal-Chaurasia.jpg',
    videoUrl: 'https://www.youtube.com/embed/An-t_C6-j7A?autoplay=1&modestbranding=1&rel=0',
    category: 'spirituality',
    level: 'Beginner',
    tags: ['Dharma', 'Ethics', 'Spirituality'],
    isNew: true
  },
  {
    id: '8',
    title: 'Mindfulness in the Digital Age: Ancient Wisdom for Modern Challenges',
    instructor: 'Vishal Chaurasia',
    description: 'Learn how to apply ancient mindfulness techniques to navigate the distractions of the modern world.',
    duration: '30 min',
    views: '30K+',
    thumbnail: 'https://shikshanam.in/wp-content/uploads/2024/04/profile-pic-1.png',
    videoUrl: 'https://www.youtube.com/embed/zZRzMdHWp-w?autoplay=1&modestbranding=1&rel=0',
    category: 'wellness',
    level: 'Beginner',
    tags: ['Mindfulness', 'Wellness', 'Modern Life'],
    isNew: true
  }
]

// Category configuration
const categories = [
  {
    id: 'all' as MasterclassCategory,
    label: 'All Masterclasses',
    icon: Video,
    color: 'from-slate-500 to-gray-600'
  },
  {
    id: 'philosophy' as MasterclassCategory,
    label: 'Philosophy',
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'sanskrit' as MasterclassCategory,
    label: 'Sanskrit',
    icon: Languages,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'wellness' as MasterclassCategory,
    label: 'Wellness',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'spirituality' as MasterclassCategory,
    label: 'Spirituality',
    icon: Star,
    color: 'from-orange-500 to-red-500'
  }
]

export default function FreeCoursesPage() {
  const [activeCategory, setActiveCategory] = useState<MasterclassCategory>('all')
  const [selectedVideo, setSelectedVideo] = useState<Masterclass | null>(null)

  // Filter masterclasses by category
  const filteredMasterclasses = activeCategory === 'all' 
    ? masterclasses 
    : masterclasses.filter(m => m.category === activeCategory)

  const featuredMasterclasses = masterclasses.filter(m => m.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200 dark:border-purple-700">
              <Play className="w-4 h-4" />
              <span>100% Free • No Credit Card Required</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Free <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Masterclasses</span>
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
              Learn from expert-led video masterclasses on Sanskrit, Philosophy, and Ancient Wisdom. Start your learning journey today — completely free!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{masterclasses.length}+ Free Videos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">100K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">5.0 Rating</span>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>

      {/* Featured Masterclasses */}
      {featuredMasterclasses.length > 0 && (
        <section className="py-16 bg-white dark:bg-slate-800/50">
          <div className="container mx-auto px-4">
            <HydrationSafeMotion
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Featured Masterclasses
                </h2>
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Start with these popular masterclasses chosen by thousands of students
              </p>
            </HydrationSafeMotion>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredMasterclasses.map((masterclass, index) => (
                <HydrationSafeMotion
                  key={masterclass.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 dark:border-orange-700">
                    <div className="relative aspect-video bg-slate-900 cursor-pointer" onClick={() => setSelectedVideo(masterclass)}>
                      <Image
                        src={masterclass.thumbnail}
                        alt={masterclass.title}
                        width={640}
                        height={360}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/640x360/9333ea/white?text=Video+Thumbnail' }}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        FEATURED
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                        {masterclass.duration}
                      </div>
                      {masterclass.isNew && (
                        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          NEW
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                        {masterclass.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {masterclass.description}
                      </p>

                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{masterclass.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{masterclass.views}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedVideo(masterclass)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" fill="currentColor" />
                        Watch Now
                      </button>
                    </div>
                  </div>
                </HydrationSafeMotion>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Tabs & All Masterclasses */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
              Browse by Category
            </h2>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    px-6 py-3 rounded-xl font-semibold transition-all duration-300
                    flex items-center gap-2
                    ${activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                    }
                  `}
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${activeCategory === category.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-slate-700'}
                  `}>
                    {category.id === 'all' ? masterclasses.length : masterclasses.filter(m => m.category === category.id).length}
                  </span>
                </button>
              ))}
            </div>
          </HydrationSafeMotion>

          {/* Masterclass Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMasterclasses.map((masterclass, index) => (
              <HydrationSafeMotion
                key={masterclass.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.4) }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-slate-700">
                  <div className="relative aspect-video bg-slate-900 cursor-pointer" onClick={() => setSelectedVideo(masterclass)}>
                    <Image
                      src={masterclass.thumbnail}
                      alt={masterclass.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/640x360/9333ea/white?text=Video+Thumbnail' }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-purple-600 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      {masterclass.duration}
                    </div>
                    {masterclass.isNew && (
                      <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        NEW
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`
                        px-2 py-1 rounded text-xs font-bold
                        ${masterclass.level === 'Beginner' ? 'bg-green-500' : masterclass.level === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'}
                        text-white
                      `}>
                        {masterclass.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {masterclass.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {masterclass.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        <span>{masterclass.instructor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{masterclass.views}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {masterclass.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedVideo(masterclass)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" fill="currentColor" />
                      Watch Free
                    </button>
                  </div>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for More In-Depth Learning?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Explore our premium courses for comprehensive, structured learning with certificates and community access
            </p>
            <Link 
              href="/courses"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Browse Premium Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </HydrationSafeMotion>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-5xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-slate-900">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {selectedVideo.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>{selectedVideo.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{selectedVideo.views}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="px-6 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

