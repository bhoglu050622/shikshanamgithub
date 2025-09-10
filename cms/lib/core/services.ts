// Centralized CMS Services
// All data operations flow through these services

import { prisma } from '../prisma'
import { AuthUser } from '../auth'
import { WorkflowManager } from '../workflow'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '../audit'
import { triggerCMSEvent } from './realtime'
import { 
  CMSCourse, 
  CMSLesson, 
  CMSPackage, 
  CMSBlogPost, 
  CMSPage, 
  CMSAuthor, 
  CMSMedia, 
  CMSRevision,
  PaginatedResponse,
  CMSResponse,
  QueryOptions,
  CourseQueryOptions,
  BlogQueryOptions,
  PackageQueryOptions,
  CreateCourseData,
  UpdateCourseData,
  CreateLessonData,
  UpdateLessonData,
  CreateBlogPostData,
  UpdateBlogPostData,
  CreatePackageData,
  UpdatePackageData,
  CMSError,
  NotFoundError,
  ValidationError,
  ContentStatus,
  ContentType,
  UserRole
} from './types'

// Base Service Class
abstract class BaseService {
  protected async requireAuth(user: AuthUser, requiredRole: UserRole = UserRole.VIEWER): Promise<void> {
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

  protected async logAction(
    user: AuthUser,
    action: string,
    resource: string,
    resourceId: string,
    metadata?: any
  ): Promise<void> {
    await AuditLogger.logUserAction(user, action, resource, resourceId, metadata)
  }
}

// Course Service
export class CourseService extends BaseService {
  async getAll(options: CourseQueryOptions = {}, user: AuthUser): Promise<PaginatedResponse<CMSCourse>> {
    await this.requireAuth(user, UserRole.VIEWER)

    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      status,
      level,
      category,
      tags,
      isFeatured,
      creatorId
    } = options

    const skip = (page - 1) * limit
    const where: any = {}

    if (status) where.status = status
    if (level) where.level = level
    if (category) where.categories = { has: category }
    if (tags && tags.length > 0) where.tags = { hasSome: tags }
    if (isFeatured !== undefined) where.isFeatured = isFeatured
    if (creatorId) where.createdById = creatorId
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          creator: {
            select: { id: true, username: true, role: true },
          },
          lessons: {
            select: { id: true, title: true, order: true },
            orderBy: { order: 'asc' },
          },
          seoMeta: true,
          _count: {
            select: { lessons: true },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip,
      }),
      prisma.course.count({ where }),
    ])

    return {
      data: courses as CMSCourse[],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getById(id: string, user: AuthUser): Promise<CMSCourse> {
    await this.requireAuth(user, UserRole.VIEWER)

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        lessons: {
          orderBy: { order: 'asc' },
        },
        seoMeta: true,
        _count: {
          select: { lessons: true },
        },
      },
    })

    if (!course) {
      throw new NotFoundError('Course', id)
    }

    return course as CMSCourse
  }

  async getBySlug(slug: string, user: AuthUser): Promise<CMSCourse> {
    await this.requireAuth(user, UserRole.VIEWER)

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        lessons: {
          where: { status: ContentStatus.PUBLISHED },
          orderBy: { order: 'asc' },
        },
        seoMeta: true,
        _count: {
          select: { lessons: true },
        },
      },
    })

    if (!course) {
      throw new NotFoundError('Course', slug)
    }

    return course as CMSCourse
  }

  async create(data: CreateCourseData, user: AuthUser): Promise<CMSCourse> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    // Check if slug is unique
    const existingCourse = await prisma.course.findUnique({
      where: { slug: data.slug },
    })

    if (existingCourse) {
      throw new ValidationError('A course with this slug already exists')
    }

    const course = await prisma.course.create({
      data: {
        ...data,
        status: ContentStatus.DRAFT,
        createdById: user.id,
        seoMeta: data.seoMeta ? {
          create: data.seoMeta,
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    // Create initial draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.COURSE,
      contentId: course.id,
      data: course,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.CREATE, AUDIT_RESOURCES.COURSE, course.id, {
      title: data.title,
      slug: data.slug,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'create',
      entity: 'course',
      entityId: course.id,
      data: course,
      timestamp: new Date(),
      userId: user.id
    })

    return course as CMSCourse
  }

  async update(data: UpdateCourseData, user: AuthUser): Promise<CMSCourse> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const existingCourse = await prisma.course.findUnique({
      where: { id: data.id },
    })

    if (!existingCourse) {
      throw new NotFoundError('Course', data.id)
    }

    // Check if slug is unique (if being changed)
    if (data.slug && data.slug !== existingCourse.slug) {
      const slugExists = await prisma.course.findUnique({
        where: { slug: data.slug },
      })

      if (slugExists) {
        throw new ValidationError('A course with this slug already exists')
      }
    }

    const { id, seoMeta, ...updateData } = data

    const course = await prisma.course.update({
      where: { id },
      data: {
        ...updateData,
        seoMeta: seoMeta ? {
          upsert: {
            create: seoMeta,
            update: seoMeta,
          },
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    // Save as draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.COURSE,
      contentId: course.id,
      data: course,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, AUDIT_RESOURCES.COURSE, course.id, {
      title: course.title,
      slug: course.slug,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'update',
      entity: 'course',
      entityId: course.id,
      data: course,
      timestamp: new Date(),
      userId: user.id
    })

    return course as CMSCourse
  }

  async delete(id: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.ADMIN)

    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course) {
      throw new NotFoundError('Course', id)
    }

    await prisma.course.delete({
      where: { id },
    })

    await this.logAction(user, AUDIT_ACTIONS.DELETE, AUDIT_RESOURCES.COURSE, id, {
      title: course.title,
      slug: course.slug,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'delete',
      entity: 'course',
      entityId: id,
      data: { id, title: course.title },
      timestamp: new Date(),
      userId: user.id
    })
  }

  async publish(id: string, user: AuthUser): Promise<CMSCourse> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course) {
      throw new NotFoundError('Course', id)
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { status: ContentStatus.PUBLISHED },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    await this.logAction(user, AUDIT_ACTIONS.PUBLISH, AUDIT_RESOURCES.COURSE, id, {
      title: course.title,
      slug: course.slug,
    })

    // Trigger real-time event
    await triggerCMSEvent({
      type: 'publish',
      entity: 'course',
      entityId: id,
      data: updatedCourse,
      timestamp: new Date(),
      userId: user.id
    })

    return updatedCourse as CMSCourse
  }

  async unpublish(id: string, user: AuthUser): Promise<CMSCourse> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const course = await prisma.course.findUnique({
      where: { id },
    })

    if (!course) {
      throw new NotFoundError('Course', id)
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: { status: ContentStatus.DRAFT },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    await this.logAction(user, AUDIT_ACTIONS.UNPUBLISH, AUDIT_RESOURCES.COURSE, id, {
      title: course.title,
      slug: course.slug,
    })

    return updatedCourse as CMSCourse
  }
}

// Lesson Service
export class LessonService extends BaseService {
  async getByCourseId(courseId: string, user: AuthUser): Promise<CMSLesson[]> {
    await this.requireAuth(user, UserRole.VIEWER)

    const lessons = await prisma.lesson.findMany({
      where: { courseId },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        course: {
          select: { id: true, title: true, slug: true },
        },
      },
      orderBy: { order: 'asc' },
    })

    return lessons as CMSLesson[]
  }

  async getById(id: string, user: AuthUser): Promise<CMSLesson> {
    await this.requireAuth(user, UserRole.VIEWER)

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        course: {
          select: { id: true, title: true, slug: true },
        },
      },
    })

    if (!lesson) {
      throw new NotFoundError('Lesson', id)
    }

    return lesson as CMSLesson
  }

  async create(data: CreateLessonData, user: AuthUser): Promise<CMSLesson> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id: data.courseId },
    })

    if (!course) {
      throw new NotFoundError('Course', data.courseId)
    }

    // Check if slug is unique within course
    const existingLesson = await prisma.lesson.findUnique({
      where: {
        courseId_slug: {
          courseId: data.courseId,
          slug: data.slug,
        },
      },
    })

    if (existingLesson) {
      throw new ValidationError('A lesson with this slug already exists in this course')
    }

    const lesson = await prisma.lesson.create({
      data: {
        ...data,
        status: ContentStatus.DRAFT,
        createdById: user.id,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        course: {
          select: { id: true, title: true, slug: true },
        },
      },
    })

    // Create initial draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.LESSON,
      contentId: lesson.id,
      data: lesson,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.CREATE, AUDIT_RESOURCES.LESSON, lesson.id, {
      title: data.title,
      slug: data.slug,
      courseId: data.courseId,
    })

    return lesson as CMSLesson
  }

  async update(data: UpdateLessonData, user: AuthUser): Promise<CMSLesson> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const existingLesson = await prisma.lesson.findUnique({
      where: { id: data.id },
    })

    if (!existingLesson) {
      throw new NotFoundError('Lesson', data.id)
    }

    // Check if slug is unique within course (if being changed)
    if (data.slug && data.slug !== existingLesson.slug) {
      const slugExists = await prisma.lesson.findUnique({
        where: {
          courseId_slug: {
            courseId: data.courseId || existingLesson.courseId,
            slug: data.slug,
          },
        },
      })

      if (slugExists) {
        throw new ValidationError('A lesson with this slug already exists in this course')
      }
    }

    const { id, ...updateData } = data

    const lesson = await prisma.lesson.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        course: {
          select: { id: true, title: true, slug: true },
        },
      },
    })

    // Save as draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.LESSON,
      contentId: lesson.id,
      data: lesson,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, AUDIT_RESOURCES.LESSON, lesson.id, {
      title: lesson.title,
      slug: lesson.slug,
      courseId: lesson.courseId,
    })

    return lesson as CMSLesson
  }

  async delete(id: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.ADMIN)

    const lesson = await prisma.lesson.findUnique({
      where: { id },
    })

    if (!lesson) {
      throw new NotFoundError('Lesson', id)
    }

    await prisma.lesson.delete({
      where: { id },
    })

    await this.logAction(user, AUDIT_ACTIONS.DELETE, AUDIT_RESOURCES.LESSON, id, {
      title: lesson.title,
      slug: lesson.slug,
      courseId: lesson.courseId,
    })
  }
}

// Blog Service
export class BlogService extends BaseService {
  async getAll(options: BlogQueryOptions = {}, user: AuthUser): Promise<PaginatedResponse<CMSBlogPost>> {
    await this.requireAuth(user, UserRole.VIEWER)

    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      status,
      tags,
      series,
      authorId,
      publishedAfter,
      publishedBefore
    } = options

    const skip = (page - 1) * limit
    const where: any = {}

    if (status) where.status = status
    if (tags && tags.length > 0) where.tags = { hasSome: tags }
    if (series) where.series = series
    if (authorId) where.authorId = authorId
    if (publishedAfter || publishedBefore) {
      where.publishDate = {}
      if (publishedAfter) where.publishDate.gte = publishedAfter
      if (publishedBefore) where.publishDate.lte = publishedBefore
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          creator: {
            select: { id: true, username: true, role: true },
          },
          author: {
            select: { id: true, name: true, avatar: true },
          },
          seoMeta: true,
        },
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip,
      }),
      prisma.blogPost.count({ where }),
    ])

    return {
      data: posts as CMSBlogPost[],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getById(id: string, user: AuthUser): Promise<CMSBlogPost> {
    await this.requireAuth(user, UserRole.VIEWER)

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
        seoMeta: true,
      },
    })

    if (!post) {
      throw new NotFoundError('Blog post', id)
    }

    return post as CMSBlogPost
  }

  async getBySlug(slug: string, user: AuthUser): Promise<CMSBlogPost> {
    await this.requireAuth(user, UserRole.VIEWER)

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
        seoMeta: true,
      },
    })

    if (!post) {
      throw new NotFoundError('Blog post', slug)
    }

    return post as CMSBlogPost
  }

  async create(data: CreateBlogPostData, user: AuthUser): Promise<CMSBlogPost> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    // Check if slug is unique
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    })

    if (existingPost) {
      throw new ValidationError('A blog post with this slug already exists')
    }

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        status: ContentStatus.DRAFT,
        createdById: user.id,
        seoMeta: data.seoMeta ? {
          create: data.seoMeta,
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
        seoMeta: true,
      },
    })

    // Create initial draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.BLOG_POST,
      contentId: post.id,
      data: post,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.CREATE, AUDIT_RESOURCES.BLOG_POST, post.id, {
      title: data.title,
      slug: data.slug,
    })

    return post as CMSBlogPost
  }

  async update(data: UpdateBlogPostData, user: AuthUser): Promise<CMSBlogPost> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const existingPost = await prisma.blogPost.findUnique({
      where: { id: data.id },
    })

    if (!existingPost) {
      throw new NotFoundError('Blog post', data.id)
    }

    // Check if slug is unique (if being changed)
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug: data.slug },
      })

      if (slugExists) {
        throw new ValidationError('A blog post with this slug already exists')
      }
    }

    const { id, seoMeta, ...updateData } = data

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateData,
        seoMeta: seoMeta ? {
          upsert: {
            create: seoMeta,
            update: seoMeta,
          },
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
        seoMeta: true,
      },
    })

    // Save as draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.BLOG_POST,
      contentId: post.id,
      data: post,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, AUDIT_RESOURCES.BLOG_POST, post.id, {
      title: post.title,
      slug: post.slug,
    })

    return post as CMSBlogPost
  }

  async delete(id: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.ADMIN)

    const post = await prisma.blogPost.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundError('Blog post', id)
    }

    await prisma.blogPost.delete({
      where: { id },
    })

    await this.logAction(user, AUDIT_ACTIONS.DELETE, AUDIT_RESOURCES.BLOG_POST, id, {
      title: post.title,
      slug: post.slug,
    })
  }

  async publish(id: string, user: AuthUser): Promise<CMSBlogPost> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const post = await prisma.blogPost.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundError('Blog post', id)
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: { 
        status: ContentStatus.PUBLISHED,
        publishDate: new Date(),
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
        seoMeta: true,
      },
    })

    await this.logAction(user, AUDIT_ACTIONS.PUBLISH, AUDIT_RESOURCES.BLOG_POST, id, {
      title: post.title,
      slug: post.slug,
    })

    return updatedPost as CMSBlogPost
  }
}

// Package Service
export class PackageService extends BaseService {
  async getAll(options: PackageQueryOptions = {}, user: AuthUser): Promise<PaginatedResponse<CMSPackage>> {
    await this.requireAuth(user, UserRole.VIEWER)

    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      status,
      type,
      priceMin,
      priceMax
    } = options

    const skip = (page - 1) * limit
    const where: any = {}

    if (status) where.status = status
    if (type) where.type = type
    if (priceMin !== undefined || priceMax !== undefined) {
      where.price = {}
      if (priceMin !== undefined) where.price.gte = priceMin
      if (priceMax !== undefined) where.price.lte = priceMax
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [packages, total] = await Promise.all([
      prisma.package.findMany({
        where,
        include: {
          creator: {
            select: { id: true, username: true, role: true },
          },
          packageCourses: {
            include: {
              course: {
                select: { id: true, title: true, slug: true },
              },
            },
          },
          seoMeta: true,
        },
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip,
      }),
      prisma.package.count({ where }),
    ])

    return {
      data: packages as CMSPackage[],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getById(id: string, user: AuthUser): Promise<CMSPackage> {
    await this.requireAuth(user, UserRole.VIEWER)

    const package_ = await prisma.package.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        packageCourses: {
          include: {
            course: {
              select: { id: true, title: true, slug: true },
            },
          },
        },
        seoMeta: true,
      },
    })

    if (!package_) {
      throw new NotFoundError('Package', id)
    }

    return package_ as CMSPackage
  }

  async getBySlug(slug: string, user: AuthUser): Promise<CMSPackage> {
    await this.requireAuth(user, UserRole.VIEWER)

    const package_ = await prisma.package.findUnique({
      where: { slug },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        packageCourses: {
          include: {
            course: {
              select: { id: true, title: true, slug: true },
            },
          },
        },
        seoMeta: true,
      },
    })

    if (!package_) {
      throw new NotFoundError('Package', slug)
    }

    return package_ as CMSPackage
  }

  async create(data: CreatePackageData, user: AuthUser): Promise<CMSPackage> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    // Check if slug is unique
    const existingPackage = await prisma.package.findUnique({
      where: { slug: data.slug },
    })

    if (existingPackage) {
      throw new ValidationError('A package with this slug already exists')
    }

    const package_ = await prisma.package.create({
      data: {
        ...data,
        status: ContentStatus.DRAFT,
        createdById: user.id,
        seoMeta: data.seoMeta ? {
          create: data.seoMeta,
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    // Create initial draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.PACKAGE,
      contentId: package_.id,
      data: package_,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.CREATE, AUDIT_RESOURCES.PACKAGE, package_.id, {
      title: data.title,
      slug: data.slug,
    })

    return package_ as CMSPackage
  }

  async update(data: UpdatePackageData, user: AuthUser): Promise<CMSPackage> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const existingPackage = await prisma.package.findUnique({
      where: { id: data.id },
    })

    if (!existingPackage) {
      throw new NotFoundError('Package', data.id)
    }

    // Check if slug is unique (if being changed)
    if (data.slug && data.slug !== existingPackage.slug) {
      const slugExists = await prisma.package.findUnique({
        where: { slug: data.slug },
      })

      if (slugExists) {
        throw new ValidationError('A package with this slug already exists')
      }
    }

    const { id, seoMeta, ...updateData } = data

    const package_ = await prisma.package.update({
      where: { id },
      data: {
        ...updateData,
        seoMeta: seoMeta ? {
          upsert: {
            create: seoMeta,
            update: seoMeta,
          },
        } : undefined,
      },
      include: {
        creator: {
          select: { id: true, username: true, role: true },
        },
        seoMeta: true,
      },
    })

    // Save as draft revision
    await WorkflowManager.saveDraft({
      contentType: ContentType.PACKAGE,
      contentId: package_.id,
      data: package_,
      user,
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, AUDIT_RESOURCES.PACKAGE, package_.id, {
      title: package_.title,
      slug: package_.slug,
    })

    return package_ as CMSPackage
  }

  async delete(id: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.ADMIN)

    const package_ = await prisma.package.findUnique({
      where: { id },
    })

    if (!package_) {
      throw new NotFoundError('Package', id)
    }

    await prisma.package.delete({
      where: { id },
    })

    await this.logAction(user, AUDIT_ACTIONS.DELETE, AUDIT_RESOURCES.PACKAGE, id, {
      title: package_.title,
      slug: package_.slug,
    })
  }

  async addCourse(packageId: string, courseId: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    // Verify both package and course exist
    const [package_, course] = await Promise.all([
      prisma.package.findUnique({ where: { id: packageId } }),
      prisma.course.findUnique({ where: { id: courseId } }),
    ])

    if (!package_) {
      throw new NotFoundError('Package', packageId)
    }
    if (!course) {
      throw new NotFoundError('Course', courseId)
    }

    // Check if course is already in package
    const existingRelation = await prisma.packageCourse.findUnique({
      where: {
        packageId_courseId: {
          packageId,
          courseId,
        },
      },
    })

    if (existingRelation) {
      throw new ValidationError('Course is already in this package')
    }

    await prisma.packageCourse.create({
      data: {
        packageId,
        courseId,
      },
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, AUDIT_RESOURCES.PACKAGE, packageId, {
      action: 'add_course',
      courseId,
      courseTitle: course.title,
    })
  }

  async removeCourse(packageId: string, courseId: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const relation = await prisma.packageCourse.findUnique({
      where: {
        packageId_courseId: {
          packageId,
          courseId,
        },
      },
    })

    if (!relation) {
      throw new NotFoundError('Package course relation', `${packageId}-${courseId}`)
    }

    await prisma.packageCourse.delete({
      where: {
        packageId_courseId: {
          packageId,
          courseId,
        },
      },
    })

    await this.logAction(user, AUDIT_ACTIONS.UPDATE, AUDIT_RESOURCES.PACKAGE, packageId, {
      action: 'remove_course',
      courseId,
    })
  }
}

// Media Service
export class MediaService extends BaseService {
  async getAll(options: QueryOptions = {}, user: AuthUser): Promise<PaginatedResponse<CMSMedia>> {
    await this.requireAuth(user, UserRole.VIEWER)

    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      mimeType
    } = options

    const skip = (page - 1) * limit
    const where: any = {}

    if (mimeType) where.mimeType = { contains: mimeType }
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
        { altText: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip,
      }),
      prisma.media.count({ where }),
    ])

    return {
      data: media as CMSMedia[],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  }

  async getById(id: string, user: AuthUser): Promise<CMSMedia> {
    await this.requireAuth(user, UserRole.VIEWER)

    const media = await prisma.media.findUnique({
      where: { id },
    })

    if (!media) {
      throw new NotFoundError('Media', id)
    }

    return media as CMSMedia
  }

  async delete(id: string, user: AuthUser): Promise<void> {
    await this.requireAuth(user, UserRole.ADMIN)

    const media = await prisma.media.findUnique({
      where: { id },
    })

    if (!media) {
      throw new NotFoundError('Media', id)
    }

    await prisma.media.delete({
      where: { id },
    })

    await this.logAction(user, AUDIT_ACTIONS.DELETE, AUDIT_RESOURCES.MEDIA, id, {
      filename: media.filename,
      originalName: media.originalName,
    })
  }
}

// Revision Service
export class RevisionService extends BaseService {
  async getHistory(contentType: ContentType, contentId: string, user: AuthUser): Promise<CMSRevision[]> {
    await this.requireAuth(user, UserRole.VIEWER)

    const revisions = await prisma.revision.findMany({
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

    return revisions as CMSRevision[]
  }

  async getById(id: string, user: AuthUser): Promise<CMSRevision> {
    await this.requireAuth(user, UserRole.VIEWER)

    const revision = await prisma.revision.findUnique({
      where: { id },
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
    })

    if (!revision) {
      throw new NotFoundError('Revision', id)
    }

    return revision as CMSRevision
  }

  async submitForReview(revisionId: string, user: AuthUser): Promise<CMSRevision> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const revision = await WorkflowManager.submitForReview({
      revisionId,
      user,
    })

    return revision as CMSRevision
  }

  async approve(revisionId: string, user: AuthUser, reviewNotes?: string): Promise<CMSRevision> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const revision = await WorkflowManager.approveRevision({
      revisionId,
      user,
      reviewNotes,
    })

    return revision as CMSRevision
  }

  async reject(revisionId: string, user: AuthUser, reviewNotes: string): Promise<CMSRevision> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const revision = await WorkflowManager.rejectRevision({
      revisionId,
      user,
      reviewNotes,
    })

    return revision as CMSRevision
  }

  async publish(revisionId: string, user: AuthUser): Promise<{ revision: CMSRevision; content: any }> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const result = await WorkflowManager.publishRevision({
      revisionId,
      user,
    })

    return {
      revision: result.revision as CMSRevision,
      content: result.content,
    }
  }

  async rollback(revisionId: string, user: AuthUser): Promise<{ revision: CMSRevision; content: any }> {
    await this.requireAuth(user, UserRole.PUBLISHER)

    const result = await WorkflowManager.rollbackToRevision({
      revisionId,
      user,
    })

    return {
      revision: result.revision as CMSRevision,
      content: result.content,
    }
  }

  async generatePreviewToken(revisionId: string, user: AuthUser): Promise<{ token: string; expiresAt: Date; url: string }> {
    await this.requireAuth(user, UserRole.CONTENT_EDITOR)

    const previewData = await WorkflowManager.generatePreviewToken({
      revisionId,
      user,
    })

    return previewData
  }
}

// Centralized CMS Service
export class CMSService {
  public readonly courses = new CourseService()
  public readonly lessons = new LessonService()
  public readonly blogs = new BlogService()
  public readonly packages = new PackageService()
  public readonly media = new MediaService()
  public readonly revisions = new RevisionService()

  // Analytics methods
  async getSystemAnalytics(user: AuthUser) {
    await this.courses.requireAuth(user, UserRole.VIEWER)

    const [
      totalUsers,
      activeUsers,
      totalCourses,
      publishedCourses,
      totalBlogPosts,
      publishedBlogPosts,
      totalPackages,
      publishedPackages,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.course.count(),
      prisma.course.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.package.count(),
      prisma.package.count({ where: { status: ContentStatus.PUBLISHED } }),
    ])

    return {
      totalUsers,
      activeUsers,
      totalCourses,
      publishedCourses,
      totalBlogPosts,
      publishedBlogPosts,
      totalPackages,
      publishedPackages,
      lastUpdated: new Date(),
    }
  }

  // Search across all content
  async search(query: string, user: AuthUser, options: { limit?: number; types?: ContentType[] } = {}) {
    await this.courses.requireAuth(user, UserRole.VIEWER)

    const { limit = 20, types = [ContentType.COURSE, ContentType.BLOG_POST, ContentType.PACKAGE] } = options

    const results: any[] = []

    if (types.includes(ContentType.COURSE)) {
      const courses = await prisma.course.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { subtitle: { contains: query, mode: 'insensitive' } },
            { shortDescription: { contains: query, mode: 'insensitive' } },
            { longDescription: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          status: true,
          createdAt: true,
        },
        take: Math.ceil(limit / types.length),
      })

      results.push(...courses.map(course => ({
        type: 'course',
        ...course,
      })))
    }

    if (types.includes(ContentType.BLOG_POST)) {
      const blogPosts = await prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          status: true,
          createdAt: true,
        },
        take: Math.ceil(limit / types.length),
      })

      results.push(...blogPosts.map(post => ({
        type: 'blog',
        ...post,
      })))
    }

    if (types.includes(ContentType.PACKAGE)) {
      const packages = await prisma.package.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          status: true,
          createdAt: true,
        },
        take: Math.ceil(limit / types.length),
      })

      results.push(...packages.map(pkg => ({
        type: 'package',
        ...pkg,
      })))
    }

    return results.slice(0, limit)
  }
}

// Export singleton instance
export const cms = new CMSService()
