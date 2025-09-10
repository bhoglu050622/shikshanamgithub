import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { sectionEditor } from '@/cms/lib/core/section-editor'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentType } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/sections - Get sections for content
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const contentType = searchParams.get('contentType') as ContentType
    const contentId = searchParams.get('contentId')

    if (!contentType || !contentId) {
      return NextResponse.json(
        { error: 'contentType and contentId are required' },
        { status: 400 }
      )
    }

    // Check cache first
    const cacheKey = `sections:${contentType}:${contentId}`
    const cached = CacheManager.getCourse(user, cacheKey) // Using course cache as fallback
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from section editor service
    const sections = await sectionEditor.getSections(contentType, contentId, user)
    
    // Cache the result
    CacheManager.setCourse(user, cacheKey, sections)

    return NextResponse.json(sections)
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get sections error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/sections - Create new section
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    const { contentType, contentId, ...sectionData } = body

    if (!contentType || !contentId) {
      return NextResponse.json(
        { error: 'contentType and contentId are required' },
        { status: 400 }
      )
    }

    // Create section using section editor service
    const section = await sectionEditor.createSection(contentType, contentId, sectionData, user)

    // Invalidate cache
    const cacheKey = `sections:${contentType}:${contentId}`
    CacheManager.invalidateCourse(user, cacheKey)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'section',
      entityId: section.id,
      data: section,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create section error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
