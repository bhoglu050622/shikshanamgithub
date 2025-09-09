import { NextRequest, NextResponse } from 'next/server'
import { refreshAccessToken, AuthError } from '@/cms/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 }
      )
    }

    const tokens = await refreshAccessToken(refreshToken)

    // Update httpOnly cookie for new refresh token
    const response = NextResponse.json({
      success: true,
      accessToken: tokens.accessToken,
    })

    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    if (error instanceof AuthError) {
      // Clear invalid refresh token
      const response = NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
      
      response.cookies.delete('refreshToken')
      return response
    }

    console.error('Token refresh error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
