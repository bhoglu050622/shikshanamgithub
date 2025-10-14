import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Allowed origins for CORS
const getAllowedOrigins = () => {
  const nodeEnv = process.env.NODE_ENV || 'development'
  
  if (nodeEnv === 'production') {
    return [
      'https://shikshanam.com',
      'https://www.shikshanam.com',
      'https://shikshanam.in',
      'https://www.shikshanam.in',
    ]
  }
  
  // Development - allow localhost and common development origins
  return [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
  ]
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigins = getAllowedOrigins()
  
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      const headers = new Headers()
      
      // Check if origin is allowed
      if (origin && allowedOrigins.includes(origin)) {
        headers.set('Access-Control-Allow-Origin', origin)
        headers.set('Access-Control-Allow-Credentials', 'true')
      } else if (allowedOrigins.length > 0) {
        // Default to first allowed origin if no origin header
        headers.set('Access-Control-Allow-Origin', allowedOrigins[0])
        headers.set('Access-Control-Allow-Credentials', 'true')
      }
      
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
      headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name')
      headers.set('Access-Control-Max-Age', '86400')
      
      return new NextResponse(null, { status: 204, headers })
    }
    
    // Handle actual API request
    const response = NextResponse.next()
    
    // Add CORS headers to API responses
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    } else if (allowedOrigins.length > 0) {
      // Default to first allowed origin if no origin header
      response.headers.set('Access-Control-Allow-Origin', allowedOrigins[0])
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name')
    
    return response
  }
  
  // Pass through all other requests
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}