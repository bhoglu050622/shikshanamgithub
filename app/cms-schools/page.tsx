'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { useCMSContent } from '@/lib/cms/hooks';
import { SchoolsContent } from '@/lib/cms/schools-types';

export default function CMSSchoolsPage() {
  const { content, loading, error } = useCMSContent('/api/cms/schools');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Schools page...</p>
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
          <p className="text-gray-600">The Schools page content could not be loaded.</p>
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
              {content.hero?.title || 'Our Schools'}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.hero?.subtitle || 'Discover our comprehensive learning programs across multiple disciplines.'}
            </p>
          </div>
        </div>
      </section>

      {/* Schools List Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {content.schools?.title || 'Explore Our Schools'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {content.schools?.description || 'Each school offers specialized learning paths designed to deepen your understanding and practice.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {(content.schools?.list || []).map((school: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl">{school.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{school.name}</h3>
                  <p className="text-gray-600 mb-6">{school.description}</p>
                  <div className="space-y-2 mb-6">
                    {(school.features || []).map((feature: any, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-saffron-500 rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link 
                    href={school.link || '#'}
                    className="inline-flex items-center text-saffron-600 hover:text-saffron-700 font-semibold group"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}