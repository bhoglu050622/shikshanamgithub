'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Keyboard, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Star,
  Trophy,
  Target,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  BookOpen,
  Brain,
  Heart,
  Zap,
  Info,
  Lightbulb,
  Award,
  Copy,
  Download,
  Upload,
  Settings
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

// Devanagari keyboard layout
const devanagariLayout = {
  vowels: [
    { key: 'अ', transliteration: 'a', english: 'a' },
    { key: 'आ', transliteration: 'ā', english: 'aa' },
    { key: 'इ', transliteration: 'i', english: 'i' },
    { key: 'ई', transliteration: 'ī', english: 'ii' },
    { key: 'उ', transliteration: 'u', english: 'u' },
    { key: 'ऊ', transliteration: 'ū', english: 'uu' },
    { key: 'ऋ', transliteration: 'ṛ', english: 'ri' },
    { key: 'ॠ', transliteration: 'ṝ', english: 'rii' },
    { key: 'ऌ', transliteration: 'ḷ', english: 'li' },
    { key: 'ॡ', transliteration: 'ḹ', english: 'lii' },
    { key: 'ए', transliteration: 'e', english: 'e' },
    { key: 'ऐ', transliteration: 'ai', english: 'ai' },
    { key: 'ओ', transliteration: 'o', english: 'o' },
    { key: 'औ', transliteration: 'au', english: 'au' }
  ],
  consonants: [
    { key: 'क', transliteration: 'ka', english: 'ka' },
    { key: 'ख', transliteration: 'kha', english: 'kha' },
    { key: 'ग', transliteration: 'ga', english: 'ga' },
    { key: 'घ', transliteration: 'gha', english: 'gha' },
    { key: 'ङ', transliteration: 'ṅa', english: 'nga' },
    { key: 'च', transliteration: 'ca', english: 'cha' },
    { key: 'छ', transliteration: 'cha', english: 'chha' },
    { key: 'ज', transliteration: 'ja', english: 'ja' },
    { key: 'झ', transliteration: 'jha', english: 'jha' },
    { key: 'ञ', transliteration: 'ña', english: 'nya' },
    { key: 'ट', transliteration: 'ṭa', english: 'ta' },
    { key: 'ठ', transliteration: 'ṭha', english: 'tha' },
    { key: 'ड', transliteration: 'ḍa', english: 'da' },
    { key: 'ढ', transliteration: 'ḍha', english: 'dha' },
    { key: 'ण', transliteration: 'ṇa', english: 'na' },
    { key: 'त', transliteration: 'ta', english: 'ta' },
    { key: 'थ', transliteration: 'tha', english: 'tha' },
    { key: 'द', transliteration: 'da', english: 'da' },
    { key: 'ध', transliteration: 'dha', english: 'dha' },
    { key: 'न', transliteration: 'na', english: 'na' },
    { key: 'प', transliteration: 'pa', english: 'pa' },
    { key: 'फ', transliteration: 'pha', english: 'pha' },
    { key: 'ब', transliteration: 'ba', english: 'ba' },
    { key: 'भ', transliteration: 'bha', english: 'bha' },
    { key: 'म', transliteration: 'ma', english: 'ma' },
    { key: 'य', transliteration: 'ya', english: 'ya' },
    { key: 'र', transliteration: 'ra', english: 'ra' },
    { key: 'ल', transliteration: 'la', english: 'la' },
    { key: 'व', transliteration: 'va', english: 'va' },
    { key: 'श', transliteration: 'śa', english: 'sha' },
    { key: 'ष', transliteration: 'ṣa', english: 'sha' },
    { key: 'स', transliteration: 'sa', english: 'sa' },
    { key: 'ह', transliteration: 'ha', english: 'ha' }
  ],
  special: [
    { key: '्', transliteration: '', english: 'virama' },
    { key: 'ं', transliteration: 'ṃ', english: 'anusvara' },
    { key: 'ः', transliteration: 'ḥ', english: 'visarga' },
    { key: '।', transliteration: '|', english: 'danda' },
    { key: '॥', transliteration: '||', english: 'double danda' }
  ]
}

// Common Sanskrit words for practice
const practiceWords = [
  { devanagari: 'राम', transliteration: 'rāma', english: 'Rama', meaning: 'Pleasant, charming' },
  { devanagari: 'कृष्ण', transliteration: 'kṛṣṇa', english: 'Krishna', meaning: 'Dark, black' },
  { devanagari: 'शिव', transliteration: 'śiva', english: 'Shiva', meaning: 'Auspicious' },
  { devanagari: 'विष्णु', transliteration: 'viṣṇu', english: 'Vishnu', meaning: 'All-pervading' },
  { devanagari: 'गणेश', transliteration: 'gaṇeśa', english: 'Ganesha', meaning: 'Lord of hosts' },
  { devanagari: 'सरस्वती', transliteration: 'sarasvatī', english: 'Saraswati', meaning: 'Flowing' },
  { devanagari: 'लक्ष्मी', transliteration: 'lakṣmī', english: 'Lakshmi', meaning: 'Sign, mark' },
  { devanagari: 'दुर्गा', transliteration: 'durgā', english: 'Durga', meaning: 'Inaccessible' }
]

// Stats for the page
const stats = [
  { number: '50+', label: 'Characters', icon: Keyboard },
  { number: '1,000+', label: 'Practice Sessions', icon: Play },
  { number: '95%', label: 'Accuracy Rate', icon: Trophy },
  { number: '4.9', label: 'User Rating', icon: Star }
]

export default function KeyboardHelperPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [selectedChar, setSelectedChar] = useState<string | null>(null)
  const [showPractice, setShowPractice] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentWord = practiceWords[currentWordIndex]

  // Audio handling
  const playAudio = (text: string) => {
    if (audioElement) {
      audioElement.pause()
    }
    // In a real implementation, this would use a TTS service
    const audio = new Audio(`/audio/sanskrit/${encodeURIComponent(text)}.mp3`)
    setAudioElement(audio)
    audio.play()
    setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
  }

  const stopAudio = () => {
    if (audioElement) {
      audioElement.pause()
      setIsPlaying(false)
    }
  }

  // Handle character click
  const handleCharClick = (char: string) => {
    setSelectedChar(char)
    setInputText(prev => prev + char)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  // Handle transliteration input
  const handleTransliteration = (text: string) => {
    setInputText(text)
    // Simple transliteration mapping (in a real app, this would be more sophisticated)
    const transliterationMap: Record<string, string> = {
      'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ii': 'ई', 'u': 'उ', 'uu': 'ऊ',
      'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ',
      'ka': 'क', 'kha': 'ख', 'ga': 'ग', 'gha': 'घ', 'nga': 'ङ',
      'cha': 'च', 'chha': 'छ', 'ja': 'ज', 'jha': 'झ', 'nya': 'ञ',
      'ta': 'ट', 'tha': 'ठ', 'da': 'ड', 'dha': 'ढ', 'na': 'ण',
      'ta2': 'त', 'tha2': 'थ', 'da2': 'द', 'dha2': 'ध', 'na2': 'न',
      'pa': 'प', 'pha': 'फ', 'ba': 'ब', 'bha': 'भ', 'ma': 'म',
      'ya': 'य', 'ra': 'र', 'la': 'ल', 'va': 'व',
      'sha': 'श', 'sha2': 'ष', 'sa': 'स', 'ha': 'ह'
    }
    
    let result = text
    Object.entries(transliterationMap).forEach(([eng, dev]) => {
      result = result.replace(new RegExp(eng, 'g'), dev)
    })
    setOutputText(result)
  }

  // Handle practice word input
  const handlePracticeInput = (input: string) => {
    setUserInput(input)
    if (input === currentWord.devanagari) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
    } else {
      setIsCorrect(false)
    }
  }

  // Next practice word
  const nextWord = () => {
    if (currentWordIndex < practiceWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1)
      setUserInput('')
      setIsCorrect(null)
    } else {
      setShowResults(true)
    }
  }

  // Reset practice
  const resetPractice = () => {
    setCurrentWordIndex(0)
    setUserInput('')
    setIsCorrect(null)
    setScore(0)
    setShowResults(false)
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30 dark:from-saffron-900/10 dark:via-transparent dark:to-deep-teal-900/10">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 dark:from-saffron-400/10 dark:via-deep-teal-400/8 dark:to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 dark:from-deep-teal-400/10 dark:via-indigo-400/8 dark:to-saffron-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-saffron-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <Keyboard className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-hero text-high-contrast mb-8">
                Sanskrit{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent">
                  Keyboard Helper
                </span>
          </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-subheading text-medium-contrast mb-8 max-w-4xl mx-auto devanagari-separator">
                Type in Sanskrit with ease using our interactive Devanagari keyboard. Learn transliteration, practice typing, and master the script.
              </p>
            </StaggerItem>

            {/* Stats */}
            <StaggerItem>
              <div className="flex justify-center mb-12">
                <div className="flex flex-wrap justify-center gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={`stat-${stat.label}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-3 text-medium-contrast"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 dark:from-saffron-400 dark:to-saffron-500 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-high-contrast">{stat.number}</div>
                        <div className="text-sm text-wisdom-500 dark:text-wisdom-400">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Interactive Keyboard */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Interactive Devanagari Keyboard
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Click on characters to type in Sanskrit, or use transliteration to convert English text to Devanagari.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Text Input Area */}
            <div className="card-premium p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input */}
                <div>
                  <label className="block text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Type in Sanskrit (Devanagari)
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Click characters below or type transliteration..."
                    className="w-full h-32 p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl bg-white dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 focus:border-saffron-500 dark:focus:border-saffron-400 focus:outline-none resize-none font-devanagari text-lg"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => isPlaying ? stopAudio() : playAudio(inputText)}
                      disabled={!inputText}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>Play</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(inputText)}
                      disabled={!inputText}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </motion.button>
                  </div>
                </div>

                {/* Transliteration Input */}
                <div>
                  <label className="block text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Transliteration (English to Sanskrit)
                  </label>
                  <textarea
                    onChange={(e) => handleTransliteration(e.target.value)}
                    placeholder="Type in English (e.g., rama, krishna)..."
                    className="w-full h-32 p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl bg-white dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 focus:border-saffron-500 dark:focus:border-saffron-400 focus:outline-none resize-none"
                  />
                  <div className="mt-4 p-4 bg-wisdom-50 dark:bg-wisdom-800 rounded-xl">
                    <div className="text-sm text-wisdom-600 dark:text-wisdom-400 mb-2">Converted:</div>
                    <div className="font-devanagari text-lg text-indigo-700 dark:text-soft-gold-500">
                      {outputText || 'Sanskrit text will appear here...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Devanagari Keyboard */}
            <div className="card-premium p-8">
              <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6 text-center">
                Devanagari Characters
              </h3>

              {/* Vowels */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-4">Vowels (स्वर)</h4>
                <div className="grid grid-cols-7 md:grid-cols-14 gap-2">
                  {devanagariLayout.vowels.map((vowel, index) => (
                    <motion.button
                      key={vowel.key}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCharClick(vowel.key)}
                      className="p-3 bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/30 rounded-lg hover:shadow-lg transition-all duration-200 border border-saffron-300 dark:border-saffron-700"
                    >
                      <div className="text-center">
                        <div className="font-devanagari text-xl text-indigo-700 dark:text-soft-gold-500 mb-1">
                          {vowel.key}
                        </div>
                        <div className="text-xs text-wisdom-600 dark:text-wisdom-400">
                          {vowel.transliteration}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Consonants */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-4">Consonants (व्यंजन)</h4>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {devanagariLayout.consonants.map((consonant, index) => (
                    <motion.button
                      key={consonant.key}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCharClick(consonant.key)}
                      className="p-3 bg-gradient-to-br from-deep-teal-100 to-deep-teal-200 dark:from-deep-teal-900/30 dark:to-deep-teal-800/30 rounded-lg hover:shadow-lg transition-all duration-200 border border-deep-teal-300 dark:border-deep-teal-700"
                    >
                      <div className="text-center">
                        <div className="font-devanagari text-xl text-indigo-700 dark:text-soft-gold-500 mb-1">
                          {consonant.key}
                        </div>
                        <div className="text-xs text-wisdom-600 dark:text-wisdom-400">
                          {consonant.transliteration}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Special Characters */}
              <div>
                <h4 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-4">Special Characters</h4>
                <div className="grid grid-cols-5 gap-2">
                  {devanagariLayout.special.map((special, index) => (
                    <motion.button
                      key={special.key}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCharClick(special.key)}
                      className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg hover:shadow-lg transition-all duration-200 border border-indigo-300 dark:border-indigo-700"
                    >
                      <div className="text-center">
                        <div className="font-devanagari text-xl text-indigo-700 dark:text-soft-gold-500 mb-1">
                          {special.key}
                        </div>
                        <div className="text-xs text-wisdom-600 dark:text-wisdom-400">
                          {special.transliteration}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Practice Typing
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Test your typing skills with common Sanskrit words. Practice makes perfect!
            </p>
          </motion.div>

          {!showResults && (
            <div className="max-w-4xl mx-auto">
              <div className="card-premium p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                    Word {currentWordIndex + 1} of {practiceWords.length}
                  </h3>
                  <div className="w-full bg-wisdom-200 dark:bg-wisdom-700 rounded-full h-2 mb-6">
                    <div 
                      className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentWordIndex + 1) / practiceWords.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <div className="bg-wisdom-100 dark:bg-wisdom-700 rounded-xl p-6 mb-6">
                    <div className="text-3xl font-devanagari text-indigo-700 dark:text-soft-gold-500 mb-2">
                      {currentWord.devanagari}
                    </div>
                    <div className="text-lg text-saffron-600 dark:text-saffron-400 mb-1">
                      {currentWord.transliteration}
                    </div>
                    <div className="text-wisdom-600 dark:text-wisdom-400">
                      {currentWord.english} - {currentWord.meaning}
                    </div>
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => handlePracticeInput(e.target.value)}
                      placeholder="Type the word in Devanagari..."
                      className="w-full max-w-md p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl bg-white dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 focus:border-saffron-500 dark:focus:border-saffron-400 focus:outline-none font-devanagari text-lg text-center"
                    />
                  </div>

                  <AnimatePresence>
                    {isCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
                          isCorrect 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span>{isCorrect ? 'Correct!' : 'Try again'}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetPractice}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextWord}
                    disabled={!isCorrect}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {currentWordIndex === practiceWords.length - 1 ? 'Finish' : 'Next'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Results Screen */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="max-w-2xl mx-auto text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  {score >= 6 ? (
                    <Trophy className="w-12 h-12 text-white" />
                  ) : score >= 4 ? (
                    <Award className="w-12 h-12 text-white" />
                  ) : (
                    <Target className="w-12 h-12 text-white" />
                  )}
                </motion.div>

                <h2 className="text-3xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                  {score >= 6 ? 'Excellent Work!' : score >= 4 ? 'Good Job!' : 'Keep Practicing!'}
                </h2>

                <div className="text-6xl font-bold text-saffron-600 dark:text-saffron-400 mb-6">
                  {score}/{practiceWords.length}
                </div>

                <p className="text-wisdom-600 dark:text-wisdom-400 mb-8">
                  You typed {score} out of {practiceWords.length} words correctly. 
                  {score >= 6 ? ' Outstanding performance!' : score >= 4 ? ' Great effort!' : ' Practice makes perfect!'}
                </p>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetPractice}
                    className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Try Again</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPractice(false)}
                    className="flex items-center space-x-2 px-8 py-4 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                  >
                    <Keyboard className="w-5 h-5" />
                    <span>Back to Keyboard</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
      </section>
    </>
  )
}