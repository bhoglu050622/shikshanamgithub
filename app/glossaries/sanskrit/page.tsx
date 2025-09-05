import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanskrit Glossaries - Shikshanam | Vocabulary & Definitions',
  description: 'Comprehensive Sanskrit vocabulary with meanings, pronunciations, and usage examples.',
}

export default function SanskritGlossariesPage() {
  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Sanskrit Glossaries
          </h1>
          <p className="text-subheading text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto">
            Coming soon - Comprehensive Sanskrit vocabulary with meanings and pronunciations.
          </p>
        </div>
      </div>
    </div>
  )
}
