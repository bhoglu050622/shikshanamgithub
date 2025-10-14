import { NextRequest, NextResponse } from 'next/server'
import { corsResponse, handleCorsPreflightRequest } from '@/lib/utils/cors'

export async function OPTIONS(request: NextRequest) {
  return handleCorsPreflightRequest(request)
}

export async function GET(request: NextRequest) {
  return corsResponse({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: 'enabled'
  }, request)
}
