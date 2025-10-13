'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAuthCookie, setAuthCookie, deleteAuthCookie } from '@/lib/cookies'
import { clearStoredAction, getStoredReturnUrl } from '@/lib/hooks/useProtectedAction'

interface User {
  id: string
  email: string
  name: string
  picture?: string
  verified_email?: boolean
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from cookie on mount and check with server
  useEffect(() => {
    const loadUser = async () => {
      try {
        // First try to get from client-side cookie (non-httpOnly)
        const authData = getAuthCookie()
        if (authData?.isLoggedIn && authData?.user) {
          setUser(authData.user)
          setIsLoading(false)
          return
        }

        // If not found in client cookie, check server (httpOnly cookie)
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          if (data.isLoggedIn && data.user) {
            setUser(data.user)
            // Also set client-side cookie for faster subsequent loads
            setAuthCookie(data.user)
          }
        }
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setAuthCookie(userData)
  }

  const logout = async () => {
    try {
      // Call logout API to clear server-side cookie
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout API error:', error)
    }
    
    // Clear client-side auth state (but keep localStorage quiz data)
    setUser(null)
    deleteAuthCookie()
    
    // Note: We deliberately DO NOT clear localStorage
    // Quiz data persists per user email for future logins
  }

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}