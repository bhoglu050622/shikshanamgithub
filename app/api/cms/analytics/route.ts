import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { UserRole } from '@/cms/lib/generated/prisma'

// GET /api/cms/analytics - Get system analytics
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    
    const analytics = await cms.getSystemAnalytics(user)
    
    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
