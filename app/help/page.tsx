import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center - Shikshanam',
  description: 'Get help and support for your Sanskrit learning journey. Find answers to common questions and get assistance.',
}

export default function HelpPage() {
  return (
    <>
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4 text-center mx-auto">
              Help Center
            </h1>
            <p className="font-sans text-xl text-gray-600 text-center">
              Find answers to your questions and get the support you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center">Getting Started</h2>
              <ul className="font-sans space-y-3 text-gray-600">
                <li>• How to create an account</li>
                <li>• Choosing your learning path</li>
                <li>• Understanding course structure</li>
                <li>• Setting up your profile</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center">Learning Support</h2>
              <ul className="font-sans space-y-3 text-gray-600">
                <li>• Accessing course materials</li>
                <li>• Understanding Sanskrit grammar</li>
                <li>• Using practice tools</li>
                <li>• Tracking your progress</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center">Technical Issues</h2>
              <ul className="font-sans space-y-3 text-gray-600">
                <li>• Video playback problems</li>
                <li>• Audio quality issues</li>
                <li>• Browser compatibility</li>
                <li>• Mobile app support</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center">Account & Billing</h2>
              <ul className="font-sans space-y-3 text-gray-600">
                <li>• Managing subscriptions</li>
                <li>• Payment methods</li>
                <li>• Refund policies</li>
                <li>• Account security</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center mx-auto">Still Need Help?</h2>
            <p className="font-sans text-gray-600 mb-6 text-center">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@shikshanam.com"
                className="border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
