'use client'

import { Users, Star, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'छात्र (Students)'
  },
  {
    icon: Star,
    value: '⭐ 4.9',
    label: 'रेटिंग (Rating)'
  },
  {
    icon: Award,
    value: '9,000+',
    label: 'समीक्षाएं (Reviews)'
  }
]

export default function SocialProof() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="social-proof-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Trusted by Thousands
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-devanagari">
          हजारों छात्रों, गृहणियों और जिज्ञासुओं ने बढ़ाए संस्कृत की ओर कदम!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-8 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <stat.icon className="w-12 h-12 text-saffron-600 mx-auto mb-4" />
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-devanagari">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Image Placeholder */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-orange-50 to-saffron-50 dark:from-wisdom-800 dark:to-wisdom-700 rounded-lg p-8 border border-saffron-200">
          <p className="text-center text-gray-700 dark:text-gray-300 italic mb-4">
            "Video testimonials showcase real student experiences"
          </p>
          <div className="text-center">
            <a 
              href="https://www.youtube.com/playlist?list=PLHQ01VIno4knuiKht1_59FUeSsroyNeC0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron-600 hover:text-saffron-700 font-semibold underline"
            >
              Watch Student Reviews →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
