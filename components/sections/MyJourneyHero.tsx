'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BookOpen, Trophy, Clock, TrendingUp, Sparkles, Star } from 'lucide-react'
import { DashboardStats as StatsType } from '@/lib/types/graphy'

interface FloatingParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface MyJourneyHeroProps {
  user: {
    name?: string
    email: string
  }
  stats: StatsType
  isLoading?: boolean
  onSimulateCourseCompletion?: () => void
  onSimulateLearningStreak?: () => void
}

export default function MyJourneyHero({ 
  user, 
  stats, 
  isLoading = false, 
  onSimulateCourseCompletion,
  onSimulateLearningStreak 
}: MyJourneyHeroProps) {
  const [particles, setParticles] = useState<FloatingParticle[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate floating particles with more variety
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2, // Smaller particles: 2-8px
      duration: Math.random() * 6 + 8, // Faster: 8-14s
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  // Prevent animation on SSR
  const animationProps = mounted
    ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
    : { initial: false, animate: { opacity: 1, y: 0 } }

  const displayName = user.name || user.email.split('@')[0]

  const quickStats = [
    {
      icon: BookOpen,
      value: stats.totalCourses,
      label: 'Courses',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Trophy,
      value: stats.completedCourses,
      label: 'Completed',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Clock,
      value: Math.round(stats.totalLearningHours),
      label: 'Hours',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: TrendingUp,
      value: stats.currentStreak,
      label: 'Day Streak',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ]

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-950 dark:to-amber-950">
        {/* Animated gradient overlays */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300/30 via-transparent to-transparent dark:from-orange-500/20"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-300/30 via-transparent to-transparent dark:from-amber-500/20"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        {/* Animated mesh gradient effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(at 20% 30%, rgba(251, 146, 60, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 70%, rgba(245, 158, 11, 0.3) 0px, transparent 50%),
              radial-gradient(at 50% 50%, rgba(251, 191, 36, 0.2) 0px, transparent 50%)
            `
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Particles */}
      {mounted && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-orange-400/60 to-amber-400/60 dark:from-orange-500/40 dark:to-amber-500/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Sacred Geometry Mandala */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 dark:opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-amber-500" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-yellow-500" />
          <polygon points="50,10 70,30 50,50 30,30" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-orange-400" />
          <polygon points="90,50 70,70 50,50 70,30" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-amber-400" />
          <polygon points="50,90 30,70 50,50 70,70" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-yellow-400" />
          <polygon points="10,50 30,30 50,50 30,70" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-orange-300" />
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...animationProps}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full text-sm font-medium text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to Your Learning Journey
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-gray-900 via-orange-800 to-amber-900 dark:from-white dark:via-orange-300 dark:to-amber-300 bg-clip-text text-transparent">
                Hello, {displayName}!
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Track your progress, discover insights, and continue your journey of ancient wisdom
            </motion.p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  {stat.value > 0 && (
                    <Star className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {isLoading ? '...' : stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Demo Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={onSimulateCourseCompletion}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
              >
                🎓 Complete Course
              </button>
              <button
                onClick={onSimulateLearningStreak}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
              >
                📚 Add Learning Session
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Track your learning progress in real-time! Scroll down to explore your personalized dashboard.
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16 md:h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-orange-50 dark:text-gray-900"
          />
        </svg>
      </div>
    </section>
  )
}
