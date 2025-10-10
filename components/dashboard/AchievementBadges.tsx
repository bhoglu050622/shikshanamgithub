'use client'

import { motion } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  BookOpen, 
  Clock, 
  Target, 
  Zap, 
  Crown, 
  Award,
  Flame,
  CheckCircle,
  Lock
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  color: string
  bgColor: string
  borderColor: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
  category: 'learning' | 'streak' | 'completion' | 'milestone'
}

interface AchievementBadgesProps {
  stats: {
    totalCourses: number
    completedCourses: number
    totalLearningHours: number
    currentStreak: number
    totalExpenses: number
  }
  isLoading?: boolean
}

export default function AchievementBadges({ stats, isLoading = false }: AchievementBadgesProps) {
  const achievements: Achievement[] = [
    // Learning Achievements
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Enrolled in your first course',
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      unlocked: stats.totalCourses > 0,
      category: 'learning'
    },
    {
      id: 'course-explorer',
      title: 'Course Explorer',
      description: 'Enrolled in 5+ courses',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-300 dark:border-blue-700',
      unlocked: stats.totalCourses >= 5,
      progress: Math.min(stats.totalCourses, 5),
      maxProgress: 5,
      category: 'learning'
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Enrolled in 10+ courses',
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      unlocked: stats.totalCourses >= 10,
      progress: Math.min(stats.totalCourses, 10),
      maxProgress: 10,
      category: 'learning'
    },

    // Completion Achievements
    {
      id: 'first-completion',
      title: 'First Victory',
      description: 'Completed your first course',
      icon: Trophy,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      unlocked: stats.completedCourses > 0,
      category: 'completion'
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner',
      description: 'Completed 3+ courses',
      icon: Award,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-300 dark:border-green-700',
      unlocked: stats.completedCourses >= 3,
      progress: Math.min(stats.completedCourses, 3),
      maxProgress: 3,
      category: 'completion'
    },
    {
      id: 'master-student',
      title: 'Master Student',
      description: 'Completed 5+ courses',
      icon: Crown,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      unlocked: stats.completedCourses >= 5,
      progress: Math.min(stats.completedCourses, 5),
      maxProgress: 5,
      category: 'completion'
    },

    // Time-based Achievements
    {
      id: 'time-investor',
      title: 'Time Investor',
      description: 'Spent 10+ hours learning',
      icon: Clock,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      unlocked: stats.totalLearningHours >= 10,
      progress: Math.min(stats.totalLearningHours, 10),
      maxProgress: 10,
      category: 'milestone'
    },
    {
      id: 'dedicated-scholar',
      title: 'Dedicated Scholar',
      description: 'Spent 50+ hours learning',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      borderColor: 'border-indigo-300 dark:border-indigo-700',
      unlocked: stats.totalLearningHours >= 50,
      progress: Math.min(stats.totalLearningHours, 50),
      maxProgress: 50,
      category: 'milestone'
    },
    {
      id: 'wisdom-seeker',
      title: 'Wisdom Seeker',
      description: 'Spent 100+ hours learning',
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-300 dark:border-purple-700',
      unlocked: stats.totalLearningHours >= 100,
      progress: Math.min(stats.totalLearningHours, 100),
      maxProgress: 100,
      category: 'milestone'
    },

    // Streak Achievements
    {
      id: 'consistent-learner',
      title: 'Consistent Learner',
      description: '7-day learning streak',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      unlocked: stats.currentStreak >= 7,
      progress: Math.min(stats.currentStreak, 7),
      maxProgress: 7,
      category: 'streak'
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: '30-day learning streak',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-300 dark:border-orange-700',
      unlocked: stats.currentStreak >= 30,
      progress: Math.min(stats.currentStreak, 30),
      maxProgress: 30,
      category: 'streak'
    },
    {
      id: 'legendary-dedication',
      title: 'Legendary Dedication',
      description: '100-day learning streak',
      icon: Crown,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      unlocked: stats.currentStreak >= 100,
      progress: Math.min(stats.currentStreak, 100),
      maxProgress: 100,
      category: 'streak'
    }
  ]

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  const lockedAchievements = achievements.filter(a => !a.unlocked)
  const nextAchievement = lockedAchievements.find(a => a.progress && a.progress > 0)

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-32 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
          <p className="text-muted-foreground">
            {unlockedAchievements.length} of {achievements.length} achievements unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">
            {unlockedAchievements.length}
          </div>
          <div className="text-sm text-muted-foreground">Unlocked</div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            Unlocked Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unlockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-lg border-2 ${achievement.bgColor} ${achievement.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${achievement.bgColor} mb-3`}>
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Next Achievement */}
      {nextAchievement && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Target className="w-5 h-5 text-blue-500 mr-2" />
            Next Achievement
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${nextAchievement.bgColor} mr-3`}>
                  <nextAchievement.icon className={`w-5 h-5 ${nextAchievement.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{nextAchievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{nextAchievement.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {nextAchievement.progress}/{nextAchievement.maxProgress}
                </div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${nextAchievement.color.replace('text-', 'bg-')}`}
                initial={{ width: 0 }}
                animate={{ width: `${(nextAchievement.progress! / nextAchievement.maxProgress!) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Locked Achievements Preview */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Lock className="w-5 h-5 text-muted-foreground mr-2" />
            More Achievements to Unlock
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lockedAchievements.slice(0, 4).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-4 rounded-lg border-2 border-muted bg-muted/30 opacity-60"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-muted mb-3">
                    <achievement.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-muted-foreground text-sm mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
          {lockedAchievements.length > 4 && (
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                +{lockedAchievements.length - 4} more achievements to discover
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
