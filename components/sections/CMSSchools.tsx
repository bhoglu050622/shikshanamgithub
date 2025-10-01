'use client'

import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSSchools() {
  const { content, loading, error } = useCMSContent('schools')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore Our Schools</h2>
            <p className="text-gray-600">Discover the ancient wisdom through our structured learning paths</p>
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
            {content.title || 'Explore Our Schools'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Discover the ancient wisdom through our structured learning paths'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.schools?.map((school: any) => (
            <div key={school.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="text-4xl mb-4">{school.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {school.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {school.description}
                </p>
                <a 
                  href={school.link} 
                  className={`inline-block px-6 py-3 rounded-lg text-white font-semibold bg-${school.color} hover:opacity-90 transition-opacity`}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
