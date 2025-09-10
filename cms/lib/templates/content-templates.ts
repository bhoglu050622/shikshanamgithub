// Content Templates for Non-Technical Users
// Provides structured templates for different content types

import { ContentType, CourseLevel, PackageType } from '../generated/prisma'

export interface ContentTemplate {
  id: string
  name: string
  description: string
  type: ContentType
  icon: string
  color: string
  fields: TemplateField[]
  requiredFields: string[]
  defaultValues?: Record<string, any>
  validation?: Record<string, any>
}

export interface TemplateField {
  id: string
  name: string
  label: string
  type: 'text' | 'textarea' | 'rich-text' | 'select' | 'multiselect' | 'number' | 'boolean' | 'date' | 'file' | 'image' | 'video' | 'url' | 'email' | 'tags' | 'array' | 'object'
  required: boolean
  placeholder?: string
  helpText?: string
  options?: Array<{ value: string; label: string }>
  validation?: {
    min?: number
    max?: number
    pattern?: string
    custom?: string
  }
  defaultValue?: any
  conditional?: {
    field: string
    value: any
    operator: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than'
  }
}

// Course Template
export const courseTemplate: ContentTemplate = {
  id: 'course',
  name: 'Course',
  description: 'Create a comprehensive course with modules and lessons',
  type: ContentType.COURSE,
  icon: 'BookOpen',
  color: 'bg-blue-500',
  requiredFields: ['title', 'shortDescription', 'category', 'level'],
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Course Title',
      type: 'text',
      required: true,
      placeholder: 'Enter course title (e.g., "Introduction to Sanskrit")',
      helpText: 'Keep it clear and descriptive. This will be the main heading.',
      validation: { min: 5, max: 100 }
    },
    {
      id: 'subtitle',
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: false,
      placeholder: 'Optional subtitle for more context',
      helpText: 'A brief subtitle that appears below the main title.'
    },
    {
      id: 'shortDescription',
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
      required: true,
      placeholder: 'Brief description (15-30 words)',
      helpText: 'This appears in course listings and search results.',
      validation: { min: 15, max: 200 }
    },
    {
      id: 'longDescription',
      name: 'longDescription',
      label: 'Detailed Description',
      type: 'rich-text',
      required: false,
      placeholder: 'Detailed course description with formatting',
      helpText: 'Full description with rich text formatting. Use headings, lists, and emphasis.'
    },
    {
      id: 'category',
      name: 'categories',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'sanskrit', label: 'Sanskrit' },
        { value: 'yoga', label: 'Yoga' },
        { value: 'philosophy', label: 'Philosophy' },
        { value: 'meditation', label: 'Meditation' },
        { value: 'ayurveda', label: 'Ayurveda' },
        { value: 'vedic-sciences', label: 'Vedic Sciences' }
      ],
      helpText: 'Choose the primary category for this course.'
    },
    {
      id: 'level',
      name: 'level',
      label: 'Difficulty Level',
      type: 'select',
      required: true,
      options: [
        { value: CourseLevel.BEGINNER, label: 'Beginner' },
        { value: CourseLevel.INTERMEDIATE, label: 'Intermediate' },
        { value: CourseLevel.ADVANCED, label: 'Advanced' }
      ],
      helpText: 'Select the appropriate difficulty level for students.'
    },
    {
      id: 'price',
      name: 'price',
      label: 'Price',
      type: 'number',
      required: false,
      placeholder: '0.00',
      helpText: 'Set price in USD. Leave empty for free courses.',
      validation: { min: 0 }
    },
    {
      id: 'coverImage',
      name: 'coverImage',
      label: 'Cover Image',
      type: 'image',
      required: true,
      helpText: 'Upload a high-quality cover image (1920x1080px recommended).'
    },
    {
      id: 'tags',
      name: 'tags',
      label: 'Tags',
      type: 'tags',
      required: false,
      placeholder: 'Add tags separated by commas',
      helpText: 'Add relevant tags to help students find this course.'
    },
    {
      id: 'duration',
      name: 'duration',
      label: 'Estimated Duration (minutes)',
      type: 'number',
      required: false,
      placeholder: '120',
      helpText: 'Total estimated time to complete the course.'
    },
    {
      id: 'isFeatured',
      name: 'isFeatured',
      label: 'Featured Course',
      type: 'boolean',
      required: false,
      helpText: 'Mark as featured to highlight on homepage.'
    }
  ],
  defaultValues: {
    level: CourseLevel.BEGINNER,
    currency: 'USD',
    language: 'en',
    isFeatured: false
  }
}

// Lesson Template
export const lessonTemplate: ContentTemplate = {
  id: 'lesson',
  name: 'Lesson',
  description: 'Create individual lessons with different content types',
  type: ContentType.LESSON,
  icon: 'FileText',
  color: 'bg-green-500',
  requiredFields: ['title', 'content', 'lessonType'],
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Lesson Title',
      type: 'text',
      required: true,
      placeholder: 'Enter lesson title',
      helpText: 'Clear, descriptive title for this lesson.',
      validation: { min: 5, max: 100 }
    },
    {
      id: 'lessonType',
      name: 'lessonType',
      label: 'Lesson Type',
      type: 'select',
      required: true,
      options: [
        { value: 'video', label: 'Video Lesson' },
        { value: 'article', label: 'Article/Text' },
        { value: 'quiz', label: 'Quiz/Assessment' },
        { value: 'resource', label: 'Resource/Download' }
      ],
      helpText: 'Choose the type of content for this lesson.'
    },
    {
      id: 'content',
      name: 'content',
      label: 'Lesson Content',
      type: 'rich-text',
      required: true,
      placeholder: 'Write your lesson content here...',
      helpText: 'Main content of the lesson. Use rich text formatting for better presentation.'
    },
    {
      id: 'duration',
      name: 'duration',
      label: 'Duration (minutes)',
      type: 'number',
      required: false,
      placeholder: '15',
      helpText: 'Estimated time to complete this lesson.',
      validation: { min: 1 }
    },
    {
      id: 'isPreview',
      name: 'isPreview',
      label: 'Preview Lesson',
      type: 'boolean',
      required: false,
      helpText: 'Allow students to preview this lesson before enrolling.'
    },
    {
      id: 'resources',
      name: 'resources',
      label: 'Additional Resources',
      type: 'array',
      required: false,
      helpText: 'Add downloadable resources like PDFs, worksheets, etc.'
    }
  ]
}

// Quiz Template
export const quizTemplate: ContentTemplate = {
  id: 'quiz',
  name: 'Quiz',
  description: 'Create interactive quizzes and assessments',
  type: ContentType.LESSON,
  icon: 'HelpCircle',
  color: 'bg-purple-500',
  requiredFields: ['title', 'questions'],
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Quiz Title',
      type: 'text',
      required: true,
      placeholder: 'Enter quiz title',
      helpText: 'Clear title for this quiz or assessment.'
    },
    {
      id: 'description',
      name: 'description',
      label: 'Quiz Description',
      type: 'textarea',
      required: false,
      placeholder: 'Brief description of what this quiz covers',
      helpText: 'Explain what students will be tested on.'
    },
    {
      id: 'questions',
      name: 'questions',
      label: 'Questions',
      type: 'array',
      required: true,
      helpText: 'Add quiz questions with multiple choice or short answer options.'
    },
    {
      id: 'passingScore',
      name: 'passingScore',
      label: 'Passing Score (%)',
      type: 'number',
      required: false,
      placeholder: '70',
      helpText: 'Minimum score required to pass (0-100).',
      validation: { min: 0, max: 100 }
    },
    {
      id: 'maxAttempts',
      name: 'maxAttempts',
      label: 'Maximum Attempts',
      type: 'number',
      required: false,
      placeholder: '3',
      helpText: 'How many times can students retake this quiz?',
      validation: { min: 1 }
    },
    {
      id: 'timeLimit',
      name: 'timeLimit',
      label: 'Time Limit (minutes)',
      type: 'number',
      required: false,
      placeholder: '30',
      helpText: 'Optional time limit for completing the quiz.'
    }
  ]
}

// Blog Post Template
export const blogPostTemplate: ContentTemplate = {
  id: 'blog-post',
  name: 'Blog Post',
  description: 'Create engaging blog posts and articles',
  type: ContentType.BLOG_POST,
  icon: 'Edit3',
  color: 'bg-orange-500',
  requiredFields: ['title', 'excerpt', 'content'],
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Post Title',
      type: 'text',
      required: true,
      placeholder: 'Enter blog post title',
      helpText: 'Compelling title that will attract readers.',
      validation: { min: 10, max: 100 }
    },
    {
      id: 'excerpt',
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
      placeholder: 'Brief summary of the post (120-160 characters)',
      helpText: 'Short description that appears in previews and search results.',
      validation: { min: 120, max: 160 }
    },
    {
      id: 'content',
      name: 'content',
      label: 'Post Content',
      type: 'rich-text',
      required: true,
      placeholder: 'Write your blog post here...',
      helpText: 'Main content of the blog post with rich formatting.'
    },
    {
      id: 'featuredImage',
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'image',
      required: false,
      helpText: 'Main image for the blog post (1200x675px recommended).'
    },
    {
      id: 'tags',
      name: 'tags',
      label: 'Tags',
      type: 'tags',
      required: false,
      placeholder: 'Add relevant tags',
      helpText: 'Tags help readers find related content.'
    },
    {
      id: 'series',
      name: 'series',
      label: 'Series',
      type: 'text',
      required: false,
      placeholder: 'e.g., "Sanskrit Basics"',
      helpText: 'Optional series name if this post is part of a series.'
    },
    {
      id: 'publishDate',
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      required: false,
      helpText: 'Schedule when this post should be published.'
    }
  ]
}

// Landing Page Template
export const landingPageTemplate: ContentTemplate = {
  id: 'landing-page',
  name: 'Landing Page',
  description: 'Create marketing landing pages with conversion focus',
  type: ContentType.PAGE,
  icon: 'Globe',
  color: 'bg-indigo-500',
  requiredFields: ['title', 'heroTitle', 'heroSubtitle'],
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      placeholder: 'Enter page title',
      helpText: 'Internal title for this landing page.'
    },
    {
      id: 'heroTitle',
      name: 'heroTitle',
      label: 'Hero Title',
      type: 'text',
      required: true,
      placeholder: 'Compelling headline',
      helpText: 'Main headline that grabs attention.'
    },
    {
      id: 'heroSubtitle',
      name: 'heroSubtitle',
      label: 'Hero Subtitle',
      type: 'textarea',
      required: true,
      placeholder: 'Supporting text that explains the value',
      helpText: 'Subtitle that explains the main benefit or offer.'
    },
    {
      id: 'heroImage',
      name: 'heroImage',
      label: 'Hero Image',
      type: 'image',
      required: false,
      helpText: 'Background or featured image for the hero section.'
    },
    {
      id: 'ctaText',
      name: 'ctaText',
      label: 'Call-to-Action Text',
      type: 'text',
      required: false,
      placeholder: 'Get Started Now',
      helpText: 'Text for the main call-to-action button.'
    },
    {
      id: 'ctaUrl',
      name: 'ctaUrl',
      label: 'Call-to-Action URL',
      type: 'url',
      required: false,
      placeholder: 'https://example.com/signup',
      helpText: 'Where the CTA button should link to.'
    },
    {
      id: 'benefits',
      name: 'benefits',
      label: 'Key Benefits',
      type: 'array',
      required: false,
      helpText: 'List 3-5 key benefits or features.'
    },
    {
      id: 'testimonials',
      name: 'testimonials',
      label: 'Testimonials',
      type: 'array',
      required: false,
      helpText: 'Customer testimonials and reviews.'
    },
    {
      id: 'faq',
      name: 'faq',
      label: 'FAQ Section',
      type: 'array',
      required: false,
      helpText: 'Frequently asked questions and answers.'
    }
  ]
}

// Package Template
export const packageTemplate: ContentTemplate = {
  id: 'package',
  name: 'Course Package',
  description: 'Bundle multiple courses into a package',
  type: ContentType.PACKAGE,
  icon: 'Package',
  color: 'bg-teal-500',
  requiredFields: ['title', 'description', 'price', 'type'],
  fields: [
    {
      id: 'title',
      name: 'title',
      label: 'Package Title',
      type: 'text',
      required: true,
      placeholder: 'Enter package title',
      helpText: 'Clear, descriptive title for this package.',
      validation: { min: 5, max: 100 }
    },
    {
      id: 'description',
      name: 'description',
      label: 'Package Description',
      type: 'rich-text',
      required: true,
      placeholder: 'Describe what this package includes...',
      helpText: 'Detailed description of what students will get.'
    },
    {
      id: 'price',
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      placeholder: '99.00',
      helpText: 'Package price in USD.',
      validation: { min: 0 }
    },
    {
      id: 'type',
      name: 'type',
      label: 'Package Type',
      type: 'select',
      required: true,
      options: [
        { value: PackageType.FREE, label: 'Free' },
        { value: PackageType.PREMIUM, label: 'Premium' },
        { value: PackageType.PRO_MAX, label: 'Pro Max' }
      ],
      helpText: 'Select the package tier.'
    },
    {
      id: 'features',
      name: 'features',
      label: 'Key Features',
      type: 'array',
      required: false,
      helpText: 'List the main features and benefits of this package.'
    },
    {
      id: 'validityDays',
      name: 'validityDays',
      label: 'Validity (days)',
      type: 'number',
      required: false,
      placeholder: '365',
      helpText: 'How many days does access last? Leave empty for lifetime access.'
    },
    {
      id: 'courses',
      name: 'courses',
      label: 'Included Courses',
      type: 'multiselect',
      required: false,
      helpText: 'Select which courses are included in this package.'
    }
  ]
}

// All available templates
export const contentTemplates: ContentTemplate[] = [
  courseTemplate,
  lessonTemplate,
  quizTemplate,
  blogPostTemplate,
  landingPageTemplate,
  packageTemplate
]

// Template helper functions
export function getTemplateById(id: string): ContentTemplate | undefined {
  return contentTemplates.find(template => template.id === id)
}

export function getTemplatesByType(type: ContentType): ContentTemplate[] {
  return contentTemplates.filter(template => template.type === type)
}

export function validateTemplateData(template: ContentTemplate, data: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check required fields
  for (const fieldId of template.requiredFields) {
    if (!data[fieldId] || (typeof data[fieldId] === 'string' && data[fieldId].trim() === '')) {
      const field = template.fields.find(f => f.id === fieldId)
      errors.push(`${field?.label || fieldId} is required`)
    }
  }
  
  // Validate field constraints
  for (const field of template.fields) {
    const value = data[field.name]
    if (value && field.validation) {
      if (field.validation.min && value.length < field.validation.min) {
        errors.push(`${field.label} must be at least ${field.validation.min} characters`)
      }
      if (field.validation.max && value.length > field.validation.max) {
        errors.push(`${field.label} must be no more than ${field.validation.max} characters`)
      }
      if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
        errors.push(`${field.label} format is invalid`)
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

export function getDefaultTemplateData(template: ContentTemplate): Record<string, any> {
  const data: Record<string, any> = {}
  
  for (const field of template.fields) {
    if (field.defaultValue !== undefined) {
      data[field.name] = field.defaultValue
    }
  }
  
  if (template.defaultValues) {
    Object.assign(data, template.defaultValues)
  }
  
  return data
}
