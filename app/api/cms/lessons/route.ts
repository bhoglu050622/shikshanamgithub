import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentStatus, CourseLevel } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/lessons - List all lessons
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      status: searchParams.get('status') as ContentStatus | undefined,
      search: searchParams.get('search') || undefined,
      courseId: searchParams.get('courseId') || undefined,
      isPreview: searchParams.get('isPreview') === 'true' ? true : 
                 searchParams.get('isPreview') === 'false' ? false : undefined,
      creatorId: searchParams.get('creatorId') || undefined,
    }

    // Check cache first
    const cached = CacheManager.getLessons(user, options)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const result = await cms.lessons.getAll(options, user)
    
    // Cache the result
    CacheManager.setLessons(user, options, result)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get lessons error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/lessons - Create new lesson
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    // Create lesson using CMS service
    const lesson = await cms.lessons.create(body, user)

    // Invalidate cache
    CacheManager.invalidateLesson(user, lesson.id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'lesson',
      entityId: lesson.id,
      data: lesson,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(lesson, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create lesson error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
