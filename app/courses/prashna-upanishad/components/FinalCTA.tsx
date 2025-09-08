'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export default function FinalCTA() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Begin Your Quest for Clarity with the Prashna Upanishad
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Join spiritual seekers who have already discovered profound insights through the six questions of Prashna Upanishad. 
              Start your transformative journey today with lifetime access to this comprehensive course.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-4xl mx-auto">
            <div className="card-premium p-12 text-center">
              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-5xl font-bold text-muted-saffron-600">
                    ₹1,499
                  </div>
                  <div className="text-2xl text-wisdom-400 line-through">
                    ₹2,399
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-medium">
                    37% OFF
                  </div>
                </div>
                <p className="text-wisdom-600">
                  One-time payment • Lifetime access • No recurring fees
                </p>
              </div>

              {/* CTA Button */}
              <motion.a
                href="https://courses.shikshanam.in/courses/Upanishads-Online-Course-on-The-Prashna-Upanishad-6614091229b29a677fdfd70a"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 hover:from-muted-saffron-600 hover:to-muted-saffron-700 text-white font-semibold py-6 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-xl mb-8"
              >
                <span>Enroll Now · ₹1,499</span>
                <ArrowRight className="w-6 h-6" />
              </motion.a>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Lifetime Access</span>
                </div>
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">Satisfaction Guarantee</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-gradient-to-r from-muted-saffron-50 to-teal-50 p-6 rounded-2xl mb-8">
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
                  <span className="font-medium">Limited Time Offer - 37% Discount</span>
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
                  <div className="w-20 h-20 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Instant Access</h4>
                  <p className="text-wisdom-600 text-sm">Get immediate access to all course materials upon enrollment</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Proven Results</h4>
                  <p className="text-wisdom-600 text-sm">Join 50+ students who have transformed their understanding</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-muted-saffron-500 to-muted-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
