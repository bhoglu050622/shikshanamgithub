import { NextRequest, NextResponse } from 'next/server'
import { handleCorsOptions, addCorsHeaders } from '@/lib/cors'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ssoToken = searchParams.get('ssoToken')
  const returnUrl = searchParams.get('returnurl')
  const error = searchParams.get('error')

  if (error) {
    // Redirect to return URL or homepage with error
    const redirectUrl = returnUrl ? `/${returnUrl}?error=${encodeURIComponent(error)}` : `/?error=${encodeURIComponent(error)}`
    const response = NextResponse.redirect(new URL(redirectUrl, request.url))
    return addCorsHeaders(response)
  }

  if (ssoToken) {
    // Redirect to return URL or homepage with SSO token for client-side processing
    const redirectUrl = returnUrl ? `/${returnUrl}?ssoToken=${ssoToken}` : `/?ssoToken=${ssoToken}`
    const response = NextResponse.redirect(new URL(redirectUrl, request.url))
    return addCorsHeaders(response)
  }

  // No token or error, redirect to return URL or homepage
  const redirectUrl = returnUrl ? `/${returnUrl}` : '/'
  const response = NextResponse.redirect(new URL(redirectUrl, request.url))
  return addCorsHeaders(response)
}

export async function OPTIONS() {
  return handleCorsOptions()
}
