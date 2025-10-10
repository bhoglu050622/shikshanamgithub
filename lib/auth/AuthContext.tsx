'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAuthCookie, setAuthCookie, deleteAuthCookie } from '@/lib/cookies'
import { handleGraphySSOCallback } from './GraphySSO'

export interface User {
  name?: string
  email: string
  mobile?: string
  learnerId?: string
  isLoggedIn: boolean
  loginTime?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (userData: Omit<User, 'isLoggedIn'>) => void
  logout: () => void
  checkAuthStatus: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus()
    
    // Check for Google OAuth callback on mount
    const urlParams = new URLSearchParams(window.location.search)
    const loginSuccess = urlParams.get('login')
    const userData = urlParams.get('user')
    
    if (loginSuccess === 'success' && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData))
        login({
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          learnerId: user.learnerId,
          loginTime: Date.now()
        })
        
        // Clean up URL parameters
        const url = new URL(window.location.href)
        url.searchParams.delete('login')
        url.searchParams.delete('user')
        url.searchParams.delete('error')
        window.history.replaceState({}, '', url.toString())
      } catch (error) {
        console.error('Error parsing user data:', error)
      }
    }
    
    // Check for SSO callback on mount (legacy support)
    const ssoResult = handleGraphySSOCallback()
    if (ssoResult.success && ssoResult.user) {
      login({
        name: ssoResult.user.name,
        email: ssoResult.user.email,
        mobile: ssoResult.user.mobile,
        learnerId: ssoResult.user.learnerId,
        loginTime: Date.now()
      })
      
      // Clean up URL parameters
      const url = new URL(window.location.href)
      url.searchParams.delete('ssoToken')
      url.searchParams.delete('error')
      window.history.replaceState({}, '', url.toString())
    } else if (ssoResult.error && ssoResult.isCallback) {
      // Only log errors from actual SSO callbacks, not normal page visits
      console.error('SSO Error:', ssoResult.error)
    }
  }, [])

  const generateLearnerId = (email: string): string => {
    const hash = email.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return `learner_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`
  }

  const checkAuthStatus = () => {
    try {
      const authData = getAuthCookie()
      if (authData && authData.isLoggedIn) {
        let learnerId = authData.user?.learnerId
        
        // Generate learner ID if not present
        if (!learnerId && authData.user?.email) {
          learnerId = generateLearnerId(authData.user.email)
          // Update the stored auth data with the generated learner ID
          const updatedUser = { ...authData.user, learnerId }
          setAuthCookie(updatedUser)
        }
        
        setUser({
          name: authData.user?.name,
          email: authData.user?.email,
          mobile: authData.user?.mobile,
          learnerId: learnerId,
          isLoggedIn: true,
          loginTime: authData.timestamp
        })
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (userData: Omit<User, 'isLoggedIn'>) => {
    const userWithLoginStatus: User = {
      ...userData,
      isLoggedIn: true
    }
    
    setUser(userWithLoginStatus)
    setAuthCookie(userData)
  }

  const logout = () => {
    setUser(null)
    deleteAuthCookie()
    
    // Redirect to homepage after logout
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
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
