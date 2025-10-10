'use client'

export interface CourseRecommendation {
  id: string
  title: string
  description: string
  href: string
  image?: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  price?: number
  category: string
  tags: string[]
}

export interface PackageRecommendation {
  id: string
  title: string
  description: string
  href: string
  image?: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  price?: number
  courses: string[]
  tags: string[]
}

export interface PersonalityProfile {
  gunaProfiler?: {
    dominantGuna: 'sattva' | 'rajas' | 'tamas'
    percentages: {
      sattva: number
      rajas: number
      tamas: number
    }
    archetype: string
  }
  shivaAlignment?: {
    dominantArchetype: 'unbound' | 'harmonious' | 'reflective' | 'awakener' | 'emerging'
    percentage: number
    archetype: string
  }
}

// Course data mapping
const courseData: Record<string, CourseRecommendation> = {
  'sanskrit-basics': {
    id: 'sanskrit-basics',
    title: 'Sanskrit Bhasha Pragya',
    description: 'Master the fundamentals of Sanskrit language and script',
    href: '/courses/sanskrit-bhasha-pragya',
    level: 'beginner',
    duration: '8 weeks',
    price: 2999,
    category: 'Language',
    tags: ['sanskrit', 'language', 'script', 'beginner']
  },
  'emotional-intelligence': {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence with Sāṅkhya',
    description: 'Master your emotions through ancient wisdom',
    href: '/courses/emotional-intelligence-with-samkhya-darshan',
    level: 'intermediate',
    duration: '12 weeks',
    price: 4999,
    category: 'Philosophy',
    tags: ['samkhya', 'emotions', 'psychology', 'intermediate']
  },
  'yoga-philosophy': {
    id: 'yoga-philosophy',
    title: 'Yoga Darshan',
    description: 'Explore the philosophical foundations of yoga',
    href: '/courses/yoga-darshan-course',
    level: 'intermediate',
    duration: '10 weeks',
    price: 3999,
    category: 'Philosophy',
    tags: ['yoga', 'philosophy', 'patanjali', 'intermediate']
  },
  'advaita-vedanta': {
    id: 'advaita-vedanta',
    title: 'Advaita Vedanta',
    description: 'Non-dual philosophy and self-realization',
    href: '/courses/advaita-vedanta',
    level: 'advanced',
    duration: '16 weeks',
    price: 6999,
    category: 'Philosophy',
    tags: ['vedanta', 'non-dual', 'enlightenment', 'advanced']
  },
  'kashmir-shaivism': {
    id: 'kashmir-shaivism',
    title: 'Kashmir Shaivism',
    description: 'Tantric philosophy and consciousness expansion',
    href: '/courses/kashmir-shaivism',
    level: 'advanced',
    duration: '14 weeks',
    price: 5999,
    category: 'Philosophy',
    tags: ['shaivism', 'tantra', 'consciousness', 'advanced']
  },
  'isha-upanishad': {
    id: 'isha-upanishad',
    title: 'Isha Upanishad',
    description: 'The essence of Vedic wisdom',
    href: '/courses/isha-upanishad-course',
    level: 'intermediate',
    duration: '8 weeks',
    price: 3499,
    category: 'Scripture',
    tags: ['upanishad', 'vedic', 'wisdom', 'intermediate']
  },
  'prashna-upanishad': {
    id: 'prashna-upanishad',
    title: 'Prashna Upanishad',
    description: 'The science of questions and answers',
    href: '/courses/prashna-upanishad',
    level: 'intermediate',
    duration: '10 weeks',
    price: 3999,
    category: 'Scripture',
    tags: ['upanishad', 'questions', 'science', 'intermediate']
  },
  'nyaya-darshan': {
    id: 'nyaya-darshan',
    title: 'Nyaya Darshan',
    description: 'Logic and reasoning in Indian philosophy',
    href: '/courses/nyaya-darshan-course',
    level: 'advanced',
    duration: '12 weeks',
    price: 4499,
    category: 'Philosophy',
    tags: ['nyaya', 'logic', 'reasoning', 'advanced']
  },
  'vaisheshik-darshan': {
    id: 'vaisheshik-darshan',
    title: 'Vaisheshik Darshan',
    description: 'Atomic theory and natural philosophy',
    href: '/courses/vaisheshik-darshan-course',
    level: 'advanced',
    duration: '10 weeks',
    price: 3999,
    category: 'Philosophy',
    tags: ['vaisheshik', 'atoms', 'nature', 'advanced']
  },
  'chanakya-code': {
    id: 'chanakya-code',
    title: 'Chanakya Code',
    description: 'Ancient wisdom for modern leadership',
    href: '/courses/chanakya-code',
    level: 'intermediate',
    duration: '8 weeks',
    price: 2999,
    category: 'Leadership',
    tags: ['chanakya', 'leadership', 'strategy', 'intermediate']
  }
}

// Package data mapping
const packageData: Record<string, PackageRecommendation> = {
  'sanskrit-philosophies-bundle': {
    id: 'sanskrit-philosophies-bundle',
    title: 'Sanskrit & Philosophies Bundle',
    description: 'Complete journey from Sanskrit basics to advanced philosophies',
    href: '/packages/sanskrit-philosophies-bundle',
    level: 'beginner',
    duration: '24 weeks',
    price: 9999,
    courses: ['sanskrit-basics', 'yoga-philosophy', 'advaita-vedanta'],
    tags: ['sanskrit', 'philosophy', 'complete', 'beginner']
  },
  'vedanta-shaivism-bundle': {
    id: 'vedanta-shaivism-bundle',
    title: 'Vedanta & Shaivism Bundle',
    description: 'Deep dive into non-dual and tantric traditions',
    href: '/packages/vedanta-shaivism-bundle',
    level: 'advanced',
    duration: '30 weeks',
    price: 12999,
    courses: ['advaita-vedanta', 'kashmir-shaivism', 'isha-upanishad'],
    tags: ['vedanta', 'shaivism', 'advanced', 'non-dual']
  },
  'samkhya-emotional-intelligence': {
    id: 'samkhya-emotional-intelligence',
    title: 'Samkhya & Emotional Intelligence',
    description: 'Transform your emotional landscape through ancient wisdom',
    href: '/packages/samkhya-emotional-intelligence',
    level: 'intermediate',
    duration: '20 weeks',
    price: 7999,
    courses: ['emotional-intelligence', 'yoga-philosophy'],
    tags: ['samkhya', 'emotions', 'psychology', 'intermediate']
  }
}

// Guna-based recommendations
const gunaRecommendations = {
  sattva: {
    courses: ['advaita-vedanta', 'kashmir-shaivism', 'isha-upanishad', 'prashna-upanishad'],
    packages: ['vedanta-shaivism-bundle'],
    priority: ['philosophy', 'scripture', 'consciousness']
  },
  rajas: {
    courses: ['emotional-intelligence', 'yoga-philosophy', 'chanakya-code', 'nyaya-darshan'],
    packages: ['samkhya-emotional-intelligence'],
    priority: ['psychology', 'leadership', 'action']
  },
  tamas: {
    courses: ['sanskrit-basics', 'yoga-philosophy', 'isha-upanishad'],
    packages: ['sanskrit-philosophies-bundle'],
    priority: ['language', 'foundation', 'grounding']
  }
}

// Alignment-based recommendations
const alignmentRecommendations = {
  unbound: {
    courses: ['advaita-vedanta', 'kashmir-shaivism', 'prashna-upanishad'],
    packages: ['vedanta-shaivism-bundle'],
    priority: ['consciousness', 'freedom', 'transcendence']
  },
  harmonious: {
    courses: ['yoga-philosophy', 'isha-upanishad', 'emotional-intelligence'],
    packages: ['samkhya-emotional-intelligence'],
    priority: ['balance', 'integration', 'wisdom']
  },
  reflective: {
    courses: ['nyaya-darshan', 'vaisheshik-darshan', 'prashna-upanishad'],
    packages: [],
    priority: ['logic', 'analysis', 'understanding']
  },
  awakener: {
    courses: ['kashmir-shaivism', 'advaita-vedanta', 'chanakya-code'],
    packages: ['vedanta-shaivism-bundle'],
    priority: ['transformation', 'leadership', 'consciousness']
  },
  emerging: {
    courses: ['sanskrit-basics', 'yoga-philosophy', 'isha-upanishad'],
    packages: ['sanskrit-philosophies-bundle'],
    priority: ['foundation', 'growth', 'development']
  }
}

/**
 * Get personalized course recommendations based on personality profile
 */
export function getCourseRecommendations(profile: PersonalityProfile): {
  courses: CourseRecommendation[]
  packages: PackageRecommendation[]
} {
  const recommendedCourses: CourseRecommendation[] = []
  const recommendedPackages: PackageRecommendation[] = []
  
  // Get guna-based recommendations
  if (profile.gunaProfiler) {
    const gunaRecs = gunaRecommendations[profile.gunaProfiler.dominantGuna]
    
    // Add courses if gunaRecs exists and has courses
    if (gunaRecs && gunaRecs.courses) {
      gunaRecs.courses.forEach(courseId => {
        if (courseData[courseId]) {
          recommendedCourses.push(courseData[courseId])
        }
      })
    }
    
    // Add packages if gunaRecs exists and has packages
    if (gunaRecs && gunaRecs.packages) {
      gunaRecs.packages.forEach(packageId => {
        if (packageData[packageId]) {
          recommendedPackages.push(packageData[packageId])
        }
      })
    }
  }
  
  // Get alignment-based recommendations
  if (profile.shivaAlignment) {
    const alignmentRecs = alignmentRecommendations[profile.shivaAlignment.dominantArchetype]
    
    // Add courses (avoid duplicates) if alignmentRecs exists and has courses
    if (alignmentRecs && alignmentRecs.courses) {
      alignmentRecs.courses.forEach(courseId => {
        if (courseData[courseId] && !recommendedCourses.find(c => c.id === courseId)) {
          recommendedCourses.push(courseData[courseId])
        }
      })
    }
    
    // Add packages (avoid duplicates) if alignmentRecs exists and has packages
    if (alignmentRecs && alignmentRecs.packages) {
      alignmentRecs.packages.forEach(packageId => {
        if (packageData[packageId] && !recommendedPackages.find(p => p.id === packageId)) {
          recommendedPackages.push(packageData[packageId])
        }
      })
    }
  }
  
  // Sort by priority and level
  recommendedCourses.sort((a, b) => {
    // Prioritize based on personality traits
    const aPriority = getCoursePriority(a, profile)
    const bPriority = getCoursePriority(b, profile)
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }
    
    // Then by level (beginner -> intermediate -> advanced)
    const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 }
    return levelOrder[a.level] - levelOrder[b.level]
  })
  
  return {
    courses: recommendedCourses.slice(0, 6), // Limit to 6 courses
    packages: recommendedPackages.slice(0, 3)  // Limit to 3 packages
  }
}

/**
 * Calculate priority score for a course based on personality profile
 */
function getCoursePriority(course: CourseRecommendation, profile: PersonalityProfile): number {
  let priority = 0
  
  // Guna-based priority
  if (profile.gunaProfiler) {
    const gunaRecs = gunaRecommendations[profile.gunaProfiler.dominantGuna]
    if (gunaRecs && gunaRecs.courses && gunaRecs.courses.includes(course.id)) {
      priority += 3
    }
    if (gunaRecs && gunaRecs.priority && gunaRecs.priority.some(tag => course.tags.includes(tag))) {
      priority += 2
    }
  }
  
  // Alignment-based priority
  if (profile.shivaAlignment) {
    const alignmentRecs = alignmentRecommendations[profile.shivaAlignment.dominantArchetype]
    if (alignmentRecs && alignmentRecs.courses && alignmentRecs.courses.includes(course.id)) {
      priority += 3
    }
    if (alignmentRecs && alignmentRecs.priority && alignmentRecs.priority.some(tag => course.tags.includes(tag))) {
      priority += 2
    }
  }
  
  return priority
}

/**
 * Get all available courses
 */
export function getAllCourses(): CourseRecommendation[] {
  return Object.values(courseData)
}

/**
 * Get all available packages
 */
export function getAllPackages(): PackageRecommendation[] {
  return Object.values(packageData)
}

/**
 * Get courses by level
 */
export function getCoursesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): CourseRecommendation[] {
  return Object.values(courseData).filter(course => course.level === level)
}

/**
 * Get courses by category
 */
export function getCoursesByCategory(category: string): CourseRecommendation[] {
  return Object.values(courseData).filter(course => course.category === category)
}
