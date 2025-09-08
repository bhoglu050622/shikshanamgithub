import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement - Shikshanam',
  description: 'Learn about Shikshanam\'s commitment to accessibility and inclusive design for all learners.',
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300">
      <Header />
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600">
              Shikshanam is committed to ensuring digital accessibility for all users
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-600 mb-4">
                Shikshanam is committed to providing a website and learning platform that is accessible to all users, including those with disabilities. We strive to ensure that our digital content meets or exceeds the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              </p>
              <p className="text-gray-600">
                We believe that learning should be accessible to everyone, regardless of their abilities or the technology they use to access our platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
              <p className="text-gray-600 mb-4">
                Our platform includes the following accessibility features:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Keyboard navigation support for all interactive elements</li>
                <li>Screen reader compatibility with proper ARIA labels</li>
                <li>High contrast color schemes and customizable text sizes</li>
                <li>Alternative text for images and visual content</li>
                <li>Captions and transcripts for video content</li>
                <li>Skip links for efficient navigation</li>
                <li>Focus indicators for keyboard users</li>
                <li>Semantic HTML structure for better screen reader experience</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Assistive Technologies</h2>
              <p className="text-gray-600 mb-4">
                Our platform is designed to work with various assistive technologies:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Voice recognition software</li>
                <li>Switch navigation devices</li>
                <li>Magnification software</li>
                <li>Text-to-speech tools</li>
                <li>Keyboard-only navigation</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Improvements</h2>
              <p className="text-gray-600 mb-4">
                We continuously work to improve the accessibility of our platform:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Regular accessibility audits and testing</li>
                <li>User feedback integration</li>
                <li>Staff training on accessibility best practices</li>
                <li>Collaboration with accessibility experts</li>
                <li>Implementation of new accessibility standards</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Formats</h2>
              <p className="text-gray-600 mb-4">
                We provide alternative formats for our content when possible:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Audio versions of text content</li>
                <li>Large print materials</li>
                <li>Simplified language versions</li>
                <li>Visual aids and diagrams with descriptions</li>
                <li>Interactive transcripts for videos</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback and Support</h2>
              <p className="text-gray-600 mb-4">
                We welcome feedback on the accessibility of our platform. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Email: accessibility@shikshanam.com</li>
                <li>Phone: Available through our contact page</li>
                <li>Contact form: Use our general contact form with "Accessibility" as the subject</li>
              </ul>
              <p className="text-gray-600 mt-4">
                We aim to respond to accessibility feedback within 2 business days and will work with you to address any issues.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
              <p className="text-gray-600">
                Some content on our platform may be provided by third parties. While we strive to ensure all content meets accessibility standards, we cannot guarantee the accessibility of third-party materials. If you encounter accessibility issues with third-party content, please let us know so we can work with the content provider to address the issue.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Standards</h2>
              <p className="text-gray-600 mb-4">
                Our accessibility efforts are guided by:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>Section 508 of the Rehabilitation Act</li>
                <li>Americans with Disabilities Act (ADA)</li>
                <li>Accessible Canada Act</li>
                <li>European Accessibility Act</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Accessibility Support?</h2>
              <p className="text-gray-600 mb-6">
                Our team is here to help ensure you have the best possible learning experience. Contact us for personalized accessibility support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </a>
                <a
                  href="mailto:accessibility@shikshanam.com"
                  className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
                >
                  Email Accessibility Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
