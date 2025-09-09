export interface GunaScores {
  sattva: number
  rajas: number
  tamas: number
}

export interface GunaResult {
  scores: GunaScores
  percentages: {
    sattva: number
    rajas: number
    tamas: number
  }
  dominantGuna: 'sattva' | 'rajas' | 'tamas'
  gunaTraitCode: string
  personalityArchetypeCode: string
  archetype: string
  description: string
  timestamp: string
}

export interface GunaProfileData {
  name: string
  email: string
  phone: string
  gunaResult: GunaResult
  createdAt: string
  lastUpdated: string
}

export interface Testimonial {
  text: string
  author: string
}

export interface FootfallEvent {
  template: string
  icon: string
  color: string
}

export interface GunaAnalysis {
  scores: GunaScores
  percentages: {
    sattva: number
    rajas: number
    tamas: number
  }
  dominantGuna: 'sattva' | 'rajas' | 'tamas'
  archetype: string
  description: string
  traits: string[]
  challenges: string[]
  solutions: string[]
}

export interface QuizResult {
  scores: GunaScores
  analysis: GunaAnalysis
  timestamp: string
}

export interface CourseRecommendation {
  id: string
  title: string
  description: string
  href: string
  image: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  price?: number
}

export interface BookRecommendation {
  id: string
  title: string
  author: string
  description: string
  href: string
  image: string
  price?: number
}

export interface LanguageData {
  langLabel: string
  mainTitle: string
  mainSubtitle: string
  initialScreenSubtitle: string
  discoverTitle: string
  discoverPoint1: string
  discoverPoint2: string
  discoverPoint3: string
  startJourneyBtn: string
  reportsGenerated: string
  testimonials: Testimonial[]
  instructionsTitle: string
  instruction1: string
  instruction2: string
  instruction3: string
  questionCounter: (current: number, total: number) => string
  answeredStatus: (answered: number, total: number) => string
  resultsTitle: string
  resultsSubtitle: string
  overviewTab: string
  analysisTab: string
  recommendationsTab: string
  colorTherapyTab: string
  advancedTab: string
  retakeBtn: string
  shareBtn: string
  feedbackTitle: string
  feedbackSubtitle: string
  feedbackPlaceholder: string
  submitFeedbackBtn: string
  dominant: string
  sattva: string
  rajas: string
  tamas: string
  questions: Array<{
    q: string
    a: [string, string, string]
  }>
  results: {
    archetypes: Record<string, {
      archetype: string
      description: string
    }>
    analysis: {
      interplayTitle: string
      balanceTitle: string
      shadowTitle: string
      problemTitle: string
      solutionTitle: string
      problems: Record<string, {
        problem: string
        solution: string
      }>
      [key: string]: any
    }
  }
  recommendations: {
    dietaryTitle: string
    activityTitle: string
    colorTitle: string
    colorHowTo: string
    challengeTitle: string
    solutionTitle: string
    challenges: Record<string, {
      challenge: string
      solution: string
    }>
    dietary: Record<string, string[]>
    activities: Record<string, string[]>
    colorTherapy: {
      problemTitle: string
      solutionTitle: string
      [key: string]: any
    }
  }
  cta: Record<string, {
    icon: string
    title: string
    subtitle: string
    button: string
  }>
}