export interface ShivaScores {
  unbound: number
  harmonious: number
  reflective: number
  awakener: number
  emerging: number
}

export interface ShivaResult {
  scores: ShivaScores
  percentage: number
  dominantArchetype: string
  secondaryArchetype: string
  dominantPainPoint: string
  archetype: string
  sanskritName: string
  description: string
  pathContent: string
  challengesContent: string
  recommendationsContent: string
  timestamp: string
}

export interface ShivaQuestion {
  qKey: string
  answers: Array<{
    aKey: string
    scores: ShivaScores
    tag: string
  }>
}

export interface AnswerTag {
  tag: string
  count: number
}

export interface TestimonialData {
  quote: string
  author: string
}
