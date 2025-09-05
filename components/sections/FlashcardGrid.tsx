'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Star, Trophy, Sparkles, CheckCircle, RotateCcw } from 'lucide-react'

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
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleFlip = () => {
    onFlip()
    if (!isFlipped && !isCompleted) {
      // Mark as completed when first flipped
      setTimeout(() => {
        onComplete()
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 2000)
      }, 500)
    }
  }

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(() => setIsPlaying(false), 2000)
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
                <span className="bg-golden-olive/20 text-deep-maroon px-2 py-1 rounded-full text-xs font-medium">
                  {card.category}
                </span>
              </div>

              {/* Audio Button */}
              <div className="absolute top-3 right-3">
                <motion.button
                  onClick={playAudio}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-golden-olive/20 text-deep-maroon rounded-full flex items-center justify-center hover:bg-golden-olive/30 transition-colors"
                >
                  {isPlaying ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </motion.button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-semibold leading-relaxed text-dark-text mb-2">
                    {card.english}
                  </div>
                  <div className="text-sm text-muted-gray">
                    Tap to reveal Sanskrit
                  </div>
                </div>
              </div>

              {/* XP Indicator */}
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">{card.xp} XP</span>
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
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
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
                  className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-bold mb-3 font-devanagari text-white">
                  {card.sanskrit}
                </div>
                <div className="text-sm text-white/80 mb-2">
                  {card.transliteration}
                </div>
                <div className="text-xs text-white/60">
                  {card.english}
                </div>
              </div>

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
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set())
  const [totalXP, setTotalXP] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const handleFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const handleComplete = (cardId: number) => {
    if (!completedCards.has(cardId)) {
      const card = flashcardsData.find(c => c.id === cardId)
      if (card) {
        setCompletedCards(prev => new Set([...prev, cardId]))
        setTotalXP(prev => {
          const newXP = prev + (card.xp || 0)
          // Check for level up (every 100 XP)
          if (Math.floor(newXP / 100) > Math.floor(prev / 100)) {
            setShowLevelUp(true)
            setTimeout(() => setShowLevelUp(false), 3000)
          }
          return newXP
        })
      }
    }
  }

  const progress = (completedCards.size / flashcardsData.length) * 100
  const currentLevel = Math.floor(totalXP / 100) + 1

  return (
    <section className="section-padding bg-parchment-ivory relative overflow-hidden">
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
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-golden-olive/20 mb-6">
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
          </div>

          <h2 className="text-display text-dark-text mb-4">
            Play & Learn
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto mb-6">
            Gamified warm-up with interactive cards. Tap to flip and reveal meanings, 
            then practice with audio and quizzes.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-gray mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-golden-olive to-deep-maroon rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced Flashcard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {flashcardsData.map((card, index) => (
            <Flashcard
              key={card.id}
              card={card}
              index={index}
              isFlipped={flippedCards.has(card.id)}
              isCompleted={completedCards.has(card.id)}
              onFlip={() => handleFlip(card.id)}
              onComplete={() => handleComplete(card.id)}
            />
          ))}
        </div>

        {/* Completion Celebration */}
        {completedCards.size === flashcardsData.length && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-6 rounded-3xl shadow-2xl inline-block">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-8 h-8" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">Congratulations!</h3>
                  <p className="text-lg opacity-90">You've completed all flashcards!</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-8 h-8" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
