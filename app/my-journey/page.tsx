'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth/AuthContext'
import { getCompletedQuizzes, areAllQuizzesCompleted, getCompletionPercentage, getQuizResult } from '@/lib/quiz-tracking'
import JourneyHero from './components/JourneyHero'
import QuizProgress from './components/QuizProgress'
import LearningPath from './components/LearningPath'
import CourseRecommendations from './components/CourseRecommendations'

export default function MyJourneyPage() {
  const { user, isLoggedIn } = useAuth()
  const [quizData, setQuizData] = useState({
    completedQuizzes: [] as string[],
    allCompleted: false,
    completionPercentage: 0,
    gunaResult: null as any,
    shivaResult: null as any
  })

  // Load quiz data on mount and when user changes
  useEffect(() => {
    if (typeof window !== 'undefined' && user?.email) {
      const userEmail = user.email
      const completedQuizzes = getCompletedQuizzes(userEmail)
      const allCompleted = areAllQuizzesCompleted(userEmail)
      const completionPercentage = getCompletionPercentage(userEmail)
      
      // Get quiz results if completed
      const gunaResult = getQuizResult('guna-profiler', userEmail)
      const shivaResult = getQuizResult('shiva-alignment', userEmail)

      setQuizData({
        completedQuizzes,
        allCompleted,
        completionPercentage,
        gunaResult,
        shivaResult
      })
    }
  }, [user])

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-maroon mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Journey Hero Section */}
      <JourneyHero 
        user={user}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-12">
          {/* Quiz Progress Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Your Learning Progress
            </h2>
            <QuizProgress 
              completedQuizzes={quizData.completedQuizzes}
              gunaResult={quizData.gunaResult}
              shivaResult={quizData.shivaResult}
            />
          </motion.section>

          {/* Learning Path Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Your Learning Journey
            </h2>
            <LearningPath 
              allCompleted={quizData.allCompleted}
              completionPercentage={quizData.completionPercentage}
            />
          </motion.section>

          {/* Course Recommendations Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Recommended for You
            </h2>
            <CourseRecommendations 
              gunaResult={quizData.gunaResult}
              shivaResult={quizData.shivaResult}
              completedQuizzes={quizData.completedQuizzes}
            />
          </motion.section>
        </div>
      </div>
    </div>
  )
}
