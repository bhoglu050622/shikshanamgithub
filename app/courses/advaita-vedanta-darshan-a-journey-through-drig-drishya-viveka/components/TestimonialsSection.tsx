'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Meera Patel",
      role: "Spiritual Seeker",
      content: "This course transformed my understanding of reality. The way Vishal Sir explains the seer-seen relationship made the complex concepts of Advaita Vedanta crystal clear. Highly recommended for anyone seeking deeper understanding.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Philosophy Student",
      content: "The systematic approach to Drig-Drishya Viveka was exceptional. Each verse was explained with such clarity that I could see the practical applications in my daily life. The non-dual perspective has changed how I view everything.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Meditation Teacher",
      content: "As someone who teaches meditation, this course deepened my understanding of the philosophical foundations. The explanation of consciousness and its relationship to the world was profound and practical.",
      rating: 4
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="advaita-heading text-4xl mb-4">
        What Students Say
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Join seekers who have transformed their understanding of reality 
        through this comprehensive exploration of Drig-Drishya Viveka.
      </p>

      <div className="advaita-grid advaita-grid-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="advaita-testimonial"
          >
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="advaita-subheading text-gray-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="advaita-heading text-lg">{testimonial.name}</h4>
              <p className="advaita-subheading text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-advaita-light to-white rounded-2xl border border-advaita-secondary/20"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-left">
            <div className="advaita-heading text-3xl">4.8</div>
            <div className="advaita-subheading text-gray-600">Average Rating (6 reviews)</div>
          </div>
        </div>
        <p className="advaita-subheading text-lg text-gray-700 max-w-2xl mx-auto">
          "Trusted by seekers for clear, timeless wisdom. Join a community of spiritual explorers 
          who are transforming their understanding of reality through Advaita Vedanta philosophy."
        </p>
      </motion.div>
    </motion.div>
  );
}
