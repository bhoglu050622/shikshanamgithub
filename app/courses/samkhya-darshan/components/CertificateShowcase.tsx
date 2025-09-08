'use client';
import { motion } from 'framer-motion';
import { Award, Download, Share2 } from 'lucide-react';

export default function CertificateShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="samkhya-heading text-4xl mb-4">
        Earn Your Certificate of Completion
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Showcase your journey into Samkhya philosophy with a shareable credential that 
        demonstrates your commitment to understanding ancient wisdom.
      </p>

      <div className="max-w-2xl mx-auto">
        <div className="samkhya-certificate">
          <div className="samkhya-certificate-content">
            <Award className="w-20 h-20 mx-auto mb-6 text-samkhya-secondary" />
            
            <div className="border-2 border-dashed border-samkhya-secondary rounded-lg p-8 mb-6">
              <h3 className="samkhya-heading text-2xl mb-2 text-samkhya-primary">
                Certificate of Completion
              </h3>
              <p className="samkhya-subheading text-lg mb-4">
                सांख्य दर्शन - Samkhya Philosophy Course
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>This certifies that the holder has successfully completed</p>
                <p>the comprehensive study of Samkhya Philosophy</p>
                <p>including Purusha, Prakriti, and the Three Gunas</p>
              </div>
              <div className="mt-6 pt-4 border-t border-samkhya-secondary/30">
                <p className="font-semibold text-samkhya-primary">Vishal Chaurasia</p>
                <p className="text-sm text-gray-600">Instructor & Founder, Shikshanam</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="samkhya-btn-primary">
                <Download className="w-5 h-5 mr-2 inline" />
                Download Certificate
              </button>
              <button className="samkhya-btn-secondary">
                <Share2 className="w-5 h-5 mr-2 inline" />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-samkhya-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-samkhya-primary" />
          </div>
          <h4 className="samkhya-heading text-lg mb-2">Verified Credential</h4>
          <p className="samkhya-subheading text-sm text-gray-600">
            Authentic certificate with unique verification code
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-samkhya-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-samkhya-primary" />
          </div>
          <h4 className="samkhya-heading text-lg mb-2">Shareable</h4>
          <p className="samkhya-subheading text-sm text-gray-600">
            Add to your professional profile and social media
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-samkhya-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-samkhya-primary" />
          </div>
          <h4 className="samkhya-heading text-lg mb-2">Lifetime Access</h4>
          <p className="samkhya-subheading text-sm text-gray-600">
            Download and access your certificate anytime
          </p>
        </div>
      </div>
    </motion.div>
  );
}
