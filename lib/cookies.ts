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

  document.cookie = cookieString
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
  
  document.cookie = cookieString
}

// Authentication specific cookie functions
export const AUTH_COOKIE_NAME = 'shikshanam-auth'
export const AUTH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 days in seconds

export function setAuthCookie(userData: any) {
  const cookieValue = JSON.stringify({
    isLoggedIn: true,
    user: userData,
    timestamp: Date.now()
  })
  
  setCookie(AUTH_COOKIE_NAME, cookieValue, {
    maxAge: AUTH_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
}

export function getAuthCookie(): { isLoggedIn: boolean; user: any; timestamp: number } | null {
  const cookieValue = getCookie(AUTH_COOKIE_NAME)
  
  if (!cookieValue) return null
  
  try {
    const authData = JSON.parse(cookieValue)
    
    // Check if cookie is expired (older than max age)
    const now = Date.now()
    const cookieAge = now - authData.timestamp
    const maxAgeMs = AUTH_COOKIE_MAX_AGE * 1000
    
    if (cookieAge > maxAgeMs) {
      deleteAuthCookie()
      return null
    }
    
    return authData
  } catch (error) {
    console.error('Error parsing auth cookie:', error)
    deleteAuthCookie()
    return null
  }
}

export function deleteAuthCookie() {
  deleteCookie(AUTH_COOKIE_NAME)
}
