'use client'

import { AlertCircle, CheckCircle } from 'lucide-react'

export default function NotSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="not-section-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Why Learn Sanskrit
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-devanagari">
          संस्कृत क्यों सीखें और यह कोर्स किस बारे में है
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Why Section */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-devanagari">
                Why / संस्कृत क्यों सीखें
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span className="font-devanagari">ग्रन्थों की भाषा समझने के लिए - To understand the language of scriptures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span className="font-devanagari">संस्कृत संस्कृति जानने के लिए - To know Sanskrit culture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What It's Not */}
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border-l-4 border-amber-500">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-devanagari">
                What This Course is Not
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-devanagari mb-2">
                <strong>यह कोर्स वैदिक संस्कृत के लिए नहीं है</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-devanagari">
                यह <strong>उत्तर-वैदिक संस्कृत</strong> (रामायण, गीता आदि) पर केंद्रित है
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-2">
                This course is NOT for Vedic Sanskrit; it focuses on Post-Vedic Sanskrit (Ramayana, Gita, etc.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
