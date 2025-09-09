import { NextRequest, NextResponse } from 'next/server'
import { PreviewManager } from '@/cms/lib/workflow'

// GET /api/cms/preview/[token] - Get preview content
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params
    
    const previewContent = await PreviewManager.getPreviewContent(token)
    
    // Log the preview view
    await PreviewManager.logPreviewView(token, request)

    return NextResponse.json(previewContent)
  } catch (error) {
    console.error('Preview error:', error)
    return NextResponse.json(
      { error: 'Preview not found or expired' },
      { status: 404 }
    )
  }
}
