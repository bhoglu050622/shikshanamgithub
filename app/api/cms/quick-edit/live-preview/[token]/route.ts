import { NextRequest, NextResponse } from 'next/server'
import { quickEditService } from '@/cms/lib/core/quick-edit'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/quick-edit/live-preview/[token] - Get live preview changes by token
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params
    
    console.log('Live preview request for token:', token)
    console.log('Request URL:', request.url)
    console.log('Request method:', request.method)

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
