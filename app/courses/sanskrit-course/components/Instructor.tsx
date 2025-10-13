'use client'

import { GraduationCap, Award } from 'lucide-react'
import Image from 'next/image'

export default function Instructor() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="instructor-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Meet your Guru!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Learn from a traditionally trained Gurukul Acharya
        </p>
      </div>

      {/* Instructor Card */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/3 bg-gradient-to-br from-saffron-100 to-orange-100 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-saffron-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl font-devanagari text-saffron-800">ॐ</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                <Award className="w-4 h-4" />
                12+ Years
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-2/3 p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-devanagari mb-1">
                आचार्य वि श्रीनिधिः
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Acharya V. Shrinidhi
              </p>
              <p className="text-saffron-600 dark:text-saffron-400 font-semibold">
                पूर्णप्रज्ञविद्यापीठम्, बेङ्गलूरु
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                <span>12+ Years Gurukul Experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                <span>Speaks Sanskrit Fluently</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                <span>Trained under Sri Vishweshateertha Swamiji</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-saffron-500 rounded-full" />
                <span>Currently at Vedavyasa Gurukul, Delhi</span>
              </div>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-wisdom-700 rounded-lg border-l-4 border-saffron-500">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-devanagari">
                आचार्य वि श्रीनिधि जी भाषाप्रवीण संस्कृताचार्य हैं। उन्होंने बेंगलुरु के पेजावर मठ के पूर्णप्रज्ञ गुरुकुल में श्री विश्वेशतीर्थ स्वामी जी के संरक्षण में संस्कृत का अध्ययन किया।
              </p>
            </div>

            <a 
              href="https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-3 bg-saffron-600 hover:bg-saffron-700 text-white font-semibold rounded-lg transition-colors"
            >
              Learn from Acharya V. Shrinidhi
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
