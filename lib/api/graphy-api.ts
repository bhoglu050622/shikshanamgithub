/**
 * Graphy REST API Integration
 * Client for interacting with Graphy API endpoints
 */

import { AUTH_CONFIG } from '@/lib/config/auth'
import {
  GraphyLearner,
  CourseEnrollment,
  LearnerUsage,
  LearnerDiscussion,
  LearnerExpense,
  GraphyApiResponse,
  DashboardStats,
  UsageAnalytics
} from '@/lib/types/graphy'

const GRAPHY_API_BASE = process.env.GRAPHY_API_BASE || 'https://api.ongraphy.com/public/v1'

// API Configuration
const API_CONFIG = {
  MID: AUTH_CONFIG.GRAPHY.MERCHANT_ID,
  API_KEY: AUTH_CONFIG.GRAPHY.API_TOKEN,
  TIMEOUT: 10000, // 10 seconds
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()

/**
 * Generic API request handler with error handling and caching
 */
async function makeApiRequest<T>(
  url: string,
  options: RequestInit = {},
  useCache: boolean = true
): Promise<GraphyApiResponse<T>> {
  try {
    // Check cache first
    if (useCache && cache.has(url)) {
      const cached = cache.get(url)!
      if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
        return { success: true, data: cached.data }
      }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

    console.log('Making API request to:', url)
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    console.log('API response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error response:', errorText)
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log('API response data:', data)

    // Cache successful responses
    if (useCache) {
      cache.set(url, { data, timestamp: Date.now() })
    }

    return { success: true, data }
  } catch (error) {
    console.error('Graphy API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

/**
 * Get learner by email (search)
 */
export async function getLearnerByEmail(email: string): Promise<GraphyApiResponse<GraphyLearner[]>> {
  try {
    const query = encodeURIComponent(JSON.stringify({ email }))
    const url = `${GRAPHY_API_BASE}/learners?mid=${API_CONFIG.MID}&key=${API_CONFIG.API_KEY}&query=${query}&courseInfo=true`
    console.log('Fetching learner by email:', email)
    console.log('API URL:', url)
    const result = await makeApiRequest<GraphyLearner[]>(url)
    console.log('Learner search result:', result)
    return result
  } catch (error) {
    console.error('Error in getLearnerByEmail:', error)
    return {
      success: false,
      error: `Failed to fetch learner: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Get learner details by ID
 */
export async function getLearnerDetails(learnerId: string): Promise<GraphyApiResponse<GraphyLearner>> {
  const url = `${GRAPHY_API_BASE}/learners/${learnerId}?mid=${API_CONFIG.MID}&key=${API_CONFIG.API_KEY}&courseInfo=true`
  return makeApiRequest<GraphyLearner>(url)
}

/**
 * Get transactions for expense data
 */
export async function getTransactions(
  startDate?: string,
  endDate?: string,
  status?: string,
  type?: string
): Promise<GraphyApiResponse<any[]>> {
  try {
    const params = new URLSearchParams({
      mid: API_CONFIG.MID,
      key: API_CONFIG.API_KEY,
      limit: '100'
    })

    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    if (status) params.append('status', status)
    if (type) params.append('type', type)

    const url = `${GRAPHY_API_BASE}/transactions?${params.toString()}`
    console.log('Fetching transactions:', url)
    const result = await makeApiRequest<any[]>(url)
    console.log('Transactions result:', result)
    return result
  } catch (error) {
    console.error('Error in getTransactions:', error)
    return {
      success: false,
      error: `Failed to fetch transactions: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Get course progress report
 */
export async function getCourseProgressReport(productIds: string[]): Promise<GraphyApiResponse<any[]>> {
  const url = `${GRAPHY_API_BASE}/reports/progress?mid=${API_CONFIG.MID}&key=${API_CONFIG.API_KEY}&productIds=${productIds.join(',')}`
  return makeApiRequest<any[]>(url)
}

/**
 * Update learner profile
 */
export async function updateLearnerProfile(
  email: string,
  updates: {
    name?: string
    mobile?: string
    customFields?: Record<string, any>
  }
): Promise<GraphyApiResponse<any>> {
  const url = `https://api.ongraphy.com/t/api/public/v3/learners/update`
  
  const formData = new URLSearchParams({
    mid: API_CONFIG.MID,
    key: API_CONFIG.API_KEY,
    email,
    ...(updates.name && { name: updates.name }),
    ...(updates.mobile && { mobile: updates.mobile }),
    ...(updates.customFields && { customFields: JSON.stringify(updates.customFields) })
  })

  return makeApiRequest(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }, false) // Don't cache updates
}

/**
 * Get comprehensive dashboard data for a learner by email
 */
export async function getDashboardDataByEmail(email: string): Promise<{
  learner: GraphyApiResponse<GraphyLearner>
  stats: GraphyApiResponse<DashboardStats>
  usage: GraphyApiResponse<UsageAnalytics>
  expenses: GraphyApiResponse<any[]>
}> {
  // Get learner by email
  const learnerResponse = await getLearnerByEmail(email)
  
  if (!learnerResponse.success || !learnerResponse.data || learnerResponse.data.length === 0) {
    return {
      success: false,
      error: `Learner not found: ${learnerResponse.error || 'No data returned'}`,
      learner: null,
      stats: { totalCourses: 0, completedCourses: 0, totalLearningHours: 0, currentStreak: 0, totalExpenses: 0 },
      usage: { dailyUsage: [], courseUsage: [], weeklyPattern: [] },
      expenses: []
    }
  }

  const learner = learnerResponse.data[0] // Get first learner from search results
  
  // Get transactions for expenses
  const expenses = await getTransactions()
  
  // Get course progress if learner has enrollments
  let progressData = { success: true, data: [] }
  if (learner && learner.enrollments && Array.isArray(learner.enrollments) && learner.enrollments.length > 0) {
    const productIds = learner.enrollments.map((e: any) => e.courseId || e.productId).filter(Boolean)
    if (productIds.length > 0) {
      progressData = await getCourseProgressReport(productIds)
    }
  }

  // Calculate stats from learner data
  const enrollments = (learner && learner.enrollments) || []
  const stats: DashboardStats = {
    totalCourses: Array.isArray(enrollments) ? enrollments.length : 0,
    completedCourses: Array.isArray(enrollments) ? enrollments.filter((e: any) => e.status === 'completed').length : 0,
    totalLearningHours: 0, // Will be calculated from progress data
    currentStreak: 0, // Will be calculated from activity
    totalExpenses: expenses.success && Array.isArray(expenses.data) ? expenses.data.reduce((sum, t) => sum + (t.amount || 0), 0) : 0
  }

  // Calculate usage analytics from progress data
  const usage: UsageAnalytics = {
    dailyUsage: [],
    courseUsage: progressData.success && Array.isArray(progressData.data) ? progressData.data.map((p: any) => ({
      courseId: p.productId || p.courseId,
      courseName: p.productName || p.courseName || 'Unknown Course',
      hours: p.timeSpent || p.hours || 0
    })) : [],
    weeklyPattern: []
  }

  return {
    success: true,
    error: null,
    learner,
    stats,
    usage,
    expenses
  }
}

/**
 * Clear API cache
 */
export function clearApiCache(): void {
  cache.clear()
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  }
}
