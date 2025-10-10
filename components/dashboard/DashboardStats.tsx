'use client'

import { motion } from 'framer-motion'
import { BookOpen, Trophy, Clock, TrendingUp, Star, Target, Zap } from 'lucide-react'
import { DashboardStats as StatsType } from '@/lib/types/graphy'

interface DashboardStatsProps {
  stats: StatsType
  isLoading?: boolean
}

export default function DashboardStats({ stats, isLoading = false }: DashboardStatsProps) {
  const completionRate = stats.totalCourses > 0 ? Math.round((stats.completedCourses / stats.totalCourses) * 100) : 0
  const averageHoursPerCourse = stats.completedCourses > 0 ? Math.round(stats.totalLearningHours / stats.completedCourses) : 0

  const cards = [
    {
      icon: BookOpen,
      title: 'Courses Enrolled',
      value: stats.totalCourses,
      subtitle: 'Total courses',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      progress: null,
      trend: null
    },
    {
      icon: Trophy,
      title: 'Courses Completed',
      value: stats.completedCourses,
      subtitle: 'Achievements earned',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      progress: completionRate,
      trend: stats.completedCourses > 0 ? 'up' : null
    },
    {
      icon: Clock,
      title: 'Learning Hours',
      value: Math.round(stats.totalLearningHours),
      subtitle: 'Time invested',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      progress: Math.min(Math.round(stats.totalLearningHours / 10) * 10, 100),
      trend: stats.totalLearningHours > 50 ? 'up' : null
    },
    {
      icon: TrendingUp,
      title: 'Current Streak',
      value: stats.currentStreak,
      subtitle: 'Days active',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      progress: Math.min(stats.currentStreak * 10, 100),
      trend: stats.currentStreak > 7 ? 'up' : null
    }
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-6 animate-pulse"
          >
            <div className="h-8 w-8 bg-muted rounded-lg mb-4"></div>
            <div className="h-6 bg-muted rounded mb-2"></div>
            <div className="h-8 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-card border-2 ${card.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
              <card.icon className="w-full h-full" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                {card.trend && (
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-foreground mb-1">
                {card.value}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {card.subtitle}
              </p>

              {/* Progress Ring */}
              {card.progress !== null && (
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
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
                      className={card.color}
                      initial={{ strokeDasharray: '0 251.2' }}
                      animate={{ 
                        strokeDasharray: `${(card.progress / 100) * 251.2} 251.2` 
                      }}
                      transition={{ duration: 2, delay: index * 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground">
                      {card.progress}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-foreground">Learning Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {completionRate}%
            </div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {averageHoursPerCourse}h
            </div>
            <div className="text-sm text-muted-foreground">Avg. per Course</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {stats.currentStreak > 0 ? '🔥' : '❄️'}
            </div>
            <div className="text-sm text-muted-foreground">
              {stats.currentStreak > 0 ? 'On Fire!' : 'Start Learning'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
