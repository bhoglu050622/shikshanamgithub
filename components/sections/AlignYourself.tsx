'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Users, ChevronLeft, ChevronRight, Play, Calendar, Star, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

// Sample course data - in a real app, this would come from an API
const liveClasses = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

const selfPacedCourses = [
  {
    id: 1,
    title: 'Complete Bhagavad Gita Study',
    instructor: 'Dr. Krishna Das',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '40 hours',
    modules: 12,
    price: '₹1,999',
    rating: 4.9,
    students: 1500,
    link: 'https://example.com/bhagavad-gita-course',
    description: 'Comprehensive study of the Bhagavad Gita with commentary and practical insights'
  },
  {
    id: 2,
    title: 'Ayurveda Fundamentals',
    instructor: 'Dr. Vaidya Suresh',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '25 hours',
    modules: 8,
    price: '₹1,499',
    rating: 4.7,
    students: 800,
    link: 'https://example.com/ayurveda-fundamentals',
    description: 'Learn the ancient science of Ayurveda and its modern applications'
  },
  {
    id: 3,
    title: 'Vedic Astrology Basics',
    instructor: 'Pandit Ravi Shankar',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center',
    duration: '30 hours',
    modules: 10,
    price: '₹1,799',
    rating: 4.8,
    students: 650,
    link: 'https://example.com/vedic-astrology-basics',
    description: 'Introduction to Jyotish and understanding planetary influences'
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
      whileHover={mounted ? { scale: 1.02, y: -5 } : {}}
      className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border overflow-hidden cursor-pointer w-full max-w-sm flex-shrink-0"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
          {type === 'live' ? (
            <div className="bg-card rounded-full p-3">
              <Play className="w-6 h-6 text-primary" />
            </div>
          ) : (
            <div className="bg-card rounded-full p-3">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-card rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-foreground">{course.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{course.description}</p>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{course.duration}</span>
            {type === 'live' && (
              <>
                <Calendar className="w-4 h-4 ml-4 mr-2" />
                <span>{course.date} at {course.time}</span>
              </>
            )}
            {type === 'self-paced' && (
              <>
                <BookOpen className="w-4 h-4 ml-4 mr-2" />
                <span>{course.modules} modules</span>
              </>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 mr-1 text-primary" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-primary-foreground transition-all duration-300 flex items-center justify-center space-x-2 ${
            type === 'live' 
              ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80' 
              : 'bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80'
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
    const nextIndex = Math.min(currentIndex + 1, courses.length - maxVisible)
    scrollToIndex(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(prevIndex)
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-wisdom-900">{title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= courses.length - maxVisible}
            className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-foreground"
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
        {courses.slice(0, maxVisible).map((course) => (
          <CourseCard key={course.id} course={course} type={type} />
        ))}
      </div>
    </div>
  )
}

export default function AlignYourself() {
  const mounted = useHydrationSafeAnimation()
  
  return (
    <section id="align-yourself" className="section-padding bg-background relative overflow-hidden">
      {/* Background Animation - Shooting Stars & Diya Lamps */}
      <div className="absolute inset-0 -z-10">
        {/* Shooting Stars */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/70 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent/70 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-secondary/70 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-primary/50 rounded-full animate-pulse opacity-30 animation-delay-3000"></div>
        
        {/* Floating Diya Lamps */}
        <div className="absolute top-32 right-10 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-52 left-20 w-6 h-6 bg-gradient-to-br from-accent/20 to-accent/40 rounded-full animate-float opacity-35 animation-delay-2000"></div>
        <div className="absolute top-72 right-1/4 w-7 h-7 bg-gradient-to-br from-secondary/20 to-secondary/40 rounded-full animate-float opacity-30 animation-delay-4000"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-card/30"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.8 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Two Ways to Begin Your{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Journey!
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn through interactive Live Classes, or walk your own path of Swadhyaya with Self-Paced Courses.
          </p>
        </motion.div>

        {/* Course Carousels */}
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


      </div>
    </section>
  )
}
