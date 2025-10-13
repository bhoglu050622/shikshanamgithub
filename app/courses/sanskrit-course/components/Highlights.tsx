'use client'

import { MessageSquare, Award, Clock, FileText, Users, BookOpen, Video, Calendar } from 'lucide-react'

const highlights = [
  { icon: MessageSquare, text: 'Community Forum', subtext: 'समुदाय फ़ोरम' },
  { icon: Award, text: 'Certification', subtext: 'प्रमाणपत्र' },
  { icon: Clock, text: '17+ Hrs. of Content', subtext: '17+ घंटे की सामग्री' },
  { icon: FileText, text: 'Quizzes and Notes', subtext: 'क्विज़ और नोट्स' },
  { icon: Calendar, text: '1 yr Access', subtext: '1 वर्ष एक्सेस' },
  { icon: Users, text: 'Live QnA Every Week', subtext: 'साप्ताहिक लाइव प्रश्नोत्तर' },
  { icon: BookOpen, text: 'Free Future Updates', subtext: 'भविष्य के अपडेट मुफ़्त' },
  { icon: Video, text: '30 Sessions (Pre-Recorded)', subtext: '30 सत्र' }
]

export default function Highlights() {
  return (
    <div className="py-12 bg-gradient-to-r from-orange-50 via-white to-orange-50 dark:from-wisdom-900 dark:to-wisdom-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
            >
              <item.icon className="w-6 h-6 text-saffron-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
                {item.text}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-devanagari">
                {item.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

