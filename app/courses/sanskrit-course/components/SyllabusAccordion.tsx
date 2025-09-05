'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Play, CheckCircle } from 'lucide-react'

const syllabusData = [
  {
    id: 'module-1',
    title: 'Module 1: Introduction to Sanskrit',
    englishTitle: 'मॉड्यूल 1: संस्कृत का परिचय',
    duration: '2 Weeks',
    lessons: 8,
    topics: [
      'History of Sanskrit language',
      'Introduction to Devanagari script',
      'Basic letters and vowels',
      'Consonants and their pronunciation',
      'Features of Sanskrit',
      'Importance of Sanskrit',
      'Basic vocabulary',
      'Simple sentence construction'
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Basic Grammar',
    englishTitle: 'मॉड्यूल 2: व्याकरण की मूल बातें',
    duration: '3 Weeks',
    lessons: 12,
    topics: [
      'Nouns and their types',
      'Gender, number, case',
      'Pronouns and their types',
      'Verbs and tenses',
      'Adjectives and their usage',
      'Indeclinable words',
      'Rules of sandhi',
      'Definition of samasa',
      'Prefixes and suffixes',
      'Sentence construction',
      'Interrogative words',
      'Negative sentences'
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Shlokas and Literature',
    englishTitle: 'मॉड्यूल 3: श्लोक और साहित्य',
    duration: '3 Weeks',
    lessons: 10,
    topics: [
      'Study of famous shlokas',
      'Shlokas from Bhagavad Gita',
      'Key shlokas from Ramayana',
      'Shlokas from Mahabharata',
      'Shlokas from Puranas',
      'Meaning and interpretation of shlokas',
      'Correct pronunciation of shlokas',
      'Memorizing shlokas',
      'Usage of shlokas',
      'Literary style'
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: Practical Sanskrit',
    englishTitle: 'मॉड्यूल 4: व्यावहारिक संस्कृत',
    duration: '2 Weeks',
    lessons: 8,
    topics: [
      'Daily use sentences',
      'Greetings and etiquette',
      'Time and date',
      'Family and relationships',
      'Food and drinks',
      'Colors and shapes',
      'Directions and places',
      'Conversation in Sanskrit'
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Advanced Grammar',
    englishTitle: 'मॉड्यूल 5: उन्नत व्याकरण',
    duration: '3 Weeks',
    lessons: 12,
    topics: [
      'Kridanta and taddhita',
      'Types of samasa',
      'Detailed rules of sandhi',
      'Alankara and chhanda',
      'Types of sentences',
      'Different forms of verbs',
      'Tense and mood',
      'Voice and usage',
      'Styles of Sanskrit',
      'Poetry and prose',
      'Art of translation',
      'Sanskrit writing'
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: Assessment and Certification',
    englishTitle: 'मॉड्यूल 6: परीक्षा और प्रमाणन',
    duration: '1 Week',
    lessons: 4,
    topics: [
      'Final exam preparation',
      'Grammar examination',
      'Shloka examination',
      'Certificate attainment'
    ]
  }
]

export default function SyllabusAccordion() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  const totalLessons = syllabusData.reduce((sum, module) => sum + module.lessons, 0)
  const totalDuration = '14 Weeks'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50"
        >
          Course Syllabus
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          Complete roadmap for learning Sanskrit in a structured way
        </motion.p>
      </div>

      {/* Course Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-saffron-50 to-saffron-100 dark:from-saffron-900/20 dark:to-saffron-800/20">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-saffron-500 rounded-xl flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">
                  {totalLessons}
                </div>
                <div className="text-sm text-indigo-600 dark:text-wisdom-400">
                  Lessons
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-peacock-green-500 rounded-xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">
                  {totalDuration}
                </div>
                <div className="text-sm text-indigo-600 dark:text-wisdom-400">
                  Duration
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 bg-lotus-pink-500 rounded-xl flex items-center justify-center mx-auto">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-indigo-900 dark:text-wisdom-50">
                  6
                </div>
                <div className="text-sm text-indigo-600 dark:text-wisdom-400">
                  Modules
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Syllabus Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <Accordion 
          type="single" 
          collapsible 
          className="space-y-4"
          onValueChange={setActiveModule}
        >
          {syllabusData.map((module, index) => (
            <AccordionItem 
              key={module.id} 
              value={module.id}
              className="border-0"
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-indigo-900 dark:text-wisdom-50">
                        {module.title}
                      </h3>
                      <p className="text-sm text-indigo-600 dark:text-wisdom-400 font-devanagari">
                        {module.englishTitle}
                      </p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          {module.lessons} Lessons
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          {module.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-indigo-900 dark:text-wisdom-50">
                      In this module you will learn:
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {module.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: topicIndex * 0.05 }}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-sm text-indigo-700 dark:text-wisdom-200">
                            {topic}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* Sticky Mini TOC for Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40"
      >
        <Card className="border-0 shadow-lg bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <h4 className="font-semibold text-indigo-900 dark:text-wisdom-50 text-sm mb-3">
              Modules
            </h4>
            <div className="space-y-2">
              {syllabusData.map((module, index) => (
                <button
                  key={module.id}
                  onClick={() => {
                    const element = document.getElementById(module.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`block w-full text-left p-2 rounded-lg text-xs transition-colors duration-200 ${
                    activeModule === module.id
                      ? 'bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300'
                      : 'text-indigo-600 dark:text-wisdom-400 hover:bg-indigo-50 dark:hover:bg-wisdom-700'
                  }`}
                >
                  <div className="font-medium">Module {index + 1}</div>
                  <div className="text-xs opacity-75">{module.lessons} Lessons</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
