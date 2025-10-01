'use client'

import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSContribute() {
  const { content, loading, error } = useCMSContent('contribute')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Keep the Indian Wisdom Alive!</h2>
            <p className="text-gray-600">Be part of this movement — share knowledge, guide as a Guru, or support a project.</p>
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
            {content.title || 'Keep the Indian Wisdom Alive!'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Be part of this movement — share knowledge, guide as a Guru, or support a project.'}
          </p>
        </div>

        {/* Sections */}
        {content.sections?.map((section: any, index: number) => (
          <div key={index} className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {section.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {section.subtitle}
              </p>
              <p className="text-gray-700 mb-6">
                {section.description}
              </p>
              
              {section.features && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">What you can do:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {section.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {section.stats && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(section.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {String(value)}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  {section.cta}
                </button>
                {section.ctaSecondary && (
                  <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    {section.ctaSecondary}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Projects */}
        {content.projects && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Current Projects You Can Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.projects.map((project: any) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {project.timeLeft}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-semibold">Raised</span>
                      <div>{project.raised}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Target</span>
                      <div>{project.target}</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                    Support This Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
