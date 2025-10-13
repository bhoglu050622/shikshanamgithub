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
      <h2 className="vaisheshik-heading text-4xl mb-4">
        Earn Your Vaisheshika Darshan Credential
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Showcase your journey into logical realism with a shareable credential that 
        demonstrates your commitment to understanding the structure of reality.
      </p>

      <div className="max-w-2xl mx-auto">
        <div className="vaisheshik-certificate">
          <div className="vaisheshik-certificate-content">
            <Award className="w-20 h-20 mx-auto mb-6 text-vaisheshik-secondary" />
            
            <div className="border-2 border-dashed border-vaisheshik-secondary rounded-lg p-8 mb-6">
              <h3 className="vaisheshik-heading text-2xl mb-2 text-vaisheshik-primary">
                Certificate of Completion
              </h3>
              <p className="vaisheshik-subheading text-lg mb-4">
                वैशेषिक दर्शन - Vaisheshika Darshan Course
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>This certifies that the holder has successfully completed</p>
                <p>the comprehensive study of Vaisheshika Philosophy</p>
                <p>including atomic theory, six categories, and logical analysis</p>
              </div>
              <div className="mt-6 pt-4 border-t border-vaisheshik-secondary/30">
                <p className="font-semibold text-vaisheshik-primary">Vishal Chaurasia</p>
                <p className="text-sm text-gray-600">Instructor & Founder, Shikshanam</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="vaisheshik-btn-primary">
                <Download className="w-5 h-5 mr-2 inline" />
                Download Certificate
              </button>
              <button className="vaisheshik-btn-secondary">
                <Share2 className="w-5 h-5 mr-2 inline" />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-vaisheshik-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-vaisheshik-primary" />
          </div>
          <h4 className="vaisheshik-heading text-lg mb-2">Verified Credential</h4>
          <p className="vaisheshik-subheading text-sm text-gray-600">
            Authentic certificate with unique verification code
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-vaisheshik-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-8 h-8 text-vaisheshik-primary" />
          </div>
          <h4 className="vaisheshik-heading text-lg mb-2">Share it with Pride</h4>
          <p className="vaisheshik-subheading text-sm text-gray-600">
            Add to your professional profile and social media
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-vaisheshik-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-8 h-8 text-vaisheshik-primary" />
          </div>
          <h4 className="vaisheshik-heading text-lg mb-2">1-Year Access</h4>
          <p className="vaisheshik-subheading text-sm text-gray-600">
            Download and access your certificate anytime
          </p>
        </div>
      </div>
    </motion.div>
  );
}
