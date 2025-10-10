import { NextRequest, NextResponse } from 'next/server'
import { handleGoogleOAuthCallback } from '@/lib/auth/GoogleOAuth'
import { handleCorsOptions, addCorsHeaders } from '@/lib/cors'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    // Redirect to homepage with error
    const response = NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error)}`, request.url))
    return addCorsHeaders(response)
  }

  if (!code) {
    // No code provided, redirect to homepage
    const response = NextResponse.redirect(new URL('/?error=No authorization code provided', request.url))
    return addCorsHeaders(response)
  }

  try {
    console.log('Processing Google OAuth callback with code:', code.substring(0, 10) + '...')
    
    // Handle Google OAuth callback with return URL from state
    const { redirectUrl } = await handleGoogleOAuthCallback(code, state || undefined)
    
    console.log('Redirecting to:', redirectUrl)
    
    // Redirect to return URL with user data
    const response = NextResponse.redirect(redirectUrl)
    return addCorsHeaders(response)
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    // Redirect to homepage with error
    const response = NextResponse.redirect(new URL(`/?error=${encodeURIComponent('Authentication failed')}`, request.url))
    return addCorsHeaders(response)
  }
}

export async function OPTIONS() {
  return handleCorsOptions()
}
