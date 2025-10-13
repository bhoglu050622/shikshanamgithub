'use client';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Clock, Award, Sparkles } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function FinalCTA() {
  const enrollmentLink = "https://courses.shikshanam.in/single-checkout/64bf7b3fe4b04cc6d3b00311?pid=p2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="max-w-5xl mx-auto">
        <div className="nyaya-card nyaya-cosmic relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-200 to-transparent rounded-full blur-3xl opacity-30"></div>
          
          <div className="nyaya-cosmic-content relative z-10">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-500 animate-pulse" />
              <h2 className="nyaya-heading text-4xl md:text-5xl mb-6 font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                Begin Your Journey into Logical Mastery
              </h2>
              <p className="nyaya-subheading text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of learners who have transformed their reasoning abilities 
                through the timeless wisdom of Nyaya philosophy. Start your journey today.
              </p>
            </motion.div>

            <div className="mb-10 p-8 bg-gradient-to-r from-blue-50 to-amber-50 rounded-3xl border-2 border-blue-200">
              <div className="flex items-baseline justify-center gap-4 mb-4">
                <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">₹3,499</span>
                <span className="text-3xl text-gray-400 line-through">₹5,199</span>
                <span className="text-lg font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full">Save 33%</span>
              </div>
              <p className="text-base text-gray-700 font-medium">One-time payment • Lifetime Access</p>
            </div>

            <div className="mb-10">
              <ProtectedExternalLink 
                href={enrollmentLink}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-bold text-xl px-14 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
              >
                <BookOpen className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Enroll Now • ₹3,499
                <Sparkles className="w-6 h-6 animate-pulse" />
              </ProtectedExternalLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <Clock className="w-7 h-7 text-blue-600" />
                <span className="nyaya-subheading font-semibold">Lifetime Access</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <Award className="w-7 h-7 text-amber-600" />
                <span className="nyaya-subheading font-semibold">Certificate Included</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <Shield className="w-7 h-7 text-green-600" />
                <span className="nyaya-subheading font-semibold">Secure Payment</span>
              </div>
            </div>

            <div className="border-t-2 border-blue-200 pt-8">
              <p className="nyaya-subheading text-gray-700 text-lg">
                <strong className="text-green-600">7-day money-back guarantee</strong> • No questions asked • 
                Start learning immediately after enrollment
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
