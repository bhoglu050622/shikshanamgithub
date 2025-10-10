import { NextRequest, NextResponse } from 'next/server'
import { getDashboardDataByEmail, getLearnerByEmail, getLearnerDetails, getTransactions, getCourseProgressReport } from '@/lib/api/graphy-api'
import { addCorsHeaders } from '@/lib/cors'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const learnerId = searchParams.get('learnerId')
    const action = searchParams.get('action') || 'dashboard'

    let result

    switch (action) {
      case 'test':
        return NextResponse.json({
          success: true,
          message: 'API is working',
          timestamp: new Date().toISOString()
        })
      case 'by-email':
        if (!email) {
          return NextResponse.json(
            { success: false, error: 'Email is required' },
            { status: 400 }
          )
        }
        result = await getLearnerByEmail(email)
        break
      case 'details':
        if (!learnerId) {
          return NextResponse.json(
            { success: false, error: 'Learner ID is required' },
            { status: 400 }
          )
        }
        result = await getLearnerDetails(learnerId)
        break
      case 'transactions':
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const status = searchParams.get('status')
        const type = searchParams.get('type')
        result = await getTransactions(startDate || undefined, endDate || undefined, status || undefined, type || undefined)
        break
      case 'progress':
        const productIds = searchParams.get('productIds')
        if (!productIds) {
          return NextResponse.json(
            { success: false, error: 'Product IDs are required' },
            { status: 400 }
          )
        }
        result = await getCourseProgressReport(productIds.split(','))
        break
      case 'dashboard':
      default:
        if (!email) {
          return NextResponse.json(
            { success: false, error: 'Email is required for dashboard' },
            { status: 400 }
          )
        }
        result = await getDashboardDataByEmail(email)
        break
    }

    // If API call failed, return a more informative error
    if (!result.success) {
      console.warn(`Graphy API failed:`, result.error)
      return NextResponse.json({
        success: false,
        error: result.error || 'Graphy API unavailable'
      })
    }

    const response = NextResponse.json(result)
    return addCorsHeaders(response)
  } catch (error) {
    console.error('Graphy API route error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    const response = NextResponse.json(
      { 
        success: false, 
        error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    )
    return addCorsHeaders(response)
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 })
  return addCorsHeaders(response)
}
