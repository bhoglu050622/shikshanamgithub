'use client'

import { Play, Star } from 'lucide-react'
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'

export default function FinalCTA() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Om Symbol */}
        <div className="text-6xl font-devanagari text-saffron-600">
          ॐ
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-saffron-500 text-saffron-500" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
            संस्कृत सीखने का सफर शुरू करें
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Start Your Sanskrit Learning Journey
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-saffron-600">10K+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-saffron-600">⭐ 4.9</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-saffron-600">9K+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-saffron-600">1 yr</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Access</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <ProtectedExternalLink 
            href="https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2" 
            className="px-8 py-4 bg-saffron-600 hover:bg-saffron-700 text-white font-semibold text-lg rounded-lg transition-colors text-center"
          >
            Enroll Now
          </ProtectedExternalLink>
          
          <a 
            href="https://www.youtube.com/watch?v=QSePkphDUgk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-50 font-semibold text-lg rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Watch Demo
          </a>
        </div>

        {/* Quote */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 italic font-devanagari leading-relaxed">
            "आचार्य वि श्रीनिधि जी भाषाप्रवीण संस्कृताचार्य हैं। उन्होंने बेंगलुरु के पेजावर मठ के पूर्णप्रज्ञ गुरुकुल में श्री विश्वेशतीर्थ स्वामी जी के संरक्षण में संस्कृत का अध्ययन किया।"
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-devanagari">
            — आचार्य वि श्रीनिधिः
          </p>
        </div>
      </div>
    </div>
  )
}
