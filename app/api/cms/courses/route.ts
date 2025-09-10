import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentStatus, CourseLevel } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/courses - List all courses
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      status: searchParams.get('status') as ContentStatus | undefined,
      search: searchParams.get('search') || undefined,
      level: searchParams.get('level') as CourseLevel | undefined,
      category: searchParams.get('category') || undefined,
      tags: searchParams.get('tags')?.split(',').filter(Boolean),
      isFeatured: searchParams.get('isFeatured') === 'true' ? true : 
                  searchParams.get('isFeatured') === 'false' ? false : undefined,
      creatorId: searchParams.get('creatorId') || undefined,
    }

    // Check cache first
    const cached = CacheManager.getCourses(user, options)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const result = await cms.courses.getAll(options, user)
    
    // Cache the result
    CacheManager.setCourses(user, options, result)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get courses error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    // Create course using CMS service
    const course = await cms.courses.create(body, user)

    // Invalidate cache
    CacheManager.invalidateCourse(user, course.id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'course',
      entityId: course.id,
      data: course,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create course error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
