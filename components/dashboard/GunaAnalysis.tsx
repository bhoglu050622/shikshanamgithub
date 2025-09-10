/**
 * Guna Analysis Component
 * Provides concise analysis of user's Guna Profiler results
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Zap, 
  Shield, 
  TrendingUp, 
  Target, 
  Star,
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react'

interface GunaAnalysisProps {
  userEmail?: string
}

interface GunaProfile {
  sattva: number
  rajas: number
  tamas: number
  dominantGuna: 'sattva' | 'rajas' | 'tamas'
  balance: number
  interpretation: string
  description: string
  recommendations: string[]
  strengths: string[]
  challenges: string[]
}

export function GunaAnalysis({ userEmail }: GunaAnalysisProps) {
  const [gunaProfile, setGunaProfile] = useState<GunaProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadGunaProfile()
  }, [userEmail, loadGunaProfile])

  const loadGunaProfile = () => {
    try {
      const storedProfile = localStorage.getItem('dharma-path-profile')
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile)
        const gunaResult = parsedProfile.quizResults?.find((r: any) => r.quizId === 'guna-profile')
        
        if (gunaResult) {
          const profile = calculateGunaProfile(gunaResult.scores)
          setGunaProfile(profile)
        }
      }
    } catch (error) {
      console.error('Error loading guna profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateGunaProfile = (scores: Record<string, number>): GunaProfile => {
    const sattva = scores.sattva || 0
    const rajas = scores.rajas || 0
    const tamas = scores.tamas || 0
    
    const dominantGuna = sattva > rajas && sattva > tamas ? 'sattva' :
                        rajas > sattva && rajas > tamas ? 'rajas' : 'tamas'
    
    // Calculate balance (how close the scores are to each other)
    const maxScore = Math.max(sattva, rajas, tamas)
    const minScore = Math.min(sattva, rajas, tamas)
    const balance = maxScore > 0 ? ((maxScore - minScore) / maxScore) * 100 : 100

    const interpretation = getGunaInterpretation(dominantGuna, sattva, rajas, tamas)
    const description = getGunaDescription(dominantGuna, balance)
    const recommendations = getGunaRecommendations(dominantGuna, sattva, rajas, tamas)
    const strengths = getGunaStrengths(dominantGuna, sattva, rajas, tamas)
    const challenges = getGunaChallenges(dominantGuna, sattva, rajas, tamas)

    return {
      sattva,
      rajas,
      tamas,
      dominantGuna,
      balance,
      interpretation,
      description,
      recommendations,
      strengths,
      challenges
    }
  }

  const getGunaInterpretation = (dominant: string, s: number, r: number, t: number): string => {
    if (dominant === 'sattva') {
      if (s > 12) return 'Highly Sattvic - Pure and Wise'
      if (s > 8) return 'Sattvic Nature - Balanced and Spiritual'
      return 'Sattvic Tendency - Seeking Purity'
    } else if (dominant === 'rajas') {
      if (r > 12) return 'Highly Rajasic - Dynamic and Active'
      if (r > 8) return 'Rajasic Nature - Energetic and Goal-Oriented'
      return 'Rajasic Tendency - Action-Oriented'
    } else {
      if (t > 12) return 'Highly Tamasic - Stable and Grounded'
      if (t > 8) return 'Tamasic Nature - Calm and Steady'
      return 'Tamasic Tendency - Seeking Stability'
    }
  }

  const getGunaDescription = (dominant: string, balance: number): string => {
    const descriptions: Record<string, string> = {
      sattva: 'You embody purity, wisdom, and spiritual awareness. Your nature is calm, balanced, and drawn to truth and knowledge. You seek harmony and understanding in all aspects of life.',
      rajas: 'You are dynamic, ambitious, and action-oriented. Your nature is energetic, passionate, and driven by goals and achievements. You bring enthusiasm and determination to everything you do.',
      tamas: 'You are grounded, stable, and comfort-seeking. Your nature is calm, patient, and values security and tradition. You provide stability and reliability to those around you.'
    }
    
    const balanceNote = balance < 30 ? ' You have a well-balanced nature across all three gunas.' : 
                       balance < 60 ? ' You show a moderate preference for your dominant guna.' :
                       ' You have a strong preference for your dominant guna.'
    
    return descriptions[dominant] + balanceNote
  }

  const getGunaRecommendations = (dominant: string, s: number, r: number, t: number): string[] => {
    const recommendations: Record<string, string[]> = {
      sattva: [
        'Practice meditation and mindfulness daily',
        'Engage in spiritual study and contemplation',
        'Spend time in nature for inner peace',
        'Share your wisdom through teaching or mentoring'
      ],
      rajas: [
        'Channel your energy into purposeful projects',
        'Practice yoga or physical exercise regularly',
        'Set clear goals and work systematically',
        'Learn to balance action with reflection'
      ],
      tamas: [
        'Establish consistent daily routines',
        'Focus on one task at a time',
        'Create a peaceful, organized environment',
        'Practice gentle movement and grounding exercises'
      ]
    }
    
    return recommendations[dominant] || []
  }

  const getGunaStrengths = (dominant: string, s: number, r: number, t: number): string[] => {
    const strengths: Record<string, string[]> = {
      sattva: ['Wisdom', 'Compassion', 'Inner Peace', 'Spiritual Insight', 'Harmony'],
      rajas: ['Energy', 'Determination', 'Leadership', 'Innovation', 'Achievement'],
      tamas: ['Stability', 'Patience', 'Reliability', 'Practicality', 'Endurance']
    }
    
    return strengths[dominant] || []
  }

  const getGunaChallenges = (dominant: string, s: number, r: number, t: number): string[] => {
    const challenges: Record<string, string[]> = {
      sattva: ['Over-idealism', 'Passivity', 'Avoiding conflict', 'Perfectionism'],
      rajas: ['Restlessness', 'Impatience', 'Burnout', 'Competitiveness'],
      tamas: ['Resistance to change', 'Procrastination', 'Lethargy', 'Rigidity']
    }
    
    return challenges[dominant] || []
  }

  const getGunaColor = (guna: string): string => {
    switch (guna) {
      case 'sattva': return 'from-green-500 to-emerald-600'
      case 'rajas': return 'from-orange-500 to-red-600'
      case 'tamas': return 'from-slate-500 to-gray-600'
      default: return 'from-slate-500 to-gray-600'
    }
  }

  const getGunaIcon = (guna: string) => {
    switch (guna) {
      case 'sattva': return Heart
      case 'rajas': return Zap
      case 'tamas': return Shield
      default: return Target
    }
  }

  if (isLoading) {
    return (
      <Card className="p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="animate-spin w-8 h-8 border-4 border-saffron-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-slate-600 dark:text-slate-400">Analyzing your Guna profile...</p>
      </Card>
    )
  }

  if (!gunaProfile) {
    return (
      <Card className="p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <Target className="h-12 w-12 text-saffron-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Complete Guna Profiler
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Take the Guna Profiler to discover your spiritual nature and get personalized insights.
        </p>
        <Button 
          onClick={() => window.location.href = '/guna-profiler'}
          className="bg-saffron-600 hover:bg-saffron-700 text-white"
        >
          Take Guna Profiler
        </Button>
      </Card>
    )
  }

  const DominantIcon = getGunaIcon(gunaProfile.dominantGuna)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl p-6 text-white"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${getGunaColor(gunaProfile.dominantGuna)} rounded-full flex items-center justify-center`}>
              <DominantIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Guna Analysis</h2>
              <p className="text-white/90">{gunaProfile.interpretation}</p>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed">{gunaProfile.description}</p>
        </div>
      </motion.div>

      {/* Guna Scores */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Your Guna Balance
        </h3>
        
        <div className="space-y-4">
          {[
            { key: 'sattva', label: 'Sattva (Purity)', icon: Heart, color: 'from-green-500 to-emerald-600' },
            { key: 'rajas', label: 'Rajas (Activity)', icon: Zap, color: 'from-orange-500 to-red-600' },
            { key: 'tamas', label: 'Tamas (Stability)', icon: Shield, color: 'from-slate-500 to-gray-600' }
          ].map((guna, index) => {
            const value = gunaProfile[guna.key as keyof GunaProfile] as number
            const percentage = (value / 15) * 100
            const isDominant = guna.key === gunaProfile.dominantGuna
            
            return (
              <motion.div
                key={guna.key}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`space-y-2 p-4 rounded-xl ${isDominant ? 'bg-slate-50 dark:bg-slate-700' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <guna.icon className="w-5 h-5" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{guna.label}</span>
                    {isDominant && (
                      <Badge className="bg-saffron-100 text-saffron-800 dark:bg-saffron-900/30 dark:text-saffron-300">
                        Dominant
                      </Badge>
                    )}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{value}/15</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
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

      {/* Strengths and Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-green-600" />
            Your Strengths
          </h3>
          <div className="space-y-2">
            {gunaProfile.strengths.map((strength, index) => (
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

        <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-600" />
            Growth Areas
          </h3>
          <div className="space-y-2">
            {gunaProfile.challenges.map((challenge, index) => (
              <motion.div
                key={challenge}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-slate-700 dark:text-slate-300">{challenge}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-saffron-600" />
          Personalized Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gunaProfile.recommendations.map((rec, index) => (
            <motion.div
              key={rec}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
            >
              <BookOpen className="w-5 h-5 text-saffron-600 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{rec}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button 
          onClick={() => window.location.href = '/guna-profiler'}
          className="bg-saffron-600 hover:bg-saffron-700 text-white"
        >
          Retake Guna Profiler
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
