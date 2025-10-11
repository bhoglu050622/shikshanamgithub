'use client'

import { motion } from 'framer-motion'
import { BookOpen, Award } from 'lucide-react'

export type LevelType = 'beginner' | 'intermediate'

interface LevelSelectorProps {
  selectedLevel: LevelType
  onLevelChange: (level: LevelType) => void
}

export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700">
        <motion.button
          onClick={() => onLevelChange('beginner')}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
            selectedLevel === 'beginner'
              ? 'bg-gradient-to-r from-golden-olive to-deep-maroon text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-golden-olive dark:hover:text-golden-olive'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Select Beginner level courses"
          aria-pressed={selectedLevel === 'beginner'}
        >
          <BookOpen className="w-5 h-5" />
          <span>Beginner</span>
        </motion.button>
        
        <motion.button
          onClick={() => onLevelChange('intermediate')}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
            selectedLevel === 'intermediate'
              ? 'bg-gradient-to-r from-golden-olive to-deep-maroon text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-deep-maroon dark:hover:text-deep-maroon'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Select Intermediate level courses"
          aria-pressed={selectedLevel === 'intermediate'}
        >
          <Award className="w-5 h-5" />
          <span>Intermediate</span>
        </motion.button>
      </div>
    </div>
  )
}

