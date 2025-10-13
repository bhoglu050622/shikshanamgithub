import { Course, CourseCategory, CategoryMapping, CategoryMetadata } from './types'

/**
 * Category metadata defining how each category is displayed
 */
export const CATEGORY_METADATA: Record<string, CategoryMetadata> = {
  'individual-premium': {
    id: 'individual-premium',
    title: '💎 Individual Premium Courses',
    subtitle: 'Specialized Learning Paths',
    description: 'Deep dive into specific areas of knowledge with our carefully crafted premium courses.',
    iconName: 'Crown',
    color: 'from-purple-500 to-indigo-500',
    hoverColor: 'from-purple-600 to-indigo-600',
  },
  'philosophy': {
    id: 'philosophy',
    title: '🧘 Philosophy & Darshan',
    subtitle: 'Ancient Wisdom Schools',
    description: 'Explore the six classical schools of Indian philosophy and their profound teachings.',
    iconName: 'Lightbulb',
    color: 'from-indigo-500 to-purple-500',
    hoverColor: 'from-indigo-600 to-purple-600',
  },
  'darshan': {
    id: 'darshan',
    title: '🧘 Darshan Philosophy',
    subtitle: 'Ancient Wisdom Schools',
    description: 'Explore the six classical schools of Indian philosophy and their profound teachings.',
    iconName: 'Lightbulb',
    color: 'from-indigo-500 to-purple-500',
    hoverColor: 'from-indigo-600 to-purple-600',
  },
  'upanishads': {
    id: 'upanishads',
    title: '📖 Upanishads',
    subtitle: 'Vedantic Wisdom',
    description: 'Study the ancient Upanishads and discover timeless spiritual insights.',
    iconName: 'BookOpen',
    color: 'from-orange-500 to-red-500',
    hoverColor: 'from-orange-600 to-red-600',
  },
  'upanishad': {
    id: 'upanishad',
    title: '📖 Upanishads',
    subtitle: 'Vedantic Wisdom',
    description: 'Study the ancient Upanishads and discover timeless spiritual insights.',
    iconName: 'BookOpen',
    color: 'from-orange-500 to-red-500',
    hoverColor: 'from-orange-600 to-red-600',
  },
  'sanskrit': {
    id: 'sanskrit',
    title: '🔤 Sanskrit Language',
    subtitle: 'The Language of the Gods',
    description: 'Master Sanskrit from basics to advanced conversation and comprehension.',
    iconName: 'Package',
    color: 'from-green-500 to-teal-500',
    hoverColor: 'from-green-600 to-teal-600',
  },
  'vedic': {
    id: 'vedic',
    title: '🕉️ Vedic Studies',
    subtitle: 'Sacred Vedic Knowledge',
    description: 'Learn Vedic chanting, recitation, and sacred practices from expert teachers.',
    iconName: 'BookOpen',
    color: 'from-amber-500 to-orange-500',
    hoverColor: 'from-amber-600 to-orange-600',
  },
  'life-skills': {
    id: 'life-skills',
    title: '💼 Life Skills & Wisdom',
    subtitle: 'Practical Ancient Wisdom',
    description: 'Apply ancient wisdom to modern life challenges and develop essential life skills.',
    iconName: 'Crown',
    color: 'from-rose-500 to-pink-500',
    hoverColor: 'from-rose-600 to-pink-600',
  },
  'free-masterclass': {
    id: 'free-masterclass',
    title: '🎁 Free Masterclasses & Intro Sessions',
    subtitle: 'Start Your Journey',
    description: 'Free introductory courses and masterclasses to explore different subjects.',
    iconName: 'Gift',
    color: 'from-blue-500 to-cyan-500',
    hoverColor: 'from-blue-600 to-cyan-600',
  },
  'new-courses': {
    id: 'new-courses',
    title: '✨ New Courses',
    subtitle: 'Recently Added',
    description: 'Newly added courses that are being categorized.',
    iconName: 'Sparkles',
    color: 'from-pink-500 to-rose-500',
    hoverColor: 'from-pink-600 to-rose-600',
  },
}

/**
 * Mapping of course slugs to their categories
 * Courses not listed here will be assigned to 'new-courses'
 */
export const COURSE_CATEGORY_MAPPING: CategoryMapping = {
  // Individual Premium Courses
  'chanakya-code': 'individual-premium',
  'sanskrit-conversation': 'individual-premium',
  'durgasaptashi': 'individual-premium',
  'kashmir-shaivism': 'individual-premium',
  'sanskrit-course': 'sanskrit',
  'sanskrit-live-class': 'sanskrit',
  
  // Philosophy & Darshan
  'advaita-vedanta-darshan-a-journey-through-drig-drishya-viveka': 'philosophy',
  'yoga-darshan': 'philosophy',
  'nyaya-darshan': 'philosophy',
  'vaisheshik-darshan': 'philosophy',
  'tantra-darshan': 'philosophy',
  'emotional-intelligence-with-samkhya-darshan': 'philosophy',
  
  // Upanishads
  'isha-upanishad': 'upanishads',
  'prashna-upanishad': 'upanishads',
  
  // Free Masterclasses
  'yoga-advanced': 'free-masterclass',
}

/**
 * Get category for a course slug
 */
export function getCategoryForCourse(slug: string): string {
  return COURSE_CATEGORY_MAPPING[slug] || 'new-courses'
}

/**
 * Categorize an array of courses into CourseCategory objects
 */
export function categorizeCourses(courses: Course[]): CourseCategory[] {
  // Group courses by category
  const categoryMap = new Map<string, Course[]>()
  
  courses.forEach(course => {
    const categoryId = course.category || getCategoryForCourse(course.slug)
    
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, [])
    }
    
    categoryMap.get(categoryId)!.push(course)
  })
  
  // Convert to CourseCategory array
  const categories: CourseCategory[] = []
  
  categoryMap.forEach((courses, categoryId) => {
    const metadata = CATEGORY_METADATA[categoryId]
    
    if (metadata) {
      categories.push({
        ...metadata,
        courses,
      })
    }
  })
  
  // Sort categories by a preferred order
  const categoryOrder = [
    'individual-premium',
    'philosophy',
    'upanishads',
    'sanskrit',
    'free-masterclass',
    'new-courses',
  ]
  
  categories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.id)
    const indexB = categoryOrder.indexOf(b.id)
    
    // If both are in the order array, sort by order
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }
    
    // If only one is in the order array, prioritize it
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    
    // Otherwise sort alphabetically
    return a.title.localeCompare(b.title)
  })
  
  return categories
}

/**
 * Get courses by category ID
 */
export function getCoursesByCategory(courses: Course[], categoryId: string): Course[] {
  return courses.filter(course => {
    const courseCategoryId = course.category || getCategoryForCourse(course.slug)
    return courseCategoryId === categoryId
  })
}

