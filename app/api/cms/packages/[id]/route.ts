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

// GET /api/cms/packages/[id] - Get specific package
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    // Check cache first
    const cached = CacheManager.getPackage(user, id)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const package_ = await cms.packages.getById(id, user)
    
    // Cache the result
    CacheManager.setPackage(user, id, package_)

    return NextResponse.json(package_)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get package error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/packages/[id] - Update package
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    // Update package using CMS service
    const package_ = await cms.packages.update(id, body, user)

    // Invalidate cache
    CacheManager.invalidatePackage(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'package',
      entityId: id,
      data: package_,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(package_)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update package error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/packages/[id] - Delete package
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    // Delete package using CMS service
    await cms.packages.delete(id, user)

    // Invalidate cache
    CacheManager.invalidatePackage(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'package',
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
    console.error('Delete package error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
