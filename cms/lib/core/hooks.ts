// React hooks for CMS operations
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cms } from './services'
import { AuthUser } from '../auth'
import { 
  CMSCourse, 
  CMSLesson, 
  CMSPackage, 
  CMSBlogPost, 
  CMSPage, 
  CMSMedia,
  PaginatedResponse,
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
  CMSError
} from './types'

// Base hook for CMS operations
function useCMSOperation<T, P extends any[]>(
  operation: (user: AuthUser, ...params: P) => Promise<T>,
  user: AuthUser | null,
  ...params: P
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(async () => {
    if (!user) {
      setError('User not authenticated')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await operation(user, ...params)
      setData(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [user, operation, ...params])

  return {
    data,
    isLoading,
    error,
    execute,
    setData
  }
}

// Course hooks
export function useCourses(options: CourseQueryOptions = {}, user: AuthUser | null) {
  const [courses, setCourses] = useState<PaginatedResponse<CMSCourse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.courses.getAll(options, user)
      setCourses(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch courses'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, options])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const createCourse = useCallback(async (data: CreateCourseData) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.courses.create(data, user)
  }, [user])

  const updateCourse = useCallback(async (data: UpdateCourseData) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.courses.update(data, user)
  }, [user])

  const deleteCourse = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.courses.delete(id, user)
    await fetchCourses() // Refresh the list
  }, [user, fetchCourses])

  const publishCourse = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.courses.publish(id, user)
    await fetchCourses() // Refresh the list
    return result
  }, [user, fetchCourses])

  const unpublishCourse = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.courses.unpublish(id, user)
    await fetchCourses() // Refresh the list
    return result
  }, [user, fetchCourses])

  return {
    courses,
    isLoading,
    error,
    refetch: fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    publishCourse,
    unpublishCourse
  }
}

export function useCourse(id: string, user: AuthUser | null) {
  return useCMSOperation(cms.courses.getById, user, id)
}

export function useCourseBySlug(slug: string, user: AuthUser | null) {
  return useCMSOperation(cms.courses.getBySlug, user, slug)
}

// Lesson hooks
export function useLessons(courseId: string, user: AuthUser | null) {
  const [lessons, setLessons] = useState<CMSLesson[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLessons = useCallback(async () => {
    if (!user || !courseId) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.lessons.getByCourseId(courseId, user)
      setLessons(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch lessons'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, courseId])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  const createLesson = useCallback(async (data: CreateLessonData) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.lessons.create(data, user)
    await fetchLessons() // Refresh the list
    return result
  }, [user, fetchLessons])

  const updateLesson = useCallback(async (data: UpdateLessonData) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.lessons.update(data, user)
    await fetchLessons() // Refresh the list
    return result
  }, [user, fetchLessons])

  const deleteLesson = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.lessons.delete(id, user)
    await fetchLessons() // Refresh the list
  }, [user, fetchLessons])

  return {
    lessons,
    isLoading,
    error,
    refetch: fetchLessons,
    createLesson,
    updateLesson,
    deleteLesson
  }
}

export function useLesson(id: string, user: AuthUser | null) {
  return useCMSOperation(cms.lessons.getById, user, id)
}

// Blog hooks
export function useBlogPosts(options: BlogQueryOptions = {}, user: AuthUser | null) {
  const [posts, setPosts] = useState<PaginatedResponse<CMSBlogPost> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.blogs.getAll(options, user)
      setPosts(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch blog posts'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, options])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const createPost = useCallback(async (data: CreateBlogPostData) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.blogs.create(data, user)
    await fetchPosts() // Refresh the list
    return result
  }, [user, fetchPosts])

  const updatePost = useCallback(async (data: UpdateBlogPostData) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.blogs.update(data, user)
    await fetchPosts() // Refresh the list
    return result
  }, [user, fetchPosts])

  const deletePost = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.blogs.delete(id, user)
    await fetchPosts() // Refresh the list
  }, [user, fetchPosts])

  const publishPost = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.blogs.publish(id, user)
    await fetchPosts() // Refresh the list
    return result
  }, [user, fetchPosts])

  return {
    posts,
    isLoading,
    error,
    refetch: fetchPosts,
    createPost,
    updatePost,
    deletePost,
    publishPost
  }
}

export function useBlogPost(id: string, user: AuthUser | null) {
  return useCMSOperation(cms.blogs.getById, user, id)
}

export function useBlogPostBySlug(slug: string, user: AuthUser | null) {
  return useCMSOperation(cms.blogs.getBySlug, user, slug)
}

// Package hooks
export function usePackages(options: PackageQueryOptions = {}, user: AuthUser | null) {
  const [packages, setPackages] = useState<PaginatedResponse<CMSPackage> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPackages = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.packages.getAll(options, user)
      setPackages(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch packages'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, options])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  const createPackage = useCallback(async (data: CreatePackageData) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.packages.create(data, user)
    await fetchPackages() // Refresh the list
    return result
  }, [user, fetchPackages])

  const updatePackage = useCallback(async (data: UpdatePackageData) => {
    if (!user) throw new Error('User not authenticated')
    const result = await cms.packages.update(data, user)
    await fetchPackages() // Refresh the list
    return result
  }, [user, fetchPackages])

  const deletePackage = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.packages.delete(id, user)
    await fetchPackages() // Refresh the list
  }, [user, fetchPackages])

  const addCourseToPackage = useCallback(async (packageId: string, courseId: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.packages.addCourse(packageId, courseId, user)
    await fetchPackages() // Refresh the list
  }, [user, fetchPackages])

  const removeCourseFromPackage = useCallback(async (packageId: string, courseId: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.packages.removeCourse(packageId, courseId, user)
    await fetchPackages() // Refresh the list
  }, [user, fetchPackages])

  return {
    packages,
    isLoading,
    error,
    refetch: fetchPackages,
    createPackage,
    updatePackage,
    deletePackage,
    addCourseToPackage,
    removeCourseFromPackage
  }
}

export function usePackage(id: string, user: AuthUser | null) {
  return useCMSOperation(cms.packages.getById, user, id)
}

export function usePackageBySlug(slug: string, user: AuthUser | null) {
  return useCMSOperation(cms.packages.getBySlug, user, slug)
}

// Media hooks
export function useMedia(options: any = {}, user: AuthUser | null) {
  const [media, setMedia] = useState<PaginatedResponse<CMSMedia> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.media.getAll(options, user)
      setMedia(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch media'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user, options])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const deleteMedia = useCallback(async (id: string) => {
    if (!user) throw new Error('User not authenticated')
    await cms.media.delete(id, user)
    await fetchMedia() // Refresh the list
  }, [user, fetchMedia])

  return {
    media,
    isLoading,
    error,
    refetch: fetchMedia,
    deleteMedia
  }
}

export function useMediaItem(id: string, user: AuthUser | null) {
  return useCMSOperation(cms.media.getById, user, id)
}

// Analytics hooks
export function useSystemAnalytics(user: AuthUser | null) {
  const [analytics, setAnalytics] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async () => {
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.getSystemAnalytics(user)
      setAnalytics(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Failed to fetch analytics'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  return {
    analytics,
    isLoading,
    error,
    refetch: fetchAnalytics
  }
}

// Search hook
export function useCMSSearch(user: AuthUser | null) {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string, options: { limit?: number; types?: any[] } = {}) => {
    if (!user || !query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await cms.search(query, user, options)
      setResults(result)
    } catch (err) {
      const errorMessage = err instanceof CMSError ? err.message : 'Search failed'
      setError(errorMessage)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [user])

  return {
    results,
    isLoading,
    error,
    search
  }
}

// Revision hooks
export function useRevisionHistory(contentType: any, contentId: string, user: AuthUser | null) {
  return useCMSOperation(cms.revisions.getHistory, user, contentType, contentId)
}

export function useRevision(id: string, user: AuthUser | null) {
  return useCMSOperation(cms.revisions.getById, user, id)
}

// Workflow hooks
export function useWorkflowActions(user: AuthUser | null) {
  const submitForReview = useCallback(async (revisionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.revisions.submitForReview(revisionId, user)
  }, [user])

  const approve = useCallback(async (revisionId: string, reviewNotes?: string) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.revisions.approve(revisionId, user, reviewNotes)
  }, [user])

  const reject = useCallback(async (revisionId: string, reviewNotes: string) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.revisions.reject(revisionId, user, reviewNotes)
  }, [user])

  const publish = useCallback(async (revisionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.revisions.publish(revisionId, user)
  }, [user])

  const rollback = useCallback(async (revisionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.revisions.rollback(revisionId, user)
  }, [user])

  const generatePreviewToken = useCallback(async (revisionId: string) => {
    if (!user) throw new Error('User not authenticated')
    return await cms.revisions.generatePreviewToken(revisionId, user)
  }, [user])

  return {
    submitForReview,
    approve,
    reject,
    publish,
    rollback,
    generatePreviewToken
  }
}
