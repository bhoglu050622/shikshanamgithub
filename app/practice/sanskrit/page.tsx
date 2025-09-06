'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
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
  Play,
  Pause,
  SkipForward,
  Award,
  Brain,
  Heart,
  Zap
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

// Practice exercises data
const practiceExercises = [
  {
    id: 'devanagari-basics',
    title: 'Devanagari Basics',
    description: 'Master the fundamental Devanagari script',
    icon: BookOpen,
    color: 'from-saffron-500 to-saffron-600',
    difficulty: 'Beginner',
    duration: '15 min',
    exercises: [
      {
        id: 1,
        type: 'script-recognition',
        question: 'Identify the correct Devanagari character for "ka"',
        options: ['क', 'ख', 'ग', 'घ'],
        correct: 0,
        explanation: 'क (ka) is the first consonant in the Devanagari script.'
      },
      {
        id: 2,
        type: 'script-recognition',
        question: 'Which character represents "ma"?',
        options: ['म', 'न', 'प', 'ब'],
        correct: 0,
        explanation: 'म (ma) is the correct character for the "ma" sound.'
      }
    ]
  },
  {
    id: 'vowel-practice',
    title: 'Vowel Practice',
    description: 'Learn Sanskrit vowels and their sounds',
    icon: Volume2,
    color: 'from-deep-teal-500 to-deep-teal-600',
    difficulty: 'Beginner',
    duration: '20 min',
    exercises: [
      {
        id: 3,
        type: 'pronunciation',
        question: 'Listen and identify the vowel sound',
        audio: '/audio/sanskrit-a.mp3',
        options: ['अ (a)', 'आ (ā)', 'इ (i)', 'ई (ī)'],
        correct: 0,
        explanation: 'अ (a) is the short "a" sound, fundamental in Sanskrit.'
      }
    ]
  },
  {
    id: 'consonant-combinations',
    title: 'Consonant Combinations',
    description: 'Practice complex consonant clusters',
    icon: Brain,
    color: 'from-indigo-500 to-indigo-600',
    difficulty: 'Intermediate',
    duration: '25 min',
    exercises: [
      {
        id: 4,
        type: 'sandhi-practice',
        question: 'What is the correct sandhi for "tat + api"?',
        options: ['तदपि', 'तदपि', 'तदपि', 'तदपि'],
        correct: 0,
        explanation: 'The correct sandhi form combines the words properly.'
      }
    ]
  },
  {
    id: 'sentence-formation',
    title: 'Sentence Formation',
    description: 'Build sentences using Sanskrit grammar',
    icon: Heart,
    color: 'from-purple-500 to-purple-600',
    difficulty: 'Advanced',
    duration: '30 min',
    exercises: [
      {
        id: 5,
        type: 'grammar',
        question: 'Complete the sentence: "रामः वनम् ___"',
        options: ['गच्छति', 'गच्छन्ति', 'गच्छामि', 'गच्छसि'],
        correct: 0,
        explanation: 'गच्छति is the correct third person singular form.'
      }
    ]
  }
]

// Stats for the page
const stats = [
  { number: '2,500+', label: 'Practice Sessions', icon: Play },
  { number: '15,000+', label: 'Exercises Completed', icon: CheckCircle },
  { number: '98%', label: 'Success Rate', icon: Trophy },
  { number: '4.9', label: 'User Rating', icon: Star }
]

export default function SanskritPracticePage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  const currentExercise = practiceExercises.find(ex => ex.id === selectedExercise)
  const currentQ = currentExercise?.exercises[currentQuestion]

  // Audio handling
  const playAudio = (src: string) => {
    if (audioElement) {
      audioElement.pause()
    }
    const audio = new Audio(src)
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

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ?.id || 0]: answerIndex
    }))
  }

  // Calculate score
  const calculateScore = () => {
    if (!currentExercise) return 0
    let correct = 0
    currentExercise.exercises.forEach(exercise => {
      if (userAnswers[exercise.id] === exercise.correct) {
        correct++
      }
    })
    return Math.round((correct / currentExercise.exercises.length) * 100)
  }

  // Handle exercise completion
  const handleCompleteExercise = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setShowResults(true)
  }

  // Reset exercise
  const resetExercise = () => {
    setSelectedExercise(null)
    setCurrentQuestion(0)
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
  }

  // Next question
  const nextQuestion = () => {
    if (currentExercise && currentQuestion < currentExercise.exercises.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleCompleteExercise()
    }
  }

  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300">
      <Header />
      
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
                  <BookOpen className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-hero text-high-contrast mb-8">
                Sanskrit{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent">
                  Practice Hub
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-subheading text-medium-contrast mb-8 max-w-4xl mx-auto devanagari-separator">
                Master Sanskrit through interactive exercises, pronunciation practice, and grammar drills
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

      {/* Practice Exercises Grid */}
      {!selectedExercise && (
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
                Choose Your Practice
              </h2>
              <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
                Select from our comprehensive collection of Sanskrit practice exercises, 
                designed to build your skills progressively from basics to advanced concepts.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {practiceExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -12,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group perspective-1000 cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => setSelectedExercise(exercise.id)}
                >
                  <div className="card-premium p-8 h-full group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron-100/20 to-deep-teal-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                    
                    {/* Header */}
                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-r ${exercise.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                        <exercise.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2 text-center group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                        {exercise.title}
                      </h3>
                      
                      <p className="text-wisdom-600 dark:text-wisdom-400 mb-6 text-center leading-relaxed text-sm">
                        {exercise.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="relative z-10 grid grid-cols-2 gap-4 mb-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500">{exercise.difficulty}</div>
                        <div className="text-xs text-wisdom-500 dark:text-wisdom-400">Level</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-indigo-700 dark:text-soft-gold-500">{exercise.duration}</div>
                        <div className="text-xs text-wisdom-500 dark:text-wisdom-400">Duration</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="relative z-10 flex items-center justify-center space-x-2 text-saffron-600 dark:text-saffron-400 font-medium group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
                      <span>Start Practice</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Exercise Interface */}
      <AnimatePresence>
        {selectedExercise && currentExercise && !showResults && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="section-padding"
          >
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                {/* Exercise Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${currentExercise.color} rounded-2xl flex items-center justify-center`}>
                      <currentExercise.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500">
                        {currentExercise.title}
                      </h2>
                      <p className="text-wisdom-600 dark:text-wisdom-400">
                        Question {currentQuestion + 1} of {currentExercise.exercises.length}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-wisdom-200 dark:bg-wisdom-700 rounded-full h-2 mb-6">
                    <div 
                      className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / currentExercise.exercises.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question Card */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="card-premium p-8 mb-8"
                >
                  <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                    {currentQ?.question}
                  </h3>

                  {/* Audio Question */}
                  {currentQ?.type === 'pronunciation' && 'audio' in currentQ && currentQ.audio && (
                    <div className="flex items-center justify-center space-x-4 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => isPlaying ? stopAudio() : playAudio(currentQ.audio)}
                        className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </motion.button>
                      <span className="text-wisdom-600 dark:text-wisdom-400">
                        {isPlaying ? 'Playing...' : 'Click to play audio'}
                      </span>
                    </div>
                  )}

                  {/* Answer Options */}
                  <div className="space-y-4">
                    {currentQ?.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                          userAnswers[currentQ.id] === index
                            ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-900/20'
                            : 'border-wisdom-200 dark:border-wisdom-700 hover:border-saffron-300 dark:hover:border-saffron-600'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            userAnswers[currentQ.id] === index
                              ? 'bg-saffron-500 text-white'
                              : 'bg-wisdom-200 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-400'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-wisdom-700 dark:text-wisdom-300 font-medium">
                            {option}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetExercise}
                    className="flex items-center space-x-2 px-6 py-3 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextQuestion}
                    disabled={userAnswers[currentQ?.id || 0] === undefined}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {currentQuestion === currentExercise.exercises.length - 1 ? 'Finish' : 'Next'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results Screen */}
      <AnimatePresence>
        {showResults && (
          <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="section-padding"
          >
            <div className="container-custom">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  {score >= 80 ? (
                    <Trophy className="w-12 h-12 text-white" />
                  ) : score >= 60 ? (
                    <Award className="w-12 h-12 text-white" />
                  ) : (
                    <Target className="w-12 h-12 text-white" />
                  )}
                </motion.div>

                <h2 className="text-3xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                  {score >= 80 ? 'Excellent Work!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                </h2>

                <div className="text-6xl font-bold text-saffron-600 dark:text-saffron-400 mb-6">
                  {score}%
                </div>

                <p className="text-wisdom-600 dark:text-wisdom-400 mb-8">
                  You scored {score}% on {currentExercise?.title}. 
                  {score >= 80 ? ' Outstanding performance!' : score >= 60 ? ' Great effort!' : ' Practice makes perfect!'}
                </p>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetExercise}
                    className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Try Again</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedExercise(null)}
                    className="flex items-center space-x-2 px-8 py-4 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Choose Another Exercise</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
