'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Play, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  progress: number
  totalLessons: number
  completedLessons: number
  lastAccessed?: string
  estimatedTime?: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  thumbnail?: string
  instructor?: string
}

interface CourseProgressCardProps {
  course: Course
  onResume?: (courseId: string) => void
  onViewDetails?: (courseId: string) => void
}

export default function CourseProgressCard({ 
  course, 
  onResume, 
  onViewDetails 
}: CourseProgressCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sanskrit': return '📚'
      case 'philosophy': return '🧘'
      case 'scripture': return '📜'
      case 'leadership': return '👑'
      case 'yoga': return '🧘‍♀️'
      case 'meditation': return '🕉️'
      default: return '📖'
    }
  }

  const formatLastAccessed = (dateString?: string) => {
    if (!dateString) return 'Never accessed'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-500'
    if (progress >= 50) return 'text-yellow-500'
    return 'text-blue-500'
  }

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-blue-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Course Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{getCategoryIcon(course.category)}</span>
              <div>
                <h3 className="text-lg font-bold text-foreground line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {course.instructor && `by ${course.instructor}`}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {course.description}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
            {course.progress === 100 && (
              <div className="flex items-center text-green-500">
                <Award className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className={`text-sm font-bold ${getProgressColor(course.progress)}`}>
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${getProgressBgColor(course.progress)}`}
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
            <span>{course.completedLessons} of {course.totalLessons} lessons completed</span>
            {course.estimatedTime && (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {course.estimatedTime}
              </span>
            )}
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium text-foreground">
                {course.totalLessons} Lessons
              </div>
              <div className="text-xs text-muted-foreground">
                {course.completedLessons} completed
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium text-foreground">
                Last accessed
              </div>
              <div className="text-xs text-muted-foreground">
                {formatLastAccessed(course.lastAccessed)}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {course.progress < 100 ? (
            <button
              onClick={() => onResume?.(course.id)}
              className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              <Play className="w-4 h-4 mr-2" />
              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </button>
          ) : (
            <button
              onClick={() => onViewDetails?.(course.id)}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              View Certificate
            </button>
          )}
          
          <button
            onClick={() => onViewDetails?.(course.id)}
            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
            title="View course details"
          >
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      {course.progress > 0 && (
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />
      )}
    </motion.div>
  )
}

// Course Progress Grid Component
interface CourseProgressGridProps {
  courses: Course[]
  isLoading?: boolean
  onResume?: (courseId: string) => void
  onViewDetails?: (courseId: string) => void
}

export function CourseProgressGrid({ 
  courses, 
  isLoading = false, 
  onResume, 
  onViewDetails 
}: CourseProgressGridProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-muted rounded mb-6"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-80 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-8">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Enrolled Courses</h3>
          <p className="text-muted-foreground mb-6">
            You haven't enrolled in any courses yet. Start your learning journey today!
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
          <p className="text-muted-foreground">
            {courses.length} enrolled course{courses.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-sm text-muted-foreground">
            {courses.filter(c => c.progress > 0).length} in progress
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CourseProgressCard
              course={course}
              onResume={onResume}
              onViewDetails={onViewDetails}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
