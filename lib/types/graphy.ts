/**
 * TypeScript interfaces for Graphy API integration
 */

export interface GraphyLearner {
  id: string
  email: string
  name: string
  mobile: string
  active: boolean
  createdDate: string
  lastLogin: string
  enrollments: CourseEnrollment[]
}

export interface CourseEnrollment {
  courseId: string
  courseName: string
  enrollmentDate: string
  progress?: number
  status?: 'active' | 'completed' | 'paused'
}

export interface LearnerUsage {
  timeSpentInSecs: number
  productId?: string
  date?: string
}

export interface LearnerDiscussion {
  id: string
  content: string
  date: string
  courseId?: string
  type: 'question' | 'comment' | 'reply'
}

export interface LearnerExpense {
  id: string
  amount: number
  currency: string
  date: string
  description: string
  courseId?: string
  status: 'completed' | 'pending' | 'failed' | 'initiated' | 'success' | 'refund'
  type?: 'free' | 'paid'
  channel?: 'web' | 'android' | 'ios'
}

export interface GraphyApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface DashboardStats {
  totalCourses: number
  completedCourses: number
  totalLearningHours: number
  currentStreak: number
  totalExpenses: number
}

export interface UsageAnalytics {
  dailyUsage: Array<{
    date: string
    hours: number
  }>
  courseUsage: Array<{
    courseId: string
    courseName: string
    hours: number
  }>
  weeklyPattern: Array<{
    day: string
    hours: number
  }>
}
