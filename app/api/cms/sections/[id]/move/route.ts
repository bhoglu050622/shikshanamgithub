import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { sectionEditor } from '@/cms/lib/core/section-editor'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// PUT /api/cms/sections/[id]/move - Move section to new position
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    const { newOrder } = body

    if (typeof newOrder !== 'number' || newOrder < 1) {
      return NextResponse.json(
        { error: 'newOrder must be a positive number' },
        { status: 400 }
      )
    }

    // Move section using section editor service
    const updatedSections = await sectionEditor.moveSection(id, newOrder, user)

    // Invalidate cache for the content
    const section = await sectionEditor.getSection(id, user)
    const cacheKey = `sections:${section.contentType}:${section.contentId}`
    CacheManager.invalidateCourse(user, cacheKey)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: id,
      data: { operation: 'move', newOrder },
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json({ sections: updatedSections, success: true })
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Move section error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
