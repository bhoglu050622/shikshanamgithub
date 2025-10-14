import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from '@/lib/config/auth'
import { corsResponse, handleCorsPreflightRequest } from '@/lib/utils/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request)
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_CONFIG.SESSION.COOKIE_NAME)

    if (!authCookie) {
      return corsResponse({ isLoggedIn: false, user: null }, request)
    }

    try {
      const authData = JSON.parse(authCookie.value)
      
      if (authData.isLoggedIn && authData.user) {
        return corsResponse({
          isLoggedIn: true,
          user: authData.user
        }, request)
      }
    } catch (parseError) {
      console.error('Error parsing auth cookie:', parseError)
    }

    return corsResponse({ isLoggedIn: false, user: null }, request)
  } catch (error) {
    console.error('Auth check error:', error)
    return corsResponse({ isLoggedIn: false, user: null }, request)
  }
}
