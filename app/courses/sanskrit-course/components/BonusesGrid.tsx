'use client'

import { BookOpen, FileText, Award, Gift } from 'lucide-react'

const bonuses = [
  {
    title: 'BONUS 1 — 500+ Words and Growing',
    subtitle: '500+ शब्द और बढ़ रहे हैं',
    description: 'Comprehensive Sanskrit vocabulary list',
    icon: BookOpen,
    value: '₹3,333'
  },
  {
    title: 'BONUS 2 — 12+ Practice Sheets',
    subtitle: '12+ अभ्यास पत्रक',
    description: 'Extensive practice worksheets',
    icon: FileText,
    value: '₹3,333'
  },
  {
    title: 'BONUS 3 — 30+ Notes & Quizzes',
    subtitle: '30+ नोट्स और क्विज़',
    description: 'Study notes and assessment quizzes',
    icon: Award,
    value: '₹3,334'
  }
]

export default function BonusesGrid() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="bonuses-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Exclusive Bonuses
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          <strong>Exclusive benefits valued at ₹10,000</strong> included with package
        </p>
      </div>

      {/* Bonuses Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {bonuses.map((bonus, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 relative"
          >
            {/* FREE Badge */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <Gift className="w-3 h-3" />
              FREE
            </div>

            <bonus.icon className="w-10 h-10 text-saffron-600 mb-4" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              {bonus.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-devanagari mb-3">
              {bonus.subtitle}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {bonus.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {bonus.value}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                Included Free
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-50 to-saffron-50 dark:from-wisdom-800 dark:to-wisdom-700 rounded-lg p-6 border-2 border-saffron-300">
        <div className="flex items-center justify-center gap-4">
          <Gift className="w-8 h-8 text-saffron-600" />
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              Total Bonus Value: ₹10,000
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completely free with package deal
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
