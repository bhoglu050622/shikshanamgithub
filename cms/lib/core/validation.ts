// CMS Validation utilities
import { 
  CreateCourseData, 
  CreateLessonData, 
  CreateBlogPostData, 
  CreatePackageData,
  ValidationError 
} from './types'

// Slug validation
export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugRegex.test(slug)
}

export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

// Course validation
export function validateCreateCourse(data: CreateCourseData): void {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.slug || data.slug.trim().length === 0) {
    errors.push('Slug is required')
  } else if (!validateSlug(data.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.subtitle && data.subtitle.length > 300) {
    errors.push('Subtitle must be less than 300 characters')
  }

  if (data.shortDescription && data.shortDescription.length > 500) {
    errors.push('Short description must be less than 500 characters')
  }

  if (data.price !== undefined && data.price < 0) {
    errors.push('Price must be non-negative')
  }

  if (data.duration !== undefined && data.duration < 0) {
    errors.push('Duration must be non-negative')
  }

  if (data.tags && data.tags.length > 20) {
    errors.push('Maximum 20 tags allowed')
  }

  if (data.categories && data.categories.length > 10) {
    errors.push('Maximum 10 categories allowed')
  }

  if (errors.length > 0) {
    throw new ValidationError('Course validation failed', { errors })
  }
}

export function validateUpdateCourse(data: Partial<CreateCourseData> & { id: string }): void {
  const errors: string[] = []

  if (data.title !== undefined && (!data.title || data.title.trim().length === 0)) {
    errors.push('Title cannot be empty')
  }

  if (data.slug !== undefined) {
    if (!data.slug || data.slug.trim().length === 0) {
      errors.push('Slug cannot be empty')
    } else if (!validateSlug(data.slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
    }
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.subtitle && data.subtitle.length > 300) {
    errors.push('Subtitle must be less than 300 characters')
  }

  if (data.shortDescription && data.shortDescription.length > 500) {
    errors.push('Short description must be less than 500 characters')
  }

  if (data.price !== undefined && data.price < 0) {
    errors.push('Price must be non-negative')
  }

  if (data.duration !== undefined && data.duration < 0) {
    errors.push('Duration must be non-negative')
  }

  if (data.tags && data.tags.length > 20) {
    errors.push('Maximum 20 tags allowed')
  }

  if (data.categories && data.categories.length > 10) {
    errors.push('Maximum 10 categories allowed')
  }

  if (errors.length > 0) {
    throw new ValidationError('Course validation failed', { errors })
  }
}

// Lesson validation
export function validateCreateLesson(data: CreateLessonData): void {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.slug || data.slug.trim().length === 0) {
    errors.push('Slug is required')
  } else if (!validateSlug(data.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  if (!data.courseId || data.courseId.trim().length === 0) {
    errors.push('Course ID is required')
  }

  if (data.order < 0) {
    errors.push('Order must be non-negative')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.duration !== undefined && data.duration < 0) {
    errors.push('Duration must be non-negative')
  }

  if (data.resources && data.resources.length > 50) {
    errors.push('Maximum 50 resources allowed')
  }

  if (errors.length > 0) {
    throw new ValidationError('Lesson validation failed', { errors })
  }
}

export function validateUpdateLesson(data: Partial<CreateLessonData> & { id: string }): void {
  const errors: string[] = []

  if (data.title !== undefined && (!data.title || data.title.trim().length === 0)) {
    errors.push('Title cannot be empty')
  }

  if (data.slug !== undefined) {
    if (!data.slug || data.slug.trim().length === 0) {
      errors.push('Slug cannot be empty')
    } else if (!validateSlug(data.slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
    }
  }

  if (data.order !== undefined && data.order < 0) {
    errors.push('Order must be non-negative')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.duration !== undefined && data.duration < 0) {
    errors.push('Duration must be non-negative')
  }

  if (data.resources && data.resources.length > 50) {
    errors.push('Maximum 50 resources allowed')
  }

  if (errors.length > 0) {
    throw new ValidationError('Lesson validation failed', { errors })
  }
}

// Blog post validation
export function validateCreateBlogPost(data: CreateBlogPostData): void {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.slug || data.slug.trim().length === 0) {
    errors.push('Slug is required')
  } else if (!validateSlug(data.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.excerpt && data.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters')
  }

  if (data.tags && data.tags.length > 20) {
    errors.push('Maximum 20 tags allowed')
  }

  if (errors.length > 0) {
    throw new ValidationError('Blog post validation failed', { errors })
  }
}

export function validateUpdateBlogPost(data: Partial<CreateBlogPostData> & { id: string }): void {
  const errors: string[] = []

  if (data.title !== undefined && (!data.title || data.title.trim().length === 0)) {
    errors.push('Title cannot be empty')
  }

  if (data.slug !== undefined) {
    if (!data.slug || data.slug.trim().length === 0) {
      errors.push('Slug cannot be empty')
    } else if (!validateSlug(data.slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
    }
  }

  if (data.content !== undefined && (!data.content || data.content.trim().length === 0)) {
    errors.push('Content cannot be empty')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.excerpt && data.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters')
  }

  if (data.tags && data.tags.length > 20) {
    errors.push('Maximum 20 tags allowed')
  }

  if (errors.length > 0) {
    throw new ValidationError('Blog post validation failed', { errors })
  }
}

// Package validation
export function validateCreatePackage(data: CreatePackageData): void {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.slug || data.slug.trim().length === 0) {
    errors.push('Slug is required')
  } else if (!validateSlug(data.slug)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
  }

  if (data.price < 0) {
    errors.push('Price must be non-negative')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.description && data.description.length > 1000) {
    errors.push('Description must be less than 1000 characters')
  }

  if (data.features && data.features.length > 50) {
    errors.push('Maximum 50 features allowed')
  }

  if (data.validityDays !== undefined && data.validityDays < 0) {
    errors.push('Validity days must be non-negative')
  }

  if (errors.length > 0) {
    throw new ValidationError('Package validation failed', { errors })
  }
}

export function validateUpdatePackage(data: Partial<CreatePackageData> & { id: string }): void {
  const errors: string[] = []

  if (data.title !== undefined && (!data.title || data.title.trim().length === 0)) {
    errors.push('Title cannot be empty')
  }

  if (data.slug !== undefined) {
    if (!data.slug || data.slug.trim().length === 0) {
      errors.push('Slug cannot be empty')
    } else if (!validateSlug(data.slug)) {
      errors.push('Slug must contain only lowercase letters, numbers, and hyphens')
    }
  }

  if (data.price !== undefined && data.price < 0) {
    errors.push('Price must be non-negative')
  }

  if (data.title && data.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  if (data.description && data.description.length > 1000) {
    errors.push('Description must be less than 1000 characters')
  }

  if (data.features && data.features.length > 50) {
    errors.push('Maximum 50 features allowed')
  }

  if (data.validityDays !== undefined && data.validityDays < 0) {
    errors.push('Validity days must be non-negative')
  }

  if (errors.length > 0) {
    throw new ValidationError('Package validation failed', { errors })
  }
}

// SEO validation
export function validateSeoMeta(data: any): void {
  const errors: string[] = []

  if (data.title && data.title.length > 60) {
    errors.push('SEO title should be less than 60 characters')
  }

  if (data.description && data.description.length > 160) {
    errors.push('SEO description should be less than 160 characters')
  }

  if (data.keywords && data.keywords.length > 200) {
    errors.push('SEO keywords should be less than 200 characters')
  }

  if (errors.length > 0) {
    throw new ValidationError('SEO validation failed', { errors })
  }
}

// File validation
export function validateFileUpload(file: File, options: {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  allowedExtensions?: string[]
} = {}): void {
  const errors: string[] = []
  const { maxSize = 10 * 1024 * 1024, allowedTypes = [], allowedExtensions = [] } = options

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`)
  }

  if (allowedExtensions.length > 0) {
    const extension = file.name.split('.').pop()?.toLowerCase()
    if (!extension || !allowedExtensions.includes(extension)) {
      errors.push(`File extension .${extension} is not allowed`)
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('File validation failed', { errors })
  }
}

// URL validation
export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generic validation helpers
export function validateRequired(value: any, fieldName: string): void {
  if (value === undefined || value === null || value === '') {
    throw new ValidationError(`${fieldName} is required`)
  }
}

export function validateMinLength(value: string, minLength: number, fieldName: string): void {
  if (value.length < minLength) {
    throw new ValidationError(`${fieldName} must be at least ${minLength} characters`)
  }
}

export function validateMaxLength(value: string, maxLength: number, fieldName: string): void {
  if (value.length > maxLength) {
    throw new ValidationError(`${fieldName} must be less than ${maxLength} characters`)
  }
}

export function validateRange(value: number, min: number, max: number, fieldName: string): void {
  if (value < min || value > max) {
    throw new ValidationError(`${fieldName} must be between ${min} and ${max}`)
  }
}

export function validateArrayLength(array: any[], min: number, max: number, fieldName: string): void {
  if (array.length < min || array.length > max) {
    throw new ValidationError(`${fieldName} must contain between ${min} and ${max} items`)
  }
}
