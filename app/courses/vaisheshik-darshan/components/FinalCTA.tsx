'use client';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

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
              Ready to Explore the Atomic Universe?
            </h2>
            <p className="vaisheshik-subheading text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of students, homemakers, and truth-seekers who have embraced 
              Maharshi Kanada's profound insights into the nature of reality. Begin your journey today.
            </p>

            <div className="mb-8">
              <div className="vaisheshik-price text-5xl mb-2">
                ₹999
              </div>
              <p className="text-sm text-gray-600">One-time payment • 1 Year Access</p>
            </div>

            <div className="mb-8">
              <ProtectedExternalLink 
                href="https://courses.shikshanam.in/single-checkout/643aa48ee4b0bc2eac815e74?pid=p3" 
                className="vaisheshik-btn-primary text-xl px-12 py-4"
              >
                <BookOpen className="w-6 h-6 mr-3 inline" />
                Enroll Now
              </ProtectedExternalLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-vaisheshik-primary" />
                <span className="vaisheshik-subheading">30 Sessions • 1 Year Access</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Award className="w-6 h-6 text-vaisheshik-primary" />
                <span className="vaisheshik-subheading">Certificate on Completion</span>
              </div>
            </div>

            <div className="border-t border-vaisheshik-secondary/30 pt-6">
              <p className="vaisheshik-subheading text-gray-600">
                Start learning immediately after enrollment • Watch the free demo before you commit
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
