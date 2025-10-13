import { NextResponse } from 'next/server'
import { AUTH_CONFIG } from '@/lib/config/auth'

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })

  // Clear the httpOnly auth cookie
  response.cookies.set(AUTH_CONFIG.SESSION.COOKIE_NAME, '', {
    maxAge: 0,
    httpOnly: true,
    secure: AUTH_CONFIG.SESSION.SECURE,
    sameSite: 'lax',
    path: '/'
  })

  // Clear the client-readable auth cookie
  response.cookies.set(`${AUTH_CONFIG.SESSION.COOKIE_NAME}-client`, '', {
    maxAge: 0,
    httpOnly: false,
    secure: AUTH_CONFIG.SESSION.SECURE,
    sameSite: 'lax',
    path: '/'
  })

  return response
}

export async function GET() {
  // Allow GET requests for logout as well
  return POST()
}
