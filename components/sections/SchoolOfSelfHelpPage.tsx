'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Flower, 
  Play, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  Clock,
  Star,
  Brain,
  Lightbulb,
  Zap,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Instagram,
  Mail,
  ExternalLink,
  User,
  TrendingUp,
  Shield,
  Globe,
  HelpCircle
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

// Data for the page
const sanskritQuotes = [
  {
    text: "विद्या ददाति विनयं विनयाद् याति पात्रताम्",
    translation: "Knowledge gives humility; humility, worthiness; worthiness, wealth; wealth, virtue; virtue, happiness.",
    transliteration: "Vidyā dadāti vinayaṁ vinayād yāti pātratām"
  }
]

const skillTracks = [
  {
    title: "I want to inspire, lead, and build!",
    courses: [
      {
        title: "Entrepreneurship & Leadership through Chanakya's Principles",
        description: "Master the art of leadership and business through ancient Indian wisdom",
        icon: TrendingUp,
        color: "from-saffron-500 to-saffron-600"
      },
      {
        title: "Coming Soon",
        description: "More leadership courses in development",
        icon: Clock,
        color: "from-wisdom-400 to-wisdom-500",
        comingSoon: true
      }
    ]
  },
  {
    title: "I want a happy, stress-free life!",
    courses: [
      {
        title: "Emotional Intelligence through Sāṅkhya Darśana",
        description: "Develop emotional intelligence through Samkhya philosophy",
        icon: Heart,
        color: "from-lotus-pink-500 to-lotus-pink-600"
      },
      {
        title: "Emotional Intelligence through Kashmir Shaiva Darśana",
        description: "Advanced emotional intelligence through Kashmir Shaiva philosophy",
        icon: Brain,
        color: "from-deep-teal-500 to-deep-teal-600"
      }
    ]
  }
]

const howItWorksSteps = [
  {
    step: 0,
    title: "Personality Test",
    description: "Discover your strengths & growth areas",
    icon: Target,
    color: "from-saffron-500 to-saffron-600"
  },
  {
    step: 1,
    title: "Theory Class",
    description: "Clear concepts with living examples",
    icon: BookOpen,
    color: "from-peacock-green-500 to-peacock-green-600"
  },
  {
    step: 2,
    title: "Practical Class",
    description: "Guided activities for real-life application",
    icon: Zap,
    color: "from-lotus-pink-500 to-lotus-pink-600"
  },
  {
    step: 3,
    title: "Activities",
    description: "Daily/weekly practices you can actually stick to",
    icon: Heart,
    color: "from-deep-teal-500 to-deep-teal-600"
  },
  {
    step: 4,
    title: "Transformation Report",
    description: "Track progress with measurable changes",
    icon: TrendingUp,
    color: "from-indigo-500 to-indigo-600"
  }
]

const gurus = [
  {
    name: "Dr. Priya Sharma",
    specialty: "Chanakya Leadership & Business Strategy",
    credibility: "15+ years in corporate leadership, PhD in Indian Philosophy",
    image: "/images/gurus/priya-sharma.jpg",
    profile: "/gurus/priya-sharma"
  },
  {
    name: "Meera Patel",
    specialty: "Emotional Intelligence & Samkhya Philosophy",
    credibility: "Certified therapist, 12+ years in emotional wellness",
    image: "/images/gurus/meera-patel.jpg",
    profile: "/gurus/meera-patel"
  },
  {
    name: "Rajesh Kumar",
    specialty: "Kashmir Shaiva & Advanced Consciousness",
    credibility: "Spiritual teacher, 20+ years in Shaiva traditions",
    image: "/images/gurus/rajesh-kumar.jpg",
    profile: "/gurus/rajesh-kumar"
  }
]

const featuredCourses = [
  {
    title: "Leadership Through Chanakya's Arthashastra",
    value: "Master ancient leadership principles for modern success",
    duration: "8 weeks",
    level: "Intermediate",
    price: "₹4,999",
    cta: "View Course"
  },
  {
    title: "Emotional Intelligence Fundamentals",
    value: "Build self-awareness and emotional regulation skills",
    duration: "6 weeks", 
    level: "Beginner",
    price: "₹3,499",
    cta: "View Course"
  },
  {
    title: "Advanced Consciousness Practices",
    value: "Deepen your spiritual practice with Kashmir Shaiva wisdom",
    duration: "10 weeks",
    level: "Advanced", 
    price: "₹6,999",
    cta: "View Course"
  }
]

const faqs = [
  {
    question: "Do I need background in philosophy?",
    answer: "No, we start from first principles. Our courses are designed for beginners and build up gradually with practical applications."
  },
  {
    question: "How much time per week?",
    answer: "2-4 hours with flexible pacing. You can adjust the schedule to fit your lifestyle and commitments."
  },
  {
    question: "Are classes live or recorded?",
    answer: "Both. Live sessions for interaction and Q&A, plus recordings that remain available for your convenience."
  },
  {
    question: "Is there a certificate?",
    answer: "Yes, after completing the Transformation Report and demonstrating practical application of the concepts."
  },
  {
    question: "What's your refund policy?",
    answer: "7-day no-questions-asked refund policy. We're confident you'll find value in our approach."
  }
]

export default function SchoolOfSelfHelpPage() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [currentCourse, setCurrentCourse] = useState(0)

  // Rotate Sanskrit quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sanskritQuotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding" aria-labelledby="hero-title">
        <div className="container-custom">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <h1 id="hero-title" className="text-hero text-high-contrast mb-8">
                School of{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent">
                  Self-Help
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-subheading text-medium-contrast mb-8 max-w-4xl mx-auto devanagari-separator">
                "Grow in clarity, character, and competence."
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-6 py-3 rounded-full text-lg font-medium">
                  "In the age of AI, why study something so ancient?"
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white px-8 py-4 rounded-2xl text-xl font-semibold mb-8 inline-block">
                Indian wisdom isn't ancient—it's eternal.
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg focus-ring"
                  aria-label="Explore skill tracks to find your learning path"
                >
                  <Target className="w-6 h-6" />
                  <span>Explore Skill Tracks</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg focus-ring"
                  aria-label="Take personality test to discover your strengths and growth areas"
                >
                  <Brain className="w-6 h-6" />
                  <span>Take Personality Test</span>
                </motion.button>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
              In the Purusharthas, Artha and Kama guide us toward worldly success and fulfillment. 
              The Self-Help School turns timeless insights into practical growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skill Tracks Section */}
      <section className="section-padding" aria-labelledby="skill-tracks-title">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 id="skill-tracks-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Skill Tracks
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto mb-8">
              Choose a track. Each course blends wisdom with hands-on practice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {skillTracks.map((track, trackIndex) => (
              <motion.div
                key={trackIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: trackIndex * 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-6 py-3 rounded-full text-lg font-medium text-center">
                  {track.title}
                </div>
                
                <div className="space-y-4">
                  {track.courses.map((course, courseIndex) => (
                    <motion.div
                      key={courseIndex}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="card-premium p-6 group cursor-pointer relative overflow-hidden"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <course.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
                            {course.description}
                          </p>
                          {course.comingSoon && (
                            <div className="mt-3">
                              <span className="bg-wisdom-200 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 px-3 py-1 rounded-full text-xs font-medium">
                                Coming Soon
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How These Courses Work Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              How These Courses Work — Step by Step
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-saffron-200 via-deep-teal-200 to-indigo-200 dark:from-saffron-800 dark:via-deep-teal-800 dark:to-indigo-800 rounded-full" />
                
                {howItWorksSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start mb-16 last:mb-0"
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-6 w-6 h-6 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full border-4 border-off-white-500 dark:border-wisdom-900 z-10 shadow-lg"
                      whileInView={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    />
                    
                    {/* Step Card */}
                    <div className="ml-20 flex-1">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="card-premium p-8 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="flex items-start space-x-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500">
                                Step {step.step}: {step.title}
                              </h3>
                            </div>
                            <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden space-y-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="w-0.5 h-16 bg-saffron-200 dark:bg-saffron-800 mt-4"></div>
                    )}
                  </div>
                  <div className="flex-1 card-premium p-6">
                    <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                      Step {step.step}: {step.title}
                    </h3>
                    <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Gurus Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Meet Your Gurus
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              Scholars, practitioners, and mentors dedicated to your growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {gurus.map((guru, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="card-premium p-6 text-center group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center relative overflow-hidden">
                      <User className="w-12 h-12 text-white" />
                      {/* Halo glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-soft-gold-400/30 to-saffron-400/30 blur-sm group-hover:blur-md transition-all duration-300"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-1">
                    {guru.name}
                  </h3>
                  <p className="text-saffron-600 dark:text-saffron-400 text-sm mb-4 font-medium">
                    {guru.specialty}
                  </p>
                  <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed mb-4">
                    {guru.credibility}
                  </p>
                  <button className="text-saffron-600 dark:text-saffron-400 hover:text-saffron-700 dark:hover:text-saffron-300 text-sm font-medium flex items-center space-x-1 mx-auto group-hover:scale-105 transition-all duration-300">
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Featured Courses
            </h2>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Desktop Carousel */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="flex space-x-8 overflow-hidden">
                  {featuredCourses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 w-1/3"
                    >
                      <div className="card-premium p-8 h-full">
                        <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                          {course.title}
                        </h3>
                        <p className="text-wisdom-600 dark:text-wisdom-400 mb-6 leading-relaxed">
                          {course.value}
                        </p>
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex space-x-4 text-sm text-wisdom-500 dark:text-wisdom-400">
                            <span>{course.duration}</span>
                            <span>•</span>
                            <span>{course.level}</span>
                          </div>
                          <div className="text-lg font-bold text-saffron-600 dark:text-saffron-400">
                            {course.price}
                          </div>
                        </div>
                        <button 
                          className="btn-primary w-full focus-ring"
                          aria-label={`View details for ${course.title} - ${course.duration} course for ${course.level} level`}
                        >
                          {course.cta}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Grid */}
            <div className="lg:hidden space-y-6">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="card-premium p-6">
                    <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-3">
                      {course.title}
                    </h3>
                    <p className="text-wisdom-600 dark:text-wisdom-400 mb-4 text-sm leading-relaxed">
                      {course.value}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex space-x-3 text-xs text-wisdom-500 dark:text-wisdom-400">
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                      <div className="text-lg font-bold text-saffron-600 dark:text-saffron-400">
                        {course.price}
                      </div>
                    </div>
                    <button 
                      className="btn-primary w-full text-sm focus-ring"
                      aria-label={`View details for ${course.title} - ${course.duration} course for ${course.level} level`}
                    >
                      {course.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
              >
                <span>See All Courses</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Stories Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Student Stories
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              Short reels and quotes from our learners.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-premium p-6 h-full group-hover:shadow-2xl transition-all duration-300">
                  <div className="w-full h-32 bg-gradient-to-br from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-xl mb-4 flex items-center justify-center">
                    <Play className="w-8 h-8 text-saffron-600 dark:text-saffron-400" />
                  </div>
                  <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed italic">
                    "The Chanakya principles transformed my leadership approach completely. I now lead with wisdom, not just authority."
                  </p>
                  <div className="mt-4 text-xs text-wisdom-500 dark:text-wisdom-400">
                    — Sarah, Entrepreneur
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Mission Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="card-premium p-12 text-center relative overflow-hidden">
              <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-8">
                Why We Built This
              </h2>
              
              <blockquote className="text-xl md:text-2xl text-wisdom-600 dark:text-wisdom-400 mb-8 leading-relaxed italic">
                "Self-help shouldn't be pop-advice. It should be practice-ready, principle-driven, and compassionate. 
                We're building a place where Indian wisdom meets everyday life."
              </blockquote>
              
              <div className="flex justify-center space-x-4">
                {[1, 2, 3, 4].map((item, index) => (
                  <div key={index} className="w-16 h-16 bg-gradient-to-br from-saffron-200 to-deep-teal-200 dark:from-saffron-800 dark:to-deep-teal-800 rounded-xl"></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-8">
              Join Our Community
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 focus-ring"
                aria-label="Join our Telegram community for daily discussions and Q&A"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Telegram</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 focus-ring"
                aria-label="Follow us on Instagram for visual wisdom and stories"
              >
                <Instagram className="w-6 h-6" />
                <span>Instagram</span>
              </motion.button>
            </div>
            
            <p className="text-wisdom-600 dark:text-wisdom-400">
              Events, tips, and practice prompts—free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-12 text-center">
              FAQs
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-premium overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setExpandedFaq(expandedFaq === index ? null : index)
                      }
                    }}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-colors focus-ring"
                    aria-expanded={expandedFaq === index}
                    aria-controls={`faq-answer-${index}`}
                    aria-label={`${expandedFaq === index ? 'Collapse' : 'Expand'} FAQ: ${faq.question}`}
                  >
                    <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-saffron-600 dark:text-saffron-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-saffron-600 dark:text-saffron-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6" id={`faq-answer-${index}`}>
                          <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sanskrit Quote Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="card-premium p-12">
              <div className="text-3xl md:text-4xl font-devanagari text-indigo-700 dark:text-soft-gold-500 mb-4">
                {sanskritQuotes[currentQuote].text}
              </div>
              <div className="text-lg text-saffron-600 dark:text-saffron-400 mb-2">
                {sanskritQuotes[currentQuote].transliteration}
              </div>
              <div className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                {sanskritQuotes[currentQuote].translation}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg mx-auto mb-4 focus-ring"
              aria-label="Contact us for questions or support - we respond within 24-48 hours"
            >
              <Mail className="w-6 h-6" />
              <span>Contact Us</span>
            </motion.button>
            
            <p className="text-wisdom-600 dark:text-wisdom-400">
              We'll get back within 24–48 hrs.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
