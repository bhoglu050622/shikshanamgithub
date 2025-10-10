'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  TrendingUp, 
  Heart, 
  Clock, 
  Brain, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Target,
  Users,
  BookOpen
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

interface Course {
  title: string
  description: string
  icon: any
  color: string
  comingSoon?: boolean
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  price: string
}

interface SkillTrack {
  title: string
  subtitle: string
  description: string
  courses: Course[]
  color: string
  icon: any
}

interface SkillTracksProps {
  onCourseClick?: (course: Course) => void
  onTrackSelect?: (track: SkillTrack) => void
}

const skillTracks: SkillTrack[] = [
  {
    title: "Artha",
    subtitle: "I want to inspire, lead, and build!",
    description: "Master the art of leadership, entrepreneurship, and worldly success through ancient Indian wisdom.",
    color: "from-saffron-500 to-saffron-600",
    icon: TrendingUp,
    courses: [
      {
        title: "Entrepreneurship & Leadership through Chanakya's Principles",
        description: "Master the art of leadership and business through ancient Indian wisdom and practical application",
        icon: TrendingUp,
        color: "from-saffron-500 to-saffron-600",
        level: "Intermediate",
        duration: "8 weeks",
        price: "₹4,999"
      },
      {
        title: "Strategic Thinking & Decision Making",
        description: "Learn to make better decisions using ancient Indian strategic frameworks",
        icon: Target,
        color: "from-peacock-green-500 to-peacock-green-600",
        level: "Beginner",
        duration: "6 weeks",
        price: "₹3,499",
        comingSoon: true
      }
    ]
  },
  {
    title: "Kama",
    subtitle: "I want a happy, stress-free life!",
    description: "Develop emotional intelligence, relationships, and personal fulfillment through timeless wisdom.",
    color: "from-lotus-pink-500 to-lotus-pink-600",
    icon: Heart,
    courses: [
      {
        title: "Emotional Intelligence through Sāṅkhya Darśana",
        description: "Develop emotional intelligence and self-awareness through Samkhya philosophy",
        icon: Heart,
        color: "from-lotus-pink-500 to-lotus-pink-600",
        level: "Beginner",
        duration: "6 weeks",
        price: "₹3,499"
      },
      {
        title: "Emotional Intelligence through Kashmir Shaiva Darśana",
        description: "Advanced emotional intelligence through Kashmir Shaiva philosophy and practices",
        icon: Brain,
        color: "from-deep-teal-500 to-deep-teal-600",
        level: "Advanced",
        duration: "10 weeks",
        price: "₹6,999"
      }
    ]
  }
]

// Dashed Connector Component
const DashedConnector = ({ isVisible }: { isVisible: boolean }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-0.5">
      <motion.div
        className="w-full h-full border-t-2 border-dashed border-saffron-300 dark:border-saffron-600"
        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={shouldReduceMotion ? {} : { pathLength: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 0.9, 0.3, 1]
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-saffron-500 dark:bg-saffron-400 rounded-full"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
        animate={shouldReduceMotion ? {} : { scale: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.22, 0.9, 0.3, 1]
        }}
      />
    </div>
  )
}

// Course Card Component
const CourseCard = ({ 
  course, 
  index, 
  onCourseClick 
}: { 
  course: Course
  index: number
  onCourseClick?: (course: Course) => void 
}) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
      className="group cursor-pointer"
      onClick={() => onCourseClick?.(course)}
    >
      <div className="card-premium p-6 h-full relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <div className="flex items-start space-x-4 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <course.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed mb-3">
                {course.description}
              </p>
              
              {/* Course metadata */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-wisdom-100 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 px-2 py-1 rounded-full text-xs font-medium">
                  {course.level}
                </span>
                <span className="bg-wisdom-100 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 px-2 py-1 rounded-full text-xs font-medium">
                  {course.duration}
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-saffron-600 dark:text-saffron-400">
                  {course.price}
                </span>
                {course.comingSoon ? (
                  <span className="bg-wisdom-200 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                ) : (
                  <motion.div
                    className="flex items-center text-saffron-600 dark:text-saffron-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
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

// Track Header Component
const TrackHeader = ({ track, index }: { track: SkillTrack, index: number }) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center mb-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${track.color} rounded-2xl flex items-center justify-center shadow-lg`}>
          <track.icon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
        {track.title}
      </h2>
      
      <div className={`bg-gradient-to-r ${track.color} text-white px-6 py-3 rounded-full text-lg font-medium mb-3 inline-block`}>
        {track.subtitle}
      </div>
      
      <p className="text-wisdom-600 dark:text-wisdom-400 max-w-md mx-auto">
        {track.description}
      </p>
    </motion.div>
  )
}

export default function SkillTracks({ onCourseClick, onTrackSelect }: SkillTracksProps) {
  const [visibleTracks, setVisibleTracks] = useState<boolean[]>([])
  const trackRefs = useRef<(HTMLDivElement | null)[]>([])
  const shouldReduceMotion = useReducedMotion()

  // Intersection observer for track visibility
  useEffect(() => {
    const observers = trackRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleTracks(prev => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        },
        { threshold: 0.3 }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  return (
    <section className="section-padding" aria-labelledby="skill-tracks-title">
      <div className="container-custom">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="skill-tracks-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            Choose Your Path
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto mb-8">
            In the Purusharthas, Artha and Kama guide us toward worldly success and fulfillment. 
            Choose a track that resonates with your goals.
          </p>
          
          {/* Purusharthas explanation */}
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-wisdom-700 dark:text-wisdom-300 text-sm leading-relaxed">
              <strong>Purusharthas</strong> are the four aims of human life in Indian philosophy: 
              <span className="text-saffron-600 dark:text-saffron-400"> Artha</span> (prosperity), 
              <span className="text-lotus-pink-600 dark:text-lotus-pink-400"> Kama</span> (pleasure), 
              <span className="text-indigo-600 dark:text-indigo-400"> Dharma</span> (duty), and 
              <span className="text-deep-teal-600 dark:text-deep-teal-400"> Moksha</span> (liberation).
            </p>
          </div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {skillTracks.map((track, trackIndex) => (
              <div
                key={trackIndex}
                ref={el => { trackRefs.current[trackIndex] = el }}
                className="relative"
              >
                <TrackHeader track={track} index={trackIndex} />
                
                <div className="space-y-4">
                  {track.courses.map((course, courseIndex) => (
                    <CourseCard
                      key={courseIndex}
                      course={course}
                      index={courseIndex}
                      onCourseClick={onCourseClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Dashed connector between tracks */}
          <DashedConnector isVisible={visibleTracks.every(Boolean)} />
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
            Not sure which path to choose? Take our personality assessment to get personalized recommendations.
          </p>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
          >
            <Brain className="w-6 h-6" />
            <span>Take Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
