import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { UserRole } from '@/cms/lib/generated/prisma'

interface RouteParams {
  params: { id: string }
}

// POST /api/cms/publishing/[id]/publish - Publish content immediately
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.PUBLISHER)(request)
    const { id } = params

    // Find the content item
    const [course, blogPost, package_] = await Promise.all([
      prisma.course.findUnique({ where: { id } }),
      prisma.blogPost.findUnique({ where: { id } }),
      prisma.package.findUnique({ where: { id } })
    ])

    const contentItem = course || blogPost || package_
    const contentType = course ? 'course' : blogPost ? 'blog' : 'package'

    if (!contentItem) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }

    // Update status to published
    const updateData = {
      status: 'PUBLISHED' as const,
      publishedAt: new Date(),
      scheduledPublishAt: null
    }

    let updatedItem
    if (course) {
      updatedItem = await prisma.course.update({
        where: { id },
        data: updateData
      })
    } else if (blogPost) {
      updatedItem = await prisma.blogPost.update({
        where: { id },
        data: updateData
      })
    } else if (package_) {
      updatedItem = await prisma.package.update({
        where: { id },
        data: updateData
      })
    }

    return NextResponse.json({
      success: true,
      message: `${contentType} published successfully`,
      item: updatedItem
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Publish content error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
