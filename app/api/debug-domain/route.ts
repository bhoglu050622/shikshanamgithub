import { NextRequest, NextResponse } from 'next/server'
import { corsResponse, handleCorsPreflightRequest } from '@/lib/utils/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request)
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || request.headers.get('host')
  const url = request.url
  
  return corsResponse({
    origin,
    url,
    host: request.headers.get('host'),
    referer: request.headers.get('referer'),
    userAgent: request.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  }, request)
}
