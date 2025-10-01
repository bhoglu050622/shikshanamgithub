'use client';

import { useCMSContent } from '@/lib/cms/hooks';
import { AboutContent } from '@/lib/cms/about-types';
import FoundersMission from '@/components/sections/FoundersMission';

export default function CMSAboutPage() {
  const { content, loading, error } = useCMSContent('/api/cms/about');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading About page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Content</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-saffron-600 text-white px-4 py-2 rounded-lg hover:bg-saffron-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Content Found</h1>
          <p className="text-gray-600">The About page content could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-saffron-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {content.hero?.title || 'About Shikshanam'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.hero?.subtitle || 'Discover our mission to preserve and share ancient wisdom for modern life.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.mission?.title || 'Our Mission'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {content.mission?.description || 'To make ancient wisdom accessible and relevant for contemporary life.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(content.mission?.values || []).map((value: any, index: number) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.offerings?.title || 'What We Offer'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {content.offerings?.description || 'Comprehensive learning experiences across multiple disciplines.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.offerings?.items || []).map((item: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-saffron-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a 
                  href={item.link} 
                  className="text-saffron-600 hover:text-saffron-700 font-medium"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.values?.title || 'Our Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {content.values?.description || 'The principles that guide everything we do.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(content.values?.principles || []).map((principle: any, index: number) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-saffron-600 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {content.cta?.title || 'Join Our Community'}
          </h2>
          <p className="text-xl text-saffron-100 mb-8 max-w-2xl mx-auto">
            {content.cta?.description || 'Start your journey of learning and growth with us today.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={content.cta?.primaryButton?.link || '/courses'}
              className="bg-white text-saffron-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {content.cta?.primaryButton?.text || 'Explore Courses'}
            </a>
            <a 
              href={content.cta?.secondaryButton?.link || '/contact'}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-saffron-600 transition-colors"
            >
              {content.cta?.secondaryButton?.text || 'Get in Touch'}
            </a>
          </div>
        </div>
      </section>

      {/* Founders Mission Component */}
      <FoundersMission />
    </div>
  );
}