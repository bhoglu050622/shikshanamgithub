'use client';
import { motion } from 'framer-motion';
import { Award, Download, Share2, CheckCircle } from 'lucide-react';

export default function CertificateShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="nyaya-heading text-4xl mb-4 font-bold">
        Earn Your Certificate of Completion
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Showcase your mastery of Nyaya logic with a shareable credential that 
        demonstrates your commitment to understanding ancient reasoning systems.
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="nyaya-certificate">
          <div className="nyaya-certificate-content">
            <Award className="w-20 h-20 mx-auto mb-6 text-amber-500 animate-pulse" />
            
            <div className="border-4 border-dashed border-blue-300 rounded-2xl p-10 mb-6 bg-white/50 backdrop-blur-sm">
              <h3 className="nyaya-heading text-3xl mb-3 font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Certificate of Completion
              </h3>
              <p className="nyaya-subheading text-xl mb-6 font-semibold text-slate-700">
                न्याय दर्शन - Nyaya Philosophy Course
              </p>
              <div className="text-base text-gray-700 space-y-2 mb-6">
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Successfully completed comprehensive study of Nyaya Philosophy
                </p>
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Mastered logical reasoning, epistemology, and debate techniques
                </p>
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Understanding of Pramanas and Indian logic systems
                </p>
              </div>
              <div className="mt-8 pt-6 border-t-2 border-blue-200">
                <p className="font-bold text-xl text-blue-800">Vishal Chaurasia</p>
                <p className="text-sm text-gray-600 mt-1">Instructor & Founder, Shikshanam</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="nyaya-btn-primary inline-flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Certificate
              </button>
              <button className="nyaya-btn-secondary inline-flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <motion.div 
          className="text-center p-6 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h4 className="nyaya-heading text-lg mb-2 font-bold">Verified Credential</h4>
          <p className="nyaya-subheading text-sm text-gray-600">
            Authentic certificate with unique verification code
          </p>
        </motion.div>
        <motion.div 
          className="text-center p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h4 className="nyaya-heading text-lg mb-2 font-bold">Shareable</h4>
          <p className="nyaya-subheading text-sm text-gray-600">
            Add to your professional profile and social media
          </p>
        </motion.div>
        <motion.div 
          className="text-center p-6 rounded-2xl bg-white border border-green-100 shadow-sm hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h4 className="nyaya-heading text-lg mb-2 font-bold">Lifetime Access</h4>
          <p className="nyaya-subheading text-sm text-gray-600">
            Download and access your certificate anytime
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
