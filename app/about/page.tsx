import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Shikshanam',
  description: 'Learn about Shikshanam\'s mission to preserve and share ancient Indian knowledge through modern technology.',
}

export default function AboutPage() {
  return (
    <>
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About Shikshanam
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are dedicated to preserving and sharing the timeless wisdom of ancient India through modern technology and innovative learning methods.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Shikshanam was born from a deep reverence for India's ancient knowledge systems. We believe that the wisdom of Sanskrit, Darshanas, and traditional self-help practices holds the key to personal growth and spiritual development in the modern world.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to make this profound knowledge accessible to everyone, regardless of their background or location, through carefully crafted courses, interactive tools, and expert guidance.
              </p>
              <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To create a global community of learners who embrace ancient wisdom for modern living, fostering personal growth, cultural understanding, and spiritual development.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sanskrit Learning</h3>
                    <p className="text-gray-600 text-sm">Comprehensive courses from beginner to advanced levels</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Darshan Studies</h3>
                    <p className="text-gray-600 text-sm">Deep exploration of Indian philosophical systems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Self-Help Wisdom</h3>
                    <p className="text-gray-600 text-sm">Ancient practices for modern personal development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                    <p className="text-gray-600 text-sm">Learn from experienced scholars and practitioners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Authenticity</h3>
                <p className="text-gray-600">
                  We maintain the highest standards of authenticity in our teachings, ensuring that ancient wisdom is preserved and transmitted accurately.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600">
                  We foster a supportive learning community where students can connect, share experiences, and grow together on their spiritual journey.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We combine traditional wisdom with modern technology to create engaging, effective learning experiences for the digital age.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're a complete beginner or an advanced practitioner, Shikshanam offers a path for everyone to explore and embrace the wisdom of ancient India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Courses
              </a>
              <a
                href="/contact"
                className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
