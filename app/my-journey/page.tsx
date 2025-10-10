'use client'

import { useAuth } from '@/lib/auth/AuthContext'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  useEffect(() => {
    if (user?.email) {
      fetchDashboardData()
    } else {
      setIsLoading(false)
    }
  }, [user?.email])

  const fetchDashboardData = async () => {
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
  }

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-orange-900/10 dark:via-pink-900/10 dark:to-purple-900/10 relative overflow-hidden">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-orange-500">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="5" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute top-20 right-20 w-24 h-24">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-pink-500">
            <path d="M50 10L60 40L90 40L70 60L80 90L50 70L20 90L30 60L10 40L40 40Z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 w-28 h-28">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-purple-500">
            <path d="M50 2L58 18L74 18L62 30L70 46L50 36L30 46L38 30L26 18L42 18Z"/>
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 w-20 h-20">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-yellow-500">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="50" cy="50" r="5" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 relative z-10">
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
