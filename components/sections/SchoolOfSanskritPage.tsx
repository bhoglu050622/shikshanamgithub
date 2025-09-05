'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Volume2, 
  Clock, 
  BookOpen, 
  Users, 
  MessageCircle, 
  Download, 
  ChevronRight,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Keyboard,
  Headphones,
  User,
  ExternalLink,
  Pause,
  RotateCcw,
  Mic,
  Target,
  HelpCircle,
  Sparkles,
  Bookmark,
  Globe,
  Heart
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

// Data for the page
const sanskritQuotes = [
  {
    text: "सत्यमेव जयते",
    meaning: "Truth alone triumphs",
    transliteration: "Satyameva jayate"
  },
  {
    text: "विद्या ददाति विनयम्",
    meaning: "Knowledge gives humility",
    transliteration: "Vidyā dadāti vinayam"
  }
]

const playLearnCards = [
  {
    front: {
      title: "नमः",
      subtitle: "Salutation",
      description: "Learn respectful greeting"
    },
    back: {
      meaning: "A respectful salutation meaning 'I bow to you' - used to show reverence",
      action: "Pronounce",
      icon: Volume2
    }
  },
  {
    front: {
      title: "गृहः",
      subtitle: "House",
      description: "Learn about home"
    },
    back: {
      meaning: "The Sanskrit word for house or dwelling place",
      action: "Use in a sentence",
      icon: MessageCircle
    }
  },
  {
    front: {
      title: "कः?",
      subtitle: "Who?",
      description: "Question word"
    },
    back: {
      meaning: "The interrogative pronoun meaning 'who' in Sanskrit",
      action: "Quiz (1 MCQ)",
      icon: Target
    }
  }
]

const learningPath = [
  {
    title: "Basic Sanskrit Grammar",
    titleDevanagari: "संस्कृत भाषा प्रज्ञा",
    subtitle: "Build a rock-solid foundation",
    description: "letters → sandhi → vibhakti",
    badges: ["📚 PDFs", "🎧 Audio drills", "🧩 Quizzes"],
    cta: "Start Module (Free Preview)",
    icon: BookOpen,
    color: "from-saffron-500 to-saffron-600"
  },
  {
    title: "Basic Sanskrit Sambhāṣaṇam",
    titleDevanagari: "संस्कृत संभाषणम्",
    subtitle: "Daily phrases, greetings, introductions",
    description: "speak with confidence. Live practice pods twice a week.",
    badges: ["Live Sessions", "Practice Pods", "Mentor Feedback"],
    cta: "Join Practice Cohort",
    icon: MessageCircle,
    color: "from-peacock-green-500 to-peacock-green-600"
  },
  {
    title: "Live Speaking Practice",
    titleDevanagari: "जीवन्त संस्कृतम्",
    subtitle: "Small groups + mentor feedback + recordings",
    description: "Advanced conversations and spiritual discourse",
    badges: ["Small Groups", "Recordings", "Advanced"],
    cta: "Book Your Slot",
    icon: Users,
    color: "from-lotus-pink-500 to-lotus-pink-600"
  }
]

const gurus = [
  {
    name: "Dr. Ananya Sharma",
    title: "Vyakarana, Spoken Sanskrit",
    tags: ["Grammar Expert", "15+ years", "Vedic Studies"],
    image: "/images/gurus/ananya-sharma.jpg",
    profile: "/gurus/ananya-sharma"
  },
  {
    name: "Sri Raghav Ji",
    title: "Chanting, Pronunciation",
    tags: ["Pronunciation", "12+ years", "Chanting"],
    image: "/images/gurus/raghav-ji.jpg",
    profile: "/gurus/raghav-ji"
  },
  {
    name: "Meera Iyer",
    title: "Beginner facilitation, Games",
    tags: ["Beginner", "Games", "8+ years"],
    image: "/images/gurus/meera-iyer.jpg",
    profile: "/gurus/meera-iyer"
  }
]

const treasuryResources = [
  {
    title: "Blogs",
    description: "Guides, stories, grammar tips",
    icon: FileText,
    route: "/blogs/sanskrit",
    color: "from-saffron-500 to-saffron-600"
  },
  {
    title: "Glossaries",
    description: "Curated vocab lists with audio",
    icon: BookOpen,
    route: "/glossaries/sanskrit",
    color: "from-peacock-green-500 to-peacock-green-600"
  },
  {
    title: "Practice Sheets",
    description: "Printable PDFs & answer keys",
    icon: FileText,
    route: "/practice/sanskrit",
    color: "from-lotus-pink-500 to-lotus-pink-600"
  },
  {
    title: "Sanskrit Keyboard Helper",
    description: "Devanagari typing assistance",
    icon: Keyboard,
    route: "/tools/keyboard",
    color: "from-gold-500 to-gold-600"
  },
  {
    title: "Audio Sandhi Table",
    description: "Pronunciation and sound combinations",
    icon: Headphones,
    route: "/tools/sandhi",
    color: "from-purple-500 to-purple-600"
  }
]

export default function SchoolOfSanskritPage() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [aiMode, setAiMode] = useState<'pronunciation' | 'drills' | 'doubts'>('pronunciation')
  const [aiTimer, setAiTimer] = useState(5)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Rotate Sanskrit quotes every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sanskritQuotes.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // AI Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && aiTimer > 0) {
      interval = setInterval(() => {
        setAiTimer((prev) => prev - 1)
      }, 1000)
    } else if (aiTimer === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, aiTimer])

  const resetTimer = () => {
    setIsTimerRunning(false)
    setAiTimer(5)
  }

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-deep-indigo-500 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-hero bg-gradient-to-r from-saffron-500 via-peacock-green-500 to-lotus-pink-500 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              School of Sanskrit
            </motion.h1>
            
            <motion.p 
              className="text-subheading text-indigo-700 dark:text-soft-gold-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Master the language of wisdom—step by step, joyfully.
            </motion.p>

            {/* Rotating Sanskrit Quote */}
            <motion.figure 
              className="bg-white/80 dark:bg-deep-indigo-500/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-saffron-200/30 dark:border-soft-gold-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={currentQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-devanagari text-indigo-700 dark:text-soft-gold-500 mb-2">
                    {sanskritQuotes[currentQuote].text}
                  </div>
                  <div className="text-lg text-saffron-600 dark:text-saffron-400 mb-1">
                    {sanskritQuotes[currentQuote].transliteration}
                  </div>
                  <figcaption className="text-wisdom-600 dark:text-wisdom-400">
                    {sanskritQuotes[currentQuote].meaning}
                  </figcaption>
                </motion.blockquote>
              </AnimatePresence>
            </motion.figure>

            {/* Level Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-saffron-500 to-saffron-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center space-x-2">
                  <span>Beginner</span>
                  <span className="text-sm opacity-90">— I'm starting my Sanskrit journey.</span>
                </div>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-peacock-green-500 to-peacock-green-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center space-x-2">
                  <span>Intermediate</span>
                  <span className="text-sm opacity-90">— I know the basics, I want practice.</span>
                </div>
              </motion.button>
            </div>

            {/* Placement Check CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
            >
              <span>Placement Check</span>
              <span className="text-sm opacity-90">→ Check your stage in 3 minutes.</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Play & Learn Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Play & Learn
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              Gamified warm-up with interactive cards. Tap to flip and reveal meanings, 
              then practice with audio and quizzes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {playLearnCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative h-64 cursor-pointer"
                onClick={() => setFlippedCard(flippedCard === index ? null : index)}
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotateY: flippedCard === index ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="card-premium h-full flex flex-col justify-center items-center text-center p-6">
                      <div className="text-3xl font-devanagari text-indigo-700 dark:text-soft-gold-500 mb-2">
                        {card.front.title}
                      </div>
                      <div className="text-saffron-600 dark:text-saffron-400 font-semibold mb-2">
                        {card.front.subtitle}
                      </div>
                      <div className="text-wisdom-600 dark:text-wisdom-400 text-sm">
                        {card.front.description}
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                    <div className="card-premium h-full flex flex-col justify-center items-center text-center p-6">
                      <div className="text-wisdom-600 dark:text-wisdom-400 mb-4 text-sm leading-relaxed">
                        {card.back.meaning}
                      </div>
                      <button className="flex items-center space-x-2 bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2 rounded-xl transition-colors">
                        <card.back.icon className="w-4 h-4" />
                        <span>{card.back.action}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Sequential Path Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Your Sequential Path
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              Guided curriculum with structured learning journey from grammar fundamentals 
              to living Sanskrit conversations with expert guidance.
            </p>
          </motion.div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {learningPath.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card-premium p-8 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                  {step.title}
                </h3>
                <div className="text-sm text-saffron-600 dark:text-saffron-400 mb-4 font-devanagari">
                  {step.titleDevanagari}
                </div>
                <p className="text-wisdom-600 dark:text-wisdom-400 mb-2 text-sm font-semibold">
                  {step.subtitle}
                </p>
                <p className="text-wisdom-600 dark:text-wisdom-400 mb-6 text-sm leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {step.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-3 py-1 rounded-full text-xs font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
                <button className="btn-primary w-full">
                  {step.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {learningPath.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  {index < learningPath.length - 1 && (
                    <div className="w-0.5 h-16 bg-saffron-200 dark:bg-saffron-800 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 card-premium p-6">
                  <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-1">
                    {step.title}
                  </h3>
                  <div className="text-sm text-saffron-600 dark:text-saffron-400 mb-3 font-devanagari">
                    {step.titleDevanagari}
                  </div>
                  <p className="text-wisdom-600 dark:text-wisdom-400 mb-2 text-sm font-semibold">
                    {step.subtitle}
                  </p>
                  <p className="text-wisdom-600 dark:text-wisdom-400 mb-4 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {step.badges.map((badge, badgeIndex) => (
                      <span key={badgeIndex} className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-2 py-1 rounded-full text-xs font-medium">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <button className="btn-primary text-sm px-4 py-2">
                    {step.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Gurus Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Meet Your Gurus
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              Learn from experienced Sanskrit scholars and native speakers who 
              bring ancient wisdom to modern learning with gentle guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {gurus.map((guru, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="card-premium p-6 text-center group-hover:shadow-2xl transition-all duration-300">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center relative overflow-hidden">
                      <User className="w-12 h-12 text-white" />
                      {/* Halo glow effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-soft-gold-400/30 to-saffron-400/30 blur-sm group-hover:blur-md transition-all duration-300"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-1">
                    {guru.name}
                  </h3>
                  <p className="text-saffron-600 dark:text-saffron-400 text-sm mb-4">
                    {guru.title}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {guru.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-saffron-600 dark:text-saffron-400 hover:text-saffron-700 dark:hover:text-saffron-300 text-sm font-medium flex items-center space-x-1 mx-auto group-hover:scale-105 transition-all duration-300">
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI is Your Guru Too Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              AI is Your Guru Too
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              A friendly AI tutor for drill practice and doubts. Get instant feedback 
              on pronunciation, practice drills, and clear your doubts.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <div className="card-premium p-8">
              {/* Clock-wheel Timer Control */}
              <div className="text-center mb-8">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-full flex items-center justify-center relative">
                    <div className="text-white text-2xl font-bold">
                      {aiTimer}
                    </div>
                    {/* Clock hand */}
                    <div 
                      className="absolute w-1 h-12 bg-white origin-bottom"
                      style={{ 
                        transform: `rotate(${(aiTimer / 5) * 360}deg)`,
                        transformOrigin: 'bottom center'
                      }}
                    ></div>
                    {/* Subtle diya glow in night mode */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-soft-gold-400/20 to-saffron-400/20 blur-sm dark:blur-md transition-all duration-300"></div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2 mb-4">
                  {[5, 10, 20].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => {
                        setAiTimer(minutes)
                        setIsTimerRunning(false)
                      }}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                        aiTimer === minutes
                          ? "bg-saffron-500 text-white shadow-lg"
                          : "bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 hover:bg-saffron-200 dark:hover:bg-saffron-800/50"
                      )}
                    >
                      {minutes}m
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={isTimerRunning ? resetTimer : startTimer}
                    className="flex items-center space-x-2 bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Start</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="flex items-center space-x-2 bg-wisdom-200 dark:bg-wisdom-700 text-wisdom-700 dark:text-wisdom-300 px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Mode Tabs */}
              <div className="flex justify-center space-x-1 bg-saffron-100 dark:bg-saffron-900/30 rounded-2xl p-1 mb-6">
                {[
                  { key: 'pronunciation', label: 'Pronunciation Coach', icon: Mic },
                  { key: 'drills', label: 'Declension/Conjugation Drills', icon: Target },
                  { key: 'doubts', label: 'Quick Doubt Solver', icon: HelpCircle }
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setAiMode(mode.key as any)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2",
                      aiMode === mode.key
                        ? "bg-white dark:bg-deep-indigo-500 text-saffron-600 dark:text-saffron-400 shadow-sm"
                        : "text-saffron-700 dark:text-saffron-300 hover:text-saffron-600 dark:hover:text-saffron-400"
                    )}
                  >
                    <mode.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                    <span className="sm:hidden">{mode.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Try a 5-minute session (no signup for first run)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The School's Treasury Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              The School's Treasury
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto">
              Access our comprehensive collection of Sanskrit resources, 
              tools, and learning materials. Everything you need for your journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treasuryResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="card-premium p-6 h-full group-hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <resource.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-wisdom-600 dark:text-wisdom-400 text-sm mb-4 leading-relaxed">
                        {resource.description}
                      </p>
                      <div className="flex items-center space-x-2 text-saffron-600 dark:text-saffron-400 text-sm font-medium group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
                        <Bookmark className="w-4 h-4" />
                        <span>Explore</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
