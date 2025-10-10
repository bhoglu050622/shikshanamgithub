'use client'

interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  if (typeof document === 'undefined') return

  const {
    expires,
    maxAge,
    path = '/',
    domain,
    secure = process.env.NODE_ENV === 'production',
    httpOnly = false,
    sameSite = 'lax'
  } = options

  let cookieString = `${name}=${encodeURIComponent(value)}`

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`
  }

  if (maxAge) {
    cookieString += `; max-age=${maxAge}`
  }

  cookieString += `; path=${path}`

  if (domain) {
    cookieString += `; domain=${domain}`
  }

  if (secure) {
    cookieString += '; secure'
  }

  if (httpOnly) {
    cookieString += '; httponly'
  }

  cookieString += `; samesite=${sameSite}`

  if (typeof document !== 'undefined') {
    document.cookie = cookieString
  }
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  
  return null
}

export function deleteCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}) {
  if (typeof document === 'undefined') return

  const { path = '/', domain } = options
  
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
  
  if (domain) {
    cookieString += `; domain=${domain}`
  }
  
  if (typeof document !== 'undefined') {
    document.cookie = cookieString
  }
}

// Authentication specific cookie functions
export const AUTH_COOKIE_NAME = 'shikshanam-auth'
export const AUTH_COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds (extended for better persistence)
export const AUTH_STORAGE_KEY = 'shikshanam-auth-storage'

export function setAuthCookie(userData: any) {
  const authData = {
    isLoggedIn: true,
    user: userData,
    timestamp: Date.now(),
    expires: Date.now() + (AUTH_COOKIE_MAX_AGE * 1000) // Add explicit expiration
  }
  
  const cookieValue = JSON.stringify(authData)
  
  // Set cookie
  setCookie(AUTH_COOKIE_NAME, cookieValue, {
    maxAge: AUTH_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  // Also store in localStorage as backup
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, cookieValue)
    } catch (error) {
      console.warn('Failed to store auth data in localStorage:', error)
    }
  }
}

export function getAuthCookie(): { isLoggedIn: boolean; user: any; timestamp: number } | null {
  // First try to get from cookie
  let cookieValue = getCookie(AUTH_COOKIE_NAME)
  
  // If no cookie, try localStorage as backup
  if (!cookieValue && typeof window !== 'undefined') {
    try {
      cookieValue = localStorage.getItem(AUTH_STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
    }
  }
  
  if (!cookieValue) return null
  
  try {
    const authData = JSON.parse(cookieValue)
    
    // Check if auth data is expired
    const now = Date.now()
    if (authData.expires && now > authData.expires) {
      deleteAuthCookie()
      return null
    }
    
    // Check if cookie is expired (older than max age) - fallback check
    const cookieAge = now - authData.timestamp
    const maxAgeMs = AUTH_COOKIE_MAX_AGE * 1000
    
    if (cookieAge > maxAgeMs) {
      deleteAuthCookie()
      return null
    }
    
    return authData
  } catch (error) {
    console.error('Error parsing auth data:', error)
    deleteAuthCookie()
    return null
  }
}

export function deleteAuthCookie() {
  deleteCookie(AUTH_COOKIE_NAME)
  
  // Also clear localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear auth data from localStorage:', error)
    }
  }
}

export function refreshAuthCookie(userData: any) {
  // Refresh the authentication cookie with new timestamp
  setAuthCookie(userData)
}
