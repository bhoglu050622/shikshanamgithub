import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { WorkflowManager } from '@/cms/lib/workflow'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '@/cms/lib/audit'
import { UserRole, ContentType, ContentStatus } from '@/cms/lib/generated/prisma'

// GET /api/cms/courses - List all courses
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') as ContentStatus | null
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          creator: {
            select: { id: true, username: true, role: true },
          },
          lessons: {
            select: { id: true, title: true, order: true },
            orderBy: { order: 'asc' },
          },
          seoMeta: true,
          _count: {
            select: { lessons: true },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.course.count({ where }),
    ])

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get courses error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/courses - Create new course
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    const {
      title,
      subtitle,
      slug,
      shortDescription,
      longDescription,
      coverImage,
      gallery = [],
      duration,
      level,
      language = 'en',
      price,
      currency = 'USD',
      tags = [],
      categories = [],
      isFeatured = false,
      seoMeta,
    } = body

    if (!title || !slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug is unique
    const existingCourse = await prisma.course.findUnique({
      where: { slug },
    })

    if (existingCourse) {
      return NextResponse.json(
        { error: 'A course with this slug already exists' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
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
        status: ContentStatus.DRAFT,
        createdById: user.id,
        seoMeta: seoMeta ? {
          create: seoMeta,
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    // Create initial draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.COURSE,
      contentId: course.id,
      data: course,
      user,
      request,
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.CREATE,
      AUDIT_RESOURCES.COURSE,
      course.id,
      { title, slug },
      request
    )

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create course error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
