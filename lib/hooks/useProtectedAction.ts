'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'

const RETURN_ACTION_KEY = 'shikshanam_return_action'
const RETURN_URL_KEY = 'shikshanam_return_url'

export type ProtectedAction = string | (() => void)

interface UseProtectedActionOptions {
  onSuccess?: () => void
  onCancel?: () => void
}

export function useProtectedAction(options?: UseProtectedActionOptions) {
  const { isLoggedIn, isLoading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<ProtectedAction | null>(null)

  // Check for pending action on mount (after authentication redirect)
  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      const storedAction = getStoredAction()
      if (storedAction) {
        executeStoredAction(storedAction)
        clearStoredAction()
      }
    }
  }, [isLoggedIn, isLoading])

  const executeAction = useCallback((action: ProtectedAction) => {
    if (isLoggedIn) {
      // User is logged in, execute immediately
      if (typeof action === 'string') {
        window.open(action, '_blank', 'noopener,noreferrer')
      } else {
        action()
      }
      options?.onSuccess?.()
    } else {
      // User not logged in, store action and show login modal
      storeAction(action)
      setPendingAction(action)
      setShowLoginModal(true)
    }
  }, [isLoggedIn, options])

  const handleLoginSuccess = useCallback(() => {
    setShowLoginModal(false)
    
    // Execute pending action after a small delay to ensure auth state is updated
    setTimeout(() => {
      if (pendingAction) {
        if (typeof pendingAction === 'string') {
          window.open(pendingAction, '_blank', 'noopener,noreferrer')
        } else {
          pendingAction()
        }
        setPendingAction(null)
        options?.onSuccess?.()
      }
    }, 100)
  }, [pendingAction, options])

  const handleLoginCancel = useCallback(() => {
    setShowLoginModal(false)
    setPendingAction(null)
    clearStoredAction()
    options?.onCancel?.()
  }, [options])

  return {
    executeAction,
    showLoginModal,
    setShowLoginModal,
    handleLoginSuccess,
    handleLoginCancel,
    isLoading,
  }
}

// Helper functions for session storage
function storeAction(action: ProtectedAction) {
  if (typeof window === 'undefined') return

  try {
    // Store current URL for return
    sessionStorage.setItem(RETURN_URL_KEY, window.location.href)
    
    // Store action (can only store strings, so functions are lost)
    if (typeof action === 'string') {
      sessionStorage.setItem(RETURN_ACTION_KEY, action)
    } else {
      // For callback functions, we can't serialize them
      // They will need to be re-created after login
      sessionStorage.setItem(RETURN_ACTION_KEY, '__callback__')
    }
  } catch (error) {
    console.error('Failed to store return action:', error)
  }
}

function getStoredAction(): string | null {
  if (typeof window === 'undefined') return null

  try {
    const action = sessionStorage.getItem(RETURN_ACTION_KEY)
    return action && action !== '__callback__' ? action : null
  } catch (error) {
    console.error('Failed to retrieve stored action:', error)
    return null
  }
}

function executeStoredAction(action: string) {
  if (action && action !== '__callback__') {
    window.open(action, '_blank', 'noopener,noreferrer')
  }
}

export function clearStoredAction() {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.removeItem(RETURN_ACTION_KEY)
    sessionStorage.removeItem(RETURN_URL_KEY)
  } catch (error) {
    console.error('Failed to clear stored action:', error)
  }
}

export function getStoredReturnUrl(): string | null {
  if (typeof window === 'undefined') return null

  try {
    return sessionStorage.getItem(RETURN_URL_KEY)
  } catch (error) {
    console.error('Failed to retrieve return URL:', error)
    return null
  }
}

