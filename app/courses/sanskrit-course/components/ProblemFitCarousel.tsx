'use client'

import { BookOpen, Users, Award, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'जिसे हिन्दी में पढ़ाया गया हो।',
    subtitle: 'Taught in Hindi'
  },
  {
    icon: Users,
    title: 'जहां गुरुकुल के आचार्य पढ़ाते हों।',
    subtitle: 'Gurukul Acharya Teaches'
  },
  {
    icon: BookOpen,
    title: 'जिसके बाद ग्रन्थों को पढ़ा जा सके।',
    subtitle: 'Read Scriptures After Course'
  },
  {
    icon: Award,
    title: 'जहां संस्कृत उच्चारण शुद्ध हो।',
    subtitle: 'Pure Sanskrit Pronunciation'
  }
]

export default function ProblemFitCarousel() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="problem-fit-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          क्या आप एक ऐसा संस्कृत कोर्स ढूंढ रहे हैं?
        </h2>
        <p className="text-xl text-saffron-600 dark:text-saffron-400 font-bold font-devanagari">
          तो ये संस्कृत कोर्स आपके लिए है!
        </p>
        <p className="text-gray-600 dark:text-gray-400 italic">
          To help you write, understand and speak Sanskrit with confidence and clarity!
        </p>
      </div>

      {/* Simple Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((item, index) => (
          <div 
            key={index}
            className="p-6 bg-white dark:bg-wisdom-800 rounded-lg border-l-4 border-saffron-500 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-saffron-100 dark:bg-saffron-900/30 rounded-lg">
                <item.icon className="w-6 h-6 text-saffron-600 dark:text-saffron-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-devanagari mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
