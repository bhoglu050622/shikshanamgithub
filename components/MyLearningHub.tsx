'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

export default function MyLearningHub() {
  const { user } = useAuth()

  const learningStats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: '12', color: 'text-blue-600' },
    { icon: Clock, label: 'Hours Learned', value: '45', color: 'text-green-600' },
    { icon: Trophy, label: 'Certificates', value: '3', color: 'text-yellow-600' },
    { icon: TrendingUp, label: 'Progress', value: '85%', color: 'text-purple-600' }
  ]

  const recentCourses = [
    { name: 'Sanskrit Basics', progress: 75, color: 'bg-blue-500' },
    { name: 'Vedanta Philosophy', progress: 60, color: 'bg-green-500' },
    { name: 'Yoga & Meditation', progress: 90, color: 'bg-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-amber-900/20 py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-serif">
              My Learning Hub
            </h1>
            <p className="text-xl text-muted-foreground">
              Welcome back, {user?.name || user?.email}!
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {learningStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Courses */}
        <div className="bg-white dark:bg-card rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Continue Learning</h2>
          
          <div className="space-y-6">
            {recentCourses.map((course, index) => (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{course.name}</h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${course.color} transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {course.progress}% Complete
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
                >
                  Continue
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
