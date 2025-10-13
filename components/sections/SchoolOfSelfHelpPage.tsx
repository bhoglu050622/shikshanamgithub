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
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import SelfHelpHero from './SelfHelpHero'
import SkillTracks from './SkillTracks'
import CourseJourneyImage from './CourseJourneyImage'
import PurusharhasAnimation from './PurusharhasAnimation'
import DownloadAppNew from './DownloadAppNew'
import JoinCommunity from './JoinCommunity'
import FAQ from './FAQ'

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


  // Analytics handlers
  const handleExploreTracks = () => {
    // Navigate to tracks
  }

  const handleTakeTest = () => {
    // Navigate to test
  }

  const handleCourseClick = (course: any) => {
    // Navigate to course
  }

  const handleStepChange = (step: number) => {
    const stepTitles = [
      'Personality Test',
      'Theory Class', 
      'Practical Class',
      'Activities',
      'Transformation Report'
    ]
    
    // Handle journey step
  }

  const handleJourneyComplete = () => {
    // Handle journey completion
  }

  return (
    <>
      {/* Enhanced Hero Section */}
      <SelfHelpHero 
        onExploreTracks={handleExploreTracks}
        onTakeTest={handleTakeTest}
      />

      {/* Purusharthas Animation Section */}
      <PurusharhasAnimation />

      {/* Enhanced Skill Tracks Section */}
      <SkillTracks 
        onCourseClick={handleCourseClick}
      />

      {/* Course Journey Instructional Image */}
      <CourseJourneyImage />


      {/* Homepage-Style Sections */}
      <DownloadAppNew />
      <JoinCommunity />
      <FAQ />
    </>
  )
}
