import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin') || request.headers.get('host')
  const url = request.url
  
  return NextResponse.json({
    origin,
    url,
    host: request.headers.get('host'),
    referer: request.headers.get('referer'),
    userAgent: request.headers.get('user-agent'),
    timestamp: new Date().toISOString()
  })
}
