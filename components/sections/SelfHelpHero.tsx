'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Target, Brain, ArrowRight, Sparkles, Mountain, Sun, Cloud } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

interface SelfHelpHeroProps {
  onExploreTracks?: () => void
  onTakeTest?: () => void
}

// Simple Background Component - No animations
const AnimatedSkyline = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean simple background */}
      <div className="absolute inset-0 bg-white dark:bg-wisdom-900" />
    </div>
  )
}


export default function SelfHelpHero({ onExploreTracks, onTakeTest }: SelfHelpHeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const [currentQuote, setCurrentQuote] = useState(0)
  
  const quotes = [
    "Grow in clarity, character, and competence.",
    "Ancient wisdom for modern transformation.",
    "Where tradition meets practical growth."
  ]

  // Rotate quotes every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-0"
      aria-labelledby="hero-title"
    >
      <AnimatedSkyline />
      
      <div className="container-custom relative z-10">
        <StaggerContainer className="text-center">
          <StaggerItem>
            <motion.h1 
              id="hero-title" 
              className="text-hero text-high-contrast mb-8 relative"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
            >
              School of{' '}
              <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent relative">
                Self-Help
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={shouldReduceMotion ? {} : {
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-6 h-6 text-saffron-500" />
                </motion.div>
              </span>
            </motion.h1>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              key={currentQuote}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-subheading text-medium-contrast max-w-4xl mx-auto devanagari-separator">
                "{quotes[currentQuote]}"
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex justify-center mb-8">
              <motion.div 
                className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-6 py-3 rounded-full text-lg font-medium"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                "In the age of AI, why study something so ancient?"
              </motion.div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <motion.div 
              className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 text-white px-8 py-4 rounded-2xl text-xl font-semibold mb-8 inline-block"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Indian wisdom isn't ancient—it's eternal.
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={onExploreTracks}
                className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg focus-ring"
                aria-label="Explore skill tracks to find your learning path"
              >
                <Target className="w-6 h-6" />
                <span>Explore Skill Tracks</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={onTakeTest}
                className="btn-outline flex items-center space-x-3 px-8 py-4 text-lg focus-ring"
                aria-label="Take personality test to discover your strengths and growth areas"
              >
                <Brain className="w-6 h-6" />
                <span>Take Personality Test</span>
              </motion.button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

    </section>
  )
}
