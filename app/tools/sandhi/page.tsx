import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audio Sandhi - Shikshanam | Sanskrit Pronunciation Tool',
  description: 'Learn Sanskrit sound combinations and pronunciation rules with our interactive audio sandhi tool.',
}

export default function AudioSandhiPage() {
  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Audio Sandhi
          </h1>
          <p className="text-subheading text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto">
            Coming soon - Interactive Sanskrit pronunciation and sound combination tool.
          </p>
        </div>
      </div>
    </div>
  )
}
