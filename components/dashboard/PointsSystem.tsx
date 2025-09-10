/**
 * Points System Component
 * Gamified points display with animations and achievements
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Trophy, 
  Crown, 
  Zap, 
  Flame, 
  Sparkles,
  Target,
  Award,
  TrendingUp,
  Gift
} from 'lucide-react'

interface PointsSystemProps {
  totalPoints: number
  level: number
  progressToNext: number
  badges: string[]
  onLevelUp?: () => void
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  points: number
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export function PointsSystem({ 
  totalPoints, 
  level, 
  progressToNext, 
  badges, 
  onLevelUp 
}: PointsSystemProps) {
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([])
  const [pointsAnimation, setPointsAnimation] = useState(0)

  const achievements: Achievement[] = [
    {
      id: 'first-quiz',
      title: 'Spiritual Seeker',
      description: 'Completed your first quiz',
      icon: Star,
      points: 50,
      unlocked: totalPoints >= 50,
      rarity: 'common'
    },
    {
      id: 'avatar-select',
      title: 'Divine Connection',
      description: 'Selected your spiritual avatar',
      icon: Crown,
      points: 100,
      unlocked: totalPoints >= 100,
      rarity: 'rare'
    },
    {
      id: 'level-5',
      title: 'Wise Student',
      description: 'Reached level 5',
      icon: Trophy,
      points: 500,
      unlocked: level >= 5,
      rarity: 'epic'
    },
    {
      id: 'perfect-balance',
      title: 'Perfect Balance',
      description: 'Achieved balanced guna scores',
      icon: Target,
      points: 200,
      unlocked: badges.includes('Balanced Nature'),
      rarity: 'rare'
    },
    {
      id: 'enlightened-mind',
      title: 'Enlightened Mind',
      description: 'High consciousness awareness',
      icon: Sparkles,
      points: 300,
      unlocked: badges.includes('Enlightened Mind'),
      rarity: 'epic'
    },
    {
      id: 'level-10',
      title: 'Spiritual Master',
      description: 'Reached the highest level',
      icon: Award,
      points: 1000,
      unlocked: level >= 10,
      rarity: 'legendary'
    }
  ]

  useEffect(() => {
    // Animate points counter
    const timer = setTimeout(() => {
      setPointsAnimation(totalPoints)
    }, 500)

    return () => clearTimeout(timer)
  }, [totalPoints])

  useEffect(() => {
    // Check for new achievements
    const newAchievements = achievements.filter(a => a.unlocked && !recentAchievements.find(ra => ra.id === a.id))
    if (newAchievements.length > 0) {
      setRecentAchievements(prev => [...prev, ...newAchievements])
    }
  }, [totalPoints, level, badges, achievements, recentAchievements])

  const getLevelTitle = (level: number): string => {
    if (level >= 10) return 'Enlightened Master'
    if (level >= 8) return 'Spiritual Sage'
    if (level >= 6) return 'Wise Seeker'
    if (level >= 4) return 'Devoted Student'
    if (level >= 2) return 'Spiritual Beginner'
    return 'New Seeker'
  }

  const getLevelColor = (level: number): string => {
    if (level >= 8) return 'from-purple-600 to-indigo-600'
    if (level >= 6) return 'from-blue-600 to-purple-600'
    if (level >= 4) return 'from-green-600 to-blue-600'
    if (level >= 2) return 'from-yellow-600 to-green-600'
    return 'from-orange-600 to-yellow-600'
  }

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600'
      case 'rare': return 'from-blue-500 to-blue-600'
      case 'epic': return 'from-purple-500 to-purple-600'
      case 'legendary': return 'from-yellow-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRarityGlow = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'shadow-gray-500/20'
      case 'rare': return 'shadow-blue-500/30'
      case 'epic': return 'shadow-purple-500/40'
      case 'legendary': return 'shadow-yellow-500/50'
      default: return 'shadow-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Points Display */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-saffron-500 to-orange-600 rounded-2xl p-6 text-white"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Spiritual Points</h2>
              <p className="text-white/90">Your journey progress</p>
            </div>
            <div className="text-right">
              <motion.div 
                className="text-4xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {pointsAnimation.toLocaleString()}
              </motion.div>
              <div className="text-sm text-white/80">Total Points</div>
            </div>
          </div>

          {/* Level Display */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${getLevelColor(level)} rounded-full flex items-center justify-center`}>
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">Level {level}</div>
                <div className="text-sm text-white/80">{getLevelTitle(level)}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80">Next Level</div>
              <div className="text-lg font-semibold">{progressToNext}/100</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div
              className="bg-white h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Badges */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-saffron-600" />
          Spiritual Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            >
              <Badge className="bg-saffron-100 text-saffron-800 dark:bg-saffron-900/30 dark:text-saffron-300 px-3 py-1">
                <Star className="w-3 h-3 mr-1" />
                {badge}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={achievement.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}/10 border-${achievement.rarity === 'legendary' ? 'yellow' : achievement.rarity === 'epic' ? 'purple' : achievement.rarity === 'rare' ? 'blue' : 'gray'}-500/30 ${getRarityGlow(achievement.rarity)}`
                    : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}`
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}>
                    <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400'}`}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-medium ${achievement.unlocked ? 'text-saffron-600' : 'text-slate-400'}`}>
                        +{achievement.points} points
                      </span>
                      {achievement.unlocked && (
                        <Badge className={`text-xs ${
                          achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                          achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                          achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {achievement.rarity}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Card>

      {/* Recent Achievements Popup */}
      <AnimatePresence>
        {recentAchievements.length > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-4 right-4 z-50"
          >
            {recentAchievements.slice(-1).map((achievement) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-2xl border-2 ${getRarityGlow(achievement.rarity)} max-w-sm`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Achievement Unlocked!</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.title}</p>
                      <p className="text-xs text-saffron-600">+{achievement.points} points</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
