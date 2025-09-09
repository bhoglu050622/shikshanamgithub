'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InitialScreen from './components/InitialScreen'
import QuizInterface from './components/QuizInterface'
import ResultsScreen from './components/ResultsScreen'
import { useShivaAlignment } from './hooks/useShivaAlignment'

export default function ShivaAlignmentPage() {
  const [currentScreen, setCurrentScreen] = useState<'initial' | 'quiz' | 'results'>('initial')
  const alignmentData = useShivaAlignment()

  const handleStartQuiz = () => {
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
  if (alignmentData.showResults && currentScreen !== 'results') {
    setCurrentScreen('results')
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
            onResetQuiz={handleResetQuiz}
            feedbackRating={alignmentData.feedbackRating}
            setFeedbackRating={alignmentData.setFeedbackRating}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
