// CMS Caching system
// Provides intelligent caching for CMS data

import { AuthUser } from '../auth'

// Cache configuration
interface CacheConfig {
  ttl: number // Time to live in milliseconds
  maxSize: number // Maximum number of items in cache
  enabled: boolean
}

// Cache entry
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
  accessCount: number
  lastAccessed: number
}

// Cache key generator
function generateCacheKey(prefix: string, user: AuthUser, ...params: any[]): string {
  const userKey = `${user.id}:${user.role}`
  const paramsKey = params.map(p => 
    typeof p === 'object' ? JSON.stringify(p) : String(p)
  ).join(':')
  
  return `${prefix}:${userKey}:${paramsKey}`
}

// In-memory cache implementation
class MemoryCache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private config: CacheConfig

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      ttl: 5 * 60 * 1000, // 5 minutes default
      maxSize: 1000, // 1000 items default
      enabled: true,
      ...config
    }
  }

  get(key: string): T | null {
    if (!this.config.enabled) return null

    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    // Update access statistics
    entry.accessCount++
    entry.lastAccessed = Date.now()

    return entry.data
  }

  set(key: string, data: T, ttl?: number): void {
    if (!this.config.enabled) return

    // Check cache size limit
    if (this.cache.size >= this.config.maxSize) {
      this.evictLeastUsed()
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.ttl,
      accessCount: 1,
      lastAccessed: Date.now()
    }

    this.cache.set(key, entry)
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  private evictLeastUsed(): void {
    let leastUsedKey = ''
    let leastUsedScore = Infinity

    for (const [key, entry] of this.cache.entries()) {
      // Score based on access count and recency
      const score = entry.accessCount / (Date.now() - entry.lastAccessed + 1)
      if (score < leastUsedScore) {
        leastUsedScore = score
        leastUsedKey = key
      }
    }

    if (leastUsedKey) {
      this.cache.delete(leastUsedKey)
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      enabled: this.config.enabled,
      ttl: this.config.ttl
    }
  }
}

// Cache instances for different data types
const courseCache = new MemoryCache({ ttl: 10 * 60 * 1000, maxSize: 500 }) // 10 minutes
const lessonCache = new MemoryCache({ ttl: 10 * 60 * 1000, maxSize: 1000 }) // 10 minutes
const blogCache = new MemoryCache({ ttl: 5 * 60 * 1000, maxSize: 500 }) // 5 minutes
const packageCache = new MemoryCache({ ttl: 15 * 60 * 1000, maxSize: 200 }) // 15 minutes
const mediaCache = new MemoryCache({ ttl: 30 * 60 * 1000, maxSize: 1000 }) // 30 minutes
const analyticsCache = new MemoryCache({ ttl: 2 * 60 * 1000, maxSize: 100 }) // 2 minutes

// Cache manager
export class CacheManager {
  // Course caching
  static getCourse(user: AuthUser, id: string) {
    const key = generateCacheKey('course', user, id)
    return courseCache.get(key)
  }

  static setCourse(user: AuthUser, id: string, data: any) {
    const key = generateCacheKey('course', user, id)
    courseCache.set(key, data)
  }

  static getCourseBySlug(user: AuthUser, slug: string) {
    const key = generateCacheKey('course:slug', user, slug)
    return courseCache.get(key)
  }

  static setCourseBySlug(user: AuthUser, slug: string, data: any) {
    const key = generateCacheKey('course:slug', user, slug)
    courseCache.set(key, data)
  }

  static getCourses(user: AuthUser, options: any) {
    const key = generateCacheKey('courses', user, options)
    return courseCache.get(key)
  }

  static setCourses(user: AuthUser, options: any, data: any) {
    const key = generateCacheKey('courses', user, options)
    courseCache.set(key, data)
  }

  // Lesson caching
  static getLesson(user: AuthUser, id: string) {
    const key = generateCacheKey('lesson', user, id)
    return lessonCache.get(key)
  }

  static setLesson(user: AuthUser, id: string, data: any) {
    const key = generateCacheKey('lesson', user, id)
    lessonCache.set(key, data)
  }

  static getLessons(user: AuthUser, options: any) {
    const key = generateCacheKey('lessons', user, options)
    return lessonCache.get(key)
  }

  static setLessons(user: AuthUser, options: any, data: any) {
    const key = generateCacheKey('lessons', user, options)
    lessonCache.set(key, data)
  }


  static getLessonsByCourse(user: AuthUser, courseId: string) {
    const key = generateCacheKey('lessons:course', user, courseId)
    return lessonCache.get(key)
  }

  static setLessonsByCourse(user: AuthUser, courseId: string, data: any) {
    const key = generateCacheKey('lessons:course', user, courseId)
    lessonCache.set(key, data)
  }

  // Blog caching
  static getBlogPost(user: AuthUser, id: string) {
    const key = generateCacheKey('blog', user, id)
    return blogCache.get(key)
  }

  static setBlogPost(user: AuthUser, id: string, data: any) {
    const key = generateCacheKey('blog', user, id)
    blogCache.set(key, data)
  }

  static getBlogPostBySlug(user: AuthUser, slug: string) {
    const key = generateCacheKey('blog:slug', user, slug)
    return blogCache.get(key)
  }

  static setBlogPostBySlug(user: AuthUser, slug: string, data: any) {
    const key = generateCacheKey('blog:slug', user, slug)
    blogCache.set(key, data)
  }

  static getBlogPosts(user: AuthUser, options: any) {
    const key = generateCacheKey('blogs', user, options)
    return blogCache.get(key)
  }

  static setBlogPosts(user: AuthUser, options: any, data: any) {
    const key = generateCacheKey('blogs', user, options)
    blogCache.set(key, data)
  }

  // Package caching
  static getPackage(user: AuthUser, id: string) {
    const key = generateCacheKey('package', user, id)
    return packageCache.get(key)
  }

  static setPackage(user: AuthUser, id: string, data: any) {
    const key = generateCacheKey('package', user, id)
    packageCache.set(key, data)
  }

  static getPackageBySlug(user: AuthUser, slug: string) {
    const key = generateCacheKey('package:slug', user, slug)
    return packageCache.get(key)
  }

  static setPackageBySlug(user: AuthUser, slug: string, data: any) {
    const key = generateCacheKey('package:slug', user, slug)
    packageCache.set(key, data)
  }

  static getPackages(user: AuthUser, options: any) {
    const key = generateCacheKey('packages', user, options)
    return packageCache.get(key)
  }

  static setPackages(user: AuthUser, options: any, data: any) {
    const key = generateCacheKey('packages', user, options)
    packageCache.set(key, data)
  }

  // Media caching
  static getMedia(user: AuthUser, id: string) {
    const key = generateCacheKey('media', user, id)
    return mediaCache.get(key)
  }

  static setMedia(user: AuthUser, id: string, data: any) {
    const key = generateCacheKey('media', user, id)
    mediaCache.set(key, data)
  }

  static getMediaList(user: AuthUser, options: any) {
    const key = generateCacheKey('media:list', user, options)
    return mediaCache.get(key)
  }

  static setMediaList(user: AuthUser, options: any, data: any) {
    const key = generateCacheKey('media:list', user, options)
    mediaCache.set(key, data)
  }

  // Analytics caching
  static getAnalytics(user: AuthUser) {
    const key = generateCacheKey('analytics', user)
    return analyticsCache.get(key)
  }

  static setAnalytics(user: AuthUser, data: any) {
    const key = generateCacheKey('analytics', user)
    analyticsCache.set(key, data)
  }

  // Cache invalidation
  static invalidateCourse(user: AuthUser, id: string) {
    const keys = [
      generateCacheKey('course', user, id),
      generateCacheKey('courses', user, {}), // Invalidate all course lists
    ]
    keys.forEach(key => courseCache.delete(key))
  }

  static invalidateCourseBySlug(user: AuthUser, slug: string) {
    const key = generateCacheKey('course:slug', user, slug)
    courseCache.delete(key)
  }

  static invalidateLesson(user: AuthUser, id: string, courseId?: string) {
    const keys = [
      generateCacheKey('lesson', user, id),
    ]
    if (courseId) {
      keys.push(generateCacheKey('lessons:course', user, courseId))
    }
    keys.forEach(key => lessonCache.delete(key))
  }

  static invalidateBlogPost(user: AuthUser, id: string) {
    const keys = [
      generateCacheKey('blog', user, id),
      generateCacheKey('blogs', user, {}), // Invalidate all blog lists
    ]
    keys.forEach(key => blogCache.delete(key))
  }

  static invalidateBlogPostBySlug(user: AuthUser, slug: string) {
    const key = generateCacheKey('blog:slug', user, slug)
    blogCache.delete(key)
  }

  static invalidatePackage(user: AuthUser, id: string) {
    const keys = [
      generateCacheKey('package', user, id),
      generateCacheKey('packages', user, {}), // Invalidate all package lists
    ]
    keys.forEach(key => packageCache.delete(key))
  }

  static invalidatePackageBySlug(user: AuthUser, slug: string) {
    const key = generateCacheKey('package:slug', user, slug)
    packageCache.delete(key)
  }

  static invalidateMedia(user: AuthUser, id: string) {
    const keys = [
      generateCacheKey('media', user, id),
      generateCacheKey('media:list', user, {}), // Invalidate all media lists
    ]
    keys.forEach(key => mediaCache.delete(key))
  }

  static invalidateAnalytics(user: AuthUser) {
    const key = generateCacheKey('analytics', user)
    analyticsCache.delete(key)
  }

  // Clear all caches for a user
  static clearUserCache(user: AuthUser) {
    // This is a simplified approach - in production you might want more granular control
    courseCache.clear()
    lessonCache.clear()
    blogCache.clear()
    packageCache.clear()
    mediaCache.clear()
    analyticsCache.clear()
  }

  // Clear all caches
  static clearAllCaches() {
    courseCache.clear()
    lessonCache.clear()
    blogCache.clear()
    packageCache.clear()
    mediaCache.clear()
    analyticsCache.clear()
  }

  // Get cache statistics
  static getCacheStats() {
    return {
      courses: courseCache.getStats(),
      lessons: lessonCache.getStats(),
      blogs: blogCache.getStats(),
      packages: packageCache.getStats(),
      media: mediaCache.getStats(),
      analytics: analyticsCache.getStats(),
    }
  }
}

// Cache middleware for API routes
export function withCache<T>(
  cacheKey: string,
  ttl: number = 5 * 60 * 1000,
  getCacheKey: (user: AuthUser, ...params: any[]) => string = (user: AuthUser, ...params: any[]) => generateCacheKey(cacheKey, user, ...params)
) {
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value

    descriptor.value = async function(user: AuthUser, ...args: any[]) {
      const key = getCacheKey(user, cacheKey, ...args)
      
      // Try to get from cache first
      const cached = courseCache.get(key) // Using courseCache as default
      if (cached) {
        return cached
      }

      // Execute the original method
      const result = await method.apply(this, [user, ...args])

      // Cache the result
      courseCache.set(key, result, ttl)

      return result
    }

    return descriptor
  }
}

// Cache warming utilities
export class CacheWarmer {
  static async warmCourseCache(user: AuthUser, courseIds: string[]) {
    // This would be implemented to pre-load frequently accessed courses
    console.log(`Warming cache for ${courseIds.length} courses`)
  }

  static async warmBlogCache(user: AuthUser, blogIds: string[]) {
    // This would be implemented to pre-load frequently accessed blog posts
    console.log(`Warming cache for ${blogIds.length} blog posts`)
  }

  static async warmAnalyticsCache(user: AuthUser) {
    // This would be implemented to pre-load analytics data
    console.log('Warming analytics cache')
  }
}
