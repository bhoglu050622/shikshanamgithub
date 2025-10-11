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
  Smile,
  Frown,
  Meh,
  Zap,
  Infinity,
  Award,
  Activity,
  Layers
} from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'
import PhilosophicalTimeline from '@/components/packages/PhilosophicalTimeline'
import VisualMetaphor from '@/components/packages/VisualMetaphor'
import SacredSymbol from '@/components/packages/SacredSymbol'
import ImmersiveStory from '@/components/packages/ImmersiveStory'

// Package data - Emotional Intelligence through Samkhya theme
const packageData = {
  id: 'samkhya-emotional-intelligence',
  title: 'सांख्य से भावनात्मक बुद्धि',
  englishTitle: 'Emotional Mastery Through Sāṅkhya Wisdom',
  subtitle: 'Understanding Emotions Through the Three Gunas',
  description: 'Transform your relationship with emotions through the profound lens of Sāṅkhya philosophy. Understand how the three gunas (sattva, rajas, tamas) create all emotional states, and master the art of witnessing rather than being controlled by feelings.',
  originalPrice: '₹3,499',
  currentPrice: '₹2,199',
  savings: '₹1,300',
  savingsPercent: '37%',
  duration: '8-10 weeks',
  level: 'Beginner to Intermediate',
  rating: 4.8,
  students: 890,
  status: 'available',
  category: 'Emotional Wisdom',
  instructor: 'Sāṅkhya Psychology Masters',
  language: 'Hindi & Sanskrit with English',
  lastUpdated: 'December 2024',
  
  features: [
    {
      icon: Layers,
      title: 'Three Gunas',
      subtitle: 'Nature\'s Qualities',
      description: 'Understand sattva (clarity), rajas (activity), tamas (inertia)—the three fundamental qualities creating all emotions'
    },
    {
      icon: Eye,
      title: 'Witness Consciousness',
      subtitle: 'Purusha Awareness',
      description: 'Learn to observe emotions as the witness rather than identifying with passing emotional states'
    },
    {
      icon: Heart,
      title: 'Emotional Mastery',
      subtitle: 'Freedom from Reactivity',
      description: 'Develop the capacity to experience emotions fully while maintaining inner equilibrium'
    },
    {
      icon: Activity,
      title: 'Practical Integration',
      subtitle: 'Daily Life Application',
      description: 'Apply Sāṅkhya insights to relationships, work, and personal growth with transformative results'
    }
  ],
  
  includes: [
    '30+ Wisdom Transmissions (HD)',
    'Sāṅkhya Psychology Framework',
    'Three Gunas Deep Study',
    'Emotional Pattern Recognition',
    'Witness Practice Meditations',
    'PDF Study Materials',
    'Practical Exercise Workbooks',
    'Live Q&A Sessions (Bi-weekly)',
    'Traditional Certificate',
    'Lifetime Sacred Access',
    'Community Support',
    'Expert Guidance',
    'Daily Practice Tools',
    'Integration Workshops'
  ],
  
  curriculum: [
    {
      week: 'Weeks 1-2',
      title: 'Sāṅkhya Foundation',
      topics: ['Purusha & Prakriti Basics', 'Three Gunas Introduction', 'Emotional Nature', 'Witness Understanding'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 3-5',
      title: 'Gunas and Emotions',
      topics: ['Sattva Emotions', 'Rajas Emotions', 'Tamas Emotions', 'Guna Recognition Practice'],
      duration: '10 hours'
    },
    {
      week: 'Weeks 6-7',
      title: 'Witness Practice',
      topics: ['Observer Consciousness', 'Non-Identification', 'Emotional Freedom', 'Meditation Practices'],
      duration: '6 hours'
    },
    {
      week: 'Weeks 8-10',
      title: 'Integration & Mastery',
      topics: ['Practical Applications', 'Relationship Mastery', 'Daily Life Integration', 'Advanced Practices'],
      duration: '6 hours'
    }
  ],
  
  testimonials: [
    {
      name: 'Meera Patel',
      role: 'Therapist',
      rating: 5,
      text: 'Understanding emotions through the three gunas transformed my therapeutic practice. The witness perspective offers profound liberation from reactivity.',
      avatar: '/assets/testimonials/meera-patel.jpg'
    },
    {
      name: 'Arjun Sharma',
      role: 'Business Professional',
      rating: 5,
      text: 'This course gave me tools to navigate workplace stress with equanimity. Recognizing guna patterns in emotions has been life-changing.',
      avatar: '/assets/testimonials/arjun-sharma.jpg'
    },
    {
      name: 'Dr. Sunita Reddy',
      role: 'Psychologist',
      rating: 5,
      text: 'The integration of ancient Sāṅkhya philosophy with emotional intelligence is brilliant. Practical wisdom for modern life.',
      avatar: '/assets/testimonials/sunita-reddy.jpg'
    }
  ],
  
  faqs: [
    {
      question: 'How does Sāṅkhya explain emotions?',
      answer: 'Sāṅkhya teaches that all emotional states arise from the three gunas—sattva creates peace and clarity, rajas creates passion and restlessness, tamas creates heaviness and delusion. Understanding this allows you to recognize and work with emotions systematically.'
    },
    {
      question: 'What is the witness perspective?',
      answer: 'The witness (Purusha) is your true nature—pure consciousness observing emotions without being affected by them. Like the sky witnessing clouds passing, you learn to observe emotions without identification or reactivity.'
    },
    {
      question: 'Is this about suppressing emotions?',
      answer: 'Not at all. This is about understanding emotions deeply and experiencing them fully while maintaining inner freedom. You feel without being enslaved, experience without losing center, engage without losing yourself.'
    },
    {
      question: 'How quickly will I see results?',
      answer: 'Many students report immediate benefits from the first week—simply understanding the guna framework changes how you perceive emotions. Deeper transformation unfolds progressively through practice and integration.'
    },
    {
      question: 'Is this suitable for beginners?',
      answer: 'Yes! While rooted in Sāṅkhya philosophy, the course is designed for practical application. No prior philosophical knowledge needed—just sincere interest in understanding and mastering your emotional life.'
    }
  ],
  
  ctaText: 'Begin Emotional Mastery',
  ctaLink: 'https://courses.shikshanam.in/courses/Emotional-Intelligence-with-Samkhya-Darshan-657f6afde4b0f7f17e21e1c2',
  image: '/assets/samkhya-emotional-intelligence.jpg'
}

// Journey Timeline Data
const journeySteps = [
  {
    week: 'Foundation',
    title: 'The Emotional Awakening',
    description: 'Begin seeing emotions not as random but as systematic expressions of the three gunas in your consciousness.',
    milestone: 'Guna framework understood'
  },
  {
    week: 'Weeks 1-2',
    title: 'Understanding the Witness',
    description: 'Discover your true nature as Purusha—the unchanging observer of all emotional phenomena arising in Prakriti.',
    milestone: 'Witness perspective accessed'
  },
  {
    week: 'Weeks 3-5',
    title: 'Mapping Emotional Patterns',
    description: 'Learn to recognize sattva (peaceful), rajas (agitated), tamas (heavy) qualities in every emotional experience.',
    milestone: 'Emotional patterns recognized'
  },
  {
    week: 'Weeks 6-7',
    title: 'Cultivating Non-Identification',
    description: 'Practice observing emotions without merging with them. Feel deeply while remaining centered in witness consciousness.',
    milestone: 'Non-reactive awareness developed'
  },
  {
    week: 'Weeks 8-10',
    title: 'Living as Free Consciousness',
    description: 'Integrate the practice into daily life. Emotions arise and pass, but you remain free—the witness, eternally at peace.',
    milestone: 'Emotional mastery embodied'
  }
]

// Visual Metaphors Data
const metaphors = [
  {
    icon: Activity,
    title: 'Three Colored Threads',
    concept: 'The Guna Weave',
    description: 'Like three colored threads weaving fabric, sattva (white), rajas (red), and tamas (black) combine in varying proportions to create every emotional state.',
    symbolism: 'The three-strand rope represents how all emotions are woven from the same fundamental qualities in different combinations'
  },
  {
    icon: Eye,
    title: 'Sky and Clouds',
    concept: 'Witness Consciousness',
    description: 'Emotions are like clouds passing through the sky of consciousness. The sky remains unchanged, merely witnessing clouds come and go.',
    symbolism: 'You are the vast sky, not the passing clouds—this recognition brings freedom from emotional turbulence'
  },
  {
    icon: Heart,
    title: 'The Still Lake',
    concept: 'Inner Equilibrium',
    description: 'A still lake reflects clearly. When emotions (wind) disturb the surface, reflections distort. Return to stillness, clarity returns.',
    symbolism: 'Emotional mastery is like calming the lake—not stopping the wind, but developing the capacity to return to stillness'
  }
]

// Sacred Symbols Data
const symbols = [
  {
    icon: Smile,
    name: 'Sattva',
    sanskritName: 'सत्त्व',
    meaning: 'Purity & Clarity',
    significance: 'The quality of peace, joy, clarity—emotions of harmony, contentment, and understanding'
  },
  {
    icon: Zap,
    name: 'Rajas',
    sanskritName: 'रजस्',
    meaning: 'Activity & Passion',
    significance: 'The quality of movement, desire, agitation—emotions of excitement, anger, craving'
  },
  {
    icon: Frown,
    name: 'Tamas',
    sanskritName: 'तमस्',
    meaning: 'Inertia & Darkness',
    significance: 'The quality of heaviness, delusion—emotions of depression, confusion, and lethargy'
  },
  {
    icon: Eye,
    name: 'Sakshi',
    sanskritName: 'साक्षी',
    meaning: 'The Witness',
    significance: 'Your true nature—pure consciousness observing all emotional states without being affected'
  }
]

// Immersive Story Data
const storyPhases = [
  {
    label: 'Reactivity',
    title: 'Enslaved by Emotions',
    description: 'You are tossed by emotional waves—one moment angry, next moment sad, then anxious. You believe "I am angry," "I am sad," completely identified with passing states. This is suffering.'
  },
  {
    label: 'Recognition',
    title: 'Seeing the Gunas',
    description: 'Through Sāṅkhya, you begin to see patterns. Anger is rajas dominant. Depression is tamas. Peace is sattva. Emotions aren\'t random—they\'re systematic expressions of the three fundamental qualities. Understanding dawns.'
  },
  {
    label: 'Witnessing',
    title: 'The Observer Awakens',
    description: 'You practice stepping back—watching anger arise without becoming angry, observing sadness without being the sadness. There\'s the emotion (in Prakriti), and there\'s you (Purusha)—the witness. Space opens between stimulus and response.'
  },
  {
    label: 'Freedom',
    title: 'Emotional Liberation',
    description: 'Emotions still arise—you\'re human. But now you\'re free. Rajas comes, you witness it pass. Tamas appears, you don\'t merge with it. You cultivate sattva consciously. You feel everything fully yet remain undisturbed at the core. This is emotional mastery through Sāṅkhya wisdom.'
  }
]

export default function SamkhyaEmotionalIntelligencePage() {
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
      {/* Enhanced Hero Section with Emotional Intelligence Theme */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 dark:from-rose-950 dark:via-purple-950 to-blue-950">
        {/* Three Gunas Colored Waves Background */}
        <div className="absolute inset-0 -z-10">
          {/* Sattva - White/Light */}
          <HydrationSafeMotion className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent dark:from-white/10"
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
          {/* Rajas - Red/Active */}
          <HydrationSafeMotion className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-b from-rose-200/20 via-purple-200/20 to-transparent dark:from-rose-800/20 dark:via-purple-800/20"
            animate={{
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 1.33
            }}>
              <div />
            </HydrationSafeMotion>
          {/* Tamas - Dark/Heavy */}
          <HydrationSafeMotion className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-200/20 to-transparent dark:from-slate-800/30"
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: 999999,
              ease: 'easeInOut',
              delay: 2.66
            }}>
              <div />
            </HydrationSafeMotion>

          {/* Floating Emotion Particles */}
          {[...Array(20)].map((_, i) => {
            const colors = ['from-white to-blue-100', 'from-rose-300 to-purple-300', 'from-slate-300 to-gray-400']
            return (
              <HydrationSafeMotion key={i}
                className={`absolute w-4 h-4 rounded-full bg-gradient-to-br ${colors[i % 3]} opacity-30`}
                style={{
                  left: `${(i * 5) % 95}%`,
                  top: `${(i * 7) % 90}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, (i % 2 === 0 ? 20 : -20), 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 5 + (i % 5),
                  repeat: 999999,
                  delay: i * 0.2
                }}>
              <div />
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
                    className="w-14 h-14 bg-gradient-to-br from-rose-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(236, 72, 153, 0.5)',
                        '0 0 60px rgba(236, 72, 153, 0.8)',
                        '0 0 20px rgba(236, 72, 153, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-7 h-7 text-white relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </HydrationSafeMotion>
                  <span className="bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 dark:from-rose-900/40 dark:via-purple-900/40 dark:to-blue-900/40 text-purple-900 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-800">
                    {packageData.category}
                  </span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 dark:from-rose-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {packageData.title}
                  </span>
                </h1>
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-purple-600 to-rose-600 dark:from-purple-400 dark:to-rose-400 bg-clip-text text-transparent mb-6">
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
                    className="flex items-center space-x-3 bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-md border-2 border-rose-200 dark:border-rose-800"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
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
                      <div className="text-sm text-gray-600 dark:text-gray-300">Fellow Practitioners</div>
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
                      <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-blue-600 dark:from-rose-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                        {packageData.currentPrice}
                      </div>
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mt-1">
                        Sacred Offering: Save {packageData.savings} ({packageData.savingsPercent})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">For All Seekers</div>
                      <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{packageData.level}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    href={packageData.ctaLink}
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="w-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 hover:from-rose-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {packageData.ctaText}
                  </Button>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Right Column - Guna Visualization */}
            <StaggerContainer>
              <StaggerItem>
                <div className="relative">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Center - Witness Eye */}
                    <HydrationSafeMotion
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-white via-purple-100 to-purple-500 shadow-2xl flex items-center justify-center z-20 border-4 border-white/30"
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
                      <Eye className="w-16 h-16 text-purple-900" />
                    </HydrationSafeMotion>

                    {/* Three Guna Layers */}
                    {[
                      { color: 'from-white to-blue-200', size: 180, speed: 15 },
                      { color: 'from-rose-300 to-purple-300', size: 260, speed: 20 },
                      { color: 'from-slate-400 to-gray-500', size: 340, speed: 25 }
                    ].map((guna, i) => (
                      <HydrationSafeMotion key={i}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-gradient-to-br ${guna.color} opacity-20`}
                        style={{
                          width: `${guna.size}px`,
                          height: `${guna.size}px`,
                        }}
                        animate={{
                          rotate: i % 2 === 0 ? 360 : -360,
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          rotate: { duration: guna.speed, repeat: 999999, ease: 'linear' },
                          scale: { duration: 3, repeat: 999999, ease: 'easeInOut' }
                        }}>
              <div />
            </HydrationSafeMotion>
                    ))}

                    {/* Emotional State Indicators */}
                    {[
                      { icon: Smile, label: 'Sattva', angle: 90, color: 'from-blue-500 to-cyan-500' },
                      { icon: Zap, label: 'Rajas', angle: 210, color: 'from-rose-500 to-pink-500' },
                      { icon: Meh, label: 'Tamas', angle: 330, color: 'from-slate-500 to-gray-500' }
                    ].map((emotion, i) => {
                      const Icon = emotion.icon
                      const rad = (emotion.angle * Math.PI) / 180
                      const radius = 170
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
                            scale: [1, 1.15, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: 999999,
                            delay: i * 0.7
                          }}
                          whileHover={{ scale: 1.25 }}
                        >
                          <div className={`bg-gradient-to-br ${emotion.color} p-4 rounded-2xl shadow-xl text-center w-24`}>
                            <Icon className="w-8 h-8 text-white mx-auto mb-1" />
                            <div className="text-xs text-white font-bold">{emotion.label}</div>
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
        title="Understanding Emotions Through Sacred Wisdom"
        subtitle="Ancient Sāṅkhya philosophy revealing the nature of emotional experience"
        metaphors={metaphors}
        theme="cosmic"
      />

      {/* Three Gunas Deep Dive */}
      <section className="py-20 bg-gradient-to-br from-white via-purple-50/20 to-rose-50/20 dark:from-slate-950 dark:via-purple-950/20 dark:to-rose-950/20">
        <div className="container mx-auto px-4">
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Mastering the Three Gunas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every emotion is a unique combination of sattva, rajas, and tamas—understanding this brings mastery
            </p>
          </HydrationSafeMotion>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {packageData.features.map((feature, index) => {
              const Icon = feature.icon
              const gradients = [
                'from-blue-500 to-cyan-500',
                'from-rose-500 to-pink-500',
                'from-purple-500 to-indigo-500',
                'from-rose-500 via-purple-500 to-blue-500'
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
        title="Sacred Qualities of Emotional Life"
        subtitle="Understanding the three gunas—the fundamental qualities creating all emotional experience"
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
              Your Emotional Mastery Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything needed to understand and master emotions through Sāṅkhya wisdom
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
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 via-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
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
        title="From Emotional Chaos to Inner Peace"
        introduction="Experience the profound transformation from being controlled by emotions to witnessing them with freedom and clarity"
        phases={storyPhases}
        conclusion="You are the witness—emotions pass like clouds, you remain as sky"
        theme="cosmic"
      />

      {/* Tabs Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/20 dark:from-slate-900 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
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
                      This transformative journey applies Sāṅkhya philosophy's profound insights to emotional intelligence. Rather than modern psychological approaches alone, you'll understand emotions through the lens of the three gunas—sattva (purity, clarity), rajas (activity, passion), and tamas (inertia, darkness)—the fundamental qualities of Prakriti (nature) that create all mental and emotional phenomena.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      Every emotion you experience is a unique combination of these three gunas. Joy is sattva-dominant, anger is rajas-dominant, depression is tamas-dominant. By recognizing guna patterns, you gain unprecedented understanding of your emotional life. More profoundly, you learn to identify as Purusha (witness consciousness) rather than the emotional states in Prakriti.
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                      This isn't about suppressing emotions but transforming your relationship with them. You learn to feel fully while remaining centered, to experience without being enslaved, to cultivate sattvic states consciously. The result is genuine emotional intelligence rooted in millennia-old wisdom—freedom to feel without losing yourself.
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
                            <div className="w-2 h-2 bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-full flex-shrink-0" />
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
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center">
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
      <section className="py-24 bg-gradient-to-br from-rose-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Guna Waves */}
        <div className="absolute inset-0 -z-10">
          {[0, 1, 2].map((i) => (
            <HydrationSafeMotion key={i}
              className="absolute w-full h-1/3"
              style={{
                top: `${i * 33}%`,
                background: i === 0 ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' :
                           i === 1 ? 'linear-gradient(90deg, transparent, rgba(236,72,153,0.1), transparent)' :
                           'linear-gradient(90deg, transparent, rgba(100,116,139,0.1), transparent)'
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: 999999,
                ease: 'linear'
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
                    className="w-20 h-20 bg-gradient-to-br from-rose-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-2xl"
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-10 h-10 text-white" />
                  </HydrationSafeMotion>
                  <h3 className="text-4xl md:text-5xl font-bold text-white">
                    Ready for Emotional Freedom?
                  </h3>
                </div>
                
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Begin your journey to emotional mastery. Understand the gunas, become the witness, and experience the freedom that comes from not being enslaved by passing emotional states.
                </p>
                
                    <HydrationSafeMotion 
                  className="inline-block bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 rounded-2xl p-6 mb-8 border-2 border-white/30 shadow-xl"
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
                      className="bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 hover:from-rose-200 hover:via-purple-200 hover:to-blue-200 text-purple-900 font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl text-xl"
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
                      <span className="font-medium">Witness Mastery</span>
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
