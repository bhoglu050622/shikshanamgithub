'use client'

import React from 'react'
import { ContentType } from './generated/prisma'

// Safe localStorage wrapper that handles SSR and errors
class SafeLocalStorage {
  public isAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && 'localStorage' in window
    } catch {
      return false
    }
  }

  get(key: string): string | null {
    if (!this.isAvailable()) return null
    
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn('localStorage get error:', error)
      return null
    }
  }

  set(key: string, value: string): boolean {
    if (!this.isAvailable()) return false
    
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn('localStorage set error:', error)
      return false
    }
  }

  remove(key: string): boolean {
    if (!this.isAvailable()) return false
    
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn('localStorage remove error:', error)
      return false
    }
  }

  clear(): boolean {
    if (!this.isAvailable()) return false
    
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.warn('localStorage clear error:', error)
      return false
    }
  }
}

const safeStorage = new SafeLocalStorage()

// Draft management
export interface DraftData {
  contentType: ContentType
  contentId: string
  data: any
  lastSaved: string
  autoSaveVersion: number
}

export class DraftManager {
  private static getDraftKey(contentType: ContentType, contentId: string): string {
    return `draft_${contentType.toLowerCase()}_${contentId}`
  }

  static saveDraft(contentType: ContentType, contentId: string, data: any): boolean {
    const draftData: DraftData = {
      contentType,
      contentId,
      data,
      lastSaved: new Date().toISOString(),
      autoSaveVersion: Date.now(),
    }

    const key = this.getDraftKey(contentType, contentId)
    return safeStorage.set(key, JSON.stringify(draftData))
  }

  static getDraft(contentType: ContentType, contentId: string): DraftData | null {
    const key = this.getDraftKey(contentType, contentId)
    const stored = safeStorage.get(key)
    
    if (!stored) return null

    try {
      return JSON.parse(stored) as DraftData
    } catch (error) {
      console.warn('Failed to parse draft data:', error)
      return null
    }
  }

  static removeDraft(contentType: ContentType, contentId: string): boolean {
    const key = this.getDraftKey(contentType, contentId)
    return safeStorage.remove(key)
  }

  static getAllDrafts(): DraftData[] {
    if (!safeStorage.isAvailable()) return []

    const drafts: DraftData[] = []
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('draft_')) {
          const stored = localStorage.getItem(key)
          if (stored) {
            try {
              const draft = JSON.parse(stored) as DraftData
              drafts.push(draft)
            } catch (error) {
              console.warn('Failed to parse draft:', key, error)
            }
          }
        }
      }
    } catch (error) {
      console.warn('Failed to get all drafts:', error)
    }

    return drafts.sort((a, b) => 
      new Date(b.lastSaved).getTime() - new Date(a.lastSaved).getTime()
    )
  }

  static cleanOldDrafts(maxAge: number = 7 * 24 * 60 * 60 * 1000): number {
    const drafts = this.getAllDrafts()
    const cutoff = Date.now() - maxAge
    let cleaned = 0

    drafts.forEach(draft => {
      if (new Date(draft.lastSaved).getTime() < cutoff) {
        if (this.removeDraft(draft.contentType, draft.contentId)) {
          cleaned++
        }
      }
    })

    return cleaned
  }
}

// Analytics queue management
export interface AnalyticsEvent {
  id: string
  event: string
  properties: Record<string, any>
  timestamp: string
  userId?: string
  sessionId?: string
}

export class AnalyticsQueue {
  private static readonly QUEUE_KEY = process.env.ANALYTICS_LOCALSTORAGE_KEY || 'analytics_queue_v1'
  private static readonly MAX_QUEUE_SIZE = 100
  private static readonly BATCH_SIZE = 10

  static addEvent(event: string, properties: Record<string, any> = {}): boolean {
    const analyticsEvent: AnalyticsEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      event,
      properties: {
        ...properties,
        url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      timestamp: new Date().toISOString(),
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
    }

    const queue = this.getQueue()
    queue.push(analyticsEvent)

    // Keep queue size manageable
    if (queue.length > this.MAX_QUEUE_SIZE) {
      queue.splice(0, queue.length - this.MAX_QUEUE_SIZE)
    }

    return safeStorage.set(this.QUEUE_KEY, JSON.stringify(queue))
  }

  static getQueue(): AnalyticsEvent[] {
    const stored = safeStorage.get(this.QUEUE_KEY)
    if (!stored) return []

    try {
      return JSON.parse(stored) as AnalyticsEvent[]
    } catch (error) {
      console.warn('Failed to parse analytics queue:', error)
      return []
    }
  }

  static async flushQueue(): Promise<{ sent: number; failed: number }> {
    const queue = this.getQueue()
    if (queue.length === 0) return { sent: 0, failed: 0 }

    const endpoint = process.env.ANALYTICS_ENDPOINT || '/api/analytics/collect'
    let sent = 0
    let failed = 0

    // Process in batches
    for (let i = 0; i < queue.length; i += this.BATCH_SIZE) {
      const batch = queue.slice(i, i + this.BATCH_SIZE)
      
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ events: batch }),
        })

        if (response.ok) {
          sent += batch.length
        } else {
          failed += batch.length
          console.warn('Analytics batch failed:', response.status, response.statusText)
        }
      } catch (error) {
        failed += batch.length
        console.warn('Analytics batch error:', error)
      }
    }

    // Remove sent events from queue
    if (sent > 0) {
      const remainingQueue = queue.slice(sent)
      safeStorage.set(this.QUEUE_KEY, JSON.stringify(remainingQueue))
    }

    return { sent, failed }
  }

  static clearQueue(): boolean {
    return safeStorage.set(this.QUEUE_KEY, '[]')
  }

  static getQueueSize(): number {
    return this.getQueue().length
  }

  private static getUserId(): string | undefined {
    const user = safeStorage.get('cmsUser')
    if (user) {
      try {
        return JSON.parse(user).id
      } catch {
        return undefined
      }
    }
    return undefined
  }

  private static getSessionId(): string {
    const existing = safeStorage.get('analytics_session_id')
    if (existing) return existing

    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    safeStorage.set('analytics_session_id', sessionId)
    return sessionId
  }
}

// User preferences and settings
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  autoSaveInterval: number
  showPreviewPane: boolean
  editorLayout: 'split' | 'tabs'
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
  }
}

export class PreferencesManager {
  private static readonly PREFS_KEY = 'cms_user_preferences'

  static getPreferences(): UserPreferences {
    const stored = safeStorage.get(this.PREFS_KEY)
    const defaults: UserPreferences = {
      theme: 'auto',
      language: 'en',
      autoSaveInterval: 5000, // 5 seconds
      showPreviewPane: true,
      editorLayout: 'split',
      notifications: {
        email: true,
        push: false,
        desktop: true,
      },
    }

    if (!stored) return defaults

    try {
      return { ...defaults, ...JSON.parse(stored) }
    } catch (error) {
      console.warn('Failed to parse user preferences:', error)
      return defaults
    }
  }

  static setPreferences(preferences: Partial<UserPreferences>): boolean {
    const current = this.getPreferences()
    const updated = { ...current, ...preferences }
    return safeStorage.set(this.PREFS_KEY, JSON.stringify(updated))
  }

  static resetPreferences(): boolean {
    return safeStorage.remove(this.PREFS_KEY)
  }
}

// Auto-save hook for React components
export function useAutoSave(
  contentType: ContentType,
  contentId: string,
  data: any,
  enabled: boolean = true
) {
  const preferences = PreferencesManager.getPreferences()
  
  React.useEffect(() => {
    if (!enabled || !data) return

    const interval = setInterval(() => {
      DraftManager.saveDraft(contentType, contentId, data)
    }, preferences.autoSaveInterval)

    return () => clearInterval(interval)
  }, [contentType, contentId, data, enabled, preferences.autoSaveInterval])
}

// Analytics tracking hooks
export function useAnalytics() {
  const trackEvent = (event: string, properties?: Record<string, any>) => {
    AnalyticsQueue.addEvent(event, properties)
  }

  const trackPageView = (page: string) => {
    trackEvent('page_view', { page })
  }

  const trackUserAction = (action: string, properties?: Record<string, any>) => {
    trackEvent('user_action', { action, ...properties })
  }

  return {
    trackEvent,
    trackPageView,
    trackUserAction,
  }
}

// Initialize analytics flushing
if (typeof window !== 'undefined') {
  // Flush analytics queue on page load
  window.addEventListener('load', () => {
    AnalyticsQueue.flushQueue()
  })

  // Flush analytics queue before page unload
  window.addEventListener('beforeunload', () => {
    AnalyticsQueue.flushQueue()
  })

  // Flush analytics queue periodically
  setInterval(() => {
    AnalyticsQueue.flushQueue()
  }, 30000) // Every 30 seconds

  // Clean old drafts on startup
  DraftManager.cleanOldDrafts()
}
