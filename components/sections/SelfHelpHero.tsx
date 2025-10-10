'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Target, Brain, ArrowRight, Sparkles, Mountain, Sun, Cloud } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

interface SelfHelpHeroProps {
  onExploreTracks?: () => void
  onTakeTest?: () => void
}

// Animated Skyline Component
const AnimatedSkyline = () => {
  const shouldReduceMotion = useReducedMotion()
  
  const mountains = [
    { height: 120, delay: 0, color: 'from-indigo-200 to-indigo-300 dark:from-indigo-800 dark:to-indigo-900' },
    { height: 80, delay: 0.2, color: 'from-deep-teal-200 to-deep-teal-300 dark:from-deep-teal-800 dark:to-deep-teal-900' },
    { height: 100, delay: 0.4, color: 'from-saffron-200 to-saffron-300 dark:from-saffron-800 dark:to-saffron-900' },
    { height: 60, delay: 0.6, color: 'from-lotus-pink-200 to-lotus-pink-300 dark:from-lotus-pink-800 dark:to-lotus-pink-900' },
    { height: 90, delay: 0.8, color: 'from-peacock-green-200 to-peacock-green-300 dark:from-peacock-green-800 dark:to-peacock-green-900' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-indigo-50 to-off-white-500 dark:from-wisdom-900 dark:via-deep-indigo-500 dark:to-wisdom-800" />
      
      {/* Animated mountains */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end">
        {mountains.map((mountain, index) => (
          <motion.div
            key={index}
            className={`flex-1 bg-gradient-to-t ${mountain.color} rounded-t-full relative`}
            style={{ height: `${mountain.height}px` }}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scaleY: 0 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, scaleY: 1 }}
            transition={{
              duration: 1.2,
              delay: mountain.delay,
              ease: [0.22, 0.9, 0.3, 1]
            }}
          >
            {/* Mountain peak highlight */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full blur-sm" />
          </motion.div>
        ))}
      </div>

      {/* Floating clouds */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-8 bg-white/60 dark:bg-white/20 rounded-full"
        animate={shouldReduceMotion ? {} : {
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-32 right-20 w-12 h-6 bg-white/40 dark:bg-white/15 rounded-full"
        animate={shouldReduceMotion ? {} : {
          x: [0, -15, 0],
          y: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Sun */}
      <motion.div
        className="absolute top-16 right-16 w-12 h-12 bg-gradient-to-br from-soft-gold-400 to-saffron-500 rounded-full shadow-lg"
        animate={shouldReduceMotion ? {} : {
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-soft-gold-300 to-saffron-400 rounded-full blur-sm opacity-60" />
      </motion.div>
    </div>
  )
}

// Acharya Character Component
const AcharyaCharacter = () => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      className="absolute bottom-0 right-1/4 w-32 h-40 flex items-end justify-center"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 1.5,
        ease: [0.22, 0.9, 0.3, 1]
      }}
    >
      {/* Acharya figure */}
      <div className="relative">
        {/* Body */}
        <motion.div
          className="w-16 h-24 bg-gradient-to-b from-saffron-400 to-saffron-600 rounded-t-2xl relative"
          animate={shouldReduceMotion ? {} : {
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Head */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-b from-soft-gold-200 to-soft-gold-400 rounded-full">
            {/* Eyes */}
            <div className="absolute top-2 left-1 w-1 h-1 bg-indigo-700 dark:bg-indigo-300 rounded-full" />
            <div className="absolute top-2 right-1 w-1 h-1 bg-indigo-700 dark:bg-indigo-300 rounded-full" />
            {/* Smile */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-indigo-700 dark:border-indigo-300 rounded-full" />
          </div>
          
          {/* Arms */}
          <div className="absolute top-4 -left-2 w-3 h-8 bg-gradient-to-b from-saffron-400 to-saffron-600 rounded-full" />
          <div className="absolute top-4 -right-2 w-3 h-8 bg-gradient-to-b from-saffron-400 to-saffron-600 rounded-full" />
          
          {/* Legs */}
          <div className="absolute bottom-0 left-2 w-4 h-6 bg-gradient-to-b from-saffron-500 to-saffron-700 rounded-b-lg" />
          <div className="absolute bottom-0 right-2 w-4 h-6 bg-gradient-to-b from-saffron-500 to-saffron-700 rounded-b-lg" />
        </motion.div>
        
        {/* Wisdom aura */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-soft-gold-300/30 dark:border-soft-gold-600/30"
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding"
      aria-labelledby="hero-title"
    >
      <AnimatedSkyline />
      <AcharyaCharacter />
      
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={shouldReduceMotion ? {} : {
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-saffron-500 dark:border-saffron-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-saffron-500 dark:bg-saffron-400 rounded-full mt-2"
            animate={shouldReduceMotion ? {} : {
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
