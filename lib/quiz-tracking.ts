'use client'

export interface QuizResult {
  id: string
  completedAt: string
  result: any
  userName?: string
}

export interface CompletedQuizzes {
  quizzes: string[]
  lastUpdated: string
}

export interface AllQuizResults {
  gunaProfiler?: QuizResult
  shivaAlignment?: QuizResult
}

/**
 * Save quiz result to localStorage
 */
export function saveQuizResult(quizId: string, result: any, userName?: string, userEmail?: string): void {
  try {
    const storageKey = userEmail ? `${quizId}-result-${userEmail}` : `${quizId}-result`
    const completedKey = userEmail ? `completed-quizzes-${userEmail}` : 'completed-quizzes'
    
    const quizResult: QuizResult = {
      id: quizId,
      completedAt: new Date().toISOString(),
      result,
      userName
    }

    // Save individual quiz result
    localStorage.setItem(storageKey, JSON.stringify(quizResult))

    // Update completed quizzes list
    const completedQuizzes = getCompletedQuizzes(userEmail)
    if (!completedQuizzes.includes(quizId)) {
      completedQuizzes.push(quizId)
      localStorage.setItem(completedKey, JSON.stringify({
        quizzes: completedQuizzes,
        lastUpdated: new Date().toISOString()
      }))
    }

    console.log(`Quiz ${quizId} result saved successfully for ${userEmail || 'anonymous'}`)
  } catch (error) {
    console.error('Error saving quiz result:', error)
  }
}

/**
 * Get specific quiz result from localStorage
 */
export function getQuizResult(quizId: string, userEmail?: string): QuizResult | null {
  try {
    const storageKey = userEmail ? `${quizId}-result-${userEmail}` : `${quizId}-result`
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      return JSON.parse(stored)
    }
    return null
  } catch (error) {
    console.error('Error retrieving quiz result:', error)
    return null
  }
}

/**
 * Get list of completed quiz IDs
 */
export function getCompletedQuizzes(userEmail?: string): string[] {
  try {
    const completedKey = userEmail ? `completed-quizzes-${userEmail}` : 'completed-quizzes'
    const stored = localStorage.getItem(completedKey)
    if (stored) {
      const data: CompletedQuizzes = JSON.parse(stored)
      return data.quizzes || []
    }
    return []
  } catch (error) {
    console.error('Error retrieving completed quizzes:', error)
    return []
  }
}

/**
 * Get all quiz results
 */
export function getAllQuizResults(): AllQuizResults {
  try {
    const gunaProfiler = getQuizResult('guna-profiler')
    const shivaAlignment = getQuizResult('shiva-alignment')

    return {
      gunaProfiler: gunaProfiler || undefined,
      shivaAlignment: shivaAlignment || undefined
    }
  } catch (error) {
    console.error('Error retrieving all quiz results:', error)
    return {}
  }
}

/**
 * Check if all quizzes are completed
 */
export function areAllQuizzesCompleted(userEmail?: string): boolean {
  const completed = getCompletedQuizzes(userEmail)
  const totalQuizzes = ['guna-profiler', 'shiva-alignment']
  return totalQuizzes.every(quiz => completed.includes(quiz))
}

/**
 * Get remaining quizzes
 */
export function getRemainingQuizzes(userEmail?: string): string[] {
  const completed = getCompletedQuizzes(userEmail)
  const totalQuizzes = ['guna-profiler', 'shiva-alignment']
  return totalQuizzes.filter(quiz => !completed.includes(quiz))
}

/**
 * Get completion percentage
 */
export function getCompletionPercentage(userEmail?: string): number {
  const completed = getCompletedQuizzes(userEmail)
  const totalQuizzes = ['guna-profiler', 'shiva-alignment']
  return Math.round((completed.length / totalQuizzes.length) * 100)
}

/**
 * Clear all quiz data
 */
export function clearAllQuizData(): void {
  try {
    localStorage.removeItem('guna-profiler-result')
    localStorage.removeItem('shiva-alignment-result')
    localStorage.removeItem('completed-quizzes')
    console.log('All quiz data cleared')
  } catch (error) {
    console.error('Error clearing quiz data:', error)
  }
}

/**
 * Get quiz display name
 */
export function getQuizDisplayName(quizId: string): string {
  const names: Record<string, string> = {
    'guna-profiler': 'Guna Profiler',
    'shiva-alignment': 'How Aligned Are You?'
  }
  return names[quizId] || quizId
}

/**
 * Get quiz URL
 */
export function getQuizUrl(quizId: string): string {
  const urls: Record<string, string> = {
    'guna-profiler': '/guna-profiler',
    'shiva-alignment': '/how-aligned-are-you'
  }
  return urls[quizId] || '/'
}
