import { Quiz } from '../types/dharma-path'

export const quizzes: Quiz[] = [
  {
    id: 'guna-profile',
    title: 'Guna Profile',
    description: 'Discover your balance of Sattva, Rajas, and Tamas - the three fundamental qualities of nature',
    icon: '⚖️',
    color: 'from-emerald-600 to-teal-600',
    questions: [
      {
        id: 'q1',
        question: 'When facing a difficult decision, you typically:',
        options: [
          { id: 'a', text: 'Take time to reflect and seek inner guidance', score: { sattva: 3, rajas: 1, tamas: 0 } },
          { id: 'b', text: 'Act quickly and decisively based on your goals', score: { sattva: 1, rajas: 3, tamas: 0 } },
          { id: 'c', text: 'Avoid making the decision or delay it', score: { sattva: 0, rajas: 1, tamas: 3 } }
        ]
      },
      {
        id: 'q2',
        question: 'Your ideal morning routine would be:',
        options: [
          { id: 'a', text: 'Meditation, yoga, and a healthy breakfast', score: { sattva: 3, rajas: 0, tamas: 0 } },
          { id: 'b', text: 'A quick workout and a busy day ahead', score: { sattva: 1, rajas: 3, tamas: 0 } },
          { id: 'c', text: 'Sleeping in and a relaxed start to the day', score: { sattva: 0, rajas: 0, tamas: 3 } }
        ]
      },
      {
        id: 'q3',
        question: 'In relationships, you value most:',
        options: [
          { id: 'a', text: 'Deep spiritual connection and understanding', score: { sattva: 3, rajas: 0, tamas: 0 } },
          { id: 'b', text: 'Passion, excitement, and shared adventures', score: { sattva: 0, rajas: 3, tamas: 0 } },
          { id: 'c', text: 'Comfort, stability, and familiarity', score: { sattva: 0, rajas: 0, tamas: 3 } }
        ]
      },
      {
        id: 'q4',
        question: 'When you encounter conflict, you:',
        options: [
          { id: 'a', text: 'Seek to understand all perspectives and find harmony', score: { sattva: 3, rajas: 0, tamas: 0 } },
          { id: 'b', text: 'Address it directly and work toward a solution', score: { sattva: 1, rajas: 3, tamas: 0 } },
          { id: 'c', text: 'Avoid confrontation and hope it resolves itself', score: { sattva: 0, rajas: 0, tamas: 3 } }
        ]
      },
      {
        id: 'q5',
        question: 'Your approach to learning is:',
        options: [
          { id: 'a', text: 'Contemplative, seeking deeper meaning and wisdom', score: { sattva: 3, rajas: 0, tamas: 0 } },
          { id: 'b', text: 'Active, hands-on, and goal-oriented', score: { sattva: 0, rajas: 3, tamas: 0 } },
          { id: 'c', text: 'Passive, preferring simple and easy methods', score: { sattva: 0, rajas: 0, tamas: 3 } }
        ]
      }
    ],
    scoring: {
      sattva: {
        min: 0,
        max: 15,
        interpretation: 'Sattvic Nature',
        description: 'You embody purity, wisdom, and spiritual awareness. Your nature is calm, balanced, and drawn to truth and knowledge.'
      },
      rajas: {
        min: 0,
        max: 15,
        interpretation: 'Rajasic Nature',
        description: 'You are dynamic, ambitious, and action-oriented. Your nature is energetic, passionate, and driven by goals and achievements.'
      },
      tamas: {
        min: 0,
        max: 15,
        interpretation: 'Tamasic Nature',
        description: 'You are grounded, stable, and comfort-seeking. Your nature is calm, patient, and values security and tradition.'
      }
    }
  },
  {
    id: 'shiva-consciousness',
    title: 'Shiva Consciousness',
    description: 'Explore your level of awareness, detachment, and presence - the qualities of Shiva consciousness',
    icon: '🕉️',
    color: 'from-indigo-600 to-purple-600',
    questions: [
      {
        id: 'q1',
        question: 'When you meditate or practice mindfulness, you experience:',
        options: [
          { id: 'a', text: 'Deep stillness and expanded awareness', score: { awareness: 3, detachment: 2, presence: 3 } },
          { id: 'b', text: 'Some peace but thoughts still arise', score: { awareness: 2, detachment: 1, presence: 2 } },
          { id: 'c', text: 'Difficulty quieting the mind', score: { awareness: 1, detachment: 0, presence: 1 } }
        ]
      },
      {
        id: 'q2',
        question: 'When facing loss or change, you:',
        options: [
          { id: 'a', text: 'Accept it as part of the natural flow of life', score: { awareness: 2, detachment: 3, presence: 2 } },
          { id: 'b', text: 'Feel the emotions but work through them', score: { awareness: 2, detachment: 1, presence: 2 } },
          { id: 'c', text: 'Struggle with attachment and resistance', score: { awareness: 1, detachment: 0, presence: 1 } }
        ]
      },
      {
        id: 'q3',
        question: 'Your relationship with material possessions is:',
        options: [
          { id: 'a', text: 'Detached - they are tools for life, not sources of identity', score: { awareness: 2, detachment: 3, presence: 2 } },
          { id: 'b', text: 'Balanced - you enjoy them but don\'t depend on them', score: { awareness: 2, detachment: 2, presence: 2 } },
          { id: 'c', text: 'Attached - they provide security and comfort', score: { awareness: 1, detachment: 0, presence: 1 } }
        ]
      },
      {
        id: 'q4',
        question: 'In daily life, you are most present when:',
        options: [
          { id: 'a', text: 'Engaging in simple, mindful activities', score: { awareness: 2, detachment: 1, presence: 3 } },
          { id: 'b', text: 'Focused on important tasks or conversations', score: { awareness: 2, detachment: 1, presence: 2 } },
          { id: 'c', text: 'Distracted by multiple thoughts and activities', score: { awareness: 1, detachment: 0, presence: 1 } }
        ]
      },
      {
        id: 'q5',
        question: 'Your understanding of the self is:',
        options: [
          { id: 'a', text: 'The self is pure consciousness beyond the ego', score: { awareness: 3, detachment: 2, presence: 2 } },
          { id: 'b', text: 'The self is the observer of thoughts and emotions', score: { awareness: 2, detachment: 1, presence: 2 } },
          { id: 'c', text: 'The self is the personality and life experiences', score: { awareness: 1, detachment: 0, presence: 1 } }
        ]
      }
    ],
    scoring: {
      awareness: {
        min: 0,
        max: 12,
        interpretation: 'Awareness',
        description: 'Your level of conscious awareness and spiritual insight. You have a deep understanding of the nature of reality and consciousness.'
      },
      detachment: {
        min: 0,
        max: 12,
        interpretation: 'Detachment',
        description: 'Your ability to remain centered and unaffected by the ups and downs of life. You maintain inner peace regardless of external circumstances.'
      },
      presence: {
        min: 0,
        max: 12,
        interpretation: 'Presence',
        description: 'Your capacity to be fully present in the moment. You experience life with mindfulness and deep engagement.'
      }
    }
  }
]
