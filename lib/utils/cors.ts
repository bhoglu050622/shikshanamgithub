import { NextRequest, NextResponse } from 'next/server'

/**
 * Get allowed origins based on environment
 */
export function getAllowedOrigins(): string[] {
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

/**
 * Check if an origin is allowed
 */
export function isOriginAllowed(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false
  return allowedOrigins.includes(origin)
}

/**
 * Get CORS headers for a response
 */
export function getCorsHeaders(request: NextRequest): HeadersInit {
  const origin = request.headers.get('origin')
  const allowedOrigins = getAllowedOrigins()
  const headers: HeadersInit = {}

  // Set Access-Control-Allow-Origin
  if (origin && isOriginAllowed(origin, allowedOrigins)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Credentials'] = 'true'
  } else if (allowedOrigins.length > 0) {
    // Default to first allowed origin if no origin header
    headers['Access-Control-Allow-Origin'] = allowedOrigins[0]
    headers['Access-Control-Allow-Credentials'] = 'true'
  }

  // Set other CORS headers
  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name'
  headers['Access-Control-Max-Age'] = '86400'

  return headers
}

/**
 * Handle OPTIONS preflight request
 */
export function handleCorsPreflightRequest(request: NextRequest): NextResponse {
  const headers = getCorsHeaders(request)
  return new NextResponse(null, { status: 204, headers })
}

/**
 * Add CORS headers to a NextResponse
 */
export function addCorsHeaders(response: NextResponse, request: NextRequest): NextResponse {
  const corsHeaders = getCorsHeaders(request)
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

/**
 * Create a JSON response with CORS headers
 */
export function corsResponse(
  data: any,
  request: NextRequest,
  init?: ResponseInit
): NextResponse {
  const response = NextResponse.json(data, init)
  return addCorsHeaders(response, request)
}

