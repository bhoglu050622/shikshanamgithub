'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle, Users, Star } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import { chanakyaCodeCourseData } from '../courseData';

export default function FinalCTA() {
  const courseData = chanakyaCodeCourseData;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B2B3A] via-[#1a3a4a] to-[#0B2B3A] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D87A2B] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D87A2B] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#C49B0B]" style={{ fontFamily: 'var(--font-display)' }}>
                Ready to Master Chanakya's Strategic Wisdom?
              </h2>
              
              <p className="text-xl text-white/90 mb-8">
                Join 3,200+ professionals who transformed their careers with ancient strategies
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  'Lifetime access to all 10 Secret Codes',
                  'Exclusive WhatsApp community support',
                  'Professional certificate upon completion',
                  'Practical worksheets and frameworks'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 bg-[#D87A2B] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-white">
                    {courseData.metadata.price}
                  </span>
                  <span className="text-lg text-white/60 line-through">
                    {courseData.metadata.originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                    Save {courseData.metadata.savings}
                  </span>
                </div>

                <ProtectedExternalLink
                  href={courseData.enrollment.checkoutLink}
                  className="block w-full py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center mb-3"
                >
                  Enroll Now & Start Learning
                </ProtectedExternalLink>

                <p className="text-xs text-white/60 text-center">
                  Limited time offer • Secure payment • No refunds
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{courseData.stats?.students} Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-[#D87A2B] text-[#D87A2B]" />
                  <span>{courseData.stats?.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{courseData.stats?.satisfaction} Satisfaction</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Certificate Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* Certificate Design */}
                <div className="border-8 border-[#D87A2B]/20 rounded-xl p-6">
                  <div className="text-center mb-6">
                    <Award className="w-16 h-16 text-[#D87A2B] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#0B2B3A] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      Certificate of Completion
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D87A2B] to-transparent mb-4" />
                    <p className="text-sm text-[#6C6C6C]">
                      This certifies that
                    </p>
                    <p className="text-xl font-bold text-[#0B2B3A] my-3">
                      [Your Name]
                    </p>
                    <p className="text-sm text-[#6C6C6C] mb-4">
                      has successfully completed
                    </p>
                    <p className="text-lg font-bold text-[#0B2B3A] mb-4">
                      Chanakya's Code: Strategic Mastery
                    </p>
                  </div>

                  <div className="border-t-2 border-dashed border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-xs text-[#6C6C6C]">
                      <div>
                        <p className="font-semibold text-[#0B2B3A]">Issued by</p>
                        <p>Shikshanam</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#0B2B3A]">Date</p>
                        <p>[Completion Date]</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Seal */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#D87A2B] rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white px-4 py-2 rounded-full shadow-xl"
              >
                <p className="text-sm font-semibold text-[#0B2B3A]">
                  Add to LinkedIn
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center text-white/70 text-sm"
          >
            <p className="text-white">
              Questions? Contact us at{' '}
              <a href={`mailto:${courseData.enrollment.supportEmail}`} className="text-white hover:underline">
                {courseData.enrollment.supportEmail}
              </a>
              {' '}or call{' '}
              <a href={`tel:${courseData.enrollment.supportPhone}`} className="text-white hover:underline">
                {courseData.enrollment.supportPhone}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

