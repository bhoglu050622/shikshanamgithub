'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Award, 
  Trophy, 
  Star, 
  Medal, 
  Crown, 
  Shield, 
  Target, 
  Zap,
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
  ArrowRight
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '../motion/MotionWrapper'

const recognitions = [
  {
    icon: Award,
    title: 'Best Sanskrit Learning Platform',
    organization: 'Indian Education Awards 2024',
    year: '2024',
    description: 'Recognized for excellence in traditional language education',
    color: 'from-golden-olive to-golden-olive/90'
  },
  {
    icon: Trophy,
    title: 'Innovation in Education',
    organization: 'Global EdTech Summit',
    year: '2024',
    description: 'Awarded for bridging ancient wisdom with modern technology',
    color: 'from-deep-maroon to-deep-maroon/90'
  },
  {
    icon: Star,
    title: 'Top Rated Learning Platform',
    organization: 'Student Choice Awards',
    year: '2024',
    description: 'Highest student satisfaction rating of 4.9/5',
    color: 'from-copper-orange to-copper-orange/90'
  },
  {
    icon: Medal,
    title: 'Cultural Heritage Preservation',
    organization: 'UNESCO Heritage Foundation',
    year: '2023',
    description: 'Recognized for preserving and promoting Sanskrit literature',
    color: 'from-temple-gold to-temple-gold/90'
  }
]

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
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 text-golden-olive">
                <Award className="w-6 h-6" />
                <span className="text-sm font-semibold tracking-wide uppercase">Trust & Recognition</span>
                <Award className="w-6 h-6" />
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h2 className="text-display text-dark-olive mb-6">
              Why Learners{' '}
              <span className="bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent">
                Trust Shikshanam
              </span>
            </h2>
          </StaggerItem>

          <StaggerItem>
            <p className="text-subheading text-deep-maroon max-w-4xl mx-auto">
              Recognized globally for excellence in preserving and teaching ancient Indian wisdom. 
              See what our award-winning platform and satisfied students have to say.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Recognition Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-dark-olive mb-8 text-center lg:text-left">
              Awards & Recognition
            </h3>
            
            <div className="space-y-4">
              {recognitions.map((recognition, index) => (
                <motion.div
                  key={recognition.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="card-premium p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${recognition.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <recognition.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-semibold text-golden-olive bg-golden-olive/10 px-2 py-1 rounded-full">
                          {recognition.year}
                        </span>
                        <h4 className="font-bold text-dark-olive group-hover:text-golden-olive transition-colors duration-300">
                          {recognition.title}
                        </h4>
                      </div>
                      
                      <p className="text-golden-olive font-semibold text-sm mb-2">
                        {recognition.organization}
                      </p>
                      
                      <p className="text-deep-maroon text-sm leading-relaxed">
                        {recognition.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center space-x-2 px-6 py-3 mx-auto lg:mx-0"
              >
                <span>View All Awards</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Testimonials Section - Instagram Reel Style */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <h3 className="text-2xl font-bold text-dark-olive mb-8 text-center lg:text-left">
              Student Stories
            </h3>
            
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

        {/* Call to Action */}
        <StaggerItem>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="card-premium p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-golden-olive to-golden-olive/90 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-dark-olive mb-4">
                Join Our Award-Winning Community
              </h3>
              
              <p className="text-deep-maroon mb-8 max-w-2xl mx-auto">
                Experience the same quality education that has earned us recognition from prestigious organizations worldwide. 
                Start your journey with confidence and become our next success story.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-shikshanam-primary flex items-center space-x-3 px-8 py-4"
                >
                  <Award className="w-5 h-5" />
                  <span>Start Learning</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-shikshanam-outline flex items-center space-x-3 px-8 py-4"
                >
                  <Star className="w-5 h-5" />
                  <span>View All Testimonials</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      </div>
    </section>
  )
}
