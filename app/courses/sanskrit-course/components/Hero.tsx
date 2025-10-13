'use client'

import { Star, Play } from 'lucide-react'
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'

export default function Hero() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-orange-50 to-white dark:from-wisdom-900 dark:to-wisdom-800">
      {/* Om Symbol Watermark */}
      <div className="absolute top-10 right-10 text-9xl opacity-5 font-devanagari select-none">
        ॐ
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-8">
          {/* Om Symbol */}
          <div className="text-6xl font-devanagari text-saffron-600">
            ॐ
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-devanagari leading-relaxed">
            संस्कृत भाषा सीखें आसानी से, हिन्दी में
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Online Sanskrit Course in Hindi for Beginners
          </p>

          {/* Trust Line */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              4.9 ⭐ • 10,000+ छात्र • 9,000+ Reviews
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <ProtectedExternalLink 
              href="https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2"
              className="px-8 py-4 bg-saffron-600 hover:bg-saffron-700 text-white font-semibold rounded-lg transition-colors text-center"
            >
              कोर्स में दाखिला लें
            </ProtectedExternalLink>
            <a 
              href="https://www.youtube.com/watch?v=QSePkphDUgk" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-50 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Free Demo देखें
            </a>
          </div>

          {/* Simple Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
            <div className="p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-saffron-600">30</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
            </div>
            <div className="p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-saffron-600">17+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
            </div>
            <div className="p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-saffron-600">Weekly</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Live QnA</div>
            </div>
            <div className="p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-saffron-600">1 Year</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
