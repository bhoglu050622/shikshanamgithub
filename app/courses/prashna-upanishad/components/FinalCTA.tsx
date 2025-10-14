'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function FinalCTA() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Enroll Now
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Begin your journey into आत्म-दर्शन today
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-4xl mx-auto">
            <div className="card-premium p-12 text-center">
              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-gold-600 to-gold-700 bg-clip-text text-transparent">
                    ₹1,499
                  </div>
                  <div className="text-2xl text-wisdom-400 line-through">
                    ₹2,999
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-semibold shadow-sm">
                    50% OFF
                  </div>
                </div>
                <p className="text-wisdom-600">
                  One-time payment • 1-Year access • No recurring fees
                </p>
              </div>

              {/* CTA Button */}
              <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6614091229b29a677fdfd70a?pid=p1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold py-6 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-xl mb-8"
                  style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}
                >
                  <span>Enroll Now · ₹1,499</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </ProtectedExternalLink>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">1-Year Access</span>
                </div>
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Certificate Included</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-gradient-to-r from-gold-50 to-teal-50 p-6 rounded-2xl mb-8 border border-gold-200/30">
                <h3 className="text-lg font-semibold text-high-contrast mb-4">
                  What's Included in Your Enrollment:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-wisdom-600">6 comprehensive question modules</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-wisdom-600">All six questions of Prashna Upanishad</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-wisdom-600">Downloadable notes & reflective exercises</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-wisdom-600">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-wisdom-600">Community support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-wisdom-600">Q&A sessions</span>
                  </div>
                </div>
              </div>

              {/* Urgency */}
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl">
                <div className="flex items-center justify-center space-x-2 text-orange-700">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Limited Time Offer - 44% Discount</span>
                </div>
                <p className="text-orange-600 text-sm mt-1">
                  This special pricing is available for a limited time only
                </p>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                Why Wait? Start Your Spiritual Inquiry Today
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Instant Access</h4>
                  <p className="text-wisdom-600 text-sm">Get immediate access to all course materials upon enrollment</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Proven Results</h4>
                  <p className="text-wisdom-600 text-sm">Join 50+ students who have transformed their understanding</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">💎</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Lifetime Value</h4>
                  <p className="text-wisdom-600 text-sm">One-time investment for a lifetime of spiritual growth</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
