import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { WorkflowManager } from '@/cms/lib/workflow'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '@/cms/lib/audit'
import { UserRole, ContentType } from '@/cms/lib/generated/prisma'

// GET /api/cms/courses/[id] - Get single course
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { id } = params

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        lessons: {
          orderBy: { order: 'asc' },
          include: {
            creator: {
              select: { id: true, username: true, role: true },
            },
          },
        },
        seoMeta: true,
        packageCourses: {
          include: {
            package: {
              select: { id: true, title: true, slug: true },
            },
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Get revision history
    const revisions = await WorkflowManager.getRevisionHistory(ContentType.COURSE, id)

    return NextResponse.json({
      course,
      revisions,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get course error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/courses/[id] - Update course
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const { id } = params
    const body = await request.json()

    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const {
      title,
      subtitle,
      slug,
      shortDescription,
      longDescription,
      coverImage,
      gallery,
      duration,
      level,
      language,
      price,
      currency,
      tags,
      categories,
      isFeatured,
      seoMeta,
    } = body

    // Check if slug is unique (excluding current course)
    if (slug && slug !== course.slug) {
      const existingCourse = await prisma.course.findUnique({
        where: { slug },
      })

      if (existingCourse) {
        return NextResponse.json(
          { error: 'A course with this slug already exists' },
          { status: 400 }
        )
      }
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (subtitle !== undefined) updateData.subtitle = subtitle
    if (slug !== undefined) updateData.slug = slug
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription
    if (longDescription !== undefined) updateData.longDescription = longDescription
    if (coverImage !== undefined) updateData.coverImage = coverImage
    if (gallery !== undefined) updateData.gallery = gallery
    if (duration !== undefined) updateData.duration = duration
    if (level !== undefined) updateData.level = level
    if (language !== undefined) updateData.language = language
    if (price !== undefined) updateData.price = price
    if (currency !== undefined) updateData.currency = currency
    if (tags !== undefined) updateData.tags = tags
    if (categories !== undefined) updateData.categories = categories
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        ...updateData,
        seoMeta: seoMeta ? {
          upsert: {
            create: seoMeta,
            update: seoMeta,
          },
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        lessons: {
          orderBy: { order: 'asc' },
        },
        seoMeta: true,
      },
    })

    // Save as draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.COURSE,
      contentId: id,
      data: updatedCourse,
      user,
      request,
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.UPDATE,
      AUDIT_RESOURCES.COURSE,
      id,
      { changes: Object.keys(updateData) },
      request
    )

    return NextResponse.json(updatedCourse)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update course error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/courses/[id] - Delete course
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: true,
        packageCourses: true,
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Check if course is used in packages
    if (course.packageCourses.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete course that is part of packages' },
        { status: 400 }
      )
    }

    // Delete course and all related data
    await prisma.course.delete({
      where: { id },
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.DELETE,
      AUDIT_RESOURCES.COURSE,
      id,
      { title: course.title, lessonsCount: course.lessons.length },
      request
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Delete course error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
