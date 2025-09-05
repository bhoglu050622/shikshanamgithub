'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, BookOpen, Users, Trophy, Star } from 'lucide-react'

// Sanskrit quotes for rotation
const sanskritQuotes = [
  {
    text: "सत्यमेव जयते",
    meaning: "Truth alone triumphs",
    transliteration: "Satyameva jayate",
    category: "Wisdom"
  },
  {
    text: "विद्या ददाति विनयम्",
    meaning: "Knowledge gives humility",
    transliteration: "Vidyā dadāti vinayam",
    category: "Learning"
  },
  {
    text: "अहं ब्रह्मास्मि",
    meaning: "I am the universe",
    transliteration: "Ahaṁ brahmāsmi",
    category: "Spirituality"
  },
  {
    text: "सर्वे भवन्तु सुखिनः",
    meaning: "May all beings be happy",
    transliteration: "Sarve bhavantu sukhinaḥ",
    category: "Compassion"
  }
]

// Indian art-inspired decorative elements
const DecorativeLotus = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="absolute top-20 right-20 w-24 h-24 text-golden-olive/20"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.path
        d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z"
        fill="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.circle
        cx="50" cy="50" r="8"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      />
    </svg>
  </motion.div>
)

const MandalaPattern = () => (
  <motion.div
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="absolute bottom-20 left-20 w-32 h-32 text-deep-maroon/10"
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <motion.circle
        cx="50" cy="50" r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      />
      <motion.circle
        cx="50" cy="50" r="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1 }}
      />
      <motion.circle
        cx="50" cy="50" r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: 1.5 }}
      />
    </svg>
  </motion.div>
)

// Progress tracking component
const ProgressIndicator = ({ currentLevel = 1, totalLevels = 3 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    className="absolute top-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-golden-olive/20"
  >
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-1">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-semibold text-dark-text">Level {currentLevel}</span>
      </div>
      <div className="flex space-x-1">
        {Array.from({ length: totalLevels }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.8 + i * 0.1 }}
            className={`w-2 h-2 rounded-full ${
              i < currentLevel ? 'bg-gradient-to-r from-golden-olive to-deep-maroon' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  </motion.div>
)

export default function SanskritHero() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'intermediate' | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  // Rotate Sanskrit quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % sanskritQuotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handlePathSelection = (path: 'beginner' | 'intermediate') => {
    setSelectedPath(path)
    setShowCelebration(true)
    
    // Hide celebration after animation
    setTimeout(() => setShowCelebration(false), 2000)
    
    // Scroll to Play & Learn section after selection
    setTimeout(() => {
      const playLearnSection = document.getElementById('play-learn')
      if (playLearnSection) {
        playLearnSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  return (
    <section className="relative overflow-hidden section-padding bg-parchment-ivory min-h-screen flex items-center">
      {/* Decorative Elements */}
      <DecorativeLotus />
      <MandalaPattern />
      <ProgressIndicator currentLevel={1} totalLevels={3} />
      
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-golden-olive to-deep-maroon text-white px-8 py-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6" />
                <span className="font-bold text-lg">Excellent Choice!</span>
                <Sparkles className="w-6 h-6" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Enhanced Hero Title with Devanagari */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-hero bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent mb-2">
              School of Sanskrit
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl md:text-4xl font-devanagari text-deep-maroon"
            >
              संस्कृत विद्यालयः
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-subheading text-dark-text mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Master the language of wisdom—step by step, joyfully. 
            <span className="text-deep-maroon font-semibold"> Discover the beauty of Sanskrit through interactive learning.</span>
          </motion.p>

          {/* Enhanced Rotating Sanskrit Quote */}
          <motion.figure 
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 mb-10 border border-golden-olive/20 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Decorative border pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-golden-olive/5 via-deep-maroon/5 to-copper-orange/5 rounded-3xl"></div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-golden-olive/20 to-deep-maroon/20 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-copper-orange/20 to-golden-olive/20 rounded-full"></div>
            
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentQuote}
                initial={{ opacity: 0, y: 20, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: -90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-center relative z-10"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-devanagari text-deep-maroon mb-3 leading-tight"
                >
                  {sanskritQuotes[currentQuote].text}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl text-golden-olive mb-2 font-medium"
                >
                  {sanskritQuotes[currentQuote].transliteration}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="text-muted-gray text-lg mb-3"
                >
                  {sanskritQuotes[currentQuote].meaning}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-golden-olive/10 to-deep-maroon/10 px-4 py-2 rounded-full"
                >
                  <Star className="w-4 h-4 text-copper-orange" />
                  <span className="text-sm font-medium text-deep-maroon">
                    {sanskritQuotes[currentQuote].category}
                  </span>
                </motion.div>
              </motion.blockquote>
            </AnimatePresence>
          </motion.figure>

          {/* Enhanced Choice CTAs */}
          <div className="flex flex-col lg:flex-row justify-center gap-6 mb-10">
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePathSelection('beginner')}
              className={`relative group bg-gradient-to-r from-golden-olive to-golden-olive/80 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${
                selectedPath === 'beginner' ? 'ring-4 ring-golden-olive/30 shadow-2xl' : 'hover:shadow-2xl'
              }`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-golden-olive/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: selectedPath === 'beginner' ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5" />
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-xl">Beginner</div>
                  <div className="text-sm opacity-90">I'm starting my Sanskrit journey</div>
                </div>
              </div>
              
              {/* Success indicator */}
              {selectedPath === 'beginner' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✓
                  </motion.div>
                </motion.div>
              )}
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePathSelection('intermediate')}
              className={`relative group bg-gradient-to-r from-copper-orange to-copper-orange/80 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${
                selectedPath === 'intermediate' ? 'ring-4 ring-copper-orange/30 shadow-2xl' : 'hover:shadow-2xl'
              }`}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-copper-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: selectedPath === 'intermediate' ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <Users className="w-5 h-5" />
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-xl">Intermediate</div>
                  <div className="text-sm opacity-90">I know the basics, I want practice</div>
                </div>
              </div>
              
              {/* Success indicator */}
              {selectedPath === 'intermediate' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    ✓
                  </motion.div>
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Enhanced Micro-CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/80 backdrop-blur-md border-2 border-golden-olive/30 text-deep-maroon text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 mx-auto hover:border-golden-olive/50"
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-6 bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full flex items-center justify-center"
            >
              <span className="text-white text-sm font-bold">?</span>
            </motion.div>
            <div className="text-left">
              <div className="font-semibold">Not sure where to start?</div>
              <div className="text-sm opacity-80">Take our 3-minute assessment</div>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Enhanced Path Selection Feedback */}
          <AnimatePresence>
            {selectedPath && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="mt-8 p-6 bg-gradient-to-r from-golden-olive/10 to-deep-maroon/10 rounded-2xl border border-golden-olive/20 shadow-lg backdrop-blur-sm"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-12 h-12 bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-deep-maroon font-semibold text-lg mb-2"
                    >
                      {selectedPath === 'beginner' 
                        ? 'Excellent choice for your Sanskrit journey! 🌟'
                        : 'Perfect! Ready to advance your Sanskrit skills! 🚀'
                      }
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-muted-gray mb-3"
                    >
                      {selectedPath === 'beginner' 
                        ? 'You\'ll start with the fundamentals and build a rock-solid foundation through interactive lessons, pronunciation practice, and step-by-step grammar mastery.'
                        : 'You\'ll focus on conversation practice, advanced grammar, and real-world applications to take your Sanskrit to the next level.'
                      }
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center space-x-2 text-sm text-deep-maroon font-medium"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>Scroll down to explore your personalized learning path</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Enhanced Background decorative elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 w-20 h-20 bg-golden-olive/10 rounded-full blur-xl"
      ></motion.div>
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-10 w-32 h-32 bg-deep-maroon/10 rounded-full blur-xl"
      ></motion.div>
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-copper-orange/10 rounded-full blur-xl"
      ></motion.div>
    </section>
  )
}
