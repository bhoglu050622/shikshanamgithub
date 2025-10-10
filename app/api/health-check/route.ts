import { NextResponse } from 'next/server'
import { handleCorsOptions, createCorsResponse } from '@/lib/cors'

export async function GET() {
  return createCorsResponse({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
}

export async function OPTIONS() {
  return handleCorsOptions()
}
