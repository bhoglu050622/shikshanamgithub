'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trophy, Sparkles, CheckCircle, RotateCcw } from 'lucide-react'

// Enhanced flashcards data with additional properties
const flashcardsData = [
  {
    id: 1,
    english: "I am eating food.",
    sanskrit: "अहं अन्नं खादामि।",
    transliteration: "ahaṁ annaṁ khādāmi",
    difficulty: "beginner",
    category: "Daily Life",
    xp: 10,
    audioUrl: "/audio/aham-annam-khadami.mp3"
  },
  {
    id: 2,
    english: "She is reading a book.",
    sanskrit: "सा पुस्तकम् पठति।",
    transliteration: "sā pustakam paṭhati",
    difficulty: "beginner",
    category: "Education",
    xp: 10,
    audioUrl: "/audio/sa-pustakam-pathati.mp3"
  },
  {
    id: 3,
    english: "He is going to school.",
    sanskrit: "सः विद्यालयं गच्छति।",
    transliteration: "saḥ vidyālayaṁ gacchati",
    difficulty: "beginner",
    category: "Education",
    xp: 10,
    audioUrl: "/audio/sah-vidyalayam-gacchati.mp3"
  },
  {
    id: 4,
    english: "Where is the water?",
    sanskrit: "जलं कुत्र अस्ति?",
    transliteration: "jalaṁ kutra asti?",
    difficulty: "beginner"
  },
  {
    id: 5,
    english: "Please speak slowly.",
    sanskrit: "कृपया मन्दं भाषत।",
    transliteration: "kṛpayā mandaṁ bhāṣata",
    difficulty: "beginner"
  },
  {
    id: 6,
    english: "I love learning Sanskrit.",
    sanskrit: "मम संस्कृतम् अध्ययनं रोचते।",
    transliteration: "mama saṁskṛtam adhyayanaṁ rocate",
    difficulty: "intermediate"
  },
  {
    id: 7,
    english: "Open the door.",
    sanskrit: "द्वारं उद्घाटय।",
    transliteration: "dvāraṁ udghāṭaya",
    difficulty: "beginner"
  },
  {
    id: 8,
    english: "Come here.",
    sanskrit: "अत्र आगच्छ।",
    transliteration: "atra āgaccha",
    difficulty: "beginner"
  },
  {
    id: 9,
    english: "Thank you for your help.",
    sanskrit: "तव साहाय्याय धन्यवादाः।",
    transliteration: "tava sāhāyyāya dhanyavādāḥ",
    difficulty: "intermediate"
  },
  {
    id: 10,
    english: "I will return tomorrow.",
    sanskrit: "अहं श्वः आगमिष्यामि।",
    transliteration: "ahaṁ śvaḥ āgamiṣyāmi",
    difficulty: "intermediate"
  },
  {
    id: 11,
    english: "What is your name?",
    sanskrit: "तव नाम किम्?",
    transliteration: "tava nāma kim?",
    difficulty: "beginner"
  },
  {
    id: 12,
    english: "My name is ___.",
    sanskrit: "मम नाम ___ अस्ति।",
    transliteration: "mama nāma ___ asti",
    difficulty: "beginner"
  },
  {
    id: 13,
    english: "I don't understand.",
    sanskrit: "मम न अवगच्छति।",
    transliteration: "mama na avagacchati",
    difficulty: "intermediate"
  },
  {
    id: 14,
    english: "Can you repeat that?",
    sanskrit: "पुनः कृत्वा वद।",
    transliteration: "punaḥ kṛtvā vada",
    difficulty: "intermediate"
  },
  {
    id: 15,
    english: "How much does this cost?",
    sanskrit: "एतत् किं मूल्यं?",
    transliteration: "etat kiṁ mūlyaṁ?",
    difficulty: "intermediate"
  }
]

interface FlashcardProps {
  card: typeof flashcardsData[0]
  index: number
  isFlipped: boolean
  isCompleted: boolean
  onFlip: () => void
  onComplete: () => void
}

function Flashcard({ card, index, isFlipped, isCompleted, onFlip, onComplete }: FlashcardProps) {
  const [showCelebration, setShowCelebration] = useState(false)

  const handleFlip = () => {
    onFlip()
    // Remove automatic completion - cards should only complete when user clicks the checkmark
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-4 -right-4 z-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
            >
              +{card.xp} XP
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Badge */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <CheckCircle className="w-5 h-5 text-white" />
        </motion.div>
      )}

      <motion.div
        className="flashcard-container w-full h-48 cursor-pointer relative"
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={`${card.english} - tap to reveal Sanskrit`}
        aria-pressed={isFlipped}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleFlip()
          }
        }}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`flashcard w-full h-full ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-face">
            <div className="card-sanskrit w-full h-full flex flex-col justify-between p-6 relative overflow-hidden">
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {card.category}
                </span>
              </div>


              {/* Main Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-semibold leading-relaxed text-white mb-2">
                    {card.english}
                  </div>
                  <div className="text-sm text-white/80">
                    Tap to reveal Sanskrit
                  </div>
                </div>
              </div>

              {/* XP Indicator */}
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium text-yellow-200">{card.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back">
            <div className="card-sanskrit-back w-full h-full flex flex-col justify-between p-6 relative overflow-hidden">
              {/* Difficulty Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  card.difficulty === 'beginner' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-orange-200 text-orange-800'
                }`}>
                  {card.difficulty}
                </span>
              </div>

              {/* Flip Back Button */}
              <div className="absolute top-3 right-3">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    onFlip()
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-slate-200/80 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-300/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-bold mb-3 font-devanagari text-slate-800">
                  {card.sanskrit}
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  {card.transliteration}
                </div>
                <div className="text-xs text-slate-500">
                  {card.english}
                </div>
              </div>

              {/* Manual Completion Button */}
              {!isCompleted && (
                <div className="flex items-center justify-center">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation()
                      onComplete()
                      setShowCelebration(true)
                      setTimeout(() => setShowCelebration(false), 2000)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Got it!</span>
                  </motion.button>
                </div>
              )}
              
              {/* Completion Status */}
              {isCompleted && (
                <div className="flex items-center justify-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Completed!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FlashcardGrid() {
  const [currentCards, setCurrentCards] = useState<number[]>([0, 1, 2]) // Track current 3 card indices
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null) // Track which card is currently flipped
  const [usedCardIds, setUsedCardIds] = useState<Set<number>>(new Set([0, 1, 2])) // Track which cards have been used
  const [totalXP, setTotalXP] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  // Function to get a random unused card
  const getRandomUnusedCard = () => {
    const availableCards = flashcardsData.filter((_, index) => !usedCardIds.has(index))
    if (availableCards.length === 0) {
      // If all cards have been used, reset the used cards set
      setUsedCardIds(new Set())
      return Math.floor(Math.random() * flashcardsData.length)
    }
    const randomIndex = Math.floor(Math.random() * availableCards.length)
    return flashcardsData.findIndex(card => card.id === availableCards[randomIndex].id)
  }

  const handleFlip = (cardId: number) => {
    if (flippedCardId === cardId) {
      // If clicking the same card, do nothing - keep it flipped
      return
    } else {
      // If clicking a different card
      if (flippedCardId !== null) {
        // Replace the previously flipped card with a new random card
        const newCardIndex = getRandomUnusedCard()
        const currentCardIndex = currentCards.findIndex(index => flashcardsData[index].id === flippedCardId)
        
        if (currentCardIndex !== -1) {
          const newCurrentCards = [...currentCards]
          newCurrentCards[currentCardIndex] = newCardIndex
          setCurrentCards(newCurrentCards)
          setUsedCardIds(prev => new Set([...prev, newCardIndex]))
        }
      }
      setFlippedCardId(cardId)
    }
  }

  const handleComplete = (cardId: number) => {
    const card = flashcardsData.find(c => c.id === cardId)
    if (card) {
      setTotalXP(prev => {
        const newXP = prev + (card.xp || 0)
        // Check for level up (every 100 XP)
        if (Math.floor(newXP / 100) > Math.floor(prev / 100)) {
          setShowLevelUp(true)
          setTimeout(() => setShowLevelUp(false), 3000)
        }
        return newXP
      })
      
      // Replace the completed card with a new random card
      const newCardIndex = getRandomUnusedCard()
      const currentCardIndex = currentCards.findIndex(index => flashcardsData[index].id === cardId)
      
      if (currentCardIndex !== -1) {
        const newCurrentCards = [...currentCards]
        newCurrentCards[currentCardIndex] = newCardIndex
        setCurrentCards(newCurrentCards)
        setUsedCardIds(prev => new Set([...prev, newCardIndex]))
        setFlippedCardId(null) // Reset flipped state
      }
    }
  }

  const currentLevel = Math.floor(totalXP / 100) + 1

  return (
    <section className="pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 bg-parchment-ivory relative overflow-hidden">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-8 rounded-3xl shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Trophy className="w-full h-full" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Level Up!</h3>
                <p className="text-lg">You've reached Level {currentLevel}!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
{/* Progress indicator hidden */}
          {/* <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-golden-olive/20 mb-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="font-bold text-lg">Level {currentLevel}</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{totalXP} XP</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="font-semibold">{completedCards.size}/{flashcardsData.length}</span>
            </div>
          </div> */}

          <h2 className="text-display text-dark-text mb-4">
            Play & Learn
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto mb-6">
            Gamified warm-up with interactive cards. Tap to flip and reveal meanings, 
            then practice with audio and quizzes.
          </p>

        </motion.div>

        {/* Dynamic 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {currentCards.map((cardIndex, index) => {
            const card = flashcardsData[cardIndex]
            return (
              <Flashcard
                key={`${card.id}-${cardIndex}-${index}`} // Unique key for dynamic cards
                card={card}
                index={index}
                isFlipped={flippedCardId === card.id}
                isCompleted={false} // No completion state in dynamic mode
                onFlip={() => handleFlip(card.id)}
                onComplete={() => handleComplete(card.id)}
              />
            )
          })}
        </div>

        {/* Dynamic Learning Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl px-8 py-6 shadow-lg border border-golden-olive/20 max-w-2xl mx-auto">
            <Sparkles className="w-12 h-12 text-golden-olive mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark-text mb-2">Keep Learning!</h3>
            <p className="text-muted-gray">
              Click any card to reveal the answer. When you click another card, the previous one will reshuffle with a new question!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
