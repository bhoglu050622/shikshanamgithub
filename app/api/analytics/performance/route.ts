import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log performance metrics (you can store these in a database later)
    console.log('Performance metrics received:', {
      timestamp: new Date().toISOString(),
      ...body
    })
    
    // For now, just acknowledge receipt
    return NextResponse.json({ 
      success: true, 
      message: 'Performance metrics recorded' 
    })
  } catch (error) {
    console.error('Error processing performance metrics:', error)
    return NextResponse.json(
      { error: 'Failed to process performance metrics' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Analytics performance endpoint is working' 
  })
}
