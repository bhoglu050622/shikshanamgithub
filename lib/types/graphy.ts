/**
 * Types for Graphy integration and dashboard statistics
 */

export interface DashboardStats {
  totalCourses: number
  completedCourses: number
  totalLearningHours: number
  currentStreak: number
}

export interface GraphyUser {
  email: string
  name?: string
  mobile?: string
  learnerId?: string
}

export interface CourseProgress {
  courseId: string
  courseName: string
  progress: number
  completedLessons: number
  totalLessons: number
  lastAccessedAt?: string
}

