'use client'

import { BookOpen, MessageCircle, Award, Users } from 'lucide-react'

const outcomes = [
  {
    icon: BookOpen,
    title: 'संस्कृत शब्दों का सही उच्चारण',
    subtitle: 'Correct Sanskrit Pronunciation'
  },
  {
    icon: MessageCircle,
    title: 'पदच्छेद कर सकेंगे',
    subtitle: 'Word Segmentation'
  },
  {
    icon: Award,
    title: 'व्याकरण से वाक्य समझना',
    subtitle: 'Understanding through Grammar'
  },
  {
    icon: Users,
    title: 'सरल संस्कृत संभाषण',
    subtitle: 'Simple Sanskrit Conversation'
  }
]

export default function Outcomes() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="outcomes-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          What You Will Learn
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-devanagari">
          आप इस कोर्स में ये सब सीखेंगे
        </p>
      </div>

      {/* Simple Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {outcomes.map((outcome, index) => (
          <div 
            key={index}
            className="p-6 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-saffron-100 dark:bg-saffron-900/30 rounded-lg flex-shrink-0">
                <outcome.icon className="w-6 h-6 text-saffron-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-devanagari mb-1">
                  {outcome.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {outcome.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
