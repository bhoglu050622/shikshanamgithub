import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { WorkflowManager } from '@/cms/lib/workflow'
import { UserRole } from '@/cms/lib/generated/prisma'

// POST /api/cms/workflow/[revisionId] - Workflow actions
export async function POST(
  request: NextRequest,
  { params }: { params: { revisionId: string } }
) {
  try {
    const { revisionId } = params
    const body = await request.json()
    const { action, reviewNotes } = body

    switch (action) {
      case 'submit_review': {
        const user = await requireAuth(UserRole.EDITOR)(request)
        const revision = await WorkflowManager.submitForReview({
          revisionId,
          user,
          request,
        })
        return NextResponse.json(revision)
      }

      case 'approve': {
        const user = await requireAuth(UserRole.REVIEWER)(request)
        const revision = await WorkflowManager.approveRevision({
          revisionId,
          user,
          reviewNotes,
          request,
        })
        return NextResponse.json(revision)
      }

      case 'reject': {
        const user = await requireAuth(UserRole.REVIEWER)(request)
        if (!reviewNotes) {
          return NextResponse.json(
            { error: 'Review notes are required for rejection' },
            { status: 400 }
          )
        }
        const revision = await WorkflowManager.rejectRevision({
          revisionId,
          user,
          reviewNotes,
          request,
        })
        return NextResponse.json(revision)
      }

      case 'publish': {
        const user = await requireAuth(UserRole.PUBLISHER)(request)
        const result = await WorkflowManager.publishRevision({
          revisionId,
          user,
          request,
        })
        return NextResponse.json(result)
      }

      case 'rollback': {
        const user = await requireAuth(UserRole.PUBLISHER)(request)
        const result = await WorkflowManager.rollbackToRevision({
          revisionId,
          user,
          request,
        })
        return NextResponse.json(result)
      }

      case 'generate_preview': {
        const user = await requireAuth(UserRole.EDITOR)(request)
        const previewData = await WorkflowManager.generatePreviewToken({
          revisionId,
          user,
          request,
        })
        return NextResponse.json(previewData)
      }

      default:
        return NextResponse.json(
          { error: 'Invalid workflow action' },
          { status: 400 }
        )
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Workflow action error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
