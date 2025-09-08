'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Physics Professor",
      content: "The most lucid introduction to Vaisheshika I've found. Vishal Sir's explanation of atomic theory and its connection to modern physics was eye-opening. The systematic approach made complex concepts accessible.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Philosophy Student",
      content: "This course transformed my understanding of Indian philosophy. The way Vaisheshika's six categories are explained with modern examples helped me grasp the logical structure of reality.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Software Engineer",
      content: "As someone from a technical background, I appreciated the analytical approach to philosophy. The course helped me develop better logical thinking skills that I use in my work daily.",
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
      <h2 className="vaisheshik-heading text-4xl mb-4">
        What Students Say
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Join hundreds of learners who have developed analytical thinking and logical reasoning 
        through this comprehensive exploration of Vaisheshika philosophy.
      </p>

      <div className="vaisheshik-grid vaisheshik-grid-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="vaisheshik-testimonial"
          >
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="vaisheshik-subheading text-gray-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="vaisheshik-heading text-lg">{testimonial.name}</h4>
              <p className="vaisheshik-subheading text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-vaisheshik-light to-white rounded-2xl border border-vaisheshik-secondary/20"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-left">
            <div className="vaisheshik-heading text-3xl">5.0</div>
            <div className="vaisheshik-subheading text-gray-600">Average Rating (11 reviews)</div>
          </div>
        </div>
        <p className="vaisheshik-subheading text-lg text-gray-700 max-w-2xl mx-auto">
          "Trusted by learners for clear, logical wisdom. Join a community of analytical thinkers 
          who are transforming their understanding of reality through Vaisheshika philosophy."
        </p>
      </motion.div>
    </motion.div>
  );
}
