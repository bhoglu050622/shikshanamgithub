'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, RotateCcw, BookOpen, Star, TrendingUp, Users, Award, ArrowRight } from 'lucide-react'
import { DharmaPathData, CourseRecommendation } from '../types/dharma-path'

interface PersonalDharmaDashboardProps {
  profile: DharmaPathData
  onResetJourney: () => void
  onRetakeQuiz: () => void
}

export default function PersonalDharmaDashboard({ 
  profile, 
  onResetJourney, 
  onRetakeQuiz 
}: PersonalDharmaDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'courses'>('overview')

  // Mock course recommendations based on quiz results
  const getCourseRecommendations = (): CourseRecommendation[] => {
    const recommendations: CourseRecommendation[] = []
    
    profile.quizResults.forEach(result => {
      if (result.quizId === 'guna-profile') {
        const dominantTrait = Object.entries(result.scores).reduce((a, b) => 
          result.scores[a[0]] > result.scores[b[0]] ? a : b
        )[0]
        
        if (dominantTrait === 'sattva') {
          recommendations.push({
            id: 'meditation-mastery',
            title: 'Meditation & Mindfulness Mastery',
            description: 'Deepen your sattvic nature through advanced meditation practices',
            url: '/courses/meditation-mastery',
            category: 'Spiritual Practice',
            difficulty: 'intermediate',
            duration: '8 weeks',
            rating: 4.9
          })
        } else if (dominantTrait === 'rajas') {
          recommendations.push({
            id: 'karma-yoga',
            title: 'Karma Yoga: The Path of Action',
            description: 'Channel your dynamic energy into selfless service and purposeful action',
            url: '/courses/karma-yoga',
            category: 'Philosophy',
            difficulty: 'beginner',
            duration: '6 weeks',
            rating: 4.7
          })
        } else {
          recommendations.push({
            id: 'grounding-practices',
            title: 'Grounding & Stability Practices',
            description: 'Build upon your natural stability with grounding and centering techniques',
            url: '/courses/grounding-practices',
            category: 'Wellness',
            difficulty: 'beginner',
            duration: '4 weeks',
            rating: 4.8
          })
        }
      }
      
      if (result.quizId === 'shiva-consciousness') {
        recommendations.push({
          id: 'consciousness-exploration',
          title: 'Consciousness & Awareness',
          description: 'Explore the depths of consciousness and expand your awareness',
          url: '/courses/consciousness-exploration',
          category: 'Philosophy',
          difficulty: 'advanced',
          duration: '12 weeks',
          rating: 4.9
        })
      }
    })
    
    return recommendations
  }

  const courseRecommendations = getCourseRecommendations()

  const exportProfile = () => {
    const dataStr = JSON.stringify(profile, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `dharma-path-profile-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Avatar Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20"
      >
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-saffron-400/20 to-saffron-600/30 rounded-full flex items-center justify-center">
            <span className="text-4xl">{profile.selectedAvatar?.symbol}</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {profile.selectedAvatar?.name}
            </h3>
            <p className="text-saffron-400 text-lg mb-1">
              {profile.selectedAvatar?.sanskritName}
            </p>
            <p className="text-white/80">
              {profile.selectedAvatar?.essence}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quiz Results Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {profile.quizResults.map((result, index) => (
          <div
            key={result.quizId}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <h4 className="text-xl font-bold text-white mb-3">
              {result.quizId === 'guna-profile' ? 'Guna Profile' : 'Shiva Consciousness'}
            </h4>
            <p className="text-saffron-400 font-medium mb-2">
              {result.interpretation}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              {result.description}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <BookOpen className="w-8 h-8 text-saffron-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{profile.quizResults.length}</p>
          <p className="text-white/70 text-sm">Quizzes Completed</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <Star className="w-8 h-8 text-saffron-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{courseRecommendations.length}</p>
          <p className="text-white/70 text-sm">Recommended Courses</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <TrendingUp className="w-8 h-8 text-saffron-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">85%</p>
          <p className="text-white/70 text-sm">Spiritual Alignment</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
          <Award className="w-8 h-8 text-saffron-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">Advanced</p>
          <p className="text-white/70 text-sm">Journey Level</p>
        </div>
      </motion.div>
    </div>
  )

  const renderResults = () => (
    <div className="space-y-8">
      {profile.quizResults.map((result, index) => (
        <motion.div
          key={result.quizId}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            {result.quizId === 'guna-profile' ? 'Guna Profile Results' : 'Shiva Consciousness Results'}
          </h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-saffron-400 mb-2">
              {result.interpretation}
            </h4>
            <p className="text-white/80 leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Score Visualization */}
          <div className="space-y-4">
            {Object.entries(result.scores).map(([key, score]) => {
              const maxScore = Math.max(...Object.values(result.scores))
              const percentage = (score / maxScore) * 100
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-saffron-400 font-bold">{score}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-saffron-400 to-saffron-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Recommended Courses for Your Journey
        </h3>
        <p className="text-white/80 max-w-2xl mx-auto">
          Based on your spiritual profile, these courses will help you deepen your practice 
          and continue your Dharma Path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseRecommendations.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-saffron-400/50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white mb-2">
                  {course.title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {course.description}
                </p>
              </div>
              <div className="flex items-center space-x-1 ml-4">
                <Star className="w-4 h-4 text-saffron-400 fill-current" />
                <span className="text-saffron-400 font-medium">{course.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-white/70">
                <span className="px-3 py-1 bg-saffron-400/20 text-saffron-300 rounded-full">
                  {course.category}
                </span>
                <span>{course.duration}</span>
                <span className="capitalize">{course.difficulty}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-saffron-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your <span className="text-saffron-400">Dharma Dashboard</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Welcome back, {profile.name}. Here's your personalized spiritual journey summary 
            and recommendations for continued growth.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'results', label: 'Results', icon: TrendingUp },
              { id: 'courses', label: 'Courses', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-saffron-400 text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'results' && renderResults()}
          {activeTab === 'courses' && renderCourses()}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12"
        >
          <motion.button
            onClick={exportProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Export My Profile</span>
          </motion.button>

          <motion.button
            onClick={onRetakeQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Retake Quizzes</span>
          </motion.button>

          <motion.button
            onClick={onResetJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Journey</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
