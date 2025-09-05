import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dr. Meera Patel - Spiritual Sanskrit Guide | Shikshanam',
  description: 'Meet Dr. Meera Patel, our Spiritual Sanskrit Guide with 20+ years of experience in philosophy and scriptures.',
}

export default function MeeraPatelPage() {
  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Dr. Meera Patel
          </h1>
          <p className="text-subheading text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto">
            Spiritual Sanskrit Guide - Coming soon
          </p>
        </div>
      </div>
    </div>
  )
}
