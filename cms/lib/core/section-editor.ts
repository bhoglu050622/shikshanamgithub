// Section-by-Section Editor for CMS
// Allows editing individual sections and bulk operations

import { prisma } from '../prisma'
import { AuthUser } from '../auth'
import { WorkflowManager } from '../workflow'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '../audit'
import { triggerCMSEvent } from './realtime'
import { CMSError, ValidationError, NotFoundError } from './types'
import { ContentType, UserRole } from '../generated/prisma'

// Section types
export interface ContentSection {
  id: string
  type: 'text' | 'image' | 'video' | 'quiz' | 'code' | 'quote' | 'list' | 'table'
  content: any
  order: number
  metadata?: {
    title?: string
    description?: string
    alt?: string
    caption?: string
    [key: string]: any
  }
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SectionEditOperation {
  sectionId: string
  operation: 'update' | 'delete' | 'reorder' | 'duplicate'
  data?: any
  newOrder?: number
}

export interface BulkEditOperation {
  operation: 'update' | 'delete' | 'reorder' | 'duplicate' | 'toggle_visibility'
  sectionIds: string[]
  data?: any
  newOrder?: number
}

// Section Editor Service
export class SectionEditorService {
  // Get all sections for a content item
  async getSections(
    contentType: ContentType,
    contentId: string,
    user: AuthUser
  ): Promise<ContentSection[]> {
    await this.requireAuth(user, UserRole.VIEWER)

    const sections = await prisma.contentSection.findMany({
      where: {
        contentType,
        contentId,
      },
      orderBy: { order: 'asc' },
    })

    return sections as ContentSection[]
  }

  // Get a single section
  async getSection(
    sectionId: string,
    user: AuthUser
  ): Promise<ContentSection> {
    await this.requireAuth(user, UserRole.VIEWER)

    const section = await prisma.contentSection.findUnique({
      where: { id: sectionId },
    })

    if (!section) {
      throw new NotFoundError('Section', sectionId)
    }

    return section as ContentSection
  }

  // Create a new section
  async createSection(
    contentType: ContentType,
    contentId: string,
    sectionData: Omit<ContentSection, 'id' | 'createdAt' | 'updatedAt'>,
    user: AuthUser
  ): Promise<ContentSection> {
    await this.requireAuth(user, UserRole.EDITOR)

    // Verify content exists
    await this.verifyContentExists(contentType, contentId)

    // Get next order number
    const lastSection = await prisma.contentSection.findFirst({
      where: { contentType, contentId },
      orderBy: { order: 'desc' },
    })

    const section = await prisma.contentSection.create({
      data: {
        ...sectionData,
        contentType,
        contentId,
        order: sectionData.order || (lastSection?.order || 0) + 1,
        createdById: user.id,
      },
    })

    // Create draft revision for the parent content
    await this.createContentRevision(contentType, contentId, user)

    await this.logAction(user, AUDIT_ACTIONS.CREATE, 'SECTION', section.id, {
      contentType,
      contentId,
      sectionType: sectionData.type,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'section',
      entityId: section.id,
      data: section,
      timestamp: new Date(),
      userId: user.id,
    })

    return section as ContentSection
  }

  // Update a single section
  async updateSection(
    sectionId: string,
    updateData: Partial<ContentSection>,
    user: AuthUser
  ): Promise<ContentSection> {
    await this.requireAuth(user, UserRole.EDITOR)

    const existingSection = await prisma.contentSection.findUnique({
      where: { id: sectionId },
    })

    if (!existingSection) {
      throw new NotFoundError('Section', sectionId)
    }

    const updatedSection = await prisma.contentSection.update({
      where: { id: sectionId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    })

    // Create draft revision for the parent content
    await this.createContentRevision(
      existingSection.contentType as ContentType,
      existingSection.contentId,
      user
    )

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'SECTION', sectionId, {
      contentType: existingSection.contentType,
      contentId: existingSection.contentId,
      changes: Object.keys(updateData),
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: sectionId,
      data: updatedSection,
      timestamp: new Date(),
      userId: user.id,
    })

    return updatedSection as ContentSection
  }

  // Delete a section
  async deleteSection(
    sectionId: string,
    user: AuthUser
  ): Promise<void> {
    await this.requireAuth(user, UserRole.EDITOR)

    const section = await prisma.contentSection.findUnique({
      where: { id: sectionId },
    })

    if (!section) {
      throw new NotFoundError('Section', sectionId)
    }

    await prisma.contentSection.delete({
      where: { id: sectionId },
    })

    // Reorder remaining sections
    await this.reorderSections(
      section.contentType as ContentType,
      section.contentId,
      user
    )

    // Create draft revision for the parent content
    await this.createContentRevision(
      section.contentType as ContentType,
      section.contentId,
      user
    )

    await this.logAction(user, AUDIT_ACTIONS.DELETE, 'SECTION', sectionId, {
      contentType: section.contentType,
      contentId: section.contentId,
      sectionType: section.type,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'section',
      entityId: sectionId,
      data: { id: sectionId },
      timestamp: new Date(),
      userId: user.id,
    })
  }

  // Reorder sections
  async reorderSections(
    contentType: ContentType,
    contentId: string,
    user: AuthUser
  ): Promise<ContentSection[]> {
    await this.requireAuth(user, UserRole.EDITOR)

    const sections = await prisma.contentSection.findMany({
      where: { contentType, contentId },
      orderBy: { order: 'asc' },
    })

    // Update order numbers
    const updatePromises = sections.map((section, index) =>
      prisma.contentSection.update({
        where: { id: section.id },
        data: { order: index + 1 },
      })
    )

    await Promise.all(updatePromises)

    // Create draft revision for the parent content
    await this.createContentRevision(contentType, contentId, user)

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'SECTION', contentId, {
      contentType,
      contentId,
      operation: 'reorder',
      sectionCount: sections.length,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: contentId,
      data: { operation: 'reorder', sectionCount: sections.length },
      timestamp: new Date(),
      userId: user.id,
    })

    return sections as ContentSection[]
  }

  // Move section to new position
  async moveSection(
    sectionId: string,
    newOrder: number,
    user: AuthUser
  ): Promise<ContentSection[]> {
    await this.requireAuth(user, UserRole.EDITOR)

    const section = await prisma.contentSection.findUnique({
      where: { id: sectionId },
    })

    if (!section) {
      throw new NotFoundError('Section', sectionId)
    }

    const allSections = await prisma.contentSection.findMany({
      where: {
        contentType: section.contentType as ContentType,
        contentId: section.contentId,
      },
      orderBy: { order: 'asc' },
    })

    // Remove the section from its current position
    const filteredSections = allSections.filter(s => s.id !== sectionId)
    
    // Insert at new position
    filteredSections.splice(newOrder - 1, 0, section)

    // Update all order numbers
    const updatePromises = filteredSections.map((s, index) =>
      prisma.contentSection.update({
        where: { id: s.id },
        data: { order: index + 1 },
      })
    )

    await Promise.all(updatePromises)

    // Create draft revision for the parent content
    await this.createContentRevision(
      section.contentType as ContentType,
      section.contentId,
      user
    )

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'SECTION', sectionId, {
      contentType: section.contentType,
      contentId: section.contentId,
      operation: 'move',
      newOrder,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: sectionId,
      data: { operation: 'move', newOrder },
      timestamp: new Date(),
      userId: user.id,
    })

    return filteredSections as ContentSection[]
  }

  // Duplicate a section
  async duplicateSection(
    sectionId: string,
    user: AuthUser
  ): Promise<ContentSection> {
    await this.requireAuth(user, UserRole.EDITOR)

    const originalSection = await prisma.contentSection.findUnique({
      where: { id: sectionId },
    })

    if (!originalSection) {
      throw new NotFoundError('Section', sectionId)
    }

    // Get next order number
    const lastSection = await prisma.contentSection.findFirst({
      where: {
        contentType: originalSection.contentType as ContentType,
        contentId: originalSection.contentId,
      },
      orderBy: { order: 'desc' },
    })

    const duplicatedSection = await prisma.contentSection.create({
      data: {
        type: originalSection.type,
        content: originalSection.content as any,
        order: (lastSection?.order || 0) + 1,
        metadata: originalSection.metadata as any,
        isVisible: originalSection.isVisible,
        contentType: originalSection.contentType as ContentType,
        contentId: originalSection.contentId,
        createdById: user.id,
      },
    })

    // Create draft revision for the parent content
    await this.createContentRevision(
      originalSection.contentType as ContentType,
      originalSection.contentId,
      user
    )

    await this.logAction(user, AUDIT_ACTIONS.CREATE, 'SECTION', duplicatedSection.id, {
      contentType: originalSection.contentType,
      contentId: originalSection.contentId,
      sectionType: originalSection.type,
      operation: 'duplicate',
      originalSectionId: sectionId,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'section',
      entityId: duplicatedSection.id,
      data: duplicatedSection,
      timestamp: new Date(),
      userId: user.id,
    })

    return duplicatedSection as ContentSection
  }

  // Bulk operations
  async bulkEditSections(
    contentType: ContentType,
    contentId: string,
    operations: BulkEditOperation[],
    user: AuthUser
  ): Promise<ContentSection[]> {
    await this.requireAuth(user, UserRole.EDITOR)

    const results: ContentSection[] = []

    for (const operation of operations) {
      switch (operation.operation) {
        case 'update':
          for (const sectionId of operation.sectionIds) {
            const updated = await this.updateSection(sectionId, operation.data, user)
            results.push(updated)
          }
          break

        case 'delete':
          for (const sectionId of operation.sectionIds) {
            await this.deleteSection(sectionId, user)
          }
          break

        case 'duplicate':
          for (const sectionId of operation.sectionIds) {
            const duplicated = await this.duplicateSection(sectionId, user)
            results.push(duplicated)
          }
          break

        case 'toggle_visibility':
          for (const sectionId of operation.sectionIds) {
            const section = await this.getSection(sectionId, user)
            const updated = await this.updateSection(
              sectionId,
              { isVisible: !section.isVisible },
              user
            )
            results.push(updated)
          }
          break

        case 'reorder':
          // Handle bulk reordering
          const sections = await this.getSections(contentType, contentId, user)
          const sectionMap = new Map(sections.map(s => [s.id, s]))
          
          for (let i = 0; i < operation.sectionIds.length; i++) {
            const sectionId = operation.sectionIds[i]
            const section = sectionMap.get(sectionId)
            if (section) {
              await prisma.contentSection.update({
                where: { id: sectionId },
                data: { order: operation.newOrder || i + 1 },
              })
            }
          }
          break
      }
    }

    // Reorder all sections after bulk operations
    await this.reorderSections(contentType, contentId, user)

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'SECTION', contentId, {
      contentType,
      contentId,
      operation: 'bulk_edit',
      operationCount: operations.length,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'section',
      entityId: contentId,
      data: { operation: 'bulk_edit', operationCount: operations.length },
      timestamp: new Date(),
      userId: user.id,
    })

    return results
  }

  // Toggle section visibility
  async toggleSectionVisibility(
    sectionId: string,
    user: AuthUser
  ): Promise<ContentSection> {
    await this.requireAuth(user, UserRole.EDITOR)

    const section = await this.getSection(sectionId, user)
    return await this.updateSection(
      sectionId,
      { isVisible: !section.isVisible },
      user
    )
  }

  // Get section statistics
  async getSectionStats(
    contentType: ContentType,
    contentId: string,
    user: AuthUser
  ): Promise<{
    totalSections: number
    visibleSections: number
    hiddenSections: number
    sectionsByType: Record<string, number>
  }> {
    await this.requireAuth(user, UserRole.VIEWER)

    const sections = await this.getSections(contentType, contentId, user)

    const stats = {
      totalSections: sections.length,
      visibleSections: sections.filter(s => s.isVisible).length,
      hiddenSections: sections.filter(s => !s.isVisible).length,
      sectionsByType: sections.reduce((acc, section) => {
        acc[section.type] = (acc[section.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    }

    return stats
  }

  // Private helper methods
  private async requireAuth(user: AuthUser, requiredRole: UserRole): Promise<void> {
    const roleHierarchy = {
      [UserRole.VIEWER]: 1,
      [UserRole.SUPPORT_MODERATOR]: 2,
      [UserRole.EDITOR]: 3,
      [UserRole.CONTENT_EDITOR]: 4,
      [UserRole.INSTRUCTOR]: 5,
      [UserRole.PUBLISHER]: 6,
      [UserRole.ADMIN]: 7,
    }

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      throw new CMSError('Insufficient permissions', 'FORBIDDEN', 403)
    }
  }

  private async verifyContentExists(contentType: ContentType, contentId: string): Promise<void> {
    let exists = false

    switch (contentType) {
      case ContentType.COURSE:
        exists = !!(await prisma.course.findUnique({ where: { id: contentId } }))
        break
      case ContentType.LESSON:
        exists = !!(await prisma.lesson.findUnique({ where: { id: contentId } }))
        break
      case ContentType.BLOG_POST:
        exists = !!(await prisma.blogPost.findUnique({ where: { id: contentId } }))
        break
      case ContentType.PACKAGE:
        exists = !!(await prisma.package.findUnique({ where: { id: contentId } }))
        break
      case ContentType.PAGE:
        exists = !!(await prisma.page.findUnique({ where: { id: contentId } }))
        break
    }

    if (!exists) {
      throw new NotFoundError(contentType, contentId)
    }
  }

  private async createContentRevision(
    contentType: ContentType,
    contentId: string,
    user: AuthUser
  ): Promise<void> {
    try {
      // Get the current content
      let content: any
      switch (contentType) {
        case ContentType.COURSE:
          content = await prisma.course.findUnique({ where: { id: contentId } })
          break
        case ContentType.LESSON:
          content = await prisma.lesson.findUnique({ where: { id: contentId } })
          break
        case ContentType.BLOG_POST:
          content = await prisma.blogPost.findUnique({ where: { id: contentId } })
          break
        case ContentType.PACKAGE:
          content = await prisma.package.findUnique({ where: { id: contentId } })
          break
        case ContentType.PAGE:
          content = await prisma.page.findUnique({ where: { id: contentId } })
          break
      }

      if (content) {
        await WorkflowManager.saveDraft({
          contentType,
          contentId,
          data: content,
          user,
        })
      }
    } catch (error) {
      // Log error but don't fail the section operation
      console.error('Failed to create content revision:', error)
    }
  }

  private async logAction(
    user: AuthUser,
    action: string,
    resource: string,
    resourceId: string,
    metadata?: any
  ): Promise<void> {
    await AuditLogger.logUserAction(user, action, resource, resourceId, metadata)
  }
}

// Export singleton instance
export const sectionEditor = new SectionEditorService()
