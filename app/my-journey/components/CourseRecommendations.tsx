'use client'

import { motion } from 'framer-motion'
import { BookOpen, Star, ArrowRight, Brain, Heart, Zap } from 'lucide-react'
import Link from 'next/link'

interface CourseRecommendationsProps {
  gunaResult: any
  shivaResult: any
  completedQuizzes: string[]
}

export default function CourseRecommendations({ gunaResult, shivaResult, completedQuizzes }: CourseRecommendationsProps) {
  // Generate recommendations based on quiz results
  const getRecommendations = () => {
    const recommendations = []

    // Guna-based recommendations
    if (gunaResult?.dominantGuna) {
      const dominantGuna = gunaResult.dominantGuna.toLowerCase()
      
      if (dominantGuna === 'sattva') {
        recommendations.push({
          title: 'Advaita Vedanta Darshan',
          description: 'Perfect for your balanced, wisdom-seeking nature. Deepen your understanding of non-dual reality.',
          icon: Brain,
          color: 'from-blue-500 to-indigo-600',
          url: '/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka',
          reason: 'Sattva Dominant',
          priority: 'high'
        })
        recommendations.push({
          title: 'Yoga Darshan',
          description: 'Explore the philosophical foundations of yoga practice, ideal for your contemplative nature.',
          icon: Heart,
          color: 'from-green-500 to-teal-600',
          url: '/courses/yoga-darshan',
          reason: 'Sattva Dominant',
          priority: 'medium'
        })
      } else if (dominantGuna === 'rajas') {
        recommendations.push({
          title: 'Samkhya Darshan',
          description: 'Engage with dynamic philosophical concepts that match your active, analytical mind.',
          icon: Zap,
          color: 'from-orange-500 to-red-600',
          url: '/courses/samkhya-darshan',
          reason: 'Rajas Dominant',
          priority: 'high'
        })
        recommendations.push({
          title: 'Nyaya Darshan',
          description: 'Develop your logical reasoning and argumentation skills through systematic philosophy.',
          icon: Brain,
          color: 'from-purple-500 to-pink-600',
          url: '/courses/nyaya-darshan',
          reason: 'Rajas Dominant',
          priority: 'medium'
        })
      } else if (dominantGuna === 'tamas') {
        recommendations.push({
          title: 'Yoga Darshan',
          description: 'Gentle introduction to philosophical concepts, perfect for building momentum.',
          icon: Heart,
          color: 'from-green-500 to-teal-600',
          url: '/courses/yoga-darshan',
          reason: 'Tamas Dominant',
          priority: 'high'
        })
        recommendations.push({
          title: 'Sanskrit Course',
          description: 'Start with foundational language learning to build confidence and understanding.',
          icon: BookOpen,
          color: 'from-amber-500 to-orange-600',
          url: '/courses/sanskrit-course',
          reason: 'Tamas Dominant',
          priority: 'medium'
        })
      }
    }

    // Shiva alignment-based recommendations
    if (shivaResult?.dominantArchetype) {
      const archetype = shivaResult.dominantArchetype.toLowerCase()
      
      if (archetype.includes('teacher') || archetype.includes('guru')) {
        recommendations.push({
          title: 'Vedanta Philosophy',
          description: 'Deep dive into Advaita philosophy to enhance your teaching capabilities.',
          icon: Brain,
          color: 'from-indigo-500 to-purple-600',
          url: '/courses/advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka',
          reason: 'Teacher Archetype',
          priority: 'high'
        })
      } else if (archetype.includes('student') || archetype.includes('seeker')) {
        recommendations.push({
          title: 'Prasna Upanishad',
          description: 'Explore fundamental questions about existence, perfect for curious minds.',
          icon: Star,
          color: 'from-blue-500 to-cyan-600',
          url: '/courses/prashna-upanishad',
          reason: 'Seeker Archetype',
          priority: 'high'
        })
      } else if (archetype.includes('practitioner') || archetype.includes('yogi')) {
        recommendations.push({
          title: 'Yoga Advanced',
          description: 'Advance your practice with deeper philosophical understanding.',
          icon: Heart,
          color: 'from-red-500 to-pink-600',
          url: '/courses/yoga-advanced',
          reason: 'Practitioner Archetype',
          priority: 'high'
        })
      }
    }

    // Default recommendations if no quiz data
    if (recommendations.length === 0) {
      recommendations.push(
        {
          title: 'Sanskrit Course',
          description: 'Start your journey with the foundational language of ancient wisdom.',
          icon: BookOpen,
          color: 'from-amber-500 to-orange-600',
          url: '/courses/sanskrit-course',
          reason: 'Foundation Course',
          priority: 'high'
        },
        {
          title: 'Yoga Darshan',
          description: 'Explore the philosophical foundations of yoga practice.',
          icon: Heart,
          color: 'from-green-500 to-teal-600',
          url: '/courses/yoga-darshan',
          reason: 'Popular Choice',
          priority: 'medium'
        }
      )
    }

    // Remove duplicates and limit to top recommendations
    const uniqueRecommendations = recommendations.filter((rec, index, self) => 
      index === self.findIndex(r => r.url === rec.url)
    )

    return uniqueRecommendations.slice(0, 4)
  }

  const recommendations = getRecommendations()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500'
      case 'medium':
        return 'border-l-4 border-yellow-500'
      default:
        return 'border-l-4 border-gray-300'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Personalized Course Recommendations
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {completedQuizzes.length > 0 
            ? "Based on your quiz results, we've curated these courses to match your learning style and interests."
            : "Complete our personality quizzes to get personalized recommendations tailored to your spiritual journey."
          }
        </p>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((course, index) => {
          const Icon = course.icon

          return (
            <motion.div
              key={course.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${getPriorityColor(course.priority)}`}
            >
              {/* Course Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.priority === 'high' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {course.priority === 'high' ? 'Highly Recommended' : 'Recommended'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {course.reason}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Course Action */}
              <Link href={course.url}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r ${course.color} text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300`}
                >
                  <span>Explore Course</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Additional CTA */}
      {completedQuizzes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center border border-blue-200 dark:border-blue-800"
        >
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Get Personalized Recommendations
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete our personality and spiritual alignment quizzes to unlock personalized course recommendations tailored to your unique learning style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/guna-profiler">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Take Guna Profiler
              </motion.button>
            </Link>
            <Link href="/how-aligned-are-you">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Take Shiva Alignment Quiz
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
