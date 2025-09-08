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
import SelfHelpHero from './SelfHelpHero'
import SkillTracks from './SkillTracks'
import CourseJourneyCarousel from './CourseJourneyCarousel'
import MeetGurus from './MeetGurus'
import FeaturedCoursesSlider from './FeaturedCoursesSlider'
import ActivityShowcase from './ActivityShowcase'
import FoundersMission from './FoundersMission'
import CommunityCTA from './CommunityCTA'
import EnhancedFooter from './EnhancedFooter'
import { useAnalytics } from '@/lib/analytics'

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
  
  // Initialize analytics
  const analytics = useAnalytics()

  // Rotate Sanskrit quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sanskritQuotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Track page view on mount
  useEffect(() => {
    analytics.pageView('/schools/self-help', 'School of Self-Help')
  }, [analytics])

  // Analytics handlers
  const handleExploreTracks = () => {
    analytics.track('hero_explore_tracks', { page: 'self-help' })
  }

  const handleTakeTest = () => {
    analytics.track('hero_take_test', { page: 'self-help' })
  }

  const handleCourseClick = (course: any) => {
    analytics.track('course_click', {
      id: course.id || course.title.toLowerCase().replace(/\s+/g, '-'),
      title: course.title,
      category: course.category || 'Self-Help',
      level: course.level,
      price: course.price,
      duration: course.duration
    })
  }

  const handleStepChange = (step: number) => {
    const stepTitles = [
      'Personality Test',
      'Theory Class', 
      'Practical Class',
      'Activities',
      'Transformation Report'
    ]
    
    analytics.journey(`step_${step + 1}`, {
      number: step + 1,
      title: stepTitles[step] || `Step ${step + 1}`,
      totalSteps: 5
    })
  }

  const handleJourneyComplete = () => {
    analytics.track('journey_completion', { totalSteps: 5 })
  }

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <Header />
      
      {/* Enhanced Hero Section */}
      <SelfHelpHero 
        onExploreTracks={handleExploreTracks}
        onTakeTest={handleTakeTest}
      />

      {/* Enhanced Skill Tracks Section */}
      <SkillTracks 
        onCourseClick={handleCourseClick}
      />

      {/* Enhanced Course Journey Section */}
      <CourseJourneyCarousel 
        onStepChange={handleStepChange}
        onComplete={handleJourneyComplete}
        initialUnlockedSteps={1}
      />

      {/* Enhanced Meet Gurus Section */}
      <MeetGurus 
        onGuruClick={(guru) => analytics.track('guru_view', {
          id: guru.name.toLowerCase().replace(/\s+/g, '-'),
          name: guru.name,
          specialty: guru.specialty
        })}
        onViewProfile={(guru) => analytics.track('guru_view', {
          id: guru.name.toLowerCase().replace(/\s+/g, '-'),
          name: guru.name,
          specialty: guru.specialty
        })}
      />

      {/* Enhanced Featured Courses Section */}
      <FeaturedCoursesSlider 
        onCourseClick={(course) => analytics.track('course_click', {
          id: course.id,
          title: course.title,
          category: course.category,
          level: course.level,
          price: course.price,
          duration: course.duration
        })}
        onEnrollClick={(course) => analytics.track('course_enrollment', {
          id: course.id,
          title: course.title,
          category: course.category,
          level: course.level,
          price: course.price
        })}
      />

      {/* Enhanced Activity Showcase Section */}
      <ActivityShowcase 
        onTestimonialClick={(testimonial) => analytics.trackTestimonialClick({
          id: testimonial.id,
          author: testimonial.name
        })}
        onVideoPlay={(testimonial) => analytics.trackTestimonialPlay({
          id: testimonial.id,
          author: testimonial.name,
          duration: parseInt(testimonial.duration.replace(':', '')) * 1000 // Convert to milliseconds
        })}
      />

      {/* Enhanced Founders Mission Section */}
      <FoundersMission 
        onFounderClick={(founder) => analytics.trackFounderView({
          name: founder.name,
          role: founder.role
        })}
        onMissionLearnMore={() => analytics.trackMissionLearnMore()}
      />

      {/* Enhanced Community CTA Section */}
      <CommunityCTA 
        onJoinCommunity={(platform) => analytics.trackCommunityJoin(platform as any)}
        onSubscribeNewsletter={() => analytics.trackNewsletterSubscription('user@example.com')}
        onViewEvents={() => analytics.trackEventView({
          title: 'All Events',
          date: new Date().toISOString(),
          type: 'view_all'
        })}
      />

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

      {/* Enhanced Footer */}
      <EnhancedFooter 
        onNewsletterSubscribe={(email) => analytics.trackNewsletterSubscription(email)}
        onSocialClick={(platform) => analytics.trackSocialClick(platform as any)}
      />
    </div>
  )
}
