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
        <div className="vaisheshik-card vaisheshik-logical">
          <div className="vaisheshik-logical-content">
            <h2 className="vaisheshik-heading text-4xl mb-6">
              Begin Your Journey into Logical Realism Today
            </h2>
            <p className="vaisheshik-subheading text-xl mb-8 max-w-3xl mx-auto">
              Join hundreds of analytical thinkers who have transformed their understanding of reality 
              through the systematic study of Vaisheshika philosophy. Start your journey today.
            </p>

            <div className="mb-8">
              <div className="vaisheshik-price text-5xl mb-2">
                ₹999
                <span className="vaisheshik-price-original text-2xl">₹1,799</span>
              </div>
              <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
            </div>

            <div className="mb-8">
              <a href="#enroll" className="vaisheshik-btn-primary text-xl px-12 py-4">
                <BookOpen className="w-6 h-6 mr-3 inline" />
                Enroll Now · ₹999
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-vaisheshik-primary" />
                <span className="vaisheshik-subheading">Secure Payment</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-vaisheshik-primary" />
                <span className="vaisheshik-subheading">Lifetime Access</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Award className="w-6 h-6 text-vaisheshik-primary" />
                <span className="vaisheshik-subheading">Satisfaction Guarantee</span>
              </div>
            </div>

            <div className="border-t border-vaisheshik-secondary/30 pt-6">
              <p className="vaisheshik-subheading text-gray-600">
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
