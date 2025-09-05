'use client'

import { motion } from 'framer-motion'
import { Video, BookOpen, Clock, Users, Star, ArrowRight, ChevronLeft, ChevronRight, Play, Calendar } from 'lucide-react'
import { useState, useRef } from 'react'

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

const learningOptions = [
  {
    title: 'Live Classes',
    description: 'Join interactive sessions with expert Gurus in real-time',
    icon: Video,
    features: [
      'Real-time interaction with teachers',
      'Ask questions and get instant answers',
      'Join a community of learners',
      'Flexible scheduling options'
    ],
    stats: {
      students: '2,500+',
      rating: '4.9',
      sessions: '500+'
    },
    color: 'from-saffron-500 to-saffron-600',
    cta: 'Join Live Class',
    href: '#live-classes'
  },
  {
    title: 'Self-Paced Courses',
    description: 'Learn at your own pace with comprehensive course materials',
    icon: BookOpen,
    features: [
      'Pre-recorded video lessons',
      'Downloadable study materials',
      'Progress tracking system',
      'Lifetime access to content'
    ],
    stats: {
      students: '5,000+',
      rating: '4.8',
      courses: '100+'
    },
    color: 'from-turquoise-500 to-turquoise-600',
    cta: 'Browse Courses',
    href: '#courses'
  }
]

// Course Card Component
function CourseCard({ course, type }: { course: any, type: 'live' | 'self-paced' }) {
  const handleClick = () => {
    window.open(course.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer w-full max-w-sm flex-shrink-0"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-saffron-100 to-turquoise-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          {type === 'live' ? (
            <div className="bg-white/90 rounded-full p-3">
              <Play className="w-6 h-6 text-saffron-600" />
            </div>
          ) : (
            <div className="bg-white/90 rounded-full p-3">
              <BookOpen className="w-6 h-6 text-turquoise-600" />
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1">
          <span className="text-sm font-semibold text-wisdom-900">{course.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-wisdom-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-wisdom-600 mb-3">{course.instructor}</p>
        <p className="text-sm text-wisdom-700 mb-4 line-clamp-2">{course.description}</p>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-wisdom-600">
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
            <div className="flex items-center text-sm text-wisdom-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center text-sm text-wisdom-600">
              <Star className="w-4 h-4 mr-1 text-saffron-500" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
            type === 'live' 
              ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700' 
              : 'bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700'
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
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= courses.length - maxVisible}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
  return (
    <section id="align-yourself" className="section-padding bg-white relative overflow-hidden">
      {/* Background Animation - Shooting Stars & Diya Lamps */}
      <div className="absolute inset-0 -z-10">
        {/* Shooting Stars */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-saffron-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-turquoise-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-saffron-300 rounded-full animate-pulse opacity-30 animation-delay-3000"></div>
        
        {/* Floating Diya Lamps */}
        <div className="absolute top-32 right-10 w-8 h-8 bg-gradient-to-br from-saffron-200 to-saffron-300 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-52 left-20 w-6 h-6 bg-gradient-to-br from-turquoise-200 to-turquoise-300 rounded-full animate-float opacity-35 animation-delay-2000"></div>
        <div className="absolute top-72 right-1/4 w-7 h-7 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full animate-float opacity-30 animation-delay-4000"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/30 via-transparent to-turquoise-50/30"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-wisdom-900 mb-6">
            Align Yourself with the{' '}
            <span className="bg-gradient-to-r from-saffron-600 to-turquoise-600 bg-clip-text text-transparent">
              Universe!
            </span>
          </h2>
          <p className="text-xl text-wisdom-700 max-w-3xl mx-auto">
            Choose your path to knowledge. Whether you prefer the energy of live interaction or the flexibility of self-paced learning, we have the perfect option for you.
          </p>
        </motion.div>

        {/* Course Carousels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
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

        {/* Learning Options Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {learningOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${option.color} p-8 text-white`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <option.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{option.title}</h3>
                    <p className="text-white/90">{option.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-wisdom-900 mb-4">What you'll get:</h4>
                  <ul className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3 text-wisdom-700"
                      >
                        <div className="w-2 h-2 bg-saffron-500 rounded-full"></div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-wisdom-900">
                      {option.stats.students}
                    </div>
                    <div className="text-sm text-wisdom-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-wisdom-900 flex items-center justify-center">
                      {option.stats.rating}
                      <Star className="w-4 h-4 text-saffron-500 ml-1" />
                    </div>
                    <div className="text-sm text-wisdom-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-wisdom-900">
                      {option.stats.sessions}
                    </div>
                    <div className="text-sm text-wisdom-600">
                      {option.title === 'Live Classes' ? 'Sessions' : 'Courses'}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r ${option.color} text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl`}
                >
                  <span>{option.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-deep-maroon mb-6">
            Not sure which option is right for you?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-shikshanam-secondary px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Get Personalized Guidance
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
