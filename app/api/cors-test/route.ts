import { NextRequest, NextResponse } from 'next/server'
import { handleCorsOptions, createCorsResponse } from '@/lib/cors'

export async function GET(request: NextRequest) {
  return createCorsResponse({
    message: 'CORS test successful',
    method: request.method,
    origin: request.headers.get('origin'),
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  
  return createCorsResponse({
    message: 'CORS POST test successful',
    method: request.method,
    body,
    origin: request.headers.get('origin'),
    timestamp: new Date().toISOString(),
  })
}

export async function OPTIONS() {
  return handleCorsOptions()
}
