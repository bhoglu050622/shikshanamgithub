import { NextRequest, NextResponse } from 'next/server'
import { GOOGLE_OAUTH_CONFIG, OAUTH_URLS } from '@/lib/config/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/?auth=error&message=Authentication failed', request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?auth=error&message=No authorization code received', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(OAUTH_URLS.GOOGLE_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_OAUTH_CONFIG.CLIENT_ID,
        client_secret: GOOGLE_OAUTH_CONFIG.CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_OAUTH_CONFIG.REDIRECT_URI,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error('Token exchange failed:', errorData)
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    const { access_token, refresh_token } = tokenData

    // Store refresh token for future use (if provided)
    if (refresh_token) {
      // In a real app, you'd store this securely in your database
      console.log('Refresh token received and stored')
    }

    // Get user info from Google
    const userResponse = await fetch(OAUTH_URLS.GOOGLE_USER_INFO, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info')
    }

    const userData = await userResponse.json()

    // Create user object
    const user = {
      name: userData.name,
      email: userData.email,
      avatar: userData.picture,
      provider: 'google',
      id: userData.id,
    }

    // Redirect back to the app with user data
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('auth', 'success')
    redirectUrl.searchParams.set('user', JSON.stringify(user))

    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    
    // Redirect to error page
    const redirectUrl = new URL('/', request.url)
    redirectUrl.searchParams.set('auth', 'error')
    redirectUrl.searchParams.set('message', 'Authentication failed')
    
    return NextResponse.redirect(redirectUrl.toString())
  }
}
