import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, ContentStatus } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/packages - List all packages
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
      category: searchParams.get('category') || undefined,
      isFeatured: searchParams.get('isFeatured') === 'true' ? true : 
                  searchParams.get('isFeatured') === 'false' ? false : undefined,
      creatorId: searchParams.get('creatorId') || undefined,
    }

    // Check cache first
    const cached = CacheManager.getPackages(user, options)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const result = await cms.packages.getAll(options, user)
    
    // Cache the result
    CacheManager.setPackages(user, options, result)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get packages error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/packages - Create new package
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    // Create package using CMS service
    const package_ = await cms.packages.create(body, user)

    // Invalidate cache
    CacheManager.invalidatePackage(user, package_.id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'package',
      entityId: package_.id,
      data: package_,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(package_, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create package error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
