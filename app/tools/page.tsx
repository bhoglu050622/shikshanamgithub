import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sanskrit Tools - Shikshanam',
  description: 'Access powerful tools to enhance your Sanskrit learning experience including keyboard helpers, sandhi tools, and more.',
}

const tools = [
  {
    name: 'Sanskrit Keyboard Helper',
    title: 'Type in Devanagari Script',
    description: 'Use our virtual keyboard to type Sanskrit text in Devanagari script with ease.',
    href: '/tools/keyboard',
    icon: '⌨️',
    features: ['Virtual Devanagari keyboard', 'Character mapping', 'Easy text input']
  },
  {
    name: 'Sandhi Tool',
    title: 'Master Sanskrit Sound Combinations',
    description: 'Learn and practice Sanskrit sandhi rules with our interactive tool.',
    href: '/tools/sandhi',
    icon: '🔗',
    features: ['Sandhi rules explanation', 'Interactive examples', 'Practice exercises']
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300">
      <Header />
      <main className="main-container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sanskrit Learning Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your Sanskrit learning experience with our collection of powerful tools designed to make your journey easier and more effective.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {tools.map((tool) => (
              <div key={tool.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{tool.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                      <p className="text-saffron-600 font-medium">{tool.title}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-saffron-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href={tool.href}
                    className="inline-flex items-center bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Use Tool
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">More Tools Coming Soon</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're constantly developing new tools to enhance your Sanskrit learning experience. Stay tuned for more interactive features and utilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/practice/sanskrit"
                className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Practice Sanskrit
              </Link>
              <Link
                href="/contact"
                className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
              >
                Suggest a Tool
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
