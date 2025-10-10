/**
 * Google OAuth Integration
 * Handles Google OAuth authentication flow
 */

import { AUTH_CONFIG } from '@/lib/config/auth'
import { generateGraphyJWT, GraphyUser } from './GraphySSO'

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
}

/**
 * Generate Google OAuth URL
 */
export function generateGoogleOAuthURL(returnUrl?: string): string {
  const config = AUTH_CONFIG.GOOGLE
  
  // Use server-side redirect URI for consistency
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL 
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    : 'http://localhost:3000/api/auth/google/callback'
  
  const params = new URLSearchParams({
    client_id: config.CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: config.SCOPE,
    access_type: 'offline',
    prompt: 'consent'
  })

  // Add return URL as state parameter if provided
  if (returnUrl) {
    params.set('state', encodeURIComponent(returnUrl))
  }

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<{ access_token: string; id_token: string }> {
  const config = AUTH_CONFIG.GOOGLE
  
  // Use server-side redirect URI
  const redirectUri = process.env.NEXT_PUBLIC_APP_URL 
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    : 'http://localhost:3000/api/auth/google/callback'
  
  console.log('Using redirect URI:', redirectUri)
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Token exchange failed:', response.status, errorText)
    throw new Error(`Failed to exchange code for token: ${response.status} ${errorText}`)
  }

  return response.json()
}

/**
 * Get user info from Google using access token
 */
export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get user info from Google')
  }

  return response.json()
}

/**
 * Decode JWT ID token to get user info
 */
export function decodeGoogleIdToken(idToken: string): GoogleUser {
  try {
    console.log('Decoding ID token:', idToken.substring(0, 20) + '...')
    
    const parts = idToken.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
    console.log('Decoded payload:', { email: payload.email, name: payload.name })
    
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      given_name: payload.given_name,
      family_name: payload.family_name
    }
  } catch (error) {
    console.error('JWT decode error:', error)
    throw new Error('Failed to decode ID token: ' + (error instanceof Error ? error.message : String(error)))
  }
}

/**
 * Generate a learner ID for new users
 */
function generateLearnerId(email: string): string {
  // Create a deterministic learner ID based on email
  const hash = email.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return `learner_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`
}

/**
 * Handle Google OAuth callback and redirect to return URL
 */
export async function handleGoogleOAuthCallback(code: string, state?: string): Promise<{ redirectUrl: string; user: GoogleUser }> {
  try {
    // Exchange code for tokens
    const { access_token, id_token } = await exchangeCodeForToken(code)
    
    // Get user info from ID token (more reliable than API call)
    const googleUser = decodeGoogleIdToken(id_token)
    
    // Generate learner ID for the user
    const learnerId = generateLearnerId(googleUser.email)
    
    // Add learner ID to user data
    const userWithLearnerId = {
      ...googleUser,
      learnerId
    }
    
    // Use return URL from state parameter, or default to homepage
    let returnUrl = '/'
    if (state) {
      try {
        returnUrl = decodeURIComponent(state)
      } catch (error) {
        console.warn('Invalid return URL in state parameter:', error)
        returnUrl = '/'
      }
    }
    
    // Create redirect URL with user data
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const fullReturnUrl = returnUrl.startsWith('http') ? returnUrl : `${baseUrl}${returnUrl}`
    const redirectUrl = `${fullReturnUrl}?login=success&user=${encodeURIComponent(JSON.stringify(userWithLearnerId))}`
    
    return { redirectUrl, user: userWithLearnerId }
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    throw error
  }
}

/**
 * Redirect to Google OAuth
 */
export function redirectToGoogleOAuth(returnUrl?: string): void {
  const authUrl = generateGoogleOAuthURL(returnUrl)
  window.location.href = authUrl
}
