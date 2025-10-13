'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle, ArrowRight, Star, Trophy, Target } from 'lucide-react'

interface LearningPathProps {
  allCompleted: boolean
  completionPercentage: number
}

export default function LearningPath({ allCompleted, completionPercentage }: LearningPathProps) {
  const milestones = [
    {
      id: 'discovery',
      title: 'Self Discovery',
      description: 'Complete personality and spiritual alignment quizzes',
      icon: Target,
      status: completionPercentage >= 50 ? 'completed' : 'current',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'learning',
      title: 'Active Learning',
      description: 'Engage with courses and deepen your understanding',
      icon: Star,
      status: completionPercentage >= 75 ? 'completed' : completionPercentage >= 50 ? 'current' : 'upcoming',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'mastery',
      title: 'Wisdom Mastery',
      description: 'Achieve proficiency and share knowledge with others',
      icon: Trophy,
      status: allCompleted ? 'completed' : 'upcoming',
      color: 'from-pink-500 to-red-600'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'current':
        return <Circle className="w-6 h-6 text-blue-600" />
      default:
        return <Circle className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'current':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      default:
        return 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-deep-maroon to-warm-saffron rounded-full mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {completionPercentage}%
            </div>
            <div className="text-sm text-white/80">
              Complete
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Learning Journey Progress
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {allCompleted 
            ? "Congratulations! You've completed your learning journey. Continue exploring to deepen your wisdom."
            : "You're making great progress on your path to wisdom and self-discovery."
          }
        </p>
      </motion.div>

      {/* Milestones */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800"></div>

        <div className="space-y-12">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            const isCompleted = milestone.status === 'completed'
            const isCurrent = milestone.status === 'current'

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start gap-6"
              >
                {/* Milestone Icon */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${getStatusColor(milestone.status)}`}>
                  {isCompleted || isCurrent ? (
                    <div className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <Icon className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Milestone Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {milestone.title}
                    </h4>
                    {getStatusIcon(milestone.status)}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {milestone.description}
                  </p>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2">
                    {isCompleted && (
                      <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </div>
                    )}
                    {isCurrent && (
                      <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        <ArrowRight className="w-4 h-4" />
                        In Progress
                      </div>
                    )}
                    {milestone.status === 'upcoming' && (
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                        <Circle className="w-4 h-4" />
                        Upcoming
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Next Steps */}
      {!allCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Next Steps on Your Journey
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completionPercentage < 50 && (
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
                <Target className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Complete Self-Discovery
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Take the remaining personality quizzes
                  </div>
                </div>
              </div>
            )}
            {completionPercentage >= 50 && completionPercentage < 100 && (
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
                <Star className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Explore Courses
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Start learning based on your results
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
              <Trophy className="w-6 h-6 text-pink-600" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Track Progress
                  </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Monitor your learning journey
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
