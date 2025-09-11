'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, BookOpen, Users, Trophy, Star } from 'lucide-react'


// Sanskrit-themed decorative elements
const SanskritDecoration = () => (
  <div className="absolute top-20 right-20 w-8 h-8 bg-golden-olive/20 rounded-full"></div>
)

// Floating Sanskrit characters - Highly visible with many elements
const FloatingSanskritChars = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Primary Sanskrit characters - Large and highly visible, flowing in center */}
    <motion.div
      animate={{ 
        y: [0, -40, 0],
        opacity: [0.25, 0.6, 0.25],
        rotate: [0, 12, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/3 left-1/3 text-6xl font-devanagari text-golden-olive/50 drop-shadow-lg"
    >
      ॐ
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, 35, 0],
        opacity: [0.25, 0.55, 0.25],
        rotate: [0, -8, 0],
        scale: [1, 1.15, 1]
      }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute top-1/4 right-1/4 text-5xl font-devanagari text-deep-maroon/45 drop-shadow-lg"
    >
      श्री
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, -30, 0],
        opacity: [0.25, 0.5, 0.25],
        rotate: [0, 5, 0],
        scale: [1, 1.18, 1]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-1/3 left-1/4 text-4xl font-devanagari text-copper-orange/45 drop-shadow-lg"
    >
      गणेश
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, 28, 0],
        opacity: [0.25, 0.55, 0.25],
        rotate: [0, -10, 0],
        scale: [1, 1.12, 1]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="absolute bottom-1/4 right-1/3 text-4xl font-devanagari text-golden-olive/45 drop-shadow-lg"
    >
      राम
    </motion.div>
    
    {/* Secondary Sanskrit characters - Medium size, flowing in center */}
    <motion.div
      animate={{ 
        y: [0, -25, 0],
        opacity: [0.2, 0.45, 0.2],
        rotate: [0, 6, 0]
      }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      className="absolute top-2/5 left-2/5 text-3xl font-devanagari text-deep-maroon/35 drop-shadow-md"
    >
      कृष्ण
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, 32, 0],
        opacity: [0.2, 0.5, 0.2],
        rotate: [0, -5, 0]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute bottom-2/5 right-2/5 text-3xl font-devanagari text-copper-orange/35 drop-shadow-md"
    >
      शिव
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        opacity: [0.2, 0.4, 0.2],
        rotate: [0, 4, 0]
      }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      className="absolute top-1/3 right-1/3 text-2xl font-devanagari text-golden-olive/35 drop-shadow-md"
    >
      विष्णु
    </motion.div>
  <motion.div
      animate={{ 
        y: [0, 25, 0],
        opacity: [0.2, 0.45, 0.2],
        rotate: [0, -7, 0]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      className="absolute bottom-1/3 left-1/3 text-2xl font-devanagari text-deep-maroon/35 drop-shadow-md"
    >
      दुर्गा
  </motion.div>
    
    {/* Tertiary Sanskrit characters - Smaller but still visible, flowing in center */}
    <motion.div
      animate={{ 
        y: [0, -18, 0],
        opacity: [0.15, 0.35, 0.15],
        rotate: [0, 3, 0]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      className="absolute top-1/2 left-1/2 text-xl font-devanagari text-copper-orange/30 drop-shadow-sm"
    >
      लक्ष्मी
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, 22, 0],
        opacity: [0.15, 0.4, 0.15],
        rotate: [0, -4, 0]
      }}
      transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
      className="absolute bottom-1/2 right-1/2 text-xl font-devanagari text-golden-olive/30 drop-shadow-sm"
    >
      सरस्वती
    </motion.div>
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        opacity: [0.15, 0.3, 0.15],
        rotate: [0, 2, 0]
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      className="absolute top-2/5 left-2/5 text-lg font-devanagari text-deep-maroon/30 drop-shadow-sm"
    >
      हनुमान
    </motion.div>
  <motion.div
      animate={{ 
        y: [0, 20, 0],
        opacity: [0.15, 0.35, 0.15],
        rotate: [0, -3, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4.2 }}
      className="absolute bottom-2/5 right-2/5 text-lg font-devanagari text-copper-orange/30 drop-shadow-sm"
    >
      काली
  </motion.div>
    
    {/* Additional smaller Sanskrit elements for density, flowing in center */}
    <motion.div
      animate={{ 
        y: [0, -12, 0],
        opacity: [0.1, 0.25, 0.1],
        rotate: [0, 1, 0]
      }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      className="absolute top-3/5 left-3/5 text-base font-devanagari text-golden-olive/25 drop-shadow-sm"
    >
      बुद्ध
    </motion.div>
  <motion.div
      animate={{ 
        y: [0, 18, 0],
        opacity: [0.1, 0.3, 0.1],
        rotate: [0, -2, 0]
      }}
      transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
      className="absolute bottom-3/5 right-3/5 text-base font-devanagari text-deep-maroon/25 drop-shadow-sm"
    >
      महावीर
    </motion.div>
      </div>
)

// Enhanced Sanskrit pattern overlay - Multiple layers for richness
const SanskritPatternOverlay = () => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Primary pattern layer */}
    <motion.div
      animate={{ 
        backgroundPosition: ['0% 0%', '100% 100%'],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="w-full h-full opacity-15"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-13.807-11.193-25-25-25s-25 11.193-25 25 11.193 25 25 25 25-11.193 25-25zm0 0c0 13.807 11.193 25 25 25s25-11.193 25-25-11.193-25-25-25-25 11.193-25 25z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}
    />
    {/* Secondary pattern layer */}
    <motion.div
      animate={{ 
        backgroundPosition: ['100% 100%', '0% 0%'],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="w-full h-full opacity-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.15'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm0 0c0 8.284 6.716 15 15 15s15-6.716 15-15-6.716-15-15-15-15 6.716-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    />
    {/* Tertiary pattern layer */}
          <motion.div
      animate={{ 
        backgroundPosition: ['50% 0%', '50% 100%'],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="w-full h-full opacity-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CD853F' fill-opacity='0.12'%3E%3Cpath d='M20 20c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10zm0 0c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}
    />
      </div>
)

// Simple progress indicator
const SimpleProgressIndicator = ({ currentLevel = 1, totalLevels = 3 }) => (
  <div className="absolute top-8 right-8 bg-white/90 rounded-lg p-3 shadow-md border border-golden-olive/20">
    <div className="flex items-center space-x-2">
      <Trophy className="w-4 h-4 text-yellow-500" />
      <span className="text-sm font-medium text-dark-text">Level {currentLevel}</span>
    </div>
  </div>
)

export default function SanskritHero() {
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'intermediate' | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

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
      {/* Sanskrit Background Animations */}
      <SanskritPatternOverlay />
      <FloatingSanskritChars />
      
      {/* Decorative Elements */}
      <SanskritDecoration />
      <SimpleProgressIndicator currentLevel={1} totalLevels={3} />
      
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Hero Title with Devanagari */}
          <div className="mb-6">
            <h1 className="text-hero bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent mb-2">
              Unlock the Language of the Gods
            </h1>
            <div className="text-3xl md:text-4xl font-devanagari text-deep-maroon">
              देववाणी
            </div>
          </div>
          
          <p className="text-subheading text-dark-text mb-8 max-w-3xl mx-auto leading-relaxed">
            Master the language of wisdom—step by step, joyfully. 
            <span className="text-deep-maroon font-semibold"> Discover the beauty of Sanskrit through interactive learning.</span>
          </p>


          {/* Choice CTAs */}
          <div className="flex flex-col lg:flex-row justify-center gap-6 mb-8">
            <button
              onClick={() => handlePathSelection('beginner')}
              className={`relative group bg-gradient-to-r from-golden-olive to-golden-olive/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                selectedPath === 'beginner' ? 'ring-2 ring-golden-olive/30' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">Beginner</div>
                  <div className="text-sm opacity-90">I'm starting my Sanskrit journey</div>
                </div>
              </div>
              
              {/* Success indicator */}
              {selectedPath === 'beginner' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
              )}
            </button>
            
            <button
              onClick={() => handlePathSelection('intermediate')}
              className={`relative group bg-gradient-to-r from-copper-orange to-copper-orange/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                selectedPath === 'intermediate' ? 'ring-2 ring-copper-orange/30' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg">Intermediate</div>
                  <div className="text-sm opacity-90">I know the basics, I want practice</div>
                </div>
              </div>
              
              {/* Success indicator */}
              {selectedPath === 'intermediate' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  ✓
                </div>
              )}
            </button>
          </div>

          {/* Micro-CTA */}
          <button className="group bg-white/80 border border-golden-olive/30 text-deep-maroon text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-3 mx-auto hover:border-golden-olive/50">
            <div className="w-5 h-5 bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">?</span>
            </div>
            <div className="text-left">
              <div className="font-medium">Not sure where to start?</div>
              <div className="text-sm opacity-80">Take our 3-minute assessment</div>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Path Selection Feedback */}
            {selectedPath && (
            <div className="mt-6 p-4 bg-gradient-to-r from-golden-olive/10 to-deep-maroon/10 rounded-xl border border-golden-olive/20 shadow-md">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                  <div>
                  <p className="text-deep-maroon font-semibold text-base mb-2">
                      {selectedPath === 'beginner' 
                        ? 'Excellent choice for your Sanskrit journey! 🌟'
                        : 'Perfect! Ready to advance your Sanskrit skills! 🚀'
                      }
                  </p>
                  <p className="text-muted-gray text-sm mb-2">
                      {selectedPath === 'beginner' 
                        ? 'You\'ll start with the fundamentals and build a rock-solid foundation through interactive lessons, pronunciation practice, and step-by-step grammar mastery.'
                        : 'You\'ll focus on conversation practice, advanced grammar, and real-world applications to take your Sanskrit to the next level.'
                      }
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-deep-maroon font-medium">
                    <ArrowRight className="w-3 h-3" />
                      <span>Scroll down to explore your personalized learning path</span>
                  </div>
                </div>
              </div>
            </div>
            )}
        </motion.div>
      </div>

      {/* Dense Sanskrit-themed background elements - Flowing in center */}
      {/* Primary large elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.12, 0.25, 0.12],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-golden-olive/15 to-golden-olive/8 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.12, 0.2, 0.12],
          rotate: [0, -180, -360]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-r from-deep-maroon/15 to-deep-maroon/8 rounded-full blur-sm"
      ></motion.div>
      
      {/* Secondary medium elements */}
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          x: [0, 20, 0],
          opacity: [0.1, 0.18, 0.1],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-copper-orange/12 to-copper-orange/6 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          x: [0, -15, 0],
          opacity: [0.1, 0.16, 0.1],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-1/2 right-1/2 w-22 h-22 bg-gradient-to-r from-golden-olive/12 to-golden-olive/6 rounded-full blur-sm"
      ></motion.div>
      
      {/* Tertiary elements for density */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.08, 0.14, 0.08],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute top-2/5 right-2/5 w-16 h-16 bg-deep-maroon/10 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 22, 0],
          opacity: [0.08, 0.15, 0.08],
          rotate: [0, -90, -180, -270, -360]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 4 }}
        className="absolute bottom-2/5 left-2/5 w-18 h-18 bg-copper-orange/10 rounded-full blur-sm"
      ></motion.div>
      
      {/* Additional elements for richness - Flowing in center */}
      <motion.div
        animate={{ 
          y: [0, -18, 0],
          x: [0, 12, 0],
          opacity: [0.06, 0.12, 0.06],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-1/3 left-1/3 w-14 h-14 bg-golden-olive/8 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, -10, 0],
          opacity: [0.06, 0.11, 0.06],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-deep-maroon/8 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, -12, 0],
          opacity: [0.05, 0.1, 0.05],
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3.5 }}
        className="absolute top-1/2 left-1/2 w-10 h-10 bg-copper-orange/7 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 16, 0],
          opacity: [0.05, 0.09, 0.05],
          rotate: [0, -45, -90, -135, -180, -225, -270, -315, -360]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 7 }}
        className="absolute bottom-1/2 right-1/2 w-8 h-8 bg-golden-olive/7 rounded-full blur-sm"
      ></motion.div>
      
      {/* Even more elements for maximum density - Flowing in center */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          x: [0, 8, 0],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-2/5 left-2/5 w-6 h-6 bg-deep-maroon/6 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 14, 0],
          x: [0, -6, 0],
          opacity: [0.04, 0.07, 0.04]
        }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 4.8 }}
        className="absolute bottom-2/5 right-2/5 w-7 h-7 bg-copper-orange/6 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
        className="absolute top-1/3 right-1/3 w-5 h-5 bg-golden-olive/5 rounded-full blur-sm"
      ></motion.div>
      <motion.div
        animate={{ 
          y: [0, 12, 0],
          opacity: [0.03, 0.05, 0.03]
        }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
        className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-deep-maroon/5 rounded-full blur-sm"
      ></motion.div>
    </section>
  )
}
