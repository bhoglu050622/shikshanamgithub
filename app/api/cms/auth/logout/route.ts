import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest, logoutUser, AuthError } from '@/cms/lib/auth'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '@/cms/lib/audit'

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    const refreshToken = request.cookies.get('refreshToken')?.value

    if (refreshToken) {
      await logoutUser(refreshToken)
    }

    // Log logout
    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.LOGOUT,
      AUDIT_RESOURCES.USER,
      user.id,
      {},
      request
    )

    const response = NextResponse.json({ success: true })
    response.cookies.delete('refreshToken')
    
    return response
  } catch (error) {
    if (error instanceof AuthError) {
      const response = NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      )
      
      // Clear cookie even if auth fails
      response.cookies.delete('refreshToken')
      return response
    }

    console.error('Logout error:', error)
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
    
    response.cookies.delete('refreshToken')
    return response
  }
}
