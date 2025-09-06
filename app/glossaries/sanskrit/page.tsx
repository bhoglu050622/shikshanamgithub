'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Volume2, Star, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import type { Metadata } from 'next'

// Sanskrit vocabulary data
const sanskritWords = [
  {
    id: 1,
    word: 'अहिंसा',
    transliteration: 'ahiṁsā',
    meaning: 'Non-violence, non-harm',
    pronunciation: 'uh-HIN-saa',
    category: 'Philosophy',
    usage: 'अहिंसा परमो धर्मः - Non-violence is the highest duty',
    etymology: 'From "a-" (not) + "hiṁsā" (violence)',
    related: ['सत्य', 'अस्तेय', 'ब्रह्मचर्य'],
    difficulty: 'Beginner'
  },
  {
    id: 2,
    word: 'सत्य',
    transliteration: 'satya',
    meaning: 'Truth, reality',
    pronunciation: 'SUHT-yuh',
    category: 'Philosophy',
    usage: 'सत्यमेव जयते - Truth alone triumphs',
    etymology: 'From "sat" (being, existence)',
    related: ['अहिंसा', 'धर्म', 'सत्याग्रह'],
    difficulty: 'Beginner'
  },
  {
    id: 3,
    word: 'धर्म',
    transliteration: 'dharma',
    meaning: 'Righteousness, duty, cosmic order',
    pronunciation: 'DHUHR-muh',
    category: 'Philosophy',
    usage: 'धर्मो रक्षति रक्षितः - Dharma protects those who protect it',
    etymology: 'From "dhṛ" (to hold, sustain)',
    related: ['कर्म', 'अधर्म', 'सनातन'],
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    word: 'कर्म',
    transliteration: 'karma',
    meaning: 'Action, deed, work',
    pronunciation: 'KUHR-muh',
    category: 'Philosophy',
    usage: 'कर्मण्येवाधिकारस्ते - You have the right to work only',
    etymology: 'From "kṛ" (to do, make)',
    related: ['धर्म', 'फल', 'संस्कार'],
    difficulty: 'Beginner'
  },
  {
    id: 5,
    word: 'मोक्ष',
    transliteration: 'mokṣa',
    meaning: 'Liberation, freedom from cycle of rebirth',
    pronunciation: 'MOHK-shuh',
    category: 'Philosophy',
    usage: 'मोक्षः परमं पुरुषार्थः - Liberation is the highest human goal',
    etymology: 'From "muc" (to release, free)',
    related: ['मुक्ति', 'निर्वाण', 'कैवल्य'],
    difficulty: 'Advanced'
  },
  {
    id: 6,
    word: 'योग',
    transliteration: 'yoga',
    meaning: 'Union, discipline, spiritual practice',
    pronunciation: 'YOH-guh',
    category: 'Practice',
    usage: 'योगश्चित्तवृत्तिनिरोधः - Yoga is the cessation of mental fluctuations',
    etymology: 'From "yuj" (to join, unite)',
    related: ['ध्यान', 'समाधि', 'आसन'],
    difficulty: 'Beginner'
  },
  {
    id: 7,
    word: 'ध्यान',
    transliteration: 'dhyāna',
    meaning: 'Meditation, contemplation',
    pronunciation: 'DYAAN-uh',
    category: 'Practice',
    usage: 'ध्यानं मनसि पश्यन्ति - They see through meditation in the mind',
    etymology: 'From "dhyai" (to contemplate, meditate)',
    related: ['योग', 'समाधि', 'चित्त'],
    difficulty: 'Intermediate'
  },
  {
    id: 8,
    word: 'प्रणाम',
    transliteration: 'praṇāma',
    meaning: 'Respectful greeting, bowing',
    pronunciation: 'pruh-NAAM-uh',
    category: 'Culture',
    usage: 'प्रणामः गुरवे - Bowing to the teacher',
    etymology: 'From "pra-" (forward) + "nam" (to bow)',
    related: ['नमस्कार', 'अभिवादन', 'वंदन'],
    difficulty: 'Beginner'
  },
  {
    id: 9,
    word: 'गुरु',
    transliteration: 'guru',
    meaning: 'Teacher, spiritual guide',
    pronunciation: 'GOO-roo',
    category: 'Culture',
    usage: 'गुरुर्ब्रह्मा गुरुर्विष्णुः - The teacher is Brahma, the teacher is Vishnu',
    etymology: 'From "guru" (heavy, weighty)',
    related: ['शिष्य', 'आचार्य', 'उपदेश'],
    difficulty: 'Beginner'
  },
  {
    id: 10,
    word: 'शिष्य',
    transliteration: 'śiṣya',
    meaning: 'Student, disciple',
    pronunciation: 'SHISH-yuh',
    category: 'Culture',
    usage: 'शिष्यः शिक्षते - The student learns',
    etymology: 'From "śās" (to teach, instruct)',
    related: ['गुरु', 'विद्यार्थी', 'चेला'],
    difficulty: 'Beginner'
  }
]

const categories = ['All', 'Philosophy', 'Practice', 'Culture']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function SanskritGlossariesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedWord, setSelectedWord] = useState<typeof sanskritWords[0] | null>(null)

  const filteredWords = useMemo(() => {
    return sanskritWords.filter(word => {
      const matchesSearch = word.word.includes(searchTerm) || 
                           word.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'All' || word.difficulty === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchTerm, selectedCategory, selectedDifficulty])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <div className="container-custom py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6"
          >
            Sanskrit Glossaries
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-subheading text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto mb-8"
          >
            Explore the rich vocabulary of Sanskrit with meanings, pronunciations, and usage examples.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-wisdom-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Sanskrit words, transliterations, or meanings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-wisdom-800 border border-wisdom-200 dark:border-wisdom-700 rounded-xl focus:ring-2 focus:ring-saffron-500 focus:border-transparent transition-all duration-300 text-wisdom-700 dark:text-wisdom-200"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-saffron-500 text-white'
                      : 'bg-white dark:bg-wisdom-800 text-wisdom-600 dark:text-wisdom-300 hover:bg-saffron-50 dark:hover:bg-wisdom-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-wisdom-800 text-wisdom-600 dark:text-wisdom-300 rounded-full hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-all duration-300"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-white dark:bg-wisdom-800 rounded-xl border border-wisdom-200 dark:border-wisdom-700"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-wisdom-600 dark:text-wisdom-300 mr-2">Difficulty:</span>
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        selectedDifficulty === difficulty
                          ? 'bg-deep-teal-500 text-white'
                          : 'bg-wisdom-100 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 hover:bg-deep-teal-50 dark:hover:bg-deep-teal-900/30'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-wisdom-600 dark:text-wisdom-400">
            Showing {filteredWords.length} of {sanskritWords.length} words
          </p>
        </motion.div>

        {/* Word Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {filteredWords.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedWord(word)}
              className="bg-white dark:bg-wisdom-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-wisdom-200 dark:border-wisdom-700 hover:border-saffron-300 dark:hover:border-saffron-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-1">
                    {word.word}
                  </h3>
                  <p className="text-wisdom-600 dark:text-wisdom-400 italic">
                    {word.transliteration}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(word.difficulty)}`}>
                  {word.difficulty}
                </span>
              </div>

              <p className="text-wisdom-700 dark:text-wisdom-300 mb-3">
                {word.meaning}
              </p>

              <div className="flex items-center gap-4 text-sm text-wisdom-500 dark:text-wisdom-400">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  {word.pronunciation}
                </span>
                <span className="px-2 py-1 bg-wisdom-100 dark:bg-wisdom-700 rounded-full">
                  {word.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Word Detail Modal */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedWord(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-wisdom-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-2">
                      {selectedWord.word}
                    </h2>
                    <p className="text-xl text-wisdom-600 dark:text-wisdom-400 italic">
                      {selectedWord.transliteration}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="text-wisdom-400 hover:text-wisdom-600 dark:hover:text-wisdom-200 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                      Meaning
                    </h3>
                    <p className="text-wisdom-700 dark:text-wisdom-300">
                      {selectedWord.meaning}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                      Pronunciation
                    </h3>
                    <p className="text-wisdom-700 dark:text-wisdom-300 flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      {selectedWord.pronunciation}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                      Usage Example
                    </h3>
                    <p className="text-wisdom-700 dark:text-wisdom-300 italic">
                      {selectedWord.usage}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                      Etymology
                    </h3>
                    <p className="text-wisdom-700 dark:text-wisdom-300">
                      {selectedWord.etymology}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                      Related Words
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWord.related.map((related, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 rounded-full text-sm"
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-wisdom-200 dark:border-wisdom-700">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedWord.difficulty)}`}>
                      {selectedWord.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-wisdom-100 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 rounded-full text-sm">
                      {selectedWord.category}
                    </span>
                  </div>
        </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
