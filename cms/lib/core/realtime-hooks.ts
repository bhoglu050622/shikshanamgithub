'use client'

// React hooks for real-time CMS data
// This file contains client-side hooks and should only be imported in client components

import { useState, useEffect, useCallback, useRef } from 'react'
import { CMSEvent, RealtimeSubscription } from './types'
import { PostgreSQLRealtime } from './realtime'

// React hooks for real-time data
export function useCMSRealtime() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastEvent, setLastEvent] = useState<CMSEvent | null>(null)
  const subscriptions = useRef<RealtimeSubscription[]>([])

  useEffect(() => {
    const postgresRealtime = PostgreSQLRealtime.getInstance()
    
    // Connect to PostgreSQL real-time
    postgresRealtime.connect().then(() => {
      setIsConnected(true)
    }).catch((error) => {
      console.error('Failed to connect to real-time:', error)
      setIsConnected(false)
    })

    // Subscribe to CMS events
    const unsubscribe = postgresRealtime.subscribe('cms_event', (event: CMSEvent) => {
      setLastEvent(event)
    })

    return () => {
      unsubscribe()
      postgresRealtime.disconnect()
      setIsConnected(false)
    }
  }, [])

  const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    const postgresRealtime = PostgreSQLRealtime.getInstance()
    const unsubscribe = postgresRealtime.subscribe(eventType, callback)
    
    const subscription: RealtimeSubscription = {
      id: Math.random().toString(36).substr(2, 9),
      event: eventType,
      callback,
      unsubscribe
    }
    
    subscriptions.current.push(subscription)
    
    return () => {
      subscription.unsubscribe()
      subscriptions.current = subscriptions.current.filter(s => s.id !== subscription.id)
    }
  }, [])

  const unsubscribeAll = useCallback(() => {
    subscriptions.current.forEach(sub => sub.unsubscribe())
    subscriptions.current = []
  }, [])

  return {
    isConnected,
    lastEvent,
    subscribe,
    unsubscribeAll
  }
}

// Hook for specific entity updates
export function useEntityRealtime<T>(
  entityType: 'course' | 'lesson' | 'package' | 'blog' | 'page',
  entityId: string,
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData)
  const [isUpdating, setIsUpdating] = useState(false)
  const { subscribe } = useCMSRealtime()

  useEffect(() => {
    const unsubscribe = subscribe('cms_event', (event: CMSEvent) => {
      if (event.entity === entityType && event.entityId === entityId) {
        setIsUpdating(true)
        
        // In a real implementation, you would refetch the data here
        // For now, we'll just update the timestamp
        setData(prevData => ({
          ...prevData,
          lastUpdated: new Date()
        } as T))
        
        setTimeout(() => setIsUpdating(false), 1000)
      }
    })

    return unsubscribe
  }, [entityType, entityId, subscribe])

  return {
    data,
    isUpdating,
    setData
  }
}

// Hook for real-time analytics
export function useRealtimeAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { subscribe } = useCMSRealtime()

  useEffect(() => {
    // Initial load
    const loadAnalytics = async () => {
      try {
        const response = await fetch('/api/cms/analytics')
        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        }
      } catch (error) {
        console.error('Failed to load analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()

    // Subscribe to real-time updates
    const unsubscribe = subscribe('cms_event', (event: CMSEvent) => {
      // Update analytics based on the event
      setAnalytics((prev: any) => {
        if (!prev) return prev

        switch (event.type) {
          case 'create':
            if (event.entity === 'course') {
              return { ...prev, totalCourses: prev.totalCourses + 1 }
            }
            if (event.entity === 'blog') {
              return { ...prev, totalBlogPosts: prev.totalBlogPosts + 1 }
            }
            break
          case 'publish':
            if (event.entity === 'course') {
              return { ...prev, publishedCourses: prev.publishedCourses + 1 }
            }
            break
          default:
            break
        }

        return prev
      })
    })

    return unsubscribe
  }, [subscribe])

  return {
    analytics,
    isLoading
  }
}

// Hook for real-time notifications
export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<any[]>([])
  const { subscribe } = useCMSRealtime()

  useEffect(() => {
    const unsubscribe = subscribe('cms_event', (event: CMSEvent) => {
      // Create notification based on event
      const notification = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'info',
        title: `${event.entity} ${event.type}`,
        message: `${event.entity} ${event.entityId} was ${event.type}d`,
        timestamp: new Date(),
        read: false,
        event
      }

      setNotifications(prev => [notification, ...prev].slice(0, 50)) // Keep only last 50
    })

    return unsubscribe
  }, [subscribe])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    markAsRead,
    clearAll
  }
}
