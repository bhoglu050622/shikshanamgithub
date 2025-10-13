'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  X,
  Quote,
  Star,
  User,
  Calendar,
  MapPin,
  Heart,
  TrendingUp,
  Brain,
  Award,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  course: string
  rating: number
  quote: string
  videoUrl?: string
  imageUrl?: string
  transformation: string
  duration: string
  date: string
}

interface ActivityShowcaseProps {
  onTestimonialClick?: (testimonial: Testimonial) => void
  onVideoPlay?: (testimonial: Testimonial) => void
}

const testimonials: Testimonial[] = [
  {
    id: 'sarah-entrepreneur',
    name: 'Sarah Chen',
    role: 'Tech Entrepreneur',
    location: 'San Francisco, CA',
    course: "Leadership Through Chanakya's Principles",
    rating: 5,
    quote: "The Chanakya principles transformed my leadership approach completely. I now lead with wisdom, not just authority. My team's productivity increased by 40% in just 3 months.",
    videoUrl: '/videos/testimonials/sarah-chen.mp4',
    imageUrl: '/images/testimonials/sarah-chen.jpg',
    transformation: '40% increase in team productivity',
    duration: '2:30',
    date: '2024-01-15'
  },
  {
    id: 'michael-manager',
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    location: 'Austin, TX',
    course: 'Emotional Intelligence Fundamentals',
    rating: 5,
    quote: "I was skeptical about ancient wisdom, but the Samkhya philosophy gave me tools I never knew existed. My relationships at work and home have never been better.",
    videoUrl: '/videos/testimonials/michael-rodriguez.mp4',
    imageUrl: '/images/testimonials/michael-rodriguez.jpg',
    transformation: 'Improved work and personal relationships',
    duration: '1:45',
    date: '2024-02-03'
  },
  {
    id: 'priya-consultant',
    name: 'Priya Sharma',
    role: 'Management Consultant',
    location: 'Mumbai, India',
    course: 'Advanced Consciousness Practices',
    rating: 5,
    quote: "The Kashmir Shaiva practices helped me find inner peace in the chaos of consulting. I'm more focused, creative, and resilient than ever before.",
    videoUrl: '/videos/testimonials/priya-sharma.mp4',
    imageUrl: '/images/testimonials/priya-sharma.jpg',
    transformation: 'Enhanced focus and creativity',
    duration: '3:15',
    date: '2024-01-28'
  },
  {
    id: 'david-executive',
    name: 'David Kim',
    role: 'C-Suite Executive',
    location: 'Seattle, WA',
    course: "Leadership Through Chanakya's Principles",
    rating: 5,
    quote: "As a CEO, I thought I knew everything about leadership. Chanakya's wisdom showed me how much I still had to learn. The results speak for themselves.",
    videoUrl: '/videos/testimonials/david-kim.mp4',
    imageUrl: '/images/testimonials/david-kim.jpg',
    transformation: '25% increase in company revenue',
    duration: '2:00',
    date: '2024-02-10'
  },
  {
    id: 'emma-therapist',
    name: 'Emma Thompson',
    role: 'Therapist',
    location: 'London, UK',
    course: 'Emotional Intelligence Fundamentals',
    rating: 5,
    quote: "Even as a therapist, I learned so much about emotional intelligence. The ancient frameworks complement modern psychology beautifully.",
    videoUrl: '/videos/testimonials/emma-thompson.mp4',
    imageUrl: '/images/testimonials/emma-thompson.jpg',
    transformation: 'Enhanced therapeutic practice',
    duration: '2:45',
    date: '2024-01-20'
  },
  {
    id: 'raj-meditation',
    name: 'Raj Patel',
    role: 'Software Engineer',
    location: 'Bangalore, India',
    course: 'Advanced Consciousness Practices',
    rating: 5,
    quote: "The meditation techniques are unlike anything I've tried before. I feel more centered and productive, even in high-pressure situations.",
    videoUrl: '/videos/testimonials/raj-patel.mp4',
    imageUrl: '/images/testimonials/raj-patel.jpg',
    transformation: 'Better stress management',
    duration: '1:30',
    date: '2024-02-05'
  }
]

// Video Player Component
const VideoPlayer = ({ 
  testimonial, 
  isPlaying, 
  onPlayPause, 
  onMuteToggle, 
  isMuted 
}: {
  testimonial: Testimonial
  isPlaying: boolean
  onPlayPause: () => void
  onMuteToggle: () => void
  isMuted: boolean
}) => {
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-xl overflow-hidden">
      {/* Placeholder for video - in real app, this would be actual video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
            <User className="w-8 h-8 text-saffron-600 dark:text-saffron-400" />
          </div>
          <p className="text-sm text-wisdom-600 dark:text-wisdom-400">
            {testimonial.name}
          </p>
          <p className="text-xs text-wisdom-500 dark:text-wisdom-500">
            {testimonial.duration}
          </p>
        </div>
      </div>
      
      {/* Video controls overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
          onClick={onPlayPause}
          className="w-12 h-12 bg-white/90 dark:bg-wisdom-800/90 rounded-full flex items-center justify-center text-saffron-600 dark:text-saffron-400 hover:bg-white dark:hover:bg-wisdom-800 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </motion.button>
      </div>
      
      {/* Duration badge */}
      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {testimonial.duration}
      </div>
      
      {/* Mute button */}
      <button
        onClick={onMuteToggle}
        className="absolute bottom-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ 
  testimonial, 
  index, 
  onTestimonialClick, 
  onVideoPlay 
}: {
  testimonial: Testimonial
  index: number
  onTestimonialClick?: (testimonial: Testimonial) => void
  onVideoPlay?: (testimonial: Testimonial) => void
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      onClick={() => onTestimonialClick?.(testimonial)}
    >
      <div className="card-premium p-6 h-full group-hover:shadow-2xl transition-all duration-300">
        {/* Video Player */}
        <VideoPlayer
          testimonial={testimonial}
          isPlaying={isPlaying}
          onPlayPause={() => {
            setIsPlaying(!isPlaying)
            onVideoPlay?.(testimonial)
          }}
          onMuteToggle={() => setIsMuted(!isMuted)}
          isMuted={isMuted}
        />
        
        {/* Testimonial Content */}
        <div className="mt-4">
          {/* Quote */}
          <div className="mb-4">
            <Quote className="w-6 h-6 text-saffron-500 dark:text-saffron-400 mb-2" />
            <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed italic">
              "{testimonial.quote}"
            </p>
          </div>
          
          {/* Transformation highlight */}
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-peacock-green-500" />
              <span className="text-sm font-medium text-wisdom-700 dark:text-wisdom-300">
                {testimonial.transformation}
              </span>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-indigo-700 dark:text-soft-gold-500">
                {testimonial.name}
              </h4>
              <p className="text-xs text-wisdom-500 dark:text-wisdom-400">
                {testimonial.role}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3 text-wisdom-400" />
                <span className="text-xs text-wisdom-500 dark:text-wisdom-400">
                  {testimonial.location}
                </span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-soft-gold-500 fill-current" />
                ))}
              </div>
              <p className="text-xs text-wisdom-500 dark:text-wisdom-400">
                {testimonial.course}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Lightbox Modal Component
const TestimonialLightbox = ({ 
  testimonial, 
  isOpen, 
  onClose 
}: {
  testimonial: Testimonial | null
  isOpen: boolean
  onClose: () => void
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  
  if (!testimonial || !isOpen) return null
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={shouldReduceMotion ? {} : { opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-wisdom-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500">
                {testimonial.name}
              </h2>
              <p className="text-saffron-600 dark:text-saffron-400 text-sm">
                {testimonial.role}
              </p>
              <div className="flex items-center space-x-4 text-xs text-wisdom-500 dark:text-wisdom-400 mt-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{testimonial.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-wisdom-400 hover:text-wisdom-600 dark:hover:text-wisdom-300 transition-colors"
            aria-label="Close testimonial"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Video Section */}
        <div className="mb-6">
          <VideoPlayer
            testimonial={testimonial}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onMuteToggle={() => setIsMuted(!isMuted)}
            isMuted={isMuted}
          />
        </div>
        
        {/* Testimonial Content */}
        <div className="space-y-6">
          {/* Quote */}
          <div>
            <Quote className="w-8 h-8 text-saffron-500 dark:text-saffron-400 mb-3" />
            <blockquote className="text-lg text-wisdom-600 dark:text-wisdom-400 leading-relaxed italic">
              "{testimonial.quote}"
            </blockquote>
          </div>
          
          {/* Transformation */}
          <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-indigo-700 dark:text-soft-gold-500 mb-2">
              Transformation Achieved
            </h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-peacock-green-500" />
              <span className="text-wisdom-700 dark:text-wisdom-300 font-medium">
                {testimonial.transformation}
              </span>
            </div>
          </div>
          
          {/* Course Info */}
          <div>
            <h3 className="text-sm font-medium text-indigo-700 dark:text-soft-gold-500 mb-2">
              Course Taken
            </h3>
            <p className="text-wisdom-600 dark:text-wisdom-400">
              {testimonial.course}
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-soft-gold-500 fill-current" />
              ))}
            </div>
            <span className="text-sm text-wisdom-600 dark:text-wisdom-400">
              {testimonial.rating}/5 rating
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ActivityShowcase({ onTestimonialClick, onVideoPlay }: ActivityShowcaseProps) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleTestimonialClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsLightboxOpen(true)
    onTestimonialClick?.(testimonial)
  }

  const handleVideoPlay = (testimonial: Testimonial) => {
    onVideoPlay?.(testimonial)
  }

  return (
    <section className="section-padding">
      <div className="container-custom">

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              onTestimonialClick={handleTestimonialClick}
              onVideoPlay={handleVideoPlay}
            />
          ))}
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
            Ready to create your own success story?
          </p>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && selectedTestimonial && (
          <TestimonialLightbox
            testimonial={selectedTestimonial}
            isOpen={isLightboxOpen}
            onClose={() => {
              setIsLightboxOpen(false)
              setSelectedTestimonial(null)
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
