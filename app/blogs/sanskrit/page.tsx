import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanskrit Blogs - Shikshanam | Insights & Literature',
  description: 'Explore our collection of Sanskrit blogs covering literature, culture, and spiritual insights.',
}

export default function SanskritBlogsPage() {
  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Sanskrit Blogs
          </h1>
          <p className="text-subheading text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto">
            Coming soon - Insights on Sanskrit literature, culture, and spiritual wisdom.
          </p>
        </div>
      </div>
    </div>
  )
}
