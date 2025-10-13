'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="advaita-heading text-4xl mb-4">
        Testimonials / Feedback
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Join thousands of students, homemakers, and seekers who have adopted this Shikshanam offering.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 p-12 bg-gradient-to-r from-advaita-light to-white rounded-2xl border border-advaita-secondary/20 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="advaita-heading text-5xl mb-2 text-advaita-primary">0K+</div>
            <div className="advaita-subheading text-gray-600">Students</div>
          </div>
          <div className="text-center">
            <div className="advaita-heading text-5xl mb-2 text-advaita-primary">0</div>
            <div className="advaita-subheading text-gray-600">Rating</div>
            <div className="flex items-center justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="advaita-heading text-5xl mb-2 text-advaita-primary">0K+</div>
            <div className="advaita-subheading text-gray-600">Positive Reviews</div>
          </div>
        </div>
        <div className="border-t border-advaita-secondary/20 pt-6">
          <p className="advaita-subheading text-lg text-gray-700 max-w-3xl mx-auto">
            Be among the first students to embark on this transformative journey through Drig Drishya Viveka. 
            Your feedback will help shape the future of this course and inspire others.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
