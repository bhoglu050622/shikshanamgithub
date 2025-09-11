import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/lib/auth/auth-service'
import { jwtAuth } from '@/lib/auth/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Handle different actions
    if (action === 'login') {
      const result = await authService.login({ email, password }, request)
      
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 401 }
        )
      }

      // Set secure cookies
      if (result.tokens) {
        await jwtAuth.setTokenCookies(result.tokens.accessToken, result.tokens.refreshToken)
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: 'Login successful'
      })
    }

    if (action === 'register') {
      const { username } = body
      
      if (!username) {
        return NextResponse.json(
          { error: 'Username is required for registration' },
          { status: 400 }
        )
      }

      const result = await authService.register({
        email,
        password,
        username,
        role: 'VIEWER'
      })

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        )
      }

      // Set secure cookies
      if (result.tokens) {
        await jwtAuth.setTokenCookies(result.tokens.accessToken, result.tokens.refreshToken)
      }

      return NextResponse.json({
        success: true,
        user: result.user,
        message: 'Registration successful'
      }, { status: 201 })
    }

    // Default to login if no action specified
    const result = await authService.login({ email, password }, request)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      )
    }

    // Set secure cookies
    if (result.tokens) {
      jwtAuth.setTokenCookies(result.tokens.accessToken, result.tokens.refreshToken)
    }

    return NextResponse.json({
      success: true,
      user: result.user,
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Email auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
