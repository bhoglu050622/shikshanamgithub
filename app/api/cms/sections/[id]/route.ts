import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { sectionEditor } from '@/cms/lib/core/section-editor'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/sections/[id] - Get single section
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    // Check cache first
    const cached = CacheManager.getCourse(user, `section:${id}`)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from section editor service
    const section = await sectionEditor.getSection(id, user)
    
    // Cache the result
    CacheManager.setCourse(user, `section:${id}`, section)

    return NextResponse.json(section)
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get section error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/sections/[id] - Update section
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    // Update section using section editor service
    const updatedSection = await sectionEditor.updateSection(id, body, user)

    // Invalidate cache
    CacheManager.invalidateCourse(user, `section:${id}`)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: id,
      data: updatedSection,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(updatedSection)
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update section error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/sections/[id] - Delete section
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params

    // Delete section using section editor service
    await sectionEditor.deleteSection(id, user)

    // Invalidate cache
    CacheManager.invalidateCourse(user, `section:${id}`)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'section',
      entityId: id,
      data: { id },
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Delete section error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
