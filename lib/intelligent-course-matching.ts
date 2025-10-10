import { getAllQuizResults } from '@/lib/quiz-tracking'

// Enhanced course interface with personality metadata
export interface EnhancedCourse {
  id: string
  title: string
  description: string
  price: string
  duration: string
  level: string
  category: string
  link: string
  features: string[]
  // Personality matching metadata
  gunaAlignment: {
    sattva: number // 0-10 score
    rajas: number
    tamas: number
  }
  teachingStyle: 'contemplative' | 'dynamic' | 'structured'
  contentType: 'philosophy' | 'language' | 'practice'
  spiritualDepth: 'foundational' | 'intermediate' | 'advanced'
  learningPace: 'self-paced' | 'intensive' | 'gradual'
  // Match scoring
  matchScore?: number
  reasoning?: string
  priority?: 'high' | 'medium' | 'low'
}

// Enhanced package interface
export interface EnhancedPackage {
  id: string
  title: string
  description: string
  currentPrice: string
  duration: string
  level: string
  category: string
  ctaLink: string
  features: string[]
  includes: string[]
  // Personality matching metadata
  gunaAlignment: {
    sattva: number
    rajas: number
    tamas: number
  }
  teachingStyle: 'contemplative' | 'dynamic' | 'structured'
  contentType: 'philosophy' | 'language' | 'practice'
  spiritualDepth: 'foundational' | 'intermediate' | 'advanced'
  learningPace: 'self-paced' | 'intensive' | 'gradual'
  // Match scoring
  matchScore?: number
  reasoning?: string
  priority?: 'high' | 'medium' | 'low'
}

// Course metadata mapping function
function getCourseMetadata(course: any): {
  gunaAlignment: { sattva: number; rajas: number; tamas: number }
  teachingStyle: 'contemplative' | 'dynamic' | 'structured'
  contentType: 'philosophy' | 'language' | 'practice'
  spiritualDepth: 'foundational' | 'intermediate' | 'advanced'
  learningPace: 'self-paced' | 'intensive' | 'gradual'
} {
  // Determine metadata based on course properties
  const title = course.title?.toLowerCase() || ''
  const description = course.description?.toLowerCase() || ''
  const category = course.category?.toLowerCase() || ''
  
  // Content type detection
  let contentType: 'philosophy' | 'language' | 'practice' = 'philosophy'
  if (title.includes('sanskrit') || title.includes('language') || category === 'language') {
    contentType = 'language'
  } else if (title.includes('chanakya') || title.includes('business') || title.includes('recitation') || category === 'practice') {
    contentType = 'practice'
  }
  
  // Spiritual depth detection
  let spiritualDepth: 'foundational' | 'intermediate' | 'advanced' = 'intermediate'
  if (title.includes('beginner') || title.includes('basics') || title.includes('introduction') || course.level === 'Beginner') {
    spiritualDepth = 'foundational'
  } else if (title.includes('advanced') || title.includes('vedanta') || title.includes('shaivism') || course.level === 'Advanced') {
    spiritualDepth = 'advanced'
  }
  
  // Teaching style detection
  let teachingStyle: 'contemplative' | 'dynamic' | 'structured' = 'structured'
  if (title.includes('vedanta') || title.includes('upanishad') || title.includes('meditation') || title.includes('philosophy')) {
    teachingStyle = 'contemplative'
  } else if (title.includes('conversation') || title.includes('speak') || title.includes('chanakya') || title.includes('business')) {
    teachingStyle = 'dynamic'
  }
  
  // Learning pace detection
  let learningPace: 'self-paced' | 'intensive' | 'gradual' = 'gradual'
  if (title.includes('speak') || title.includes('conversation') || title.includes('intensive')) {
    learningPace = 'intensive'
  } else if (title.includes('self') || title.includes('meditation') || title.includes('philosophy')) {
    learningPace = 'self-paced'
  }
  
  // Guna alignment based on content analysis
  let gunaAlignment = { sattva: 5, rajas: 5, tamas: 5 } // Default balanced
  
  if (contentType === 'philosophy') {
    if (spiritualDepth === 'advanced') {
      gunaAlignment = { sattva: 9, rajas: 3, tamas: 2 }
    } else if (spiritualDepth === 'intermediate') {
      gunaAlignment = { sattva: 7, rajas: 4, tamas: 4 }
    } else {
      gunaAlignment = { sattva: 6, rajas: 4, tamas: 6 }
    }
  } else if (contentType === 'language') {
    if (teachingStyle === 'dynamic') {
      gunaAlignment = { sattva: 4, rajas: 8, tamas: 3 }
    } else {
      gunaAlignment = { sattva: 5, rajas: 6, tamas: 7 }
    }
  } else if (contentType === 'practice') {
    if (title.includes('chanakya') || title.includes('business')) {
      gunaAlignment = { sattva: 3, rajas: 9, tamas: 4 }
    } else {
      gunaAlignment = { sattva: 8, rajas: 3, tamas: 7 }
    }
  }
  
  return {
    gunaAlignment,
    teachingStyle,
    contentType,
    spiritualDepth,
    learningPace
  }
}

// Package data with personality metadata
const packageData: EnhancedPackage[] = [
  {
    id: 'sanskrit-basics-to-conversation',
    title: 'Sanskrit Package: Learn Sanskrit from Basics to Conversation',
    description: 'Master Sanskrit from absolute basics to conversational level. This comprehensive package includes grammar, vocabulary, pronunciation, and practical conversation skills.',
    currentPrice: '₹2,898',
    duration: '12-15 weeks',
    level: 'Beginner',
    category: 'sanskrit',
    ctaLink: 'https://shikshanam.in/package-of-%e0%a4%b8%e0%a4%82%e0%a4%b8%e0%a5%8d%e0%a4%95%e0%a5%83%e0%a4%a4/',
    features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context', 'Audio Lessons', 'Writing Exercises'],
    includes: ['Video Lessons', 'Audio Files', 'PDF Materials', 'Live Q&A Sessions', 'Certificate of Completion', 'Lifetime Access'],
    gunaAlignment: { sattva: 5, rajas: 6, tamas: 7 },
    teachingStyle: 'structured',
    contentType: 'language',
    spiritualDepth: 'foundational',
    learningPace: 'gradual'
  },
  {
    id: 'sanskrit-philosophies-bundle',
    title: 'Sanskrit & Philosophies Bundle',
    description: 'Complete learning package combining Sanskrit language mastery with philosophical insights',
    currentPrice: '₹4,999',
    duration: '20-24 weeks',
    level: 'Intermediate',
    category: 'philosophy',
    ctaLink: '/packages/sanskrit-philosophies-bundle',
    features: ['Sanskrit Language', 'Philosophy Texts', 'Cultural Context', 'Spiritual Insights'],
    includes: ['Multiple Courses', 'Live Sessions', 'Study Materials', 'Certification'],
    gunaAlignment: { sattva: 7, rajas: 5, tamas: 6 },
    teachingStyle: 'contemplative',
    contentType: 'philosophy',
    spiritualDepth: 'intermediate',
    learningPace: 'gradual'
  },
  {
    id: 'ultimate-sankhya-bundle',
    title: 'Ultimate Samkhya Bundle',
    description: 'Complete Samkhya philosophy package with emotional intelligence and practical application',
    currentPrice: '₹3,999',
    duration: '16-20 weeks',
    level: 'Intermediate',
    category: 'philosophy',
    ctaLink: '/packages/ultimate-sankhya-bundle',
    features: ['Samkhya Philosophy', 'Emotional Intelligence', 'Practical Application', 'Modern Psychology'],
    includes: ['Video Lessons', 'Workbooks', 'Live Sessions', 'Certification'],
    gunaAlignment: { sattva: 6, rajas: 6, tamas: 5 },
    teachingStyle: 'dynamic',
    contentType: 'philosophy',
    spiritualDepth: 'intermediate',
    learningPace: 'gradual'
  }
]

// Personality profile interface
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

// Calculate match score for a course/package
function calculateMatchScore(item: EnhancedCourse | EnhancedPackage, profile: PersonalityProfile): number {
  let score = 0
  let totalWeight = 0

  // Guna Profile Match (40% weight)
  if (profile.gunaProfiler) {
    const gunaWeight = 0.4
    const gunaScore = 
      (item.gunaAlignment.sattva * profile.gunaProfiler.percentages.sattva / 100) +
      (item.gunaAlignment.rajas * profile.gunaProfiler.percentages.rajas / 100) +
      (item.gunaAlignment.tamas * profile.gunaProfiler.percentages.tamas / 100)
    
    score += (gunaScore / 10) * gunaWeight * 100
    totalWeight += gunaWeight
  }

  // Spiritual Alignment Match (30% weight)
  if (profile.shivaAlignment) {
    const alignmentWeight = 0.3
    let alignmentScore = 0
    
    // High alignment (>80%): Advanced courses
    if (profile.shivaAlignment.percentage > 80) {
      alignmentScore = item.spiritualDepth === 'advanced' ? 10 : 
                      item.spiritualDepth === 'intermediate' ? 7 : 4
    }
    // Medium alignment (60-80%): Intermediate courses
    else if (profile.shivaAlignment.percentage > 60) {
      alignmentScore = item.spiritualDepth === 'intermediate' ? 10 : 
                      item.spiritualDepth === 'advanced' ? 8 : 6
    }
    // Developing (<60%): Foundational courses
    else {
      alignmentScore = item.spiritualDepth === 'foundational' ? 10 : 
                      item.spiritualDepth === 'intermediate' ? 7 : 4
    }
    
    score += (alignmentScore / 10) * alignmentWeight * 100
    totalWeight += alignmentWeight
  }

  // Course Metadata Alignment (30% weight)
  const metadataWeight = 0.3
  let metadataScore = 0

  // Teaching style compatibility
  if (profile.gunaProfiler) {
    const dominantGuna = profile.gunaProfiler.dominantGuna
    if (dominantGuna === 'sattva' && item.teachingStyle === 'contemplative') metadataScore += 3
    else if (dominantGuna === 'rajas' && item.teachingStyle === 'dynamic') metadataScore += 3
    else if (dominantGuna === 'tamas' && item.teachingStyle === 'structured') metadataScore += 3
    else metadataScore += 1
  }

  // Content type preference
  if (profile.gunaProfiler) {
    const dominantGuna = profile.gunaProfiler.dominantGuna
    if (dominantGuna === 'sattva' && item.contentType === 'philosophy') metadataScore += 3
    else if (dominantGuna === 'rajas' && item.contentType === 'practice') metadataScore += 3
    else if (dominantGuna === 'tamas' && item.contentType === 'language') metadataScore += 3
    else metadataScore += 1
  }

  // Learning pace compatibility
  if (profile.gunaProfiler) {
    const dominantGuna = profile.gunaProfiler.dominantGuna
    if (dominantGuna === 'sattva' && item.learningPace === 'self-paced') metadataScore += 2
    else if (dominantGuna === 'rajas' && item.learningPace === 'intensive') metadataScore += 2
    else if (dominantGuna === 'tamas' && item.learningPace === 'gradual') metadataScore += 2
    else metadataScore += 1
  }

  score += (metadataScore / 8) * metadataWeight * 100
  totalWeight += metadataWeight

  return totalWeight > 0 ? Math.round(score / totalWeight) : 0
}

// Generate detailed reasoning for why a course/package will help the user
function generateReasoning(item: EnhancedCourse | EnhancedPackage, profile: PersonalityProfile): string {
  const reasons = []
  const benefits = []
  const approach = []
  
  if (profile.gunaProfiler) {
    const dominantGuna = profile.gunaProfiler.dominantGuna
    const percentages = profile.gunaProfiler.percentages
    
    // Guna-based reasoning with specific benefits
    if (dominantGuna === 'sattva') {
      if (item.contentType === 'philosophy') {
        reasons.push(`Your Sattva-dominant nature (${percentages.sattva}%) makes you naturally drawn to philosophical study and contemplation.`)
        benefits.push(`This course will help you develop deeper spiritual insights and enhance your natural wisdom-seeking tendencies.`)
        approach.push(`Study in quiet, peaceful environments during early morning hours for maximum benefit.`)
      }
      if (item.teachingStyle === 'contemplative') {
        reasons.push(`The contemplative teaching style aligns perfectly with your reflective nature.`)
        benefits.push(`You'll find this approach deeply satisfying and spiritually enriching.`)
      }
    } else if (dominantGuna === 'rajas') {
      if (item.contentType === 'practice') {
        reasons.push(`Your Rajas-dominant nature (${percentages.rajas}%) thrives on practical application and active learning.`)
        benefits.push(`This course will channel your energy into productive spiritual growth and real-world application.`)
        approach.push(`Engage actively in discussions and practical exercises to maximize your learning potential.`)
      }
      if (item.teachingStyle === 'dynamic') {
        reasons.push(`The dynamic teaching approach matches your energetic learning style.`)
        benefits.push(`You'll stay engaged and motivated throughout the course with this active approach.`)
      }
    } else if (dominantGuna === 'tamas') {
      if (item.contentType === 'language') {
        reasons.push(`Your Tamas-dominant nature (${percentages.tamas}%) benefits from structured, foundational learning.`)
        benefits.push(`This systematic approach will help you build confidence and establish a strong spiritual foundation.`)
        approach.push(`Follow the structured curriculum step-by-step and practice regularly for steady progress.`)
      }
      if (item.teachingStyle === 'structured') {
        reasons.push(`The structured approach provides the stability you need for effective learning.`)
        benefits.push(`This methodical approach will help you absorb knowledge deeply and retain it long-term.`)
      }
    }
  }

  if (profile.shivaAlignment) {
    const alignment = profile.shivaAlignment.percentage
    const archetype = profile.shivaAlignment.archetype
    
    if (alignment > 80 && item.spiritualDepth === 'advanced') {
      reasons.push(`Your high spiritual alignment (${alignment}%) indicates readiness for advanced philosophical study.`)
      benefits.push(`This course will help you transcend current limitations and reach new levels of spiritual understanding.`)
      approach.push(`Approach this course with an open mind and be prepared for profound transformations.`)
    } else if (alignment > 60 && item.spiritualDepth === 'intermediate') {
      reasons.push(`Your developing spiritual alignment (${alignment}%) suggests you're ready for intermediate concepts.`)
      benefits.push(`This course will bridge foundational knowledge with advanced spiritual insights, perfect for your current level.`)
      approach.push(`Take time to reflect on each lesson and integrate the teachings into your daily practice.`)
    } else if (alignment < 60 && item.spiritualDepth === 'foundational') {
      reasons.push(`This foundational course will help build your spiritual understanding from the ground up.`)
      benefits.push(`This course will establish a solid foundation for your spiritual journey and prepare you for deeper studies.`)
      approach.push(`Focus on understanding the basics thoroughly before moving to more advanced concepts.`)
    }
    
    // Archetype-specific benefits
    if (archetype.includes('unbound') || archetype.includes('transcendent')) {
      benefits.push(`This course will help you transcend conventional limitations and experience higher states of consciousness.`)
    } else if (archetype.includes('harmonious') || archetype.includes('integrated')) {
      benefits.push(`This course will help you integrate spiritual wisdom into your daily life and relationships.`)
    } else if (archetype.includes('reflective') || archetype.includes('contemplative')) {
      benefits.push(`This course will deepen your contemplative practice and enhance your inner wisdom.`)
    }
  }

  // Content-specific benefits
  if (item.contentType === 'philosophy') {
    benefits.push(`This course will deepen your understanding of ancient wisdom and provide practical insights for daily life.`)
    benefits.push(`You'll develop critical thinking skills and gain tools for navigating life's challenges with wisdom.`)
  } else if (item.contentType === 'language') {
    benefits.push(`Learning Sanskrit will give you direct access to original texts and enhance your spiritual practice.`)
    benefits.push(`You'll be able to chant mantras with proper pronunciation and understand sacred texts in their original language.`)
  } else if (item.contentType === 'practice') {
    benefits.push(`This practical course will help you apply ancient wisdom in modern contexts.`)
    benefits.push(`You'll develop practical skills that can immediately improve your life and spiritual practice.`)
  }

  // Learning pace benefits
  if (item.learningPace === 'self-paced') {
    approach.push(`Take advantage of the self-paced nature to study at your own rhythm and depth.`)
  } else if (item.learningPace === 'intensive') {
    approach.push(`Prepare for an intensive learning experience that will accelerate your spiritual growth.`)
  } else if (item.learningPace === 'gradual') {
    approach.push(`Follow the gradual progression to build a strong foundation without feeling overwhelmed.`)
  }

  // Combine all elements
  const fullReasoning = []
  if (reasons.length > 0) {
    fullReasoning.push(`**Why This Course:** ${reasons.join(' ')}`)
  }
  if (benefits.length > 0) {
    fullReasoning.push(`**What You'll Gain:** ${benefits.join(' ')}`)
  }
  if (approach.length > 0) {
    fullReasoning.push(`**Best Approach:** ${approach.join(' ')}`)
  }

  return fullReasoning.length > 0 ? fullReasoning.join('\n\n') : 'This course aligns with your learning goals and personality profile.'
}

// Get intelligent recommendations
export function getIntelligentRecommendations(): {
  courses: EnhancedCourse[]
  packages: EnhancedPackage[]
} {
  const quizResults = getAllQuizResults()
  
  if (!quizResults.gunaProfiler && !quizResults.shivaAlignment) {
    return { courses: [], packages: [] }
  }

  const profile: PersonalityProfile = {
    gunaProfiler: quizResults.gunaProfiler ? {
      dominantGuna: quizResults.gunaProfiler.result.dominantGuna,
      percentages: quizResults.gunaProfiler.result.percentages,
      archetype: quizResults.gunaProfiler.result.archetype
    } : undefined,
    shivaAlignment: quizResults.shivaAlignment ? {
      dominantArchetype: quizResults.shivaAlignment.result.dominantArchetype,
      percentage: quizResults.shivaAlignment.result.percentage,
      archetype: quizResults.shivaAlignment.result.archetype
    } : undefined
  }

  // Get all courses dynamically from the courses page
  const allCourses = getAllCourses()
  
  // Calculate scores for courses
  const scoredCourses = allCourses.map(course => {
    const metadata = getCourseMetadata(course)
    const enhancedCourse: EnhancedCourse = {
      ...course,
      ...metadata
    }
    
    const matchScore = calculateMatchScore(enhancedCourse, profile)
    const reasoning = generateReasoning(enhancedCourse, profile)
    const priority: 'high' | 'medium' | 'low' = matchScore >= 80 ? 'high' : matchScore >= 60 ? 'medium' : 'low'
    
    return {
      ...enhancedCourse,
      matchScore,
      reasoning,
      priority
    }
  })

  // Calculate scores for packages
  const scoredPackages = packageData.map(pkg => {
    const matchScore = calculateMatchScore(pkg, profile)
    const reasoning = generateReasoning(pkg, profile)
    const priority: 'high' | 'medium' | 'low' = matchScore >= 80 ? 'high' : matchScore >= 60 ? 'medium' : 'low'
    
    return {
      ...pkg,
      matchScore,
      reasoning,
      priority
    }
  })

  // Sort by match score
  const sortedCourses = scoredCourses.sort((a, b) => b.matchScore! - a.matchScore!)
  const sortedPackages = scoredPackages.sort((a, b) => b.matchScore! - a.matchScore!)

  return {
    courses: sortedCourses,
    packages: sortedPackages
  }
}

// Get all courses dynamically from the courses page
export function getAllCourses(): EnhancedCourse[] {
  // Import actual courses from the courses page
  const courses = [
    // Language Courses
    {
      id: 'sanskrit-bhasha-pragya',
      title: 'संस्कृत भाषा प्रज्ञा: Online Sanskrit Course in Hindi for Beginners',
      description: 'Comprehensive Sanskrit language course taught in Hindi for complete beginners',
      price: '₹2,499',
      duration: '12-15 weeks',
      level: 'Beginner',
      category: 'language',
      link: '/courses/sanskrit-bhasha-pragya',
      features: ['Hindi Instruction', 'Grammar Fundamentals', 'Reading Practice', 'Writing Exercises']
    },
    {
      id: 'sanskrit-beginner',
      title: 'संस्कृत: प्रारंभ से संभाषण तक: Level-1: Package',
      description: 'Complete Sanskrit foundation course from basics to conversation level',
      price: '₹2,898',
      duration: '12-15 weeks',
      level: 'Beginner',
      category: 'language',
      link: '/courses/sanskrit-beginner',
      features: ['Grammar Fundamentals', 'Vocabulary Building', 'Conversation Practice', 'Cultural Context']
    },
    {
      id: 'sanskrit-conversation',
      title: 'संस्कृत संभाषण: Speak Sanskrit Without Grammar: Level-1',
      description: 'Learn to speak Sanskrit naturally without getting bogged down by complex grammar rules',
      price: '₹399',
      duration: '4-6 weeks',
      level: 'Beginner',
      category: 'language',
      link: '/courses/sanskrit-conversation',
      features: ['Conversational Sanskrit', 'Practical Usage', 'Audio Lessons', 'Speaking Practice']
    },
    // Philosophy Courses
    {
      id: 'advaita-vedanta',
      title: 'Advaita Vedanta Darshan: दृग दृश्य विवेक द्वारा अद्वैत की व्याख्या',
      description: 'Deep exploration of non-dual philosophy through the lens of Drig Drishya Viveka',
      price: '₹1,999',
      duration: '8-10 weeks',
      level: 'Advanced',
      category: 'philosophy',
      link: '/courses/advaita-vedanta',
      features: ['Non-Dual Philosophy', 'Text Study', 'Meditation Practices', 'Spiritual Insights']
    },
    {
      id: 'kashmir-shaivism',
      title: 'कश्मीरी शैव दर्शन – अनंत सत्य की खोज',
      description: 'Journey into the profound depths of Kashmiri Shaivism and the search for infinite truth',
      price: '₹1,999',
      duration: '10-12 weeks',
      level: 'Advanced',
      category: 'philosophy',
      link: '/courses/kashmir-shaivism',
      features: ['Tantric Philosophy', 'Consciousness Studies', 'Spiritual Practices', 'Advanced Concepts']
    },
    {
      id: 'prashna-upanishad',
      title: 'प्रश्न उपनिषद्: Online Course on The Prashna Upanishad',
      description: 'Deep study of the Prashna Upanishad with question-answer format exploration',
      price: '₹1,499',
      duration: '6-8 weeks',
      level: 'Intermediate',
      category: 'philosophy',
      link: '/courses/prashna-upanishad',
      features: ['Text Study', 'Question-Answer Format', 'Meditation Practices', 'Spiritual Insights']
    },
    {
      id: 'isha-upanishad',
      title: 'ईशावास्य उपनिषद्: Online Course on The Isha Upanishad',
      description: 'Introduction to Upanishadic wisdom through the Isha Upanishad',
      price: '₹999',
      duration: '4-6 weeks',
      level: 'Beginner',
      category: 'philosophy',
      link: '/courses/isha-upanishad-course',
      features: ['Upanishadic Wisdom', 'Chanting Practice', 'Philosophical Discussion', 'Practical Application']
    },
    {
      id: 'nyaya-darshan',
      title: 'न्याय दर्शन: The Art of Perception: Nyaya Darshan',
      description: 'Master the art of logical reasoning and systematic debate through Nyaya philosophy',
      price: '₹999',
      duration: '6-8 weeks',
      level: 'Intermediate',
      category: 'philosophy',
      link: '/courses/nyaya-darshan-course',
      features: ['Logical Reasoning', 'Debate Techniques', 'Fallacy Recognition', 'Valid Inference']
    },
    {
      id: 'vaisheshik-darshan',
      title: 'वैशेषिक दर्शन: Philosophy of Maharshi Kanada\'s Vaisheshik Sutras',
      description: 'Explore the atomic theory of reality and fundamental building blocks of existence through Vaisheshik philosophy',
      price: '₹999',
      duration: '8-10 weeks',
      level: 'Beginner',
      category: 'philosophy',
      link: '/courses/vaisheshik-darshan-course',
      features: ['Atomic Theory', '30 Sessions', 'Quizzes & Notes', 'Free Updates']
    },
    {
      id: 'emotional-intelligence-samkhya',
      title: 'Emotional Intelligence with Samkhya Darshan',
      description: 'Transform your emotional landscape through ancient Samkhya philosophy and modern psychology',
      price: '₹2,499',
      duration: '12-15 weeks',
      level: 'Intermediate',
      category: 'philosophy',
      link: '/courses/emotional-intelligence-with-samkhya-darshan',
      features: ['Emotional Mastery', 'Samkhya Philosophy', '18 Modules', 'Practical Application']
    },
    {
      id: 'yoga-darshan',
      title: 'योग दर्शन: Yoga Philosophy through Patanjali Yoga Sutras',
      description: 'Transform your life with the wisdom of all 195 Yoga Sutras of Maharshi Patanjali',
      price: '₹1,999',
      duration: '10-12 weeks',
      level: 'Beginner',
      category: 'philosophy',
      link: '/courses/yoga-darshan-course',
      features: ['195 Sutras Covered', '4 Chapters', 'Live Q&A', 'Certification']
    },
    // Practice Courses
    {
      id: 'chanakya-code',
      title: 'Chanakya\'s Code: Dominate Negotiation & Business Tactics!',
      description: 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings',
      price: '₹3,999',
      duration: '8-10 weeks',
      level: 'Professional',
      category: 'practice',
      link: '/courses/chanakya-code',
      features: ['Business Strategy', 'Negotiation Skills', 'Leadership Principles', 'Case Studies']
    },
    {
      id: 'durgasaptashi',
      title: 'Live Durgāsaptashatī Recitation Course',
      description: 'Embark on a 3-month sacred journey into the Durga Saptashati — culminating in Navratri and Vijayadashami',
      price: '₹1,999',
      duration: '3 months',
      level: 'Intermediate',
      category: 'practice',
      link: '/courses/durgasaptashi',
      features: ['Sacred Recitation', 'Navratri Celebration', 'Weekend Classes', 'Spiritual Journey']
    }
  ]
  
  return courses.map(course => ({
    ...course,
    ...getCourseMetadata(course)
  }))
}

// Get all packages
export function getAllPackages(): EnhancedPackage[] {
  return packageData
}
