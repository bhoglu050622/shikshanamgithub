'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  User,
  HelpCircle,
  Book,
  Plus,
  Minus,
  Languages,
  PenTool,
  Mic,
  Volume2,
  Award,
  Infinity,
  Globe,
  FileText,
  MessageCircle
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import RobustImage from '@/components/optimization/RobustImage'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Sanskrit Language theme
const packageData = {
  id: 'sanskrit-basics-to-conversation',
  title: 'संस्कृत भाषा यात्रा',
  englishTitle: 'Sanskrit: From Sacred Script to Living Conversation',
  subtitle: 'Awaken the Language of the Divine',
  description: 'Journey through the sacred language that has carried wisdom across millennia. From learning the divine Devanagari script to engaging in meaningful conversations, experience Sanskrit not just as ancient text, but as a living, breathing expression of consciousness.',
  originalPrice: '₹4,999',
  currentPrice: '₹2,898',
  savings: '₹2,101',
  savingsPercent: '42%',
  duration: '12-15 weeks',
  level: 'Beginner to Intermediate',
  rating: 4.9,
  students: 1250,
  status: 'available',
  category: 'Sacred Language',
  instructor: 'Sanskrit Acharyas',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Languages,
      title: 'Devanagari Mastery',
      subtitle: 'Script of the Gods',
      description: 'Learn the sacred alphabet—each letter a vibration, each word a sacred sound'
    },
    {
      icon: PenTool,
      title: 'Grammar Foundation',
      subtitle: 'Cosmic Structure',
      description: 'Understand the perfect grammar that mirrors the order of the universe'
    },
    {
      icon: MessageCircle,
      title: 'Living Conversations',
      subtitle: 'Speaking Wisdom',
      description: 'Engage in meaningful dialogue—Sanskrit as a living language of connection'
    },
    {
      icon: Book,
      title: 'Cultural Heritage',
      subtitle: 'Timeless Wisdom',
      description: 'Access the vast treasury of Vedic knowledge, philosophy, and sacred texts'
    }
  ],
  
  includes: [
    '50+ Language Transmissions (HD)',
    'Audio Pronunciation Guides',
    'Devanagari Writing Practice',
    'Grammar Workbooks',
    'Vocabulary Building Tools (1000+ words)',
    'Conversation Practice Sessions',
    'Cultural Context Lessons',
    'Sacred Text Readings',
    'Live Practice Sessions (Weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Language Community',
    'Progress Tracking',
    'Expert Guidance'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-2',
      title: 'Sacred Alphabet & Sounds',
      topics: ['Devanagari Script', 'Vowels & Consonants', 'Sacred Pronunciation', 'Writing Practice'],
      duration: '4 hours'
    },
    {
      week: 'Weeks 3-4',
      title: 'Grammar Foundations',
      topics: ['Noun Cases', 'Verb Forms', 'Sentence Structure', 'Basic Conjugation'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 5-8',
      title: 'Vocabulary & Cultural Context',
      topics: ['Daily Life Words', 'Philosophical Terms', 'Numbers & Time', 'Cultural Expressions'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 9-12',
      title: 'Conversation & Expression',
      topics: ['Greetings & Introductions', 'Daily Conversations', 'Expressing Ideas', 'Sacred Dialogues'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 13-15',
      title: 'Text Reading & Mastery',
      topics: ['Reading Simple Texts', 'Understanding Shlokas', 'Writing Practice', 'Cultural Integration'],
      duration: '6 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Priya Sharma',
      role: 'Technology Professional',
      rating: 5,
      text: 'Learning Sanskrit has transformed my connection to our heritage. The structured approach and cultural context make ancient wisdom accessible.',
      avatar: '/assets/testimonials/priya.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Educator',
      rating: 5,
      text: 'The journey from script to conversation is beautifully designed. I can now read and understand basic Sanskrit texts with confidence.',
      avatar: '/assets/testimonials/rajesh.jpg'
    },
    {
      name: 'Anita Singh',
      role: 'Student',
      rating: 5,
      text: 'The audio pronunciation guides are exceptional. Sanskrit is no longer intimidating but inviting—a language that sings.',
      avatar: '/assets/testimonials/anita.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'Why learn Sanskrit in the modern world?',
      answer: 'Sanskrit is the language of India\'s vast spiritual and philosophical heritage. Learning it provides direct access to original texts, deepens cultural connection, and offers insights into the structure of language itself. It\'s not just learning words—it\'s accessing millennia of wisdom.'
    },
    {
      question: 'Is Sanskrit difficult to learn?',
      answer: 'Sanskrit has systematic, logical grammar—in many ways clearer than modern languages. This course breaks it down progressively, making it accessible even to complete beginners. The key is consistent practice and patience.'
    },
    {
      question: 'How long until I can read texts?',
      answer: 'By week 8-10, you\'ll begin reading simple texts. By completion, you\'ll understand basic shlokas and can continue advancing independently. The foundation we build enables lifelong learning.'
    },
    {
      question: 'What about pronunciation?',
      answer: 'Correct pronunciation is essential in Sanskrit. We provide audio guides for every sound, practice sessions, and expert feedback. The phonetic precision of Sanskrit makes proper pronunciation achievable with guidance.'
    },
    {
      question: 'Can I really speak Sanskrit?',
      answer: 'Yes! While Sanskrit is often seen as only a written language, it\'s perfectly suited for conversation. We teach practical dialogue alongside classical study, helping you speak this timeless language.'
    }
  ],
  
  ctaText: 'Begin Sanskrit Journey',
  ctaLink: 'https://courses.shikshanam.in/single-checkout/6759989835c08b56e7365f1d?pid=p1',
  image: 'https://d502jbuhuh9wk.cloudfront.net/courses/6759989835c08b56e7365f1d/6759989835c08b56e7365f1d_scaled_cover.jpg?v=1'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Beginning',
    title: 'The Sacred Sounds Awaken',
    description: 'Enter the world of Devanagari—the script of the divine. Each letter is a sacred vibration waiting to be voiced.',
    milestone: 'Alphabet mastery'
  },
  {
    week: 'Weeks 1-4',
    title: 'Structure Reveals Itself',
    description: 'Discover Sanskrit\'s perfect grammar—a mirror of cosmic order. The rules are not restrictions but revelations.',
    milestone: 'Grammar foundation established'
  },
  {
    week: 'Weeks 5-8',
    title: 'Words Come Alive',
    description: 'Build your vocabulary not just as words, but as carriers of meaning, culture, and wisdom spanning thousands of years.',
    milestone: '1000+ words acquired'
  },
  {
    week: 'Weeks 9-12',
    title: 'The Language Speaks Through You',
    description: 'Begin conversations—simple greetings bloom into meaningful dialogue. Sanskrit is no longer ancient but present.',
    milestone: 'Conversational confidence'
  },
  {
    week: 'Weeks 13-15',
    title: 'Gateway to Wisdom Opens',
    description: 'Read your first shlokas, understand their meaning, feel their resonance. The vast library of Sanskrit wisdom welcomes you.',
    milestone: 'Text reading ability'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Languages,
    title: 'Sacred Geometry of Sound',
    concept: 'Devanagari Script',
    description: 'Each letter in Devanagari is precisely formed—the horizontal line (shirorekha) connects all letters like a thread connecting beads of sound.',
    symbolism: 'The script itself is a mandala—sacred geometry made visible, where each symbol carries both sound and meaning in perfect harmony'
  },
  {
    icon: Book,
    title: 'River of Wisdom',
    concept: 'Sanskrit Heritage',
    description: 'Like the Ganga flowing from the Himalayas, Sanskrit carries the pure waters of wisdom from ancient seers to modern seekers.',
    symbolism: 'Learning Sanskrit is like stepping into a river that has flowed for millennia, carrying treasures of knowledge to all who enter'
  },
  {
    icon: MessageCircle,
    title: 'Living Transmission',
    concept: 'Guru-Shishya Parampara',
    description: 'Sanskrit has always been transmitted through direct teaching—from teacher to student, mouth to ear, heart to heart.',
    symbolism: 'This course continues the ancient tradition—knowledge flowing as living sound, not dead information'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Languages,
    name: 'Om',
    sanskritName: 'ॐ',
    meaning: 'Primordial Sound',
    significance: 'The first sound, from which all language emerges—the vibration of existence itself made audible'
  },
  {
    icon: PenTool,
    name: 'Devanagari',
    sanskritName: 'देवनागरी',
    meaning: 'Script of the Gods',
    significance: 'The sacred alphabet—each letter a divine form, each word a mantra, each sentence a sacred utterance'
  },
  {
    icon: Book,
    name: 'Veda',
    sanskritName: 'वेद',
    meaning: 'Divine Knowledge',
    significance: 'The foundational texts in Sanskrit—not just books but the very breath of wisdom made word'
  },
  {
    icon: Mic,
    name: 'Shabda Brahman',
    sanskritName: 'शब्द ब्रह्मन्',
    meaning: 'Word as Ultimate Reality',
    significance: 'In Sanskrit philosophy, sound is sacred—language not describing reality but embodying it'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Disconnection',
    title: 'The Silent Heritage',
    description: 'You encounter Sanskrit in temples, texts, and traditions—but it remains silent, inaccessible. A vast treasury of wisdom locked behind unfamiliar symbols and sounds.'
  },
  {
    label: 'First Sounds',
    title: 'The Alphabet Awakens',
    description: 'You learn your first letters—अ, आ, इ, ई. Each sound resonates deeper than mere phonetics. These are sacred vibrations, and you\'re learning to voice the divine.'
  },
  {
    label: 'Understanding Dawns',
    title: 'Words Reveal Meaning',
    description: 'Grammar no longer intimidates—it illuminates. You recognize patterns, form sentences, understand texts. Sanskrit is becoming your language, not just an ancient one.'
  },
  {
    label: 'Living Connection',
    title: 'The Heritage Speaks',
    description: 'You read a shloka and understand it. You greet someone in Sanskrit. You access texts directly, without translation. The heritage that was silent now speaks through you. You are the living bridge between past and present.'
  }
]

export default function SanskritPackagePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Learning Journeys', icon: Star },
    { id: 'faq', label: 'Questions', icon: HelpCircle }
  ]

  return (
    <>
      {/* Enhanced Hero Section with Sanskrit Heritage Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-yellow-50 dark:from-orange-950 dark:via-amber-950/30 dark:to-yellow-950">
        {/* Sanskrit Script Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-orange-600 dark:text-orange-400" style={{ fontFamily: 'serif' }}>
            {['अ', 'आ', 'क', 'ख', 'ग', 'च', 'छ', 'ज', 'ट', 'प'].map((char, i) => (
              <HydrationSafeMotion
                key={i}
                className="absolute"
                style={{
                  left: `${(i * 10) % 90}%`,
                  top: `${(i * 15) % 80}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: 999999,
                  delay: i * 0.5
                }}
              >
                {char}
              </HydrationSafeMotion>
            ))}
          </div>
        </div>

        {/* Golden Glow Effects */}
        {[...Array(3)].map((_, i) => (
          <HydrationSafeMotion key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent)`,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 5 + i,
              repeat: 999999,
              delay: i
            }}>
              <div />
            </HydrationSafeMotion>
        ))}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(251, 191, 36, 0.5)',
                        '0 0 60px rgba(251, 191, 36, 0.8)',
                        '0 0 20px rgba(251, 191, 36, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Languages className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 text-orange-900 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium border border-orange-200 dark:border-orange-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight" style={{ fontFamily: 'serif' }}>
                  <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
                    {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-orange-600 dark:text-orange-400 mb-4 font-medium italic">
                  {packageData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {packageData.description}
                </p>
              </StaggerItem>

              {/* Stats */}
              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-orange-200 dark:border-orange-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Sacred Rating</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-amber-200 dark:border-amber-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Fellow Learners</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.duration}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Journey Time</div>
                    </div>
                  </HydrationSafeMotion>
                </div>
              </StaggerItem>

              {/* Price */}
              <StaggerItem>
                <div className="bg-gradient-to-br from-white to-orange-50/50 dark:from-slate-800 dark:to-orange-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mt-1">
                        Sacred Offering: Save {packageData.savings} ({packageData.savingsPercent})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For Learners</div>
                      <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    href={packageData.ctaLink}
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Sanskrit Script Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Central Om Symbol */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 shadow-2xl flex items-center justify-center z-20 border-4 border-white/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        boxShadow: [
                          '0 0 40px rgba(251, 191, 36, 0.6)',
                          '0 0 80px rgba(251, 191, 36, 0.8)',
                          '0 0 40px rgba(251, 191, 36, 0.6)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="text-center text-white text-6xl" style={{ fontFamily: 'serif' }}>
                        ॐ
                      </div>
                    </HydrationSafeMotion>

                    {/* Image with Heritage Effects */}
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative group">
                      <RobustImage
                        src={packageData.image}
                        alt={packageData.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                        priority
                        fallbackSrc="https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-enhanced-shine" />
                      </div>
                    </div>

                    {/* Floating Sanskrit Letters */}
                    {['अ', 'क', 'प', 'म'].map((char, i) => {
                      const positions = [
                        '-top-4 -right-4',
                        '-top-4 -left-4',
                        '-bottom-4 -right-4',
                        '-bottom-4 -left-4'
                      ]
                      const gradients = [
                        'from-orange-500 to-amber-500',
                        'from-amber-500 to-yellow-500',
                        'from-yellow-500 to-orange-500',
                        'from-orange-500 via-amber-500 to-yellow-500'
                      ]
                      
                      return (
                        <HydrationSafeMotion
                          key={i}
                          className={`absolute ${positions[i]} w-16 h-16 bg-gradient-to-br ${gradients[i]} rounded-full flex items-center justify-center shadow-lg z-30`}
                          animate={{
                            y: [0, -15, 0],
                            rotate: [0, 360]
                          }}
                          transition={{
                            y: { duration: 3, repeat: 999999, ease: 'easeInOut', delay: i * 0.5 },
                            rotate: { duration: 20, repeat: 999999, ease: 'linear' }
                          }}
                        >
                          <span className="text-3xl text-white font-bold" style={{ fontFamily: 'serif' }}>
                            {char}
                          </span>
                        </HydrationSafeMotion>
                      )
                    })}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Philosophical Journey Timeline */}
      <PhilosophicalTimeline 
        steps={journeySteps}
        accentColor="#f59e0b"
        theme="warm"
      />

      {/* Visual Metaphors Section */}
      <VisualMetaphor 
        title="The Living Heritage"
        subtitle="Understanding Sanskrit through sacred metaphors of sound, script, and wisdom transmission"
        metaphors={metaphors}
        theme="warm"
      />

      {/* Language Skills Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-orange-50/20 to-amber-50/20 dark:from-slate-950 dark:via-orange-950/20 dark:to-amber-950/20">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Awaken the Divine Language
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master Sanskrit through a complete journey—from sacred script to living conversation
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-orange-500 to-orange-600',
                'from-amber-500 to-amber-600',
                'from-yellow-500 to-yellow-600',
                'from-orange-500 via-amber-500 to-yellow-500'
              ]
              
              return (
                <HydrationSafeMotion
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-800 dark:to-orange-900/10 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 dark:border-orange-800 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative">
                      <HydrationSafeMotion
                        className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </HydrationSafeMotion>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
                        {feature.title}
                      </h3>
                      <div className={`text-base font-semibold bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent mb-3 text-center`}>
                        {feature.subtitle}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm text-center">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </HydrationSafeMotion>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sacred Symbolism */}
      <SacredSymbol 
        title="Sacred Sounds of Sanskrit"
        subtitle="Each symbol embodies the living vibration of consciousness made audible"
        symbols={symbols}
        theme="warm"
      />

      {/* What's Included Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your Complete Sanskrit Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to master Sanskrit—from sacred script to meaningful conversation
            </p>
          </HydrationSafeMotion>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packageData.includes.map((item, index) => (
              <HydrationSafeMotion
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-800 dark:to-orange-900/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-200 dark:border-orange-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                      {item}
                    </h3>
                  </div>
                </div>
              </HydrationSafeMotion>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Story */}
      <ImmersiveStory 
        title="From Silence to Sacred Sound"
        introduction="Experience the transformation as ancient script becomes living language, and silent heritage finds voice through you"
        phases={storyPhases}
        conclusion="You are now the living bridge—Sanskrit speaks through you"
        theme="warm"
      />

      {/* Tabs Section - Following same pattern as previous packages */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50/20 dark:from-slate-900 dark:to-orange-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-700 border border-orange-200 dark:border-orange-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <HydrationSafeMotion
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Sanskrit is not merely an ancient language—it is the sacred tongue through which India's vast spiritual heritage has been transmitted for millennia. This comprehensive journey takes you from complete beginner to confident practitioner, capable of reading texts, engaging in conversation, and accessing the wisdom of the ages directly.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      We begin with Devanagari—the divine script where each letter is a sacred form, each word a vibration. You'll learn proper pronunciation (crucial in Sanskrit), master grammatical structures that reveal the language's logical perfection, and build vocabulary rooted in cultural context. By journey's end, you won't just know Sanskrit—you'll speak it, read it, and feel its resonance.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      This is language learning as spiritual practice—each sound a mantra, each sentence an invocation. You're not just acquiring communication skills; you're awakening a dormant heritage, becoming a living link in the chain of wisdom transmission that stretches back thousands of years.
                    </p>
                  </div>
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'curriculum' && (
              <HydrationSafeMotion
                key="curriculum"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="space-y-6">
                  {packageData.curriculum.map((module, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-orange-600 dark:text-orange-400 font-medium text-lg">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 bg-orange-50 dark:bg-orange-900/20 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-200">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'testimonials' && (
              <HydrationSafeMotion
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  {packageData.testimonials.map((testimonial, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3 pt-4 border-t border-orange-200 dark:border-orange-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-gray-100">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </HydrationSafeMotion>
            )}

            {activeTab === 'faq' && (
              <HydrationSafeMotion
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="space-y-4">
                  {packageData.faqs.map((faq, index) => (
                    <HydrationSafeMotion
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <HydrationSafeMotion
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-6 bg-orange-50 dark:bg-orange-900/10">
                              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </HydrationSafeMotion>
                        )}
                      </AnimatePresence>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </HydrationSafeMotion>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 relative overflow-hidden">
        {/* Sanskrit Characters Floating */}
        <div className="absolute inset-0 -z-10 opacity-10 text-white text-9xl font-bold" style={{ fontFamily: 'serif' }}>
          {['ॐ', 'श्री', 'स्वस्ति'].map((char, i) => (
            <HydrationSafeMotion
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 15}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: 999999,
                delay: i * 2
              }}
            >
              {char}
            </HydrationSafeMotion>
          ))}
        </div>
        
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <HydrationSafeMotion 
                    className="w-20 h-20 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(251, 191, 36, 0.6)',
                        '0 0 80px rgba(251, 191, 36, 0.8)',
                        '0 0 40px rgba(251, 191, 36, 0.6)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-5xl text-white" style={{ fontFamily: 'serif' }}>ॐ</span>
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Ready to Speak Sanskrit?
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your sacred journey. Learn the language of the gods. Speak the words that have carried wisdom for millennia. Namaste becomes more than a greeting—it becomes a living connection to timeless heritage.
                </p>
                
                <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      Sacred Investment:
                    </span>
                    <span className="font-bold text-4xl text-orange-700">
                      {packageData.savings}
                    </span>
                    <span className="text-gray-700 text-lg">
                      ({packageData.savingsPercent} offering)
                    </span>
                  </div>
                </HydrationSafeMotion>
                
                <div className="space-y-6">
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      href={packageData.ctaLink}
                      icon={<ArrowRight className="w-6 h-6" />}
                      className="bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 hover:from-orange-200 hover:via-amber-200 hover:to-yellow-200 text-orange-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
                    >
                      {packageData.ctaText}
                    </Button>
                  </HydrationSafeMotion>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
                    <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                      <Infinity className="w-5 h-5" />
                      <span className="font-medium">Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                      <Award className="w-5 h-5" />
                      <span className="font-medium">Traditional Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
                      <Languages className="w-5 h-5" />
                      <span className="font-medium">Living Heritage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </>
  )
}
