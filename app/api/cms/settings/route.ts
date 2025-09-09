import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '@/cms/lib/audit'
import { UserRole } from '@/cms/lib/generated/prisma'

// GET /api/cms/settings - Get CMS settings
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)

    const settings = await prisma.settings.findUnique({
      where: { id: 'global' },
    })

    const defaultSettings = {
      siteName: 'Shikshanam',
      siteDescription: 'Ancient wisdom for modern living',
      logoLight: '/assets/logo-light.svg',
      logoDark: '/assets/logo-dark.svg',
      brandColors: {
        primary: '#ea580c', // orange-600
        secondary: '#f59e0b', // amber-500
      },
      defaultSEO: {
        title: 'Shikshanam - Ancient Wisdom for Modern Living',
        description: 'Learn Sanskrit, philosophy, and spiritual practices through comprehensive courses and guided learning.',
        keywords: 'sanskrit, philosophy, spirituality, vedanta, yoga, meditation',
        ogImage: '/assets/og-image.jpg',
      },
      analytics: {
        localStorageKey: 'analytics_queue_v1',
        endpointEnabled: true,
        endpoint: '/api/analytics/collect',
      },
      contact: {
        email: 'contact@shikshanam.com',
        phone: '',
        address: '',
      },
      social: {
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: '',
      },
      features: {
        registrationEnabled: true,
        commentsEnabled: true,
        ratingsEnabled: true,
        certificatesEnabled: true,
      },
    }

    const data = settings?.data ? { ...defaultSettings, ...(settings.data as Record<string, any>) } : defaultSettings

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get settings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/settings - Update CMS settings
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const body = await request.json()

    const settings = await prisma.settings.upsert({
      where: { id: 'global' },
      update: {
        data: body,
      },
      create: {
        id: 'global',
        data: body,
      },
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.UPDATE_SETTINGS,
      AUDIT_RESOURCES.SETTINGS,
      'global',
      { changedFields: Object.keys(body) },
      request
    )

    return NextResponse.json(settings.data)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update settings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
