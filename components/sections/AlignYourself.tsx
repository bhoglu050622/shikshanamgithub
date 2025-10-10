'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, ChevronLeft, ChevronRight, Play, Calendar, Star, ArrowRight, Sparkles, Target, Compass } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

// Type definitions
interface Course {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  date: string;
  time: string;
  price: string;
  rating: number;
  students: number;
  link: string;
  description: string;
}

interface SelfPacedCourse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  modules: number;
  price: string;
  rating: number;
  students: number;
  link: string;
  level: string;
  instructor: string;
}

interface AlignYourselfData {
  title: string;
  subtitle: string;
  description: string;
  questions?: {
    id: number;
    question: string;
    options: string[];
  }[];
  results?: {
    mindfulness: {
      title: string;
      description: string;
      practices: string[];
    };
    philosophy: {
      title: string;
      description: string;
      practices: string[];
    };
    discipline: {
      title: string;
      description: string;
      practices: string[];
    };
    nature: {
      title: string;
      description: string;
      practices: string[];
    };
  };
  courses: Course[];
  liveClasses: LiveClass[];
  selfPacedCourses: SelfPacedCourse[];
}

// Default data (fallback)
const defaultLiveClasses: LiveClass[] = [
  {
    id: '1',
    title: 'Vedic Mathematics Masterclass',
    instructor: 'Guru Rajesh Kumar',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '2 hours',
    date: '2024-01-15',
    time: '7:00 PM IST',
    price: '₹299',
    rating: 4.9,
    students: 120,
    link: 'https://example.com/vedic-math-live',
    description: 'Learn ancient mathematical techniques for faster calculations'
  },
  {
    id: '2',
    title: 'Sanskrit Grammar Fundamentals',
    instructor: 'Dr. Priya Sharma',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '1.5 hours',
    date: '2024-01-18',
    time: '6:30 PM IST',
    price: '₹199',
    rating: 4.8,
    students: 85,
    link: 'https://example.com/sanskrit-grammar-live',
    description: 'Master the basics of Sanskrit grammar and sentence structure'
  },
  {
    id: '3',
    title: 'Yoga Philosophy & Practice',
    instructor: 'Swami Ananda',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '2.5 hours',
    date: '2024-01-20',
    time: '8:00 PM IST',
    price: '₹399',
    rating: 4.9,
    students: 200,
    link: 'https://example.com/yoga-philosophy-live',
    description: 'Deep dive into Patanjali\'s Yoga Sutras and practical applications'
  }
]

const defaultSelfPacedCourses: SelfPacedCourse[] = [
  {
    id: '1',
    title: 'Complete Bhagavad Gita Study',
    instructor: 'Dr. Krishna Das',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '40 hours',
    modules: 12,
    price: '₹1,999',
    rating: 4.9,
    students: 1500,
    link: 'https://example.com/bhagavad-gita-course',
    description: 'Comprehensive study of the Bhagavad Gita with commentary and practical insights',
    level: 'Intermediate'
  },
  {
    id: '2',
    title: 'Ayurveda Fundamentals',
    instructor: 'Dr. Vaidya Suresh',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '25 hours',
    modules: 8,
    price: '₹1,499',
    rating: 4.7,
    students: 800,
    link: 'https://example.com/ayurveda-fundamentals',
    description: 'Learn the ancient science of Ayurveda and its modern applications',
    level: 'Beginner'
  },
  {
    id: '3',
    title: 'Vedic Astrology Basics',
    instructor: 'Pandit Ravi Shankar',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '30 hours',
    modules: 10,
    price: '₹1,799',
    rating: 4.8,
    students: 650,
    link: 'https://example.com/vedic-astrology-basics',
    description: 'Introduction to Jyotish and understanding planetary influences',
    level: 'Beginner'
  }
]

const defaultCourses: Course[] = [
  {
    id: '1',
    title: 'Sanskrit Bhasha Pragya',
    description: 'Comprehensive Sanskrit language course in Hindi',
    link: '/courses/sanskrit-bhasha-pragya',
    icon: '📚'
  },
  {
    id: '2',
    title: 'Yoga Darshan',
    description: 'Transform your life with Patanjali Yoga Sutras',
    link: '/courses/yoga-darshan-course',
    icon: '🧘'
  },
  {
    id: '3',
    title: 'Emotional Intelligence',
    description: 'Master emotions through Samkhya Darshan',
    link: '/courses/emotional-intelligence-with-samkhya-darshan',
    icon: '💭'
  }
]

// Course Card Component
function CourseCard({ course, type }: { course: any, type: 'live' | 'self-paced' }) {
  const mounted = useHydrationSafeAnimation()
  
  const handleClick = () => {
    window.open(course.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      whileHover={mounted ? { scale: 1.02, y: -4 } : {}}
      className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-amber-700/30 dark:border-amber-700/40 overflow-hidden cursor-pointer w-full max-w-sm flex-shrink-0 group"
      onClick={handleClick}
    >
      
      {/* Thumbnail with traditional frame */}
      <div className="relative h-48 bg-gradient-to-br from-amber-100/40 to-yellow-100/30 dark:from-amber-900/20 dark:to-yellow-900/20">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-90"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 to-yellow-900/20 dark:from-amber-100/10 dark:to-yellow-100/10 flex items-center justify-center">
          {type === 'live' ? (
            <div className="bg-amber-50 dark:bg-slate-800 rounded-full p-3 shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-amber-700/40">
              <Play className="w-6 h-6 text-amber-800 dark:text-amber-400" />
            </div>
          ) : (
            <div className="bg-amber-50 dark:bg-slate-800 rounded-full p-3 shadow-md group-hover:scale-105 transition-transform duration-300 border-2 border-amber-700/40">
              <BookOpen className="w-6 h-6 text-amber-800 dark:text-amber-400" />
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-amber-50/95 dark:bg-slate-800 rounded-lg px-4 py-2 shadow-md border-2 border-amber-700/40 dark:border-amber-700/50">
            <span className="text-sm font-serif font-semibold text-amber-900 dark:text-amber-300">{course.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-serif font-bold text-lg text-amber-900 dark:text-black mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-amber-700 dark:text-black mb-3 font-normal">{course.instructor}</p>
        <p className="text-sm text-amber-800 dark:text-black mb-4 line-clamp-2 font-normal">{course.description}</p>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-amber-700 dark:text-black">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-amber-700 dark:text-black">{course.duration}</span>
            {type === 'live' && (
              <>
                <Calendar className="w-4 h-4 ml-4 mr-2" />
                <span className="text-amber-700 dark:text-black">{course.date} at {course.time}</span>
              </>
            )}
            {type === 'self-paced' && (
              <>
                <BookOpen className="w-4 h-4 ml-4 mr-2" />
                <span className="text-amber-700 dark:text-black">{course.modules} modules</span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-amber-700 dark:text-black">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-amber-700 dark:text-black">{course.students} students</span>
            </div>
            <div className="flex items-center text-sm text-amber-700 dark:text-black">
              <Star className="w-4 h-4 mr-1 text-amber-600 fill-amber-600 dark:fill-amber-400" />
              <span className="text-amber-700 dark:text-black">{course.rating}</span>
            </div>
          </div>
        </div>

        {/* CTA Button with traditional styling */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 rounded-lg font-serif font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
            type === 'live'
              ? 'bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900'
              : 'bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800'
          }`}
        >
          <span>{type === 'live' ? 'Join Live Class' : 'Start Course'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Carousel Component
function CourseCarousel({ courses, type, title }: { courses: any[], type: 'live' | 'self-paced', title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const maxVisible = 3 // Show latest 2-3 courses

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 16 // card width + gap
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const maxIndex = Math.max(0, courses.length - maxVisible)
    const nextIndex = Math.min(currentIndex + 1, maxIndex)
    scrollToIndex(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(prevIndex)
  }

  // Don't render if no courses
  if (!courses || courses.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-bold text-amber-900 dark:text-black">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg bg-amber-100/80 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-amber-800 dark:text-amber-300 border border-amber-700/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= Math.max(0, courses.length - maxVisible)}
            className="p-2 rounded-lg bg-amber-100/80 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-amber-800 dark:text-amber-300 border border-amber-700/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 max-w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} type={type} />
        ))}
      </div>
    </div>
  )
}

export default function AlignYourself() {
  const mounted = useHydrationSafeAnimation()
  const [alignData, setAlignData] = useState<AlignYourselfData | null>(null)
  const [loading, setLoading] = useState(true)

  // Use mock data since CMS functionality is removed
  useEffect(() => {
    const fetchAlignData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        // Mock align yourself data
        setAlignData({
          title: "Two Ways to Begin Your Journey!",
          subtitle: "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.",
          description: "Take our comprehensive alignment assessment to understand your unique spiritual journey and find the practices that resonate with your soul.",
          questions: [
            {
              id: 1,
              question: "What draws you most to spiritual practices?",
              options: [
                "Seeking inner peace and mindfulness",
                "Understanding ancient wisdom and philosophy",
                "Developing discipline and focus",
                "Connecting with nature and energy"
              ]
            },
            {
              id: 2,
              question: "How do you prefer to learn?",
              options: [
                "Through structured courses and systematic study",
                "Through direct experience and practice",
                "Through reading and contemplation",
                "Through community and discussion"
              ]
            }
          ],
          results: {
            mindfulness: {
              title: "Mindfulness & Meditation",
              description: "You are drawn to practices that cultivate present-moment awareness and inner peace.",
              practices: ["Meditation", "Breathing exercises", "Mindful movement"]
            },
            philosophy: {
              title: "Ancient Philosophy",
              description: "You seek deep understanding of spiritual traditions and philosophical wisdom.",
              practices: ["Scripture study", "Contemplative reading", "Philosophical discussion"]
            },
            discipline: {
              title: "Spiritual Discipline",
              description: "You thrive with structured practices that build focus and dedication.",
              practices: ["Daily rituals", "Systematic study", "Regular practice"]
            },
            nature: {
              title: "Natural Connection",
              description: "You find spiritual connection through nature and energy work.",
              practices: ["Nature meditation", "Energy practices", "Outdoor rituals"]
            }
          },
          courses: [],
          liveClasses: [],
          selfPacedCourses: []
        })
      } catch (error) {
        console.error('Failed to load align yourself data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAlignData()
  }, [])

  // Use CMS data or fallback to default
  const sectionTitle = alignData?.title || "Two Ways to Begin Your Journey!"
  const sectionSubtitle = alignData?.subtitle || "Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses."
  const sectionDescription = alignData?.description || "Choose your learning path with our comprehensive educational offerings."
  const liveClasses = (alignData?.liveClasses && alignData.liveClasses.length > 0) ? alignData.liveClasses : defaultLiveClasses
  const selfPacedCourses = (alignData?.selfPacedCourses && alignData.selfPacedCourses.length > 0) ? alignData.selfPacedCourses : defaultSelfPacedCourses
  const courses = alignData?.courses || defaultCourses

  // Debug logging
  console.log('AlignYourself Debug:', {
    loading,
    alignData,
    liveClasses: liveClasses.length,
    selfPacedCourses: selfPacedCourses.length,
    defaultLiveClasses: defaultLiveClasses.length,
    defaultSelfPacedCourses: defaultSelfPacedCourses.length
  })
  
  return (
    <section id="align-yourself" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900" style={{ borderTop: 'none' }}>
      {/* Modern background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 40 } : false}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 border-t-0"
        >
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.9 } : false}
            animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={mounted ? { duration: 0.5, delay: 0.2 } : { duration: 0 }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/40 dark:to-fuchsia-900/40 border border-violet-200 dark:border-violet-700/50 mb-6 backdrop-blur-sm"
          >
            <Compass className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-xs font-semibold text-violet-900 dark:text-violet-200 tracking-widest uppercase">Begin Your Journey</span>
          </motion.div>
          
          <motion.h2
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-violet-900 via-purple-900 to-fuchsia-900 dark:from-violet-100 dark:via-purple-100 dark:to-fuchsia-100 bg-clip-text text-transparent"
          >
            {sectionTitle}
          </motion.h2>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
          >
            {sectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Course Carousels */}
        {loading ? (
          <motion.div
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
            className="mb-16 flex flex-col items-center space-y-8"
          >
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
              <p className="text-violet-600 dark:text-violet-400">Loading courses...</p>
            </div>
          </motion.div>
        ) : (
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center space-y-8"
        >
          <CourseCarousel 
            courses={liveClasses} 
            type="live" 
            title="Latest Live Classes" 
          />
          <CourseCarousel 
            courses={selfPacedCourses} 
            type="self-paced" 
            title="Featured Self-Paced Courses" 
          />
        </motion.div>
        )}


      </div>
    </section>
  )
}
