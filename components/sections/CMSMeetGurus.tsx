'use client'

import Image from 'next/image'
import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSMeetGurus() {
  const { content, loading, error } = useCMSContent('meetGurus')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet Your Gurus</h2>
            <p className="text-gray-600">Learn from authentic teachers of ancient wisdom</p>
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
            {content.title || 'Meet Your Gurus'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Learn from authentic teachers of ancient wisdom'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.gurus?.map((guru: any) => (
            <div key={guru.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <Image 
                  src={guru.image} 
                  alt={guru.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {guru.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {guru.title}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {guru.description}
                </p>
                <a 
                  href={guru.link} 
                  className="inline-block px-6 py-3 rounded-lg text-white font-semibold bg-primary hover:opacity-90 transition-opacity"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
