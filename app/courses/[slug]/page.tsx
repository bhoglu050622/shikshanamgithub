'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Play,
  Download,
  Sparkles,
  CheckCircle,
  IndianRupee,
  Calendar,
  Video,
  Headphones,
  FileText,
  ChevronDown,
  ChevronUp,
  Quote,
  UserCheck,
  Languages,
  Book,
  Award,
  Target,
  Brain,
  Heart,
  Crown,
  Globe,
  User,
  Lightbulb,
  Shield,
} from '@/lib/icons'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button, { CTAButton } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Course data - this would typically come from a CMS or database
const courseData: Record<string, any> = {
  'chanakya-code': {
    id: 'chanakya-code',
    title: 'Chanakya\'s Code: Dominate Negotiation & Business Tactics!',
    subtitle: 'Master Ancient Business Wisdom',
    description: 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings. Learn the timeless principles that shaped empires and apply them to modern business challenges.',
    longDescription: 'This comprehensive course delves deep into the strategic wisdom of Chanakya, the ancient Indian philosopher and royal advisor. You\'ll learn negotiation tactics, leadership principles, and business strategies that have stood the test of time for over 2000 years.',
    type: 'Premium Course',
    status: 'available',
    price: '₹3,999',
    originalPrice: '₹5,999',
    duration: '8-10 weeks',
    level: 'Professional',
    language: 'English',
    instructor: 'Dr. Rajesh Kumar',
    rating: 4.9,
    studentsCount: 1250,
    lastUpdated: '2024-01-15',
    features: ['Business Strategy', 'Negotiation Skills', 'Leadership Principles', 'Case Studies'],
    curriculum: [
      { week: 1, title: 'Introduction to Chanakya\'s Philosophy', lessons: 5, duration: '2 hours' },
      { week: 2, title: 'The Art of Negotiation', lessons: 6, duration: '2.5 hours' },
      { week: 3, title: 'Strategic Thinking & Planning', lessons: 4, duration: '2 hours' },
      { week: 4, title: 'Leadership & Team Management', lessons: 5, duration: '2.5 hours' },
      { week: 5, title: 'Business Ethics & Values', lessons: 4, duration: '2 hours' },
      { week: 6, title: 'Crisis Management', lessons: 5, duration: '2.5 hours' },
      { week: 7, title: 'Modern Applications', lessons: 6, duration: '3 hours' },
      { week: 8, title: 'Final Project & Certification', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'Basic understanding of business concepts',
      'Open mind to ancient wisdom',
      'Commitment to 2-3 hours per week'
    ],
    whatYouWillLearn: [
      'Master Chanakya\'s 7 pillars of business success',
      'Develop advanced negotiation skills',
      'Learn strategic thinking frameworks',
      'Understand leadership principles that build empires',
      'Apply ancient wisdom to modern challenges'
    ],
    instructorBio: 'Dr. Rajesh Kumar is a renowned business strategist and Chanakya scholar with over 20 years of experience in corporate leadership and ancient Indian philosophy.',
    image: '/images/courses/chanakya-code.jpg',
    videoPreview: '/videos/courses/chanakya-code-preview.mp4'
  },
  'sanskrit-beginner': {
    id: 'sanskrit-beginner',
    title: 'संस्कृत: प्रारंभ से संभाषण तक: Level-1: Package',
    subtitle: 'Complete Sanskrit Foundation Course',
    description: 'Complete Sanskrit foundation course from basics to conversation level. Master the fundamentals of this ancient language with structured lessons and practical exercises.',
    longDescription: 'This comprehensive package takes you from absolute beginner to conversational Sanskrit. Learn grammar, vocabulary, and cultural context through interactive lessons and real-world applications.',
    type: 'Premium Course',
    status: 'available',
    price: '₹2,898',
    originalPrice: '₹3,999',
    duration: '12-15 weeks',
    level: 'Beginner',
    language: 'Hindi',
    instructor: 'Dr. Priya Sharma',
    rating: 4.8,
    studentsCount: 2100,
    lastUpdated: '2024-01-10',
    features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context'],
    curriculum: [
      { week: 1, title: 'Introduction to Sanskrit Script', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'Basic Pronunciation & Phonetics', lessons: 5, duration: '2.5 hours' },
      { week: 3, title: 'Simple Words & Vocabulary', lessons: 6, duration: '3 hours' },
      { week: 4, title: 'Basic Grammar - Nouns', lessons: 5, duration: '2.5 hours' },
      { week: 5, title: 'Basic Grammar - Verbs', lessons: 6, duration: '3 hours' },
      { week: 6, title: 'Simple Sentences', lessons: 5, duration: '2.5 hours' },
      { week: 7, title: 'Numbers & Time', lessons: 4, duration: '2 hours' },
      { week: 8, title: 'Family & Relationships', lessons: 5, duration: '2.5 hours' },
      { week: 9, title: 'Daily Conversations', lessons: 6, duration: '3 hours' },
      { week: 10, title: 'Cultural Context', lessons: 4, duration: '2 hours' },
      { week: 11, title: 'Reading Practice', lessons: 5, duration: '2.5 hours' },
      { week: 12, title: 'Final Assessment', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'No prior Sanskrit knowledge required',
      'Basic Hindi understanding helpful',
      'Commitment to 3-4 hours per week'
    ],
    whatYouWillLearn: [
      'Read and write Sanskrit script',
      'Master basic grammar rules',
      'Build essential vocabulary',
      'Engage in simple conversations',
      'Understand cultural significance'
    ],
    instructorBio: 'Dr. Priya Sharma is a Sanskrit scholar with 15 years of teaching experience and has authored several books on Sanskrit learning.',
    image: '/images/courses/sanskrit-beginner.jpg',
    videoPreview: '/videos/courses/sanskrit-beginner-preview.mp4'
  },
  'sanskrit-conversation': {
    id: 'sanskrit-conversation',
    title: 'संस्कृत संभाषण: Speak Sanskrit Without Grammar: Level-1',
    subtitle: 'Natural Sanskrit Speaking',
    description: 'Learn to speak Sanskrit naturally without getting bogged down by complex grammar rules. Focus on practical conversation skills and real-world usage.',
    longDescription: 'This innovative approach teaches Sanskrit conversation through immersion and practical usage, similar to how children learn their native language. No complex grammar rules to memorize!',
    type: 'Premium Course',
    status: 'available',
    price: '₹399',
    originalPrice: '₹599',
    duration: '4-6 weeks',
    level: 'Beginner',
    language: 'Hindi',
    instructor: 'Prof. Amit Kumar',
    rating: 4.7,
    studentsCount: 1800,
    lastUpdated: '2024-01-12',
    features: ['Conversational Sanskrit', 'Practical Usage', 'Audio Lessons', 'Speaking Practice'],
    curriculum: [
      { week: 1, title: 'Basic Greetings & Introductions', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'Daily Activities & Routines', lessons: 5, duration: '2.5 hours' },
      { week: 3, title: 'Food & Dining Conversations', lessons: 4, duration: '2 hours' },
      { week: 4, title: 'Shopping & Market Talk', lessons: 5, duration: '2.5 hours' },
      { week: 5, title: 'Travel & Directions', lessons: 4, duration: '2 hours' },
      { week: 6, title: 'Final Conversation Practice', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'No prior Sanskrit knowledge required',
      'Basic Hindi understanding helpful',
      'Commitment to 2-3 hours per week'
    ],
    whatYouWillLearn: [
      'Speak Sanskrit naturally',
      'Master common phrases',
      'Build conversational confidence',
      'Understand cultural context',
      'Apply in real situations'
    ],
    instructorBio: 'Prof. Amit Kumar specializes in language acquisition and has developed innovative methods for teaching Sanskrit conversation.',
    image: '/images/courses/sanskrit-conversation.jpg',
    videoPreview: '/videos/courses/sanskrit-conversation-preview.mp4'
  },
  'advaita-vedanta': {
    id: 'advaita-vedanta',
    title: 'Advaita Vedanta Darshan: दृग दृश्य विवेक द्वारा अद्वैत की व्याख्या',
    subtitle: 'Non-Dual Philosophy Through Drig Drishya Viveka',
    description: 'Deep exploration of non-dual philosophy through the lens of Drig Drishya Viveka. Understand the nature of reality and consciousness through ancient wisdom.',
    longDescription: 'This advanced course explores the profound teachings of Advaita Vedanta through the classical text Drig Drishya Viveka, which distinguishes between the seer and the seen.',
    type: 'Premium Course',
    status: 'available',
    price: '₹1,999',
    originalPrice: '₹2,999',
    duration: '8-10 weeks',
    level: 'Advanced',
    language: 'Hindi',
    instructor: 'Swami Vedantacharya',
    rating: 4.9,
    studentsCount: 850,
    lastUpdated: '2024-01-08',
    features: ['Non-Dual Philosophy', 'Text Study', 'Meditation Practices', 'Spiritual Insights'],
    curriculum: [
      { week: 1, title: 'Introduction to Advaita Vedanta', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'Drig Drishya Viveka - Overview', lessons: 5, duration: '2.5 hours' },
      { week: 3, title: 'The Seer and the Seen', lessons: 6, duration: '3 hours' },
      { week: 4, title: 'Nature of Consciousness', lessons: 5, duration: '2.5 hours' },
      { week: 5, title: 'Maya and Illusion', lessons: 6, duration: '3 hours' },
      { week: 6, title: 'Self-Realization', lessons: 5, duration: '2.5 hours' },
      { week: 7, title: 'Practical Applications', lessons: 4, duration: '2 hours' },
      { week: 8, title: 'Integration & Practice', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'Basic understanding of Indian philosophy',
      'Open mind to spiritual concepts',
      'Commitment to meditation practice'
    ],
    whatYouWillLearn: [
      'Understand non-dual philosophy',
      'Distinguish between seer and seen',
      'Explore nature of consciousness',
      'Practice self-inquiry techniques',
      'Apply wisdom to daily life'
    ],
    instructorBio: 'Swami Vedantacharya is a renowned Advaita scholar with 30 years of teaching experience and deep realization of non-dual truth.',
    image: '/images/courses/advaita-vedanta.jpg',
    videoPreview: '/videos/courses/advaita-vedanta-preview.mp4'
  },
  'kashmir-shaivism': {
    id: 'kashmir-shaivism',
    title: 'कश्मीरी शैव दर्शन – अनंत सत्य की खोज',
    subtitle: 'Journey into Kashmiri Shaivism',
    description: 'Journey into the profound depths of Kashmiri Shaivism and the search for infinite truth. Explore consciousness, energy, and the nature of reality.',
    longDescription: 'This advanced course explores the sophisticated philosophy of Kashmiri Shaivism, including the teachings of Abhinavagupta and the recognition of consciousness as the fundamental reality.',
    type: 'Premium Course',
    status: 'available',
    price: '₹1,999',
    originalPrice: '₹2,999',
    duration: '10-12 weeks',
    level: 'Advanced',
    language: 'Hindi',
    instructor: 'Dr. Ananda Sharma',
    rating: 4.8,
    studentsCount: 650,
    lastUpdated: '2024-01-05',
    features: ['Tantric Philosophy', 'Consciousness Studies', 'Spiritual Practices', 'Advanced Concepts'],
    curriculum: [
      { week: 1, title: 'Introduction to Kashmiri Shaivism', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'The 36 Tattvas', lessons: 6, duration: '3 hours' },
      { week: 3, title: 'Spanda - The Divine Vibration', lessons: 5, duration: '2.5 hours' },
      { week: 4, title: 'Pratyabhijna - Recognition', lessons: 6, duration: '3 hours' },
      { week: 5, title: 'Abhinavagupta\'s Teachings', lessons: 5, duration: '2.5 hours' },
      { week: 6, title: 'Consciousness and Energy', lessons: 6, duration: '3 hours' },
      { week: 7, title: 'Tantric Practices', lessons: 5, duration: '2.5 hours' },
      { week: 8, title: 'Meditation Techniques', lessons: 4, duration: '2 hours' },
      { week: 9, title: 'Integration of Philosophy', lessons: 5, duration: '2.5 hours' },
      { week: 10, title: 'Modern Applications', lessons: 4, duration: '2 hours' }
    ],
    requirements: [
      'Advanced understanding of Indian philosophy',
      'Experience with meditation practices',
      'Open mind to tantric concepts'
    ],
    whatYouWillLearn: [
      'Understand Kashmiri Shaivism philosophy',
      'Explore consciousness and energy',
      'Learn tantric practices',
      'Master recognition techniques',
      'Apply to spiritual development'
    ],
    instructorBio: 'Dr. Ananda Sharma is a leading scholar of Kashmiri Shaivism with 25 years of research and teaching experience.',
    image: '/images/courses/kashmir-shaivism.jpg',
    videoPreview: '/videos/courses/kashmir-shaivism-preview.mp4'
  },
  'prashna-upanishad': {
    id: 'prashna-upanishad',
    title: 'प्रश्न उपनिषद्: Online Course on The Prashna Upanishad',
    subtitle: 'Deep Study of the Prashna Upanishad',
    description: 'Deep study of the Prashna Upanishad with question-answer format exploration. Discover the profound wisdom through systematic inquiry.',
    longDescription: 'This course provides a comprehensive study of the Prashna Upanishad, one of the most important Upanishads that uses a question-answer format to explore fundamental questions about existence.',
    type: 'Premium Course',
    status: 'available',
    price: '₹1,499',
    originalPrice: '₹2,199',
    duration: '6-8 weeks',
    level: 'Intermediate',
    language: 'Hindi',
    instructor: 'Dr. Suresh Joshi',
    rating: 4.7,
    studentsCount: 1200,
    lastUpdated: '2024-01-14',
    features: ['Text Study', 'Question-Answer Format', 'Meditation Practices', 'Spiritual Insights'],
    curriculum: [
      { week: 1, title: 'Introduction to Prashna Upanishad', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'First Question - Origin of Life', lessons: 5, duration: '2.5 hours' },
      { week: 3, title: 'Second Question - Devas and Senses', lessons: 5, duration: '2.5 hours' },
      { week: 4, title: 'Third Question - Prana and Life Force', lessons: 6, duration: '3 hours' },
      { week: 5, title: 'Fourth Question - Sleep and Dreams', lessons: 5, duration: '2.5 hours' },
      { week: 6, title: 'Fifth Question - Om and Meditation', lessons: 6, duration: '3 hours' },
      { week: 7, title: 'Sixth Question - Purusha and Supreme Being', lessons: 5, duration: '2.5 hours' },
      { week: 8, title: 'Integration and Practice', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'Basic understanding of Upanishads',
      'Interest in philosophical inquiry',
      'Commitment to meditation practice'
    ],
    whatYouWillLearn: [
      'Understand Upanishadic wisdom',
      'Explore fundamental questions',
      'Learn meditation techniques',
      'Develop philosophical insight',
      'Apply wisdom to daily life'
    ],
    instructorBio: 'Dr. Suresh Joshi is a renowned Upanishadic scholar with 20 years of teaching experience and deep understanding of Vedic wisdom.',
    image: '/images/courses/prashna-upanishad.jpg',
    videoPreview: '/videos/courses/prashna-upanishad-preview.mp4'
  },
  'isha-upanishad': {
    id: 'isha-upanishad',
    title: 'ईशावास्य उपनिषद्: Online Course on The Isha Upanishad',
    subtitle: 'Introduction to Upanishadic Wisdom',
    description: 'Introduction to Upanishadic wisdom through the Isha Upanishad. Learn the fundamental principles of Vedantic philosophy.',
    longDescription: 'The Isha Upanishad is one of the shortest yet most profound Upanishads. This course provides a comprehensive introduction to its teachings and their practical applications.',
    type: 'Premium Course',
    status: 'available',
    price: '₹999',
    originalPrice: '₹1,499',
    duration: '4-6 weeks',
    level: 'Beginner',
    language: 'Hindi',
    instructor: 'Dr. Meera Patel',
    rating: 4.6,
    studentsCount: 1500,
    lastUpdated: '2024-01-16',
    features: ['Upanishadic Wisdom', 'Chanting Practice', 'Philosophical Discussion', 'Practical Application'],
    curriculum: [
      { week: 1, title: 'Introduction to Isha Upanishad', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'The Divine in All', lessons: 5, duration: '2.5 hours' },
      { week: 3, title: 'Action and Renunciation', lessons: 5, duration: '2.5 hours' },
      { week: 4, title: 'The Path of Knowledge', lessons: 6, duration: '3 hours' },
      { week: 5, title: 'Integration and Practice', lessons: 4, duration: '2 hours' },
      { week: 6, title: 'Final Reflection', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'No prior Upanishadic knowledge required',
      'Open mind to spiritual concepts',
      'Interest in philosophical inquiry'
    ],
    whatYouWillLearn: [
      'Understand Upanishadic philosophy',
      'Learn fundamental principles',
      'Practice chanting techniques',
      'Develop spiritual insight',
      'Apply wisdom practically'
    ],
    instructorBio: 'Dr. Meera Patel is a dedicated teacher of Upanishadic wisdom with 15 years of experience in making ancient texts accessible.',
    image: '/images/courses/isha-upanishad.jpg',
    videoPreview: '/videos/courses/isha-upanishad-preview.mp4'
  },
  'nyaya-darshan': {
    id: 'nyaya-darshan',
    title: 'न्याय दर्शन: The Art of Perception: Nyaya Darshan',
    subtitle: 'Master Logical Reasoning and Debate',
    description: 'Master the art of logical reasoning and systematic debate through Nyaya philosophy. Develop critical thinking and analytical skills.',
    longDescription: 'Nyaya Darshan is one of the six classical schools of Indian philosophy, focusing on logic, epistemology, and systematic reasoning. Learn to think clearly and argue effectively.',
    type: 'Premium Course',
    status: 'available',
    price: '₹999',
    originalPrice: '₹1,499',
    duration: '6-8 weeks',
    level: 'Intermediate',
    language: 'Hindi',
    instructor: 'Dr. Vikram Singh',
    rating: 4.5,
    studentsCount: 900,
    lastUpdated: '2024-01-18',
    features: ['Logical Reasoning', 'Debate Techniques', 'Fallacy Recognition', 'Valid Inference'],
    curriculum: [
      { week: 1, title: 'Introduction to Nyaya Philosophy', lessons: 4, duration: '2 hours' },
      { week: 2, title: 'The 16 Categories (Padarthas)', lessons: 6, duration: '3 hours' },
      { week: 3, title: 'Sources of Knowledge (Pramanas)', lessons: 5, duration: '2.5 hours' },
      { week: 4, title: 'Logic and Inference', lessons: 6, duration: '3 hours' },
      { week: 5, title: 'Debate and Discussion', lessons: 5, duration: '2.5 hours' },
      { week: 6, title: 'Fallacies and Errors', lessons: 6, duration: '3 hours' },
      { week: 7, title: 'Practical Applications', lessons: 4, duration: '2 hours' },
      { week: 8, title: 'Final Assessment', lessons: 3, duration: '1.5 hours' }
    ],
    requirements: [
      'Basic understanding of logic',
      'Interest in philosophical reasoning',
      'Commitment to critical thinking'
    ],
    whatYouWillLearn: [
      'Master logical reasoning',
      'Develop debate skills',
      'Recognize logical fallacies',
      'Build valid arguments',
      'Apply to real-world problems'
    ],
    instructorBio: 'Dr. Vikram Singh is a professor of Indian philosophy with expertise in Nyaya and logical reasoning.',
    image: '/images/courses/nyaya-darshan.jpg',
    videoPreview: '/videos/courses/nyaya-darshan-preview.mp4'
  }
}

export default function CoursePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
    if (slug && courseData[slug]) {
      setCourse(courseData[slug])
      setLoading(false)
    } else if (slug) {
      setLoading(false)
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    notFound()
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: FileText },
    { id: 'instructor', label: 'Instructor', icon: User },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <MotionWrapper>
            <StaggerContainer>
              <StaggerItem>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium mb-4">
                    <Crown className="w-4 h-4 mr-2" />
                    {course.type}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                    {course.title}
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
                    {course.subtitle}
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.studentsCount.toLocaleString()} students
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {course.rating} rating
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" />
                      {course.language}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </MotionWrapper>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image/Video */}
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-16 h-16 text-orange-500" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                  Course Preview
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab.id
                          ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">About This Course</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                    {course.description}
                  </p>
                  
                  {course.longDescription && (
                    <div className="mb-8">
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {showFullDescription ? course.longDescription : course.longDescription.substring(0, 300) + '...'}
                      </p>
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        {showFullDescription ? 'Show Less' : 'Read More'}
                      </button>
                    </div>
                  )}

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">What You'll Learn</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {course.whatYouWillLearn.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">Course Requirements</h4>
                    <ul className="space-y-2">
                      {course.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <ArrowRight className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                  <div className="space-y-4">
                    {course.curriculum.map((week: any, index: number) => (
                      <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            Week {week.week}: {week.title}
                          </h4>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {week.duration}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {week.lessons} lessons
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Meet Your Instructor</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {course.instructor}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        {course.instructorBio}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">Student Reviews</h3>
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-300">
                      Reviews will be displayed here once students complete the course.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Pricing Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-lg text-slate-500 line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    One-time payment • Lifetime access
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <CTAButton.Enroll courseId={course.id} className="w-full" />
                  <CTAButton.Syllabus courseId={course.id} className="w-full" />
                  <CTAButton.Wishlist courseId={course.id} className="w-full" />
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                    This course includes:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {course.curriculum.reduce((total: number, week: any) => total + week.lessons, 0)} video lessons
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-slate-600 dark:text-slate-300">
                        Lifetime access
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-slate-600 dark:text-slate-300">
                        Certificate of completion
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-slate-600 dark:text-slate-300">
                        Mobile and desktop access
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Course Stats */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Course Statistics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Students</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {course.studentsCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Level</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Language</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {course.language}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Updated</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {new Date(course.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
