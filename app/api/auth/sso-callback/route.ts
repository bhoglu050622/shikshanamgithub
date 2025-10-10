import { NextRequest, NextResponse } from 'next/server'
import { handleCorsOptions, addCorsHeaders } from '@/lib/cors'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ssoToken = searchParams.get('ssoToken')
  const error = searchParams.get('error')

  if (error) {
    // Redirect to homepage with error
    const response = NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error)}`, request.url))
    return addCorsHeaders(response)
  }

  if (ssoToken) {
    // Redirect to homepage with SSO token for client-side processing
    const response = NextResponse.redirect(new URL(`/?ssoToken=${ssoToken}`, request.url))
    return addCorsHeaders(response)
  }

  // No token or error, redirect to homepage
  const response = NextResponse.redirect(new URL('/', request.url))
  return addCorsHeaders(response)
}

export async function OPTIONS() {
  return handleCorsOptions()
}
