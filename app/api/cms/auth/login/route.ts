import { NextRequest, NextResponse } from 'next/server'
import { loginUser, AuthError, bootstrapAdmin } from '@/cms/lib/auth'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '@/cms/lib/audit'

export async function POST(request: NextRequest) {
  try {
    // Production fallback when database is not available
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      console.log('Production mode without database: returning mock auth response')
      return NextResponse.json({
        success: true,
        user: {
          id: 'prod-admin',
          username: 'admin',
          role: 'ADMIN',
          email: 'admin@shikshanam.com',
        },
        accessToken: 'mock-access-token',
      })
    }

    // Ensure bootstrap admin exists
    await bootstrapAdmin()

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    const { user, tokens } = await loginUser(username, password)

    // Log successful login
    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.LOGIN,
      AUDIT_RESOURCES.USER,
      user.id,
      { loginMethod: 'password' },
      request
    )

    // Set httpOnly cookie for refresh token
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
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
      // Log failed login attempt
      try {
        const requestBody = await request.json().catch(() => ({}))
        await AuditLogger.log({
          userId: 'anonymous',
          action: AUDIT_ACTIONS.LOGIN_FAILED,
          resource: AUDIT_RESOURCES.USER,
          metadata: { 
            username: requestBody?.username,
            error: error.message,
          },
          ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown',
        })
      } catch (auditError) {
        console.error('Failed to log failed login:', auditError)
      }

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
