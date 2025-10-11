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
  Brain,
  Eye,
  Infinity,
  Award,
  Calendar,
  Layers,
  Circle,
  Triangle,
  Hexagon
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import RobustImage from '@/components/optimization/RobustImage'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Complete Wisdom Bundle theme
const packageData = {
  id: 'sanskrit-darshan-upanishad-special',
  title: 'संस्कृत + दर्शन + उपनिषद्',
  englishTitle: 'The Complete Wisdom Trinity',
  subtitle: 'New Year Special: Three Sacred Streams United',
  description: 'Celebrate new beginnings with complete spiritual education. Unite three sacred streams—Sanskrit (the divine language), Darshanas (six classical philosophies), and Upanishads (supreme wisdom). This is not just learning; it is total transformation.',
  originalPrice: '₹8,999',
  currentPrice: '₹4,999',
  savings: '₹4,000',
  savingsPercent: '44%',
  duration: '16-20 weeks',
  level: 'Beginner to Advanced',
  rating: 4.9,
  students: 1850,
  status: 'available',
  category: 'Complete Wisdom Bundle',
  instructor: 'Council of Traditional Masters',
  language: 'Hindi, Sanskrit & English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Languages,
      title: 'Sanskrit Mastery',
      subtitle: 'Divine Language',
      description: 'Complete journey from Devanagari script to fluent reading and conversation'
    },
    {
      icon: Brain,
      title: 'Six Darshanas',
      subtitle: 'Complete Philosophy',
      description: 'Explore all six classical schools—Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta'
    },
    {
      icon: Eye,
      title: 'Upanishadic Wisdom',
      subtitle: 'Supreme Knowledge',
      description: 'Study major Upanishads—the pinnacle of spiritual wisdom and self-realization'
    },
    {
      icon: Infinity,
      title: 'Integrated Understanding',
      subtitle: 'Complete Trinity',
      description: 'Experience how language, philosophy, and supreme wisdom form one complete path'
    }
  ],
  
  includes: [
    '60+ Wisdom Transmissions (HD)',
    'Sanskrit Grammar & Vocabulary',
    'Six Darshanas Complete Study',
    'Major Upanishads with Commentary',
    'Cultural & Historical Context',
    'Text Analysis & Practice',
    'Integration Workshops',
    'PDF Sacred Materials',
    'Live Satsang (Weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Complete Wisdom Community',
    'Expert Guidance Panel',
    'Practice Workbooks',
    'New Year Bonus Content'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-4',
      title: 'Sanskrit Foundation',
      topics: ['Devanagari Mastery', 'Grammar Basics', 'Vocabulary Building', 'Reading Practice'],
      duration: '12 hours'
    },
    {
      week: 'Weeks 5-8',
      title: 'Sanskrit Intermediate',
      topics: ['Advanced Grammar', 'Complex Sentences', 'Text Reading', 'Conversation Practice'],
      duration: '12 hours'
    },
    {
      week: 'Weeks 9-12',
      title: 'Six Darshanas Exploration',
      topics: ['Nyaya & Vaisheshika', 'Samkhya & Yoga', 'Mimamsa & Vedanta', 'Integrated Understanding'],
      duration: '16 hours'
    },
    {
      week: 'Weeks 13-16',
      title: 'Upanishadic Wisdom',
      topics: ['Major Upanishads Study', 'Core Teachings', 'Meditation Practices', 'Self-Realization Path'],
      duration: '16 hours'
    },
    {
      week: 'Weeks 17-20',
      title: 'Integration & Mastery',
      topics: ['Trinity Integration', 'Practical Application', 'Advanced Topics', 'Complete Synthesis'],
      duration: '12 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      role: 'Sanskrit Scholar',
      rating: 5,
      text: 'This bundle is extraordinary! The integration of Sanskrit, Darshanas, and Upanishads creates a complete spiritual education rarely found today.',
      avatar: '/assets/testimonials/priya-sharma.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Spiritual Practitioner',
      rating: 5,
      text: 'Learning all three streams together reveals connections I never saw before. This is truly transformative education.',
      avatar: '/assets/testimonials/rajesh-kumar.jpg'
    },
    {
      name: 'Dr. Anjali Mehta',
      role: 'Philosophy Professor',
      rating: 5,
      text: 'The comprehensive approach is brilliant. Understanding Sanskrit while studying philosophy and wisdom texts creates deep, lasting comprehension.',
      avatar: '/assets/testimonials/anjali-mehta.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'Why combine these three subjects?',
      answer: 'Sanskrit is the language of wisdom, Darshanas are the systematic philosophies, and Upanishads are the supreme teachings. Together, they form a complete education—you learn the language to read texts directly, philosophy to understand systematically, and Upanishadic wisdom for ultimate realization.'
    },
    {
      question: 'Is this suitable for complete beginners?',
      answer: 'Yes! We start from absolute basics in Sanskrit and progressively build to advanced levels. The structure ensures everyone can follow, whether you\'re new to Sanskrit or philosophy.'
    },
    {
      question: 'How much time should I dedicate?',
      answer: 'Plan for 4-5 hours per week of dedicated study. The journey is 16-20 weeks, but you have lifetime access to learn at your pace and revisit any section.'
    },
    {
      question: 'What makes this a New Year special?',
      answer: 'The New Year is a time for new beginnings. This complete bundle marks a fresh start in your spiritual education—learning Sanskrit, understanding all major philosophies, and accessing supreme wisdom. It\'s the perfect foundation for transformation.'
    },
    {
      question: 'How are these three integrated?',
      answer: 'You learn Sanskrit first, enabling you to read original texts. As you study Darshanas, you encounter Sanskrit terminology naturally. When studying Upanishads, you apply both language skills and philosophical understanding—everything connects beautifully.'
    }
  ],
  
  ctaText: 'Begin Complete Journey',
  ctaLink: 'https://courses.shikshanam.in/single-checkout/65a12c60e4b05ac7edb4876c?pid=p1',
  image: 'https://d502jbuhuh9wk.cloudfront.net/courses/65a12c60e4b05ac7edb4876c/65a12c60e4b05ac7edb4876c_scaled_cover.jpg?v=10'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Beginning',
    title: 'The New Year Awakening',
    description: 'Mark this fresh beginning with complete spiritual education. Three sacred streams await—language, philosophy, wisdom.',
    milestone: 'Foundation established'
  },
  {
    week: 'Weeks 1-8',
    title: 'Sanskrit: The Divine Language',
    description: 'Master the sacred tongue—from alphabet to conversation. Sanskrit awakens, becoming your language for accessing wisdom.',
    milestone: 'Language proficiency achieved'
  },
  {
    week: 'Weeks 9-12',
    title: 'Darshanas: Six Ways of Seeing',
    description: 'Explore all six classical philosophies. Each Darshana offers unique perspective; together they provide complete understanding.',
    milestone: 'Philosophical foundation complete'
  },
  {
    week: 'Weeks 13-16',
    title: 'Upanishads: Supreme Wisdom',
    description: 'Enter the highest teachings. With Sanskrit skills and philosophical foundation, Upanishadic wisdom reveals itself directly.',
    milestone: 'Supreme wisdom accessed'
  },
  {
    week: 'Weeks 17-20',
    title: 'Integration: The Complete Being',
    description: 'All three streams unite. You speak Sanskrit, think philosophically, embody Upanishadic wisdom. Transformation is complete.',
    milestone: 'Total integration achieved'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Triangle,
    title: 'Sacred Trinity',
    concept: 'Three Streams, One Ocean',
    description: 'Like three rivers flowing to the same ocean, Sanskrit (language), Darshanas (philosophy), and Upanishads (wisdom) merge into complete understanding.',
    symbolism: 'The trinity represents completeness—thought, word, and wisdom united in one transformative education'
  },
  {
    icon: Circle,
    title: 'Complete Circle',
    concept: 'The Cycle of Knowledge',
    description: 'Sanskrit gives you access, philosophy gives you framework, Upanishads give you realization—completing the circle from ignorance to wisdom.',
    symbolism: 'The unbroken circle represents the complete path—no missing pieces, no gaps, total spiritual education'
  },
  {
    icon: Layers,
    title: 'Ascending Layers',
    concept: 'Building to Wisdom',
    description: 'Each layer supports the next—Sanskrit foundation enables philosophical study, which enables direct Upanishadic understanding.',
    symbolism: 'Like building a sacred temple, each level supports the pinnacle—the supreme wisdom of self-realization'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Languages,
    name: 'Sanskrit',
    sanskritName: 'संस्कृत',
    meaning: 'Perfectly Constructed',
    significance: 'The divine language—gateway to all wisdom texts, the sound-form of consciousness itself'
  },
  {
    icon: Hexagon,
    name: 'Shad Darshana',
    sanskritName: 'षड् दर्शन',
    meaning: 'Six Viewpoints',
    significance: 'The six classical philosophies—six angles of vision revealing the complete understanding of reality'
  },
  {
    icon: Eye,
    name: 'Upanishad',
    sanskritName: 'उपनिषद्',
    meaning: 'Sitting Near',
    significance: 'Supreme teachings transmitted in intimacy—the highest wisdom revealing your true nature'
  },
  {
    icon: Circle,
    name: 'Purna',
    sanskritName: 'पूर्ण',
    meaning: 'Completeness',
    significance: 'The state of totality—nothing missing, nothing lacking, perfect spiritual education'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Fragmentation',
    title: 'The Incomplete Journey',
    description: 'You\'ve studied pieces—a bit of philosophy here, some Sanskrit there, Upanishadic quotes without context. The treasure of wisdom remains fragmented, its power unrealized.'
  },
  {
    label: 'The New Beginning',
    title: 'Three Paths Converge',
    description: 'The New Year brings new possibility. You commit to complete education—Sanskrit for access, Darshanas for understanding, Upanishads for realization. The trinity begins.'
  },
  {
    label: 'Integration',
    title: 'Wisdom Flows Together',
    description: 'Sanskrit words reveal philosophical concepts. Philosophical frameworks illuminate Upanishadic teachings. Everything connects—language, thought, and supreme wisdom flowing as one stream.'
  },
  {
    label: 'Completion',
    title: 'The Transformed Being',
    description: 'You are no longer a casual student but a complete inheritor of tradition. You speak the divine language, think systematically through six philosophical lenses, and embody Upanishadic wisdom. The trinity is realized in you.'
  }
]

export default function SanskritDarshanUpanishadSpecialPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Transformations', icon: Star },
    { id: 'faq', label: 'Questions', icon: HelpCircle }
  ]

  return (
    <>
      {/* Enhanced Hero Section with Complete Trinity Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 dark:from-orange-950 dark:via-purple-950 to-blue-950">
        {/* Trinity Gradient Animation */}
        <div className="absolute inset-0 -z-10">
          {/* Three Colored Streams Converging */}
          <HydrationSafeMotion className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-orange-200/30 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut'
            }}>
              <div />
            </HydrationSafeMotion>
          <HydrationSafeMotion className="absolute top-0 left-1/3 w-1/3 h-full bg-gradient-to-br from-purple-200/30 to-transparent"
            animate={{
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 1.33
            }}>
              <div />
            </HydrationSafeMotion>
          <HydrationSafeMotion className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-blue-200/30 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 2.66
            }}>
              <div />
            </HydrationSafeMotion>
          
          {/* Geometric Patterns */}
          {[...Array(15)].map((_, i) => {
            const shapes = [Triangle, Circle, Hexagon]
            const Shape = shapes[i % 3]
            return (
              <HydrationSafeMotion
                key={i}
                className="absolute w-12 h-12 opacity-10"
                style={{
                  left: `${(i * 7) % 90}%`,
                  top: `${(i * 11) % 80}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 360],
                  opacity: [0.05, 0.15, 0.05]
                }}
                transition={{
                  duration: 6 + i,
                  repeat: 999999,
                  delay: i * 0.3
                }}
              >
                <Shape className="w-full h-full text-gray-600 dark:text-gray-400" />
              </HydrationSafeMotion>
            )
          })}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.5)',
                        '0 0 60px rgba(168, 85, 247, 0.8)',
                        '0 0 20px rgba(168, 85, 247, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Calendar className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-orange-100 via-purple-100 to-blue-100 dark:from-orange-900/40 dark:via-purple-900/40 dark:to-blue-900/40 text-purple-900 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight" style={{ fontFamily: 'serif' }}>
                  <span className="bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 dark:from-orange-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-orange-600 dark:from-purple-400 dark:via-blue-400 dark:to-orange-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-purple-600 dark:text-purple-400 mb-4 font-medium italic">
                  {packageData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {packageData.description}
                </p>
              </StaggerItem>

              {/* Stats with Trinity Theme */}
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
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Fellow Seekers</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-blue-200 dark:border-blue-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
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
                <div className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-800 dark:to-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 dark:from-orange-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mt-1">
                        New Year Offering: Save {packageData.savings} ({packageData.savingsPercent})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For All Levels</div>
                      <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    href={packageData.ctaLink}
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="w-full bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 hover:from-orange-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Trinity Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Center - Unity Point */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-purple-400 to-blue-400 shadow-2xl flex items-center justify-center z-20 border-4 border-white/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 40px rgba(168, 85, 247, 0.6)',
                          '0 0 80px rgba(168, 85, 247, 0.8)',
                          '0 0 40px rgba(168, 85, 247, 0.6)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="text-center text-white">
                        <Circle className="w-16 h-16 mx-auto mb-1" />
                        <div className="text-xs font-bold">Unity</div>
                      </div>
                    </HydrationSafeMotion>

                    {/* Image with Trinity Effects */}
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
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-enhanced-shine" />
                      </div>
                    </div>

                    {/* Three Trinity Points */}
                    {[
                      { icon: Languages, label: 'Sanskrit', color: 'from-orange-500 to-amber-500', angle: -90 },
                      { icon: Brain, label: 'Darshan', color: 'from-purple-500 to-indigo-500', angle: 150 },
                      { icon: Eye, label: 'Upanishad', color: 'from-blue-500 to-cyan-500', angle: 30 }
                    ].map((item, index) => {
                      const Icon = item.icon
                      const angle = (item.angle * Math.PI) / 180
                      const radius = 180
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      
                      return (
                        <HydrationSafeMotion
                          key={index}
                          className="absolute top-1/2 left-1/2 z-30"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: 999999,
                            delay: index * 0.7
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <div className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl shadow-xl text-center w-24`}>
                            <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                            <div className="text-xs text-white font-bold">{item.label}</div>
                          </div>
                        </HydrationSafeMotion>
                      )
                    })}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full -z-10" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="trinity-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.3 }} />
                          <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
                          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                        </linearGradient>
                      </defs>
                      <circle cx="50%" cy="50%" r="35%" fill="none" stroke="url(#trinity-gradient)" strokeWidth="2" strokeDasharray="5 5" />
                    </svg>
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
        accentColor="#a855f7"
        theme="cosmic"
      />

      {/* Visual Metaphors Section */}
      <VisualMetaphor 
        title="The Sacred Trinity United"
        subtitle="Understanding complete wisdom through the convergence of language, philosophy, and supreme knowledge"
        metaphors={metaphors}
        theme="cosmic"
      />

      {/* Trinity Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/20 to-blue-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Three Sacred Streams, One Complete Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Sanskrit provides access, Darshanas provide understanding, Upanishads provide realization
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-orange-500 to-amber-500',
                'from-purple-500 to-indigo-500',
                'from-blue-500 to-cyan-500',
                'from-orange-500 via-purple-500 to-blue-500'
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
                  <div className="bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800 dark:to-purple-900/10 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-800 relative overflow-hidden">
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
        title="Sacred Symbols of Complete Wisdom"
        subtitle="Each symbol represents one aspect of the trinity—together forming complete spiritual education"
        symbols={symbols}
        theme="cosmic"
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
              Your Complete Wisdom Bundle
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed for total transformation—from Sanskrit basics to supreme Upanishadic wisdom
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
                className="bg-gradient-to-br from-white to-purple-50/30 dark:from-slate-800 dark:to-purple-900/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="From Fragments to Wholeness"
        introduction="Experience the transformation from scattered knowledge to complete wisdom—when Sanskrit, philosophy, and supreme teachings unite in you"
        phases={storyPhases}
        conclusion="You are now complete—the trinity realized"
        theme="cosmic"
      />

      {/* Tabs Section - Following established pattern */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-slate-700 border border-purple-200 dark:border-purple-800'
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
                <div className="bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      This New Year special represents the most complete spiritual education available. By uniting three sacred streams—Sanskrit language, the six Darshanas (philosophical systems), and Upanishadic wisdom—you receive not fragmented knowledge but total, integrated understanding.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Sanskrit provides the key—you learn to read the original texts directly, without dependence on translations that often lose nuance. The six Darshanas (Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta) provide systematic frameworks for understanding reality from multiple perspectives. The Upanishads offer the highest wisdom—the direct teachings on self-realization and ultimate truth.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      This is not three separate courses but one integrated journey. As you learn Sanskrit, you encounter philosophical terms naturally. As you study philosophy, you access original Sanskrit texts. When you reach the Upanishads, language and philosophy unite to unlock supreme wisdom. The trinity becomes one complete path to transformation.
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
                      className="bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-purple-600 dark:text-purple-400 font-medium text-lg">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 bg-purple-50 dark:bg-purple-900/20 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 rounded-full flex-shrink-0" />
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
                      className="bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-purple-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3 pt-4 border-t border-purple-200 dark:border-purple-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center">
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
                      className="bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-purple-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-purple-500 flex-shrink-0" />
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
                            <div className="px-8 pb-6 bg-purple-50 dark:bg-purple-900/10">
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
      <section className="py-24 bg-gradient-to-br from-orange-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Trinity Particles */}
        <div className="absolute inset-0 -z-10">
          {[...Array(60)].map((_, i) => (
            <HydrationSafeMotion key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#f97316', '#a855f7', '#3b82f6'][i % 3]
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: 999999,
                delay: Math.random() * 3
              }}>
              <div />
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
                    className="w-20 h-20 bg-gradient-to-br from-orange-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(168, 85, 247, 0.6)',
                        '0 0 80px rgba(168, 85, 247, 0.8)',
                        '0 0 40px rgba(168, 85, 247, 0.6)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Calendar className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Begin Your Complete Journey
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  This New Year, gift yourself complete spiritual education. Sanskrit to access wisdom, Darshanas to understand systematically, Upanishads to realize truth. Three streams uniting in you.
                </p>
                
                <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-orange-100 via-purple-100 to-blue-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      New Year Offering:
                    </span>
                    <span className="font-bold text-4xl text-purple-700">
                      {packageData.savings}
                    </span>
                    <span className="text-gray-700 text-lg">
                      ({packageData.savingsPercent} special)
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
                      className="bg-gradient-to-r from-orange-100 via-purple-100 to-blue-100 hover:from-orange-200 hover:via-purple-200 hover:to-blue-200 text-purple-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <Circle className="w-5 h-5" />
                      <span className="font-medium">Complete Wisdom</span>
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
