'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Philosophy Student",
      content: "Vishal Sir's explanation of Purusha and Prakriti was so clear that I finally understood the fundamental concepts that had confused me for years. The way he connects ancient wisdom with modern life is remarkable.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Software Engineer",
      content: "As someone from a technical background, I appreciated the systematic approach to Samkhya philosophy. The course structure and the way complex concepts are broken down made it accessible and engaging.",
      rating: 5
    },
    {
      name: "Meera Patel",
      role: "Yoga Instructor",
      content: "This course deepened my understanding of the philosophical foundations of yoga. The explanation of the Three Gunas has transformed how I approach both my practice and teaching.",
      rating: 5
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
      <h2 className="samkhya-heading text-4xl mb-4">
        What Students Say
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Join hundreds of learners who have transformed their understanding of reality 
        through this comprehensive exploration of Samkhya philosophy.
      </p>

      <div className="samkhya-grid samkhya-grid-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="samkhya-testimonial"
          >
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="samkhya-subheading text-gray-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="samkhya-heading text-lg">{testimonial.name}</h4>
              <p className="samkhya-subheading text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-samkhya-light to-white rounded-2xl border border-samkhya-secondary/20"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-left">
            <div className="samkhya-heading text-3xl">4.9</div>
            <div className="samkhya-subheading text-gray-600">Average Rating</div>
          </div>
        </div>
        <p className="samkhya-subheading text-lg text-gray-700 max-w-2xl mx-auto">
          "Trusted by learners for clear, timeless wisdom. Join a community of seekers 
          who are transforming their understanding of reality through Samkhya philosophy."
        </p>
      </motion.div>
    </motion.div>
  );
}
