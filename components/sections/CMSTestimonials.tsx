'use client'

import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSTestimonials() {
  const { content, loading, error } = useCMSContent('testimonials')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What Our Students Say</h2>
            <p className="text-gray-600">Join thousands of learners who have transformed their understanding</p>
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
            {content.title || 'What Our Students Say'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Join thousands of learners who have transformed their understanding'}
          </p>
        </div>

        {/* Stats */}
        {content.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.students}
              </div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.rating}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.satisfaction}
              </div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.reviews}
              </div>
              <div className="text-gray-600">Reviews</div>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.testimonials?.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.content}"
              </blockquote>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  Course: {testimonial.course}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonial.rating}/5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
