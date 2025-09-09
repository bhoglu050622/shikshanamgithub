'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InitialScreen from './components/InitialScreen'
import QuizInterface from './components/QuizInterface'
import ResultsScreen from './components/ResultsScreen'
import { useGunaProfiler } from './hooks/useGunaProfiler'

// Note: metadata is handled in layout.tsx for client components

export default function GunaProfilerPage() {
  const [currentScreen, setCurrentScreen] = useState<'initial' | 'quiz' | 'results'>('initial')
  const profilerData = useGunaProfiler()

  const handleStartQuiz = () => {
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = () => {
    setCurrentScreen('results')
  }

  const handleResetQuiz = () => {
    profilerData.resetQuiz()
    setCurrentScreen('initial')
  }

  // Auto-navigate to results when quiz is complete
  if (profilerData.showResults && currentScreen !== 'results') {
    setCurrentScreen('results')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdfaf6' }}>
      <AnimatePresence mode="wait">
        {currentScreen === 'initial' && (
          <InitialScreen
            key="initial"
            onStartQuiz={handleStartQuiz}
            userName={profilerData.userName}
          />
        )}
        
        {currentScreen === 'quiz' && (
          <QuizInterface
            key="quiz"
            {...profilerData}
            onQuizComplete={handleQuizComplete}
          />
        )}
        
        {currentScreen === 'results' && profilerData.result && (
          <ResultsScreen
            key="results"
            result={profilerData.result}
            userName={profilerData.userName}
            onResetQuiz={handleResetQuiz}
            feedbackRating={profilerData.feedbackRating}
            setFeedbackRating={profilerData.setFeedbackRating}
          />
        )}
      </AnimatePresence>
    </div>
  )
}