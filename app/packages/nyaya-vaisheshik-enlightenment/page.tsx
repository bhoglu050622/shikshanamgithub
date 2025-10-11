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
  Scale,
  Atom,
  Lightbulb,
  Binary,
  Network,
  Infinity,
  Award,
  Target,
  Layers
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Logic & Atomism theme
const packageData = {
  id: 'nyaya-vaisheshik-enlightenment',
  title: 'न्याय-वैशेषिक साधना',
  englishTitle: 'Dual Path: Logic & Atomic Wisdom',
  subtitle: 'Enlightenment Through Reasoning and Reality',
  description: 'Walk two complementary paths to liberation. Nyaya offers the systematic logic of valid reasoning, while Vaisheshika reveals the atomic structure of reality. Together, they create a complete analytical framework for understanding existence and achieving freedom.',
  originalPrice: '₹3,499',
  currentPrice: '₹2,199',
  savings: '₹1,300',
  savingsPercent: '37%',
  duration: '8-10 weeks',
  level: 'Intermediate',
  rating: 4.7,
  students: 650,
  status: 'available',
  category: 'Logic & Atomism',
  instructor: 'Nyaya-Vaisheshika Masters',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Scale,
      title: 'Nyaya Logic',
      subtitle: 'Valid Reasoning',
      description: 'Master the systematic logic that reveals truth through proper inference and reasoning'
    },
    {
      icon: Atom,
      title: 'Vaisheshika Atomism',
      subtitle: 'Reality\'s Structure',
      description: 'Understand existence through categories and atoms—the building blocks of reality'
    },
    {
      icon: Lightbulb,
      title: 'Pramanas',
      subtitle: 'Valid Knowledge',
      description: 'Learn the means of valid knowledge—perception, inference, comparison, testimony'
    },
    {
      icon: Target,
      title: 'Liberation Path',
      subtitle: 'Freedom Through Knowledge',
      description: 'Discover how analytical understanding leads directly to enlightenment and freedom'
    }
  ],
  
  includes: [
    '25+ Philosophy Transmissions (HD)',
    'Nyaya Sutra Study',
    'Vaisheshika Sutra Analysis',
    'Logic & Reasoning Training',
    'Atomic Theory Exploration',
    'Categorical Analysis Methods',
    'PDF Study Materials',
    'Live Wisdom Sessions (Bi-weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Philosophy Community',
    'Expert Guidance',
    'Practice Workbooks',
    'Integration Workshops'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-3',
      title: 'Nyaya: The Logic System',
      topics: ['Valid Knowledge', 'Inference Methods', 'Debate Techniques', 'Truth Discovery'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 4-6',
      title: 'Vaisheshika: Atomic Reality',
      topics: ['Seven Categories', 'Atomic Theory', 'Substance Analysis', 'Universal Understanding'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 7-8',
      title: 'Integration & Practice',
      topics: ['Combined Understanding', 'Practical Applications', 'Enlightenment Methods', 'Liberation Path'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 9-10',
      title: 'Advanced Realization',
      topics: ['Advanced Logic', 'Complex Atomism', 'Enlightenment Practices', 'Final Integration'],
      duration: '6 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Rajesh Verma',
      role: 'Logic Professor',
      rating: 5,
      text: 'This journey through Nyaya and Vaisheshika opened my mind to the precision and depth of Indian logical tradition. Transformative understanding.',
      avatar: '/assets/testimonials/rajesh-verma.jpg'
    },
    {
      name: 'Priya Singh',
      role: 'Philosophy Student',
      rating: 5,
      text: 'The systematic approach to understanding reality through logic and atoms is fascinating. These tools transform how I think and perceive.',
      avatar: '/assets/testimonials/priya-singh.jpg'
    },
    {
      name: 'Dr. Amit Kumar',
      role: 'Philosophy Scholar',
      rating: 5,
      text: 'The dual path of reasoning and atomic analysis provides complete analytical framework for enlightenment. Exceptional teaching.',
      avatar: '/assets/testimonials/amit-kumar.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'What is Nyaya philosophy?',
      answer: 'Nyaya is the systematic science of logic and epistemology. It provides rigorous methods for valid reasoning, proper inference, and arriving at truth through logical analysis. Nyaya shows how correct thinking leads to liberation.'
    },
    {
      question: 'What is Vaisheshika philosophy?',
      answer: 'Vaisheshika is the atomic theory of reality. It analyzes existence through seven categories (substance, quality, action, universal, particular, inherence, non-existence) and explains reality through atoms (anu) as fundamental building blocks.'
    },
    {
      question: 'How do these systems lead to enlightenment?',
      answer: 'Both provide systematic analysis of reality. Nyaya through correct reasoning reveals the nature of self and liberation. Vaisheshika through understanding reality\'s structure shows the impermanence of attachments. Together, they create analytical clarity leading to freedom.'
    },
    {
      question: 'Is this suitable for those new to philosophy?',
      answer: 'This is an intermediate journey. Some background in logical thinking or philosophy is helpful. We build systematically, but the analytical nature requires focused attention and contemplative practice.'
    },
    {
      question: 'What practical transformation can I expect?',
      answer: 'You\'ll develop razor-sharp reasoning abilities, systematic thinking skills, and the capacity to analyze reality with precision. These analytical tools transform both worldly problem-solving and spiritual practice, leading toward enlightenment through knowledge.'
    }
  ],
  
  ctaText: 'Begin Analytical Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/Eradication-of-Suffering-64bfab06e4b06ed046925620',
  image: '/assets/nyaya-vaisheshik-enlightenment.jpg'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'The Analytical Awakening',
    description: 'Begin with fundamental questions: How do we know truth? What is the structure of reality? Logic and atomism await.',
    milestone: 'Analytical framework established'
  },
  {
    week: 'Weeks 1-3',
    title: 'Nyaya: The Logic of Truth',
    description: 'Master the pramanas—valid means of knowledge. Learn rigorous inference, debate methodology, and systematic reasoning toward truth.',
    milestone: 'Logical reasoning mastered'
  },
  {
    week: 'Weeks 4-6',
    title: 'Vaisheshika: The Atomic Structure',
    description: 'Discover reality\'s architecture—seven categories, atomic theory, universal-particular relationships. See existence systematically.',
    milestone: 'Categorical understanding achieved'
  },
  {
    week: 'Weeks 7-8',
    title: 'Integration: Dual Analysis',
    description: 'Unite logic and atomism. Reason about atoms, analyze categories logically. The dual path becomes one complete method.',
    milestone: 'Integrated analysis realized'
  },
  {
    week: 'Weeks 9-10',
    title: 'Liberation: Analytical Freedom',
    description: 'Through perfect understanding—logical clarity and atomic insight—liberation dawns. Knowledge itself becomes freedom.',
    milestone: 'Path to enlightenment clear'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Scale,
    title: 'The Balance of Reasoning',
    concept: 'Nyaya Logic',
    description: 'Like scales weighing evidence, Nyaya logic carefully examines arguments, testing each claim until truth reveals itself with certainty.',
    symbolism: 'The scales represent perfect balance in reasoning—neither too quick to accept nor too rigid to learn'
  },
  {
    icon: Atom,
    title: 'The Atomic Dance',
    concept: 'Vaisheshika Categories',
    description: 'Like atoms combining and separating, reality is understood through fundamental building blocks and their relationships—systematic, precise, complete.',
    symbolism: 'Atoms represent the ultimate analysis—breaking reality down to fundamental constituents to understand the whole'
  },
  {
    icon: Network,
    title: 'The Web of Relations',
    concept: 'Integrated Understanding',
    description: 'Logic and atomism together create a complete framework—reasoning about structure, analyzing patterns, understanding existence systematically.',
    symbolism: 'The interconnected web represents how logic and atomic theory support each other toward complete understanding'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Scale,
    name: 'Nyaya',
    sanskritName: 'न्याय',
    meaning: 'Correct Method',
    significance: 'The systematic science of logic and valid reasoning—the path to truth through analytical precision'
  },
  {
    icon: Atom,
    name: 'Vaisheshika',
    sanskritName: 'वैशेषिक',
    meaning: 'Based on Particulars',
    significance: 'The atomic philosophy—understanding reality through its fundamental constituents and categories'
  },
  {
    icon: Lightbulb,
    name: 'Pramana',
    sanskritName: 'प्रमाण',
    meaning: 'Valid Knowledge',
    significance: 'The means through which true knowledge arises—perception, inference, comparison, testimony'
  },
  {
    icon: Target,
    name: 'Apavarga',
    sanskritName: 'अपवर्ग',
    meaning: 'Final Liberation',
    significance: 'Freedom achieved through complete analytical understanding—enlightenment through knowledge'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Confusion',
    title: 'Lost in Claims and Opinions',
    description: 'The world offers countless claims, opinions, beliefs. What is true? What is merely appearance? Without method, truth remains elusive, hidden behind endless arguments.'
  },
  {
    label: 'Nyaya Clarity',
    title: 'Logic Reveals the Path',
    description: 'Through Nyaya, you gain systematic method. Not all claims are equal—some have valid support, others are mere assertion. Inference follows laws. Truth can be known through proper reasoning. The fog begins to clear.'
  },
  {
    label: 'Vaisheshika Structure',
    title: 'Reality\'s Architecture Unveiled',
    description: 'Vaisheshika reveals reality\'s structure. Everything fits into categories. Atoms combine into molecules, molecules into objects. The apparent chaos of existence shows underlying order. You see the blueprint.'
  },
  {
    label: 'Liberation',
    title: 'Analytical Freedom Dawns',
    description: 'With logical precision and atomic understanding, you see through illusion. Suffering arises from misunderstanding—wrong reasoning, false attachments to impermanent atoms. Perfect analytical knowledge brings perfect freedom. This is enlightenment through systematic wisdom.'
  }
]

export default function NyayaVaisheshikEnlightenmentPage() {
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
      {/* Enhanced Hero Section with Logic & Atomism Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-cyan-50 via-slate-50 to-blue-50 dark:from-cyan-950 dark:via-slate-950 to-blue-950">
        {/* Geometric Logic Pattern Background */}
        <div className="absolute inset-0 -z-10">
          {/* Grid Pattern - Logic Structure */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          {/* Atomic Particles */}
          {[...Array(30)].map((_, i) => (
            <HydrationSafeMotion key={i}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 opacity-20"
              style={{
                left: `${(i * 7) % 95}%`,
                top: `${(i * 13) % 90}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4 + (i % 5),
                repeat: 999999,
                delay: i * 0.1
              }}>
              <div />
            </HydrationSafeMotion>
          ))}

          {/* Connecting Lines - Network of Logic */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1={`${20 + i * 15}%`}
                y1={`${30 + i * 10}%`}
                x2={`${40 + i * 10}%`}
                y2={`${50 + i * 5}%`}
                stroke="currentColor"
                strokeWidth="1"
                className="text-cyan-500"
              />
            ))}
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-slate-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(6, 182, 212, 0.5)',
                        '0 0 60px rgba(6, 182, 212, 0.8)',
                        '0 0 20px rgba(6, 182, 212, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Scale className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 text-cyan-900 dark:text-cyan-200 px-4 py-2 rounded-full text-sm font-medium border border-cyan-200 dark:border-cyan-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-600 via-slate-700 to-blue-600 dark:from-cyan-400 dark:via-slate-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-cyan-600 dark:text-cyan-400 mb-4 font-medium italic">
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
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-cyan-200 dark:border-cyan-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{packageData.rating}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Sacred Rating</div>
                    </div>
                  </HydrationSafeMotion>
                  
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
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
                <div className="bg-gradient-to-br from-white to-cyan-50/50 dark:from-slate-800 dark:to-cyan-900/20 border-2 border-cyan-200 dark:border-cyan-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mt-1">
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
                    className="w-full bg-gradient-to-r from-cyan-500 via-slate-600 to-blue-500 hover:from-cyan-600 hover:via-slate-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Logic & Atomism Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Center - Balance Point */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-xl bg-gradient-to-br from-cyan-400 via-slate-600 to-blue-400 shadow-2xl flex items-center justify-center z-20 border-4 border-white/30"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="text-center text-white">
                        <Scale className="w-16 h-16 mx-auto mb-1" />
                        <div className="text-xs font-bold">Balanced Truth</div>
                        </div>
                    </HydrationSafeMotion>

                    {/* Atomic Structure Visualization */}
                    {[0, 1, 2].map((ring) => (
                      <HydrationSafeMotion key={ring}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/30"
                        style={{
                          width: `${150 + ring * 80}px`,
                          height: `${150 + ring * 80}px`,
                        }}
                        animate={{
                          rotate: ring % 2 === 0 ? 360 : -360
                        }}
                        transition={{
                          duration: 20 + ring * 5,
                          repeat: 999999,
                          ease: 'linear'
                        }}>
              <div />
            </HydrationSafeMotion>
                    ))}

                    {/* Logic Points on Orbits */}
                    {[0, 120, 240].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180
                      const radius = 150
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
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: 999999,
                            delay: i * 0.7
                          }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center">
                            <Atom className="w-6 h-6 text-white" />
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
        accentColor="#06b6d4"
        theme="cool"
      />

      {/* Visual Metaphors Section */}
      <VisualMetaphor 
        title="Understanding Through Analysis"
        subtitle="Logic and atomic theory as pathways to systematic comprehension of reality"
        metaphors={metaphors}
        theme="cool"
      />

      {/* Dual Systems Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-cyan-50/20 to-slate-50 dark:from-slate-950 dark:via-cyan-950/20 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Dual Analytical Systems
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Logic provides the method, atomism provides the map—together revealing reality with precision
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-cyan-500 to-cyan-600',
                'from-slate-500 to-slate-600',
                'from-blue-500 to-blue-600',
                'from-cyan-500 via-slate-500 to-blue-500'
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
                  <div className="bg-gradient-to-br from-white to-cyan-50/30 dark:from-slate-800 dark:to-cyan-900/10 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-cyan-200 dark:border-cyan-800 relative overflow-hidden">
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
        title="Sacred Principles of Systematic Wisdom"
        subtitle="Each symbol represents one aspect of the analytical path to enlightenment"
        symbols={symbols}
        theme="cool"
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
              Your Analytical Philosophy Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to master logic and atomic philosophy for systematic enlightenment
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
                className="bg-gradient-to-br from-white to-cyan-50/30 dark:from-slate-800 dark:to-cyan-900/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-cyan-200 dark:border-cyan-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-slate-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="From Confusion to Analytical Clarity"
        introduction="Experience the transformation from unclear thinking to razor-sharp reasoning and atomic understanding of reality"
        phases={storyPhases}
        conclusion="Liberation through perfect analytical knowledge"
        theme="cool"
      />

      {/* Tabs Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/20 dark:from-slate-900 dark:to-cyan-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 via-slate-600 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-cyan-50 dark:hover:bg-slate-700 border border-cyan-200 dark:border-cyan-800'
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
                <div className="bg-white dark:bg-slate-800 border-2 border-cyan-200 dark:border-cyan-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      This journey explores two sister philosophies that together provide complete analytical understanding. Nyaya, the science of logic and epistemology, teaches rigorous methods for determining truth. Vaisheshika, the atomic philosophy, reveals reality's fundamental structure through categories and particles.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Nyaya offers four pramanas (means of valid knowledge): pratyaksha (perception), anumana (inference), upamana (comparison), and shabda (testimony). Through these, you learn to distinguish valid knowledge from mere belief. Vaisheshika presents seven categories (substance, quality, action, universal, particular, inherence, non-existence) and explains how atoms (anu) combine to create the material world.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      These are not dry academic systems but paths to liberation. Nyaya shows how correct reasoning dispels ignorance. Vaisheshika reveals the impermanent nature of atomic combinations, freeing you from attachment. Together, they provide analytical clarity that leads directly to enlightenment—apavarga, final liberation through knowledge.
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
                      className="bg-white dark:bg-slate-800 border-2 border-cyan-200 dark:border-cyan-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {module.title}
                          </h3>
                          <p className="text-cyan-600 dark:text-cyan-400 font-medium text-lg">
                            {module.week}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-cyan-100 dark:bg-cyan-900/30 px-4 py-2 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">{module.duration}</span>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-3 bg-cyan-50 dark:bg-cyan-900/20 px-4 py-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex-shrink-0" />
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
                      className="bg-white dark:bg-slate-800 border-2 border-cyan-200 dark:border-cyan-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-cyan-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center space-x-3 pt-4 border-t border-cyan-200 dark:border-cyan-700">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
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
                      className="bg-white dark:bg-slate-800 border-2 border-cyan-200 dark:border-cyan-700 rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                        ) : (
                          <Plus className="w-5 h-5 text-cyan-500 flex-shrink-0" />
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
                            <div className="px-8 pb-6 bg-cyan-50 dark:bg-cyan-900/10">
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
      <section className="py-24 bg-gradient-to-br from-cyan-900 via-slate-900 to-blue-900 relative overflow-hidden">
        {/* Atomic Grid Animation */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div style={{
            backgroundImage: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }} className="absolute inset-0" />
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
                    className="w-20 h-20 bg-gradient-to-br from-cyan-400 via-slate-500 to-blue-400 rounded-xl flex items-center justify-center shadow-2xl"
                    animate={{
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Scale className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Ready for Analytical Enlightenment?
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your dual path journey. Master the logic that reveals truth and the atomic understanding that explains existence. Liberation awaits through systematic knowledge.
                </p>
                
                    <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-cyan-100 to-blue-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      Sacred Investment:
                    </span>
                    <span className="font-bold text-4xl text-cyan-700">
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
                      className="bg-gradient-to-r from-cyan-100 via-slate-200 to-blue-100 hover:from-cyan-200 hover:via-slate-300 hover:to-blue-200 text-cyan-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <Scale className="w-5 h-5" />
                      <span className="font-medium">Analytical Wisdom</span>
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
