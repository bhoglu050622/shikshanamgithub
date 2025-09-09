'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export interface RealtimeData {
  timestamp: string
  type: 'metric' | 'event' | 'notification' | 'activity'
  data: any
}

export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  publishedCourses: number
  draftCourses: number
  totalRevenue: number
  monthlyRevenue: number
  pageViews: number
  uniqueVisitors: number
  conversionRate: number
  systemHealth: {
    cpu: number
    memory: number
    storage: number
    uptime: string
  }
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  resource: string
  timestamp: string
  metadata?: any
}

export interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

class RealtimeService {
  private static instance: RealtimeService
  private eventSource: EventSource | null = null
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService()
    }
    return RealtimeService.instance
  }

  connect() {
    if (typeof window === 'undefined') return

    try {
      this.eventSource = new EventSource('/api/cms/realtime/stream')
      
      this.eventSource.onopen = () => {
        console.log('Real-time connection established')
        this.reconnectAttempts = 0
      }

      this.eventSource.onmessage = (event) => {
        try {
          const data: RealtimeData = JSON.parse(event.data)
          this.emit(data.type, data.data)
        } catch (error) {
          console.error('Error parsing real-time data:', error)
        }
      }

      this.eventSource.onerror = () => {
        console.error('Real-time connection error')
        this.handleReconnect()
      }
    } catch (error) {
      console.error('Failed to establish real-time connection:', error)
    }
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
      
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect()
      }, delay)
    } else {
      console.error('Max reconnection attempts reached')
    }
  }

  subscribe(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)

    return () => {
      const eventListeners = this.listeners.get(event)
      if (eventListeners) {
        eventListeners.delete(callback)
        if (eventListeners.size === 0) {
          this.listeners.delete(event)
        }
      }
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data))
    }
  }

  // Simulate real-time data for development
  simulateData() {
    const generateMetrics = (): DashboardMetrics => ({
      totalUsers: Math.floor(Math.random() * 10000) + 5000,
      activeUsers: Math.floor(Math.random() * 500) + 100,
      totalCourses: Math.floor(Math.random() * 50) + 20,
      publishedCourses: Math.floor(Math.random() * 30) + 15,
      draftCourses: Math.floor(Math.random() * 20) + 5,
      totalRevenue: Math.floor(Math.random() * 100000) + 50000,
      monthlyRevenue: Math.floor(Math.random() * 20000) + 10000,
      pageViews: Math.floor(Math.random() * 50000) + 25000,
      uniqueVisitors: Math.floor(Math.random() * 15000) + 8000,
      conversionRate: Math.random() * 10 + 2,
      systemHealth: {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        storage: Math.random() * 100,
        uptime: '15d 8h 32m'
      },
      recentActivity: this.generateActivity()
    })

    const generateActivity = (): ActivityItem[] => {
      const actions = ['created', 'updated', 'published', 'deleted', 'reviewed']
      const resources = ['course', 'lesson', 'blog post', 'package', 'page']
      const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown']

      return Array.from({ length: 10 }, (_, i) => ({
        id: `activity-${Date.now()}-${i}`,
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        resource: resources[Math.floor(Math.random() * resources.length)],
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        metadata: { id: `resource-${i}` }
      }))
    }

    // Emit metrics every 5 seconds
    setInterval(() => {
      this.emit('metric', generateMetrics())
    }, 5000)

    // Emit activity every 10 seconds
    setInterval(() => {
      const activity: ActivityItem = {
        id: `activity-${Date.now()}`,
        user: 'Live User',
        action: 'updated',
        resource: 'course',
        timestamp: new Date().toISOString(),
        metadata: { live: true }
      }
      this.emit('activity', activity)
    }, 10000)

    // Emit notifications randomly
    setInterval(() => {
      if (Math.random() > 0.7) {
        const notifications = [
          { type: 'success', title: 'Course Published', message: 'Advanced Yoga has been published successfully' },
          { type: 'warning', title: 'Storage Warning', message: 'Storage usage is at 85%' },
          { type: 'info', title: 'New User', message: '5 new users registered today' },
          { type: 'error', title: 'Sync Failed', message: 'Content sync failed for course ID 123' }
        ]
        
        const notification = notifications[Math.floor(Math.random() * notifications.length)]
        this.emit('notification', {
          id: `notif-${Date.now()}`,
          ...notification,
          timestamp: new Date().toISOString(),
          read: false
        } as Notification)
      }
    }, 15000)
  }

  private generateActivity(): ActivityItem[] {
    const actions = ['created', 'updated', 'published', 'deleted', 'reviewed']
    const resources = ['course', 'lesson', 'blog post', 'package', 'page']
    const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown']

    return Array.from({ length: 10 }, (_, i) => ({
      id: `activity-${Date.now()}-${i}`,
      user: users[Math.floor(Math.random() * users.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      resource: resources[Math.floor(Math.random() * resources.length)],
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      metadata: { id: `resource-${i}` }
    }))
  }
}

// React hooks for real-time data
export function useRealtimeMetrics(): DashboardMetrics | null {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const realtimeService = useRef<RealtimeService>()

  useEffect(() => {
    realtimeService.current = RealtimeService.getInstance()
    
    const unsubscribe = realtimeService.current.subscribe('metric', setMetrics)
    
    // Start simulation in development
    if (process.env.NODE_ENV === 'development') {
      realtimeService.current.simulateData()
    } else {
      realtimeService.current.connect()
    }

    return () => {
      unsubscribe()
      if (process.env.NODE_ENV !== 'development') {
        realtimeService.current?.disconnect()
      }
    }
  }, [])

  return metrics
}

export function useRealtimeActivity(): ActivityItem[] {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const realtimeService = useRef<RealtimeService>()

  useEffect(() => {
    realtimeService.current = RealtimeService.getInstance()
    
    const unsubscribe = realtimeService.current.subscribe('activity', (newActivity: ActivityItem) => {
      setActivities(prev => [newActivity, ...prev].slice(0, 20)) // Keep only last 20
    })

    return unsubscribe
  }, [])

  return activities
}

export function useRealtimeNotifications(): [Notification[], (id: string) => void] {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const realtimeService = useRef<RealtimeService>()

  useEffect(() => {
    realtimeService.current = RealtimeService.getInstance()
    
    const unsubscribe = realtimeService.current.subscribe('notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev].slice(0, 50)) // Keep only last 50
    })

    return unsubscribe
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }, [])

  return [notifications, markAsRead]
}

export function useRealtimeConnection(): { connected: boolean; reconnecting: boolean } {
  const [status, setStatus] = useState({ connected: false, reconnecting: false })

  useEffect(() => {
    // In development, always show as connected
    if (process.env.NODE_ENV === 'development') {
      setStatus({ connected: true, reconnecting: false })
      return
    }

    // Real connection status logic would go here
    setStatus({ connected: true, reconnecting: false })
  }, [])

  return status
}
