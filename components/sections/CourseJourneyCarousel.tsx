'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  Target, 
  BookOpen, 
  Zap, 
  Heart, 
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lock,
  Play,
  Users,
  Award,
  Clock
} from 'lucide-react'

interface JourneyStep {
  step: number
  title: string
  description: string
  detailedDescription: string
  icon: any
  color: string
  duration: string
  activities: string[]
  outcomes: string[]
  isUnlocked: boolean
}

interface CourseJourneyCarouselProps {
  onStepChange?: (step: number) => void
  onComplete?: () => void
  initialUnlockedSteps?: number
}

const journeySteps: JourneyStep[] = [
  {
    step: 0,
    title: "Personality Test",
    description: "Discover your strengths & growth areas",
    detailedDescription: "Take our comprehensive assessment to understand your personality type, learning style, and areas for growth. This forms the foundation of your personalized learning journey.",
    icon: Target,
    color: "from-saffron-500 to-saffron-600",
    duration: "15 minutes",
    activities: [
      "Comprehensive personality assessment",
      "Learning style evaluation",
      "Goal setting workshop",
      "Personal growth plan creation"
    ],
    outcomes: [
      "Clear understanding of your personality type",
      "Identified strengths and growth areas",
      "Personalized learning roadmap",
      "Baseline metrics for progress tracking"
    ],
    isUnlocked: true
  },
  {
    step: 1,
    title: "Theory Class",
    description: "Clear concepts with living examples",
    detailedDescription: "Learn the fundamental principles through engaging lectures, real-world examples, and interactive discussions. Connect ancient wisdom with modern applications.",
    icon: BookOpen,
    color: "from-peacock-green-500 to-peacock-green-600",
    duration: "2-3 hours/week",
    activities: [
      "Live theory sessions with experts",
      "Interactive concept discussions",
      "Real-world case studies",
      "Q&A sessions with instructors"
    ],
    outcomes: [
      "Solid theoretical foundation",
      "Understanding of key principles",
      "Ability to connect theory to practice",
      "Enhanced critical thinking skills"
    ],
    isUnlocked: false
  },
  {
    step: 2,
    title: "Practical Class",
    description: "Guided activities for real-life application",
    detailedDescription: "Apply what you've learned through hands-on exercises, role-playing, and practical scenarios. Practice makes perfect, and we'll guide you every step of the way.",
    icon: Zap,
    color: "from-lotus-pink-500 to-lotus-pink-600",
    duration: "1-2 hours/week",
    activities: [
      "Hands-on practice sessions",
      "Role-playing exercises",
      "Real-life scenario simulations",
      "Peer feedback and discussion"
    ],
    outcomes: [
      "Practical application skills",
      "Confidence in real-world situations",
      "Improved problem-solving abilities",
      "Enhanced interpersonal skills"
    ],
    isUnlocked: false
  },
  {
    step: 3,
    title: "Activities",
    description: "Daily/weekly practices you can actually stick to",
    detailedDescription: "Build lasting habits through carefully designed daily and weekly activities. These practices are designed to fit into your busy lifestyle while delivering maximum impact.",
    icon: Heart,
    color: "from-deep-teal-500 to-deep-teal-600",
    duration: "15-30 minutes/day",
    activities: [
      "Daily mindfulness practices",
      "Weekly reflection exercises",
      "Habit tracking and monitoring",
      "Community challenges and support"
    ],
    outcomes: [
      "Sustainable daily practices",
      "Improved self-discipline",
      "Better stress management",
      "Enhanced emotional regulation"
    ],
    isUnlocked: false
  },
  {
    step: 4,
    title: "Transformation Report",
    description: "Track progress with measurable changes",
    detailedDescription: "See your growth through comprehensive progress tracking, milestone celebrations, and detailed transformation reports. Measure what matters most to your personal development.",
    icon: TrendingUp,
    color: "from-indigo-500 to-indigo-600",
    duration: "Ongoing",
    activities: [
      "Progress tracking and analytics",
      "Milestone celebrations",
      "Transformation documentation",
      "Certification and recognition"
    ],
    outcomes: [
      "Clear visibility into your progress",
      "Motivation through milestone achievements",
      "Comprehensive transformation record",
      "Certification of completion"
    ],
    isUnlocked: false
  }
]

// Step Card Component
const StepCard = ({ 
  step, 
  isActive, 
  isUnlocked, 
  onClick 
}: { 
  step: JourneyStep
  isActive: boolean
  isUnlocked: boolean
  onClick: () => void 
}) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      className={`relative cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-105 z-10' : 'scale-100'
      } ${!isUnlocked ? 'opacity-60' : ''}`}
      onClick={isUnlocked ? onClick : undefined}
      whileHover={shouldReduceMotion || !isUnlocked ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion || !isUnlocked ? {} : { scale: 0.95 }}
    >
      <div className={`card-premium p-6 h-full relative overflow-hidden ${
        isActive ? 'ring-2 ring-saffron-500 dark:ring-saffron-400' : ''
      }`}>
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 ${
          isActive ? 'opacity-10' : ''
        } transition-opacity duration-300`} />
        
        {/* Lock overlay for locked steps */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-white/80 dark:bg-wisdom-900/80 flex items-center justify-center z-20">
            <div className="text-center">
              <Lock className="w-8 h-8 text-wisdom-400 dark:text-wisdom-500 mx-auto mb-2" />
              <p className="text-sm text-wisdom-500 dark:text-wisdom-400">Complete previous steps</p>
            </div>
          </div>
        )}
        
        <div className="relative z-10">
          {/* Step number and icon */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
              {isUnlocked ? (
                <step.icon className="w-6 h-6 text-white" />
              ) : (
                <Lock className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-wisdom-500 dark:text-wisdom-400">Step</div>
              <div className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500">
                {step.step + 1}
              </div>
            </div>
          </div>
          
          {/* Title and description */}
          <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
            {step.title}
          </h3>
          <p className="text-wisdom-600 dark:text-wisdom-400 text-sm leading-relaxed mb-4">
            {step.description}
          </p>
          
          {/* Duration */}
          <div className="flex items-center text-xs text-wisdom-500 dark:text-wisdom-400 mb-4">
            <Clock className="w-3 h-3 mr-1" />
            <span>{step.duration}</span>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center justify-between">
            {isUnlocked ? (
              <div className="flex items-center text-saffron-600 dark:text-saffron-400 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Available</span>
              </div>
            ) : (
              <div className="flex items-center text-wisdom-400 dark:text-wisdom-500 text-sm">
                <Lock className="w-4 h-4 mr-1" />
                <span>Locked</span>
              </div>
            )}
            
            {isActive && (
              <motion.div
                className="w-2 h-2 bg-saffron-500 dark:bg-saffron-400 rounded-full"
                animate={shouldReduceMotion ? {} : {
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Detailed Step View Component
const DetailedStepView = ({ 
  step, 
  onClose 
}: { 
  step: JourneyStep
  onClose: () => void 
}) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={shouldReduceMotion ? {} : { opacity: 1 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-wisdom-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
        exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <step.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500">
                Step {step.step + 1}: {step.title}
              </h2>
              <p className="text-wisdom-600 dark:text-wisdom-400">
                Duration: {step.duration}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-wisdom-400 hover:text-wisdom-600 dark:hover:text-wisdom-300 transition-colors"
            aria-label="Close detailed view"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Description */}
        <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed mb-8">
          {step.detailedDescription}
        </p>
        
        {/* Activities */}
        <div className="mb-8">
          <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            What You'll Do
          </h3>
          <ul className="space-y-2">
            {step.activities.map((activity, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Play className="w-4 h-4 text-saffron-500 dark:text-saffron-400 mt-1 flex-shrink-0" />
                <span className="text-wisdom-600 dark:text-wisdom-400 text-sm">
                  {activity}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Outcomes */}
        <div className="mb-8">
          <h3 className="text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            What You'll Achieve
          </h3>
          <ul className="space-y-2">
            {step.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Award className="w-4 h-4 text-peacock-green-500 dark:text-peacock-green-400 mt-1 flex-shrink-0" />
                <span className="text-wisdom-600 dark:text-wisdom-400 text-sm">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA */}
        <div className="flex justify-end">
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="btn-primary flex items-center space-x-2"
            onClick={onClose}
          >
            <span>Got it</span>
            <CheckCircle className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Dashed SVG Connector Component
const DashedConnector = ({ 
  fromStep, 
  toStep, 
  isVisible 
}: { 
  fromStep: number
  toStep: number
  isVisible: boolean 
}) => {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-0.5">
      <motion.div
        className="w-full h-full border-t-2 border-dashed border-saffron-300 dark:border-saffron-600"
        initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={shouldReduceMotion ? {} : { pathLength: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 0.9, 0.3, 1]
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-saffron-500 dark:bg-saffron-400 rounded-full"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
        animate={shouldReduceMotion ? {} : { scale: isVisible ? 1 : 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.22, 0.9, 0.3, 1]
        }}
      />
    </div>
  )
}

export default function CourseJourneyCarousel({ 
  onStepChange, 
  onComplete, 
  initialUnlockedSteps = 1 
}: CourseJourneyCarouselProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [unlockedSteps, setUnlockedSteps] = useState(initialUnlockedSteps)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null)
  const shouldReduceMotion = useReducedMotion()

  // Update unlocked steps based on progress
  useEffect(() => {
    const updatedSteps = journeySteps.map((step, index) => ({
      ...step,
      isUnlocked: index < unlockedSteps
    }))
    
    // Update the journeySteps array (in a real app, this would be managed by state)
    journeySteps.forEach((step, index) => {
      step.isUnlocked = index < unlockedSteps
    })
  }, [unlockedSteps])

  const handleStepClick = (step: JourneyStep) => {
    if (!step.isUnlocked) return
    
    setActiveStep(step.step)
    setSelectedStep(step)
    setShowDetailedView(true)
    onStepChange?.(step.step)
  }

  const handleNextStep = () => {
    if (activeStep < journeySteps.length - 1) {
      const nextStep = activeStep + 1
      setActiveStep(nextStep)
      setUnlockedSteps(Math.max(unlockedSteps, nextStep + 1))
      onStepChange?.(nextStep)
    } else {
      onComplete?.()
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 0) {
      const prevStep = activeStep - 1
      setActiveStep(prevStep)
      onStepChange?.(prevStep)
    }
  }

  return (
    <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50" aria-labelledby="journey-title">
      <div className="container-custom">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 id="journey-title" className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
            How These Courses Work — Step by Step
          </h2>
          <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-2xl mx-auto mb-8">
            Follow a structured journey from assessment to transformation. Each step builds upon the previous one, 
            ensuring you develop deep understanding and practical skills.
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block">
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation arrows */}
            <button
              onClick={handlePrevStep}
              disabled={activeStep === 0}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-12 h-12 bg-white dark:bg-wisdom-800 rounded-full shadow-lg flex items-center justify-center text-saffron-600 dark:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNextStep}
              disabled={activeStep === journeySteps.length - 1}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-12 bg-white dark:bg-wisdom-800 rounded-full shadow-lg flex items-center justify-center text-saffron-600 dark:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next step"
            >
              <ArrowRight className="w-6 h-6" />
            </button>

            {/* Steps container */}
            <div className="flex space-x-8 overflow-hidden">
              {journeySteps.map((step, index) => (
                <div key={step.step} className="flex-shrink-0 w-1/5 relative">
                  <StepCard
                    step={step}
                    isActive={activeStep === step.step}
                    isUnlocked={step.isUnlocked}
                    onClick={() => handleStepClick(step)}
                  />
                  
                  {/* Connector to next step */}
                  {index < journeySteps.length - 1 && (
                    <DashedConnector
                      fromStep={step.step}
                      toStep={journeySteps[index + 1].step}
                      isVisible={step.isUnlocked}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4"
            >
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  {step.isUnlocked ? (
                    <step.icon className="w-6 h-6 text-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-white" />
                  )}
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="w-0.5 h-16 bg-saffron-200 dark:bg-saffron-800 mt-4"></div>
                )}
              </div>
              <div className="flex-1">
                <StepCard
                  step={step}
                  isActive={activeStep === step.step}
                  isUnlocked={step.isUnlocked}
                  onClick={() => handleStepClick(step)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            {journeySteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index < unlockedSteps
                    ? 'bg-saffron-500 dark:bg-saffron-400'
                    : 'bg-wisdom-200 dark:bg-wisdom-700'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-wisdom-500 dark:text-wisdom-400">
            {unlockedSteps} of {journeySteps.length} steps unlocked
          </p>
        </motion.div>
      </div>

      {/* Detailed step view modal */}
      <AnimatePresence>
        {showDetailedView && selectedStep && (
          <DetailedStepView
            step={selectedStep}
            onClose={() => {
              setShowDetailedView(false)
              setSelectedStep(null)
            }}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
