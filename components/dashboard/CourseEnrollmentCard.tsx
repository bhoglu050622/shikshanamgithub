'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, Clock, ExternalLink, CheckCircle } from 'lucide-react'
import { CourseEnrollment } from '@/lib/types/graphy'
import Link from 'next/link'

interface CourseEnrollmentCardProps {
  enrollment: CourseEnrollment
  timeSpent?: number // in hours
  isLoading?: boolean
}

export default function CourseEnrollmentCard({ 
  enrollment, 
  timeSpent = 0, 
  isLoading = false 
}: CourseEnrollmentCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20'
      case 'active':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
      case 'paused':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status?: string) => {
    if (status === 'completed') return CheckCircle
    return BookOpen
  }

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="h-6 w-8 bg-muted rounded"></div>
          <div className="h-4 w-16 bg-muted rounded"></div>
        </div>
        <div className="h-6 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 bg-muted rounded"></div>
          <div className="h-8 w-24 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  const StatusIcon = getStatusIcon(enrollment.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${getStatusColor(enrollment.status)}`}>
          <StatusIcon className="w-5 h-5" />
        </div>
        {enrollment.status && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
            {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
        {enrollment.courseName}
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
        </div>
        
        {timeSpent > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{timeSpent.toFixed(1)} hours spent</span>
          </div>
        )}

        {enrollment.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{enrollment.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${enrollment.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Course ID: {enrollment.courseId}
        </div>
        <Link
          href={`/courses/${enrollment.courseId}`}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
        >
          View Course
          <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </motion.div>
  )
}
