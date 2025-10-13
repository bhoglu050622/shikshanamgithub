'use client';

import { Button } from '@/components/ui/button';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function FinalCTA() {
  return (
    <>
      {/* Main CTA Section */}
      <section className="py-16 bg-gradient-to-br from-saffron-600 to-saffron-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enroll Now
          </h2>
          <p className="text-xl mb-8 text-saffron-100">
            Begin your journey into आत्म-दर्शन today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6613dc28c07e467c4f550416?pid=p2">
              <Button 
                size="lg" 
                className="bg-white text-saffron-700 hover:bg-saffron-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Enroll Now · ₹2,999
              </Button>
            </ProtectedExternalLink>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-saffron-700 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Watch Free Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-saffron-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm">1-Year Access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm">Certificate Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-saffron-200 shadow-lg z-50 p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-saffron-800">Ready to Start Your Spiritual Journey?</h3>
            <p className="text-sm text-saffron-600">Join the Isha Upanishad course today</p>
          </div>
          <div className="flex gap-3">
            <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6613dc28c07e467c4f550416?pid=p2">
              <Button 
                size="sm"
                className="bg-saffron-500 hover:bg-saffron-600 text-white px-6 py-2 font-semibold rounded-lg"
              >
                Enroll Now - ₹2,999
              </Button>
            </ProtectedExternalLink>
            <Button 
              variant="outline" 
              size="sm"
              className="border-saffron-500 text-saffron-500 hover:bg-saffron-500 hover:text-white px-6 py-2 font-semibold rounded-lg"
            >
              Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind sticky CTA */}
      <div className="h-20"></div>
    </>
  );
}
