import { GunaScores, GunaAnalysis, QuizResult } from '../types/guna-profiler'

export const calculateGunaAnalysis = (scores: GunaScores): GunaAnalysis => {
  const total = scores.sattva + scores.rajas + scores.tamas
  const percentages = {
    sattva: Math.round((scores.sattva / total) * 100),
    rajas: Math.round((scores.rajas / total) * 100),
    tamas: Math.round((scores.tamas / total) * 100),
  }

  // Determine dominant guna
  const dominantGuna = Object.entries(scores).reduce((a, b) => scores[a[0] as keyof GunaScores] > scores[b[0] as keyof GunaScores] ? a : b)[0] as keyof GunaScores

  // Determine archetype based on scores
  const archetype = getArchetype(scores, percentages)
  const description = getArchetypeDescription(archetype)
  const traits = getArchetypeTraits(archetype)
  const challenges = getArchetypeChallenges(dominantGuna)
  const solutions = getArchetypeSolutions(dominantGuna)

  return {
    scores,
    dominantGuna,
    percentages,
    archetype,
    description,
    traits,
    challenges,
    solutions,
  }
}

const getArchetype = (scores: GunaScores, percentages: GunaScores): string => {
  const sorted = Object.entries(scores).sort(([,a], [,b]) => b - a)
  const [first, second, third] = sorted

  // Check for balanced types (all within 10% of each other)
  const isBalanced = Math.max(...Object.values(percentages)) - Math.min(...Object.values(percentages)) <= 10

  if (isBalanced) {
    return 'The Balanced Seeker'
  }

  // Check for two-guna dominance (one guna is significantly lower)
  const lowestPercentage = Math.min(...Object.values(percentages))
  const highestPercentage = Math.max(...Object.values(percentages))

  if (lowestPercentage < highestPercentage * 0.4) {
    // Two-guna type
    const twoGunas = [first[0], second[0]].sort().join('')
    return getTwoGunaArchetype(twoGunas)
  }

  // Three-guna type with primary dominance
  const threeGunas = [first[0], second[0], third[0]].join('')
  return getThreeGunaArchetype(threeGunas)
}

const getTwoGunaArchetype = (gunas: string): string => {
  const archetypes: { [key: string]: string } = {
    'rajassattva': 'The Dynamic Visionary',
    'rajastamas': 'The Practical Achiever',
    'sattvatamas': 'The Wise Guardian',
  }
  return archetypes[gunas] || 'The Balanced Individual'
}

const getThreeGunaArchetype = (gunas: string): string => {
  const archetypes: { [key: string]: string } = {
    'rajassattvatamas': 'The Passionate Leader',
    'rajastamassattva': 'The Driven Strategist',
    'sattvarajastamas': 'The Enlightened Guide',
    'sattvatamasrajas': 'The Grounded Sage',
    'tamasrajassattva': 'The Resilient Builder',
    'tamassattvarajas': 'The Steady Protector',
  }
  return archetypes[gunas] || 'The Complex Individual'
}

const getArchetypeDescription = (archetype: string): string => {
  const descriptions: { [key: string]: string } = {
    'The Balanced Seeker': 'You have achieved a rare harmony between all three gunas, allowing you to adapt gracefully to different situations while maintaining inner peace.',
    'The Dynamic Visionary': 'Your combination of clarity and energy makes you a natural leader who can inspire others while maintaining a clear vision.',
    'The Practical Achiever': 'You excel at turning ideas into reality through focused action and practical implementation.',
    'The Wise Guardian': 'Your calm wisdom and stability make you a trusted advisor and protector of what matters most.',
    'The Passionate Leader': 'You lead with both heart and mind, inspiring others through your energy while maintaining clarity of purpose.',
    'The Driven Strategist': 'You are a master of execution, combining energy with practical wisdom to achieve ambitious goals.',
    'The Enlightened Guide': 'Your wisdom guides your actions, making you a natural teacher and mentor for others.',
    'The Grounded Sage': 'Your deep wisdom is anchored in practical reality, making you a source of stability and insight.',
    'The Resilient Builder': 'You have the strength to overcome obstacles and build lasting foundations for yourself and others.',
    'The Steady Protector': 'Your stability and wisdom make you a reliable guardian of traditions and values.',
  }
  return descriptions[archetype] || 'You possess a unique combination of qualities that makes you special.'
}

const getArchetypeTraits = (archetype: string): string[] => {
  const traits: { [key: string]: string[] } = {
    'The Balanced Seeker': ['Adaptable', 'Peaceful', 'Wise', 'Flexible'],
    'The Dynamic Visionary': ['Inspiring', 'Clear-minded', 'Energetic', 'Forward-thinking'],
    'The Practical Achiever': ['Goal-oriented', 'Efficient', 'Determined', 'Results-focused'],
    'The Wise Guardian': ['Protective', 'Thoughtful', 'Stable', 'Trustworthy'],
    'The Passionate Leader': ['Charismatic', 'Motivated', 'Insightful', 'Action-oriented'],
    'The Driven Strategist': ['Ambitious', 'Strategic', 'Persistent', 'Practical'],
    'The Enlightened Guide': ['Wise', 'Patient', 'Inspiring', 'Balanced'],
    'The Grounded Sage': ['Stable', 'Wise', 'Practical', 'Centered'],
    'The Resilient Builder': ['Strong', 'Persistent', 'Practical', 'Reliable'],
    'The Steady Protector': ['Loyal', 'Stable', 'Wise', 'Protective'],
  }
  return traits[archetype] || ['Unique', 'Special', 'Individual']
}

const getArchetypeChallenges = (dominantGuna: keyof GunaScores): string[] => {
  const challenges: { [key in keyof GunaScores]: string[] } = {
    sattva: [
      'May become too detached from practical matters',
      'Can overthink decisions',
      'Might avoid necessary conflicts',
      'Could become passive in action'
    ],
    rajas: [
      'Risk of burnout from constant activity',
      'May become impatient with others',
      'Could make impulsive decisions',
      'Might struggle with rest and relaxation'
    ],
    tamas: [
      'May resist necessary changes',
      'Could become stuck in routines',
      'Might avoid new challenges',
      'Risk of becoming too comfortable'
    ],
  }
  return challenges[dominantGuna] || []
}

const getArchetypeSolutions = (dominantGuna: keyof GunaScores): string[] => {
  const solutions: { [key in keyof GunaScores]: string[] } = {
    sattva: [
      'Practice grounding exercises and physical activity',
      'Set specific deadlines for decisions',
      'Engage in practical projects',
      'Learn to take action on insights'
    ],
    rajas: [
      'Schedule regular rest and meditation',
      'Practice patience and listening',
      'Take time to reflect before acting',
      'Learn to delegate and trust others'
    ],
    tamas: [
      'Gradually introduce new experiences',
      'Set small, achievable goals',
      'Seek inspiration from others',
      'Practice gentle movement and exercise'
    ],
  }
  return solutions[dominantGuna] || []
}

export const generateQuizResult = (
  answers: { [questionId: string]: 'sattva' | 'rajas' | 'tamas' },
  quizId: string = 'guna-profile'
): QuizResult => {
  const scores: GunaScores = {
    sattva: 0,
    rajas: 0,
    tamas: 0,
  }

  // Count answers
  Object.values(answers).forEach(answer => {
    scores[answer]++
  })

  const analysis = calculateGunaAnalysis(scores)

  return {
    scores,
    analysis,
    timestamp: new Date().toISOString()
  }
}

