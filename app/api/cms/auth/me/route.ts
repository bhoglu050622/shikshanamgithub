import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, AuthError } from '@/cms/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Production fallback when database is not available
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      console.log('Production mode without database: returning mock user')
      return NextResponse.json({
        success: true,
        user: {
          id: 'prod-admin',
          username: 'admin',
          role: 'ADMIN',
          email: 'admin@shikshanam.com',
        },
      })
    }

    const user = await getUserFromRequest(request)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
    }

    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
