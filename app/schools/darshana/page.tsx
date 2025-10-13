'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Atom, 
  Eye, 
  Heart, 
  Scale, 
  Lightbulb,
  ArrowRight,
  Download,
  MessageCircle,
  Instagram,
  HelpCircle,
  Mail,
  ChevronDown,
  CheckCircle,
  Play,
  Users,
  BookOpen,
  Star,
  Sparkles,
  Flower,
  Award,
  Target,
  Clock,
  Globe,
  Zap
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'
import DownloadAppNew from '@/components/sections/DownloadAppNew'
import JoinCommunity from '@/components/sections/JoinCommunity'
import FAQ from '@/components/sections/FAQ'

// Enhanced Darshana data with richer content
const darshanas = [
  {
    id: 'nyaya',
    name: 'Nyāya',
    sanskrit: 'न्याय',
    description: 'The Science of Logic & Reasoning',
    detailedDescription: 'Master the art of clear thinking, valid inference, and systematic debate. Learn to distinguish truth from falsehood through rigorous logical analysis.',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'from-blue-600 to-blue-700',
    tooltip: 'Think clearly; infer soundly.',
    position: { angle: 0, x: 0, y: -1 },
    keyConcepts: ['Pramāṇa (Means of Knowledge)', 'Tarka (Logic)', 'Vāda (Debate)', 'Hetvābhāsa (Fallacies)'],
    founder: 'Akshapada Gautama',
    text: 'Nyāya Sūtra',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    students: '1,200+',
    rating: 4.8
  },
  {
    id: 'vaisheshika',
    name: 'Vaiśeṣika',
    sanskrit: 'वैशेषिक',
    description: 'The Atomic Theory of Reality',
    detailedDescription: 'Explore the fundamental building blocks of existence. Understand how reality is structured through categories, atoms, and their interactions.',
    icon: Atom,
    color: 'from-green-500 to-green-600',
    hoverColor: 'from-green-600 to-green-700',
    tooltip: 'What reality is made of.',
    position: { angle: 60, x: 0.866, y: -0.5 },
    keyConcepts: ['Dravya (Substance)', 'Guṇa (Quality)', 'Karma (Action)', 'Padārtha (Categories)'],
    founder: 'Kaṇāda',
    text: 'Vaiśeṣika Sūtra',
    duration: '5-7 weeks',
    difficulty: 'Intermediate',
    students: '980+',
    rating: 4.7
  },
  {
    id: 'samkhya',
    name: 'Sāṅkhya',
    sanskrit: 'साङ्ख्य',
    description: 'The Map of Consciousness',
    detailedDescription: 'Discover the profound understanding of consciousness and matter. Learn about the 24 principles (tattvas) that make up reality.',
    icon: Eye,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'from-purple-600 to-purple-700',
    tooltip: 'Puruṣa & Prakṛti—two principles.',
    position: { angle: 120, x: 0.866, y: 0.5 },
    keyConcepts: ['Puruṣa (Consciousness)', 'Prakṛti (Matter)', 'Tattva (Principles)', 'Kaivalya (Liberation)'],
    founder: 'Kapila',
    text: 'Sāṅkhya Kārikā',
    duration: '7-9 weeks',
    difficulty: 'Advanced',
    students: '1,450+',
    rating: 4.9
  },
  {
    id: 'yoga',
    name: 'Yoga',
    sanskrit: 'योग',
    description: 'The Path of Self-Realization',
    detailedDescription: 'Transform your life through the eight limbs of yoga. From ethical living to meditation, discover the complete path to inner peace.',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    hoverColor: 'from-red-600 to-red-700',
    tooltip: 'Still the mind; transform life.',
    position: { angle: 180, x: 0, y: 1 },
    keyConcepts: ['Aṣṭāṅga (Eight Limbs)', 'Citta-vṛtti-nirodhaḥ', 'Samādhi (Meditation)', 'Kaivalya (Liberation)'],
    founder: 'Patañjali',
    text: 'Yoga Sūtra',
    duration: '8-10 weeks',
    difficulty: 'Beginner to Advanced',
    students: '2,100+',
    rating: 4.9
  },
  {
    id: 'mimamsa',
    name: 'Mīmāṁsā',
    sanskrit: 'मीमांसा',
    description: 'The Science of Dharma',
    detailedDescription: 'Understand the principles of right action, duty, and ethical living. Learn how to interpret sacred texts and apply their wisdom.',
    icon: Scale,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'from-orange-600 to-orange-700',
    tooltip: 'Duty, ethics, ritual praxis.',
    position: { angle: 240, x: -0.866, y: 0.5 },
    keyConcepts: ['Dharma (Duty)', 'Karma (Action)', 'Vidhi (Injunction)', 'Nishēdha (Prohibition)'],
    founder: 'Jaimini',
    text: 'Mīmāṁsā Sūtra',
    duration: '6-8 weeks',
    difficulty: 'Advanced',
    students: '850+',
    rating: 4.6
  },
  {
    id: 'vedanta',
    name: 'Vedānta',
    sanskrit: 'वेदान्त',
    description: 'The Ultimate Reality',
    detailedDescription: 'Discover the non-dual nature of existence. Understand that the Self and the Absolute are one, leading to profound spiritual realization.',
    icon: Lightbulb,
    color: 'from-yellow-500 to-yellow-600',
    hoverColor: 'from-yellow-600 to-yellow-700',
    tooltip: 'Self = Brahman (non-dual insight).',
    position: { angle: 300, x: -0.866, y: -0.5 },
    keyConcepts: ['Brahman (Absolute)', 'Ātman (Self)', 'Māyā (Illusion)', 'Mokṣa (Liberation)'],
    founder: 'Bādarāyaṇa',
    text: 'Brahma Sūtra',
    duration: '10-12 weeks',
    difficulty: 'Advanced',
    students: '1,800+',
    rating: 4.9
  }
]

// Enhanced learning path with better structure
const learningPath = [
  {
    id: 'foundation',
    title: 'Philosophical Foundation',
    titleSanskrit: 'दर्शन मूलाधार',
    description: 'Build your philosophical foundation with essential concepts, Sanskrit terminology, and the interconnected nature of all six schools.',
    detailedDescription: 'Understand the common ground that unites all darshanas, master key Sanskrit terms, and learn how each school complements the others.',
    icon: BookOpen,
    color: 'from-saffron-500 to-saffron-600',
    duration: '2-3 weeks',
    modules: ['Introduction to Indian Philosophy', 'Sanskrit Terminology', 'Interconnections', 'Historical Context'],
    badge: 'Foundation'
  },
  {
    id: 'nyaya-vaisheshika',
    title: 'Logic & Reality',
    titleSanskrit: 'तर्क एवं सत्ता',
    description: 'Master the analytical schools: Nyaya for logic and Vaisheshika for understanding the structure of reality.',
    detailedDescription: 'Learn systematic reasoning, valid inference, and the atomic theory of existence. Perfect for analytical minds.',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    duration: '4-5 weeks',
    modules: ['Nyaya Logic', 'Vaisheshika Categories', 'Debate Techniques', 'Fallacy Recognition'],
    badge: 'Analytical'
  },
  {
    id: 'samkhya-yoga',
    title: 'Consciousness & Practice',
    titleSanskrit: 'चेतना एवं साधना',
    description: 'Explore consciousness through Samkhya theory and transform it through Yoga practice.',
    detailedDescription: 'Understand the 24 principles of reality and apply the eight limbs of yoga for personal transformation.',
    icon: Heart,
    color: 'from-purple-500 to-purple-600',
    duration: '5-6 weeks',
    modules: ['Samkhya Philosophy', 'Yoga Psychology', 'Meditation Practice', 'Self-Realization'],
    badge: 'Transformative'
  },
  {
    id: 'mimamsa-vedanta',
    title: 'Dharma & Liberation',
    titleSanskrit: 'धर्म एवं मोक्ष',
    description: 'Understand duty and ethics through Mimamsa, then transcend to ultimate reality with Vedanta.',
    detailedDescription: 'Learn the science of right action and discover the non-dual nature of existence for complete liberation.',
    icon: Lightbulb,
    color: 'from-orange-500 to-orange-600',
    duration: '6-7 weeks',
    modules: ['Mimamsa Ethics', 'Vedanta Philosophy', 'Textual Interpretation', 'Spiritual Realization'],
    badge: 'Liberating'
  },
  {
    id: 'integration',
    title: 'Wisdom Integration',
    titleSanskrit: 'ज्ञान समन्वय',
    description: 'Synthesize all six schools into a unified understanding of life, reality, and the path to wisdom.',
    detailedDescription: 'Integrate insights from all darshanas to develop a comprehensive worldview and practical wisdom for modern living.',
    icon: Star,
    color: 'from-indigo-500 to-indigo-600',
    duration: '3-4 weeks',
    modules: ['Synthesis', 'Modern Applications', 'Personal Philosophy', 'Teaching Others'],
    badge: 'Mastery'
  }
]

// Enhanced quiz questions for better recommendations
const quizQuestions = [
  {
    id: 'philosophical_interest',
    question: 'What philosophical question fascinates you most?',
    options: [
      { value: 'logic', label: 'How can we distinguish truth from falsehood?', darshanas: ['nyaya', 'vaisheshika'], icon: Brain },
      { value: 'consciousness', label: 'What is the nature of consciousness and self?', darshanas: ['samkhya', 'vedanta'], icon: Eye },
      { value: 'transformation', label: 'How can I transform my life and find peace?', darshanas: ['yoga', 'mimamsa'], icon: Heart }
    ]
  },
  {
    id: 'learning_style',
    question: 'How do you prefer to approach learning?',
    options: [
      { value: 'analytical', label: 'Systematic analysis and logical reasoning', darshanas: ['nyaya', 'vaisheshika'], icon: Target },
      { value: 'contemplative', label: 'Deep reflection and meditation', darshanas: ['samkhya', 'vedanta'], icon: Sparkles },
      { value: 'practical', label: 'Hands-on practice and direct experience', darshanas: ['yoga', 'mimamsa'], icon: Zap }
    ]
  },
  {
    id: 'life_focus',
    question: 'What aspect of life do you want to understand better?',
    options: [
      { value: 'reality', label: 'The fundamental structure of reality', darshanas: ['vaisheshika', 'samkhya'], icon: Atom },
      { value: 'knowledge', label: 'How we acquire and validate knowledge', darshanas: ['nyaya', 'mimamsa'], icon: BookOpen },
      { value: 'liberation', label: 'The path to freedom and enlightenment', darshanas: ['yoga', 'vedanta'], icon: Lightbulb }
    ]
  },
  {
    id: 'spiritual_approach',
    question: 'What spiritual practice resonates with you?',
    options: [
      { value: 'ritual', label: 'Sacred rituals and ethical living', darshanas: ['mimamsa'], icon: Scale },
      { value: 'meditation', label: 'Meditation and mindfulness practices', darshanas: ['yoga'], icon: Heart },
      { value: 'philosophy', label: 'Pure philosophical inquiry and study', darshanas: ['nyaya', 'vaisheshika', 'samkhya', 'vedanta'], icon: Brain }
    ]
  },
  {
    id: 'ultimate_goal',
    question: 'What is your ultimate learning goal?',
    options: [
      { value: 'understanding', label: 'Deep understanding of existence', darshanas: ['samkhya', 'vedanta'], icon: Eye },
      { value: 'wisdom', label: 'Practical wisdom for daily life', darshanas: ['yoga', 'mimamsa'], icon: Star },
      { value: 'knowledge', label: 'Systematic knowledge and reasoning skills', darshanas: ['nyaya', 'vaisheshika'], icon: BookOpen }
    ]
  }
]


// Stats for the page
const stats = [
  { number: '8,500+', label: 'Active Students', icon: Users },
  { number: '6', label: 'Darshanas', icon: BookOpen },
  { number: '100%', label: 'Success Rate', icon: Star }
]

export default function SchoolOfDarshanaPage() {
  const [selectedDarshana, setSelectedDarshana] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  // Calculate recommended darshana
  const getRecommendedDarshana = () => {
    const scores: Record<string, number> = {}
    
    Object.values(quizAnswers).forEach(answer => {
      const question = quizQuestions.find(q => 
        q.options.some(opt => opt.value === answer)
      )
      if (question) {
        const option = question.options.find(opt => opt.value === answer)
        if (option) {
          option.darshanas.forEach(darshana => {
            scores[darshana] = (scores[darshana] || 0) + 1
          })
        }
      }
    })

    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b, 'nyaya')
  }

  // Scroll to darshana card
  const scrollToDarshana = (darshanaId: string) => {
    setSelectedDarshana(darshanaId)
    const element = document.getElementById(`darshana-${darshanaId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Handle quiz completion
  const handleQuizComplete = () => {
    const recommended = getRecommendedDarshana()
    setShowQuiz(false)
    setTimeout(() => scrollToDarshana(recommended), 300)
  }

  return (
    <>
      
      {/* Enhanced Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30 dark:from-saffron-900/10 dark:via-transparent dark:to-deep-teal-900/10">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          {/* Enhanced background gradients */}
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 dark:from-saffron-400/10 dark:via-deep-teal-400/8 dark:to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 dark:from-deep-teal-400/10 dark:via-indigo-400/8 dark:to-saffron-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 via-saffron-200/15 to-deep-teal-200/20 dark:from-indigo-400/10 dark:via-saffron-400/8 dark:to-deep-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-4000"></div>
          
          {/* Indian pattern overlay */}
          <div className="absolute inset-0 indian-pattern opacity-30 dark:opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-saffron-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <Flower className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-hero text-high-contrast mb-8">
                School of{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent">
                  Darshana
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-subheading text-medium-contrast mb-8 max-w-4xl mx-auto devanagari-separator">
                Discover the Six Classical Schools of Indian Philosophy
              </p>
            </StaggerItem>


            {/* Stats */}
            <StaggerItem>
              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={`stat-${stat.label}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 text-medium-contrast"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 dark:from-saffron-400 dark:to-saffron-500 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-high-contrast">{stat.number}</div>
                        <div className="text-sm text-wisdom-500 dark:text-wisdom-400">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* CTA Buttons */}
            <StaggerItem>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuiz(true)}
                  className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg"
                >
                  <Target className="w-6 h-6" />
                  <span>Find Your Darshana</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToDarshana('nyaya')}
                  className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Explore All Schools</span>
                </motion.button>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </section>

      {/* Enhanced Darshana Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Choose Your Path to Wisdom
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Each darshana offers a unique approach to understanding reality. 
              Select the one that resonates with your learning style and philosophical interests.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {darshanas.map((darshana, index) => {
              const CardContent = (
                <motion.div
                  key={darshana.id}
                  id={`darshana-${darshana.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -12,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group perspective-1000 cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                <div className="card-premium p-8 h-full group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron-100/20 to-deep-teal-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  {/* Header */}
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-r ${darshana.color} hover:${darshana.hoverColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <darshana.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2 text-center group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                      {darshana.name}
                    </h3>
                    
                    <p className="text-lg font-devanagari text-saffron-600 dark:text-saffron-400 mb-4 text-center">
                      {darshana.sanskrit}
                    </p>
                    
                    <p className="text-wisdom-600 dark:text-wisdom-400 mb-2 text-center font-semibold">
                      {darshana.description}
                    </p>
                    
                    <p className="text-wisdom-600 dark:text-wisdom-400 mb-6 text-center leading-relaxed text-sm">
                      {darshana.detailedDescription}
                    </p>
                  </div>

                  {/* Key Concepts */}
                  <div className="relative z-10 mb-6">
                    <h4 className="text-sm font-semibold text-indigo-700 dark:text-soft-gold-500 mb-3 text-center">
                      Key Concepts
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {darshana.keyConcepts.slice(0, 2).map((concept, conceptIndex) => (
                        <span key={conceptIndex} className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-3 py-1 rounded-full text-xs font-medium">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="relative z-10 grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                      <div className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500">{darshana.students}</div>
                      <div className="text-xs text-wisdom-500 dark:text-wisdom-400">Students</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500">{darshana.rating}</div>
                      <div className="text-xs text-wisdom-500 dark:text-wisdom-400">Rating</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex items-center justify-center space-x-2 text-saffron-600 dark:text-saffron-400 font-medium group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
                    <span>Explore {darshana.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </motion.div>
              )

              // All darshana cards are now display-only without links to individual pages
              return <div key={darshana.id}>{CardContent}</div>
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Recommendation CTA */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="card-premium p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-saffron-100/20 to-deep-teal-100/20 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-deep-teal-100/20 to-indigo-100/20 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10">
                <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                  Not Sure Where to Begin?
                </h2>
                
                <p className="text-body text-wisdom-600 dark:text-wisdom-400 mb-8 max-w-2xl mx-auto">
                  Take our personalized quiz to discover which darshana aligns with your interests, 
                  learning style, and philosophical goals. Get a customized learning path in just 2 minutes.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowQuiz(true)}
                    className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg"
                  >
                    <Target className="w-6 h-6" />
                    <span>Take the Quiz</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToDarshana('foundation')}
                    className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg"
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>Start with Foundation</span>
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-wisdom-500 dark:text-wisdom-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>2 minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Personalized</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Free</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowQuiz(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white dark:bg-wisdom-800 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-saffron-200/30 dark:border-saffron-400/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                  Find Your Perfect Darshana
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400">
                  Answer these questions to discover which philosophical school aligns with your interests and learning style.
                </p>
              </div>
              
              <div className="space-y-8">
                {quizQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-premium p-6"
                  >
                    <h4 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-4">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-start space-x-4 p-4 rounded-xl hover:bg-saffron-50 dark:hover:bg-wisdom-700 cursor-pointer transition-all duration-200 group border border-transparent hover:border-saffron-200 dark:hover:border-saffron-800"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={quizAnswers[question.id] === option.value}
                            onChange={(e) => setQuizAnswers(prev => ({
                              ...prev,
                              [question.id]: e.target.value
                            }))}
                            className="w-5 h-5 text-saffron-600 focus:ring-saffron-500 mt-1"
                          />
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <option.icon className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                            </div>
                            <span className="text-wisdom-700 dark:text-wisdom-300 leading-relaxed">
                              {option.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuiz(false)}
                  className="px-8 py-4 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-2xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200 focus-ring font-medium"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleQuizComplete}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="px-8 py-4 bg-gradient-to-r from-saffron-600 to-saffron-700 dark:from-saffron-500 dark:to-saffron-600 text-white rounded-2xl hover:shadow-lg transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
                >
                  <Target className="w-5 h-5" />
                  <span>Get My Recommendation</span>
                </motion.button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-wisdom-500 dark:text-wisdom-400">
                  {Object.keys(quizAnswers).length} of {quizQuestions.length} questions answered
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Homepage-Style Sections */}
      <DownloadAppNew />
      <JoinCommunity />
      <FAQ />
    </>
  )
}
