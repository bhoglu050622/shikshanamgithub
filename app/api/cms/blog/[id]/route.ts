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

// GET /api/cms/blog/[id] - Get specific blog post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    // Check cache first
    const cached = CacheManager.getBlogPost(user, id)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const blogPost = await cms.blogs.getById(id, user)
    
    // Cache the result
    CacheManager.setBlogPost(user, id, blogPost)

    return NextResponse.json(blogPost)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get blog post error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/blog/[id] - Update blog post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    // Update blog post using CMS service
    const blogPost = await cms.blogs.update(id, body, user)

    // Invalidate cache
    CacheManager.invalidateBlogPost(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'blog',
      entityId: id,
      data: blogPost,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(blogPost)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update blog post error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/blog/[id] - Delete blog post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    // Delete blog post using CMS service
    await cms.blogs.delete(id, user)

    // Invalidate cache
    CacheManager.invalidateBlogPost(user, id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'blog',
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
    console.error('Delete blog post error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
