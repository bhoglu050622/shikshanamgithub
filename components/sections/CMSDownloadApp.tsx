'use client'

import { useCMSContent } from '@/lib/cms/hooks'

export default function CMSDownloadApp() {
  const { content, loading, error } = useCMSContent('downloadApp')

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning, Anytime. Anywhere.</h2>
            <p className="text-gray-600">Shikshanam is in your pocket. Access ancient Indian wisdom on the go</p>
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
            {content.title || 'Learning, Anytime. Anywhere.'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {content.subtitle || 'Shikshanam is in your pocket. Access ancient Indian wisdom on the go with our comprehensive mobile app.'}
          </p>
        </div>

        {/* Features */}
        {content.features && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {content.features.map((feature: any) => (
              <div key={feature.id} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {content.stats && (
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.downloads}
              </div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.rating}
              </div>
              <div className="text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {content.stats.countries}
              </div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        )}

        {/* Download Links */}
        {content.downloadLinks && (
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <a 
              href={content.downloadLinks.android}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <span className="mr-2">📱</span>
              <div>
                <div className="text-sm">Get it on</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>
            <a 
              href={content.downloadLinks.ios}
              className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <span className="mr-2">📱</span>
              <div>
                <div className="text-sm">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </a>
          </div>
        )}

        {/* CTA */}
        {content.cta && (
          <div className="text-center">
            <button className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity">
              {content.cta}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
