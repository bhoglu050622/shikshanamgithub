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
  Brain,
  Eye,
  Infinity,
  Zap,
  Circle,
  Flame,
  Moon,
  Sun,
  Award,
  Triangle,
  Waves
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import RobustImage from '@/components/optimization/RobustImage'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Vedanta & Shaivism theme
const packageData = {
  id: 'vedanta-shaivism-bundle',
  title: 'वेदान्त और शैव दर्शन',
  englishTitle: 'Vedanta & Shaivism: Paths to Non-Dual Reality',
  subtitle: 'Two Rivers Flowing to the Same Ocean',
  description: 'Explore two magnificent paths to the ultimate truth. Vedanta reveals the non-dual nature of Brahman and Atman, while Shaivism unveils the cosmic dance of Shiva and Shakti. Though their approaches differ, both lead to the same realization—the unity of all existence.',
  originalPrice: '₹4,499',
  currentPrice: '₹2,999',
  savings: '₹1,500',
  savingsPercent: '33%',
  duration: '10-12 weeks',
  level: 'Advanced',
  rating: 4.9,
  students: 650,
  status: 'available',
  category: 'Non-Dual Philosophy',
  instructor: 'Advaita & Shaiva Masters',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Infinity,
      title: 'Advaita Vedanta',
      subtitle: 'Non-Dual Brahman',
      description: 'Realize the ultimate truth—you are Brahman, the infinite consciousness beyond all duality'
    },
    {
      icon: Flame,
      title: 'Kashmir Shaivism',
      subtitle: 'Conscious Universe',
      description: 'Experience reality as the vibrant play of Shiva\'s consciousness manifesting as creation'
    },
    {
      icon: Eye,
      title: 'Atman-Brahman Unity',
      subtitle: 'Self is Infinite',
      description: 'Discover the profound truth: "Tat Tvam Asi" - You are That, the self is Brahman'
    },
    {
      icon: Waves,
      title: 'Shiva-Shakti Dance',
      subtitle: 'Consciousness-Energy',
      description: 'Witness the cosmic dance where consciousness and energy are one reality in dynamic expression'
    }
  ],
  
  includes: [
    '45+ Wisdom Transmissions (HD)',
    'Vedantic Text Study (Upanishads)',
    'Shaivite Scripture Analysis',
    'Comparative Philosophy Sessions',
    'Meditation & Contemplation Guides',
    'Non-Dual Realization Practices',
    'PDF Sacred Texts',
    'Live Satsang (Bi-weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Wisdom Community',
    'Expert Guidance',
    'Integration Practices',
    'Advanced Meditation Techniques'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-3',
      title: 'Foundations of Vedanta',
      topics: ['Upanishadic Wisdom', 'Brahman & Atman', 'Maya & Reality', 'Three States of Consciousness'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 4-6',
      title: 'Kashmir Shaivism Introduction',
      topics: ['Shiva-Shakti Philosophy', '36 Tattvas', 'Spanda (Vibration)', 'Recognition School'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 7-9',
      title: 'Comparative Analysis',
      topics: ['Unity in Diversity', 'Non-Dual Approaches', 'Paths to Realization', 'Integration Methods'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 10-12',
      title: 'Living the Realization',
      topics: ['Combined Practices', 'Modern Application', 'Embodied Non-Duality', 'Final Synthesis'],
      duration: '8 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Meera Joshi',
      role: 'Philosophy Professor',
      rating: 5,
      text: 'This course beautifully bridges Vedanta and Shaivism, revealing their complementary paths to the same ultimate truth. Profoundly transformative.',
      avatar: '/assets/testimonials/meera-joshi.jpg'
    },
    {
      name: 'Arjun Patel',
      role: 'Spiritual Practitioner',
      rating: 5,
      text: 'The integration of these two great traditions has deepened my understanding immeasurably. The non-dual realization practices are exceptional.',
      avatar: '/assets/testimonials/arjun-patel.jpg'
    },
    {
      name: 'Dr. Sunita Reddy',
      role: 'Meditation Teacher',
      rating: 5,
      text: 'A unique perspective on non-dual philosophy. Understanding both paths enriches the journey to self-realization tremendously.',
      avatar: '/assets/testimonials/sunita-reddy.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'How do Vedanta and Shaivism differ?',
      answer: 'Vedanta emphasizes the static, unchanging nature of Brahman—pure being, consciousness, and bliss. Shaivism celebrates the dynamic aspect—consciousness as creative power (Shakti) in constant vibration (Spanda). Both recognize the non-dual reality, but from complementary perspectives.'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'This is an advanced journey requiring some philosophical background. We recommend familiarity with basic Indian philosophy or completing introductory courses first. The teachings demand contemplative maturity.'
    },
    {
      question: 'How are these traditions integrated?',
      answer: 'We explore each tradition deeply, then reveal their complementary nature. The static and dynamic, the silent and vibrant aspects of non-dual consciousness become a complete understanding when unified.'
    },
    {
      question: 'What texts will we study?',
      answer: 'We study key Upanishads (Isha, Kena, Mandukya), Advaita works of Shankara, and Shaivite texts including Shiva Sutras, Spanda Karikas, and Pratyabhijnahridayam, with expert commentary.'
    },
    {
      question: 'What are the practical applications?',
      answer: 'The course includes meditation practices from both traditions, methods for recognizing your true nature, techniques for abiding in non-dual awareness, and guidance for integrating this realization into daily life.'
    }
  ],
  
  ctaText: 'Begin Non-Dual Journey',
  ctaLink: 'https://courses.shikshanam.in/single-checkout/678b5ab8789de93b7ee832bd?pid=p1',
  image: 'https://d502jbuhuh9wk.cloudfront.net/courses/678b5ab8789de93b7ee832bd/678b5ab8789de93b7ee832bd_scaled_cover.jpg?v=2'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'The Great Question',
    description: 'What is the nature of ultimate reality? Who am I truly? Begin the profound journey into non-dual philosophy.',
    milestone: 'Understanding non-duality'
  },
  {
    week: 'Weeks 1-3',
    title: 'Vedanta: The Unchanging Brahman',
    description: 'Explore the Upanishadic revelation—Brahman is the only reality, eternal and unchanging. Atman (self) and Brahman are one.',
    milestone: 'Recognition of Brahman-Atman unity'
  },
  {
    week: 'Weeks 4-6',
    title: 'Shaivism: The Dancing Shiva',
    description: 'Discover consciousness as dynamic creative power. Reality is Shiva\'s cosmic dance, where consciousness and manifestation are inseparable.',
    milestone: 'Experience of Shiva-Shakti unity'
  },
  {
    week: 'Weeks 7-9',
    title: 'The Convergence',
    description: 'See how both paths point to the same moon. The static and dynamic are not contradictory but complementary aspects of non-dual reality.',
    milestone: 'Integrated understanding achieved'
  },
  {
    week: 'Weeks 10-12',
    title: 'Living as the Absolute',
    description: 'Embody the realization. Whether viewing reality as unchanging Brahman or vibrating Shiva-Shakti, live as the non-dual truth itself.',
    milestone: 'Stabilized non-dual awareness'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Sun,
    title: 'Ocean & Waves',
    concept: 'Brahman & Manifestation',
    description: 'Like waves arising from and dissolving back into the ocean, all phenomena emerge from and return to Brahman. The wave is never separate from the ocean.',
    symbolism: 'The ocean represents the unchanging substratum (Brahman), waves represent the ever-changing manifestation—yet both are the same water'
  },
  {
    icon: Flame,
    title: 'Fire & Radiance',
    concept: 'Shiva & Shakti',
    description: 'Like fire and its radiance, Shiva (consciousness) and Shakti (creative power) are inseparable. There is no fire without heat, no consciousness without expression.',
    symbolism: 'The eternal unity of the static and dynamic principles—consciousness and its creative manifestation as one reality'
  },
  {
    icon: Moon,
    title: 'Moon in Water',
    concept: 'Self-Realization',
    description: 'The moon reflected in many waters appears as many, yet remains one. Similarly, the one consciousness appears as many individuals.',
    symbolism: 'The apparent multiplicity of selves is like reflections—the reality is non-dual consciousness alone'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Infinity,
    name: 'Brahman',
    sanskritName: 'ब्रह्मन्',
    meaning: 'Infinite Reality',
    significance: 'The absolute, infinite consciousness—the unchanging ground of all existence, beyond all attributes yet the source of all'
  },
  {
    icon: Eye,
    name: 'Atman',
    sanskritName: 'आत्मन्',
    meaning: 'True Self',
    significance: 'Your essential nature—not the body-mind but pure consciousness itself, identical with Brahman'
  },
  {
    icon: Triangle,
    name: 'Trishula',
    sanskritName: 'त्रिशूल',
    meaning: 'Shiva\'s Trident',
    significance: 'The three powers of Shiva—will (iccha), knowledge (jnana), and action (kriya)—the triune expression of consciousness'
  },
  {
    icon: Waves,
    name: 'Spanda',
    sanskritName: 'स्पन्द',
    meaning: 'Divine Vibration',
    significance: 'The dynamic pulsation of consciousness—reality as the eternal throb of Shiva\'s creative awareness'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Separation',
    title: 'The Illusion of Multiplicity',
    description: 'You see yourself as separate—one individual among billions, a limited being in a vast universe. This fundamental misidentification is the source of all suffering.'
  },
  {
    label: 'Vedantic Awakening',
    title: 'Neti Neti—Not This, Not This',
    description: 'Through Vedanta, you begin negating what you are not. Not the body, not the mind, not thoughts, not emotions. What remains when all limitations are removed? Pure consciousness—Brahman—your true nature.'
  },
  {
    label: 'Shaivite Recognition',
    title: 'Pratyabhijna—Recognition of Self',
    description: 'Through Shaivism, you recognize that all of reality is your own consciousness playing. Not dead matter observed by consciousness, but consciousness itself appearing as the universe. You are Shiva dancing as Shakti.'
  },
  {
    label: 'Unity',
    title: 'Satchitananda—Being-Consciousness-Bliss',
    description: 'Whether you realize yourself as the unchanging Brahman or the dancing Shiva, the truth is the same—you are the non-dual reality. Not a limited self experiencing the infinite, but the infinite itself. Tat Tvam Asi—You are That.'
  }
]

export default function VedantaShaivismBundlePage() {
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
      {/* Enhanced Hero Section with Non-Dual Cosmic Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50/30 to-blue-50 dark:from-indigo-950 dark:via-purple-950/30 dark:to-blue-950">
        {/* Cosmic Background */}
        <div className="absolute inset-0 -z-10">
          {/* Cosmic Circles - Representing Oneness */}
          {[...Array(6)].map((_, i) => (
            <HydrationSafeMotion key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/20 dark:border-indigo-700/20"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 30 + i * 5, repeat: 999999, ease: 'linear' },
                scale: { duration: 4, repeat: 999999, ease: 'easeInOut' }
              }}>
              <div />
            </HydrationSafeMotion>
          ))}
          
          {/* Cosmic Particles */}
          {[...Array(20)].map((_, i) => (
            <HydrationSafeMotion key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: 999999,
                delay: Math.random() * 5,
                ease: 'easeInOut'
              }}>
              <div />
            </HydrationSafeMotion>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(99, 102, 241, 0.5)',
                        '0 0 60px rgba(99, 102, 241, 0.8)',
                        '0 0 20px rgba(99, 102, 241, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Infinity className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-900 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium border border-indigo-200 dark:border-indigo-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-6">
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

              {/* Stats */}
              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-indigo-200 dark:border-indigo-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
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
                <div className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-800 dark:to-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
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
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Non-Dual Cosmic Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Center - Non-Dual Unity */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400 via-purple-500 to-blue-400 shadow-2xl flex items-center justify-center z-20 border-4 border-white/30"
                      animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                          '0 0 40px rgba(99, 102, 241, 0.6)',
                          '0 0 80px rgba(168, 85, 247, 0.8)',
                          '0 0 40px rgba(59, 130, 246, 0.6)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="text-center text-white">
                        <Infinity className="w-16 h-16 mx-auto mb-2" />
                        <div className="text-sm font-bold">Brahman</div>
                        <div className="text-xs opacity-80">Non-Dual</div>
                      </div>
                    </HydrationSafeMotion>

                    {/* Image with Cosmic Effects */}
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
                      {/* Cosmic Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-enhanced-shine" />
                    </div>
                  </div>
                  
                    {/* Floating Symbols */}
                    <HydrationSafeMotion
                      className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg z-30"
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        y: { duration: 3, repeat: 999999, ease: 'easeInOut' },
                        rotate: { duration: 20, repeat: 999999, ease: 'linear' }
                      }}
                    >
                      <Triangle className="w-8 h-8 text-white" />
                    </HydrationSafeMotion>
                    
                    <HydrationSafeMotion
                      className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -360]
                      }}
                      transition={{
                        scale: { duration: 2, repeat: 999999, ease: 'easeInOut' },
                        rotate: { duration: 15, repeat: 999999, ease: 'linear' }
                      }}
                    >
                      <Flame className="w-7 h-7 text-white" />
                    </HydrationSafeMotion>
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
        accentColor="#6366f1"
        theme="cosmic"
      />

      {/* Visual Metaphors Section */}
      <VisualMetaphor 
        title="The Non-Dual Reality"
        subtitle="Understanding ultimate truth through sacred metaphors of unity and oneness"
        metaphors={metaphors}
        theme="cosmic"
      />

      {/* Dual Paths Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Two Paths, One Truth
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Vedanta and Shaivism approach the same reality from complementary perspectives—the static and dynamic aspects of non-dual consciousness
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-indigo-500 to-indigo-600',
                'from-purple-500 to-purple-600',
                'from-blue-500 to-blue-600',
                'from-indigo-500 via-purple-500 to-blue-500'
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
                  <div className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/10 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-indigo-200 dark:border-indigo-800 relative overflow-hidden">
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
        title="Sacred Symbols of Non-Duality"
        subtitle="Each symbol points beyond itself to the ultimate reality—the non-dual consciousness"
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
              Your Non-Dual Philosophy Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to explore both Vedanta and Shaivism and realize the non-dual truth
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
                className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-200 dark:border-indigo-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="The Journey to Oneness"
        introduction="Experience the profound transformation from perceiving duality to realizing the eternal non-dual reality that you are"
        phases={storyPhases}
        conclusion="Realize: Aham Brahmasmi—I am Brahman"
        theme="cosmic"
      />

      {/* Tabs Section - Implementation shortened for space, follows same pattern as previous packages */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/20 dark:from-slate-900 dark:to-indigo-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-indigo-200 dark:border-indigo-800'
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
                <div className="bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      This advanced journey explores two of India's most profound non-dual philosophies. Vedanta, rooted in the Upanishads, reveals Brahman as the sole reality—eternal, infinite, and unchanging. Everything else is maya (apparent illusion). Your true self (Atman) is identical with Brahman—this is the great realization.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Kashmir Shaivism offers a complementary perspective. Rather than viewing the world as illusion, it celebrates manifestation as Shiva's creative expression (Shakti). Consciousness doesn't just witness—it vibrates, pulsates, and creates. The universe is Shiva's divine play, and you are that consciousness playing.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      Though their approaches differ—Vedanta emphasizing the unchanging absolute, Shaivism celebrating dynamic consciousness—both point to the same non-dual truth. This course integrates both paths, revealing how the static and dynamic aspects of reality are ultimately one.
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
                      className="bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex-shrink-0" />
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
                      className="bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-indigo-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3 pt-4 border-t border-indigo-200 dark:border-indigo-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
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
                      className="bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-indigo-500 flex-shrink-0" />
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
                            <div className="px-8 pb-6 bg-indigo-50 dark:bg-indigo-900/10">
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
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <HydrationSafeMotion key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.5, 1]
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
                    className="w-20 h-20 bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 40px rgba(99, 102, 241, 0.6)',
                        '0 0 80px rgba(168, 85, 247, 0.8)',
                        '0 0 40px rgba(59, 130, 246, 0.6)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Infinity className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Ready to Realize the One?
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your journey through Vedanta and Shaivism. Discover the non-dual reality that you have always been. Tat Tvam Asi—You are That.
                </p>
                
                    <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      Sacred Investment:
                    </span>
                    <span className="font-bold text-4xl text-indigo-700">
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
                      className="bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 hover:from-indigo-200 hover:via-purple-200 hover:to-blue-200 text-indigo-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <Eye className="w-5 h-5" />
                      <span className="font-medium">Non-Dual Wisdom</span>
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
