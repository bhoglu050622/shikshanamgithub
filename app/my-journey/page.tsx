'use client'

import { useAuth } from '@/lib/auth/AuthContext'
import { motion } from '@/components/motion/SimpleMotionWrapper'
import { useState, useEffect, useCallback } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { 
  PersonalityInsights,
  RecommendedCourses
} from '@/components/dashboard'
import MyJourneySimpleHero from '@/components/sections/MyJourneySimpleHero'
import { GraphyLearner, DashboardStats as StatsType, UsageAnalytics, LearnerExpense } from '@/lib/types/graphy'

interface DashboardData {
  learner: GraphyLearner | null
  stats: StatsType
  usage: UsageAnalytics
  expenses: LearnerExpense[]
}

export default function MyJourneyPage() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    if (!user?.email) return

    try {
      setIsLoading(true)
      setError(null)

      // Get data from localStorage
      const storedData = localStorage.getItem('myJourneyData')
      
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        setDashboardData(parsedData)
      } else {
        // Initialize with empty data structure
                const initialData = {
                  learner: {
                    id: 'learner_' + Date.now(),
                    email: user.email,
                    name: user.name || user.email.split('@')[0],
                    phone: '',
                    mobile: '',
                    active: true,
                    createdDate: new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    enrollments: []
                  },
          stats: {
            totalCourses: 0,
            completedCourses: 0,
            totalLearningHours: 0,
            currentStreak: 0,
            totalExpenses: 0
          },
          usage: {
            dailyUsage: [],
            courseUsage: [],
            weeklyPattern: []
          },
          expenses: []
        }
        
        setDashboardData(initialData)
        localStorage.setItem('myJourneyData', JSON.stringify(initialData))
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [user?.email, user?.name])

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData()
    } else {
      setIsLoading(false)
    }
  }, [user?.email, fetchDashboardData])

  const handleRefresh = () => {
    // Clear localStorage to reset data
    localStorage.removeItem('myJourneyData')
    fetchDashboardData()
  }

  // Function to update stats in localStorage
  const updateStats = (newStats: Partial<StatsType>) => {
    if (dashboardData) {
      const updatedData = {
        ...dashboardData,
        stats: { ...dashboardData.stats, ...newStats }
      }
      setDashboardData(updatedData)
      localStorage.setItem('myJourneyData', JSON.stringify(updatedData))
    }
  }

  // Function to add course completion
  const addCourseCompletion = () => {
    if (dashboardData) {
      const newStats = {
        ...dashboardData.stats,
        completedCourses: dashboardData.stats.completedCourses + 1,
        totalLearningHours: dashboardData.stats.totalLearningHours + 2
      }
      updateStats(newStats)
    }
  }

  // Function to add learning session
  const addLearningSession = () => {
    if (dashboardData) {
      const newStats = {
        ...dashboardData.stats,
        currentStreak: dashboardData.stats.currentStreak + 1,
        totalLearningHours: dashboardData.stats.totalLearningHours + 1
      }
      updateStats(newStats)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Please log in to view your journey
          </h1>
          <p className="text-muted-foreground">
            You need to be logged in to access your learning journey.
          </p>
        </div>
      </div>
    )
  }

  if (!user.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Email not found
          </h1>
          <p className="text-muted-foreground mb-6">
            Please log in again to access your learning dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MyJourneySimpleHero isLoading={isLoading} />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <PersonalityInsights isLoading={isLoading} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <RecommendedCourses isLoading={isLoading} />
        </motion.section>
      </div>
    </div>
  )
}
