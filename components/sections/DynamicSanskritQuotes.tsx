'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Quote, Sparkles, Flower2, BookOpen } from 'lucide-react'
import Mandala from '../ornaments/Mandala'

const sanskritQuotes = [
  {
    sanskrit: "सत्यमेव जयते",
    transliteration: "Satyameva Jayate",
    translation: "Truth alone triumphs",
    meaning: "The eternal truth that righteousness and truth always prevail over falsehood and injustice."
  },
  {
    sanskrit: "वसुधैव कुटुम्बकम्",
    transliteration: "Vasudhaiva Kutumbakam",
    translation: "The world is one family",
    meaning: "A profound philosophy that sees the entire world as one interconnected family, promoting universal brotherhood."
  },
  {
    sanskrit: "सर्वे भवन्तु सुखिनः",
    transliteration: "Sarve Bhavantu Sukhinah",
    translation: "May all beings be happy",
    meaning: "A universal prayer for the happiness and well-being of all living beings without exception."
  },
  {
    sanskrit: "अहं ब्रह्मास्मि",
    transliteration: "Aham Brahmasmi",
    translation: "I am the universe",
    meaning: "The realization that the individual soul and the universal consciousness are one and the same."
  },
  {
    sanskrit: "तत् त्वं असि",
    transliteration: "Tat Tvam Asi",
    translation: "That thou art",
    meaning: "You are that ultimate reality - the profound truth of non-duality and oneness with the divine."
  },
  {
    sanskrit: "सर्वं खल्विदं ब्रह्म",
    transliteration: "Sarvam Khalvidam Brahma",
    translation: "All this is indeed Brahman",
    meaning: "Everything in existence is a manifestation of the ultimate reality, the divine consciousness."
  },
  {
    sanskrit: "योगः कर्मसु कौशलम्",
    transliteration: "Yogah Karmasu Kaushalam",
    translation: "Yoga is skill in action",
    meaning: "True yoga is performing one's duties with excellence, detachment, and spiritual awareness."
  },
  {
    sanskrit: "सर्वं परवशं दुःखं",
    transliteration: "Sarvam Paravasham Duhkham",
    translation: "All that is dependent is sorrow",
    meaning: "Attachment and dependence on external things lead to suffering; true freedom comes from inner independence."
  }
]

export default function DynamicSanskritQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % sanskritQuotes.length)
        setIsVisible(true)
      }, 500)
    }, 6000) // Change quote every 6 seconds

    return () => clearInterval(interval)
  }, [])

  const currentQuote = sanskritQuotes[currentQuoteIndex]

  return (
    <section className="relative py-16 bg-gradient-to-br from-sand-100 via-off-white-500 to-sand-200 dark:from-wisdom-800 dark:via-wisdom-900 dark:to-wisdom-800 overflow-hidden transition-colors duration-300">
      {/* Background Ornaments */}
      <div className="absolute inset-0 -z-10">
        <Mandala 
          size={200} 
          className="top-10 left-10 opacity-10 dark:opacity-5" 
          speed={80}
        />
        <Mandala 
          size={150} 
          className="bottom-10 right-10 opacity-8 dark:opacity-4" 
          speed={100}
        />
        
        {/* Enhanced background gradients */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-saffron-200/15 via-deep-teal-200/10 to-indigo-200/15 dark:from-saffron-400/8 dark:via-deep-teal-400/5 dark:to-indigo-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-deep-teal-200/15 via-indigo-200/10 to-saffron-200/15 dark:from-deep-teal-400/8 dark:via-indigo-400/5 dark:to-saffron-400/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        
        {/* Indian pattern overlay */}
        <div className="absolute inset-0 indian-pattern opacity-20 dark:opacity-10"></div>
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-saffron-500 animate-pulse" />
            <Flower2 className="w-8 h-8 text-deep-teal-500 animate-bounce" />
            <BookOpen className="w-6 h-6 text-indigo-500 animate-pulse" />
          </div>
          
          <h2 className="text-display text-high-contrast mb-4 font-serif">
            Dynamic Sanskrit Quotes
          </h2>
          
          <p className="text-body text-medium-contrast max-w-2xl mx-auto">
            Timeless wisdom from ancient Sanskrit texts, rotating to inspire and enlighten
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white/80 dark:bg-wisdom-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-wisdom-700/30">
            {/* Quote indicator dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {sanskritQuotes.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentQuoteIndex 
                      ? 'bg-gradient-to-r from-saffron-500 to-deep-teal-500 scale-125' 
                      : 'bg-indigo-300 dark:bg-wisdom-600'
                  }`}
                  animate={{
                    scale: index === currentQuoteIndex ? 1.25 : 1,
                    opacity: index === currentQuoteIndex ? 1 : 0.5
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-center space-y-6"
                >
                  {/* Sanskrit Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl md:text-4xl font-serif text-high-contrast leading-relaxed"
                  >
                    {currentQuote.sanskrit}
                  </motion.div>

                  {/* Transliteration */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-saffron-600 dark:text-saffron-400 font-medium italic"
                  >
                    {currentQuote.transliteration}
                  </motion.div>

                  {/* Translation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xl md:text-2xl text-deep-teal-700 dark:text-deep-teal-400 font-semibold"
                  >
                    "{currentQuote.translation}"
                  </motion.div>

                  {/* Meaning */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-body text-medium-contrast max-w-3xl mx-auto leading-relaxed"
                  >
                    {currentQuote.meaning}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-saffron-400 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-deep-teal-400 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-indigo-400 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-saffron-400 rounded-br-lg"></div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
                      <div className="inline-flex items-center space-x-2 text-small text-medium-contrast">
            <Quote className="w-4 h-4" />
            <span>Quote {currentQuoteIndex + 1} of {sanskritQuotes.length}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
