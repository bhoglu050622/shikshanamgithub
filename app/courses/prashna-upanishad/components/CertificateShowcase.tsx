'use client';

import { motion } from 'framer-motion';
import { Award, Download, Share2, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

export default function CertificateShowcase() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Certification
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Earn your credential of expertise
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Certificate Mockup */}
            <div className="relative">
              <div className="card-premium p-8">
                <div className="bg-gradient-to-br from-gold-50 to-teal-50 p-8 rounded-2xl border-2 border-gold-200 relative overflow-hidden shadow-sm">
                  {/* Certificate Design */}
                  <div className="text-center">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-display text-high-contrast mb-2">
                        Certificate of Completion
                      </h3>
                      <p className="text-wisdom-600">Isha Upanishad Course</p>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <p className="text-wisdom-600 mb-2">This is to certify that</p>
                      <h4 className="text-xl font-semibold text-high-contrast mb-4">[Your Name]</h4>
                      <p className="text-wisdom-600 mb-4">
                        has successfully completed the comprehensive course on Isha Upanishad, 
                        demonstrating understanding of all 18 Shlokas and their profound wisdom.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center text-sm text-wisdom-600">
                      <div>
                        <p className="font-semibold">Vishal Chaurasia</p>
                        <p>Instructor & Founder</p>
                        <p>Shikshanam</p>
                      </div>
                      <div>
                        <p>Date: [Completion Date]</p>
                        <p>Course ID: IU-18S-2024</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-muted-saffron-300 rounded-full opacity-30"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-muted-saffron-300 rounded-full opacity-30"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-muted-saffron-300 rounded-full opacity-30"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-muted-saffron-300 rounded-full opacity-30"></div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display text-high-contrast mb-6">
                  Why This Certificate Matters
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-high-contrast mb-2">Spiritual Credential</h4>
                      <p className="text-wisdom-600">Document your journey through ancient Upanishadic wisdom</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-high-contrast mb-2">Personal Achievement</h4>
                      <p className="text-wisdom-600">Celebrate your commitment to spiritual growth and learning</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-high-contrast mb-2">Shareable Format</h4>
                      <p className="text-wisdom-600">Download and share your achievement with your spiritual community</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-high-contrast mb-2">Verification</h4>
                      <p className="text-wisdom-600">Includes unique course ID for verification purposes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gold-50 to-teal-50 p-6 rounded-2xl border border-gold-200/30">
                <h4 className="font-semibold text-high-contrast mb-4">Certificate Features:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-gold-600" />
                    <span className="text-wisdom-600">Digital Download</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4 text-gold-600" />
                    <span className="text-wisdom-600">Social Media Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gold-600" />
                    <span className="text-wisdom-600">Professional Design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-gold-600" />
                    <span className="text-wisdom-600">Verification Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-muted-saffron-50 to-teal-50 p-8 rounded-3xl">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Earn Your Certificate Today
              </h3>
              <p className="text-wisdom-600 mb-6 max-w-2xl mx-auto">
                Complete all modules and assessments to receive your certificate of completion. 
                Share your Verified Certificate and Add certificate to LinkedIn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center space-x-3 px-8 py-4"
                >
                  <Award className="w-5 h-5" />
                  <span>Start Learning Now</span>
                </motion.button>
                <div className="text-sm text-wisdom-600">
                  ✓ Complete all modules ✓ Pass assessments ✓ Download certificate
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
