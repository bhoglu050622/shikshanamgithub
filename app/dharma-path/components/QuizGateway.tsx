'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Lock, CheckCircle } from 'lucide-react'
import { quizzes } from '../data/quizzes'
import { Quiz, QuizResult } from '../types/dharma-path'
import QuizInterface from './QuizInterface'

interface QuizGatewayProps {
  onQuizComplete: (results: QuizResult[]) => void
}

export default function QuizGateway({ onQuizComplete }: QuizGatewayProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])

  const handleQuizComplete = (result: QuizResult) => {
    const newResults = [...quizResults, result]
    setQuizResults(newResults)
    setCompletedQuizzes([...completedQuizzes, result.quizId])
    setSelectedQuiz(null)

    // If all quizzes are completed, call the parent callback
    if (newResults.length === quizzes.length) {
      onQuizComplete(newResults)
    }
  }

  const handleBackToGateway = () => {
    setSelectedQuiz(null)
  }

  if (selectedQuiz) {
    return (
      <QuizInterface
        quiz={selectedQuiz}
        onComplete={handleQuizComplete}
        onBack={handleBackToGateway}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Temple of <span className="text-saffron-400">Self-Discovery</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Enter the sacred portals of wisdom to explore your spiritual nature. 
            Each quiz reveals different aspects of your consciousness and guides you deeper into your Dharma Path.
          </p>
        </motion.div>

        {/* Quiz Portals */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {quizzes.map((quiz, index) => {
            const isCompleted = completedQuizzes.includes(quiz.id)
            const isLocked = !isCompleted && index > 0 && !completedQuizzes.includes(quizzes[index - 1].id)

            return (
              <motion.div
                key={quiz.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={!isLocked ? { scale: 1.05, y: -10 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!isLocked) {
                    // Special handling for external quiz pages
                    if (quiz.id === 'guna-profile') {
                      window.location.href = '/guna-profiler'
                      return
                    }
                    if (quiz.id === 'shiva-consciousness') {
                      window.location.href = '/how-aligned-are-you'
                      return
                    }
                    setSelectedQuiz(quiz)
                  }
                }}
                className={`group cursor-pointer relative ${
                  isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <div className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border transition-all duration-300 shadow-2xl ${
                  isCompleted 
                    ? 'border-green-400/50 shadow-green-500/20' 
                    : isLocked 
                    ? 'border-white/10 opacity-50' 
                    : 'border-white/20 hover:border-saffron-400/50 hover:shadow-saffron-500/20'
                }`}>
                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                  )}

                  {/* Lock Icon */}
                  {isLocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-8 h-8 text-white/40" />
                    </div>
                  )}

                  {/* Premium Badge for Guna Profile */}
                  {!isCompleted && !isLocked && quiz.id === 'guna-profile' && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Premium
                      </div>
                    </div>
                  )}

                  {/* Quiz Icon */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-green-400/20 to-green-600/30' 
                        : isLocked 
                        ? 'bg-gradient-to-br from-white/5 to-white/10' 
                        : quiz.id === 'guna-profile'
                        ? 'bg-gradient-to-br from-emerald-400/20 to-teal-600/30 group-hover:scale-110'
                        : 'bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 group-hover:scale-110'
                    }`}>
                      <span className={`text-4xl ${isLocked ? 'opacity-50' : ''}`}>
                        {quiz.icon}
                      </span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      isCompleted ? 'text-green-300' : isLocked ? 'text-white/50' : 'text-white'
                    }`}>
                      {quiz.title}
                    </h3>
                    <p className={`text-sm ${
                      isCompleted ? 'text-green-400' : isLocked ? 'text-white/40' : 'text-saffron-400'
                    }`}>
                      {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="text-center mb-6">
                    <p className={`leading-relaxed ${
                      isLocked ? 'text-white/40' : 'text-white/80'
                    }`}>
                      {quiz.description}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="mb-6">
                    <div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            isCompleted 
                              ? 'bg-green-400' 
                              : isLocked 
                              ? 'bg-white/20' 
                              : 'bg-saffron-400/40'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-center text-xs mt-2 ${
                      isLocked ? 'text-white/40' : 'text-white/60'
                    }`}>
                      {quiz.questions.length} Questions
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    {isCompleted ? (
                      <div className="flex items-center justify-center space-x-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                    ) : isLocked ? (
                      <div className="flex items-center justify-center space-x-2 text-white/40">
                        <Lock className="w-5 h-5" />
                        <span className="font-medium">Complete Previous Quiz</span>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span>
                          {quiz.id === 'guna-profile' ? 'Launch Profiler' : 
                           quiz.id === 'shiva-consciousness' ? 'Check Alignment' : 
                           'Enter Portal'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  {!isLocked && (
                    <div className="absolute inset-0 bg-gradient-to-br from-saffron-400/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Progress Summary */}
        {completedQuizzes.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
              <div className="flex justify-center space-x-4 mb-4">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      completedQuizzes.includes(quiz.id)
                        ? 'bg-green-400/20 border-2 border-green-400'
                        : 'bg-white/10 border-2 border-white/20'
                    }`}
                  >
                    <span className="text-lg">
                      {completedQuizzes.includes(quiz.id) ? '✓' : quiz.icon}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-white/80">
                {completedQuizzes.length} of {quizzes.length} quizzes completed
              </p>
            </div>
          </motion.div>
        )}

        {/* Continue to Dashboard Button */}
        {completedQuizzes.length === quizzes.length && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8"
          >
            <motion.button
              onClick={() => onQuizComplete(quizResults)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            >
              Complete Journey & View Dashboard
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
