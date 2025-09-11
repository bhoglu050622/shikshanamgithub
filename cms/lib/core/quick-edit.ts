// Quick Edit Service for Text, Colors, and Button Management
// Provides instant editing capabilities across all pages

import { prisma } from '../prisma'
import { AuthUser } from '../auth'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '../audit'
import { triggerCMSEvent } from './realtime'
import { CMSError, ValidationError, NotFoundError } from './types'
import { UserRole, QuickEditType } from '../generated/prisma'
import { v4 as uuidv4 } from 'uuid'

// Quick Edit Types
export interface QuickEditItem {
  id: string
  key: string
  type: QuickEditType
  page: string
  component: string
  element: string
  value: string
  defaultValue: string
  isActive: boolean
  metadata?: any
  createdAt: Date
  updatedAt: Date
  createdById: string
}

export interface CreateQuickEditItemData {
  key: string
  type: QuickEditType
  page: string
  component: string
  element: string
  value?: string
  defaultValue: string
  metadata?: any
}

export interface UpdateQuickEditItemData {
  value?: string
  metadata?: any
}

export interface BulkUpdateData {
  key: string
  value: string
  type?: QuickEditType
  page?: string
  component?: string
}

export interface LivePreviewChanges {
  [key: string]: {
    value: string
    type: QuickEditType
    cssProperty?: string
  }
}

// Quick Edit Service
export class QuickEditService {
  // Get all quick edit items with optional filtering
  async getItems(
    filters: {
      page?: string | null
      component?: string | null
      type?: QuickEditType | null
    },
    user: AuthUser
  ): Promise<QuickEditItem[]> {
    await this.requireAuth(user, UserRole.VIEWER)

    const where: any = {
      isActive: true
    }

    if (filters.page) {
      where.page = filters.page
    }

    if (filters.component) {
      where.component = filters.component
    }

    if (filters.type) {
      where.type = filters.type
    }

    const items = await prisma.quickEditItem.findMany({
      where,
      orderBy: [
        { page: 'asc' },
        { component: 'asc' },
        { element: 'asc' }
      ]
    })

    return items as QuickEditItem[]
  }

  // Get a single quick edit item
  async getItem(itemId: string, user: AuthUser): Promise<QuickEditItem> {
    await this.requireAuth(user, UserRole.VIEWER)

    const item = await prisma.quickEditItem.findUnique({
      where: { id: itemId }
    })

    if (!item) {
      throw new NotFoundError('QuickEditItem', itemId)
    }

    return item as QuickEditItem
  }

  // Get item by key
  async getItemByKey(key: string, user: AuthUser): Promise<QuickEditItem | null> {
    await this.requireAuth(user, UserRole.VIEWER)

    const item = await prisma.quickEditItem.findUnique({
      where: { key }
    })

    return item as QuickEditItem | null
  }

  // Create a new quick edit item
  async createItem(
    data: CreateQuickEditItemData,
    user: AuthUser
  ): Promise<QuickEditItem> {
    await this.requireAuth(user, UserRole.EDITOR)

    // Check if key already exists
    const existing = await prisma.quickEditItem.findUnique({
      where: { key: data.key }
    })

    if (existing) {
      throw new ValidationError(`Quick edit item with key "${data.key}" already exists`)
    }

    const item = await prisma.quickEditItem.create({
      data: {
        ...data,
        value: data.value || data.defaultValue,
        createdById: user.id
      }
    })

    await this.logAction(user, AUDIT_ACTIONS.CREATE, 'QUICK_EDIT_ITEM', item.id, {
      key: data.key,
      type: data.type,
      page: data.page,
      component: data.component
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'quick_edit',
      entityId: item.id,
      data: item,
      timestamp: new Date(),
      userId: user.id
    })

    return item as QuickEditItem
  }

  // Update a quick edit item
  async updateItem(
    itemId: string,
    data: UpdateQuickEditItemData,
    user: AuthUser
  ): Promise<QuickEditItem> {
    await this.requireAuth(user, UserRole.EDITOR)

    const existingItem = await prisma.quickEditItem.findUnique({
      where: { id: itemId }
    })

    if (!existingItem) {
      throw new NotFoundError('QuickEditItem', itemId)
    }

    // Create revision before updating
    await this.createRevision(existingItem.id, existingItem.value, user)

    const updatedItem = await prisma.quickEditItem.update({
      where: { id: itemId },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'QUICK_EDIT_ITEM', itemId, {
      key: existingItem.key,
      type: existingItem.type,
      page: existingItem.page,
      component: existingItem.component,
      changes: Object.keys(data)
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'quick_edit',
      entityId: itemId,
      data: updatedItem,
      timestamp: new Date(),
      userId: user.id
    })

    return updatedItem as QuickEditItem
  }

  // Update item by key (for quick updates)
  async updateItemByKey(
    key: string,
    value: string,
    user: AuthUser
  ): Promise<QuickEditItem> {
    await this.requireAuth(user, UserRole.EDITOR)

    const existingItem = await prisma.quickEditItem.findUnique({
      where: { key }
    })

    if (!existingItem) {
      throw new NotFoundError('QuickEditItem', key)
    }

    // Create revision before updating
    await this.createRevision(existingItem.id, existingItem.value, user)

    const updatedItem = await prisma.quickEditItem.update({
      where: { key },
      data: {
        value,
        updatedAt: new Date()
      }
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'QUICK_EDIT_ITEM', existingItem.id, {
      key,
      type: existingItem.type,
      page: existingItem.page,
      component: existingItem.component,
      operation: 'update_by_key'
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'quick_edit',
      entityId: existingItem.id,
      data: updatedItem,
      timestamp: new Date(),
      userId: user.id
    })

    return updatedItem as QuickEditItem
  }

  // Bulk update multiple items
  async bulkUpdate(
    updates: BulkUpdateData[],
    user: AuthUser
  ): Promise<QuickEditItem[]> {
    await this.requireAuth(user, UserRole.EDITOR)

    const results: QuickEditItem[] = []

    for (const update of updates) {
      try {
        const updatedItem = await this.updateItemByKey(update.key, update.value, user)
        results.push(updatedItem)
      } catch (error) {
        console.error(`Failed to update item with key ${update.key}:`, error)
        // Continue with other updates
      }
    }

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, 'QUICK_EDIT_ITEM', 'bulk', {
      operation: 'bulk_update',
      updateCount: updates.length,
      successCount: results.length
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'quick_edit',
      entityId: 'bulk',
      data: { updates: results },
      timestamp: new Date(),
      userId: user.id
    })

    return results
  }

  // Delete a quick edit item
  async deleteItem(itemId: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.EDITOR)

    const item = await prisma.quickEditItem.findUnique({
      where: { id: itemId }
    })

    if (!item) {
      throw new NotFoundError('QuickEditItem', itemId)
    }

    await prisma.quickEditItem.delete({
      where: { id: itemId }
    })

    await this.logAction(user, AUDIT_ACTIONS.DELETE, 'QUICK_EDIT_ITEM', itemId, {
      key: item.key,
      type: item.type,
      page: item.page,
      component: item.component
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'quick_edit',
      entityId: itemId,
      data: { id: itemId },
      timestamp: new Date(),
      userId: user.id
    })
  }

  // Create live preview token
  async createLivePreviewToken(
    page: string,
    changes: LivePreviewChanges,
    user: AuthUser
  ): Promise<string> {
    await this.requireAuth(user, UserRole.EDITOR)

    const token = uuidv4()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.livePreviewToken.create({
      data: {
        token,
        page,
        changes: changes as any,
        expiresAt,
        createdById: user.id
      }
    })

    await this.logAction(user, AUDIT_ACTIONS.CREATE, 'LIVE_PREVIEW_TOKEN', token, {
      page,
      changeCount: Object.keys(changes).length
    })

    return token
  }

  // Get live preview changes
  async getLivePreviewChanges(token: string): Promise<LivePreviewChanges | null> {
    const preview = await prisma.livePreviewToken.findUnique({
      where: { token }
    })

    if (!preview || preview.expiresAt < new Date()) {
      return null
    }

    return preview.changes as LivePreviewChanges
  }

  // Update live preview changes
  async updateLivePreviewChanges(
    token: string,
    changes: LivePreviewChanges,
    user: AuthUser
  ): Promise<boolean> {
    await this.requireAuth(user, UserRole.EDITOR)

    const preview = await prisma.livePreviewToken.findUnique({
      where: { token }
    })

    if (!preview || preview.expiresAt < new Date()) {
      return false
    }

    await prisma.livePreviewToken.update({
      where: { token },
      data: {
        changes: changes as any
      }
    })

    return true
  }

  // Get all items for a specific page (for rendering)
  async getPageItems(page: string): Promise<QuickEditItem[]> {
    const items = await prisma.quickEditItem.findMany({
      where: {
        page,
        isActive: true
      },
      orderBy: [
        { component: 'asc' },
        { element: 'asc' }
      ]
    })

    return items as QuickEditItem[]
  }

  // Get items by component
  async getComponentItems(page: string, component: string): Promise<QuickEditItem[]> {
    const items = await prisma.quickEditItem.findMany({
      where: {
        page,
        component,
        isActive: true
      },
      orderBy: { element: 'asc' }
    })

    return items as QuickEditItem[]
  }

  // Reset item to default value
  async resetToDefault(itemId: string, user: AuthUser): Promise<QuickEditItem> {
    await this.requireAuth(user, UserRole.EDITOR)

    const item = await prisma.quickEditItem.findUnique({
      where: { id: itemId }
    })

    if (!item) {
      throw new NotFoundError('QuickEditItem', itemId)
    }

    return await this.updateItem(itemId, { value: item.defaultValue }, user)
  }

  // Get revision history for an item
  async getItemRevisions(itemId: string, user: AuthUser): Promise<any[]> {
    await this.requireAuth(user, UserRole.VIEWER)

    const revisions = await prisma.quickEditRevision.findMany({
      where: { itemId },
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            role: true
          }
        }
      }
    })

    return revisions
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

  private async createRevision(
    itemId: string,
    value: string,
    user: AuthUser
  ): Promise<void> {
    try {
      await prisma.quickEditRevision.create({
        data: {
          itemId,
          value,
          changeType: 'update',
          createdById: user.id
        }
      })
    } catch (error) {
      // Log error but don't fail the main operation
      console.error('Failed to create quick edit revision:', error)
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
export const quickEditService = new QuickEditService()
