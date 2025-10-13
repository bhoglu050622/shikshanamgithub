'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, ArrowRight, BookOpen, Brain } from 'lucide-react'
import Link from 'next/link'

interface QuizProgressProps {
  completedQuizzes: string[]
  gunaResult: any
  shivaResult: any
}

export default function QuizProgress({ completedQuizzes, gunaResult, shivaResult }: QuizProgressProps) {
  const quizzes = [
    {
      id: 'guna-profiler',
      name: 'Guna Profiler',
      description: 'Discover your personality through the three gunas (Sattva, Rajas, Tamas)',
      icon: Brain,
      url: '/guna-profiler',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'shiva-alignment',
      name: 'Shiva Alignment Quiz',
      description: 'Understand your spiritual alignment and archetype',
      icon: BookOpen,
      url: '/how-aligned-are-you',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    }
  ]

  const getQuizStatus = (quizId: string) => {
    const isCompleted = completedQuizzes.includes(quizId)
    let result = null
    
    if (quizId === 'guna-profiler' && gunaResult) {
      result = gunaResult
    } else if (quizId === 'shiva-alignment' && shivaResult) {
      result = shivaResult
    }
    
    return { isCompleted, result }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {quizzes.map((quiz, index) => {
        const { isCompleted, result } = getQuizStatus(quiz.id)
        const Icon = quiz.icon

        return (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-2xl border-2 ${quiz.bgColor} ${quiz.borderColor} p-8 transition-all duration-300 hover:shadow-lg`}
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {isCompleted ? (
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                  <Circle className="w-4 h-4" />
                  Not Started
                </div>
              )}
            </div>

            {/* Quiz Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${quiz.color} rounded-2xl mb-6`}>
              <Icon className="w-8 h-8 text-white" />
            </div>

            {/* Quiz Info */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {quiz.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {quiz.description}
              </p>
            </div>

            {/* Results Summary */}
            {isCompleted && result && (
              <div className="mb-6 p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-white/20 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Your Results:
                </h4>
                {quiz.id === 'guna-profiler' && result.dominantGuna && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Dominant Guna:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {result.dominantGuna}
                      </span>
                    </div>
                    {result.percentages && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Sattva: {Math.round(result.percentages.sattva)}% | 
                        Rajas: {Math.round(result.percentages.rajas)}% | 
                        Tamas: {Math.round(result.percentages.tamas)}%
                      </div>
                    )}
                  </div>
                )}
                {quiz.id === 'shiva-alignment' && result.dominantArchetype && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Archetype:</span>
                      <span className="font-medium text-gray-900 dark:text-white capitalize">
                        {result.dominantArchetype}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Alignment: {Math.round(result.percentage)}%
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <Link href={quiz.url}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r ${quiz.color} text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300`}
              >
                {isCompleted ? (
                  <>
                    <span>View Results</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Start Quiz</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </Link>

            {/* Progress Indicator */}
            {isCompleted && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Quiz completed successfully!</span>
                </div>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
