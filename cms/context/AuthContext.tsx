'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/cms/lib/generated/prisma'

interface User {
  id: string
  username: string
  role: UserRole
  email?: string | null
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  refreshToken: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const login = (user: User, token: string) => {
    setUser(user)
    localStorage.setItem('cmsAccessToken', token)
    localStorage.setItem('cmsUser', JSON.stringify(user))
  }

  const logout = async () => {
    try {
      await fetch('/api/cms/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('cmsAccessToken')
      localStorage.removeItem('cmsUser')
      router.push('/cms/login')
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/cms/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('cmsAccessToken', data.accessToken)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      return false
    }
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('cmsAccessToken')
    const userData = localStorage.getItem('cmsUser')

    if (!token || !userData) {
      setIsLoading(false)
      return
    }

    try {
      // Verify token with server
      const response = await fetch('/api/cms/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else if (response.status === 401) {
        // Try to refresh token
        const refreshed = await refreshToken()
        if (refreshed) {
          // Retry with new token
          const retryResponse = await fetch('/api/cms/auth/me', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('cmsAccessToken')}`,
            },
          })
          
          if (retryResponse.ok) {
            const data = await retryResponse.json()
            setUser(data.user)
          } else {
            throw new Error('Auth check failed after refresh')
          }
        } else {
          throw new Error('Token refresh failed')
        }
      } else {
        throw new Error('Auth check failed')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('cmsAccessToken')
      localStorage.removeItem('cmsUser')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
