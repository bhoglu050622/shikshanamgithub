import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { UserRole } from '@/cms/lib/generated/prisma'

// GET /api/cms/publishing/queue - Get publishing queue
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)

    // Get all content with publishing status
    const [courses, blogPosts, packages] = await Promise.all([
      prisma.course.findMany({
        where: {
          status: 'PUBLISHED'
        },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          creator: {
            select: {
              id: true,
              username: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.blogPost.findMany({
        where: {
          status: 'PUBLISHED'
        },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          creator: {
            select: {
              id: true,
              username: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.package.findMany({
        where: {
          status: 'PUBLISHED'
        },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          creator: {
            select: {
              id: true,
              username: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // Transform data to unified format
    const transformItem = (item: any, type: string) => ({
      id: item.id,
      title: item.title,
      type,
      status: item.scheduledPublishAt && item.status === 'DRAFT' ? 'scheduled' : 
              item.status === 'PUBLISHED' ? 'published' : 'draft',
      scheduledFor: item.scheduledPublishAt,
      publishedAt: item.publishedAt,
      author: item.creator,
      createdAt: item.createdAt
    })

    const allItems = [
      ...courses.map(item => transformItem(item, 'course')),
      ...blogPosts.map(item => transformItem(item, 'blog')),
      ...packages.map(item => transformItem(item, 'package'))
    ]

    // Group by status
    const queue = {
      scheduled: allItems.filter(item => item.status === 'scheduled'),
      publishing: [], // This would be populated by actual publishing jobs
      published: allItems.filter(item => item.status === 'published'),
      failed: [] // This would be populated by failed publishing jobs
    }

    return NextResponse.json(queue)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get publishing queue error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
