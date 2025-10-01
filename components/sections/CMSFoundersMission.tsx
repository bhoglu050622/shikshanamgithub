'use client'

import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSFoundersMission() {
  const { content, loading, error } = useCMSContent('foundersMission')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Founder's Mission</h2>
            <p className="text-gray-600">To Transform Modern lives with Eternal Wisdom</p>
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
            {content.title || 'Founder\'s Mission'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            {content.subtitle || 'To Transform Modern lives with Eternal Wisdom'}
          </p>
          <p className="text-gray-700 max-w-4xl mx-auto">
            {content.content || 'We believe in making ancient Indian wisdom accessible to everyone through modern technology and pedagogy. Our mission is to preserve and share the timeless knowledge of our ancestors.'}
          </p>
        </div>

        {content.founderName && (
          <div className="text-center">
            <div className="inline-block bg-white rounded-lg shadow-lg p-6">
              <img 
                src={content.image} 
                alt={content.founderName}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {content.founderName}
              </h3>
              <p className="text-gray-600">
                {content.founderTitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
