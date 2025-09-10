import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

interface RouteParams {
  params: { id: string }
}

// GET /api/cms/media/[id] - Get specific media file
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    // Check cache first
    const cached = CacheManager.getMediaFile(user, id)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const media = await cms.media.getById(id, user)
    
    // Cache the result
    CacheManager.setMediaFile(user, id, media)

    return NextResponse.json(media)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get media error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/media/[id] - Update media metadata
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    // Update media using CMS service
    const media = await cms.media.update({ ...body, id }, user)

    // Invalidate cache
    CacheManager.invalidateMedia(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'media',
      entityId: id,
      data: media,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(media)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update media error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/media/[id] - Delete media file
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    // Delete media using CMS service
    await cms.media.delete(id, user)

    // Invalidate cache
    CacheManager.invalidateMedia(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'media',
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
    console.error('Delete media error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
