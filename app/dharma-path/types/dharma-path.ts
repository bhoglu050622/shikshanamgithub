export interface Avatar {
  id: string
  name: string
  sanskritName: string
  essence: string
  description: string
  verse: {
    sanskrit: string
    english: string
    translation: string
  }
  color: string
  symbol: string
  attributes: string[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
    score: Record<string, number>
  }[]
}

export interface Quiz {
  id: string
  title: string
  description: string
  icon: string
  color: string
  questions: QuizQuestion[]
  scoring: {
    [key: string]: {
      min: number
      max: number
      interpretation: string
      description: string
    }
  }
}

export interface QuizResult {
  quizId: string
  answers: Record<string, string>
  scores: Record<string, number>
  interpretation: string
  description: string
  completedAt: string
}

export interface DharmaPathData {
  name: string
  email: string
  phone: string
  selectedAvatar: Avatar | null
  quizResults: QuizResult[]
  createdAt: string
  lastUpdated: string
}

export interface CourseRecommendation {
  id: string
  title: string
  description: string
  url: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  rating: number
}
