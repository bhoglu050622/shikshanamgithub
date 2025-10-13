/**
 * Graphy SSO Integration
 * Implements JWT token generation for Graphy Single Sign-On
 */

import { AUTH_CONFIG } from '@/lib/config/auth'

// Graphy SSO Configuration
export const GRAPHY_CONFIG = AUTH_CONFIG.GRAPHY

export interface GraphyUser {
  name?: string
  email: string
  mobile?: string
  learnerId?: string
  password?: string
  courseIds?: string[]
}

export interface GraphyJWTPayload {
  name?: string
  email: string
  mobile?: string
  learnerId?: string
  password?: string
  exp: number
  'course-ids'?: string[]
}

/**
 * Base64 URL encoding (RFC 4648)
 */
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

/**
 * HMAC SHA256 signature generation
 */
async function hmacSha256(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const hashArray = Array.from(new Uint8Array(signature))
  const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray))
  
  return hashBase64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

/**
 * Generate JWT token for Graphy SSO
 */
export async function generateGraphyJWT(user: GraphyUser, expirationMinutes: number = 60): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (expirationMinutes * 60)

  // Header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  // Payload
  const payload: GraphyJWTPayload = {
    email: user.email,
    exp: exp
  }

  // Add optional fields
  if (user.name) payload.name = user.name
  if (user.mobile) payload.mobile = user.mobile
  if (user.learnerId) payload.learnerId = user.learnerId
  if (user.password) payload.password = user.password
  if (user.courseIds && user.courseIds.length > 0) {
    payload['course-ids'] = user.courseIds
  }

  // Encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))

  // Create signature
  const dataToSign = `${encodedHeader}.${encodedPayload}`
  const signature = await hmacSha256(dataToSign, GRAPHY_CONFIG.API_TOKEN)

  // Return complete JWT
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

/**
 * Generate Graphy SSO URL with JWT token
 */
export async function generateGraphySSOUrl(
  user: GraphyUser, 
  returnUrl?: string,
  expirationMinutes: number = 60
): Promise<string> {
  const jwt = await generateGraphyJWT(user, expirationMinutes)
  const baseUrl = returnUrl || GRAPHY_CONFIG.LEARNING_HUB_URL
  
  return `${baseUrl}?ssoToken=${jwt}`
}

/**
 * Redirect to Graphy with SSO token
 */
export async function redirectToGraphySSO(
  user: GraphyUser,
  returnUrl?: string,
  expirationMinutes: number = 60
): Promise<void> {
  const ssoUrl = await generateGraphySSOUrl(user, returnUrl, expirationMinutes)
  window.location.href = ssoUrl
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
 * Handle SSO callback from Graphy
 * This function should be called when user returns from Graphy
 */
export function handleGraphySSOCallback(): { success: boolean; user?: any; error?: string; isCallback?: boolean } {
  const urlParams = new URLSearchParams(window.location.search)
  const ssoToken = urlParams.get('ssoToken')
  const error = urlParams.get('error')

  // Check if this is actually an SSO callback (has ssoToken or error param)
  const isCallback = !!(ssoToken || error)

  if (error) {
    return { success: false, error, isCallback: true }
  }

  if (ssoToken) {
    // Parse JWT token to get user info (client-side validation)
    try {
      const parts = ssoToken.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

      // Check if token is expired
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp && payload.exp < now) {
        return { success: false, error: 'Token expired', isCallback: true }
      }

      // Generate learner ID if not present
      if (!payload.learnerId && payload.email) {
        payload.learnerId = generateLearnerId(payload.email)
      }

      return { success: true, user: payload, isCallback: true }
    } catch (err) {
      return { success: false, error: 'Invalid token', isCallback: true }
    }
  }

  // No SSO token found - this is normal when visiting the site directly
  return { success: false, error: 'No SSO token found', isCallback: false }
}
