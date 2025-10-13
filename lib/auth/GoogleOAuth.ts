/**
 * Google OAuth Integration
 * Handles Google authentication flow and token management
 */

import { AUTH_CONFIG } from '@/lib/config/auth'

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture?: string
  verified_email: boolean
}

/**
 * Redirect to Google OAuth
 */
export function redirectToGoogleOAuth(returnUrl?: string): void {
  const { CLIENT_ID, REDIRECT_URI, SCOPES } = AUTH_CONFIG.GOOGLE
  
  if (!CLIENT_ID) {
    throw new Error('Google OAuth is not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.')
  }

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${window.location.origin}${REDIRECT_URI}`,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
    ...(returnUrl && { state: returnUrl })
  })

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  window.location.href = authUrl
}

/**
 * Handle Google OAuth callback
 */
export function handleGoogleCallback(): { success: boolean; user?: GoogleUser; error?: string } {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const error = urlParams.get('error')
  const state = urlParams.get('state')

  if (error) {
    return { success: false, error: `Google OAuth error: ${error}` }
  }

  if (!code) {
    return { success: false, error: 'No authorization code received from Google' }
  }

  // In a real implementation, you would exchange the code for tokens
  // and fetch user information from Google's API
  // For now, we'll return a placeholder response
  return { 
    success: true, 
    user: {
      id: 'google_user_id',
      email: 'user@example.com',
      name: 'Google User',
      verified_email: true
    }
  }
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<{ access_token: string; refresh_token?: string }> {
  const tokenUrl = 'https://oauth2.googleapis.com/token'
  
  const tokenData = new URLSearchParams({
    code,
    client_id: AUTH_CONFIG.GOOGLE.CLIENT_ID,
    client_secret: AUTH_CONFIG.GOOGLE.CLIENT_SECRET,
    redirect_uri: `${typeof window !== 'undefined' ? window.location.origin : ''}${AUTH_CONFIG.GOOGLE.REDIRECT_URI}`,
    grant_type: 'authorization_code'
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
    throw new Error(`Token exchange failed: ${response.status}`)
  }

  return response.json()
}

/**
 * Get user information from Google
 */
export async function getGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user information from Google')
  }

  return response.json()
}