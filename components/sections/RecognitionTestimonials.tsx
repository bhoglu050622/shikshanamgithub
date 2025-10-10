'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Quote, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  MessageCircle,
  Star
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '../motion/MotionWrapper'


const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Sanskrit Student',
    location: 'Mumbai, India',
    avatar: 'PS',
    content: 'The depth of knowledge here is incredible. I\'ve learned more in 6 months than I did in years of self-study. The gurus are patient and the community is supportive.',
    rating: 5,
    video: '/testimonial-1.mp4',
    duration: 30,
    likes: 124,
    comments: 23,
    shares: 8,
    course: 'Advanced Sanskrit Grammar',
    progress: '85%'
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    role: 'Philosophy Professor',
    location: 'Delhi, India',
    avatar: 'RK',
    content: 'Shikshanam bridges the gap between ancient wisdom and modern learning beautifully. The interactive sessions and comprehensive materials make complex concepts accessible.',
    rating: 5,
    video: '/testimonial-2.mp4',
    duration: 25,
    likes: 89,
    comments: 15,
    shares: 12,
    course: 'Vedanta Philosophy',
    progress: '100%'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    role: 'Yoga Instructor',
    location: 'California, USA',
    avatar: 'SJ',
    content: 'The spiritual teachings have transformed my practice and understanding of yoga philosophy. The live sessions with gurus are life-changing experiences.',
    rating: 5,
    video: '/testimonial-3.mp4',
    duration: 35,
    likes: 156,
    comments: 31,
    shares: 19,
    course: 'Yoga Philosophy & Practice',
    progress: '92%'
  },
  {
    id: 4,
    name: 'Arjun Patel',
    role: 'Software Engineer',
    location: 'Bangalore, India',
    avatar: 'AP',
    content: 'Learning Sanskrit has opened new doors in my understanding of Indian culture. The structured approach and expert guidance make it enjoyable and effective.',
    rating: 5,
    video: '/testimonial-4.mp4',
    duration: 28,
    likes: 98,
    comments: 18,
    shares: 7,
    course: 'Sanskrit for Beginners',
    progress: '78%'
  }
]

export default function RecognitionTestimonials() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const intervalRef = useRef<NodeJS.Timeout>()

  const currentTestimonial = testimonials[currentTestimonialIndex]

  useEffect(() => {
    if (isPlaying && inView) {
      intervalRef.current = setInterval(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000) // Auto-advance every 4 seconds for Instagram Reel feel
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, inView])

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <section id="recognition-testimonials" className="section-padding bg-parchment-ivory transition-colors duration-300">
      <div className="container-custom">
        <StaggerContainer className="text-center mb-16">
          <StaggerItem>
            <h2 className="text-display text-dark-olive mb-6">
              <span className="bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent">
                Student Stories
              </span>
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-subheading text-deep-maroon max-w-4xl mx-auto">
              Real transformations from our students who have embraced ancient wisdom. 
              See how their lives have changed through our courses.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Student Stories Section - Center Aligned */}
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonialIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Instagram Reel Style Card */}
                  <div className="card-premium overflow-hidden relative">
                    {/* Video Section */}
                    <div className="relative h-80 bg-gradient-to-br from-golden-olive to-deep-maroon">
                      {/* Placeholder for video */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-10 h-10" />
                          </div>
                          <p className="text-lg font-semibold">Video Testimonial</p>
                          <p className="text-sm opacity-80">{currentTestimonial.duration}s</p>
                        </div>
                      </div>

                      {/* Instagram-style Controls */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={togglePlayPause}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={toggleMute}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </motion.button>
                          </div>

                          {/* Progress Bar */}
                          <div className="flex-1 mx-3">
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-white rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: isPlaying ? "100%" : "0%" }}
                                transition={{ duration: 4, ease: "linear" }}
                              />
                            </div>
                          </div>

                          {/* Social Actions */}
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* User Info */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-golden-olive to-golden-olive/90 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {currentTestimonial.avatar}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-dark-olive text-sm">
                            {currentTestimonial.name}
                          </h4>
                          <p className="text-sand-beige text-xs">
                            {currentTestimonial.role} • {currentTestimonial.location}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-temple-gold fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="text-sm text-deep-maroon leading-relaxed mb-4 italic">
                        "{currentTestimonial.content}"
                      </blockquote>

                      {/* Course Info */}
                      <div className="flex items-center justify-between p-3 bg-sand-beige/30 rounded-lg mb-4">
                        <div>
                          <p className="text-xs text-sand-beige">Learning</p>
                          <p className="font-semibold text-dark-olive text-sm">{currentTestimonial.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-sand-beige">Progress</p>
                          <p className="font-semibold text-golden-olive text-sm">{currentTestimonial.progress}</p>
                        </div>
                      </div>

                      {/* Social Stats */}
                      <div className="flex items-center justify-center space-x-6 pt-3 border-t border-golden-olive/20">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span className="text-deep-maroon text-sm">{currentTestimonial.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-deep-maroon text-sm">{currentTestimonial.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="w-4 h-4 text-green-500" />
                          <span className="text-deep-maroon text-sm">{currentTestimonial.shares}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-center space-x-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevTestimonial}
                      className="w-10 h-10 bg-parchment-ivory rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
                    >
                      <ChevronLeft className="w-5 h-5 text-dark-olive" />
                    </motion.button>

                    {/* Dots Indicator */}
                    <div className="flex items-center space-x-2">
                      {testimonials.map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setCurrentTestimonialIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentTestimonialIndex
                              ? 'bg-golden-olive w-6'
                              : 'bg-golden-olive/30'
                          }`}
                        />
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextTestimonial}
                      className="w-10 h-10 bg-parchment-ivory rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
                    >
                      <ChevronRight className="w-5 h-5 text-dark-olive" />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
