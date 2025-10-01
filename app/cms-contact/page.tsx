'use client';

import { useCMSContent } from '@/lib/cms/hooks';
import { ContactContent } from '@/lib/cms/contact-types';

export default function CMSContactPage() {
  const { content, loading, error } = useCMSContent('/api/cms/contact');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Contact page...</p>
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
          <p className="text-gray-600">The Contact page content could not be loaded.</p>
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
              {content.hero?.title || 'Contact Us'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.hero?.subtitle || 'Get in touch with us for any questions or support.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.form?.title || 'Send us a Message'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.form?.description || 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-saffron-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-saffron-700 transition-colors"
                >
                  {content.form?.submitText || 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.info?.title || 'Get in Touch'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.info?.description || 'Multiple ways to reach us for different types of inquiries.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(content.info?.methods || []).map((method: any, index: number) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{method.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <a 
                  href={method.link} 
                  className="text-saffron-600 hover:text-saffron-700 font-medium"
                >
                  {method.action || 'Contact Us'} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.quickHelp?.title || 'Quick Help'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.quickHelp?.description || 'Common questions and quick solutions.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(content.quickHelp?.faqs || []).map((faq: any, index: number) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}