'use client';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Clock, Award } from 'lucide-react';

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
              Begin Your Journey into Advaita Today
            </h2>
            <p className="advaita-subheading text-xl mb-8 max-w-3xl mx-auto">
              Join seekers who have transformed their understanding of reality 
              through the systematic study of Drig-Drishya Viveka. Start your journey today.
            </p>

            <div className="mb-8">
              <div className="advaita-price text-5xl mb-2">
                ₹1,999
                <span className="advaita-price-original text-2xl">₹2,499</span>
              </div>
              <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
            </div>

            <div className="mb-8">
              <a href="#enroll" className="advaita-btn-primary text-xl px-12 py-4">
                <BookOpen className="w-6 h-6 mr-3 inline" />
                Enroll Now · ₹1,999
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-advaita-primary" />
                <span className="advaita-subheading">Secure Payment</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-advaita-primary" />
                <span className="advaita-subheading">Lifetime Access</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Award className="w-6 h-6 text-advaita-primary" />
                <span className="advaita-subheading">Satisfaction Guarantee</span>
              </div>
            </div>

            <div className="border-t border-advaita-secondary/30 pt-6">
              <p className="advaita-subheading text-gray-600">
                <strong>7-day money-back guarantee</strong> • No questions asked • 
                Start learning immediately after enrollment
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
