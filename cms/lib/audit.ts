import { prisma } from './prisma'
import { AuthUser } from './auth'

export interface AuditLogData {
  userId: string
  action: string
  resource: string
  resourceId?: string
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

export class AuditLogger {
  static async log(data: AuditLogData): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: data.userId,
          action: data.action,
          resource: data.resource,
          resourceId: data.resourceId,
          metadata: data.metadata,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      })
    } catch (error) {
      console.error('Failed to create audit log:', error)
      // Don't throw - audit logging should not break the application
    }
  }

  static async logUserAction(
    user: AuthUser,
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: Record<string, any>,
    request?: Request
  ): Promise<void> {
    const ipAddress = request?.headers.get('x-forwarded-for') || 
                     request?.headers.get('x-real-ip') ||
                     'unknown'
    
    const userAgent = request?.headers.get('user-agent') || 'unknown'

    await this.log({
      userId: user.id,
      action,
      resource,
      resourceId,
      metadata: {
        ...metadata,
        username: user.username,
        userRole: user.role,
      },
      ipAddress,
      userAgent,
    })
  }

  static async getAuditLogs(options: {
    limit?: number
    offset?: number
    userId?: string
    resource?: string
    action?: string
    dateFrom?: Date
    dateTo?: Date
  } = {}) {
    const {
      limit = 50,
      offset = 0,
      userId,
      resource,
      action,
      dateFrom,
      dateTo,
    } = options

    const where: any = {}

    if (userId) where.userId = userId
    if (resource) where.resource = resource
    if (action) where.action = action
    
    if (dateFrom || dateTo) {
      where.createdAt = {}
      if (dateFrom) where.createdAt.gte = dateFrom
      if (dateTo) where.createdAt.lte = dateTo
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              username: true,
              role: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.auditLog.count({ where }),
    ])

    return {
      logs,
      total,
      hasMore: offset + limit < total,
    }
  }
}

// Common audit actions
export const AUDIT_ACTIONS = {
  // Authentication
  LOGIN: 'login',
  LOGOUT: 'logout',
  LOGIN_FAILED: 'login_failed',
  PASSWORD_RESET: 'password_reset',
  
  // Content Management
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  
  // Workflow
  SAVE_DRAFT: 'save_draft',
  SUBMIT_REVIEW: 'submit_review',
  APPROVE: 'approve',
  REJECT: 'reject',
  PUBLISH: 'publish',
  UNPUBLISH: 'unpublish',
  ROLLBACK: 'rollback',
  
  // Preview
  GENERATE_PREVIEW: 'generate_preview',
  VIEW_PREVIEW: 'view_preview',
  
  // Media
  UPLOAD_MEDIA: 'upload_media',
  DELETE_MEDIA: 'delete_media',
  
  // Settings
  UPDATE_SETTINGS: 'update_settings',
  
  // Users
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DEACTIVATE_USER: 'deactivate_user',
  ACTIVATE_USER: 'activate_user',
} as const

// Common resource types
export const AUDIT_RESOURCES = {
  USER: 'user',
  COURSE: 'course',
  LESSON: 'lesson',
  PACKAGE: 'package',
  BLOG_POST: 'blog_post',
  PAGE: 'page',
  AUTHOR: 'author',
  MEDIA: 'media',
  SETTINGS: 'settings',
  SNIPPET: 'snippet',
  REDIRECT: 'redirect',
} as const
