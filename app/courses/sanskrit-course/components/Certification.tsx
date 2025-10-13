'use client'

import { Award, CheckCircle, Linkedin } from 'lucide-react'

export default function Certification() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="certification-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Certification
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-devanagari">
          Earn your credential of expertise
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Certificate Preview */}
          <div className="bg-white dark:bg-wisdom-800 rounded-lg border-4 border-saffron-200 dark:border-saffron-700 p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-saffron-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-devanagari mb-2">
                  प्रमाणपत्र
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Certificate of Completion
                </p>
              </div>
              <div className="py-6 border-y border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-devanagari">
                  यह प्रमाणित किया जाता है कि
                </p>
                <div className="text-lg font-bold text-gray-900 dark:text-white py-2">
                  [आपका नाम]
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-devanagari">
                  ने संस्कृत कोर्स सफलतापूर्वक पूरा किया है
                </p>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <div>
                  <div className="w-16 h-0.5 bg-saffron-500 mb-1"></div>
                  <div className="font-devanagari">आचार्य वि श्रीनिधिः</div>
                </div>
                <div>
                  <div className="w-16 h-0.5 bg-saffron-500 mb-1"></div>
                  <div>Shikshanam</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <CheckCircle className="w-6 h-6 text-saffron-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Share your Verified Certificate
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-devanagari">
                    सोशल मीडिया पर शेयर करें
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Linkedin className="w-6 h-6 text-saffron-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Add Certificate to LinkedIn
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add to your professional profile
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-devanagari">
                <strong>नोट:</strong> सर्टिफिकेट कोर्स पूरा करने और परीक्षा पास करने पर मिलता है।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
