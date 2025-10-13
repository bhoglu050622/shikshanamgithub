'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth/AuthContext'
import { SSOLoginModal } from '@/components/auth/SSOLoginModal'
import InitialScreen from './components/InitialScreen'
import QuizInterface from './components/QuizInterface'
import ResultsScreen from './components/ResultsScreen'
import { useGunaProfiler } from './hooks/useGunaProfiler'

// Note: metadata is handled in layout.tsx for client components

export default function GunaProfilerPage() {
  const [currentScreen, setCurrentScreen] = useState<'initial' | 'quiz' | 'results'>('initial')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, isLoading } = useAuth()
  const profilerData = useGunaProfiler()

  // Check authentication on mount
  useEffect(() => {
    if (!isLoading && !user) {
      // Store the intended quiz path for redirect after login
      localStorage.setItem('quiz-return-path', '/guna-profiler')
      setShowLoginModal(true)
    }
  }, [user, isLoading])

  const handleStartQuiz = () => {
    if (!user) {
      localStorage.setItem('quiz-return-path', '/guna-profiler')
      setShowLoginModal(true)
      return
    }
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

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fdfaf6' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
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
            userEmail={user?.email || ''}
            onResetQuiz={handleResetQuiz}
            feedbackRating={profilerData.feedbackRating}
            setFeedbackRating={profilerData.setFeedbackRating}
          />
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <SSOLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  )
}