import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'
import { triggerCMSEvent } from '@/cms/lib/core/realtime'
import { UserRole } from '@/cms/lib/generated/prisma'
import { CMSError } from '@/cms/lib/core/types'

// GET /api/cms/media - List all media files
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    
    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      search: searchParams.get('search') || undefined,
      mimeType: searchParams.get('type') || undefined, // image, video, audio, document
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc',
    }

    // Check cache first
    const cached = CacheManager.getMediaList(user, options)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Fetch from CMS service
    const result = await cms.media.getAll(options, user)
    
    // Cache the result
    CacheManager.setMediaList(user, options, result)

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get media error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/cms/media - Upload new media file
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.EDITOR)(request)
    
    // Handle file upload
    const formData = await request.formData()
    const file = formData.get('file') as File
    const metadata = JSON.parse(formData.get('metadata') as string || '{}')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Note: MediaService.create not implemented, using basic file handling
    // In a real implementation, this would save to storage and database
    const media = {
      id: `media-${Date.now()}`,
      filename: file.name,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url: `/uploads/${file.name}`, // Placeholder URL
      alt: metadata.alt || '',
      caption: metadata.caption || '',
      tags: metadata.tags || [],
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' :
            file.type.startsWith('audio/') ? 'audio' : 'document',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedBy: {
        id: user.id,
        username: user.username || 'Unknown'
      }
    }

    // Invalidate cache
    CacheManager.invalidateMedia(user, media.id)

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'media',
      entityId: media.id,
      data: media,
      timestamp: new Date(),
      userId: user.id
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    if (error instanceof CMSError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Upload media error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
