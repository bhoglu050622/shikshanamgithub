'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { setAuthCookie, getAuthCookie, deleteAuthCookie } from './cookies'

interface User {
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  isInitialized: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Define login function first to avoid initialization error
  const login = useCallback((userData: User) => {
    setIsLoggedIn(true)
    setUser(userData)
    setAuthCookie(userData)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUser(null)
    deleteAuthCookie()
  }, [])

  // Check for existing auth state on mount
  useEffect(() => {
    try {
      // Check for saved auth state in cookies
      const authData = getAuthCookie()
      if (authData && authData.isLoggedIn && authData.user) {
        setIsLoggedIn(true)
        setUser(authData.user)
      }
    } catch (error) {
      console.warn('Failed to load auth state from cookies:', error)
      // Clear potentially corrupted auth data
      deleteAuthCookie()
    }
    
    setIsInitialized(true)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, isInitialized, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
