'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Atom, 
  Eye, 
  Heart, 
  Scale, 
  Lightbulb,
  Lock,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react'

// Darshana data with enhanced information
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
    keyConcepts: ['Pramāṇa (Means of Knowledge)', 'Tarka (Logic)', 'Vāda (Debate)', 'Hetvābhāsa (Fallacies)'],
    founder: 'Akshapada Gautama',
    text: 'Nyāya Sūtra'
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
    keyConcepts: ['Dravya (Substance)', 'Guṇa (Quality)', 'Karma (Action)', 'Padārtha (Categories)'],
    founder: 'Kaṇāda',
    text: 'Vaiśeṣika Sūtra'
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
    keyConcepts: ['Puruṣa (Consciousness)', 'Prakṛti (Matter)', 'Tattva (Principles)', 'Kaivalya (Liberation)'],
    founder: 'Kapila',
    text: 'Sāṅkhya Kārikā'
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
    keyConcepts: ['Aṣṭāṅga (Eight Limbs)', 'Citta-vṛtti-nirodhaḥ', 'Samādhi (Meditation)', 'Kaivalya (Liberation)'],
    founder: 'Patañjali',
    text: 'Yoga Sūtra'
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
    keyConcepts: ['Dharma (Duty)', 'Karma (Action)', 'Vidhi (Injunction)', 'Nishēdha (Prohibition)'],
    founder: 'Jaimini',
    text: 'Mīmāṁsā Sūtra'
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
    keyConcepts: ['Brahman (Absolute)', 'Ātman (Self)', 'Māyā (Illusion)', 'Mokṣa (Liberation)'],
    founder: 'Bādarāyaṇa',
    text: 'Brahma Sūtra'
  }
]

interface DarshanaCircularVisualizationProps {
  onDarshanaClick?: (darshanaId: string) => void
}

export default function DarshanaCircularVisualization({ 
  onDarshanaClick 
}: DarshanaCircularVisualizationProps) {
  const [selectedDarshana, setSelectedDarshana] = useState<string | null>(null)
  const [unlockedCount, setUnlockedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Memoize unlocked state to prevent unnecessary re-renders
  const isUnlocked = useMemo(() => unlockedCount === 6, [unlockedCount])

  // Handle darshana click with useCallback for performance
  const handleDarshanaClick = useCallback((darshanaId: string) => {
    try {
      setError(null)
      setSelectedDarshana(darshanaId)
      setUnlockedCount(prev => Math.min(prev + 1, 6))
      
      // Call the optional callback
      onDarshanaClick?.(darshanaId)
    } catch (err) {
      setError('Failed to select darshana. Please try again.')
      console.error('Error in handleDarshanaClick:', err)
    }
  }, [onDarshanaClick])

  // Reset all darshanas with useCallback
  const handleReset = useCallback(() => {
    try {
      setError(null)
      setSelectedDarshana(null)
      setUnlockedCount(0)
    } catch (err) {
      setError('Failed to reset. Please try again.')
      console.error('Error in handleReset:', err)
    }
  }, [])

  console.log('DarshanaCircularVisualization rendering with', darshanas.length, 'darshanas')
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
        >
          <p className="text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </p>
        </motion.div>
      )}
      
      {/* Central OM Section */}
      <div className="flex justify-center mb-12">
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Central OM */}
          <motion.button
            onClick={handleReset}
            className={`relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-saffron-400 via-deep-teal-400 to-indigo-400 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-saffron-300/50 touch-manipulation ${
              isUnlocked ? 'ring-4 ring-saffron-300/50 shadow-saffron-500/25' : ''
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isUnlocked ? {
              boxShadow: [
                "0 25px 50px -12px rgba(245, 158, 11, 0.25)",
                "0 25px 50px -12px rgba(245, 158, 11, 0.5)",
                "0 25px 50px -12px rgba(245, 158, 11, 0.25)"
              ]
            } : {}}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            aria-label={isUnlocked ? "Reset all darshanas - All wisdom unlocked" : "Central wisdom hub - Click to reset"}
            role="button"
            tabIndex={0}
          >
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/90 dark:bg-wisdom-800/90 rounded-full flex items-center justify-center shadow-lg">
              {isUnlocked ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-white text-2xl sm:text-4xl font-devanagari"
                >
                  ॐ
                </motion.div>
              ) : (
                <motion.div
                  animate={{ 
                    scale: unlockedCount > 0 ? [1, 1.1, 1] : 1,
                    rotate: unlockedCount > 0 ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: unlockedCount > 0 ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="text-white text-lg sm:text-2xl"
                >
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
              )}
            </div>
            
            {/* Progress rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 border-2 border-saffron-300/50 dark:border-saffron-400/50 rounded-full"
                animate={{ 
                  scale: [1, 1.5 + ring * 0.3, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ 
                  duration: 2 + ring * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ring * 0.3
                }}
                style={{ scale: 1 + ring * 0.2 }}
              />
            ))}
          </motion.button>
          
          {/* Progress indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg min-w-fit">
              <span className="text-xs sm:text-sm font-medium text-saffron-600 dark:text-saffron-400 whitespace-nowrap">
                {unlockedCount}/6 Unlocked
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Darshana Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
        {/* Debug info */}
        <div className="col-span-full bg-yellow-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold">Debug Info</h3>
          <p>Total darshanas: {darshanas.length}</p>
          <p>Unlocked count: {unlockedCount}</p>
          <p>Selected: {selectedDarshana || 'None'}</p>
        </div>
        
        {darshanas.map((darshana, index) => {
          console.log('Rendering darshana:', darshana.name, 'at index:', index)
          const isSelected = selectedDarshana === darshana.id
          const isUnlocked = unlockedCount > index
          
          return (
            <motion.div
              key={darshana.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer focus-within:ring-4 focus-within:ring-saffron-300/50 focus-within:outline-none rounded-2xl"
              onClick={() => handleDarshanaClick(darshana.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleDarshanaClick(darshana.id)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${darshana.name} - ${darshana.description}`}
            >
              <div className={`
                relative bg-white dark:bg-wisdom-800 rounded-2xl p-4 sm:p-6 shadow-lg border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-saffron-500 shadow-saffron-500/25 scale-105' 
                  : 'border-transparent hover:border-saffron-300/50'
                }
                ${isUnlocked ? 'ring-2 ring-saffron-300/30' : ''}
              `}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${darshana.color} opacity-5 rounded-2xl`} />
                
                {/* Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${darshana.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <darshana.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    
                    {isUnlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 sm:w-8 sm:h-8 bg-saffron-500 rounded-full flex items-center justify-center"
                      >
                        <Star className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                    {darshana.name}
                  </h3>
                  
                  <p className="text-base sm:text-lg font-devanagari text-saffron-600 dark:text-saffron-400 mb-3">
                    {darshana.sanskrit}
                  </p>
                  
                  <p className="text-wisdom-600 dark:text-wisdom-400 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">
                    {darshana.description}
                  </p>
                  
                  <p className="text-wisdom-600 dark:text-wisdom-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                    {darshana.detailedDescription}
                  </p>
                </div>

                {/* Key Concepts */}
                <div className="relative z-10 mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                    Key Concepts
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {darshana.keyConcepts.slice(0, 2).map((concept, conceptIndex) => (
                      <span key={conceptIndex} className="bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Founder & Text */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-wisdom-500 dark:text-wisdom-400 mb-3 sm:mb-4 gap-1 sm:gap-0">
                  <div>
                    <span className="font-medium">Founder:</span> {darshana.founder}
                  </div>
                  <div>
                    <span className="font-medium">Text:</span> {darshana.text}
                  </div>
                </div>

                {/* CTA */}
                <div className="relative z-10 flex items-center justify-center space-x-2 text-saffron-600 dark:text-saffron-400 font-medium group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors text-sm sm:text-base">
                  <span>{isSelected ? 'Selected' : 'Explore'}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-12"
      >
        <div className="bg-white/80 dark:bg-wisdom-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-saffron-200/30 dark:border-soft-gold-500/20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-500" />
            <h3 className="text-base sm:text-lg font-semibold text-indigo-700 dark:text-soft-gold-500">
              How to Unlock Wisdom
            </h3>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-saffron-500" />
          </div>
          <p className="text-wisdom-600 dark:text-wisdom-400 text-xs sm:text-sm leading-relaxed">
            Click on each Darshana card to unlock it. When all six schools are unlocked, 
            the central OM symbol will appear, representing the unity of all wisdom traditions.
          </p>
        </div>
      </motion.div>
    </div>
  )
}