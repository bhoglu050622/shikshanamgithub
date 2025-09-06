'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  ArrowDown,
  Target,
  BookOpen,
  Brain, 
  Atom, 
  Eye, 
  Heart, 
  Scale, 
  Lightbulb
} from 'lucide-react'

// Types
interface Step {
  id: string
  title: string
  description: string
  comic: string
  icon: any
}

interface DarshanaCircularVisualizationProps {
  onDarshanaClick?: (darshanaId: string) => void
}

// Step data - all unlocked by default for open storytelling
const steps: Step[] = [
  {
    id: 'basics',
    title: 'Darshana Basics',
    description: 'Meet Maya, a curious student who discovers that Indian philosophy isn\'t just ancient texts—it\'s a living map of reality itself.',
    comic: '/assets/comics/basics.svg',
    icon: BookOpen
  },
  {
    id: 'nyaya',
    title: 'Nyaya',
    description: 'Maya learns to think clearly through Nyaya\'s logical framework, discovering how to distinguish truth from illusion in everyday life.',
    comic: '/assets/comics/nyaya.svg',
    icon: Brain
  },
  {
    id: 'vaisheshika',
    title: 'Vaisheshika',
    description: 'Exploring the atomic theory of reality, Maya understands how everything in existence is built from fundamental building blocks.',
    comic: '/assets/comics/vaisheshika.svg',
    icon: Atom
  },
  {
    id: 'samkhya',
    title: 'Samkhya',
    description: 'Maya discovers the profound distinction between consciousness and matter, learning the 24 principles that make up reality.',
    comic: '/assets/comics/samkhya.svg',
    icon: Eye
  },
  {
    id: 'yoga',
    title: 'Yoga',
    description: 'Through the eight limbs of yoga, Maya transforms her understanding into practice, finding peace in the midst of life\'s chaos.',
    comic: '/assets/comics/yoga.svg',
    icon: Heart
  },
  {
    id: 'mimamsa',
    title: 'Mimamsa',
    description: 'Maya learns the science of right action, understanding how duty and ethics form the foundation of a meaningful life.',
    comic: '/assets/comics/mimamsa.svg',
    icon: Scale
  },
  {
    id: 'vedanta',
    title: 'Vedanta',
    description: 'In her final realization, Maya discovers that the Self and the Absolute are one—the ultimate truth that liberates the soul.',
    comic: '/assets/comics/vedanta.svg',
    icon: Lightbulb
  }
]

// Main component
export default function DarshanaCircularVisualization({ 
  onDarshanaClick 
}: DarshanaCircularVisualizationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [playSpeed, setPlaySpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimation()

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Auto-play functionality with speed control
  useEffect(() => {
    if (isPlaying && !isReducedMotion) {
      const speedMultipliers = { slow: 1.5, normal: 1, fast: 0.6 }
      const baseInterval = 1800
      const interval = baseInterval * speedMultipliers[playSpeed]
      
      autoPlayRef.current = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1
          if (nextStep < steps.length) {
            // Animate timeline
            controls.start({
              pathLength: (nextStep + 1) / steps.length,
              transition: { duration: 0.6, ease: "easeInOut" }
            })
            
            return nextStep
          } else {
            setIsPlaying(false)
            return prev
          }
        })
      }, interval)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isPlaying, isReducedMotion, controls, playSpeed])

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentStep < steps.length - 1) {
      handleNext()
    }
    if (isRightSwipe && currentStep > 0) {
      handlePrevious()
    }
  }

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      
      // Animate timeline
      if (!isReducedMotion) {
        controls.start({
          pathLength: (nextStep + 1) / steps.length,
          transition: { duration: 0.6, ease: "easeInOut" }
        })
      }
    }
  }, [currentStep, controls, isReducedMotion])

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      
      // Animate timeline
      if (!isReducedMotion) {
        controls.start({
          pathLength: (prevStep + 1) / steps.length,
          transition: { duration: 0.6, ease: "easeInOut" }
        })
      }
    }
  }, [currentStep, controls, isReducedMotion])

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleStepClick = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex)
    
    // Animate timeline
    if (!isReducedMotion) {
      controls.start({
        pathLength: (stepIndex + 1) / steps.length,
        transition: { duration: 0.6, ease: "easeInOut" }
      })
    }
  }, [controls, isReducedMotion])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentStep > 0) {
        handlePrevious()
      } else if (e.key === 'ArrowRight' && currentStep < steps.length - 1) {
        handleNext()
      } else if (e.key === ' ') {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, handleNext, handlePrevious, togglePlayPause])

  const handleQuizOpen = () => {
    if (onDarshanaClick) {
      onDarshanaClick('quiz')
    }
  }

  const currentStepData = useMemo(() => steps[currentStep], [currentStep])
  const progress = useMemo(() => ((currentStep + 1) / steps.length) * 100, [currentStep])
  
  return (
    <section 
      className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30 dark:from-saffron-900/10 dark:via-transparent dark:to-deep-teal-900/10"
      role="region"
      aria-labelledby="unsure-path-title"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 id="unsure-path-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            Unsure Where to Begin?
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
            Follow Maya's journey as she discovers the six Darshanas in order. 
            Each step builds upon the previous one, creating a complete understanding of Indian philosophy.
          </p>
        </motion.div>

        {/* Text-only fallback for no-JS users */}
        <noscript>
          <div className="max-w-4xl mx-auto bg-white dark:bg-wisdom-800 rounded-2xl p-8 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20">
            <h3 className="text-xl font-semibold text-wisdom-800 dark:text-wisdom-200 mb-6">
              Darshana Learning Path
            </h3>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-wisdom-800 dark:text-wisdom-200">
                      {step.title}
                    </h4>
                    <p className="text-wisdom-600 dark:text-wisdom-400 text-sm">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </noscript>

        {/* Main Content */}
        <div 
          className="max-w-7xl mx-auto"
          data-cy="main-content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-8 items-start">
              {/* Left Column - Steps */}
              <div className="col-span-5">
                <nav 
                  className="space-y-6" 
                  role="navigation" 
                  aria-label="Darshana learning steps"
                >
                  {steps.map((step, index) => (
                    <StepNode
                      key={step.id}
                      step={step}
                      index={index}
                      isActive={index === currentStep}
                      onClick={() => handleStepClick(index)}
                    />
                  ))}
                </nav>
              </div>

              {/* Center Column - Timeline */}
              <div className="col-span-2 flex justify-center">
                <Timeline
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  controls={controls}
                  isReducedMotion={isReducedMotion}
                />
              </div>

              {/* Right Column - Comic Panel */}
              <div className="col-span-5">
                <ComicPanel
                  step={currentStepData}
                  isActive={true}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Progress Indicator */}
            <div className="text-center">
              <div className="text-sm text-wisdom-600 dark:text-wisdom-400 mb-2">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="w-full bg-wisdom-200 dark:bg-wisdom-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>
            </div>
            
            {/* Comic Panel */}
            <ComicPanel
              step={currentStepData}
              isActive={true}
              isMobile={true}
            />

            {/* Current Step */}
            <StepNode
              step={currentStepData}
              index={currentStep}
              isActive={true}
              onClick={() => handleStepClick(currentStep)}
              isMobile={true}
            />

            {/* Step Navigation Dots */}
            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-saffron-500 scale-125'
                      : 'bg-saffron-300 dark:bg-saffron-600'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
              />
            ))}
            </div>
          </div>

          {/* Controls */}
          <Controls
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoPrevious={currentStep > 0}
            canGoNext={currentStep < steps.length - 1}
            isReducedMotion={isReducedMotion}
            playSpeed={playSpeed}
            onSpeedChange={setPlaySpeed}
          />

          {/* Quiz CTA */}
          <QuizCTA onQuizOpen={handleQuizOpen} />

          {/* Progress Indicator */}
          <div className="text-center mt-8" aria-live="polite" aria-atomic="true">
            <div className="text-sm text-wisdom-600 dark:text-wisdom-400">
              Step {currentStep + 1} of {steps.length} - {Math.round(progress)}% Complete
            </div>
            <div className="text-xs text-wisdom-500 dark:text-wisdom-400 mt-1">
              Currently viewing: {currentStepData.title}
            </div>
      </div>
        </div>
      </div>
    </section>
  )
}

// Step Node Component
interface StepNodeProps {
  step: Step
  index: number
  isActive: boolean
  onClick: () => void
  isMobile?: boolean
}

function StepNode({ step, index, isActive, onClick, isMobile = false }: StepNodeProps) {
  const [isHovered, setIsHovered] = useState(false)
          
          return (
            <motion.div
      initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
      onTouchStart={(e) => {
        if (isMobile) {
          e.preventDefault()
        }
      }}
      onTouchEnd={(e) => {
        if (isMobile) {
                  e.preventDefault()
          onClick()
        }
      }}
    >
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative w-full p-6 rounded-2xl transition-all duration-300 focus-ring ${
          isActive
            ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg scale-105'
            : 'bg-white dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 hover:bg-saffron-50 dark:hover:bg-wisdom-700 border-2 border-saffron-200 dark:border-saffron-800'
        }`}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`${step.title} - Click to explore`}
        aria-pressed={isActive}
      >
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isActive
              ? 'bg-white/20'
              : 'bg-saffron-100 dark:bg-saffron-900/30'
          }`}>
            <step.icon className={`w-6 h-6 ${
              isActive
                ? 'text-white'
                : 'text-saffron-600 dark:text-saffron-400'
            }`} />
          </div>

          {/* Content */}
          <div className="flex-1 text-left">
            <h3 className={`font-semibold mb-2 ${
              isActive
                ? 'text-white'
                : 'text-wisdom-800 dark:text-wisdom-200'
            }`}>
              {step.title}
            </h3>
            <p className={`text-sm leading-relaxed ${
              isActive
                ? 'text-white/90'
                : 'text-wisdom-600 dark:text-wisdom-400'
            }`}>
              {step.description}
            </p>
          </div>
                    </div>
                    
        {/* Hover Effect */}
                      <motion.div
          className="absolute inset-0 bg-gradient-to-r from-saffron-500/10 to-deep-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.button>
    </motion.div>
  )
}

// Timeline Component
interface TimelineProps {
  currentStep: number
  totalSteps: number
  controls: any
  isReducedMotion: boolean
}

function Timeline({ currentStep, totalSteps, controls, isReducedMotion }: TimelineProps) {
  const pathLength = ((currentStep + 1) / totalSteps) * 100

  return (
    <div 
      className="relative h-full flex flex-col items-center"
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Progress: step ${currentStep + 1} of ${totalSteps}`}
    >
      {/* SVG Timeline */}
      <svg className="absolute inset-0 w-8 h-full" viewBox="0 0 32 400" aria-hidden="true">
        {/* Timeline Line Background */}
        <line
          x1="16"
          y1="20"
          x2="16"
          y2="380"
          stroke="currentColor"
          strokeWidth="2"
          className="text-wisdom-200 dark:text-wisdom-700"
        />
        
        {/* Animated Timeline Line */}
        <motion.line
          x1="16"
          y1="20"
          x2="16"
          y2="380"
          stroke="url(#timelineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathLength / 100 }}
          transition={{ duration: isReducedMotion ? 0.1 : 0.6, ease: "easeInOut" }}
          style={{ pathLength: pathLength / 100 }}
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        
        {/* Timeline Nodes */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const y = 20 + (index * (360 / (totalSteps - 1)))
          const isActive = index === currentStep
          const isCompleted = index < currentStep
          
          return (
            <motion.circle
              key={index}
              cx="16"
              cy={y}
              r={isActive ? "6" : "4"}
              fill={isCompleted || isActive ? "#f59e0b" : "currentColor"}
              stroke={isCompleted || isActive ? "#f59e0b" : "currentColor"}
              strokeWidth="2"
              className={isCompleted || isActive ? "" : "text-wisdom-300 dark:text-wisdom-600"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.3 }}
            />
          )
        })}
        
        {/* Animated Arrow */}
        <motion.polygon
          points="16,10 12,18 20,18"
          fill="#f59e0b"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
                  </div>
  )
}

// Comic Panel Component
interface ComicPanelProps {
  step: Step
  isActive: boolean
  isMobile?: boolean
}

function ComicPanel({ step, isActive, isMobile = false }: ComicPanelProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 0.8, 0.1, 1] }}
      className={`${isMobile ? 'w-full' : 'w-full max-w-md mx-auto'}`}
    >
      <div 
        className="relative bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20"
        role="img"
        aria-label={`Comic illustration for ${step.title}`}
      >
        {/* Comic Image */}
        <div className="relative aspect-square mb-4 bg-wisdom-100 dark:bg-wisdom-700 rounded-xl overflow-hidden">
          {!imageError && isInView ? (
            <img
              ref={imgRef}
              src={step.comic}
              alt={`Comic illustration for ${step.title}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-wisdom-200 dark:bg-wisdom-600">
              <div className="text-center text-wisdom-500 dark:text-wisdom-400">
                <step.icon className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Comic Coming Soon</p>
                  </div>
                </div>
          )}
          
          {/* Loading State */}
          {!imageLoaded && !imageError && isInView && (
            <div className="absolute inset-0 flex items-center justify-center bg-wisdom-100 dark:bg-wisdom-700">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron-500"></div>
                  </div>
          )}
                </div>

        {/* Caption */}
        <div className="text-center">
          <h4 className="font-semibold text-wisdom-800 dark:text-wisdom-200 mb-2">
            {step.title}
          </h4>
          <p className="text-sm text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
            {step.description}
          </p>
                </div>
              </div>
            </motion.div>
          )
}

// Controls Component
interface ControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  isReducedMotion: boolean
  playSpeed: 'slow' | 'normal' | 'fast'
  onSpeedChange: (speed: 'slow' | 'normal' | 'fast') => void
}

function Controls({ 
  isPlaying, 
  onPlayPause, 
  onPrevious, 
  onNext, 
  canGoPrevious, 
  canGoNext,
  isReducedMotion,
  playSpeed,
  onSpeedChange
}: ControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4">
        <motion.button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`p-3 rounded-full transition-all duration-300 focus-ring ${
            canGoPrevious
              ? 'bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 hover:bg-saffron-200 dark:hover:bg-saffron-800/50'
              : 'bg-wisdom-100 dark:bg-wisdom-800 text-wisdom-400 dark:text-wisdom-500 cursor-not-allowed'
          }`}
          whileHover={canGoPrevious ? { scale: 1.1 } : {}}
          whileTap={canGoPrevious ? { scale: 0.9 } : {}}
          aria-label="Previous step"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={onPlayPause}
          className="p-4 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={!canGoNext}
          className={`p-3 rounded-full transition-all duration-300 focus-ring ${
            canGoNext
              ? 'bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 hover:bg-saffron-200 dark:hover:bg-saffron-800/50'
              : 'bg-wisdom-100 dark:bg-wisdom-800 text-wisdom-400 dark:text-wisdom-500 cursor-not-allowed'
          }`}
          whileHover={canGoNext ? { scale: 1.1 } : {}}
          whileTap={canGoNext ? { scale: 0.9 } : {}}
          aria-label="Next step"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Speed Controls */}
      {!isReducedMotion && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-wisdom-600 dark:text-wisdom-400">Speed:</span>
          {(['slow', 'normal', 'fast'] as const).map((speed) => (
            <motion.button
              key={speed}
              onClick={() => onSpeedChange(speed)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 focus-ring ${
                playSpeed === speed
                  ? 'bg-saffron-500 text-white'
                  : 'bg-wisdom-100 dark:bg-wisdom-800 text-wisdom-600 dark:text-wisdom-400 hover:bg-saffron-100 dark:hover:bg-saffron-900/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Set speed to ${speed}`}
              aria-pressed={playSpeed === speed}
            >
              {speed}
            </motion.button>
          ))}
        </div>
      )}

      {/* Keyboard Instructions */}
      <div className="text-xs text-wisdom-500 dark:text-wisdom-400 text-center">
        Use arrow keys to navigate • Spacebar to play/pause
      </div>
    </div>
  )
}

// Quiz CTA Component
interface QuizCTAProps {
  onQuizOpen: () => void
}

function QuizCTA({ onQuizOpen }: QuizCTAProps) {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12"
      >
      <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-8 shadow-lg border border-saffron-200/30 dark:border-saffron-400/20 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-wisdom-800 dark:text-wisdom-200 mb-4">
          Still Unsure?
            </h3>
        <p className="text-wisdom-600 dark:text-wisdom-400 mb-6">
          Take our personalized quiz to discover which Darshana aligns with your interests and learning style.
        </p>
        <motion.button
          onClick={onQuizOpen}
          className="btn-primary flex items-center space-x-3 px-8 py-4 text-lg mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Target className="w-6 h-6" />
          <span>See which Darshana you should Start with!</span>
        </motion.button>
        </div>
      </motion.div>
  )
}