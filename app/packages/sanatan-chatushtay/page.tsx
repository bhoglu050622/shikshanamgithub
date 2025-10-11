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
  Compass,
  Mountain,
  Leaf,
  Flame,
  Droplet,
  Wind,
  Scale,
  Infinity,
  Heart,
  Target,
  Award
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data with enhanced philosophical content
const packageData = {
  id: 'sanatan-chatushtay',
  title: 'सनातन चतुष्टय',
  englishTitle: 'The Four Pillars of Eternal Wisdom',
  subtitle: 'Journey Through Dharma, Artha, Kama, and Moksha',
  description: 'Embark on a transformative exploration of the four Purusharthas—the eternal goals of human existence. Experience the wisdom that has guided countless souls toward balance, prosperity, righteous desire, and ultimate liberation.',
  originalPrice: '₹4,999',
  currentPrice: '₹2,999',
  savings: '₹2,000',
  savingsPercent: '40%',
  duration: '12-15 weeks',
  level: 'Intermediate to Advanced',
  rating: 4.9,
  students: 950,
  status: 'available',
  category: 'Eternal Philosophy',
  instructor: 'Traditional Wisdom Keepers',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  // Enhanced Features with Four Pillars theme
  features: [
    {
      icon: Scale,
      title: 'Dharma - धर्म',
      subtitle: 'Righteous Living',
      description: 'Discover the path of righteousness and duty that brings harmony to life and society'
    },
    {
      icon: Target,
      title: 'Artha - अर्थ',
      subtitle: 'Prosperous Wealth',
      description: 'Learn the sacred art of generating and managing wealth with ethical principles'
    },
    {
      icon: Heart,
      title: 'Kama - काम',
      subtitle: 'Sacred Desires',
      description: 'Understand and fulfill desires in alignment with dharma and spiritual growth'
    },
    {
      icon: Infinity,
      title: 'Moksha - मोक्ष',
      subtitle: 'Ultimate Liberation',
      description: 'Experience the path to freedom from the cycle of birth and death'
    }
  ],
  
  includes: [
    '40+ Wisdom Transmissions (HD Video)',
    'Study of Four Purusharthas in Depth',
    'Classical Texts and Commentaries',
    'Practical Life Integration Methods',
    'Sacred Philosophy Workbooks',
    'Guided Contemplation Sessions',
    'Live Satsang (Bi-weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Community of Seekers',
    'Personal Progress Tracking',
    'Wisdom Keeper Guidance',
    'Daily Practice Routines',
    'Integration Workshops',
    'Transformation Support'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-3',
      title: 'Dharma - The Foundation',
      topics: ['Essence of Dharma', 'Svadharma & Samanya Dharma', 'Righteous Action', 'Living with Purpose'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 4-6',
      title: 'Artha - Sacred Prosperity',
      topics: ['Ethics of Wealth', 'Dharmic Prosperity', 'Resource Management', 'Abundance with Integrity'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 7-9',
      title: 'Kama - Righteous Desire',
      topics: ['Nature of Desire', 'Dharmic Fulfillment', 'Emotional Mastery', 'Sacred Relationships'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 10-12',
      title: 'Moksha - Path to Liberation',
      topics: ['Understanding Liberation', 'Spiritual Practices', 'Transcendence', 'Integration with Life'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 13-15',
      title: 'The Integrated Life',
      topics: ['Four Pillars in Harmony', 'Daily Living', 'Continuous Practice', 'Embodied Wisdom'],
      duration: '8 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Rajesh Verma',
      role: 'Philosophy Professor',
      rating: 5,
      text: 'This journey through the four Purusharthas transformed my understanding of life itself. The integration of ancient wisdom with practical application is remarkable.',
      avatar: '/assets/testimonials/rajesh-verma.jpg'
    },
    {
      name: 'Priya Singh',
      role: 'Spiritual Seeker',
      rating: 5,
      text: 'The depth of wisdom shared here is profound. I have found balance, purpose, and peace through understanding these eternal principles.',
      avatar: '/assets/testimonials/priya-singh.jpg'
    },
    {
      name: 'Dr. Amit Kumar',
      role: 'Sanatan Dharma Scholar',
      rating: 5,
      text: 'A complete framework for living a meaningful life. This course beautifully explains how the four goals work together harmoniously.',
      avatar: '/assets/testimonials/amit-kumar.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'What are the four Purusharthas in essence?',
      answer: 'The four Purusharthas—Dharma, Artha, Kama, and Moksha—represent the complete spectrum of human aspirations. Dharma guides righteous living, Artha ensures material wellbeing, Kama embraces sacred desires, and Moksha points toward ultimate liberation.'
    },
    {
      question: 'How do these four pillars work in harmony?',
      answer: 'Like the four directions creating sacred space, the Purusharthas support each other. Dharma provides the foundation, Artha supplies the means, Kama motivates action, and Moksha offers the ultimate direction—all working together for a balanced, fulfilling life.'
    },
    {
      question: 'Is this suitable for spiritual beginners?',
      answer: 'While this journey is designed for intermediate to advanced seekers, those with sincere dedication and some philosophical background will find the teachings accessible. The wisdom keepers guide you through progressive understanding.'
    },
    {
      question: 'What transformation can I expect?',
      answer: 'You will gain profound understanding of life\'s purpose, learn to balance worldly and spiritual aspirations, develop ethical approaches to prosperity and desire, and discover practical methods for spiritual liberation while living in the world.'
    },
    {
      question: 'How does this relate to modern life challenges?',
      answer: 'These eternal principles provide timeless wisdom for contemporary challenges. Learn to navigate career, relationships, purpose, and spirituality with the guidance of teachings that have illuminated paths for millennia.'
    }
  ],
  
  ctaText: 'Begin Sacred Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/--Exploring-Eternal-Philosophies-of-Hinduism-650a824be4b03b5745557827',
  image: '/assets/sanatan-chatushtay.jpg'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'Awakening to the Four Pillars',
    description: 'Begin your journey by understanding the framework that encompasses all of human life—from duty to liberation.',
    milestone: 'Clarity on life\'s purpose'
  },
  {
    week: 'Weeks 1-3',
    title: 'Dharma: Walking the Righteous Path',
    description: 'Immerse yourself in the principles of dharma. Learn to discern right action and live in harmony with cosmic order.',
    milestone: 'Ethical foundation established'
  },
  {
    week: 'Weeks 4-6',
    title: 'Artha: Sacred Prosperity',
    description: 'Explore the dharmic approach to wealth and success. Understand how prosperity serves higher purposes.',
    milestone: 'Ethical wealth principles mastered'
  },
  {
    week: 'Weeks 7-9',
    title: 'Kama: Desires in Divine Context',
    description: 'Transform your understanding of desire. Learn to fulfill aspirations while maintaining spiritual alignment.',
    milestone: 'Healthy relationship with desires'
  },
  {
    week: 'Weeks 10-15',
    title: 'Moksha: The Liberation Path',
    description: 'Journey toward ultimate freedom. Integrate all four pillars into a life of balance, purpose, and spiritual realization.',
    milestone: 'Complete integration achieved'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Compass,
    title: 'The Four Directions',
    concept: 'Dharma as North',
    description: 'Just as north guides all navigation, Dharma provides the unchanging reference point for all life decisions.',
    symbolism: 'The four cardinal directions represent the completeness and balance of the Purusharthas in human existence'
  },
  {
    icon: Mountain,
    title: 'The Sacred Mountain',
    concept: 'Moksha as Peak',
    description: 'Like climbing a mountain, the journey toward liberation requires all four supports—direction, resources, motivation, and the peak itself.',
    symbolism: 'Mount Meru in cosmic geography represents the axis of spiritual ascent'
  },
  {
    icon: Scale,
    title: 'The Cosmic Balance',
    concept: 'Harmony of Goals',
    description: 'The four Purusharthas maintain perfect equilibrium—neither worldly excess nor spiritual escapism, but integrated living.',
    symbolism: 'The scales represent the eternal balance between material and spiritual aspirations'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Scale,
    name: 'Dharma',
    sanskritName: 'धर्म',
    meaning: 'That which upholds',
    significance: 'Dharma holds society and individual life in order, like the law of gravity holds the cosmos'
  },
  {
    icon: Target,
    name: 'Artha',
    sanskritName: 'अर्थ',
    meaning: 'Purpose and means',
    significance: 'Artha represents both material resources and meaningful purpose in worldly existence'
  },
  {
    icon: Heart,
    name: 'Kama',
    sanskritName: 'काम',
    meaning: 'Sacred desire',
    significance: 'Kama is the life force that motivates action and creation when aligned with dharma'
  },
  {
    icon: Infinity,
    name: 'Moksha',
    sanskritName: 'मोक्ष',
    meaning: 'Ultimate freedom',
    significance: 'Moksha is liberation from all bondage, the supreme goal transcending all other pursuits'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Before',
    title: 'The Seeker\'s Question',
    description: 'You stand at life\'s crossroads, wondering: "What is the purpose of existence? How do I balance material needs with spiritual aspirations? Is there a framework that encompasses all of life?"'
  },
  {
    label: 'Discovery',
    title: 'The Ancient Wisdom Reveals',
    description: 'Through the teachings of sages, you discover the four Purusharthas—a complete map of human existence. Each pillar represents essential aspects of a fulfilled life, none contradicting the others.'
  },
  {
    label: 'Integration',
    title: 'Living the Wisdom',
    description: 'You learn to walk the path of dharma in daily choices, earn and use wealth ethically, fulfill desires without attachment, and maintain awareness of the ultimate goal—liberation.'
  },
  {
    label: 'Transformation',
    title: 'The Integrated Being',
    description: 'Your life transforms into a sacred dance—working in the world with purpose, enjoying life\'s pleasures mindfully, serving dharma naturally, and progressing steadily toward moksha. You become the embodiment of balance.'
  }
]

export default function SanatanChatushtayPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Wisdom Shared', icon: Star },
    { id: 'faq', label: 'Questions', icon: HelpCircle }
  ]

  return (
    <>
      {/* Enhanced Hero Section with Four Pillars Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50/30 to-emerald-50/30 dark:from-slate-900 dark:via-sky-900/10 dark:to-emerald-900/10">
        {/* Animated Background Ornaments - Four Directions */}
        <div className="absolute inset-0 -z-10">
          {/* North - Dharma */}
          <HydrationSafeMotion className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-sky-300/20 to-blue-300/20 dark:from-sky-500/10 dark:to-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut'
            }}>
              <div />
            </HydrationSafeMotion>
          {/* East - Artha */}
          <HydrationSafeMotion className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-yellow-300/20 dark:from-amber-500/10 dark:to-yellow-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 1
            }}>
              <div />
            </HydrationSafeMotion>
          {/* South - Kama */}
          <HydrationSafeMotion className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-rose-300/20 to-pink-300/20 dark:from-rose-500/10 dark:to-pink-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 2
            }}>
              <div />
            </HydrationSafeMotion>
          {/* West - Moksha */}
          <HydrationSafeMotion className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-violet-300/20 to-purple-300/20 dark:from-violet-500/10 dark:to-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 3
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
                    className="w-14 h-14 bg-gradient-to-br from-sky-500 via-emerald-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: 999999, ease: 'linear' }}
                  >
                    <Compass className="w-7 h-7 text-white" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-sky-100 via-emerald-100 to-amber-100 dark:from-sky-900/40 dark:via-emerald-900/40 dark:to-amber-900/40 text-sky-900 dark:text-sky-200 px-4 py-2 rounded-full text-sm font-medium border border-sky-200 dark:border-sky-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                  {packageData.title}
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-sky-600 via-emerald-600 to-amber-600 dark:from-sky-400 dark:via-emerald-400 dark:to-amber-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 font-medium italic">
                  {packageData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {packageData.description}
                </p>
              </StaggerItem>

              {/* Stats with Four Pillars Theme */}
              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
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
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.students.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Fellow Seekers</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.duration}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Journey Time</div>
                    </div>
                  </HydrationSafeMotion>
                </div>
              </StaggerItem>

              {/* Price with Sacred Investment Theme */}
              <StaggerItem>
                <div className="bg-gradient-to-br from-white to-sky-50/50 dark:from-slate-800 dark:to-sky-900/20 border-2 border-sky-200 dark:border-sky-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
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
                    className="w-full bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500 hover:from-sky-600 hover:via-emerald-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Four Pillars Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  {/* Central Circle representing Unity */}
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Central Core */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-white to-sky-100 dark:from-slate-700 dark:to-sky-900/50 rounded-full shadow-2xl border-4 border-sky-300 dark:border-sky-600 flex items-center justify-center z-10"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: 999999, ease: 'linear' }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-sky-700 dark:text-sky-300">चतुष्टय</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Four Pillars</div>
                        </div>
                    </HydrationSafeMotion>

                    {/* Four Pillars arranged in cardinal directions */}
                    {packageData.features.map((feature, index) => {
                      const Icon = feature.icon
                      const positions = [
                        'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', // North
                        'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', // East
                        'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', // South
                        'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2'  // West
                      ]
                      const gradients = [
                        'from-sky-500 to-blue-500',
                        'from-amber-500 to-yellow-500',
                        'from-rose-500 to-pink-500',
                        'from-violet-500 to-purple-500'
                      ]
                      
                      return (
                        <HydrationSafeMotion
                          key={index}
                          className={`absolute ${positions[index]} w-36`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className={`bg-gradient-to-br ${gradients[index]} p-4 rounded-2xl shadow-xl text-center`}>
                            <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                            <div className="text-white font-bold text-sm mb-1">{feature.title}</div>
                            <div className="text-white/80 text-xs">{feature.subtitle}</div>
                  </div>
                        </HydrationSafeMotion>
                      )
                    })}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full -z-10" xmlns="http://www.w3.org/2000/svg">
                      <line x1="50%" y1="0%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-sky-300 dark:text-sky-700" strokeDasharray="4 4" />
                      <line x1="100%" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-amber-300 dark:text-amber-700" strokeDasharray="4 4" />
                      <line x1="50%" y1="100%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-rose-300 dark:text-rose-700" strokeDasharray="4 4" />
                      <line x1="0%" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="2" className="text-violet-300 dark:text-violet-700" strokeDasharray="4 4" />
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
        accentColor="#0ea5e9"
        theme="balanced"
      />

      {/* Visual Metaphors Section */}
      <VisualMetaphor 
        title="Understanding Through Sacred Metaphors"
        subtitle="Ancient wisdom expressed through timeless symbols and cosmic patterns"
        metaphors={metaphors}
        theme="balanced"
      />

      {/* Four Pillars Deep Dive */}
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
              Embody the Four Pillars
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each pillar represents an essential dimension of human existence, working in harmony to create a complete, balanced life
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-sky-500 to-blue-500',
                'from-amber-500 to-yellow-500',
                'from-rose-500 to-pink-500',
                'from-violet-500 to-purple-500'
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
                  <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-600 relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {feature.title}
                </h3>
                      <div className={`text-lg font-semibold bg-gradient-to-r ${gradients[index]} bg-clip-text text-transparent mb-4`}>
                        {feature.subtitle}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
        title="Sacred Symbols of the Four Purusharthas"
        subtitle="Each symbol carries the essence and wisdom of its corresponding pillar"
        symbols={symbols}
        theme="balanced"
      />

      {/* What's Included Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50/30 dark:from-slate-800 dark:to-sky-900/10">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your Sacred Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to walk the path of the four Purusharthas and transform your life
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
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 via-emerald-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="Your Journey to Balance"
        introduction="Experience the transformation that awaits when you walk the path of the four Purusharthas—from seeker to embodied wisdom"
        phases={storyPhases}
        conclusion="Become a living expression of eternal dharma"
        theme="balanced"
      />

      {/* Tabs Section with Enhanced Content */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-500 via-emerald-500 to-amber-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
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
                <div className="bg-gradient-to-br from-white to-sky-50/30 dark:from-slate-800 dark:to-sky-900/10 border border-slate-200 dark:border-slate-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      This transformative journey explores the four Purusharthas—Dharma, Artha, Kama, and Moksha—the complete framework for human existence revealed in the eternal wisdom of Sanatan Dharma. These four pillars encompass every aspect of life, from righteous duty to ultimate liberation.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Like the four directions that complete sacred space, each Purushartha represents an essential dimension of human aspiration. Dharma provides the ethical foundation, Artha ensures material wellbeing, Kama embraces life\'s sacred desires, and Moksha points toward ultimate freedom. Together, they create a balanced approach to living—neither worldly excess nor spiritual escapism, but harmonious integration.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      Through classical texts, guided contemplation, and practical application, you will learn to embody these eternal principles in modern life. This is not merely intellectual study, but a complete transformation of understanding—how to live with purpose, prosper ethically, fulfill desires mindfully, and progress steadily toward liberation.
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
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-sky-600 dark:text-sky-400 font-medium text-lg">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full flex-shrink-0" />
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
                      className="bg-gradient-to-br from-white to-sky-50/30 dark:from-slate-800 dark:to-sky-900/10 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
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
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-sky-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-sky-500 flex-shrink-0" />
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
                            <div className="px-8 pb-6 bg-slate-50 dark:bg-slate-900/50">
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
      <section className="py-24 bg-gradient-to-br from-sky-900 via-emerald-900 to-amber-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <HydrationSafeMotion className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: 999999,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
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
                    className="w-20 h-20 bg-gradient-to-br from-sky-400 via-emerald-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: 999999, ease: 'linear' }}
                  >
                    <Compass className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Ready to Walk the Path?
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your sacred journey through the four Purusharthas. Transform your understanding of life\'s purpose and discover the eternal balance of Dharma, Artha, Kama, and Moksha.
                </p>
                
                    <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-emerald-50 to-amber-50 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      Sacred Investment:
                    </span>
                    <span className="font-bold text-4xl text-emerald-700">
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
                      className="bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 hover:from-sky-500 hover:via-emerald-500 hover:to-amber-500 text-gray-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <Users className="w-5 h-5" />
                      <span className="font-medium">Community of Seekers</span>
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
