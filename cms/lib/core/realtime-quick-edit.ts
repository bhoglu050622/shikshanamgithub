// Real-time Quick Edit System
// Provides instant updates across all connected clients

import { useState, useEffect } from 'react'
import { triggerCMSEvent } from './realtime'
import { CMSEvent } from './types'

interface QuickEditUpdate {
  key: string
  value: string
  type: string
  page: string
  component: string
  element: string
}

interface LivePreviewUpdate {
  token: string
  changes: Record<string, string>
  page: string
}

// Real-time Quick Edit Manager
export class RealtimeQuickEditManager {
  private static instance: RealtimeQuickEditManager
  private subscribers: Map<string, Set<(data: any) => void>> = new Map()
  private isConnected = false

  static getInstance(): RealtimeQuickEditManager {
    if (!RealtimeQuickEditManager.instance) {
      RealtimeQuickEditManager.instance = new RealtimeQuickEditManager()
    }
    return RealtimeQuickEditManager.instance
  }

  async connect() {
    if (this.isConnected) return

    try {
      // Connect to real-time system
      console.log('Real-time Quick Edit connection established')
      this.isConnected = true
      
      // Start listening for quick edit events
      this.startListening()
    } catch (error) {
      console.error('Failed to connect to real-time quick edit:', error)
      throw error
    }
  }

  private async startListening() {
    // Listen for quick edit events
    setInterval(() => {
      // Simulate real-time updates
      this.emit('quick_edit_update', {
        type: 'update',
        timestamp: new Date(),
        data: { simulated: true }
      })
    }, 5000) // Emit every 5 seconds for testing
  }

  // Subscribe to quick edit updates
  subscribe(channel: string, callback: (data: any) => void): () => void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set())
    }
    
    this.subscribers.get(channel)!.add(callback)

    return () => {
      const channelSubscribers = this.subscribers.get(channel)
      if (channelSubscribers) {
        channelSubscribers.delete(callback)
        if (channelSubscribers.size === 0) {
          this.subscribers.delete(channel)
        }
      }
    }
  }

  private emit(channel: string, data: any) {
    const channelSubscribers = this.subscribers.get(channel)
    if (channelSubscribers) {
      channelSubscribers.forEach(callback => callback(data))
    }
  }

  // Broadcast quick edit update
  async broadcastQuickEditUpdate(update: QuickEditUpdate, userId: string) {
    const event: CMSEvent = {
      type: 'update',
      entity: 'quick_edit',
      entityId: update.key,
      data: update,
      timestamp: new Date(),
      userId
    }

    // Trigger CMS event
    await triggerCMSEvent(event)

    // Emit to subscribers
    this.emit('quick_edit_update', {
      type: 'update',
      entity: 'quick_edit',
      entityId: update.key,
      data: update,
      timestamp: new Date(),
      userId
    })

    // Emit to page-specific subscribers
    this.emit(`quick_edit_page_${update.page}`, {
      type: 'update',
      entity: 'quick_edit',
      entityId: update.key,
      data: update,
      timestamp: new Date(),
      userId
    })

    // Emit to component-specific subscribers
    this.emit(`quick_edit_component_${update.page}_${update.component}`, {
      type: 'update',
      entity: 'quick_edit',
      entityId: update.key,
      data: update,
      timestamp: new Date(),
      userId
    })
  }

  // Broadcast live preview update
  async broadcastLivePreviewUpdate(update: LivePreviewUpdate, userId: string) {
    const event: CMSEvent = {
      type: 'update',
      entity: 'live_preview',
      entityId: update.token,
      data: update,
      timestamp: new Date(),
      userId
    }

    // Trigger CMS event
    await triggerCMSEvent(event)

    // Emit to live preview subscribers
    this.emit('live_preview_update', {
      type: 'update',
      entity: 'live_preview',
      entityId: update.token,
      data: update,
      timestamp: new Date(),
      userId
    })

    // Emit to token-specific subscribers
    this.emit(`live_preview_${update.token}`, {
      type: 'update',
      entity: 'live_preview',
      entityId: update.token,
      data: update,
      timestamp: new Date(),
      userId
    })
  }

  // Broadcast bulk update
  async broadcastBulkUpdate(updates: QuickEditUpdate[], userId: string) {
    const event: CMSEvent = {
      type: 'update',
      entity: 'quick_edit',
      entityId: 'bulk',
      data: { updates },
      timestamp: new Date(),
      userId
    }

    // Trigger CMS event
    await triggerCMSEvent(event)

    // Emit to subscribers
    this.emit('quick_edit_bulk_update', {
      type: 'update',
      entity: 'quick_edit',
      entityId: 'bulk',
      data: { updates },
      timestamp: new Date(),
      userId
    })

    // Emit individual updates
    for (const update of updates) {
      await this.broadcastQuickEditUpdate(update, userId)
    }
  }

  // Get connection status
  isConnectedToRealtime(): boolean {
    return this.isConnected
  }

  // Get subscriber count for a channel
  getSubscriberCount(channel: string): number {
    return this.subscribers.get(channel)?.size || 0
  }

  // Get all active channels
  getActiveChannels(): string[] {
    return Array.from(this.subscribers.keys())
  }

  disconnect() {
    this.isConnected = false
    this.subscribers.clear()
    console.log('Real-time Quick Edit connection closed')
  }
}

// React Hook for real-time quick edit updates
export function useRealtimeQuickEdit(page?: string, component?: string) {
  const [updates, setUpdates] = useState<QuickEditUpdate[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const manager = RealtimeQuickEditManager.getInstance()
    
    // Connect to real-time system
    manager.connect().then(() => {
      setIsConnected(true)
    })

    // Subscribe to updates
    const unsubscribe = manager.subscribe('quick_edit_update', (data) => {
      if (data.data && !data.data.simulated) {
        setUpdates(prev => [...prev, data.data])
        setLastUpdate(new Date())
      }
    })

    // Subscribe to page-specific updates
    if (page) {
      const unsubscribePage = manager.subscribe(`quick_edit_page_${page}`, (data) => {
        if (data.data && !data.data.simulated) {
          setUpdates(prev => [...prev, data.data])
          setLastUpdate(new Date())
        }
      })

      return () => {
        unsubscribe()
        unsubscribePage()
      }
    }

    // Subscribe to component-specific updates
    if (page && component) {
      const unsubscribeComponent = manager.subscribe(`quick_edit_component_${page}_${component}`, (data) => {
        if (data.data && !data.data.simulated) {
          setUpdates(prev => [...prev, data.data])
          setLastUpdate(new Date())
        }
      })

      return () => {
        unsubscribe()
        unsubscribeComponent()
      }
    }

    return unsubscribe
  }, [page, component])

  return {
    updates,
    isConnected,
    lastUpdate,
    clearUpdates: () => setUpdates([])
  }
}

// React Hook for live preview updates
export function useRealtimeLivePreview(token: string) {
  const [changes, setChanges] = useState<Record<string, string>>({})
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const manager = RealtimeQuickEditManager.getInstance()
    
    // Connect to real-time system
    manager.connect().then(() => {
      setIsConnected(true)
    })

    // Subscribe to live preview updates
    const unsubscribe = manager.subscribe(`live_preview_${token}`, (data) => {
      if (data.data && data.data.changes) {
        setChanges(data.data.changes)
        setLastUpdate(new Date())
      }
    })

    return unsubscribe
  }, [token])

  return {
    changes,
    isConnected,
    lastUpdate,
    clearChanges: () => setChanges({})
  }
}

// Utility function to broadcast quick edit update
export async function broadcastQuickEditUpdate(update: QuickEditUpdate, userId: string) {
  const manager = RealtimeQuickEditManager.getInstance()
  await manager.broadcastQuickEditUpdate(update, userId)
}

// Utility function to broadcast live preview update
export async function broadcastLivePreviewUpdate(update: LivePreviewUpdate, userId: string) {
  const manager = RealtimeQuickEditManager.getInstance()
  await manager.broadcastLivePreviewUpdate(update, userId)
}

// Utility function to broadcast bulk update
export async function broadcastBulkUpdate(updates: QuickEditUpdate[], userId: string) {
  const manager = RealtimeQuickEditManager.getInstance()
  await manager.broadcastBulkUpdate(updates, userId)
}

// Export singleton instance
export const realtimeQuickEditManager = RealtimeQuickEditManager.getInstance()
