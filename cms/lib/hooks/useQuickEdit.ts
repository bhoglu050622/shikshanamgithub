// React Hook for Quick Edit Integration
// Provides easy integration of quick edit functionality into existing components

import { useState, useEffect, useCallback } from 'react'
import { QuickEditType } from '../generated/prisma'

interface QuickEditItem {
  id: string
  key: string
  type: QuickEditType
  page: string
  component: string
  element: string
  value: string
  defaultValue: string
  isActive: boolean
  metadata?: any
}

interface UseQuickEditOptions {
  page: string
  component: string
  element: string
  type: QuickEditType
  defaultValue: string
  metadata?: any
  autoSave?: boolean
  debounceMs?: number
}

interface UseQuickEditReturn {
  value: string
  setValue: (value: string) => void
  isEditing: boolean
  startEdit: () => void
  saveEdit: () => Promise<void>
  cancelEdit: () => void
  resetToDefault: () => void
  isLoading: boolean
  error: string | null
}

// Hook for quick editing functionality
export function useQuickEdit(options: UseQuickEditOptions): UseQuickEditReturn {
  const {
    page,
    component,
    element,
    type,
    defaultValue,
    metadata,
    autoSave = true,
    debounceMs = 500
  } = options

  const [value, setValue] = useState(defaultValue)
  const [originalValue, setOriginalValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null)

  // Generate unique key for this editable item
  const key = `${page}.${component}.${element}`

  // Load initial value from CMS
  useEffect(() => {
    loadValue()
  }, [key])

  // Auto-save with debouncing
  useEffect(() => {
    if (autoSave && value !== originalValue && !isEditing) {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      const timer = setTimeout(() => {
        saveValue(value)
      }, debounceMs)

      setDebounceTimer(timer)

      return () => {
        if (timer) clearTimeout(timer)
      }
    }
  }, [value, originalValue, autoSave, debounceMs, isEditing])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }
    }
  }, [debounceTimer])

  const loadValue = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/cms/quick-edit?key=${encodeURIComponent(key)}`)
      
      if (response.ok) {
        const data = await response.json()
        if (data && data.value) {
          setValue(data.value)
          setOriginalValue(data.value)
        }
      }
    } catch (err) {
      console.error('Failed to load quick edit value:', err)
      setError('Failed to load value')
    } finally {
      setIsLoading(false)
    }
  }

  const saveValue = async (newValue: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/cms/quick-edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates: [{
            key,
            value: newValue,
            type,
            page,
            component
          }]
        })
      })

      if (response.ok) {
        setOriginalValue(newValue)
        setIsEditing(false)
      } else {
        throw new Error('Failed to save value')
      }
    } catch (err) {
      console.error('Failed to save quick edit value:', err)
      setError('Failed to save value')
    } finally {
      setIsLoading(false)
    }
  }

  const startEdit = useCallback(() => {
    setIsEditing(true)
    setError(null)
  }, [])

  const saveEdit = useCallback(async () => {
    await saveValue(value)
  }, [value])

  const cancelEdit = useCallback(() => {
    setValue(originalValue)
    setIsEditing(false)
    setError(null)
  }, [originalValue])

  const resetToDefault = useCallback(() => {
    setValue(defaultValue)
    setOriginalValue(defaultValue)
    setIsEditing(false)
    setError(null)
  }, [defaultValue])

  return {
    value,
    setValue,
    isEditing,
    startEdit,
    saveEdit,
    cancelEdit,
    resetToDefault,
    isLoading,
    error
  }
}

// Hook for managing multiple quick edit items
export function useQuickEditItems(page: string, component: string) {
  const [items, setItems] = useState<QuickEditItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(
        `/api/cms/quick-edit?page=${encodeURIComponent(page)}&component=${encodeURIComponent(component)}`
      )

      if (response.ok) {
        const data = await response.json()
        setItems(data)
      } else {
        throw new Error('Failed to load items')
      }
    } catch (err) {
      console.error('Failed to load quick edit items:', err)
      setError('Failed to load items')
    } finally {
      setIsLoading(false)
    }
  }, [page, component])

  const updateItem = useCallback(async (key: string, value: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/cms/quick-edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates: [{
            key,
            value
          }]
        })
      })

      if (response.ok) {
        // Update local state
        setItems(prev => prev.map(item => 
          item.key === key ? { ...item, value } : item
        ))
      } else {
        throw new Error('Failed to update item')
      }
    } catch (err) {
      console.error('Failed to update quick edit item:', err)
      setError('Failed to update item')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const bulkUpdate = useCallback(async (updates: Array<{ key: string; value: string }>) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/cms/quick-edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates })
      })

      if (response.ok) {
        const data = await response.json()
        // Update local state with results
        setItems(prev => prev.map(item => {
          const update = updates.find(u => u.key === item.key)
          return update ? { ...item, value: update.value } : item
        }))
      } else {
        throw new Error('Failed to bulk update items')
      }
    } catch (err) {
      console.error('Failed to bulk update quick edit items:', err)
      setError('Failed to bulk update items')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  return {
    items,
    isLoading,
    error,
    loadItems,
    updateItem,
    bulkUpdate
  }
}

// Hook for live preview functionality
export function useLivePreview(page: string) {
  const [changes, setChanges] = useState<Record<string, string>>({})
  const [token, setToken] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)

  const startPreview = useCallback(async () => {
    try {
      const response = await fetch('/api/cms/quick-edit/live-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          changes
        })
      })

      if (response.ok) {
        const data = await response.json()
        setToken(data.token)
        setIsActive(true)
      }
    } catch (err) {
      console.error('Failed to start live preview:', err)
    }
  }, [page, changes])

  const updatePreview = useCallback(async (newChanges: Record<string, string>) => {
    if (!token) return

    try {
      await fetch(`/api/cms/quick-edit/live-preview/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changes: newChanges
        })
      })

      setChanges(newChanges)
    } catch (err) {
      console.error('Failed to update live preview:', err)
    }
  }, [token])

  const stopPreview = useCallback(() => {
    setToken(null)
    setIsActive(false)
    setChanges({})
  }, [])

  return {
    changes,
    token,
    isActive,
    startPreview,
    updatePreview,
    stopPreview
  }
}

// Utility function to get CSS property for quick edit type
export function getCSSProperty(type: QuickEditType): string {
  switch (type) {
    case 'COLOR':
      return 'color'
    case 'BUTTON_COLOR':
      return 'background-color'
    case 'BACKGROUND_COLOR':
      return 'background-color'
    case 'FONT_SIZE':
      return 'font-size'
    case 'FONT_WEIGHT':
      return 'font-weight'
    case 'SPACING':
      return 'padding'
    case 'BORDER_RADIUS':
      return 'border-radius'
    case 'SHADOW':
      return 'box-shadow'
    default:
      return ''
  }
}

// Utility function to validate quick edit value
export function validateQuickEditValue(type: QuickEditType, value: string): boolean {
  switch (type) {
    case 'COLOR':
    case 'BUTTON_COLOR':
    case 'BACKGROUND_COLOR':
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
    case 'FONT_SIZE':
      return /^\d+(\.\d+)?(px|em|rem|%)$/.test(value)
    case 'FONT_WEIGHT':
      return ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold'].includes(value)
    case 'SPACING':
      return /^\d+(\.\d+)?(px|em|rem|%)$/.test(value)
    case 'BORDER_RADIUS':
      return /^\d+(\.\d+)?(px|em|rem|%)$/.test(value)
    case 'TEXT':
    case 'BUTTON_LABEL':
      return value.length > 0
    default:
      return true
  }
}
