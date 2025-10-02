'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  ArrowRight, 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  Play,
  BookOpen,
  TrendingUp,
  Heart,
  Brain,
  Zap,
  Target,
  Sparkles,
  ExternalLink
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  value: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: string
  originalPrice?: string
  discount?: string
  rating: number
  studentsCount: number
  instructor: string
  category: string
  features: string[]
  cta: string
  color: string
  icon: any
  isPopular?: boolean
  isNew?: boolean
  comingSoon?: boolean
}

interface FeaturedCoursesSliderProps {
  onCourseClick?: (course: Course) => void
  onEnrollClick?: (course: Course) => void
}

const featuredCourses: Course[] = [
  {
    id: 'chanakya-leadership',
    title: "Leadership Through Chanakya's Arthashastra",
    description: "Master ancient leadership principles for modern success. Learn strategic thinking, decision-making, and team management through Chanakya's timeless wisdom.",
    value: "Master ancient leadership principles for modern success",
    duration: "8 weeks",
    level: "Intermediate",
    price: "₹4,999",
    originalPrice: "₹7,999",
    discount: "37% OFF",
    rating: 4.9,
    studentsCount: 1250,
    instructor: "Dr. Priya Sharma",
    category: "Leadership & Business",
    features: [
      "Live interactive sessions",
      "Case studies from ancient texts",
      "Modern business applications",
      "Personal leadership assessment",
      "Certificate of completion"
    ],
    cta: "Enroll Now",
    color: "from-saffron-500 to-saffron-600",
    icon: TrendingUp,
    isPopular: true
  },
  {
    id: 'emotional-intelligence-fundamentals',
    title: "Emotional Intelligence Fundamentals",
    description: "Build self-awareness and emotional regulation skills through Samkhya philosophy. Learn to manage emotions, build better relationships, and make wiser decisions.",
    value: "Build self-awareness and emotional regulation skills",
    duration: "6 weeks",
    level: "Beginner",
    price: "₹3,499",
    originalPrice: "₹5,999",
    discount: "42% OFF",
    rating: 4.8,
    studentsCount: 980,
    instructor: "Meera Patel",
    category: "Emotional Wellness",
    features: [
      "Daily mindfulness practices",
      "Emotional regulation techniques",
      "Relationship building skills",
      "Progress tracking tools",
      "Community support group"
    ],
    cta: "Start Learning",
    color: "from-lotus-pink-500 to-lotus-pink-600",
    icon: Heart,
    isNew: true
  },
  {
    id: 'advanced-consciousness',
    title: "Advanced Consciousness Practices",
    description: "Deepen your spiritual practice with Kashmir Shaiva wisdom. Explore advanced meditation techniques, consciousness expansion, and spiritual transformation.",
    value: "Deepen your spiritual practice with Kashmir Shaiva wisdom",
    duration: "10 weeks",
    level: "Advanced",
    price: "₹6,999",
    originalPrice: "₹9,999",
    discount: "30% OFF",
    rating: 4.9,
    studentsCount: 450,
    instructor: "Rajesh Kumar",
    category: "Spiritual Growth",
    features: [
      "Advanced meditation techniques",
      "Consciousness exploration",
      "Spiritual transformation tools",
      "One-on-one guidance sessions",
      "Lifetime access to materials"
    ],
    cta: "Begin Journey",
    color: "from-deep-teal-500 to-deep-teal-600",
    icon: Brain
  },
  {
    id: 'strategic-thinking',
    title: "Strategic Thinking & Decision Making",
    description: "Learn to make better decisions using ancient Indian strategic frameworks. Develop critical thinking skills and strategic planning abilities.",
    value: "Learn to make better decisions using ancient Indian strategic frameworks",
    duration: "6 weeks",
    level: "Beginner",
    price: "₹3,999",
    originalPrice: "₹6,499",
    discount: "38% OFF",
    rating: 4.7,
    studentsCount: 720,
    instructor: "Dr. Priya Sharma",
    category: "Strategic Thinking",
    features: [
      "Strategic frameworks from ancient texts",
      "Decision-making models",
      "Critical thinking exercises",
      "Real-world case studies",
      "Strategic planning templates"
    ],
    cta: "Learn More",
    color: "from-peacock-green-500 to-peacock-green-600",
    icon: Target,
    comingSoon: true
  }
]

// Course Card Component
const CourseCard = ({ 
  course, 
  index, 
  onCourseClick, 
  onEnrollClick 
}: { 
  course: Course
  index: number
  onCourseClick?: (course: Course) => void
  onEnrollClick?: (course: Course) => void 
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer h-full"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onCourseClick?.(course)}
    >
      <div className="card-premium p-6 h-full relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {course.isPopular && (
            <span className="bg-saffron-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Most Popular
            </span>
          )}
          {course.isNew && (
            <span className="bg-peacock-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
          {course.comingSoon && (
            <span className="bg-wisdom-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Coming Soon
            </span>
          )}
        </div>
        
        <div className="relative z-10">
          {/* Course Icon and Category */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <course.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-wisdom-500 dark:text-wisdom-400 bg-wisdom-100 dark:bg-wisdom-700 px-2 py-1 rounded-full">
              {course.category}
            </span>
          </div>
          
          {/* Title and Description */}
          <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed mb-4">
            {course.description}
          </p>
          
          {/* Instructor */}
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-4 h-4 text-wisdom-500 dark:text-wisdom-400" />
            <span className="text-sm text-wisdom-600 dark:text-wisdom-400">
              by {course.instructor}
            </span>
          </div>
          
          {/* Course Metadata */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-xs text-wisdom-500 dark:text-wisdom-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{course.studentsCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-soft-gold-500 fill-current" />
              <span className="text-sm font-medium text-wisdom-700 dark:text-wisdom-300">
                {course.rating}
              </span>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-indigo-700 dark:text-soft-gold-500 mb-2">
              What's Included
            </h4>
            <ul className="space-y-1">
              {course.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-wisdom-600 dark:text-wisdom-400">
                  <CheckCircle className="w-3 h-3 text-peacock-green-500 dark:text-peacock-green-400 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {course.features.length > 3 && (
                <li className="text-xs text-saffron-600 dark:text-saffron-400">
                  +{course.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
          
          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-saffron-600 dark:text-saffron-400">
                  {course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-wisdom-500 dark:text-wisdom-400 line-through">
                    {course.originalPrice}
                  </span>
                )}
              </div>
              {course.discount && (
                <span className="text-xs text-peacock-green-600 dark:text-peacock-green-400 font-medium">
                  {course.discount}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs text-wisdom-500 dark:text-wisdom-400">
                {course.level}
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onEnrollClick?.(course)
            }}
            disabled={course.comingSoon}
            className={`w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
              course.comingSoon
                ? 'bg-wisdom-200 dark:bg-wisdom-700 text-wisdom-500 dark:text-wisdom-400 cursor-not-allowed'
                : `bg-gradient-to-r ${course.color} text-white hover:shadow-lg`
            }`}
          >
            {course.comingSoon ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Coming Soon</span>
              </>
            ) : (
              <>
                <span>{course.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
        
        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-saffron-500/10 to-deep-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
    </motion.div>
  )
}

// Navigation Controls Component
const NavigationControls = ({ 
  onPrev, 
  onNext, 
  currentIndex, 
  totalItems, 
  itemsPerView 
}: {
  onPrev: () => void
  onNext: () => void
  currentIndex: number
  totalItems: number
  itemsPerView: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < totalItems - itemsPerView
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className="w-12 h-12 bg-white dark:bg-wisdom-800 rounded-full shadow-lg flex items-center justify-center text-saffron-600 dark:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous courses"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="w-12 h-12 bg-white dark:bg-wisdom-800 rounded-full shadow-lg flex items-center justify-center text-saffron-600 dark:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next courses"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Progress dots */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              Math.floor(currentIndex / itemsPerView) === index
                ? 'bg-saffron-500 dark:bg-saffron-400'
                : 'bg-wisdom-200 dark:bg-wisdom-700'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function FeaturedCoursesSlider({ onCourseClick, onEnrollClick }: FeaturedCoursesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const handlePrev = () => {
    setCurrentIndex(Math.max(0, currentIndex - itemsPerView))
  }

  const handleNext = () => {
    setCurrentIndex(Math.min(featuredCourses.length - itemsPerView, currentIndex + itemsPerView))
  }

  const visibleCourses = featuredCourses.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50" aria-labelledby="courses-title">
      <div className="container-custom">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="courses-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            Featured Courses
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto mb-8">
            Transform your life with our carefully curated courses that blend ancient wisdom with modern application. 
            Each course is designed to deliver practical, lasting change.
          </p>
          
          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-saffron-600 dark:text-saffron-400">
                {featuredCourses.reduce((sum, course) => sum + (course.studentsCount || 0), 0).toLocaleString()}+
              </div>
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-peacock-green-600 dark:text-peacock-green-400">
                {(featuredCourses.reduce((sum, course) => sum + (course.rating || 0), 0) / featuredCourses.length).toFixed(1)}
              </div>
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-deep-teal-600 dark:text-deep-teal-400">
                {featuredCourses.length}+
              </div>
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Courses Available</div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Slider */}
        <div className="hidden lg:block">
          <NavigationControls
            onPrev={handlePrev}
            onNext={handleNext}
            currentIndex={currentIndex}
            totalItems={featuredCourses.length}
            itemsPerView={itemsPerView}
          />
          
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              className="flex space-x-8"
              animate={shouldReduceMotion ? {} : {
                x: -currentIndex * (100 / itemsPerView) + '%',
              }}
              transition={{ duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
            >
              {featuredCourses.map((course, index) => (
                <div key={course.id} className="flex-shrink-0 w-1/3">
                  <CourseCard
                    course={course}
                    index={index}
                    onCourseClick={onCourseClick}
                    onEnrollClick={onEnrollClick}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet Grid */}
        <div className="lg:hidden">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                onCourseClick={onCourseClick}
                onEnrollClick={onEnrollClick}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-wisdom-600 dark:text-wisdom-400 mb-6">
            Ready to start your transformation journey?
          </p>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
          >
            <span>View All Courses</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
