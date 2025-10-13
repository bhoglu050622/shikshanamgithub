import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from '@/lib/config/auth'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_CONFIG.SESSION.COOKIE_NAME)

    if (!authCookie) {
      return NextResponse.json({ isLoggedIn: false, user: null })
    }

    try {
      const authData = JSON.parse(authCookie.value)
      
      if (authData.isLoggedIn && authData.user) {
        return NextResponse.json({
          isLoggedIn: true,
          user: authData.user
        })
      }
    } catch (parseError) {
      console.error('Error parsing auth cookie:', parseError)
    }

    return NextResponse.json({ isLoggedIn: false, user: null })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ isLoggedIn: false, user: null })
  }
}
