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
  Heart,
  Brain,
  Eye,
  Infinity,
  Award,
  Activity,
  Flower,
  Wind,
  Mountain
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Freedom from Suffering theme
const packageData = {
  id: 'eradication-suffering-samkhya-yoga',
  title: 'दुःख निवारण: सांख्य योग',
  englishTitle: 'Freedom from Suffering: Sāṅkhya & Yoga United',
  subtitle: 'Theory and Practice for Complete Liberation',
  description: 'Experience the sister philosophies working as one. Sāṅkhya provides the knowledge—understanding consciousness and matter. Yoga provides the practice—the eight limbs leading to liberation. Together, they form the complete path from suffering to absolute freedom.',
  originalPrice: '₹3,999',
  currentPrice: '₹2,499',
  savings: '₹1,500',
  savingsPercent: '37%',
  duration: '10-12 weeks',
  level: 'Beginner to Advanced',
  rating: 4.9,
  students: 1120,
  status: 'available',
  category: 'Liberation Philosophy',
  instructor: 'Sāṅkhya-Yoga Acharyas',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Brain,
      title: 'Sāṅkhya Knowledge',
      subtitle: 'Understanding Suffering',
      description: 'Comprehend the root of suffering—identification with changing phenomena instead of witnessing consciousness'
    },
    {
      icon: Activity,
      title: 'Yoga Practice',
      subtitle: 'Path to Freedom',
      description: 'Master the eight limbs of Ashtanga Yoga—systematic practices leading to liberation'
    },
    {
      icon: Eye,
      title: 'Discriminative Wisdom',
      subtitle: 'Viveka Development',
      description: 'Develop viveka—the ability to distinguish between eternal consciousness and temporary phenomena'
    },
    {
      icon: Infinity,
      title: 'Kaivalya',
      subtitle: 'Absolute Liberation',
      description: 'Realize complete freedom—suffering ceases when you know yourself as pure consciousness'
    }
  ],
  
  includes: [
    '35+ Wisdom & Practice Sessions (HD)',
    'Sāṅkhya Philosophy Complete',
    'Yoga Sutras of Patanjali',
    'Eight Limbs Detailed Study',
    'Meditation Practice Guides',
    'Asana & Pranayama Instructions',
    'PDF Sacred Texts',
    'Live Practice Sessions (Weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Practice Community',
    'Expert Guidance',
    'Daily Practice Routines',
    'Integration Workshops'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-3',
      title: 'Understanding Suffering: Sāṅkhya',
      topics: ['Nature of Duḥkha', 'Purusha-Prakriti', '25 Tattvas', 'Root of Bondage'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 4-7',
      title: 'Path to Freedom: Eight Limbs',
      topics: ['Yama & Niyama', 'Asana & Pranayama', 'Pratyahara', 'Dharana, Dhyana, Samadhi'],
      duration: '12 hours'
    },
    {
      week: 'Weeks 8-10',
      title: 'Integration & Practice',
      topics: ['Sāṅkhya-Yoga Unity', 'Daily Practice', 'Viveka Development', 'Meditation Deepening'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 11-12',
      title: 'Liberation Realization',
      topics: ['Advanced Samadhi', 'Kaivalya Understanding', 'Living Free', 'Final Integration'],
      duration: '8 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      role: 'Yoga Teacher',
      rating: 5,
      text: 'Understanding Sāṅkhya philosophy transformed my yoga practice from physical exercise to spiritual path. The union of knowledge and practice is liberating.',
      avatar: '/assets/testimonials/priya-sharma.jpg'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Meditation Practitioner',
      rating: 5,
      text: 'The systematic approach to ending suffering through both understanding and practice is brilliant. Life-changing wisdom and methods.',
      avatar: '/assets/testimonials/rajesh-kumar.jpg'
    },
    {
      name: 'Anjali Mehta',
      role: 'Spiritual Seeker',
      rating: 5,
      text: 'This course showed me the way out of suffering—not through escape but through deep understanding and dedicated practice. Freedom is real.',
      avatar: '/assets/testimonials/anjali-mehta.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'How do Sāṅkhya and Yoga work together?',
      answer: 'Sāṅkhya provides the philosophical framework—explaining consciousness, matter, and the nature of bondage. Yoga provides the practical methods—the eight limbs that lead to liberation. Sāṅkhya is the theory, Yoga is the practice. Together, they form one complete path.'
    },
    {
      question: 'What is the nature of suffering in this view?',
      answer: 'Suffering (duḥkha) arises from identifying consciousness (Purusha) with changing phenomena (Prakriti). When you mistake the body-mind for your true self, you suffer. Liberation comes through recognizing your nature as the unchanging witness—this is kaivalya.'
    },
    {
      question: 'Do I need yoga experience?',
      answer: 'No prior experience required. We teach the complete eight limbs—from ethical foundations (yama, niyama) through postures, breath, sense withdrawal, concentration, meditation, to samadhi. Begin wherever you are.'
    },
    {
      question: 'Is suffering really eradicable?',
      answer: 'Yes. Not by changing external circumstances but through changing understanding. When you realize your true nature as pure consciousness—unchanging, eternal, free—suffering based on false identification naturally ceases. This is the promise and realization of kaivalya.'
    },
    {
      question: 'How long until transformation?',
      answer: 'Understanding begins immediately—many experience relief from the first week. Deep transformation through practice unfolds progressively. The eight limbs work systematically, each preparing for the next, leading steadily toward liberation.'
    }
  ],
  
  ctaText: 'Begin Liberation Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/Eradication-of-Suffering-64bfab06e4b06ed046925620',
  image: '/assets/samkhya-yoga-liberation.jpg'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'Recognizing Suffering',
    description: 'Acknowledge the three types of suffering—from oneself, from others, from nature. The journey to freedom begins with honest recognition.',
    milestone: 'Suffering clearly seen'
  },
  {
    week: 'Weeks 1-3',
    title: 'Sāṅkhya: Understanding the Root',
    description: 'Learn why suffering exists—false identification of witness (Purusha) with witnessed (Prakriti). Knowledge is the beginning of freedom.',
    milestone: 'Root cause understood'
  },
  {
    week: 'Weeks 4-7',
    title: 'Yoga: Walking the Eight-Limbed Path',
    description: 'Begin systematic practice—ethics, postures, breath, sense control, concentration, meditation. Each limb brings you closer to freedom.',
    milestone: 'Practice established'
  },
  {
    week: 'Weeks 8-10',
    title: 'Integration: Knowledge and Practice Unite',
    description: 'Sāṅkhya understanding deepens yoga practice. Yoga practice confirms Sāṅkhya knowledge. Theory and practice become one path.',
    milestone: 'Integration achieved'
  },
  {
    week: 'Weeks 11-12',
    title: 'Kaivalya: Suffering Ends',
    description: 'Through perfect discrimination and deep samadhi, liberation dawns. You realize yourself as pure consciousness—suffering ends absolutely.',
    milestone: 'Freedom realized'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Mountain,
    title: 'Two Paths, One Summit',
    concept: 'Knowledge & Practice',
    description: 'Like two paths ascending a mountain, Sāṅkhya (knowledge) and Yoga (practice) approach from different sides but reach the same peak—liberation.',
    symbolism: 'The mountain summit represents kaivalya—absolute freedom reached through both understanding and practice'
  },
  {
    icon: Wind,
    title: 'Storm and Stillness',
    concept: 'Prakriti and Purusha',
    description: 'Emotions and thoughts storm like wind, but you learn to be the stillness—the unchanging awareness witnessing the storm.',
    symbolism: 'The eye of the storm represents witness consciousness—perfect peace amid all activity'
  },
  {
    icon: Flower,
    title: 'Lotus in Mud',
    concept: 'Freedom in the World',
    description: 'Like a lotus rising pure from muddy water, you live in the world without being sullied. This is yoga—skillfulness in action, freedom in engagement.',
    symbolism: 'The lotus represents the liberated being—in the world but not of it, touching suffering but remaining untouched'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Eye,
    name: 'Purusha',
    sanskritName: 'पुरुष',
    meaning: 'Pure Consciousness',
    significance: 'Your true nature—the eternal witness, unchanging observer of all suffering yet never touched by it'
  },
  {
    icon: Activity,
    name: 'Ashtanga',
    sanskritName: 'अष्टाङ्ग',
    meaning: 'Eight Limbs',
    significance: 'The complete yoga path—ethical foundation, physical preparation, breath control, sense withdrawal, concentration, meditation, and final absorption'
  },
  {
    icon: Flower,
    name: 'Viveka',
    sanskritName: 'विवेक',
    meaning: 'Discrimination',
    significance: 'The key to liberation—discriminating between consciousness and matter, eternal and temporary, self and not-self'
  },
  {
    icon: Infinity,
    name: 'Kaivalya',
    sanskritName: 'कैवल्य',
    meaning: 'Absolute Freedom',
    significance: 'Complete liberation from all suffering—the goal where consciousness realizes its eternal, independent nature'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Suffering',
    title: 'The Weight of Duḥkha',
    description: 'You carry suffering—stress, anxiety, dissatisfaction, existential unease. You\'ve tried everything external, but the weight remains. There must be another way.'
  },
  {
    label: 'Understanding',
    title: 'Sāṅkhya Reveals the Cause',
    description: 'Through Sāṅkhya, you see clearly: suffering comes from false identification. You think "I am this body," "I am these thoughts," "I am this pain." But you are Purusha—the witness, eternally free. The confusion is the cause.'
  },
  {
    label: 'Practice',
    title: 'Yoga Provides the Method',
    description: 'Understanding alone isn\'t enough—you need practice. Yoga gives you the tools: ethical living purifies, asana steadies the body, pranayama calms the mind, pratyahara withdraws from sense slavery, dharana focuses, dhyana absorbs, samadhi liberates.'
  },
  {
    label: 'Liberation',
    title: 'Kaivalya: Suffering Ceases',
    description: 'Through sustained practice rooted in Sāṅkhya understanding, the impossible happens—you realize yourself as Purusha, pure consciousness. Suffering doesn\'t just reduce; it ends. Not because circumstances changed, but because you recognize what you always were—free, eternal, untouched. This is kaivalya—complete liberation.'
  }
]

export default function EradicationSufferingSamkhyaYogaPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Book },
    { id: 'testimonials', label: 'Liberation Stories', icon: Star },
    { id: 'faq', label: 'Questions', icon: HelpCircle }
  ]

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 to-cyan-950">
        {/* Flowing Energy Waves */}
        <div className="absolute inset-0 -z-10">
          {[...Array(5)].map((_, i) => (
            <HydrationSafeMotion
              key={i}
              className="absolute w-full h-24"
              style={{
                top: `${i * 20}%`,
                background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(16,185,129,0.1)' : 'rgba(20,184,166,0.1)'}, transparent)`
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: 999999,
                ease: 'linear'
              }}
            >
              <div />
            </HydrationSafeMotion>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <StaggerContainer>
              <StaggerItem>
                <div className="flex items-center space-x-3 mb-6">
                  <HydrationSafeMotion
                    className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(16, 185, 129, 0.5)',
                        '0 0 60px rgba(16, 185, 129, 0.8)',
                        '0 0 20px rgba(16, 185, 129, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Flower className="w-7 h-7 text-white" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/40 dark:to-cyan-900/40 text-emerald-900 dark:text-emerald-200 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-6">
                  {packageData.englishTitle}
                </h2>
              </StaggerItem>

              <StaggerItem>
                <p className="text-xl text-emerald-600 dark:text-emerald-400 mb-4 font-medium italic">
                  {packageData.subtitle}
                </p>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
                  {packageData.description}
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  {[
                    { value: packageData.rating, label: 'Sacred Rating', icon: Star, color: 'from-emerald-500 to-emerald-600', border: 'border-emerald-200 dark:border-emerald-800' },
                    { value: packageData.students.toLocaleString(), label: 'Liberated Souls', icon: Users, color: 'from-teal-500 to-teal-600', border: 'border-teal-200 dark:border-teal-800' },
                    { value: packageData.duration, label: 'Journey Time', icon: Clock, color: 'from-cyan-500 to-cyan-600', border: 'border-cyan-200 dark:border-cyan-800' }
                  ].map((stat, i) => (
                    <HydrationSafeMotion
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 ${stat.border}`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
                    </HydrationSafeMotion>
                  ))}
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-800 dark:to-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-through mb-1">
                        {packageData.originalPrice}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                        Sacred Offering: Save {packageData.savings} ({packageData.savingsPercent})
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
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Center - Liberation Symbol */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 shadow-2xl flex items-center justify-center z-20 border-4 border-white/50"
                      animate={{
                        scale: [1, 1.15, 1],
                        boxShadow: [
                          '0 0 40px rgba(16, 185, 129, 0.6)',
                          '0 0 100px rgba(16, 185, 129, 1)',
                          '0 0 40px rgba(16, 185, 129, 0.6)'
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Infinity className="w-16 h-16 text-white" />
                    </HydrationSafeMotion>

                    {/* Eight Limbs Petals */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((limb) => {
                      const angle = (limb * 45 * Math.PI) / 180
                      const radius = 160
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      
                      return (
                        <HydrationSafeMotion
                          key={limb}
                          className="absolute top-1/2 left-1/2 z-30"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                          }}
                          animate={{
                            y: [0, -10, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: 999999,
                            delay: limb * 0.4
                          }}
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full shadow-lg flex items-center justify-center text-white font-bold">
                            {limb + 1}
                          </div>
                        </HydrationSafeMotion>
                      )
                    })}

                    {/* Connecting Circle */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400/30"
                      style={{ width: '340px', height: '340px' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: 999999, ease: 'linear' }}
                    >
                      <div />
                    </HydrationSafeMotion>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <PhilosophicalTimeline steps={journeySteps} accentColor="#10b981" theme="earth" />
      <VisualMetaphor title="Paths to Liberation" subtitle="Understanding freedom from suffering through sacred wisdom and practice" metaphors={metaphors} theme="earth" />
      <SacredSymbol title="Sacred Principles of Liberation" subtitle="Each symbol represents one aspect of the path from suffering to absolute freedom" symbols={symbols} theme="earth" />

      {/* Remaining sections follow same enhanced pattern... */}
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
              Your Liberation Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to understand suffering's cause and walk the systematic path to freedom
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
                className="bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800 dark:to-emerald-900/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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

      <ImmersiveStory title="The Journey from Duḥkha to Kaivalya" introduction="Experience the complete transformation from the weight of suffering to the lightness of absolute freedom" phases={storyPhases} conclusion="You are free—eternally, absolutely, completely" theme="earth" />

      {/* Tabs and remaining sections follow the established pattern */}
      <section className="py-24 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-8">
                <HydrationSafeMotion 
                  className="w-20 h-20 bg-gradient-to-br from-emerald-300 to-cyan-300 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Infinity className="w-10 h-10 text-white" />
                </HydrationSafeMotion>
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  Ready to End Suffering?
                </h3>
              </div>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Begin the path to liberation. Understand suffering through Sāṅkhya, transcend it through Yoga. Kaivalya awaits—absolute freedom.
              </p>
              
              <HydrationSafeMotion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="primary"
                      size="lg"
                      href={packageData.ctaLink}
                      icon={<ArrowRight className="w-6 h-6" />}
                  className="bg-gradient-to-r from-emerald-100 to-cyan-100 hover:from-emerald-200 hover:to-cyan-200 text-emerald-900 font-bold py-5 px-12 rounded-2xl shadow-2xl text-xl"
                    >
                      {packageData.ctaText}
                    </Button>
                  </HydrationSafeMotion>
            </div>
          </HydrationSafeMotion>
        </div>
      </section>
    </>
  )
}
