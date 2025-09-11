import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/cms/lib/auth'
import { quickEditService } from '@/cms/lib/core/quick-edit'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole, QuickEditType } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/quick-edit - Get all quick edit items for a page
export async function GET(request: NextRequest) {
  try {
    // Development bypass or fallback when database is not available
    if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      // Return sample data for development/testing
      const sampleItems = [
        {
          id: '1',
          key: 'homepage.hero.title',
          type: 'TEXT',
          page: 'homepage',
          component: 'Hero',
          element: 'title',
          value: 'Welcome to Shikshanam',
          defaultValue: 'Welcome to Shikshanam',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          key: 'homepage.hero.subtitle',
          type: 'TEXT',
          page: 'homepage',
          component: 'Hero',
          element: 'subtitle',
          value: 'Where AI meets Ancient India',
          defaultValue: 'Where AI meets Ancient India',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          key: 'homepage.hero.cta.primary',
          type: 'BUTTON_LABEL',
          page: 'homepage',
          component: 'Hero',
          element: 'cta-primary',
          value: 'School of Sanskrit',
          defaultValue: 'School of Sanskrit',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          key: 'homepage.hero.cta.primary.color',
          type: 'BUTTON_COLOR',
          page: 'homepage',
          component: 'Hero',
          element: 'cta-primary-color',
          value: '#3B82F6',
          defaultValue: '#3B82F6',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      return NextResponse.json(sampleItems)
    }
    
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const page = searchParams.get('page')
    const component = searchParams.get('component')
    const type = searchParams.get('type') as QuickEditType

    // Check cache first
    const cacheKey = `quick-edit:${page || 'all'}:${component || 'all'}:${type || 'all'}`
    const cached = CacheManager.getCourse(user, cacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from quick edit service
    const items = await quickEditService.getItems({ page, component, type }, user)
    
    // Cache the result
    CacheManager.setCourse(user, cacheKey, items)

    return NextResponse.json(items)
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get quick edit items error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/quick-edit - Create new quick edit item
export async function POST(request: NextRequest) {
  try {
    // Development bypass or fallback when database is not available
    if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, id: 'dev-item' }, { status: 201 })
    }
    
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    const { key, type, page, component, element, value, defaultValue, metadata } = body

    if (!key || !type || !page || !component || !element) {
      return NextResponse.json(
        { error: 'key, type, page, component, and element are required' },
        { status: 400 }
      )
    }

    // Create quick edit item
    const item = await quickEditService.createItem({
      key,
      type,
      page,
      component,
      element,
      value: value || defaultValue,
      defaultValue,
      metadata
    }, user)

    // Invalidate cache
    const cacheKey = `quick-edit:${page}:${component}:${type}`
    CacheManager.invalidateCourse(user, cacheKey)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'quick_edit',
      entityId: item.id,
      data: item,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Create quick edit item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/quick-edit - Bulk update quick edit items
export async function PUT(request: NextRequest) {
  try {
    // Development bypass or fallback when database is not available
    if (process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      return NextResponse.json({ success: true, results: [] })
    }
    
    const user = await requireAuth(UserRole.EDITOR)(request)
    const body = await request.json()

    const { updates } = body

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'updates must be an array' },
        { status: 400 }
      )
    }

    // Bulk update items
    const results = await quickEditService.bulkUpdate(updates, user)

    // Invalidate all related caches
    const pages = [...new Set(updates.map(u => u.page))]
    const components = [...new Set(updates.map(u => u.component))]
    const types = [...new Set(updates.map(u => u.type))]

    for (const page of pages) {
      for (const component of components) {
        for (const type of types) {
          const cacheKey = `quick-edit:${page}:${component}:${type}`
          CacheManager.invalidateCourse(user, cacheKey)
        }
      }
    }

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'quick_edit',
      entityId: 'bulk',
      data: { updates: results },
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json({ success: true, results })
  } catch (error) {
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Bulk update quick edit items error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
