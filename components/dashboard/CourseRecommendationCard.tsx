'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Clock, 
  Star, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Brain,
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  CheckCircle
} from 'lucide-react'
import DecorativeBorder from '@/components/ornaments/DecorativeBorder'
import SacredGeometry from '@/components/ornaments/SacredGeometry'

interface CourseRecommendationCardProps {
  course: {
    id: string
    title: string
    description: string
    price: string
    duration: string
    level: string
    category: string
    link: string
    features: string[]
    matchScore?: number
    reasoning?: string
    priority?: 'high' | 'medium' | 'low'
  }
  index: number
}

export default function CourseRecommendationCard({ course, index }: CourseRecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const handleCourseClick = () => {
    router.push(course.link)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      case 'low': return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800'
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
      case 'Intermediate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      case 'Advanced': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800'
      case 'Professional': return 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800'
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'language': return '📚'
      case 'philosophy': return '🧘'
      case 'practice': return '⚡'
      default: return '📖'
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500'
    if (score >= 60) return 'text-amber-500'
    return 'text-rose-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <SacredGeometry pattern="lotus" size="small" opacity={0.03} color="gold" />
      <DecorativeBorder 
        variant="lotus" 
        color="gold" 
        thickness="thin" 
        corners={true}
        className="group bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-purple-900/20 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden hover:scale-[1.02] hover:border-primary/20"
      >
      {/* Header with Category Icon and Match Score */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-yellow-400/50">
              <span className="text-2xl">{getCategoryIcon(course.category)}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                {course.priority && (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(course.priority)}`}>
                    {course.priority === 'high' ? 'Highly Recommended' : course.priority === 'medium' ? 'Recommended' : 'Consider'}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {course.matchScore !== undefined && (
            <div className="relative w-16 h-16">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200 dark:text-gray-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="100"
                  strokeDashoffset="0"
                />
                <path
                  className={`${getMatchScoreColor(course.matchScore)} transition-all duration-1000`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray={`${course.matchScore}, 100`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                <text
                  x="18"
                  y="20.35"
                  className={`text-xs font-bold ${getMatchScoreColor(course.matchScore)}`}
                  textAnchor="middle"
                >
                  {course.matchScore}%
                </text>
              </svg>
            </div>
          )}
        </div>

        <h4 className="text-xl font-bold text-foreground mb-3 line-clamp-2 leading-tight">{course.title}</h4>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
      </div>

      {/* Course Features */}
      {course.features && course.features.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {course.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full border border-border/50"
              >
                {feature}
              </span>
            ))}
            {course.features.length > 3 && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                +{course.features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Course Details */}
      <div className="px-6 pb-4 flex-grow">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {course.category}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              {course.price}
            </span>
            <span className="text-xs text-muted-foreground">One-time payment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-foreground">4.8</span>
            <span className="text-xs text-muted-foreground">(120+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Why This Course Section */}
      {course.reasoning && (
        <div className="px-6 pb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center">
              <Brain className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-semibold text-foreground">Why This Course?</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 p-4 bg-muted/50 rounded-lg border border-border/50"
            >
              <div className="space-y-4">
                {course.reasoning?.split('\n\n').map((section, index) => {
                  const [title, content] = section.split(': ')
                  return (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-foreground text-sm">
                        {title?.replace(/\*\*/g, '')}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {content}
                      </p>
                    </div>
                  )
                })}
              </div>
              
              {/* Additional Insights */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Target className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-xs text-muted-foreground">Learning Goals</span>
                </div>
                <div className="flex items-center">
                  <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-xs text-muted-foreground">Study Tips</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-xs text-muted-foreground">Growth Path</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* CTA Button */}
      <div className="p-6 pt-0">
        <button
          onClick={handleCourseClick}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <BookOpen className="w-4 h-4" />
          View Course Details
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      </DecorativeBorder>
    </motion.div>
  )
}