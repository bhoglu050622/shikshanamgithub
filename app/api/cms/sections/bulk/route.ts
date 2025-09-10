import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { sectionEditor } from '@/cms/lib/core/section-editor'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentType } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'
import { BulkEditOperation } from '@/cms/lib/core/section-editor'

// POST /api/cms/sections/bulk - Bulk operations on sections
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    const { contentType, contentId, operations } = body

    if (!contentType || !contentId || !operations) {
      return NextResponse.json(
        { error: 'contentType, contentId, and operations are required' },
        { status: 400 }
      )
    }

    // Validate operations
    if (!Array.isArray(operations)) {
      return NextResponse.json(
        { error: 'Operations must be an array' },
        { status: 400 }
      )
    }

    // Perform bulk operations using section editor service
    const results = await sectionEditor.bulkEditSections(contentType, contentId, operations, user)

    // Invalidate cache
    const cacheKey = `sections:${contentType}:${contentId}`
    CacheManager.invalidateCourse(user, cacheKey)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: contentId,
      data: { operation: 'bulk_edit', operationCount: operations.length },
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json({ results, success: true })
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Bulk section operations error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
