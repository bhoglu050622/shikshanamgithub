'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
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
  Award
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

// Sandhi rules and examples
const sandhiRules = [
  {
    id: 'vowel-sandhi',
    title: 'Vowel Sandhi (स्वर संधि)',
    description: 'Combination of vowels',
    icon: Volume2,
    color: 'from-saffron-500 to-saffron-600',
    examples: [
      {
        input: 'राम + अस्ति',
        output: 'रामोऽस्ति',
        rule: 'अ + अ = ओ',
        explanation: 'When अ is followed by अ, they combine to form ओ'
      },
      {
        input: 'देव + इन्द्र',
        output: 'देवेन्द्र',
        rule: 'अ + इ = ए',
        explanation: 'अ followed by इ becomes ए'
      }
    ]
  },
  {
    id: 'consonant-sandhi',
    title: 'Consonant Sandhi (व्यंजन संधि)',
    description: 'Combination of consonants',
    icon: Brain,
    color: 'from-deep-teal-500 to-deep-teal-600',
    examples: [
      {
        input: 'तत् + अपि',
        output: 'तदपि',
        rule: 'त् + अ = द',
        explanation: 'त् changes to द before vowels'
      },
      {
        input: 'सत् + जन',
        output: 'सज्जन',
        rule: 'त् + ज = ज्ज',
        explanation: 'त् followed by ज becomes ज्ज'
      }
    ]
  },
  {
    id: 'visarga-sandhi',
    title: 'Visarga Sandhi (विसर्ग संधि)',
    description: 'Combination involving visarga',
    icon: Heart,
    color: 'from-indigo-500 to-indigo-600',
    examples: [
      {
        input: 'रामः + गच्छति',
        output: 'रामो गच्छति',
        rule: 'ः + ग = ओ ग',
        explanation: 'Visarga before ग becomes ओ'
      },
      {
        input: 'देवः + तिष्ठति',
        output: 'देवस्तिष्ठति',
        rule: 'ः + त = स्त',
        explanation: 'Visarga before त becomes स्त'
      }
    ]
  }
]

// Interactive sandhi practice
const sandhiPractice = [
  {
    id: 1,
    question: 'What is the correct sandhi for "राम + अस्ति"?',
    options: ['रामोऽस्ति', 'रामस्ति', 'रामोऽस्ति', 'रामोऽस्ति'],
    correct: 0,
    explanation: 'अ + अ = ओ in vowel sandhi'
  },
  {
    id: 2,
    question: 'Combine "तत् + अपि" correctly:',
    options: ['तदपि', 'ततपि', 'तदपि', 'तदपि'],
    correct: 0,
    explanation: 'त् + अ = द in consonant sandhi'
  },
  {
    id: 3,
    question: 'What is the result of "देवः + गच्छति"?',
    options: ['देवो गच्छति', 'देवगच्छति', 'देवो गच्छति', 'देवो गच्छति'],
    correct: 0,
    explanation: 'ः + ग = ओ ग in visarga sandhi'
  }
]

// Stats for the page
const stats = [
  { number: '1,200+', label: 'Sandhi Rules', icon: BookOpen },
  { number: '5,000+', label: 'Practice Sessions', icon: Play },
  { number: '95%', label: 'Accuracy Rate', icon: Trophy },
  { number: '4.8', label: 'User Rating', icon: Star }
]

export default function SandhiToolPage() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null)
  const [currentPractice, setCurrentPractice] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const currentRule = sandhiRules.find(rule => rule.id === selectedRule)
  const currentQ = sandhiPractice[currentPractice]

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

  // Simple sandhi processing (simplified version)
  const processSandhi = (text: string) => {
    // This is a simplified sandhi processor
    // In a real implementation, this would be much more sophisticated
    let result = text
    
    // Basic vowel sandhi rules
    result = result.replace(/अ\s*अ/g, 'ओ')
    result = result.replace(/अ\s*इ/g, 'ए')
    result = result.replace(/अ\s*उ/g, 'ओ')
    
    // Basic consonant sandhi rules
    result = result.replace(/त्\s*अ/g, 'द')
    result = result.replace(/त्\s*ज/g, 'ज्ज')
    
    // Basic visarga sandhi rules
    result = result.replace(/ः\s*ग/g, 'ओ ग')
    result = result.replace(/ः\s*त/g, 'स्त')
    
    return result
  }

  // Handle sandhi processing
  const handleProcessSandhi = () => {
    const result = processSandhi(inputText)
    setOutputText(result)
  }

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: answerIndex
    }))
  }

  // Calculate score
  const calculateScore = () => {
    let correct = 0
    sandhiPractice.forEach(question => {
      if (userAnswers[question.id] === question.correct) {
        correct++
      }
    })
    return Math.round((correct / sandhiPractice.length) * 100)
  }

  // Handle practice completion
  const handleCompletePractice = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setShowResults(true)
  }

  // Reset practice
  const resetPractice = () => {
    setCurrentPractice(0)
    setUserAnswers({})
    setShowResults(false)
    setScore(0)
  }

  // Next question
  const nextQuestion = () => {
    if (currentPractice < sandhiPractice.length - 1) {
      setCurrentPractice(prev => prev + 1)
    } else {
      handleCompletePractice()
    }
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
                  <Volume2 className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-hero text-high-contrast mb-8">
                Sanskrit{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 dark:from-saffron-500 dark:via-deep-teal-500 dark:to-indigo-500 bg-clip-text text-transparent">
                  Sandhi Tool
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-subheading text-medium-contrast mb-8 max-w-4xl mx-auto devanagari-separator">
                Master Sanskrit sound combinations with our interactive sandhi tool. Learn the rules, practice combinations, and perfect your pronunciation.
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

      {/* Interactive Sandhi Processor */}
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
              Interactive Sandhi Processor
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Enter Sanskrit text and see how sandhi rules apply. Learn the sound combinations that make Sanskrit flow naturally.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="card-premium p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input */}
                <div>
                  <label className="block text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Input Text
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter Sanskrit text (e.g., राम अस्ति)"
                    className="w-full h-32 p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl bg-white dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 focus:border-saffron-500 dark:focus:border-saffron-400 focus:outline-none resize-none"
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
                      onClick={handleProcessSandhi}
                      disabled={!inputText}
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Process Sandhi</span>
                    </motion.button>
                  </div>
                </div>

                {/* Output */}
                <div>
                  <label className="block text-lg font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Output (with Sandhi)
                  </label>
                  <div className="w-full h-32 p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl bg-wisdom-50 dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 font-devanagari text-lg">
                    {outputText || 'Processed text will appear here...'}
                  </div>
                  {outputText && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => isPlaying ? stopAudio() : playAudio(outputText)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 mt-4"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>Play Result</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sandhi Rules */}
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
              Sandhi Rules & Examples
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Explore the three main types of sandhi with detailed examples and explanations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sandhiRules.map((rule, index) => (
              <motion.div
                key={rule.id}
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
                className="group perspective-1000 cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setSelectedRule(rule.id)}
              >
                <div className="card-premium p-8 h-full group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-saffron-100/20 to-deep-teal-100/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  {/* Header */}
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-r ${rule.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <rule.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2 text-center group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                      {rule.title}
                    </h3>
                    
                    <p className="text-wisdom-600 dark:text-wisdom-400 mb-6 text-center leading-relaxed text-sm">
                      {rule.description}
                    </p>
                  </div>

                  {/* Examples Preview */}
                  <div className="relative z-10 space-y-3">
                    {rule.examples.slice(0, 2).map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-wisdom-100 dark:bg-wisdom-700 rounded-lg p-3">
                        <div className="text-sm font-devanagari text-indigo-700 dark:text-soft-gold-500 mb-1">
                          {example.input} → {example.output}
                        </div>
                        <div className="text-xs text-wisdom-500 dark:text-wisdom-400">
                          {example.rule}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 flex items-center justify-center space-x-2 text-saffron-600 dark:text-saffron-400 font-medium group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors mt-6">
                    <span>Learn More</span>
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

      {/* Practice Section */}
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
              Test Your Knowledge
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Practice sandhi combinations with our interactive quiz. Master the rules through hands-on exercises.
            </p>
          </motion.div>

          {!showResults && (
            <div className="max-w-4xl mx-auto">
              <div className="card-premium p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                    Question {currentPractice + 1} of {sandhiPractice.length}
                  </h3>
                  <div className="w-full bg-wisdom-200 dark:bg-wisdom-700 rounded-full h-2 mb-6">
                    <div 
                      className="bg-gradient-to-r from-saffron-500 to-deep-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentPractice + 1) / sandhiPractice.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                    {currentQ.question}
                  </h4>

                  <div className="space-y-4">
                    {currentQ.options.map((option, index) => (
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
                          <span className="text-wisdom-700 dark:text-wisdom-300 font-medium font-devanagari">
                            {option}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
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
                    onClick={nextQuestion}
                    disabled={userAnswers[currentQ.id] === undefined}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>
                      {currentPractice === sandhiPractice.length - 1 ? 'Finish' : 'Next'}
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
                  You scored {score}% on the sandhi quiz. 
                  {score >= 80 ? ' Outstanding performance!' : score >= 60 ? ' Great effort!' : ' Practice makes perfect!'}
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
                    onClick={() => setSelectedRule(null)}
                    className="flex items-center space-x-2 px-8 py-4 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Learn More Rules</span>
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