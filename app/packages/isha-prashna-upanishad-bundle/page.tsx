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
  Eye,
  Sun,
  Circle,
  Infinity,
  Award,
  Lightbulb,
  Heart,
  Brain
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Upanishad Bundle theme
const packageData = {
  id: 'isha-prashna-upanishad-bundle',
  title: 'ईशोपनिषद् + प्रश्नोपनिषद्',
  englishTitle: 'Twin Upanishads: Isha & Prashna',
  subtitle: 'Supreme Wisdom of Inner Reality',
  description: 'Journey through two profound Upanishads. Isha reveals the divine pervading all existence, teaching complete renunciation while enjoying the world. Prashna answers the fundamental questions of life through cosmic knowledge. Together, they illuminate the path from outer world to inner truth.',
  originalPrice: '₹2,999',
  currentPrice: '₹1,899',
  savings: '₹1,100',
  savingsPercent: '37%',
  duration: '6-8 weeks',
  level: 'Intermediate',
  rating: 4.8,
  students: 750,
  status: 'available',
  category: 'Upanishadic Wisdom',
  instructor: 'Vedanta Acharyas',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Sun,
      title: 'Isha Upanishad',
      subtitle: 'Divine Pervades All',
      description: 'Realize that the Supreme Lord pervades everything—renounce through knowledge, enjoy through detachment'
    },
    {
      icon: Lightbulb,
      title: 'Prashna Upanishad',
      subtitle: 'Cosmic Questions',
      description: 'Explore the fundamental questions—life force, consciousness, sleep, Om, and the path after death'
    },
    {
      icon: Eye,
      title: 'Self-Realization',
      subtitle: 'Know Thyself',
      description: 'Discover your true nature beyond body and mind—the immortal self, one with Brahman'
    },
    {
      icon: Infinity,
      title: 'Practical Wisdom',
      subtitle: 'Living Truth',
      description: 'Apply Upanishadic insights to modern life—working without attachment, living in awareness'
    }
  ],
  
  includes: [
    '20+ Wisdom Transmissions (HD)',
    'Isha Upanishad Verse-by-Verse',
    'Prashna Upanishad Complete Study',
    'Sanskrit Text with Translation',
    'Traditional Commentary',
    'Meditation & Contemplation Guides',
    'PDF Sacred Texts',
    'Live Satsang (Bi-weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Wisdom Community',
    'Expert Guidance',
    'Daily Contemplation Practices'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-3',
      title: 'Isha Upanishad: Divine Pervades',
      topics: ['Opening Invocation', 'Renunciation & Enjoyment', 'Knowledge & Ignorance', 'Vidya & Avidya'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 4-6',
      title: 'Prashna Upanishad: Six Questions',
      topics: ['Creation & Life Force', 'Pranas & Elements', 'Sleep & Consciousness', 'Om & Meditation'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 7-8',
      title: 'Integration & Realization',
      topics: ['Combined Wisdom', 'Practical Application', 'Meditation Practices', 'Living the Teaching'],
      duration: '6 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Meera Joshi',
      role: 'Vedanta Scholar',
      rating: 5,
      text: 'These two Upanishads complement each other beautifully. Isha provides the vision, Prashna provides the understanding. Together, they transform perception.',
      avatar: '/assets/testimonials/meera-joshi.jpg'
    },
    {
      name: 'Arjun Patel',
      role: 'Meditation Teacher',
      rating: 5,
      text: 'The teachings from these Upanishads have deepened my meditation practice immeasurably. The guidance on living with detachment while fully engaged is precious.',
      avatar: '/assets/testimonials/arjun-patel.jpg'
    },
    {
      name: 'Sunita Reddy',
      role: 'Spiritual Seeker',
      rating: 5,
      text: 'Studying these texts verse by verse, with traditional commentary, opened dimensions of understanding I never imagined. Life-changing wisdom.',
      avatar: '/assets/testimonials/sunita-reddy.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'What is special about Isha Upanishad?',
      answer: 'Isha is one of the shortest yet most profound Upanishads. In just 18 verses, it presents the complete teaching—how to see the divine in everything, renounce through knowledge, and act without attachment. Its opening verse is considered one of the most important in Vedanta.'
    },
    {
      question: 'What does Prashna Upanishad teach?',
      answer: 'Prashna means "question." This Upanishad presents six profound questions asked by disciples to their teacher—about creation, life force, mind, sleep, Om, and the supreme person. The answers provide deep cosmic understanding and meditation guidance.'
    },
    {
      question: 'Do I need Sanskrit knowledge?',
      answer: 'Sanskrit knowledge is helpful but not required. We provide Sanskrit text with word-by-word translation, making the original accessible while you learn. Understanding the original terms deepens comprehension significantly.'
    },
    {
      question: 'How do these Upanishads relate to each other?',
      answer: 'Isha teaches the vision of unity—seeing the divine everywhere. Prashna provides the understanding—explaining cosmic processes and meditation. Together, they offer both the what (ultimate reality) and the how (path to realization).'
    },
    {
      question: 'What practical transformation can I expect?',
      answer: 'You\'ll develop the capacity to see the sacred in the ordinary, work without anxiety, live without excessive attachment, and maintain awareness of your true nature as immortal consciousness. The wisdom becomes lived experience, not just philosophy.'
    }
  ],
  
  ctaText: 'Begin Upanishadic Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/Isha-and-Prashna-Upanishad-Bundle-67a5ed5fc49ef04ccf59925d',
  image: '/assets/isha-prashna-upanishad.jpg'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'Entering Sacred Ground',
    description: 'Approach the Upanishads with reverence and readiness. These are not ordinary texts but direct transmissions of supreme wisdom.',
    milestone: 'Sacred foundation prepared'
  },
  {
    week: 'Weeks 1-3',
    title: 'Isha: Seeing the Divine Everywhere',
    description: 'Learn to see the Lord pervading all—every atom, every being. Renounce through this vision, enjoy through this knowledge.',
    milestone: 'Divine vision cultivated'
  },
  {
    week: 'Weeks 4-6',
    title: 'Prashna: Understanding Cosmic Reality',
    description: 'Six profound questions receive illuminating answers. Understand life force, mind, sleep, Om—the architecture of existence revealed.',
    milestone: 'Cosmic understanding gained'
  },
  {
    week: 'Weeks 7-8',
    title: 'Living the Wisdom',
    description: 'Integrate both teachings. See the divine (Isha) while understanding the cosmic processes (Prashna). Wisdom becomes your lived reality.',
    milestone: 'Embodied realization'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Sun,
    title: 'The All-Pervading Light',
    concept: 'Ishavasyam (God-covered)',
    description: 'Like sunlight pervading space, the divine pervades all existence. Nothing exists apart from that supreme reality—this is Isha\'s teaching.',
    symbolism: 'The sun represents the one divine consciousness illuminating and pervading all of creation'
  },
  {
    icon: Lightbulb,
    title: 'Questions and Illumination',
    concept: 'Prashna (Questions)',
    description: 'Like a lamp illuminating darkness, proper questions asked to realized teachers reveal truth. Each question in Prashna opens new understanding.',
    symbolism: 'The lamp represents knowledge dispelling ignorance—questions as the wick, wisdom as the flame'
  },
  {
    icon: Circle,
    title: 'The Unbroken Wholeness',
    concept: 'Purnamadah Purnamidam',
    description: 'That is whole, this is whole. From wholeness comes wholeness—yet wholeness remains. The Upanishads reveal reality\'s complete, unbroken nature.',
    symbolism: 'The perfect circle represents the completeness of Brahman—nothing added, nothing subtracted, eternally whole'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Sun,
    name: 'Isha',
    sanskritName: 'ईश',
    meaning: 'The Lord',
    significance: 'The Supreme Reality pervading all existence—not separate from creation but dwelling within everything'
  },
  {
    icon: Lightbulb,
    name: 'Prana',
    sanskritName: 'प्राण',
    meaning: 'Life Force',
    significance: 'The vital energy connecting individual consciousness to cosmic consciousness—taught in detail in Prashna'
  },
  {
    icon: Circle,
    name: 'Om',
    sanskritName: 'ॐ',
    meaning: 'The Primordial Sound',
    significance: 'The sound-symbol of Brahman, central to Prashna\'s sixth question—gateway to supreme realization'
  },
  {
    icon: Infinity,
    name: 'Atman',
    sanskritName: 'आत्मन्',
    meaning: 'True Self',
    significance: 'Your essential nature—not the body-mind but pure, immortal consciousness, one with the supreme'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Seeking',
    title: 'The Quest for Meaning',
    description: 'You wonder: What is the purpose of life? Who am I really? What happens after death? These questions burn in your heart, seeking answers beyond ordinary knowledge.'
  },
  {
    label: 'Isha\'s Revelation',
    title: 'All is Divine',
    description: 'Isha Upanishad reveals the transformative vision—the divine is not distant but pervading everything. You learn to see the sacred in the mundane, to renounce through understanding rather than rejection. The world transforms from obstacle to manifestation of the divine.'
  },
  {
    label: 'Prashna\'s Answers',
    title: 'Cosmic Understanding',
    description: 'Through Prashna, your fundamental questions receive profound answers. You understand how life force connects you to the cosmos, how consciousness operates, why we sleep, what Om represents. The universe makes sense in a way it never did before.'
  },
  {
    label: 'Realization',
    title: 'Living as the Divine',
    description: 'You no longer merely believe the teachings—you see them, live them. The divine you read about in Isha is recognized in yourself and all beings. The cosmic processes Prashna described are experienced directly. You are the Upanishadic wisdom embodied.'
  }
]

export default function IshaPrashnaUpanishadBundlePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Realizations', icon: Star },
    { id: 'faq', label: 'Questions', icon: HelpCircle }
  ]

  return (
    <>
      {/* Enhanced Hero Section with Upanishadic Wisdom Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950 dark:via-yellow-950 to-orange-950">
        {/* Golden Light Rays */}
        <div className="absolute inset-0 -z-10">
          {[...Array(12)].map((_, i) => (
            <HydrationSafeMotion key={i}
              className="absolute top-1/2 left-1/2 w-2 h-full origin-top"
              style={{
                transform: `rotate(${i * 30}deg) translateX(-50%)`,
                background: 'linear-gradient(180deg, rgba(251,191,36,0.1) 0%, transparent 70%)'
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: 999999,
                delay: i * 0.25
              }}>
              <div />
            </HydrationSafeMotion>
          ))}

          {/* Central Glow */}
          <HydrationSafeMotion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-amber-300/20 via-yellow-300/20 to-orange-300/20 dark:from-amber-600/10 dark:via-yellow-600/10 dark:to-orange-600/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}>
              <div />
            </HydrationSafeMotion>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(251, 191, 36, 0.5)',
                        '0 0 60px rgba(251, 191, 36, 0.9)',
                        '0 0 20px rgba(251, 191, 36, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sun className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/40 dark:to-orange-900/40 text-amber-900 dark:text-amber-200 px-4 py-2 rounded-full text-sm font-medium border border-amber-200 dark:border-amber-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 dark:from-amber-400 dark:via-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                  {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-amber-600 dark:text-amber-400 mb-4 font-medium italic">
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
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-amber-200 dark:border-amber-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Sacred Rating</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-yellow-200 dark:border-yellow-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Fellow Seekers</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-orange-200 dark:border-orange-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
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
                <div className="bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-800 dark:to-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">
                        Sacred Offering: Save {packageData.savings} ({packageData.savingsPercent})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For Seekers</div>
                      <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    href={packageData.ctaLink}
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Upanishadic Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Central Sun - Divine Light */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 shadow-2xl flex items-center justify-center z-20 border-4 border-white/50"
                      animate={{
                        scale: [1, 1.15, 1],
                        boxShadow: [
                          '0 0 40px rgba(251, 191, 36, 0.6)',
                          '0 0 100px rgba(251, 191, 36, 1)',
                          '0 0 40px rgba(251, 191, 36, 0.6)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sun className="w-20 h-20 text-white" />
                    </HydrationSafeMotion>

                    {/* Radiating Circles */}
                    {[0, 1, 2, 3].map((ring) => (
                      <HydrationSafeMotion key={ring}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-400/20"
                        style={{
                          width: `${160 + ring * 70}px`,
                          height: `${160 + ring * 70}px`,
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 4,
                          repeat: 999999,
                          delay: ring * 0.3
                        }}>
              <div />
            </HydrationSafeMotion>
                    ))}

                    {/* Question Symbols from Prashna */}
                    {[
                      { icon: Sparkles, angle: 0 },
                      { icon: Brain, angle: 60 },
                      { icon: Eye, angle: 120 },
                      { icon: Circle, angle: 180 },
                      { icon: Heart, angle: 240 },
                      { icon: Lightbulb, angle: 300 }
                    ].map((item, i) => {
                      const Icon = item.icon
                      const rad = (item.angle * Math.PI) / 180
                      const radius = 180
                      const x = Math.cos(rad) * radius
                      const y = Math.sin(rad) * radius
                      
                      return (
                        <HydrationSafeMotion
                          key={i}
                          className="absolute top-1/2 left-1/2 z-30"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                          }}
                          animate={{
                            y: [0, -15, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: 999999,
                            delay: i * 0.5
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full shadow-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
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
        title="Upanishadic Illumination"
        subtitle="Understanding supreme wisdom through sacred metaphors of light, questions, and wholeness"
        metaphors={metaphors}
        theme="warm"
      />

      {/* Twin Upanishads Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-amber-50/20 to-yellow-50/20 dark:from-slate-950 dark:via-amber-950/20 dark:to-yellow-950/20">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Twin Upanishads, Complete Wisdom
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Isha provides the vision, Prashna provides the understanding—together revealing the path to self-realization
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-amber-500 to-amber-600',
                'from-yellow-500 to-yellow-600',
                'from-orange-500 to-orange-600',
                'from-amber-500 via-yellow-500 to-orange-500'
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
                  <div className="bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-800 dark:to-amber-900/10 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 dark:border-amber-800 relative overflow-hidden">
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
        title="Sacred Teachings of the Upanishads"
        subtitle="Each symbol embodies the supreme wisdom revealed in these ancient texts"
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
              Your Upanishadic Wisdom Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to study, understand, and realize the supreme teachings
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
                className="bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-800 dark:to-amber-900/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200 dark:border-amber-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="From Questions to Realization"
        introduction="Experience the transformation from seeking answers to becoming the answer—the journey from ignorance to supreme wisdom"
        phases={storyPhases}
        conclusion="You are That—Tat Tvam Asi"
        theme="warm"
      />

      {/* Tabs Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-amber-50/20 dark:from-slate-900 dark:to-amber-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-slate-700 border border-amber-200 dark:border-amber-800'
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
                <div className="bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      The Upanishads are the pinnacle of Vedic wisdom—śruti, divine revelation—containing the highest teachings on the nature of reality and self. This journey explores two complementary Upanishads: Isha (also called Ishavasyopanishad) and Prashna, each offering unique yet harmonious insights into ultimate truth.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Isha Upanishad, though brief (18 verses), is considered complete in itself. It teaches īśāvāsyam—all this is covered by the Lord—revealing how to see the divine in everything and live with perfect detachment while fully engaged. Prashna Upanishad presents six profound questions about creation, life force, mind, meditation, and the supreme—each answer revealing cosmic understanding.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      Through verse-by-verse study with traditional commentary, meditation practices, and contemplative exercises, these teachings become not just philosophy but lived realization. This is sacred study in the traditional manner—approaching ancient wisdom with reverence, patience, and transformative intent.
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
                      className="bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-amber-600 dark:text-amber-400 font-medium text-lg">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex-shrink-0" />
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
                      className="bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3 pt-4 border-t border-amber-200 dark:border-amber-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
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
                      className="bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-amber-500 flex-shrink-0" />
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
                            <div className="px-8 pb-6 bg-amber-50 dark:bg-amber-900/10">
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
      <section className="py-24 bg-gradient-to-br from-amber-900 via-yellow-900 to-orange-900 relative overflow-hidden">
        {/* Radiant Light Effect */}
        <div className="absolute inset-0 -z-10">
          <HydrationSafeMotion className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity
            }}>
              <div />
            </HydrationSafeMotion>
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
                    className="w-20 h-20 bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(251, 191, 36, 0.8)',
                        '0 0 100px rgba(251, 191, 36, 1)',
                        '0 0 40px rgba(251, 191, 36, 0.8)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sun className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Ready for Supreme Wisdom?
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your journey through these twin Upanishads. Discover the divine pervading all, understand cosmic reality, and realize your true nature as immortal consciousness.
                </p>
                
                    <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      Sacred Investment:
                    </span>
                    <span className="font-bold text-4xl text-amber-700">
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
                      className="bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 hover:from-amber-200 hover:via-yellow-200 hover:to-orange-200 text-amber-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Supreme Wisdom</span>
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
