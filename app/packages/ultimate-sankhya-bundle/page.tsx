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
  Atom,
  Layers,
  Circle,
  Square,
  Triangle,
  Infinity,
  Zap,
  Sun,
  Moon,
  Award
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Samkhya Philosophy theme
const packageData = {
  id: 'ultimate-sankhya-bundle',
  title: 'सांख्य दर्शन',
  englishTitle: 'Ultimate Journey Through Sāṅkhya Philosophy',
  subtitle: 'The Dance of Purusha & Prakriti',
  description: 'Witness the cosmic dance of consciousness and matter. Explore the profound dualistic philosophy of Sāṅkhya—where pure consciousness (Purusha) observes the evolution of material nature (Prakriti) through 25 eternal principles (Tattvas).',
  originalPrice: '₹3,999',
  currentPrice: '₹2,499',
  savings: '₹1,500',
  savingsPercent: '37%',
  duration: '8-10 weeks',
  level: 'Intermediate to Advanced',
  rating: 4.8,
  students: 890,
  status: 'available',
  category: 'Classical Philosophy',
  instructor: 'Sāṅkhya Wisdom Keeper',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Eye,
      title: 'Purusha - पुरुष',
      subtitle: 'Pure Consciousness',
      description: 'Discover the eternal witness—unchanging, observing consciousness beyond all manifestation'
    },
    {
      icon: Atom,
      title: 'Prakriti - प्रकृति',
      subtitle: 'Primordial Matter',
      description: 'Understand the creative force—the dynamic source of all material and mental phenomena'
    },
    {
      icon: Layers,
      title: '25 Tattvas',
      subtitle: 'Cosmic Principles',
      description: 'Navigate the complete map of existence through 25 fundamental principles of reality'
    },
    {
      icon: Infinity,
      title: 'Kaivalya - कैवल्य',
      subtitle: 'Ultimate Liberation',
      description: 'Experience the path to absolute freedom through discriminative knowledge'
    }
  ],
  
  includes: [
    '40+ Philosophy Transmissions (HD)',
    'Sāṅkhya Karika Text Study',
    'Complete 25 Tattvas Exploration',
    'Purusha-Prakriti Meditation Guides',
    'Classical Commentary Analysis',
    'Philosophical Practice Workbooks',
    'Live Wisdom Sessions (Bi-weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Philosophical Community',
    'Progress Contemplation',
    'Expert Guidance',
    'Integration Practices',
    'Tattva Visualization Tools'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-2',
      title: 'Foundations: Purusha & Prakriti',
      topics: ['Historical Context', 'Core Dualism', 'Consciousness Nature', 'Matter Evolution'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 3-4',
      title: 'The 25 Tattvas: Manifestation',
      topics: ['Mahat (Intellect)', 'Ahamkara (Ego)', 'Manas (Mind)', 'Sense Organs & Action Organs'],
      duration: '8 hours'
    },
    {
      week: 'Weeks 5-6',
      title: 'Subtle Elements & Gross World',
      topics: ['Tanmatras (Subtle Elements)', 'Five Gross Elements', 'Material Evolution', 'Cosmic Architecture'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 7-8',
      title: 'Liberation Path: Kaivalya',
      topics: ['Discriminative Knowledge', 'Witness Consciousness', 'Path to Freedom', 'Integration with Yoga'],
      duration: '8 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Dr. Rajesh Verma',
      role: 'Philosophy Professor',
      rating: 5,
      text: 'The most comprehensive understanding of Sāṅkhya I have encountered. The clarity on Purusha-Prakriti distinction is transformative.',
      avatar: '/assets/testimonials/rajesh-verma.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'Yoga Teacher',
      rating: 5,
      text: 'This philosophy transformed my understanding of consciousness and reality. It has profoundly enhanced my yoga teaching.',
      avatar: '/assets/testimonials/priya-patel.jpg'
    },
    {
      name: 'Amit Kumar',
      role: 'Spiritual Seeker',
      rating: 5,
      text: 'The systematic analysis of the 25 Tattvas provides unprecedented clarity on the nature of existence.',
      avatar: '/assets/testimonials/amit-kumar.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'What makes Sāṅkhya unique among philosophies?',
      answer: 'Sāṅkhya is unique in its rigorous dualism—clearly distinguishing pure consciousness (Purusha) from matter (Prakriti). Its systematic enumeration of 25 principles provides a complete analytical framework for understanding reality and achieving liberation through knowledge.'
    },
    {
      question: 'Do I need prior philosophical background?',
      answer: 'While some familiarity with Indian philosophy is helpful, this journey is designed to guide intermediate learners systematically. We build understanding from foundational concepts through to advanced realizations.'
    },
    {
      question: 'How does Sāṅkhya relate to Yoga?',
      answer: 'Sāṅkhya provides the theoretical foundation for Yoga philosophy. Understanding the 25 Tattvas and Purusha-Prakriti distinction deepens yogic practice, revealing why and how the practices lead to liberation.'
    },
    {
      question: 'What is the practical application?',
      answer: 'Sāṅkhya offers profound tools for self-understanding—recognizing yourself as the witness consciousness rather than identifying with mental and physical phenomena. This discrimination (viveka) leads to freedom from suffering.'
    },
    {
      question: 'What texts will we study?',
      answer: 'We primarily study the Sāṅkhya Karika by Ishvarakrishna—the foundational text—along with traditional commentaries and guided meditation practices that embody these philosophical insights.'
    }
  ],
  
  ctaText: 'Begin Sāṅkhya Journey',
  ctaLink: 'https://courses.shikshanam.in/courses/Ultimate-Bundle-of-Sankhya-Philosophy-687b56fc55ab5b6dc3bb51de',
  image: 'https://d502jbuhuh9wk.cloudfront.net/courses/687b56fc55ab5b6dc3bb51de/687b56fc55ab5b6dc3bb51de_scaled_cover.jpg?v=1'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'The Great Question',
    description: 'What is the nature of consciousness? What is matter? How do they relate? Begin your exploration of these eternal questions.',
    milestone: 'Understanding the dualistic framework'
  },
  {
    week: 'Weeks 1-2',
    title: 'Purusha: The Eternal Witness',
    description: 'Discover pure consciousness—unchanging, eternal, merely observing the dance of Prakriti without entanglement.',
    milestone: 'Recognition of witness consciousness'
  },
  {
    week: 'Weeks 3-4',
    title: 'Prakriti: The Creative Force',
    description: 'Explore the dynamic principle—how from unmanifest potential arises the entire universe of mind and matter.',
    milestone: 'Understanding material evolution'
  },
  {
    week: 'Weeks 5-6',
    title: 'The 25 Tattvas Unfold',
    description: 'Navigate the complete map of existence—from primordial matter through subtle elements to the gross physical world.',
    milestone: 'Mastery of cosmic principles'
  },
  {
    week: 'Weeks 7-8',
    title: 'Kaivalya: Absolute Freedom',
    description: 'Realize the ultimate goal—perfect discrimination between Purusha and Prakriti, leading to liberation.',
    milestone: 'Path to liberation clarified'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Sun,
    title: 'Light & Mirror',
    concept: 'Purusha as Light',
    description: 'Like light illuminating a mirror, Purusha (consciousness) illuminates Prakriti (matter) without being affected by reflections.',
    symbolism: 'The sun remains unchanged while revealing all forms—pure consciousness remains unaffected while witnessing all phenomena'
  },
  {
    icon: Atom,
    title: 'The Cosmic Dance',
    concept: 'Prakriti\'s Evolution',
    description: 'Prakriti dances before Purusha, evolving into countless forms—yet the witness remains still, observing without attachment.',
    symbolism: 'The eternal dance of creation, preservation, and dissolution observed by unchanging consciousness'
  },
  {
    icon: Layers,
    title: 'Layers of Reality',
    concept: '25 Principles',
    description: 'Reality unfolds in precise layers—from undifferentiated potential through intellect, ego, mind, senses, to the five elements.',
    symbolism: 'The architectural blueprint of existence, each layer building upon the previous in cosmic order'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Eye,
    name: 'Purusha',
    sanskritName: 'पुरुष',
    meaning: 'Pure Consciousness',
    significance: 'The eternal witness, unchanging awareness that illuminates all experience without being affected by it'
  },
  {
    icon: Atom,
    name: 'Prakriti',
    sanskritName: 'प्रकृति',
    meaning: 'Primordial Nature',
    significance: 'The creative force from which all material and mental phenomena evolve through the three gunas'
  },
  {
    icon: Layers,
    name: 'Tattvas',
    sanskritName: 'तत्त्व',
    meaning: '25 Principles',
    significance: 'The complete enumeration of reality\'s fundamental constituents, from consciousness to gross elements'
  },
  {
    icon: Infinity,
    name: 'Kaivalya',
    sanskritName: 'कैवल्य',
    meaning: 'Absolute Isolation',
    significance: 'Liberation through perfect discrimination—Purusha realizing its distinction from Prakriti, achieving freedom'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Confusion',
    title: 'The Entangled Observer',
    description: 'You experience suffering, identifying with body and mind. "Am I this body? These thoughts? These emotions?" The confusion between consciousness and its objects creates bondage.'
  },
  {
    label: 'Discovery',
    title: 'The Witness Emerges',
    description: 'Through Sāṅkhya wisdom, you begin to discriminate. There is consciousness—pure, unchanging awareness. And there is that which is observed—the ever-changing play of Prakriti. You are the witness, not the witnessed.'
  },
  {
    label: 'Understanding',
    title: 'The 25 Tattvas Revealed',
    description: 'The entire universe unfolds before you as an ordered system. From undifferentiated Prakriti emerge intellect, ego, mind, senses, subtle elements, and finally the five gross elements. Each layer serves Purusha\'s experience—yet Purusha remains untouched.'
  },
  {
    label: 'Liberation',
    title: 'Kaivalya: Absolute Freedom',
    description: 'Perfect discrimination dawns. You realize your nature as pure consciousness—never born, never dying, eternally free. Prakriti continues its dance, but you know yourself as the unchanging witness. This is Kaivalya—absolute liberation.'
  }
]

export default function UltimateSankhyaBundlePage() {
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
      {/* Enhanced Hero Section with Dualism Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950">
        {/* Dualistic Background - Light & Dark */}
        <div className="absolute inset-0 -z-10">
          {/* Light Side - Purusha */}
          <HydrationSafeMotion className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-white to-transparent dark:from-slate-900/50 dark:to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut'
            }}>
              <div />
            </HydrationSafeMotion>
          {/* Dark Side - Prakriti */}
          <HydrationSafeMotion className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-100/30 to-transparent dark:from-purple-950/30 dark:to-transparent"
            animate={{
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut'
            }}>
              <div />
            </HydrationSafeMotion>
          
          {/* Floating Tattva Symbols */}
          {[...Array(5)].map((_, i) => (
            <HydrationSafeMotion key={i}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-200/20 to-slate-200/20 dark:from-purple-800/20 dark:to-slate-800/20 blur-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 5 + i,
                repeat: 999999,
                ease: 'easeInOut',
                delay: i * 0.5
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
                    className="w-14 h-14 bg-gradient-to-br from-white via-purple-100 to-slate-800 dark:from-slate-100 dark:via-purple-800 dark:to-slate-900 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                    <Brain className="w-7 h-7 text-purple-900 dark:text-purple-100 relative z-10" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-purple-100 to-slate-100 dark:from-purple-900/40 dark:to-slate-900/40 text-purple-900 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 to-purple-900 dark:from-slate-100 dark:to-purple-100 bg-clip-text text-transparent">
                    {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-600 to-slate-600 dark:from-purple-400 dark:to-slate-400 bg-clip-text text-transparent mb-6">
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

              {/* Stats with Dualism Theme */}
              <StaggerItem>
                <div className="flex flex-wrap gap-6 mb-8">
                  <HydrationSafeMotion
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
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
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-slate-500 rounded-lg flex items-center justify-center">
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
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-slate-600 dark:from-purple-400 dark:to-slate-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mt-1">
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
                    className="w-full bg-gradient-to-r from-purple-500 via-slate-700 to-purple-500 hover:from-purple-600 hover:via-slate-800 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Purusha-Prakriti Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  {/* Dualism Visualization */}
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Center - Point of Observation */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-white via-purple-200 to-slate-800 dark:from-slate-100 dark:via-purple-800 dark:to-slate-900 shadow-2xl border-4 border-purple-300 dark:border-purple-600 flex items-center justify-center z-20"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(168, 85, 247, 0.3)',
                          '0 0 60px rgba(168, 85, 247, 0.6)',
                          '0 0 20px rgba(168, 85, 247, 0.3)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="text-center">
                        <Eye className="w-8 h-8 text-purple-900 dark:text-purple-100 mx-auto mb-1" />
                        <div className="text-xs font-bold text-purple-900 dark:text-purple-100">Witness</div>
                      </div>
                    </HydrationSafeMotion>

                    {/* Outer Circle - 25 Tattvas arranged in layers */}
                    {[0, 1, 2, 3, 4].map((layer) => (
                      <HydrationSafeMotion key={layer}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                        style={{
                          width: `${100 + layer * 60}px`,
                          height: `${100 + layer * 60}px`,
                          borderColor: layer % 2 === 0 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(100, 116, 139, 0.2)'
                        }}
                        animate={{
                          rotate: layer % 2 === 0 ? 360 : -360,
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          rotate: { duration: 20 + layer * 5, repeat: 999999, ease: 'linear' },
                          scale: { duration: 3, repeat: 999999, ease: 'easeInOut' }
                        }}>
              <div />
            </HydrationSafeMotion>
                    ))}

                    {/* Key Tattvas represented */}
                    {[
                      { icon: Brain, label: 'Mahat', angle: 0, color: 'from-purple-500 to-purple-600' },
                      { icon: Circle, label: 'Ahamkara', angle: 90, color: 'from-slate-500 to-slate-600' },
                      { icon: Square, label: 'Manas', angle: 180, color: 'from-purple-500 to-slate-500' },
                      { icon: Atom, label: 'Tanmatras', angle: 270, color: 'from-slate-500 to-purple-500' }
                    ].map((tattva, index) => {
                      const Icon = tattva.icon
                      const angle = (tattva.angle * Math.PI) / 180
                      const radius = 180
                      const x = Math.cos(angle) * radius
                      const y = Math.sin(angle) * radius
                      
                      return (
                        <HydrationSafeMotion
                          key={index}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: 999999,
                            delay: index * 0.5
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <div className={`bg-gradient-to-br ${tattva.color} p-3 rounded-xl shadow-lg text-center w-20`}>
                            <Icon className="w-6 h-6 text-white mx-auto mb-1" />
                            <div className="text-xs text-white font-semibold">{tattva.label}</div>
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
        accentColor="#a855f7"
        theme="cosmic"
      />

      {/* Visual Metaphors Section */}
      <VisualMetaphor 
        title="Witnessing the Cosmic Dance"
        subtitle="Understanding Sāṅkhya through profound metaphors of consciousness and matter"
        metaphors={metaphors}
        theme="cosmic"
      />

      {/* Purusha-Prakriti Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/20 to-slate-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              The Eternal Duality
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Two fundamental principles—consciousness and matter—dance together to create all of existence
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-white via-purple-100 to-purple-500',
                'from-slate-500 via-purple-500 to-slate-800',
                'from-purple-500 via-slate-400 to-slate-600',
                'from-slate-100 via-purple-300 to-white'
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
                  <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 dark:border-purple-800 relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
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
        title="Sacred Principles of Sāṅkhya"
        subtitle="Each symbol embodies the eternal truths revealed through discriminative knowledge"
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
              Your Complete Philosophy Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to understand Sāṅkhya philosophy and realize your nature as pure consciousness
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
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="From Confusion to Liberation"
        introduction="Experience the profound transformation from identifying with changing phenomena to realizing your nature as eternal witness consciousness"
        phases={storyPhases}
        conclusion="Kaivalya—absolute freedom through knowledge"
        theme="cosmic"
      />

      {/* Tabs Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-slate-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-slate-700 border border-purple-200 dark:border-purple-800'
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
                <div className="bg-white dark:bg-slate-800 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-10 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Journey Overview
                  </h3>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Sāṅkhya is one of the six classical Indian philosophies (darshanas) and provides perhaps the most systematic analysis of reality. This ancient wisdom distinguishes two fundamental principles: Purusha (pure consciousness) and Prakriti (primordial nature), offering profound insights into the nature of existence and the path to liberation.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Through the systematic enumeration of 25 tattvas (principles), Sāṅkhya maps the complete architecture of reality—from undifferentiated potential through intellect, ego, mind, sense organs, action organs, subtle elements, to the five gross elements. Understanding these principles reveals how consciousness becomes apparently bound and how liberation is achieved.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      This journey is not mere philosophical speculation but a transformative path to self-realization. By developing viveka (discriminative knowledge)—the ability to distinguish between Purusha and Prakriti—you realize your true nature as the eternal witness and achieve kaivalya, absolute freedom.
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
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-slate-600 rounded-full flex-shrink-0" />
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
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-slate-600 rounded-full flex items-center justify-center">
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
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Dualistic Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-white/5 to-transparent animate-pulse" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
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
                    className="w-20 h-20 bg-gradient-to-br from-white via-purple-300 to-slate-800 rounded-2xl flex items-center justify-center shadow-2xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.5)',
                        '0 0 60px rgba(168, 85, 247, 0.8)',
                        '0 0 20px rgba(168, 85, 247, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Eye className="w-10 h-10 text-purple-900" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Awaken to Your True Nature
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your journey into Sāṅkhya philosophy. Discover the eternal distinction between consciousness and matter, and realize your nature as the unchanging witness.
                </p>
                
                <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-purple-100 to-slate-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <span className="text-gray-800 text-xl font-medium">
                      Sacred Investment:
                    </span>
                    <span className="font-bold text-4xl text-purple-700">
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
                      className="bg-gradient-to-r from-white via-purple-100 to-slate-200 hover:from-purple-100 hover:via-white hover:to-purple-100 text-purple-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <span className="font-medium">Witness Consciousness</span>
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
