// Core CMS Types
import { 
  User, 
  Course, 
  Lesson, 
  Package, 
  BlogPost, 
  Page, 
  Author, 
  Media, 
  SeoMeta, 
  Revision,
  UserRole,
  ContentStatus,
  ContentType,
  RevisionStatus,
  CourseLevel,
  PackageType
} from '../generated/prisma'

// Re-export Prisma types for use in other modules
export { 
  UserRole,
  ContentStatus,
  ContentType,
  RevisionStatus,
  CourseLevel,
  PackageType
}

// Base types
export interface CMSUser {
  id: string
  username: string
  email?: string | null
  role: UserRole
  isActive: boolean
  lastLogin?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface CMSCourse {
  id: string
  title: string
  subtitle?: string | null
  slug: string
  shortDescription?: string | null
  longDescription?: string | null
  coverImage?: string | null
  gallery: string[]
  duration?: number | null
  level: CourseLevel
  language: string
  price?: number | null
  currency: string
  tags: string[]
  categories: string[]
  status: ContentStatus
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
  createdById: string
  creator?: Pick<CMSUser, 'id' | 'username' | 'role'>
  lessons?: CMSLesson[]
  seoMeta?: SeoMeta
  _count?: {
    lessons: number
  }
}

export interface CMSLesson {
  id: string
  title: string
  slug: string
  content: string
  order: number
  duration?: number | null
  resources: string[]
  isPreview: boolean
  courseId: string
  status: ContentStatus
  createdAt: Date
  updatedAt: Date
  createdById: string
  creator?: Pick<CMSUser, 'id' | 'username' | 'role'>
  course?: Pick<CMSCourse, 'id' | 'title' | 'slug'>
}

export interface CMSPackage {
  id: string
  title: string
  slug: string
  description?: string | null
  price: number
  type: PackageType
  features: string[]
  validityDays?: number | null
  status: ContentStatus
  createdAt: Date
  updatedAt: Date
  createdById: string
  creator?: Pick<CMSUser, 'id' | 'username' | 'role'>
  packageCourses?: Array<{
    course: Pick<CMSCourse, 'id' | 'title' | 'slug'>
  }>
  seoMeta?: SeoMeta
}

export interface CMSBlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  featuredImage?: string | null
  tags: string[]
  series?: string | null
  publishDate?: Date | null
  status: ContentStatus
  createdAt: Date
  updatedAt: Date
  createdById: string
  authorId?: string | null
  creator?: Pick<CMSUser, 'id' | 'username' | 'role'>
  author?: Pick<CMSAuthor, 'id' | 'name' | 'avatar'>
  seoMeta?: SeoMeta
}

export interface CMSPage {
  id: string
  title: string
  slug: string
  layout: string
  content: string
  status: ContentStatus
  createdAt: Date
  updatedAt: Date
  createdById: string
  creator?: Pick<CMSUser, 'id' | 'username' | 'role'>
  seoMeta?: SeoMeta
}

export interface CMSAuthor {
  id: string
  name: string
  bio?: string | null
  avatar?: string | null
  socialLinks?: any
  profileUrl?: string | null
  userId?: string | null
  user?: Pick<CMSUser, 'id' | 'username' | 'role'>
  blogPosts?: Pick<CMSBlogPost, 'id' | 'title' | 'slug'>[]
}

export interface CMSMedia {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  altText?: string | null
  caption?: string | null
  variants?: any
  createdAt: Date
}

export interface CMSRevision {
  id: string
  contentType: ContentType
  contentId: string
  version: number
  data: any
  status: RevisionStatus
  previewToken?: string | null
  previewExpiresAt?: Date | null
  publishedAt?: Date | null
  createdAt: Date
  createdById: string
  reviewedById?: string | null
  publishedById?: string | null
  reviewNotes?: string | null
  creator?: Pick<CMSUser, 'id' | 'username' | 'role'>
  reviewer?: Pick<CMSUser, 'id' | 'username' | 'role'>
  publisher?: Pick<CMSUser, 'id' | 'username' | 'role'>
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface CMSResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Query types
export interface QueryOptions {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, any>
}

export interface CourseQueryOptions extends QueryOptions {
  status?: ContentStatus
  level?: CourseLevel
  category?: string
  tags?: string[]
  isFeatured?: boolean
  creatorId?: string
}

export interface BlogQueryOptions extends QueryOptions {
  status?: ContentStatus
  tags?: string[]
  series?: string
  authorId?: string
  publishedAfter?: Date
  publishedBefore?: Date
}

export interface PackageQueryOptions extends QueryOptions {
  status?: ContentStatus
  type?: PackageType
  priceMin?: number
  priceMax?: number
}

// Create/Update types
export interface CreateCourseData {
  title: string
  subtitle?: string
  slug: string
  shortDescription?: string
  longDescription?: string
  coverImage?: string
  gallery?: string[]
  duration?: number
  level?: CourseLevel
  language?: string
  price?: number
  currency?: string
  tags?: string[]
  categories?: string[]
  isFeatured?: boolean
  seoMeta?: Partial<SeoMeta>
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  id: string
}

export interface CreateLessonData {
  title: string
  slug: string
  content: string
  order: number
  duration?: number
  resources?: string[]
  isPreview?: boolean
  courseId: string
}

export interface UpdateLessonData extends Partial<CreateLessonData> {
  id: string
}

export interface CreateBlogPostData {
  title: string
  slug: string
  excerpt?: string
  content: string
  featuredImage?: string
  tags?: string[]
  series?: string
  publishDate?: Date
  authorId?: string
  seoMeta?: Partial<SeoMeta>
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  id: string
}

export interface CreatePackageData {
  title: string
  slug: string
  description?: string
  price: number
  type?: PackageType
  features?: string[]
  validityDays?: number
  seoMeta?: Partial<SeoMeta>
}

export interface UpdatePackageData extends Partial<CreatePackageData> {
  id: string
}

// Real-time event types
export interface CMSEvent {
  type: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'status_change'
  entity: 'course' | 'lesson' | 'package' | 'blog' | 'page' | 'user' | 'media' | 'section'
  entityId: string
  data?: any
  timestamp: Date
  userId?: string
}

export interface RealtimeSubscription {
  id: string
  event: string
  callback: (data: any) => void
  unsubscribe: () => void
}

// Analytics types
export interface CourseAnalytics {
  courseId: string
  views: number
  enrollments: number
  completions: number
  averageRating: number
  revenue: number
  lastUpdated: Date
}

export interface UserAnalytics {
  userId: string
  totalCourses: number
  completedCourses: number
  totalTimeSpent: number
  lastActivity: Date
}

export interface SystemAnalytics {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  publishedCourses: number
  totalRevenue: number
  monthlyRevenue: number
  pageViews: number
  uniqueVisitors: number
  conversionRate: number
}

// Error types
export class CMSError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'CMSError'
  }
}

export class ValidationError extends CMSError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details)
  }
}

export class NotFoundError extends CMSError {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found`, 'NOT_FOUND', 404)
  }
}

export class UnauthorizedError extends CMSError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

export class ForbiddenError extends CMSError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403)
  }
}
