'use client'

import { useCMSContent } from '@/lib/cms/hooks'
import { useState } from 'react'

export default function CMSFAQ() {
  const { content, loading, error } = useCMSContent('faq')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  if (loading) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !content) {
    return (
      <section className="py-8 sm:py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our courses, platform, and learning experience.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {content.title || 'Frequently Asked Questions'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Find answers to common questions about our courses, platform, and learning experience.'}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {content.questions?.map((question: any) => (
            <div key={question.id} className="bg-white rounded-lg shadow-lg mb-4">
              <button
                onClick={() => toggleItem(parseInt(question.id))}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {question.question}
                </h3>
                <span className={`text-2xl transition-transform ${
                  openItems.includes(parseInt(question.id)) ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              {openItems.includes(parseInt(question.id)) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">
                    {question.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Section */}
        {content.support && (
          <div className="mt-12 text-center bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {content.support.title}
            </h3>
            <p className="text-gray-600 mb-6">
              {content.support.subtitle}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <a 
                href={`mailto:${content.support.email}`}
                className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <span className="mr-2">📧</span>
                Email Support
              </a>
              <a 
                href={`tel:${content.support.phone}`}
                className="flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <span className="mr-2">📞</span>
                Call Us
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>{content.support.hours}</p>
              <p>Phone: {content.support.phone}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
