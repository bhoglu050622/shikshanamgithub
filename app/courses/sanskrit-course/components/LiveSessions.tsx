'use client'

import { Calendar, Clock } from 'lucide-react'

export default function LiveSessions() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="live-sessions-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Unlimited Live Sessions!
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 font-devanagari">
          इस Course के साथ आपको आजीवन Doubt-Solving Live Sessions उपलब्ध हैं!
        </p>
      </div>

      {/* Live Session Card */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-wisdom-800 rounded-lg border-2 border-saffron-500 p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-saffron-100 dark:bg-saffron-900/30 rounded-lg">
              <Calendar className="w-8 h-8 text-saffron-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">Every Sunday</div>
              <div className="text-gray-600 dark:text-gray-400 font-devanagari">हर रविवार</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-saffron-100 dark:bg-saffron-900/30 rounded-lg">
              <Clock className="w-8 h-8 text-saffron-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">07:00 PM IST</div>
              <div className="text-gray-600 dark:text-gray-400 font-devanagari">शाम 7 बजे</div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-saffron-700 dark:text-saffron-400 font-semibold">
              📅 Live Class: Every Sunday · 07:00 pm
            </p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-sm text-green-800 dark:text-green-200 text-center font-devanagari">
            <strong>आजीवन लाभ:</strong> इस कोर्स के साथ आपको आजीवन Doubt-Solving Live Sessions उपलब्ध हैं।
          </p>
        </div>
      </div>
    </div>
  )
}
