'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, CheckCircle, ArrowRight } from 'lucide-react'

interface SanskritQuizModalProps {
  isOpen: boolean
  onClose: () => void
}

const quizData = [
  { question: "What is the meaning of 'चिन्ता मास्तु'? / 'चिन्ता मास्तु' का क्या अर्थ है?", options: ["Don't worry / चिंता मत करो", "Please wait / कृपया प्रतीक्षा करें", "Think carefully / ध्यान से सोचें", "Forget everything / सब कुछ भूल जाओ"], answer: "Don't worry / चिंता मत करो" },
  { question: "Future tense of 'पठति' is: / 'पठति' का भविष्य काल है:", options: ["पठिष्यति", "पठतु", "पठति", "पठताम्"], answer: "पठिष्यति" },
  { question: "What is the meaning of 'दर्पणः'? / 'दर्पणः' का क्या अर्थ है?", options: ["Light / प्रदीप", "Shadow / छाया", "Mirror / शीशा", "Screen / स्क्रीन"], answer: "Mirror / शीशा" },
  { question: "Choose the correct translation for 'I am fine'. / 'मैं ठीक हूँ' का सही अनुवाद चुनें।", options: ["अहं गच्छामि", "अहं कुशली अस्मि", "त्वं कुशलः", "सः कुशली"], answer: "अहं कुशली अस्मि" },
  { question: "'क्रीडति' means: / 'क्रीडति' का अर्थ है:", options: ["runs / भागता है", "stands / खड़ा है", "sits / बैठा है", "plays / खेलता है"], answer: "plays / खेलता है" },
  { question: "What does 'भवतः नाम किम्?' mean? / 'भवतः नाम किम्?'  का क्या मतलब है?", options: ["What is your name? (to a male) / आपका नाम क्या है? (पुरुष से)", "What is his name? / उसका नाम क्या है?", "What is your name? (to a female) / आपका नाम क्या है? ( महिला से)", "How are you? / आप कैसे हैं?"], answer: "What is your name? (to a male) / आपका नाम क्या है? (पुरुष से)" },
  { question: "Plural of लिखति is - / लिखति का बहुचन है -", options: ["लेखिष्यन्ति", "लिखन्ति", "लेखयन्ति", "लिखामः"], answer: "लिखन्ति" },
  { question: "What does चषकः means ? / 'चषकः' का क्या अर्थ है?", options: ["Plate / थाली", "glass for drinking / पानी पीने का गिलास", "spoon / चम्मच", "bowl / कटोरि"], answer: "glass for drinking / पानी पीने का गिलास" },
  { question: "Correct masculine form of 'beautiful' in Sanskrit is: / संस्कृत में 'सुंदर' का सही पुल्लिंग रूप है:", options: ["सुन्दरा", "सुन्दरम्", "सुन्दरः", "सुन्दरि"], answer: "सुन्दरः" },
  { question: "What is the meaning of 'शीघ्रम् आगच्छ'? / 'शीघ्रम् आगच्छ' का क्या अर्थ है?", options: ["Speak slowly / धीरे बोलो", "Come quickly / जल्दी आओ", "Go carefully /  सावधानी से चलो", "Sit quietly / चुपचाप बैठो"], answer: "Come quickly / जल्दी आओ" },
  { question: "The number '33' in Sanskrit is: / संस्कृत में संख्या '33' है:", options: ["त्र्यस्त्रिंशत्", "एकचत्वारिंशत्", "त्रिचत्वारिंशत्", "त्रिंशत्"], answer: "त्र्यस्त्रिंशत्" },
  { question: "'अहं पठामि' means: / 'अहं पठामि' का अर्थ है:", options: ["I read / मैं पढ़ता हूँ", "You read / आप पढ़ते हैं", "He reads / वह पढ़ता है", "We read / हम पढ़ते हैं"], answer: "I read / मैं पढ़ता हूँ" },
  { question: "What is the meaning of 'आगच्छन्तु'? / 'आगच्छन्तु' का क्या अर्थ है?", options: ["Go / जाओ", "Come / आओ", "Run / दौड़ो", "None of the above / उपरोक्त में से कोई नहीं"], answer: "Come / आओ" },
  { question: "What is the meaning of 'कृपया उपविश'? / 'कृपया उपविश' का क्या अर्थ है?", options: ["Please sit / कृपया बैठो", "Please write / कृपया लिखो", "Please read / कृपया पढ़ो", "Please stand / कृपया खड़े हो जाओ"], answer: "Please sit / कृपया बैठो" },
  { question: "Feminine form of 'बालकः' is: / 'बालकः' का स्त्रीलिंग रूप है:", options: ["बालिका", "बालिके", "बालिकासु", "बालिकेभ्यः"], answer: "बालिका" },
  { question: "'उष्णम्' means: / 'उष्णम्' का अर्थ है:", options: ["Hot / गरम", "Cold / ठंडा", "Sweet / मीठा", "Heavy / भारी"], answer: "Hot / गरम" },
  { question: "What is the meaning of 'भोजनं करोति'? / 'भोजनं करोति' का क्या अर्थ है?", options: ["Eats food / खाना खाता है", "Cooks food / खाना पकाता है", "Serves food / भोजन परोसता है", "Prepares food / भोजन तैयार करता है"], answer: "Eats food / खाना खाता है" },
  { question: "How do you say 'Where are you going?' in Sanskrit? / संस्कृत में 'आप कहाँ जा रहे हैं?' कैसे कहते हैं?", options: ["कुत्र गच्छसि?", "कथं गच्छसि?", "किं गच्छसि?", "कदा गच्छसि?"], answer: "कुत्र गच्छसि?" },
  { question: "Fill in the blank - रामः, रामौ, ….। /  रिक्त स्थान भरें - रामः, रामौ, ….।", options: ["रामान्", "रामेषु", "रामाः", "रामाणाम्"], answer: "रामाः" },
  { question: "Choose the correct greeting for 'See you again'. /  'फिर मिलेंगे' के लिए सही अभिवादन चुनें।", options: ["पुनः मिलामः", "शुभरात्रिः", "पुनरागम्य", "आगच्छतु"], answer: "पुनः मिलामः" }
]

export default function SanskritQuizModal({ isOpen, onClose }: SanskritQuizModalProps) {
  const [currentStep, setCurrentStep] = useState<'instructions' | 'quiz' | 'results'>('instructions')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(new Array(quizData.length).fill(null))
  const [timeRemaining, setTimeRemaining] = useState(900) // 15 minutes
  const [score, setScore] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStep('instructions')
      setCurrentQuestionIndex(0)
      setUserAnswers(new Array(quizData.length).fill(null))
      setTimeRemaining(900)
      setScore(0)
      setTimeTaken(0)
    }
  }, [isOpen])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (currentStep === 'quiz' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [currentStep, timeRemaining])

  const startQuiz = () => {
    setCurrentStep('quiz')
  }

  const selectAnswer = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    const finalTimeTaken = 900 - timeRemaining
    setTimeTaken(finalTimeTaken)
    
    let calculatedScore = 0
    quizData.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        calculatedScore++
      }
    })
    setScore(calculatedScore)

    // Store result in localStorage
    const result = {
      score: calculatedScore,
      total: quizData.length,
      timeTaken: finalTimeTaken,
      timestamp: new Date().toISOString(),
      passed: calculatedScore >= 15 // 75% passing score
    }
    localStorage.setItem('sanskritQuizResult', JSON.stringify(result))

    setCurrentStep('results')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getResultMessage = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage >= 75) {
      return {
        title: "अभिनन्दनम्! (Congratulations!)",
        message: "You have demonstrated strong Sanskrit knowledge. You're ready for our Advanced Sanskrit Live Classes!",
        courseUrl: "/courses/sanskrit-live-class",
        courseTitle: "Enroll in Advanced Sanskrit"
      }
    } else {
      return {
        title: "Good Start!",
        message: "You've shown interest in Sanskrit. Our Beginner Course will help you build a strong foundation before moving to advanced classes.",
        courseUrl: "/courses/sanskrit-basics",
        courseTitle: "Start with Beginner Course"
      }
    }
  }

  if (!isOpen) return null

  const currentQuestion = quizData[currentQuestionIndex]
  const resultData = getResultMessage()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-wisdom-800 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Instructions */}
            {currentStep === 'instructions' && (
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-golden-olive to-deep-maroon bg-clip-text text-transparent">
                  Sanskrit Knowledge Quiz
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-olive flex-shrink-0 mt-1" />
                    <p className="text-lg">20 Questions / 20 प्रश्न</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-golden-olive flex-shrink-0 mt-1" />
                    <p className="text-lg">Time: 15 minutes / समय: 15 मिनट</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-olive flex-shrink-0 mt-1" />
                    <p className="text-lg">Score 75% or higher to qualify for Advanced Sanskrit</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-golden-olive flex-shrink-0 mt-1" />
                    <p className="text-lg">Below 75%? Our Beginner Course is perfect for you!</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startQuiz}
                  className="w-full bg-gradient-to-r from-golden-olive to-deep-maroon text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Quiz
                </motion.button>
              </div>
            )}

            {/* Quiz */}
            {currentStep === 'quiz' && (
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-semibold bg-golden-olive/20 px-4 py-2 rounded-full">
                    Question {currentQuestionIndex + 1} / {quizData.length}
                  </span>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-golden-olive" />
                    <span className="text-xl font-bold text-golden-olive font-mono">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-golden-olive to-deep-maroon"
                  />
                </div>

                {/* Question */}
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <motion.label
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          userAnswers[currentQuestionIndex] === option
                            ? 'border-golden-olive bg-golden-olive/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-golden-olive/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={userAnswers[currentQuestionIndex] === option}
                          onChange={() => selectAnswer(option)}
                          className="sr-only"
                        />
                        <span className="text-base md:text-lg">{option}</span>
                      </motion.label>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePrev}
                      disabled={currentQuestionIndex === 0}
                      className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-golden-olive to-deep-maroon text-white font-semibold flex items-center space-x-2"
                    >
                      <span>{currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Results */}
            {currentStep === 'results' && (
              <div className="p-8 md:p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-golden-olive to-deep-maroon bg-clip-text text-transparent">
                    {resultData.title}
                  </h2>
                </motion.div>

                <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
                  <div className="bg-golden-olive/10 rounded-2xl p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Score</p>
                    <p className="text-3xl font-bold text-golden-olive">{score} / {quizData.length}</p>
                  </div>
                  <div className="bg-deep-maroon/10 rounded-2xl p-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Time Taken</p>
                    <p className="text-3xl font-bold text-deep-maroon">{formatTime(timeTaken)}</p>
                  </div>
                </div>

                <p className="text-lg mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
                  {resultData.message}
                </p>

                <motion.a
                  href={resultData.courseUrl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-golden-olive to-deep-maroon text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {resultData.courseTitle}
                </motion.a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

