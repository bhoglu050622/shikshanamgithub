'use client'

import Image from 'next/image'
import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSStudentStories() {
  const { content, loading, error } = useCMSContent('studentStories')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Success Stories</h2>
            <p className="text-gray-600">Real transformations from our students</p>
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
            {content.title || 'Student Success Stories'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Real transformations from our students'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.stories?.map((story: any) => (
            <div key={story.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Image 
                  src={story.image} 
                  alt={story.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {story.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {story.age} • {story.profession}
                  </p>
                  <p className="text-sm text-gray-500">
                    {story.location}
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "{story.story}"
              </blockquote>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Transformation:</strong> {story.transformation}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Course: {story.course}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
