'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth/AuthContext'
import { SSOLoginModal } from '@/components/auth/SSOLoginModal'
import InitialScreen from './components/InitialScreen'
import QuizInterface from './components/QuizInterface'
import ResultsScreen from './components/ResultsScreen'
import { useShivaAlignment } from './hooks/useShivaAlignment'

export default function ShivaAlignmentPage() {
  const [currentScreen, setCurrentScreen] = useState<'initial' | 'quiz' | 'results'>('initial')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, isLoading } = useAuth()
  const alignmentData = useShivaAlignment()

  // Check authentication on mount
  useEffect(() => {
    if (!isLoading && !user) {
      // Store the intended quiz path for redirect after login
      localStorage.setItem('quiz-return-path', '/how-aligned-are-you')
      setShowLoginModal(true)
    }
  }, [user, isLoading])

  const handleStartQuiz = () => {
    if (!user) {
      localStorage.setItem('quiz-return-path', '/how-aligned-are-you')
      setShowLoginModal(true)
      return
    }
    setCurrentScreen('quiz')
  }

  const handleQuizComplete = () => {
    setCurrentScreen('results')
  }

  const handleResetQuiz = () => {
    alignmentData.resetQuiz()
    setCurrentScreen('initial')
  }

  // Auto-navigate to results when quiz is complete
  useEffect(() => {
    if (alignmentData.showResults && currentScreen !== 'results') {
      setCurrentScreen('results')
    }
  }, [alignmentData.showResults, currentScreen])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Canvas */}
      <canvas 
        id="background-canvas" 
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Trishul Flash Effect */}
      <div 
        id="trishul-flash" 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-0 pointer-events-none z-50 transition-all duration-500"
        style={{ 
          color: 'hsl(43, 45%, 58%)',
          fontSize: '20rem'
        }}
      >
        🔱
      </div>

      {/* Custom Cursor */}
      <div className="custom-cursor cursor-ring fixed top-0 left-0 w-8 h-8 border border-yellow-600 rounded-full pointer-events-none z-50 opacity-50" />
      <div className="custom-cursor cursor-dot fixed top-0 left-0 w-2 h-2 bg-yellow-600 rounded-full pointer-events-none z-50" />

      <AnimatePresence mode="wait">
        {currentScreen === 'initial' && (
          <InitialScreen
            key="initial"
            onStartQuiz={handleStartQuiz}
            userName={alignmentData.userName}
          />
        )}
        
        {currentScreen === 'quiz' && (
          <QuizInterface
            key="quiz"
            {...alignmentData}
            onQuizComplete={handleQuizComplete}
          />
        )}
        
        {currentScreen === 'results' && alignmentData.result && (
          <ResultsScreen
            key="results"
            result={alignmentData.result}
            userName={alignmentData.userName}
            userEmail={user?.email || ''}
            onResetQuiz={handleResetQuiz}
            feedbackRating={alignmentData.feedbackRating}
            setFeedbackRating={alignmentData.setFeedbackRating}
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
