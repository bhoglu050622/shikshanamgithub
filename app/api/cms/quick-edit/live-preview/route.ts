import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { quickEditService } from '@/cms/lib/core/quick-edit'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// POST /api/cms/quick-edit/live-preview - Create live preview token
export async function POST(request: NextRequest) {
  try {
    console.log('Creating live preview token...')
    
    // Development bypass or fallback when database is not available
    if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      console.log('Development mode or no database: returning mock preview token')
      return NextResponse.json({ token: 'preview_dev_token_123' })
    }
    
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    const { page, changes } = body

    if (!page || !changes) {
      return NextResponse.json(
        { error: 'page and changes are required' },
        { status: 400 }
      )
    }

    // Create live preview token
    const token = await quickEditService.createLivePreviewToken(page, changes, user)

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Create live preview token error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ 
      error: 'Failed to create preview token',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

// GET /api/cms/quick-edit/live-preview/[token] - Get live preview changes
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    
    console.log('Live preview GET request for token:', token)

    // Development bypass or fallback when database is not available
    if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      console.log('Development mode or no database: returning mock preview data')
      return NextResponse.json({
        'homepage.Hero.title-prefix': {
          value: 'Welcome to',
          type: 'TEXT',
          cssProperty: 'text'
        },
        'homepage.Hero.title-brand': {
          value: 'Shikshanam',
          type: 'TEXT',
          cssProperty: 'text'
        },
        'homepage.Hero.subtitle': {
          value: 'Where AI meets Ancient India',
          type: 'TEXT',
          cssProperty: 'text'
        },
        'homepage.Hero.cta-primary': {
          value: 'School of Sanskrit',
          type: 'BUTTON_LABEL',
          cssProperty: 'text'
        },
        'homepage.Hero.cta-secondary': {
          value: 'School of Darshan',
          type: 'BUTTON_LABEL',
          cssProperty: 'text'
        },
        'homepage.Hero.cta-tertiary': {
          value: 'School of Life Skills',
          type: 'BUTTON_LABEL',
          cssProperty: 'text'
        }
      })
    }

    // Get live preview changes (no auth required for preview)
    const changes = await quickEditService.getLivePreviewChanges(token)

    if (!changes) {
      console.log('No changes found for token:', token)
      return NextResponse.json(
        { error: 'Invalid or expired preview token' },
        { status: 404 }
      )
    }

    console.log('Successfully retrieved changes for token:', token)
    return NextResponse.json(changes)
  } catch (error) {
    console.error('Get live preview changes error:', error)
    const resolvedParams = await params
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      token: resolvedParams?.token
    })
    
    if (error instanceof CMSError) {
      return NextResponse.json({ 
        error: error.message,
        details: 'CMS Error occurred'
      }, { status: error.statusCode })
    }
    
    return NextResponse.json({ 
      error: 'Preview generation failed',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}

// PUT /api/cms/quick-edit/live-preview/[token] - Update live preview changes
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    const body = await request.json()
    
    console.log('Updating live preview for token:', token)

    // Development bypass or fallback when database is not available
    if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      console.log('Development mode or no database: returning success for preview update')
      return NextResponse.json({ success: true, changes: body.changes || {} })
    }
    
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { changes } = body

    if (!changes) {
      return NextResponse.json(
        { error: 'changes are required' },
        { status: 400 }
      )
    }

    // Update live preview changes
    const updated = await quickEditService.updateLivePreviewChanges(token, changes, user)

    if (!updated) {
      return NextResponse.json(
        { error: 'Invalid or expired preview token' },
        { status: 404 }
      )
    }

    // Trigger real-time event for live preview
    await triggerCMSEvent({
      type: 'update',
      entity: 'live_preview',
      entityId: token,
      data: { changes },
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json({ success: true, changes })
  } catch (error) {
    console.error('Update live preview changes error:', error)
    const resolvedParams = await params
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      token: resolvedParams?.token
    })
    
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ 
      error: 'Failed to update preview',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
