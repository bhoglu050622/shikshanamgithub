import { prisma } from './prisma'
import { AuthUser } from './auth'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from './audit'
import { ContentType, RevisionStatus, ContentStatus } from './generated/prisma'
import { v4 as uuidv4 } from 'uuid'

export interface WorkflowData {
  contentType: ContentType
  contentId: string
  data: any
  user: AuthUser
  action: 'save_draft' | 'submit_review' | 'approve' | 'reject' | 'publish' | 'rollback'
  reviewNotes?: string
  request?: Request
}

export interface PreviewTokenData {
  token: string
  expiresAt: Date
  url: string
}

export class WorkflowManager {
  // Save draft - creates or updates a draft revision
  static async saveDraft(params: {
    contentType: ContentType
    contentId: string
    data: any
    user: AuthUser
    request?: Request
  }): Promise<{ revision: any; autoSaved: boolean }> {
    const { contentType, contentId, data, user, request } = params

    // Get the latest draft revision or create a new one
    const existingDraft = await prisma.revision.findFirst({
      where: {
        contentType,
        contentId,
        status: RevisionStatus.DRAFT,
      },
      orderBy: { version: 'desc' },
    })

    let revision

    if (existingDraft) {
      // Update existing draft
      revision = await prisma.revision.update({
        where: { id: existingDraft.id },
        data: {
          data,
          createdAt: new Date(), // Update timestamp for auto-save tracking
        },
      })
    } else {
      // Create new draft revision
      const nextVersion = await this.getNextVersion(contentType, contentId)
      
      revision = await prisma.revision.create({
        data: {
          contentType,
          contentId,
          version: nextVersion,
          data,
          status: RevisionStatus.DRAFT,
          createdById: user.id,
        },
      })
    }

    // Log the action
    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.SAVE_DRAFT,
      this.getResourceFromContentType(contentType),
      contentId,
      { version: revision.version },
      request
    )

    return { revision, autoSaved: !existingDraft }
  }

  // Submit for review
  static async submitForReview(params: {
    revisionId: string
    user: AuthUser
    request?: Request
  }): Promise<any> {
    const { revisionId, user, request } = params

    const revision = await prisma.revision.update({
      where: { id: revisionId },
      data: {
        status: RevisionStatus.PENDING_REVIEW,
      },
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.SUBMIT_REVIEW,
      this.getResourceFromContentType(revision.contentType),
      revision.contentId,
      { version: revision.version, revisionId },
      request
    )

    return revision
  }

  // Approve revision
  static async approveRevision(params: {
    revisionId: string
    user: AuthUser
    reviewNotes?: string
    request?: Request
  }): Promise<any> {
    const { revisionId, user, reviewNotes, request } = params

    const revision = await prisma.revision.update({
      where: { id: revisionId },
      data: {
        status: RevisionStatus.APPROVED,
        reviewedById: user.id,
        reviewNotes,
      },
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.APPROVE,
      this.getResourceFromContentType(revision.contentType),
      revision.contentId,
      { version: revision.version, revisionId, reviewNotes },
      request
    )

    return revision
  }

  // Reject revision
  static async rejectRevision(params: {
    revisionId: string
    user: AuthUser
    reviewNotes: string
    request?: Request
  }): Promise<any> {
    const { revisionId, user, reviewNotes, request } = params

    const revision = await prisma.revision.update({
      where: { id: revisionId },
      data: {
        status: RevisionStatus.NEEDS_CHANGES,
        reviewedById: user.id,
        reviewNotes,
      },
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.REJECT,
      this.getResourceFromContentType(revision.contentType),
      revision.contentId,
      { version: revision.version, revisionId, reviewNotes },
      request
    )

    return revision
  }

  // Publish revision - applies the revision data to the main content record
  static async publishRevision(params: {
    revisionId: string
    user: AuthUser
    request?: Request
  }): Promise<{ revision: any; content: any }> {
    const { revisionId, user, request } = params

    const revision = await prisma.revision.findUnique({
      where: { id: revisionId },
    })

    if (!revision) {
      throw new Error('Revision not found')
    }

    if (revision.status !== RevisionStatus.APPROVED) {
      throw new Error('Only approved revisions can be published')
    }

    // Start a transaction to atomically update both revision and content
    const result = await prisma.$transaction(async (tx) => {
      // Update the revision status
      const updatedRevision = await tx.revision.update({
        where: { id: revisionId },
        data: {
          status: RevisionStatus.PUBLISHED,
          publishedById: user.id,
          publishedAt: new Date(),
        },
      })

      // Apply the revision data to the main content record
      const content = await this.applyRevisionToContent(
        tx,
        revision.contentType,
        revision.contentId,
        revision.data
      )

      return { revision: updatedRevision, content }
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.PUBLISH,
      this.getResourceFromContentType(revision.contentType),
      revision.contentId,
      { version: revision.version, revisionId },
      request
    )

    // TODO: Trigger post-publish actions (CDN purge, search reindex, etc.)
    await this.triggerPostPublishActions(revision.contentType, revision.contentId)

    return result
  }

  // Rollback to a previous revision
  static async rollbackToRevision(params: {
    revisionId: string
    user: AuthUser
    request?: Request
  }): Promise<{ revision: any; content: any }> {
    const { revisionId, user, request } = params

    const targetRevision = await prisma.revision.findUnique({
      where: { id: revisionId },
    })

    if (!targetRevision || targetRevision.status !== RevisionStatus.PUBLISHED) {
      throw new Error('Can only rollback to published revisions')
    }

    // Create a new revision with the rollback data
    const nextVersion = await this.getNextVersion(
      targetRevision.contentType,
      targetRevision.contentId
    )

    const result = await prisma.$transaction(async (tx) => {
      // Create new revision with rollback data
      const rollbackRevision = await tx.revision.create({
        data: {
          contentType: targetRevision.contentType,
          contentId: targetRevision.contentId,
          version: nextVersion,
          data: targetRevision.data as any,
          status: RevisionStatus.PUBLISHED,
          createdById: user.id,
          publishedById: user.id,
          publishedAt: new Date(),
        },
      })

      // Apply the rollback data to the main content record
      const content = await this.applyRevisionToContent(
        tx,
        targetRevision.contentType,
        targetRevision.contentId,
        targetRevision.data
      )

      return { revision: rollbackRevision, content }
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.ROLLBACK,
      this.getResourceFromContentType(targetRevision.contentType),
      targetRevision.contentId,
      { 
        version: result.revision.version,
        rollbackToVersion: targetRevision.version,
        revisionId: result.revision.id,
      },
      request
    )

    await this.triggerPostPublishActions(targetRevision.contentType, targetRevision.contentId)

    return result
  }

  // Generate preview token
  static async generatePreviewToken(params: {
    revisionId: string
    user: AuthUser
    request?: Request
  }): Promise<PreviewTokenData> {
    const { revisionId, user, request } = params

    const token = uuidv4()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.revision.update({
      where: { id: revisionId },
      data: {
        previewToken: token,
        previewExpiresAt: expiresAt,
      },
    })

    const revision = await prisma.revision.findUnique({
      where: { id: revisionId },
    })

    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.GENERATE_PREVIEW,
      this.getResourceFromContentType(revision!.contentType),
      revision!.contentId,
      { version: revision!.version, revisionId, previewToken: token },
      request
    )

    const url = `/preview/${token}`

    return { token, expiresAt, url }
  }

  // Get revision history
  static async getRevisionHistory(contentType: ContentType, contentId: string) {
    return prisma.revision.findMany({
      where: { contentType, contentId },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        reviewer: {
          select: { id: true, username: true, role: true },
        },
        publisher: {
          select: { id: true, username: true, role: true },
        },
      },
      orderBy: { version: 'desc' },
    })
  }

  // Private helper methods
  private static async getNextVersion(contentType: ContentType, contentId: string): Promise<number> {
    const lastRevision = await prisma.revision.findFirst({
      where: { contentType, contentId },
      orderBy: { version: 'desc' },
    })

    return (lastRevision?.version || 0) + 1
  }

  private static async applyRevisionToContent(
    tx: any,
    contentType: ContentType,
    contentId: string,
    data: any
  ): Promise<any> {
    const updateData = {
      ...data,
      status: ContentStatus.PUBLISHED,
      updatedAt: new Date(),
    }

    switch (contentType) {
      case ContentType.COURSE:
        return tx.course.update({
          where: { id: contentId },
          data: updateData,
        })
      
      case ContentType.LESSON:
        return tx.lesson.update({
          where: { id: contentId },
          data: updateData,
        })
      
      case ContentType.PACKAGE:
        return tx.package.update({
          where: { id: contentId },
          data: updateData,
        })
      
      case ContentType.BLOG_POST:
        return tx.blogPost.update({
          where: { id: contentId },
          data: updateData,
        })
      
      case ContentType.PAGE:
        return tx.page.update({
          where: { id: contentId },
          data: updateData,
        })
      
      default:
        throw new Error(`Unknown content type: ${contentType}`)
    }
  }

  private static getResourceFromContentType(contentType: ContentType): string {
    switch (contentType) {
      case ContentType.COURSE: return AUDIT_RESOURCES.COURSE
      case ContentType.LESSON: return AUDIT_RESOURCES.LESSON
      case ContentType.PACKAGE: return AUDIT_RESOURCES.PACKAGE
      case ContentType.BLOG_POST: return AUDIT_RESOURCES.BLOG_POST
      case ContentType.PAGE: return AUDIT_RESOURCES.PAGE
      default: return 'unknown'
    }
  }

  private static async triggerPostPublishActions(contentType: ContentType, contentId: string): Promise<void> {
    // TODO: Implement post-publish actions
    // - CDN cache purge
    // - Search index update
    // - Sitemap regeneration
    // - Webhook notifications
    console.log(`Post-publish actions triggered for ${contentType}:${contentId}`)
  }
}

// Preview utilities
export class PreviewManager {
  static async getPreviewContent(token: string): Promise<any> {
    const revision = await prisma.revision.findUnique({
      where: { previewToken: token },
    })

    if (!revision || !revision.previewExpiresAt || revision.previewExpiresAt < new Date()) {
      throw new Error('Preview token expired or invalid')
    }

    return {
      contentType: revision.contentType,
      contentId: revision.contentId,
      data: revision.data,
      version: revision.version,
      status: revision.status,
    }
  }

  static async logPreviewView(token: string, request?: Request): Promise<void> {
    try {
      await AuditLogger.log({
        userId: 'anonymous',
        action: AUDIT_ACTIONS.VIEW_PREVIEW,
        resource: 'preview',
        resourceId: token,
        ipAddress: request?.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request?.headers.get('user-agent') || 'unknown',
      })
    } catch (error) {
      console.error('Failed to log preview view:', error)
    }
  }
}
