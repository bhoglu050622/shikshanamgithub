'use client';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Clock, Award } from 'lucide-react';

import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink'
export default function FinalCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="max-w-4xl mx-auto">
        <div className="advaita-card advaita-nonduality">
          <div className="advaita-nonduality-content">
            <h2 className="advaita-heading text-4xl mb-6">
              👉 Enroll Now
            </h2>
            <p className="advaita-subheading text-xl mb-8 max-w-3xl mx-auto">
              Begin your journey into Advaita Vedanta through the systematic study of Drig-Drishya Viveka. 
              Transform your understanding of reality and discover the unity behind all existence.
            </p>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="advaita-price text-5xl">
                  ₹1,999
                </div>
                <div className="text-2xl text-gray-400 line-through">
                  ₹2,499
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  20% OFF
                </div>
              </div>
              <p className="text-sm text-gray-600">One-time payment • 1-Year Access</p>
            </div>

            <div className="mb-8">
              <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6732e50755381c626392a6b6?pid=p1" className="advaita-btn-primary text-xl px-12 py-4 inline-block">
                <BookOpen className="w-6 h-6 mr-3 inline" />
                Enroll Now
              </ProtectedExternalLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <BookOpen className="w-8 h-8 text-advaita-primary" />
                <span className="advaita-subheading text-sm">All 46 Shlokas</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Clock className="w-8 h-8 text-advaita-primary" />
                <span className="advaita-subheading text-sm">7+ Hours Content</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Award className="w-8 h-8 text-advaita-primary" />
                <span className="advaita-subheading text-sm">Certificate</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Shield className="w-8 h-8 text-advaita-primary" />
                <span className="advaita-subheading text-sm">1 Yr Access</span>
              </div>
            </div>

            <div className="border-t border-advaita-secondary/30 pt-6">
              <p className="advaita-subheading text-gray-600">
                Start learning immediately after enrollment • Community support included • 
                Contact: support@shikshanam.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
