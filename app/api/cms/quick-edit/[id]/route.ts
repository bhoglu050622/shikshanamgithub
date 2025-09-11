import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { quickEditService } from '@/cms/lib/core/quick-edit'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/quick-edit/[id] - Get single quick edit item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    // Check cache first
    const cacheKey = `quick-edit-item:${id}`
    const cached = CacheManager.getCourse(user, cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from quick edit service
    const item = await quickEditService.getItem(id, user)
    
    // Cache the result
    CacheManager.setCourse(user, cacheKey, item)

    return NextResponse.json(item)
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get quick edit item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/quick-edit/[id] - Update single quick edit item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    const { value, metadata } = body

    if (value === undefined) {
      return NextResponse.json(
        { error: 'value is required' },
        { status: 400 }
      )
    }

    // Update quick edit item
    const item = await quickEditService.updateItem(id, { value, metadata }, user)

    // Invalidate cache
    const cacheKey = `quick-edit-item:${id}`
    CacheManager.invalidateCourse(user, cacheKey)
    
    // Also invalidate page-level cache
    const pageCacheKey = `quick-edit:${item.page}:${item.component}:${item.type}`
    CacheManager.invalidateCourse(user, pageCacheKey)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'quick_edit',
      entityId: id,
      data: item,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(item)
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update quick edit item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/quick-edit/[id] - Delete quick edit item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params

    // Get item before deletion for cache invalidation
    const item = await quickEditService.getItem(id, user)

    // Delete quick edit item
    await quickEditService.deleteItem(id, user)

    // Invalidate cache
    const cacheKey = `quick-edit-item:${id}`
    CacheManager.invalidateCourse(user, cacheKey)
    
    // Also invalidate page-level cache
    const pageCacheKey = `quick-edit:${item.page}:${item.component}:${item.type}`
    CacheManager.invalidateCourse(user, pageCacheKey)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'quick_edit',
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
    console.error('Delete quick edit item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
