'use client';

export default function CertificateShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            Certification
          </h2>
          <p className="text-lg text-saffron-700 max-w-2xl mx-auto">
            Earn your credential of expertise
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-saffron-700">• Share your Verified Certificate</p>
            <p className="text-saffron-700">• Add certificate to LinkedIn</p>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="bg-gradient-to-br from-saffron-50 to-saffron-100 rounded-lg p-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Certificate Design */}
            <div className="border-4 border-saffron-300 rounded-lg p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-saffron-800 mb-2">
                  Certificate of Completion
                </h3>
                <p className="text-saffron-600">
                  ईशावास्य उपनिषद् - A Spiritual Journey of the Self
                </p>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-saffron-700 mb-4">
                  This certifies that
                </p>
                <div className="border-b-2 border-saffron-300 pb-2 mb-4">
                  <p className="text-xl font-semibold text-saffron-800">
                    [Your Name]
                  </p>
                </div>
                <p className="text-saffron-700 mb-2">
                  has successfully completed the comprehensive course on
                </p>
                <p className="text-lg font-semibold text-saffron-800 mb-4">
                  Isha Upanishad - All 18 Shlokas
                </p>
                <p className="text-saffron-700 text-sm">
                  Including detailed explanations, quizzes, and spiritual insights
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-sm text-saffron-600">
                <div>
                  <p className="font-semibold">Vishal Chaurasia</p>
                  <p>Instructor & Founder</p>
                </div>
                <div>
                  <p className="font-semibold">Shikshanam</p>
                  <p>Date: [Completion Date]</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-saffron-50 rounded-lg">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="font-semibold text-saffron-800 mb-2">Digital Certificate</h4>
            <p className="text-saffron-700 text-sm">Download and share your achievement online</p>
          </div>

          <div className="text-center p-6 bg-saffron-50 rounded-lg">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-saffron-800 mb-2">Verification</h4>
            <p className="text-saffron-700 text-sm">Authentic certificate with verification code</p>
          </div>

          <div className="text-center p-6 bg-saffron-50 rounded-lg">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h4 className="font-semibold text-saffron-800 mb-2">LinkedIn Ready</h4>
            <p className="text-saffron-700 text-sm">Add to your professional profile and resume</p>
          </div>
        </div>
      </div>
    </section>
  );
}
