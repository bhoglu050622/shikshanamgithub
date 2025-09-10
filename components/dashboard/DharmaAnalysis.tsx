/**
 * Dharma Analysis Component
 * Displays gamified analysis of user's dharma path journey
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  Trophy, 
  Target, 
  Zap, 
  Heart, 
  Brain, 
  Shield, 
  Crown,
  TrendingUp,
  Award,
  Sparkles,
  Flame,
  Eye
} from 'lucide-react'

interface DharmaAnalysisProps {
  userEmail?: string
}

interface DharmaProfile {
  name: string
  email: string
  selectedAvatar: {
    id: string
    name: string
    sanskritName: string
    essence: string
    symbol: string
    attributes: string[]
  }
  quizResults: Array<{
    quizId: string
    scores: Record<string, number>
    interpretation: string
    description: string
    completedAt: string
  }>
  createdAt: string
  lastUpdated: string
}

interface SpiritualMetrics {
  totalPoints: number
  level: number
  progressToNext: number
  badges: string[]
  strengths: string[]
  recommendations: string[]
  avatarAlignment: number
  gunaBalance: {
    sattva: number
    rajas: number
    tamas: number
  }
  consciousnessLevel: {
    awareness: number
    detachment: number
    presence: number
  }
}

export function DharmaAnalysis({ userEmail }: DharmaAnalysisProps) {
  const [profile, setProfile] = useState<DharmaProfile | null>(null)
  const [metrics, setMetrics] = useState<SpiritualMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'guna' | 'consciousness' | 'progress'>('overview')

  const loadDharmaProfile = useCallback(() => {
    try {
      const storedProfile = localStorage.getItem('dharma-path-profile')
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile)
        setProfile(parsedProfile)
        calculateMetrics(parsedProfile)
      }
    } catch (error) {
      console.error('Error loading dharma profile:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDharmaProfile()
  }, [userEmail, loadDharmaProfile])

  const calculateMetrics = (profile: DharmaProfile): SpiritualMetrics => {
    let totalPoints = 0
    const badges: string[] = []
    const strengths: string[] = []
    const recommendations: string[] = []

    // Calculate points based on quiz completion and scores
    profile.quizResults.forEach(result => {
      if (result.quizId === 'guna-profile') {
        const gunaScores = result.scores
        const maxGuna = Math.max(gunaScores.sattva || 0, gunaScores.rajas || 0, gunaScores.tamas || 0)
        totalPoints += maxGuna * 10

        // Guna-specific badges
        if (gunaScores.sattva > 10) badges.push('Sattvic Soul')
        if (gunaScores.rajas > 10) badges.push('Dynamic Spirit')
        if (gunaScores.tamas > 10) badges.push('Grounded Being')
        if (Math.abs((gunaScores.sattva || 0) - (gunaScores.rajas || 0)) < 3) badges.push('Balanced Nature')
      }

      if (result.quizId === 'shiva-consciousness') {
        const consciousnessScores = result.scores
        const avgConsciousness = Object.values(consciousnessScores).reduce((a, b) => a + b, 0) / Object.keys(consciousnessScores).length
        totalPoints += avgConsciousness * 15

        // Consciousness badges
        if (avgConsciousness > 8) badges.push('Enlightened Mind')
        if (consciousnessScores.awareness > 8) badges.push('Aware Soul')
        if (consciousnessScores.detachment > 8) badges.push('Detached Sage')
        if (consciousnessScores.presence > 8) badges.push('Present Being')
      }
    })

    // Avatar alignment points
    const avatarAlignment = profile.selectedAvatar ? 85 : 0
    totalPoints += avatarAlignment

    // Calculate level (every 100 points = 1 level)
    const level = Math.floor(totalPoints / 100) + 1
    const progressToNext = (totalPoints % 100)

    // Generate strengths and recommendations
    if (profile.quizResults.length > 0) {
      strengths.push('Spiritual Seeker', 'Self-Aware', 'Growth-Oriented')
      recommendations.push('Continue meditation practice', 'Explore advanced courses', 'Join spiritual community')
    }

    // Calculate guna balance
    const gunaResult = profile.quizResults.find(r => r.quizId === 'guna-profile')
    const gunaBalance = gunaResult ? {
      sattva: gunaResult.scores.sattva || 0,
      rajas: gunaResult.scores.rajas || 0,
      tamas: gunaResult.scores.tamas || 0
    } : { sattva: 0, rajas: 0, tamas: 0 }

    // Calculate consciousness level
    const consciousnessResult = profile.quizResults.find(r => r.quizId === 'shiva-consciousness')
    const consciousnessLevel = consciousnessResult ? {
      awareness: consciousnessResult.scores.awareness || 0,
      detachment: consciousnessResult.scores.detachment || 0,
      presence: consciousnessResult.scores.presence || 0
    } : { awareness: 0, detachment: 0, presence: 0 }

    return {
      totalPoints,
      level,
      progressToNext,
      badges,
      strengths,
      recommendations,
      avatarAlignment,
      gunaBalance,
      consciousnessLevel
    }
  }

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

  if (isLoading) {
    return (
      <Card className="p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="animate-spin w-8 h-8 border-4 border-saffron-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-slate-600 dark:text-slate-400">Loading your spiritual journey...</p>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <Sparkles className="h-12 w-12 text-saffron-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Begin Your Spiritual Journey
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Complete the Dharma Path to unlock your personalized spiritual analysis.
        </p>
        <Button 
          onClick={() => window.location.href = '/dharma-path'}
          className="bg-saffron-600 hover:bg-saffron-700 text-white"
        >
          Start Dharma Path
        </Button>
      </Card>
    )
  }

  if (!metrics) return null

  return (
    <div className="space-y-6">
      {/* Header with Level and Points */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-saffron-500 to-orange-600 rounded-2xl p-6 text-white"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Spiritual Journey</h2>
              <p className="text-white/90">Welcome back, {profile.name}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{metrics.totalPoints}</div>
              <div className="text-sm text-white/80">Total Points</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold">Level {metrics.level}</span>
              <span className="text-sm text-white/80">{metrics.progressToNext}/100 to next level</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div
                className="bg-white h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${metrics.progressToNext}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Level Title */}
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span className="font-medium">{getLevelTitle(metrics.level)}</span>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Star },
          { id: 'guna', label: 'Guna Profile', icon: Target },
          { id: 'consciousness', label: 'Consciousness', icon: Brain },
          { id: 'progress', label: 'Progress', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-saffron-600 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Avatar Card */}
            {profile.selectedAvatar && (
              <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">{profile.selectedAvatar.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {profile.selectedAvatar.name}
                    </h3>
                    <p className="text-saffron-600 dark:text-saffron-400 font-medium">
                      {profile.selectedAvatar.sanskritName}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {profile.selectedAvatar.essence}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Badges */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-saffron-600" />
                Spiritual Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {metrics.badges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge className="bg-saffron-100 text-saffron-800 dark:bg-saffron-900/30 dark:text-saffron-300">
                      {badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Strengths */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-green-600" />
                Your Strengths
              </h3>
              <div className="space-y-2">
                {metrics.strengths.map((strength, index) => (
                  <motion.div
                    key={strength}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-700 dark:text-slate-300">{strength}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'guna' && (
          <motion.div
            key="guna"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Guna Balance Analysis
              </h3>
              
              <div className="space-y-4">
                {[
                  { key: 'sattva', label: 'Sattva (Purity)', color: 'from-green-500 to-emerald-600', icon: Heart },
                  { key: 'rajas', label: 'Rajas (Activity)', color: 'from-orange-500 to-red-600', icon: Zap },
                  { key: 'tamas', label: 'Tamas (Stability)', color: 'from-slate-500 to-gray-600', icon: Shield }
                ].map((guna, index) => {
                  const value = metrics.gunaBalance[guna.key as keyof typeof metrics.gunaBalance]
                  const percentage = (value / 15) * 100
                  
                  return (
                    <motion.div
                      key={guna.key}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <guna.icon className="w-4 h-4" />
                          <span className="font-medium text-slate-700 dark:text-slate-300">{guna.label}</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{value}/15</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                        <motion.div
                          className={`bg-gradient-to-r ${guna.color} h-3 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'consciousness' && (
          <motion.div
            key="consciousness"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                Consciousness Analysis
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'awareness', label: 'Awareness', color: 'from-purple-500 to-indigo-600', icon: Eye },
                  { key: 'detachment', label: 'Detachment', color: 'from-blue-500 to-cyan-600', icon: Shield },
                  { key: 'presence', label: 'Presence', color: 'from-green-500 to-teal-600', icon: Target }
                ].map((aspect, index) => {
                  const value = metrics.consciousnessLevel[aspect.key as keyof typeof metrics.consciousnessLevel]
                  const percentage = (value / 12) * 100
                  
                  return (
                    <motion.div
                      key={aspect.key}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-center"
                    >
                      <div className={`w-20 h-20 mx-auto mb-3 bg-gradient-to-br ${aspect.color} rounded-full flex items-center justify-center`}>
                        <aspect.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{aspect.label}</h4>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{value}/12</div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <motion.div
                          className={`bg-gradient-to-r ${aspect.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Journey Progress
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Quizzes Completed</span>
                    <span className="font-bold text-slate-900 dark:text-white">{profile.quizResults.length}/2</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(profile.quizResults.length / 2) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Avatar Selection</span>
                    <span className="font-bold text-slate-900 dark:text-white">{profile.selectedAvatar ? 'Complete' : 'Pending'}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-saffron-500 to-orange-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: profile.selectedAvatar ? '100%' : '0%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-saffron-600" />
                Next Steps
              </h3>
              <div className="space-y-2">
                {metrics.recommendations.map((rec, index) => (
                  <motion.div
                    key={rec}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                    <span className="text-slate-700 dark:text-slate-300">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
