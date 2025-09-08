import { NextRequest, NextResponse } from 'next/server'
import { GOOGLE_OAUTH_CONFIG, OAUTH_URLS } from '@/lib/config/auth'

export async function GET(request: NextRequest) {
  // Always redirect to Google OAuth (this route only initiates the flow)
  const googleAuthUrl = new URL(OAUTH_URLS.GOOGLE_AUTH)
  googleAuthUrl.searchParams.set('client_id', GOOGLE_OAUTH_CONFIG.CLIENT_ID)
  googleAuthUrl.searchParams.set('redirect_uri', GOOGLE_OAUTH_CONFIG.REDIRECT_URI)
  googleAuthUrl.searchParams.set('response_type', 'code')
  googleAuthUrl.searchParams.set('scope', GOOGLE_OAUTH_CONFIG.SCOPE)
  googleAuthUrl.searchParams.set('state', 'google_oauth')
  
  return NextResponse.redirect(googleAuthUrl.toString())
}