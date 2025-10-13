import { NextRequest, NextResponse } from 'next/server'
import { AUTH_CONFIG } from '@/lib/config/auth'

interface GoogleTokenResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope: string
}

interface GoogleUserInfo {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle OAuth error
  if (error) {
    console.error('Google OAuth error:', error)
    const returnUrl = state ? decodeURIComponent(state) : '/'
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${returnUrl}?error=oauth_failed`)
  }

  // Validate required parameters
  if (!code) {
    console.error('No authorization code received')
    const returnUrl = state ? decodeURIComponent(state) : '/'
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${returnUrl}?error=no_code`)
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code)
    
    // Fetch user information from Google
    const userInfo = await fetchUserInfo(tokenResponse.access_token)
    
    // Create user session data
    const userData = {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      verified_email: userInfo.verified_email,
      provider: 'google',
      loginTime: Date.now()
    }

    // Create response with redirect
    const returnUrl = state ? decodeURIComponent(state) : '/'
    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${returnUrl}`)

    const authData = JSON.stringify({
      isLoggedIn: true,
      user: userData
    })

    // Set httpOnly cookie (secure, server-side only)
    response.cookies.set(AUTH_CONFIG.SESSION.COOKIE_NAME, authData, {
      maxAge: AUTH_CONFIG.SESSION.MAX_AGE,
      httpOnly: true,
      secure: AUTH_CONFIG.SESSION.SECURE,
      sameSite: 'lax',
      path: '/'
    })

    // Also set client-readable cookie (for immediate UI updates)
    response.cookies.set(`${AUTH_CONFIG.SESSION.COOKIE_NAME}-client`, authData, {
      maxAge: AUTH_CONFIG.SESSION.MAX_AGE,
      httpOnly: false, // Client can read this
      secure: AUTH_CONFIG.SESSION.SECURE,
      sameSite: 'lax',
      path: '/'
    })

    console.log('Google OAuth login successful for:', userInfo.email)
    return response

  } catch (error) {
    console.error('OAuth callback error:', error)
    const returnUrl = state ? decodeURIComponent(state) : '/'
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${returnUrl}?error=auth_failed`)
  }
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code: string): Promise<GoogleTokenResponse> {
  const tokenUrl = 'https://oauth2.googleapis.com/token'
  
  // Validate required configuration
  if (!AUTH_CONFIG.GOOGLE.CLIENT_ID || !AUTH_CONFIG.GOOGLE.CLIENT_SECRET) {
    throw new Error('Google OAuth configuration is missing')
  }

  const tokenData = new URLSearchParams({
    code,
    client_id: AUTH_CONFIG.GOOGLE.CLIENT_ID,
    client_secret: AUTH_CONFIG.GOOGLE.CLIENT_SECRET,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}${AUTH_CONFIG.GOOGLE.REDIRECT_URI}`,
    grant_type: 'authorization_code'
  })

  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}${AUTH_CONFIG.GOOGLE.REDIRECT_URI}`
  console.log('Token exchange details:', {
    redirectUri,
    clientId: AUTH_CONFIG.GOOGLE.CLIENT_ID.substring(0, 20) + '...',
    hasClientSecret: !!AUTH_CONFIG.GOOGLE.CLIENT_SECRET,
    codeLength: code.length
  })

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: tokenData
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error('Token exchange failed:', response.status, errorData)
    
    // Handle specific error cases
    if (response.status === 400) {
      try {
        const error = JSON.parse(errorData)
        if (error.error === 'invalid_grant') {
          throw new Error('Authorization code has expired or been used already. Please try logging in again.')
        }
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
      }
    }
    
    throw new Error(`Token exchange failed: ${response.status}`)
  }

  return response.json()
}

/**
 * Fetch user information from Google
 */
async function fetchUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const userInfoUrl = 'https://www.googleapis.com/oauth2/v2/userinfo'
  
  const response = await fetch(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    console.error('User info fetch failed:', response.status)
    throw new Error(`User info fetch failed: ${response.status}`)
  }

  return response.json()
}
