'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react'

interface FAQProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          FAQs
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Frequently Asked Questions
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-wisdom-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <HelpCircle className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-gray-600 dark:text-gray-400 ml-8">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Card */}
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-50 to-saffron-50 dark:from-wisdom-800 dark:to-wisdom-700 rounded-lg p-6 border border-saffron-200 text-center">
        <MessageCircle className="w-12 h-12 text-saffron-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Still have questions?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Contact our support team
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-50 font-semibold rounded-lg transition-colors"
          >
            WhatsApp
          </a>
          <a 
            href="mailto:support@shikshanam.com"
            className="px-6 py-2 bg-saffron-600 hover:bg-saffron-700 text-white font-semibold rounded-lg transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
