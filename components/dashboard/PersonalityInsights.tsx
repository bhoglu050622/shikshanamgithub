'use client'

import { useState, useEffect } from 'react'
import { motion } from '@/components/motion/SimpleMotionWrapper'
import { getAllQuizResults } from '@/lib/quiz-tracking'
import { useRouter } from 'next/navigation'
import { 
  UserCheck, 
  Sparkles, 
  TrendingUp, 
  Brain, 
  Heart, 
  Zap,
  ArrowRight,
  RefreshCw,
  Clock,
  Target
} from 'lucide-react'

interface PersonalityInsightsProps {
  isLoading?: boolean
}

export default function PersonalityInsights({ isLoading = false }: PersonalityInsightsProps) {
  const [quizResults, setQuizResults] = useState<any>(null)
  const [hasResults, setHasResults] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const results = getAllQuizResults()
    setQuizResults(results)
    setHasResults(!!(results.gunaProfiler || results.shivaAlignment))
  }, [])

  const handleRetakeQuiz = (quizId: string) => {
    const urls: Record<string, string> = {
      'guna-profiler': '/guna-profiler',
      'shiva-alignment': '/how-aligned-are-you'
    }
    router.push(urls[quizId] || '/')
  }

  const handleTakeQuiz = () => {
    router.push('/personality-test')
  }

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!hasResults) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Discover Your Personality</h3>
          <p className="text-muted-foreground mb-6">
            Take our personality assessments to unlock personalized insights and course recommendations.
          </p>
          <button
            onClick={handleTakeQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Your Personality Profile</h2>
            <p className="text-muted-foreground">Insights from your completed assessments</p>
          </div>
          <div className="flex space-x-2">
            {quizResults.gunaProfiler && (
              <button
                onClick={() => handleRetakeQuiz('guna-profiler')}
                className="flex items-center px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Retake Guna
              </button>
            )}
            {quizResults.shivaAlignment && (
              <button
                onClick={() => handleRetakeQuiz('shiva-alignment')}
                className="flex items-center px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Retake Alignment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Guna Profiler Results */}
      {quizResults.gunaProfiler && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Guna Profiler</h3>
              <p className="text-sm text-muted-foreground">Your dominant personality traits</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Archetype */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Your Archetype</h4>
              <p className="text-2xl font-bold text-orange-600 mb-1">
                {quizResults.gunaProfiler.result.archetype}
              </p>
              <p className="text-sm text-muted-foreground">
                {quizResults.gunaProfiler.result.description}
              </p>
            </div>

            {/* Guna Distribution */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Guna Distribution</h4>
              <div className="space-y-3">
                {[
                  { name: 'Sattva', value: quizResults.gunaProfiler.result.percentages.sattva, color: 'bg-amber-500' },
                  { name: 'Rajas', value: quizResults.gunaProfiler.result.percentages.rajas, color: 'bg-pink-500' },
                  { name: 'Tamas', value: quizResults.gunaProfiler.result.percentages.tamas, color: 'bg-violet-500' }
                ].map((guna, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{guna.name}</span>
                      <span className="text-muted-foreground">{guna.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${guna.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${guna.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Shiva Alignment Results */}
      {quizResults.shivaAlignment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">How Aligned Are You?</h3>
              <p className="text-sm text-muted-foreground">Your spiritual alignment archetype</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Archetype */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Your Alignment</h4>
              <p className="text-2xl font-bold text-yellow-600 mb-1">
                {quizResults.shivaAlignment.result.archetype}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {quizResults.shivaAlignment.result.sanskritName}
              </p>
              <p className="text-sm text-muted-foreground">
                {quizResults.shivaAlignment.result.description}
              </p>
            </div>

            {/* Alignment Percentage */}
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-yellow-500"
                    initial={{ strokeDasharray: '0 251.2' }}
                    animate={{ 
                      strokeDasharray: `${(quizResults.shivaAlignment.result.percentage / 100) * 251.2} 251.2` 
                    }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">
                    {quizResults.shivaAlignment.result.percentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Learning Style Analysis */}
      {quizResults.gunaProfiler && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Learning Style Analysis</h3>
              <p className="text-sm text-muted-foreground">Personalized study recommendations based on your guna profile</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Learning Preferences */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-3">Your Learning Preferences</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Study Environment</span>
                  <span className="text-sm text-muted-foreground">
                    {quizResults.gunaProfiler.result.dominantGuna === 'sattva' ? 'Quiet, peaceful spaces' :
                     quizResults.gunaProfiler.result.dominantGuna === 'rajas' ? 'Active, dynamic settings' : 'Structured, organized areas'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Learning Pace</span>
                  <span className="text-sm text-muted-foreground">
                    {quizResults.gunaProfiler.result.dominantGuna === 'sattva' ? 'Self-paced, contemplative' :
                     quizResults.gunaProfiler.result.dominantGuna === 'rajas' ? 'Intensive, fast-paced' : 'Gradual, methodical'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Content Preference</span>
                  <span className="text-sm text-muted-foreground">
                    {quizResults.gunaProfiler.result.dominantGuna === 'sattva' ? 'Philosophical, spiritual' :
                     quizResults.gunaProfiler.result.dominantGuna === 'rajas' ? 'Practical, actionable' : 'Structured, foundational'}
                  </span>
                </div>
              </div>
            </div>

            {/* Study Recommendations */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-3">Study Recommendations</h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-sm font-semibold text-foreground">Best Study Times</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {quizResults.gunaProfiler.result.dominantGuna === 'sattva' ? 'Early morning (5-7 AM) for meditation and study' :
                     quizResults.gunaProfiler.result.dominantGuna === 'rajas' ? 'Morning to afternoon (8 AM-2 PM) for active learning' : 'Evening (6-9 PM) for structured study sessions'}
                  </p>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Target className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm font-semibold text-foreground">Retention Strategy</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {quizResults.gunaProfiler.result.dominantGuna === 'sattva' ? 'Reflective journaling and meditation on concepts' :
                     quizResults.gunaProfiler.result.dominantGuna === 'rajas' ? 'Active discussion and practical application' : 'Repetitive practice and structured review'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Combined Insights */}
      {quizResults.gunaProfiler && quizResults.shivaAlignment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Combined Insights</h3>
              <p className="text-sm text-muted-foreground">Your unique personality profile</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Emotional Nature</h4>
              <p className="text-sm text-muted-foreground">
                {quizResults.gunaProfiler.result.dominantGuna === 'sattva' ? 'Balanced & Clear' :
                 quizResults.gunaProfiler.result.dominantGuna === 'rajas' ? 'Dynamic & Active' : 'Stable & Grounded'}
              </p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Spiritual Path</h4>
              <p className="text-sm text-muted-foreground">
                {quizResults.shivaAlignment.result.dominantArchetype === 'unbound' ? 'Transcendent' :
                 quizResults.shivaAlignment.result.dominantArchetype === 'harmonious' ? 'Integrated' :
                 quizResults.shivaAlignment.result.dominantArchetype === 'reflective' ? 'Contemplative' :
                 quizResults.shivaAlignment.result.dominantArchetype === 'awakener' ? 'Transformative' : 'Emerging'}
              </p>
            </div>
            
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Growth Potential</h4>
              <p className="text-sm text-muted-foreground">
                {quizResults.shivaAlignment.result.percentage > 80 ? 'Highly Aligned' :
                 quizResults.shivaAlignment.result.percentage > 60 ? 'Well Aligned' : 'Developing'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Missing Quiz Prompt */}
      {(!quizResults.gunaProfiler || !quizResults.shivaAlignment) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-200"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Complete Your Profile
            </h3>
            <p className="text-muted-foreground mb-4">
              {!quizResults.gunaProfiler && !quizResults.shivaAlignment 
                ? 'Take both personality assessments to get complete insights and personalized recommendations.'
                : !quizResults.gunaProfiler 
                ? 'Complete the Guna Profiler to understand your personality traits.'
                : 'Complete the How Aligned Are You assessment to discover your spiritual alignment.'
              }
            </p>
            <button
              onClick={handleTakeQuiz}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {!quizResults.gunaProfiler && !quizResults.shivaAlignment 
                ? 'Start Assessments'
                : 'Complete Missing Quiz'
              }
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
