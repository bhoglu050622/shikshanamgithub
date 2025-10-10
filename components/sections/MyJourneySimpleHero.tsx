'use client'

import { motion } from '@/components/motion/SimpleMotionWrapper'
import { useAuth } from '@/lib/auth/AuthContext'
import { getAllQuizResults } from '@/lib/quiz-tracking'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Brain, 
  Sparkles, 
  ArrowRight,
  CheckCircle
} from 'lucide-react'

interface MyJourneySimpleHeroProps {
  isLoading?: boolean
}

export default function MyJourneySimpleHero({ isLoading = false }: MyJourneySimpleHeroProps) {
  const { user } = useAuth()
  const router = useRouter()
  const quizResults = getAllQuizResults()
  
  const hasPersonalityData = !!(quizResults.gunaProfiler || quizResults.shivaAlignment)
  
  const handleTakeQuiz = () => {
    router.push('/personality-test')
  }

  const handleRetakeQuiz = (quizId: string) => {
    const urls: Record<string, string> = {
      'guna-profiler': '/guna-profiler',
      'shiva-alignment': '/how-aligned-are-you'
    }
    router.push(urls[quizId] || '/')
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-8 border border-blue-200 dark:border-blue-800"
    >
      <div className="text-center">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user?.name || 'Seeker'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your personalized learning journey awaits
          </p>
        </motion.div>

        {/* Personality Summary */}
        {hasPersonalityData ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-700"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Your Learning Profile</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Guna Profile */}
              {quizResults.gunaProfiler && (
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">Personality Type</h3>
                  <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg p-4">
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-1">
                      {quizResults.gunaProfiler.result.archetype}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {quizResults.gunaProfiler.result.dominantGuna.charAt(0).toUpperCase() + 
                       quizResults.gunaProfiler.result.dominantGuna.slice(1)}-dominant
                    </p>
                  </div>
                </div>
              )}

              {/* Spiritual Alignment */}
              {quizResults.shivaAlignment && (
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">Spiritual Alignment</h3>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-4">
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                      {quizResults.shivaAlignment.result.percentage}% Aligned
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {quizResults.shivaAlignment.result.archetype}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              {quizResults.gunaProfiler && (
                <button
                  onClick={() => handleRetakeQuiz('guna-profiler')}
                  className="flex items-center justify-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Retake Guna Test
                </button>
              )}
              {quizResults.shivaAlignment && (
                <button
                  onClick={() => handleRetakeQuiz('shiva-alignment')}
                  className="flex items-center justify-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Retake Alignment Test
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-700"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Discover Your Learning Profile
              </h2>
              <p className="text-muted-foreground mb-4">
                Take our personality assessments to unlock personalized course recommendations and insights.
              </p>
              <button
                onClick={handleTakeQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Assessment
              </button>
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        {hasPersonalityData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Personalized Recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Learning Style Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Spiritual Path Guidance</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
