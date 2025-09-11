import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentType } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/lessons/[id] - Get single lesson
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    // Check cache first
    const cached = CacheManager.getLesson(user, id)
    if (cached) {
      return NextResponse.json({ lesson: cached })
    }

    // Fetch from CMS service
    const lesson = await cms.lessons.getById(id, user)
    
    // Cache the result
    CacheManager.setLesson(user, id, lesson)

    // Get revision history
    const revisions = await cms.revisions.getHistory(ContentType.LESSON, id, user)

    return NextResponse.json({
      lesson,
      revisions,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get lesson error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/lessons/[id] - Update lesson
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    // Update lesson using CMS service
    const updatedLesson = await cms.lessons.update({ id, ...body }, user)

    // Invalidate cache
    CacheManager.invalidateLesson(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'lesson',
      entityId: id,
      data: updatedLesson,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(updatedLesson)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update lesson error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/lessons/[id] - Delete lesson
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    // Delete lesson using CMS service
    await cms.lessons.delete(id, user)

    // Invalidate cache
    CacheManager.invalidateLesson(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'lesson',
      entityId: id,
      data: { id },
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Delete lesson error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
