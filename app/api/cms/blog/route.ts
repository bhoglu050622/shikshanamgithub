import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentStatus } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/blog - List all blog posts
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      status: searchParams.get('status') as ContentStatus | undefined,
      search: searchParams.get('search') || undefined,
      tags: searchParams.get('tags')?.split(',').filter(Boolean),
      series: searchParams.get('series') || undefined,
      authorId: searchParams.get('authorId') || undefined,
      creatorId: searchParams.get('creatorId') || undefined,
    }

    // Check cache first
    const cached = CacheManager.getBlogPosts(user, options)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const result = await cms.blogs.getAll(options, user)
    
    // Cache the result
    CacheManager.setBlogPosts(user, options, result)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get blog posts error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/blog - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    // Create blog post using CMS service
    const blogPost = await cms.blogs.create(body, user)

    // Invalidate cache
    CacheManager.invalidateBlogPost(user, blogPost.id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'blog',
      entityId: blogPost.id,
      data: blogPost,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create blog post error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
